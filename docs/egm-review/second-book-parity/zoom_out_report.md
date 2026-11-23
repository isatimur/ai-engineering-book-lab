# Stage 5 — Initial Zoom Out Report

* **Target:** `docs/superpowers/specs/2026-11-23-second-book-parity-design.md` (v0.1, lines 1–253)
* **Reviewers:** `egm-zoom-out` (zoom-out standard) and `egm-inventive-catalyst`
* **GoldfishContext:** `programs/second_book_website_wiring.md`, `diagrams-2/STYLE.md`
* **Date:** 2026-11-23

**Verdict: needs revision.** The root problem is right: Book 1 data is imported at module scope. Choosing Approach B over A and C is sound, and the no-indexing rule fits the program file. The main problems are:

- The doc mixes Book 1's two reader pages, so the scope is too large.
- The proposed tests cannot catch the worst leak, which is Book 1 figures shown on a Book 2 page.

## Zoom-out findings (`egm-zoom-out`)

| ID | Sev | Lines | Finding | Suggestion |
|---|---|---|---|---|
| Z-M1 | Major | 17-18, 72-76, 172-184, 236-241 | Book 1 has two reader pages. The chapter page `/read/:slug` has the opener, inline figures, focus text, `MobileReaderBar` and `SourcesDrawer`. The full-book page `/read` has `ChapterStage`, `Sidebar`, `ShareModal` and scroll progress. The doc puts both pages' features on the Book 2 chapter page, so it adds features rather than reaching parity. `ShareModal` hardcodes Book 1's title. The reading-progress keys are shared with `SettingsContext`, `RedThreadNav` and `ChapterContextBanner`. | Define parity as `/read/:slug`. Defer Sidebar, ShareModal and progress to a later full-book-reader pass. |
| Z-M2 | Major | 66-67, 176-177, 239 | `ChapterStage` only renders. The scroll observer lives in `FullBookReader`'s `ChapterReaderItem` and needs `data-figure-anchor` markers and the two-column layout. `InlineIllustration` is `lg:hidden`. | Simplest fix: render Book 2 figures inline at every screen size (add a prop), and show the opener the way `EvidenceExhibit` does. Defer the sticky panel. |
| Z-M3 | Major | 26 vs 219-248 | The plan builds the seam and the reader features before any figure, but the doc says infographics come first. | Order the steps as figure list → manifest → figures through props → reader features. |
| Z-M4 | Major | 115-128, 224-231 | The codebase already solves this kind of problem with a prop (`EvidenceRail.evidenceData`). Once scope is cut, most consumers can take props. | Default to props. Use a context only where props would pass through more than two levels, and list the context's consumers. |
| Z-M5 | Major | 197-201, 227-229 | Hidden coupling is not listed. `SourcesDrawer` → `claimsForChapter` imports Book 1 evidence. `EvidenceGraphView` uses the cached `getEvidenceGraph()` singleton and `lib/chapterLinks`. `MobileReaderBar` links to Book 1's `graphUrl` and to "View in 3D". | List these modules. Also check that no `/read/` or Book 1 graph links appear on Book 2 pages. |
| Z-M6 | Major | 199-201, 242-244 | The repo has no Playwright. Vitest runs with the `node` environment. | Use Vitest with `renderToString` inside a `MemoryRouter` and assert on the HTML. Keep the manual `npm run dev` check. |
| Z-M7 | Major | 155-170, 219-235 | `FIGURES.md` and the manifest would be two sources of truth for the same data. The sync check is skipped in CI because the sync scripts skip when the source folder is missing. | Make one `diagram-meta-2.json` the single input. Move the heading and claim checks into a Vitest test that runs against the committed files. |
| Z-M8 | Major | 77-80, 249-253 | The Visual Guide gallery and the graph page are likely unneeded for a draft shared by link. `SourcesDrawer` already shows each chapter's graph. | Move them to non-goals or a follow-up. |
| Z-N1 | Nit | 157-159 | The new sync script would be the third copy of `findRoot`/`differs`/`copyIfDifferent`. | Add parameters to `sync-diagrams.mjs`, or extract the shared helpers. |
| Z-N2 | Nit | 163-167 | Two figure-placement methods would exist: Book 1 by position, Book 2 by heading. | Say whether Book 1 should adopt heading placement later. |
| Z-N3 | Nit | 161 | `sectionHeading` makes no sense for openers. | Split the schema into `openers` and `inline`. |
| Z-N4 | Nit | 82-83, 230-231 | The diff check covers only `dist/read/**`, and no diff tool exists. | Add `dist/visual-guide/**`, and mark the check as manual. |
| Z-N5 | Nit | 252-253 | Static routes don't belong in `secondBookChapterStaticPaths`. | Register them in `routes.tsx`. |
| Z-N6 | Nit | 52 | The doc says 33 files. The grep finds 34, including tests and `routes.tsx`. | Say "about 30", or list the files converted in this pass. |
| Z-N7 | Nit | 210-223 | Open decision 2 blocks step 1. | Say so in the plan. |

## Inventive-catalyst findings (`egm-inventive-catalyst`)

| ID | Sev | Lines | False compromise | Transform |
|---|---|---|---|---|
| I-M1 | Major | 49-60, 115-128, 197-201, 242-244 | With Book 1 as the default context, a component missing its provider quietly shows Book 1 data. The title-text test cannot see leaked figures, because figures contain no chapter titles. | (a) Fail loudly when no provider is present. (b) Add an ESLint `no-restricted-imports` rule with an allowlist. (c) Assert that every figure `src` on a Book 2 page starts with `/diagrams-2/`. |
| I-M2 | Major | 186-190, 227-229 | `evidenceGraph.ts` also imports Book 1's `chapters`, for `chapterTitle()` and its main loop. Passing only the evidence index gives Book 2 the Book 1 chapter nodes. | Pass the whole data slice (`chapters` plus `evidence`), not one field. Do the same for manifest and progress. |
| I-M3 | Major | 69-71, 100-101, 168-170, 194-196 | The test checks only that claim ids exist. The citation text drawn in the PNG and the `claimIds` list can drift apart. | Generate the citation footer from `claimIds` via `evidence-2.json`. In the figure spec, map each labelled box or arrow to a claim id. |
| I-M4 | Major | 140-148, 202-204 | Writing 33 hand-built generators is treated as unavoidable, yet the doc already names four figure shapes. | Write four parameterised generators (loop, pipeline, comparison, layer) driven by data, and keep a hand-built option. Part II figures stay hand-built for now (STYLE.md §4). |
| I-M5 | Major | 162-167, 232-235 | Exact heading-text matching breaks the build on every heading rewording while the draft is still being edited. | Anchor each figure to a stable marker (`<!-- fig: id -->`) or a heading slug. Order the sync after `sync-second-book.mjs`. |
| I-M6 | Major | 81-83, 230-231 | The Book 1 diff runs once, in step 2. The real risk is in steps 4 and 6, when shared components change. | Commit a normalised baseline of Book 1's HTML and diff it on every PR. |
| I-N1 | Nit | 181-184 | The doc doesn't say which of the three `readingProgress` keys become per-book. | Name the per-book keys and the shared ones. |
| I-N2 | Nit | 164-166, 174-177 | One component would have two placement code paths. | Turn both kinds of entry into one "resolved placement" shape. |
| I-N3 | Nit | 210-211 | Open decision 2 can be settled by the design itself. | Every chapter PR ships its opener. "How it works" figures follow as the spec approves them. |

## Where the two reviewers agree

1. **Leak detection is too weak** (Z-M5, I-M1, I-M2). Both name modules the doc misses, and both reject the title-text test.
2. **The figure metadata needs one source of truth** (Z-M7, I-M3). Both want one machine-readable spec, with a test against the committed files.
3. **Placement by exact heading** (Z-N2, I-M5, I-N2). Use a stable anchor instead.
4. **They disagree on the context seam.** Z-M4 wants props first. I-M1 wants a strict context with no default. Resolution: use props for this pass's small set of consumers, and require a strict, no-default context wherever one is introduced.
