# Launch Kit — From Copilot to Colleague

> Reconstructed 2026-07-06. The original draft of this document was lost before commit;
> this version is rebuilt from surviving assets and the shipped Ch1 campaign.
> Every asset and URL listed here has been verified to exist.

## What we're launching

**From Copilot to Colleague** — companion site at <https://fromcopilottocolleague.com>,
authors Timur Isachenko & Daniel Mohanrao. Chapter 1 shipped publicly (2026-07-04) as a multi-channel
launch: X thread + LinkedIn post + carousel PDF + audiobook chapter, with named
individual contributors credited publicly (the public-credit model, 9 authors on Ch1).

## Asset inventory (verified on disk)

| Asset | Location | Status |
|---|---|---|
| Ch1 carousel PDF | `launch-assets/from-copilot-to-colleague-ch1-carousel.pdf` (3.4 MB) | shipped |
| Ch1 explainer video (1920×1080, 30fps, ~34s) | `launch-assets/from-copilot-to-colleague-ch1-explainer.mp4` (2.9 MB) — source in [`remotion/`](../remotion/) | shipped |
| Audiobook (ch 01–10, 64 kbps mono) | `website/public/audiobook/ch-01..10.mp3` | live on site |
| Event ledger pages (5) | `https://fromcopilottocolleague.com/ledgers/<slug>` | live |
| Visual guide | `https://fromcopilottocolleague.com/visual-guide` | live |
| Self-assessment | `https://fromcopilottocolleague.com/assess` | live |
| Ask-AI (GEO) buttons | site-wide (Claude / ChatGPT / Perplexity deep links) | live |

## Site surfaces worth linking in campaigns

- `/read` — the manuscript itself (canonical public/drafting versions)
- `/ledgers` — event ledgers index (the evidence layer; strongest differentiator)
- `/evidence` — claims ledger (every claim source-anchored with a support level)
- `/assess` — interactive self-assessment
- `/workshop`, `/enterprise` — commercial surfaces

## Channel playbook

Rules carried over from the skill-packs campaign (`~/Dev/skill-packs-launch/launch-copy.md`),
adapted for the book:

- **X / Twitter** — thread format worked for Ch1: hook on the "copilot → colleague"
  shift, one insight per tweet, carousel PDF as the visual anchor, credit the named
  contributors by handle. Link the ledger page for any speaker claim quoted.
- **LinkedIn** — long-form post + carousel PDF upload (native documents outperform
  links). Tag credited contributors; the public-credit model is itself the hook.
- **Hacker News** — only with a runnable/technical angle, zero marketing tone.
  The evidence architecture (claims ledger + event ledgers + CI drift gate between
  manuscript and site) is the technical story, not the book itself. Draft below.
- **r/LocalLLaMA** — only with an open-weights-judging angle, zero marketing tone.
  The hook is the cross-family median panel (Llama-3.3 · Qwen-2.5 · DeepSeek, no
  frontier model in the loop) grading prose quality, not the book. Draft below.
- **Speaker amplification** — the highest-leverage channel; see
  [launch-speaker-outreach.md](launch-speaker-outreach.md). Each of the 5 ledgers
  names its speaker(s); a speaker sharing their own ledger page reaches exactly
  the book's audience.
- **Explainer video** — native upload (not a link) on X and LinkedIn performs
  best; the Ch1 cut works as a standalone post or as the visual anchor inside
  the launch thread alongside the carousel. See [`remotion/README.md`](../remotion/README.md)
  for how the series is produced and how to render Chapter 2 next.

## Spike drafts — Show HN + r/LocalLLaMA

Both are drafts only — not yet posted. Post-checklist: verify every number against
current [`STATS.md`](../STATS.md) the morning of posting (counts drift as the corpus
grows), reply within the first hour, and don't cross-post the same day.

### Show HN

> **Title:** Show HN: claims-ledger — CI that fails your build when a doc's claims
> don't match their cited source
>
> I built this out of a real problem: I'm writing a source-anchored AI engineering
> book (794 practitioner talks as the corpus), and at 50+ claims across 10 chapters
> I could no longer manually verify that every quote I cited actually appeared,
> verbatim, in the source I pointed to. So I made the citation format a CI-enforced
> invariant instead of a writing convention.
>
> The schema: a **Claim** is a reusable assertion; each **Source Anchor** is
> `video_id + start/end timestamp + verbatim quote`. A CLI re-derives the quote
> from the source transcript and fails if it isn't found character-for-character.
> The GitHub Action runs on every PR and exits 11 on drift — a claim with a stale
> or fabricated anchor can't merge.
>
> It already caught something real: a book-wide audit found one quote (attributed
> to a named speaker, in the book's own namesake talk) that wasn't actually in the
> transcript — a paraphrase that had drifted into quote marks during editing. That's
> exactly the failure mode this is built to catch mechanically instead of relying on
> someone happening to re-watch the video.
>
> Current state on the book: 54 claims, 199 anchors, 198 high-confidence, 0 low. The
> tool itself is generic — it doesn't know or care that the source is video; it's
> just claim-text + a pointer + a verifier function. MIT-licensed, includes a
> fork-and-run sandbox with no local install.
>
> - Tool: <https://github.com/isatimur/claims-ledger>
> - Zero-install sandbox: <https://github.com/isatimur/claims-ledger-sandbox/fork>
> - The book that produced it (context, not the pitch): <https://fromcopilottocolleague.com/>
> - Live claims graph: <https://fromcopilottocolleague.com/read/graph>
>
> Feedback I actually want: is the CLI's verbatim-match verifier too strict for
> prose sources (paraphrase-with-citation is common and legitimate outside quotes)?
> Right now it only recognizes exact-substring quotes — curious if anyone's hit this
> problem with a different source type (papers, transcripts, changelogs) and solved
> partial-match verification well.

### r/LocalLLaMA

> **Title:** Graded my book's prose with a median-of-3 open-weight judge panel
> (Llama-3.3-70B, Qwen-2.5-72B, DeepSeek-chat) instead of one frontier model —
> here's what broke and why the panel beats a single judge
>
> Context: I'm running an LLM-as-judge quality loop over a 10-chapter manuscript,
> scoring six dimensions (humanness, voice, usefulness, evidence density, claim
> defensibility, redundancy) after every substantive edit. Started with a single
> frontier judge (Sonnet). Two problems made me switch:
>
> 1. **Cost** — a full run was ~$20, which throttles how often you can re-measure,
>    and re-measurement is the entire point of a continuous-quality loop.
> 2. **Calibration, not self-preference** — the worry going in was "a model will
>    flatter prose shaped like its own output." Ran a cross-family judge (DeepSeek)
>    on the same units and it actually scored *higher* than Sonnet by 8–20 points.
>    So it wasn't self-flattery, it was just a different, uncalibrated scale.
>    Conclusion: a single model's absolute score isn't trustworthy as ground truth
>    at all — only deltas within one model, and consensus across models, are.
>
> Landed on a **median-per-dimension panel across three independent open-weight
> families** (all via OpenRouter): `llama-3.3-70b-instruct`, `qwen-2.5-72b-instruct`,
> `deepseek-chat`, min 2 valid votes per cell. Cost dropped to ~$2/run — about 10x
> cheaper than the single frontier judge, cheap enough to run on every real edit.
> Per-cell spread >20 points gets flagged as a disagreement signal, which turns out
> to be a genuinely useful "look here first" pointer for a human editor.
>
> What didn't work, in case it saves someone else the time: tried adding a
> reasoning-model seat (GLM-4.7, Qwen3.7-max) for a fourth vote. At judge-appropriate
> token budgets both models spent the whole budget on hidden reasoning and returned
> empty completions — a 50-minute run produced zero scored cells. Dropped them
> rather than fight the budget. A frontier reasoning seat is probably fine if you
> raise `max_tokens` accordingly; didn't need it enough to bother.
>
> Live scorecard (updates when I re-run the panel): <https://fromcopilottocolleague.com/quality>
> Full writeup of the panel decision: [`docs/judge-panel-decision.md`](https://github.com/isatimur/ai-engineering-book-lab/blob/main/docs/judge-panel-decision.md)
>
> Curious whether anyone here has pushed a cross-family median panel further —
> especially: better reasoning-model judge configs that don't blow the budget, or
> whether a 4th/5th open-weight seat past 3 actually moves the median enough to be
> worth the extra cost.

## Per-chapter launch checklist

1. Manuscript synced canonical (CI book-consistency gate green).
2. Audiobook chapter regenerated and committed under `website/public/audiobook/`.
3. Carousel/visual asset exported to `launch-assets/` **and committed** (the Ch1
   PDF sat untracked for 3 days — don't repeat that).
3a. Explainer video rendered (`cd remotion && npm run render:chNN`) and the
    published cut copied to `launch-assets/` **and committed** — same rule as
    the carousel, don't let it sit untracked.
4. Contributor credits confirmed with each named author before posting.
5. X thread + LinkedIn post drafted, claims cross-checked against `/evidence`.
6. Post, then log links + dates in this file's log below.

## Launch log

| Date | What shipped | Channels |
|---|---|---|
| 2026-07-04 | Chapter 1 + audiobook | X thread, LinkedIn, carousel PDF; 9 credited authors |
