#!/usr/bin/env python3
"""Fetch full YouTube descriptions for corpus videos (metadata only, stdlib+yt-dlp).

Writes/extends 99_Meta/video-descriptions.jsonl — one {id, title, description}
per line. Resumable and idempotent: already-fetched ids are skipped, so the
nightly/ingest run only fills gaps left by new videos.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "99_Meta" / "video-descriptions.jsonl"
CHUNK = 25


def main() -> None:
    done: set[str] = set()
    if OUT.exists():
        for line in OUT.read_text().splitlines():
            try:
                done.add(json.loads(line)["id"])
            except (json.JSONDecodeError, KeyError):
                continue

    ids = []
    for n in sorted((ROOT / "01_Videos").glob("*.md")):
        m = re.match(r"\d+-([A-Za-z0-9_-]{11})-", n.name)
        if m and m.group(1) not in done:
            ids.append(m.group(1))

    print(f"[descriptions] to fetch: {len(ids)} (have {len(done)})")
    with OUT.open("a") as f:
        for i in range(0, len(ids), CHUNK):
            batch = [f"https://www.youtube.com/watch?v={v}" for v in ids[i : i + CHUNK]]
            r = subprocess.run(
                ["yt-dlp", "--skip-download", "--ignore-errors", "-j", *batch],
                capture_output=True, text=True,
            )
            for line in r.stdout.splitlines():
                try:
                    d = json.loads(line)
                except json.JSONDecodeError:
                    continue
                f.write(json.dumps(
                    {"id": d.get("id"), "title": d.get("title"),
                     "description": d.get("description", "")},
                    ensure_ascii=False) + "\n")
            f.flush()
    print("[descriptions] done")


if __name__ == "__main__":
    main()
