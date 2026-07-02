# Source Anchoring Pass — claim 29 (P95 threshold) — 2026-07-02

## Target
Chapter 8's P95 latency-budget figure — Kwindla Hultman Kramer's "you care a lot
if your P95 goes up above 800, 900, 1,000 milliseconds" — was quoted in the
manuscript prose (`Chapter 8`, §"Latency is a budget across the whole stack") but
had no Source Anchor in the ledger. Surfaced by an editorial-health review.

Note: the sibling "~200 milliseconds" turn-budget figure was already anchored
under claim #20 (`P_RI1kCkRbo` 00:06:17.320 → 00:06:22.760); no work needed there.
A prior review had flagged it as missing — that was a false negative (ledger
spells it "200 milliseconds", not "200ms").

## Pass type
Source anchoring (`programs/source_anchoring_pass.md`), idempotent. Added a second
anchor to an already-cited source bullet; no new sources or claims registered.
Placement forced by the Method rule "never anchor to a video the claim does not
already cite" — claim #20 does not cite #142, claim #29 does, and #29's #142 bullet
is explicitly about "organized around the latency budget," which the P95 quote
evidences directly.

## Anchor written (1, confidence: high, via `cli.py` — never hand-typed)
- #29 (Latency must be masked, not just minimized): #142 Kwindla Hultman Kramer,
  Pipecat Cloud (`IA4lZjh9sTs`) 00:11:39.760 → 00:11:44.320
  — "you care a lot if your P95 goes up above 800, 900, 1,000 milliseconds"

## Method note
First attempt on the fuller gloss phrasing returned medium confidence with a VTT
artifact ("voicetooice"). Retried with the verbatim lead-in "you care a lot if
your P95 goes up above 800, 900, 1,000 milliseconds" from the raw VTT → high
confidence, clean quote.

## Result
`STATS.md`/`stats.json`/`website/src/data/stats.json` regenerated via
`99_Meta/scripts/build_stats.py`: Source Anchors 198 → 199 (High 197 → 198,
Medium 1, Low 0). Claims unchanged at 54; chapters 10.

## Left for follow-up
None for this figure. Broader manuscript-wide anchor coverage of numeric claims
in Ch8/Ch9 prose remains a general goal but was out of scope for this pass.
