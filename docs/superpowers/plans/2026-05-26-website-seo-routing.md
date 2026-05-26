# Website SEO Routing Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert client-only routing to pre-rendered static HTML per chapter, concept, and map. Make `https://fromcopilottocolleague.com/` indexable per-page by Google.

**Architecture:** Replace wouter with react-router-dom v6. Add vite-react-ssg for build-time SSG. Add react-helmet-async for per-route meta. Each of 33 URLs gets a real `.html` file in `dist/` with route-specific content + meta.

**Tech Stack:** React 19, TypeScript strict, Vite 7, react-router-dom v6 (new), vite-react-ssg (new), react-helmet-async (new). Removes: wouter.

**Reference spec:** `docs/superpowers/specs/2026-05-26-website-seo-routing-design.md`.

**Commit policy:** Local commits on `feat/website-seo` branch. NO AI attribution. NO `git push` without explicit user approval. Atomic commits per task.

**Testing approach:** Existing vitest tests must stay green. Add 1 new test file: chapter slug + URL builders. Build-output assertion tests verify that each route's HTML contains the expected meta tag and chapter content. Manual: Lighthouse SEO check on 3 representative URLs.

---

## Phase 0 — Branch + baseline

### Task 0: Branch + baseline

**Files:** none.

- [ ] **Step 1: Create branch from main**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git checkout main
git pull
git checkout -b feat/website-seo
git log -1 --oneline
```

- [ ] **Step 2: Confirm baseline build + tests**

```bash
cd website
npm install --no-audit --no-fund
npm run build
npm test
```

Expected: build succeeds, 16/16 tests pass.

---

## Phase 1 — Router migration

### Task 1: Swap wouter for react-router-dom

**Files:**
- Modify: `website/package.json`

- [ ] **Step 1: Install + remove**

```bash
cd website
npm install react-router-dom@^6.30.0
npm uninstall wouter
```

- [ ] **Step 2: Confirm**

```bash
node -p "require('./package.json').dependencies['react-router-dom']"
node -p "require('./package.json').dependencies.wouter || 'removed'"
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(website): swap wouter for react-router-dom v6"
```

### Task 2: Migrate router config

**Files:**
- Modify: `website/src/router.tsx`
- Modify: `website/src/components/nav/TopNav.tsx`
- Modify: `website/src/pages/Reader.tsx`
- Modify: `website/src/pages/Catalogue.tsx`
- Modify: `website/src/pages/VisualGuide.tsx`

- [ ] **Step 1: Rewrite router.tsx with React Router v6**

```tsx
// website/src/router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Catalogue } from './pages/Catalogue';
import { VisualGuide } from './pages/VisualGuide';
import { Reader } from './pages/Reader';

export const router = createBrowserRouter([
  { path: '/', element: <Catalogue /> },
  { path: '/visual-guide', element: <VisualGuide /> },
  { path: '/read', element: <Reader /> },
  // chapter / concept / map detail routes added in Tasks 4-6
]);

export const Router = () => <RouterProvider router={router} />;
```

- [ ] **Step 2: Replace wouter imports across the codebase**

```bash
cd website
grep -rln "from 'wouter'" src/
```

For each match:
- `useLocation` (wouter, returns tuple) → `useNavigate` from `react-router-dom`
- `Link` from wouter → `Link` from `react-router-dom`

Example for `Reader.tsx`:

```ts
// before
import { useLocation } from 'wouter';
const [, setLocation] = useLocation();
// in JSX: onClick={() => setLocation('/')}

// after
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
// in JSX: onClick={() => navigate('/')}
```

Common files needing edits:
- `src/components/nav/TopNav.tsx`
- `src/pages/Reader.tsx`
- `src/pages/Catalogue.tsx`
- `src/pages/VisualGuide.tsx` — replace `useLocation` (wouter) with React Router's `useLocation` (note: same name, different return type; React Router returns `{ pathname, search, hash }`)

- [ ] **Step 3: Build + dev smoke test**

```bash
npm run build
npm run dev -- --port 3030 &
sleep 3
for p in / /visual-guide /read; do
  curl -s -o /dev/null -w "$p HTTP %{http_code}\n" "http://localhost:3030$p"
done
kill %1
```

Expected: all 3 routes 200.

- [ ] **Step 4: Commit**

```bash
git add src/router.tsx src/components/nav/TopNav.tsx src/pages/Reader.tsx src/pages/Catalogue.tsx src/pages/VisualGuide.tsx
git commit -m "refactor(website): migrate router from wouter to react-router-dom v6"
```

---

## Phase 2 — Slug data + per-chapter routes

### Task 3: Add slug field to BookChapter

**Files:**
- Modify: `website/src/data/bookChapters.ts`
- Create: `website/src/data/bookChapters.test.ts`

- [ ] **Step 1: Add `slug` to type + entries**

Per spec §13. Edit `website/src/data/bookChapters.ts`:

```ts
export type BookChapter = {
  number: string;
  slug: string;
  title: string;
  promise: string;
  status: ChapterStatus;
  wordCount: number;
  content: string;
};

export const chapters: BookChapter[] = [
  { number: '01', slug: 'the-shift',     /* ... */ },
  { number: '02', slug: 'taste',         /* ... */ },
  { number: '03', slug: 'harnesses',     /* ... */ },
  { number: '04', slug: 'evals',         /* ... */ },
  { number: '05', slug: 'context',       /* ... */ },
  { number: '06', slug: 'runtimes',      /* ... */ },
  { number: '07', slug: 'security',      /* ... */ },
  { number: '08', slug: 'realtime',      /* ... */ },
  { number: '09', slug: 'ai-native-org', /* ... */ },
  { number: '10', slug: 'what-endures',  /* ... */ },
];

export const chapterPath = (c: BookChapter) => `/read/${c.number}-${c.slug}`;

export const chapterBySlug = (slug: string): BookChapter | undefined =>
  chapters.find((c) => `${c.number}-${c.slug}` === slug);
```

- [ ] **Step 2: Write tests**

```ts
// website/src/data/bookChapters.test.ts
import { describe, it, expect } from 'vitest';
import { chapters, chapterPath, chapterBySlug } from './bookChapters';

describe('chapters', () => {
  it('has 10 chapters', () => expect(chapters).toHaveLength(10));

  it('every chapter has a slug', () => {
    for (const c of chapters) {
      expect(c.slug).toBeTruthy();
      expect(c.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('every slug is unique', () => {
    const slugs = chapters.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('chapterPath builds the canonical URL', () => {
    expect(chapterPath(chapters[0])).toBe('/read/01-the-shift');
    expect(chapterPath(chapters[2])).toBe('/read/03-harnesses');
  });

  it('chapterBySlug round-trips', () => {
    for (const c of chapters) {
      expect(chapterBySlug(`${c.number}-${c.slug}`)?.number).toBe(c.number);
    }
  });
});
```

- [ ] **Step 3: Run tests + commit**

```bash
npm test
git add src/data/bookChapters.ts src/data/bookChapters.test.ts
git commit -m "feat(website): add slug field + chapterPath/chapterBySlug helpers to BookChapter"
```

### Task 4: Build ChapterDetail page + route

**Files:**
- Create: `website/src/pages/ChapterDetail.tsx`
- Create: `website/src/components/chapter/ChapterNav.tsx`
- Modify: `website/src/router.tsx`

- [ ] **Step 1: ChapterNav (prev/next)**

```tsx
// website/src/components/chapter/ChapterNav.tsx
import { Link } from 'react-router-dom';
import { chapters, chapterPath, type BookChapter } from '../../data/bookChapters';

export const ChapterNav = ({ chapter }: { chapter: BookChapter }) => {
  const index = chapters.findIndex((c) => c.number === chapter.number);
  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;

  return (
    <nav className="border-t border-[var(--color-border)] mt-16 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {prev ? (
        <Link to={chapterPath(prev)} className="block border border-[var(--color-border)] p-6 hover:bg-[var(--color-ink)]/5 transition-colors">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-2">← Previous · Chapter {prev.number}</div>
          <div className="font-serif text-xl italic">{prev.title}</div>
        </Link>
      ) : <div className="block p-6" />}
      {next ? (
        <Link to={chapterPath(next)} className="block border border-[var(--color-border)] p-6 hover:bg-[var(--color-ink)]/5 transition-colors text-right">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-2">Next · Chapter {next.number} →</div>
          <div className="font-serif text-xl italic">{next.title}</div>
        </Link>
      ) : <div className="block p-6" />}
    </nav>
  );
};
```

- [ ] **Step 2: ChapterDetail page**

```tsx
// website/src/pages/ChapterDetail.tsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useScroll } from 'motion/react';
import { chapterBySlug, chapterPath } from '../data/bookChapters';
import { opener } from '../lib/manifest';
import { TopNav } from '../components/nav/TopNav';
import { ChapterArticle } from '../components/chapter/ChapterArticle';
import { ChapterNav } from '../components/chapter/ChapterNav';
import { GlossaryDrawer } from '../components/drawers/GlossaryDrawer';
import { GlossaryContext } from '../lib/glossaryContext';
import { SettingsModal, type Settings } from '../components/modals/SettingsModal';

export const ChapterDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const chapter = slug ? chapterBySlug(slug) : undefined;
  const { scrollYProgress } = useScroll();
  const [glossaryTermId, setGlossaryTermId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    theme: 'sepia', typography: 'serif', fontSize: 'md', lineSpacing: 'relaxed', sound: 'off',
  });

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Chapter not found</h1>
          <Link to="/read" className="underline">← All chapters</Link>
        </div>
      </div>
    );
  }

  const op = opener(chapter.number);
  const canonical = `https://fromcopilottocolleague.com${chapterPath(chapter)}`;
  const ogImage = op
    ? `https://fromcopilottocolleague.com${op.src}`
    : 'https://fromcopilottocolleague.com/covers/from-copilot-to-colleague.png';

  return (
    <>
      <Helmet>
        <title>{chapter.title} — From Copilot to Colleague</title>
        <meta name="description" content={chapter.promise} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={chapter.title} />
        <meta property="og:description" content={chapter.promise} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <GlossaryContext.Provider value={{ open: setGlossaryTermId }}>
        <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
          <TopNav
            progress={scrollYProgress}
            onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
            onBackToCatalogue={() => navigate('/')}
          />
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            settings={settings}
            updateSettings={(s) => setSettings((p) => ({ ...p, ...s }))}
          />
          <main className="relative pt-14">
            {op ? (
              <div className="w-full py-16 lg:py-24 px-6 flex flex-col items-center border-b border-[var(--color-border)]">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-6 text-center">
                  EVIDENCE OF SOURCE · CHAPTER {chapter.number}
                </div>
                <figure className="w-full max-w-[1100px] mx-auto bg-[#1f1f20] rounded-md shadow-2xl overflow-hidden border border-[var(--color-border)]">
                  <img
                    src={op.src}
                    alt={`Chapter ${chapter.number} — ${op.title}`}
                    className="block w-full h-auto p-6 lg:p-10"
                    loading="lazy"
                  />
                  <figcaption className="border-t border-white/15 px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-white/60">
                    FIG. {chapter.number} · {op.title}
                  </figcaption>
                </figure>
              </div>
            ) : null}
            <article className="max-w-3xl mx-auto p-8 md:p-12 lg:p-16">
              <ChapterArticle chapter={chapter} />
              <ChapterNav chapter={chapter} />
            </article>
          </main>
          <GlossaryDrawer termId={glossaryTermId} onClose={() => setGlossaryTermId(null)} />
        </div>
      </GlossaryContext.Provider>
    </>
  );
};
```

- [ ] **Step 3: Wire route**

```ts
// website/src/router.tsx — add to routes array
import { ChapterDetail } from './pages/ChapterDetail';
// ...
{ path: '/read/:slug', element: <ChapterDetail /> },
```

- [ ] **Step 4: Build + smoke + commit**

```bash
npm run build
npm run dev -- --port 3030 &
sleep 3
curl -s -o /dev/null -w "/read/03-harnesses HTTP %{http_code}\n" "http://localhost:3030/read/03-harnesses"
kill %1
git add src/pages/ChapterDetail.tsx src/components/chapter/ChapterNav.tsx src/router.tsx
git commit -m "feat(website): per-chapter route /read/:slug with prev/next nav"
```

### Task 5: Build ConceptDetail page + route

**Files:**
- Create: `website/src/pages/ConceptDetail.tsx`
- Modify: `website/src/router.tsx`

- [ ] **Step 1: ConceptDetail**

```tsx
// website/src/pages/ConceptDetail.tsx
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { conceptById, manifest } from '../lib/manifest';
import { chapters, chapterPath } from '../data/bookChapters';

export const ConceptDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const concept = slug ? conceptById(slug) : undefined;

  if (!concept) {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Concept not found</h1>
          <Link to="/visual-guide#concepts" className="underline">← All concepts</Link>
        </div>
      </div>
    );
  }

  const chapter = concept.chapter ? chapters.find((c) => c.number === concept.chapter) : null;
  const canonical = `https://fromcopilottocolleague.com/visual-guide/concepts/${concept.id}`;
  const ogImage = `https://fromcopilottocolleague.com${concept.src}`;
  const related = chapter
    ? manifest.concepts.filter((c) => c.chapter === chapter.number && c.id !== concept.id).slice(0, 3)
    : [];

  return (
    <>
      <Helmet>
        <title>{concept.title} — Visual Guide · From Copilot to Colleague</title>
        <meta name="description" content={concept.summary} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${concept.title} — From Copilot to Colleague`} />
        <meta property="og:description" content={concept.summary} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="min-h-screen bg-[#F8F6F0] text-[#1F1D1B] font-serif">
        <header className="border-b border-black/10 px-6 lg:px-12 py-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
          <Link to="/" className="hover:opacity-60">← Catalogue</Link>
          <span>From Copilot to Colleague · Visual Guide · Concept</span>
          <Link to="/visual-guide#concepts" className="hover:opacity-60">All concepts →</Link>
        </header>
        <main className="px-6 lg:px-12 py-16 max-w-5xl mx-auto">
          <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-widest text-black/60 mb-6">
            <Link to="/visual-guide" className="hover:opacity-60">Visual Guide</Link>
            <span className="mx-2">/</span>
            <Link to="/visual-guide#concepts" className="hover:opacity-60">Concepts</Link>
            <span className="mx-2">/</span>
            <span>{concept.title}</span>
          </nav>
          <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-3">{concept.title}</h1>
          {chapter ? (
            <p className="font-mono text-[10px] uppercase tracking-widest text-black/60 mb-12">
              Anchored in Chapter {chapter.number} · <Link to={chapterPath(chapter)} className="underline">{chapter.title}</Link>
            </p>
          ) : null}
          <figure className="mb-16">
            <div className="border border-black/10 bg-white">
              <img src={concept.src} alt={concept.title} className="block w-full h-auto" />
            </div>
            <figcaption className="font-sans text-lg leading-relaxed mt-8 max-w-3xl">{concept.summary}</figcaption>
          </figure>
          {related.length > 0 ? (
            <section className="border-t border-black/10 pt-12">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-black/60 mb-6">Related concepts in this chapter</h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <li key={r.id} className="border border-black/10 bg-white p-5">
                    <Link to={`/visual-guide/concepts/${r.id}`} className="block">
                      <h3 className="font-serif text-lg mb-2">{r.title}</h3>
                      <p className="font-sans text-sm opacity-80">{r.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </main>
      </div>
    </>
  );
};
```

- [ ] **Step 2: Wire route**

```ts
// website/src/router.tsx
import { ConceptDetail } from './pages/ConceptDetail';
// { path: '/visual-guide/concepts/:slug', element: <ConceptDetail /> },
```

- [ ] **Step 3: Build + smoke + commit**

```bash
npm run build
git add src/pages/ConceptDetail.tsx src/router.tsx
git commit -m "feat(website): per-concept route /visual-guide/concepts/:slug with breadcrumb + related"
```

### Task 6: Build MapDetail page + route

**Files:**
- Create: `website/src/pages/MapDetail.tsx`
- Modify: `website/src/router.tsx`

- [ ] **Step 1: MapDetail**

```tsx
// website/src/pages/MapDetail.tsx
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { manifest } from '../lib/manifest';

export const MapDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const map = slug ? manifest.maps.find((m) => m.id === slug) : undefined;

  if (!map) {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Map not found</h1>
          <Link to="/visual-guide" className="underline">← Visual Guide</Link>
        </div>
      </div>
    );
  }

  const canonical = `https://fromcopilottocolleague.com/visual-guide/maps/${map.id}`;
  const ogImage = `https://fromcopilottocolleague.com${map.src}`;

  return (
    <>
      <Helmet>
        <title>{map.title} — Visual Guide · From Copilot to Colleague</title>
        <meta name="description" content={map.caption} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${map.title} — From Copilot to Colleague`} />
        <meta property="og:description" content={map.caption} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="min-h-screen bg-[#F8F6F0] text-[#1F1D1B] font-serif">
        <header className="border-b border-black/10 px-6 lg:px-12 py-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
          <Link to="/" className="hover:opacity-60">← Catalogue</Link>
          <span>From Copilot to Colleague · Visual Guide · Map</span>
          <Link to="/visual-guide" className="hover:opacity-60">Visual Guide →</Link>
        </header>
        <main className="px-6 lg:px-12 py-16 max-w-5xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-12">{map.title}</h1>
          <figure>
            <div className="border border-black/10 bg-white">
              <img src={map.src} alt={map.title} className="block w-full h-auto" />
            </div>
            <figcaption className="font-sans text-lg leading-relaxed mt-8 max-w-3xl">{map.caption}</figcaption>
          </figure>
        </main>
      </div>
    </>
  );
};
```

- [ ] **Step 2: Wire + commit**

```ts
// router.tsx
import { MapDetail } from './pages/MapDetail';
// { path: '/visual-guide/maps/:slug', element: <MapDetail /> },
```

```bash
npm run build
git add src/pages/MapDetail.tsx src/router.tsx
git commit -m "feat(website): per-map route /visual-guide/maps/:slug"
```

---

## Phase 3 — Per-page meta on existing pages

### Task 7: Add react-helmet-async

**Files:**
- Modify: `website/package.json`
- Modify: `website/src/App.tsx`
- Modify: `website/src/pages/Catalogue.tsx`
- Modify: `website/src/pages/VisualGuide.tsx`
- Modify: `website/src/pages/Reader.tsx`
- Modify: `website/index.html`

- [ ] **Step 1: Install**

```bash
cd website
npm install react-helmet-async@^2.0.5
```

- [ ] **Step 2: Wrap router in HelmetProvider**

```tsx
// website/src/App.tsx
import { HelmetProvider } from 'react-helmet-async';
import { Router } from './router';

export default function App() {
  return (
    <HelmetProvider>
      <Router />
    </HelmetProvider>
  );
}
```

- [ ] **Step 3: Add Helmet block to each existing page**

Inside the `return` of `Catalogue.tsx`:

```tsx
import { Helmet } from 'react-helmet-async';
// ...
<Helmet>
  <title>From Copilot to Colleague — An Online Book</title>
  <meta name="description" content="How AI Engineering turns models into dependable systems. An online book + visual guide built from a 693-video corpus." />
  <link rel="canonical" href="https://fromcopilottocolleague.com/" />
  <meta property="og:title" content="From Copilot to Colleague" />
  <meta property="og:description" content="How AI Engineering turns models into dependable systems." />
  <meta property="og:url" content="https://fromcopilottocolleague.com/" />
  <meta property="og:image" content="https://fromcopilottocolleague.com/covers/from-copilot-to-colleague.png" />
  <meta property="og:type" content="book" />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
```

`VisualGuide.tsx`:

```tsx
<Helmet>
  <title>Visual Guide — From Copilot to Colleague</title>
  <meta name="description" content="64 hand-built diagrams covering the book's argument, methodology, and 18 recurring concepts." />
  <link rel="canonical" href="https://fromcopilottocolleague.com/visual-guide" />
  <meta property="og:title" content="Visual Guide — From Copilot to Colleague" />
  <meta property="og:description" content="64 hand-built diagrams covering the book's argument, methodology, and concepts." />
  <meta property="og:url" content="https://fromcopilottocolleague.com/visual-guide" />
  <meta property="og:image" content="https://fromcopilottocolleague.com/diagrams/overview/spine.png" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
```

`Reader.tsx`:

```tsx
<Helmet>
  <title>Read — From Copilot to Colleague</title>
  <meta name="description" content="All 10 chapters of From Copilot to Colleague in one continuous read." />
  <link rel="canonical" href="https://fromcopilottocolleague.com/read" />
  <meta property="og:title" content="Read — From Copilot to Colleague" />
  <meta property="og:description" content="All 10 chapters in one continuous read." />
  <meta property="og:url" content="https://fromcopilottocolleague.com/read" />
  <meta property="og:image" content="https://fromcopilottocolleague.com/covers/from-copilot-to-colleague.png" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
```

- [ ] **Step 4: Strip static meta from index.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- title + meta injected per-route by Helmet (SSG-time) -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Build + commit**

```bash
npm run build
git add package.json package-lock.json src/App.tsx src/pages/Catalogue.tsx src/pages/VisualGuide.tsx src/pages/Reader.tsx index.html
git commit -m "feat(website): per-page meta via react-helmet-async; strip static meta from index.html"
```

---

## Phase 4 — Static Site Generation

### Task 8: Add vite-react-ssg

**Files:**
- Modify: `website/package.json`
- Modify: `website/src/main.tsx`
- Modify: `website/src/router.tsx`

- [ ] **Step 1: Install**

```bash
cd website
npm install vite-react-ssg@^0.7
```

- [ ] **Step 2: Read latest integration docs**

Check `node_modules/vite-react-ssg/README.md` for the v0.7 API. Pattern at time of writing:

1. Routes exposed via `routes` export.
2. `main.tsx` uses `ViteReactSSG` entry instead of `createRoot`.
3. Build runs `vite-react-ssg build`.

- [ ] **Step 3: Convert router to expose routes**

```tsx
// website/src/router.tsx
import type { RouteRecord } from 'vite-react-ssg';
import { Catalogue } from './pages/Catalogue';
import { VisualGuide } from './pages/VisualGuide';
import { Reader } from './pages/Reader';
import { ChapterDetail } from './pages/ChapterDetail';
import { ConceptDetail } from './pages/ConceptDetail';
import { MapDetail } from './pages/MapDetail';
import { chapters } from './data/bookChapters';
import { manifest } from './lib/manifest';

export const routes: RouteRecord[] = [
  { path: '/', element: <Catalogue />, entry: 'src/pages/Catalogue.tsx' },
  { path: '/visual-guide', element: <VisualGuide />, entry: 'src/pages/VisualGuide.tsx' },
  { path: '/read', element: <Reader />, entry: 'src/pages/Reader.tsx' },
  {
    path: '/read/:slug',
    element: <ChapterDetail />,
    entry: 'src/pages/ChapterDetail.tsx',
    getStaticPaths: () => chapters.map((c) => `${c.number}-${c.slug}`),
  },
  {
    path: '/visual-guide/concepts/:slug',
    element: <ConceptDetail />,
    entry: 'src/pages/ConceptDetail.tsx',
    getStaticPaths: () => manifest.concepts.map((c) => c.id),
  },
  {
    path: '/visual-guide/maps/:slug',
    element: <MapDetail />,
    entry: 'src/pages/MapDetail.tsx',
    getStaticPaths: () => manifest.maps.map((m) => m.id),
  },
];
```

- [ ] **Step 4: Update main.tsx**

```tsx
// website/src/main.tsx
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './router';
import './index.css';

export const createRoot = ViteReactSSG({ routes });
```

(The wrapping `<HelmetProvider>` continues to live in `App.tsx` — see vite-react-ssg docs for any required adjustments to head-context wiring.)

- [ ] **Step 5: Update build script**

```json
// website/package.json
"build": "vite-react-ssg build",
"build:client": "vite build"
```

- [ ] **Step 6: Build**

```bash
npm run build
find dist -name 'index.html' | wc -l
```

Expected: 33 `index.html` files (one per route).

- [ ] **Step 7: Per-route HTML assertions**

```bash
grep -o '<title>[^<]*</title>' dist/index.html
grep -o '<title>[^<]*</title>' dist/read/03-harnesses/index.html
grep -o '<title>[^<]*</title>' dist/visual-guide/concepts/harness-engineering/index.html
grep -c "harnesses-specs\|EVIDENCE OF SOURCE\|Harness Engineering" dist/read/03-harnesses/index.html
```

Each title must be route-specific. The chapter HTML must contain the prose text inline (not just a JS shell).

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json src/main.tsx src/router.tsx
git commit -m "feat(website): vite-react-ssg pre-renders 33 routes to static HTML with per-route meta"
```

---

## Phase 5 — Sitemap + robots + Vercel config

### Task 9: Generate sitemap.xml + robots.txt

**Files:**
- Create: `website/scripts/build-sitemap.mjs`
- Create: `website/public/robots.txt`
- Modify: `website/package.json`

- [ ] **Step 1: Sitemap builder**

```js
// website/scripts/build-sitemap.mjs
// Generates sitemap.xml from bookChapters + diagram-manifest.
// Uses execFileSync (not exec) to avoid shell injection per project policy.

import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteRoot = resolve(__dirname, '..');
const distDir = join(websiteRoot, 'dist');

const BASE = 'https://fromcopilottocolleague.com';

function lastmodFor(path) {
  // execFileSync (no shell): args are passed as an argv array, so the
  // `path` argument cannot inject shell metacharacters even if it contained any.
  try {
    const out = execFileSync(
      'git',
      ['-C', websiteRoot, 'log', '-1', '--format=%cI', '--', path],
      { stdio: ['ignore', 'pipe', 'ignore'] },
    );
    return out.toString().trim() || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

async function main() {
  const manifestRaw = await readFile(join(websiteRoot, 'src/data/diagram-manifest.json'), 'utf8');
  const manifest = JSON.parse(manifestRaw);

  const chaptersRaw = await readFile(join(websiteRoot, 'src/data/bookChapters.ts'), 'utf8');
  const chapterEntries = [...chaptersRaw.matchAll(/number: '(\d+)',\s+slug: '([^']+)'/g)]
    .map((m) => ({ number: m[1], slug: m[2] }));

  if (chapterEntries.length !== 10) {
    console.error(`[sitemap] expected 10 chapters, got ${chapterEntries.length}`);
    process.exit(1);
  }

  const urls = [
    { loc: `${BASE}/`,             lastmod: lastmodFor('src/pages/Catalogue.tsx'),   changefreq: 'monthly', priority: '1.0' },
    { loc: `${BASE}/visual-guide`, lastmod: lastmodFor('src/pages/VisualGuide.tsx'), changefreq: 'monthly', priority: '0.8' },
    { loc: `${BASE}/read`,         lastmod: lastmodFor('src/pages/Reader.tsx'),      changefreq: 'monthly', priority: '0.9' },
  ];

  for (const c of chapterEntries) {
    urls.push({
      loc: `${BASE}/read/${c.number}-${c.slug}`,
      lastmod: lastmodFor(`src/content/chapter-${c.number}.md`),
      changefreq: 'monthly', priority: '0.9',
    });
  }
  for (const concept of manifest.concepts) {
    urls.push({
      loc: `${BASE}/visual-guide/concepts/${concept.id}`,
      lastmod: lastmodFor('src/data/diagram-manifest.json'),
      changefreq: 'monthly', priority: '0.7',
    });
  }
  for (const map of manifest.maps) {
    urls.push({
      loc: `${BASE}/visual-guide/maps/${map.id}`,
      lastmod: lastmodFor('src/data/diagram-manifest.json'),
      changefreq: 'monthly', priority: '0.6',
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  await mkdir(join(websiteRoot, 'public'), { recursive: true });
  await writeFile(join(websiteRoot, 'public', 'sitemap.xml'), xml);
  if (existsSync(distDir)) {
    await writeFile(join(distDir, 'sitemap.xml'), xml);
  }

  console.log(`[sitemap] wrote ${urls.length} URLs`);
}

main().catch((err) => {
  console.error('[sitemap][fatal]', err);
  process.exit(1);
});
```

- [ ] **Step 2: robots.txt**

```
# website/public/robots.txt
User-agent: *
Allow: /

Sitemap: https://fromcopilottocolleague.com/sitemap.xml
```

- [ ] **Step 3: Wire to build**

```json
// website/package.json scripts
"build": "vite-react-ssg build && node scripts/build-sitemap.mjs",
"sitemap": "node scripts/build-sitemap.mjs"
```

- [ ] **Step 4: Verify**

```bash
npm run build
head -25 dist/sitemap.xml
cat dist/robots.txt
```

- [ ] **Step 5: Commit**

```bash
git add scripts/build-sitemap.mjs package.json public/robots.txt
git commit -m "feat(website): generate sitemap.xml + robots.txt at build time (33 URLs)"
```

### Task 10: Update Vercel config + legacy hash redirect

**Files:**
- Modify: `website/vercel.json`
- Modify: `website/index.html`

- [ ] **Step 1: Replace SPA rewrite**

```json
// website/vercel.json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false
}
```

Drop the `"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]` line.

- [ ] **Step 2: Legacy hash redirect (in index.html body, runs before React mounts)**

```html
<script>
  (function () {
    var h = window.location.hash;
    var p = window.location.pathname;
    if (p === '/read' && /^#book-chapter-(\d{2})$/.test(h)) {
      var num = h.match(/^#book-chapter-(\d{2})$/)[1];
      var map = {
        '01':'the-shift','02':'taste','03':'harnesses','04':'evals','05':'context',
        '06':'runtimes','07':'security','08':'realtime','09':'ai-native-org','10':'what-endures'
      };
      var slug = map[num];
      if (slug) window.location.replace('/read/' + num + '-' + slug);
    }
  })();
</script>
```

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add vercel.json index.html
git commit -m "fix(website): static HTML routes (drop SPA rewrite) + redirect legacy hash links"
```

---

## Phase 6 — Internal link updates

### Task 11: Update navigation to new URLs

**Files:**
- Modify: `website/src/components/drawers/GlossaryDrawer.tsx`
- Modify: `website/src/pages/VisualGuide.tsx`

- [ ] **Step 1: GlossaryDrawer — chapter ref + concept link**

```tsx
import { Link } from 'react-router-dom';
import { chapters, chapterPath } from '../../data/bookChapters';
// ...
// inside the JSX where the diagram link lives:
<Link to={`/visual-guide/concepts/${term.id}`}>See full diagram on the Visual Guide →</Link>
// inside the chapter reference branch:
const chapter = term.chapterRef ? chapters.find((c) => c.number === term.chapterRef) : null;
// ...
<Link to={chapterPath(chapter)} onClick={onClose}>Chapter {chapter.number} — {chapter.title}</Link>
```

- [ ] **Step 2: Visual Guide concept grid — replace lightbox button with Link**

```tsx
import { Link } from 'react-router-dom';
// ...
{manifest.concepts.map((c) => (
  <Link
    key={c.id}
    to={`/visual-guide/concepts/${c.id}`}
    id={`concept-${c.id}`}
    className="text-left border border-black/10 bg-white hover:shadow-xl transition-shadow group block"
  >
    {/* existing card body */}
  </Link>
))}
```

Remove the `lightbox` state if it's now unused.

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/components/drawers/GlossaryDrawer.tsx src/pages/VisualGuide.tsx
git commit -m "feat(website): update internal links to new per-chapter and per-concept URLs"
```

---

## Phase 7 — Final QA

### Task 12: Lighthouse + smoke test + deploy

**Files:** none (manual verification + deploy).

- [ ] **Step 1: Build + tests green**

```bash
cd website
npm run build
npm test
```

- [ ] **Step 2: Verify 33 HTML files**

```bash
find dist -name 'index.html' -type f | wc -l               # 33
find dist/read -mindepth 2 -name 'index.html' | wc -l     # 10
find dist/visual-guide/concepts -name 'index.html' | wc -l # 18
find dist/visual-guide/maps -name 'index.html' | wc -l     # 2
```

- [ ] **Step 3: Per-route HTML assertions**

```bash
for path in / /visual-guide /read /read/03-harnesses /visual-guide/concepts/harness-engineering /visual-guide/maps/readers-path; do
  file=$(echo "dist${path}/index.html" | sed 's|//|/|g')
  echo "=== $path ==="
  grep -o '<title>[^<]*</title>' "$file" || echo "(no title)"
done
```

Each must print a unique, route-appropriate title.

- [ ] **Step 4: Local Lighthouse**

```bash
npx serve dist -p 4000 &
sleep 2
npx lighthouse http://localhost:4000/ --only-categories=seo --output=json --output-path=./lh-root.json --quiet
npx lighthouse http://localhost:4000/read/03-harnesses --only-categories=seo --output=json --output-path=./lh-chapter.json --quiet
npx lighthouse http://localhost:4000/visual-guide/concepts/harness-engineering --only-categories=seo --output=json --output-path=./lh-concept.json --quiet
kill %1
node -e "for (const f of ['lh-root','lh-chapter','lh-concept']) { const d=require('./'+f+'.json'); console.log(f, Math.round(d.categories.seo.score*100)); }"
rm lh-root.json lh-chapter.json lh-concept.json
```

Expected: each ≥ 95.

- [ ] **Step 5: Sitemap validation**

```bash
xmllint --noout dist/sitemap.xml && echo "sitemap valid"
grep -c '<url>' dist/sitemap.xml  # 33
```

- [ ] **Step 6: Push branch (user-authorized push only)**

```bash
git push origin feat/website-seo
```

If the user is ready to ship:
```bash
# either merge to main via PR, or fast-forward locally
git checkout main && git merge --ff-only feat/website-seo && git push origin main
```

- [ ] **Step 7: Deploy to Vercel**

If GitHub Actions VERCEL_TOKEN is set and the workflow is wired:

```bash
gh workflow run website-deploy.yml -R isatimur/ai-engineering-book-lab
gh run watch -R isatimur/ai-engineering-book-lab
```

Otherwise manual:

```bash
cd website
vercel --prod --yes
```

- [ ] **Step 8: Production smoke**

```bash
for path in / /visual-guide /read /read/03-harnesses /visual-guide/concepts/harness-engineering /visual-guide/maps/readers-path /sitemap.xml /robots.txt; do
  printf "%-55s " "$path"
  curl -s -o /dev/null -w "HTTP %{http_code}\n" "https://fromcopilottocolleague.com$path"
done
```

All must return 200.

- [ ] **Step 9: Google Search Console (manual)**

User goes to https://search.google.com/search-console:
1. Add property `fromcopilottocolleague.com`
2. Verify ownership via DNS TXT record OR meta tag
3. Submit sitemap: `https://fromcopilottocolleague.com/sitemap.xml`
4. Expected status: Success; Google starts crawling within hours

- [ ] **Step 10: Legacy hash redirect test (real browser)**

Navigate to `https://fromcopilottocolleague.com/read#book-chapter-03` in a real browser — should immediately redirect to `/read/03-harnesses`.

---

## Out of scope (do NOT do in this plan)

Per spec §10:
- Per-chapter custom Open Graph image generation
- Search functionality
- Reading-progress persistence
- JSON-LD structured data
- AMP
- Backlink building / off-page SEO
- Analytics integration

If any come up mid-execution, surface to the user; do not silently expand scope.

---

## Recovery notes

- If `vite-react-ssg` fails to pre-render a route due to client-only code (`window` references in render path): wrap in `useEffect` or guard with `typeof window !== 'undefined'`.
- If `react-helmet-async` doesn't inject meta into SSG output: confirm `HelmetProvider` wraps the routes correctly; older versions need a context shim per vite-react-ssg docs.
- If the sitemap script's chapter regex doesn't match: switch to importing `bookChapters.ts` via `vite-node` / `tsx`. The regex is the pragmatic fast path.
- If Vercel still serves the SPA fallback after the config change: clear the build cache (`vercel project rm-cache from-copilot-to-colleague` or via dashboard) and redeploy.
- If Lighthouse SEO < 95 on chapter pages: most likely `<img>` tags without `alt` attributes inside diagram embeds. Add alt text per diagram-meta titles.
