# Books Collection Page — Design

## Background
The website (fromcopilottocolleague.com) is built as a single-book landing experience: `Catalogue.tsx` is the homepage (`/`), and its copy, hero, and JSON-LD (`bookJsonLd`) are all framed around one book. A second book ("The Model Layer" / "The Long Tail") was wired into the site in a prior pass (`programs/second_book_website_wiring.md`, `research_passes/2026-08-25-second-book-website-wiring.md`): it lives at `/second-book` and `/second-book/:slug`, reuses the evidence-rail pattern, and is currently direct-URL-only — not linked from any nav, not in the sitemap, and its rendered HTML carries `noindex`.

Book 2 has not been through a quality judge panel yet (`book-mash-2.toml` is ready but blocked on a missing `ANTHROPIC_API_KEY`) and has not had an editorial pass equivalent to book 1's. It is real, readable, fully anchored prose (7 chapters, 43 claims, 93/93 sources anchored) — but it is a draft, not a finished, reviewed manuscript the way book 1 is.

## Goal
Give the site a real "collection of books" entry point at `/books` so book 2 is easy to find and review without (a) disturbing book 1's existing homepage/SEO at `/`, or (b) making an unreviewed manuscript publicly indexed by search engines.

## Non-goals
- Not renaming or moving `/second-book` or `/read` — both stay exactly where they are.
- Not designing cover artwork — no illustration assets exist for either book; this is a typographic/color-block card treatment consistent with the site's existing minimal aesthetic, not a new visual-design project.
- Not running the book-mash quality panel or making any claim about book 2's editorial quality — the "Draft / In Progress" label is a status, not a review verdict.
- Not changing book 1's homepage content, JSON-LD, or route.

## Routing
- New route: `/books` → new page component `Books.tsx` (in `website/src/pages/`), registered in `website/src/routes.tsx` as a sibling of the existing routes (not nested under `/read`).
- `/` (book 1's `Catalogue.tsx`) is untouched.
- `/second-book` and `/second-book/:slug` are untouched — `/books` links to them, nothing about their own routing changes.

## Page content — `/books`
Two book cards in a simple grid/list (no carousel, no animation beyond what the site already does elsewhere — reuse existing `motion/react` patterns already used on `Catalogue.tsx` if a card entrance animation is wanted, but a static layout is acceptable for v1):

**Card 1 — Book 1 (flagship)**
- Title + one-line promise, pulled from `website/src/data/book.ts`'s `BOOK` constant (the same source `Catalogue.tsx` already uses) so copy never drifts.
- Chapter count + word count, from `stats.json`'s existing book-1 fields (`chapters.total`, and a word-count sum already computed somewhere in `Catalogue.tsx` or `Hero.tsx` — reuse rather than recompute).
- No status badge (finished/flagship implied by visual weight — full-color card, primary position).
- Links to `/`.

**Card 2 — Book 2 (draft)**
- Title: "The Model Layer" (working title — confirm exact public-facing title before shipping copy; `05_Book_Ideas/Second Book - Chapter Packets/00_README.md` has the canonical framing).
- Visible status badge: "In Progress" or "Early Draft" (exact wording TBD in implementation — should read honestly, not apologetically; book 1's own chapters already use a `status: 'Drafting' | 'Starter' | 'Outlined'` vocabulary, so reusing "Drafting" as the badge label keeps the site's own vocabulary consistent).
- Chapter count + word count + claim/anchor count, from `stats.json`'s existing `book2` section (already implemented: `book2.drafting_files`, `book2.chapters.total`, `book2.claims.total`, `book2.anchors.total`).
- Visually secondary treatment: muted/outlined card style rather than the full-color treatment book 1 gets — the goal is "clearly real and readable" not "clearly unfinished," so avoid anything that reads as broken or placeholder.
- Links to `/second-book`.

## Data
No new data files needed — `stats.json` already carries both books' counts (from the `build_stats.py` extension pass), and `website/src/data/book.ts` / `bookChaptersTwo.ts` already carry the titles/copy. `Books.tsx` composes existing data; it does not introduce a new source of truth.

## Discoverability
- `TopNav.tsx` gets one new link: "Books" → `/books`, alongside the existing `/read` link.
- `Catalogue.tsx` (book 1's homepage) gets one small addition — a footer or nav-adjacent line pointing to `/books` (exact placement is an implementation-time call; should not compete with the existing hero/CTA hierarchy) — so `/books` isn't an orphaned page only reachable by typing the URL.

## SEO
- `/books` is added to `website/scripts/gen-sitemap.mjs`'s output and gets a `Seo`/`JsonLd` treatment (an `ItemList` schema listing both books) — same pattern `Catalogue.tsx` already uses (`bookJsonLd`).
- Book 1's existing SEO (`/`) is untouched.
- Book 2's pages (`/second-book/*`) keep their existing `noindex` (set in the website-wiring pass) — unchanged by this work. Being linked from a public, indexed page (`/books`) does not override `noindex`; the meta tag holds regardless of how a crawler discovers the URL. This is the mechanism that makes it safe to publicly link an unreviewed manuscript from an indexed page.

## Testing
- `npm run lint` (tsc) and `npm run test` (vitest) clean, per this repo's existing convention.
- `npm run build` (production SSG) succeeds; confirm `dist/books.html` exists, contains both card links, and that `dist/second-book/*.html` still carry `noindex` unchanged.
- `grep` `dist/sitemap.xml` for `/books` (present) and `/second-book` (absent) to confirm the SEO split holds.
- Browser check (per this repo's frontend-change convention): `/books` renders both cards correctly, both links navigate correctly, `TopNav`'s new "Books" link works from both `/` and `/second-book`.
- Confirm book 1's `/` is unchanged (existing tests + a manual diff of its rendered HTML pre/post, same verification pattern used in the website-wiring pass).

## Open implementation-time decisions (deliberately left for the builder, not blocking this spec)
- Exact copy/wording for book 2's status badge and card description.
- Exact visual treatment of the "muted/secondary" card style (concrete CSS, not a new design system).
- Exact placement of the `/books` cross-link on `Catalogue.tsx`.
- Whether `Books.tsx` needs its own component subfolder or is a single-file page, matching whatever this codebase's existing convention is for a page of this size.
