# Homepage "Built from This Book" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 3-up "Built from this book" cross-reference section to the homepage (claims-ledger, book-mash, ai-native-org), replacing the current single-artifact claims-ledger block, and lightly edit the "About the Lab" narrative to name and link book-mash and ai-native-org.

**Architecture:** A new data-only module (`artifacts.ts`) holds the three cards' content; a new presentational `ArtifactCard` component renders one card from that data, reusing the existing claims-ledger section's visual style; `Catalogue.tsx` maps the data through the component in a 3-column grid. A prerequisite fix to `InlineText.tsx` adds markdown-link-syntax support, which the codebase's content pipeline is currently missing entirely (verified live — see Task 1).

**Tech Stack:** React 19 + TypeScript, Vite + `vite-react-ssg` (static prerendering), Tailwind utility classes, Vitest (`node` environment, `src/**/*.test.ts` only — no component-rendering harness exists in this repo).

## Global Constraints

- Repo root: `~/Dev/LifeOS/knowledge-bases/ai-engineer-book`. App root: `website/` — run all `npm` commands from there.
- `npm run lint` = `tsc --noEmit` (there is no ESLint). `npm test` = `vitest run` (91 tests as of this plan). `npm run build` runs a `prebuild` step (`sync-diagrams`, `sync-audio`, `gen-data`, `gen-sitemap`, `gen-llms`) before the Vite build — this can regenerate unrelated files as a side effect (diagram manifests, `llms.txt`/`llms-full.txt`, `versions.json`) if your local checkout's git history/corpus state differs from CI's. After building, check `git status`, revert anything unrelated to this feature (`git checkout -- <file>` for tracked files, `rm` for new untracked ones), and confirm with `git diff --stat` that only this feature's files are staged before committing.
- This repo has **zero component-rendering tests** (`vitest.config.ts` only includes `src/**/*.test.ts`, `environment: 'node'`, no jsdom/RTL dependency exists). Do not add one for this feature — follow the existing convention: verify component/JSX changes via `npm run lint`, the full `npm test` suite staying green, and grepping the `npm run build` output (`dist/index.html`) for expected strings. This mirrors the verification method already used successfully for this repo's prior SEO fixes.
- Every new external link must open in a new tab with `rel="noopener noreferrer"`; every internal route link must use react-router's `Link`, not a plain `<a>`.
- No new visual design system — reuse the exact Tailwind classes already used by the current claims-ledger section (see Task 4).
- Never commit unrelated pre-existing working-tree changes. Before staging, run `git status --short` and confirm only files this plan touches are modified/new.

---

### Task 1: Add markdown link support to `InlineText`

**Files:**
- Modify: `website/src/components/text/InlineText.tsx`

**Interfaces:**
- Consumes: nothing new (no new imports beyond what's already there).
- Produces: `InlineText` now renders `[label](url)` markdown syntax as a real `<a>` tag. This is required by Task 5 (`about-the-lab.md` edit) — do Task 1 before Task 5.

**Context:** `InlineText`'s current split regex (`text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g)`) only recognizes `**bold**`, `` `code` ``, and `*italic*`. It has no branch for markdown links. Confirmed live: `website/src/content/about-the-lab.md` already contains `[`STATS.md`](https://github.com/isatimur/ai-engineering-book-lab/blob/main/STATS.md)`, and the production site renders it as literal visible text — `[`, a correctly-rendered `<code>STATS.md</code>`, then `](https://...)"` — not a clickable link. This task fixes that gap (which also fixes the pre-existing broken STATS.md link as a side effect) and is required before Task 5's new links can actually work.

- [x] **Step 1: Add the link branch and extend the split regex**

Open `website/src/components/text/InlineText.tsx`. Change line 14 from:

```tsx
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);
```

to:

```tsx
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);
```

Then, immediately after the existing `if (part.startsWith('*') && part.endsWith('*')) { ... }` block (the italic branch, currently ending around line 38) and before the `const sub = splitWithGlossary(...)` fallback line, add:

```tsx
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, label, href] = linkMatch;
          const external = /^https?:\/\//.test(href);
          return (
            <a
              key={index}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <InlineText text={label} listen={listen} />
            </a>
          );
        }
```

The label is re-processed through `InlineText` itself (not the raw `ListenWordRun`) so nested formatting inside a link label — e.g. `` `STATS.md` `` inside the existing `[`STATS.md`](...)` link — still renders as `<code>` correctly, matching current behavior for non-link text.

- [x] **Step 2: Type-check**

Run: `cd website && npm run lint`
Expected: no errors (this is a same-file, self-contained change; `InlineText` already imports itself implicitly via JSX recursion, no new import needed since the function is calling itself by name within its own module).

- [x] **Step 3: Full test suite still green**

Run: `cd website && npm test`
Expected: all 91 existing tests still pass (none reference `InlineText`'s internals directly).

- [x] **Step 4: Manual verification via build output**

Run: `cd website && npm run build`
Then: `grep -o '<a[^>]*href="https://github.com/isatimur/ai-engineering-book-lab[^>]*>[^<]*<code>STATS.md</code></a>' dist/index.html`
Expected: one match — confirms the existing STATS.md link now renders as a real anchor tag instead of literal bracket text.

- [x] **Step 5: Commit**

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book
git add website/src/components/text/InlineText.tsx
git commit -m "fix: render markdown links in InlineText

InlineText's split regex had no branch for [label](url) syntax;
existing content (about-the-lab.md's STATS.md link) was rendering as
literal bracket text on production. Adds link parsing, required for
the upcoming About the Lab edit's new links to actually work."
```

---

### Task 2: Add the `ARTIFACTS` data module

**Files:**
- Create: `website/src/data/artifacts.ts`
- Create: `website/src/data/artifacts.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (consumed by Task 3's `ArtifactCard` and Task 4's `Catalogue.tsx`):
  ```ts
  export type ArtifactLink = { label: string; href: string; external?: boolean };
  export type ArtifactBadge = { src: string; alt: string; href: string };
  export type Artifact = {
    label: string;
    headline: string;
    description: string;
    badge?: ArtifactBadge;
    links: ArtifactLink[];
  };
  export const ARTIFACTS: Artifact[];
  ```

- [x] **Step 1: Write the failing test**

Create `website/src/data/artifacts.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { ARTIFACTS } from './artifacts';

describe('ARTIFACTS', () => {
  it('has exactly 3 entries, in order: claims-ledger, book-mash, ai-native-org', () => {
    expect(ARTIFACTS.map((a) => a.label)).toEqual([
      'claims-ledger · open source',
      'book-mash · open source',
      'ai-native-org · open source',
    ]);
  });

  it('every entry has non-empty label, headline, description, and at least one link', () => {
    for (const a of ARTIFACTS) {
      expect(a.label.length).toBeGreaterThan(0);
      expect(a.headline.length).toBeGreaterThan(0);
      expect(a.description.length).toBeGreaterThan(0);
      expect(a.links.length).toBeGreaterThan(0);
    }
  });

  it('external links are absolute https URLs; internal links start with a slash', () => {
    for (const a of ARTIFACTS) {
      for (const l of a.links) {
        if (l.external) {
          expect(l.href.startsWith('https://')).toBe(true);
        } else {
          expect(l.href.startsWith('/')).toBe(true);
        }
      }
    }
  });

  it('only claims-ledger has a badge', () => {
    expect(ARTIFACTS[0].badge).toBeDefined();
    expect(ARTIFACTS[1].badge).toBeUndefined();
    expect(ARTIFACTS[2].badge).toBeUndefined();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `cd website && npx vitest run src/data/artifacts.test.ts`
Expected: FAIL — `Cannot find module './artifacts'` (the module doesn't exist yet).

- [x] **Step 3: Create the data module**

Create `website/src/data/artifacts.ts`:

```ts
export type ArtifactLink = { label: string; href: string; external?: boolean };
export type ArtifactBadge = { src: string; alt: string; href: string };
export type Artifact = {
  label: string;
  headline: string;
  description: string;
  badge?: ArtifactBadge;
  links: ArtifactLink[];
};

export const ARTIFACTS: Artifact[] = [
  {
    label: 'claims-ledger · open source',
    headline: 'CI that fails when docs lie',
    description:
      'Same claim grammar as this book — now for your codebase. Every strong claim carries a verbatim quote anchor; stale pointers exit 11 in CI.',
    badge: {
      src: 'https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fisatimur%2Fclaims-ledger%2Fmain%2F.ledger%2Fbadge.json',
      alt: 'Claims verified badge',
      href: 'https://github.com/isatimur/claims-ledger',
    },
    links: [
      { label: 'Website', href: 'https://isatimur.github.io/claims-ledger/', external: true },
      { label: 'GitHub repo', href: 'https://github.com/isatimur/claims-ledger', external: true },
      { label: 'Fact-checked ledgers', href: '/ledgers' },
      {
        label: 'Fork sandbox',
        href: 'https://github.com/isatimur/claims-ledger-sandbox/fork',
        external: true,
      },
    ],
  },
  {
    label: 'book-mash · open source',
    headline: 'Turning "this chapter feels weak" into a number',
    description:
      'The multi-judge measurement engine that scores every chapter of this book — six independent judges, three craft dimensions, three epistemic dimensions. Generic enough for any manuscript with a book-mash.toml.',
    links: [
      { label: 'GitHub repo', href: 'https://github.com/isatimur/book-mash', external: true },
      { label: 'See it scored', href: '/quality' },
    ],
  },
  {
    label: 'ai-native-org · open source',
    headline: 'Chapter 9, turned into a running system',
    description:
      "The AI-Native Organization's three-plane design, built out as a real operating model for one operator running a fleet of agents — ship-gate, sentinel, claims ledger, all of it.",
    links: [
      { label: 'GitHub repo', href: 'https://github.com/isatimur/ai-native-org', external: true },
      { label: 'Live site', href: 'https://ai-native-org.vercel.app', external: true },
      { label: 'Read the chapter', href: '/read/09-ai-native-org' },
    ],
  },
];
```

- [x] **Step 4: Run test to verify it passes**

Run: `cd website && npx vitest run src/data/artifacts.test.ts`
Expected: PASS (4 tests).

- [x] **Step 5: Commit**

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book
git add website/src/data/artifacts.ts website/src/data/artifacts.test.ts
git commit -m "feat: add ARTIFACTS data for homepage cross-reference section"
```

---

### Task 3: Add the `ArtifactCard` component

**Files:**
- Create: `website/src/components/ArtifactCard.tsx`

**Interfaces:**
- Consumes: `Artifact` type from `../data/artifacts` (Task 2).
- Produces: `export const ArtifactCard = (props: Artifact) => JSX.Element`, consumed by Task 4's `Catalogue.tsx`. Caller is responsible for the React `key` (pass `key={artifact.label}` at the call site, not as a prop into this component).

No automated test for this file — per Global Constraints, this repo has no component-rendering test harness, and this is a pure presentational component with no branching logic worth a `.test.ts` (its only real logic, the badge/link conditionals, is trivial JSX). Verified in Step 2/3 below via type-check and, at the end of Task 4, via build-output grep.

- [x] **Step 1: Create the component**

Create `website/src/components/ArtifactCard.tsx`:

```tsx
import { Link } from 'react-router-dom';
import type { Artifact } from '../data/artifacts';

export const ArtifactCard = ({ label, headline, description, badge, links }: Artifact) => (
  <div className="text-center">
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-4">
      {label}
    </p>
    <h3 className="font-serif text-xl md:text-2xl text-white/90 mb-3">{headline}</h3>
    <p className="font-sans font-light text-sm text-white/55 max-w-md mx-auto mb-6 leading-relaxed">
      {description}
    </p>
    {badge && (
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <a
          href={badge.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block opacity-90 hover:opacity-100 transition-opacity"
        >
          <img src={badge.src} alt={badge.alt} height="20" />
        </a>
      </div>
    )}
    <div className="flex flex-wrap justify-center gap-2 font-mono text-[10px] uppercase tracking-widest">
      {links.map((l) =>
        l.external ? (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-white/20 rounded-sm text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            {l.label}
          </a>
        ) : (
          <Link
            key={l.href}
            to={l.href}
            className="px-3 py-1.5 border border-white/20 rounded-sm text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            {l.label}
          </Link>
        ),
      )}
    </div>
  </div>
);
```

Note the `<h3>` (not `<h2>`): Task 4 introduces a new section-level `<h2>` ("Three things came out of writing this"), so each card's own headline must sit one level below it to keep the page's heading hierarchy correct — the same H1/heading hygiene already fixed elsewhere on this site.

- [x] **Step 2: Type-check**

Run: `cd website && npm run lint`
Expected: no errors.

- [x] **Step 3: Commit**

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book
git add website/src/components/ArtifactCard.tsx
git commit -m "feat: add ArtifactCard presentational component"
```

---

### Task 4: Wire the new section into `Catalogue.tsx`

**Files:**
- Modify: `website/src/pages/Catalogue.tsx`

**Interfaces:**
- Consumes: `ARTIFACTS` from `../data/artifacts` (Task 2), `ArtifactCard` from `../components/ArtifactCard` (Task 3).
- Produces: nothing new for later tasks.

- [x] **Step 1: Add imports**

In `website/src/pages/Catalogue.tsx`, after the existing `import { DefinitionBlock } from '../components/DefinitionBlock';` line, add:

```tsx
import { ArtifactCard } from '../components/ArtifactCard';
import { ARTIFACTS } from '../data/artifacts';
```

- [x] **Step 2: Replace the claims-ledger section**

Find this exact block (currently the `<section className="mt-16 pt-10 border-t border-white/10 text-center">...</section>` that renders the claims-ledger badge and links, immediately after `<DefinitionBlock />` and before the `</main>` closing tag):

```tsx
        <section className="mt-16 pt-10 border-t border-white/10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-4">
            claims-ledger · open source
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-white/90 mb-3">
            CI that fails when docs lie
          </h2>
          <p className="font-sans font-light text-sm text-white/55 max-w-md mx-auto mb-6 leading-relaxed">
            Same claim grammar as this book — now for your codebase. Every strong claim carries a
            verbatim quote anchor; stale pointers exit&nbsp;11 in CI.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <a
              href="https://github.com/isatimur/claims-ledger"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block opacity-90 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fisatimur%2Fclaims-ledger%2Fmain%2F.ledger%2Fbadge.json"
                alt="Claims verified badge"
                height="20"
              />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-2 font-mono text-[10px] uppercase tracking-widest">
            <a
              href="https://isatimur.github.io/claims-ledger/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-white/20 rounded-sm text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              Website
            </a>
            <a
              href="https://github.com/isatimur/claims-ledger"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-white/20 rounded-sm text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              GitHub repo
            </a>
            <Link
              to="/ledgers"
              className="px-3 py-1.5 border border-white/20 rounded-sm text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              Fact-checked ledgers
            </Link>
            <a
              href="https://github.com/isatimur/claims-ledger-sandbox/fork"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-white/20 rounded-sm text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              Fork sandbox
            </a>
          </div>
        </section>
```

Replace it with:

```tsx
        <section className="mt-16 pt-10 border-t border-white/10">
          <div className="text-center mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-4">
              Open source · built from this book
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-white/90 mb-3">
              Three things came out of writing this
            </h2>
            <p className="font-sans font-light text-sm text-white/55 max-w-md mx-auto leading-relaxed">
              The Method needed tools that didn't exist. They're all real, running, and open
              source.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTIFACTS.map((artifact) => (
              <ArtifactCard key={artifact.label} {...artifact} />
            ))}
          </div>
        </section>
```

- [x] **Step 3: Type-check**

Run: `cd website && npm run lint`
Expected: no errors. (If `Link` becomes unused elsewhere in the file, `tsc --noEmit` won't flag unused imports by default — but `Link` is still used by the header nav in the same file, so no cleanup needed here.)

- [x] **Step 4: Full test suite still green**

Run: `cd website && npm test`
Expected: all tests pass, including the new `artifacts.test.ts` from Task 2.

- [x] **Step 5: Manual verification via dev server**

Run: `cd website && npm run dev`, open `http://localhost:3000/`, scroll to the new section, and confirm:
- Three cards render side by side on desktop, stacked on mobile (resize the window or use dev tools device toolbar).
- All 9 links (4 + 2 + 3) are clickable and point where expected; external links open in a new tab.
- The claims-ledger badge still renders.

Stop the dev server when done (Ctrl+C).

- [x] **Step 6: Commit**

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book
git add website/src/pages/Catalogue.tsx
git commit -m "feat: replace claims-ledger-only section with 3-up Built from this book"
```

---

### Task 5: Edit `about-the-lab.md`

**Files:**
- Modify: `website/src/content/about-the-lab.md`

**Interfaces:**
- Consumes: nothing (plain content edit; relies on Task 1's `InlineText` fix to render its new links correctly).
- Produces: nothing for later tasks.

- [x] **Step 1: Edit the bullet list line**

In `website/src/content/about-the-lab.md`, change:

```
- quality judges for summaries, claims, and chapters
```

to:

```
- quality judges for summaries, claims, and chapters ([book-mash](https://github.com/isatimur/book-mash))
```

- [x] **Step 2: Insert the ai-native-org paragraph**

In the same file, change:

```
**The Manuscript** is the visible output of a larger experiment: *can a book become a public, self-improving research artefact?*

This started as "let's make better notes."
```

to:

```
**The Manuscript** is the visible output of a larger experiment: *can a book become a public, self-improving research artefact?*

One idea already left the lab: Chapter 9's argument for constrained delegation became [ai-native-org](https://github.com/isatimur/ai-native-org), a running operating model, not just a claim.

This started as "let's make better notes."
```

- [x] **Step 3: Full test suite still green**

Run: `cd website && npm test`
Expected: all tests pass (no test reads this markdown file's prose content).

- [x] **Step 4: Manual verification via build output**

Run: `cd website && npm run build`
Then:
```bash
grep -o '<a[^>]*href="https://github.com/isatimur/book-mash"[^>]*>[^<]*</a>' dist/index.html
grep -o '<a[^>]*href="https://github.com/isatimur/ai-native-org"[^>]*>[^<]*</a>' dist/index.html
```
Expected: one match each — confirms both new links render as real anchors, not literal bracket text.

- [x] **Step 5: Commit**

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book
git add website/src/content/about-the-lab.md
git commit -m "docs: link book-mash and ai-native-org from About the Lab"
```

---

### Task 6: Full verification and cleanup

**Files:** none (verification-only task).

- [x] **Step 1: Run the full check sequence**

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book/website
npm run lint
npm test
npm run build
```

All three must succeed. (If earlier tasks were already committed incrementally, this re-confirms nothing regressed across the full set of changes.)

- [x] **Step 2: Confirm all 4 expected strings are present in the final build**

```bash
grep -c 'Three things came out of writing this' dist/index.html
grep -c 'book-mash · open source' dist/index.html
grep -c 'ai-native-org · open source' dist/index.html
grep -o '<a[^>]*href="https://ai-native-org.vercel.app"[^>]*>[^<]*</a>' dist/index.html
```

Expected: `1` for each of the first three, and one matched anchor tag for the fourth.

- [x] **Step 3: Check for and revert incidental unrelated regeneration**

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book
git status --short website/
```

Per Global Constraints, `npm run build`'s `prebuild` step can touch unrelated files (diagram manifests, `llms.txt`/`llms-full.txt`, `versions.json`) as a side effect of local git-history/corpus differences from CI. If any of those appear modified and are unrelated to this feature, revert tracked ones with `git checkout -- <file>` and delete new untracked ones with `rm`. Confirm afterward that `git status --short website/` shows only files this plan touched (or nothing, if all 5 tasks were already committed individually).

- [x] **Step 4: Clean build artifacts**

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book/website
rm -rf dist .vite-react-ssg-temp
```

- [x] **Step 5: Final status check before push**

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book
git status --short
git log --oneline -6
```

Confirm the 5 feature commits (Tasks 1–5) are present and nothing unrelated is staged or committed. Do not push without explicit confirmation — pushing redeploys the live site (see this repo's `DEPLOY.md`).
