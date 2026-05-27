# Roadmap

Where The Lab is and where it's going. For live counts see [`STATS.md`](STATS.md);
for vocabulary see [`CONTEXT.md`](CONTEXT.md).

## Shipped

| When | What | Where |
|---|---|---|
| 2026-05-12 → 13 | **MASH** harness — meeting agent simulation + judge dims (foundation for autoresearch loop) | `~/Dev/LifeOS/book-mash/` + ai-worker editable import |
| 2026-05-21 → 22 | **64 hand-built diagrams** (4 overview · 10 chapter openers · 18 concepts · 30 inline · 3 maps) | `diagrams/` |
| 2026-05-23 | **Website rework** — Catalogue + Visual Guide + Reader (24-commit refactor; App.tsx 1075 → 5 lines) | `website/` |
| 2026-05-24 | **Source-anchoring pass** — claims 1–19 anchored; 76 high + 8 medium-confidence anchors | `claims/Claims Ledger.md` + `claims/anchors/` |
| 2026-05-24 | **EvidenceRail** rendering per chapter (click any claim → watch the source clip) | `website/src/EvidenceRail.tsx` |
| 2026-05-25 | **Domain live** at `fromcopilottocolleague.com` + Vercel auto-deploy + GitHub Actions CI | `.github/workflows/`, `DEPLOY.md` |
| 2026-05-26 | **Final cover** (engraving-style clockwork with human + robotic hands) | `website/public/covers/` |
| 2026-05-27 | **README rewrite** (star-attracting landing) · **Reader hero** swapped from Unsplash stock to overview diagrams · **STATS.md** single-source-of-truth system | repo root + website hero |

## In flight

| Priority | What | Tracking |
|---|---|---|
| P0 | **Anchor remaining claims** — only 19/many ledger claims have anchors; ongoing source-anchoring passes | `programs/source_anchoring_pass.md` + `research_passes/` |
| P0 | **Chapter drafting passes** — chapters 5, 7, 8, 9 still Starter/Outlined | `public/drafting/` + `website/src/content/chapter-*.md` |
| P1 | **SEO routing refactor** — pre-rendered HTML per chapter/concept/map (12-task plan ready) | [`docs/superpowers/specs/2026-05-26-website-seo-routing-design.md`](docs/superpowers/specs/2026-05-26-website-seo-routing-design.md) |
| P1 | **Stats regen in CI** — auto-run `build_stats.py` on push so counts never drift | TODO: `.github/workflows/stats-regen.yml` |

## Queued (validated, not started)

- **Per-chapter Open Graph image generation** — branded social cards with chapter title overlay
- **JSON-LD structured data** (`Book`, `Chapter`, `Article`) for richer Google snippets
- **Search across chapters + glossary**
- **Reading progress persistence** across sessions
- **Programmatic backlinks via diagram-as-content** posting cadence

## Not done — and intentional

- **Cloud Run deploy** — Vercel is the canonical target; the original AI Studio template at `editorial-book-ui-...run.app` is stale but kept as legacy
- **Audiobook playback** — the `AUDIOBOOK` button in the bottom nav is decorative
- **AMP** — irrelevant in 2026
- **Analytics** — no tracking added; will revisit when there's an actual question to answer

## Methodology backlog

- **Multi-agent review** for whole-manuscript passes (chapter-role confusion, weak evidence, overlap)
- **Cross-corpus synthesis** — adding sources beyond AI Engineer (carefully)
- **Quality judges** for summary + claim + chapter coherence (MASH dimensions ported in)

## How to read this file

If a row's date is in the **Shipped** table, the artefact is in the repo and reproducible from it. If it's in **In flight**, work is active and the linked tracking doc is the source of truth. **Queued** items are spec'd but not started. **Not done — intentional** is here to prevent re-asking.

Update protocol: when a task moves from one bucket to another, edit this file in the same commit. The roadmap is hand-curated (unlike `STATS.md` which is generated).
