# Book 3 Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the third manuscript track end to end — ledger, verifier, website wiring, generators — and produce the per-chapter talk shortlists, so drafting can begin the moment D2 is answered.

**Architecture:** Mirror book 2's track exactly (`public/drafting-3/` as source of truth, mirrored to `website/src/content-3/`, registered in `bookChaptersThree.ts`), and extend the claims ledger with one new anchor kind so repo incidents can be cited the way corpus talks already are. Every book-2 trap found on 2026-11-15 is pre-empted by a task here rather than rediscovered.

**Tech Stack:** Python 3.13 (stdlib `unittest`, no new deps), Node 22 / Vite / React (website), existing `book-mash` config-driven per book.

**Spec:** `docs/superpowers/specs/2026-11-15-third-book-design.md`

## Scope

This plan deliberately excludes drafting. Chapters 1–12 depend on **D2 (audience)**, which sets Ch 1's voice and whether the enterprise sources are evidence or spine, and Ch 7 depends on **D3 (dormant gates)**. Neither is answered. Everything below is independent of both and leaves the author free to decide late.

Drafting gets its own plan, one per Part, after D2.

## Global Constraints

- `public/drafting-3/README` has **no file extension**. `book-mash` globs `*.md` with no filtering and measures any `.md` in that folder as a phantom chapter.
- `public/drafting-3/*.md` is the **source of truth**; `website/src/content-3/` is a generated mirror. (Book 1 is the opposite — do not copy book 1's direction.)
- Ledger entries require a populated `**Candidate chapters:**` field or the chapter renders with no Evidence panel.
- Corpus anchors keep the existing shape unchanged so `verify_ledger.py` keeps working on them untouched.
- Commit messages must never contain the literal bracketed skip-CI token; write `skip-CI`. GitHub honours it anywhere in the message and will skip every workflow.
- No AI attribution lines in commit messages.
- Ruff line length 100, target `py313`.

## Review Focus

Input classes the spec implies that no task's happy path exercises. Each has a test assigned below.

1. **A ledger with zero artifact anchors** — book 3 starts empty; the verifier must exit 0 on an all-corpus ledger, not crash on an empty set. (Task 2)
2. **An artifact anchor whose commit SHA no longer exists** — a rebase or force-push orphans it; must fail loudly, not silently resolve. (Task 2)
3. **An artifact anchor pointing at an expired Actions run** — `gh run view --log` returns *empty*, not an error, so an expired log is indistinguishable from a clean one. Must be reported as unverifiable, never as passing. (Task 2)
4. **A `drafting-3` folder containing a stray `.md`** — the phantom-chapter trap; the track check must catch it. (Task 3)
5. **A chapter in `bookChaptersThree.ts` with no mirrored content file** — the registry and the mirror drifting apart, which is how book 2's Ch8 shipped with no evidence panel. (Task 5)

---

### Task 1: ADR 0003 — artifact anchors

**Files:**
- Create: `docs/adr/0003-artifact-anchors.md`

**Interfaces:**
- Produces: the anchor vocabulary every later task uses — `kind` ∈ {`commit`, `run`, `file`, `range`}, `ref`, `date`, `excerpt`.

- [ ] **Step 1: Write the ADR** following the format of `docs/adr/0001-canonical-claims-ledger-schema.md` (`# Title` / `## Status` / `## Context` / `## Decision`).

Context must state the measured problem: the existing Source Anchor binds a claim to a video id, timestamp, verbatim quote and confidence, and `verify_ledger.py` resolves it against a transcript — but book 3's worked examples are commits, workflow runs, file paths and date ranges, none of which fit. Decision: a second anchor kind, `**Artifact anchor:**`, with fields `kind`, `ref`, `date`, `excerpt`. Corpus anchors are unchanged, so ADR 0002 is extended rather than superseded. Status: `accepted`.

- [ ] **Step 2: Commit**

```bash
git add docs/adr/0003-artifact-anchors.md
git commit -m "adr: artifact anchors for claims that cite the repo, not a talk"
```

---

### Task 2: Artifact anchor verifier

**Files:**
- Create: `scripts/verify_artifact_anchors.py`
- Create: `scripts/test_verify_artifact_anchors.py`

**Interfaces:**
- Consumes: the anchor vocabulary from Task 1.
- Produces: `verify(ledger_path: Path, repo: Path) -> tuple[int, int, list[str]]` returning `(checked, unverifiable, failures)`. CLI: `python3 scripts/verify_artifact_anchors.py --ledger claims-3/Claims\ Ledger.md [--repo .]`, exit 0 clean, exit 1 on any failure.

Note: `scripts/test_*.py` is run in CI by `script-tests.yml`, which lands with PR #86. If #86 is unmerged when this task runs, the tests still run locally; do not add a second workflow.

- [ ] **Step 1: Write the failing tests**

```python
def test_empty_ledger_exits_zero(self):
    """Book 3 starts with no artifact anchors at all."""
    checked, unverifiable, failures = verify(self.corpus_only_ledger, self.repo)
    self.assertEqual((checked, failures), (0, []))

def test_resolves_a_real_commit(self):
    checked, _, failures = verify(self.ledger_with_head_sha, self.repo)
    self.assertEqual((checked, failures), (1, []))

def test_missing_commit_fails_loudly(self):
    _, _, failures = verify(self.ledger_with_bogus_sha, self.repo)
    self.assertEqual(len(failures), 1)
    self.assertIn("deadbee", failures[0])

def test_expired_run_is_unverifiable_not_passing(self):
    """An expired Actions log returns empty, not an error."""
    checked, unverifiable, failures = verify(self.ledger_with_expired_run, self.repo)
    self.assertEqual(unverifiable, 1)
    self.assertEqual(failures, [])
    self.assertEqual(checked, 0)

def test_file_anchor_requires_the_path_to_exist(self):
    _, _, failures = verify(self.ledger_with_missing_path, self.repo)
    self.assertEqual(len(failures), 1)

def test_excerpt_must_appear_in_the_captured_evidence(self):
    """An excerpt that no capture file contains is a fabrication risk."""
    _, _, failures = verify(self.ledger_with_unfounded_excerpt, self.repo)
    self.assertEqual(len(failures), 1)
```

Fixtures build a real temporary git repo, as `scripts/test_commit_regenerated.py` does — not mocks.

- [ ] **Step 2: Run tests to verify they fail**

Run: `python3 scripts/test_verify_artifact_anchors.py`
Expected: FAIL with `ImportError` / `NameError: verify`

- [ ] **Step 3: Implement `verify(ledger_path: Path, repo: Path) -> tuple[int, int, list[str]]` in `scripts/verify_artifact_anchors.py`**

Parse `**Artifact anchor:**` blocks from the ledger. Resolve `commit` with `git cat-file -e <ref>^{commit}`, `file` with a path existence check, `range` by parsing two ISO dates. For `kind: run`, do **not** call the network: resolve the excerpt against the capture files in `research_passes/`, and count the anchor as *unverifiable* (not failed, not checked) when no capture contains it — distinguishing "evidence expired" from "evidence wrong" is the whole point of the third return value.

- [ ] **Step 4: Run tests to verify they pass**

Run: `python3 scripts/test_verify_artifact_anchors.py`
Expected: PASS, 6 tests

- [ ] **Step 5: Run ruff**

Run: `ruff check scripts/verify_artifact_anchors.py scripts/test_verify_artifact_anchors.py`
Expected: `All checks passed!`

- [ ] **Step 6: Commit**

```bash
git add scripts/verify_artifact_anchors.py scripts/test_verify_artifact_anchors.py
git commit -m "claims: verify anchors that cite the repo instead of a talk"
```

---

### Task 3: The third manuscript track skeleton

**Files:**
- Create: `public/drafting-3/README` (no extension)
- Create: `claims-3/Claims Ledger.md`
- Create: `book-mash-3.toml`
- Modify: `scripts/check_claims_integrity.py:30-32` (add the `"3"` book entry)

**Interfaces:**
- Produces: `BOOKS["3"] = {"ledger": "claims-3/Claims Ledger.md", "glob": "public/drafting-3/*.md"}`.

- [ ] **Step 1: Write the failing test** — add to `scripts/test_verify_artifact_anchors.py`:

```python
def test_drafting_3_contains_no_stray_markdown(self):
    """A README.md here becomes a phantom chapter book-mash will measure."""
    strays = list(Path("public/drafting-3").glob("*.md"))
    chapters = [p for p in strays if p.name.startswith("Chapter ")]
    self.assertEqual(strays, chapters)
```

- [ ] **Step 2: Run it to verify it fails**

Expected: FAIL — `public/drafting-3` does not exist.

- [ ] **Step 3: Create the skeleton.** `public/drafting-3/README` copies book 2's warning verbatim, with paths updated. `claims-3/Claims Ledger.md` carries the `# Claims Ledger — Third Book` heading and the ADR 0003 anchor vocabulary in its preamble. `book-mash-3.toml` copies `book-mash-2.toml` with `chapters_glob = "public/drafting-3/*.md"` and the claims path updated.

- [ ] **Step 4: Run the test and the existing integrity runner**

Run: `python3 scripts/test_verify_artifact_anchors.py && python3 scripts/check_claims_integrity.py --book 3`
Expected: tests PASS; integrity runner reports 0 claims and exits 0.

- [ ] **Step 5: Commit**

```bash
git add public/drafting-3/README claims-3 book-mash-3.toml scripts/check_claims_integrity.py scripts/test_verify_artifact_anchors.py
git commit -m "book 3: third manuscript track skeleton"
```

---

### Task 4: Website wiring

**Files:**
- Create: `website/scripts/sync-third-book.mjs` (copy of `sync-second-book.mjs`, paths updated)
- Create: `website/src/data/bookChaptersThree.ts`
- Create: `website/src/pages/ThirdBookReader.tsx`, `website/src/pages/ThirdBookChapterDetail.tsx`
- Modify: `website/src/routes.tsx:73-78` (add `third-book` and `third-book/:slug`)
- Modify: `website/src/pages/Books.tsx` (third entry)

**Interfaces:**
- Consumes: `public/drafting-3/*.md` from Task 3.
- Produces: `chaptersThree: BookChapter[]`, `chaptersThreeWordCount`, `chapterThreePath`, `chapterThreeParam`, `chapterThreeByParam`, `BOOK_THREE_TITLE` — the same five exports `bookChaptersTwo.ts` provides, so the generic reading components work unmodified.

- [ ] **Step 1: Mirror book 2's files**, reusing `BookChapter` from `./bookChapters` rather than redefining it. Keep `chaptersThree` as its own array; do not merge into book 1's, whose `.length` other modules assume.

- [ ] **Step 2: Run the sync script**

Run: `cd website && node scripts/sync-third-book.mjs`
Expected: `done. copied=0 kept=0 -> src/content-3/ (0 chapters)` — an empty track is valid.

- [ ] **Step 3: Build and test**

Run: `cd website && npm test && npm run build`
Expected: 97/97 tests pass; build exits 0.

- [ ] **Step 4: Commit**

```bash
git add website/scripts/sync-third-book.mjs website/src/data/bookChaptersThree.ts website/src/pages/ThirdBook*.tsx website/src/routes.tsx website/src/pages/Books.tsx
git commit -m "book 3: reading routes and chapter registry"
```

---

### Task 5: Generators — stats, sitemap, evidence

**Files:**
- Modify: `99_Meta/scripts/build_stats.py:153-173` (a `book3` block beside `book2`)
- Modify: `website/scripts/gen-sitemap.mjs` (parse `bookChaptersThree.ts`; push `/third-book` and `/third-book/<slug>`)
- Create: `website/src/evidence-3.json` (generated)

**Interfaces:**
- Consumes: `bookChaptersThree.ts` from Task 4; `claims-3/Claims Ledger.md` from Task 3.

`gen-sitemap.mjs` already has `parseChapters(file)` after PR #87; reuse it rather than adding a third regex. If #87 is unmerged, extract the helper as part of this task.

- [ ] **Step 1: Write the failing test** — add to `website/src/data/bookChapters.test.ts`:

```ts
it('every registered book-3 chapter has a mirrored content file', () => {
  for (const c of chaptersThree) {
    expect(c.content.length).toBeGreaterThan(0);
  }
});
```

- [ ] **Step 2: Run it**

Run: `cd website && npm test -- bookChapters`
Expected: PASS vacuously on an empty array — this is the guard that fires later, when a chapter is registered without being synced.

- [ ] **Step 3: Add the `book3` block to `build_stats.py`** mirroring `book2`: `drafting_files`, `claims`, `anchors`, `chapters`.

- [ ] **Step 4: Add book-3 URLs to `gen-sitemap.mjs`** and extend its log line to name three books.

- [ ] **Step 5: Regenerate and verify**

Run:
```bash
python3 99_Meta/scripts/build_stats.py
python3 99_Meta/scripts/anchor/build_evidence.py --ledger 'claims-3/Claims Ledger.md' --out website/src/evidence-3.json
cd website && node scripts/gen-sitemap.mjs
```
Expected: stats report a third book with 0 chapters; sitemap log names three books; `evidence-3.json` is valid JSON with zero rows.

- [ ] **Step 6: Commit**

```bash
git add 99_Meta/scripts/build_stats.py website/scripts/gen-sitemap.mjs website/src/evidence-3.json website/public/sitemap.xml STATS.md stats.json website/src/data/stats.json website/src/data/bookChapters.test.ts
git commit -m "book 3: stats, sitemap and evidence wiring"
```

---

### Task 6: Corpus classification pass

**Files:**
- Create: `research_passes/2026-11-16-book3-corpus-classification.md`

**Interfaces:**
- Produces: a per-chapter talk shortlist, which every drafting plan consumes.

- [ ] **Step 1: Build the candidate set** from the measured seams in the spec: 62 SDLC/PDLC talks, 35 software-factory talks, 13 spec-driven, 9 each platform-engineering and IDP, 6 agent-factory, 6 assembly-line. Record the exact `grep` used, as the spec's reality-check section does.

- [ ] **Step 2: Hand-curate.** Keyword hits are a seed, not a shortlist — book 2's spec required the same pass. Drop passing mentions; keep talks whose argument is about the lifecycle. Assign each survivor to one of the 12 chapters, or to "unused".

- [ ] **Step 3: Flag the overlap with book 1.** Chapters 2, 3, 4 and 9 of book 1 already cover taste, harnesses and specs, evals, and the AI-native organization. For each book-3 chapter, state its seam in one line, the way book 2's ledger does for its reprises.

- [ ] **Step 4: Record the gaps.** Any chapter with fewer than ~6 substantive talks is a merge candidate; say so explicitly rather than letting drafting discover it. Ch 12's five-tool comparison will be short on corpus support by construction — that is D1, not a classification failure.

- [ ] **Step 5: Commit**

```bash
git add research_passes/2026-11-16-book3-corpus-classification.md
git commit -m "book 3: corpus classification and per-chapter shortlists"
```

---

### Task 7: Capture the remaining worked-example evidence

**Files:**
- Create: `research_passes/2026-11-16-book3-worked-example-capture.md`

**Interfaces:**
- Consumes: the anchor vocabulary from Task 1 — each captured item is written as a ready-to-paste artifact anchor.

Urgency is measured, not assumed: Actions logs expire at 90 days, and 93 of 190 `diagrams-check` runs had already lost theirs on 2026-11-15. The gate example is already captured in `research_passes/2026-11-15-diagrams-gate-vacuous-pass-evidence.md`; the rest are not.

- [ ] **Step 1: Capture each remaining incident** from the spec's worked-examples table — the `stats-regen` race (run ids 43740909184 and 43740902338, with the `cannot lock ref` and conflict lines), the deploy gap (0 of 30 bot stats commits, with the query), the skip-CI A/B (zero runs before the amend, `website-ci` and `script-tests` after), and the 57-day figure window (commits `53df9ab` and `e525216`).

- [ ] **Step 2: Prefer git over Actions** wherever a fact is derivable from commit history, which does not expire. Note per item which source it rests on.

- [ ] **Step 3: Verify the capture**

Run: `python3 scripts/verify_artifact_anchors.py --ledger 'claims-3/Claims Ledger.md'`
Expected: exit 0; every `run` anchor resolves against a capture file rather than the network.

- [ ] **Step 4: Commit**

```bash
git add research_passes/2026-11-16-book3-worked-example-capture.md claims-3
git commit -m "book 3: capture worked-example evidence before its logs expire"
```

---

## What this plan does not decide

- **D1** — how the five tools get compared. Task 6 Step 4 records the shortfall; it does not resolve it.
- **Primary-source verification of the tool facts** (spec open item 3). Claims about Spec Kit, OpenSpec and EGM currently rest on secondary coverage, and EGM's launch date is reported inconsistently (2026-10-22 vs 2026-11-08). The spec requires verification against the repositories *before any of it reaches prose* — and no prose happens in this plan, so it belongs to the first drafting plan that touches Ch 3 or Ch 12, not here.
- **D2** — audience. Nothing here depends on it.
- **D3** — dormant gates. Arming them needs a `CORPUS_TOKEN` only the author can create, and Ch 7 can argue either way.
- Title, palette, `llms.txt` membership, judge-panel timing, and whether book 2's depth pass precedes book 3's drafting.
