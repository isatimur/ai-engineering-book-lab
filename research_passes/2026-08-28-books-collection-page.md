# Research Pass — 2026-08-28 — `/books` collection page: full verification

- **Target:** `/books` collection page, per spec `docs/superpowers/specs/2026-08-27-books-collection-page-design.md`. Give the site a real "collection of books" entry point without disturbing book 1's homepage/SEO at `/` or making book 2's unreviewed manuscript publicly indexed.
- **Pass type:** full verification (lint, test, build, regression checks, real-browser check), pass-log write, sync with origin, push. This is Task 5 of 5 in the plan `.superpowers/sdd/2026-08-28-books-collection-page/`; Tasks 1-4 were implemented and committed in prior sessions.
- **Inputs used:** the spec (above), `website/src/data/stats.json`, `website/src/data/book.ts`, `website/src/data/bookChaptersTwo.ts`, the four task briefs and reports in `.superpowers/sdd/2026-08-28-books-collection-page/`, and the current source of `website/src/pages/Books.tsx`.

## Outputs changed (Tasks 1-4, already committed)

| Commit | File(s) | What |
|---|---|---|
| `69ed4e5` | `website/src/pages/Books.tsx` | New page component: two book cards (book 1 → `/`, book 2 → `/second-book`), `Seo`/`JsonLd` (`ItemList` schema), header with "← Catalogue" link. |
| `18213d9` | `website/src/routes.tsx` | Registered `{ path: 'books', element: <Books /> }` as a sibling route next to `{ path: 'read', element: <Reader /> }`. |
| `5b0d33c` | `website/src/components/nav/ExploreMenu.tsx` | Added `{ href: '/books', label: 'Books', description: 'The full AI Engineer Press library' }` as the first entry in `EXPLORE_ITEMS` — shared by both `Catalogue.tsx`'s dark header and `TopNav.tsx`'s reader chrome, so one change covers both nav surfaces. |
| `8e6bf8d` | `website/scripts/gen-sitemap.mjs`, `website/public/sitemap.xml` | Added `push('/books', repoDate, '0.9', 'weekly')` directly after the `/` entry; regenerated the sitemap (46 URLs total). |

Note: these are the commit hashes as they currently exist on `origin/main` after Task 5's final rebase. The hashes originally cited in Task 1-4's own reports (`15b1c51`, `003a98a`, `3fba5fb`, `86d92f1`) were rewritten by that rebase; the four commits above are the same content under their current, correct hashes.

No new data source was created — the spec's "Data" section is satisfied by construction (`Books.tsx` reads existing `book.ts`, `bookChaptersTwo.ts`, and `stats.json`).

## Verification performed (this pass)

**Step 1 — Lint + test.** `cd website && npm run lint` (`tsc --noEmit`): clean, no output, no errors. `npm run test` (Vitest): **19 test files, 95 tests, all passed** — matches the expected count from before this plan; this plan added no new test files.

**Step 2 — Production build.** `npm run build`: succeeded. `ls website/dist/books.html`: exists (5,962 bytes). `grep -c '\[\[' website/dist/books.html`: `0` — no raw wikilink/bracket syntax leaked into the page.

**Step 3 — Book 1 unaffected.** `git log --oneline -5` confirms none of the 4 commits from Tasks 1-4 touch `website/src/pages/Catalogue.tsx`. `git diff --stat ad8227a HEAD -- website/src/pages/Catalogue.tsx` (diffing from the commit immediately before Task 1, i.e. the plan-doc commit, through the current HEAD) produced **no output** — zero lines changed in `Catalogue.tsx` across the whole plan.

**Step 4 — Book 2's `noindex` unaffected.** `grep -o 'name="robots"[^/]*' website/dist/second-book/the-turn-to-rl.html` → `name="robots" content="noindex, follow"` — present and unchanged. This plan touches zero files under `src/pages/SecondBook*` or `src/components/chapter/SecondBookArticle.tsx`.

**Step 5 — Real browser check (Playwright, via the `playwright-cli` skill).** Started `npm run dev` (port 3001, 3000 was occupied by a concurrent session — consistent with what Tasks 2 and 3's reports also hit). Drove real Chromium:

- `/books`: page title "Books — AI Engineer Press"; two cards render with the expected content — card 1 ("AI Engineering / From Copilot to Colleague / How AI Engineering Turns Models into Dependable Systems / 10 chapters · 10 drafted", linking to `/`) and card 2 ("Drafting / The Model Layer / An early, source-anchored draft on how AI engineering is reshaping training, inference, and the long tail of domains beyond text. / 7 chapters · 14,935 words · 43 claims · 93 anchors", linking to `/second-book`).
- Clicked card 1's link → landed on `/` (title "From Copilot to Colleague — A Guide to AI Engineering"). Clicked card 2's link (from a fresh `/books` load) → landed on `/second-book` (title "Second Book (Draft) — Read").
- Explore menu on `/` (`Catalogue.tsx`'s dark header): opened the menu, "Books — The full AI Engineer Press library" is the first `menuitem`; clicked it → landed on `/books`.
- Explore menu on `/read` (`Reader.tsx`'s `TopNav`-based reader chrome — see note below on why `/read` and not `/read/01-the-shift`): opened the menu, "Books" is again the first `menuitem`; clicked it → landed on `/books`.
- Console errors: **zero** across every navigation except the very first page load of the session, which showed one `favicon.ico 404` — a generic dev-server artifact unrelated to any route (confirmed by reloading `/books` afterward with the favicon cached: 0 errors). This matches what Tasks 2 and 3's own smoke checks independently observed.

Closed the browser and killed the dev server after the check; working tree left clean (no `.playwright-cli/` artifacts committed).

**SSG-output freebie check:** the browser check above ran against the dev server; `grep -c 'The Model Layer' website/dist/books.html` on the actual static build output returns `2` (heading + JSON-LD `name`), confirming the shipped static HTML carries real content, not a hydration-only shell.

**`/books` gap check against `llms.txt`/`llms-full.txt`:** `grep -c '/books' website/public/llms.txt website/public/llms-full.txt` → `0` for both files. This is not a gap: `website/scripts/gen-llms.mjs` is scoped entirely to book 1's chapter export — it parses `chaptersSrc` from `src/data/bookChapters.ts` (book 1 only) and emits per-chapter markdown/links, the same way it always has. It does not enumerate site-wide pages the way `gen-sitemap.mjs` does. Book 2's routes and now `/books` were never expected to appear in either `llms.txt` or `llms-full.txt`, and their absence is expected behavior, not a regression from this plan.

**Corrected brief note:** Task 3's brief specified `/read/01-the-shift` as the reader-chrome smoke-check URL. That route renders `ChapterDetail.tsx`, which has its own bespoke header and does not render `ExploreMenu` at all — only `/read` (`Reader.tsx`, via `TopNav.tsx`) does. The Task 3 implementer correctly substituted `/read` and traced the reason through `routes.tsx`/`Reader.tsx`/`ChapterDetail.tsx`; this Task 5 pass independently re-verified the same substitution by repeating the check. This is a corrected error in the brief's example URL, not a deviation by any implementer from the spec's actual requirement (the Explore-menu entry itself, which is genuinely shared and genuinely present on both real render sites).

## Open items / deferred (not fixed in this pass, by design)

Two Minor findings were deferred from Task 1's review — neither blocks merge:

1. **Unused `absoluteUrl` import** in `Books.tsx` (`import { BOOK, SITE_ORIGIN, absoluteUrl } from '../data/book';` — `absoluteUrl` is never referenced in the file). Inherited verbatim from the plan's own Task 1 code block.
2. **Hand-duplicated card JSX.** The two book "cards" in `Books.tsx` are written out as separate, near-identical `<Link>` blocks rather than extracted into a shared `<BookCard>` component. Acceptable at 2 items; would be worth extracting if a third book is ever added.

Card copy (title "The Model Layer", description, "Drafting" status label) was written out concretely in Task 1 rather than left as an implementer decision — this resolves the spec's "Open implementation-time decisions" section by explicit choice, not by re-opening it here.

> **Correction (2026-08-28, final fix wave — see "Final fix wave" section below):** the claim above, that writing "The Model Layer" into `Books.tsx` "resolves" the spec's title question, was wrong. Book 2's canonical chapter-packets source (`05_Book_Ideas/Second Book - Chapter Packets/00_README.md`) frames "The Model Layer" as Part I's name only, not the whole book's title, and the original design spec's own working title is the explicitly-flagged placeholder "Beyond the Harness" (`docs/superpowers/specs/2026-07-27-second-book-design.md:5`, with "Finalize working title" still listed as open at line 80). There is no finalized public title for book 2 anywhere in this repo. `Books.tsx`'s "The Model Layer" was also inconsistent with `SecondBookReader.tsx`'s own `<h1>`, which already read "The Model Layer & The Long Tail" — a second, undetected drift this pass's review missed. The title question was never resolved; it was silently closed. Treat it as an open, interim decision pending the author's final call.

## Summary

All 8 steps of Task 5 completed. Lint clean, 95/95 tests pass, production build succeeds and produces a valid `books.html` with no leaked raw syntax, book 1's `Catalogue.tsx` is provably untouched across the whole plan, book 2's `noindex` is provably unchanged, and a real-browser Playwright check confirms both cards render, both links navigate correctly, and the Explore-menu "Books" entry works from both `/` and the reader chrome (`/read`) with zero attributable console errors.

## Final fix wave (2026-08-28)

Whole-branch review surfaced three Important findings and three bundled Minor findings after the Task 5 pass above closed. This section documents the single fix-wave commit that addressed all of them — the plan's final fix wave; no second wave follows.

**Finding 1 — book 2's title was inconsistent across pages, and this pass log wrongly called the title question "resolved."** `Books.tsx` hardcoded `"The Model Layer"` (JSON-LD `name` and card `<h2>`); `SecondBookReader.tsx`'s `<h1>` already read `"The Model Layer & The Long Tail"` — two different strings, neither a finalized title (see the correction note above the old "Summary" section). Fix: added `export const BOOK_TWO_TITLE = 'The Model Layer & The Long Tail'` to `website/src/data/bookChaptersTwo.ts`, documented inline as an interim/unconfirmed title, and pointed both `Books.tsx` and `SecondBookReader.tsx` at the same constant so they can no longer drift independently. This is still not a finalized title — the constant's own comment says so — it is now a *single* interim string instead of two conflicting ones.

**Finding 2 — `Books.tsx` mislabeled a stat and omitted a spec'd field.** Book 1's card read "10 chapters · 10 drafted" (`stats.chapters.total` mislabeled as "drafted," and redundant with `chapters.length`). Fix: replaced with "10 chapters · 33,793 words," reusing the existing `totalWordCount` export from `website/src/lib/readingStats.ts` (no new computation), matching the chapter-count-plus-word-count format the spec asked for and that book 2's card already used.

**Finding 3 — the JSON-LD builder lived inline in `Books.tsx` instead of the shared, tested module.** Moved `booksCollectionJsonLd` into `website/src/lib/structuredData.ts` (same pattern as `ledgersIndexJsonLd`), updated `Books.tsx` to import it, and added a `describe('booksCollectionJsonLd', ...)` block plus a sweep-list entry to `website/src/lib/structuredData.test.ts`'s "JSON-LD serialization safety" test. `/books` is no longer the only page whose JSON-LD is untested.

**Minor A — unused `absoluteUrl` import.** Removed from `Books.tsx` along with the now-unused `SITE_ORIGIN` import; both became dead once the inline JSON-LD builder moved out.

**Minor B — literal "spacer" text in static HTML.** Replaced `<span className="opacity-0" aria-hidden>spacer</span>` in `Books.tsx`'s header with a bare `<span />`, matching the idiom already used in `SecondBookReader.tsx`'s header.

**Minor C — duplicated word-count `reduce`.** Added `export const chaptersTwoWordCount = chaptersTwo.reduce((sum, c) => sum + c.wordCount, 0)` to `website/src/data/bookChaptersTwo.ts` (mirrors `totalWordCount` in `readingStats.ts`); `Books.tsx` and `SecondBookReader.tsx` both now import it instead of each computing their own copy.

**Verification.** `npm run lint` (`tsc --noEmit`): clean. `npm run test` (Vitest): 19 test files, **97 tests, all passed** (up from 95 — the two new `booksCollectionJsonLd` assertions; no existing test weakened or removed). `npm run build`: succeeded; `grep -o 'The Model Layer[^<"]*' dist/books.html` and the same against `dist/second-book.html` both resolve to `The Model Layer & The Long Tail` (one HTML-entity-encoded, one raw JSON-LD — same underlying string); `grep`-confirmed `dist/books.html` book-1 card now reads `10 chapters · 33,793 words` in place of the old `10 chapters · 10 drafted`.

**Commit:** `424bea8` — `fix(books): reconcile book-2 title, fix stat label, move JSON-LD to shared module` (hash as rewritten by the pre-push rebase onto `origin/main`; the commit's own content is unchanged).
