# src

## Overview
Source of the vite-react-ssg app. `main.tsx` builds the SSG root from `routes.tsx`. The routes render pages under one `Root` layout (`SettingsProvider` > `AppLayout` > `Outlet`). Chapter markdown lives in `content/` (book 1), `content-2/` (book 2), and `content-3/` (book 3). The evidence claims for each book live in `evidence.json`, `evidence-2.json`, and `evidence-3.json`.

## Interface
- `createRoot = ViteReactSSG({ routes })`. [main.tsx:createRoot]
- `routes: RouteRecord[]`: one parent route `/` with these children: index, `visual-guide`, `visual-guide/concepts/:slug`, `visual-guide/maps/:slug`, `read`, `read/graph`, `read/:slug`, `books`, `press`, `evidence`, `ledgers`, `ledgers/:slug`, `second-book`, `second-book/:slug`, `third-book`, `third-book/:slug`, `versions`, `quality`, `search`, `assess`, `enterprise`, `workshop`, `spade-hero`, and `*` (renders `Catalogue`). [routes.tsx:routes]
- `homeFor(hostname)`: returns `<Press />` when `hostname` is the press host, else `<Catalogue />`. [routes.tsx:homeFor]
- `EvidenceRail({ chapterNumber, evidenceData = evidence.json, showGraphLink = true })` and types `EvidenceClaim`, `EvidenceIndex`. [EvidenceRail.tsx:EvidenceRail]
- Subdirectories:
  - [components](./components/README.md): shared and feature UI components.
  - [context](./context/README.md): settings, audiobook, and listen-highlight providers.
  - [data](./data/README.md): typed book content, library, assessment, and generated JSON.
  - [hooks](./hooks/README.md): reduced motion, text-only mode, typewriter.
  - [lib](./lib/README.md): URL, evidence, search, persistence, and JSON-LD helpers.
  - [pages](./pages/README.md): one component per route.

## Invariants
- The index route renders two different pages. In the browser, `homeFor(window.location.hostname)` picks `Press` on the press host to avoid a hydration mismatch. During the build there is no `window`, so `index.html` holds `Catalogue`. [routes.tsx:homeFor] [routes.tsx:Home]
- `getStaticPaths` returns paths relative to `/`. [routes.tsx:routes]
- `EvidenceRail` returns `null` when the chapter has no claims. Pass `showGraphLink = false` with custom `evidenceData`, because the graph page knows only book 1. [EvidenceRail.tsx:EvidenceRail]

## Side Effects
- `Home` reads `window.location.hostname` at render, behind a `typeof window` guard. [routes.tsx:Home]
- `main.tsx` imports `./index.css` (global styles). `EvidenceRail` imports `./evidence.json` at module load. [main.tsx:createRoot] [EvidenceRail.tsx:book1EvidenceData]

## Verification
- Run from `website/`: `npm test` (Vitest, `src/**/*.test.ts(x)`) and `npm run lint` (`tsc --noEmit`).
