# Withdrawn videos

Talks excluded from the corpus **at the speaker's request**.

`update_ai_engineer_channel.py` treats every id listed here as already known, so the
daily ingest will not re-detect the talk as "missing" and re-add it. Without this file
a deletion under `01_Videos/` silently undoes itself within a day, because the ingest
compares the live channel against the notes on disk and refills any gap.

One id per line in the table. Keep the reason and the date: an entry whose reason is
lost becomes an unexplained hole in the corpus that someone will eventually "fix".

| video id | talk | withdrawn | reason |
|---|---|---|---|
| `T5IMo5ntyhA` | Stop Using RAG as Memory | 2026-09-19 | Speaker asked to be removed from the book and its corpus. |
| `H7puB0RwJMM` | Citation Needed: Provenance for LLM-Built Knowledge Graphs | 2026-09-19 | Same request. |

## What this does not cover

Verbatim speech by **other** people is not edited. Where a different speaker names a
withdrawn person from the stage, that transcript stands: the author can redact their own
text, not someone else's record of what they said. `01_Videos/322-…-mark-bain-aius.md`
is the current instance.

Published git history also retains withdrawn names. Rewriting it means a force-push that
breaks every clone, so it is a deliberate, separate decision and not part of a removal.
