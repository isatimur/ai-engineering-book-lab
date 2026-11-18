#!/usr/bin/env python3
"""Negative controls for diagrams/covers/_grow_specimen.py.

The covers are grown from `01_Videos/`, so they are the same kind of artifact
as the corpus diagrams: correct the day they are made and quietly wrong
afterwards. The gate exists for the same reason, and these controls are
mostly about its ability to FAIL:

  * a plate grown from a corpus that has since moved a long way fails;
  * a plate a few talks behind does not, because the ingest runs most nights
    and a gate that fires every night is a gate everyone learns to ignore;
  * a theme with no colour assigned fails rather than rendering as grey;
  * a plate grown as one organism and relabelled as another fails;
  * a missing plate fails.

They also pin the two facts about the drawing that are easy to break by
accident: every talk gets exactly one mark, and the marks carry no text.

Run: python3 scripts/test_grow_specimen.py
"""
from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO / "diagrams" / "covers"))

import _grow_specimen as gs  # noqa: E402

FIXTURE = [
    ("Coding Agents", 1200),
    ("Coding Agents", 2400),
    ("Evals & Reliability", 900),
    ("Agent Architecture", 1800),
    ("RAG & Retrieval", 600),
    ("Voice & Realtime", 3000),
]


def manifest_for(notes: int, forms: dict[str, str] | None = None) -> dict:
    return {
        "notes": notes,
        "grown_on": "2026-11-18",
        "forms": forms if forms is not None else dict(gs.SPECIMENS),
        "theme_mix": {},
    }


class CorpusReading(unittest.TestCase):
    def test_the_live_corpus_reads_with_every_note_tagged(self):
        marks = gs.read_corpus()
        self.assertGreater(len(marks), 1000)
        untagged = [i for i, (theme, _) in enumerate(marks) if not theme]
        self.assertEqual(untagged, [], f"{len(untagged)} notes carry no theme tag")

    def test_every_live_theme_has_an_ink(self):
        # An unmapped theme does not crash; it silently renders as grey, so
        # it has to be caught here and in the gate rather than on the cover.
        mix = gs.theme_mix(gs.read_corpus())
        self.assertEqual([t for t in mix if t not in gs.THEME_INK], [])

    def test_primary_theme_mix_is_not_the_all_tags_tally(self):
        # These two numbers are different on purpose and have been confused
        # before. Coding Agents is ~906 as a primary theme and ~945 as a tag.
        mix = gs.theme_mix(gs.read_corpus())
        stats = (REPO / "99_Meta" / "Corpus Stats.md").read_text(encoding="utf-8")
        tagged = int(
            [ln for ln in stats.splitlines() if ln.startswith("- Coding Agents:")][0]
            .split(":")[1]
            .strip()
        )
        self.assertLess(mix["Coding Agents"], tagged)


class Drawing(unittest.TestCase):
    def test_every_form_draws_one_mark_per_talk(self):
        for name, form in gs.FORMS.items():
            with self.subTest(form=name):
                body = form(FIXTURE)
                drawn = sum(
                    1 for el in body if "<ellipse" in el or el.startswith("<path")
                )
                self.assertGreaterEqual(drawn, len(FIXTURE), name)

    def test_no_form_emits_text(self):
        # The plates are deliberately wordless: scripts/compose-cover.sh sets
        # the type from the data files. A <text> element here would put an
        # unproofread, unsourced string on a printed cover.
        for name, form in gs.FORMS.items():
            with self.subTest(form=name):
                markup = gs.svg(form(FIXTURE))
                self.assertNotIn("<text", markup)
                self.assertNotIn("<tspan", markup)

    def test_the_paper_gradient_survives_into_the_markup(self):
        # ImageMagick's own SVG renderer drops this gradient and paints the
        # paper black. The raster step uses rsvg-convert for that reason;
        # this pins the gradient the renderer is chosen to support.
        markup = gs.svg(gs.FORMS["rosette"](FIXTURE))
        self.assertIn('<radialGradient id="paper"', markup)
        self.assertIn('fill="url(#paper)"', markup)

    def test_marks_land_inside_the_plate(self):
        for name, form in gs.FORMS.items():
            with self.subTest(form=name):
                markup = gs.svg(form(FIXTURE))
                self.assertIn(f'width="{gs.W}"', markup)
                self.assertIn(f'height="{gs.H}"', markup)


class Gate(unittest.TestCase):
    """What counts as the plates being stale, and what is only lag."""

    def test_a_few_new_talks_are_lag_not_staleness(self):
        # The ingest added one talk the night this was written. A gate that
        # failed on that would be switched off within a week.
        now = len(FIXTURE) * 200
        drawn = now - 3
        self.assertLessEqual(abs(now - drawn) / now, gs.TOLERANCE)

    def test_a_corpus_that_has_moved_a_long_way_is_not_lag(self):
        now, drawn = 1469, 1100
        self.assertGreater(abs(now - drawn) / now, gs.TOLERANCE)

    def test_an_unmapped_theme_is_structural(self):
        marks = FIXTURE + [("Robotics & Embodied", 700)]
        found = gs.problems(manifest_for(len(marks)), marks)
        self.assertTrue(any("Robotics & Embodied" in p for p in found), found)

    def test_a_plate_relabelled_as_another_organism_is_structural(self):
        forms = dict(gs.SPECIMENS)
        forms["the-shape-of-the-work"] = "rosette"
        found = gs.problems(manifest_for(len(FIXTURE), forms), FIXTURE)
        self.assertTrue(any("the-shape-of-the-work" in p for p in found), found)

    def test_a_missing_plate_is_structural(self):
        with tempfile.TemporaryDirectory() as tmp:
            original = gs.PLATES
            try:
                gs.PLATES = Path(tmp)
                found = gs.problems(manifest_for(len(FIXTURE)), FIXTURE)
            finally:
                gs.PLATES = original
        self.assertTrue(any("no grown plate" in p for p in found), found)

    def test_the_live_plates_pass_their_own_gate(self):
        marks = gs.read_corpus()
        manifest = json.loads(gs.MANIFEST.read_text(encoding="utf-8"))
        self.assertEqual(gs.problems(manifest, marks), [])


if __name__ == "__main__":
    unittest.main(verbosity=2)
