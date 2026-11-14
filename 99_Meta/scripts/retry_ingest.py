#!/usr/bin/env python3
"""Ingest the missing channel videos in small, slow chunks, backing off when YouTube says 429.

One run:
  1. refresh the channel inventory (update_ai_engineer_channel.py --dry-run) and read the missing list;
  2. ingest at most CHUNK of them with long pauses between requests;
  3. if nothing could be ingested (all rate-limited), double the wait before the next run (3h -> 24h);
     if anything was ingested, reset the wait.

Meant to be started every few hours by launchd. It never commits. It writes no note for a video whose
captions could not be fetched, so a skipped video simply stays in the next run's missing list.

    python3 99_Meta/scripts/retry_ingest.py [--chunk 8] [--force]
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPTS = ROOT / "99_Meta" / "scripts"
STATE = ROOT / "99_Meta" / ".ingest-backoff.json"   # {"next_run_after": epoch seconds, "wait_hours": n}
BASE_WAIT_H, MAX_WAIT_H = 3, 24

PACING = {  # slower than the ingest defaults (2 / 3 / 2) on purpose
    "INGEST_SLEEP_REQUESTS": "8",
    "INGEST_SLEEP_SUBTITLES": "15",
    "INGEST_ATTEMPTS": "3",
}


def load_state() -> dict:
    try:
        return json.loads(STATE.read_text())
    except (OSError, json.JSONDecodeError):
        return {"next_run_after": 0, "wait_hours": BASE_WAIT_H}


def save_state(state: dict) -> None:
    STATE.write_text(json.dumps(state))


def first_json(text: str) -> dict:
    """The update script prints a '[channel] ...' line before its JSON report."""
    return json.loads(text[text.index("{"):])


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--chunk", type=int, default=8)
    ap.add_argument("--force", action="store_true", help="ignore the back-off timer")
    args = ap.parse_args()

    # Only main is guaranteed to hold every note. This job decides what is
    # missing by globbing 01_Videos in the working tree, so on a branch cut
    # before a corpus PR merged, that PR's talks look missing and get fetched
    # again — numbered from the smaller corpus, so the same talk lands under a
    # second sequence number. That happened three times on 2026-11-14
    # (1543/1538, 1547/1542, 1558/1543) and cost ten caption fetches against a
    # rate limit that takes days to recover.
    #
    # Waiting is cheap and the fetch budget is not, so stop rather than guess.
    # Nothing is lost: the talks stay in the next run's missing list.
    branch = subprocess.run(["git", "rev-parse", "--abbrev-ref", "HEAD"],
                            cwd=ROOT, capture_output=True, text=True)
    current = branch.stdout.strip()
    if branch.returncode == 0 and current and current != "main":
        print(f"[retry] on branch '{current}', not main — skipping. "
              "A branch can be missing notes that main has, and re-fetching those "
              "duplicates them. Merge or switch back to main.")
        return 0

    state = load_state()
    if not args.force and time.time() < state["next_run_after"]:
        wait_left = (state["next_run_after"] - time.time()) / 3600
        print(f"[retry] backing off, {wait_left:.1f}h left")
        return 0

    dry = subprocess.run([sys.executable, str(SCRIPTS / "update_ai_engineer_channel.py"), "--dry-run"],
                         cwd=ROOT, capture_output=True, text=True)
    if dry.returncode != 0:
        print(f"[retry] inventory failed: {dry.stderr.strip()[:300]}")
        return 1
    report = first_json(dry.stdout)
    if report["status"] == "up_to_date":
        print("[retry] up to date, nothing missing")
        save_state({"next_run_after": 0, "wait_hours": BASE_WAIT_H})
        return 0

    rows = [json.loads(line) for line in Path(report["missing_inventory"]).read_text().splitlines() if line.strip()]
    chunk = rows[: args.chunk]
    chunk_path = Path("/tmp/ai-engineer-missing-chunk.jsonl")
    chunk_path.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in chunk))
    first, last = int(chunk[0]["playlist_index"]), int(chunk[-1]["playlist_index"])
    print(f"[retry] {len(rows)} missing; ingesting {len(chunk)} (#{first}-#{last})")

    ingest = subprocess.run(
        [str(SCRIPTS / "ingest_ai_engineer_videos.py"), "--inventory", str(chunk_path),
         "--limit", str(len(chunk)), "--offset", "0", "--batch-name", f"recent-{first:03d}-{last:03d}"],
        cwd=ROOT, capture_output=True, text=True, env=dict(os.environ, **PACING))
    print(ingest.stdout[-1500:])
    if ingest.returncode != 0:
        print(f"[retry] ingest failed: {ingest.stderr.strip()[:300]}")
        return 1
    done = first_json(ingest.stdout).get("ingested", 0)

    if done:
        subprocess.run([str(SCRIPTS / "build_book_synthesis.py")], cwd=ROOT, capture_output=True, text=True)
        save_state({"next_run_after": 0, "wait_hours": BASE_WAIT_H})
        print(f"[retry] ingested {done}; {len(rows) - done} still missing")
        # Backstop to the branch guard above, which only covers the cause we
        # know about. Nobody reads this log until something looks wrong, so a
        # duplicate has to be loud enough to find by grepping for FAIL.
        health = subprocess.run([sys.executable, str(SCRIPTS / "corpus_health.py")],
                                cwd=ROOT, capture_output=True, text=True)
        if health.returncode != 0:
            print("[retry] FAIL corpus_health rejected the corpus after this run:")
            print(health.stdout[-1200:])
    else:
        wait = min(MAX_WAIT_H, state["wait_hours"] * 2 if state["next_run_after"] else BASE_WAIT_H)
        save_state({"next_run_after": time.time() + wait * 3600, "wait_hours": wait})
        print(f"[retry] nothing ingested (rate limited); backing off {wait}h")
    return 0


if __name__ == "__main__":
    sys.exit(main())
