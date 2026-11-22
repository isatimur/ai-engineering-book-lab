# ogcard

## Overview

A single-frame social-preview card (1200x630, the og:image size), one per
chapter. It is deliberately simple so it stays legible at thumbnail size.
`Root.tsx` registers it as the `OgCard` composition (`durationInFrames={1}`).

## Interface

- `[OgCard.tsx:OgCardProps]` — type `{ chapterNumber: string; title: string; promise: string }`.
- `[OgCard.tsx:ogCardDefaultProps]` — Chapter 01 values; used as the composition's `defaultProps`.
- `[OgCard.tsx:OgCard]` — the card component: accent top bar, "From Copilot to Colleague · Chapter N" kicker, title, promise, and a footer with `BOOK_TITLE` and the site domain.
- `[chapters.ts:OG_CARD_CHAPTERS]` — `OgCardProps[]` for chapters 01 to 10.

## Invariants

- `OG_CARD_CHAPTERS` mirrors `website/src/data/bookChapters.ts` (number, title, promise) by hand. It is a copy, not an import, because `remotion/` is a separate npm project.
- No code in this subtree imports `OG_CARD_CHAPTERS`. The renderer `[../../scripts/render-og-cards.mjs:CHAPTERS]` keeps its own copy of the same data. Update both when a chapter title or promise changes.
- Colors and fonts come from `[../theme.ts:theme]`.

## Side Effects

- None. Pure React component and static data.

## Verification

- Run: `<test-command>` (no test script in `package.json`).
- Manual check: `npm run render:og` from `remotion/`, then view `out/og/chapter-01.png`.
