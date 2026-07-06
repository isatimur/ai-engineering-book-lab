# Launch Kit — From Copilot to Colleague

> Reconstructed 2026-07-06. The original draft of this document was lost before commit;
> this version is rebuilt from surviving assets and the shipped Ch1 campaign.
> Every asset and URL listed here has been verified to exist.

## What we're launching

**From Copilot to Colleague** — companion site at <https://fromcopilottocolleague.com>,
author Timur Isachenko. Chapter 1 shipped publicly (2026-07-04) as a multi-channel
launch: X thread + LinkedIn post + carousel PDF + audiobook chapter, with named
individual contributors credited publicly (the public-credit model, 9 authors on Ch1).

## Asset inventory (verified on disk)

| Asset | Location | Status |
|---|---|---|
| Ch1 carousel PDF | `launch-assets/from-copilot-to-colleague-ch1-carousel.pdf` (3.4 MB) | shipped |
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
  manuscript and site) is the technical story, not the book itself.
- **Speaker amplification** — the highest-leverage channel; see
  [launch-speaker-outreach.md](launch-speaker-outreach.md). Each of the 5 ledgers
  names its speaker(s); a speaker sharing their own ledger page reaches exactly
  the book's audience.

## Per-chapter launch checklist

1. Manuscript synced canonical (CI book-consistency gate green).
2. Audiobook chapter regenerated and committed under `website/public/audiobook/`.
3. Carousel/visual asset exported to `launch-assets/` **and committed** (the Ch1
   PDF sat untracked for 3 days — don't repeat that).
4. Contributor credits confirmed with each named author before posting.
5. X thread + LinkedIn post drafted, claims cross-checked against `/evidence`.
6. Post, then log links + dates in this file's log below.

## Launch log

| Date | What shipped | Channels |
|---|---|---|
| 2026-07-04 | Chapter 1 + audiobook | X thread, LinkedIn, carousel PDF; 9 credited authors |
