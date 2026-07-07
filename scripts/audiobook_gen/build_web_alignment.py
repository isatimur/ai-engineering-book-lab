#!/usr/bin/env python3
"""Build web karaoke alignment JSON for a chapter (heuristic timings from MP3 duration).

Usage:
  python3 build_web_alignment.py --chapter 01 \\
    --display-md ../../website/src/content/chapter-01.md \\
    --mp3 ../../website/public/audiobook/ch-01.mp3 \\
    --out ../../website/public/audiobook/ch-01.align.json
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

from audiobook_gen.alignment import (
    build_display_map,
    heuristic_word_timings,
    strip_markdown_for_display,
    tokenize_display,
)
from audiobook_gen.normalize import normalize_markdown


def probe_duration(mp3: Path) -> float:
    r = subprocess.run(
        [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(mp3),
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    if r.returncode != 0:
        raise SystemExit(f"ffprobe failed for {mp3}")
    return float(r.stdout.strip())


def chapter_display_words(display_md: str) -> list[str]:
    blocks = [b.strip() for b in display_md.split("\n\n") if b.strip()]
    words: list[str] = []
    for block in blocks:
        if block.startswith("## Draft"):
            continue
        words.extend(tokenize_display(strip_markdown_for_display(block)))
    return words


def spoken_chapter_text(book_md: str, chapter_num: str) -> str:
    chapters = normalize_markdown(book_md)
    idx = int(chapter_num) - 1
    if idx < 0 or idx >= len(chapters):
        raise SystemExit(f"Chapter {chapter_num} not found ({len(chapters)} chapters parsed)")
    return chapters[idx].text


def main() -> int:
    p = argparse.ArgumentParser(description="Build chapter alignment JSON for web karaoke.")
    p.add_argument("--chapter", required=True, help="Chapter number, e.g. 01")
    p.add_argument("--book-md", help="Full book markdown (for spoken text via normalize)")
    p.add_argument("--display-md", required=True, help="Website chapter markdown (display tokens)")
    p.add_argument("--mp3", required=True, help="Chapter MP3 for duration")
    p.add_argument("--out", required=True, help="Output .align.json path")
    p.add_argument("--source-tag", default="heuristic")
    args = p.parse_args()

    chapter_num = args.chapter.zfill(2)
    display_md = Path(args.display_md).read_text(encoding="utf-8")
    mp3 = Path(args.mp3)
    out = Path(args.out)

    if args.book_md:
        spoken_text = spoken_chapter_text(Path(args.book_md).read_text(encoding="utf-8"), chapter_num)
    else:
        # Fallback: approximate spoken text from display markdown
        spoken_text = strip_markdown_for_display(display_md)
        spoken_text = re.sub(r"\n{2,}", " ", spoken_text)

    display_words = chapter_display_words(display_md)
    duration = probe_duration(mp3)
    timings = heuristic_word_timings(spoken_text, duration)
    spoken_tokens = [w.text for w in timings]
    display_map = build_display_map(spoken_tokens, display_words)

    payload = {
        "chapter": chapter_num,
        "spokenText": spoken_text,
        "source": args.source_tag,
        "durationSeconds": round(duration, 3),
        "words": [
            {"text": w.text, "start": round(w.start, 3), "end": round(w.end, 3)}
            for w in timings
        ],
        "displayMap": display_map,
        "displayWordCount": len(display_words),
    }
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"[align] wrote {out} ({len(timings)} spoken / {len(display_words)} display words)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
