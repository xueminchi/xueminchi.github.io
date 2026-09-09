"""Testable teaching examples, not the production MCAP reader or writer.

Standard library only. Synthetic inputs test stated invariants, not robot data.
Run: python examples.py
"""
from bisect import bisect_right
import hashlib
import json
import unittest


def camera_at_or_before(times_ns, anchor_ns, max_age_ns):
    # Caller has validated a nonempty, strictly increasing time index,
    # comparable clocks, and a common valid camera/control interval.
    i = bisect_right(times_ns, anchor_ns) - 1
    if i < 0 or anchor_ns - times_ns[i] > max_age_ns:
        raise ValueError("No valid causal camera observation")
    return i


def valid_action_window(t, offset, horizon, segment_start, segment_stop):
    """Half-open interval. No implicit end padding or segment crossing."""
    if offset < 0 or horizon <= 0 or segment_start >= segment_stop:
        raise ValueError("Invalid recipe or segment")
    if not segment_start <= t < segment_stop:
        raise ValueError("Anchor outside segment")
    start = t + offset
    stop = start + horizon
    if stop > segment_stop:
        raise ValueError("Action window crosses instruction boundary")
    return start, stop


def semantic_identity(source_hash, transform_version, payload_hashes):
    """Reduced example: real identity also binds schemas, clocks and indexes."""
    identity = {
        "source_hash": source_hash,
        "transform_version": transform_version,
        "payload_hashes": payload_hashes,
    }
    encoded = json.dumps(identity, sort_keys=True, separators=(",", ":"),
                         allow_nan=False).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


class Invariants(unittest.TestCase):
    def test_exact_timestamp_selects_that_frame(self):
        self.assertEqual(camera_at_or_before([10, 20, 30], 20, 5), 1)

    def test_selects_previous_not_future_frame(self):
        self.assertEqual(camera_at_or_before([10, 20, 30], 29, 10), 1)

    def test_missing_predecessor_is_rejected(self):
        with self.assertRaises(ValueError):
            camera_at_or_before([10, 20], 9, 10)

    def test_stale_observation_is_rejected(self):
        with self.assertRaises(ValueError):
            camera_at_or_before([10, 20], 99, 10)

    def test_action_window_respects_half_open_stop(self):
        self.assertEqual(valid_action_window(49, 1, 50, 0, 100), (50, 100))

    def test_future_window_must_not_cross_instruction(self):
        with self.assertRaises(ValueError):
            valid_action_window(50, 1, 50, 0, 100)

    def test_anchor_outside_segment_is_rejected(self):
        with self.assertRaises(ValueError):
            valid_action_window(-1, 1, 2, 0, 100)

    def test_identity_ignores_dictionary_insertion_order(self):
        left = semantic_identity("source", "v1", {"video": "a", "control": "b"})
        right = semantic_identity("source", "v1", {"control": "b", "video": "a"})
        self.assertEqual(left, right)

    def test_transform_version_changes_identity(self):
        self.assertNotEqual(semantic_identity("s", "v1", {"video": "a"}),
                            semantic_identity("s", "v2", {"video": "a"}))


if __name__ == "__main__":
    unittest.main(verbosity=2)
