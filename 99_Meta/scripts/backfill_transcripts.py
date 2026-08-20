#!/usr/bin/env python3
"""Fetch transcripts for existing notes that lack them.

The ingest script only processes videos with no note yet, so a video ingested
while it was still an unaired premiere keeps `transcript_status: unavailable`
forever — the note exists, so ingest skips it, and nothing else retries. This
closes that gap: it walks every note, finds the ones with no transcript file,
and fetches each one (updating the note's frontmatter status on success).

Run locally — YouTube blocks datacenter IPs for per-video requests.

    python3 99_Meta/scripts/backfill_transcripts.py [--limit N]
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "99_Meta" / "scripts"))
from ingest_ai_engineer_videos import Video, fetch_transcript  # noqa: E402


def have_transcript_ids() -> set[str]:
    have: set[str] = set()
    for sub in ("plain", "raw"):
        d = ROOT / "99_Meta" / "transcripts" / sub
        if d.is_dir():
            for p in d.iterdir():
                m = re.search(r"([A-Za-z0-9_-]{11})", p.stem)
                if m:
                    have.add(m.group(1))
    return have


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=None)
    args = ap.parse_args()

    have = have_transcript_ids()
    targets = []
    for n in sorted((ROOT / "01_Videos").glob("*.md")):
        m = re.match(r"\d+-([A-Za-z0-9_-]{11})-", n.name)
        if m and m.group(1) not in have:
            targets.append((m.group(1), n))
    if args.limit:
        targets = targets[: args.limit]

    print(f"[backfill] notes lacking transcripts: {len(targets)}")
    ok = 0
    unavailable = []
    for vid, note in targets:
        video = Video(
            id=vid, title=note.stem, url=f"https://www.youtube.com/watch?v={vid}",
            description="", duration_string="", duration_seconds=None,
            playlist_index=None, view_count=None,
        )
        status, _raw, _plain = fetch_transcript(video)
        if status == "unavailable":
            unavailable.append(note.name)
            print(f"  UNAVAILABLE {vid}  {note.name[:60]}")
            continue
        ok += 1
        # Keep the note's recorded status honest now that a transcript exists.
        text = note.read_text()
        # The ingest script writes these unquoted; tolerate both forms.
        new = re.sub(r'^transcript_status: "?unavailable"?$',
                     f'transcript_status: "{status}"', text, count=1, flags=re.M)
        new = re.sub(r'^transcript_path: ""?$',
                     f'transcript_path: "99_Meta/transcripts/plain/{vid}.txt"',
                     new, count=1, flags=re.M)
        if new != text:
            note.write_text(new)
        print(f"  OK {status} {vid}")

    print(f"\n[backfill] fetched {ok}, still unavailable {len(unavailable)}")
    if unavailable:
        print("Still unavailable (private, deleted, or captions not yet generated):")
        for u in unavailable:
            print(f"  - {u}")


if __name__ == "__main__":
    main()
