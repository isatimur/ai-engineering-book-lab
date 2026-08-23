# Second Book — Stats Script Extension — 2026-08-23

## Date
2026-08-23

## Target
`99_Meta/scripts/build_stats.py` — extend it to report the second book's
counts. Flagged as a follow-up in `programs/second_book_drafting_pass.md`
("After all chapters are drafted... check whether it currently scopes to
`public/drafting/` only; if so, that's a follow-up fix").

## Pass type
Small, bounded tooling extension. Not a drafting or anchoring pass.

## Inputs used
- `99_Meta/scripts/build_stats.py` — confirmed it scoped `count_claims()` and
  `count_anchors()` to `claims/Claims Ledger.md` (book 1) only, and
  `synthesis['drafting_files']` to `public/drafting` (book 1) only.
- `claims-2/Claims Ledger.md` (43 claims, 93 anchors, committed through
  `55d46ba`) and `public/drafting-2/*.md` (7 chapter drafts) as the book-2
  data source.

## Outputs changed
1. `99_Meta/scripts/build_stats.py` — generalized `count_claims()` and
   `count_anchors()` to take a ledger path parameter (default: book 1's
   ledger, so existing call sites are unchanged); added a `book2` field to
   `Stats` and a `build()` step that calls both counters against
   `claims-2/Claims Ledger.md` and counts `public/drafting-2/*.md`.
2. `render_md()` — added a "## Second book (Part I / Part II)" section,
   placed after Diagrams and before Method, with the same claims/anchors
   table shape as book 1's section. Added a one-line note to the Grand Total
   section clarifying it's book-1-only.
3. `main()` — added a second print line reporting book 2's drafting/claims/
   anchor counts alongside the existing book-1 summary line.
4. Ran the script; regenerated `STATS.md`, `stats.json`,
   `website/src/data/stats.json`.

## Design decision: book 2 counts are reported, not merged
`total_artefacts` (currently 1314) was left untouched — book 2's 7 drafts +
43 claims + 93 anchors are **not** added into it. The two manuscripts are
separate deliverables (per the drafting brief's "Never do" list: book 2 must
never touch book 1's tracked artefacts); merging their counts into one grand
total would make neither number legible on its own. Book 2 gets its own
clearly-labeled section instead. `chapters['total']` also stays book-1-only
(sourced from `website/src/data/bookChapters.ts`, which book 2 is
deliberately not wired into yet).

## Verification
- Ran `python3 99_Meta/scripts/build_stats.py`; output: `second book: 7
  chapter drafts · 43 claims · 93 anchors` — matches the ledger and drafting
  directory exactly (cross-checked with `grep -c` against
  `claims-2/Claims Ledger.md` and `ls public/drafting-2/*.md`).
- Diffed `STATS.md` before/after: only the generated-at timestamp, the new
  "Second book" section, and the grand-total clarifying note changed. Book
  1's numbers (1314 total, 54 claims, 198 anchors, 10 chapters, 124 diagrams)
  are byte-identical to before.
- `count_claims()`/`count_anchors()` default parameter keeps every existing
  call site (both currently call with no arguments, i.e. book 1) working
  unchanged.

## Unresolved questions
- `stats.json` is consumed by the website (`Hero.tsx`, `Catalogue.tsx`,
  `Enterprise.tsx`, `EvidenceReference.tsx`, `EvidenceGraphPage.tsx`) via
  destructured field access, not an exhaustive schema — the new `book2` key
  is additive and should not break existing consumers, but this was not
  verified against a full website build/test run in this pass (out of scope:
  this task was the stats script only, not website wiring, which the brief
  explicitly defers).
- Website wiring for book 2 (a second route reusing Reader/EvidenceRail) and
  the book-mash six-dim judge panel against `book-mash-2.toml` remain
  deferred, per the brief's own "After all chapters are drafted" section.
