#!/usr/bin/env python3
"""Negative controls for the KB index's "latest batch" lines.

The index carries a count and a Recent notes list for the newest batch. Both
used to be built from `batch_notes`, the list of notes the running invocation
had just created. Nothing else in the file works that way, and it meant:

  * a rebuild passes batch_notes=[], so the count became 0 and the list went
    away entirely;
  * the committed artifact was therefore only correct in the minutes after a
    live ingest that happened to create something.

That is the same defect as the channel count in test_channel_overview_count:
one label standing for two different quantities, resolved by which machine ran
the generator last. It surfaced the first time anything rebuilt the artifacts
on a clean tree.

The fix derives the section from the corpus, using the playlist range in the
batch name. These controls keep it derived.

Run: python3 99_Meta/scripts/test_kb_index_batch_section.py
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

INDEX = ROOT / "99_Meta" / "AI Engineer KB Index.md"


def record(index: int, name: str | None = None) -> ing.NoteRecord:
    return ing.NoteRecord(
        note_name=name or f"{index}-vid{index}-a-talk",
        title=f"A Talk #{index}",
        playlist_index=index,
        themes=["Coding Agents"],
        transcript_status="auto_en_orig",
        summary="",
    )


class RangeNames(unittest.TestCase):
    """The form both automated producers emit."""

    def setUp(self):
        self.corpus = [record(i) for i in (1640, 1645, 1648, 1700)]

    def test_a_rebuild_sees_what_the_live_run_saw(self):
        # The regression: identical output whether or not this invocation
        # created anything. Live write and later rebuild have to agree.
        live = ing._batch_section(
            self.corpus, [Path("1645-vid1645-a-talk.md")], "recent-1645-1652", INDEX
        )
        rebuild = ing._batch_section(self.corpus, [], "recent-1645-1652", INDEX)
        self.assertEqual(live, rebuild)

    def test_the_count_is_the_corpus_not_the_run(self):
        count, entries = ing._batch_section(self.corpus, [], "recent-1640-1648", INDEX)
        self.assertEqual(count, 3)
        self.assertEqual(len(entries), 3)

    def test_notes_outside_the_range_stay_out(self):
        # 1645 and 1648 are inside; 1640 is below it and 1700 above.
        count, entries = ing._batch_section(self.corpus, [], "recent-1645-1652", INDEX)
        joined = "".join(entries)
        self.assertEqual(count, 2)
        self.assertIn("#1645", joined)
        self.assertIn("#1648", joined)
        self.assertNotIn("#1640", joined)
        self.assertNotIn("#1700", joined)

    def test_entries_are_ordered_by_playlist_index(self):
        _, entries = ing._batch_section(self.corpus, [], "recent-1600-1700", INDEX)
        seen = [int(e.split("|#")[1].split(" ")[0]) for e in entries]
        self.assertEqual(seen, sorted(seen))

    def test_a_batch_the_corpus_missed_entirely_reports_zero(self):
        # Every video in the range was blocked or skipped. Zero is the truth
        # here, and it must not be confused with the drift case below.
        count, entries = ing._batch_section(self.corpus, [], "recent-1660-1670", INDEX)
        self.assertEqual((count, entries), (0, []))


class HandNamedBatches(unittest.TestCase):
    """resume-test, retry-unavailable-2026-07-26: no range to parse."""

    def setUp(self):
        self.corpus = [record(i) for i in (10, 11)]

    def test_a_live_run_uses_what_it_created(self):
        count, entries = ing._batch_section(
            self.corpus, [Path("10-vid10-a-talk.md")], "resume-test", INDEX
        )
        self.assertEqual(count, 1)
        self.assertIn("#10", entries[0])

    def test_a_rebuild_keeps_the_committed_lines(self):
        # Nothing created and nothing to recompute: preserve rather than
        # clobber. This is the branch that stops the drift returning.
        with tempfile.TemporaryDirectory() as tmp:
            prior = Path(tmp) / "index.md"
            prior.write_text(
                "# AI Engineer KB Index\n\n"
                "## Ingestion\n"
                "- Video notes created in this batch: 4\n\n"
                "## Recent notes\n\n"
                "- [[10-vid10-a-talk|#10 — A Talk #10]]\n"
            )
            count, entries = ing._batch_section(self.corpus, [], "resume-test", prior)
        self.assertEqual(count, 4)
        self.assertEqual(entries, ["- [[10-vid10-a-talk|#10 — A Talk #10]]"])

    def test_a_genuine_first_run_reports_nothing(self):
        with tempfile.TemporaryDirectory() as tmp:
            got = ing._batch_section(self.corpus, [], "resume-test", Path(tmp) / "none.md")
        self.assertEqual(got, (0, []))


class TheCommittedIndex(unittest.TestCase):
    def test_it_matches_what_the_generator_now_computes(self):
        # Catches the stale artifact directly, without a full rebuild.
        text = INDEX.read_text()
        named = ing.BATCH_RANGE_RE.search(text.split("Latest batch: ")[1].split("]]")[0])
        self.assertTrue(named, "the committed index names no range-form batch")
        batch = f"recent-{named.group(1)}-{named.group(2)}"
        records = ing.load_existing_notes()
        count, entries = ing._batch_section(records, [], batch, INDEX)

        claimed = ing.INDEX_BATCH_COUNT_RE.search(text)
        self.assertTrue(claimed, "the committed index has no batch count line")
        self.assertEqual(
            int(claimed.group(1)), count,
            f"committed index claims {claimed.group(1)} notes for {batch}; "
            f"the corpus holds {count}. Regenerate and commit.",
        )

        listed = [
            ln for ln in ing.INDEX_RECENT_RE.search(text).group(1).splitlines()
            if ln.startswith("- ")
        ]
        self.assertEqual(listed, entries)


if __name__ == "__main__":
    unittest.main(verbosity=2)
