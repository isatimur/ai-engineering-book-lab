# CI/CD Deployment Guide

## Workflows

Three GitHub Actions workflows handle automated build, test, and deployment.

### `website-ci` — Build & Test

**Trigger:** Push or PR to `main` touching `website/**` or `diagrams/**`

Runs `npm ci`, `npm test`, and `npm run build` inside `website/`. Validates every
change before it can merge.

### `website-deploy` — Production Deploy to Vercel

**Trigger:** Push to `main` touching `website/**` or `diagrams/**`

Uses the Vercel CLI to pull project settings, build for production, and deploy the
prebuilt output. Requires three GitHub repository secrets (see below).

### `evidence-regen` — Regenerate `evidence.json`

**Trigger:** Push to `main` touching `claims/Claims Ledger.md`, `claims/anchors/**`,
or `99_Meta/scripts/anchor/**`

Runs `99_Meta/scripts/anchor/build_evidence.py` (stdlib only, no pip deps) and
commits `website/src/evidence.json` back to `main` if the output changed.
Commit message includes `[skip ci]` to avoid infinite loops.

---

## Required GitHub Secrets

| Secret | Status | Value |
|--------|--------|-------|
| `VERCEL_ORG_ID` | Already set | `team_mi6dmaKZHjNsGF4QGb5rLYlr` |
| `VERCEL_PROJECT_ID` | Already set | `prj_LkM8MCjfjP4EzihWRJYvnRK3yP1k` |
| `VERCEL_TOKEN` | **You must set this** | See steps below |

### Setting VERCEL_TOKEN (manual — one-time)

1. Go to <https://vercel.com/account/tokens> and create a new token (scope: full
   account, no expiry or set your preferred expiry).

2. Run:
   ```bash
   gh secret set VERCEL_TOKEN -R isatimur/ai-engineering-book-lab --body '<your-token>'
   ```

Once set, all three secrets are in place and `website-deploy` will run automatically
on every qualifying push to `main`.

---

## Live URLs

- Production: <https://from-copilot-to-colleague.vercel.app/>
- Vercel project dashboard: <https://vercel.com/dashboard> → `from-copilot-to-colleague`
