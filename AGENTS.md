# AGENTS.md

## Cursor Cloud specific instructions

This repository is mostly a content corpus (Markdown notes, claims, diagrams) for
the book *From Copilot to Colleague*. The only runnable application is the
**website** in `website/` — a React 19 + Vite app rendered statically via
`vite-react-ssg`.

### Website (`website/`)

- Node 22 is required (see `website/Dockerfile` and `.github/workflows/website-ci.yml`).
- Use **npm** (canonical lockfile is `website/package-lock.json`); a stray
  `bun.lock` also exists but is not used by CI/Docker/Vercel.
- Standard commands (run inside `website/`, already documented in
  `website/package.json` and `website/README.md`):
  - Dev server: `npm run dev` (serves on port 3000, host 0.0.0.0).
  - Lint: `npm run lint` (this is a type-check only — `tsc --noEmit`, there is no ESLint).
  - Tests: `npm test` (Vitest, 76 tests).
  - Build: `npm run build`.
- Non-obvious build caveat: `npm run build` runs a `prebuild` step that syncs
  data from sibling repo directories (`diagrams/`, `claims/`, `evidence/`, etc.)
  via `scripts/sync-diagrams.mjs`, `scripts/sync-audio.mjs`, `gen-data.mjs`,
  `gen-sitemap.mjs`, `gen-llms.mjs`. Because of this, the website build depends on
  the full repo checkout being present — do not build `website/` in isolation
  without its sibling directories.
- Reader navigation is intentionally unconventional: chapters are switched via the
  READ/EVIDENCE view toggles and a `CH 01`…`CH 10` selector, not simple prev/next
  buttons.

The Python scripts under `99_Meta/scripts/` (e.g. evidence/stats regeneration) are
stdlib-only and require no pip install.
