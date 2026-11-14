"""Does corpus_health fail on a duplicate video id, and pass without one?

A test that only asserts "the real corpus is clean" would pass with the check
deleted, so each case here builds a corpus on disk and runs the script against
it as a subprocess. The duplicate case is the one that matters: it must exit
non-zero even without --strict, because backfill debt is an expected CI state
and a double-counted talk is not.

Run:  cd 99_Meta/scripts && python3 -m unittest test_corpus_health_duplicates -v
"""
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent / "corpus_health.py"

NOTE = """---
video_id: "{vid}"
transcript_status: auto_en_orig
summary: "A real summary, so the boilerplate counter stays quiet."
---
# {vid}
"""


class CorpusHealthCase(unittest.TestCase):
    def build(self, names: list[str]) -> Path:
        """Lay out a corpus whose notes all have transcripts and descriptions.

        Without those the script reports backfill debt, which is noise here —
        this suite is about duplicates, so every note is given both.
        """
        root = Path(self.tmp.name)
        (root / "01_Videos").mkdir(parents=True)
        (root / "99_Meta" / "transcripts" / "plain").mkdir(parents=True)
        desc = []
        for name in names:
            vid = name.split("-", 2)[1]
            (root / "01_Videos" / name).write_text(NOTE.format(vid=vid))
            (root / "99_Meta" / "transcripts" / "plain" / f"{vid}.txt").write_text("words")
            desc.append('{"id": "%s"}' % vid)
        (root / "99_Meta" / "video-descriptions.jsonl").write_text("\n".join(desc))
        # The script resolves ROOT as parents[2] of its own path, so it has to
        # sit at <root>/99_Meta/scripts/ for the fixture to be what it reads.
        scripts = root / "99_Meta" / "scripts"
        scripts.mkdir(parents=True, exist_ok=True)
        copy = scripts / "corpus_health.py"
        copy.write_text(SCRIPT.read_text())
        return copy

    def setUp(self) -> None:
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)

    def run_health(self, names: list[str], *args: str) -> subprocess.CompletedProcess:
        copy = self.build(names)
        return subprocess.run([sys.executable, "-I", str(copy), *args],
                              capture_output=True, text=True)

    def test_clean_corpus_passes(self):
        r = self.run_health([
            "001-aaaaaaaaaaa-first-talk.md",
            "002-bbbbbbbbbbb-second-talk.md",
        ])
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertIn("duplicate video ids:     0", r.stdout)

    def test_duplicate_id_fails(self):
        # The same talk under two sequence numbers, which is what the
        # 2026-11-14 retry race produced.
        r = self.run_health([
            "001-aaaaaaaaaaa-first-talk.md",
            "007-aaaaaaaaaaa-first-talk.md",
        ])
        self.assertEqual(r.returncode, 1, r.stdout + r.stderr)
        self.assertIn("duplicate video ids:     1", r.stdout)
        self.assertIn("aaaaaaaaaaa", r.stdout)
        # Both offenders must be named, or the report cannot be acted on.
        self.assertIn("001-aaaaaaaaaaa-first-talk.md", r.stdout)
        self.assertIn("007-aaaaaaaaaaa-first-talk.md", r.stdout)

    def test_duplicate_fails_without_strict(self):
        """The point of the check: no --strict passed, still a failure.

        run_health forwards only the args given here, and none are, so the
        subprocess runs bare. Contrast with test_backfill_debt_alone, where the
        same bare invocation exits 0.
        """
        r = self.run_health([
            "001-aaaaaaaaaaa-first-talk.md",
            "007-aaaaaaaaaaa-first-talk.md",
        ])
        self.assertEqual(r.returncode, 1, r.stdout + r.stderr)

    def test_backfill_debt_alone_does_not_fail(self):
        """Debt stays a report. Only --strict turns it into a failure."""
        root = Path(self.tmp.name)
        copy = self.build(["001-aaaaaaaaaaa-first-talk.md"])
        # Remove the transcript to create debt, leaving no duplicate.
        (root / "99_Meta" / "transcripts" / "plain" / "aaaaaaaaaaa.txt").unlink()
        loose = subprocess.run([sys.executable, "-I", str(copy)],
                               capture_output=True, text=True)
        strict = subprocess.run([sys.executable, "-I", str(copy), "--strict"],
                                capture_output=True, text=True)
        self.assertEqual(loose.returncode, 0, loose.stdout)
        self.assertEqual(strict.returncode, 1, strict.stdout)


if __name__ == "__main__":
    unittest.main()
