# Source Anchoring Pass — Second Book, Claims 13–24

## Date
2026-08-23

## Target
Backfill `**Anchor:**` + `**Quote:**` children for every supporting-source bullet on
claims #13 through #24 (Chapters 3 and 4) of `claims-2/Claims Ledger.md` — the
second book's ledger, a separate track from book 1's `claims/Claims Ledger.md`.
Claims #1–12 were anchored in a prior pass (commit `ecbb409`) and were not
touched. Claims #25–43 are out of scope for this pass and were not touched.
Per `programs/source_anchoring_pass.md`, applied identically to the second
book's ledger.

## Pass type
Second anchoring execution against the second book's ledger. Single batch, one
pass; no claim in this range had an existing `**Anchor:**` child before this
pass (idempotency check confirmed at the start).

## Inputs used
- `claims-2/Claims Ledger.md` — 26 supporting-source bullets across claims
  13–24, each missing `**Anchor:**` children at the start of this pass.
- `99_Meta/transcripts/plain/<video_id>.txt` — used to find verbatim search
  phrases for the sources whose gloss did not already quote the talk, and for
  low-confidence retries.
- `01_Videos/<id>-<slug>.md` — checked for one source (#189, Amir Haghighat)
  where the gloss text traced back to the video's YouTube description rather
  than spoken transcript content.
- `99_Meta/scripts/anchor/cli.py --markdown` — the anchoring tool, run per
  source, its literal stdout pasted into the ledger (never hand-typed or
  reconstructed).

## Procedure
1. Extracted the video id from each `[[wikilink]]` target for all 26
   supporting-source bullets under claims 13–24 (confirmed none had an
   existing Anchor child).
2. For sources whose gloss already quoted the talk, used that quote verbatim
   as the search phrase.
3. For sources whose gloss was a paraphrase, opened
   `99_Meta/transcripts/plain/<video_id>.txt`, searched for keywords from the
   gloss, and picked a verbatim phrase from the actual transcript wording.
4. Ran `python3 99_Meta/scripts/anchor/cli.py <video_id> "<phrase>" --markdown`
   for each of the 26 sources and pasted the tool's literal output as the two
   child bullets, indented one level under the existing gloss line (gloss
   lines unchanged).
5. Where the tool returned `confidence: low`, re-searched the plain transcript
   for the exact surrounding wording (including disfluencies/filler words)
   and retried with a corrected verbatim phrase until the tool returned
   `medium` or `high`.
6. For two sources sharing the same underlying video across two different
   claims (`3jGAU2sbAyY` under claim 19 and claim 22; `LxQsQ3vZDqo` under
   claim 20 and claim 21), used a distinct verbatim phrase per claim so each
   anchor evidences that claim's specific point rather than reusing one quote
   across both (claim 19's tokenization point vs. claim 22's latency-
   architecture point; claim 20's market-size framing vs. claim 21's
   consolidation-mechanism framing).

## Outputs changed
1. `claims-2/Claims Ledger.md` — **26 new `**Anchor:**` + `**Quote:**` pairs**
   inserted under existing wikilink bullets across claims 13–24. No gloss
   lines changed. Claims 1–12 and 25–43 untouched.
2. This file.

## Sources anchored, by claim

- **Claim 13** (open-model gap has largely closed): `wJwTlvb_TSo` (high),
  `3WV1vT0B0cg` (high, after a low-confidence retry — see note below),
  `lY1iFbDPRlw` (high) — 3 anchors.
- **Claim 14** (stagnation is a training-budget story): `gFyBdBm0AGo` (high) —
  1 anchor.
- **Claim 15** (frontier progress is bottleneck-hunting): `zZsTVBXcbow` (high),
  `8EQo4J2BWKw` (high) — 2 anchors.
- **Claim 16** (code teaches labs to model computation): `sYgE4ppDFOQ` (high),
  `OGCG_QkCcZo` (high) — 2 anchors.
- **Claim 17** (benchmarks are cultural artifacts): `W3khHzajE04` (high, after
  a low-confidence retry), `mQ7_Zje7WKE` (high) — 2 anchors.
- **Claim 18** (open source is a strategy, not charity): `_gVFUEdhCyI`
  (medium), `AUuktOQPWYg` (high), `Xmkl27AM2VQ` (high), `b0xlsQ_6wUQ` (high) —
  4 anchors.
- **Claim 19** (non-text architectures converge on the LLM template):
  `3jGAU2sbAyY` (high, after a low-confidence retry), `CXsbjcrf_5g` (high) —
  2 anchors.
- **Claim 20** (recommendation may be the largest LLM application):
  `LxQsQ3vZDqo` (high) — 1 anchor.
- **Claim 21** (consolidation move is "one foundation model for all of it"):
  `AbZ4IYGbfpQ` (high), `LxQsQ3vZDqo` (high), `U0S6CfzAY5c` (high) —
  3 anchors.
- **Claim 22** (latency is a model-architecture constraint): `3jGAU2sbAyY`
  (high, after a low-confidence retry), `P_RI1kCkRbo` (high) — 2 anchors.
- **Claim 23** (generative media is an orchestration stack): `P370D8Kmlkw`
  (medium), `BcWFc3H7Khg` (high) — 2 anchors.
- **Claim 24** (embodiment as the frontier's next modality): `iS9YFW28XyM`
  (high), `mWKYvT9Lc50` (high) — 2 anchors.

**Total: 26 of 26 supporting-source bullets anchored.**

## Confidence breakdown
- **High:** 24 anchors.
- **Medium:** 2 anchors — `_gVFUEdhCyI` (#9 Omar Sanseviero, claim 18: the
  tool's best match adds a leading "you can take," before the gloss's quoted
  "you can download..."; wording confirmed correct and verbatim, left as
  medium rather than force a shorter, less-representative phrase) and
  `P370D8Kmlkw` (#244 Gorkem Yurtseven, claim 23: the transcript says "AI
  conference, AI engineer conference" with a stutter/repair not present in the
  gloss's cleaned-up "AI engineer conference"; left as medium since the quote
  is still verbatim and correct).
- **Low:** 0 remaining. Four sources came back low on the first try and were
  resolved by retry (see below).

## Low-confidence retries and resolution
- **`3WV1vT0B0cg`** (#189 Amir Haghighat, claim 13): first two attempts used
  phrasing not actually present in the transcript (see "Special case" below);
  once redirected to a genuinely spoken, on-claim passage, the first try at
  that passage also came back low because the phrase omitted the transcript's
  filler words ("u but but", "uh what they"); retried with the exact
  disfluent transcript wording and got high confidence.
- **`W3khHzajE04`** (#253 Alex Duffy, claim 17): first phrase used the
  gloss's "what we measure shapes AI — and us," which does not appear
  verbatim early in the talk; retried with the transcript's actual opening
  line, "benchmarks are just memes that shape the most powerful tool ever
  created," and got high confidence.
- **`3jGAU2sbAyY`** (#663 Samuel Humeau, claim 19 use): first phrase used the
  gloss's cleaned-up wording ("modern TTS is language modeling over discrete
  speech tokens..."); the actual transcript has filler words and a different
  clause order. Retried with the exact transcript wording, including "uh,"
  and got high confidence.
- **`3jGAU2sbAyY`** (#663 Samuel Humeau, claim 22 use — a second, distinct
  anchor on the same video): first phrase dropped the transcript's repeated
  "you you you" filler and the trailing "This way, the" continuation; retried
  with the exact disfluent wording, stopping at the sentence boundary, and
  got high confidence.

## Special case: gloss content drawn from video description, not transcript
`3WV1vT0B0cg` (#189 — Amir Haghighat, Baseten, claim 13): the gloss text ("the
DeepSeek-R1 news cycle broke open models out of the AI-engineering bubble
onto the agenda of the largest enterprises") traces to the YouTube video's
description/summary metadata in
`01_Videos/189-3WV1vT0B0cg-the-rise-of-open-models-in-the-enterprise-amir-haghighat-baseten.md`
("Description cue: This year kicked off with the DeepSeek-R1 news cycle
breaking out of our AI Engineering bubble..."), not from anything Amir
actually says in the talk. Grepped the full plain transcript for
"deepseek," "r1," "gap," "catch up," "largest," and "news cycle" —
no matches. Two candidate anchors were tried and rejected before landing on
the one used:
1. First candidate ("we've picked a model an open source model") scored high
   but, on closer reading of its surrounding context, is part of a strawman
   Amir sets up before debunking it ("...and I know for a fact that this is
   not true") — anchoring the open-model-gap claim to the setup of a debunk
   would misrepresent the source, so it was discarded even though it scored
   high.
2. Landed on a genuinely on-claim, non-debunked passage instead: "not just
   use an API based generic model ... but inhouse it and do better than what
   they can do with just API based models" (lines 203–207 of the plain
   transcript) — this is Amir's own account of why enterprises build on open
   models instead of renting closed APIs, which is on-claim for "the
   open-model gap has largely closed" even though it does not reference
   DeepSeek-R1 by name. Confirmed transcript-original disfluent wording via
   retry (see low-confidence retries above).

## Left as "not available (no transcript)"
None. All 22 distinct source videos cited across claims 13–24 have plain-text
transcripts in `99_Meta/transcripts/plain/`.

## Quality signals
- Every quote inserted is the tool's literal `--markdown` output, pasted via
  the file-editing tool — never retyped in a shell heredoc, never paraphrased.
- No timestamp was hand-typed; every Anchor came from `cli.py`.
- No anchor was placed on a video the claim did not already cite as a
  supporting `[[wikilink]]` source.
- No existing gloss line was deleted or rewritten.
- Where a single video (`3jGAU2sbAyY`, `LxQsQ3vZDqo`) supports two different
  claims in this range, each claim got its own distinct verbatim quote
  evidencing that claim's specific point, rather than reusing one quote
  across both — consistent with each claim's own caveat that the two are
  "distinct" and "must not be re-argued as one."
- `claims/Claims Ledger.md` (book 1) was not touched.

## Session-hygiene note
This pass ran concurrently with other active sessions in the same working
tree. Mid-pass, a concurrent `git pull --rebase origin main` in another
session autostashed and (incompletely) restored local changes, which
transiently reverted several already-applied edits in this file (visible as
orphaned `autostash` entries in `git stash list`). Those edits were
re-applied from this pass's own record (the CLI outputs captured above, not
by popping the stash) rather than risk pulling in another session's
in-flight work. The final state was verified against the git commit itself
(`git show`), not just the working tree, before treating the pass as
complete.

## Next pass
Anchor claims #25–43 (Chapters 5 onward) next, continuing the same
per-claim, per-supporting-source procedure.
