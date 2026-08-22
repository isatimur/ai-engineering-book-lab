# Source Anchoring Pass — Second Book, Claims 1–12

## Date
2026-08-23

## Target
Backfill `**Anchor:**` + `**Quote:**` children for every supporting-source bullet on
claims #1 through #12 (Chapters 1 and 2) of `claims-2/Claims Ledger.md` — the second
book's ledger, a separate track from book 1's `claims/Claims Ledger.md`. Claims
#13–43 are out of scope for this pass and were not touched. Per
`programs/source_anchoring_pass.md`, applied identically to the second book's ledger.

## Pass type
First anchoring execution against the second book's ledger. Single batch, one pass,
no idempotent skips (no claim in this range had an existing `**Anchor:**` child
before this pass).

## Inputs used
- `claims-2/Claims Ledger.md` — 34 supporting-source bullets across claims 1–12,
  each missing `**Anchor:**` children at the start of this pass.
- `99_Meta/transcripts/plain/<video_id>.txt` — used to find verbatim search phrases
  for the 22 sources whose gloss did not already quote the talk, and for two
  low-confidence retries.
- `99_Meta/scripts/anchor/cli.py --markdown` — the anchoring tool, run per source,
  its literal stdout pasted into the ledger (never hand-typed or reconstructed).

## Procedure
1. Extracted the video id from each `[[wikilink]]` target for all 34
   supporting-source bullets under claims 1–12 (checked first: idempotency —
   none had an existing Anchor child).
2. For sources whose gloss already quoted the talk (12 of 34), used that quote
   verbatim as the search phrase.
3. For the remaining 22 sources, opened `99_Meta/transcripts/plain/<video_id>.txt`,
   grepped for keywords from the gloss, and picked a verbatim phrase from the
   actual transcript wording.
4. Ran `python3 99_Meta/scripts/anchor/cli.py <video_id> "<phrase>" --markdown` for
   each of the 34 sources and pasted the tool's literal output as the two child
   bullets, indented one level under the existing gloss line (gloss lines
   unchanged).
5. Where the tool returned `confidence: low` (2 cases), re-searched the plain
   transcript for the exact surrounding wording and retried with a corrected
   verbatim phrase until the tool returned `medium` or `high`.
6. Two video ids begin with a leading hyphen (`-hYqt8M9u_M`, `-mRi-B3t6fA`), which
   `argparse` misread as an option flag when passed as a bare id. Worked around by
   passing the full wikilink target string (e.g.
   `482--hYqt8M9u_M-the-genai-maturity-curve-...`) instead of the bare id — the CLI
   extracts the id from it correctly, per its documented behavior.

## Outputs changed
1. `claims-2/Claims Ledger.md` — **34 new `**Anchor:**` + `**Quote:**` pairs**
   inserted under existing wikilink bullets across claims 1–12. No gloss lines
   changed. Claims 13–43 untouched.
2. This file.

## Sources anchored, by claim

- **Claim 1** (reasoning/agency same problem): PbHm2qKnu10 (high), p1CmPZ2j6Lk
  (high), QluDzKVfp6A (high) — 3 anchors.
- **Claim 2** (RL carries a model to production): X6NShR2ccOg (high, after a
  low-confidence retry), 6lTxD_oUjXQ (high) — 2 anchors.
- **Claim 3** (code as RL-scaling domain): QluDzKVfp6A (high) — 1 anchor.
- **Claim 4** (fine-tuning as legitimate default): -hYqt8M9u_M (medium),
  cXPYtkosXG4 (high) — 2 anchors.
- **Claim 5** (data recipe beats model size): liG97YXaTSA (high), i2vBaFzCEJw
  (high), 6lTxD_oUjXQ (high) — 3 anchors.
- **Claim 6** (RL's cost is operational): X6NShR2ccOg (high), QluDzKVfp6A (high),
  tQTB4MU_z8w (high), OkEGJ5G3foU (high) — 4 anchors.
- **Claim 7** (inference as the largest market): 84Vtz2IL1Ug (high), DeFF3J8T5Pk
  (high) — 2 anchors.
- **Claim 8** (speed/cost as a system property): Y2qc0UhDSnc (high), 9tvJ_GYJA-o
  (high), C1CXwRYbwuQ (high) — 3 anchors.
- **Claim 9** (on-device inference crossing to default): zTLJNHj0DeQ (high),
  a2muGkT4WD4 (high), -mRi-B3t6fA (high), l614N5W60ls (high) — 4 anchors.
- **Claim 10** (compilers/generated kernels automate optimization): 0uj9lMI-sIo
  (high), 6guQG_tGt0o (high), q2nHsJVy4FE (high), 7TnkqfX84gI (high) — 4 anchors.
- **Claim 11** (compute substrate as hard/geopolitical constraint): y-UGrYbJsJk
  (high), 3j1dHivahFQ (high, after a low-confidence retry), Zz4QjZsYWK0 (high),
  gADhNzFjGeI (medium) — 4 anchors.
- **Claim 12** (trust/confidentiality as first-class requirements): A0PxE39xaMc
  (high), 6Tpm4m1YxHk (high) — 2 anchors.

**Total: 34 of 34 supporting-source bullets anchored.**

## Confidence breakdown
- **High:** 32 anchors.
- **Medium:** 2 anchors — `-hYqt8M9u_M` (#482 Kyle Corbitt, claim 4: the tool's
  best match trails off mid-word, "given that I am doing a fine"; transcript
  wording confirmed correct, left as medium rather than force a lower-fidelity
  phrase) and `gADhNzFjGeI` (#547 Sunny Madra, claim 11: transcript says "25
  years ago," not "Twenty-five," so the quoted gloss's number-word form never
  scores high; left as medium since the quote is still verbatim and correct).
- **Low:** 0 remaining. Two sources came back low on the first try and were
  resolved by retry (see below).

## Low-confidence retries and resolution
- **X6NShR2ccOg** (#674 Alessandro Cappelli, claim 2): first phrase used the
  gloss's "is an algorithm" but the transcript has a stutter, "is an an
  algorithm" — retried with the verbatim double "an an" and got high confidence.
- **3j1dHivahFQ** (#402 Paul Gilbert, claim 11): first phrase used the gloss's
  cleaned-up wording; the actual transcript has filler words and a different
  clause order ("what we do is a plumbing uh so I'm not going to talk about
  agents but more kind of how you train uh models..."). Retried with the exact
  transcript wording and got high confidence.

## Left as "not available (no transcript)"
None. All 30 distinct source videos cited across claims 1–12 have plain-text
transcripts in `99_Meta/transcripts/plain/`.

## Quality signals
- Every quote inserted is the tool's literal `--markdown` output, pasted via the
  file-editing tool — never retyped in a shell heredoc, never paraphrased.
- No timestamp was hand-typed; every Anchor came from `cli.py`.
- No anchor was placed on a video the claim did not already cite as a supporting
  `[[wikilink]]` source.
- No existing gloss line was deleted or rewritten.
- `claims/Claims Ledger.md` (book 1) was not touched.

## Known follow-up
- Claims #13–43 in `claims-2/Claims Ledger.md` remain unanchored — scoped to
  later passes per the task brief.
- The two medium-confidence anchors (#482, #547) are correct verbatim quotes but
  score below `high` because the CLI's fuzzy match trails off (#482) or the
  transcript's number form differs from the gloss's spelled-out form (#547); no
  further action needed unless a future pass wants to push for exact-phrase
  high-confidence matches.

## Next pass
Anchor claims #13–24 (Chapter 3) next, continuing the same per-claim,
per-supporting-source procedure.
