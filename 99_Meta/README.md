# 99_Meta

## Overview

The knowledge base's back office. It holds the corpus tooling and the files that tooling reads and writes: the KB index, channel overview, video inventory, theme map, corpus stats, classification JSON, the corpus-quality floor and the redaction list. Most of these notes are generated. Edit the script, not the note.

`transcripts/` is gitignored and large. `batches/` and `audits/` hold generated reports. None of them carry code.

## Subdirectories & Boundaries

- [scripts](./scripts/README.md): ingest pipeline (`ingest_ai_engineer_videos.py`, `update_ai_engineer_channel.py`, `retry_ingest.py`), corpus gates (`corpus_health.py`, `check_note_frontmatter.py`), book classifiers and website exports. Its `anchor/` folder ties quotes to transcripts and checks ledgers and prose.
