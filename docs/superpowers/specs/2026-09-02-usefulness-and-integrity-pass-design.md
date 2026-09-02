# Usefulness + Integrity Pass — Design Spec

**Date:** 2026-09-02
**Status:** Approved (operator: "do it in full")
**Surface:** `05_Book_Ideas/Drafting Layer/AI Engineering Book - Manuscript Draft.md` (book 1 source of truth) → `scripts/sync_manuscript_to_public.py` → `public/drafting/`, `website/src/content/`, `website/public/read/`, `llms*.txt`. Book 2 source: `public/drafting-2/*.md`.

## Why now

The 2026-08-28 passes settled two facts. Usefulness (55.7 on the canonical panel) is
a real weakness, not a cache artifact. And per-paragraph usefulness scores are noisy:
two independent instruments agree on the book-level mean but place the same paragraph
in the same band only 44% of the time. So this pass targets the *kinds* of paragraph
both instruments independently put in the fail band, and uses the per-unit lists only
as pointers.

The same day's quote audit fixed five attributed quotations but left two gaps it named:
matched quotes were only tested for presence, not for correct speaker; and book 2's
16 unmatched spans were never triaged.

## Scope

**Phase 1 — Book 1 prose (usefulness).** One subagent per chapter. Each proposes
edits to the paragraphs of these kinds: chapter roadmaps and "the rest of this book"
paragraphs; chapter-to-chapter transitions and hand-off questions; list stems;
rhetorical wind-downs and aphorisms; section-heading fragments; landscape description
with no commitment. Each edit is a sharpen (into a decision, threshold, test, named
trap) or a cut. Pointer lists: `/tmp/book-pass/chNN-targets.md`, built from the
intersection of panel v8 and the agent-judged run.

**Phase 2a — Speaker attribution.** For every quoted span in book 1 that *matches* a
transcript and carries a named attribution, confirm the matched transcript belongs to
the named speaker. Findings + proposed fixes only.

**Phase 2b — Book 2 unmatched spans.** Apply the 2026-08-28 audit method to
`public/drafting-2/*.md`: attribution-verb lookback, corpus-wide search, verdict per
span. Findings + proposed fixes only.

**Phase 3 — Measure.** `verify_prose_quotes.py` (book 1 unmatched must stay ≤ 31 and
no attributed span may fail), website tests (97 green baseline), sync round-trip
check. Canonical panel re-run is blocked on OpenRouter credits and is escalated, not
attempted. A non-canonical `mash-agent` usefulness re-judge on changed units is run if
time allows, and reported as a different instrument.

## Hard rules (the contract)

1. **Edits go to the manuscript source, never `public/drafting/`.** After sync, grep for
   the new text in `public/drafting/` and `website/src/content/`; zero hits = the edit
   was lost.
2. **Fidelity.** No new facts, numbers, names, tools, quotations, or claims that are not
   already in that chapter or in a Claims Ledger entry whose Candidate chapters include
   it. Surface latent actionability; never invent advice.
3. **Never change text inside quotation marks attributed to a person.** Never alter
   ledger-anchored claim wording.
4. **Every edit's `old` text must be a unique exact substring of the source file.**
   The apply step refuses otherwise. A replace that finds nothing is a failure, not a
   no-op.
5. **Length does not grow.** Each chapter ends at or below its current word count.
6. **Voice holds.** No AI-slop patterns per the humanness rubric; no bullets inserted
   into running prose; terminology per `CONTEXT.md`.
7. **Chapter 10 stays reflective.** Cuts and light sharpening only; do not convert it
   into a handbook.
8. **Thesis and load-bearing pivots are preserved.** A transition that carries the
   argument is rewritten to carry it more concretely, not deleted.
9. **Ship gate before commit.** The applied diff is reviewed adversarially by a
   non-producer; PASS is required before commit and push.

## Done means

- Applied edits in the source, synced, grep-verified in all generated targets.
- Quote check: book 1 ≤ 31 unmatched, all attributed spans pass; book 2 triaged with a
  written verdict per span.
- Website tests green; `npm run build` succeeds.
- Research pass note in `research_passes/2026-09-02-usefulness-and-attribution-pass.md`
  recording what changed and what was measured.
- ROADMAP.md updated; committed on main; pushed after ship-gate PASS.

## Out of scope

Canonical panel v9 (needs credits). New claims or anchors. Book 2 prose quality.
