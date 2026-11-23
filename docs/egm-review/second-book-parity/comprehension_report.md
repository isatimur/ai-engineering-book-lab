# Stage 6 — Comprehension Test Report

* **Target:** `docs/superpowers/specs/2026-11-23-second-book-parity-design.md` (v0.1)
* **Ranges:** FeatureRange 1–213, DetailedRange 214–253
* **Reviewer:** `egm-comprehension`. It read the document alone, with no other context and no document standard.
* **Date:** 2026-11-23

## What this proposes

Book 2 is a draft at `/second-book`. Its chapter pages currently show only text, an evidence rail and prev/next links. The proposal brings over the Book 1 reader features that matter for a draft shared by link:

- text-only and focus mode
- the mobile reader bar
- the sidebar table of contents
- the sources drawer
- saved progress, kept per book
- the share dialog

It also adds about 33 Excalidraw infographics: 8 chapter openers and about 25 "how it works" figures. Each figure sits under a `##` heading that matches its text exactly, and each must cite claim ids from `claims-2`. A test checks those ids against `evidence-2.json`.

It also adds a Book 2 Visual Guide page and a Book 2 evidence graph page, both `noindex`.

Today the shared components import Book 1 data directly. To avoid copying them per book, a `BookContext` React context supplies the active book's chapters, manifest, evidence, storage prefix and title. Book 1's output must stay byte-identical, apart from hashed asset names.

## How the existing system works, per this document

**Book 1:**
- Book 1 lives at `/read` and has figures, reading modes, drawers and an evidence graph.
- Its components (33 files) import `data/bookChapters` or `lib/manifest` at module scope, so they always render Book 1 data.
- Both books key their chapters "1".."N", so a Book 2 page would silently show Book 1 figures.
- Book 1 figures are generated per chapter: Python writes Excalidraw files, which are rendered to PNG. `sync-diagrams.mjs` copies them and writes `diagram-manifest.json`.
- Book 1 places figures by position.

**Book 2 today:**
- 8 Markdown chapters and a `chaptersTwo` data file.
- `evidence-2.json`, built from 43 claims by a Python script.
- Trimmed copies of the Book 1 pages. Book 3 has another near-identical copy.
- `diagrams-2/STYLE.md` sets the palette, but no Book 2 diagrams exist yet.

## Findings

| # | Sev | Lines | Finding | Suggestion |
|---|---|---|---|---|
| C1 | Major | 141-143 | The doc says "Hand-built Excalidraw files" and also "one Python generator per chapter". It does not say which one is authoritative. | Say which file is edited and which is derived. |
| C2 | Major | 155-167, 219-235 | A PNG-copying script cannot produce `title`, `sectionHeading` or `claimIds`. The relationship between `FIGURES.md` and the manifest is undefined. "Fails the sync script" is circular if that script writes the manifest. | Spell out the flow: input file → sync → manifest. |
| C3 | Major | 70 vs 160-161 | "Cites the talks" is never defined, and the schema has no field for talk citations. | Define "talks" and say where the citation lives. |
| C4 | Major | 162-166, 174-177 | Shared components would need two placement models, and the doc does not say how one component supports both. Without that, Goal 6 is unclear. | Name the mechanism. |
| C5 | Major | 224-244 | No step converts `Sidebar`, `SourcesDrawer`, `ShareModal`, `ChapterStage` or `InlineIllustration` to read the context. As written, step 4 reproduces the original problem. "About ten" components are never listed. | Add the conversion step and list the components it converts. |
| C6 | Major | 249-253 | The doc does not say whether the Visual Guide and graph pages reuse Book 1's pages or are new copies. New copies would hit the "fourth copy" anti-goal. | State which. |
| C7 | Major | 82 vs 230-231 | The diff covers only `dist/read/**`, and the doc does not say how hashed asset names are ignored. | Add `/visual-guide`, and describe the normalisation. |
| C8 | Major | 199-200 vs 242-244 | The check is scoped "outside the evidence rail" in one place and "the sidebar" in the other. The exception for the evidence rail is not explained. | Make the two match, and explain the exception. |
| C9 | Nit | 26 vs 236-248 | "Infographics come before" could mean priority or delivery order. The plan delivers reader features first. | Clarify. |
| C10 | Nit | 170 | The doc never shows that claims carry a chapter field, or what a claim id looks like. | Define both. |
| C11 | Nit | 11, 39 | "Evidence rail" is not described. | Add one line on what it shows. |
| C12 | Nit | 117 | "Path builders" is undefined. | Say what they build. |
| C13 | Nit | 181-184 | Book 1's current progress keys and their prefix are not stated. | State them. |
| C14 | Nit | 174 | `SecondBookArticle` is missing from Current state. | Add it. |
| C15 | Nit | 248 | `/review-diagrams` and the "manual check" are undefined. | Describe them. |
| C16 | Nit | 252 | `secondBookChapterStaticPaths` is undefined, and non-chapter pages don't belong in it. | Explain, or change. |
| C17 | Nit | throughout | Paths mix the repo root and `website/` as their root. | State the root once. |
| C18 | Nit | 5, 89-90 | "EGM review", "judge-panel run" and "Judge scorecard" are not glossed. | Add a short gloss. |
| C19 | Nit | 232-235, 245 | The sourcing test passes with nothing to check until step 5. | Say that this is intended. |
