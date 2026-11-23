# hooks

## Overview
Small shared React hooks for motion preference, text-only reading mode, and a typewriter effect.

## Interface
- `usePrefersReducedMotion(): boolean`. [usePrefersReducedMotion.ts:usePrefersReducedMotion]
- `useTextOnlyMode(): { textOnly, toggleTextOnly(), setTextOnlyMode(on) }`. [useTextOnlyMode.ts:useTextOnlyMode]
- `useTypewriter(text, speed = 38, startDelay = 600): { displayed, done }`. [useTypewriter.ts:useTypewriter]

## Invariants
- `usePrefersReducedMotion` returns `false` on the server and on the first render, then updates after mount. [usePrefersReducedMotion.ts:usePrefersReducedMotion]
- `useTextOnlyMode` takes its state from the URL through `isTextOnlyFromSearch(searchParams)` and re-syncs when the search params change. `?mode=text` and `?mode=visual` override the stored preference. [useTextOnlyMode.ts:useTextOnlyMode]
- `toggleTextOnly` saves the preference and syncs the URL inside the `setState` updater. React StrictMode can run that updater twice. [useTextOnlyMode.ts:toggleTextOnly]
- `useTypewriter` resets when `text`, `speed`, or `startDelay` changes. It sets `done` when the full text shows. Cleanup clears both timers. [useTypewriter.ts:useTypewriter]

## Side Effects
- `usePrefersReducedMotion` adds a `matchMedia('(prefers-reduced-motion: reduce)')` `change` listener and removes it on cleanup. [usePrefersReducedMotion.ts:usePrefersReducedMotion]
- `useTextOnlyMode` writes localStorage key `book:reader:text-only` and changes the URL through `saveTextOnlyPreference` and `syncTextOnlyUrl` in `src/lib/readerMode.ts`. [useTextOnlyMode.ts:toggleTextOnly]
- `useTypewriter` uses `setTimeout` and `setInterval`. [useTypewriter.ts:useTypewriter]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory. `npm test` covers the reader-mode helpers in `src/lib/readerMode.test.ts`.
