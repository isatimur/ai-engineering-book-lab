# Second Book — Website Wiring

## Objective
Give the second book ("The Model Layer" / "The Long Tail") a reading experience on the website: a route (or route family) that renders its 7 drafted chapters, ideally with the evidence rail (anchored claims per paragraph) that book 1 has. Scope this pass to **reading + evidence only** — not search, not the Quality/judge-score page, not sitemap/LLM-feed inclusion. Those are separate, explicitly deferred decisions (see "Deliberately not in this plan" below).

## Why
`second_book_drafting_pass.md` said website wiring "becomes viable once at least one chapter exists" and described it as "a second route reusing the Reader/EvidenceRail components." That undersold the work. On inspection, book 1's rendering path is not parameterized — it is wired to specific, hardcoded book-1 data sources at multiple layers:

- `website/src/data/bookChapters.ts` — hardcodes 10 `import chapterNN from '../content/chapter-NN.md?raw'` statements and a `chapters: BookChapter[]` array literal. Book 2's drafts live in `public/drafting-2/` (7 files, e.g. `Chapter 1 — Training and the Turn to RL.md`), a different directory outside `website/src/content/` entirely — Vite's `?raw` import cannot reach across the website package root by default.
- `website/EvidenceRail.tsx` does `import evidenceData from './evidence.json'` at module scope — not a prop, not configurable per-call. `evidence.json` is generated from `claims/Claims Ledger.md` by `99_Meta/scripts/anchor/build_evidence.py`, which already accepts `--ledger` and `--out` flags (confirmed via `--help`), so a book-2 equivalent (`build_evidence.py --ledger "claims-2/Claims Ledger.md" --out website/src/evidence-2.json`) is cheap to produce — but `EvidenceRail.tsx` itself would need to accept which evidence file to render, or a sibling component would need to exist.
- `website/src/pages/ChapterDetail.tsx` (the `/read/:slug` page) directly imports both `ChapterArticle` and `EvidenceRail` and wires them to the book-1 `chapters` array via `chapterByParam`. It does not take a "which book" parameter anywhere.
- `website/scripts/gen-sitemap.mjs` and `website/scripts/gen-llms.mjs` (both run in the `prebuild` chain) **statically parse `bookChapters.ts`'s source text by regex**, not by importing the live data — they are hardcoded to that one file and that one array shape.
- `website/src/pages/Quality.tsx` and `EvidenceReference.tsx` both import `judgeScores`/`stats.json`/`evidence.json` — all book-1-scoped, and book 2 has no judge-panel run yet (blocked on an `ANTHROPIC_API_KEY`, separately tracked) so there is nothing real to show there yet regardless.

So this is "generalize a single-book-assumption codebase to a second book," not "add a route." Scope it as such — and scope it small on the first pass (reading + evidence rail only), per the objective above.

## A live collision risk to check before starting
As of 2026-08-23/24, a concurrent session had **uncommitted, in-progress edits to `website/src/components/chapter/ChapterArticle.tsx`**, mid-rollout of a "Practical checklist" section across book 1's 10 chapters (its own commit message: "Sample chapter only — rolling out to the other 9 pending review"). `ChapterDetail.tsx` and any book-2 equivalent will need to touch or at least read `ChapterArticle.tsx`.

**Before starting implementation:** run `git status` and `git log --oneline -5` in the repo. If `ChapterArticle.tsx` (or anything else this plan touches) has uncommitted changes from a session that isn't yours, do not edit it — either wait for it to land as a commit, or execute this plan in an isolated git worktree (`Agent(..., isolation: "worktree")` if delegating, or `EnterWorktree` directly) so the shared working tree isn't a shared edit surface.

## Never do
- Never change book 1's routes, pages, or rendering behavior. `chapters` (book 1's array), `evidence.json`, `bookChapters.ts`'s existing exports, and every page that currently imports them must keep working identically. Book 2 is additive.
- Never publish book 2 chapters to the sitemap (`gen-sitemap.mjs`), the LLM feed (`gen-llms.mjs`/`llms.txt`/`llms-full.txt`), or any other public discovery surface in this pass. The manuscript has not been through a quality judge panel or `ship-gate` yet (see `programs/second_book_drafting_pass.md`'s deferred items) — it should be reachable by direct URL for review, not indexed or crawled. If a decision is made to index it, that is a separate, explicit call for the operator, not something to default into.
- Never regenerate or overwrite `website/src/evidence.json` (book 1's) — book 2 gets its own file (e.g. `evidence-2.json`), produced by `build_evidence.py --ledger "claims-2/Claims Ledger.md" --out ...`.
- Never wire the Quality page or any judge-score UI to book 2 — there is no judge-panel run for book 2 yet, so there is no real data to show. Wiring it prematurely means either a broken page or fabricated placeholder numbers.
- Never edit `website/src/components/chapter/ChapterArticle.tsx` (or any file another session holds uncommitted changes to) without first confirming those changes have landed as a commit, or working in an isolated worktree.

## Decisions to make (in order, before writing code)

1. **Content loading strategy.** Two real options:
   - (a) Sync book 2's `public/drafting-2/*.md` into `website/src/content-2/` (or similar) at prebuild time, mirroring the existing `sync-diagrams.mjs`/`sync-audio.mjs` pattern (both already copy content from outside `website/` into it during `prebuild`), then `?raw`-import from there — matches book 1's existing mechanism exactly.
   - (b) Give Vite an additional `allow` root (`server.fs.allow` / build-time equivalent) so `?raw` can import directly from `../public/drafting-2/` without copying.
   (a) is lower-risk and consistent with how this repo already solves "content lives outside `website/`" for diagrams and audio — recommended, but confirm before implementing.

2. **Data file shape.** Does book 2 get a sibling file `bookChaptersTwo.ts` (a second, independently-typed `BookChapter[]`-shaped export, hand- or script-populated from the 7 packet titles + drafts), or does `bookChapters.ts` grow a `book: 1 | 2` field and a combined array? A sibling file is lower-risk (zero chance of breaking book 1's `chapters.length` assumptions in `gen-llms.mjs`'s sanity check or anywhere else that does `chapters[0]`/`chapters.length` arithmetic) — recommended, but confirm.

3. **Route shape.** Book 1 uses `/read` (full-book reader) and `/read/:slug` (single chapter). Options for book 2: `/read-2` + `/read-2/:slug`, or `/second-book` + `/second-book/:slug`, or a shared `/read/:book/:slug` param-based route. A separate route family (not a shared param) is lower-risk given how much book-1-specific logic already lives inside `ChapterDetail.tsx` and `Reader.tsx` — recommended: a new `ChapterDetailTwo.tsx` / `ReaderTwo.tsx` (or better names) that import book 2's sibling data file, rather than retrofitting `:book` branching into the existing components. Confirm before implementing.

4. **Evidence rail componentization.** `EvidenceRail.tsx` currently hardcodes `import evidenceData from './evidence.json'`. Either (a) add an optional prop `evidenceData?: EvidenceEntry[]` defaulting to the current import (backward-compatible, book 1 unaffected), and have a book-2 chapter page pass `evidence-2.json` explicitly, or (b) duplicate the component. (a) is preferred — it's a small, additive, backward-compatible change to a single file, versus a second copy to keep in sync. Confirm before implementing.

5. **What "chapters total" means going forward.** `99_Meta/scripts/build_stats.py` was already extended (`research_passes/2026-08-23-second-book-stats-extension.md`) to report book 2's claims/anchors/drafts in a separate section, explicitly *not* merged into `total_artefacts` or `chapters['total']` (book 1's `chapters['total']` is sourced from `bookChapters.ts`, i.e. deliberately book-1-only). Once book 2 has a `bookChaptersTwo.ts`, decide whether `build_stats.py` should also report a `book2.chapters` count from that file (recommended, for consistency) — a small follow-up to the stats script, not blocking this plan.

## Inputs
- `05_Book_Ideas/Second Book - Chapter Packets/00_README.md` and the 7 packet files — chapter titles, in case display titles should differ from the `.md` filenames.
- `public/drafting-2/*.md` — the 7 drafted chapters (source content).
- `claims-2/Claims Ledger.md` — anchored claims (all 93 supporting sources anchored as of `55d46ba`).
- `website/src/data/bookChapters.ts` — the pattern to mirror for the sibling file (decision 2).
- `website/src/pages/ChapterDetail.tsx`, `website/src/pages/Reader.tsx`, `website/EvidenceRail.tsx`, `website/src/components/chapter/ChapterArticle.tsx`, `website/src/components/chapter/FullBookReader.tsx` — the components to reuse or fork.
- `website/scripts/sync-diagrams.mjs` or `sync-audio.mjs` — the existing pattern for pulling content from outside `website/` into it at prebuild time (decision 1).
- `99_Meta/scripts/anchor/build_evidence.py` — already parameterized (`--ledger`, `--out`); use directly to produce `evidence-2.json`.
- `website/src/routes.tsx` — where the new route(s) get registered.

## Outputs
1. A resolution (in this file, or a short addendum) of the 5 decisions above, made before code is written.
2. Book 2's chapter content reachable in `website/src/content-2/` (or the chosen location per decision 1).
3. A sibling chapters data file (book 2, per decision 2).
4. `website/src/evidence-2.json`, generated via `build_evidence.py --ledger "claims-2/Claims Ledger.md" --out website/src/evidence-2.json`.
5. New route(s) in `website/src/routes.tsx` per decision 3, backed by new page component(s) that reuse (not fork, where decision 4 allows) `ChapterArticle` and an evidence-rail-with-data-prop.
6. Verification: `npm run lint` (tsc --noEmit) and `npm run test` (vitest) both clean, per this repo's existing convention (confirmed both pass as of the `build_stats.py` extension pass). Per this project's own frontend-change rule, also start the dev server (`npm run dev`) and visually confirm book 2's reader route renders a chapter with its evidence rail before calling this done.
7. A pass log in `research_passes/` per that directory's README convention.

## Explicitly not in this plan (deferred, separate decisions)
- Sitemap / `llms.txt` inclusion — indexing book 2 publicly is a separate, explicit call once the manuscript has been through more review.
- The Quality page / judge-score UI for book 2 — blocked on a judge-panel run (`book-mash-2.toml` is ready; needs `ANTHROPIC_API_KEY`), tracked separately.
- Search integration (`Search.tsx`) — book 1's search likely indexes `chapters` directly; extending it to book 2 is a follow-up once the reading experience itself is confirmed working.
- `book-mash-2.toml`'s `voice_baseline_chapters` and any further MASH-related wiring — already handled in `research_passes/` separately; unrelated to this plan beyond both existing.
