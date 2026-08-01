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
