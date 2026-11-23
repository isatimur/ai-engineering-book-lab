# assessment

## Overview
Render-only parts of the AI-native readiness assessment. The `Assess` page owns the state. The scoring logic lives in `src/data/assessment.ts`.

## Interface
- `QuestionCard({ question: Question, index: number, value: number | undefined, onChange: (value: number) => void })`: renders the `LIKERT` options as a radio group. [QuestionCard.tsx:QuestionCard]
- `RadarChart({ points: RadarPoint[], size? = 360, max? = 100 })` and type `RadarPoint = { label: string, score: number }`. [RadarChart.tsx:RadarChart]

## Invariants
- `QuestionCard` marks an option as selected only when `value === opt.value`. `undefined` selects nothing. [QuestionCard.tsx:QuestionCard]
- `RadarChart` returns `null` when `points.length < 3`. It clamps each score to `[0, max]` for the polygon. The label shows the unclamped rounded score. The rings at 25/50/75/100 are correct only for `max = 100`. [RadarChart.tsx:RadarChart]

## Side Effects
- None. `QuestionCard` only calls its `onChange` prop. [QuestionCard.tsx:QuestionCard] [RadarChart.tsx:RadarChart]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory. `npm test` covers scoring in `src/data/assessment.test.ts`.
