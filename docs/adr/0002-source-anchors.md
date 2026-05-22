# Source Anchors — timestamped, quoted evidence

## Status

accepted

## Context

A Claim's `Supporting sources` were bare `[[wikilink]]`s to a *whole* source video — a reader (or a judge) could not see the *moment* that grounds the claim. The corpus has word-level WebVTT transcripts for 684 videos (`99_Meta/transcripts/raw/`), and the video id is already embedded in every ledger wikilink, so moment-level pointers are *derivable*. The Lab's entire pitch is "source-backed"; evidence the reader can verify in one click multiplies that credibility.

## Decision

A Claim's `**Supporting sources:**` are **Source Anchors**, each `{video_id, start, end, quote, confidence}`:

- `quote` is the **verbatim transcript text** the anchor points at. It makes the anchor self-verifying — a few seconds of timestamp drift is harmless because the quote *is* the evidence; the embed is just convenience.
- `start` / `end` come from the VTT cue timestamps of the quote's first / last words.
- `confidence` flags shaky matches; low-confidence anchors surface as "loosely sourced," consistent with `EDITORIAL_METHOD.md`'s 4-tier honesty.

**Production** (per ADR-0001's research-org layer):

- A dedicated, idempotent **anchoring pass** backfills existing claims — matching claim text against the source VTTs.
- Research-pass instructions are updated so *new* claims are born anchored (the pass that extracts a claim is already reading the transcript).
- book-mash does **not** produce anchors — it is the judge, not the researcher (ADR-0001 / Q3 boundary). It *consumes* the `quote` as ground-truth for `claim_defensibility` — checking manuscript prose against what the source actually said, not against the ledger's paraphrase.

**Surfacing** on the website:

- First: a chapter-level **evidence rail** — the chapter's claims, each with quote + a YouTube embed deep-linked to `start`.
- Later: inline passage-level anchors, fed by book-mash's `claim_defensibility` paragraph→claim output (`scores.json`) — no new manual authoring needed.

## Considered and rejected

- **Human-confirmed anchors** — rejected: reintroduces manual labour and breaks the automatable/reproducible property that makes anchors fit The Method.
- **`{video_id, start}` only, no quote** — rejected: a silently-wrong timestamp is the exact trust-eroding failure mode, with nothing for the reader to catch it.

## Consequences

- The anchoring pass is LLM work over 684 VTT transcripts; cost scales with claim count.
- The canonical Claims Ledger schema (ADR-0001) carries Source Anchors in its `Supporting sources` field.
- The website gains a YouTube-embed dependency and a new reading-page surface.
- book-mash's measurement output (`scores.json`) acquires a reader-facing purpose, not only a QA role.
