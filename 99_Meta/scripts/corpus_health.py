#!/usr/bin/env python3
"""Report corpus backfill debt: notes missing transcripts or descriptions.

Per-video YouTube fetches (transcripts, descriptions) fail on CI runners —
YouTube blocks datacenter IPs, so notes created by the nightly ingest land
with `transcript_status: unavailable` and no description. That debt is
invisible unless something counts it, so this does.

Run locally (residential IP) to see what needs a backfill pass:
    python3 99_Meta/scripts/corpus_health.py

Exit 0 always (a report, not a gate); use --strict to exit 1 on any debt.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def main() -> None:
    strict = "--strict" in sys.argv

    have_desc: set[str] = set()
    desc_file = ROOT / "99_Meta" / "video-descriptions.jsonl"
    if desc_file.exists():
        for line in desc_file.read_text().splitlines():
            try:
                have_desc.add(json.loads(line)["id"])
            except (json.JSONDecodeError, KeyError):
                continue

    tdir = ROOT / "99_Meta" / "transcripts"
    have_tx: set[str] = set()
    for sub in ("plain", "raw"):
        d = tdir / sub
        if d.is_dir():
            for p in d.iterdir():
                m = re.search(r"([A-Za-z0-9_-]{11})", p.stem)
                if m:
                    have_tx.add(m.group(1))

    notes = sorted((ROOT / "01_Videos").glob("*.md"))
    no_tx, no_desc, flagged = [], [], []
    by_id: dict[str, list[str]] = {}
    for n in notes:
        m = re.match(r"(\d+)-([A-Za-z0-9_-]{11})-", n.name)
        if not m:
            continue
        vid = m.group(2)
        by_id.setdefault(vid, []).append(n.name)
        if vid not in have_tx:
            no_tx.append(n.name)
        if vid not in have_desc:
            no_desc.append(n.name)
        head = n.read_text()[:800]
        if 'transcript_status: "unavailable"' in head:
            flagged.append(n.name)

    # Summary-quality debt. The ingest script emits a template summary; a note
    # is "enriched" only once none of these markers survive. Detecting on just
    # one or two of them undercounts — an earlier pass used only "..." and
    # "Key angle:" and reported three notes as done that were not.
    boiler_markers = (
        "...", "Key angle:", "shares a practical take",
        "A practical talk on", "Speaker info:",
    )
    boilerplate = []
    for n in notes:
        m = re.search(r'^summary: "(.*)"$', n.read_text(), re.M)
        if m and any(p in m.group(1) for p in boiler_markers):
            boilerplate.append(n.name)

    dupes = {vid: names for vid, names in by_id.items() if len(names) > 1}

    print(f"corpus notes:            {len(notes)}")
    print(f"duplicate video ids:     {len(dupes)}")
    print(f"missing transcript file: {len(no_tx)}")
    print(f"status=unavailable:      {len(flagged)}")
    print(f"missing description:     {len(no_desc)}")
    print(f"boilerplate summaries:   {len(boilerplate)}")
    for label, items in (("transcript", no_tx), ("description", no_desc)):
        for name in items[:10]:
            print(f"  no {label}: {name[:70]}")
        if len(items) > 10:
            print(f"  … and {len(items) - 10} more")

    if not (no_tx or no_desc):
        print("\nPASS — no backfill debt.")
    else:
        print("\nBackfill locally:\n"
              "  python3 99_Meta/scripts/fetch_video_descriptions.py\n"
              "  python3 99_Meta/scripts/build_shared_artifacts.py\n"
              "  # transcripts: re-run the ingest script, or Whisper for caption-less videos")

    # Duplicates fail the run whether or not --strict was passed, unlike the
    # backfill debt above. Debt is an expected CI condition: YouTube blocks the
    # runners, so a nightly ingest lands notes with no transcript and the report
    # just has to state it. Two notes for one talk is never expected and never
    # self-heals — it means two ingests numbered the same video differently, so
    # the corpus now double-counts it in every theme tally and the synthesis
    # pack. A warning would scroll past.
    #
    # On 2026-11-14 the retry loop produced three such pairs (1543/1538,
    # 1547/1542, 1558/1543) because it globs 01_Videos on whatever is checked
    # out: a branch without a corpus PR's notes makes those talks look missing,
    # so it re-fetched them and numbered them from the smaller corpus. It cost
    # ten caption fetches against a rate limit that takes days to recover, and
    # nothing caught it — it surfaced as a merge conflict, by luck.
    if dupes:
        print(f"\nFAIL — {len(dupes)} video id(s) have more than one note:")
        for vid, names in sorted(dupes.items()):
            print(f"  {vid}")
            for name in sorted(names):
                print(f"    {name}")
        print("\nKeep whichever note the rest of the corpus already references, and delete the\n"
              "other. Do not guess from the numbers: in the race above the stale note was the\n"
              "LOWER-numbered one, because the re-fetch numbered it from a corpus that was\n"
              "missing the notes it was about to duplicate. Check what points where first:\n"
              "  grep -rl '<video id>' 02_Themes 05_Book_Ideas claims claims-2 evidence")
        raise SystemExit(1)

    if strict and (no_tx or no_desc):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
