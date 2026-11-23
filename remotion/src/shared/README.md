# shared

## Overview

Shared visual primitives for every chapter video. Each `chapterNN/` folder
imports these from `../shared/primitives` and never forks them. This keeps
the look and the scene assembly the same across the series.

## Interface

- `[primitives.tsx:SceneBackground]` — full-bleed `AbsoluteFill` in `theme.ink`, content centered.
- `[primitives.tsx:FadeInOut]` — props `durationInFrames`, `inFrames = 15`, `outFrames = 15`, `translateY = 24`. Fades in, holds, fades out, relative to the sequence-local frame.
- `[primitives.tsx:Kicker]` — small mono, uppercase label.
- `[primitives.tsx:Big]` — large italic serif headline (64 px).
- `[primitives.tsx:TermCard]` — one step of an N-step sequence: dot rail (`index` of `total`), `term`, `definition`; `emphasized` makes the term larger and accent-colored.
- `[primitives.tsx:useProgress]` — returns `frame / durationInFrames` of the whole video (0..1).
- `[primitives.tsx:ProgressRail]` — 3 px accent progress bar pinned to the bottom edge.
- `[primitives.tsx:SceneSpec]` — type `{ durationInFrames: number; Component: ComponentType }`.
- `[primitives.tsx:SeriesWithProgress]` — takes `scenes: SceneSpec[]`, renders them in a Remotion `<Series>`, and overlays `ProgressRail`.

## Invariants

- All colors and font stacks come from `[../theme.ts:theme]`. Do not hard-code new brand values here.
- `FadeInOut` clamps opacity and offset at both ends (`extrapolateLeft/Right: 'clamp'`); pass the scene's own `durationInFrames` so the fade-out ends on the last frame of the sequence.
- `SeriesWithProgress` is the only scene-assembly path for chapters. Chapters pass scene lists; they do not build their own `<Series>`.

## Side Effects

- None. Pure React components and a hook that read the Remotion frame (`useCurrentFrame`, `useVideoConfig`).

## Verification

- Run: `<test-command>` (no test script in `package.json`).
- Manual check: `npx remotion studio` from `remotion/`, or `npm run still:ch01`.
