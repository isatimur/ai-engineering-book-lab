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


if __name__ == "__main__":
    unittest.main()
