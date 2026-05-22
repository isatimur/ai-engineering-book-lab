import unittest
from pathlib import Path

from locate import _confidence, locate_quote
from vtt import load_word_stream

FIXTURE = str(Path(__file__).parent / "testdata" / "testvid0001.en.vtt")


class TestConfidence(unittest.TestCase):
    def test_high_lower_bound(self):
        self.assertEqual(_confidence(0.9), "high")

    def test_just_below_high(self):
        self.assertEqual(_confidence(0.899), "medium")

    def test_medium_lower_bound(self):
        self.assertEqual(_confidence(0.6), "medium")

    def test_just_below_medium(self):
        self.assertEqual(_confidence(0.599), "low")


class TestLocateQuote(unittest.TestCase):
    def setUp(self):
        self.stream = load_word_stream(FIXTURE)

    def test_exact_phrase_is_high_confidence(self):
        a = locate_quote(self.stream, "from helpfulness to productive", "vid00000001")
        self.assertEqual(a.start, "00:00:03.400")
        self.assertEqual(a.end, "00:00:04.800")
        self.assertEqual(a.quote, "from helpfulness to productive")
        self.assertEqual(a.confidence, "high")
        self.assertEqual(a.video_id, "vid00000001")

    def test_quote_is_verbatim_from_vtt_not_the_search_phrase(self):
        # search phrase lower/unpunctuated; quote keeps the VTT's verbatim token
        a = locate_quote(self.stream, "north star has", "vid00000001")
        self.assertEqual(a.quote, "north star has")
        self.assertEqual(a.confidence, "high")

    def test_one_wrong_word_is_medium_confidence(self):
        a = locate_quote(self.stream, "north star has shiftedX", "vid00000001")
        self.assertEqual(a.confidence, "medium")
        self.assertEqual(a.start, "00:00:01.200")

    def test_unrelated_phrase_is_low_confidence(self):
        a = locate_quote(self.stream, "zzz yyy xxx www", "vid00000001")
        self.assertEqual(a.confidence, "low")

    def test_empty_phrase_is_low_confidence(self):
        a = locate_quote(self.stream, "   ", "vid00000001")
        self.assertEqual(a.confidence, "low")
        self.assertEqual(a.quote, "")

    def test_phrase_longer_than_stream_is_low_confidence(self):
        a = locate_quote(self.stream, " ".join(["word"] * 50), "vid00000001")
        self.assertEqual(a.confidence, "low")


if __name__ == "__main__":
    unittest.main()
