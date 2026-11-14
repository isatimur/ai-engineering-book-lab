"""Does the ref scan find a note that exists only on another branch?

The bug this guards against is subtle: the loop globs the working tree, so a
note sitting on an unmerged branch is invisible and its talk gets fetched a
second time. A branch-name check does not help, because the usual workflow is
to open the PR and switch back to main — main lacks the note too. So these
tests check the case that actually matters: HEAD is main, the note is on a
side branch, and the scan must still see it.

Each case builds a real git repo in a temp dir. Nothing here touches network.

Run:  cd 99_Meta/scripts && python3 -m unittest test_retry_ingest_ref_scan -v
"""
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent / "retry_ingest.py"


class RefScanCase(unittest.TestCase):
    def git(self, *args: str) -> None:
        subprocess.run(["git", *args], cwd=self.root, check=True,
                       capture_output=True, text=True)

    def add_note(self, name: str, message: str) -> None:
        (self.root / "01_Videos" / name).write_text("note\n")
        self.git("add", "-A")
        self.git("-c", "user.email=t@e", "-c", "user.name=t", "commit", "-m", message)

    def setUp(self) -> None:
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        # retry_ingest resolves ROOT as parents[2], so it must live here.
        scripts = self.root / "99_Meta" / "scripts"
        scripts.mkdir(parents=True)
        self.copy = scripts / "retry_ingest.py"
        self.copy.write_text(SCRIPT.read_text())
        (self.root / "01_Videos").mkdir()
        self.git("init", "-q", "-b", "main")
        self.add_note("001-aaaaaaaaaaa-on-main.md", "first")

    def scan(self) -> dict:
        """Call notes_in_other_refs from the copy, in the temp repo."""
        code = (
            "import importlib.util,sys,json;"
            f"spec=importlib.util.spec_from_file_location('ri',{str(self.copy)!r});"
            "m=importlib.util.module_from_spec(spec);"
            "sys.argv=['ri'];spec.loader.exec_module(m);"
            "print(json.dumps(m.notes_in_other_refs()))"
        )
        r = subprocess.run([sys.executable, "-I", "-c", code], cwd=self.root,
                           capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        import json
        return json.loads(r.stdout)

    def test_finds_note_on_main(self):
        self.assertIn("aaaaaaaaaaa", self.scan())

    def test_finds_note_that_exists_only_on_a_side_branch(self):
        """The case the branch-name guard missed."""
        self.git("checkout", "-q", "-b", "corpus/pending")
        self.add_note("002-bbbbbbbbbbb-on-branch.md", "second")
        self.git("checkout", "-q", "main")
        # HEAD is main and the file is gone from the working tree...
        self.assertFalse((self.root / "01_Videos" / "002-bbbbbbbbbbb-on-branch.md").exists())
        # ...but the scan must still report it, or it gets fetched twice.
        found = self.scan()
        self.assertIn("bbbbbbbbbbb", found)
        self.assertIn("corpus/pending", found["bbbbbbbbbbb"])

    def test_unknown_id_is_absent(self):
        self.assertNotIn("zzzzzzzzzzz", self.scan())

    def test_no_refs_is_not_a_crash(self):
        """An empty result must mean 'nothing found', never an exception."""
        empty = Path(tempfile.mkdtemp(dir=self.tmp.name))
        scripts = empty / "99_Meta" / "scripts"
        scripts.mkdir(parents=True)
        copy = scripts / "retry_ingest.py"
        copy.write_text(SCRIPT.read_text())
        code = (
            "import importlib.util,sys,json;"
            f"spec=importlib.util.spec_from_file_location('ri',{str(copy)!r});"
            "m=importlib.util.module_from_spec(spec);"
            "sys.argv=['ri'];spec.loader.exec_module(m);"
            "print(json.dumps(m.notes_in_other_refs()))"
        )
        r = subprocess.run([sys.executable, "-I", "-c", code], cwd=empty,
                           capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertEqual(r.stdout.strip(), "{}")


if __name__ == "__main__":
    unittest.main()
