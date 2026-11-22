# src

## Overview

The Remotion bundle. `index.ts` is the entry point, `Root.tsx` registers every
composition, and `theme.ts` holds the brand tokens and frame rate that all
compositions share.

## Interface

- `[index.ts]` — calls `registerRoot(RemotionRoot)`.
- `[Root.tsx:RemotionRoot]` — registers three compositions:
  - `Chapter01` — `Chapter01`, 1920x1080, `durationInFrames` from `chapter01/durations.ts:TOTAL_DURATION_IN_FRAMES`.
  - `Chapter02` — `Chapter02`, 1920x1080, `durationInFrames` from `chapter02/durations.ts:TOTAL_DURATION_IN_FRAMES`.
  - `OgCard` — `OgCard`, 1200x630, 1 frame, `defaultProps={ogCardDefaultProps}`.
- `[theme.ts:theme]` — colors (`paper`, `ink`, `spine`, `accent`, `inkMuted`, `inkFaint`) and font stacks (`serif`, `sans`, `mono`).
- `[theme.ts:BOOK_TITLE]`, `[theme.ts:BOOK_URL]`, `[theme.ts:AUTHORS]` — book metadata strings.
- `[theme.ts:FPS]` — `30`, used by every composition.
- Subdirectories:
  - [shared](./shared/README.md) — primitives every chapter imports (`SeriesWithProgress`, `FadeInOut`, `TermCard`, ...).
  - [chapter01](./chapter01/README.md) — Chapter 1 explainer.
  - [chapter02](./chapter02/README.md) — Chapter 2 explainer.
  - [ogcard](./ogcard/README.md) — 1200x630 social-preview card.

## Invariants

- Every composition uses `FPS` from `theme.ts`; keep the frame rate uniform across the series.
- A composition's `durationInFrames` comes from its chapter's `TOTAL_DURATION_IN_FRAMES`, never a literal.
- Each new chapter adds one `<Composition>` with a new `id` in `RemotionRoot`. The `id` is the name the npm `render:*` / `still:*` scripts pass to the Remotion CLI.

## Side Effects

- `index.ts` registers the root with the Remotion runtime on import.

## Verification

- Run: `<test-command>` (no test script in `package.json`).
- Manual check: `npx remotion studio` from `remotion/` and confirm the three compositions appear.
