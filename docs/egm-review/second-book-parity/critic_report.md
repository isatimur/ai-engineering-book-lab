# Stage 7 — Critic Review Report

* **Target:** `docs/superpowers/specs/2026-11-23-second-book-parity-design.md` (v0.1), FeatureRange lines 1–213
* **Reviewers:**
  * `egm-design` (feature-spec standard)
  * `egm-structural` (feature-spec standard)
  * `egm-style`
* **GoldfishContext:** `programs/second_book_website_wiring.md`, `diagrams-2/STYLE.md`
* **Date:** 2026-11-23

**Verdict: not ready.** The reviewers found 2 Blockers. I confirmed B1 myself.

## Blockers (`egm-design`)

| ID | Lines | Finding | Fix |
|---|---|---|---|
| D-B1 | 28, 87-88 | **Book 2 is not hidden today.** `website/scripts/gen-sitemap.mjs` adds `/second-book` and every chapter page to `sitemap-press.xml`. Its comment says this is deliberate ("every /second-book/* page was invisible to crawlers"). The current sitemap has 9 `second-book` URLs, and the pages still say `noindex`. The press site also links to Book 2 (`library.ts:95`, `ChapterWeb.tsx:24`). The spec's "no sitemap" premise is false, and the live site sends search engines mixed signals. Verified: `grep -c second-book public/sitemap-press.xml` returns 9. | The author decides. Either (a) remove Book 2 from the sitemap and revert that decision, or (b) drop `noindex` and treat Book 2 as public. Apply the same choice to any new Book 2 routes. |
| D-B2 | 81-83, 199-201 | **The two main safety checks don't exist.** There is no Playwright in `website/package.json`, and no prerender diff script. | Add both as work items, each with a defined way to run it: a build on `main` and on the branch, hash normalisation, and a diff of `dist/read/**` and `dist/visual-guide/**`. Or use Vitest `renderToString` instead of Playwright. Say whether each check runs in CI or by hand. |

## Majors

### Design (`egm-design`)

| ID | Lines | Finding | Fix |
|---|---|---|---|
| D-M1 | 123-127 | A context that defaults to Book 1 hides the exact leak this design exists to prevent. | No default. Throw when the context is used outside a provider. Wrap Book 1's routes in an explicit provider. |
| D-M2 | 115-128, 176-180 | A React context can't reach the plain module-level functions that carry the coupling: `lib/manifest.ts`, `lib/chapterLinks.ts` and `lib/evidenceGraph.ts` (`claimsForChapter`, `anchorForNode`, `chapterLabel`). | Give each function a `book` argument, or turn it into a hook. List every one of them. |
| D-M3 | 188-190 | `buildEvidenceGraph` also uses Book 1's `chapters`. `getEvidenceGraph` caches one graph in a single module variable. | Pass both the chapters and the evidence, and keep one cache per book. |
| D-M4 | 179-180 | The URLs `/read/graph`, `/experience` and `/read/:slug` are hard-coded. Book 2 is served on aiepress.com and Book 1 on its own domain, so a Book 1 link on a Book 2 page sends the reader to the other domain. Book 2 has no `/experience` page. | Put route builders in the book data. The `experience` builder can be null. Check that Book 2 pages contain no `/read` or `/experience` links. |
| D-M5 | 168-170 | `evidence-2.json` has 43 unique claims, filed under 64 chapter entries. The same claim appears under several chapters, so "the claim's chapter" has no single value. | Check that each `claimId` appears under the figure's chapter key. |
| D-M6 | 156-167 | No `diagram-meta-2.json` is defined. The sync script is skipped in CI. Heading comparison must deal with wikilinks, curly quotes and em dashes. | Add a single meta file and a Vitest check against the committed files. Define one normalisation and apply it to both sides. |
| D-M7 | 162-177 | `ChapterStage` assumes figures in order, with `activeIndex` and `FIG. N.index` labels. It hard-codes the eyebrow "AI Engineer Book". `InlineIllustration` is `lg:hidden`. | Define what `activeIndex` and `index` mean when figures are placed by heading, and read the book label from the book data. |
| D-M8 | 115-128 | A central context that imports every book's data makes Book 1 pages download Book 2 data. It also changes Book 1's chunks, which breaks Goal 6's byte-identical check. | Each book's provider imports only its own data. |

### Structure (`egm-structural`)

| ID | Lines | Finding | Fix |
|---|---|---|---|
| S-M1 | 192-204 | The standard requires security, scale and failure-mode risks. None are listed. | Add a "Draft exposure" risk (ties to D-B1) and a "Limits" risk (files left unconverted). |
| S-M2 | 77-78 | Goal 4 (Visual Guide) has no Design subsection. | Add one: which component, what data, and register the route before `:slug`. |
| S-M3 | 186-190 | Goal 5 has no design for the page, its route or `noindex`. | Specify all three. |
| S-M4 | 69, 160-170 | "Cites the talks" can't be traced or tested. | Add a sources field, or state that the citation lives in the PNG. |
| S-M5 | 163-177 | No design for how two placement models coexist. | Sketch it, e.g. `figuresForSection(chapter, heading, index)`. |
| S-M6 | 199-201 | The leak check can't see Book 1 figures. | Check that no image `src` contains `/diagrams/`. |
| S-M7 | 64-65, 153-155, 210-211 | The goals assume answers to open decisions 1 and 2. | Mark those goals as conditional. |
| S-M8 | 115-128 | The spec drops the program file's collision precondition, and it departs from decision 3 without saying so. | Add a Preconditions line, and give the reason for the departure. |
| S-M9 | 138-170 | It ignores STYLE.md §4–5: the Part I pipeline template, the missing Part II motif, and the Book 1 sample text in `chapter-card`. | Map each figure kind to a skeleton. Add a grep for leftover sample text. |

### Style (`egm-style`)

| ID | Lines | Finding | Fix |
|---|---|---|---|
| Y-M1 | 6, 47 | "No Book 2 diagrams exist" contradicts the spike. | Say "no production diagrams". |
| Y-M2 | 46, 144-148 | The template statement doesn't match STYLE.md (see S-M9). | Map each figure kind to a skeleton. |
| Y-M3 | 141-142 | "Hand-built" contradicts "generator". | Say "Excalidraw emitted by a hand-written Python generator". |
| Y-M4 | 64-65, 150-152 | "Explains a mechanism" is a judgment call, so Goal 1 can't be checked. | Make the approved figure list the definition. |
| Y-M5 | 125-126 | "Book 1 renders the same" is stated as fact before it is tested. | Say "expected to … verified by the diff". |
| Y-M6 | 102, 113 | The "fourth copy" wording fits pages, not components. | Say "another per-book copy". |
| Y-M7 | 72-76 vs 178-180 | Focus mode is in Goal 3 but has no design. | Name its mechanism, or drop it. |
| Y-M8 | 77-80 | Goals 4 and 5 have no design. | See S-M2 and S-M3. |
| Y-M9 | 70, 168-170, 195 | Terms vary: "talks", "claim ids" and "source". | Pick one term ("sources"), and say where it appears. |

## Nits (condensed)

- **Counts and keys:**
  - The coupled-file count is about 34–39, not 33. List the files instead.
  - Manifest keys are zero-padded (`"01"`), not `"1"`.
  - The program file says 7 chapters. The spec's 8 is current, so cite that.
- **Reader features:**
  - `ShareModal` hard-codes Book 1's title and builds X and LinkedIn share links.
  - The keys `book:reader:text-only` and `book:reader:settings` aren't covered by the prefix plan.
  - The two domains already separate localStorage in production.
  - Only `Reader` saves progress, not `ChapterDetail`.
- **Figure estimate:** about 25 mechanism figures is optimistic. Most headings argue a position, and ch02 and ch06 are long "Movement" sections.
- **Missing alternative:** explicit props, the `EvidenceRail` pattern. The "Rejected: it is the anti-goal" reasoning is circular.
- **Missing risk:** a heading renamed in the content breaks its figure's placement.
- **Author review:** record the sign-off, e.g. `reviewed: true`.
- **Wording:**
  - Mixed bullet styles, and approach entries with different shapes.
  - No explicit problem statement, and an unlinked "step 1 of the plan".
  - Repeated caveats, second person on line 59, and vague phrases ("far more", "cleanest", "over time", "most of the work").
  - "How It Works" vs "how it works".
  - The unexplained "outside the evidence rail" exception.

## Agreement with earlier stages

- **Default context hides leaks:** D-M1 agrees with I-M1 (Stage 5).
- **The evidence graph needs chapters and evidence together:** D-M2/M3 agree with I-M2 and Z-M5.
- **No Playwright:** D-B2 agrees with Z-M6.
- **The figure metadata needs one source of truth:** D-M6 agrees with Z-M7, I-M3 and C2.
- **Goals 4 and 5 lack a design:** S-M2/M3 and Y-M8 agree with C6 and Z-M8, which also says to defer them.
