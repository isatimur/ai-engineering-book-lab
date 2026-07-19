---
name: corpus-sync
description: Ingest new videos from the AI Engineer YouTube channel into 01_Videos/, refreshing themes/indexes/stats. Use when a channel-watcher issue reports new videos, when asked to sync/refresh/update the corpus, or before running tasks/sync_sources.md.
---

# Corpus Sync

Runs the project's documented `sync_sources` procedure end-to-end: fetch the
current channel inventory, ingest only what's missing from `01_Videos/`, and
regenerate every downstream index and stats file the ingest script owns.

This wraps [`tasks/sync_sources.md`](../../../tasks/sync_sources.md) and
[`99_Meta/scripts/update_ai_engineer_channel.py`](../../../99_Meta/scripts/update_ai_engineer_channel.py)
— the same script the nightly `ingest-channel.yml` GitHub Action runs in
`mode=ingest`. Everything below is derived from actually running this
end-to-end, including a real failure mode worth knowing before you start.

## Steps

### 1. Ensure `yt-dlp` is on PATH

```bash
pip install --quiet --upgrade yt-dlp
export PATH="$HOME/.local/bin:$PATH"   # pip --user installs land here
yt-dlp --version
```

### 2. Dry run first

```bash
cd <repo root>
python3 99_Meta/scripts/update_ai_engineer_channel.py --dry-run
```

Read the JSON report's `missing_count` and `batch_name`. If `missing_count`
is `0`, you're done — nothing to ingest, and any open `channel-watcher`
issues are stale (see step 5). **Note:** if multiple `channel-watcher` issues
have piled up (each night's check compares against the same un-ingested
baseline), one real run clears the entire backlog at once — you don't need
to process issues one at a time.

### 3. Run the real ingest

```bash
python3 99_Meta/scripts/update_ai_engineer_channel.py
```

This fetches transcripts per video (via `yt-dlp --write-auto-subs`), writes
one note per new video to `01_Videos/`, then runs
`99_Meta/scripts/build_book_synthesis.py`, regenerating `02_Themes/*.md`,
`99_Meta/{AI Engineer KB Index, Channel Overview, Corpus Stats, Theme Map,
Video Inventory}.md`, and `05_Book_Ideas/*.md`. All rule-based (keyword
matching), no LLM calls, no API key needed.

### 4. Known failure mode: YouTube bot-check

Transcript fetch can fail for every video in a batch with:

```
ERROR: [youtube] <id>: Sign in to confirm you're not a bot. Use --cookies-from-browser or --cookies...
```

This is an IP-reputation block on the environment's egress IP, not a
per-video or extractor-flag issue — it reproduces identically across every
`player_client` (`web`, `android`, `tv`, `ios`, `web_safari`,
`web_embedded`). Don't waste time cycling player clients; none of them fix
it. The script degrades gracefully (`transcript_status: unavailable` in the
note frontmatter, not a crash), so **let the ingest finish anyway** — you
still get accurate metadata-based notes, correct theme tags, and updated
stats. What you lose is the transcript excerpt and the ability to run
claims-anchoring on this batch. Report the failure honestly (like the note
frontmatter already does); don't fabricate transcript content.

Real fixes, in order of effort:
- Re-run from a network with a clean YouTube IP reputation.
- Pass `--cookies-from-browser <browser>` (needs a logged-in session available to the runner).
- Retry later — IP blocks can be temporary.

### 5. Regenerate stats, then check for stale hardcoded counts

```bash
python3 99_Meta/scripts/build_stats.py
```

Then grep for the old corpus count and update any hardcoded mentions in
`README.md` and elsewhere — the ingest script only updates files it directly
owns (indexes it generates), not prose that quotes the count:

```bash
grep -rln "<old-count>" --include="*.md" . | grep -v node_modules
```

Leave alone: diagram PNGs (baked at export time — needs manual Excalidraw
re-export, a separate job) and anything documenting a past state on purpose
(e.g. `website/docs/DESIGN-REVIEW.md`, `ROADMAP.md`'s dated log rows).

### 6. Ship it

Commit the new `01_Videos/*.md` notes, the regenerated indexes/stats, and any
count fixes together. Follow the review-checklist shape the `ingest-channel.yml`
workflow's own auto-PR uses: skim a few new notes for accuracy, decide if the
transcript gap blocks a follow-up claims pass, confirm no manuscript content
needs touching (corpus growth alone never does).

**Note:** this skill does not close the `channel-watcher` issues it resolves
— issue-close is a separate write scope from repo commits. Close them
manually (or note in the PR which issue numbers the batch supersedes) after
merging.
