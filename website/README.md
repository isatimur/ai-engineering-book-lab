
# From Copilot to Colleague Website

## Overview

Website package based on `isatimur/bookshelf`, adapted as the online representation of the AI engineering book.

Canonical deployed app: https://editorial-book-ui-41282466630.us-west1.run.app

Template source: [`isatimur/bookshelf`](https://github.com/isatimur/bookshelf) at `d8cced91284f6843172d448f95bd59dcb482c0b3`.

## Reader behavior
- Each chapter is loaded as a separate markdown source from `src/content/`.
- The website includes a chapter selector, previous/next controls, word counts, and a dedicated reading panel.
- Chapter 3 uses the fuller drafting-layer version; the other chapters use the public-safe chapter drafts.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies: `npm install`
2. Run the app: `npm run dev`
3. Build for production: `npm run build`

## Cloud Run

This package includes a production `Dockerfile` and a small static Node server for Cloud Run.

```bash
gcloud run deploy editorial-book-ui \
  --source . \
  --region us-west1 \
  --allow-unauthenticated
```

## Interface
- Source and subdirectories:
  - [src](./src/README.md): the vite-react-ssg app (routes, pages, components, data, lib).
  - [scripts](./scripts/README.md): prebuild sync and generation scripts.
- npm scripts: `dev` (Vite on port 3000), `build` (`vite-react-ssg build`, after `prebuild`), `start` (`node server.js`), `test` (`vitest run`), `lint` (`tsc --noEmit`), plus the `sync-*` and `gen-*` scripts. [package.json:scripts]
- `server.js`: static server for `dist/`. It listens on `PORT` (default 8080) on `0.0.0.0`. A missing path, or a directory without `index.html`, falls back to `dist/index.html`. [server.js:port] [server.js:filePath]
- `middleware.ts`: default export `middleware(request)` for Vercel. It splits two hosts: `fromcopilottocolleague.com` (book) and `aiepress.com` (press). [middleware.ts:middleware] [middleware.ts:BOOK_HOST] [middleware.ts:PRESS_HOST]
  - On the press host, `/` rewrites to `/press`, and `/press` redirects (308) to `/`. `/robots.txt` and `/sitemap.xml` rewrite to `/robots-press.txt` and `/sitemap-press.xml`. Press paths and files pass through. Any other path redirects (308) to the book host. [middleware.ts:middleware]
  - On the book host, the press paths (`/press`, `/books`, `/second-book`, `/third-book`) redirect (308) to the press host. The query string is kept. [middleware.ts:PRESS_PATH_PREFIXES] [middleware.ts:redirectTo]
  - Other hosts (preview, local) pass through. [middleware.ts:passThrough]
- `vercel.json`: Vite build into `dist`, `cleanUrls: true`, `trailingSlash: false`, and permanent `www.` to apex redirects for both hosts. [vercel.json:redirects]
- `vite.config.ts`: plugins `react()` and `tailwindcss()`, alias `@` to the package root, `ssgOptions` `{ dirStyle: 'flat', script: 'defer' }`. [vite.config.ts:ssgOptions]
- `vitest.config.ts`: `environment: 'node'`, include `src/**/*.test.ts` and `src/**/*.test.tsx`. [vitest.config.ts:test]
- `Dockerfile`: two `node:22-slim` stages. The build stage runs `npm ci` and `npm run build`. The runtime stage copies `dist`, `server.js`, and `package.json` and runs `node server.js`. [Dockerfile:CMD]

## Invariants
- Each page has one public URL. The press path list in `middleware.ts` must stay in step with `src/data/book.ts`. `src/lib/middleware.test.ts` checks this. [middleware.ts:PRESS_PATH_PREFIXES]
- Host redirects use status 308. [middleware.ts:redirectTo]
- `ssgOptions.script` must stay `'defer'`, so the SSG data script exists before the app starts. [vite.config.ts:ssgOptions]
- `server.js` strips leading `../` segments from the decoded path. HTML gets `Cache-Control: no-cache`. Other files get `public, max-age=31536000, immutable`. [server.js:requestedPath] [server.js:Cache-Control]
- `DISABLE_HMR=true` turns off file watching and HMR in dev. [vite.config.ts:server.watch]

## Side Effects
- `server.js` opens an HTTP server and streams files from disk. [server.js:createReadStream]
- `vite.config.ts` reads `GEMINI_API_KEY` with `loadEnv` and defines `process.env.GEMINI_API_KEY` for client code. Vite inlines the value wherever client code uses that name. No file under `src/` uses it today, so the bundle carries no key; any future use would ship the key to every browser. [vite.config.ts:define]
- `npm run build` runs `prebuild`, which writes into `src/` and `public/`. See [scripts](./scripts/README.md). [package.json:prebuild]

## Verification
- Run: `npm test` (Vitest) and `npm run lint` (`tsc --noEmit`).
