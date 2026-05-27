<div align="center">

# From Copilot to Colleague

**A public experiment: can autonomous research loops produce a real, source-anchored book on AI engineering?**

[![Read it online](https://img.shields.io/badge/Read%20it-fromcopilottocolleague.com-1A1A1A?style=for-the-badge)](https://fromcopilottocolleague.com/)
&nbsp;
[![License: MIT](https://img.shields.io/badge/License-MIT-555.svg?style=for-the-badge)](LICENSE)
&nbsp;
[![Built with autoresearch](https://img.shields.io/badge/Method-autoresearch-c2410c?style=for-the-badge)](programs/book_autoresearch.md)

</div>

<br>

![The Autoresearch Knowledge Machine](diagrams/02-autoresearch-machine.png)

<br>

> **Models create possibility. Scaffolding creates trust. Organizations decide whether that trust compounds.**
>
> The thesis of the manuscript, in one line. The repo is the system that produced it.

---

## Why this exists

Most "AI-written" books produce slop because they have no source of truth — the model just remixes what it was trained on. **The Lab** is a different bet: a corpus of practitioner talks (the AI Engineer YouTube channel, **708 videos**), a bounded autonomous research loop, and a discipline that **no claim ships without a source anchor** — a precise pointer to the moment in a video where it came from.

The visible output is *From Copilot to Colleague: How AI Engineering Turns Models into Dependable Systems* — a ten-chapter manuscript at [fromcopilottocolleague.com](https://fromcopilottocolleague.com/).

The actual deliverable is **The Method** — the reproducible research-and-writing machine you can read in `programs/` and watch run in `research_passes/`. The manuscript is proof that the method works.

---

## The Manuscript — read it now

[![From Copilot to Colleague](diagrams/01-book-argument-spine.png)](https://fromcopilottocolleague.com/)

Ten chapters in a four-act arc — Problem (1–2), Scaffolding Stack (3–7), Stress Test (8), Widening (9–10). Each chapter:

- opens with an **Evidence of Source** exhibit (the before-vs-after diagram, click to enlarge)
- has three inline figures at section breaks
- ends with an **Evidence Rail** — every claim links back to the exact YouTube moment it came from
- shares a glossary system: dotted-underlined terms in the prose open a side drawer with the definition plus the concept diagram

[**→ Open the book**](https://fromcopilottocolleague.com/)
&nbsp;·&nbsp;
[**→ Browse the Visual Guide (65 diagrams)**](https://fromcopilottocolleague.com/visual-guide)

---

## The Method — how the book is built

![The five-layer pipeline](diagrams/03-scaffolding-stack.png)

A five-layer pipeline governed by a small **Research-Org** control plane:

| Layer | What lives there | Repo dir |
|---|---|---|
| **Source** | Practitioner videos as the corpus of record | `01_Videos/` (notes) · channel metadata in `99_Meta/` |
| **Synthesis** | Themes, people, concepts derived from the corpus | `02_Themes/` · `03_People/` · `04_Concepts/` · public versions in `public/` |
| **Evidence** | Verified claims with anchored video timestamps | `claims/Claims Ledger.md` · `evidence/` · per-anchor JSON in `claims/anchors/` |
| **Manuscript** | Chapter drafts that draw on evidence, never inventing | `public/drafting/` · rendered in `website/src/content/chapter-*.md` |
| **Control plane** | The agent instructions, research passes, autoresearch loop | `programs/` · `tasks/` · `research_passes/` |

The agent loop is bounded: each pass takes a specific mission ("anchor claims 16–19", "rework summaries for videos 680–687"), runs to completion, commits its result, logs the pass. Every operation is reversible and auditable in git.

Read the loop's instructions: [`programs/book_autoresearch.md`](programs/book_autoresearch.md) and [`programs/source_anchoring_pass.md`](programs/source_anchoring_pass.md).

---

## What's genuinely novel here

1. **Source Anchors as a discipline.** Every claim in the manuscript carries a `video_id` + start/end timestamp + verbatim quote. The website's Evidence Rail surfaces them under each chapter as clickable YouTube embeds. **No anchor, no claim.**
2. **The book is the proof, not the product.** The Method (the reproducible machine) is the actual artefact. The manuscript shows it works.
3. **Method ships with the artefact.** Every agent instruction, every research pass log, every quality judge is in this repo — readable, criticisable, reproducible.
4. **65 hand-built diagrams** that argue visually instead of decorate. See [`diagrams/README.md`](diagrams/README.md) for the full visual guide.

---

## Quick tour of the repo

```
ai-engineering-book-lab/
├── 01_Videos/          # source corpus (notes per video, 708+ entries)
├── 02_Themes/          # cross-corpus theme syntheses
├── 03_People/          # speaker profiles
├── 04_Concepts/        # concept pages (Harness, Eval, Context, etc.)
├── 99_Meta/            # corpus stats, ingest scripts, anchor builders
├── claims/             # canonical Claims Ledger + per-anchor JSON
│   ├── Claims Ledger.md
│   └── anchors/
├── diagrams/           # 65 hand-built diagrams (Excalidraw source + PNG)
│   ├── 01–14*.png      # 4 overview + 10 chapter openers
│   ├── concepts/       # 18 concept diagrams
│   ├── inline/         # 30 inline chapter figures
│   └── maps/           # 2 reader's path + methodology maps
├── docs/               # superpowers/specs and plans
├── evidence/           # evidence packs between notes and prose
├── programs/           # agent program instructions (autoresearch, anchoring)
├── public/             # public-safe curated mirror
│   ├── concepts/       # promoted concept pages
│   ├── drafting/       # chapter drafts
│   └── themes/         # promoted themes
├── research_passes/    # cumulative logs of each autonomous pass
├── tasks/              # bounded agent missions
└── website/            # the Reader (React + Vite, deployed to Vercel)
    ├── src/            # catalogue, visual guide, reader pages + EvidenceRail
    ├── scripts/        # diagram sync + sitemap generators
    └── public/         # synced PNGs + manifest.json
```

A full description of public vs internal layers lives in [`PUBLIC_REPO_PLAN.md`](PUBLIC_REPO_PLAN.md). The vocabulary the experiment uses is locked in [`CONTEXT.md`](CONTEXT.md) (The Lab · The Method · The Manuscript · Claim · Source Anchor · Support level).

---

## Status (2026-05)

- **708 videos** ingested from the AI Engineer channel
- **19 claims** anchored to video timestamps; **54 high-confidence anchors**, **7 medium**
- **10 chapter drafts** rendered live at [fromcopilottocolleague.com/read](https://fromcopilottocolleague.com/read)
- **65 hand-built diagrams** (14 overview + 18 concept + 30 inline + 3 maps) — live counts in [`STATS.md`](STATS.md)
- **Evidence Rail** ships per chapter — every claim renders an embedded YouTube clip at its exact timestamp
- **CI/CD** wired (build/test on PR, auto-deploy on push, evidence regen on claims-ledger change) — see [`DEPLOY.md`](DEPLOY.md)

Not done yet:
- Reader's chapter routes are SPA-only (per-chapter SEO routes spec'd at [`docs/superpowers/specs/2026-05-26-website-seo-routing-design.md`](docs/superpowers/specs/2026-05-26-website-seo-routing-design.md), implementation queued)
- Chapters 5, 7, 8, 9 are still Starter/Outlined — Drafting passes ongoing
- One map (`03-concept-graph`) outstanding

---

## How you can engage

This is a public experiment. A few entry points that are genuinely useful right now:

| If you want to… | Start here |
|---|---|
| **Read the book** | [fromcopilottocolleague.com](https://fromcopilottocolleague.com/) — chapters render with their evidence rail |
| **Push back on a claim** | Open an issue with the `claim:` prefix and quote the Claims Ledger entry |
| **Add a source** | The corpus is the AI Engineer channel; for other sources, propose via an issue first — adding sources is a careful editorial call, not automatic |
| **Improve a diagram** | All 64 are editable Excalidraw JSON; open `diagrams/<name>.excalidraw` at [excalidraw.com](https://excalidraw.com) |
| **Read the method** | [`programs/book_autoresearch.md`](programs/book_autoresearch.md), [`programs/source_anchoring_pass.md`](programs/source_anchoring_pass.md), then [`research_passes/`](research_passes/) for logs of what's been tried |
| **Fork the method for your own corpus** | The MIT license lets you. The system isn't tied to AI Engineer — swap the source corpus and most of the machinery still applies |
| **Star the repo** | If this experiment is worth watching, the star helps signal that |

---

## Inspiration

- **Autoresearch** (the underlying spirit — bounded research loops with self-improving instructions, originally from AI/ML research workflows)
- **Karpathy's *Software 2.0* / *The bitter lesson*** (why investing in process beats investing in heroic effort)
- **Knuth's *Literate Programming*** (the idea that the artefact is a system + its derivation, not just the output)
- ***Designing Data-Intensive Applications*** (the editorial bar this manuscript aims at)
- **The AI Engineer practitioner community** for being the corpus

---

## License

MIT — see [LICENSE](LICENSE). The manuscript prose is part of the experiment; if you cite or build on it, an attribution back to the experiment is appreciated but not required.

---

<div align="center">

*Built openly. Source-anchored. Continuously improving.*

[**Read the book →**](https://fromcopilottocolleague.com/)
&nbsp;·&nbsp;
[**Browse the diagrams →**](https://fromcopilottocolleague.com/visual-guide)
&nbsp;·&nbsp;
[**Inspect the method →**](programs/)

</div>
