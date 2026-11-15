#!/usr/bin/env python3
"""Check that every diagram in the manifest is rendered, synced and current.

Replaces `scripts/sync-diagrams.sh --check`, which could not fail. That check
used `stat -f %m` — BSD syntax, where GNU coreutils reads `-f` as *file
system* — so on `ubuntu-latest` every call errored. The error was swallowed
because the call sat inside an `elif`, where errexit does not apply, and the
counter it fed stayed 0. From the 2026-11-14 scheduled run (43610181465):

    stat: cannot read file system information for '%m': No such file or directory
    Inodes: Total: 18690560   Free: 17661307: integer expected
    ...
    check complete: 0 stale, 0 missing-source

Fixing `stat` alone would not have been enough. Three further reasons that
check could not have failed in CI:

  * `actions/checkout` writes every file at about the same time, so mtime
    staleness is meaningless on a runner even when `stat` works.
  * `--check` hit `continue` before the source-png -> web-copy comparison, so
    web drift was never examined, in CI or locally.
  * the workflow's separate presence step omitted `.dividers[]` from its jq
    and asserted only that a file exists, never that its bytes match. That is
    why it reported 124 entries when the manifest holds 128.

So this asks three questions that are well defined on any machine:

  1. does the .excalidraw source exist, and does it have a rendered .png?
  2. was the source committed more recently than its .png? Git commit times
     survive a checkout; file mtimes do not.
  3. does the web copy's content equal the rendered png's content? Hashes,
     not timestamps — the same reasoning website/scripts/sync-diagrams.mjs
     records for its own copier after mtime comparison shipped wrong bytes
     on 2026-08-23.

NOT COVERED, DELIBERATELY: diagrams/covers/. The served cover is a quantised
derivative of the master, so its bytes legitimately differ and a hash check
would fail on a correct repo. Gating covers needs the derivation to exist in
code first. Until then a cover can drift unseen, which it did for 124 days
(2026-07-13 -> 2026-11-14).

    python3 scripts/check_diagram_sync.py            # report, exit 1 on drift
    python3 scripts/check_diagram_sync.py --quiet    # only problems
"""
from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
SECTIONS = ("overview", "openers", "concepts", "inline", "maps", "dividers")


def manifest_path() -> Path:
    return REPO / "website" / "src" / "data" / "diagram-manifest.json"

# overview and openers render from diagrams/ itself; the rest have their own
# subdirectory named for the section. Mirrors src_dir_for_section() in
# scripts/sync-diagrams.sh, which still owns rendering.
def source_dir(section: str) -> Path:
    return REPO / "diagrams" if section in ("overview", "openers") else REPO / "diagrams" / section


def last_commit(path: Path) -> str | None:
    """Hash of the last commit touching `path`, or None if git has no record.

    None means untracked, or a checkout shallow enough to have lost it.
    Neither is evidence of freshness, so callers must not read None as
    "up to date".
    """
    rel = path.relative_to(REPO)
    out = subprocess.run(
        ["git", "log", "-1", "--format=%H", "--", str(rel)],
        cwd=REPO, capture_output=True, text=True,
    )
    value = out.stdout.strip()
    return value or None


def committed_after(later: str, earlier: str) -> bool:
    """True if commit `later` is strictly descended from `earlier`.

    Ancestry, not timestamps. Commit times have one-second resolution, so two
    commits made in the same second compare equal — which the fixture tests
    hit immediately, and which a fast scripted edit would hit in real life.
    Ancestry has no resolution to run out of.
    """
    if later == earlier:
        return False
    out = subprocess.run(
        ["git", "merge-base", "--is-ancestor", earlier, later],
        cwd=REPO, capture_output=True, text=True,
    )
    return out.returncode == 0


def is_dirty(path: Path) -> bool:
    """True if the working tree copy differs from what git has committed.

    A .png you have just re-rendered is newer than every commit, so comparing
    commit times would report it stale right up until you commit the fix —
    the one moment you are most likely to believe the tool. In CI the tree is
    always clean, so this changes nothing there.
    """
    rel = path.relative_to(REPO)
    out = subprocess.run(
        ["git", "status", "--porcelain", "--", str(rel)],
        cwd=REPO, capture_output=True, text=True,
    )
    return bool(out.stdout.strip())


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def entries() -> list[tuple[str, str, str]]:
    """(section, sourceFile, src) for every manifest entry, all six sections."""
    data = json.loads(manifest_path().read_text())
    missing_sections = [s for s in SECTIONS if s not in data]
    if missing_sections:
        raise SystemExit(f"manifest is missing section(s): {missing_sections}")
    return [(s, e["sourceFile"], e["src"]) for s in SECTIONS for e in data[s]]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--quiet", action="store_true", help="print only problems")
    # Without this the check can only ever run against its own repo, which
    # means the only way to find out whether it CAN fail is to break the real
    # tree. That is how the step it replaces went months without failing.
    ap.add_argument("--repo", type=Path, default=None,
                    help="check a different tree (the tests build fixtures)")
    args = ap.parse_args()

    if args.repo:
        global REPO
        REPO = args.repo.resolve()

    missing_source: list[str] = []
    missing_png: list[str] = []
    stale: list[str] = []
    missing_web: list[str] = []
    web_differs: list[str] = []
    unknown_history: list[str] = []
    checked = 0

    for section, source_file, web_src in entries():
        src = source_dir(section) / source_file
        png = src.with_suffix(".png")
        web = REPO / "website" / "public" / web_src.lstrip("/")

        if not src.exists():
            missing_source.append(str(src.relative_to(REPO)))
            continue
        if not png.exists():
            missing_png.append(str(png.relative_to(REPO)))
            continue
        checked += 1

        src_c, png_c = last_commit(src), last_commit(png)
        if is_dirty(png):
            pass  # just re-rendered; newer than any commit by definition
        elif src_c is None or png_c is None:
            unknown_history.append(str(src.relative_to(REPO)))
        elif committed_after(src_c, png_c):
            stale.append(str(src.relative_to(REPO)))

        if not web.exists():
            missing_web.append(str(web.relative_to(REPO)))
        elif sha256(png) != sha256(web):
            web_differs.append(str(web.relative_to(REPO)))

    total = checked + len(missing_source) + len(missing_png)
    if not args.quiet:
        print(f"{total} manifest entries across {len(SECTIONS)} sections; "
              f"{checked} fully checked")

    problems = [
        ("missing .excalidraw source", missing_source),
        ("source present, never rendered", missing_png),
        ("source committed after its .png — re-render", stale),
        ("no web copy", missing_web),
        ("web copy's bytes differ from the rendered .png", web_differs),
    ]
    failed = 0
    for label, items in problems:
        if items:
            failed += len(items)
            print(f"\n{label} ({len(items)}):")
            for item in items:
                print(f"  {item}")

    if unknown_history:
        print(f"\nno git history for {len(unknown_history)} source(s) — "
              f"freshness unproven, not assumed clean:")
        for item in unknown_history[:10]:
            print(f"  {item}")

    if failed:
        print(f"\n{failed} problem(s). Fix with:\n"
              f"  ./scripts/sync-diagrams.sh          # re-render stale sources\n"
              f"  node website/scripts/sync-diagrams.mjs   # copy to the website")
        return 1

    if not args.quiet:
        print("every manifest entry is rendered, synced, and current.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
