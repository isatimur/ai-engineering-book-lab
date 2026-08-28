# Books Collection Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/books` collection page listing both books (book 1 as the flagship, book 2 labeled "Drafting"), linked from the existing `ExploreMenu` nav and included in the sitemap, without touching book 1's homepage/SEO or book 2's existing `noindex`.

**Architecture:** One new page component (`Books.tsx`) composing existing data (`stats.json`, `BOOK` from `book.ts`, `chaptersTwo` from `bookChaptersTwo.ts`) into two static cards, registered as a new top-level route. Discoverability piggybacks on the site's existing `ExploreMenu`/`EXPLORE_ITEMS` pattern (already rendered in both the reader chrome and the `Catalogue` header) rather than adding a separate nav edit — one array entry satisfies both the "add a nav link" and "cross-link from the homepage" requirements from the spec, since `Catalogue.tsx` already renders `ExploreMenu`.

**Tech Stack:** React 19 + TypeScript, react-router-dom, vite-react-ssg (static site generation), Vitest, Tailwind-style utility classes matching the existing "paper" chrome (see `Workshop.tsx` for the template this follows).

**Spec:** `docs/superpowers/specs/2026-08-27-books-collection-page-design.md`

## Global Constraints
- Book 1's `/` route, `Catalogue.tsx`'s existing content, and `bookJsonLd()` output must not change in any way other than the one new `EXPLORE_ITEMS` entry (which already renders identically on every page that uses `ExploreMenu` — this is not a `Catalogue.tsx`-specific change).
- Book 2's `/second-book/*` pages keep their existing `noindex` — this plan does not touch `SecondBookChapterDetail.tsx`, `SecondBookReader.tsx`, or `SecondBookArticle.tsx`.
- No new data source: `Books.tsx` reads only from `stats.json`, `book.ts`, and `bookChaptersTwo.ts`, all of which already exist and are already imported elsewhere in the codebase.
- `/books` is added to `gen-sitemap.mjs`; `/second-book` and `/second-book/*` are never added to it (unchanged from today — confirm this stays true after the change, don't just avoid adding new code for it).
- Follow the existing code style: no comments explaining *what* the code does, only *why* where non-obvious (matches the rest of this codebase, e.g. the comment blocks already in `bookChaptersTwo.ts` and `readingStats.ts`).
- `npm run lint` (tsc --noEmit) and `npm run test` (vitest) must stay clean throughout — run them after every task, not just at the end.

---

### Task 1: `Books.tsx` page component

**Files:**
- Create: `website/src/pages/Books.tsx`
- Test: none (this codebase has no page-level component tests — see `src/pages/Workshop.tsx`, `Enterprise.tsx` for precedent; only data/lib modules under `src/data/*.test.ts` and `src/lib/*.test.ts` are unit-tested)

**Interfaces:**
- Consumes: `BOOK` from `../data/book` (fields: `title`, `subtitle`, `authors`), `chapters` from `../data/bookChapters` (for book 1's chapter count), `chaptersTwo` from `../data/bookChaptersTwo` (for book 2's chapter count and word-count sum), `stats` (default import) from `../data/stats.json` (fields used: `stats.chapters.total`, `stats.book2.chapters.total`, `stats.book2.claims.total`, `stats.book2.anchors.total`), `Seo` from `../components/Seo`, `JsonLd` from `../components/JsonLd`.
- Produces: default export `Books` — a React function component, imported by `routes.tsx` in Task 2.

- [ ] **Step 1: Write `Books.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { JsonLd } from '../components/JsonLd';
import { BOOK, SITE_ORIGIN, absoluteUrl } from '../data/book';
import { chapters } from '../data/bookChapters';
import { chaptersTwo } from '../data/bookChaptersTwo';
import stats from '../data/stats.json';

const countBook2Words = () => chaptersTwo.reduce((sum, c) => sum + c.wordCount, 0);

const booksCollectionJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Books — AI Engineer Press',
  url: `${SITE_ORIGIN}/books`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      url: `${SITE_ORIGIN}/`,
      name: BOOK.title,
    },
    {
      '@type': 'ListItem',
      position: 2,
      url: `${SITE_ORIGIN}/second-book`,
      name: 'The Model Layer',
    },
  ],
});

const Header = () => (
  <header className="no-print flex items-center justify-between border-b border-[var(--color-border)] px-6 py-6 font-mono text-[10px] uppercase tracking-widest lg:px-12">
    <Link to="/" className="hover:opacity-60">← Catalogue</Link>
    <span>AI Engineer Press · Books</span>
    <span className="opacity-0" aria-hidden>spacer</span>
  </header>
);

export const Books = () => {
  const book2Words = countBook2Words();

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <Seo
        title="Books — AI Engineer Press"
        description="The AI Engineer Press library: From Copilot to Colleague, plus works in progress."
        path="/books"
        type="website"
      />
      <JsonLd data={booksCollectionJsonLd()} />
      <Header />

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          AI Engineer Press
        </p>
        <h1 className="mb-10 font-serif text-4xl italic leading-tight md:text-5xl">
          Books
        </h1>

        <div className="flex flex-col gap-6">
          <Link
            to="/"
            className="block rounded-sm border border-[var(--color-ink)] bg-[var(--color-ink)] px-6 py-6 text-[var(--color-paper)] transition-opacity hover:opacity-90"
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
              {BOOK.category}
            </p>
            <h2 className="mb-2 font-serif text-2xl italic leading-tight">
              {BOOK.title}
            </h2>
            <p className="mb-4 max-w-xl font-sans text-sm leading-relaxed opacity-80">
              {BOOK.subtitle}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-60">
              {chapters.length} chapters · {stats.chapters.total} drafted
            </p>
          </Link>

          <Link
            to="/second-book"
            className="block rounded-sm border border-dashed border-[var(--color-border)] px-6 py-6 transition-colors hover:border-[var(--color-ink)]"
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              Drafting
            </p>
            <h2 className="mb-2 font-serif text-2xl italic leading-tight">
              The Model Layer
            </h2>
            <p className="mb-4 max-w-xl font-sans text-sm leading-relaxed text-[var(--color-ink-muted)]">
              An early, source-anchored draft on how AI engineering is reshaping training, inference, and the long tail of domains beyond text.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
              {chaptersTwo.length} chapters · {book2Words.toLocaleString()} words · {stats.book2.claims.total} claims · {stats.book2.anchors.total} anchors
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};
```

- [ ] **Step 2: Typecheck**

Run: `cd website && npm run lint`
Expected: clean (no errors). If `stats.json`'s TypeScript inference doesn't expose `chapters.total` / `book2.claims.total` / `book2.anchors.total` cleanly (JSON imports are typed by shape-inference from the file's current contents), fix by reading the actual current shape — this was verified present as of this plan's writing (`python3 -c "import json; print(json.load(open('website/src/data/stats.json'))['book2'])"` from the repo root confirms `book2.claims.total` and `book2.anchors.total` exist).

- [ ] **Step 3: Commit**

```bash
git add website/src/pages/Books.tsx
git commit -m "feat(books): add the /books collection page component"
```

---

### Task 2: Register the `/books` route

**Files:**
- Modify: `website/src/routes.tsx`

**Interfaces:**
- Consumes: `Books` default export from `../pages/Books` (Task 1).
- Produces: the route is now reachable at `/books` when the app is built/served.

- [ ] **Step 1: Add the import**

In `website/src/routes.tsx`, add near the other page imports (alphabetical-ish grouping isn't strictly enforced in this file — place it next to `ChapterDetail`/`Catalogue` imports for locality):

```tsx
import { Books } from './pages/Books';
```

- [ ] **Step 2: Add the route entry**

In the `children` array of the `/` route, add a new top-level entry. Place it near `{ path: 'read', element: <Reader /> }` for locality (both are "book-level" routes):

```tsx
      { path: 'books', element: <Books /> },
```

- [ ] **Step 3: Typecheck**

Run: `cd website && npm run lint`
Expected: clean.

- [ ] **Step 4: Manual smoke check**

Run: `cd website && npm run dev` (note the port from the terminal output — 3000 may be occupied by another process). Visit `http://localhost:<port>/books` in a browser. Expected: page renders with two cards, no console errors.

- [ ] **Step 5: Commit**

```bash
git add website/src/routes.tsx
git commit -m "feat(books): register the /books route"
```

---

### Task 3: Add "Books" to `ExploreMenu`'s `EXPLORE_ITEMS`

**Files:**
- Modify: `website/src/components/nav/ExploreMenu.tsx:13-27` (the `EXPLORE_ITEMS` array)

**Interfaces:**
- Consumes: nothing new — `EXPLORE_ITEMS` is already an internal array of `ExploreItem` objects (`{ href, label, external?, description? }`), already rendered by both `ExploreMenu` (used in `TopNav.tsx`'s reader chrome and `Catalogue.tsx`'s dark header) and `MobileNavMenu`.
- Produces: nothing new is exported — this task only adds one array entry, satisfying both "add a nav link" and "cross-link from the homepage" from the spec in a single change, since `Catalogue.tsx` already renders this exact menu.

- [ ] **Step 1: Add the entry**

In `website/src/components/nav/ExploreMenu.tsx`, add a new object to `EXPLORE_ITEMS`. Place it first in the array (before `/evidence`) since "Books" is a top-level library index, not a sub-feature of the current book — but confirm this reads naturally when the self-review in Task 5 checks the rendered menu order:

```tsx
  { href: '/books', label: 'Books', description: 'The full AI Engineer Press library' },
```

Resulting array start:

```tsx
export const EXPLORE_ITEMS: ExploreItem[] = [
  { href: '/books', label: 'Books', description: 'The full AI Engineer Press library' },
  { href: '/evidence', label: 'Evidence & metrics', description: 'Claims ledger and corpus stats' },
  { href: '/read/graph', label: 'Evidence graph', description: 'Interactive claim–source map' },
  ...
```

- [ ] **Step 2: Typecheck**

Run: `cd website && npm run lint`
Expected: clean (no type errors — `ExploreItem`'s shape already allows this object literal).

- [ ] **Step 3: Manual smoke check**

With the dev server still running (Task 2), open the `ExploreMenu` dropdown from `/` (Catalogue's dark header) and from `/read/01-the-shift` (reader chrome). Expected: "Books" appears as the first item in both, links to `/books`, and clicking it navigates correctly.

- [ ] **Step 4: Commit**

```bash
git add website/src/components/nav/ExploreMenu.tsx
git commit -m "feat(books): add Books to the Explore menu"
```

---

### Task 4: Add `/books` to the sitemap

**Files:**
- Modify: `website/scripts/gen-sitemap.mjs`

**Interfaces:**
- Consumes: the existing `push(path, lastmod, priority, changefreq)` helper already defined in this file (no signature change).
- Produces: `public/sitemap.xml` now includes a `/books` entry when the script runs (part of `prebuild`).

- [ ] **Step 1: Add the sitemap entry**

In `website/scripts/gen-sitemap.mjs`, add a new `push(...)` call. Place it directly after the `push('/', ...)` line, since `/books` is a top-level library page at the same priority tier as `/enterprise`:

```js
push('/', repoDate, '1.0', 'weekly');
push('/books', repoDate, '0.9', 'weekly');
push('/enterprise', repoDate, '0.9', 'monthly');
```

- [ ] **Step 2: Run the script and verify**

Run: `cd website && node scripts/gen-sitemap.mjs`
Expected output includes: `wrote public/sitemap.xml with N URLs` (N one more than before this change).

Run: `grep -c '/books' website/public/sitemap.xml`
Expected: `1`

Run: `grep -c 'second-book' website/public/sitemap.xml`
Expected: `0` (confirms book 2 is still excluded — this is a regression check, not new behavior)

- [ ] **Step 3: Commit**

```bash
git add website/scripts/gen-sitemap.mjs website/public/sitemap.xml
git commit -m "feat(books): add /books to the sitemap"
```

---

### Task 5: Full verification pass

**Files:** none created or modified — this task only runs checks.

**Interfaces:** none.

- [ ] **Step 1: Full lint + test**

Run: `cd website && npm run lint && npm run test`
Expected: `tsc --noEmit` clean; all existing Vitest files still pass (95 tests as of the last full run before this plan — confirm the count hasn't dropped, and it's fine if it's unchanged since this plan adds no new test files per Task 1's note).

- [ ] **Step 2: Production build**

Run: `cd website && npm run build`
Expected: build succeeds. Then:

Run: `ls website/dist/books.html`
Expected: file exists.

Run: `grep -c '\[\[' website/dist/books.html`
Expected: `0` (no raw syntax of any kind should leak into this page — it doesn't consume chapter prose directly, but this is a cheap sanity check).

- [ ] **Step 3: Confirm book 1's homepage is unaffected**

Run: `git diff --stat` against the commit before Task 1 started, filtered to files touched by book 1's existing homepage rendering — since this plan's tasks only ever add new files or append array/push entries, confirm no line inside `Catalogue.tsx` itself was touched:

Run: `git log --oneline -5` and verify none of the 4 commits from Tasks 1-4 modified `website/src/pages/Catalogue.tsx`.

- [ ] **Step 4: Confirm book 2's noindex is unaffected**

Run: `grep -o 'noindex[^"]*' website/dist/second-book/the-turn-to-rl.html | head -1` (or open the file and check the `<meta name="robots">` tag directly)
Expected: `noindex` still present, unchanged from before this plan (this plan touches zero files under `src/pages/SecondBook*` or `src/components/chapter/SecondBookArticle.tsx`).

- [ ] **Step 5: Browser check via Playwright (if available) or manual dev-server check**

If a Playwright tool/skill is available in this session, use it to visit `/books` and `/`, confirming: two cards render on `/books`, both card links navigate correctly (`/` and `/second-book`), the "Books" Explore-menu entry is present and functional from both `/` and a reader page, and there are zero console errors on any of these three pages. If Playwright isn't available, do this manually via `npm run dev` + a real browser, per this repo's frontend-change convention (do not skip this step and only claim success from lint/build output).

- [ ] **Step 6: Write the pass log**

Create `research_passes/2026-08-28-books-collection-page.md` (or the actual date this task runs, if different) following `research_passes/README.md`'s convention: date, target (`/books` collection page per spec `docs/superpowers/specs/2026-08-27-books-collection-page-design.md`), inputs used (the spec, `stats.json`, `book.ts`, `bookChaptersTwo.ts`), outputs changed (list every file from Tasks 1-4), verification performed (lint/test/build/sitemap/browser results from Steps 1-5), and any open items (e.g. the exact card copy/wording is a judgment call made during implementation, not specced verbatim — note what was chosen and why if it deviates from this plan's Task 1 draft copy).

- [ ] **Step 7: Final commit**

```bash
git add research_passes/2026-08-28-books-collection-page.md
git commit -m "docs: log the /books collection page pass"
```

- [ ] **Step 8: Sync with origin and push**

Per this repo's established convention this week (see `research_passes/2026-08-23-second-book-anchoring-claims-25-37.md` and later passes): `git fetch origin main`, check `git rev-list --left-right --count origin/main...HEAD`, and if behind, `git pull --rebase origin main`. If `STATS.md`/`stats.json`/`website/src/data/stats.json` conflict during the rebase (a known recurring pattern in this repo from concurrent sessions regenerating stats), resolve by regenerating fresh — `python3 99_Meta/scripts/build_stats.py` — rather than hand-merging, then `git add` the regenerated files and `git rebase --continue`. Do not force-push. Push with `git push origin main`.

---

## Self-Review Notes

**Spec coverage:** Task 1 covers "Page content" (both cards, copy, links, stats). Task 2 covers "Routing". Task 3 covers "Discoverability" (both the nav-link and cross-link requirements — satisfied by one change since `ExploreMenu` is shared). Task 4 covers "SEO" (sitemap; the `noindex`-preservation half of "SEO" is a non-change, verified in Task 5 Step 4). Task 5 covers "Testing" in full. The spec's "Data" section (no new data source) is satisfied by construction in Task 1 — no task creates a new data file.

**Placeholder scan:** No TBD/TODO left in any task's code. Card copy for book 2 (title "The Model Layer", description, "Drafting" label) is written out concretely in Task 1 rather than left as a decision for the implementer — this resolves the spec's "Open implementation-time decisions" section by making an explicit choice, which Task 5 Step 6's pass log should note as a recorded decision, not re-open as an open question.

**Type consistency:** `Books` is the component name used consistently in Task 1 (definition) and Task 2 (import/usage). `chaptersTwo`, `stats.book2.claims.total`, `stats.book2.anchors.total` match the actual current shape of `bookChaptersTwo.ts` and `stats.json`, confirmed by reading both files during planning (not assumed).
