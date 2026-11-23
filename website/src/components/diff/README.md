# diff

## Overview
One component that shows the difference between two markdown versions of a chapter. The `Versions` page uses it. The diff logic lives in `src/lib/diff.ts`.

## Interface
- `DiffView({ oldMd: string, newMd: string, mode: 'unified' | 'split' })`: renders a stats line (added, removed, changed, unchanged) and one block per `diffMarkdown` result. [DiffView.tsx:DiffView]

## Invariants
- `blocks` is `useMemo(diffMarkdown(oldMd, newMd))` and `stats` is `useMemo(diffStats(blocks))`. [DiffView.tsx:DiffView]
- A `changed` block renders two columns in `split` mode and an inline word diff (`wordDiff`) in `unified` mode. `equal` blocks render muted and carry no tag. [DiffView.tsx:Block]
- Zero blocks render only the stats line. [DiffView.tsx:DiffView]

## Side Effects
- None.

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory. `npm test` covers the diff logic in `src/lib/diff.test.ts`.
