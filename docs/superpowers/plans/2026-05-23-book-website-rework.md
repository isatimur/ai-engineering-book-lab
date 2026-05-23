# Book Website Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-organize `website/` into three routed surfaces (Catalogue / Visual Guide / Reader), wire every recently generated diagram into the reader, and pull every upstream `isatimur/bookshelf` feature worth pulling — in one coherent ship moment.

**Architecture:** wouter for client-side routing. Diagram source-of-truth stays in `diagrams/`; a `sync-diagrams.mjs` prebuild script copies them into `public/diagrams/` under an organised layout and emits a typed manifest. App.tsx slims to a router shell after extracting existing inlined components into `pages/` and `components/`. Glossary terms in chapter prose detected via regex against `data/glossary.ts`, opening a right-side drawer that re-uses the existing slide-pane animation.

**Tech Stack:** React 19, TypeScript strict, Vite 7, Tailwind v4, motion, lenis, wouter (new), GSAP (existing, unchanged).

**Reference spec:** `docs/superpowers/specs/2026-05-23-book-website-rework-design.md`. Read it before starting.

**Testing approach:** The website has no test runner. Pure-logic units (`glossaryMatch`, manifest loader, `audio.ts`) get vitest tests added in their respective tasks (vitest setup is Task 6). Visual/layout work is verified manually against the spec's acceptance criteria (§13). Each task ends with a commit (Conventional Commits format; no AI attribution per project memory).

**Commit policy:** Local commits only. No `git push`. The user pushes manually.

---

## Phase 0 — Working environment

### Task 0: Confirm clean state and branch

**Files:** none.

- [ ] **Step 1: Confirm we're in the right repo and branch**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git status
git branch --show-current
```

Expected: branch `main`, working tree may have unstaged changes from other lab work (those are fine; we only touch `website/` and `docs/`).

- [ ] **Step 2: Verify the spec exists**

```bash
ls docs/superpowers/specs/2026-05-23-book-website-rework-design.md
```

Expected: file exists (committed in `dca9cd1`).

- [ ] **Step 3: Verify diagram source-of-truth is present**

```bash
ls diagrams/*.png | wc -l && ls diagrams/concepts/*.png | wc -l && ls diagrams/inline/*.png | wc -l && ls diagrams/maps/*.png | wc -l
```

Expected: `14`, `18`, `30`, `2`.

- [ ] **Step 4: Verify website builds today**

```bash
cd website && npm install --no-audit --no-fund && npm run build
```

Expected: build succeeds; `dist/` is populated. Baseline before any changes.

---

## Phase 1 — Refactor groundwork (extract existing components)

These tasks are pure refactors — no behavior change. Each task moves a coherent slice out of `App.tsx` into its own file with explicit imports. After Phase 1, `App.tsx` is small enough to host the router.

### Task 1: Create directory scaffolding

**Files:**
- Create: `website/src/pages/.gitkeep`
- Create: `website/src/components/nav/.gitkeep`
- Create: `website/src/components/chapter/.gitkeep`
- Create: `website/src/components/text/.gitkeep`
- Create: `website/src/components/modals/.gitkeep`
- Create: `website/src/components/drawers/.gitkeep`
- Create: `website/src/data/.gitkeep`
- Create: `website/src/lib/.gitkeep`

- [ ] **Step 1: Create empty directories with `.gitkeep`**

```bash
cd website/src
mkdir -p pages components/{nav,chapter,text,modals,drawers} data lib
touch pages/.gitkeep components/nav/.gitkeep components/chapter/.gitkeep components/text/.gitkeep components/modals/.gitkeep components/drawers/.gitkeep data/.gitkeep lib/.gitkeep
```

- [ ] **Step 2: Move existing `bookChapters.ts` to `data/`**

```bash
git mv src/bookChapters.ts src/data/bookChapters.ts
```

- [ ] **Step 3: Update the import in `App.tsx`**

In `website/src/App.tsx`, change:

```ts
import { type BookChapter, chapters } from './bookChapters';
```

to:

```ts
import { type BookChapter, chapters } from './data/bookChapters';
```

- [ ] **Step 4: Move existing `DynamicVisuals.tsx` to `components/chapter/`**

```bash
git mv src/DynamicVisuals.tsx src/components/chapter/DynamicVisuals.tsx
```

- [ ] **Step 5: Update the import in `App.tsx`**

Change:

```ts
import { DynamicVisuals } from './DynamicVisuals';
```

to:

```ts
import { DynamicVisuals } from './components/chapter/DynamicVisuals';
```

- [ ] **Step 6: Build to confirm no regression**

```bash
cd website && npm run build
```

Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor(website): scaffold src/ subdirectories and move bookChapters + DynamicVisuals"
```

### Task 2: Extract `InteractiveHoverImage` and text utilities

**Files:**
- Create: `website/src/components/InteractiveHoverImage.tsx`
- Create: `website/src/components/text/InlineText.tsx`
- Create: `website/src/components/text/MarkdownBlock.tsx`
- Modify: `website/src/App.tsx`

- [ ] **Step 1: Create `InteractiveHoverImage.tsx`**

Move the `InteractiveHoverImage` component (currently in `App.tsx` around lines 18–74) into a new file:

```tsx
// website/src/components/InteractiveHoverImage.tsx
import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

export const InteractiveHoverImage = ({ src, className, style, variants, initial, whileInView, viewport, transition }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000, ...style }}
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={{ ...transition, duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      className="w-full h-full cursor-pointer pointer-events-auto relative group overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ y: [0, -10, 0] }}
    >
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
      />
      <motion.img
        src={src}
        className={className}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.08, filter: 'grayscale(0%) sepia(0%) blur(0px)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </motion.div>
  );
};
```

- [ ] **Step 2: Create `InlineText.tsx`**

```tsx
// website/src/components/text/InlineText.tsx
import React from 'react';

export const InlineText = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index}>{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};
```

- [ ] **Step 3: Create `MarkdownBlock.tsx`**

```tsx
// website/src/components/text/MarkdownBlock.tsx
import { InlineText } from './InlineText';

export const MarkdownBlock = ({ block }: { block: string }) => {
  if (block.startsWith('# ')) return <h1>{block.replace(/^#\s+/, '')}</h1>;
  if (block.startsWith('## ')) return <h2>{block.replace(/^##\s+/, '')}</h2>;
  if (block.startsWith('### ')) return <h3>{block.replace(/^###\s+/, '')}</h3>;

  if (block.startsWith('> ')) {
    return (
      <blockquote>
        <InlineText text={block.replace(/^>\s?/gm, '')} />
      </blockquote>
    );
  }
  if (/^- /.test(block)) {
    return (
      <ul>
        {block.split('\n').map((item) => (
          <li key={item}>
            <InlineText text={item.replace(/^-\s+/, '')} />
          </li>
        ))}
      </ul>
    );
  }
  if (/^\d+\. /.test(block)) {
    return (
      <ol>
        {block.split('\n').map((item) => (
          <li key={item}>
            <InlineText text={item.replace(/^\d+\.\s+/, '')} />
          </li>
        ))}
      </ol>
    );
  }
  return (
    <p>
      <InlineText text={block.replace(/\n/g, ' ')} />
    </p>
  );
};
```

- [ ] **Step 4: Replace the inlined definitions in `App.tsx` with imports**

Delete the `InteractiveHoverImage`, `InlineText`, and `MarkdownBlock` definitions from `App.tsx`. At the top of the file, add:

```ts
import { InteractiveHoverImage } from './components/InteractiveHoverImage';
import { InlineText } from './components/text/InlineText';
import { MarkdownBlock } from './components/text/MarkdownBlock';
```

- [ ] **Step 5: Build**

```bash
cd website && npm run build
```

Expected: build succeeds; no behavior change in the dev server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor(website): extract InteractiveHoverImage and text utilities to components/"
```

### Task 3: Extract navigation components

**Files:**
- Create: `website/src/components/nav/TopNav.tsx`
- Create: `website/src/components/nav/BottomNav.tsx`
- Modify: `website/src/App.tsx`

- [ ] **Step 1: Create `TopNav.tsx`**

Move the `TopNav` component from `App.tsx` (lines ~76–105) into:

```tsx
// website/src/components/nav/TopNav.tsx
import { motion, useTransform } from 'motion/react';

type Props = {
  progress: any;
  onToggleSettings: () => void;
};

export const TopNav = ({ progress, onToggleSettings }: Props) => {
  const displayProgress = useTransform(progress, (p: number) => `${(p * 100).toFixed(2)}%`);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 border-b border-[var(--color-border)] flex items-center justify-between px-4 lg:px-6 text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] z-50 bg-[var(--color-paper)]/95 backdrop-blur transition-colors duration-300">
      <div className="flex items-center gap-3 lg:gap-4">
        <span className="font-bold bg-[var(--color-ink)] text-[var(--color-paper)] px-2 py-1 rounded-[1px] transition-colors duration-300">AI PRESS</span>
        <span className="border-l border-[var(--color-border)] h-4 hidden sm:block transition-colors duration-300" />
        <span className="hidden sm:inline tracking-widest bg-transparent">FROM COPILOT TO COLLEAGUE</span>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden lg:flex items-center gap-4 text-[var(--color-ink-muted)] relative top-[1px] transition-colors duration-300">
          <span>AI ENGINEER KB</span>
          <span className="border-l border-[var(--color-border)] h-4 transition-colors duration-300" />
          <span className="text-[var(--color-ink)] transition-colors duration-300">BOOK READER</span>
        </div>
        <div className="border border-[var(--color-border)] rounded-full px-3 py-1 font-mono tabular-nums flex items-center justify-center min-w-[5.5rem] bg-[var(--color-paper)] transition-colors duration-300 relative overflow-hidden group">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-[var(--color-ink)]/20"
            style={{ width: useTransform(progress, (p: number) => `${p * 100}%`) }}
          />
          <motion.span className="relative z-10">{displayProgress}</motion.span>
        </div>
        <button onClick={onToggleSettings} className="border border-[var(--color-border)] rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/5 transition-colors font-serif italic text-sm">
          Aa
        </button>
      </div>
    </header>
  );
};
```

(Note: `TopNav` will be extended in Task 15 to add the `← Catalogue` button and the Share button. Keep the contract minimal for now.)

- [ ] **Step 2: Create `BottomNav.tsx`**

Move the `BottomNav` component from `App.tsx` (lines ~107–218). Copy the existing implementation verbatim; only the wrapper changes:

```tsx
// website/src/components/nav/BottomNav.tsx
import { useState } from 'react';
import { motion, useTransform } from 'motion/react';

type Props = {
  onToggleSidebar: () => void;
  progress: any;
};

export const BottomNav = ({ onToggleSidebar, progress }: Props) => {
  // ... copy the existing function body byte-for-byte from current App.tsx
};
```

- [ ] **Step 3: Replace inlined definitions in `App.tsx` with imports**

Delete `TopNav` and `BottomNav` from `App.tsx`. Add to imports:

```ts
import { TopNav } from './components/nav/TopNav';
import { BottomNav } from './components/nav/BottomNav';
```

- [ ] **Step 4: Build**

```bash
cd website && npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Run dev server briefly to spot-check**

```bash
cd website && npm run dev &
sleep 3
curl -s http://localhost:3000/ | grep -c "id=\"root\""
kill %1
```

Expected: `1` (the root div renders).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor(website): extract TopNav and BottomNav to components/nav/"
```

### Task 4: Extract chapter rendering components

**Files:**
- Create: `website/src/components/chapter/Hero.tsx`
- Create: `website/src/components/chapter/ChapterArticle.tsx`
- Create: `website/src/components/chapter/ChapterIllustration.tsx`
- Create: `website/src/components/chapter/InlineIllustration.tsx`
- Create: `website/src/components/chapter/FullBookReader.tsx`
- Modify: `website/src/App.tsx`

- [ ] **Step 1: Create `Hero.tsx`**

Move the `Hero` component from `App.tsx` (lines ~220–346). Copy verbatim:

```tsx
// website/src/components/chapter/Hero.tsx
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { InteractiveHoverImage } from '../InteractiveHoverImage';

const IMAGES = {
  man1: 'https://images.unsplash.com/photo-1517245386807-bb43a82c33c4?q=80&w=1200&auto=format&fit=crop',
  painting: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
  editorial: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
  speaker: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
};

export const Hero = () => {
  // ... copy the existing function body verbatim from current App.tsx
};
```

- [ ] **Step 2: Create `ChapterIllustration.tsx`**

Move from current `App.tsx` (lines ~874–897). Header:

```tsx
// website/src/components/chapter/ChapterIllustration.tsx
import { type BookChapter } from '../../data/bookChapters';

// NOTE: this file will be REWRITTEN in Task 16 to use the manifest opener.
// For Phase 1 we move it verbatim so behavior does not change.
const illustrationSheet = '/assets/illustrations/ai-engineer-practical-explainers-sheet.png';

const chapterIllustrations = [
  { position: '0% 0%', subject: 'task pipeline', theme: 'Assistant to delegate' },
  { position: '33.333% 0%', subject: 'review lens', theme: 'Taste and judgment' },
  { position: '66.666% 0%', subject: 'agent-ready repo', theme: 'Repo as interface' },
  { position: '100% 0%', subject: 'harness workflow', theme: 'Harness workflow' },
  { position: '0% 50%', subject: 'eval loop', theme: 'Evals as control systems' },
  { position: '33.333% 50%', subject: 'context pipeline', theme: 'Context infrastructure' },
  { position: '66.666% 50%', subject: 'durable runtime', theme: 'Runtimes and state' },
  { position: '100% 50%', subject: 'human control plane', theme: 'Human control plane' },
  { position: '0% 100%', subject: 'security boundary', theme: 'Security and identity' },
  { position: '33.333% 100%', subject: 'realtime voice', theme: 'Realtime voice' },
  { position: '66.666% 100%', subject: 'AI-native organization', theme: 'AI-native organization' },
  { position: '100% 100%', subject: 'enduring principles', theme: 'What endures' },
];

type ConceptFigure = { title: string; body: string; illustrationIndex: number };
const chapterVisualGuides: Record<string, ConceptFigure[]> = { /* copy verbatim from current App.tsx */ };
const getChapterGuide = (chapter: BookChapter) =>
  chapterVisualGuides[chapter.number] ?? chapterVisualGuides['10'];

export const ChapterIllustration = ({ chapter, index }: { chapter: BookChapter; index: number }) => {
  // ... copy the existing function body verbatim from current App.tsx
};

export { chapterVisualGuides, getChapterGuide, chapterIllustrations, illustrationSheet };
```

(The exports allow `ChapterArticle` and `InlineIllustration` to still use them until Tasks 16–17 replace the system.)

- [ ] **Step 3: Create `InlineIllustration.tsx`**

Move from current `App.tsx` (lines ~780–805):

```tsx
// website/src/components/chapter/InlineIllustration.tsx
import { chapterIllustrations, illustrationSheet } from './ChapterIllustration';

type ConceptFigure = { title: string; body: string; illustrationIndex: number };

export const InlineIllustration = ({
  figure,
  label,
  compact,
}: { figure: ConceptFigure; label: string; compact: boolean }) => {
  const illustration = chapterIllustrations[figure.illustrationIndex % chapterIllustrations.length];
  // ... copy the existing function body verbatim from current App.tsx
};
```

(Will be rewritten in Task 17.)

- [ ] **Step 4: Create `ChapterArticle.tsx`**

Move from current `App.tsx` (lines ~807–872):

```tsx
// website/src/components/chapter/ChapterArticle.tsx
import React from 'react';
import { type BookChapter } from '../../data/bookChapters';
import { MarkdownBlock } from '../text/MarkdownBlock';
import { InlineIllustration } from './InlineIllustration';
import { getChapterGuide } from './ChapterIllustration';

const chapterDiagram: Record<string, string> = {
  '01': '/diagrams/05-chapter1-the-shift.png',
  '02': '/diagrams/06-chapter2-taste.png',
  '03': '/diagrams/07-chapter3-harnesses.png',
  '04': '/diagrams/08-chapter4-evals.png',
  '05': '/diagrams/09-chapter5-context.png',
  '06': '/diagrams/10-chapter6-runtimes.png',
  '07': '/diagrams/11-chapter7-security.png',
  '08': '/diagrams/12-chapter8-realtime.png',
  '09': '/diagrams/13-chapter9-ai-native-org.png',
  '10': '/diagrams/14-chapter10-what-endures.png',
};

// ConceptMap helper currently inlined in App.tsx around line 770
const ConceptMap = ({ figures }: { figures: any[] }) => {
  // copy from App.tsx, unchanged for now
};

export const ChapterArticle = ({ chapter }: { chapter: BookChapter }) => {
  // ... copy the existing function body verbatim from current App.tsx
};
```

(`chapterDiagram` will be replaced by manifest reads in Task 17. `ConceptMap` is removed in Task 17.)

- [ ] **Step 5: Create `FullBookReader.tsx`**

Move from current `App.tsx` (lines ~899–949):

```tsx
// website/src/components/chapter/FullBookReader.tsx
import { chapters } from '../../data/bookChapters';
import { DynamicVisuals } from './DynamicVisuals';
import { ChapterArticle } from './ChapterArticle';
import { ChapterIllustration } from './ChapterIllustration';

export const FullBookReader = () => {
  // ... copy the existing function body verbatim from current App.tsx
};
```

- [ ] **Step 6: Replace inlined definitions in `App.tsx`**

Delete `Hero`, `ChapterIllustration`, `ChapterArticle`, `InlineIllustration`, `ConceptMap`, `FullBookReader`, and the standalone `chapterDiagram`, `chapterIllustrations`, `illustrationSheet`, `chapterVisualGuides`, `getChapterGuide`, `ConceptFigure` type from `App.tsx`. Add imports:

```ts
import { Hero } from './components/chapter/Hero';
import { FullBookReader } from './components/chapter/FullBookReader';
```

- [ ] **Step 7: Build and dev-server smoke test**

```bash
cd website && npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000/ | head -20
kill %1
```

Expected: build succeeds, dev server renders.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor(website): extract chapter components to components/chapter/"
```

### Task 5: Extract modal and sidebar components

**Files:**
- Create: `website/src/components/modals/SettingsModal.tsx`
- Create: `website/src/components/drawers/Sidebar.tsx`
- Modify: `website/src/App.tsx`

- [ ] **Step 1: Create `SettingsModal.tsx`**

Move `SettingsModal` from `App.tsx` (lines ~413–499). Keep the props contract intact:

```tsx
// website/src/components/modals/SettingsModal.tsx
import { motion } from 'motion/react';

export type Settings = {
  theme: 'light' | 'sepia' | 'dark';
  typography: 'serif' | 'sans' | 'dyslexic';
  fontSize: 'sm' | 'md' | 'lg';
  lineSpacing: 'normal' | 'relaxed' | 'loose';
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  updateSettings: (next: Partial<Settings>) => void;
};

export const SettingsModal = ({ isOpen, onClose, settings, updateSettings }: Props) => {
  // ... copy the existing function body verbatim from current App.tsx
};
```

(The Sound subsection is added in Task 22.)

- [ ] **Step 2: Create `Sidebar.tsx`**

Move `Sidebar` from `App.tsx` (lines ~348–411):

```tsx
// website/src/components/drawers/Sidebar.tsx
import { motion } from 'motion/react';
import { chapters } from '../../data/bookChapters';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: Props) => {
  // ... copy the existing function body verbatim from current App.tsx
};
```

- [ ] **Step 3: Replace inlined definitions in `App.tsx`**

Delete `SettingsModal`, `Sidebar`, and the local `Settings` shape from `App.tsx`. Add imports:

```ts
import { Sidebar } from './components/drawers/Sidebar';
import { SettingsModal, type Settings } from './components/modals/SettingsModal';
```

Use the imported `Settings` type for the existing `useState<Settings>`.

- [ ] **Step 4: Verify `App.tsx` is now small**

```bash
wc -l website/src/App.tsx
```

Expected: roughly 150–200 lines (down from 1075).

- [ ] **Step 5: Build + smoke test**

```bash
cd website && npm run build && npm run dev &
sleep 3
curl -s http://localhost:3000/ -o /tmp/page.html && grep -c root /tmp/page.html
kill %1
```

Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor(website): extract Sidebar and SettingsModal to components/"
```

---

## Phase 2 — Test infrastructure + diagram pipeline

### Task 6: Add vitest

**Files:**
- Modify: `website/package.json`
- Create: `website/vitest.config.ts`

- [ ] **Step 1: Install vitest**

```bash
cd website && npm install --save-dev vitest@^2.1.0 @types/node
```

- [ ] **Step 2: Add `test` script to `package.json`**

Edit `website/package.json` `scripts`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
// website/vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 4: Sanity test**

Create `website/src/lib/_sanity.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('sanity', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run:

```bash
cd website && npm test
```

Expected: 1 passed.

- [ ] **Step 5: Remove sanity test, commit**

```bash
rm website/src/lib/_sanity.test.ts
git add -A
git commit -m "build(website): add vitest for logic unit tests"
```

### Task 7: Author `diagram-meta.json`

**Files:**
- Create: `website/scripts/diagram-meta.json`

This is the hand-authored input that names and captions every diagram. Keys are source filenames in `diagrams/`.

- [ ] **Step 1: Create `scripts/diagram-meta.json`**

```json
{
  "overview": {
    "01-book-argument-spine.excalidraw": {
      "id": "spine",
      "title": "The Argument Spine",
      "caption": "The ten chapters as a four-act dependency arc — the Problem (ch 1–2), the Scaffolding Stack (ch 3–7), the Stress Test (ch 8), and the Widening (ch 9–10). The book is an argument with a shape, not a survey, and it carries the throughline from possibility to compounding trust."
    },
    "02-autoresearch-machine.excalidraw": {
      "id": "machine",
      "title": "The Autoresearch Knowledge Machine",
      "caption": "How a 693-video corpus becomes a source-backed book: a five-layer pipeline — Source → Synthesis → Evidence → Manuscript — governed by a Research-Org control plane that improves the upper layers through bounded, logged agent passes."
    },
    "03-scaffolding-stack.excalidraw": {
      "id": "stack",
      "title": "The Scaffolding Stack",
      "caption": "The book's central thesis in one picture: a raw model is capable but not dependable. Five engineered layers wrap it — harnesses, evals, context, runtimes, security — and each one earns its place by a specific failure it prevents."
    },
    "04-theme-corpus-map.excalidraw": {
      "id": "corpus-map",
      "title": "Theme & Corpus Map",
      "caption": "What 693 videos are actually about: ten themes sized by corpus count, colour-coded by the book act they feed, each mapped to its chapter — including the honest editorial call that Models & Inference is deliberately background, not a chapter."
    }
  },
  "openers": {
    "05-chapter1-the-shift.excalidraw": { "chapter": "01", "title": "Assistant vs delegate" },
    "06-chapter2-taste.excalidraw": { "chapter": "02", "title": "Vibe coding vs vibe engineering" },
    "07-chapter3-harnesses.excalidraw": { "chapter": "03", "title": "Bare prompt vs engineered harness" },
    "08-chapter4-evals.excalidraw": { "chapter": "04", "title": "Vibes & benchmarks vs operational eval loop" },
    "09-chapter5-context.excalidraw": { "chapter": "05", "title": "Stuffing the window vs assembling context" },
    "10-chapter6-runtimes.excalidraw": { "chapter": "06", "title": "Stateless loop vs durable runtime" },
    "11-chapter7-security.excalidraw": { "chapter": "07", "title": "Unbounded agent vs bounded autonomy" },
    "12-chapter8-realtime.excalidraw": { "chapter": "08", "title": "Turn-based chat vs realtime pipeline" },
    "13-chapter9-ai-native-org.excalidraw": { "chapter": "09", "title": "Seat licenses vs operating-model redesign" },
    "14-chapter10-what-endures.excalidraw": { "chapter": "10", "title": "Transient layer vs durable layer" }
  },
  "concepts": {
    "01-agentic-product-design.excalidraw": { "id": "agentic-product-design", "title": "Agentic Product Design", "chapter": "01", "summary": "Designing the surface area an agent acts through — intake, action, review — not just the model prompt." },
    "02-agent-observability.excalidraw": { "id": "agent-observability", "title": "Agent Observability", "chapter": "04", "summary": "Traces, metrics, and replay tooling that turn agent runs into something you can debug and improve." },
    "03-agent-runtime-replay-vs-snapshot.excalidraw": { "id": "agent-runtime-replay-vs-snapshot", "title": "Replay vs Snapshot", "chapter": "06", "summary": "Two strategies for durable agent state: reconstruct from event history vs preserve as checkpoints." },
    "04-ai-native-organization.excalidraw": { "id": "ai-native-organization", "title": "AI-Native Organization", "chapter": "09", "summary": "An operating model where AI is integrated into how work is created and reviewed, not just bolted on." },
    "05-coding-evals.excalidraw": { "id": "coding-evals", "title": "Coding Evals", "chapter": "04", "summary": "Task-level scoring for code-writing agents — human-seeded cases, regression memory, production traces." },
    "06-constrained-delegation.excalidraw": { "id": "constrained-delegation", "title": "Constrained Delegation", "chapter": "07", "summary": "Bounded autonomy — scoped identity, sandboxing, audit trail — that lets an agent act safely." },
    "07-context-engineering.excalidraw": { "id": "context-engineering", "title": "Context Engineering", "chapter": "05", "summary": "Deciding what the model should know at the moment of action — retrieval, memory, tool selection." },
    "08-durable-agents.excalidraw": { "id": "durable-agents", "title": "Durable Agents", "chapter": "06", "summary": "Agents with state, resumability, and recovery paths — architecture that survives a crash." },
    "09-graphrag.excalidraw": { "id": "graphrag", "title": "GraphRAG", "chapter": "05", "summary": "Retrieval over a graph rather than a flat vector index — useful when relationships matter as much as content." },
    "10-harness-engineering.excalidraw": { "id": "harness-engineering", "title": "Harness Engineering", "chapter": "03", "summary": "A prepared environment around an agent — specs, tests, tools, a plan → produce → review → ship loop." },
    "11-hierarchical-memory.excalidraw": { "id": "hierarchical-memory", "title": "Hierarchical Memory", "chapter": "05", "summary": "Layered memory — session, project, long-term — scoped, inspectable, maintained like infrastructure." },
    "12-human-control-plane.excalidraw": { "id": "human-control-plane", "title": "Human Control Plane", "chapter": "06", "summary": "Surfaces humans need to approve, intervene, audit, and escalate agent work." },
    "13-model-context-protocol.excalidraw": { "id": "model-context-protocol", "title": "Model Context Protocol (MCP)", "chapter": "05", "summary": "A protocol for connecting models to tools and data sources in a standard, inspectable way." },
    "14-one-shot-ai-failure.excalidraw": { "id": "one-shot-ai-failure", "title": "One-shot AI Failure", "chapter": "03", "summary": "The failure mode where an agent is asked to do everything in a single pass and silently produces slop." },
    "15-software-factory.excalidraw": { "id": "software-factory", "title": "Software Factory", "chapter": "03", "summary": "Work intake, constraints, review, and output paths — the surrounding system, not just the model prompt." },
    "16-spec-driven-development.excalidraw": { "id": "spec-driven-development", "title": "Spec-Driven Development", "chapter": "03", "summary": "Specs as executable acceptance criteria and repeatable checks — not paperwork." },
    "17-vibe-coding.excalidraw": { "id": "vibe-coding", "title": "Vibe Coding", "chapter": "02", "summary": "Shipping whatever runs — fast generation without review discipline. Useful sometimes, dangerous often." },
    "18-voice-agents.excalidraw": { "id": "voice-agents", "title": "Voice Agents", "chapter": "08", "summary": "Sub-800 ms latency budget, streaming, turn detection, barge-in — what realtime stress-tests demand." }
  },
  "inline": {
    "ch01-fig1-assistant-copilot-delegate.excalidraw": { "chapter": "01", "index": 1, "title": "Assistant, copilot, delegate" },
    "ch01-fig2-tell-me-vs-go-do.excalidraw": { "chapter": "01", "index": 2, "title": "Tell me vs go do" },
    "ch01-fig3-chat-is-the-tip.excalidraw": { "chapter": "01", "index": 3, "title": "Chat is the tip of the iceberg" },
    "ch02-fig1-cheap-code-syllogism.excalidraw": { "chapter": "02", "index": 1, "title": "The cheap-code syllogism" },
    "ch02-fig2-vibe-coding-mode-switch.excalidraw": { "chapter": "02", "index": 2, "title": "The vibe-coding mode switch" },
    "ch02-fig3-friction-is-judgment.excalidraw": { "chapter": "02", "index": 3, "title": "Friction is judgment" },
    "ch03-fig1-repo-is-the-interface.excalidraw": { "chapter": "03", "index": 1, "title": "The repo is the interface" },
    "ch03-fig2-specs-persist.excalidraw": { "chapter": "03", "index": 2, "title": "Specs persist" },
    "ch03-fig3-software-factory.excalidraw": { "chapter": "03", "index": 3, "title": "The software factory" },
    "ch04-fig1-evals-not-unit-tests.excalidraw": { "chapter": "04", "index": 1, "title": "Evals are not unit tests" },
    "ch04-fig2-unit-of-evaluation.excalidraw": { "chapter": "04", "index": 2, "title": "The unit of evaluation" },
    "ch04-fig3-observability-flywheel.excalidraw": { "chapter": "04", "index": 3, "title": "The observability flywheel" },
    "ch05-fig1-rag-is-not-memory.excalidraw": { "chapter": "05", "index": 1, "title": "RAG is not memory" },
    "ch05-fig2-graphrag-connects-dots.excalidraw": { "chapter": "05", "index": 2, "title": "GraphRAG connects the dots" },
    "ch05-fig3-mcp-tool-flood.excalidraw": { "chapter": "05", "index": 3, "title": "The MCP tool flood" },
    "ch06-fig1-transcript-vs-workflow.excalidraw": { "chapter": "06", "index": 1, "title": "Transcript vs workflow" },
    "ch06-fig2-human-control-plane.excalidraw": { "chapter": "06", "index": 2, "title": "The human control plane" },
    "ch06-fig3-subagents-need-recompose.excalidraw": { "chapter": "06", "index": 3, "title": "Subagents need recomposition" },
    "ch07-fig1-authority-boundary-collapse.excalidraw": { "chapter": "07", "index": 1, "title": "Authority boundary collapse" },
    "ch07-fig2-scoped-agent-identity.excalidraw": { "chapter": "07", "index": 2, "title": "Scoped agent identity" }
  },
  "maps": {
    "01-readers-path.excalidraw": { "id": "readers-path", "title": "Reader's path", "caption": "A suggested path through the chapters for different reader profiles." },
    "02-methodology-deep-dive.excalidraw": { "id": "methodology-deep-dive", "title": "Methodology deep-dive", "caption": "For readers who want to inspect The Method itself." }
  }
}
```

NOTE on completeness: the `inline` section above lists the 20 figures known to exist for chapters 1–7. Chapters 8, 9, 10 may add more over time. The sync script (Task 8) is tolerant — any source PNG without a meta entry logs a warning and falls back to a humanized title. After authoring, run:

```bash
cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book
ls diagrams/inline/*.png | wc -l
```

If the count is greater than 20, append entries for the missing files into `inline`.

- [ ] **Step 2: Commit**

```bash
git add website/scripts/diagram-meta.json
git commit -m "feat(website): add diagram metadata source for sync script"
```

### Task 8: Write the sync-diagrams script

**Files:**
- Create: `website/scripts/sync-diagrams.mjs`
- Modify: `website/package.json` (add `sync-diagrams` and `prebuild` scripts)

- [ ] **Step 1: Create the sync script**

```js
// website/scripts/sync-diagrams.mjs
// Copies diagrams from ../../diagrams/ into ./public/diagrams/ under an
// organized layout. Emits public/diagrams/manifest.json from diagram-meta.json.
// Idempotent: copies only when source is newer than destination.

import { readFile, writeFile, mkdir, stat, copyFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const websiteRoot = resolve(__dirname, '..');
const diagramsRoot = join(repoRoot, 'diagrams');
const publicDiagrams = join(websiteRoot, 'public', 'diagrams');
const metaPath = join(__dirname, 'diagram-meta.json');

const log = (...args) => console.log('[sync-diagrams]', ...args);
const warn = (...args) => console.warn('[sync-diagrams][warn]', ...args);

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function newer(src, dst) {
  if (!existsSync(dst)) return true;
  const [a, b] = await Promise.all([stat(src), stat(dst)]);
  return a.mtimeMs > b.mtimeMs;
}

async function copyIfNewer(src, dst) {
  if (await newer(src, dst)) {
    await ensureDir(dirname(dst));
    await copyFile(src, dst);
    return true;
  }
  return false;
}

function humanize(s) {
  return s
    .replace(/^\d+-/, '')
    .replace(/\.(excalidraw|png)$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function listPngs(dir) {
  if (!existsSync(dir)) return [];
  return (await readdir(dir)).filter((f) => f.endsWith('.png')).sort();
}

async function main() {
  const metaRaw = await readFile(metaPath, 'utf8');
  const meta = JSON.parse(metaRaw);

  let copied = 0;
  let kept = 0;
  const manifest = { overview: [], openers: [], concepts: [], inline: [], maps: [] };

  // OVERVIEW: 4 diagrams at diagrams/0{1..4}-*.png
  for (const sourceFile of Object.keys(meta.overview)) {
    const srcPng = join(diagramsRoot, sourceFile.replace('.excalidraw', '.png'));
    if (!existsSync(srcPng)) {
      console.error(`[sync-diagrams][error] missing source: ${srcPng}`);
      process.exitCode = 1;
      continue;
    }
    const m = meta.overview[sourceFile];
    const dst = join(publicDiagrams, 'overview', `${m.id}.png`);
    (await copyIfNewer(srcPng, dst)) ? copied++ : kept++;
    manifest.overview.push({
      id: m.id, title: m.title, caption: m.caption,
      src: `/diagrams/overview/${m.id}.png`, sourceFile,
    });
  }

  // OPENERS: 10 diagrams at diagrams/0{5..9},1{0..4}-*.png
  for (const sourceFile of Object.keys(meta.openers)) {
    const srcPng = join(diagramsRoot, sourceFile.replace('.excalidraw', '.png'));
    if (!existsSync(srcPng)) {
      console.error(`[sync-diagrams][error] missing source: ${srcPng}`);
      process.exitCode = 1;
      continue;
    }
    const m = meta.openers[sourceFile];
    const dst = join(publicDiagrams, 'openers', `ch${m.chapter}.png`);
    (await copyIfNewer(srcPng, dst)) ? copied++ : kept++;
    manifest.openers.push({
      chapter: m.chapter, title: m.title,
      src: `/diagrams/openers/ch${m.chapter}.png`, sourceFile,
    });
  }

  // CONCEPTS: diagrams/concepts/*.png; 18 expected
  const conceptPngs = await listPngs(join(diagramsRoot, 'concepts'));
  for (const png of conceptPngs) {
    const sourceFile = png.replace('.png', '.excalidraw');
    const m = meta.concepts[sourceFile];
    if (!m) {
      warn(`no meta entry for concept ${sourceFile} — humanizing title`);
    }
    const id = m?.id ?? png.replace(/^\d+-/, '').replace('.png', '');
    const dst = join(publicDiagrams, 'concepts', `${id}.png`);
    (await copyIfNewer(join(diagramsRoot, 'concepts', png), dst)) ? copied++ : kept++;
    manifest.concepts.push({
      id,
      title: m?.title ?? humanize(png),
      chapter: m?.chapter ?? null,
      summary: m?.summary ?? '',
      src: `/diagrams/concepts/${id}.png`,
      sourceFile,
    });
  }

  // INLINE: diagrams/inline/chXX-figY-*.png
  const inlinePngs = await listPngs(join(diagramsRoot, 'inline'));
  for (const png of inlinePngs) {
    const sourceFile = png.replace('.png', '.excalidraw');
    const m = meta.inline[sourceFile];
    if (!m) {
      warn(`no meta entry for inline ${sourceFile} — humanizing title`);
    }
    // Short id: chXX-figY (first 9 chars of the filename, e.g. "ch01-fig1")
    const shortId = png.slice(0, 9);
    const chapter = m?.chapter ?? shortId.slice(2, 4);
    const index = m?.index ?? Number(shortId.slice(8, 9));
    const dst = join(publicDiagrams, 'inline', `${shortId}.png`);
    (await copyIfNewer(join(diagramsRoot, 'inline', png), dst)) ? copied++ : kept++;
    manifest.inline.push({
      chapter, index,
      title: m?.title ?? humanize(png),
      src: `/diagrams/inline/${shortId}.png`,
      sourceFile,
    });
  }

  // MAPS: diagrams/maps/*.png; 2 expected
  const mapsPngs = await listPngs(join(diagramsRoot, 'maps'));
  for (const png of mapsPngs) {
    const sourceFile = png.replace('.png', '.excalidraw');
    const m = meta.maps[sourceFile];
    if (!m) {
      warn(`no meta entry for map ${sourceFile} — humanizing title`);
    }
    const id = m?.id ?? png.replace(/^\d+-/, '').replace('.png', '');
    const dst = join(publicDiagrams, 'maps', `${id}.png`);
    (await copyIfNewer(join(diagramsRoot, 'maps', png), dst)) ? copied++ : kept++;
    manifest.maps.push({
      id,
      title: m?.title ?? humanize(png),
      caption: m?.caption ?? '',
      src: `/diagrams/maps/${id}.png`,
      sourceFile,
    });
  }

  // Sort for deterministic manifest
  manifest.openers.sort((a, b) => a.chapter.localeCompare(b.chapter));
  manifest.concepts.sort((a, b) => a.id.localeCompare(b.id));
  manifest.inline.sort((a, b) => a.chapter.localeCompare(b.chapter) || a.index - b.index);
  manifest.maps.sort((a, b) => a.id.localeCompare(b.id));

  await ensureDir(publicDiagrams);
  await writeFile(join(publicDiagrams, 'manifest.json'), JSON.stringify(manifest, null, 2));

  log(`done. copied=${copied} kept=${kept} manifest=public/diagrams/manifest.json`);
  log(`counts: overview=${manifest.overview.length} openers=${manifest.openers.length} concepts=${manifest.concepts.length} inline=${manifest.inline.length} maps=${manifest.maps.length}`);
}

main().catch((err) => {
  console.error('[sync-diagrams][fatal]', err);
  process.exit(1);
});
```

- [ ] **Step 2: Add `sync-diagrams` + `prebuild` scripts to `package.json`**

In `website/package.json` `scripts`:

```json
"sync-diagrams": "node scripts/sync-diagrams.mjs",
"prebuild": "node scripts/sync-diagrams.mjs",
"build": "vite build"
```

(npm runs `prebuild` automatically before `build`.)

- [ ] **Step 3: Delete the 14 stale PNGs that are already in `public/diagrams/`**

```bash
cd website/public/diagrams
ls *.png 2>/dev/null | wc -l   # should be 14
rm -f ./*.png
ls   # should be empty now
```

- [ ] **Step 4: Run the sync script**

```bash
cd website && npm run sync-diagrams
```

Expected output:
- `[sync-diagrams] done. copied=64 kept=0 manifest=...` (numbers may vary slightly based on inline count)
- `[sync-diagrams] counts: overview=4 openers=10 concepts=18 inline=20+ maps=2`
- Exit code 0.

If exit code is 1, a source PNG was missing — fix `diagram-meta.json` or regenerate the diagram.

- [ ] **Step 5: Inspect generated layout**

```bash
find website/public/diagrams -type f | sort
head -50 website/public/diagrams/manifest.json
```

Expected: organised subdirectories with renamed PNGs, manifest with the right counts.

- [ ] **Step 6: Update chapter opener paths to the new organised layout** (temporary; the manifest replaces this in Task 17)

In `website/src/components/chapter/ChapterArticle.tsx`:

```ts
const chapterDiagram: Record<string, string> = {
  '01': '/diagrams/openers/ch01.png',
  '02': '/diagrams/openers/ch02.png',
  '03': '/diagrams/openers/ch03.png',
  '04': '/diagrams/openers/ch04.png',
  '05': '/diagrams/openers/ch05.png',
  '06': '/diagrams/openers/ch06.png',
  '07': '/diagrams/openers/ch07.png',
  '08': '/diagrams/openers/ch08.png',
  '09': '/diagrams/openers/ch09.png',
  '10': '/diagrams/openers/ch10.png',
};
```

- [ ] **Step 7: Verify build still works**

```bash
cd website && npm run build
```

Expected: build succeeds. The prebuild step runs the sync (idempotent — `kept=64`).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(website): add diagram sync script + manifest; reorganize public/diagrams/"
```

### Task 9: Add typed manifest loader

**Files:**
- Create: `website/src/lib/manifest.ts`
- Create: `website/src/lib/manifest.test.ts`
- Modify: `website/tsconfig.json` (ensure `resolveJsonModule: true`)

- [ ] **Step 1: Ensure tsconfig supports JSON imports**

Check `website/tsconfig.json`. The `compilerOptions` block must contain:

```json
"resolveJsonModule": true,
"esModuleInterop": true
```

If either is missing, add it.

- [ ] **Step 2: Create the typed loader**

```ts
// website/src/lib/manifest.ts
import manifestRaw from '../../public/diagrams/manifest.json';

export type OverviewDiagram = {
  id: string;
  title: string;
  caption: string;
  src: string;
  sourceFile: string;
};

export type OpenerDiagram = {
  chapter: string;
  title: string;
  src: string;
  sourceFile: string;
};

export type ConceptDiagram = {
  id: string;
  title: string;
  chapter: string | null;
  summary: string;
  src: string;
  sourceFile: string;
};

export type InlineDiagram = {
  chapter: string;
  index: number;
  title: string;
  src: string;
  sourceFile: string;
};

export type MapDiagram = {
  id: string;
  title: string;
  caption: string;
  src: string;
  sourceFile: string;
};

export type DiagramManifest = {
  overview: OverviewDiagram[];
  openers: OpenerDiagram[];
  concepts: ConceptDiagram[];
  inline: InlineDiagram[];
  maps: MapDiagram[];
};

export const manifest = manifestRaw as DiagramManifest;

export const opener = (chapter: string): OpenerDiagram | undefined =>
  manifest.openers.find((o) => o.chapter === chapter);

export const inlineFigsForChapter = (chapter: string): InlineDiagram[] =>
  manifest.inline
    .filter((f) => f.chapter === chapter)
    .sort((a, b) => a.index - b.index);

export const conceptById = (id: string): ConceptDiagram | undefined =>
  manifest.concepts.find((c) => c.id === id);
```

- [ ] **Step 3: Add manifest test**

```ts
// website/src/lib/manifest.test.ts
import { describe, it, expect } from 'vitest';
import { manifest, opener, inlineFigsForChapter, conceptById } from './manifest';

describe('manifest', () => {
  it('has the expected counts', () => {
    expect(manifest.overview).toHaveLength(4);
    expect(manifest.openers).toHaveLength(10);
    expect(manifest.concepts).toHaveLength(18);
    expect(manifest.inline.length).toBeGreaterThanOrEqual(20);
    expect(manifest.maps).toHaveLength(2);
  });

  it('opener() returns the chapter opener', () => {
    const op = opener('03');
    expect(op).toBeDefined();
    expect(op?.src).toBe('/diagrams/openers/ch03.png');
  });

  it('inlineFigsForChapter() returns figs sorted by index', () => {
    const figs = inlineFigsForChapter('01');
    expect(figs.length).toBeGreaterThan(0);
    expect(figs[0].index).toBe(1);
  });

  it('conceptById() finds a known concept', () => {
    const c = conceptById('harness-engineering');
    expect(c).toBeDefined();
    expect(c?.chapter).toBe('03');
  });
});
```

- [ ] **Step 4: Run tests**

```bash
cd website && npm test
```

Expected: 4 passed.

- [ ] **Step 5: Build**

```bash
cd website && npm run build
```

Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(website): add typed diagram manifest loader + tests"
```

---

## Phase 3 — Router shell

### Task 10: Add wouter and split into pages

**Files:**
- Modify: `website/package.json` (add `wouter`)
- Create: `website/src/router.tsx`
- Create: `website/src/pages/Catalogue.tsx` (placeholder)
- Create: `website/src/pages/VisualGuide.tsx` (placeholder)
- Create: `website/src/pages/Reader.tsx` (lifted from current App.tsx)
- Modify: `website/src/App.tsx` (becomes the router shell)

- [ ] **Step 1: Install wouter**

```bash
cd website && npm install wouter@^3
```

- [ ] **Step 2: Create `pages/Reader.tsx`**

This file becomes what `App.tsx` currently is, minus the routing wrapper. Copy the current `App()` default export's full body into:

```tsx
// website/src/pages/Reader.tsx
import { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import Lenis from 'lenis';

import { TopNav } from '../components/nav/TopNav';
import { BottomNav } from '../components/nav/BottomNav';
import { Hero } from '../components/chapter/Hero';
import { FullBookReader } from '../components/chapter/FullBookReader';
import { Sidebar } from '../components/drawers/Sidebar';
import { SettingsModal, type Settings } from '../components/modals/SettingsModal';

export const Reader = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShowBackToTop(latest > 300);
  });

  const [settings, setSettings] = useState<Settings>({
    theme: 'sepia',
    typography: 'serif',
    fontSize: 'md',
    lineSpacing: 'relaxed',
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const themeVars = useMemo(() => {
    // ... copy the existing themeVars body verbatim from current App.tsx
    return {};
  }, [settings]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
  }, [isSidebarOpen]);

  return (
    <div
      className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-pink)] font-sans antialiased pb-12 overflow-x-hidden transition-colors duration-300"
      style={themeVars as React.CSSProperties}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} settings={settings} updateSettings={updateSettings} />
      <TopNav progress={scrollYProgress} onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)} />
      <main className="relative pt-14">
        <Hero />
        <FullBookReader />
      </main>
      <BottomNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} progress={scrollYProgress} />

      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showBackToTop ? 1 : 0, y: showBackToTop ? 0 : 50 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-24 right-8 w-12 h-12 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-full flex items-center justify-center shadow-lg border border-[var(--color-border)] hover:scale-110 transition-transform z-40 ${showBackToTop ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        ↑
      </motion.button>
    </div>
  );
};
```

(Copy the actual `themeVars` body from the current App.tsx — the version above is a stub for the surrounding structure only.)

- [ ] **Step 3: Create `pages/Catalogue.tsx` placeholder**

```tsx
// website/src/pages/Catalogue.tsx
import { Link } from 'wouter';

export const Catalogue = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#1F1D1B] text-white font-serif">
    <div className="text-center space-y-4">
      <h1 className="text-5xl italic">Catalogue (placeholder)</h1>
      <p className="text-white/60">From Copilot to Colleague</p>
      <Link href="/read" className="underline">→ Open the Reader</Link>
    </div>
  </div>
);
```

- [ ] **Step 4: Create `pages/VisualGuide.tsx` placeholder**

```tsx
// website/src/pages/VisualGuide.tsx
import { Link } from 'wouter';

export const VisualGuide = () => (
  <div className="min-h-screen p-12 bg-[var(--color-paper)] text-[var(--color-ink)] font-serif">
    <h1 className="text-5xl italic mb-8">Visual Guide (placeholder)</h1>
    <Link href="/" className="underline">← Back to catalogue</Link>
  </div>
);
```

- [ ] **Step 5: Create `router.tsx`**

```tsx
// website/src/router.tsx
import { Route, Switch } from 'wouter';
import { Catalogue } from './pages/Catalogue';
import { VisualGuide } from './pages/VisualGuide';
import { Reader } from './pages/Reader';

export const Router = () => (
  <Switch>
    <Route path="/" component={Catalogue} />
    <Route path="/visual-guide" component={VisualGuide} />
    <Route path="/read" component={Reader} />
    <Route>
      <Catalogue />
    </Route>
  </Switch>
);
```

- [ ] **Step 6: Replace `App.tsx` with the router shell**

```tsx
// website/src/App.tsx
import { Router } from './router';

export default function App() {
  return <Router />;
}
```

- [ ] **Step 7: Build + smoke test all three routes**

```bash
cd website && npm run build && npm run dev &
sleep 3
curl -s http://localhost:3000/ | grep -c "Catalogue (placeholder)"
curl -s http://localhost:3000/read | grep -c "id=\"root\""
curl -s http://localhost:3000/visual-guide | grep -c "Visual Guide (placeholder)"
kill %1
```

Expected: each `curl` returns at least `1`. (SPA + Vite dev serves the same `index.html` for all paths; placeholder text is rendered client-side. To confirm client-side routing, open `http://localhost:3000/`, `/read`, `/visual-guide` in a real browser.)

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(website): add wouter routing — / catalogue, /visual-guide, /read"
```

---

## Phase 4 — Catalogue page

### Task 11: Pull upstream `audio.ts`

**Files:**
- Create: `website/src/lib/audio.ts`
- Create: `website/src/lib/audio.test.ts`

- [ ] **Step 1: Create `audio.ts`**

```ts
// website/src/lib/audio.ts
// Adapted from isatimur/bookshelf@c2a5909 (audio.ts).
// ScrollAudioFeedback provides a low-cost mechanical/paper tick on demand.
export class ScrollAudioFeedback {
  private audioCtx: AudioContext | null = null;
  private lastTickTime = 0;
  private lastOut = 0;

  public initialize() {
    if (!this.audioCtx) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (Ctx) this.audioCtx = new Ctx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playTick(intensity: number = 0.015) {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;

    const now = this.audioCtx.currentTime;
    if (now - this.lastTickTime < 0.05) return;
    this.lastTickTime = now;

    const bufferSize = this.audioCtx.sampleRate * 0.04;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (this.lastOut = this.lastOut * 0.8 + white * 0.2);
    }

    const noiseSource = this.audioCtx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(0.5, now);

    const gainNode = this.audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(intensity, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    noiseSource.start(now);
    noiseSource.stop(now + 0.04);
  }
}

export const scrollAudio = new ScrollAudioFeedback();
```

- [ ] **Step 2: Sanity test**

```ts
// website/src/lib/audio.test.ts
import { describe, it, expect } from 'vitest';
import { ScrollAudioFeedback, scrollAudio } from './audio';

describe('ScrollAudioFeedback', () => {
  it('exports a singleton instance', () => {
    expect(scrollAudio).toBeInstanceOf(ScrollAudioFeedback);
  });

  it('initialize() does not throw in a non-browser environment', () => {
    const fb = new ScrollAudioFeedback();
    expect(() => fb.initialize()).not.toThrow();
  });

  it('playTick() is a no-op when not initialised', () => {
    const fb = new ScrollAudioFeedback();
    expect(() => fb.playTick()).not.toThrow();
  });
});
```

- [ ] **Step 3: Run tests**

```bash
cd website && npm test
```

Expected: 3 passed.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(website): add scroll audio feedback class from upstream"
```

### Task 12: Write the About-the-Lab essay

**Files:**
- Create: `website/src/content/about-the-lab.md`

- [ ] **Step 1: Author the essay using CONTEXT.md vocabulary**

```md
<!-- website/src/content/about-the-lab.md -->
I've been running a slightly unusual experiment.

This is **The Lab**: a public project that tries to produce a real, source-backed book on AI engineering by running autonomous research-and-writing loops over a corpus of practitioner talks. The AI Engineer YouTube channel — ~693 videos — is the primary source brain.

The deliverable is not just **The Manuscript** (the chapter drafts you're reading). The deliverable is **The Method** — a reproducible research-and-writing machine that turns source material into:

- structured notes
- theme, people, and concept synthesis
- verified **Claims** with **Source Anchors** (precise pointers: video id + timestamp)
- chapter packets and drafting artifacts
- and, eventually, a real manuscript

The field evolves too quickly, the noise is too high, and the same ideas get repeated in slightly different packaging every week. So The Lab is partly about writing a book — and partly about building a system that helps me:

- stay current
- clean signal from noise
- identify the ideas that seem durable
- and distill the strongest patterns that already have evidence behind them

The current workflow looks like this:

> videos → claims → source anchors → chapter drafts → public iterations

And I'm trying to push it further in an autoresearch-inspired direction:

- bounded research passes
- self-improving instructions
- source-fidelity checks
- quality judges for summaries, claims, and chapters
- metrics around coverage, coherence, and drift

So **The Manuscript** is really the visible output of a larger experiment: *Can a book become a public, self-improving research artifact?*

Right now the main source brain is AI Engineer, but I'm curious about expanding it. What channels, newsletters, podcasts, researchers, or source streams do you personally rely on to track what actually matters in AI engineering?

If you were building the source brain for a serious book on AI engineering, what would you include beyond AI Engineer?

I'm also curious whether this kind of output would be useful to people, and in what form:

— distilled essays
— concept maps
— chapter drafts
— operator playbooks
— visual / cohort-friendly versions
— something else

This started as "let's make better notes." It's turning into something closer to: **a public experiment in writing, judging, and continuously improving The Method that produces The Manuscript.**
```

- [ ] **Step 2: Commit**

```bash
git add website/src/content/about-the-lab.md
git commit -m "feat(website): add About-the-Lab essay using CONTEXT.md vocabulary"
```

### Task 13: Build the Catalogue page

**Files:**
- Modify: `website/src/pages/Catalogue.tsx` (replace placeholder)

- [ ] **Step 1: Replace the placeholder with the single-book catalogue**

```tsx
// website/src/pages/Catalogue.tsx
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'wouter';
import { scrollAudio } from '../lib/audio';
import { MarkdownBlock } from '../components/text/MarkdownBlock';
import aboutLabRaw from '../content/about-the-lab.md?raw';

type Book = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  coverImage: string;
  spineColor: string;
  category: string;
};

const BOOK: Book = {
  id: 'from-copilot-to-colleague',
  title: 'From Copilot to Colleague',
  subtitle: 'How AI Engineering Turns Models into Dependable Systems',
  author: 'Timur Isachenko',
  coverImage: '/covers/from-copilot-to-colleague.png',
  spineColor: '#1A1A1A',
  category: 'AI Engineering',
};

export const Catalogue = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSelect = () => {
    scrollAudio.initialize();
    setTransitioning(true);
    setTimeout(() => setLocation('/read'), 2400);
  };

  const aboutBlocks = aboutLabRaw.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#1F1D1B] text-[#F9F7F1] font-serif relative overflow-hidden"
    >
      <header className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto flex items-start gap-4">
          <div className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-sm">
            <span className="font-serif italic text-xl leading-none">AE</span>
          </div>
          <div>
            <h1 className="font-sans font-medium text-sm tracking-wide">AI Engineer Press</h1>
            <p className="font-serif italic text-white/60 text-sm">Ideas for progress</p>
          </div>
        </div>
        <nav className="pointer-events-auto text-xs font-mono uppercase tracking-widest text-white/60 flex gap-6">
          <a href="/visual-guide" className="hover:text-white">Visual Guide</a>
          <a href="/read" className="hover:text-white">Read</a>
        </nav>
      </header>

      <main className="pt-32 pb-48 max-w-[50rem] mx-auto px-6 flex flex-col gap-8 relative z-10" style={{ perspective: '2500px' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleSelect}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer relative"
        >
          <div
            className="relative w-full shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border border-transparent"
            style={{
              height: '110px',
              backgroundColor: BOOK.spineColor,
              borderRadius: '3px',
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
              transform: isHovered
                ? 'translateY(40px) scale(1.05) rotateX(65deg) rotateZ(-6deg) rotateY(-5deg)'
                : 'translateY(0px) scale(1) rotateX(0deg) rotateZ(0deg) rotateY(0deg)',
              boxShadow: isHovered
                ? '0 60px 80px -20px rgba(0,0,0,0.7), 0 0 40px rgba(255,255,255,0.1)'
                : '0 25px 50px -12px rgba(0,0,0,0.4), inset 0 2px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.4), inset 4px 0 8px rgba(0,0,0,0.2), inset -4px 0 8px rgba(0,0,0,0.2)',
            }}
          >
            <div
              className="absolute left-0 right-0 origin-bottom transition-opacity duration-500 rounded-t-lg overflow-hidden border border-white/10"
              style={{
                height: '600px',
                bottom: '100%',
                transform: 'rotateX(-90deg)',
                backfaceVisibility: 'hidden',
                backgroundColor: '#111',
                opacity: isHovered ? 1 : 0,
                pointerEvents: 'none',
              }}
            >
              <img src={BOOK.coverImage} className="w-full h-full object-cover" alt={`${BOOK.title} cover`} />
            </div>

            <div className="absolute inset-0 overflow-hidden flex items-center px-12 border-l-[6px] border-black/10" style={{ transform: 'translateZ(1px)' }}>
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 mix-blend-overlay" />
              <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent" />
              <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-white/10 to-transparent" />

              <div className="relative w-full flex items-center justify-between z-10">
                <span className="font-serif text-2xl italic flex-shrink-0 w-1/4 text-left text-[#F9F7F1]">{BOOK.author}</span>
                <span className="font-sans font-medium uppercase tracking-widest text-sm flex-1 text-center opacity-90 text-[#F9F7F1]">{BOOK.title}</span>
                <div className="w-1/4 h-8 flex items-center justify-end flex-shrink-0">
                  <span className="font-serif italic text-lg opacity-50 text-white">AE</span>
                </div>
              </div>
              <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
              <div className="absolute right-24 top-0 bottom-0 w-px bg-black/10" />
            </div>
          </div>
        </motion.div>

        <p className="text-center font-serif italic text-white/60 text-sm mt-4">Hover to lift the cover · click to open</p>
      </main>

      <footer className="relative z-10 pt-24 pb-48 px-6 md:px-12 max-w-3xl mx-auto border-t border-white/10 mt-12 text-white/70">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 about-the-lab"
        >
          <h2 className="font-serif italic text-3xl md:text-4xl text-white">About the Lab</h2>
          <div className="font-sans font-light text-sm md:text-base leading-relaxed space-y-6">
            {aboutBlocks.map((block, i) => (
              <MarkdownBlock key={i} block={block} />
            ))}
          </div>
        </motion.div>
      </footer>

      <div className="fixed bottom-8 right-6 text-white/40 rotate-180 mix-blend-difference z-0" style={{ writingMode: 'vertical-rl' }}>
        <span className="font-mono text-[10px] tracking-widest uppercase">Volume I</span>
      </div>

      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0, pointerEvents: 'none' }}
            animate={{ opacity: 1, pointerEvents: 'auto' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1F1D1B] overflow-hidden"
            style={{ perspective: '2000px' }}
          >
            <motion.div
              initial={{ scale: 0.5, y: 150, rotateX: 25, rotateY: -15, z: -500 }}
              animate={{
                scale: [0.5, 1.2, 5],
                y: [150, 0, 0],
                rotateX: [25, 0, 0],
                rotateY: [-15, 0, 0],
                z: [-500, 0, 800],
              }}
              transition={{ duration: 2.3, ease: [0.64, 0.04, 0.35, 1], times: [0, 0.4, 1] }}
              className="w-[280px] sm:w-[360px] aspect-[2/3] shadow-2xl relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute inset-0 bg-[#F9F7F1] shadow-[inset_-4px_0_15px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col items-center justify-center p-8 text-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="font-serif text-[#1F1D1B]"
                >
                  <p className="italic text-sm mb-4">Dedicated to</p>
                  <h3 className="text-lg sm:text-xl font-medium mb-6">The AI Engineer Community</h3>
                  <p className="text-[10px] sm:text-xs opacity-60 max-w-[180px] leading-relaxed mx-auto">
                    For those building the reasoning machines of tomorrow, on the strange new frontiers of software.
                  </p>
                </motion.div>
              </div>
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -170 }}
                transition={{ delay: 0.5, duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 origin-left"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img src={BOOK.coverImage} className="absolute inset-0 w-full h-full object-cover shadow-[4px_0_10px_rgba(0,0,0,0.3)]" style={{ backfaceVisibility: 'hidden' }} alt="" />
                <div className="absolute inset-0 bg-[#E8E8E8] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.1)] border-l border-white/50" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }} />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1] }}
              transition={{ duration: 2.3, times: [0, 0.75, 1] }}
              className="absolute inset-0 bg-[var(--color-paper)] z-50 pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

- [ ] **Step 2: Add a placeholder cover so the build does not 404**

Until Task 24 generates a real cover, use the spine diagram as a temporary cover:

```bash
mkdir -p website/public/covers
cp diagrams/01-book-argument-spine.png website/public/covers/from-copilot-to-colleague.png
```

- [ ] **Step 3: Build + visual smoke test**

```bash
cd website && npm run build && npm run dev &
sleep 3
echo "Open http://localhost:3000/ in a browser to verify the spine renders + click flips into /read"
sleep 2
kill %1
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(website): build catalogue page — single book spine + about-the-lab"
```

---

## Phase 5 — Visual Guide page

### Task 14: Build the Visual Guide page

**Files:**
- Modify: `website/src/pages/VisualGuide.tsx` (replace placeholder)
- Create: `website/src/components/Lightbox.tsx`

- [ ] **Step 1: Create the Lightbox component**

A hand-rolled `<dialog>`-flavoured overlay keeps the dependency surface tiny.

```tsx
// website/src/components/Lightbox.tsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Props = {
  open: boolean;
  src?: string;
  title?: string;
  caption?: string;
  chapterRef?: string | null;
  onClose: () => void;
};

export const Lightbox = ({ open, src, title, caption, chapterRef, onClose }: Props) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl font-mono"
          >
            [X]
          </button>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={src} alt={title ?? ''} className="block w-full h-auto" />
            {(title || caption || chapterRef) && (
              <div className="border-t p-6 font-serif text-[#1F1D1B]">
                {title && <h3 className="text-xl font-medium mb-2">{title}</h3>}
                {caption && <p className="text-sm leading-relaxed opacity-80 mb-3">{caption}</p>}
                {chapterRef && (
                  <a
                    href={`/read#book-chapter-${chapterRef}`}
                    className="text-xs font-mono uppercase tracking-widest underline"
                  >
                    Appears in chapter {chapterRef} →
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

- [ ] **Step 2: Build the Visual Guide page**

```tsx
// website/src/pages/VisualGuide.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { manifest } from '../lib/manifest';
import { Lightbox } from '../components/Lightbox';

export const VisualGuide = () => {
  const [location] = useLocation();
  const [lightbox, setLightbox] = useState<{ src: string; title: string; caption: string; chapterRef: string | null } | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#concept-')) {
      const id = hash.slice('#concept-'.length);
      const el = document.getElementById(`concept-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1F1D1B] font-serif">
      <header className="border-b border-black/10 px-6 lg:px-12 py-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
        <a href="/" className="hover:opacity-60">← Catalogue</a>
        <span>From Copilot to Colleague · Visual Guide</span>
        <a href="/read" className="hover:opacity-60">Reader →</a>
      </header>

      <section className="px-6 lg:px-12 py-20 max-w-5xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-3">The book at a glance</h1>
        <p className="font-sans text-sm opacity-60 mb-16 max-w-xl">Four diagrams for the whole project: its argument, how it is made, its central thesis, and its evidence base.</p>
        <div className="space-y-24">
          {manifest.overview.map((d) => (
            <figure key={d.id}>
              <div className="border border-black/10 bg-white">
                <img src={d.src} alt={d.title} className="block w-full h-auto" />
              </div>
              <figcaption className="mt-6 md:flex md:items-start md:gap-12">
                <h2 className="font-serif text-2xl italic md:w-1/3 mb-3 md:mb-0">{d.title}</h2>
                <p className="font-sans text-base leading-relaxed md:w-2/3 opacity-80">{d.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 max-w-5xl mx-auto border-t border-black/10">
        <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-3">How to read this book</h1>
        <p className="font-sans text-sm opacity-60 mb-16 max-w-xl">Two maps — one for the reader's path, one for inspecting The Method itself.</p>
        <div className="space-y-24">
          {manifest.maps.map((m) => (
            <figure key={m.id}>
              <div className="border border-black/10 bg-white">
                <img src={m.src} alt={m.title} className="block w-full h-auto" />
              </div>
              <figcaption className="mt-6 md:flex md:items-start md:gap-12">
                <h2 className="font-serif text-2xl italic md:w-1/3 mb-3 md:mb-0">{m.title}</h2>
                <p className="font-sans text-base leading-relaxed md:w-2/3 opacity-80">{m.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="concepts" className="px-6 lg:px-12 py-20 max-w-7xl mx-auto border-t border-black/10">
        <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-3">Concepts</h1>
        <p className="font-sans text-sm opacity-60 mb-16 max-w-xl">Eighteen ideas that recur across the book. Click a card for the full diagram.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manifest.concepts.map((c) => (
            <button
              key={c.id}
              id={`concept-${c.id}`}
              onClick={() => setLightbox({ src: c.src, title: c.title, caption: c.summary, chapterRef: c.chapter })}
              className="text-left border border-black/10 bg-white hover:shadow-xl transition-shadow group"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#F8F6F0]">
                <img src={c.src} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg leading-tight mb-2">{c.title}</h3>
                {c.chapter && (
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">Chapter {c.chapter}</p>
                )}
                <p className="font-sans text-sm leading-relaxed opacity-80">{c.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <Lightbox
        open={lightbox !== null}
        src={lightbox?.src}
        title={lightbox?.title}
        caption={lightbox?.caption}
        chapterRef={lightbox?.chapterRef}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
};
```

- [ ] **Step 3: Build + smoke test**

```bash
cd website && npm run build && npm run dev &
sleep 3
echo "Open http://localhost:3000/visual-guide to verify all sections render"
echo "Open http://localhost:3000/visual-guide#concept-harness-engineering to verify deep linking"
sleep 2
kill %1
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(website): build visual guide page — overview, maps, concepts grid + lightbox"
```

---

## Phase 6 — Reader: replace woodcut with real diagrams

### Task 15: Add `← Catalogue` button to TopNav

**Files:**
- Modify: `website/src/components/nav/TopNav.tsx`
- Modify: `website/src/pages/Reader.tsx`

- [ ] **Step 1: Extend TopNav**

Replace the entire file:

```tsx
// website/src/components/nav/TopNav.tsx
import { motion, useTransform } from 'motion/react';

type Props = {
  progress: any;
  onToggleSettings: () => void;
  onBackToCatalogue?: () => void;
  onOpenShare?: () => void;
};

export const TopNav = ({ progress, onToggleSettings, onBackToCatalogue, onOpenShare }: Props) => {
  const displayProgress = useTransform(progress, (p: number) => `${(p * 100).toFixed(2)}%`);
  return (
    <header className="fixed top-0 left-0 right-0 h-14 border-b border-[var(--color-border)] flex items-center justify-between px-4 lg:px-6 text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] z-50 bg-[var(--color-paper)]/95 backdrop-blur transition-colors duration-300">
      <div className="flex items-center gap-3 lg:gap-4">
        {onBackToCatalogue && (
          <button
            onClick={onBackToCatalogue}
            aria-label="Back to catalogue"
            className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            ← Catalogue
          </button>
        )}
        <span className="font-bold bg-[var(--color-ink)] text-[var(--color-paper)] px-2 py-1 rounded-[1px] transition-colors duration-300">AI PRESS</span>
        <span className="border-l border-[var(--color-border)] h-4 hidden sm:block transition-colors duration-300" />
        <span className="hidden sm:inline tracking-widest bg-transparent">FROM COPILOT TO COLLEAGUE</span>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden lg:flex items-center gap-4 text-[var(--color-ink-muted)] relative top-[1px] transition-colors duration-300">
          <span>AI ENGINEER KB</span>
          <span className="border-l border-[var(--color-border)] h-4 transition-colors duration-300" />
          <a href="/visual-guide" className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">VISUAL GUIDE</a>
          <span className="border-l border-[var(--color-border)] h-4 transition-colors duration-300" />
          <span className="text-[var(--color-ink)] transition-colors duration-300">BOOK READER</span>
        </div>
        <div className="border border-[var(--color-border)] rounded-full px-3 py-1 font-mono tabular-nums flex items-center justify-center min-w-[5.5rem] bg-[var(--color-paper)] transition-colors duration-300 relative overflow-hidden group">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-[var(--color-ink)]/20"
            style={{ width: useTransform(progress, (p: number) => `${p * 100}%`) }}
          />
          <motion.span className="relative z-10">{displayProgress}</motion.span>
        </div>
        {onOpenShare && (
          <button
            onClick={onOpenShare}
            aria-label="Share"
            className="border border-[var(--color-border)] rounded-full px-3 py-1 hover:bg-black/5 transition-colors"
          >
            Share
          </button>
        )}
        <button onClick={onToggleSettings} className="border border-[var(--color-border)] rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/5 transition-colors font-serif italic text-sm">
          Aa
        </button>
      </div>
    </header>
  );
};
```

- [ ] **Step 2: Wire `onBackToCatalogue` in Reader**

In `website/src/pages/Reader.tsx`, import wouter's `useLocation`:

```tsx
import { useLocation } from 'wouter';
// inside Reader():
const [, setLocation] = useLocation();
// in the JSX:
<TopNav
  progress={scrollYProgress}
  onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
  onBackToCatalogue={() => setLocation('/')}
/>
```

(`onOpenShare` is wired in Task 21.)

- [ ] **Step 3: Build**

```bash
cd website && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(website): add ← Catalogue + Visual Guide links to reader top nav"
```

### Task 16: Replace ChapterIllustration woodcut with cropped opener

**Files:**
- Modify: `website/src/components/chapter/ChapterIllustration.tsx`
- Modify: `website/src/components/chapter/FullBookReader.tsx`

- [ ] **Step 1: Rewrite ChapterIllustration**

Replace the entire file:

```tsx
// website/src/components/chapter/ChapterIllustration.tsx
import { type BookChapter } from '../../data/bookChapters';
import { opener } from '../../lib/manifest';

export const ChapterIllustration = ({ chapter }: { chapter: BookChapter; index?: number }) => {
  const op = opener(chapter.number);
  if (!op) return null;

  return (
    <div className="relative z-20 w-full max-w-md">
      <div
        className="aspect-[4/3] w-full bg-cover bg-center border border-white/20 shadow-2xl"
        role="img"
        aria-label={`${op.title} — chapter ${chapter.number} opener`}
        style={{
          backgroundImage: `linear-gradient(rgba(31,31,32,0.45), rgba(31,31,32,0.45)), url(${op.src})`,
        }}
      />
      <div className="mt-6 border-t border-white/20 pt-5 font-mono text-[10px] uppercase tracking-widest text-white/60">
        <span>Fig. {chapter.number}</span>
        <span className="mx-3">/</span>
        <span>{op.title}</span>
      </div>
    </div>
  );
};
```

Note: this file previously exported `chapterIllustrations`, `illustrationSheet`, `chapterVisualGuides`, `getChapterGuide`. Those exports are removed. `InlineIllustration` and `ChapterArticle` are updated in the next task.

- [ ] **Step 2: Update FullBookReader to drop the now-unused `index` prop**

In `website/src/components/chapter/FullBookReader.tsx`:

```tsx
<ChapterIllustration chapter={chapter} />
```

(Drop `index={index}`.)

- [ ] **Step 3: Build is expected to FAIL** (InlineIllustration and ChapterArticle still import removed exports)

```bash
cd website && npm run build
```

Expected: errors about `chapterIllustrations`, `illustrationSheet`, `getChapterGuide` not exported. Do NOT commit until Task 17 completes the swap.

### Task 17: Replace InlineIllustration source and drop ConceptMap

**Files:**
- Modify: `website/src/components/chapter/InlineIllustration.tsx`
- Modify: `website/src/components/chapter/ChapterArticle.tsx`

- [ ] **Step 1: Rewrite InlineIllustration**

```tsx
// website/src/components/chapter/InlineIllustration.tsx
import { type InlineDiagram } from '../../lib/manifest';

type Props = {
  fig: InlineDiagram;
  label: string;
};

export const InlineIllustration = ({ fig, label }: Props) => (
  <figure className="my-12 border border-[var(--color-border)] bg-white">
    <img src={fig.src} alt={fig.title} className="block w-full h-auto" loading="lazy" />
    <figcaption className="border-t border-[var(--color-border)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
      <span>{label}</span>
      <span className="mx-3">/</span>
      <span className="normal-case font-serif tracking-normal">{fig.title}</span>
    </figcaption>
  </figure>
);
```

- [ ] **Step 2: Rewrite ChapterArticle**

```tsx
// website/src/components/chapter/ChapterArticle.tsx
import React from 'react';
import { type BookChapter } from '../../data/bookChapters';
import { MarkdownBlock } from '../text/MarkdownBlock';
import { InlineIllustration } from './InlineIllustration';
import { opener, inlineFigsForChapter } from '../../lib/manifest';

export const ChapterArticle = ({ chapter }: { chapter: BookChapter }) => {
  const blocks = chapter.content
    .replace(/^# Chapter 3 Draft v0[\s\S]*?---\n+/m, '')
    .replace(/^## Draft note[\s\S]*?---\n+/m, '')
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  const op = opener(chapter.number);
  const figs = inlineFigsForChapter(chapter.number);
  let headingFigureIndex = 0;

  return (
    <article id={`book-chapter-${chapter.number}`} className="book-reader-prose">
      <div className="mb-12 border-b border-[var(--color-border)] pb-8 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        <span>CHAPTER {chapter.number}</span>
        <span className="mx-3">/</span>
        <span>{chapter.wordCount.toLocaleString()} words</span>
        <span className="mx-3">/</span>
        <span>{chapter.status}</span>
      </div>
      <p className="mb-10 text-[1.45rem] leading-[1.35] italic text-[var(--color-ink-muted)]">
        {chapter.promise}
      </p>
      {op && (
        <figure className="mb-12 border border-[var(--color-border)] bg-white">
          <img src={op.src} alt={`Chapter ${chapter.number} — ${op.title}`} className="block h-auto w-full" loading="lazy" />
          <figcaption className="border-t border-[var(--color-border)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
            Fig. {chapter.number} — {op.title}
          </figcaption>
        </figure>
      )}
      {blocks.map((block, index) => (
        <React.Fragment key={`${chapter.number}-${index}`}>
          <MarkdownBlock block={block} />
          {block.startsWith('## ') && headingFigureIndex < figs.length ? (
            <InlineIllustration
              fig={figs[headingFigureIndex]}
              label={`Figure ${chapter.number}.${headingFigureIndex + 1}`}
            />
          ) : null}
          {block.startsWith('## ') ? void (headingFigureIndex += 1) : null}
        </React.Fragment>
      ))}
    </article>
  );
};
```

This drops `ConceptMap`, the woodcut `getChapterGuide`/`chapterVisualGuides` usage, and the now-replaced `chapterDiagram` constant.

- [ ] **Step 3: Build**

```bash
cd website && npm run build
```

Expected: build succeeds.

- [ ] **Step 4: Run dev server and visually inspect**

```bash
cd website && npm run dev &
sleep 3
echo "Open http://localhost:3000/read and scroll through chapters 1–7."
echo "  - Each chapter should show its opener diagram at the top"
echo "  - The dark side panel should show a tinted cropped opener (not woodcut)"
echo "  - Each H2 should be followed by an inline figure where available"
sleep 5
kill %1
```

- [ ] **Step 5: Commit** (combined with Task 16 since they must land together)

```bash
git add -A
git commit -m "feat(website): wire chapter openers + inline figs from manifest; retire woodcut sheet"
```

---

## Phase 7 — Glossary

### Task 18: Author the glossary data

**Files:**
- Create: `website/src/data/glossary.ts`
- Create: `website/src/data/glossary.test.ts`

- [ ] **Step 1: Write the glossary data**

```ts
// website/src/data/glossary.ts
export type GlossaryTerm = {
  id: string;
  display: string[];
  definition: string;
  diagram?: string;
  chapterRef?: string;
};

export const GLOSSARY: GlossaryTerm[] = [
  // ── Lab vocabulary (CONTEXT.md) ─────────────────────────────────────
  {
    id: 'the-lab',
    display: ['The Lab'],
    definition: 'The public experiment itself — corpus, agent loops, and the workflow that turns source material into book artifacts. Not "the project" or "the repo".',
  },
  {
    id: 'the-method',
    display: ['The Method'],
    definition: 'The reproducible research-and-writing machine — bounded research passes, reusable agent instructions, claims/evidence layers, cumulative logs. This is the deliverable, not the manuscript.',
  },
  {
    id: 'the-manuscript',
    display: ['The Manuscript'],
    definition: 'The book-length draft (chapters in public/drafting/). Proof that The Method works — not the product itself.',
  },
  {
    id: 'claim',
    display: ['Claim', 'Claims', 'Claims Ledger'],
    definition: 'A reusable, source-backed assertion The Manuscript can draw on. Claims live in the single canonical Claims Ledger and may be candidates for one or more chapters.',
  },
  {
    id: 'support-level',
    display: ['Support level'],
    definition: 'How well-evidenced a Claim is — tentative, moderate, or strong. The canonical term; not "strength".',
  },
  {
    id: 'source-anchor',
    display: ['Source Anchor', 'Source Anchors'],
    definition: 'A precise pointer from a Claim into a source video — video id + timestamp — marking the moment that grounds the Claim. Replaces a bare whole-video reference.',
  },

  // ── Concept diagram terms (one per /diagrams/concepts/) ─────────────
  {
    id: 'agentic-product-design',
    display: ['Agentic product design'],
    definition: 'Designing the surface area an agent acts through — intake, action, review — not just the model prompt.',
    diagram: '/diagrams/concepts/agentic-product-design.png',
    chapterRef: '01',
  },
  {
    id: 'agent-observability',
    display: ['Agent observability', 'observability flywheel'],
    definition: 'Traces, metrics, and replay tooling that turn agent runs into something you can debug and improve.',
    diagram: '/diagrams/concepts/agent-observability.png',
    chapterRef: '04',
  },
  {
    id: 'agent-runtime-replay-vs-snapshot',
    display: ['Replay vs snapshot', 'replay or snapshot'],
    definition: 'Two strategies for durable agent state: reconstruct from event history vs preserve as checkpoints.',
    diagram: '/diagrams/concepts/agent-runtime-replay-vs-snapshot.png',
    chapterRef: '06',
  },
  {
    id: 'ai-native-organization',
    display: ['AI-native organization', 'AI-native organisation'],
    definition: 'An operating model where AI is integrated into how work is created and reviewed, not just bolted on.',
    diagram: '/diagrams/concepts/ai-native-organization.png',
    chapterRef: '09',
  },
  {
    id: 'coding-evals',
    display: ['coding evals', 'coding eval'],
    definition: 'Task-level scoring for code-writing agents — human-seeded cases, regression memory, production traces.',
    diagram: '/diagrams/concepts/coding-evals.png',
    chapterRef: '04',
  },
  {
    id: 'constrained-delegation',
    display: ['constrained delegation'],
    definition: 'Bounded autonomy — scoped identity, sandboxing, audit trail — that lets an agent act safely.',
    diagram: '/diagrams/concepts/constrained-delegation.png',
    chapterRef: '07',
  },
  {
    id: 'context-engineering',
    display: ['context engineering', 'context is infrastructure'],
    definition: 'Deciding what the model should know at the moment of action — retrieval, memory, tool selection.',
    diagram: '/diagrams/concepts/context-engineering.png',
    chapterRef: '05',
  },
  {
    id: 'durable-agents',
    display: ['durable agents', 'durable runtime'],
    definition: 'Agents with state, resumability, and recovery paths — architecture that survives a crash.',
    diagram: '/diagrams/concepts/durable-agents.png',
    chapterRef: '06',
  },
  {
    id: 'graphrag',
    display: ['GraphRAG'],
    definition: 'Retrieval over a graph rather than a flat vector index — useful when relationships matter as much as content.',
    diagram: '/diagrams/concepts/graphrag.png',
    chapterRef: '05',
  },
  {
    id: 'harness-engineering',
    display: ['harness', 'harnesses', 'harness engineering'],
    definition: 'A prepared environment around an agent — specs, tests, tools, a plan → produce → review → ship loop — that lets the agent do real work without slop.',
    diagram: '/diagrams/concepts/harness-engineering.png',
    chapterRef: '03',
  },
  {
    id: 'hierarchical-memory',
    display: ['hierarchical memory'],
    definition: 'Layered memory — session, project, long-term — scoped, inspectable, maintained like infrastructure.',
    diagram: '/diagrams/concepts/hierarchical-memory.png',
    chapterRef: '05',
  },
  {
    id: 'human-control-plane',
    display: ['human control plane'],
    definition: 'Surfaces humans need to approve, intervene, audit, and escalate agent work.',
    diagram: '/diagrams/concepts/human-control-plane.png',
    chapterRef: '06',
  },
  {
    id: 'model-context-protocol',
    display: ['MCP', 'Model Context Protocol'],
    definition: 'A protocol for connecting models to tools and data sources in a standard, inspectable way.',
    diagram: '/diagrams/concepts/model-context-protocol.png',
    chapterRef: '05',
  },
  {
    id: 'one-shot-ai-failure',
    display: ['one-shot AI failure', 'one-shot failure'],
    definition: 'The failure mode where an agent is asked to do everything in a single pass and silently produces slop.',
    diagram: '/diagrams/concepts/one-shot-ai-failure.png',
    chapterRef: '03',
  },
  {
    id: 'software-factory',
    display: ['software factory'],
    definition: 'Work intake, constraints, review, and output paths — the surrounding system, not just the model prompt.',
    diagram: '/diagrams/concepts/software-factory.png',
    chapterRef: '03',
  },
  {
    id: 'spec-driven-development',
    display: ['spec-driven development', 'specs persist'],
    definition: 'Specs as executable acceptance criteria and repeatable checks — not paperwork.',
    diagram: '/diagrams/concepts/spec-driven-development.png',
    chapterRef: '03',
  },
  {
    id: 'vibe-coding',
    display: ['vibe coding'],
    definition: 'Shipping whatever runs — fast generation without review discipline. Useful sometimes, dangerous often.',
    diagram: '/diagrams/concepts/vibe-coding.png',
    chapterRef: '02',
  },
  {
    id: 'voice-agents',
    display: ['voice agents', 'voice agent'],
    definition: 'Sub-800 ms latency budget, streaming, turn detection, barge-in — what realtime stress-tests demand.',
    diagram: '/diagrams/concepts/voice-agents.png',
    chapterRef: '08',
  },

  // ── Chapter-level concepts without a dedicated concept diagram ──────
  {
    id: 'assistant-vs-delegate',
    display: ['delegate', 'assistant vs delegate'],
    definition: 'An assistant suggests; a copilot collaborates inside a human loop; a delegate is assigned work and expected to return with an artifact. The book argues most of the engineering difficulty now clusters around the third.',
    chapterRef: '01',
  },
  {
    id: 'repo-as-interface',
    display: ['the repo is the interface', 'repo as interface'],
    definition: 'The codebase itself teaches the agent what good work means through patterns, tests, and boundaries.',
    chapterRef: '03',
  },
  {
    id: 'vibe-engineering',
    display: ['vibe engineering'],
    definition: 'Frame, constrain, review — the discipline counterpart to vibe coding. Cheap generation, expensive judgment.',
    chapterRef: '02',
  },
  {
    id: 'authority-boundary',
    display: ['authority boundary', 'authority boundary collapse'],
    definition: 'Delegated work requires clear permissions, identity, and policy gates. The moment a system can act, it becomes an attack surface.',
    chapterRef: '07',
  },
  {
    id: 'scoped-agent-identity',
    display: ['scoped agent identity', 'scoped identity'],
    definition: 'Each agent runs with the minimum identity and credentials needed for its task — not the human operator\'s full access.',
    chapterRef: '07',
  },
  {
    id: 'alignment-debt',
    display: ['alignment debt'],
    definition: 'The cumulative gap between what an organization\'s AI use produces and what its review and governance can actually catch.',
    chapterRef: '09',
  },
];
```

- [ ] **Step 2: Sanity test the glossary**

```ts
// website/src/data/glossary.test.ts
import { describe, it, expect } from 'vitest';
import { GLOSSARY } from './glossary';

describe('GLOSSARY', () => {
  it('has at least 30 terms', () => {
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(30);
  });

  it('every term has a unique id', () => {
    const ids = GLOSSARY.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every term has at least one display form', () => {
    for (const t of GLOSSARY) {
      expect(t.display.length).toBeGreaterThan(0);
    }
  });

  it('diagram paths point under /diagrams/concepts/', () => {
    for (const t of GLOSSARY) {
      if (t.diagram) expect(t.diagram).toMatch(/^\/diagrams\/concepts\//);
    }
  });
});
```

- [ ] **Step 3: Run tests**

```bash
cd website && npm test
```

Expected: 4 passed (plus prior tests).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(website): author glossary data (30 terms — lab + concepts + chapters)"
```

### Task 19: Build glossary match utility

**Files:**
- Create: `website/src/lib/glossaryMatch.ts`
- Create: `website/src/lib/glossaryMatch.test.ts`

- [ ] **Step 1: Write the failing test first**

```ts
// website/src/lib/glossaryMatch.test.ts
import { describe, it, expect } from 'vitest';
import { splitWithGlossary } from './glossaryMatch';
import { GLOSSARY } from '../data/glossary';

describe('splitWithGlossary', () => {
  it('returns text-only when no terms match', () => {
    const parts = splitWithGlossary('plain ordinary text', GLOSSARY);
    expect(parts).toEqual([{ kind: 'text', value: 'plain ordinary text' }]);
  });

  it('detects a single-word term', () => {
    const parts = splitWithGlossary('A harness wraps the agent.', GLOSSARY);
    const matches = parts.filter((p) => p.kind === 'term');
    expect(matches).toHaveLength(1);
    expect((matches[0] as any).termId).toBe('harness-engineering');
  });

  it('prefers the longest match', () => {
    const parts = splitWithGlossary('Use harness engineering, not just harness alone.', GLOSSARY);
    const terms = parts.filter((p) => p.kind === 'term') as any[];
    expect(terms[0].displayMatched).toBe('harness engineering');
    expect(terms[1].displayMatched).toBe('harness');
  });

  it('is case-insensitive', () => {
    const parts = splitWithGlossary('GraphRAG and graphrag both work.', GLOSSARY);
    const terms = parts.filter((p) => p.kind === 'term');
    expect(terms).toHaveLength(2);
  });

  it('does not match inside a longer word', () => {
    // "delegate" should not match inside "delegated"
    const parts = splitWithGlossary('The delegated authority is bounded.', GLOSSARY);
    const terms = parts.filter((p) => p.kind === 'term');
    expect(terms).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd website && npm test
```

Expected: glossaryMatch.test.ts fails — module not found.

- [ ] **Step 3: Implement `glossaryMatch.ts`** (using `String.prototype.matchAll`)

```ts
// website/src/lib/glossaryMatch.ts
import type { GlossaryTerm } from '../data/glossary';

export type Part =
  | { kind: 'text'; value: string }
  | { kind: 'term'; value: string; termId: string; displayMatched: string };

let cachedRegex: { regex: RegExp; lookup: Map<string, GlossaryTerm> } | null = null;

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function buildRegex(terms: GlossaryTerm[]) {
  if (cachedRegex) return cachedRegex;
  // Collect every display form, longest first, so the alternation prefers longer matches.
  const all: { form: string; term: GlossaryTerm }[] = [];
  for (const t of terms) {
    for (const f of t.display) all.push({ form: f, term: t });
  }
  all.sort((a, b) => b.form.length - a.form.length);
  const lookup = new Map<string, GlossaryTerm>();
  for (const { form, term } of all) lookup.set(form.toLowerCase(), term);
  // \b on the outer boundary so we don't match inside larger words.
  const alt = all.map(({ form }) => escapeRegex(form)).join('|');
  const regex = new RegExp(`\\b(${alt})\\b`, 'gi');
  cachedRegex = { regex, lookup };
  return cachedRegex;
}

export function splitWithGlossary(text: string, terms: GlossaryTerm[]): Part[] {
  const { regex, lookup } = buildRegex(terms);
  const parts: Part[] = [];
  let lastIndex = 0;
  // Use matchAll to avoid stateful regex lastIndex bugs across renders.
  for (const m of text.matchAll(regex)) {
    const start = m.index ?? 0;
    if (start > lastIndex) {
      parts.push({ kind: 'text', value: text.slice(lastIndex, start) });
    }
    const matched = m[0];
    const term = lookup.get(matched.toLowerCase());
    if (term) {
      parts.push({
        kind: 'term',
        value: matched,
        termId: term.id,
        displayMatched: matched.toLowerCase(),
      });
    } else {
      parts.push({ kind: 'text', value: matched });
    }
    lastIndex = start + matched.length;
  }
  if (lastIndex < text.length) {
    parts.push({ kind: 'text', value: text.slice(lastIndex) });
  }
  return parts;
}

// For tests / hot reload — drop the cache.
export function _resetGlossaryCache() {
  cachedRegex = null;
}
```

- [ ] **Step 4: Run tests**

```bash
cd website && npm test
```

Expected: all 5 glossaryMatch tests pass. If "longest match" fails, verify the alternation sort is correct and `\b` is in place.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(website): glossary term match utility (longest-match, case-insensitive, word-bounded)"
```

### Task 20: Wire glossary into InlineText + add drawer

**Files:**
- Modify: `website/src/components/text/InlineText.tsx`
- Create: `website/src/components/drawers/GlossaryDrawer.tsx`
- Create: `website/src/lib/glossaryContext.tsx`
- Modify: `website/src/pages/Reader.tsx`
- Modify: `website/src/index.css` (glossary-term styling)

- [ ] **Step 1: Create a glossary context**

```tsx
// website/src/lib/glossaryContext.tsx
import { createContext, useContext } from 'react';

type GlossaryCtx = {
  open: (termId: string) => void;
};

export const GlossaryContext = createContext<GlossaryCtx>({ open: () => {} });
export const useGlossary = () => useContext(GlossaryContext);
```

- [ ] **Step 2: Extend InlineText to render glossary terms**

```tsx
// website/src/components/text/InlineText.tsx
import React from 'react';
import { GLOSSARY } from '../../data/glossary';
import { splitWithGlossary } from '../../lib/glossaryMatch';
import { useGlossary } from '../../lib/glossaryContext';

export const InlineText = ({ text }: { text: string }) => {
  const { open } = useGlossary();
  // First split by inline markdown markers (bold/code/italic), then within each
  // text-only segment, split by glossary terms.
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index}>{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }
        const sub = splitWithGlossary(part, GLOSSARY);
        return sub.map((s, i) => {
          if (s.kind === 'text') return <React.Fragment key={`${index}-${i}`}>{s.value}</React.Fragment>;
          return (
            <button
              key={`${index}-${i}`}
              type="button"
              className="glossary-term"
              onClick={() => open(s.termId)}
              aria-label={`Open glossary for ${s.value}`}
            >
              {s.value}
            </button>
          );
        });
      })}
    </>
  );
};
```

- [ ] **Step 3: Build the GlossaryDrawer**

```tsx
// website/src/components/drawers/GlossaryDrawer.tsx
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { GLOSSARY } from '../../data/glossary';
import { chapters } from '../../data/bookChapters';

type Props = {
  termId: string | null;
  onClose: () => void;
};

export const GlossaryDrawer = ({ termId, onClose }: Props) => {
  const term = termId ? GLOSSARY.find((t) => t.id === termId) : null;
  const isOpen = !!term;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const chapter = term?.chapterRef ? chapters.find((c) => c.number === term.chapterRef) : null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? '0%' : '100%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 bottom-0 w-full md:w-[440px] lg:w-[500px] bg-[var(--color-paper)] z-[70] border-l border-[var(--color-border)] shadow-2xl flex flex-col"
      >
        <div className="flex justify-between items-center p-6 border-b border-[var(--color-border)] font-mono text-[10px] uppercase tracking-widest">
          <span className="opacity-50">Glossary</span>
          <button onClick={onClose} className="hover:opacity-70 p-2" aria-label="Close glossary drawer">
            [X] CLOSE
          </button>
        </div>
        {term && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            <h2 className="font-serif text-3xl leading-tight">{term.display[0]}</h2>
            <p className="font-sans text-base leading-relaxed text-[var(--color-ink-muted)]">{term.definition}</p>
            {term.diagram && (
              <div className="border border-[var(--color-border)] bg-white">
                <img src={term.diagram} alt={term.display[0]} className="block w-full h-auto" />
              </div>
            )}
            {term.diagram && (
              <a
                href={`/visual-guide#concept-${term.id}`}
                className="font-mono text-[10px] uppercase tracking-widest underline self-start"
              >
                See full diagram on the Visual Guide →
              </a>
            )}
            {chapter && (
              <div className="border-t border-[var(--color-border)] pt-4 font-mono text-[10px] uppercase tracking-widest">
                <p className="opacity-50 mb-2">Appears in</p>
                <a
                  href={`/read#book-chapter-${chapter.number}`}
                  onClick={onClose}
                  className="font-serif normal-case text-base tracking-normal underline"
                >
                  Chapter {chapter.number} — {chapter.title}
                </a>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </>
  );
};
```

- [ ] **Step 4: Wire the drawer into Reader**

In `website/src/pages/Reader.tsx`, add imports and state:

```tsx
import { GlossaryDrawer } from '../components/drawers/GlossaryDrawer';
import { GlossaryContext } from '../lib/glossaryContext';

// inside Reader():
const [glossaryTermId, setGlossaryTermId] = useState<string | null>(null);
```

Wrap the returned JSX in a provider:

```tsx
return (
  <GlossaryContext.Provider value={{ open: setGlossaryTermId }}>
    <div
      className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-pink)] font-sans antialiased pb-12 overflow-x-hidden transition-colors duration-300"
      style={themeVars as React.CSSProperties}
    >
      { /* ... all existing children ... */ }
      <GlossaryDrawer termId={glossaryTermId} onClose={() => setGlossaryTermId(null)} />
    </div>
  </GlossaryContext.Provider>
);
```

- [ ] **Step 5: Add glossary-term styling**

Append to `website/src/index.css`:

```css
.glossary-term {
  display: inline;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: help;
  border-bottom: 1px dotted color-mix(in srgb, currentColor 40%, transparent);
  transition: border-color 0.2s;
}
.glossary-term:hover,
.glossary-term:focus-visible {
  border-bottom-color: currentColor;
  outline: none;
}
.glossary-term:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
}
```

- [ ] **Step 6: Build + smoke test**

```bash
cd website && npm run build && npm run dev &
sleep 3
echo "Open http://localhost:3000/read#book-chapter-03"
echo "  - Look for dotted-underlined terms ('harness', 'specs', etc.)"
echo "  - Click one → drawer slides in from right with definition + thumbnail"
echo "  - Press Esc → drawer closes"
sleep 5
kill %1
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(website): glossary side drawer wired into chapter prose via InlineText"
```

---

## Phase 8 — Share, audio settings, polish

### Task 21: Build the Share modal

**Files:**
- Create: `website/src/components/modals/ShareModal.tsx`
- Modify: `website/src/pages/Reader.tsx`

- [ ] **Step 1: Create ShareModal**

```tsx
// website/src/components/modals/ShareModal.tsx
import { useState } from 'react';
import { motion } from 'motion/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ShareModal = ({ isOpen, onClose }: Props) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = 'From Copilot to Colleague';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore — share targets still work
    }
  };

  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-[var(--color-paper)] border border-[var(--color-border)] shadow-2xl p-6 md:p-8 w-full max-w-md rounded flex flex-col gap-6 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)]"
      >
        <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
          <span className="font-bold">Share</span>
          <button onClick={onClose} className="px-2 py-1 hover:opacity-70" aria-label="Close share modal">[X]</button>
        </div>

        <div className="flex flex-col gap-3">
          <span className="opacity-50">Link</span>
          <div className="flex gap-2">
            <input
              readOnly
              value={url}
              className="flex-1 border border-[var(--color-border)] rounded px-3 py-2 bg-[var(--color-paper)] text-[10px]"
              aria-label="Page URL"
            />
            <button
              onClick={handleCopy}
              className="border border-[var(--color-border)] rounded px-3 py-2 hover:bg-[var(--color-ink)]/5"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="opacity-50">Send to</span>
          <div className="flex gap-2">
            <a
              href={tweet}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-[var(--color-border)] rounded px-3 py-2 text-center hover:bg-[var(--color-ink)]/5"
            >
              X / Twitter
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-[var(--color-border)] rounded px-3 py-2 text-center hover:bg-[var(--color-ink)]/5"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
```

- [ ] **Step 2: Wire ShareModal in Reader**

In `website/src/pages/Reader.tsx`:

```tsx
import { ShareModal } from '../components/modals/ShareModal';

// inside Reader():
const [isShareOpen, setIsShareOpen] = useState(false);

// pass to TopNav:
<TopNav
  progress={scrollYProgress}
  onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
  onBackToCatalogue={() => setLocation('/')}
  onOpenShare={() => setIsShareOpen(true)}
/>

// render the modal inside the root:
<ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
```

- [ ] **Step 3: Build + smoke test**

```bash
cd website && npm run build && npm run dev &
sleep 3
echo "Open http://localhost:3000/read and click Share in the top nav."
sleep 3
kill %1
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(website): share modal — copy URL, X/Twitter, LinkedIn"
```

### Task 22: Add Sound subsection to Settings + wire scroll audio

**Files:**
- Modify: `website/src/components/modals/SettingsModal.tsx`
- Modify: `website/src/pages/Reader.tsx`

- [ ] **Step 1: Extend the Settings type**

In `SettingsModal.tsx`:

```ts
export type Settings = {
  theme: 'light' | 'sepia' | 'dark';
  typography: 'serif' | 'sans' | 'dyslexic';
  fontSize: 'sm' | 'md' | 'lg';
  lineSpacing: 'normal' | 'relaxed' | 'loose';
  sound: 'off' | 'paper';
};
```

- [ ] **Step 2: Add the Sound subsection to the modal body**

After the Line Spacing section, append:

```tsx
<div className="flex flex-col gap-3">
  <span className="opacity-50">Sound</span>
  <div className="flex gap-2">
    {(['off', 'paper'] as const).map((s) => (
      <button
        key={s}
        onClick={() => updateSettings({ sound: s })}
        className={`flex-1 py-3 border border-[var(--color-border)] rounded transition-colors ${
          settings.sound === s
            ? 'ring-2 ring-[var(--color-ink)] ring-offset-1 ring-offset-[var(--color-paper)] bg-[var(--color-ink)]/5'
            : 'hover:bg-[var(--color-ink)]/5'
        }`}
      >
        {s}
      </button>
    ))}
  </div>
</div>
```

- [ ] **Step 3: Wire scroll audio in Reader based on settings**

In `Reader.tsx`, extend the default settings:

```tsx
const [settings, setSettings] = useState<Settings>({
  theme: 'sepia',
  typography: 'serif',
  fontSize: 'md',
  lineSpacing: 'relaxed',
  sound: 'off',
});
```

Replace the Lenis effect to also tick audio:

```tsx
import { scrollAudio } from '../lib/audio';

useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  let lastY = 0;
  lenis.on('scroll', ({ scroll }: { scroll: number }) => {
    if (settings.sound === 'paper' && Math.abs(scroll - lastY) > 24) {
      scrollAudio.playTick();
      lastY = scroll;
    }
  });

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return () => lenis.destroy();
}, [settings.sound]);

useEffect(() => {
  if (settings.sound === 'paper') scrollAudio.initialize();
}, [settings.sound]);
```

- [ ] **Step 4: Build + smoke test**

```bash
cd website && npm run build && npm run dev &
sleep 3
echo "Open http://localhost:3000/read → click Aa (settings) → switch Sound to 'paper' → scroll and listen for tick."
sleep 5
kill %1
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(website): add Sound setting + wire paper scroll ticks via lenis"
```

### Task 23: Fix index.html title and meta

**Files:**
- Modify: `website/index.html`

- [ ] **Step 1: Replace title + description**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>From Copilot to Colleague — An Online Book</title>
    <meta
      name="description"
      content="From Copilot to Colleague: How AI Engineering Turns Models into Dependable Systems. An online book + visual guide built from a 693-video corpus."
    />
    <meta property="og:title" content="From Copilot to Colleague" />
    <meta property="og:description" content="How AI Engineering Turns Models into Dependable Systems." />
    <meta property="og:type" content="book" />
    <meta property="og:image" content="/covers/from-copilot-to-colleague.png" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Build + commit**

```bash
cd website && npm run build
git add website/index.html
git commit -m "fix(website): set book title, description, and OG/Twitter meta"
```

---

## Phase 9 — Cover generation

### Task 24: Generate the book cover

This task is interactive — it requires user judgment to pick the best candidate.

**Files:**
- Create: `diagrams/covers/from-copilot-to-colleague-v1.png`, `-v2.png`, `-v3.png`
- Replace: `website/public/covers/from-copilot-to-colleague.png`

- [ ] **Step 1: Check which image-gen tool is available**

```bash
command -v gpt-image-1 || command -v gemini-image-1 || command -v flux-cli || echo "no local image gen — use a web tool"
```

If none is available locally, surface this to the user: open Ideogram / GPT-Image-1 / Flux in browser, generate 2–3 candidates using the prompt below, save them to `diagrams/covers/`.

**Prompt (verbatim, for whichever model is used):**

> Editorial book cover, portrait 2:3 aspect, 1200×1800. Title "From Copilot to Colleague" set in a high-contrast serif at the top third. Subtitle "How AI Engineering Turns Models into Dependable Systems" in italic below. Author "Timur Isachenko" at the bottom. Background: solid #1F1D1B near-black. Imagery: abstract scaffolding, lattice, or wireframe structures — symbolic of engineered layers, not literal. Subtle paper grain texture. Editorial / Penguin Classics aesthetic. No human figures. No glowing brains. No robotic hands. No tech clichés.

- [ ] **Step 2: Save candidates**

```bash
mkdir -p diagrams/covers
ls diagrams/covers/
```

(Save each generation as `from-copilot-to-colleague-v1.png`, `-v2.png`, `-v3.png` in `diagrams/covers/`.)

- [ ] **Step 3: Show candidates to user for selection**

```bash
open diagrams/covers/from-copilot-to-colleague-v1.png
open diagrams/covers/from-copilot-to-colleague-v2.png
open diagrams/covers/from-copilot-to-colleague-v3.png
```

Ask the user which to use. If none acceptable, iterate the prompt and regenerate.

- [ ] **Step 4: Copy chosen cover to public/**

```bash
cp diagrams/covers/from-copilot-to-colleague-<chosen>.png website/public/covers/from-copilot-to-colleague.png
```

- [ ] **Step 5: Build + visual verify**

```bash
cd website && npm run build && npm run dev &
sleep 3
echo "Open http://localhost:3000/ and hover the spine — confirm new cover appears."
sleep 3
kill %1
```

- [ ] **Step 6: Commit**

```bash
git add diagrams/covers/ website/public/covers/from-copilot-to-colleague.png
git commit -m "feat(website): add generated editorial cover for From Copilot to Colleague"
```

### Task 24-fallback: If cover generation fails

If no satisfactory cover emerges from three iterations, fall back to typography-only:

- [ ] **Step 1: Make a solid-color cover**

```bash
mkdir -p website/public/covers
magick -size 1200x1800 xc:'#1F1D1B' website/public/covers/from-copilot-to-colleague.png
```

(If `magick` is not installed: `brew install imagemagick` first, or use `convert` from imagemagick v6.)

- [ ] **Step 2: Commit**

```bash
git add website/public/covers/from-copilot-to-colleague.png
git commit -m "feat(website): fallback typography-only cover (solid #1F1D1B)"
```

---

## Phase 10 — Accessibility and final QA

### Task 25: Accessibility pass

**Files:**
- Modify: `website/src/components/drawers/GlossaryDrawer.tsx`
- Modify: `website/src/components/drawers/Sidebar.tsx`
- Modify: `website/src/index.css`

- [ ] **Step 1: Add focus management to drawers**

In `GlossaryDrawer.tsx`, add at the top of the component:

```tsx
import { useRef } from 'react';

const closeButtonRef = useRef<HTMLButtonElement>(null);
useEffect(() => {
  if (isOpen) closeButtonRef.current?.focus();
}, [isOpen]);
```

Attach `ref={closeButtonRef}` to the close button.

Repeat the same pattern for `Sidebar.tsx`.

- [ ] **Step 2: Verify all icon-only buttons have aria-labels**

```bash
cd website && grep -rEn '<button' src/ | grep -v aria-label | grep -v 'span' | head -20
```

Add `aria-label` to any flagged buttons whose text is not self-describing (icon-only or `[X]` style).

- [ ] **Step 3: Global focus-visible styling**

Append to `website/src/index.css` if not already present:

```css
*:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
}
```

- [ ] **Step 4: Build + commit**

```bash
cd website && npm run build
git add -A
git commit -m "fix(website): focus management on drawers, focus-visible outlines, aria-labels on icon buttons"
```

### Task 26: Final QA against acceptance criteria

**Files:** none (manual verification).

- [ ] **Step 1: Run a full build**

```bash
cd website && npm run build
```

Expected: succeeds with no warnings about missing diagrams.

- [ ] **Step 2: Run all tests**

```bash
cd website && npm test
```

Expected: all green.

- [ ] **Step 3: Verify each acceptance criterion from spec §13**

Boot the dev server:

```bash
cd website && npm run dev
```

Then in a real browser, verify in order:

1. `/` shows the single-book catalogue. Click the spine → cover-flip animation → `/read`.
2. `/visual-guide` shows 4 overview diagrams + 2 maps + 18 concept grid. Click a card → lightbox opens.
3. `/visual-guide#concept-harness-engineering` scrolls to that card.
4. `/read` shows Hero → 10 chapters. Each chapter has opener + inline figs at H2s + tinted opener sidebar (no woodcut).
5. Glossary terms in prose are dotted-underlined. Click → drawer slides in with definition + diagram. "See full diagram →" link navigates correctly.
6. `← Catalogue` in TopNav navigates to `/`.
7. Share button opens modal. Copy works. X/LinkedIn buttons open in new tab.
8. Settings → Sound → Paper enables scroll ticks.
9. Browser tab title reads "From Copilot to Colleague — An Online Book".
10. `public/diagrams/manifest.json` is up to date — re-run `npm run sync-diagrams` and confirm `kept=N, copied=0`.

- [ ] **Step 4: Capture screenshots for the deploy PR**

In a real browser, capture:
- `/tmp/website-rework-screens/01-catalogue.png`
- `/tmp/website-rework-screens/02-visual-guide-overview.png`
- `/tmp/website-rework-screens/03-visual-guide-concepts.png`
- `/tmp/website-rework-screens/04-reader-chapter-3.png`
- `/tmp/website-rework-screens/05-glossary-drawer.png`
- `/tmp/website-rework-screens/06-share-modal.png`

```bash
mkdir -p /tmp/website-rework-screens
ls /tmp/website-rework-screens/
```

- [ ] **Step 5: Show the user the commit list to review before pushing**

```bash
git log --oneline -30 > /tmp/rework-commits.txt
cat /tmp/rework-commits.txt
```

The user pushes when satisfied.

---

## Out of scope (do NOT do in this plan)

Confirmed from spec §11:

- Audiobook playback (decorative button stays).
- Full-text search.
- Reading-progress persistence.
- Comments / annotations.
- Mobile gesture polish beyond upstream.
- New chapter prose edits.
- Public `/concepts/`, `/themes/`, `/drafting/` directory exposure as routes.
- Internationalization.
- Analytics.

If any of these come up mid-execution, surface to the user; do not silently expand scope.

---

## Recovery notes

- If the diagram sync script exits non-zero, the corresponding source PNG is missing. Either regenerate the diagram (the `.excalidraw` file should already exist next to it; run the `excalidraw-diagram` skill's renderer) or remove the entry from `diagram-meta.json`.
- If wouter routing misbehaves on a `#anchor` link, the bug is almost certainly the `useEffect` keyed on `location` — it does not re-fire when only the hash changes. The Visual Guide deep-link handler reads `window.location.hash` directly in its `useEffect`. If broken, switch the dependency to a polling listener on `hashchange`.
- If TypeScript complains about `manifest.json` import after Task 9, ensure `tsconfig.json` has `"resolveJsonModule": true` and `"esModuleInterop": true`.
- If a chapter renders with the woodcut sheet still showing after Task 16, hard-reload the browser — Vite's HMR sometimes keeps the previous `ChapterIllustration` module hot-loaded across the rewrite.
