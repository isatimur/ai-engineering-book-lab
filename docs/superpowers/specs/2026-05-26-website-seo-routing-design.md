# Website SEO Routing Refactor — Design Spec

**Date:** 2026-05-26
**Status:** Draft (awaiting review)
**Topic surface:** `website/` (the From Copilot to Colleague online representation)
**Scope:** Convert hash-based client-only routing into pre-rendered static HTML per chapter, concept, and map — so Google can index each as a separate page with its own meta and content.

---

## 1 · Context

The site currently uses **wouter** for client-side routing with three top-level routes (`/`, `/visual-guide`, `/read`). The Reader renders all 10 chapters in one scrollable page; chapters are deep-linked via hash fragments (`/read#book-chapter-03`). Concept and map diagrams open as in-page lightboxes — no dedicated URLs.

**The SEO problem:**
- Google indexes URLs, not hash fragments. Every chapter, concept, and map currently resolves to one of three pages — there are effectively three indexable URLs across the entire site.
- The SPA serves an empty `<div id="root">` with no per-page content in the initial HTML. Even crawlers that execute JavaScript (Googlebot does) get one set of meta tags for the whole site.
- A search for "harness engineering", "context engineering", or any chapter topic cannot rank the relevant page because there is no relevant page — only the homepage carrying all the content as a JS-rendered scroll.

**The domain is now live** at `https://fromcopilottocolleague.com/` (pointed at the Vercel project `from-copilot-to-colleague`). Without per-page URLs + indexable HTML, the domain has no SEO leverage.

---

## 2 · Goal

Make each chapter, each concept diagram, and each map a real URL with its own pre-rendered HTML, per-page meta tags, and discoverable links. Preserve the long-form scroll Reader as the immersive experience; add per-chapter pages as the SEO surface.

---

## 3 · Site shape — target

| Path | Status | What it serves |
|---|---|---|
| `/` | Existing | Catalogue (single-book spine + cinematic open + About the Lab) |
| `/visual-guide` | Existing | Three sections: overview · how-to-read · concepts grid |
| `/visual-guide/concepts/:slug` | **New** | One concept diagram — full image + caption + chapter ref + "back to all concepts" |
| `/visual-guide/maps/:slug` | **New** | One map — full image + caption + "back to visual guide" |
| `/read` | Existing (kept as immersive long-form scroll) | All 10 chapters in one continuous reader |
| `/read/:nn-slug` | **New** | One chapter — full content, EVIDENCE OF SOURCE exhibit, inline figs, EvidenceRail, prev/next chapter links |

Slug examples:
- `/read/01-the-shift`
- `/read/03-harnesses-specs-codebases`
- `/visual-guide/concepts/harness-engineering`
- `/visual-guide/maps/readers-path`

---

## 4 · Technical approach

**Library choice:**
- Migrate routing from **wouter** → **react-router-dom v6** (compatible with vite-react-ssg).
- Add **vite-react-ssg** for build-time static site generation.
- Add **react-helmet-async** for per-route head management.

**vite-react-ssg behavior:**
- At build time, the plugin crawls the React Router config, renders each route to static HTML, and writes a real `.html` file per route. Hydration happens on the client as normal.
- `<Helmet>` content (title, meta, OG) is inlined into the static HTML.
- The plugin generates a `sitemap.xml` automatically when given a list of dynamic routes.

**Why not Next.js:**
- Already evaluated and explicitly de-scoped. Vite + SSG preserves the existing 24-commit architecture, ships the SEO fix in ~1 day, and avoids a framework migration. Next.js stays available as a future option if the project needs SSR, ISR, or server-side features.

**Why not react-snap or React Helmet alone:**
- react-snap requires path-based routing first (same migration anyway) and produces lower-fidelity HTML.
- Helmet alone injects meta client-side — most crawlers see initial HTML before JS, so meta-only is partial SEO.

---

## 5 · Per-page meta — contract

Every page renders:

```tsx
<Helmet>
  <title>{specific title} — From Copilot to Colleague</title>
  <meta name="description" content={specific description} />
  <link rel="canonical" href={`https://fromcopilottocolleague.com${path}`} />
  <meta property="og:title" content={specific title} />
  <meta property="og:description" content={specific description} />
  <meta property="og:url" content={`https://fromcopilottocolleague.com${path}`} />
  <meta property="og:image" content={specific image} />
  <meta property="og:type" content={pageType} />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
```

Per-page values:

| Page | Title | Description | OG image |
|---|---|---|---|
| `/` | *From Copilot to Colleague — An Online Book* | "How AI Engineering turns models into dependable systems. An online book + visual guide built from a 693-video corpus." | `/covers/from-copilot-to-colleague.png` |
| `/visual-guide` | *Visual Guide — From Copilot to Colleague* | "64 hand-built diagrams covering the book's argument, methodology, and 18 recurring concepts." | `/diagrams/overview/spine.png` |
| `/read` | *Read — From Copilot to Colleague* | "All 10 chapters in one continuous read." | `/covers/from-copilot-to-colleague.png` |
| `/read/:nn-slug` | *{chapter.title} — From Copilot to Colleague* | `chapter.promise` (the italic subtitle line) | `/diagrams/openers/ch{nn}.png` |
| `/visual-guide/concepts/:slug` | *{concept.title} — Visual Guide* | `concept.summary` | `concept.src` |
| `/visual-guide/maps/:slug` | *{map.title} — Visual Guide* | `map.caption` | `map.src` |

`og:type`: `book` for `/`, `article` for chapters and concepts, `website` for `/visual-guide` and `/read`.

---

## 6 · Sitemap

Generate at build time: `website/public/sitemap.xml` with entries for:

- `/`
- `/visual-guide`
- `/read`
- 10 × `/read/:nn-slug`
- 18 × `/visual-guide/concepts/:slug`
- 2 × `/visual-guide/maps/:slug`

Total: **33 URLs.** Each with `<lastmod>` from `git log -1 --format=%cd` of the relevant source file (chapter markdown, concept manifest entry).

`robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://fromcopilottocolleague.com/sitemap.xml
```

---

## 7 · Cross-linking

Update internal navigation to use new URLs:

1. **Glossary drawer** (`GlossaryDrawer.tsx`) — "See full diagram →" link currently points to `/visual-guide#concept-<id>`. Update to `/visual-guide/concepts/<id>`.
2. **Visual Guide concept grid** — cards currently open a lightbox modal. Replace with `<Link>` to `/visual-guide/concepts/<id>`. Keep a small "↑ enlarge" inline action that opens the lightbox if the user wants a quick peek without leaving.
3. **Evidence Rail** — its links to source videos stay external; no change.
4. **Glossary "Appears in" chapter link** — currently `/read#book-chapter-NN`. Update to `/read/{nn}-{slug}`.
5. **Catalogue → Reader** click — keep targeting `/read` (the long-form scroll), with a side affordance "or browse chapters individually" linking to a chapter list view (which is what `/read` becomes if we choose to add it; v1 keeps the existing single-page scroll).
6. **Chapter detail page prev/next** — new component. Reads chapter index from `bookChapters.ts`.

---

## 8 · Vercel config

Current `vercel.json` rewrites all paths to `/index.html` (SPA fallback). With SSG, real HTML files exist at each route, so the rewrite must change:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false
}
```

No rewrite needed — Vercel serves the static HTML directly. `cleanUrls: true` lets `/read/01-the-shift.html` be served at `/read/01-the-shift` without extension.

---

## 9 · Slug generation

Chapter slugs derived from `bookChapters.ts` title via a `slugify()` function (lowercase, ASCII, hyphenated, max 6 words). Cached as a `slug` field on `BookChapter`:

```ts
export type BookChapter = {
  number: string;
  slug: string;           // NEW — e.g. 'the-shift'
  title: string;
  // ... rest unchanged
};

// path: `/read/${chapter.number}-${chapter.slug}`
// example: '/read/01-the-shift'
```

Slugs hand-curated, not auto-generated, to keep them short + searchable. Listed in §16 below.

Concept slugs already exist as `id` in the manifest (e.g. `harness-engineering`).
Map slugs already exist as `id` in the manifest (e.g. `readers-path`).

---

## 10 · Out of scope for v1

- **Per-chapter Open Graph image generation** (e.g. branded social cards with chapter title overlay). Uses the opener diagram as OG image — fine for v1; custom cards later.
- **Search functionality** (`/search` or in-page search). Separate workstream.
- **Reading-progress persistence**. Carried over from previous out-of-scope.
- **JSON-LD structured data** (Schema.org `Book`, `Chapter`, `Article`). Add later for richer Google snippets; not required for basic indexing.
- **AMP**. Not relevant in 2026.
- **Backlink building / off-page SEO**. Content strategy concern, not technical.
- **Analytics integration**. Add Plausible / Fathom / Vercel Analytics in a later commit; no tracking added here.

---

## 11 · Acceptance criteria

1. `npm run build` produces 33 `.html` files in `dist/` — one per URL listed in §6.
2. `curl https://fromcopilottocolleague.com/read/03-harnesses-specs-codebases` returns HTML containing the chapter's full prose (not just the SPA shell).
3. The HTML for `/read/03-harnesses-specs-codebases` contains `<title>Harnesses, Specs, and Codebases Agents Can Actually Use — From Copilot to Colleague</title>` in the `<head>`.
4. `/sitemap.xml` is reachable, valid XML, lists 33 URLs.
5. `/robots.txt` is reachable, references the sitemap URL.
6. Google Lighthouse SEO score ≥ 95 on `/`, `/read/03-...`, `/visual-guide/concepts/harness-engineering`.
7. All 33 URLs return HTTP 200.
8. Internal links (glossary drawer, catalogue → reader, etc.) target the new URLs.
9. The Reader (`/read`) still works as the long-form scroll — no regression.
10. The Visual Guide concept grid still opens a lightbox AND offers a "view full page →" link to the concept's dedicated URL.
11. Submitting the sitemap to Google Search Console returns "Success" status.
12. All existing vitest tests still pass.

---

## 12 · Risks

| Risk | Mitigation |
|---|---|
| react-router-dom + vite-react-ssg may not support all wouter patterns | Read vite-react-ssg docs first; router migration is a well-trodden path |
| Static HTML for `/read` (all-10-scroll page) may be large (~200KB+) | Acceptable — search engines handle multi-MB pages. Browsers see ~150KB gzipped which is fine. |
| Per-chapter pages duplicate content with `/read` (Google may treat as duplicates) | Set canonical URLs: chapter pages canonicalize to themselves; `/read` canonicalizes to itself. Distinct content slices justify both URLs. |
| Concept detail pages may rank above the Visual Guide grid | Desired — the grid is a hub, concept pages are entries. Use breadcrumbs to keep hub discoverable. |
| Hash routes from existing links (Twitter posts, etc.) break | Add a redirect map in vercel.json or via React Router catch-all: `/read#book-chapter-03` → preserve hash but render correctly via client-side navigation. |
| Slug changes later cause 404s for indexed URLs | Slugs hand-curated and frozen in this spec (§16). Future renames require explicit 301 redirect entries in vercel.json. |

---

## 13 · Chapter slug table — frozen

| Chapter # | Title | Slug | Final path |
|---|---|---|---|
| 01 | The Shift: From Assistant to Delegate | `the-shift` | `/read/01-the-shift` |
| 02 | Taste Still Matters When Code Gets Cheap | `taste` | `/read/02-taste` |
| 03 | Harnesses, Specs, and Codebases Agents Can Actually Use | `harnesses` | `/read/03-harnesses` |
| 04 | Evals Are the Control System | `evals` | `/read/04-evals` |
| 05 | Context Is Infrastructure | `context` | `/read/05-context` |
| 06 | Runtimes, State, and the Human Control Plane | `runtimes` | `/read/06-runtimes` |
| 07 | Security, Identity, and High-Stakes Trust | `security` | `/read/07-security` |
| 08 | Realtime and Embodied Edges | `realtime` | `/read/08-realtime` |
| 09 | The AI-Native Organization | `ai-native-org` | `/read/09-ai-native-org` |
| 10 | What Endures | `what-endures` | `/read/10-what-endures` |

Single-word slugs where possible (search-friendly + memorable). Frozen — do not change without a 301 redirect plan.

---

## 14 · Build sequence (orientation — the plan details)

1. Add dependencies (`react-router-dom`, `vite-react-ssg`, `react-helmet-async`); remove `wouter`.
2. Migrate router: replace `router.tsx` (wouter) with React Router v6 config; verify existing 3 routes still render.
3. Add `slug` field to `BookChapter`; populate from §13 table.
4. Build `ChapterDetail` page component at `/read/:slug`. Reuses `ChapterArticle` + EVIDENCE OF SOURCE exhibit + EvidenceRail. Adds prev/next nav.
5. Build `ConceptDetail` page component at `/visual-guide/concepts/:slug`. Full diagram + caption + chapter back-link + breadcrumb.
6. Build `MapDetail` page component at `/visual-guide/maps/:slug`.
7. Set up vite-react-ssg config + generate route list.
8. Add `react-helmet-async` provider; wire per-page meta on all 6 page types.
9. Generate sitemap.xml + robots.txt from manifest + bookChapters at build time.
10. Update Vercel config: drop SPA rewrite, enable cleanUrls.
11. Update internal links: GlossaryDrawer, Visual Guide grid, ChapterArticle, Catalogue.
12. Build, smoke-test all 33 URLs, run Lighthouse, run sitemap validator.
13. Push to main, verify Vercel auto-deploy, submit sitemap to Google Search Console.

---

## 15 · Open questions

- **Whether to set up Google Search Console immediately or in a follow-up.** Spec assumes follow-up; verification meta tag can be added when ready. Plan includes a placeholder commented in `index.html`.
- **Whether to add JSON-LD now or defer.** Spec defers (§10); fallback to standard OG is enough for basic indexing. Worth adding in v2 for rich snippets.
- **Whether `/read` should remain the single-scroll OR become a chapter index that links to each chapter detail.** Spec keeps single-scroll (preserves the immersive long-form experience). A chapter-index alternative version of `/read` is a v2 possibility.
