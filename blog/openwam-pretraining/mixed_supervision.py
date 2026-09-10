"""Educational excerpts for the OpenWAM pretraining research note.

masked_action_loss preserves the inspected implementation's per-sample
normalization followed by an ALL-sample batch mean. It omits the legacy
time-only mask path. True means valid here, unlike action_is_pad in the source.

scatter_control illustrates an explicit slot contract, not the final run's
complete 80-D dataset adapter. Native values must already be finite, aligned,
and converted to the declared units, reference frames and rotation convention.
These excerpts are not a complete training recipe or benchmark reproduction.
"""
from __future__ import annotations

import torch


def masked_action_loss(pred, target, valid, timestep_weight):
    """pred/target/valid: [B, H, D]; timestep_weight: [B]."""
    if pred.shape != target.shape or valid.shape != pred.shape:
        raise ValueError("Prediction, target and validity shapes must match.")
    if pred.ndim != 3 or timestep_weight.shape != pred.shape[:1]:
        raise ValueError("Expected [B,H,D] values and [B] weights.")
    if valid.dtype != torch.bool:
        raise TypeError("valid must be a boolean mask.")
    squared_error = (pred.float() - target.float()).square()
    mask = valid.to(device=pred.device).float()
    numerator = (squared_error * mask).sum(dim=(1, 2))
    denominator = mask.sum(dim=(1, 2)).clamp_min(1)
    per_sample = numerator / denominator
    weight = timestep_weight.to(device=pred.device).float()
    return (per_sample * weight).mean()


def scatter_control(native, native_valid, slots, width=80):
    """Map already-converted values into declared slots; False = missing."""
    slots = tuple(slots)
    if native.shape != native_valid.shape or native.shape[-1] != len(slots):
        raise ValueError("Values, mask and slot list must agree.")
    if native_valid.dtype != torch.bool:
        raise TypeError("native_valid must be a boolean mask.")
    if len(set(slots)) != len(slots) or any(s < 0 or s >= width for s in slots):
        raise ValueError("Slots must be unique and inside the target width.")
    output = native.new_zeros((*native.shape[:-1], width))
    valid = torch.zeros_like(output, dtype=torch.bool)
    output[..., list(slots)] = native
    valid[..., list(slots)] = native_valid
    return output, valid
