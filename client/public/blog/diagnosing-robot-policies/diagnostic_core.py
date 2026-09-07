"""Teaching excerpts for Beyond Attention Maps (September 2026).

Adapted from the diagnostic implementations reviewed for this report.
No weights, dataset paths, simulator, robot transport or training loop.
Tests cover these CPU operations, not a pretrained policy reproduction.
"""
from contextlib import contextmanager

import torch
import torch.nn.functional as F


# BEGIN residual_metrics
def residual_metrics(x_before, update):
    """Per-token diagnostics for [batch, tokens, hidden] tensors.
    Aggregate over explicitly named layer/step/replan axes afterwards.
    """
    x, d = x_before.detach().float(), update.detach().float()
    x_rms = x.square().mean(-1).sqrt().clamp_min(1e-8)
    return {
        "update_ratio": d.square().mean(-1).sqrt() / x_rms,
        "cosine": F.cosine_similarity(x, d, dim=-1, eps=1e-8),
        "post_pre_scale": (x + d).square().mean(-1).sqrt() / x_rms,
    }
# END residual_metrics


# BEGIN selective_context
def post_attention_branches(block, x, context, context_mask,
                            shift, scale, gate, layer_id, keep=None):
    """x is AFTER the mixed-self-attention residual, not a block input.
    Call in BOTH video-prefill and action paths for the reported setting.
    shift/scale/gate must already broadcast to x: [B,S,D].
    """
    if context is not None and (keep is None or layer_id in keep):
        if context_mask is not None and context_mask.ndim == 3:
            context_mask = context_mask.unsqueeze(1)
        delta = block.cross_attn(
            block.norm3(x), context, ctx_mask=context_mask)
        x = x + delta
    # Only context cross-attention is conditional. FFN remains active.
    z = block.norm2(x) * (1 + scale) + shift
    return block.gate(x, gate, block.ffn(z))


KEEP_CONTEXT_LAYERS = {0, 24, 25, 26, 27, 28, 29}
# END selective_context


# BEGIN paired_probe
@torch.inference_mode()
def paired_visual_probe(infer, observation, image_key, first_image,
                        region_mask, noise):
    """Preprocessed image [B,C,H,W]; mask [B,1,H,W], True = replace.
    infer(obs, noise=...) returns raw action tensor [B,Horizon,D].
    Caller uses eval mode and deterministic preprocessing; infer is pure.
    """
    if region_mask.dtype != torch.bool:
        raise TypeError("region_mask must be boolean")
    changed = dict(observation)
    changed[image_key] = torch.where(
        region_mask, first_image, observation[image_key])
    clean = infer(observation, noise=noise.clone())
    altered = infer(changed, noise=noise.clone())
    repeat = infer(observation, noise=noise.clone())
    delta = altered.float() - clean.float()
    axes = tuple(range(1, clean.ndim))
    ratio = delta.square().mean(axes).sqrt() / (
        clean.float().square().mean(axes).sqrt().clamp_min(1e-8))
    return clean, altered, {
        "raw_action_change_ratio": ratio,
        "repeat_max_abs": (repeat - clean).abs().max().item(),
    }
# END paired_probe


# BEGIN activation_patch
@contextmanager
def patch_layer_input(layer, clean_hidden, positions):
    """Replace selected [B,S,D] layer-input residual positions.
    clean_hidden is recorded at this SAME layer on the clean prefix pass.
    Supports positional or keyword 'hidden_states'; removes hook on error.
    """
    def replace(_module, args, kwargs):
        keyword_input = "hidden_states" in kwargs
        x = kwargs["hidden_states"] if keyword_input else args[0]
        restored = x.clone()
        clean = clean_hidden.detach().to(device=x.device, dtype=x.dtype)
        restored[:, positions, :] = clean[:, positions, :]
        if keyword_input:
            return args, {**kwargs, "hidden_states": restored}
        return (restored, *args[1:]), kwargs

    handle = layer.register_forward_pre_hook(replace, with_kwargs=True)
    try:
        yield
    finally:
        handle.remove()


def directional_recovery(clean_action, corrupt_action, patched_action):
    target = (clean_action - corrupt_action).double().flatten()
    recovered = (patched_action - corrupt_action).double().flatten()
    denom = target.dot(target)
    if denom <= 1e-12:
        raise ValueError("No clean/corrupt gap to explain")
    return recovered.dot(target) / denom  # Not clipped to [0,1].
# END activation_patch
