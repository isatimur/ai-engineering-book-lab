"""Extract git-derived chapter versions into a committed manifest + content store.

Produces:
  - website/src/data/versions.json        (light manifest, bundled)
  - website/src/data/versions/NN/git-<sha>.md  (per-version prose, lazy-loaded)

Each chapter's git history (revisions of website/src/content/chapter-NN.md) becomes
a version list, newest first, capped at MAX_VERSIONS (latest N + the first commit).
Status is derived from the commit subject. The schema carries a `source` field so
explicit snapshots (source="snapshot") can be added later with no schema change.

Skip-and-fallback: if git is unavailable, the repo is a shallow clone, or history is
too thin, the script leaves the committed artifacts untouched so the prebuild chain
never fails in CI (Vercel shallow-clones).
"""
import argparse
import json
import re
import subprocess
from pathlib import Path

# 99_Meta/scripts/ -> parents[2] is the repo root.
_REPO = Path(__file__).resolve().parents[2]
_CONTENT = _REPO / "website" / "src" / "content"
_OUT_JSON = _REPO / "website" / "src" / "data" / "versions.json"
_OUT_DIR = _REPO / "website" / "src" / "data" / "versions"

MAX_VERSIONS = 5  # latest N; the first-ever commit is always also retained
CHAPTERS = [f"{n:02d}" for n in range(1, 11)]

_STATUS = re.compile(r"\b(Starter|Outlined|Drafting)\b")


def _git(*args: str) -> str | None:
    try:
        out = subprocess.run(
            ["git", *args], cwd=_REPO, capture_output=True, text=True, check=True
        )
        return out.stdout
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


def _is_usable_repo() -> bool:
    if _git("rev-parse", "--git-dir") is None:
        return False
    shallow = _git("rev-parse", "--is-shallow-repository")
    if shallow and shallow.strip() == "true":
        return False
    return True


def _word_count(text: str) -> int:
    # Match countWords in bookChapters.ts: trim, split on whitespace, drop empties.
    return len([w for w in text.split() if w])


def _derive_status(subject: str, fallback: str) -> str:
    m = _STATUS.search(subject)
    if not m:
        return fallback
    word = m.group(1)
    # "Starter → Drafting" / "Outlined → Drafting": take the destination status.
    if "→" in subject or "->" in subject:
        tail = re.split(r"→|->", subject)[-1]
        tm = _STATUS.search(tail)
        if tm:
            return tm.group(1)
    return word


def _revisions(rel_path: str) -> list[dict]:
    log = _git(
        "log", "--follow", "--format=%H%x09%h%x09%aI%x09%s", "--", rel_path
    )
    if not log:
        return []
    rows = []
    for line in log.splitlines():
        if not line.strip():
            continue
        full, short, iso, subject = line.split("\t", 3)
        rows.append({"sha": full, "short": short, "date": iso[:10], "subject": subject})
    return rows


def build_chapter(number: str) -> dict | None:
    rel = f"website/src/content/chapter-{number}.md"
    revs = _revisions(rel)
    if not revs:
        return None

    # Retain latest MAX_VERSIONS plus the first commit (oldest) for full-arc diffs.
    keep = revs[:MAX_VERSIONS]
    if revs[-1] not in keep:
        keep.append(revs[-1])

    out_dir = _OUT_DIR / number
    out_dir.mkdir(parents=True, exist_ok=True)

    versions = []
    for r in keep:
        content = _git("show", f"{r['sha']}:{rel}")
        if content is None:
            continue
        content_file = out_dir / f"git-{r['short']}.md"
        # content at a sha is immutable; only write if missing (idempotent)
        if not content_file.exists():
            content_file.write_text(content, encoding="utf-8")
        versions.append({
            "version_id": f"git:{r['short']}",
            "source": "git",
            "ref": r["sha"],
            "date": r["date"],
            "status": _derive_status(r["subject"], "Drafting"),
            "wordCount": _word_count(content),
            "message": r["subject"],
            "corpus_snapshot_hash": None,
            "content_ref": f"{number}/git-{r['short']}.md",
        })

    if not versions:
        return None
    return {"current_version_id": versions[0]["version_id"], "versions": versions}


def build() -> dict:
    chapters: dict[str, dict] = {}
    for number in CHAPTERS:
        ch = build_chapter(number)
        if ch is not None:
            chapters[number] = ch
    return {
        "schema_version": 1,
        "source_mode": "git",
        "chapters": dict(sorted(chapters.items())),
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Build website/src/data/versions.json from git history."
    )
    parser.add_argument("--out", default=str(_OUT_JSON))
    args = parser.parse_args(argv)

    if not _is_usable_repo():
        print(
            "[build_versions] git unavailable or shallow clone — "
            "keeping committed versions.json"
        )
        return 0

    data = build()
    if not data["chapters"]:
        print("[build_versions] no chapter history found — keeping committed versions.json")
        return 0

    Path(args.out).write_text(
        json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    total = sum(len(c["versions"]) for c in data["chapters"].values())
    print(f"versions.json: {len(data['chapters'])} chapters, {total} versions")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
