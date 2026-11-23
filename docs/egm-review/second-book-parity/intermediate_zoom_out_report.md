# Stage 8 — Intermediate Zoom Out Report

* **Target:** `docs/superpowers/specs/2026-11-23-second-book-parity-design.md` (v0.1, lines 1–253)
* **Reviewer:** `egm-zoom-out`, with the Stage 5–7 reports as input
* **Date:** 2026-11-23

**Verdict: restructure before revising.** Stages 5–7 propose about 40 additions. Most of them fix one half of the doc: the reader-parity work built on `BookContext`. Putting all of them into this doc would turn it into a refactoring programme. That would delay the infographics, which the doc ranks first (line 26) and which need almost none of that work.

## Blockers

| ID | Lines | Finding | Suggestion |
|---|---|---|---|
| Z8-B1 | whole doc | The two deliverables carry different risks. The infographics are a content pipeline plus one small change to a Book 2-only page. Reader parity is a refactor across about 34 Book 1-coupled files. Every hidden-coupling finding so far sits in that second half: Z-M1/M2/M5, I-M1/M2, D-M1–M4/M7/M8 and C5. | **Split the doc.** **Doc 1 — Book 2 infographics:** Goals 1–2. Ship it now. **Doc 2 — Book context seam and reader parity:** Goals 3–5, Approaches A/B/C, the graph design, and all the context and leak-check mitigations. Write Doc 2 after Doc 1 ships and the author answers open decision 1. |
| Z8-B2 | 28-29, 87-88 | The conflict between the sitemap and `noindex` (D-B1) is verified: `gen-sitemap.mjs` lines 52, 103 and 105. | Add a precondition: the author chooses between (a) removing Book 2 from the sitemap and (b) treating Book 2 as public. Doc 1 adds no routes, so it only records the choice. Doc 2 inherits it. |

## Majors (for Doc 1)

| ID | Finding | Suggestion |
|---|---|---|
| Z8-M1 | The figures can be shown through props alone, with no context, no `ChapterStage` and no changes to the `lib/` functions. `SecondBookArticle` already splits the chapter into blocks, and its `stripWikilinks` helper is the heading normalisation D-M6 asks for. `InlineIllustration` imports only a type from `lib/manifest`, so it pulls in no Book 1 data. | Add a `figures` prop to `SecondBookArticle`. Add an `alwaysVisible` prop to `InlineIllustration`; its default keeps today's `lg:hidden`. Show the opener the way `EvidenceExhibit` does. Wrap the page in `LightboxProvider`. This leaves D-M1/M2/M3/M7/M8, I-M1/M2, S-M5, C4, C5 and I-N1 with nothing to fix in this pass. |
| Z8-M2 | Under Z8-M1, the only Book 1 file touched is `InlineIllustration`, through a prop whose default keeps today's behaviour. | Drop Playwright and the Book 1 diff baseline from Doc 1. Use one Vitest `renderToString` test that checks every `img src` on a Book 2 chapter starts with `/diagrams-2/`, plus the manual `npm run dev` check. Move Goal 6 to Doc 2. |
| Z8-M3 | Step 1 asks for a full figure list before any figure exists, and it waits on open decision 2. | Build it as a vertical slice. PR 1: the spec schema, ch01's entries, the sync, the checks and ch01's figures. PRs 2–8: one chapter each, entries approved per PR. Openers always ship. This settles open decision 2. |
| Z8-M4 | `FIGURES.md` and the manifest would be two sources of truth (Z-M7, C2, D-M6, I-M3, S-M4, C3, Y-M9). | Keep one machine-readable spec in `diagrams-2/`. Each entry has `chapter`, `kind` (opener or inline), `sectionHeading` (inline only), `claimIds`, `sources` and `reviewed`. A Vitest test checks the committed files: each claim id exists, each claim id appears under the figure's chapter key, and each heading resolves. At runtime, a figure whose heading no longer matches renders nothing. Defer the generated citation footers (I-M3) and the HTML-comment anchors (I-M5). |
| Z8-M5 | A `sync-diagrams-2.mjs` script would be the third copy of the same helpers (Z-N1). | Add a book parameter to `sync-diagrams.mjs`, or extract its helpers into a shared module. Run it after `sync-second-book`. |
| Z8-M6 | Writing four parameterised generators before the first real figure is speculative (I-M4), and STYLE.md §4 says not to invent the Part II motif yet. | Hand-write `_gen_ch01.py`. Extract helpers when ch02 repeats code. Map Part I figures to `flow-pipeline.excalidraw` and openers to `chapter-card`. Grep for leftover Book 1 sample text. The generator is the source, and the PNG is derived from it. |

## Nits

- **Line 95:** drop the "Book 3 adopts later" requirement from Doc 1.
- **Lines 77-80, 249-253:** move the Visual Guide and graph pages to Doc 2 or a follow-up.
- **Lines 6, 47:** say "no production diagrams".
- **Line 56:** the manifest keys are zero-padded.
- **Line 33:** say that 8 chapters is current.
- **Lines 202-204:** the effort risk is mitigated by the vertical-slice pilot.

## What stays in Doc 1 from the earlier stages

D-B1 (as a precondition), C1/Y-M3, C3/S-M4/Y-M9, D-M5, D-M6, S-M9, Y-M1, Y-M4, C10 and C17. Everything else moves to Doc 2.
