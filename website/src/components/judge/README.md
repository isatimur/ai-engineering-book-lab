# judge

## Overview
Components that show LLM-judge scores for each chapter. Scores come from `src/lib/judgeScores.ts`.

## Interface
- `JudgeScorecard({ chapterNumber: string })`: one badge per dimension in `DIMS`, a ship-blocker banner, the weakest paragraphs per dimension, and a "scored on version" footer. [JudgeScorecard.tsx:JudgeScorecard]
- `Sparkline({ values: (number | null)[], width? = 120, height? = 28, color? })`: SVG trend line with no extra dependencies. [Sparkline.tsx:Sparkline]

## Invariants
- `JudgeScorecard` returns `null` when `scoreForChapter(chapterNumber)` is empty. It calls `useState` before that return, so hook order stays stable. [JudgeScorecard.tsx:JudgeScorecard]
- The ship-blocker banner shows only when `chapter.ship_blockers.length > 0`. The footer shows only when `chapter.version_id` is set. [JudgeScorecard.tsx:JudgeScorecard]
- `fmtScore` returns `'—'` for `null` or `undefined`, else the rounded number. [JudgeScorecard.tsx:fmtScore]
- `Sparkline` returns `null` when no value is non-null. The scale is fixed to 0..100 and values are not clamped. [Sparkline.tsx:Sparkline]

## Side Effects
- None. `JudgeScorecard` holds only local `openDim` state. [JudgeScorecard.tsx:JudgeScorecard]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory. `npm test` covers score parsing in `src/lib/judgeScores.test.ts`.
