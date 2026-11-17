# Does the lab need a research source type? Measured, not argued

**Date:** 2026-11-17
**Prompted by:** a proposal to add the `@code4AI` channel (displayed as
*Discover AI*) as a second corpus source — "more technical and related to
whitepapers, as a basement for real stuff and new approaches".

## The question the proposal actually raises

The channel explains recent LLM research papers. That is a different kind of
source from the one this lab is built on.

A talk in the corpus is testimony: an engineer reporting what happened when
their team did a thing. A paper walkthrough is one person's reading of someone
else's experiment. Put a quote from the second next to a quote from the first
in the same ledger, under the same Support level, and the level stops meaning
one thing.

So the proposal is not "add 473 videos". It is "add a third epistemic type".
Before building for it, measure whether anything would read it.

## Method

Count research-style citations in the published prose of books 1 and 2.

```
grep -rniE "arxiv|et al\.|\bdoi\b|the paper|a paper|research paper|preprint|research shows|study found" \
  public/drafting/*.md public/drafting-2/*.md
```

**Positive control first**, because a grep over an empty glob returns zero and
looks exactly like a finding. This repo shipped that defect three times.

| control | count |
|---|---|
| files matched | 18 |
| words | 50,222 |
| `\bthe\b` | 812 |
| `\bagent\b` | 132 |
| `\bspec\b` | 15 |

The target is real and populated.

## Result

| pattern | hits |
|---|---|
| `arxiv` | 0 |
| `et al.` | 0 |
| `the paper` / `a paper` | 0 |
| `preprint` | 0 |
| `research shows` / `study found` | 0 |
| **total** | **0** |

Across 18 chapters and 50,222 words, the two published books cite **no
research at all**. Every claim rests on a practitioner talk.

## What follows

**Do not add the channel as a second ingest source.** It would be a source
type with zero existing consumers, feeding a backlog that is already 52 deep
and draining only from one laptop at roughly two talks per eight-talk chunk.

**Do not build the `paper` anchor kind yet either.** This was the
recommendation before this measurement, on the reasoning that if the value is
whitepapers then the anchor should be the paper and not a video about the
paper — more durable than a YouTube transcript, more precise than a timestamp,
and checkable without watching anything. That reasoning still holds *if* the
demand appears. The measurement says it has not. Building it now is
infrastructure for a book that does not exist.

**The trigger to revisit is a decision, not a number.** If the author chooses
to write a book that argues from research rather than from practice, the
demand becomes real on that day, and the instrument should be built to fit the
claims it will carry — not guessed at a year early.

**Useful without ingesting anything:** the channel works as a discovery feed
for which papers are getting attention. That costs nothing and commits the
corpus to nothing.

## Limits

- This measures **published prose**, not intent. The author may already plan a
  research-facing book; this cannot see that, and a decision to write one
  overrides the finding.
- It measures books 1 and 2. Book 3 has no prose yet, so it cannot be
  measured. Its spec is about the SDLC and the factory, which research
  explainers serve weakly, but that is read from the spec rather than counted.
- The patterns are citation *style*. Prose could lean on a paper's finding
  without naming it. That would be an unanchored claim, which the ledger is
  supposed to catch separately.
- Channel size (~473 videos, ~85K subscribers) comes from third-party
  aggregators snapshotted in early 2025, not from YouTube. No request was made
  to YouTube for this pass: the ingest loop was mid-run, and that residential
  IP is currently the only one YouTube still serves captions to.
