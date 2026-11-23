# Consolidated EGM Review — Second Book Parity Design

* **Target:** `docs/superpowers/specs/2026-11-23-second-book-parity-design.md` (v0.1)
* **Mode:** uninterrupted, all five stages
* **Stage reports (same folder):**
  * `zoom_out_report.md` (5)
  * `comprehension_report.md` (6)
  * `critic_report.md` (7)
  * `intermediate_zoom_out_report.md` (8)
  * `implementation_readiness_report.md` (9)
* **Reviewers:** 11 Goldfish runs across 9 lenses
* **Date:** 2026-11-23

## Bottom line

The direction holds. Every reviewer accepts these choices:

- reuse Book 1's components rather than copy them
- keep Book 2's own diagram style
- tie every infographic to a `claims-2` claim

The doc as written is not buildable. It bundles two pieces of work with very different risk:

1. **Infographics.** Low risk. Book 2's page can show figures through props on existing components. The only Book 1 file it touches is `InlineIllustration`, through one new prop whose default keeps today's behaviour.
2. **Reader parity.** A refactor across about 34 Book 1-coupled files. It needs a typed book-data seam, per-book caches, route builders, separate storage keys, bundle splitting and a Book 1 regression diff. Nearly every Blocker and Major sits here.

**Recommendation (Stage 8):**

- **Split the doc.** Doc 1 covers the infographics and ships now, one chapter per PR, starting with ch01 as a pilot.
- **Write Doc 2 later.** Doc 2 covers reader parity, and it waits until the author says who the draft is for.

## Action items

### 🔴 Blockers

| # | Action | Doc | Traces to |
|---|---|---|---|
| 1 | **Author decides Book 2's visibility.** It is in `sitemap-press.xml` today (9 URLs, `gen-sitemap.mjs:19,54,103-106`), and its pages say `noindex`. Choose (a) remove Book 2 from the sitemap and add a test, or (b) make it public and drop `noindex`. This fixes a live conflict either way. | both | D-B1, Z8-B2, R-B8 |
| 2 | **Split the doc** into Doc 1 (infographics) and Doc 2 (reader parity). | — | Z8-B1 |
| 3 | **Doc 1: show figures through props.** Add a `figures` prop to `SecondBookArticle`, matched by heading through `stripWikilinks` normalisation. Add an `alwaysVisible` prop to `InlineIllustration`. Show the opener the way `EvidenceExhibit` does. Add a `LightboxProvider` wrapper. No context and no `ChapterStage`. | 1 | Z8-M1, Z-M2, R-B3 |
| 4 | **Doc 1: one machine-readable figure spec.** It lives in `diagrams-2/`, with fields `chapter`, `kind`, `sectionHeading`, `claimIds`, `sources` and `reviewed`. The generators and the sync both read it. | 1 | Z8-M4, Z-M7, C2, D-M6, R-B6 |
| 5 | **Doc 1: a Vitest test against the committed files.** It checks four things: each claim id exists; each claim id appears under the figure's chapter (`String(parseInt(ch))` key); each heading resolves; and every `img src` on a rendered Book 2 chapter starts with `/diagrams-2/`. No Playwright. | 1 | D-M5, R-M6, Z-M6, R-B1, I-M1c, S-M6 |
| 6 | **Doc 1: reorder as a vertical slice.** PR 1 builds the schema, the sync, the tests and ch01's figures, starting from the spike. PRs 2–8 add one chapter each. Openers always ship. This settles open decision 2. | 1 | Z8-M3, R-B2, Z-M3 |

### 🟡 Majors

| # | Action | Doc | Traces to |
|---|---|---|---|
| 7 | Add a book parameter to `sync-diagrams.mjs`; don't write a third copy. Run it after `sync-second-book` in `prebuild`. Commit the PNGs and the manifest, because CI skips the sync. | 1 | Z8-M5, Z-N1, R-M9 |
| 8 | Hand-write `_gen_ch01…py` first. Map Part I figures to `flow-pipeline`, and openers to `chapter-card` with the sample text replaced. Build the Part II motif in the ch04 PR. Defer the parameterised generators. | 1 | Z8-M6, I-M4, S-M9, R-M9 |
| 9 | Use a checklist per figure in place of "read every PNG" and `/review-diagrams`. It covers the STYLE.md §1–3 hexes, the signature mark, the title colour, no leftover sample text, citations, each labelled element matched to a claim, and author sign-off (`reviewed: true`). | 1 | R-M9, ST-M8/M9, I-M3 |
| 10 | Fix the factual errors. Say "no production diagrams". Manifest keys are zero-padded. 8 chapters is current. The coupled-file count is about 34–39. Generators are emitted by Python, not hand-built. Define "sources" in place of "talks". | 1 | Y-M1, C1, C3, Y-M3, nits |
| 11 | Doc 2: a strict context with no default, an explicit Book 1 provider, and per-book data imports, so bundles stay separate. | 2 | D-M1, I-M1, D-M8 |
| 12 | Doc 2: give each `lib/` function `(evidence, chapters)` arguments with a per-book cache. Add route builders, where `experience` may be null. Give the exact `BookData` type. | 2 | D-M2/M3/M4, I-M2, R-B4, R-M3 |
| 13 | Doc 2: define parity as `/read/:slug`. Move Sidebar, ShareModal, progress and focus mode to the full-book reader pass, with exact key strings if they are kept. | 2 | Z-M1, R-B5, R-M4, R-M5 |
| 14 | Doc 2: Book 1 regression diff. Build the base and the branch, normalise hashes, then diff `read.html`, `read/*.html` and `visual-guide*`, on every PR that touches shared code. | 2 | D-B2, I-M6, R-M1 |
| 15 | Doc 2: register the Visual Guide and graph pages as static routes, or defer them. | 2 | R-B7, Z-M8, S-M2/M3 |

### 🟢 Nits

- Add a Preconditions line (the `git status` collision check).
- Note the departure from wiring-doc decision 3.
- Add risk entries for draft exposure and for heading drift.
- Give the approaches the same shape.
- State the problem explicitly.
- Use paths from the repo root.
- Gloss the internal terms.
- Fix vague phrasing ("far more", "cleanest", "over time").

## Traceability

Every raw finding ID (Z-, I-, C, D-, S-, Y-, Z8-, R-) maps to the stage reports. Findings that are not listed above are either covered by the split (Doc 2 inherits them) or are style nits folded into item 10 and the 🟢 list.

## Open decisions for the author (unchanged in substance)

1. **Book 2's visibility** (action item 1). This one now blocks.
2. **Who the draft is for.** This gates Doc 2 only.
3. **Glossary for Book 2.** This can wait for Doc 2.
