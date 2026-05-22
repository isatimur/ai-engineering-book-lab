import unittest
from pathlib import Path

from vtt import load_word_stream, normalize

FIXTURE = str(Path(__file__).parent / "testdata" / "testvid0001.en.vtt")


class TestNormalize(unittest.TestCase):
    def test_strips_punctuation_and_lowercases(self):
        self.assertEqual(normalize("Productive,"), "productive")
        self.assertEqual(normalize("CEO"), "ceo")
        self.assertEqual(normalize("--"), "")


class TestWordStream(unittest.TestCase):
    def setUp(self):
        self.stream = load_word_stream(FIXTURE)

    def test_extracts_every_new_word_once(self):
        words = [w.word for w in self.stream]
        self.assertEqual(
            words,
            ["the", "north", "star", "has", "shifted", "from", "helpfulness", "to", "productive"],
        )

    def test_first_word_takes_cue_start_time(self):
        self.assertEqual(self.stream[0].word, "the")
        self.assertEqual(self.stream[0].timestamp, "00:00:01.000")

    def test_inline_timestamps_attach_to_their_word(self):
        self.assertEqual(self.stream[1].word, "north")
        self.assertEqual(self.stream[1].timestamp, "00:00:01.200")

    def test_fresh_word_after_settle_cue_takes_new_cue_start(self):
        self.assertEqual(self.stream[4].word, "shifted")
        self.assertEqual(self.stream[4].timestamp, "00:00:03.010")

    def test_last_word(self):
        self.assertEqual(self.stream[-1].word, "productive")
        self.assertEqual(self.stream[-1].timestamp, "00:00:04.800")

    def test_norm_is_populated(self):
        self.assertEqual(self.stream[-1].norm, "productive")


if __name__ == "__main__":
    unittest.main()
