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
| 2026-05-27 | **`stats-regen` workflow** — auto-runs `build_stats.py` on push to corpus/claims/diagrams/etc., commits back with [skip ci] · **`website-deploy` workflow_dispatch** added | `.github/workflows/stats-regen.yml` · `.github/workflows/website-deploy.yml` |
| 2026-05-27 | **`VERCEL_TOKEN`** set in GitHub secrets → end-to-end auto-deploy verified (push → Vercel prod in ~40s, no manual step) | GitHub repo secrets |
| 2026-05-31 | **Chapter drafting passes complete** — ch 5/7/8/9 Starter → Drafting (ch3–9 now all Drafting, ~2,600–3,100 words each) | `website/src/content/chapter-*.md` · `public/drafting/` |
| 2026-05-31 | **Anchor backfill (claims 25–39)** — +40 Source Anchors; ledger now 37/39 claims anchored | `claims/Claims Ledger.md` |
| 2026-06-01 | **All 10 chapters Drafting** — ch1/2/10 drafted, ch4/6 expanded from stubs; ch3 scaffold-leak fixed | `website/src/content/chapter-*.md` |
| 2026-06-01 | **Quality feature (Phases 1–3)** — inline AI-judge scorecards in reader · `/versions` git-diff view · `/quality` dashboard (heatmap + ship-blockers); committed-extract pipeline (`build_judge_scores.py`, `build_versions.py`) | `website/src/{pages,components,lib}/` · `99_Meta/scripts/` |
| 2026-06-01 | **First full MASH run** ($5.17) — all 10 chapters scored; partial (Haiku rate-limited); judges since moved to Sonnet to fix | `.book-mash-runs/` · `website/src/data/judge-scores.json` |
| 2026-06-02 | **2nd MASH run on Sonnet** ($3.70) — 4/6 dims now full coverage; `history[]` → Phase 4 trend sparklines live on `/quality` | `website/src/data/judge-scores.json` · `website/src/pages/Quality.tsx` |
| 2026-06-02 | **Ledger 42/42 anchored** — Ch-2 claims #40–42 source-anchored (11 high-confidence anchors) | `claims/Claims Ledger.md` |
| 2026-06-02 | **harness-humanizer skill** extracted to its own repo (de-slop loop; rubric from the humanness judge) | [`github.com/isatimur/harness-humanizer-skill`](https://github.com/isatimur/harness-humanizer-skill) |
| 2026-06-02 | **Weak-fragment re-anchoring complete** — all 57 remaining 1–3-word fragment quotes + 2 leftover mediums upgraded to substantive verbatim sentences; ledger now **150/150 anchors high-confidence** (0 medium, 0 low) | `claims/Claims Ledger.md` · `research_passes/2026-06-02-fragment-reanchoring.md` |
| 2026-06-02 | **Harness-humanizer dogfood (book-wide)** — de-slop sweep across all 10 chapters: removed claim-announcers (the "claims-ledger" tic) + filler intensifiers; 19 pure-subtraction edits (ch05/ch10 already clean). Applied to `drafting/` (the MASH-judged files) and propagated to rendered `content/` | `public/drafting/*.md` · `website/src/content/*.md` |
| 2026-06-03 | **Usefulness hybrid (book-wide)** — all 10 chapters: weakest descriptive paragraphs sharpened into explicit decisions/thresholds/tests/traps + a grounded "What to do with this" section each. Every change traces to a source already in the chapter (fidelity-bound, no fabrication); ch10 kept light (reflective closer). Applied to `drafting/` + `content/`. Re-score pending a MASH run | `public/drafting/*.md` · `website/src/content/*.md` · `docs/superpowers/specs/2026-06-03-usefulness-pilot-design.md` |
| 2026-06-02 | **SEO routing refactor (merged)** — wouter → react-router-dom + vite-react-ssg; 36 pages prerendered to static HTML with per-page `<Head>` meta + canonical; new `/read/:slug`, `/visual-guide/concepts/:slug`, `/visual-guide/maps/:slug` routes; 34-URL sitemap + robots.txt; Vercel `cleanUrls` + repo-root build fix | `website/` · PR #1 |

## In flight

| Priority | What | Tracking |
|---|---|---|
| P1 | **Full-coverage MASH run** — 2nd run still left humanness + claim_defensibility ~partial (Sonnet's own rate limit). Needs MASH-side throttling/backoff or per-dim batching, then a clean re-run | `book-mash` judges · `99_Meta/scripts/build_judge_scores.py` |
| P2 | **Usefulness re-score** — hybrid pass applied to all 10 chapters (decisions/tests/traps + takeaways, fidelity-bound). Confirm the lift with a MASH re-run (needs spend + the throttling fix); watch the genre ceiling on reflective chapters (ch02/ch10) | `book-mash` judges · `website/src/data/judge-scores.json` |
| P1 | **SEO routing — post-deploy verification** — code merged + deployed; remaining: Lighthouse ≥95 spot-check and Google Search Console sitemap submit | [`spec`](docs/superpowers/specs/2026-05-26-website-seo-routing-design.md) |

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
