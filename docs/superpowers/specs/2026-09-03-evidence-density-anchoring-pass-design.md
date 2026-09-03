# Evidence-Density Anchoring Pass — Design Spec

**Date:** 2026-09-03
**Status:** Approved (operator: "go")
**Surface:** `claims/Claims Ledger.md` (additive), `05_Book_Ideas/Drafting Layer/AI Engineering Book - Manuscript Draft.md` (light stitches only) → `scripts/sync_manuscript_to_public.py`.

## Why

`panel-3model-v9` shows evidence_density bimodal: 95 sections strong, 13 at exactly 10 —
zero grounded claims. Five of the thirteen are Chapter 2 (ED 56.7). Several failing
sections already quote practitioners with anchors; the judge still finds nothing because
the ledger has no entry stating the claim those quotes support. Chapter 2 has three
ledger claims naming it as a candidate chapter. The ledger lags the prose.

## Scope

The 13 sections in `/tmp/book-pass/ed-fail-sections.md` (Ch2 ×5, Ch8 ×3, Ch6 ×2,
Ch10 ×2, Ch7 ×1). Per section: enumerate falsifiable claims; for each, match to an
existing ledger entry (then add the chapter to its Candidate chapters if missing) or
draft a new anchored entry. A section with no named source may receive ONE stitched
sentence in the manuscript carrying the tool's verbatim quote.

## Hard rules (the contract)

1. **Every quote and timestamp comes from `99_Meta/scripts/anchor/cli.py` output.** Never
   hand-typed, never paraphrased. `confidence: high` required; `medium` needs a second
   corroborating anchor; `low` is not used.
2. **Only talks already in the corpus** (`01_Videos/`, transcripts in
   `99_Meta/transcripts/`). The speaker named in the entry must be the speaker of that
   video per the note filename / `99_Meta/Video Inventory.md`.
3. **Ledger is additive.** New entries append after #57 with sequential ids and the
   existing entry shape (Why it matters / Support level / Candidate chapters / Supporting
   sources with Anchor + Quote / Caveats). Existing entries change only by adding a
   chapter to Candidate chapters or adding a supporting source.
4. **Claim statements are falsifiable and phrased in the section's own terms**, so the
   judge can match them. No claim the section does not actually make.
5. **Prose stitches:** at most one sentence per failing section, only where the section
   names no practitioner, quoting the anchored words verbatim, in the compiled manuscript
   source, grep-verified after sync. Chapter 10: ledger only, no prose.
6. **Titles are not speech.** A talk title may be cited as a title, never quoted as spoken.
7. **Mechanical gates before the human-style gate:** `verify_ledger.py` PASS,
   `check_quote_speakers.py` clean, `check_title_quotes.py` clean, `verify_prose_quotes.py`
   book 1 ≤ 31 unmatched. Then `ship-gate`. Then re-measure.
8. **Book 2 untouched.** Peer sessions are active there.

## Done means

Ledger verifier PASS; all checks clean; ship-gate PASS; canonical panel v10 on the
resulting snapshot with every member zero-null and merge zero `<2 votes`; ED and
usefulness deltas recorded in a research pass note; ROADMAP updated; committed and pushed.
