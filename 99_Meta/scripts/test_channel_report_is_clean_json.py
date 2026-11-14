"""Is the --dry-run report on stdout parseable as JSON, with nothing else?

CI redirects this script's stdout into a file and parses it with `jq`. Any
diagnostic line printed to stdout therefore corrupts the data, and the way it
failed was silent: jq exited non-zero, the workflow's `missing_count` came out
empty, and its steps branch on '0' vs not-'0', so both the update-issue and
close-issue branches skipped while the job reported success. Issue #67 sat
stale from 2026-09-18 to 2026-11-14 on exactly that.

The offending line only appears when a talk has been withdrawn, so a test that
runs with an empty withdrawal list would pass with the bug present. These tests
therefore assert the withdrawal branch is actually taken.

No network: normalize_inventory is called directly with rows in memory.

Run:  cd 99_Meta/scripts && python3 -m unittest test_channel_report_is_clean_json -v
"""
import importlib.util
import io
import json
import unittest
from contextlib import redirect_stderr, redirect_stdout
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent / "update_ai_engineer_channel.py"


def load():
    spec = importlib.util.spec_from_file_location("uaec", SCRIPT)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


class ReportStreamCase(unittest.TestCase):
    def setUp(self) -> None:
        self.mod = load()
        # Guard the guard: if nothing is withdrawn, the line under test is never
        # printed and every assertion below passes vacuously.
        self.withdrawn = self.mod.withdrawn_video_ids()
        self.assertTrue(self.withdrawn,
                        "withdrawn-videos.md lists nobody, so this suite proves nothing")

    def test_withdrawal_notice_does_not_touch_stdout(self):
        rows = [{"id": "aaaaaaaaaaa", "playlist_index": 1, "title": "t",
                 "webpage_url": "u"}]
        out, err = io.StringIO(), io.StringIO()
        with redirect_stdout(out), redirect_stderr(err):
            self.mod.normalize_inventory(rows, {})
        self.assertEqual(out.getvalue(), "",
                         f"stdout must stay empty, got: {out.getvalue()!r}")
        self.assertIn("withdrawn at speaker request", err.getvalue())

    def test_a_withdrawn_id_is_not_reported_missing(self):
        vid = sorted(self.withdrawn)[0]
        rows = [{"id": vid, "playlist_index": 1, "title": "t", "webpage_url": "u"}]
        with redirect_stdout(io.StringIO()), redirect_stderr(io.StringIO()):
            _, missing = self.mod.normalize_inventory(rows, {})
        self.assertEqual(missing, [])

    def test_stdout_capture_of_the_notice_would_break_jq(self):
        """Why stdout matters: the contaminated shape is not valid JSON.

        This reproduces the 2026-09-18 failure rather than trusting the claim.
        """
        contaminated = ("[channel] 2 video(s) withdrawn at speaker request\n"
                        + json.dumps({"missing_count": 61}))
        with self.assertRaises(json.JSONDecodeError):
            json.loads(contaminated)
        # And the shape CI now gets parses cleanly.
        json.loads(json.dumps({"missing_count": 61}))


if __name__ == "__main__":
    unittest.main()
