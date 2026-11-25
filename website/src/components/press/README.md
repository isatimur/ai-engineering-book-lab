# press

## Overview
Sections of the press homepage (`Press` page, served at `/` on aiepress.com). They explain how the books are made, from corpus to reader. Data comes from `src/data/press-explainer.json` and `src/data/stats.json`.

## Interface
- `ChapterWeb()`: book switcher (books 1 and 2) and an SVG arc web of chapters that share ledger entries, with a hover and pin detail panel. [ChapterWeb.tsx:ChapterWeb]
- `HowItWorks()`: seven layers (corpus, anchor, claim, chapters, checks, panel, reader). [HowItWorks.tsx:HowItWorks]
- `useReveal<T extends HTMLElement>(): RefObject<T>`: scroll reveal hook. [useReveal.ts:useReveal]
- `TitleMarquee({ titles, activeId, reduced })`: slow loop of the shelf titles, one type treatment per shelf position. `activeId` glides that title to the centre; `reduced` renders one static copy. Helpers `marqueeCopies`, `focusOffset`, `resumeDelay`. [TitleMarquee.tsx:TitleMarquee]
- `WatchRow({ tiles })`: explainer-video poster tiles from `watchTiles()` in `src/lib/catalog.ts`. Posters only; each links to its chapter page. [WatchRow.tsx:WatchRow]

## Invariants
- `useReveal` does nothing when the element is missing, when `IntersectionObserver` is undefined, or when `prefers-reduced-motion: reduce` matches. Those users see the final state. [useReveal.ts:useReveal]
- `useReveal` writes `el.dataset.reveal` directly, not React state, so the first client render matches the server render. It disconnects after the first intersection. [useReveal.ts:useReveal]
- Only books 1 and 2 can be selected; book 3 has no ledger. `ChapterWeb` uses a non-null assertion on `explainer.webs.find(...)`. [ChapterWeb.tsx:ChapterWeb]
- The book 3 notice renders only when `stats.book3.claims.total === 0`. [ChapterWeb.tsx:ChapterWeb]
- `HowItWorks` computes its values at module load from `explainer.sample` and `explainer.panel`. [HowItWorks.tsx:HowItWorks]

## Side Effects
- `useReveal` creates one `IntersectionObserver` per call and reads `window.matchMedia`. [useReveal.ts:useReveal]
- Links go to book 1 chapters on `BOOK_ORIGIN`, to `publicUrl('/second-book/<slug>')`, and to YouTube timestamps. [ChapterWeb.tsx:ChapterWeb] [HowItWorks.tsx:HowItWorks]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- `npm test` covers `TitleMarquee.test.tsx` here, the explainer data in `src/lib/pressExplainer.test.ts`, and the catalogue data in `src/lib/catalog.test.ts`.
- `TitleMarquee` copies 2–4 carry `aria-hidden`. The CSS loop lives in `src/index.css` (`.press-marquee-track`) and stops under `prefers-reduced-motion`.
