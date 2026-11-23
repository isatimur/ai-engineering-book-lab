# Stage 9 — Implementation Readiness Report

* **Target:** `docs/superpowers/specs/2026-11-23-second-book-parity-design.md` (v0.1), DetailedRange lines 214–253
* **Reviewers:** `egm-implementation-readiness`, `egm-codebase-details` (implementation-readiness standard), `egm-style`
* **Date:** 2026-11-23

**Verdict: not ready (fails the Zero-Decision Rule).** The implementer would face open choices in every step. Deduplicated across the three reviewers: 8 Blockers, 12 Majors, 8 Nits.

## Blockers

| ID | Lines | Finding | Fix | Raised by |
|---|---|---|---|---|
| R-B1 | 242-244, 216 | The repo has no Playwright: no dependency, config, script or e2e folder. Vitest runs in the `node` environment, with no jsdom. | Either name the package, config, test path, `webServer` command and the `test:e2e` script, or switch to Vitest `renderToString` checks. | IR-B1, CD-B3 |
| R-B2 | 242-244 | The step 4 test clicks a figure, but no figure exists until step 5. The test has no expected results, and `<slug>` is a placeholder. | Move the figure click into the ch01 PR, or ship the spike as a fixture. Write out each expected result. | IR-B2, ST-B1 |
| R-B3 | 239 | `ChapterStage` maps `activeIndex` by position, and that index comes from the private `ChapterReaderItem` scroll listener in `FullBookReader`. It needs `data-figure-anchor` spans and the two-column sticky layout, and it hard-codes "AI Engineer Book". `InlineIllustration` is `lg:hidden`. | Either define a hook (`useActiveFigure`), the heading-based contract, the layout markup and the source of the eyebrow text, or show figures inline at every screen size (Stage 8, Z8-M1). | IR-B3, CD-B5 |
| R-B4 | 225-226 | `BookData` and `useBook()` are not defined. `Sidebar`, `MobileReaderBar`, `SourcesDrawer`, `ShareModal` and `lib/chapterLinks.ts` need more fields than the design lists. | Give the exact TypeScript type, the hook and file, and the fields each consumer reads. Say how Book 2 handles null fields. | IR-B4, CD-M2 |
| R-B5 | 227-229, 184 | Reading-progress keys are undefined. There are four keys, including `book:reader:text-only` in `lib/readerMode.ts`. `SettingsContext` is mounted at the root. Nothing on the Book 2 page saves progress. | List the exact key strings. Say which settings are per book. Name the save and restore call sites. Add tests. | IR-B5, CD-M4 |
| R-B6 | 232-235 | The sync input and output are undefined: the meta file, the manifest shape, the folder layout, the `prebuild` position (after `sync-second-book`), the CI skip, and how headings are normalised. | Give a schema, file paths, the exact `prebuild` string and the exit codes. | IR-B6, CD-M7 |
| R-B7 | 252-253 | Adding the two pages to `secondBookChapterStaticPaths` sends them to the chapter page, which renders a 404. | Register them as static routes in `routes.tsx`. They need no `getStaticPaths`. | CD-B1, IR-M1 |
| R-B8 | 253, 28, 87 | **Book 2 is in the sitemap today.** `gen-sitemap.mjs:19,54,103-106` adds it, and `sitemap-press.xml` has 9 Book 2 URLs. The pages still say `noindex`. "Not to the sitemap" therefore leaves a choice open. | Author decision: remove Book 2 from the sitemap and add a test, or accept that Book 2 is public. | CD-B2, IR-M2 (and D-B1) |

## Majors

| ID | Lines | Finding | Fix |
|---|---|---|---|
| R-M1 | 230-231 | `dirStyle: 'flat'` writes `/read` to `dist/read.html` and `/visual-guide` to `dist/visual-guide.html`, so neither is under `dist/read/**`. No hash normalisation is defined, and the check runs only in step 2. | Give the exact build, normalise, diff procedure. Run it on every PR that touches shared code. |
| R-M2 | 214-253 | There is no table of files to create, modify or delete. Roots are mixed. About 13 files that must change are not named. | Add the table, with paths from the repo root. |
| R-M3 | 227-229 | `evidenceGraph.ts` also uses Book 1 `chapters`, a singleton cache, and `claimsForChapter`/`anchorForNode` with no data argument. | Make each take `(evidence, chapters)`, cache per book, and keep wrappers for Book 1. |
| R-M4 | 236-244 | No step converts the components. The Book 2 behaviour of Sidebar (its `book-chapter-N` scroll targets), ShareModal (hard-coded title, no trigger on the chapter page) and MobileReaderBar (`/read/graph`, `/experience`) is undefined. | Specify each component's behaviour on Book 2 and the header triggers. |
| R-M5 | 237 vs 73 | Focus mode is in Goal 3 but missing from step 4. It is local state in `Reader.tsx`. | Extract it into a `useFocusMode` hook, or drop it from Goal 3. |
| R-M6 | 168-170, 235 | Evidence keys are not zero-padded (`"1"`). The manifest uses `"01"`. Claim ids repeat across chapters. There is no test file name. | Compare `evidence2[String(parseInt(ch))]` against the claim. Name the test file and its cases. Require a non-empty manifest after step 5. |
| R-M7 | 239, 160-161 | `InlineDiagram` and `OpenerDiagram` have no `sectionHeading` or `claimIds` fields. | Define Book 2 types, or optional fields. |
| R-M8 | 227-235 | No unit tests exist for the converted libraries: per-book cache isolation, prefixed keys, a missing heading. | List each test file and case. |
| R-M9 | 245-248 | Generator naming: Book 1 uses `_gen_chNN_gap_diagrams.py`. Output paths are not given. STYLE.md §4 needs the Part I `flow-pipeline` skeleton and a Part II skeleton that doesn't exist yet. `/review-diagrams` does not exist. "Read every PNG" can't be checked. | Write a checklist per figure: palette hexes from §1, the signature mark from §2 (`#0e7490`/`#be185d`), title colour `#155e75`, no leftover `chapter-card` sample text, citations, claim match and author sign-off. Commit the PNGs and the manifest, because CI skips the sync. |
| R-M10 | 249-253 | Step 6 pages: `VisualGuide.tsx` and `EvidenceGraphPage.tsx` import Book 1 data, `stats.json`, `RedThreadNav` and `ChapterContextBanner`. Their content, `noindex` mechanism and tests are undefined. Step 4's graph link points to a page that step 6 creates later. | Specify both pages, or move them to the follow-up doc (Stage 8). |
| R-M11 | 216, 245 | "Each step is one PR" contradicts step 5's 8 PRs. There is no pass condition, and the dev-server visual check is missing. | Reword. Each PR must pass lint, test, build and a manual `npm run dev` check. |
| R-M12 | 223 | The doc doesn't say how the author's approval is recorded. Step 1 depends on open decision 2. | Record approval as PR approval or a `reviewed` field. Settle decision 2 inside step 1. |

## Nits

- Add a `git status` collision check before steps 2 and 4, as the program file requires, or say that it no longer applies.
- Make `FIGURES.md` machine-readable, or replace it (Stage 8 Z8-M4).
- Allowed diagram-type values: `opener | loop | pipeline | comparison | layer`.
- Line 239 vs 174: say which file places figures, `SecondBookArticle` or the page.
- Name the render tool and its output path.
- "A provider for Book 2" is vague. List its values.
- `secondBookChapterStaticPaths` would hold pages that are not chapters. See R-B7.
- Per-PR exit checks for step 5: the sync passes, the sourcing test passes, and a visual check.

## Verified as stated

- **Commands:** `npm run lint`, `test` and `build` exist, and `prebuild` runs automatically.
- **Files:** `src/context/` exists, and so do all the named lib modules and components.
- **Content:** 46 `##` sections.
- **Diagrams:** `diagrams-2/STYLE.md`, `templates/chapter-card.excalidraw` and the spike exist.
- **Props:** `EvidenceRail` accepts `evidenceData`.
- **Render tool:** `npx @excalidraw-skill-pack/render` exists.

**Reviewer key:**
- IR = `egm-implementation-readiness`
- CD = `egm-codebase-details`
- ST = `egm-style`
