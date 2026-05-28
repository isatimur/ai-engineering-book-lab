# Book Autoresearch Program

## Objective
Produce a source-backed AI engineering book by running bounded autonomous research passes that improve synthesis, evidence quality, and chapter draftability.

## Optimize for
- defensible claims over novelty
- reusable chapter material over generic summaries
- explicit tensions over fake consensus
- source density over rhetorical flourish

## Never do
- invent support
- flatten disagreement
- silently rewrite raw source meaning
- promote weak observations into strong claims without caveats
- cite a whole video when the grounding moment is known — use a Source Anchor

## Standard pass
1. Pick one bounded target.
2. Gather source cluster.
3. Extract observations, tensions, and implications.
4. Promote only supported claims.
5. Update synthesis/evidence/manuscript files.
6. Log what changed and what remains weak.

## Promotion pipeline
observation -> verified claim -> evidence pack -> chapter argument -> prose draft

## Source Anchors
Every supporting source on a promoted claim is a Source Anchor — `{video_id, start, end, quote, confidence}` — not a bare video link. A pass that extracts a claim is already reading the transcript, so it records the verbatim quote and its timestamps at promotion time (ADR-0002). The anchoring procedure, the ledger format, and the `99_Meta/scripts/anchor/cli.py` tool are documented in `programs/source_anchoring_pass.md`.

## Specialized passes
- `programs/source_anchoring_pass.md` — backfill Source Anchors for ledger claims that don't have one yet.
- `programs/chapter_drafting_pass.md` — turn a Starter-status chapter into a Drafting-status chapter using its packet's source cluster + strongest claims. Per-chapter, bounded, output is prose + ledger entries; anchoring is the next pass.
