"""Compact teaching excerpts for the memory report, not a full policy.
Derived from reviewed implementations; model loading and robot I/O are omitted.
All shapes use B=batch, T=frames, P=patches, D=feature width.
"""
import math
import torch
from torch import nn
import torch.nn.functional as F


# region temporal
def causal_temporal_layer(layer, x):
    """x: [B,T,P,D_vision]; reuse one SigLIP block's norm and Q/K/V/O.
    Q/K/V come from image features, not independent learned memory queries.
    """
    b, t, p, d = x.shape
    positions = torch.arange(t, device=x.device).float() - (t - 1)
    freq = torch.exp(-torch.arange(d // 2, device=x.device).float()
                     * math.log(10000) / max(d // 2 - 1, 1))
    angles = positions[:, None] * freq
    pe = torch.cat([angles.sin(), angles.cos()], dim=-1)
    pe = F.pad(pe - pe[-1:], (0, d - pe.shape[-1])).to(x.dtype)
    z = (x + pe[None, :, None]).permute(0, 2, 1, 3).reshape(b*p, t, d)
    z = layer.layer_norm1(z)
    attn = layer.self_attn
    h, dh = attn.num_heads, attn.head_dim
    q, k, v = [
        projection(z).reshape(b*p, t, h, dh).transpose(1, 2)
        for projection in (attn.q_proj, attn.k_proj, attn.v_proj)
    ]
    y = F.scaled_dot_product_attention(
        q, k, v, is_causal=True, scale=attn.scale,
        dropout_p=attn.dropout if layer.training else 0.0,
    )
    y = y.transpose(1, 2).reshape(b*p, t, d)
    # Attention output projection: stays in the vision feature space.
    y = attn.out_proj(y).reshape(b, p, t, d).permute(0, 2, 1, 3)
    return x + y
# endregion temporal


# region video
def encode_memory_clip(vlm, clip, every=4):
    """clip: [B,T,3,H,W], oldest first, current frame last.
    Returns [B,P,D_model]; internal hidden width is D_vision.
    Expects a PaliGemma-compatible vision tower and projector.
    """
    if every < 1:
        raise ValueError("every must be positive")
    b, t, c, h, w = clip.shape
    if t == 1:
        return vlm.get_image_features(clip[:, 0])
    tower = vlm.vision_tower.vision_model
    layers = tower.encoder.layers
    x = tower.embeddings(clip.reshape(b*t, c, h, w))
    x = x.to(layers[0].self_attn.q_proj.weight.dtype)
    p, d = x.shape[1:]
    x = x.reshape(b, t, p, d)
    temporal_ids = tuple(range(every - 1, len(layers), every))
    for i, layer in enumerate(layers):
        if x.ndim == 4:
            if i in temporal_ids:
                x = causal_temporal_layer(layer, x)
            x = layer(x.reshape(b*t, p, d),
                      attention_mask=None, output_attentions=False)[0]
            x = x.reshape(b, t, p, d)
            if temporal_ids and i == temporal_ids[-1]:
                # Drop history only after the final temporal + spatial block.
                # For 24 layers and every=4, this is the last vision block.
                x = x[:, -1]
        else:
            x = layer(x, attention_mask=None, output_attentions=False)[0]
    x = x[:, -1] if x.ndim == 4 else x
    # Vision-to-VLM projection: D_vision -> D_model; P tokens remain.
    return vlm.multi_modal_projector(tower.post_layernorm(x))
# endregion video


# region resampler
class HistoryResampler(nn.Module):
    """Appearance/motion token streams, jointly read by learned queries.
    Input [B,T,P,D] -> memory [B,M,D]; no recurrent state.
    """
    def __init__(self, dim, patches, max_frames, memory_tokens=32,
                 width=512, heads=8, use_motion_tokens=True):
        super().__init__()
        self.use_motion_tokens = use_motion_tokens
        self.in_proj = nn.Linear(dim, width)  # Shared by both streams.
        self.time = nn.Parameter(torch.randn(1, max_frames, 1, width) * .02)
        self.space = nn.Parameter(torch.randn(1, 1, patches, width) * .02)
        self.appearance_type = nn.Parameter(torch.randn(1, 1, 1, width) * .02)
        self.motion_type = nn.Parameter(torch.randn(1, 1, 1, width) * .02)
        self.queries = nn.Parameter(torch.randn(1, memory_tokens, width) * .02)
        self.q_norm, self.k_norm = nn.LayerNorm(width), nn.LayerNorm(width)
        self.attn = nn.MultiheadAttention(width, heads, batch_first=True)
        self.ff_norm = nn.LayerNorm(width)
        self.ff = nn.Sequential(nn.Linear(width, 4*width), nn.GELU(),
                                nn.Linear(4*width, width))
        self.out_norm = nn.LayerNorm(width)
        self.out_proj = nn.Linear(width, dim)

    def _time_embedding(self, length, like):
        pos = self.time.squeeze(2)
        if length != pos.shape[1]:
            pos = F.interpolate(pos.transpose(1, 2).float(), size=length,
                                mode="linear", align_corners=False).transpose(1, 2)
        return pos.unsqueeze(2).to(device=like.device, dtype=like.dtype)

    def _token_bank(self, patches, valid_frames):
        b, t, p, _ = patches.shape
        valid = valid_frames.to(device=patches.device, dtype=torch.bool)
        z = self.in_proj(patches)
        pos = self._time_embedding(t, z) + self.space

        # Appearance: preserve what each spatial patch contains.
        appearance = z + pos + self.appearance_type
        streams = [appearance]
        masks = [valid[:, :, None].expand(-1, -1, p)]

        if self.use_motion_tokens:
            # Motion cue: difference BEFORE adding positions/type embeddings.
            delta = torch.zeros_like(z)
            delta[:, 1:] = z[:, 1:] - z[:, :-1]
            motion = delta + pos + self.motion_type
            pair_valid = torch.zeros_like(valid)
            pair_valid[:, 1:] = valid[:, 1:] & valid[:, :-1]
            streams.append(motion)
            masks.append(pair_valid[:, :, None].expand(-1, -1, p))

        # Two streams are concatenated, not summed or pooled independently.
        values = torch.cat(streams, dim=2).reshape(b, -1, z.shape[-1])
        mask = torch.cat(masks, dim=2).reshape(b, -1)
        return values, mask

    def forward(self, patches, valid_frames):
        values, mask = self._token_bank(patches, valid_frames)
        empty = ~mask.any(dim=1)
        mask = mask.clone()
        mask[empty, 0] = True  # Avoid all-masked attention producing NaNs.
        q = self.queries.expand(patches.shape[0], -1, -1).to(values)
        pooled, _ = self.attn(self.q_norm(q), self.k_norm(values), values,
                             key_padding_mask=~mask, need_weights=False)
        memory = q + pooled
        memory = memory + self.ff(self.ff_norm(memory))
        memory = self.out_proj(self.out_norm(memory))
        return memory.masked_fill(empty[:, None, None], 0)
# endregion resampler


# region prefix
def build_prefix(current_images, memory, language,
                 image_valid, memory_valid, language_valid):
    """All tokens are projected to the same feature width.
    True means valid in returned padding mask.
    """
    tokens = torch.cat([current_images, memory, language], dim=1)
    valid = torch.cat([image_valid, memory_valid, language_valid], dim=1)
    # Feed these to the policy's existing prefix/Action Expert interface.
    # The policy must still construct its own prefix-to-action attention mask.
    return tokens, valid
# endregion prefix
