"""Unit tests for panel_merge — small synthetic in-memory runs, no I/O, no API.

Run:  cd 99_Meta/scripts && python3 -m unittest test_panel_merge -v
(or:  python3 99_Meta/scripts/test_panel_merge.py)
"""
import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import panel_merge as pm


def _native(unit_id, dim, score, model, reasoning="r", evidence=None):
    return {
        "dim_name": dim,
        "unit_id": unit_id,
        "score_0_100": score,
        "label": pm._label_for(score),
        "reasoning": reasoning,
        "evidence_refs": evidence or [],
        "model": model,
        "cost_usd": 0.0,
        "derived": False,
    }


def _fake_run(run_id, model, *, p1, p2, voice, cost=0.01, snap="sha256:SAME"):
    """A 1-chapter fake run: 2 paragraph humanness units + 1 chapter voice unit.

    p1/p2/voice may be a score or None (to simulate a model that didn't score).
    """
    slug = "chapter-1-demo"
    scores = []
    if p1 is not None:
        scores.append(_native(f"paragraph:{slug}#L1-L1", "humanness", p1, model,
                               reasoning=f"{model} on p1", evidence=[f"ev:{model}:p1"]))
    if p2 is not None:
        scores.append(_native(f"paragraph:{slug}#L2-L2", "humanness", p2, model,
                               reasoning=f"{model} on p2"))
    if voice is not None:
        scores.append(_native(f"chapter:{slug}", "voice", voice, model,
                               reasoning=f"{model} voice"))
    # a rollup entry that MUST be ignored by the merge
    scores.append({
        "dim_name": "humanness", "unit_id": f"chapter:{slug}",
        "score_0_100": 999.0, "label": "strong", "reasoning": "rollup-noise",
        "evidence_refs": [], "model": "rollup", "cost_usd": 0.0, "derived": False,
    })
    # a derived broadcast entry that MUST be ignored
    scores.append({
        "dim_name": "voice", "unit_id": f"paragraph:{slug}#L1-L1",
        "score_0_100": 888.0, "label": "strong", "reasoning": "inherited",
        "evidence_refs": [], "model": model, "cost_usd": 0.0, "derived": True,
    })
    return {
        "run_id": run_id, "corpus_snapshot_hash": snap,
        "book_mash_version": "0.1.0", "dim_registry_version": "0.1.0",
        "total_cost_usd": cost, "status": "completed",
        "rollups": {"book": {"humanness": (p1 or 0), "voice": voice or 0}},
        "scores": scores,
    }


class TestMedian(unittest.TestCase):
    def setUp(self):
        # p1: all three score -> 60,80,100 -> median 80
        # p2: only one model scores -> error
        # voice: two of three score 70,90 -> median 80
        self.runs = [
            _fake_run("run-a", "openrouter:x/deepseek-chat", p1=60, p2=70, voice=70),
            _fake_run("run-b", "openrouter:y/qwen-72b", p1=80, p2=None, voice=None),
            _fake_run("run-c", "openrouter:z/llama-70b", p1=100, p2=None, voice=90),
        ]
        self.merged = pm.merge_panel(self.runs)
        self.by_key = {(s["unit_id"], s["dim_name"]): s for s in self.merged["scores"]}

    def test_median_of_60_80_100_is_80(self):
        e = self.by_key[("paragraph:chapter-1-demo#L1-L1", "humanness")]
        self.assertEqual(e["score_0_100"], 80.0)
        self.assertEqual(e["label"], "strong")
        self.assertTrue(e["model"].startswith("panel-median:"))

    def test_single_voter_is_error(self):
        e = self.by_key[("paragraph:chapter-1-demo#L2-L2", "humanness")]
        self.assertIsNone(e["score_0_100"])
        self.assertEqual(e["label"], "error")
        self.assertIn("1/3 models scored", e["reasoning"])

    def test_two_of_three_voters_emit_median(self):
        e = self.by_key[("chapter:chapter-1-demo", "voice")]
        self.assertEqual(e["score_0_100"], 80.0)  # median(70,90)

    def test_rollup_and_derived_entries_ignored(self):
        # the 999/888 noise must never appear in any merged score
        for s in self.merged["scores"]:
            self.assertNotIn(s["score_0_100"], (999.0, 888.0))

    def test_evidence_union(self):
        e = self.by_key[("paragraph:chapter-1-demo#L1-L1", "humanness")]
        # only run-a attached evidence on p1
        self.assertIn("ev:openrouter:x/deepseek-chat:p1", e["evidence_refs"])

    def test_model_field_lists_members(self):
        e = self.by_key[("paragraph:chapter-1-demo#L1-L1", "humanness")]
        self.assertIn("deepseek-chat", e["model"])
        self.assertIn("qwen-72b", e["model"])
        self.assertIn("llama-70b", e["model"])


class TestRollups(unittest.TestCase):
    def test_chapter_mean_and_book_mean(self):
        # p1 median 80, p2 error(null), voice median 80
        runs = [
            _fake_run("a", "openrouter:x/deepseek-chat", p1=60, p2=70, voice=70),
            _fake_run("b", "openrouter:y/qwen-72b", p1=80, p2=70, voice=90),
            _fake_run("c", "openrouter:z/llama-70b", p1=100, p2=70, voice=90),
        ]
        merged = pm.merge_panel(runs)
        rollups = pm.build_rollups(merged["scores"])
        chap = rollups["chapter:chapter-1-demo"]
        # humanness units: p1 median(60,80,100)=80 ; p2 median(70,70,70)=70 -> mean 75
        self.assertEqual(chap["humanness"], 75.0)
        # voice: single chapter unit median(70,90,90)=90 -> chapter mean 90
        self.assertEqual(chap["voice"], 90.0)
        # n_paragraphs = 2 distinct paragraph units
        self.assertEqual(chap["n_paragraphs"], 2)
        # book = mean over chapters (one chapter) -> same values
        self.assertEqual(rollups["book"]["humanness"], 75.0)
        self.assertEqual(rollups["book"]["voice"], 90.0)

    def test_error_unit_excluded_from_rollup_mean(self):
        # p2 scored by only 1 model -> error -> must NOT drag the chapter mean
        runs = [
            _fake_run("a", "openrouter:x/deepseek-chat", p1=80, p2=10, voice=80),
            _fake_run("b", "openrouter:y/qwen-72b", p1=80, p2=None, voice=80),
            _fake_run("c", "openrouter:z/llama-70b", p1=80, p2=None, voice=80),
        ]
        merged = pm.merge_panel(runs)
        rollups = pm.build_rollups(merged["scores"])
        # only p1 (80) contributes; p2 is a null error entry -> chapter humanness 80
        self.assertEqual(rollups["chapter:chapter-1-demo"]["humanness"], 80.0)
        # ...but p2 is still a real paragraph: a panel-error null score must NOT
        # drop it from n_paragraphs, or the published scorecard undercounts.
        self.assertEqual(rollups["chapter:chapter-1-demo"]["n_paragraphs"], 2)


class TestOutputShapeForConsumer(unittest.TestCase):
    """The synthetic output must expose every key build_judge_scores reads."""

    def setUp(self):
        self.runs = [
            _fake_run("a", "openrouter:x/deepseek-chat", p1=60, p2=70, voice=70),
            _fake_run("b", "openrouter:y/qwen-72b", p1=80, p2=70, voice=90),
            _fake_run("c", "openrouter:z/llama-70b", p1=100, p2=70, voice=90),
        ]
        self.merged = pm.merge_panel(self.runs)
        self.scores_json, self.run_json = pm.assemble_output(
            self.runs, self.merged, "panel-test"
        )

    def test_top_level_keys(self):
        for k in ("run_id", "corpus_snapshot_hash", "book_mash_version",
                  "dim_registry_version", "finished_at", "total_cost_usd",
                  "status", "rollups", "scores", "panel"):
            self.assertIn(k, self.scores_json, k)
        self.assertEqual(self.scores_json["status"], "completed")
        # cost = sum of inputs (0.01 * 3)
        self.assertAlmostEqual(self.scores_json["total_cost_usd"], 0.03, places=6)
        self.assertEqual(self.scores_json["panel"]["member_runs"], ["a", "b", "c"])

    def test_run_json_status_completed(self):
        # _completed_runs in build_judge_scores requires run.json status completed
        self.assertEqual(self.run_json["status"], "completed")

    def test_scores_entry_keys(self):
        for s in self.scores_json["scores"]:
            for k in ("dim_name", "unit_id", "score_0_100", "label",
                      "reasoning", "evidence_refs", "model"):
                self.assertIn(k, s, k)

    def test_rollups_book_and_chapter_keys(self):
        rl = self.scores_json["rollups"]
        self.assertIn("book", rl)
        self.assertIn("chapter:chapter-1-demo", rl)
        # build_judge_scores reads voice / n_paragraphs out of the chapter rollup
        chap = rl["chapter:chapter-1-demo"]
        self.assertIn("voice", chap)
        self.assertIn("n_paragraphs", chap)

    def test_label_thresholds_match_consumer(self):
        # parity with build_judge_scores._label_for
        self.assertEqual(pm._label_for(None), "error")
        self.assertEqual(pm._label_for(80), "strong")
        self.assertEqual(pm._label_for(79.9), "moderate")
        self.assertEqual(pm._label_for(50), "moderate")
        self.assertEqual(pm._label_for(49.9), "weak")
        self.assertEqual(pm._label_for(20), "weak")
        self.assertEqual(pm._label_for(19.9), "fail")

    def test_round_trips_through_json(self):
        # must be plain-JSON serialisable (what gets written to disk)
        s = json.dumps(self.scores_json)
        self.assertIsInstance(json.loads(s), dict)


class TestMismatchedSnapshotRejected(unittest.TestCase):
    def test_different_hash_raises(self):
        runs = [
            _fake_run("a", "openrouter:x/deepseek-chat", p1=60, p2=70, voice=70, snap="sha256:AAA"),
            _fake_run("b", "openrouter:y/qwen-72b", p1=80, p2=70, voice=90, snap="sha256:BBB"),
        ]
        merged = pm.merge_panel(runs)
        with self.assertRaises(ValueError):
            pm.assemble_output(runs, merged, "x")


class TestEndToEndOnDisk(unittest.TestCase):
    """Write a synthetic run to a temp .book-mash-runs dir and confirm
    build_judge_scores can ingest it (its _completed_runs + _label_for path)."""

    def test_build_judge_scores_consumes_output(self):
        runs = [
            _fake_run("a", "openrouter:x/deepseek-chat", p1=60, p2=70, voice=70),
            _fake_run("b", "openrouter:y/qwen-72b", p1=80, p2=70, voice=90),
            _fake_run("c", "openrouter:z/llama-70b", p1=100, p2=70, voice=90),
        ]
        with tempfile.TemporaryDirectory() as td:
            runs_dir = Path(td) / ".book-mash-runs"
            # write the 3 inputs so auto-detect / explicit both work
            for r in runs:
                d = runs_dir / r["run_id"]
                d.mkdir(parents=True)
                (d / "scores.json").write_text(json.dumps(r))
                (d / "run.json").write_text(json.dumps(
                    {k: r[k] for k in ("run_id", "corpus_snapshot_hash", "status")}
                ))
            res = pm.run(["a", "b", "c"], "panel-1", 3, runs_dir, write=True)
            out = runs_dir / "panel-1"
            self.assertTrue((out / "scores.json").exists())
            self.assertTrue((out / "run.json").exists())

            # Now exercise the real consumer's run-discovery + label logic.
            try:
                import build_judge_scores as bjs
            except Exception as exc:  # pragma: no cover - import env issue
                self.skipTest(f"build_judge_scores import failed: {exc}")
            completed = bjs._completed_runs(runs_dir)
            names = {p.name for p in completed}
            self.assertIn("panel-1", names)
            # the consumer's label rubric matches ours
            self.assertEqual(bjs._label_for(80), pm._label_for(80))
            self.assertEqual(bjs._label_for(None), pm._label_for(None))


if __name__ == "__main__":
    unittest.main(verbosity=2)
