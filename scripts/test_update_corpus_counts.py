#!/usr/bin/env python3
"""Negative controls for diagrams/_update_corpus_counts.py.

The script this tests exists because two gates reported the diagrams clean
while one of them printed a corpus size that was 46% wrong. Freshness and
truth are different questions, and only the first was ever asked.

So these controls are mostly about the gate's ability to FAIL:

  * a reordered chart fails at any tolerance;
  * a large numeric lag fails;
  * a small numeric lag does not, because the corpus grows nightly and a gate
    that fires every night is a gate everyone learns to ignore;
  * a theme the chart has no row for stops the run instead of being dropped
    silently;
  * the theme parser stops at the next heading — it did not, and the
    "Frequent speakers" list below it parsed as twelve extra themes.

Run: python3 scripts/test_update_corpus_counts.py
"""
from __future__ import annotations

import json
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO / "diagrams"))

import _update_corpus_counts as uc  # noqa: E402

THEME_MAP_SRC = REPO / "diagrams" / "04-theme-corpus-map.excalidraw"

STATS_FIXTURE = """# Corpus Stats

- Total notes: 1000
- Transcript status mix: {'auto_en_orig': 1000}

## Theme counts

- Coding Agents: 600
- Evals & Reliability: 300
- Agent Architecture: 250
- Org Design & Leadership: 200
- MCP & Tooling: 150
- RAG & Retrieval: 100
- Models & Inference: 90
- Voice & Realtime: 50
- Security & Guardrails: 20
- General AI Engineering: 4

## Frequent speakers

- Laurie Voss: 7
- Philipp Schmid: 6
"""


def write_stats(directory: Path, body: str = STATS_FIXTURE) -> Path:
    path = directory / "Corpus Stats.md"
    path.write_text(body, encoding="utf-8")
    return path


def fixture_themes() -> dict[str, int]:
    """The ten fixture themes, parsed through the real parser."""
    with tempfile.TemporaryDirectory() as tmp:
        _, themes = uc.read_stats(write_stats(Path(tmp)))
    return themes


class ThemeParsing(unittest.TestCase):
    def test_speakers_section_is_not_read_as_themes(self):
        with tempfile.TemporaryDirectory() as tmp:
            stats = write_stats(Path(tmp))
            total, themes = uc.read_stats(stats)
        self.assertEqual(total, 1000)
        self.assertEqual(len(themes), 10)
        self.assertNotIn("Laurie Voss", themes)

    def test_every_theme_in_the_real_stats_file_has_a_row(self):
        # The live file is the one the gate runs against; an unmapped theme
        # there would stop CI, so it is worth asserting here instead.
        _, themes = uc.read_stats()
        self.assertEqual(sorted(themes), sorted(uc.THEME_MAP))


class Verdict(unittest.TestCase):
    def test_in_sync_passes(self):
        ok, reason = uc.verdict([], [], 1000, 1000, 0.05)
        self.assertTrue(ok)
        self.assertEqual(reason, "in sync")

    def test_small_numeric_lag_passes(self):
        ok, _ = uc.verdict(["row 3 count: '98' -> '100'"], [], 990, 1000, 0.05)
        self.assertTrue(ok)

    def test_large_numeric_lag_fails(self):
        ok, reason = uc.verdict(["row 3 count: '98' -> '400'"], [], 600, 1000, 0.05)
        self.assertFalse(ok)
        self.assertIn("behind", reason)

    def test_a_structural_problem_fails_even_with_no_numeric_lag(self):
        # The whole point: the count can be perfect while the chart points the
        # wrong chapter label at the wrong bar.
        ok, reason = uc.verdict([], ["row 1 points at the wrong chapter"], 1000, 1000, 0.99)
        self.assertFalse(ok)
        self.assertIn("structural", reason)

    def test_unreadable_headline_fails(self):
        ok, reason = uc.verdict(["row 1 count: '1' -> '2'"], [], None, 1000, 0.99)
        self.assertFalse(ok)
        self.assertIn("unreadable", reason)


class StructuralProblems(unittest.TestCase):
    """What counts as the chart's shape being wrong, and what is only lag."""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.copy = Path(self.tmp.name) / THEME_MAP_SRC.name
        shutil.copy(THEME_MAP_SRC, self.copy)
        self.themes = fixture_themes()
        uc.update_theme_map(self.copy, 1000, self.themes)
        self.addCleanup(self.tmp.cleanup)

    def test_a_chart_drawn_from_these_counts_has_no_problems(self):
        self.assertEqual(uc.structural_problems(self.copy, self.themes, 0.05), [])

    def test_a_near_tie_swap_is_lag_not_structure(self):
        # The live corpus has Evals & Reliability at 838 and Agent Architecture
        # at 834. Four more talks flip their rows. That must not fail a gate
        # that runs on every corpus PR and opens an issue every night.
        nudged = dict(self.themes)
        nudged["Agent Architecture"] = nudged["Evals & Reliability"] + 3
        self.assertEqual(uc.structural_problems(self.copy, nudged, 0.05), [])

    def test_a_real_rank_change_is_structural(self):
        # The defect this gate was written for: the chart's biggest bar named
        # a theme that had fallen to fourth.
        moved = dict(self.themes)
        moved["Org Design & Leadership"] = moved["Coding Agents"] * 3
        problems = uc.structural_problems(self.copy, moved, 0.05)
        self.assertTrue(any("Org Design & Leadership" in p for p in problems), problems)

    def test_a_row_labelled_with_another_chapter_is_structural(self):
        doc = json.loads(self.copy.read_text(encoding="utf-8"))
        uc.by_id(doc)["cl3"]["text"] = "Chapter 9 · The AI-Native Organization"
        uc.write_doc(self.copy, doc)
        problems = uc.structural_problems(self.copy, self.themes, 0.99)
        self.assertTrue(any("row 3" in p for p in problems), problems)

    def test_a_miscoloured_row_is_structural(self):
        # The bug found in the shipped drawing: a green bar and a green count
        # under a grey "Background" label.
        doc = json.loads(self.copy.read_text(encoding="utf-8"))
        uc.by_id(doc)["bar10"]["backgroundColor"] = "#a7f3d0"
        uc.write_doc(self.copy, doc)
        problems = uc.structural_problems(self.copy, self.themes, 0.99)
        self.assertTrue(any("fill" in p for p in problems), problems)

    def test_a_theme_the_chart_never_heard_of_is_structural(self):
        added = dict(self.themes)
        added["Robotics & Embodied"] = 7
        problems = uc.structural_problems(self.copy, added, 0.99)
        self.assertTrue(any("Robotics & Embodied" in p for p in problems), problems)

    def test_the_live_chart_agrees_with_the_live_stats(self):
        _, themes = uc.read_stats()
        self.assertEqual(uc.structural_problems(THEME_MAP_SRC, themes, 0.05), [])


class ThemeMapRewrite(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.copy = Path(self.tmp.name) / THEME_MAP_SRC.name
        shutil.copy(THEME_MAP_SRC, self.copy)
        self.addCleanup(self.tmp.cleanup)

    def rows(self) -> list[tuple[str, str, float]]:
        els = uc.by_id(json.loads(self.copy.read_text(encoding="utf-8")))
        return [
            (els[f"nm{i}"]["text"], els[f"ct{i}"]["text"], els[f"bar{i}"]["width"])
            for i in range(1, 11)
        ]

    def test_rows_land_in_descending_order(self):
        uc.update_theme_map(self.copy, 1000, fixture_themes())
        counts = [int(c) for _, c, _ in self.rows()]
        self.assertEqual(counts, sorted(counts, reverse=True))

    def test_second_run_writes_nothing(self):
        themes = fixture_themes()
        uc.update_theme_map(self.copy, 1000, themes)
        before = self.copy.read_bytes()
        again = uc.update_theme_map(self.copy, 1000, themes)
        self.assertEqual(again, [])
        self.assertEqual(self.copy.read_bytes(), before)

    def test_smallest_bar_stays_visible_but_prints_its_real_count(self):
        uc.update_theme_map(self.copy, 1000, fixture_themes())
        _, count, width = self.rows()[-1]
        self.assertEqual(count, "4")
        self.assertGreaterEqual(width, uc.MIN_BAR_W)

    def test_an_unmapped_theme_stops_the_run(self):
        themes = fixture_themes()
        themes["Robotics & Embodied"] = 42
        del themes["General AI Engineering"]
        with self.assertRaises(SystemExit) as caught:
            uc.update_theme_map(self.copy, 1000, themes)
        self.assertIn("Robotics & Embodied", str(caught.exception))

    def test_an_eleventh_theme_stops_the_run_rather_than_losing_a_row(self):
        themes = fixture_themes()
        uc.THEME_MAP["Spare Theme"] = (uc.BACKGROUND_LABEL, "background")
        self.addCleanup(uc.THEME_MAP.pop, "Spare Theme", None)
        themes["Spare Theme"] = 11
        with self.assertRaises(SystemExit) as caught:
            uc.update_theme_map(self.copy, 1000, themes)
        self.assertIn("10 rows", str(caught.exception))


if __name__ == "__main__":
    unittest.main(verbosity=2)
