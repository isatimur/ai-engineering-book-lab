# 2026-05-24 — Source Anchoring Pass

- **date:** 2026-05-24
- **target:** all 19 claims in `claims/Claims Ledger.md`
- **pass type:** source anchoring backfill (ADR-0002)

## Inputs used
- `claims/Claims Ledger.md`
- `99_Meta/transcripts/raw/*.en.vtt`, `99_Meta/transcripts/plain/*.txt`
- `99_Meta/scripts/anchor/cli.py`

## Outputs changed
- `claims/Claims Ledger.md` — every supporting source now carries a Source Anchor

## What improved
- Every claim's supporting sources point at verbatim, timestamped moments instead of whole videos.

## Quality signals improved
- Coverage: 53 high-confidence anchors, 8 medium-confidence, 0 low-confidence, 0 not-available

## Unresolved questions

Medium-confidence anchors worth revisiting with tighter phrases:

- claim 1 — `kDEvo2__Ijg` — confidence: medium (quote: "like that northstar has shifted from helpfulness to productive")
- claim 1 — `XNtkiQJ49Ps` — confidence: medium (quote: "they need more than just the If")
- claim 4 — `ShuJ_CN6zr4` — confidence: medium (quote: "automated validation and verification of software that you build um testing right unit tests end")
- claim 4 — `Zniw5c9_jx8` — confidence: medium (quote: "effectively allow us to mentor our Thank")
- claim 9 — `o_LRtAomJCs` — confidence: medium (quote: "it with confidence")
- claim 10 — `NTBX-wxUhHs` — confidence: medium (quote: "each and every one of us, you know, feel")
- claim 18 — `JT3OzDKrucU` — confidence: medium (quote: "MCP plus the")
- claim 19 — `iOXM3zE-2dk` — confidence: medium (quote: "minding the gap around observability.")
