# Source Anchoring Pass — Second Book, Claims 25–37

## Date
2026-08-23

## Target
Backfill `**Anchor:**` + `**Quote:**` children for every supporting-source bullet on
claims #25 through #37 (Chapters 5 and 6) of `claims-2/Claims Ledger.md` — the
second book's ledger, a separate track from book 1's `claims/Claims Ledger.md`.
Claims #1–24 were anchored in prior passes (commits `86d9fbc`, `444f26f`) and
were not touched. Claims #38–43 are out of scope for this pass and were not
touched. Per `programs/source_anchoring_pass.md`, applied identically to the
second book's ledger.

## Pass type
Third anchoring execution against the second book's ledger. Single batch;
confirmed at the start (and again immediately before each edit) that no claim
in this range had an existing `**Anchor:**` child.

## Inputs used
- `claims-2/Claims Ledger.md` — 23 supporting-source bullets across claims
  25–37, each missing `**Anchor:**` children at the start of this pass.
- `99_Meta/transcripts/plain/<video_id>.txt` and
  `99_Meta/transcripts/raw/<video_id>.en.vtt` — used to find verbatim search
  phrases for sources whose gloss did not already quote the talk, and for
  confidence follow-ups.
- `01_Videos/473-of-SV35YqvY-training-albatross-an-expert-finance-llm-leo-pekelis.md`
  — checked for one source (#473, Leo Pekelis) where the gloss's quoted phrase
  traced to the YouTube description rather than the spoken transcript.
- `99_Meta/scripts/anchor/cli.py --markdown` — the anchoring tool, run per
  source, its literal stdout pasted into the ledger (never hand-typed or
  reconstructed).

## Procedure
1. Extracted the video id from each `[[wikilink]]` target for all 23
   supporting-source bullets under claims 25–37 (confirmed none had an
   existing Anchor child, and re-confirmed via a fresh read/hash check
   immediately before the first edit of this pass).
2. For sources whose gloss already quoted the talk, used that quote verbatim
   as the search phrase.
3. For sources whose gloss was a paraphrase, opened
   `99_Meta/transcripts/plain/<video_id>.txt`, grepped for keywords from the
   gloss, and picked a verbatim phrase from the actual transcript wording.
4. Ran `python3 99_Meta/scripts/anchor/cli.py <video_id> "<phrase>" --markdown`
   for each of the 23 sources and pasted the tool's literal output as the two
   child bullets, indented one level under the existing gloss line (gloss
   lines unchanged).
5. Where the tool returned `confidence: low` (one case), re-read the plain
   transcript and video markdown, discovered the quoted phrase was drawn from
   YouTube description metadata rather than spoken content, and retried with a
   genuinely spoken, on-claim, verbatim phrase.
6. For `cZ5ZJy19KMo` (#446, Anterior), which supports three different claims
   in this range (31, 36, 37), used a distinct verbatim quote per claim, each
   evidencing that claim's specific point (31: eval as the trust-earning
   product; 36: offline-eval cadence lag; 37: the escalation ladder to an
   on-call clinician) rather than reusing one quote across all three.
7. For `MWTJIAwAAnk` (#423, Conover/Brightwave), used across claims 33 and 37,
   and `TquUsN1QsWs` (#187, Wan/Ensemble Health), used across claims 34 and
   37, likewise used a distinct verbatim quote per claim (33: "primed to be
   credulous" self-verification point vs. 37: withheld autonomy on tacit
   knowledge; 34: the revenue-cycle framing vs. 37: the clinical sign-off
   gate).
8. Committed in small checkpoints (after claims 25–30, 31–33, 34–35, then
   36–37) to minimize the window for concurrent-session interference, per
   this run's brief.

## Outputs changed
1. `claims-2/Claims Ledger.md` — **23 new `**Anchor:**` + `**Quote:**` pairs**
   inserted under existing wikilink bullets across claims 25–37. No gloss
   lines changed. Claims 1–24 and 38–43 untouched (verified: 0 `Anchor`
   occurrences found in the claim-38-onward section after this pass; diff
   against the prior commit is 46 insertions, 0 deletions).
2. This file.

## Sources anchored, by claim
- **Claim 25** (frontier bet: one general model for any robot, any task):
  `cGLa8DsOYdk` (high) — 1 anchor.
- **Claim 26** (in embodiment, the bug is usually the system): `bCGbuyv8PMk`
  (high) — 1 anchor.
- **Claim 27** (physical data breaks text-only agents): `bUJgirn4_yc` (high) —
  1 anchor.
- **Claim 28** (general-purpose robot trained into a physical trade):
  `MBWGiWJDlSo` (high) — 1 anchor.
- **Claim 29** (broad embodiment depends on tiny models): `hacEQHHhu2Q`
  (high) — 1 anchor.
- **Claim 30** (cheap, open, hackable robot hardware): `BS92RdBvI90` (high),
  `0jeZfjJMfmo` (high) — 2 anchors.
- **Claim 31** (evaluation is the product, not a checkpoint): `cZ5ZJy19KMo`
  (high), `O72p-rBb2bA` (high) — 2 anchors.
- **Claim 32** (grounding ceiling disqualifying at unbounded cost):
  `pPvoLjYj_mY` (high), `of-SV35YqvY` (high, after a special-case redirect —
  see note below) — 2 anchors.
- **Claim 33** ("trust, but verify" as architecture): `MWTJIAwAAnk` (high),
  `W1MiZChnkfA` (high) — 2 anchors.
- **Claim 34** (healthcare value/failure is in the back office): `TquUsN1QsWs`
  (high), `_cVfz88_j7A` (medium) — 2 anchors.
- **Claim 35** (compliance/confidentiality as day-one design inputs):
  `TnSGx36Ly0Q` (high), `IAdZxqjZ45U` (high) — 2 anchors.
- **Claim 36** (continuous evaluation at regulatory scale): `cZ5ZJy19KMo`
  (high), `_zl_zimMRak` (high) — 2 anchors.
- **Claim 37** (human in the loop via an explicit escalation path):
  `sn79oS4MZFI` (high), `cZ5ZJy19KMo` (high), `TquUsN1QsWs` (high),
  `MWTJIAwAAnk` (high) — 4 anchors.

**Total: 23 of 23 supporting-source bullets anchored.**

## Confidence breakdown
- **High:** 22 anchors.
- **Medium:** 1 anchor — `_cVfz88_j7A` (#883 Anant Shankhdhar, claim 34): the
  auto-generated captions render the spoken "where we file for
  authorizations…" as "where file for authorizations…", dropping "we" from
  the returned quote text even though the word is present in the raw VTT one
  cue earlier ("workflows is prior authorizations where" / "we" / "file for
  authorizations…", split across three overlapping rolling-caption cues).
  Retried once with the fuller phrase; the tool's match still resolves to the
  same medium-confidence, "we"-dropped quote — an artifact of this video's
  caption formatting, not a wrong search phrase. Left as medium per the "no
  re-rolling the tool" spirit of the procedure; the quote is still the tool's
  literal, verbatim output.
- **Low:** 0 remaining. One source came back low on the first try and was
  resolved (see below).

## Low-confidence retries and resolution
- **`of-SV35YqvY`** (#473 Leo Pekelis, claim 32): first attempt used the
  ledger gloss's quoted phrase, "the reliability of executing numerous
  chained," which returned `confidence: low` with an unrelated match ("the
  number of tokens that that"). See "Special case" below for why this phrase
  isn't anchorable at all, and what was used instead.

## Special case: gloss content drawn from video description, not transcript
`of-SV35YqvY` (#473 — Leo Pekelis, Gradient, claim 32): the gloss's quoted
phrase ("the reliability of executing numerous chained" financial workflows)
traces to the YouTube video's description/summary metadata in
`01_Videos/473-of-SV35YqvY-training-albatross-an-expert-finance-llm-leo-pekelis.md`
("Description cue: The challenge with financial agents successfully
completing complex workflows like tabular reasoning or sentiment analysis
often comes down to the reliability of executing numerous chained..."), not
from anything Pekelis actually says in the talk. Grepped the full plain
transcript for "reliab," "chain," and "robust" — no verbatim match for the
description phrase exists in the spoken content. The claim's own caveat notes
that Pekelis "states his training requirements 'apply across industries'" —
that phrase *is* genuinely spoken (transcript line 74: "they kind of apply
across uh Industries"), is verbatim, and is on-claim (it is the evidence for
why claim 32 treats #473 as supplying the domain's *stakes*, not a novel
technique). Anchored there instead, at high confidence. This mirrors the
prior pass's Amir Haghighat special case (`3WV1vT0B0cg`, claim 13): the same
"Description cue" pattern in the video's front matter, the same resolution
(anchor to a genuinely spoken, on-claim passage rather than force a match on
non-transcript text).

## Left as "not available (no transcript)"
None. All 21 distinct source videos cited across claims 25–37 have plain-text
transcripts in `99_Meta/transcripts/plain/` and raw VTT files in
`99_Meta/transcripts/raw/`.

## Quality signals
- Every quote inserted is the tool's literal `--markdown` output, pasted via
  the file-editing tool — never retyped in a shell heredoc, never paraphrased.
- No timestamp was hand-typed; every Anchor came from `cli.py`.
- No anchor was placed on a video the claim did not already cite as a
  supporting `[[wikilink]]` source.
- No existing gloss line was deleted or rewritten.
- Where a single video (`cZ5ZJy19KMo` across claims 31/36/37, `MWTJIAwAAnk`
  across claims 33/37, `TquUsN1QsWs` across claims 34/37) supports more than
  one claim in this range, each claim got its own distinct verbatim quote
  evidencing that claim's specific point, rather than reusing one quote —
  consistent with each claim's own caveat that the reused sources' points are
  distinct and must not be merged.
- `claims/Claims Ledger.md` (book 1) was not touched.
- Diff against the prior commit (`444f26f`) is additions-only: 46 insertions,
  0 deletions, confirming no existing content (in claims 1–24, 38–43, or the
  gloss lines of 25–37) was altered.

## Session-hygiene note
No concurrent-session interference was observed during this pass: `git
status` was clean before starting, and a hash check of the target line range
(380–506, pre-edit) immediately before the first edit matched the content
read at the start of the pass, with no intervening `git status` changes.
Work was still committed in four small checkpoints (claims 25–30, 31–33,
34–35, 36–37) as a precaution, per this run's brief, so any future
interference window on a subsequent pass stays small and recoverable.

## Next pass
Anchor claims #38–43 (the remaining chapters) next, continuing the same
per-claim, per-supporting-source procedure. This closes out the ledger's
anchoring backlog for the second book (claims 1–43 will then be fully
anchored).
