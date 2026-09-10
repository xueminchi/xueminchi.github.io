"""Educational excerpts, reduced from the inspected OpenWAM execution paths.

Not a production drop-in or a benchmark. Joint cache assumes two active streams,
one fixed conditioning window, no classifier-free guidance and batch size one.
Create a fresh cache for every action chunk. The caller owns the timestep grid.
Run the inference caller under torch.inference_mode().
"""

import torch
import torch.nn.functional as F


# --- compile_joint_layers ---
def compile_joint_layers(driver, enabled=True):
    """Compile the layer stack of ONE forward, not the full denoising loop."""
    def run_layers(video_state, action_state):
        return driver.run_joint_loop(
            video_state,
            action_state,
            use_gradient_checkpointing=False,
            use_gradient_checkpointing_offload=False,
        )

    if not enabled:
        return run_layers
    return torch.compile(run_layers, mode="default", dynamic=False)


# --- JointVelocityCache ---
class JointVelocityCache:
    """Require video AND action stability before skipping a joint forward."""
    def __init__(self, threshold=0.99, max_skips=3):
        self.threshold = threshold
        self.max_skips = max_skips
        self.previous = None
        self.current = None
        self.skips = 0

    def can_reuse(self):
        if self.previous is None or self.current is None:
            return False
        if self.skips >= self.max_skips:
            return False

        # Compare the last two EVALUATED predictions, separately per stream.
        for old, new in zip(self.previous, self.current):
            similarity = F.cosine_similarity(
                old.flatten().float().unsqueeze(0),
                new.flatten().float().unsqueeze(0),
                dim=1,
            ).item()
            if similarity < self.threshold:
                return False

        self.skips += 1
        return True

    def update(self, video_velocity, action_velocity):
        self.previous = self.current
        # Own the storage: detach alone would still alias forward outputs.
        self.current = (
            video_velocity.detach().clone(),
            action_velocity.detach().clone(),
        )
        self.skips = 0


# --- joint_denoise_step ---
def joint_denoise_step(
    forward, z, a, t_video, t_action,
    delta_sigma_video, delta_sigma_action, cache, clean_prefix,
):
    """Reduced Euler step; forward is an adapter around the joint model."""
    if cache.can_reuse():
        video_velocity, action_velocity = cache.current
    else:
        video_velocity, action_velocity = forward(z, a, t_video, t_action)
        cache.update(video_velocity, action_velocity)

    # Cache hits skip forward(), NOT the scheduled state updates.
    z = z + delta_sigma_video * video_velocity
    a = a + delta_sigma_action * action_velocity
    z[:, :, :clean_prefix.shape[2]] = clean_prefix
    return z, a
