"""Book consistency checker.

Usage (from repo root):
    python3 scripts/check_book_consistency.py

Checks:
  a) Manuscript sync  — website/src/content/chapter-NN.md must equal the
     published portion (everything after the first '---' line) of the matching
     public/drafting/Chapter N.md, ignoring trailing whitespace.
  b) Audio freshness  — website/public/audiobook/ch-NN.mp3 must be newer
     (by git commit date, falling back to mtime) than its chapter-NN.md.
  c) Scores freshness — website/src/data/judge-scores.json must be newer than
     the most-recently-edited chapter file.

Exits 0 if all checks PASS, 1 if any DRIFT is found.
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Repo layout
# ---------------------------------------------------------------------------

REPO = Path(__file__).resolve().parent.parent

CONTENT_DIR = REPO / "website" / "src" / "content"
DRAFTING_DIR = REPO / "public" / "drafting"
AUDIO_DIR = REPO / "website" / "public" / "audiobook"
SCORES_FILE = REPO / "website" / "src" / "data" / "judge-scores.json"

N_CHAPTERS = 10


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _git_mtime(path: Path) -> float | None:
    """Return the Unix timestamp of the most-recent git commit touching *path*,
    or None if git is not available or the file has no git history."""
    try:
        out = subprocess.check_output(
            ["git", "log", "--format=%ct", "-1", "--", str(path)],
            cwd=REPO,
            stderr=subprocess.DEVNULL,
        ).decode().strip()
        return float(out) if out else None
    except (subprocess.CalledProcessError, FileNotFoundError, ValueError):
        return None


def _mtime(path: Path) -> float:
    """Return the best available modification time: git date preferred, then
    filesystem mtime."""
    t = _git_mtime(path)
    if t is not None:
        return t
    return path.stat().st_mtime


def _drafting_path(n: int) -> Path | None:
    """Find the drafting file for chapter *n* (e.g. 'Chapter 5 - ....md')."""
    pattern = re.compile(rf"^Chapter {n}\b", re.IGNORECASE)
    for p in DRAFTING_DIR.iterdir():
        if p.suffix.lower() == ".md" and pattern.match(p.name):
            return p
    return None


def _published_portion(draft_path: Path) -> str:
    """Return the text after the first '---' line in *draft_path*, stripped of
    leading/trailing blank lines."""
    lines = draft_path.read_text(encoding="utf-8").split("\n")
    try:
        sep_idx = next(i for i, l in enumerate(lines) if l.strip() == "---")
    except StopIteration:
        # No separator found — treat the whole file as the published portion.
        return draft_path.read_text(encoding="utf-8").strip()
    return "\n".join(lines[sep_idx + 1:]).lstrip("\n").rstrip()


# ---------------------------------------------------------------------------
# Check a: Manuscript sync
# ---------------------------------------------------------------------------

def check_manuscript_sync() -> list[str]:
    """Return list of problem strings; empty means PASS."""
    problems: list[str] = []
    for n in range(1, N_CHAPTERS + 1):
        canon_path = CONTENT_DIR / f"chapter-{n:02d}.md"
        draft_path = _drafting_path(n)

        if not canon_path.exists():
            problems.append(f"  ch{n:02d}: MISSING canonical {canon_path.relative_to(REPO)}")
            continue
        if draft_path is None:
            problems.append(f"  ch{n:02d}: MISSING drafting file in {DRAFTING_DIR.relative_to(REPO)}")
            continue

        canon_text = canon_path.read_text(encoding="utf-8").rstrip()
        published = _published_portion(draft_path)

        if canon_text != published:
            # Count differing lines for context
            c_lines = canon_text.splitlines()
            p_lines = published.splitlines()
            n_diff = sum(
                1
                for cl, pl in zip(c_lines, p_lines)
                if cl.rstrip() != pl.rstrip()
            )
            n_diff += abs(len(c_lines) - len(p_lines))
            problems.append(
                f"  ch{n:02d}: DIFFERS — {n_diff} line(s) differ between "
                f"{canon_path.relative_to(REPO)} and {draft_path.relative_to(REPO)}"
            )
    return problems


# ---------------------------------------------------------------------------
# Check b: Audio freshness
# ---------------------------------------------------------------------------

def check_audio_freshness() -> list[str]:
    """Return list of problem strings; empty means PASS."""
    problems: list[str] = []
    for n in range(1, N_CHAPTERS + 1):
        canon_path = CONTENT_DIR / f"chapter-{n:02d}.md"
        audio_path = AUDIO_DIR / f"ch-{n:02d}.mp3"

        if not canon_path.exists():
            # Already flagged by manuscript check; skip here.
            continue
        if not audio_path.exists():
            problems.append(
                f"  ch{n:02d}: MISSING audio {audio_path.relative_to(REPO)}"
            )
            continue

        chapter_mtime = _mtime(canon_path)
        audio_mtime = _mtime(audio_path)

        if audio_mtime <= chapter_mtime:
            from datetime import datetime, timezone
            def _fmt(t: float) -> str:
                return datetime.fromtimestamp(t, tz=timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
            problems.append(
                f"  ch{n:02d}: STALE — audio {_fmt(audio_mtime)} <= "
                f"chapter {_fmt(chapter_mtime)}"
            )
    return problems


# ---------------------------------------------------------------------------
# Check c: Scores freshness
# ---------------------------------------------------------------------------

def check_scores_freshness() -> list[str]:
    """Return list of problem strings; empty means PASS."""
    problems: list[str] = []
    if not SCORES_FILE.exists():
        return [f"  MISSING {SCORES_FILE.relative_to(REPO)}"]

    scores_mtime = _mtime(SCORES_FILE)
    stale_chapters: list[str] = []

    for n in range(1, N_CHAPTERS + 1):
        canon_path = CONTENT_DIR / f"chapter-{n:02d}.md"
        if not canon_path.exists():
            continue
        chapter_mtime = _mtime(canon_path)
        if chapter_mtime > scores_mtime:
            from datetime import datetime, timezone
            def _fmt(t: float) -> str:
                return datetime.fromtimestamp(t, tz=timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
            stale_chapters.append(
                f"  ch{n:02d}: chapter edited {_fmt(chapter_mtime)} > "
                f"scores built {_fmt(scores_mtime)}"
            )

    return stale_chapters


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    drift = False

    # --- Check a ---
    print("=== a) Manuscript sync (website/src/content vs public/drafting) ===")
    problems_a = check_manuscript_sync()
    if problems_a:
        drift = True
        print("DRIFT")
        for p in problems_a:
            print(p)
    else:
        print("PASS — all chapters match their drafting published portion")

    print()

    # --- Check b ---
    print("=== b) Audio freshness (website/public/audiobook vs chapter mtime) ===")
    problems_b = check_audio_freshness()
    if problems_b:
        drift = True
        print("DRIFT")
        for p in problems_b:
            print(p)
    else:
        print("PASS — all chapter audio files are newer than their source")

    print()

    # --- Check c ---
    print("=== c) Scores freshness (judge-scores.json vs newest chapter edit) ===")
    problems_c = check_scores_freshness()
    if problems_c:
        drift = True
        print("DRIFT — chapter(s) edited after scores were last built:")
        for p in problems_c:
            print(p)
    else:
        print("PASS — judge-scores.json is newer than all chapter edits")

    print()
    if drift:
        print("SUMMARY: DRIFT detected — see above.")
        return 1
    print("SUMMARY: PASS — all checks clean.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
