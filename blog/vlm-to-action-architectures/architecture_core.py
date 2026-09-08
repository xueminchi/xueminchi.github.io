"""Small, CPU-testable teaching components for the architecture report.

These are not complete policies or a training release. They preserve the
reviewed pooling, zero-gated modulation and joint-attention computations.
Production loading, distributed execution and most input guards are omitted.
"""
import math
import torch
from torch import nn
from torch.nn import functional as F


class QueryPool(nn.Module):
    """[B, L, vlm_width] -> [B, queries, width]; True means a valid token."""

    def __init__(self, vlm_width, width=512, queries=8, eps=1e-6):
        super().__init__()
        self.width = width
        self.input_norm = nn.RMSNorm(vlm_width, eps=eps)
        self.key = nn.Linear(vlm_width, width, bias=False)
        self.value = nn.Linear(vlm_width, width, bias=False)
        self.query = nn.Parameter(torch.randn(queries, width) * 0.02)
        self.query_norm = nn.RMSNorm(width, eps=eps)
        self.key_norm = nn.RMSNorm(width, eps=eps)
        self.output_norm = nn.RMSNorm(width, eps=eps)

    def forward(self, context, valid):
        # At least one context token must be valid in each example.
        if not valid.any(-1).all():
            raise ValueError("An example cannot have an empty valid context")
        z = self.input_norm(context)
        k, v = self.key_norm(self.key(z)), self.value(z)
        q = self.query_norm(self.query).expand(context.shape[0], -1, -1)
        logits = torch.einsum("bqd,bkd->bqk", q.float(), k.float())
        logits = logits / math.sqrt(self.width)
        weights = logits.masked_fill(~valid[:, None], -torch.inf).softmax(-1)
        pooled = torch.einsum("bqk,bkd->bqd", weights.to(v.dtype), v)
        return self.output_norm(pooled)


def make_condition(pool, state_encoder, time_encoder, condition_encoder,
                   context, valid, state, time_embedding):
    # The eight pooled tokens are FLATTENED, not appended as a policy prefix.
    pooled = pool(context, valid).flatten(1)
    parts = (pooled, state_encoder(state), time_encoder(time_embedding))
    return condition_encoder(torch.cat(parts, dim=-1))  # [B, action_width]


class ActionSelfAttention(nn.Module):
    def __init__(self, width, heads):
        super().__init__()
        self.heads = heads
        self.qkv = nn.Linear(width, 3 * width)
        self.output = nn.Linear(width, width)

    def forward(self, x):
        b, n, d = x.shape
        qkv = self.qkv(x).reshape(b, n, 3, self.heads, d // self.heads)
        q, k, v = (z.transpose(1, 2) for z in qkv.unbind(2))
        y = F.scaled_dot_product_attention(q, k, v, dropout_p=0.0)
        return self.output(y.transpose(1, 2).reshape(b, n, d))


class SwiGLU(nn.Module):
    def __init__(self, width, intermediate):
        super().__init__()
        self.gate = nn.Linear(width, intermediate)
        self.up = nn.Linear(width, intermediate)
        self.down = nn.Linear(intermediate, width)

    def forward(self, x):
        return self.down(F.silu(self.gate(x)) * self.up(x))


class PooledActionBlock(nn.Module):
    """Action self-attention + FFN, modulated by one pooled condition."""

    def __init__(self, width=512, heads=8, intermediate=2048):
        super().__init__()
        self.attention_norm = nn.RMSNorm(width, eps=1e-6)
        self.ffn_norm = nn.RMSNorm(width, eps=1e-6)
        self.attention = ActionSelfAttention(width, heads)
        self.ffn = SwiGLU(width, intermediate)
        self.modulation = nn.Linear(width, 6 * width)
        nn.init.zeros_(self.modulation.weight)
        nn.init.zeros_(self.modulation.bias)

    def forward(self, x, condition):
        a_shift, a_scale, a_gate, f_shift, f_scale, f_gate = (
            self.modulation(condition).chunk(6, -1))
        z = self.attention_norm(x) * (1 + a_scale[:, None]) + a_shift[:, None]
        x = x + a_gate[:, None] * self.attention(z)
        z = self.ffn_norm(x) * (1 + f_scale[:, None]) + f_shift[:, None]
        return x + f_gate[:, None] * self.ffn(z)


def joint_mask(condition_valid, action_tokens):
    """SDPA boolean mask: True allows attention; no causal separation."""
    b, c = condition_valid.shape
    action_valid = torch.ones(b, action_tokens, dtype=torch.bool,
                              device=condition_valid.device)
    valid = torch.cat((condition_valid, action_valid), -1)
    mask = valid[:, None, None, :].expand(b, 1, c + action_tokens,
                                       c + action_tokens).clone()
    # Padded condition queries are discarded; match their safe self-edge.
    diagonal = torch.arange(c, device=condition_valid.device)
    mask[:, 0, diagonal, diagonal] = True
    return mask


class JointAttention(nn.Module):
    """Dual-stream projections, ONE bidirectional attention operation.

    Inputs are already normalized (and action positions time-modulated).
    Residual additions and the two streams' FFNs live in the enclosing block.
    """

    def __init__(self, width, heads):
        super().__init__()
        self.heads = heads
        self.condition_qkv = nn.Linear(width, 3 * width)
        self.action_qkv = nn.Linear(width, 3 * width)
        self.condition_output = nn.Linear(width, width)
        self.action_output = nn.Linear(width, width)

    def _qkv(self, x, projection):
        b, n, d = x.shape
        qkv = projection(x).reshape(b, n, 3, self.heads, d // self.heads)
        return tuple(z.transpose(1, 2) for z in qkv.unbind(2))

    def forward(self, condition, action, mask):
        qc, kc, vc = self._qkv(condition, self.condition_qkv)
        qa, ka, va = self._qkv(action, self.action_qkv)
        q, k, v = (torch.cat(pair, dim=2)
                   for pair in ((qc, qa), (kc, ka), (vc, va)))
        y = F.scaled_dot_product_attention(q, k, v, attn_mask=mask,
                                           dropout_p=0.0)
        y = y.transpose(1, 2).flatten(2)
        c = condition.shape[1]
        # Both condition and action are updated; not action-only cross-attn.
        return (self.condition_output(y[:, :c]),
                self.action_output(y[:, c:]))
