# scripts

## Overview

Node helper scripts for batch renders. `package.json` runs them through npm
scripts.

## Interface

- `[render-og-cards.mjs]` — run with `npm run render:og`. Renders one `OgCard` still per chapter.
- `[render-og-cards.mjs:CHAPTERS]` — hard-coded `[chapterNumber, title, promise]` tuples for chapters 01 to 10.

## Invariants

- `CHAPTERS` duplicates `[../src/ogcard/chapters.ts:OG_CARD_CHAPTERS]`; the script does not import it. Keep the two lists the same.
- Each still is rendered with `npx remotion still OgCard <out> --props <json>`, with `cwd` set to the `remotion/` root.

## Side Effects

- Creates `remotion/out/og/` (`mkdirSync`, recursive).
- Spawns `npx remotion still` once per chapter (`execFileSync`, `stdio: 'inherit'`); each call launches the headless browser set in `remotion.config.ts`.
- Writes `out/og/chapter-NN.png` and logs progress to stdout.

## Verification

- Run: `<test-command>` (no test script in `package.json`).
- Manual check: `npm run render:og`; expect "Done. 10 OG cards in .../out/og".
