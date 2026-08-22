# Source Anchoring Pass — Second Book, Claims 38–43 (Final Batch)

## Date
2026-08-23

## Target
Backfill `**Anchor:**` + `**Quote:**` children for every supporting-source
bullet on claims #38 through #43 (Chapter 7, the last chapter) of
`claims-2/Claims Ledger.md` — the second book's ledger, a separate track from
book 1's `claims/Claims Ledger.md` (not touched). Claims #1–37 were anchored
in prior passes (commits `86d9fbc`, `444f26f`, `9cd9dd9`) and were not
touched. Per `programs/source_anchoring_pass.md`, applied identically to the
second book's ledger. This is the final batch: it completes anchoring for the
entire 43-claim ledger.

## Pass type
Fourth and final anchoring execution against the second book's ledger.
Confirmed at the start, and again immediately before editing, that no claim
in this range had an existing `**Anchor:**` child.

## Inputs used
- `claims-2/Claims Ledger.md` — 10 supporting-source bullets across claims
  38–43, each missing `**Anchor:**` children at the start of this pass.
- `99_Meta/transcripts/plain/<video_id>.txt` — used to find verbatim search
  phrases for sources whose gloss quote traced to title/description metadata
  rather than spoken content, and for low-confidence follow-ups.
- `01_Videos/827-grdoOC1BT1s-...md` and `01_Videos/477-CoaL4JZKsWI-...md` —
  checked for two sources where the gloss's cited phrase was the video's
  YouTube title rather than something spoken in the talk.
- `99_Meta/scripts/anchor/cli.py --markdown` — the anchoring tool, run per
  source, its literal stdout pasted into the ledger (never hand-typed or
  reconstructed).

## Procedure
1. Extracted the video id from each `[[wikilink]]` target for all 10
   supporting-source bullets under claims 38–43 (confirmed none had an
   existing Anchor child).
2. For sources whose gloss already quoted the talk verbatim, used that quote
   as the search phrase.
3. For sources whose gloss quote traced to the talk's YouTube title rather
   than spoken content (confirmed by grepping the plain transcript for the
   title wording and finding no match — the same pattern flagged in the
   prior pass's brief), opened the plain transcript, found a genuinely
   spoken, on-claim passage, and anchored there instead.
4. Ran `python3 99_Meta/scripts/anchor/cli.py <video_id> "<phrase>" --markdown`
   for each of the 10 sources and pasted the tool's literal output as the two
   child bullets, indented one level under the existing gloss line (gloss
   lines unchanged).
5. For `418t26CVz-w` (#918, Quoraishee & Song, NYT), used across both claim
   38 and claim 43, used a distinct verbatim quote per claim, each evidencing
   that claim's specific point (38: "Our puzzles are made by people." — the
   human-authored-truth point; 43: "local agentic theory for accessible
   mobile games." — the on-device/accessibility point), per the ledger's own
   caveat not to merge the two facets of this source.
6. Committed in small checkpoints (one per claim: 38, 39, 40, 41, then 42+43
   together) to minimize the window for concurrent-session interference.

## Outputs changed
1. `claims-2/Claims Ledger.md` — **10 new `**Anchor:**` + `**Quote:**` pairs**
   inserted under existing wikilink bullets across claims 38–43. No gloss
   lines changed. Claims 1–37 untouched — verified with
   `git diff 9cd9dd9 -- "claims-2/Claims Ledger.md"`, which shows every
   changed hunk located at or after line 555 (inside the claim 38 section),
   additions-only.
2. This file.

## Sources anchored, by claim
- **Claim 38** (keep the model in a narrow lane; structured systems own the
  truth): `FlzpEGHNVKQ` (high), `418t26CVz-w` (high) — 2 anchors.
- **Claim 39** (a working AI-built game is far harder than the demo):
  `_KFbT6eph5A` (high), `grdoOC1BT1s` (high) — 2 anchors.
- **Claim 40** (education's binding constraint is pedagogy, not model
  capability): `3E7VAZaTG9M` (high), `qpmZID27t98` (high) — 2 anchors.
- **Claim 41** (creative production as an orchestration problem):
  `Bc6Ojl2XS1w` (high), `CoaL4JZKsWI` (high) — 2 anchors.
- **Claim 42** (an autonomous creative pipeline measured against a human):
  `BqZrTdgBaPw` (high) — 1 anchor.
- **Claim 43** (on-device local agentic patterns for accessible play):
  `418t26CVz-w` (high) — 1 anchor.

**Total: 10 of 10 supporting-source bullets anchored.**

## Confidence breakdown
- **High:** 10 anchors.
- **Medium:** 0 (see retries below — every source that returned medium or
  low on a first attempt was retried to a high-confidence, verbatim
  transcript quote).
- **Low:** 0 remaining after retries.

## Low-confidence retries and resolution
- **`FlzpEGHNVKQ`** (#677, claim 38): first attempt used the gloss's implied
  phrase "hallucinate moves," which returned `confidence: low` (unrelated
  2-word match). Second attempt, "hallucinate because obviously they're
  trained on language," returned `confidence: medium`. Rather than settle for
  medium, re-read the plain transcript around that passage and found the
  more precisely on-claim, cleanly delimited sentence "the LLM's job is only
  to translate this information" a few lines later in the same explanation of
  the pipeline (Stockfish/detectors do the analysis; the LLM only translates
  it to English). Retried with that exact wording and got `confidence: high`.
  Used that anchor instead.
- **`grdoOC1BT1s`** (#827, claim 39): the gloss cites the talk's own YouTube
  title, "Think You Can Build a Game with AI? Think Again!" First attempt
  searching that phrase returned `confidence: low`. Grepped the plain
  transcript for "think again," "think you can," and "harder than" — no
  match: the title is not spoken verbatim anywhere in the talk (same
  description/title-vs-transcript pattern as the prior pass's Pekelis
  special case). Found a genuinely spoken, on-claim line instead —
  "everybody can build a game over the weekend, but what is the next
  thing?" — which carries the same "looks solved, isn't" argument the claim
  makes. Retried with that wording and got `confidence: high`.
- **`3E7VAZaTG9M`** (#512, claim 40): first attempt used the gloss's quoted
  phrase "Khan Academy's journey to become an AI-first organization"
  verbatim, which returned `confidence: low` (the tool matched an unrelated
  fragment). Grepped the transcript and confirmed the phrase *is* spoken,
  just with the org's shorthand name ("KH Academy" instead of "Khan
  Academy") and slightly different word order. Retried with
  "transformed KH Academy into an AI first organization," the actual spoken
  wording, and got `confidence: high`.
- **`CoaL4JZKsWI`** (#477, claim 41): the gloss cites the talk's own YouTube
  title, "AI Music Generation, From Prompt to Production." Grepped the plain
  transcript for "prompt to production" — no match: title-only framing, not
  spoken content (same pattern as `grdoOC1BT1s` above). Searched the
  transcript for a genuinely spoken passage matching the claim's
  orchestration/chaining point and found "produce a song and then use this
  voice conversion technique" (Randy Travis anecdote: write → produce →
  separate voice-conversion step), which is on-claim and got
  `confidence: high` directly.

## Special case: gloss content drawn from video title, not transcript
Two of this batch's sources (`grdoOC1BT1s` #827 and `CoaL4JZKsWI` #477) had
gloss lines that quote the talk's YouTube *title* rather than anything the
speaker says on record — the same "Description cue" / title-metadata pattern
flagged in the two prior passes' special cases (Amir Haghighat, `3WV1vT0B0cg`,
claim 13; Leo Pekelis, `of-SV35YqvY`, claim 32). In both cases here, confirmed
by grep that the title phrase does not appear in the plain transcript, then
searched the transcript for a genuinely spoken, on-claim passage and anchored
there instead, at high confidence, rather than forcing a low-confidence match
on non-transcript text. The ledger's own "Caveats / counterevidence" bullets
for claims 39 and 41 already flag these two notes as boilerplate that
"contributes only its title" — consistent with this finding.

## Left as "not available (no transcript)"
None. All 9 distinct source videos cited across claims 38–43 have plain-text
transcripts in `99_Meta/transcripts/plain/`.

## Quality signals
- Every quote inserted is the tool's literal `--markdown` output, pasted via
  the file-editing tool — never retyped in a shell heredoc, never paraphrased.
- No timestamp was hand-typed; every Anchor came from `cli.py`.
- No anchor was placed on a video the claim did not already cite as a
  supporting `[[wikilink]]` source.
- No existing gloss line was deleted or rewritten.
- `418t26CVz-w` (#918), reused across claims 38 and 43, got a distinct
  verbatim quote per claim rather than reusing one quote, per the ledger's
  own caveat not to merge the two facets.
- `claims/Claims Ledger.md` (book 1) was not touched.
- Diff against the prior commit (`9cd9dd9`) is additions-only within the
  claim 38–43 range: every changed hunk starts at or after line 555; no
  content in claims 1–37 or in claim 38–43's gloss lines was altered.

## Session-hygiene note
No concurrent-session interference was observed during this pass: `git
status` was clean before starting, and the target section (lines 553–610)
was re-read immediately before each edit and matched the content read at the
start of the pass. Work was committed in five small checkpoints (claim 38,
39, 40, 41, then 42+43) as a precaution.

## Ledger-wide total (all four anchoring batches)
This batch completes anchoring for the entire ledger. A ledger-wide count
after this pass:
- `grep -c '\*\*Anchor:\*\*' "claims-2/Claims Ledger.md"` → **93**
- `grep -c '^\s*- \[\[' "claims-2/Claims Ledger.md"` → **93**

All 93 of the ledger's 93 supporting-source bullets are now anchored, across
all four batches (claims 1–12, 13–24, 25–37, 38–43). Anchoring for the second
book's Claims Ledger is complete.
