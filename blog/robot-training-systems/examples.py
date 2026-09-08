"""Teaching example, not the implementation used in the measured runs.

One batch = one successful optimizer update here. No distributed I/O,
accumulation, skipped updates, stochastic transforms or atomic saves.
"""
from dataclasses import dataclass


@dataclass
class Progress:
    order_id: str
    next_batch: int = 0

    def complete(self, batch_id):
        if batch_id != self.next_batch:
            raise ValueError("Commit batches in their planned order")
        self.next_batch += 1


def remaining(plan, progress, order_id):
    if progress.order_id != order_id:
        raise ValueError("The restored progress belongs to a different order")
    if not 0 <= progress.next_batch <= len(plan):
        raise ValueError("The saved batch position is outside this plan")
    return plan[progress.next_batch:]


if __name__ == "__main__":
    plan = [(0, 1), (2, 3), (4, 5), (6, 7)]
    progress = Progress("example-order-v1")
    prefetched = plan[:]  # Reading everything is not committing everything.
    progress.complete(0)
    progress.complete(1)
    restored = Progress(**vars(progress))
    assert remaining(plan, restored, "example-order-v1") == [(4, 5), (6, 7)]
    assert len(prefetched) == 4 and restored.next_batch == 2
    print("Resume starts at batch 3, not after the prefetched batches.")
