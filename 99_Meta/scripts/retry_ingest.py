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
import re
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


def notes_in_other_refs() -> dict[str, str]:
    """Map video id -> a git ref that already carries a note for it.

    This job decides what is missing by globbing 01_Videos in the working tree,
    so any talk whose note lives only on some other branch looks missing. Fetch
    it again and the ingest numbers it `max(playlist_index on disk) + offset`
    (update_ai_engineer_channel.py), which is lower than the number it already
    has elsewhere — one talk, two notes, two sequence numbers.

    That happened three times on 2026-11-14 (1543/1538, 1547/1542, 1558/1543)
    while a corpus PR was open: ten caption fetches for five talks, against a
    rate limit that takes days to recover.

    Checking the branch name instead would miss the common path, which is to
    open the PR and go back to main — main lacks those notes too. So ask the
    object store, which needs no network and does not care what is checked out.

    Known limit: a note on an abandoned branch keeps its talk out of the ingest
    forever. Every caller logs the ref it skipped for, so that is visible rather
    than silent. On 2026-11-14 the only such notes across 33 refs were the two
    talks withdrawn at speaker request, which never reach the missing list
    anyway. The nightly `bot/ingest-channel` workflow is a second ingester that
    this cannot see; it runs from a fresh checkout of main.
    """
    refs = subprocess.run(["git", "for-each-ref", "--format=%(refname)",
                           "refs/heads", "refs/remotes"],
                          cwd=ROOT, capture_output=True, text=True)
    if refs.returncode != 0:
        return {}
    found: dict[str, str] = {}
    for ref in refs.stdout.split():
        tree = subprocess.run(["git", "ls-tree", "-r", "--name-only", ref, "--", "01_Videos/"],
                              cwd=ROOT, capture_output=True, text=True)
        if tree.returncode != 0:
            continue
        for path in tree.stdout.splitlines():
            if m := re.search(r"/\d+-([A-Za-z0-9_-]{11})-", path):
                found.setdefault(m.group(1), ref)
    return found


def load_state() -> dict:
    try:
        return json.loads(STATE.read_text())
    except (OSError, json.JSONDecodeError):
        return {"next_run_after": 0, "wait_hours": BASE_WAIT_H}


def save_state(state: dict) -> None:
    STATE.write_text(json.dumps(state))


def first_json(text: str) -> dict:
    """Read the JSON report, tolerating any chatter printed before it.

    The update script used to print a '[channel] ...' line to stdout ahead of
    its report. This loop coped; CI did not, and parsed the report with jq into
    an empty missing_count for two months (fixed 2026-11-14 by sending that line
    to stderr). The tolerance stays as a belt — a future diagnostic on stdout
    should not stop the ingest — but it is no longer load-bearing.
    """
    return json.loads(text[text.index("{"):])


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--chunk", type=int, default=8)
    ap.add_argument("--force", action="store_true", help="ignore the back-off timer")
    args = ap.parse_args()

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

    elsewhere = notes_in_other_refs()
    kept = []
    for row in rows:
        if ref := elsewhere.get(row.get("id")):
            print(f"[retry] skip {row['id']}: already has a note on {ref}")
        else:
            kept.append(row)
    if len(kept) != len(rows):
        print(f"[retry] {len(rows) - len(kept)} of {len(rows)} missing talk(s) already noted "
              "on another ref; merge it to stop them looking missing")
        rows = kept
    if not rows:
        print("[retry] every missing talk already has a note elsewhere; nothing to fetch")
        return 0

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
