#!/usr/bin/env python3
"""Negative controls for the Channel Overview's video count.

"Total videos in current inventory" is how many videos the CHANNEL holds.
That is not the number of notes we have ingested — the gap between them is
the backlog in #67, so conflating them hides exactly the thing the line is
for.

The snapshot carrying the real number lives at /tmp/ai-engineer-videos.jsonl,
so it is present on the laptop that ran the watcher and absent on every CI
runner. The generator used to fall back to the note count, which meant the
committed artifact said 1,514 when rebuilt on the laptop and 1,469 when
rebuilt on a runner: whoever rebuilt it last was "right", and the file could
never be reproducibly correct.

test_synthesis_pack_single_owner caught it the first time anything ran it on
a clean checkout. These controls keep it caught.

Run: python3 99_Meta/scripts/test_channel_overview_count.py
"""
from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
sys.path.insert(0, str(HERE))

import ingest_ai_engineer_videos as ing  # noqa: E402

OVERVIEW = ROOT / "99_Meta" / "Channel Overview.md"
ABSENT = "/tmp/definitely-not-here-ai-engineer-inventory.jsonl"


def committed_count() -> int:
    hit = ing.CHANNEL_TOTAL_RE.search(OVERVIEW.read_text())
    assert hit, "Channel Overview.md has no inventory count line"
    return int(hit.group(1))


class ChannelCount(unittest.TestCase):
    def setUp(self):
        self._real = ing.INVENTORY_DEFAULT
        self.addCleanup(lambda: setattr(ing, "INVENTORY_DEFAULT", self._real))
        self.notes = sorted((ROOT / "01_Videos").glob("*.md"))

    def test_the_count_is_not_the_note_count(self):
        # If these ever coincide the test below proves nothing, so say so
        # rather than passing vacuously.
        self.assertNotEqual(
            committed_count(), len(self.notes),
            "channel total equals the note count; the backlog is zero or the "
            "two measurements have been conflated again",
        )

    def test_a_runner_without_the_snapshot_keeps_the_committed_number(self):
        ing.INVENTORY_DEFAULT = ABSENT
        got = ing._channel_video_count(OVERVIEW, [None] * len(self.notes))
        self.assertEqual(got, committed_count())

    def test_a_runner_does_not_substitute_the_note_count(self):
        # The actual regression: a different quantity under the same label.
        ing.INVENTORY_DEFAULT = ABSENT
        got = ing._channel_video_count(OVERVIEW, [None] * len(self.notes))
        self.assertNotEqual(got, len(self.notes))

    def test_a_genuine_first_run_falls_back_to_the_notes(self):
        # No snapshot and no prior overview: under-report rather than invent.
        ing.INVENTORY_DEFAULT = ABSENT
        with tempfile.TemporaryDirectory() as tmp:
            got = ing._channel_video_count(Path(tmp) / "nope.md", [None] * 7)
        self.assertEqual(got, 7)

    def test_the_snapshot_wins_when_it_is_there(self):
        snapshot = Path(ing.INVENTORY_DEFAULT)
        if not snapshot.exists():
            self.skipTest("no local inventory snapshot to read")
        got = ing._channel_video_count(OVERVIEW, [None] * len(self.notes))
        self.assertEqual(got, len(ing.load_inventory(snapshot)))


if __name__ == "__main__":
    unittest.main(verbosity=2)
