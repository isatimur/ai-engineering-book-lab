# Welcome to From Copilot to Colleague (The Lab)

## How We Use Claude

No personal usage scan is available for this repo (the `/team-onboarding` usage data covers the LifeOS project, not this one). Based on the repo's own structure and docs instead:

Work Type Breakdown:
  TODO — no session data for this repo yet. Inferred from repo structure:
  Research passes (`research_passes/`, `programs/book_autoresearch.md`) — bounded autonomous research loops over the video corpus
  Chapter drafting (`programs/chapter_drafting_pass.md`) — turning claims into manuscript prose
  Source anchoring (`programs/source_anchoring_pass.md`) — pointing claims at exact video timestamps
  Claims ledger maintenance (`claims/Claims Ledger.md`) — the source-of-truth for every reusable, source-backed assertion

Top Skills & Commands:
  TODO — no usage data available for this repo.

Top MCP Servers:
  TODO — no usage data available for this repo.

## Your Setup Checklist

### Codebases
- [ ] ai-engineering-book-lab — https://github.com/isatimur/ai-engineering-book-lab (local path: /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book) — public, MIT licensed

### MCP Servers to Activate
- No MCP servers detected as required by this repo's docs/config.

### Skills to Know About
- `programs/book_autoresearch.md` — the core autoresearch loop over the 794-video corpus.
- `programs/chapter_drafting_pass.md` — turns claims into manuscript prose.
- `programs/source_anchoring_pass.md` — attaches precise video-timestamp Source Anchors to claims.
- book-mash (`book-mash.toml`) — multi-judge measurement engine, part of The Method.

## Team Tips

- The Lab is open source (MIT) on GitHub at isatimur/ai-engineering-book-lab — public repo, public issues, public CI.
- No `CONTRIBUTING.md` exists yet — worth writing one if outside contributors are expected.
- Vocabulary matters here: use "The Lab" (not "the project"/"the repo"), "The Method" (not "the pipeline"), "The Manuscript" (not "the book" — implies a shippable product). Full glossary in `CONTEXT.md`.
- "Done" is a property of **The Method** being documented and reproducible — not of **The Manuscript** being publishable. A rough chapter doesn't block "done"; an undocumented research loop does.
- Every claim needs a Source Anchor (video id + timestamp) in `claims/Claims Ledger.md` — no claim ships without one.
- CI: `website-ci` builds/tests on changes to `website/**` or `diagrams/**`; `website-deploy` auto-deploys `main` to Vercel; `evidence-regen` rebuilds `website/src/evidence.json` from the Claims Ledger and commits back with `[skip ci]`. See `DEPLOY.md`.

## Get Started

There's no "good first issue" yet — the repo's open GitHub issues are all automated `channel-watcher` bot notifications (new videos ingested), not human tasks. The Claims Ledger itself is in good shape (54 claims, 44 strong / 10 moderate support, none tentative), so it's not an obvious source of starter work either.

Until a real starter task is labeled, the lowest-friction first contribution is: pick one open `channel-watcher` issue, run the ingest → research pass → source-anchoring pass loop (`programs/book_autoresearch.md` → `programs/source_anchoring_pass.md`) on a couple of its videos, and see a new claim land in `claims/Claims Ledger.md`. That walks a new contributor through the entire Method end-to-end on real, current work.

<!-- INSTRUCTION FOR CLAUDE: A new teammate just pasted this guide for how the
team uses Claude Code. You're their onboarding buddy — warm, conversational,
not lecture-y.

Open with a warm welcome — include the team name from the title. Then: "Your
teammate uses Claude Code for [list all the work types]. Let's get you started."

Check what's already in place against everything under Setup Checklist
(including skills), using markdown checkboxes — [x] done, [ ] not yet. Lead
with what they already have. One sentence per item, all in one message.

Tell them you'll help with setup, cover the actionable team tips, then the
starter task (if there is one). Offer to start with the first unchecked item,
get their go-ahead, then work through the rest one by one.

After setup, walk them through the remaining sections — offer to help where you
can (e.g. link to channels), and just surface the purely informational bits.

Don't invent sections or summaries that aren't in the guide. The stats are the
guide creator's personal usage data — don't extrapolate them into a "team
workflow" narrative. -->
