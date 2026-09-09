"""Educational extraction of the OpenWAM dual-stream attention contract.

Not a complete policy or a replacement for the production implementation.
The caller owns per-stream normalization, timestep modulation, Q/K/V
projections, positional encoding, output projections and residual updates.
"""

import torch
import torch.nn.functional as F


def joint_attention(video_qkv, action_qkv, allow, num_heads):
    """Inputs: three [B, sequence, heads * head_dim] tensors per stream."""
    n_video = video_qkv[0].shape[1]
    n_action = action_qkv[0].shape[1]
    # Projections and positional encoding have ALREADY been applied.
    # Concatenate on sequence, not on feature width.
    q, k, v = [
        torch.cat([world, action], dim=1)
        for world, action in zip(video_qkv, action_qkv)
    ]
    batch, length, width = q.shape
    head_dim = width // num_heads

    def heads(x):
        return x.reshape(batch, length, num_heads, head_dim).transpose(1, 2)

    mixed = F.scaled_dot_product_attention(
        heads(q), heads(k), heads(v),
        attn_mask=allow,  # Boolean True means this key is visible.
        dropout_p=0.0,
    )
    mixed = mixed.transpose(1, 2).reshape(batch, length, width)
    world_out, action_out = mixed.split([n_video, n_action], dim=1)
    # Each stream next applies its OWN output projection and block suffix.
    return world_out.contiguous(), action_out.contiguous()


def mutual_mask(n_observed, n_future, n_action, device=None):
    """Rows are queries; columns are keys. Order: observed, future, action."""
    n_video = n_observed + n_future
    total = n_video + n_action
    allow = torch.zeros((total, total), dtype=torch.bool, device=device)
    # Clean observation tokens read only the clean observation.
    allow[:n_observed, :n_observed] = True
    # Noisy future-video and action tokens read all three groups.
    allow[n_observed:, :] = True
    return allow
