# M2 — Source Anchors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn every Claim's bare `[[wikilink]]` supporting sources into **Source Anchors** — `{video_id, start, end, quote, confidence}` — so a reader can verify the exact moment in a source video that grounds a claim, and surface those anchors as a per-chapter evidence rail on the website.

**Architecture:** One repo, `ai-engineer-book`. A deterministic Python tool (`99_Meta/scripts/anchor/`) parses word-level WebVTT transcripts and locates a quote's timestamps — the LLM picks *which* words to anchor, the tool computes *when* they were said. A markdown **anchoring pass** program tells an agent how to use the tool to backfill the canonical `Claims Ledger.md` idempotently. The research-pass instructions are updated so future claims are born anchored. A generator script flattens the anchored ledger into `website/src/evidence.json`, which a new `EvidenceRail` React component renders under each chapter.

**Tech Stack:** Python 3.13 stdlib only (`re`, `unittest` — no third-party deps, no Poetry); React 19 + TypeScript + Vite 6 for the website. Spec: `docs/adr/0002-source-anchors.md` (extends `docs/adr/0001-canonical-claims-ledger-schema.md`).

**Repo path:** `ai-engineer-book` = `/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book`. Shell cwd resets between commands — use absolute paths. No AI attribution in commits. Do not push.

---

## Out of scope (deliberately deferred to M3)

ADR-0002 names two further items that are **not** part of M2:

- **book-mash consuming `quote` as ground-truth for `claim_defensibility`** (ADR-0002 "Production", bullet 3). The book-mash engine at `/Users/timur_isachenko/Dev/LifeOS/book-mash` is **not touched** by this plan.
- **Inline passage-level anchors** on the website (ADR-0002 "Surfacing", "Later"). M2 ships only the chapter-level evidence rail ("First").

Do not implement either. If a task seems to require them, stop and escalate.

---

## Source Anchor ledger format (canonical — referenced by Tasks 4, 5, 7)

In `claims/Claims Ledger.md`, each `**Supporting sources:**` bullet is a `[[wikilink]]`. M2 adds **two child bullets** under each source bullet, indented one level:

```markdown
- **Supporting sources:**
  - [[206-kDEvo2__Ijg-from-copilot-to-colleague-joel-hron|#206 — Joel Hron, Thomson Reuters]] — existing gloss kept verbatim
    - **Anchor:** `kDEvo2__Ijg` 00:11:46.320 → 00:11:52.880 · confidence: high
    - **Quote:** "the north star has shifted from helpfulness to productive"
```

Rules:

- The `**Anchor:**` line carries the 11-char `video_id` in backticks, then `start` and `end` as `HH:MM:SS.mmm` VTT timestamps joined by ` → ` (a real U+2192 arrow), then ` · confidence: ` and one of `high | medium | low`.
- The `**Quote:**` line carries the **verbatim** transcript text in straight double quotes.
- A source whose video has no transcript file gets a single child bullet instead: `- **Anchor:** not available (no transcript)` — and no `**Quote:**` line.
- The existing gloss text after `]] — ...` is **never** deleted; the anchor is added alongside it.

---

## File Structure

**Created:**

| File | Responsibility |
|------|----------------|
| `99_Meta/scripts/anchor/vtt.py` | Parse a WebVTT file into an ordered `TimedWord` stream |
| `99_Meta/scripts/anchor/locate.py` | Fuzzy-locate a search phrase in a word stream → `Anchor` |
| `99_Meta/scripts/anchor/cli.py` | CLI wrapper + `extract_video_id` helper; prints anchor JSON |
| `99_Meta/scripts/anchor/build_evidence.py` | Parse anchored ledger → `website/src/evidence.json` |
| `99_Meta/scripts/anchor/test_vtt.py` | Tests for `vtt.py` |
| `99_Meta/scripts/anchor/test_locate.py` | Tests for `locate.py` |
| `99_Meta/scripts/anchor/test_cli.py` | Tests for `cli.py` |
| `99_Meta/scripts/anchor/test_build_evidence.py` | Tests for `build_evidence.py` |
| `99_Meta/scripts/anchor/testdata/testvid0001.en.vtt` | Fixture VTT |
| `99_Meta/scripts/anchor/testdata/Claims Ledger.md` | Fixture anchored ledger |
| `programs/source_anchoring_pass.md` | Agent-instruction program for the anchoring pass |
| `website/src/evidence.json` | Generated chapter→claims→anchors data |
| `website/src/EvidenceRail.tsx` | React component rendering the evidence rail |

**Modified:** `claims/Claims Ledger.md` (backfilled with anchors), `programs/book_autoresearch.md`, `claims/README.md`, `website/tsconfig.json`, `website/src/App.tsx`.

The Python tool uses **stdlib only** and is tested with `unittest` (the repo has no Poetry/pytest setup). Run tests with: `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/99_Meta/scripts/anchor && python3 -m unittest -v`.

---

## Task 1: VTT word-stream parser

**Files:**
- Create: `99_Meta/scripts/anchor/testdata/testvid0001.en.vtt`
- Create: `99_Meta/scripts/anchor/vtt.py`
- Create: `99_Meta/scripts/anchor/test_vtt.py`

YouTube auto-caption VTT uses a rolling format: each cue has a timestamp header, a carry-over text line, and a fresh line with inline `<HH:MM:SS.mmm><c> word</c>` tags. We extract only the *new* words per cue (the tagged line); the first word(s) before the first inline tag take the cue's start time. Tiny untagged "settle" cues are skipped.

- [ ] **Step 1: Create the fixture VTT.** Write `99_Meta/scripts/anchor/testdata/testvid0001.en.vtt` exactly:

```
WEBVTT
Kind: captions
Language: en

00:00:01.000 --> 00:00:03.000 align:start position:0%
 
the<00:00:01.200><c> north</c><00:00:01.600><c> star</c><00:00:02.100><c> has</c>

00:00:03.000 --> 00:00:03.010 align:start position:0%
the north star has
 

00:00:03.010 --> 00:00:05.000 align:start position:0%
the north star has
shifted<00:00:03.400><c> from</c><00:00:03.900><c> helpfulness</c><00:00:04.500><c> to</c><00:00:04.800><c> productive</c>
```

- [ ] **Step 2: Write the failing test.** Create `99_Meta/scripts/anchor/test_vtt.py`:

```python
import unittest
from pathlib import Path

from vtt import load_word_stream, normalize

FIXTURE = str(Path(__file__).parent / "testdata" / "testvid0001.en.vtt")


class TestNormalize(unittest.TestCase):
    def test_strips_punctuation_and_lowercases(self):
        self.assertEqual(normalize("Productive,"), "productive")
        self.assertEqual(normalize("CEO"), "ceo")
        self.assertEqual(normalize("--"), "")


class TestWordStream(unittest.TestCase):
    def setUp(self):
        self.stream = load_word_stream(FIXTURE)

    def test_extracts_every_new_word_once(self):
        words = [w.word for w in self.stream]
        self.assertEqual(
            words,
            ["the", "north", "star", "has", "shifted", "from", "helpfulness", "to", "productive"],
        )

    def test_first_word_takes_cue_start_time(self):
        self.assertEqual(self.stream[0].word, "the")
        self.assertEqual(self.stream[0].timestamp, "00:00:01.000")

    def test_inline_timestamps_attach_to_their_word(self):
        self.assertEqual(self.stream[1].word, "north")
        self.assertEqual(self.stream[1].timestamp, "00:00:01.200")

    def test_fresh_word_after_settle_cue_takes_new_cue_start(self):
        self.assertEqual(self.stream[4].word, "shifted")
        self.assertEqual(self.stream[4].timestamp, "00:00:03.010")

    def test_last_word(self):
        self.assertEqual(self.stream[-1].word, "productive")
        self.assertEqual(self.stream[-1].timestamp, "00:00:04.800")

    def test_norm_is_populated(self):
        self.assertEqual(self.stream[-1].norm, "productive")


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 3: Run it — `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/99_Meta/scripts/anchor && python3 -m unittest test_vtt -v`** — expect FAIL (`ModuleNotFoundError: No module named 'vtt'`).

- [ ] **Step 4: Implement `vtt.py`.** Create `99_Meta/scripts/anchor/vtt.py`:

```python
import re
from dataclasses import dataclass
from pathlib import Path

_CUE_HEADER = re.compile(r"^(\d\d:\d\d:\d\d\.\d\d\d)\s+-->\s+\d\d:\d\d:\d\d\.\d\d\d")
_INLINE_TS = re.compile(r"<(\d\d:\d\d:\d\d\.\d\d\d)>")
_TAGS = re.compile(r"</?c>")


@dataclass
class TimedWord:
    word: str       # verbatim token, punctuation preserved
    norm: str       # normalized form, for matching
    timestamp: str  # "HH:MM:SS.mmm"


def normalize(token: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", token.lower())


def _words(text: str, timestamp: str) -> list[TimedWord]:
    out: list[TimedWord] = []
    for tok in _TAGS.sub("", text).split():
        n = normalize(tok)
        if n:
            out.append(TimedWord(word=tok, norm=n, timestamp=timestamp))
    return out


def _parse_fresh_line(line: str, cue_start: str) -> list[TimedWord]:
    parts = _INLINE_TS.split(line)
    words = _words(parts[0], cue_start)
    for i in range(1, len(parts) - 1, 2):
        words.extend(_words(parts[i + 1], parts[i]))
    return words


def load_word_stream(vtt_path: str) -> list[TimedWord]:
    lines = Path(vtt_path).read_text(encoding="utf-8").splitlines()
    stream: list[TimedWord] = []
    i = 0
    while i < len(lines):
        m = _CUE_HEADER.match(lines[i])
        if not m:
            i += 1
            continue
        cue_start = m.group(1)
        i += 1
        text_lines: list[str] = []
        while i < len(lines) and lines[i].strip():
            text_lines.append(lines[i])
            i += 1
        fresh = next((ln for ln in reversed(text_lines) if _INLINE_TS.search(ln)), None)
        if fresh is not None:
            stream.extend(_parse_fresh_line(fresh, cue_start))
    return stream
```

- [ ] **Step 5: Run tests — `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/99_Meta/scripts/anchor && python3 -m unittest test_vtt -v`** — expect all 7 pass.

- [ ] **Step 6: Commit.**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git add "99_Meta/scripts/anchor/vtt.py" "99_Meta/scripts/anchor/test_vtt.py" "99_Meta/scripts/anchor/testdata/testvid0001.en.vtt"
git commit -m "feat: WebVTT word-stream parser for source anchoring (ADR-0002)"
```

---

## Task 2: Quote locator

**Files:**
- Create: `99_Meta/scripts/anchor/locate.py`
- Create: `99_Meta/scripts/anchor/test_locate.py`

The locator slides a window the length of the search phrase across the word stream, scoring each window by positional token match. The best window's first/last word timestamps become `start`/`end`; the match ratio becomes `confidence` (`high` ≥ 0.9, `medium` ≥ 0.6, else `low`). The returned `quote` is the verbatim VTT text of the best window — so an approximate search phrase still yields a verbatim quote.

- [ ] **Step 1: Write the failing test.** Create `99_Meta/scripts/anchor/test_locate.py`:

```python
import unittest
from pathlib import Path

from locate import locate_quote
from vtt import load_word_stream

FIXTURE = str(Path(__file__).parent / "testdata" / "testvid0001.en.vtt")


class TestLocateQuote(unittest.TestCase):
    def setUp(self):
        self.stream = load_word_stream(FIXTURE)

    def test_exact_phrase_is_high_confidence(self):
        a = locate_quote(self.stream, "from helpfulness to productive", "vid00000001")
        self.assertEqual(a.start, "00:00:03.400")
        self.assertEqual(a.end, "00:00:04.800")
        self.assertEqual(a.quote, "from helpfulness to productive")
        self.assertEqual(a.confidence, "high")
        self.assertEqual(a.video_id, "vid00000001")

    def test_quote_is_verbatim_from_vtt_not_the_search_phrase(self):
        # search phrase lower/unpunctuated; quote keeps the VTT's verbatim token
        a = locate_quote(self.stream, "north star has", "vid00000001")
        self.assertEqual(a.quote, "north star has")
        self.assertEqual(a.confidence, "high")

    def test_one_wrong_word_is_medium_confidence(self):
        a = locate_quote(self.stream, "north star has shiftedX", "vid00000001")
        self.assertEqual(a.confidence, "medium")
        self.assertEqual(a.start, "00:00:01.200")

    def test_unrelated_phrase_is_low_confidence(self):
        a = locate_quote(self.stream, "zzz yyy xxx www", "vid00000001")
        self.assertEqual(a.confidence, "low")

    def test_empty_phrase_is_low_confidence(self):
        a = locate_quote(self.stream, "   ", "vid00000001")
        self.assertEqual(a.confidence, "low")
        self.assertEqual(a.quote, "")

    def test_phrase_longer_than_stream_is_low_confidence(self):
        a = locate_quote(self.stream, " ".join(["word"] * 50), "vid00000001")
        self.assertEqual(a.confidence, "low")


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run it — `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/99_Meta/scripts/anchor && python3 -m unittest test_locate -v`** — expect FAIL (`ModuleNotFoundError: No module named 'locate'`).

- [ ] **Step 3: Implement `locate.py`.** Create `99_Meta/scripts/anchor/locate.py`:

```python
from dataclasses import dataclass

from vtt import TimedWord, normalize


@dataclass
class Anchor:
    video_id: str
    start: str
    end: str
    quote: str
    confidence: str  # "high" | "medium" | "low"


def _confidence(ratio: float) -> str:
    if ratio >= 0.9:
        return "high"
    if ratio >= 0.6:
        return "medium"
    return "low"


def locate_quote(stream: list[TimedWord], phrase: str, video_id: str) -> Anchor:
    target = [n for n in (normalize(t) for t in phrase.split()) if n]
    if not target or len(stream) < len(target):
        return Anchor(video_id, "", "", "", "low")
    n = len(target)
    best_score = -1.0
    best_i = 0
    for i in range(len(stream) - n + 1):
        window = stream[i : i + n]
        hits = sum(1 for w, t in zip(window, target) if w.norm == t)
        score = hits / n
        if score > best_score:
            best_score = score
            best_i = i
    window = stream[best_i : best_i + n]
    quote = " ".join(w.word for w in window)
    return Anchor(
        video_id=video_id,
        start=window[0].timestamp,
        end=window[-1].timestamp,
        quote=quote,
        confidence=_confidence(best_score),
    )
```

- [ ] **Step 4: Run tests — `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/99_Meta/scripts/anchor && python3 -m unittest test_locate -v`** — expect all 6 pass.

- [ ] **Step 5: Commit.**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git add "99_Meta/scripts/anchor/locate.py" "99_Meta/scripts/anchor/test_locate.py"
git commit -m "feat: fuzzy quote locator with confidence scoring (ADR-0002)"
```

---

## Task 3: Anchoring CLI + video-id extraction

**Files:**
- Create: `99_Meta/scripts/anchor/cli.py`
- Create: `99_Meta/scripts/anchor/test_cli.py`

The CLI takes a video id (or a raw ledger wikilink target) plus a search phrase, loads `<transcripts>/<video_id>.en.vtt`, and prints the anchor as JSON. `extract_video_id` pulls the 11-char YouTube id out of a `NNN-<id>-slug` wikilink target.

- [ ] **Step 1: Write the failing test.** Create `99_Meta/scripts/anchor/test_cli.py`:

```python
import json
import subprocess
import sys
import unittest
from pathlib import Path

from cli import extract_video_id

ANCHOR_DIR = Path(__file__).parent
TESTDATA = ANCHOR_DIR / "testdata"


class TestExtractVideoId(unittest.TestCase):
    def test_bare_11_char_id(self):
        self.assertEqual(extract_video_id("_-oIuRH4oGA"), "_-oIuRH4oGA")

    def test_wikilink_target(self):
        self.assertEqual(
            extract_video_id("206-kDEvo2__Ijg-from-copilot-to-colleague-joel-hron"),
            "kDEvo2__Ijg",
        )

    def test_full_wikilink_with_brackets_and_label(self):
        self.assertEqual(
            extract_video_id("[[003-XNtkiQJ49Ps-agents-need-more-than-a-chat|#3 — Jacob]]"),
            "XNtkiQJ49Ps",
        )

    def test_unparseable_raises(self):
        with self.assertRaises(ValueError):
            extract_video_id("not a video reference")


class TestCli(unittest.TestCase):
    def test_cli_prints_anchor_json(self):
        result = subprocess.run(
            [sys.executable, "cli.py", "testvid0001", "from helpfulness to productive",
             "--transcripts", "testdata"],
            cwd=ANCHOR_DIR, capture_output=True, text=True,
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        data = json.loads(result.stdout)
        self.assertEqual(data["confidence"], "high")
        self.assertEqual(data["video_id"], "testvid0001")
        self.assertIn("productive", data["quote"])

    def test_cli_missing_transcript_reports_error(self):
        result = subprocess.run(
            [sys.executable, "cli.py", "nosuchvid01", "anything",
             "--transcripts", "testdata"],
            cwd=ANCHOR_DIR, capture_output=True, text=True,
        )
        self.assertEqual(result.returncode, 1)
        data = json.loads(result.stdout)
        self.assertIn("error", data)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run it — `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/99_Meta/scripts/anchor && python3 -m unittest test_cli -v`** — expect FAIL (`ModuleNotFoundError: No module named 'cli'`).

- [ ] **Step 3: Implement `cli.py`.** Create `99_Meta/scripts/anchor/cli.py`:

```python
import argparse
import json
import re
import sys
from dataclasses import asdict
from pathlib import Path

from locate import locate_quote
from vtt import load_word_stream

# cli.py lives at <repo>/99_Meta/scripts/anchor/cli.py — parents[2] is 99_Meta.
_DEFAULT_TRANSCRIPTS = Path(__file__).resolve().parents[2] / "transcripts" / "raw"

_BARE_ID = re.compile(r"[A-Za-z0-9_-]{11}")
_WIKILINK_ID = re.compile(r"^\d+-([A-Za-z0-9_-]{11})(?=-)")


def extract_video_id(raw: str) -> str:
    s = raw.strip().strip("[]").split("|")[0].strip()
    if _BARE_ID.fullmatch(s):
        return s
    m = _WIKILINK_ID.match(s)
    if m:
        return m.group(1)
    raise ValueError(f"cannot extract video id from {raw!r}")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Locate a quote in a video's WebVTT transcript and print a Source Anchor."
    )
    parser.add_argument("video", help="11-char video id or a ledger wikilink target")
    parser.add_argument("phrase", help="search phrase to anchor")
    parser.add_argument("--transcripts", default=str(_DEFAULT_TRANSCRIPTS),
                        help="directory holding <video_id>.en.vtt files")
    args = parser.parse_args(argv)

    video_id = extract_video_id(args.video)
    vtt_path = Path(args.transcripts) / f"{video_id}.en.vtt"
    if not vtt_path.exists():
        json.dump({"video_id": video_id, "error": f"transcript not found: {vtt_path}"},
                  sys.stdout, ensure_ascii=False)
        sys.stdout.write("\n")
        return 1

    stream = load_word_stream(str(vtt_path))
    anchor = locate_quote(stream, args.phrase, video_id)
    json.dump(asdict(anchor), sys.stdout, ensure_ascii=False)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 4: Run tests — `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/99_Meta/scripts/anchor && python3 -m unittest test_cli -v`** — expect all 6 pass.

- [ ] **Step 5: Commit.**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git add "99_Meta/scripts/anchor/cli.py" "99_Meta/scripts/anchor/test_cli.py"
git commit -m "feat: anchoring CLI with video-id extraction (ADR-0002)"
```

---

## Task 4: Evidence-rail data generator

**Files:**
- Create: `99_Meta/scripts/anchor/testdata/Claims Ledger.md`
- Create: `99_Meta/scripts/anchor/build_evidence.py`
- Create: `99_Meta/scripts/anchor/test_build_evidence.py`

This script parses the anchored `Claims Ledger.md` (see the **Source Anchor ledger format** section above), and produces `website/src/evidence.json` — an object keyed by chapter number string, each value a list of claims with their anchored sources. Only sources that carry a parseable `**Anchor:**` + `**Quote:**` pair are included; claims with zero anchored sources are omitted.

- [ ] **Step 1: Create the fixture ledger.** Write `99_Meta/scripts/anchor/testdata/Claims Ledger.md`:

```markdown
# Claims Ledger

## 1) Delegated execution is the real shift
- **Why it matters:** opening hinge.
- **Support level:** strong
- **Supporting sources:**
  - [[206-kDEvo2__Ijg-from-copilot-to-colleague|#206 — Joel Hron]] — gloss kept
    - **Anchor:** `kDEvo2__Ijg` 00:11:46.320 → 00:11:52.880 · confidence: high
    - **Quote:** "the north star has shifted from helpfulness to productive"
  - [[003-XNtkiQJ49Ps-agents-need-more-than-a-chat|#3 — Jacob Lauritzen]]
    - **Anchor:** not available (no transcript)
- **Candidate chapters:** 1, 6

## 2) A claim with no anchored sources yet
- **Support level:** moderate
- **Supporting sources:**
  - [[057-ShuJ_CN6zr4-making-codebases-agent-ready|#57 — Eno Reyes]]
- **Candidate chapters:** 3
```

- [ ] **Step 2: Write the failing test.** Create `99_Meta/scripts/anchor/test_build_evidence.py`:

```python
import unittest
from pathlib import Path

from build_evidence import build_index, parse_ledger

LEDGER = str(Path(__file__).parent / "testdata" / "Claims Ledger.md")


class TestParseLedger(unittest.TestCase):
    def setUp(self):
        self.claims = parse_ledger(LEDGER)

    def test_only_claims_with_anchors_are_kept(self):
        self.assertEqual(len(self.claims), 1)
        self.assertEqual(self.claims[0]["claim_id"], "claims#1")

    def test_claim_text_and_support_level(self):
        c = self.claims[0]
        self.assertEqual(c["text"], "Delegated execution is the real shift")
        self.assertEqual(c["support_level"], "strong")

    def test_candidate_chapters_parsed_as_ints(self):
        self.assertEqual(self.claims[0]["candidate_chapters"], [1, 6])

    def test_anchor_fields(self):
        anchors = self.claims[0]["anchors"]
        self.assertEqual(len(anchors), 1)  # "not available" source is dropped
        a = anchors[0]
        self.assertEqual(a["video_id"], "kDEvo2__Ijg")
        self.assertEqual(a["start"], "00:11:46.320")
        self.assertEqual(a["end"], "00:11:52.880")
        self.assertEqual(a["start_seconds"], 706)
        self.assertEqual(a["confidence"], "high")
        self.assertEqual(a["quote"], "the north star has shifted from helpfulness to productive")
        self.assertEqual(a["label"], "#206 — Joel Hron")


class TestBuildIndex(unittest.TestCase):
    def test_claim_appears_under_every_candidate_chapter(self):
        index = build_index(parse_ledger(LEDGER))
        self.assertEqual(sorted(index.keys()), ["1", "6"])
        self.assertEqual(index["1"][0]["claim_id"], "claims#1")
        self.assertEqual(index["6"][0]["claim_id"], "claims#1")

    def test_entry_shape(self):
        index = build_index(parse_ledger(LEDGER))
        entry = index["1"][0]
        self.assertEqual(
            sorted(entry.keys()), ["anchors", "claim_id", "support_level", "text"]
        )


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 3: Run it — `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/99_Meta/scripts/anchor && python3 -m unittest test_build_evidence -v`** — expect FAIL (`ModuleNotFoundError: No module named 'build_evidence'`).

- [ ] **Step 4: Implement `build_evidence.py`.** Create `99_Meta/scripts/anchor/build_evidence.py`:

```python
import argparse
import json
import re
from pathlib import Path

# build_evidence.py lives at <repo>/99_Meta/scripts/anchor/ — parents[3] is the repo root.
_REPO = Path(__file__).resolve().parents[3]
_DEFAULT_LEDGER = _REPO / "claims" / "Claims Ledger.md"
_DEFAULT_OUT = _REPO / "website" / "src" / "evidence.json"

_CLAIM = re.compile(r"^##\s+(\d+)\)\s+(.+?)\s*$", re.MULTILINE)
_SUPPORT = re.compile(r"\*\*Support level:\*\*\s*([A-Za-z]+)")
_CANDIDATE = re.compile(r"\*\*Candidate chapters:\*\*\s*([0-9,\s]+)")
_SOURCE_BULLET = re.compile(r"^\s*-\s+\[\[([^\]]+)\]\]")
_ANCHOR = re.compile(
    r"\*\*Anchor:\*\*\s*`([A-Za-z0-9_-]{11})`\s*"
    r"(\d\d:\d\d:\d\d\.\d\d\d)\s*(?:→|-{1,2}>)\s*(\d\d:\d\d:\d\d\.\d\d\d)"
    r".*?confidence:\s*(\w+)"
)
_QUOTE = re.compile(r'\*\*Quote:\*\*\s*"(.+)"\s*$')


def _to_seconds(ts: str) -> int:
    h, m, s = ts.split(":")
    return int(h) * 3600 + int(m) * 60 + int(float(s))


def _claim_blocks(text: str):
    matches = list(_CLAIM.finditer(text))
    for i, m in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        yield m.group(1), m.group(2).strip(), text[m.end():end]


def parse_ledger(ledger_path: str) -> list[dict]:
    text = Path(ledger_path).read_text(encoding="utf-8")
    claims: list[dict] = []
    for number, claim_text, body in _claim_blocks(text):
        support = _SUPPORT.search(body)
        candidate = _CANDIDATE.search(body)
        chapters = [int(n) for n in re.findall(r"\d+", candidate.group(1))] if candidate else []
        anchors: list[dict] = []
        current_label = ""
        pending: dict | None = None
        for line in body.splitlines():
            sb = _SOURCE_BULLET.match(line)
            if sb:
                inner = sb.group(1)
                current_label = inner.split("|", 1)[1].strip() if "|" in inner else inner.strip()
            a = _ANCHOR.search(line)
            if a:
                pending = {
                    "video_id": a.group(1),
                    "start": a.group(2),
                    "end": a.group(3),
                    "start_seconds": _to_seconds(a.group(2)),
                    "confidence": a.group(4).lower(),
                    "label": current_label,
                }
                continue
            q = _QUOTE.search(line)
            if q and pending is not None:
                pending["quote"] = q.group(1)
                anchors.append(pending)
                pending = None
        if anchors:
            claims.append({
                "claim_id": f"claims#{number}",
                "text": claim_text,
                "support_level": support.group(1).lower() if support else "moderate",
                "candidate_chapters": chapters,
                "anchors": anchors,
            })
    return claims


def build_index(claims: list[dict]) -> dict:
    index: dict[str, list[dict]] = {}
    for c in claims:
        entry = {k: c[k] for k in ("claim_id", "text", "support_level", "anchors")}
        for chapter in c["candidate_chapters"]:
            index.setdefault(str(chapter), []).append(entry)
    return index


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Build website/src/evidence.json from the anchored ledger.")
    parser.add_argument("--ledger", default=str(_DEFAULT_LEDGER))
    parser.add_argument("--out", default=str(_DEFAULT_OUT))
    args = parser.parse_args(argv)

    claims = parse_ledger(args.ledger)
    index = build_index(claims)
    Path(args.out).write_text(
        json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    total = sum(len(v) for v in index.values())
    print(f"evidence.json: {len(claims)} anchored claims -> {len(index)} chapters, {total} chapter-claim rows")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

- [ ] **Step 5: Run tests — `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/99_Meta/scripts/anchor && python3 -m unittest test_build_evidence -v`** — expect all 6 pass.

- [ ] **Step 6: Commit.**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git add "99_Meta/scripts/anchor/build_evidence.py" "99_Meta/scripts/anchor/test_build_evidence.py" "99_Meta/scripts/anchor/testdata/Claims Ledger.md"
git commit -m "feat: evidence.json generator from anchored ledger (ADR-0002)"
```

---

## Task 5: Source Anchoring pass program

**Files:**
- Create: `programs/source_anchoring_pass.md`

The Lab's `programs/` directory holds agent-instruction documents (like `book_autoresearch.md`). This task authors the program that governs how an agent backfills the ledger with Source Anchors. No code, no tests — this is the procedure-of-record that Task 7 follows.

- [ ] **Step 1: Write `programs/source_anchoring_pass.md`** exactly:

```markdown
# Source Anchoring Pass

## Objective
Backfill every Claim in `claims/Claims Ledger.md` with Source Anchors — `{video_id, start, end, quote, confidence}` — so a reader (or a judge) can verify the exact moment in a source video that grounds the claim. The pass is idempotent: a supporting source that already has an `**Anchor:**` child bullet is skipped.

## Why
A bare `[[wikilink]]` points at a whole video. A Source Anchor points at the verbatim seconds. The `quote` is the evidence; the timestamp is convenience — a few seconds of drift is harmless because the quote is self-verifying (ADR-0002).

## Inputs
- `claims/Claims Ledger.md` — the canonical ledger (ADR-0001).
- `99_Meta/transcripts/raw/<video_id>.en.vtt` — word-level WebVTT per video.
- `99_Meta/transcripts/plain/<video_id>.txt` — plain transcript, for finding the real wording.
- Tool: `99_Meta/scripts/anchor/cli.py`.

## Source Anchor format (in the ledger)
Under each `- [[wikilink|label]]` supporting-source bullet, add two child bullets, indented one level:

    - [[206-kDEvo2__Ijg-from-copilot-to-colleague-joel-hron|#206 — Joel Hron, Thomson Reuters]] — existing gloss kept
      - **Anchor:** `kDEvo2__Ijg` 00:11:46.320 → 00:11:52.880 · confidence: high
      - **Quote:** "the north star has shifted from helpfulness to productive"

`confidence` is `high | medium | low`. Use a real arrow ( → ) between start and end, and ` · ` before `confidence:`. A source whose video has no transcript gets one child bullet instead, with no `**Quote:**` line:

      - **Anchor:** not available (no transcript)

## Procedure (per claim, per supporting source)
1. If the source bullet already has an `**Anchor:**` child bullet — SKIP it (idempotency).
2. Extract the video id: the 11 characters after the leading `NNN-` in the wikilink target. `cli.py` also accepts the raw wikilink target and extracts the id for you.
3. Choose a search phrase. If the source's gloss already quotes the talk, use those words. Otherwise use the wording of the claim this source supports. To find the real phrasing, open `99_Meta/transcripts/plain/<video_id>.txt`.
4. Run: `python3 99_Meta/scripts/anchor/cli.py <video_id> "<search phrase>"`.
5. Read the JSON output.
   - If `confidence` is `low`, open the plain transcript, find the actual sentence, and retry step 4 with a verbatim phrase.
   - If the JSON has an `error` key (no transcript), write `- **Anchor:** not available (no transcript)` as the only child bullet and move on.
6. Write the `**Anchor:**` and `**Quote:**` child bullets. The `quote` is the tool's returned `quote` value verbatim — never a paraphrase, never hand-typed.

## Never do
- Never invent or hand-type a timestamp. Timestamps come only from the tool.
- Never write a `quote` you did not get from the tool's output.
- Never anchor to a video the claim does not already cite.
- Never delete or rewrite an existing gloss — the Anchor is added alongside it.

## Leave a record
After a pass, append a dated log to `research_passes/` per `research_passes/README.md`: date, target, sources anchored, low-confidence or no-transcript sources left for follow-up.
```

- [ ] **Step 2: Commit.**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git add "programs/source_anchoring_pass.md"
git commit -m "docs: add Source Anchoring Pass program (ADR-0002)"
```

---

## Task 6: Update research-pass instructions so new claims are born anchored

**Files:**
- Modify: `programs/book_autoresearch.md`
- Modify: `claims/README.md`

ADR-0002 requires that the instructions which author claims emit Source Anchors, not bare links — "the pass that extracts a claim is already reading the transcript."

- [ ] **Step 1: Update `programs/book_autoresearch.md`.** It currently ends with a `## Never do` list and a `## Promotion pipeline` section. Add one bullet to `## Never do` — find:

```markdown
## Never do
- invent support
- flatten disagreement
- silently rewrite raw source meaning
- promote weak observations into strong claims without caveats
```

and replace it with:

```markdown
## Never do
- invent support
- flatten disagreement
- silently rewrite raw source meaning
- promote weak observations into strong claims without caveats
- cite a whole video when the grounding moment is known — use a Source Anchor
```

- [ ] **Step 2: Append a `## Source Anchors` section to `programs/book_autoresearch.md`.** After the final line (`observation -> verified claim -> evidence pack -> chapter argument -> prose draft`), append:

```markdown

## Source Anchors
Every supporting source on a promoted claim is a Source Anchor — `{video_id, start, end, quote, confidence}` — not a bare video link. A pass that extracts a claim is already reading the transcript, so it records the verbatim quote and its timestamps at promotion time (ADR-0002). The anchoring procedure, the ledger format, and the `99_Meta/scripts/anchor/cli.py` tool are documented in `programs/source_anchoring_pass.md`.
```

- [ ] **Step 3: Update `claims/README.md`.** Find the line:

```markdown
- supporting sources
```

and replace it with:

```markdown
- supporting sources — as Source Anchors (video id + start/end timestamp + verbatim quote + confidence); see `programs/source_anchoring_pass.md`
```

- [ ] **Step 4: Commit.**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git add "programs/book_autoresearch.md" "claims/README.md"
git commit -m "docs: research passes emit Source Anchors for new claims (ADR-0002)"
```

---

## Task 7: Backfill the canonical ledger with Source Anchors

**Files:**
- Modify: `claims/Claims Ledger.md`
- Create: a dated log under `research_passes/`

This is the anchoring pass *operation* — an LLM judgment task, not a code task. It is bounded: `claims/Claims Ledger.md` has 19 claims (`## 1)` … `## 19)`), each with 2–4 supporting sources. Follow `programs/source_anchoring_pass.md` (Task 5) for every supporting source of every claim.

> **For the executor (subagent-driven-development controller):** this task may be split across batches of ~5 claims, one subagent per batch, committing per batch. Each claim's ledger edit is independent. Process claims in numeric order.

- [ ] **Step 1: For each claim 1–19, for each supporting source, apply the anchoring procedure.** For one source bullet:
  1. If it already has an `**Anchor:**` child bullet — skip.
  2. Extract the video id from the wikilink target (`cli.py` also accepts the raw target).
  3. Pick a search phrase — prefer a phrase already quoted in the source's gloss; otherwise read `99_Meta/transcripts/plain/<video_id>.txt` to find the wording that grounds the claim.
  4. Run `python3 99_Meta/scripts/anchor/cli.py <video_id> "<search phrase>"` from the repo root.
  5. If `confidence` is `low`, retry with a better verbatim phrase from the plain transcript. If the output has an `error` key, write `- **Anchor:** not available (no transcript)` as the only child bullet.
  6. Add the `**Anchor:**` and `**Quote:**` child bullets under the source bullet, in the canonical format (see the **Source Anchor ledger format** section of this plan). Keep the existing gloss text.

- [ ] **Step 2: Verify the ledger still parses.** Run from the repo root:

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
python3 "99_Meta/scripts/anchor/build_evidence.py" --out /tmp/m2_evidence_check.json
```

Expect a line like `evidence.json: <N> anchored claims -> <M> chapters, <K> chapter-claim rows` with `N > 0`. If it reports 0 anchored claims, the anchor child bullets do not match the canonical format — fix the ledger formatting, do not loosen `build_evidence.py`.

- [ ] **Step 3: Spot-check one anchor against its tool output.** Pick any anchored source. Re-run `cli.py` with that anchor's `**Quote:**` text as the search phrase and confirm the tool returns the same `start`/`end` and `high` confidence:

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
python3 "99_Meta/scripts/anchor/cli.py" <video_id> "<the quote text>"
```

- [ ] **Step 4: Confirm idempotency.** Re-read the ledger: every supporting-source bullet across all 19 claims must now have exactly one `**Anchor:**` child bullet (either a real anchor or `not available (no transcript)`). A re-run of the pass would skip every source and change nothing.

- [ ] **Step 5: Write the pass log.** Create `research_passes/2026-05-22-source-anchoring-pass.md`:

```markdown
# 2026-05-22 — Source Anchoring Pass

- **date:** 2026-05-22
- **target:** all 19 claims in `claims/Claims Ledger.md`
- **pass type:** source anchoring backfill (ADR-0002)

## Inputs used
- `claims/Claims Ledger.md`
- `99_Meta/transcripts/raw/*.en.vtt`, `99_Meta/transcripts/plain/*.txt`
- `99_Meta/scripts/anchor/cli.py`

## Outputs changed
- `claims/Claims Ledger.md` — every supporting source now carries a Source Anchor

## What improved
- Every claim's supporting sources point at verbatim, timestamped moments instead of whole videos.

## Unresolved questions
- <list any sources left at `confidence: medium`/`low` or `not available (no transcript)` for a follow-up pass>
```

Fill the "Unresolved questions" list with the actual low-confidence / no-transcript sources encountered.

- [ ] **Step 6: Commit.**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git add "claims/Claims Ledger.md" "research_passes/2026-05-22-source-anchoring-pass.md"
git commit -m "feat: backfill Claims Ledger with Source Anchors (ADR-0002)"
```

---

## Task 8: Generate `website/src/evidence.json` + enable JSON imports

**Files:**
- Modify: `website/tsconfig.json`
- Create: `website/src/evidence.json`

- [ ] **Step 1: Enable JSON module resolution.** In `website/tsconfig.json`, the `compilerOptions` object currently ends with `"noEmit": true`. Add `"resolveJsonModule": true` — change:

```json
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
```

to:

```json
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "noEmit": true
  }
```

- [ ] **Step 2: Generate `evidence.json` from the real anchored ledger.** Run:

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
python3 "99_Meta/scripts/anchor/build_evidence.py"
```

This writes `website/src/evidence.json`. Expect the printed summary to show a non-zero anchored-claim count.

- [ ] **Step 3: Sanity-check the output.** Run:

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
python3 -c "import json; d=json.load(open('website/src/evidence.json')); print('chapters:', sorted(d, key=int)); print('claim rows:', sum(len(v) for v in d.values()))"
```

Expect chapter-number keys (e.g. `['1', '3', '4', ...]`) and a non-zero claim-row count.

- [ ] **Step 4: Commit.**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git add "website/tsconfig.json" "website/src/evidence.json"
git commit -m "feat: generate website evidence.json from anchored ledger (ADR-0002)"
```

---

## Task 9: `EvidenceRail` website component

**Files:**
- Create: `website/src/EvidenceRail.tsx`

A React component that, given a chapter number, renders the chapter's anchored claims. Each anchor shows a click-to-load YouTube embed deep-linked to `start`, the verbatim quote, and a confidence chip. Low-confidence anchors are labelled "loosely sourced" per `EDITORIAL_METHOD.md`. The component renders nothing when a chapter has no anchored claims, so the website builds even if `evidence.json` is `{}`.

- [ ] **Step 1: Create `website/src/EvidenceRail.tsx`** exactly:

```tsx
import { useState } from 'react';
import evidenceData from './evidence.json';

type Anchor = {
  video_id: string;
  start: string;
  end: string;
  start_seconds: number;
  quote: string;
  confidence: string;
  label: string;
};

type EvidenceClaim = {
  claim_id: string;
  text: string;
  support_level: string;
  anchors: Anchor[];
};

const evidence = evidenceData as Record<string, EvidenceClaim[]>;

const AnchorCard = ({ anchor }: { anchor: Anchor }) => {
  const [playing, setPlaying] = useState(false);
  const loose = anchor.confidence === 'low';

  return (
    <li className="border border-[var(--color-border)] bg-white">
      <div className="aspect-video bg-black/5">
        {playing ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${anchor.video_id}?start=${anchor.start_seconds}&autoplay=1`}
            title={anchor.label}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative block h-full w-full"
            aria-label={`Play ${anchor.label} from ${anchor.start}`}
          >
            <img
              src={`https://img.youtube.com/vi/${anchor.video_id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
              <span className="rounded-full bg-[var(--color-paper)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                &#9654; {anchor.start}
              </span>
            </span>
          </button>
        )}
      </div>
      <blockquote className="border-t border-[var(--color-border)] px-4 py-3 font-serif text-sm italic leading-[1.5]">
        &ldquo;{anchor.quote}&rdquo;
      </blockquote>
      <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        <span className="truncate">{anchor.label}</span>
        <span className={loose ? 'shrink-0 text-amber-700' : 'shrink-0'}>
          {loose ? 'loosely sourced' : `confidence: ${anchor.confidence}`}
        </span>
      </div>
    </li>
  );
};

export const EvidenceRail = ({ chapterNumber }: { chapterNumber: string }) => {
  const claims = evidence[String(parseInt(chapterNumber, 10))] ?? [];
  if (claims.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t-2 border-[var(--color-ink)] pt-8">
      <h2 className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
        Evidence &mdash; Source Anchors
      </h2>
      <div className="space-y-10">
        {claims.map((claim) => (
          <div key={claim.claim_id}>
            <p className="mb-4 font-serif text-base leading-[1.45]">{claim.text}</p>
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
              {claim.anchors.map((anchor, index) => (
                <AnchorCard key={`${claim.claim_id}-${index}`} anchor={anchor} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Typecheck — `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/website && npm run lint`** — expect `tsc --noEmit` to pass with no errors. (`evidence.json` exists from Task 8, and `resolveJsonModule` is enabled.)

- [ ] **Step 3: Commit.**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git add "website/src/EvidenceRail.tsx"
git commit -m "feat: EvidenceRail component for chapter source anchors (ADR-0002)"
```

---

## Task 10: Wire `EvidenceRail` into the chapter reader

**Files:**
- Modify: `website/src/App.tsx`

`App.tsx` renders each chapter through `ChapterArticle`. We add the evidence rail at the end of each chapter's `<article>`.

- [ ] **Step 1: Add the import.** In `website/src/App.tsx`, find:

```tsx
import { type BookChapter, chapters } from './bookChapters';
import { DynamicVisuals } from './DynamicVisuals';
```

and replace it with:

```tsx
import { type BookChapter, chapters } from './bookChapters';
import { DynamicVisuals } from './DynamicVisuals';
import { EvidenceRail } from './EvidenceRail';
```

- [ ] **Step 2: Render the rail inside `ChapterArticle`.** In the `ChapterArticle` component, find the end of the `<article>` body:

```tsx
      {blocks.map((block, index) => (
        <React.Fragment key={`${chapter.number}-${index}`}>
          <MarkdownBlock block={block} />
          {block.startsWith('## ') && headingFigureIndex < figures.length ? (
            <InlineIllustration
              figure={figures[headingFigureIndex]}
              label={`Figure ${chapter.number}.${headingFigureIndex + 1}`}
              compact={false}
            />
          ) : null}
          {block.startsWith('## ') ? void (headingFigureIndex += 1) : null}
        </React.Fragment>
      ))}
    </article>
```

and replace it with:

```tsx
      {blocks.map((block, index) => (
        <React.Fragment key={`${chapter.number}-${index}`}>
          <MarkdownBlock block={block} />
          {block.startsWith('## ') && headingFigureIndex < figures.length ? (
            <InlineIllustration
              figure={figures[headingFigureIndex]}
              label={`Figure ${chapter.number}.${headingFigureIndex + 1}`}
              compact={false}
            />
          ) : null}
          {block.startsWith('## ') ? void (headingFigureIndex += 1) : null}
        </React.Fragment>
      ))}
      <EvidenceRail chapterNumber={chapter.number} />
    </article>
```

- [ ] **Step 2: Typecheck — `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/website && npm run lint`** — expect `tsc --noEmit` to pass.

- [ ] **Step 3: Build — `cd /Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/website && npm run build`** — expect `vite build` to succeed and emit `dist/`.

- [ ] **Step 4: Commit.**

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
git add "website/src/App.tsx"
git commit -m "feat: render EvidenceRail under each chapter (ADR-0002)"
```

---

## Task 11: End-to-end verification

**Files:** none modified — verification only.

- [ ] **Step 1: Full Python test suite.** Run:

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/99_Meta/scripts/anchor"
python3 -m unittest -v
```

Expect every test across `test_vtt`, `test_locate`, `test_cli`, `test_build_evidence` to pass (25 tests).

- [ ] **Step 2: Real-corpus tool smoke test.** Anchor a known quote against a real transcript — claim 1 cites video `kDEvo2__Ijg` (`#206 — Joel Hron`):

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
python3 "99_Meta/scripts/anchor/cli.py" kDEvo2__Ijg "from helpfulness to productive"
```

Expect JSON with a `start`, `end`, a verbatim `quote`, and a `confidence`. (If `kDEvo2__Ijg.en.vtt` is absent, pick any video id present in `99_Meta/transcripts/raw/` and a phrase from its `plain/` transcript.)

- [ ] **Step 3: Regenerate and diff `evidence.json`.** Confirm the committed `website/src/evidence.json` is up to date with the ledger:

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book"
python3 "99_Meta/scripts/anchor/build_evidence.py"
git diff --exit-code "website/src/evidence.json"
```

Expect no diff (exit 0). If there is a diff, the file was stale — commit the regenerated version with `chore: refresh evidence.json`.

- [ ] **Step 4: Website build.** Run:

```bash
cd "/Users/timur_isachenko/Dev/LifeOS/knowledge-bases/ai-engineer-book/website"
npm run lint && npm run build
```

Expect both to pass.

- [ ] **Step 5: Visual check.** Run `npm run dev` from `website/`, open the served URL, scroll into any chapter that appears as a key in `evidence.json`, and confirm: the "Evidence — Source Anchors" rail renders, each card shows a YouTube thumbnail, clicking it loads the embed, and the quote + confidence chip display. Stop the dev server when done.

- [ ] **Step 6: No commit** (verification only). If Step 3 surfaced a stale file, that is the only commit from this task.

---

## Self-Review

**Spec coverage (ADR-0002):**
- Source Anchor = `{video_id, start, end, quote, confidence}` → ledger format section + Tasks 2, 4, 7.
- `quote` is verbatim transcript text → `locate_quote` returns the VTT's words (Task 2); program forbids paraphrase (Task 5); backfill uses tool output verbatim (Task 7).
- `start`/`end` from VTT cue timestamps of the quote's first/last words → `vtt.py` word-stream + `locate.py` window endpoints (Tasks 1, 2).
- `confidence` flags shaky matches, surfaces as "loosely sourced" → `_confidence` thresholds (Task 2); "loosely sourced" label (Task 9).
- Dedicated, idempotent anchoring pass that backfills existing claims → `programs/source_anchoring_pass.md` (Task 5) + backfill with skip-if-anchored (Task 7).
- Research-pass instructions updated so new claims are born anchored → Task 6 (`book_autoresearch.md`, `claims/README.md`).
- book-mash does NOT produce anchors → no book-mash changes; called out in "Out of scope".
- Website chapter-level evidence rail: claims with quote + YouTube embed deep-linked to `start` → Tasks 8, 9, 10.
- Inline passage-level anchors ("Later") → explicitly out of scope.
- book-mash consuming `quote` for `claim_defensibility` → explicitly out of scope (M3).

**Placeholder scan:** none — every code step shows complete code; Tasks 5–7 are content/operation with explicit text and procedures. Task 7's pass-log "Unresolved questions" is intentionally filled at execution time from real results.

**Type consistency:** `TimedWord{word, norm, timestamp}` (Task 1) is consumed by `locate_quote` (Task 2, reads `.norm`, `.word`, `.timestamp`) and re-exported via `vtt` import. `Anchor{video_id, start, end, quote, confidence}` (Task 2) is serialized by `cli.py` via `asdict` (Task 3). `build_evidence.py` emits anchor dicts `{video_id, start, end, start_seconds, confidence, label, quote}` (Task 4) — exactly the `Anchor` TS type in `EvidenceRail.tsx` (Task 9). `EvidenceClaim{claim_id, text, support_level, anchors}` (Task 9) matches `build_index`'s entry shape (Task 4, asserted by `test_entry_shape`). `EvidenceRail` prop `chapterNumber: string` receives `chapter.number` (`'01'`…`'10'` strings from `bookChapters.ts`) and normalizes via `parseInt` to match `evidence.json`'s integer-string keys.

**Out of scope (correctly):** book-mash engine changes; inline passage-level website anchors; any new third-party Python dependency (stdlib + `unittest` only).
