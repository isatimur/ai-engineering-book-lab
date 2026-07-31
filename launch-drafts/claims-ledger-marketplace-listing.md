# GitHub Marketplace listing draft — Auto-Ledger & Verify (claims-ledger)

Submitted from the repo's Settings → General → "Publish this Action to the
GitHub Marketplace" flow (needs a release tag, e.g. `v1`, and `action.yml`
at repo root — already present).

## Name
Auto-Ledger & Verify

## Short description (max ~120 chars, shown in search results)
CI-gated evidence verification: extract source-anchored claims from docs/code and fail the build when an anchor goes stale.

## Categories (pick up to 2 — Marketplace requires this)
- Code quality
- Documentation

## Icon / color (already set in action.yml, will auto-populate)
icon: anchor · color: orange

## Full description (Marketplace listing body — supports markdown)

Docs rot silently. Someone writes "auth tokens rotate every 24h," a refactor
six weeks later breaks it, and nothing catches the drift — until a user does.

**Auto-Ledger & Verify** extracts source-anchored claims from your docs,
code comments, and meeting transcripts into a markdown ledger
(`.ledger/claims.md`), diffs it on every PR, and **fails CI when an anchor
goes stale** (exit 11).

- Six anchor schemes: `git://`, `doc://`, `adr://`, `gh://`, `yt://`, `ts://`
  — each carrying a verbatim quote that must resolve at the ref.
- Exact match first, fuzzy match (0.87 threshold) as fallback before
  flagging stale.
- Optional cross-family LLM judge panel (`judge-models` input) scores claim
  support level — no single model grades its own extraction.
- Annotates the PR directly via the Checks API; no dashboard to check.

## Usage

    - uses: isatimur/claims-ledger@v1
      with:
        mode: both
        fail-on: stale-anchor,unanchored-strong

Full input/output reference: https://isatimur.github.io/claims-ledger/docs

## Pricing
Free, open source (MIT).

## Before submitting — checklist
- [ ] Tag a `v1` release (Marketplace requires a release, not just a branch).
- [ ] Confirm `action.yml` `branding.icon` is a valid Feather icon name
      (`anchor` is valid).
- [ ] Social preview image uploaded first (repo Settings → General → Social
      preview) — Marketplace listing card pulls from it.
- [ ] Verify the Action runs clean on a fresh public repo before listing
      goes live (first impressions matter more here than on HN).
