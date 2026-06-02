# Source Anchoring Pass — claims 40–42 — 2026-06-02

## Target
The three Chapter-2 claims added in the prior drafting session, previously unanchored:
- #40 Cheap generation raises the value of taste and judgment
- #41 Vibe coding is an exploration mode that fails as a production default
- #42 Problem framing and review become the scarce skills once execution is cheap

## Pass type
Source anchoring (`programs/source_anchoring_pass.md`), idempotent. All target
videos had local transcripts in `99_Meta/transcripts/`.

## Anchors written (11 total, all confidence: high, via `cli.py` — never hand-typed)
- #40: #1 Matt Pocock (`v4F1gFy-hqg`), #6 Artman/Orosz (`wjk0ulMAkbc`), #14 Ronacher (`_Zcw_sVF6hU`)
- #41: #73 Kitze (`JV-wY5pxXLo`), #59 swyx (`IoiHI7p12Ao`), #132 Kelly (`Dc3qOA9WOnE`), #106 Gallon (`JsKTQbT58BY`), #127 Friedman (`n991Yxo1aOI`)
- #42: #14 Ronacher, #132 Kelly, #59 swyx (reused anchors from above)

## Method note
Five sources returned low confidence on the gloss phrasing; retried each with
verbatim wording from the plain transcript, all then resolved to high confidence.

## Result
Ledger now 42/42 claims anchored (was 39/42). `evidence.json` regenerated:
10 chapters, 99 chapter-claim rows. `STATS.md` refreshed: 150 anchors.

## Left for follow-up
~59 existing anchors across the ledger are 1–3-word fragments (e.g. "support
team", "hire", "pull requests") from an earlier batch — they validate but read
thin. A re-anchoring sweep to substantive verbatim quotes is queued (P1).
