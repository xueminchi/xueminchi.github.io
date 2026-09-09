"""Educational excerpts from OpenWAM's latent interface, not a training recipe.

Dependencies: PyTorch. Encoder/S-VAE modules must already be loaded.
The reduced helpers illustrate the inspected implementation, not a claim
that this exact code/config produced the manuscript's six reported scores.
"""
import torch
import torch.nn.functional as F


def pool_frame_features(x):
    """DINO/FLUX-style grid [B, C, T, H, W]; preserve observation frame 0."""
    b, c, t, h, w = x.shape
    if t < 1 or (t - 1) % 4:
        raise ValueError("Expected T = 1 + 4k frames.")
    first = x[:, :, :1]
    if t == 1:
        return first
    future = x[:, :, 1:].reshape(b, c, (t - 1) // 4, 4, h, w)
    return torch.cat([first, future.mean(dim=3)], dim=2)


def encode_vjepa_two_pass(video, vit_grid):
    """Illustrates the inspected V-JEPA video-mode path; vit_grid uses tubelet=2."""
    t = video.shape[2]
    if t < 1 or (t - 1) % 4:
        raise ValueError("Expected T = 1 + 4k frames.")
    first = video[:, :, :1]
    condition = vit_grid(torch.cat([first, first], dim=2))
    if t == 1:
        return condition
    clip = torch.cat([first, first, video[:, :, 1:]], dim=2)
    target = vit_grid(clip)[:, :, 1:]  # Drop the prepended pair's output.
    b, c, nt, h, w = target.shape
    target = target.reshape(b, c, nt // 2, 2, h, w).mean(dim=3)
    return torch.cat([condition, target], dim=2)


@torch.no_grad()
def compact_mean(features, svae):
    """Frozen trained S-VAE; spatial attention within each latent time slice."""
    b, c, t, h, w = features.shape
    x = features.permute(0, 2, 3, 4, 1).reshape(b * t, h * w, c)
    was_training = svae.training
    svae.eval()  # Disable dropout as well as posterior sampling.
    try:
        x = (x - svae.input_mean.to(x.dtype)) / svae.input_std.to(x.dtype)
        for block in svae.enc_blocks:
            x = block(x)
        params = svae.enc_proj(svae.enc_norm(x))
        mu = params.chunk(2, dim=-1)[0]  # Mean, not a random latent sample.
        return mu.reshape(b, t, h, w, svae.latent_dim).permute(0, 4, 1, 2, 3)
    finally:
        svae.train(was_training)


def adapter_loss(out, beta, cosine_weight=1.0):
    """Standalone S-VAE training, not the WAM action/world training loss.

    out contains standardized-space recon/target and posterior mu/logvar.
    Reduced default: no optional free-bits floor or logging.
    """
    recon, target = out["recon"].float(), out["target"].float()
    mu, logvar = out["mu"].float(), out["logvar"].float()
    mse = F.mse_loss(recon, target)
    cosine = 1.0 - F.cosine_similarity(recon, target, dim=1).mean()
    kl = (-0.5 * (1.0 + logvar - mu.square() - logvar.exp())).mean()
    return mse + cosine_weight * cosine + beta * kl
