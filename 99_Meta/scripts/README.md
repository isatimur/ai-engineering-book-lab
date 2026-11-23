# scripts

## Overview

Corpus tooling for the AI Engineer knowledge base. The scripts pull talks from the AI Engineer YouTube channel, write one note per talk in `01_Videos/`, and rebuild the indexes, theme notes and stats that sit on top. Other scripts classify talks for the second and third books, merge judge runs, and export chapter history for the website. The `test_*.py` files beside them are the negative controls that CI runs.

## Interface

Ingest pipeline:

- `update_ai_engineer_channel.py` fetches the channel inventory with `yt-dlp`, finds talks with no note, and ingests them. Flags `--channel-url`, `--latest-inventory`, `--canonical-inventory`, `--dry-run`, `--no-fetch`. Prints a JSON report with `status` `up_to_date` or `missing_found` [update_ai_engineer_channel.py:main].
- `ingest_ai_engineer_videos.py` ingests rows from a JSONL inventory. Flags `--inventory` (default `/tmp/ai-engineer-videos.jsonl`), `--limit` (20), `--offset` (0), `--batch-name`. Prints a JSON summary [ingest_ai_engineer_videos.py:main]. Other scripts import `load_existing_notes`, `NoteRecord`, `parse_frontmatter`, `fetch_transcript`, `rebuild_corpus_artifacts` [ingest_ai_engineer_videos.py:rebuild_corpus_artifacts].
- `retry_ingest.py` ingests missing talks in small chunks and backs off when YouTube rate-limits. Flags `--chunk` (8), `--force`. Exit 1 only when the dry run or the ingest subprocess fails [retry_ingest.py:main].
- `backfill_transcripts.py --limit N` fetches transcripts for notes marked `transcript_status: unavailable` [backfill_transcripts.py:main].
- `fetch_video_descriptions.py` appends missing descriptions to `99_Meta/video-descriptions.jsonl`. Exit 1 when ids were pending and none were fetched [fetch_video_descriptions.py:main].
- `semantic_cleanup.py` refreshes themes and summaries, annotates duplicate pairs, and builds People and Concept notes. No flags [semantic_cleanup.py:main].
- `build_shared_artifacts.py` builds `evidence/Shared Artifacts.md` and adds `## Artifacts` sections to notes. `classify(url, host)` returns `(kind, canonical_url)` or `None` [build_shared_artifacts.py:classify].
- `build_book_synthesis.py` regenerates four notes in `05_Book_Ideas/` [build_book_synthesis.py:main].

Gates and reports:

- `corpus_health.py [--strict]` reports transcript and description debt, stubs and duplicates. Exit 1 on duplicate video ids, on an enriched count below the floor, or with `--strict` on missing transcripts or descriptions [corpus_health.py:main]. Helpers `is_stub(text)`, `enrichment_verdict(enriched, floor)` [corpus_health.py:enrichment_verdict].
- `check_note_frontmatter.py` validates note frontmatter and sections. Exit 1 on any problem [check_note_frontmatter.py:main].
- `build_stats.py` writes the project counts. `build() -> Stats`, `render_md(Stats)` [build_stats.py:build].

Book tooling:

- `classify_second_book.py [--dry-run]` sorts notes into Part I and Part II candidates [classify_second_book.py:classify].
- `classify_third_book.py [--dry-run] [--markdown]` builds per-chapter shortlists from curated maps [classify_third_book.py:classify].
- `build_judge_scores.py` merges completed judge runs. Flags `--runs`, `--run`, `--out`, `--version-id`. Exit 1 when `--run` names an agent-judged run or one with too many null scores [build_judge_scores.py:main].
- `panel_merge.py` merges several single-model judge runs into one median run. Flags `--runs`, `--out` (required), `--n-auto` (3), `--runs-dir` [panel_merge.py:main]. Functions `run`, `merge_panel`, `build_rollups`, `assemble_output` [panel_merge.py:run].
- `build_versions.py --out PATH` exports chapter git history to `versions.json` [build_versions.py:main].

Subdirectory:

- [anchor](./anchor/README.md): quote-to-transcript anchoring (`locate_quote`, `load_word_stream`) and the ledger and prose quote checkers.

## Invariants

- Only `rebuild_corpus_artifacts` writes the corpus artifacts. `First Serious Synthesis Pack.md` belongs to `build_book_synthesis.py` [ingest_ai_engineer_videos.py:rebuild_corpus_artifacts].
- A transcript is marked `unavailable` only when `yt-dlp` says in words that there are no subtitles. Every other failure raises `TranscriptFetchBlocked`; the talk gets no note and stays queued [ingest_ai_engineer_videos.py:fetch_transcript].
- Ingest does not run `yt-dlp` again when `raw/<id>*.vtt` exists [ingest_ai_engineer_videos.py:fetch_transcript].
- Note file name is `{playlist_index:03d}-{video_id}-{slug}.md` [ingest_ai_engineer_videos.py:write_note]. Default batch name is `recent-NNN-NNN` [update_ai_engineer_channel.py:batch_name_for].
- Talks listed in `99_Meta/withdrawn-videos.md` are never ingested [update_ai_engineer_channel.py:withdrawn_video_ids].
- `update_ai_engineer_channel.py` keeps stdout for the JSON report; diagnostics go to stderr [update_ai_engineer_channel.py:normalize_inventory].
- Back-off starts at 3 hours, doubles, and caps at 24 hours. Any ingest resets it [retry_ingest.py:BASE_WAIT_H]. `retry_ingest.py` skips talks that already have a note on another git ref [retry_ingest.py:notes_in_other_refs].
- Corpus-quality ratchet: the enriched count must not fall below `enriched_floor` in `99_Meta/corpus-quality.json` [corpus_health.py:enrichment_verdict].
- Required frontmatter keys are `video_id`, `playlist_index`, `title`, `url`, `summary` [check_note_frontmatter.py:REQUIRED_KEYS].
- `build_book_synthesis.py` aborts when a hard-coded note id is missing [build_book_synthesis.py:must]. `classify_third_book.py` aborts when a curated index is missing or is both assigned and excluded [classify_third_book.py:classify].
- Redaction fails closed: a `forbidden` token from `99_Meta/redactions.json` that survives redaction aborts the write [build_versions.py:_redact].
- A judge run counts only if `status == "completed"`, it is not agent-judged, and its null native-score share is at most 0.05 [build_judge_scores.py:_completed_runs]. Panel inputs must share one `corpus_snapshot_hash` [panel_merge.py:assemble_output].

## Side Effects

- Network: `yt-dlp` calls to YouTube [update_ai_engineer_channel.py:fetch_latest_inventory], [ingest_ai_engineer_videos.py:fetch_transcript], [fetch_video_descriptions.py:main].
- Ingest writes `01_Videos/*.md`, `02_Themes/*.md`, `99_Meta/transcripts/raw|plain/`, `99_Meta/batches/<batch>.md`, and rewrites `99_Meta/AI Engineer KB Index.md`, `99_Meta/Channel Overview.md`, `99_Meta/Theme Map.md`, `99_Meta/Corpus Stats.md`, `99_Meta/Video Inventory.md`, `05_Book_Ideas/Book Outline Seeds.md` [ingest_ai_engineer_videos.py:rebuild_corpus_artifacts].
- `semantic_cleanup.py` also calls `rebuild_corpus_artifacts`, rewrites `01_Videos` notes, and writes `03_People/`, `04_Concepts/` and two reports in `99_Meta/audits/` [semantic_cleanup.py:main].
- Temp files: `/tmp/ai-engineer-videos.jsonl`, `/tmp/ai-engineer-videos-latest.jsonl`, `/tmp/ai-engineer-missing-*.jsonl` [update_ai_engineer_channel.py:CANONICAL_INVENTORY], [retry_ingest.py:main].
- State file: `99_Meta/.ingest-backoff.json` [retry_ingest.py:STATE].
- `retry_ingest.py` runs `git for-each-ref` and `git ls-tree`, then the update, ingest, synthesis and health scripts. It never commits [retry_ingest.py:main].
- `build_stats.py` writes `STATS.md` and `stats.json` at the repo root and `website/src/data/stats.json` [build_stats.py:main].
- `build_versions.py` runs `git log` and `git show` and writes `website/src/data/versions.json` and `website/src/data/versions/NN/` [build_versions.py:main].
- `build_judge_scores.py` writes `website/src/data/judge-scores.json` [build_judge_scores.py:main]. `panel_merge.py` writes `<runs-dir>/<out>/scores.json` and `run.json` [panel_merge.py:run].
- Classifiers write `99_Meta/second-book-classification.json`, `99_Meta/third-book-classification.json` and `05_Book_Ideas/Second Book - Part I|II Candidates.md` unless `--dry-run` [classify_second_book.py:write_shortlist], [classify_third_book.py:main].

## Verification

- Run from the repo root: `for t in 99_Meta/scripts/test_*.py; do python3 "$t"; done`
- CI runs the same files, plus `scripts/test_*.py`, from `.github/workflows/script-tests.yml`.
