# Program: note enrichment pass (specified, not yet run)

**Goal:** upgrade `01_Videos/*.md` auto-summaries (truncated descriptions)
into real 3-5 sentence summaries with a "why it matters for the book" line,
using the local transcript as source.

**Contract:** batch of 25 notes per run; each note gets summary rewritten
from `99_Meta/transcripts/plain/<id>.txt` (never invented); frontmatter
`summary:` updated to match; existing Artifacts sections untouched; diff
reviewed against transcript spot-checks before commit. Budget: one session
per ~100 notes. Priority order: videos cited in the Claims Ledger first
(199 anchors), then by view count.

**Done when:** all ledger-cited videos have enriched notes; rest is
opportunistic.

## Progress

- 2026-08-04 — batch 1 done: the 25 most-anchored ledger-cited notes enriched
  from transcripts (commit 9ea5c94), via three parallel fast-workers. Guarded
  by `99_Meta/scripts/check_note_frontmatter.py` (now an ingest-workflow gate).
- Earlier pass (commit 2f41dc0) reworked notes 003-044 into the richer format
  (`## Book angles`, `## Theme hooks`) — two note formats coexist by design.
- Remaining: ~46 ledger-cited notes still on ingest boilerplate. Same method,
  25 per run, highest anchor count first.

**Verification lesson:** transcripts are line-wrapped caption text, so
multi-word greps fail across line breaks. Always join lines before checking a
quote or figure: `tr '\n' ' ' < transcript | tr -s ' ' | grep -oiE '...'`.
