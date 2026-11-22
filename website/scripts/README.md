# scripts

## Overview
Node build scripts. `npm run prebuild` runs eight of them in this order: `sync-diagrams`, `sync-audio`, `sync-second-book`, `sync-third-book`, `gen-data`, `gen-press-explainer`, `gen-sitemap`, `gen-llms`. They copy content from the parent repository into `src/` and `public/` and generate data files. None reads an environment variable or makes a network call. [../package.json:prebuild]

## Interface
- `press-explainer-lib.mjs`: the only module with exports. Pure functions: `SAMPLE`, `indexClaims`, `buildSample`, `buildWeb`, `PANEL_MODELS`, `buildPanel`, and `buildExplainer({ book1, book2, scores })` that returns `{ sample, webs, panel }`. [press-explainer-lib.mjs:buildExplainer]
- `sync-diagrams.mjs`: copies PNGs from a `diagrams/` directory found above the repo root into `public/diagrams/**`. It writes `public/diagrams/manifest.json` and `src/data/diagram-manifest.json`, using metadata from `diagram-meta.json`. [sync-diagrams.mjs:main]
- `sync-audio.mjs`: copies `<repoRoot>/dist/audiobook/marketplace/NN-*.mp3` (NN 01..10) to `public/audiobook/ch-NN.mp3` and updates `approxSeconds` in `src/data/audiobook.ts`. [sync-audio.mjs:main] [sync-audio.mjs:patchAudiobookTs]
- `sync-second-book.mjs`: copies `public/drafting-2/` chapter files to `src/content-2/chapter-NN.md`. [sync-second-book.mjs:main]
- `sync-third-book.mjs`: copies `public/drafting-3/` chapter files to `src/content-3/chapter-NN.md` and `99_Meta/third-book-classification.json` to `src/data/third-book-outline.json`. [sync-third-book.mjs:main] [sync-third-book.mjs:outlineSrc]
- `gen-data.mjs`: runs `99_Meta/scripts/build_versions.py` with `python3` or `python`. It does not regenerate `judge-scores.json`. [gen-data.mjs:generators]
- `gen-press-explainer.mjs`: reads `src/evidence.json`, `src/evidence-2.json`, and `src/data/judge-scores.json`, and writes `src/data/press-explainer.json`. [gen-press-explainer.mjs:data]
- `gen-sitemap.mjs`: writes `public/sitemap.xml` (book host) and `public/sitemap-press.xml` (press host). It omits `/read`. [gen-sitemap.mjs:push]
- `gen-llms.mjs`: writes `public/llms.txt`, `public/llms-full.txt`, and `public/read/<number>-<slug>.md`. [gen-llms.mjs:llms] [gen-llms.mjs:full]
- `diagram-meta.json`: titles and captions keyed by source file name, in the groups `overview`, `openers`, `concepts`, `inline`, `maps`, `dividers`. [diagram-meta.json:overview]

## Invariants
- The sync scripts exit 0 and skip when their source directory is missing. A fatal error calls `process.exit(1)`. [sync-diagrams.mjs:main] [sync-audio.mjs:main] [sync-second-book.mjs:main] [sync-third-book.mjs:main]
- `sync-diagrams` sets `process.exitCode = 1` when an overview or opener PNG is missing. It copies by size and sha256. `sync-audio` copies by mtime. [sync-diagrams.mjs:differs] [sync-audio.mjs:newer]
- `gen-data` never fails the build. It keeps the committed artifact when the scripts directory, Python, or the generator is missing or fails. [gen-data.mjs:process.exit]
- `gen-press-explainer` fails the build when claim `claims#4` or its lead anchor is missing from `evidence.json`. [press-explainer-lib.mjs:buildSample]
- `gen-llms` throws when its parsed chapter count does not match `bookChapters.ts`, or when a `src/content/chapter-<n>.md` file is missing. [gen-llms.mjs:declaredChapters]
- `gen-sitemap` parses chapters with `/number: '(\d+)',\s*slug: '([^']+)'/g`. Its header says it never fails, but a missing source file throws. Only the `git log` date lookup has a fallback. [gen-sitemap.mjs:parseChapters] [gen-sitemap.mjs:gitDate]
- The press path prefixes in `gen-sitemap` (`/press`, `/books`, `/second-book`, `/third-book`) must match `src/data/book.ts`. [gen-sitemap.mjs:PRESS_PATH_PREFIXES]

## Side Effects
- Writes under `public/`: `diagrams/**`, `audiobook/ch-NN.mp3`, `sitemap.xml`, `sitemap-press.xml`, `llms.txt`, `llms-full.txt`, `read/*.md`. [sync-diagrams.mjs:writeFile] [gen-sitemap.mjs:writeFileSync] [gen-llms.mjs:writeFileSync]
- Writes under `src/`: `content-2/`, `content-3/`, `data/diagram-manifest.json`, `data/press-explainer.json`, `data/third-book-outline.json`, and an in-place edit of `data/audiobook.ts`. [sync-second-book.mjs:copyIfDifferent] [gen-press-explainer.mjs:writeFileSync] [sync-audio.mjs:patchAudiobookTs]
- Child processes: `ffprobe` (`sync-audio`), Python (`gen-data`), and read-only `git log` (`gen-sitemap`). [sync-audio.mjs:probeDuration] [gen-data.mjs:spawnSync] [gen-sitemap.mjs:gitDate]

## Verification
- Run from `website/`: `npm run build`. npm runs `prebuild` first.
- No test files exist in this directory. `npm test` covers `press-explainer-lib.mjs` through `src/lib/pressExplainer.test.ts`. That test also compares against the committed `src/data/press-explainer.json`.
