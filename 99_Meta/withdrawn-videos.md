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

## The tapes

Removing a note does not remove the transcript. Both talks kept their files in the
transcripts mirror for eight weeks after withdrawal, because the mirror is a separate
repo and the 2026-09-19 removal only touched `01_Videos/`. They were dropped from mirror
HEAD on 2026-11-14, by the rule just above: a normal commit, no history rewrite, so older
commits still contain them.

They surfaced as the only two tapes in the mirror with no note on disk — 1452 tapes
against 1450 notes. That diff is the check worth keeping:

```
comm -23 <(ls 99_Meta/transcripts/plain/*.txt | xargs -n1 basename | sed 's/\.txt$//' | sort) \
         <(ls 01_Videos/*.md | sed -E 's/.*\/[0-9]+-([A-Za-z0-9_-]{11})-.*/\1/' | sort)
```

Empty is correct. Anything listed is a talk the corpus no longer claims but still stores.
