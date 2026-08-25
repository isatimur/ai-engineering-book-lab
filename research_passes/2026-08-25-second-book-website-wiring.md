# Second Book — Website Wiring (Reading + Evidence) — 2026-08-25

## Date
2026-08-25

## Target
`programs/second_book_website_wiring.md` — give the second book a reading
route with its evidence rail, additive to book 1, scoped to reading +
evidence only (no search, no Quality/judge-score UI, no sitemap/llms
indexing). The 5 "decisions to make" the brief left open were resolved by
the dispatching agent before this pass started (sibling data file, sync
script mirroring `sync-diagrams.mjs`, separate route family, an optional
`evidenceData` prop on `EvidenceRail`, `build_stats.py` left alone).

## Pass type
Website wiring / small feature build. Not a drafting or anchoring pass.

## Inputs used
- `programs/second_book_website_wiring.md` — the scoping brief, including its
  "Never do" list and the collision-risk warning about `ChapterArticle.tsx`
  (checked: `git status` was clean and `git log` showed no in-flight
  concurrent edits at the start of this pass, so the file was safe to read;
  it was ultimately **not modified** — see design decision below).
- `public/drafting-2/*.md` (7 chapter drafts), `claims-2/Claims Ledger.md`
  (43 claims, already anchored), `05_Book_Ideas/Second Book - Chapter
  Packets/0X_*.md` ("Role in the book" sections, for chapter promises).
- `website/scripts/sync-diagrams.mjs` — the root-finding + content-hash
  skip-safe pattern mirrored by the new sync script.
- `website/src/data/bookChapters.ts`, `website/src/pages/ChapterDetail.tsx`,
  `website/src/pages/Reader.tsx`, `website/src/components/chapter/
  ChapterArticle.tsx`, `website/src/components/chapter/FullBookReader.tsx`,
  `website/src/EvidenceRail.tsx`, `website/src/lib/evidenceGraph.ts`,
  `website/src/lib/manifest.ts`, `website/src/lib/chapterLinks.ts`,
  `website/src/routes.tsx` — read in full to find every book-1-only
  hardcoded lookup before deciding what to reuse vs. fork.
- `99_Meta/scripts/anchor/build_evidence.py --help` (confirmed `--ledger`/
  `--out` flags) and its `build_index()` (confirmed evidence.json keys are
  `str(int(candidate_chapter))`, i.e. `"1".."7"` for book 2 — matches
  `EvidenceRail`'s `parseInt(chapterNumber, 10)` lookup with book 2's
  `chapter.number` values of `"01".."07"`).

## Design decision: did not reuse `ChapterArticle.tsx` or `FullBookReader.tsx`
The brief's own "Why" section flagged that book 1's rendering path is
hardcoded at multiple layers, not just the two components it named. On
inspection, `ChapterArticle.tsx` unconditionally renders `<EvidenceClaimMarkers
chapterNumber={chapter.number} />`, and `EvidenceClaimMarkers` /
`evidenceGraph.ts` hardcode `import evidenceData from '../evidence.json'`
(book 1's file) keyed by chapter number string. Book 2's most natural
chapter numbering (`"01".."07"`, matching its own content files and
`evidence-2.json`'s keys) **collides** with book 1's own `"01".."07"`
range. Reusing `ChapterArticle` unmodified would have silently rendered
book 1's inline claim markers (wrong claims) and, via `inlineFigsForChapter`/
`opener()` in `manifest.ts` (also keyed by chapter number), book 1's
diagrams on book 2's pages.

Rather than edit `ChapterArticle.tsx` (a shared, book-1-load-bearing
component, and the file the brief specifically flagged as high-risk to
touch) or pick book-2 chapter numbers with an arbitrary offset (which would
have decoupled them from `evidence-2.json`'s natural `1..7` keys), this pass
wrote a new, small sibling component, `SecondBookArticle.tsx`, that reuses
only the generic, chapter-shape-agnostic building blocks (`MarkdownBlock`)
and leaves evidence rendering to `<EvidenceRail evidenceData={...}>` in the
caller. `ChapterArticle.tsx` was read but never edited.

Similarly, `FullBookReader.tsx` pulls in the audiobook player, judge
scorecards (explicitly out of scope — no judge-panel run exists for book 2),
and diagram openers (book 2 has none). `SecondBookReader.tsx` is a
purpose-built, much simpler full-book page: a table of contents followed by
each chapter's prose + evidence rail, not a fork of `FullBookReader.tsx`.

## Outputs changed
1. **`website/scripts/sync-second-book.mjs`** (new) — copies
   `public/drafting-2/Chapter N — *.md` into `website/src/content-2/
   chapter-NN.md`, mirroring `sync-diagrams.mjs`'s pattern exactly: repo-root
   walk-up (worktree-safe), content-hash-based `differs()` (not mtime), and
   a skip-safe early return if `public/drafting-2/` isn't present in this
   checkout.
2. **`website/package.json`** — added a `sync-second-book` script and
   inserted it into the `prebuild` chain (after `sync-audio`, before
   `gen-data`).
3. **`website/src/content-2/chapter-0[1-7].md`** (new, generated) — synced
   verbatim from `public/drafting-2/`, no content transform.
4. **`website/src/data/bookChaptersTwo.ts`** (new) — sibling to
   `bookChapters.ts`, reuses its `BookChapter` type (structural fields only,
   no book-1-only data), one entry per chapter with `number: "01".."07"`,
   kebab-case slugs, and a `promise` drawn from each chapter packet's "Role
   in the book" section. Exports `chaptersTwo`, `chapterTwoPath`,
   `chapterTwoParam`, `chapterTwoByParam` — a separate namespace, not merged
   into book 1's exports.
5. **`website/src/evidence-2.json`** (new, generated) — via
   `python3 99_Meta/scripts/anchor/build_evidence.py --ledger "claims-2/
   Claims Ledger.md" --out website/src/evidence-2.json` (43 claims → 7
   chapters, 54 chapter-claim rows). `website/src/evidence.json` (book 1)
   was never touched — confirmed absent from `git diff`/`git status`.
6. **`website/src/EvidenceRail.tsx`** (modified; the brief's task list names
   it `website/EvidenceRail.tsx` — the actual path is `website/src/
   EvidenceRail.tsx`, noted here so the file list reconciles) — added two
   optional props:
   `evidenceData?: EvidenceIndex` (defaults to the existing `import
   book1EvidenceData from './evidence.json'`, renamed from the old
   `evidenceData` import binding to make the default explicit) and
   `showGraphLink?: boolean` (defaults `true`). The "Open in graph" link
   points at `/read/graph`, a book-1-only page; book 2 callers pass
   `showGraphLink={false}`. Every existing book-1 call site
   (`ChapterDetail.tsx`, `FullBookReader.tsx`) calls `<EvidenceRail
   chapterNumber={...} />` with no other props, so both defaults keep their
   behavior byte-for-byte identical — verified by the full existing test
   suite passing unchanged (95/95) and a browser check of `/read/01-the-shift`.
7. **`website/src/components/chapter/SecondBookArticle.tsx`** (new) — trimmed
   sibling of `ChapterArticle.tsx`; see design decision above. Also strips
   book 2's still-in-place `[[id-slug|Label]]` drafting-stage wikilink syntax
   down to its label for display (presentation-only regex, does not touch
   the synced content files) — book 1's content has already been through a
   later pass that removes this syntax; book 2 hasn't, and rendering the raw
   double-bracket IDs inline would have been unreadable.
8. **`website/src/pages/SecondBookReader.tsx`** (new) — full-book route
   (`/second-book`): table of contents + each chapter's prose and evidence
   rail in one continuous page.
9. **`website/src/pages/SecondBookChapterDetail.tsx`** (new) — single-chapter
   route (`/second-book/:slug`): title, promise, prose (`SecondBookArticle`),
   evidence rail (`evidence-2.json`, `showGraphLink={false}`), prev/next nav.
   Exports `secondBookChapterStaticPaths()` for SSG prerendering.
10. **`website/src/routes.tsx`** — added `second-book` and `second-book/:slug`
    (with `getStaticPaths: secondBookChapterStaticPaths`, matching book 1's
    `read/:slug` pattern — the site has no SPA-fallback rewrite configured in
    `vercel.json`, so a route without `getStaticPaths` would 404 on a real
    deploy even though it works in `npm run dev`). Not linked from any nav
    component or `Catalogue.tsx` — direct-URL only, per the brief.

## Routes
- `/second-book` — full-book reader, all 7 chapters.
- `/second-book/the-turn-to-rl` (ch. 1) · `/inference-economics` (ch. 2) ·
  `/frontier-models` (ch. 3) · `/beyond-text` (ch. 4) · `/robotics` (ch. 5) ·
  `/high-stakes-domains` (ch. 6) · `/creative-and-games` (ch. 7) — each under
  `/second-book/<slug>`.

## Verification
1. `npm install` (node_modules wasn't present in this worktree), then
   `npm run lint` (`tsc --noEmit`) — clean, no errors.
2. `npm run test` (vitest) — 19 test files, 95/95 tests pass, unchanged from
   before this pass (no test was modified, weakened, or deleted).
3. `npm run dev` (picked port 3001; 3000 was in use) + `playwright-cli`:
   - `/second-book` — renders the working title, a 7-item table of contents
     with chapter number/reading time/title/promise, and the full continuous
     read below it. Zero console errors (one unrelated `favicon.ico` 404,
     pre-existing site-wide, not caused by this change).
   - `/second-book/the-turn-to-rl` — renders chapter 1's prose (wikilinks
     cleanly stripped to parenthetical attributions, e.g. "(Alessandro
     Cappelli, Adaptive ML)"), the "Evidence — Source Anchors" section with
     anchor cards (video thumbnail, timestamp, quote, speaker, confidence),
     and a "Next → Inference Economics" link. Zero console errors.
   - `/second-book/creative-and-games` (last chapter) — renders correctly,
     no "Next" link (last in the array), zero console errors.
   - `/read/01-the-shift` (book 1) — re-checked after all changes: renders
     correctly, zero console errors — confirms book 1's existing page is
     unaffected.
4. `npm run build` (`vite-react-ssg build`, the real production build, not just
   `npm run dev`) — succeeded. Confirmed in `dist/`:
   - `dist/second-book.html` and all 7 `dist/second-book/<slug>.html` files
     were emitted (proves `getStaticPaths: secondBookChapterStaticPaths`
     fired with the right path format), alongside the unchanged 10
     `dist/read/*.html` book-1 chapter files.
   - `grep -c "second-book" dist/sitemap.xml` → `0`; same for `dist/llms.txt`
     — book 2 is not in the production sitemap/LLM feed.
   - The static HTML for `/second-book/the-turn-to-rl` has `<title
     data-rh="true">Training and the Turn to RL — Second Book
     (Draft)</title>` and `<meta data-rh="true" name="robots"
     content="noindex, follow">` baked in server-side (not just applied after
     hydration) — confirms `noindex` actually lands in what a crawler would
     see, not only in the client-rendered DOM.
5. Book-1-unaffected checks:
   - `bookChapters.ts` still has exactly 10 `number: '...'` entries
     (`grep -c`).
   - `website/src/evidence.json` absent from `git status`/`git diff` for
     this pass — never touched.
   - `npm run prebuild` re-run in full: `gen-sitemap.mjs` reported "45 URLs
     (10 chapters, 18 concepts, 3 maps)" (unchanged from before this pass);
     `gen-llms.mjs` reported "10 per-chapter .md files". Diffed
     `public/sitemap.xml` before/after — only `<lastmod>` timestamps
     changed (expected git-history-driven churn, not content); `grep -i
     "second-book"` against `sitemap.xml`/`llms.txt`/`llms-full.txt` returned
     nothing. `llms.txt` and `llms-full.txt` were byte-identical
     before/after.
   - Running `npm run prebuild` for this verification also caused
     `gen-data.mjs` to regenerate `website/src/data/versions.json` and add
     new `website/src/data/versions/*/git-*.md` snapshot files (its own
     git-history-driven, unrelated-to-this-pass output). Reverted both
     (`git checkout -- website/src/data/versions.json website/src/data/versions/`)
     before committing, since they're not part of this pass's scope and
     would otherwise show as noise in the diff.
   - Final `git diff --stat` against tracked files: exactly `website/
     package.json`, `website/src/EvidenceRail.tsx`, `website/src/routes.tsx`
     — nothing else pre-existing was touched.

## Open items / rough edges
- **Slug choices** (my judgment call, not specified by the brief): `01` →
  `the-turn-to-rl`, `02` → `inference-economics`, `03` → `frontier-models`,
  `04` → `beyond-text`, `05` → `robotics`, `06` → `high-stakes-domains`,
  `07` → `creative-and-games`. Short, kebab-case, in book 1's style
  (`the-shift`, `taste`, `harnesses`).
- **Book title**: no canonical title has been chosen for book 2 yet (only
  the working part names "The Model Layer" / "The Long Tail" exist in
  `05_Book_Ideas/`). The reader header uses "Second Book (Draft)" /
  "The Model Layer & The Long Tail" as an honest placeholder rather than
  inventing a title — revisit once one is chosen.
- **Wikilink stripping is presentation-only and imperfect**: the regex
  handles the `[[id-slug|Label]]` and bare `[[Label]]` forms seen in
  `public/drafting-2/`, but book 2's prose has not been through the same
  citation-cleanup pass book 1's content had, so it may still read slightly
  more citation-dense than book 1 in places. This is a content-authoring
  gap, not a wiring gap — out of scope for this pass.
- **`ExpandableSummary`, `EvidenceSectionHeader`, `SourcesDrawer`,
  `RedThreadNav`, `MobileReaderBar`, text-only mode, and the audiobook
  listen-along highlight** were all deliberately left out of
  `SecondBookReader`/`SecondBookChapterDetail` — they're either book-1-only
  infrastructure (audiobook, sources drawer/graph nav) or add complexity
  the "reading + evidence only" scope didn't need yet. The pages are
  visually plainer than book 1's as a result; nothing is broken, but a
  future pass could bring some of these back in a book-2-safe form if the
  reading experience needs to feel closer to parity.
- **No diagrams**: book 2 has no opener/inline diagrams yet, so
  `SecondBookArticle` never calls into `manifest.ts` at all — chapters read
  as plain prose with no visual breaks. Expected at this stage.
- Search integration, the Quality/judge-score page, and sitemap/llms
  inclusion remain deferred, exactly as the brief specified — untouched in
  this pass.
