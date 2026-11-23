# Second Book: "How It Works" Infographics

* **Author:** isatimur
* **Date:** 2026-11-23
* **Status:** v0.2. It applies the EGM review in `docs/egm-review/second-book-parity/`. Chapter 1 is built as the pilot.
* **Supersedes:** v0.1, which put infographics and reader parity in one doc. The review split them (`consolidated_review_report.md`, item 2).

## Problem

Book 2, *The Model Layer & The Long Tail*, explains how model-layer systems work: RL training loops, inference serving, speech pipelines and robot control stacks. Its pages at `/second-book/:slug` show only text and the evidence rail. A reader cannot see any of these mechanisms. Book 1 has an opener figure for each chapter and inline figures. Book 2 has none.

## Goals

1. Each Book 2 chapter gets one **opener**: the chapter's argument in one picture.
2. Sections that explain a mechanism get a **"how it works" figure**. The approved figure spec decides which sections count. The prose does not.
3. Every figure is **sourced**:
   - Its spec entry lists the `claims-2` claim ids it draws on, and the talks (anchor labels) it cites.
   - A test checks that each claim is filed under the figure's chapter in `website/src/evidence-2.json`.
   - The test also checks that each cited talk anchors one of those claims.
4. Figures follow `diagrams-2/STYLE.md`: palette, signature mark and title system.
5. Readers can click any figure to zoom.

## Non-goals

These moved to a later design, "Doc 2: book context seam and reader parity":
- the sidebar, share dialog, saved progress and focus mode
- a Visual Guide gallery and a graph page for Book 2
- any change to how Book 1's components load data

Doc 2 waits until the author says who the draft is for.

Also out of scope: the audiobook, videos and judge scores, and any change to Book 3.

## Anti-goals

- A figure that shows something its claims do not support.
- Book 1 figures leaking onto a Book 2 page. Both books number chapters `"01"`…, so a shared lookup keyed by chapter number would do this.
- Any visible change to Book 1.

## Precondition (author decision, still open)

Book 2's visibility is inconsistent today:
- `website/scripts/gen-sitemap.mjs` puts `/second-book` and every chapter page in `sitemap-press.xml` (9 URLs).
- The pages themselves say `noindex`.

This doc adds no routes, so it neither fixes nor worsens that. The author still has to choose:
- **(a)** take Book 2 out of the sitemap, or
- **(b)** make Book 2 public and drop `noindex`.

Doc 2 inherits whichever choice is made.

## Approaches

- **A. Shared book-data context** (v0.1's choice). Rejected for this pass. It needs a refactor across about 34 Book 1-coupled files, and almost every review finding sat there. Doc 2 takes it up.
- **B. Props on Book 2's own page (chosen).**
  - `SecondBookArticle` and `SecondBookChapterDetail` are Book 2-only (Book 3 also uses the article, with no figures).
  - Figures are passed in as props, the same pattern as `EvidenceRail`'s `evidenceData`.
  - The only Book 1 file touched is `InlineIllustration`, which gets a new `alwaysVisible` prop. Its default keeps Book 1's markup byte-for-byte.
- **C. A copy of Book 1's figure components for Book 2.** Rejected: no copy is needed when one prop does the job.

## Design

All paths are relative to the repo root.

### Figure spec: one source of truth

`diagrams-2/figures.json` lists every figure. Each entry has these fields:

| Field | Meaning |
|---|---|
| `id` | Unique, e.g. `ch01-rl-production-loop` |
| `chapter` | `"01"`…`"08"`, the same as `chaptersTwo[].number` |
| `kind` | `opener` (one per chapter at most) or `inline` |
| `title` | Caption and alt text |
| `sectionHeading` | Inline only: the `##` heading text the figure follows, after `normaliseHeading()` |
| `file` | The PNG path under `diagrams-2/` |
| `claimIds` | `claims#N` ids. Each must be filed under this chapter in `evidence-2.json`, whose keys are `"1"`…`"8"` |
| `sources` | Talk anchor labels, e.g. `#674 — Alessandro Cappelli, Adaptive ML`. Each must anchor one of `claimIds` |
| `reviewed` | Set to `true` when the author signs off on the figure |

### Drawing

- **Source and output:** each figure's source is a hand-edited Excalidraw skeleton, `diagrams-2/chNN/<id>.excalidraw`. The PNG is rendered from it with `npx @excalidraw-skill-pack/render <file>`.
- **PNG size:** each PNG is resized to 2000 px wide and quantised to 128 colours, which gives about 80–110 KB. That matches Book 1's figure sizes.
- **Every figure:**
  - follows STYLE.md §1–3: brick for warning, teal for the engineered state, rose for claims, dark teal for evidence cards, the teal and rose signature rule, and a `#155e75` title
  - carries a sources line drawn from its `sources` field
  - uses no leftover Book 1 sample text from `chapter-card`
- **Part I motif:** Part I figures favour the pipeline or loop motif.
- **Part II motif:** the "generic pattern meets domain constraint" motif is designed in the first Part II chapter PR (ch04), as STYLE.md §4 requires.

### Sync

`website/scripts/sync-second-book.mjs` already copies Book 2's chapters. It now also copies:
- `diagrams-2/figures.json` → `website/src/data/figures-2.json`
- each figure PNG → `website/public/diagrams-2/<file>`

It throws if a listed PNG is missing. Like the chapter sync, it skips when `diagrams-2/` is absent (CI and Vercel), so the copies are committed.

### Page

- **Lookups:** `website/src/data/figuresTwo.ts` provides `openerTwo(chapter)`, `inlineFiguresTwo(chapter)`, `figureTwoSrc(fig)` and `normaliseHeading()`, which strips wikilinks, `#` marks and extra spaces. `stripWikilinks` moved there from `SecondBookArticle`, so the renderer and the test normalise headings the same way.
- **Inline figures:** `SecondBookArticle` takes an optional `figures` prop. After each `##` block whose normalised text equals a figure's `sectionHeading`, it renders `<InlineIllustration alwaysVisible>` labelled `Figure <chapter>.<n>`. It uses a `Fragment`, so the article markup is unchanged when there are no figures (Book 3).
- **Opener and zoom:** `SecondBookChapterDetail` wraps the page in `LightboxProvider`, so a click opens the zoom view. It shows the opener above the article, the same way Book 1's `EvidenceExhibit` does.
- **No sticky stage:** Book 2 has no sticky figure stage, so its inline figures show at every width.

### Checks

`website/src/data/figuresTwo.test.tsx` runs in `npm run test`. It checks the following against the committed files:

1. There is at least one figure, and ids are unique.
2. `figures-2.json` equals `diagrams-2/figures.json` when the source is present.
3. Every PNG exists in `website/public/diagrams-2/`.
4. There is at most one opener per chapter, and openers have no `sectionHeading`.
5. Every inline `sectionHeading` is a normalised `##` heading of its chapter in `src/content-2/`.
6. Every claim id is filed under the figure's chapter.
7. Every source is an anchor label of one of those claims.
8. **Rendered page:** for every Book 2 chapter, `renderToString` of `SecondBookChapterDetail` produces exactly that chapter's figures, and every site-served `<img>` starts with `/diagrams-2/`. The only other images are YouTube thumbnails from the evidence rail. `<Seo>` is stubbed, because it needs the SSG Helmet provider.

A heading that is renamed in the content fails check 5, and the figure simply does not render until its spec is fixed.

## Risks

- **A figure that teaches something false.** Checks 6–7 hold each figure to its claims. The author's sign-off (`reviewed`) covers what a test cannot: whether every box and arrow is supported.
- **Drift between the content and the figures.** Check 5 catches a renamed heading.
- **Effort.** Building one chapter at a time keeps each PR reviewable. Chapter 1 measured the cost: 3 figures, each needing 1–2 rounds of rendering and checking.

## Implementation plan

Each PR must pass `npm run lint`, `npm run test` and `npm run build` in `website/`. Each PR also needs a visual check of the built page (`vite preview`) at 1440 px and 390 px wide, with every screenshot read.

1. **PR 1, ch01 (this PR):**
   - the spec format, the sync, `figuresTwo.ts` and the props on the page
   - the eight checks
   - three ch01 figures: the opener, the reasoning/agency loop and the RL production loop. All have `reviewed: false` until the author signs off.
2. **PRs 2–8, one chapter each:**
   - add that chapter's spec entries and figures
   - the author approves the list of sections that get a figure in that PR
   - every chapter ships its opener
   - ch04 also designs the Part II motif
