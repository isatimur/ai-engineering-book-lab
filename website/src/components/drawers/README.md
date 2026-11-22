# drawers

## Overview
Slide-in panels for the reader: the glossary term drawer and the table-of-contents sidebar.

## Interface
- `GlossaryDrawer({ termId: string | null, onClose })`: looks up `GLOSSARY` by id and links to the Visual Guide and the chapter. [GlossaryDrawer.tsx:GlossaryDrawer]
- `Sidebar({ isOpen, onClose })`: table of contents. Each chapter button scrolls to `#book-chapter-N`. It also links to the chapter page, the graph, and the 3D journey. [Sidebar.tsx:Sidebar]

## Invariants
- `GlossaryDrawer` is open only when `termId` matches a term. The "See full diagram" link goes to `/visual-guide/concepts/{id}` when `conceptById(id)` exists, else to `/visual-guide`. [GlossaryDrawer.tsx:GlossaryDrawer]
- `Sidebar` marks the chapter where `loadLastChapter() === chapter.number` with "· reading". The panel stays mounted and moves offscreen when closed. It has no Escape handler. [Sidebar.tsx:Sidebar]

## Side Effects
- `GlossaryDrawer` focuses its close button when it opens. It adds a `window` `keydown` listener (Escape closes) and removes it on cleanup. [GlossaryDrawer.tsx:GlossaryDrawer]
- `Sidebar` reads `loadLastChapter()` from `src/lib/readingProgress.ts` (localStorage). `scrollToSection` calls `onClose`, then after 100 ms calls `scrollIntoView({ behavior: 'smooth' })`. [Sidebar.tsx:scrollToSection]
- `Sidebar` uses plain `<a href>` (full page load) for the 3D journey links. [Sidebar.tsx:Sidebar]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory.
