#!/usr/bin/env python3
"""Negative controls for the enrichment ratchet in corpus_health.py.

243 of 1,469 notes carry real analysis; the rest are the ingest's template.
What the ratio should be is a scope decision (issue #114) and is deliberately
not gated here. What IS gated is the one thing that never happens by itself:
an enriched note quietly becoming un-enriched again.

So these controls are mostly about the gate's ability to FAIL:

  * losing analysis fails, at any corpus size;
  * gaining it passes, and says to raise the floor;
  * adding stub notes does NOT fail, because the ingest does that most
    nights and a gate that fires every night is one everyone silences;
  * the stub detector reads the body boilerplate, not only the summary
    phrasing — the phrasing alone missed 40 notes.

Run: python3 99_Meta/scripts/test_corpus_quality_ratchet.py
"""
from __future__ import annotations

import json
import sys
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
sys.path.insert(0, str(HERE))

import corpus_health as ch  # noqa: E402

FLOOR_FILE = ROOT / "99_Meta" / "corpus-quality.json"

ENRICHED_NOTE = '''---
video_id: "abc"
summary: "Matt Pocock argues AI coding needs deep modules and TDD, grounding it in Ousterhout's definition of complexity."
---
# A talk

## Why it matters
- The most detailed practitioner account of operating at scale.
'''

STUB_BY_BODY = '''---
video_id: "def"
summary: "Jane Doe argues that spec-driven development is really about how teams constrain agents."
---
# A talk

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns.
- Useful as raw material for theme synthesis and future book chapters.
'''

STUB_BY_SUMMARY = '''---
video_id: "ghi"
summary: "Someone shares a practical take on A Talk. Key angle: touches MCP."
---
# A talk

## Why it matters
- Something specific and real about this particular talk.
'''


class StubDetection(unittest.TestCase):
    def test_an_enriched_note_is_not_a_stub(self):
        self.assertFalse(ch.is_stub(ENRICHED_NOTE))

    def test_template_body_is_a_stub_even_when_the_summary_reads_well(self):
        # This is the case the summary phrasebook missed on 40 real notes:
        # a second template the markers do not name, with the generator's
        # "Why it matters" bullets still underneath it.
        self.assertTrue(ch.is_stub(STUB_BY_BODY))

    def test_template_summary_is_a_stub_even_when_the_body_was_edited(self):
        self.assertTrue(ch.is_stub(STUB_BY_SUMMARY))

    def test_the_live_corpus_splits_the_way_the_floor_file_records(self):
        notes = sorted((ROOT / "01_Videos").glob("*.md"))
        stubs = sum(1 for n in notes if ch.is_stub(n.read_text(errors="replace")))
        enriched = len(notes) - stubs
        recorded = json.loads(FLOOR_FILE.read_text())
        self.assertGreaterEqual(enriched, recorded["enriched_floor"])
        # The corpus grows, so only the stub count may move upward.
        self.assertGreaterEqual(stubs, recorded["stub_at_record"])


class Ratchet(unittest.TestCase):
    def test_losing_analysis_fails(self):
        ok, reason = ch.enrichment_verdict(240, 243)
        self.assertFalse(ok)
        self.assertIn("fell", reason)

    def test_holding_steady_passes(self):
        ok, _ = ch.enrichment_verdict(243, 243)
        self.assertTrue(ok)

    def test_gaining_analysis_passes_and_asks_for_the_floor_to_rise(self):
        ok, reason = ch.enrichment_verdict(260, 243)
        self.assertTrue(ok)
        self.assertIn("raise the floor", reason)

    def test_a_night_of_new_stubs_does_not_trip_the_gate(self):
        # 48 talks were queued the day this was written. They will land as
        # stubs, dropping the enriched SHARE from 16.5% to 16.0% while the
        # enriched COUNT does not move. The gate must not care.
        enriched, before, after = 243, 1469, 1469 + 48
        self.assertLess(enriched / after, enriched / before)
        ok, _ = ch.enrichment_verdict(enriched, 243)
        self.assertTrue(ok, "new stubs must never fail the ratchet")

    def test_the_floor_file_is_readable_and_sane(self):
        floor = json.loads(FLOOR_FILE.read_text())
        self.assertGreater(floor["enriched_floor"], 0)
        self.assertEqual(
            floor["enriched_floor"] + floor["stub_at_record"],
            floor["notes_at_record"],
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
