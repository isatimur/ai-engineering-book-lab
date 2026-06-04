#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
VIDEO_DIR = ROOT / "01_Videos"
SCRIPT_DIR = ROOT / "99_Meta" / "scripts"
INGEST_SCRIPT = SCRIPT_DIR / "ingest_ai_engineer_videos.py"
BOOK_SYNTHESIS_SCRIPT = SCRIPT_DIR / "build_book_synthesis.py"

CHANNEL_URL = "https://www.youtube.com/@aiDotEngineer/videos"
CANONICAL_INVENTORY = Path("/tmp/ai-engineer-videos.jsonl")
LATEST_INVENTORY = Path("/tmp/ai-engineer-videos-latest.jsonl")


def run(cmd: list[str], cwd: Path | None = None) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)


def read_jsonl(path: Path) -> list[dict]:
    rows = []
    with path.open() as f:
        for line in f:
            if line.strip():
                rows.append(json.loads(line))
    return rows


def write_jsonl(path: Path, rows: list[dict]) -> None:
    with path.open("w") as f:
        for row in rows:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")


def frontmatter_value(text: str, key: str) -> str | None:
    match = re.search(rf"^{re.escape(key)}:\s*(.+?)\s*$", text, re.M)
    if not match:
        return None
    return match.group(1).strip().strip('"')


def existing_video_indices() -> dict[str, int]:
    indices: dict[str, int] = {}
    for path in VIDEO_DIR.glob("*.md"):
        text = path.read_text(errors="ignore")[:1200]
        video_id = frontmatter_value(text, "video_id")
        playlist_index = frontmatter_value(text, "playlist_index")
        if not video_id or not playlist_index:
            continue
        try:
            indices[video_id] = int(playlist_index)
        except ValueError:
            continue
    return indices


def fetch_latest_inventory(channel_url: str, output_path: Path) -> None:
    yt_dlp = shutil.which("yt-dlp") or "yt-dlp"
    proc = run([
        yt_dlp,
        "--flat-playlist",
        "--dump-json",
        "--playlist-reverse",
        channel_url,
    ], cwd=ROOT)
    if proc.returncode != 0:
        raise SystemExit(proc.stderr.strip() or "yt-dlp failed while fetching the channel inventory")
    output_path.write_text(proc.stdout)


def normalize_inventory(rows: list[dict], known_indices: dict[str, int]) -> tuple[list[dict], list[dict]]:
    missing = [row for row in rows if row.get("id") not in known_indices]
    max_index = max(known_indices.values(), default=0)

    # YouTube's playlist_index for channel videos is newest-first. Sorting missing
    # rows by that value descending gives oldest-new-video -> newest-new-video.
    missing.sort(key=lambda row: int(row.get("playlist_index") or 0), reverse=True)

    normalized_indices = dict(known_indices)
    for offset, row in enumerate(missing, start=1):
        normalized_indices[row["id"]] = max_index + offset

    normalized: list[dict] = []
    for row in rows:
        video_id = row.get("id")
        if not video_id or video_id not in normalized_indices:
            continue
        item = dict(row)
        item["playlist_index"] = normalized_indices[video_id]
        item["webpage_url"] = item.get("webpage_url") or item.get("url") or f"https://www.youtube.com/watch?v={video_id}"
        item["url"] = item["webpage_url"]
        normalized.append(item)

    normalized.sort(key=lambda row: int(row["playlist_index"]))
    missing_normalized = [row for row in normalized if row["id"] in {item["id"] for item in missing}]
    return normalized, missing_normalized


def batch_name_for(missing_rows: list[dict]) -> str:
    first = int(missing_rows[0]["playlist_index"])
    last = int(missing_rows[-1]["playlist_index"])
    return f"recent-{first:03d}-{last:03d}"


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch the latest AI Engineer channel inventory and ingest only missing videos.")
    parser.add_argument("--channel-url", default=CHANNEL_URL)
    parser.add_argument("--latest-inventory", type=Path, default=LATEST_INVENTORY)
    parser.add_argument("--canonical-inventory", type=Path, default=CANONICAL_INVENTORY)
    parser.add_argument("--dry-run", action="store_true", help="Fetch and compare, but do not run ingestion.")
    parser.add_argument("--no-fetch", action="store_true", help="Use --latest-inventory as-is instead of calling yt-dlp.")
    args = parser.parse_args()

    if not args.no_fetch:
        fetch_latest_inventory(args.channel_url, args.latest_inventory)

    latest_rows = read_jsonl(args.latest_inventory)
    known_indices = existing_video_indices()
    normalized_rows, missing_rows = normalize_inventory(latest_rows, known_indices)
    write_jsonl(args.canonical_inventory, normalized_rows)

    report = {
        "checked_at": datetime.now().isoformat(timespec="seconds"),
        "channel_url": args.channel_url,
        "inventory_count": len(normalized_rows),
        "existing_notes": len(known_indices),
        "missing_count": len(missing_rows),
        "canonical_inventory": str(args.canonical_inventory),
        "latest_inventory": str(args.latest_inventory),
    }

    if not missing_rows:
        print(json.dumps(report | {"status": "up_to_date"}, indent=2))
        return

    batch_name = batch_name_for(missing_rows)
    missing_path = Path(f"/tmp/ai-engineer-missing-{batch_name}.jsonl")
    write_jsonl(missing_path, missing_rows)
    report |= {
        "status": "missing_found",
        "batch_name": batch_name,
        "missing_inventory": str(missing_path),
        "missing_videos": [
            {
                "playlist_index": row["playlist_index"],
                "id": row["id"],
                "title": row.get("title") or row["id"],
            }
            for row in missing_rows
        ],
    }

    if args.dry_run:
        print(json.dumps(report, indent=2, ensure_ascii=False))
        return

    proc = run([
        str(INGEST_SCRIPT),
        "--inventory",
        str(missing_path),
        "--limit",
        str(len(missing_rows)),
        "--offset",
        "0",
        "--batch-name",
        batch_name,
    ], cwd=ROOT)
    if proc.stdout:
        print(proc.stdout.strip())
    if proc.returncode != 0:
        if proc.stderr:
            print(proc.stderr.strip())
        raise SystemExit(proc.returncode)

    synthesis_proc = run([str(BOOK_SYNTHESIS_SCRIPT)], cwd=ROOT)
    if synthesis_proc.stdout:
        print(synthesis_proc.stdout.strip())
    if synthesis_proc.returncode != 0:
        if synthesis_proc.stderr:
            print(synthesis_proc.stderr.strip())
        raise SystemExit(synthesis_proc.returncode)


if __name__ == "__main__":
    main()
