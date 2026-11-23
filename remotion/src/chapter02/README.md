# chapter02

## Overview

The Chapter 2 explainer ("Taste"), the second episode. Same shape as
`chapter01/` (ten scenes, `SeriesWithProgress`), with chapter 2's own content
and hold times. `Root.tsx` registers it as the `Chapter02` composition.

## Interface

- `[Chapter02.tsx:Chapter02]` — the composition component. Passes ten scenes, in order, to `SeriesWithProgress`.
- `[durations.ts:SCENE_DURATIONS]` — frames per scene: `hook` 90, `titleCard` 90, `frameworkIntro` 60, `criterion` 75, `reviewer` 75, `taste` 105, `tripwire` 90, `quote` 150, `scarceSkills` 120, `outro` 150.
- `[durations.ts:TOTAL_DURATION_IN_FRAMES]` — sum of `SCENE_DURATIONS` (1005 frames at 30 fps).
- `[Scenes.tsx]` scene components: `HookScene`, `TitleScene`, `FrameworkIntroScene`, `CriterionScene`, `ReviewerScene`, `TasteScene`, `TripwireScene`, `QuoteScene`, `ScarceSkillsScene`, `OutroScene`.

## Invariants

- `SCENE_DURATIONS` is the single source of frame budgets for `Chapter02.tsx`, `Scenes.tsx` and `Root.tsx` (via `TOTAL_DURATION_IN_FRAMES`).
- Scenes import layout from `../shared/primitives` and tokens from `../theme`; do not fork them.
- `[Scenes.tsx:QuoteScene]` shows "Source-anchored · 9:02". This must stay the real start time of the cited Source Anchor (see the root README quote table).

## Side Effects

- `[Scenes.tsx:OutroScene]` loads `staticFile('cover.png')` from `remotion/public/`.

## Verification

- Run: `<test-command>` (no test script in `package.json`).
- Manual check: `npm run still:ch02` or `npm run render:ch02` from `remotion/`.
