# Source Anchoring Pass — weak-fragment re-anchoring — 2026-06-02

## Target
The ~59 existing anchors whose `quote` was a 1–3-word fragment (e.g. "Exa",
"hire", "pull requests", "software factory") left over from an earlier
keyword-match batch. They validated but read thin — a bare keyword is not
self-verifying evidence. This pass replaces each with a substantive verbatim
sentence that grounds the claim it supports.

## Pass type
Source anchoring (`programs/source_anchoring_pass.md`), idempotent. Scope:
quotes of ≤3 words. 57 fragments found (one, Stephen Chin #105, had already been
upgraded in the prior session → commit `40bb826`). All target videos had local
transcripts in `99_Meta/transcripts/`.

## Method
1. Parsed the ledger for every `**Quote:**` of ≤3 words; captured each one's
   anchor timestamp, claim, and gloss.
2. For each fragment, reconstructed transcript context two ways: a VTT word-stream
   window around the existing timestamp (for fragments whose location already sat
   in a relevant sentence), and keyword/offset search of the plain transcript
   (for fragments anchored to a generic intro that did not ground the claim).
3. Chose a substantive verbatim sentence matching the claim/gloss, then ran it
   through `cli.py` to get the verbatim quote + timestamps. Retried with exact
   disfluencies ("the the", "what what", "are are") wherever the first pass
   returned medium/low, until every result was high confidence.
4. Applied edits by line number (in-place, format-preserving), regenerated
   `evidence.json`, committed in four batches by claim range.

Repeated-video care: where one video backed multiple claims (Cursor software-factory
×3, blmAkayzE8M identity ×3, CD6R4Wf3jnY root-of-trust ×2, 0n3MKk7r60w GitHub-MCP
×2, ClWD8OEYgp8 alignment ×2, EmhRyw6xeT0 ×2) each claim got a *distinct*
substantive sentence rather than reusing one quote.

## Result
- **57 fragments re-anchored** to substantive verbatim quotes (min quote length
  is now 4 words; was 1).
- **2 leftover medium-confidence anchors** (Eno Reyes `ShuJ_CN6zr4`,
  Boyd/Narasimhan `iOXM3zE-2dk`) upgraded to high in the same pass.
- Ledger now **150/150 anchors at confidence: high** — 0 medium, 0 low.
- `evidence.json` regenerated: 42 anchored claims, 10 chapters, 99 chapter-claim
  rows. Ledger integrity verified: 150 Anchors = 150 Quotes, no malformed quotes.
- Commits: 4 batches (claims 4–26, 26–31, 31–35, 36–39) + 1 medium-upgrade commit.
- No API spend — entirely local transcript + `cli.py` work.

## Notes / honest caveats
- A handful of sources are loosely-cited (the gloss is interpretive and the talk
  is a product demo, not a direct statement of the claim): Manus `xz0-brt56L8`
  (claim 28), state-of-AI-engineering survey `mQ7_Zje7WKE` (claim 35). For these
  the quote is the most on-topic substantive sentence the transcript actually
  contains, not a perfect match for the gloss. They were already validating
  anchors; this pass made them read as real evidence rather than keywords.
- Verbatim quotes preserve authentic speech disfluencies ("uh", "um", "the the")
  per the never-paraphrase rule in `source_anchoring_pass.md`.

## Left for follow-up
None for fragments — the ≤3-word set is exhausted (0 remaining).
