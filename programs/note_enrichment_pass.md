# Program: note enrichment pass — COMPLETE for ledger-cited notes (2026-08-04)

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
opportunistic. — **MET 2026-08-04 (114/114).**

Opportunistic remainder: 748 of 983 corpus-wide notes still carry ingest
boilerplate. Those are uncited by the ledger, so they are low-priority; run the
same method if a chapter starts leaning on new material.

## Progress

- 2026-08-04 — batch 1 done: the 25 most-anchored ledger-cited notes enriched
  from transcripts (commit 9ea5c94), via three parallel fast-workers. Guarded
  by `99_Meta/scripts/check_note_frontmatter.py` (now an ingest-workflow gate).
- Earlier pass (commit 2f41dc0) reworked notes 003-044 into the richer format
  (`## Book angles`, `## Theme hooks`) — two note formats coexist by design.
- 2026-08-04 — round 2 done: 25 more enriched (commits 24f9f1b and parent).
  Agents now self-validate with check_note_frontmatter.py before reporting.
- 2026-08-04 — round 3 done. **All 114 ledger-cited notes enriched (0 boilerplate
  remaining, measured).** The program's done-criteria is met.

**Editing gotcha:** a few notes contain non-breaking spaces (U+00A0) around
em-dashes, which makes exact-string Edit matching fail confusingly. Inspect with
Python `repr()` and fall back to a scripted replacement for those files.

**Verification lesson:** transcripts are line-wrapped caption text, so
multi-word greps fail across line breaks. Always join lines before checking a
quote or figure: `tr '\n' ' ' < transcript | tr -s ' ' | grep -oiE '...'`.
