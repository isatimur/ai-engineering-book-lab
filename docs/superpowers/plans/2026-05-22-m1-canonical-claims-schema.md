# M1 — Canonical Claims Schema Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make book-mash's epistemic dimensions actually work by migrating the two claims ledgers into one canonical `Claims Ledger.md` and conforming book-mash's loader, models, and `claim_defensibility` binding to it (ADR-0001).

**Architecture:** Two repos. `ai-engineer-book` (consumer): merge `claims/Claims Ledger - *.md` into one `claims/Claims Ledger.md`. `book-mash` (engine): `ClaimEntry` gets canonical fields, `Chapter` gets a `number`, `claims_index.py` is rewritten for the `## N)` schema, and `claim_defensibility`'s chapter binding moves from `claim:<id>` prefix-matching to `Candidate chapters` membership by chapter number.

**Tech Stack:** Python 3.13, Poetry, Pydantic v2, pytest. Spec: `docs/adr/0001-canonical-claims-ledger-schema.md`.

**Repo paths:** book-mash = `/Users/timur_isachenko/Dev/LifeOS/book-mash`; ai-engineer-book = `/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book`. Shell cwd resets between commands — use absolute paths. No AI attribution in commits.

---

## Task 1: Migrate the two ledgers into one canonical `Claims Ledger.md`

**Files:**
- Read: `ai-engineer-book/claims/Claims Ledger - Core Argument Chapters 1-6.md`, `ai-engineer-book/claims/Claims Ledger - Chapters 3-6.md`
- Create: `ai-engineer-book/claims/Claims Ledger.md`
- Delete: the two old `Claims Ledger - *.md` files

This is an editorial content merge, not code. Transformation rules:

- [ ] **Step 1: Read both source ledgers.** The "Core Argument" file uses `## N)` numbered claim headings; the "Chapters 3-6" file uses `### ` unnumbered claim headings. Both use the same fields.

- [ ] **Step 2: Write `claims/Claims Ledger.md`.** One `# Claims Ledger` H1, then every claim as a continuously-numbered `## N)` heading (1, 2, 3, … across all claims from both files). The heading text is the claim's prose. Each claim keeps exactly these fields as a markdown bullet list, in this order, omitting any the source didn't have:

```markdown
# Claims Ledger

## 1) <claim prose, verbatim from the source heading>
- **Why it matters:** <text>
- **Support level:** <tentative | moderate | strong>
- **Supporting sources:**
  - [[<wikilink>]]
  - [[<wikilink>]]
- **Caveats / counterpoints:** <text>
- **Candidate chapters:** 1, 6, 9, 10
- **Reusable phrasing:** <text>

## 2) <next claim>
...
```

- [ ] **Step 3: Deduplicate.** The two ledgers overlap (both cover chapters 3–6). If the same claim appears in both files, keep ONE entry; union its `Candidate chapters` and `Supporting sources`. Do not drop a claim that is merely *similar* — only merge true duplicates.

- [ ] **Step 4: Delete the two old files.**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git rm "claims/Claims Ledger - Core Argument Chapters 1-6.md" "claims/Claims Ledger - Chapters 3-6.md"
```

- [ ] **Step 5: Commit (ai-engineer-book).**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git add "claims/Claims Ledger.md"
git commit -m "refactor: merge claims ledgers into one canonical Claims Ledger.md (ADR-0001)"
```

---

## Task 2: Add `Chapter.number` to book-mash

**Files:**
- Modify: `book-mash/book_mash/corpus/models.py` (the `Chapter` class)
- Modify: `book-mash/book_mash/corpus/loader.py` (`_load_chapter`)
- Test: `book-mash/tests/test_corpus_loader.py`

- [ ] **Step 1: Write the failing test.** Append to `tests/test_corpus_loader.py`:

```python
def test_chapter_has_number():
    chapters = load_chapters(FIXTURE_GLOB)
    assert chapters[0].number == 1
    assert chapters[1].number == 2
```

- [ ] **Step 2: Run it — `cd /Users/timur_isachenko/Dev/LifeOS/book-mash && poetry run pytest tests/test_corpus_loader.py::test_chapter_has_number -v`** — expect FAIL (`Chapter` has no `number`).

- [ ] **Step 3: Add the field.** In `book_mash/corpus/models.py`, the `Chapter` class — add `number` with a default (default keeps existing hand-built test `Chapter(...)` constructions valid):

```python
class Chapter(BaseModel):
    id: str
    number: int = 0
    title: str
    file_path: str
    sections: list[Section]
    full_text: str
    line_count: int
```

- [ ] **Step 4: Parse the number in the loader.** In `book_mash/corpus/loader.py`, at the top add `_CHAPTER_NUM = re.compile(r"[Cc]hapter\s+(\d+)")` next to the other regexes. In `_load_chapter`, change the final `return Chapter(...)` to compute and pass `number`:

```python
    num_match = _CHAPTER_NUM.search(title)
    number = int(num_match.group(1)) if num_match else 0

    return Chapter(
        id=chapter_id,
        number=number,
        title=title or chapter_id,
        file_path=file_path,
        sections=sections,
        full_text=text,
        line_count=len(lines),
    )
```

- [ ] **Step 5: Run tests — `cd /Users/timur_isachenko/Dev/LifeOS/book-mash && poetry run pytest tests/test_corpus_loader.py -v`** — expect all pass (the fixture H1s `# Chapter 1 — The Premise` / `# Chapter 2 — A Drift` yield numbers 1 and 2).

- [ ] **Step 6: Commit.**

```bash
cd /Users/timur_isachenko/Dev/LifeOS/book-mash
git add book_mash/corpus/models.py book_mash/corpus/loader.py tests/test_corpus_loader.py
git commit -m "feat: parse chapter number from title (ADR-0001 claim binding)"
```

---

## Task 3: Canonical `ClaimEntry` model

**Files:**
- Modify: `book-mash/book_mash/corpus/models.py` (the `ClaimEntry` class)

- [ ] **Step 1: Replace the `ClaimEntry` class.** In `book_mash/corpus/models.py`, replace the current `ClaimEntry` with:

```python
class ClaimEntry(BaseModel):
    id: str  # "claims#<N>"
    text: str  # the claim prose (the ## N) heading)
    support_level: str  # "tentative" | "moderate" | "strong"
    candidate_chapters: list[int] = Field(default_factory=list)
    source_refs: list[str] = Field(default_factory=list)
    file_path: str
```

This renames `strength` → `support_level` and adds `candidate_chapters`. Downstream consumers are updated in Tasks 4 and 5.

- [ ] **Step 2: Verify nothing else imports the old shape yet — `cd /Users/timur_isachenko/Dev/LifeOS/book-mash && poetry run python -c "from book_mash.corpus.models import ClaimEntry; print('ok')"`** — expect `ok`. (The full suite is intentionally still red here; Task 4 fixes `claims_index`.)

- [ ] **Step 3: Commit.**

```bash
cd /Users/timur_isachenko/Dev/LifeOS/book-mash
git add book_mash/corpus/models.py
git commit -m "feat: canonical ClaimEntry — support_level, candidate_chapters (ADR-0001)"
```

---

## Task 4: Rewrite `claims_index.py` + canonical fixture + tests

**Files:**
- Rewrite: `book-mash/book_mash/corpus/claims_index.py`
- Delete: `book-mash/tests/fixtures/mini_book/claims/ch01_claims.md`, `ch02_claims.md`
- Create: `book-mash/tests/fixtures/mini_book/claims/Claims Ledger.md`
- Rewrite: `book-mash/tests/test_claims_index.py`

- [ ] **Step 1: Write the canonical fixture.** Create `tests/fixtures/mini_book/claims/Claims Ledger.md`:

```markdown
# Claims Ledger

## 1) AI tools have shifted from assistants that suggest to delegates that act
- **Why it matters:** the opening hinge of the book.
- **Support level:** strong
- **Supporting sources:**
  - [[206-joel-hron|#206 — Joel Hron]]
  - [[225-michael-grinich|#225 — Michael Grinich]]
- **Candidate chapters:** 1
- **Reusable phrasing:** the shift is from suggestion to delegated execution.

## 2) Code generation cheapens implementation but raises the bar for taste
- **Why it matters:** chapter 2's core argument.
- **Support level:** moderate
- **Supporting sources:**
  - [[152-fouad-matin|#152 — Fouad Matin]]
- **Candidate chapters:** 2
```

- [ ] **Step 2: Delete the old fixtures.**

```bash
cd /Users/timur_isachenko/Dev/LifeOS/book-mash
git rm "tests/fixtures/mini_book/claims/ch01_claims.md" "tests/fixtures/mini_book/claims/ch02_claims.md"
```

- [ ] **Step 3: Rewrite the test.** Replace `tests/test_claims_index.py` entirely:

```python
from pathlib import Path

from book_mash.corpus.claims_index import load_claims_index


CLAIMS_DIR = str(Path(__file__).parent / "fixtures" / "mini_book" / "claims")


def test_loads_two_claims():
    claims = load_claims_index(CLAIMS_DIR)
    assert len(claims) == 2


def test_claim_fields():
    claims = load_claims_index(CLAIMS_DIR)
    by_id = {c.id: c for c in claims}
    c1 = by_id["claims#1"]
    assert c1.support_level == "strong"
    assert "delegates that act" in c1.text
    assert c1.candidate_chapters == [1]
    assert any("206" in s for s in c1.source_refs)
    assert any("225" in s for s in c1.source_refs)


def test_candidate_chapters_parsed_as_ints():
    claims = load_claims_index(CLAIMS_DIR)
    by_id = {c.id: c for c in claims}
    assert by_id["claims#2"].candidate_chapters == [2]


def test_empty_dir_returns_empty_list(tmp_path):
    claims = load_claims_index(str(tmp_path))
    assert claims == []
```

- [ ] **Step 4: Run it — `cd /Users/timur_isachenko/Dev/LifeOS/book-mash && poetry run pytest tests/test_claims_index.py -v`** — expect FAIL (loader still parses the old `## claim:<id>` schema).

- [ ] **Step 5: Rewrite `claims_index.py` entirely:**

```python
import glob
import re
from pathlib import Path

from book_mash.corpus.models import ClaimEntry


_CLAIM_HEADER = re.compile(r"^##\s+(\d+)\)\s+(.+?)\s*$", re.MULTILINE)
_SUPPORT = re.compile(r"\*\*Support level:\*\*\s*([A-Za-z]+)")
_CANDIDATE = re.compile(r"\*\*Candidate chapters:\*\*\s*(.+)")
_WIKILINK = re.compile(r"\[\[([^\]]+)\]\]")


def load_claims_index(claims_dir: str) -> list[ClaimEntry]:
    if not Path(claims_dir).exists():
        return []
    entries: list[ClaimEntry] = []
    for path in sorted(glob.glob(f"{claims_dir}/*.md")):
        text = Path(path).read_text(encoding="utf-8")
        for number, claim_text, body in _split_by_claim_header(text):
            support = _SUPPORT.search(body)
            candidate = _CANDIDATE.search(body)
            entries.append(ClaimEntry(
                id=f"claims#{number}",
                text=claim_text.strip(),
                support_level=support.group(1).strip().lower() if support else "moderate",
                candidate_chapters=_parse_ints(candidate.group(1)) if candidate else [],
                source_refs=_WIKILINK.findall(body),
                file_path=path,
            ))
    return entries


def _split_by_claim_header(text: str) -> list[tuple[str, str, str]]:
    parts: list[tuple[str, str, str]] = []
    matches = list(_CLAIM_HEADER.finditer(text))
    for i, m in enumerate(matches):
        number = m.group(1)
        claim_text = m.group(2)
        body_start = m.end()
        body_end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        parts.append((number, claim_text, text[body_start:body_end]))
    return parts


def _parse_ints(s: str) -> list[int]:
    return [int(n) for n in re.findall(r"\d+", s)]
```

- [ ] **Step 6: Run it — `cd /Users/timur_isachenko/Dev/LifeOS/book-mash && poetry run pytest tests/test_claims_index.py -v`** — expect 4 passed.

- [ ] **Step 7: Commit.**

```bash
cd /Users/timur_isachenko/Dev/LifeOS/book-mash
git add book_mash/corpus/claims_index.py tests/test_claims_index.py "tests/fixtures/mini_book/claims/Claims Ledger.md"
git commit -m "feat: rewrite claims_index for canonical ## N) schema (ADR-0001)"
```

---

## Task 5: Conform `claim_defensibility` + runner chapter binding

**Files:**
- Modify: `book-mash/book_mash/judges/claim_defensibility.py` (one line — `strength` → `support_level`)
- Modify: `book-mash/book_mash/runners/measurement.py` (the `relevant_ledger` line)

- [ ] **Step 1: Fix the judge's ledger rendering.** In `book_mash/judges/claim_defensibility.py`, the `judge()` method builds `ledger_block`. Change the `c.strength` reference to `c.support_level`:

```python
        ledger_block = "\n".join(
            f"- {c.id} (strength: {c.support_level}): {c.text}" for c in ledger
        )
```

- [ ] **Step 2: Fix the runner's chapter binding.** In `book_mash/runners/measurement.py`, find this line (currently ~line 77):

```python
            relevant_ledger = [c for c in claims_index if c.id.startswith(f"claim:{chapter.id}")]
```

Replace it with `Candidate chapters` membership by chapter number:

```python
            relevant_ledger = [c for c in claims_index if chapter.number in c.candidate_chapters]
```

- [ ] **Step 3: Run the full non-live suite — `cd /Users/timur_isachenko/Dev/LifeOS/book-mash && poetry run pytest -v -m "not live"`** — expect all green. The runner test (`test_runner_measurement.py`) mocks the judges, so the binding change is exercised structurally; the mini_book chapters are numbered 1 and 2 and the fixture claims have `Candidate chapters` 1 and 2, so `relevant_ledger` resolves non-empty.

- [ ] **Step 4: Commit.**

```bash
cd /Users/timur_isachenko/Dev/LifeOS/book-mash
git add book_mash/judges/claim_defensibility.py book_mash/runners/measurement.py
git commit -m "feat: bind claims to chapters via Candidate chapters by number (ADR-0001)"
```

---

## Task 6: Full-suite verification + real-ledger smoke check

**Files:** none modified — verification only.

- [ ] **Step 1: Full non-live suite — `cd /Users/timur_isachenko/Dev/LifeOS/book-mash && poetry run pytest -v -m "not live"`** — expect all green (≈42 tests; `test_claims_index.py` now has 4).

- [ ] **Step 2: Confirm the real migrated ledger parses.** Point the loader at the real consumer ledger and confirm claims now index (the M1 success condition — book-mash v0.1 indexed zero):

```bash
cd /Users/timur_isachenko/Dev/LifeOS/book-mash
poetry run python -c "
from book_mash.corpus.claims_index import load_claims_index
claims = load_claims_index('/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/claims')
print(f'claims indexed: {len(claims)}')
assert len(claims) > 0, 'M1 FAILED — still indexing zero claims'
sample = claims[0]
print(f'sample: id={sample.id} support={sample.support_level} chapters={sample.candidate_chapters} sources={len(sample.source_refs)}')
assert sample.candidate_chapters, 'claim has no candidate_chapters — check the migrated ledger'
print('M1 OK — claims index and carry candidate chapters')
"
```
Expected: a non-zero claim count and `M1 OK`. If it prints zero or asserts, the Task 1 migration produced a file the canonical parser cannot read — fix the migrated `Claims Ledger.md`, do not loosen the parser.

- [ ] **Step 3: No commit** (verification only). If Step 2 surfaced a ledger-format fix, commit that fix to the `ai-engineer-book` repo with `fix: correct Claims Ledger.md formatting for canonical parse`.

---

## Self-review

**Spec coverage (ADR-0001):** one canonical schema → Tasks 1, 4. One ledger file → Task 1. `## N)` numbered headings, claim-text-as-heading → Tasks 1, 4. `Support level` field → Tasks 3, 4. `Candidate chapters` many-to-many binding by chapter number → Tasks 2, 4, 5. `claims#N` ids → Task 4. book-mash loader exposes a chapter number → Task 2. `claim_defensibility` binding moves off `claim:<id>` prefix → Task 5. `claims_index.py` rewritten → Task 4. Migration of the two ledgers → Task 1.

**Placeholder scan:** none — every code step shows complete code; Task 1 is content with explicit transformation rules.

**Type consistency:** `ClaimEntry` (Task 3) fields `id`, `text`, `support_level`, `candidate_chapters`, `source_refs`, `file_path` are exactly what `claims_index.py` constructs (Task 4) and what `claim_defensibility` reads (`c.support_level`, `c.id`, `c.text` — Task 5) and what the runner filters on (`c.candidate_chapters` — Task 5). `Chapter.number` (Task 2) is read by the runner (Task 5). `evidence_density.py` reads only `c.id` and `c.text`, both retained — no change needed there.

**Out of scope (correctly):** Source Anchors (ADR-0002 / M2) — `Supporting sources` stay as plain `[[wikilink]]` strings in M1. v0.2 `gate`/`autoresearch`. The `claim_defensibility` system prompt is unchanged.
