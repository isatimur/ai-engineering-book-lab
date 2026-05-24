# Source Anchoring Pass

## Objective
Backfill every Claim in `claims/Claims Ledger.md` with Source Anchors — `{video_id, start, end, quote, confidence}` — so a reader (or a judge) can verify the exact moment in a source video that grounds the claim. The pass is idempotent: a supporting source that already has an `**Anchor:**` child bullet is skipped.

## Why
A bare `[[wikilink]]` points at a whole video. A Source Anchor points at the verbatim seconds. The `quote` is the evidence; the timestamp is convenience — a few seconds of drift is harmless because the quote is self-verifying (ADR-0002).

## Inputs
- `claims/Claims Ledger.md` — the canonical ledger (ADR-0001).
- `99_Meta/transcripts/raw/<video_id>.en.vtt` — word-level WebVTT per video.
- `99_Meta/transcripts/plain/<video_id>.txt` — plain transcript, for finding the real wording.
- Tool: `99_Meta/scripts/anchor/cli.py`.

## Source Anchor format (in the ledger)
Under each `- [[wikilink|label]]` supporting-source bullet, add two child bullets, indented one level:

    - [[206-kDEvo2__Ijg-from-copilot-to-colleague-joel-hron|#206 — Joel Hron, Thomson Reuters]] — existing gloss kept
      - **Anchor:** `kDEvo2__Ijg` 00:11:46.320 → 00:11:52.880 · confidence: high
      - **Quote:** "the north star has shifted from helpfulness to productive"

`confidence` is `high | medium | low`. Use a real arrow ( → ) between start and end, and ` · ` before `confidence:`. A source whose video has no transcript gets one child bullet instead, with no `**Quote:**` line:

      - **Anchor:** not available (no transcript)

## Procedure (per claim, per supporting source)
1. If the source bullet already has an `**Anchor:**` child bullet — SKIP it (idempotency).
2. Extract the video id: the 11 characters after the leading `NNN-` in the wikilink target. `cli.py` also accepts the raw wikilink target and extracts the id for you.
3. Choose a search phrase. If the source's gloss already quotes the talk, use those words. Otherwise use the wording of the claim this source supports. To find the real phrasing, open `99_Meta/transcripts/plain/<video_id>.txt`.
4. Run: `python3 99_Meta/scripts/anchor/cli.py <video_id> "<search phrase>"`.
5. Read the JSON output.
   - If `confidence` is `low`, open the plain transcript, find the actual sentence, and retry step 4 with a verbatim phrase.
   - If the JSON has an `error` key (no transcript), write `- **Anchor:** not available (no transcript)` as the only child bullet and move on.
6. Write the `**Anchor:**` and `**Quote:**` child bullets. The `quote` is the tool's returned `quote` value verbatim — never a paraphrase, never hand-typed.

## Never do
- Never invent or hand-type a timestamp. Timestamps come only from the tool.
- Never write a `quote` you did not get from the tool's output.
- Never anchor to a video the claim does not already cite.
- Never delete or rewrite an existing gloss — the Anchor is added alongside it.

## Leave a record
After a pass, append a dated log to `research_passes/` per `research_passes/README.md`: date, target, sources anchored, low-confidence or no-transcript sources left for follow-up.
