# Chapter 2 Usefulness Pass — Design Spec

**Date:** 2026-09-09
**Status:** Approved (operator: "go", "improve")
**Surface:** `05_Book_Ideas/Drafting Layer/AI Engineering Book - Manuscript Draft.md`, Chapter 2 only → `scripts/sync_manuscript_to_public.py`.

## Why

`panel-3model-v11`: Chapter 2 usefulness 54.6, 29 of 68 paragraphs below 50, the weakest
chapter whose job is concrete. The 2026-09-04 note establishes that usefulness on Chapters 1
and 10 measures genre and must not be "fixed"; it also says the dimension stays meaningful
*within* a chapter of a given kind. Chapter 2 is that kind: it argues that judgment, taste,
review and framing become the scarce skills, and every one of those is a decision a working
engineer can make on Monday. The 2026-09-02 pass removed Chapter 2's filler (−93 words); this
pass sharpens what is left.

## Scope

The 29 paragraphs listed in `~/.cache/book-pass/ch02-targets-v11.md`, plus any obvious
instance the list missed. One agent, propose-only. Each edit is a **sharpen** — turn a
descriptive paragraph into one that carries a decision, a threshold, a test ("X is the wrong
choice when Y"), or a named trap — or a **cut** of a sentence that carries nothing. Prefer
sharpening: the chapter has already been cut.

## Hard rules (the contract)

1. Edits go to the manuscript source; grep-verified in `public/drafting/` and
   `website/src/content/` after sync.
2. **Fidelity.** Every decision, threshold, test or trap must be supported by a source already
   cited in Chapter 2 or by a ledger entry whose Candidate chapters include 2 (`claims/Claims
   Ledger.md`: #40, #41, #42, #58–#62 and any other listing 2). No new facts, numbers, names,
   tools or quotations. Surface what the sources already say; never invent advice.
3. Never change text inside quotation marks attributed to a person; never alter
   ledger-anchored wording.
4. Every `old` is an exact, unique substring of the source file.
5. Chapter word count does not grow beyond 3,303 (its current count).
6. Voice holds: no AI-slop patterns per the humanness rubric; no bullets inserted into prose;
   the chapter's own devices (the friction-as-judgment argument, the vibe-coding contrast, the
   review-becomes-the-bottleneck turn) stay.
7. Load-bearing pivots and the chapter thesis are preserved.
8. Gates: `verify_prose_quotes.py` ≤ 30 unmatched, `check_quote_speakers.py` and
   `check_title_quotes.py` clean, website tests green; then `ship-gate` with two model
   families; then `panel-3model-v12`.
9. Book 2 and every other chapter untouched.

## Done means

Edits applied and synced; gates clean; ship-gate PASS; v12 published with Chapter 2's
usefulness and the other five dimensions recorded; research pass note; ROADMAP row;
committed and pushed. Budget: ≤ $1.50 OpenRouter, ≤ 2 gate rounds before escalation.

## Addendum after gate round 1 (2026-09-09)

**Rule 10 — a sharpening may not be stronger than its source.** If the source hedges ("might",
"some sort of", "may"), the sentence hedges. If a ledger entry's caveat scopes the claim (to work
that has to be trusted, to non-exploratory work), the sentence carries that scope. A test or
threshold the chapter's sources do not state is the author's and is voiced as such ("the test I
use", "a useful rule"), never as a fact. Six of fifteen round-1 edits broke this; the gate's
numbered list is the correction set.
