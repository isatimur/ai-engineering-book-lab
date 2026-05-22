import json
import subprocess
import sys
import unittest
from pathlib import Path

from cli import extract_video_id

ANCHOR_DIR = Path(__file__).parent
TESTDATA = ANCHOR_DIR / "testdata"


class TestExtractVideoId(unittest.TestCase):
    def test_bare_11_char_id(self):
        self.assertEqual(extract_video_id("_-oIuRH4oGA"), "_-oIuRH4oGA")

    def test_wikilink_target(self):
        self.assertEqual(
            extract_video_id("206-kDEvo2__Ijg-from-copilot-to-colleague-joel-hron"),
            "kDEvo2__Ijg",
        )

    def test_full_wikilink_with_brackets_and_label(self):
        self.assertEqual(
            extract_video_id("[[003-XNtkiQJ49Ps-agents-need-more-than-a-chat|#3 — Jacob]]"),
            "XNtkiQJ49Ps",
        )

    def test_unparseable_raises(self):
        with self.assertRaises(ValueError):
            extract_video_id("not a video reference")


class TestCli(unittest.TestCase):
    def test_cli_prints_anchor_json(self):
        result = subprocess.run(
            [sys.executable, "cli.py", "testvid0001", "from helpfulness to productive",
             "--transcripts", "testdata"],
            cwd=ANCHOR_DIR, capture_output=True, text=True,
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        data = json.loads(result.stdout)
        self.assertEqual(data["confidence"], "high")
        self.assertEqual(data["video_id"], "testvid0001")
        self.assertIn("productive", data["quote"])

    def test_cli_missing_transcript_reports_error(self):
        result = subprocess.run(
            [sys.executable, "cli.py", "nosuchvid01", "anything",
             "--transcripts", "testdata"],
            cwd=ANCHOR_DIR, capture_output=True, text=True,
        )
        self.assertEqual(result.returncode, 1)
        data = json.loads(result.stdout)
        self.assertIn("error", data)


if __name__ == "__main__":
    unittest.main()
