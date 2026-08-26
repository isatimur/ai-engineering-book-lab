# Second Book — Strip Inline Wikilink Syntax from Chapter Prose — 2026-08-26

## Date
2026-08-26

## Target
`public/drafting-2/*.md` (all 7 chapters) and their synced mirrors in
`website/src/content-2/*.md`. Content-hygiene pass, not a drafting or
anchoring pass.

## Pass type
Small, mechanical, low-risk cleanup — flagged as an open item in
`research_passes/2026-08-25-second-book-website-wiring.md` ("book 2's draft
prose still has raw `[[id-slug|Label]]` wikilink syntax... a one-line revert
if you'd rather see it raw, or you may want a proper cleanup pass on the
source eventually").

## Why
Comparing against book 1's actual convention (not just its brief text):
`programs/chapter_drafting_pass.md` step 5 instructs the same inline-citation
style book 2's brief used ("one or two sources cited inline as
`[[wikilink|short-label]]`"), but book 1's drafting agents rendered this as
natural-language attribution in prose (e.g. "Rafael Levi at Bright Data
names the mechanism...") — `public/drafting/*.md` has **zero** literal `[[`
occurrences across all 10 chapters. The literal bracket syntax lives only in
`claims/Claims Ledger.md`'s supporting-source bullets, per ADR-0001.

Book 2's chapters instead embedded the literal `[[id-slug|Label]]` bracket
syntax directly into flowing prose sentences (as inline parenthetical
citations). The website-wiring pass (`2026-08-25`) worked around this with a
presentation-only regex in `SecondBookArticle.tsx` that strips the syntax at
render time — functional, but it left the source manuscript inconsistent
with both book 1's convention and with what a reader of the raw `.md` file
in `public/drafting-2/` would see.

## Inputs used
- `research_passes/2026-08-25-second-book-website-wiring.md` — the flagged
  open item and the exact regex used for display-time stripping
  (`website/src/components/chapter/SecondBookArticle.tsx`, line 13):
  `text.replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, '$1').replace(/\[\[([^\]|]+)\]\]/g, '$1')`
- `programs/chapter_drafting_pass.md` and a sample of `public/drafting/*.md`
  — confirmed book 1's actual (not just documented) convention.
- All 7 `public/drafting-2/*.md` files — confirmed every occurrence used the
  piped `[[target|Label]]` form; zero bare `[[target]]` occurrences, so no
  ambiguous cases needed a manual label decision.

## Outputs changed
1. `public/drafting-2/*.md` (all 7 chapters) — replaced every
   `[[id-slug|Label]]` with just `Label`, using the exact same regex the
   website already used for display, applied directly to the source this
   time. 93 brackets stripped total (one per anchored citation — matches the
   anchoring pass's total exactly).
2. `website/src/content-2/*.md` (all 7 mirrors) — re-synced from the cleaned
   source via `node website/scripts/sync-second-book.mjs` (`copied=7
   kept=0`), so the committed website mirror matches the source.
3. This file.

## What did NOT change
- `claims-2/Claims Ledger.md` — correctly still uses full `[[wikilink|label]]`
  syntax throughout (this is the right place for it, per ADR-0001's
  convention). Verified via `git diff --stat claims-2/` showing no changes.
- `website/src/components/chapter/SecondBookArticle.tsx` — the display-time
  regex was left in place as defense-in-depth (harmless no-op against
  already-clean source; still useful if a future chapter revision
  re-introduces bracket syntax by mistake). Not required for correctness
  after this pass, but removing it wasn't worth the churn.
- Claim text, quotes, or any substantive content — this pass only removed
  bracket delimiters and the wikilink target, replacing `[[target|Label]]`
  with `Label`. No word of prose, no quote, no attribution changed.

## Verification
- `npm run lint` (tsc --noEmit) — clean.
- `npm run test` (vitest) — 95/95 pass, unchanged.
- `npm run build` (production SSG) — succeeded; all 7
  `dist/second-book/<slug>.html` plus `dist/second-book.html` generated.
- `grep -c '\[\['` on the built `dist/second-book/inference-economics.html`
  — 0 (confirmed no raw syntax leaked into the built output).
- Spot-checked rendered prose matches pre-cleanup output exactly (the regex
  was already producing this same text at render time; this pass just moved
  the transformation from render-time to source-time).

## Unresolved questions
- None functionally — this was a mechanical, verified, reversible change.
  Worth noting for future book-2 drafting passes (if any further chapters or
  a revision pass happens): write inline citations as natural-language
  attribution directly, matching book 1's actual convention, rather than
  literal `[[wikilink]]` syntax in prose, so this cleanup step isn't needed
  again.
