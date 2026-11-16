import unittest
from pathlib import Path

from build_evidence import build_index, parse_ledger

LEDGER = str(Path(__file__).parent / "testdata" / "Claims Ledger.md")


class TestParseLedger(unittest.TestCase):
    def setUp(self):
        self.claims = parse_ledger(LEDGER)

    def test_only_claims_with_anchors_are_kept(self):
        self.assertEqual(len(self.claims), 1)
        self.assertEqual(self.claims[0]["claim_id"], "claims#1")

    def test_claim_text_and_support_level(self):
        c = self.claims[0]
        self.assertEqual(c["text"], "Delegated execution is the real shift")
        self.assertEqual(c["support_level"], "strong")

    def test_candidate_chapters_parsed_as_ints(self):
        self.assertEqual(self.claims[0]["candidate_chapters"], [1, 6])

    def test_anchor_fields(self):
        anchors = self.claims[0]["anchors"]
        self.assertEqual(len(anchors), 1)  # "not available" source is dropped
        a = anchors[0]
        self.assertEqual(a["video_id"], "kDEvo2__Ijg")
        self.assertEqual(a["start"], "00:11:46.320")
        self.assertEqual(a["end"], "00:11:52.880")
        self.assertEqual(a["start_seconds"], 706)
        self.assertEqual(a["confidence"], "high")
        self.assertEqual(a["quote"], "the north star has shifted from helpfulness to productive")
        self.assertEqual(a["label"], "#206 — Joel Hron")


class TestBuildIndex(unittest.TestCase):
    def test_claim_appears_under_every_candidate_chapter(self):
        index = build_index(parse_ledger(LEDGER))
        self.assertEqual(sorted(index.keys()), ["1", "6"])
        self.assertEqual(index["1"][0]["claim_id"], "claims#1")
        self.assertEqual(index["6"][0]["claim_id"], "claims#1")

    def test_entry_shape(self):
        index = build_index(parse_ledger(LEDGER))
        entry = index["1"][0]
        self.assertEqual(
            sorted(entry.keys()), ["anchors", "claim_id", "support_level", "text"]
        )


MIXED = str(Path(__file__).parent / "testdata" / "Claims Ledger Artifact.md")


class TestArtifactAnchors(unittest.TestCase):
    """Book 3's ledger holds Artifact anchors (ADR-0003). They must reach the index."""

    def setUp(self):
        self.claims = {c["claim_id"]: c for c in parse_ledger(MIXED)}

    def test_artifact_only_claim_is_kept(self):
        self.assertIn("claims#1", self.claims)
        self.assertEqual(self.claims["claims#1"]["anchors"], [])

    def test_artifact_anchor_fields(self):
        rows = self.claims["claims#1"]["artifact_anchors"]
        self.assertEqual([r["kind"] for r in rows], ["commit", "run"])
        self.assertEqual(
            rows[0],
            {
                "kind": "commit",
                "ref": "2de004f",
                "date": "2026-11-16",
                "excerpt": "run: gh workflow run website-deploy.yml --ref main",
            },
        )

    def test_fenced_example_is_not_an_anchor(self):
        excerpts = [r["excerpt"] for c in self.claims.values() for r in c.get("artifact_anchors", [])]
        self.assertFalse(any("fenced example" in e for e in excerpts))

    def test_claim_with_both_kinds_keeps_both(self):
        c = self.claims["claims#2"]
        self.assertEqual(len(c["anchors"]), 1)
        self.assertEqual(c["artifact_anchors"][0]["kind"], "file")

    def test_claim_with_no_anchor_is_dropped(self):
        self.assertNotIn("claims#3", self.claims)

    def test_index_carries_artifact_anchors_under_each_chapter(self):
        index = build_index(list(self.claims.values()))
        self.assertEqual(sorted(index), ["2", "4"])
        self.assertEqual(len(index["2"][0]["artifact_anchors"]), 2)

    def test_source_only_entry_shape_is_unchanged(self):
        # Books 1 and 2 are published: no new key may appear in their JSON.
        entry = build_index(parse_ledger(LEDGER))["1"][0]
        self.assertNotIn("artifact_anchors", entry)

    def test_artifact_claim_without_candidate_chapters_is_an_error(self):
        # Such a claim would reach no chapter and vanish without a trace.
        import tempfile

        text = (
            "## 1) Orphan\n\n**Support level:** strong\n\n"
            "**Artifact anchor:**\n- kind: commit\n- ref: 2de004f\n"
            "- date: 2026-11-16\n- excerpt: some diff line\n"
        )
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "Claims Ledger.md"
            p.write_text(text)
            with self.assertRaises(ValueError):
                parse_ledger(str(p))

    def test_orphan_kind_line_is_an_error(self):
        import tempfile

        text = (
            "## 1) Broken header\n\n**Candidate chapters:** 1\n\n"
            "**Artifact anchors:**\n- kind: commit\n- ref: 2de004f\n"
            "- date: 2026-11-16\n- excerpt: some diff line\n"
        )
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "Claims Ledger.md"
            p.write_text(text)
            with self.assertRaises(ValueError):
                parse_ledger(str(p))


if __name__ == "__main__":
    unittest.main()
