# Roadmap

Where The Lab is and where it's going. For live counts see [`STATS.md`](STATS.md);
for vocabulary see [`CONTEXT.md`](CONTEXT.md).

## Shipped

| When | What | Where |
|---|---|---|
| 2026-06-09 | **Usefulness floor — resolved (a + b + c).** The 40.1 floor was diagnosed as part genre-ceiling, part real filler; the data showed it's *mostly* genre-ceiling. **(a)** Added a *substantive-paragraph* usefulness rollup to `build_judge_scores.py` — drops headings mis-scored as prose + short connective bridges the judge's own rationale names as transitions (conservative: **73/354 = 21%** of paragraphs, below the hypothesized ⅓). Book usefulness **40.1 (all prose) → 46.0 (substantive core)**; purely additive to `judge-scores.json` (every prior number byte-identical, `--version-id` preserves the `d6a6b2d` snapshot). **(b)** 6 fidelity-bound manuscript edits — 3 cuts of empty forward-reference/meta one-liners + 3 tightens — across ch01/02/03/05; load-bearing pivots and the book thesis preserved (reflected in the *next* MASH run). **(c)** `/quality` shows both numbers with a genre-ceiling note. +1 regression test (32 green) | `99_Meta/scripts/build_judge_scores.py` · `website/src/pages/Quality.tsx` · `website/src/lib/judgeScores.ts` · `public/drafting/*.md` + `website/src/content/*.md` |
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
| 2026-06-05 | **Machine/LLM accessibility** — [llms.txt](https://llmstxt.org/) standard: `/llms.txt` (curated map), `/llms-full.txt` (whole book as markdown), and per-chapter `/read/NN-slug.md`. Generated by `gen-llms.mjs` in `prebuild`; "For AI agents" footer block (book design style) + `robots.txt` discovery pointer | `website/scripts/gen-llms.mjs` · `website/public/llms*.txt` · `website/src/pages/Catalogue.tsx` |
| 2026-06-05 | **JSON-LD structured data** — schema.org `Book` (w/ 10-chapter `hasPart`) on the landing page; `Chapter` + `BreadcrumbList` on each `/read/:slug` page. Pure builders in `structuredData.ts`, `<JsonLd>` head component, book metadata centralized in `data/book.ts`; 6 unit tests; validated in all 12 prerendered pages | `website/src/lib/structuredData.ts` · `website/src/components/JsonLd.tsx` · `website/src/data/book.ts` |
| 2026-06-04 | **Ledger #40–42 redundancy resolved** — claim 42 (framing/review as scarce skills) reused all 3 anchors verbatim from #40/#41; added a distinct lead source (Sean Grove, "The New Code", OpenAI — "the new scarce skill is writing specifications") + upgraded moderate → strong. Ledger now **151 anchors** | `claims/Claims Ledger.md` · `website/src/evidence.json` |
| 2026-06-02 | **SEO routing refactor (merged)** — wouter → react-router-dom + vite-react-ssg; 36 pages prerendered to static HTML with per-page `<Head>` meta + canonical; new `/read/:slug`, `/visual-guide/concepts/:slug`, `/visual-guide/maps/:slug` routes; 34-URL sitemap + robots.txt; Vercel `cleanUrls` + repo-root build fix | `website/` · PR #1 |
| 2026-06-05 | **3rd MASH run on Sonnet** ($3.43, run `4d43`) — first run with **usefulness at full coverage (354/354)**; `history[]` now 3 runs. Finding: usefulness is the book's floor (**40.1**) and the 2026-06-03 hybrid pass did **not** lift it — see In-flight P2 for the genre-ceiling diagnosis | `website/src/data/judge-scores.json` |

## In flight

| Priority | What | Tracking |
|---|---|---|
| P1 | **Full-coverage MASH run — fix shipped, re-run gated.** Root cause (3 partial runs) was that judges turned transient 429/529s into permanent coverage gaps, and the two biggest-prompt judges (humanness bundles surrounding paragraphs, claim_defensibility bundles the ledger) blew the tokens-per-minute budget first. **Fixed** in book-mash `03806a3`: `judges/_retry.py` retries throttling with Retry-After-aware backoff + jitter, wired into all six judges (10 new tests; suite green). Remaining: a clean re-run to confirm full coverage — **gated on spend (~$3–4) + a fresh API key** | book-mash `judges/_retry.py` · `99_Meta/scripts/build_judge_scores.py` |
| P1 | **SEO routing — post-deploy verification** — code merged + deployed; remaining: Lighthouse ≥95 spot-check and Google Search Console sitemap submit | [`spec`](docs/superpowers/specs/2026-05-26-website-seo-routing-design.md) |

## Queued (validated, not started)

- **Per-chapter Open Graph image generation** — branded social cards with chapter title overlay
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
