# chapter01

## Overview

The Chapter 1 explainer ("The Shift"), the pilot episode of the series. Ten
scenes, each with its own frame budget, assembled with the shared
`SeriesWithProgress` pattern. `Root.tsx` registers it as the `Chapter01`
composition.

## Interface

- `[Chapter01.tsx:Chapter01]` — the composition component. Passes ten scenes, in order, to `SeriesWithProgress`.
- `[durations.ts:SCENE_DURATIONS]` — frames per scene: `hook` 90, `titleCard` 90, `frameworkIntro` 60, `assistant` 75, `copilot` 75, `delegate` 105, `loopShift` 90, `quote` 150, `stats` 120, `outro` 150.
- `[durations.ts:TOTAL_DURATION_IN_FRAMES]` — sum of `SCENE_DURATIONS` (1005 frames at 30 fps).
- `[Scenes.tsx]` scene components: `HookScene`, `TitleScene`, `FrameworkIntroScene`, `AssistantScene`, `CopilotScene`, `DelegateScene`, `LoopShiftScene`, `QuoteScene`, `StatsScene`, `OutroScene`.

## Invariants

- `SCENE_DURATIONS` is the single source of frame budgets. `Chapter01.tsx` (sequence lengths), `Scenes.tsx` (`FadeInOut` / `TermCard` durations) and `Root.tsx` (via `TOTAL_DURATION_IN_FRAMES`) all read it. Change a hold time here, not in the scenes.
- Scenes import layout from `../shared/primitives` and tokens from `../theme`; do not fork them.
- `[Scenes.tsx:QuoteScene]` shows "Source-anchored · 0:35". This must stay the real start time of the cited Source Anchor (see the root README quote table).

## Side Effects

- `[Scenes.tsx:OutroScene]` loads `staticFile('cover.png')` from `remotion/public/`.

## Verification

- Run: `<test-command>` (no test script in `package.json`).
- Manual check: `npm run still:ch01` or `npm run render:ch01` from `remotion/`.
