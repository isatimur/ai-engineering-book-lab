# pages

## Overview
One component per route. `src/routes.tsx` maps each route to a page. vite-react-ssg prerenders the dynamic routes from the `*StaticPaths` exports. Each page sets its head tags through `Seo`, and some add `JsonLd`.

## Interface
- Book 1: `Catalogue` (`/` on the book host, and `*`), `Reader` (`/read`), `ChapterDetail` + `chapterStaticPaths` (`/read/:slug`). [Catalogue.tsx:Catalogue] [Reader.tsx:Reader] [ChapterDetail.tsx:chapterStaticPaths]
- Books 2 and 3: `SecondBookReader`, `SecondBookChapterDetail` + `secondBookChapterStaticPaths`, `ThirdBookReader`, `ThirdBookChapterDetail` + `thirdBookChapterStaticPaths`. [SecondBookChapterDetail.tsx:secondBookChapterStaticPaths] [ThirdBookChapterDetail.tsx:thirdBookChapterStaticPaths]
- Press: `Press` (press home), `Books` (`/books`). [Press.tsx:Press] [Books.tsx:Books]
- Evidence: `EvidenceGraphPage` (`/read/graph`, reads `?chapter=`), `EvidenceReference` (`/evidence`), `LedgersIndexPage` (`/ledgers`), `EventLedgerPage` (`/ledgers/:slug`). [EvidenceGraphPage.tsx:EvidenceGraphPage] [EvidenceReference.tsx:EvidenceReference] [LedgersIndexPage.tsx:LedgersIndexPage] [EventLedgerPage.tsx:EventLedgerPage]
- Visual guide: `VisualGuide`, `ConceptDetail` + `conceptStaticPaths`, `MapDetail` + `mapStaticPaths`. [VisualGuide.tsx:VisualGuide] [ConceptDetail.tsx:conceptStaticPaths] [MapDetail.tsx:mapStaticPaths]
- Tools: `Search`, `Versions`, `Quality`, `Assess`, `Workshop`, `Enterprise`, `SpadeHero`. [Search.tsx:Search] [Versions.tsx:Versions] [Quality.tsx:Quality] [Assess.tsx:Assess] [Workshop.tsx:Workshop] [Enterprise.tsx:Enterprise] [SpadeHero.tsx:SpadeHero]

## Invariants
- An unknown `:slug` renders an in-page `NotFound`. No redirect or HTTP status is set. [ChapterDetail.tsx:NotFound] [ConceptDetail.tsx:NotFound] [MapDetail.tsx:MapDetail] [SecondBookChapterDetail.tsx:NotFound] [ThirdBookChapterDetail.tsx:NotFound]
- An unknown ledger slug renders `LedgersIndexPage` in place. [EventLedgerPage.tsx:EventLedgerPage]
- An unknown `?chapter=` on the graph page falls back to the full-book title. [EvidenceGraphPage.tsx:EvidenceGraphPage]
- `Reader`, `Quality`, `Search`, `Versions`, and all book 2 and book 3 pages are `noindex`. [Reader.tsx:Reader] [Quality.tsx:Quality] [Search.tsx:Search] [Versions.tsx:Versions] [SecondBookReader.tsx:SecondBookReader] [ThirdBookReader.tsx:ThirdBookReader]
- `Assess` keeps answers only in component state. Its Next button stays disabled until every question in the dimension has an answer. [Assess.tsx:Assess] [Assess.tsx:DimensionStep]
- `Quality` shows only a "No judge run" message when `hasJudgeData()` is false. [Quality.tsx:Quality]
- `ThirdBookReader` shows the outline from `third-book-outline.json` when `chaptersThree` is empty. [ThirdBookReader.tsx:ThirdBookReader]
- `Search` caps results at 30. [Search.tsx:Search]
- `Versions` lists only chapters that have versions. A `cancelled` flag drops stale loads. [Versions.tsx:Versions]
- `Reader` keyboard shortcuts (`g`, `f`, `[`, `]`, arrow keys) ignore events from inputs, textareas, and `contenteditable`. [Reader.tsx:Reader]

## Side Effects
- `Reader` saves scroll progress (600 ms debounce) and the last chapter through `src/lib/readingProgress.ts`. It runs a Lenis smooth-scroll instance, adds `window` `keydown` and `scroll` listeners, and sets `document.body.style.overflow` while the sidebar is open. Cleanup does not cancel the Lenis `requestAnimationFrame` loop or reset the overflow on unmount. [Reader.tsx:Reader] [Reader.tsx:debouncedSaveProgress]
- `Catalogue` calls `scrollAudio.initialize()` and navigates to `/read` after a 2400 ms timer that is not cleared on unmount. [Catalogue.tsx:handleSelect]
- `Versions` loads version markdown through `loadVersionContent`. [Versions.tsx:Versions]
- `Assess` and `Workshop` call `window.print()`. [Assess.tsx:Results] [Workshop.tsx:Workshop]
- `LedgersIndexPage` loads YouTube thumbnails from `img.youtube.com`. [LedgersIndexPage.tsx:LedgersIndexPage]
- `VisualGuide` scrolls to `#concept-*` hash targets. [VisualGuide.tsx:VisualGuide]
- `Quality`, `Versions`, and `Workshop` use plain `<a href>` (full page load) for some header links. [Quality.tsx:Quality] [Versions.tsx:Versions] [Workshop.tsx:Workshop]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory. `npm test` covers the home route choice in `src/lib/homeRoute.test.tsx`.
