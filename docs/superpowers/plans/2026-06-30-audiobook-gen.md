# Audiobook Generation Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-command Python pipeline that turns the AI Engineering Book markdown into AI-narrated audio — both ACX/Audible marketplace-grade MP3s and a personal `.m4b` with chapter markers.

**Architecture:** An 8-stage pipeline (`normalize → chunk → cost → tts → assemble → master → qa → credits → package`) where pure text/parsing modules are fully unit-tested and audio I/O (OpenAI TTS, ffmpeg) is isolated behind small functions with env-gated integration tests. A content-hash cache makes re-renders nearly free.

**Tech Stack:** Python 3.10+ (repo runs 3.14), `openai` SDK for TTS, `ffmpeg` system binary via `subprocess`, stdlib `zipfile`/`hashlib`/`argparse`, `pytest`.

## Global Constraints

- Package lives at `scripts/audiobook_gen/`; tests co-located as `test_*.py` next to source (repo convention from `99_Meta/scripts/anchor/`).
- Run tests with: `python3 -m pytest scripts/audiobook_gen/ -v`
- No heavy Python audio deps — all audio work shells out to `ffmpeg` (present at `/opt/homebrew/bin/ffmpeg`).
- OpenAI TTS: model `gpt-4o-mini-tts`, default voice `onyx`, **hard input limit 4096 chars/request** → chunk to `MAX_CHARS = 3500`.
- TTS audio requested as `response_format="wav"` (lossless) so mastering never operates on lossy input.
- `OPENAI_API_KEY` read from env; never hard-coded.
- ACX thresholds: RMS in `[-23, -18]` dB, peak `<= -3` dB, noise floor `< -60` dB, output **192kbps CBR MP3 @ 44.1kHz mono**, room tone `0.75s` head / `2.0s` tail.
- Integration tests that call OpenAI gated behind `RUN_TTS_TESTS=1`; tests that call ffmpeg gated behind `RUN_FFMPEG_TESTS=1`.
- Output dir `dist/` added to `.gitignore`.
- TDD, frequent commits, DRY, YAGNI.

---

### Task 1: Package scaffold + markdown normalizer

**Files:**
- Create: `scripts/audiobook_gen/__init__.py`
- Create: `scripts/audiobook_gen/normalize.py`
- Create: `scripts/audiobook_gen/test_normalize.py`
- Modify: `.gitignore` (add `dist/`)

**Interfaces:**
- Produces: `Chapter` dataclass (`title: str`, `text: str`); `normalize_markdown(md: str, min_words: int = 50) -> list[Chapter]`

- [ ] **Step 1: Add `dist/` to .gitignore**

Append under the "Local caches / temp" section of `.gitignore`:
```
# Audiobook render output
dist/
```

- [ ] **Step 2: Create empty package marker**

Create `scripts/audiobook_gen/__init__.py`:
```python
"""Audiobook generation pipeline for the AI Engineering Book."""
```

- [ ] **Step 3: Write the failing tests**

Create `scripts/audiobook_gen/test_normalize.py`:
```python
from audiobook_gen.normalize import normalize_markdown, Chapter


def test_splits_on_chapter_headings():
    md = (
        "# Chapter 1 — The Shift\n\n"
        + "Body one here. " * 30 + "\n\n"
        "# Chapter 2 — Taste\n\n"
        + "Body two here. " * 30 + "\n"
    )
    chapters = normalize_markdown(md)
    assert [c.title for c in chapters] == ["Chapter 1 — The Shift", "Chapter 2 — Taste"]


def test_drops_thin_draft_wrapper_chapters():
    md = (
        "# Chapter 1 Draft v1 — The Shift\n\n"
        "## Draft note\n\nstub.\n\n"
        "# Chapter 1 — The Shift\n\n"
        + "Real body sentence. " * 20 + "\n"
    )
    chapters = normalize_markdown(md)
    assert len(chapters) == 1
    assert chapters[0].title == "Chapter 1 — The Shift"


def test_strips_code_fences_and_draft_notes():
    md = (
        "# Chapter 1 — X\n\n"
        + "Real prose here. " * 20 + "\n\n"
        "```python\nprint('should not be spoken')\n```\n\n"
        "## Draft status note\n\nthis should be removed too.\n"
    )
    text = normalize_markdown(md)[0].text
    assert "should not be spoken" not in text
    assert "removed too" not in text
    assert "Real prose here." in text


def test_expands_symbols_and_strips_markdown():
    md = "# Chapter 1 — X\n\n" + ("See **bold** and `code` from A → B, e.g. this. " * 20)
    text = normalize_markdown(md)[0].text
    assert "→" not in text and " to " in text
    assert "**" not in text and "`" not in text
    assert "for example" in text
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_normalize.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'audiobook_gen.normalize'`

- [ ] **Step 5: Implement the normalizer**

Create `scripts/audiobook_gen/normalize.py`:
```python
"""Turn book markdown into speech-friendly per-chapter prose."""
from __future__ import annotations

import re
from dataclasses import dataclass

CHAPTER_RE = re.compile(r"^#\s+(Chapter\b.*)$", re.MULTILINE)
SYMBOL_EXPANSIONS = [
    ("→", " to "), ("←", " from "), ("&", " and "),
    ("%", " percent "), ("e.g.", "for example"), ("i.e.", "that is"),
    ("etc.", "and so on"), ("—", ", "), ("–", ", "),
]


@dataclass
class Chapter:
    title: str
    text: str


def _strip_code_fences(md: str) -> str:
    return re.sub(r"```.*?```", " ", md, flags=re.DOTALL)


def _strip_draft_sections(md: str) -> str:
    # Remove a '## Draft note' / '## Draft status note' block up to the next heading.
    pattern = re.compile(
        r"^##\s+Draft(?:\s+status)?\s+note\b.*?(?=^#{1,2}\s|\Z)",
        re.MULTILINE | re.DOTALL | re.IGNORECASE,
    )
    return pattern.sub("", md)


def _clean_title(raw: str) -> str:
    # "Chapter 1 Draft v1 — The Shift" -> "Chapter 1 — The Shift"
    return re.sub(r"\s+Draft\s+v\d+\b", "", raw).strip()


def _to_spoken(body: str) -> str:
    text = body
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", text)          # images
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)        # links -> label
    text = re.sub(r"^\s*\|.*$", " ", text, flags=re.MULTILINE)  # table rows
    text = re.sub(r"\[\^[^\]]*\]", " ", text)                   # footnote refs
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)  # subheadings -> prose
    text = re.sub(r"^\s*>\s?", "", text, flags=re.MULTILINE)    # blockquotes
    text = text.replace("**", "").replace("__", "").replace("`", "")
    text = re.sub(r"(?<!\w)[*_](\S)", r"\1", text)              # leftover emphasis
    for src, dst in SYMBOL_EXPANSIONS:
        text = text.replace(src, dst)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def normalize_markdown(md: str, min_words: int = 50) -> list[Chapter]:
    md = _strip_code_fences(md)
    md = _strip_draft_sections(md)

    matches = list(CHAPTER_RE.finditer(md))
    chapters: list[Chapter] = []
    for i, m in enumerate(matches):
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(md)
        body = md[start:end]
        spoken = _to_spoken(body)
        if len(spoken.split()) < min_words:
            continue  # drop thin draft-wrapper headings
        chapters.append(Chapter(title=_clean_title(m.group(1)), text=spoken))
    return chapters
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_normalize.py -v`
Expected: PASS (4 passed)

- [ ] **Step 7: Commit**

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book
git add .gitignore scripts/audiobook_gen/__init__.py scripts/audiobook_gen/normalize.py scripts/audiobook_gen/test_normalize.py
git commit -m "feat(audiobook): markdown normalizer + package scaffold"
```

---

### Task 2: Sentence-aware chunker

**Files:**
- Create: `scripts/audiobook_gen/chunk.py`
- Create: `scripts/audiobook_gen/test_chunk.py`

**Interfaces:**
- Consumes: chapter `text: str` from Task 1.
- Produces: `chunk_text(text: str, max_chars: int = 3500) -> list[str]`

- [ ] **Step 1: Write the failing tests**

Create `scripts/audiobook_gen/test_chunk.py`:
```python
from audiobook_gen.chunk import chunk_text, MAX_CHARS


def test_short_text_is_single_chunk():
    assert chunk_text("One sentence. Two sentence.") == ["One sentence. Two sentence."]


def test_never_exceeds_limit():
    text = ("This is a sentence about agents and evals. " * 400).strip()
    chunks = chunk_text(text, max_chars=500)
    assert chunks  # non-empty
    assert all(len(c) <= 500 for c in chunks)
    # no words are lost or duplicated across the split
    assert "".join(chunks).replace(" ", "") == text.replace(" ", "")


def test_splits_on_sentence_boundaries():
    text = "Alpha one. Beta two. Gamma three."
    chunks = chunk_text(text, max_chars=15)
    # every chunk should end with a period (sentence boundary), none mid-word
    assert all(c.strip().endswith(".") for c in chunks)


def test_hard_splits_oversized_single_sentence():
    text = "word " * 300  # one 'sentence' with no terminator, > limit
    chunks = chunk_text(text.strip(), max_chars=100)
    assert all(len(c) <= 100 for c in chunks)


def test_default_limit_constant():
    assert MAX_CHARS == 3500
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_chunk.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'audiobook_gen.chunk'`

- [ ] **Step 3: Implement the chunker**

Create `scripts/audiobook_gen/chunk.py`:
```python
"""Split chapter prose into TTS-sized chunks on sentence boundaries."""
from __future__ import annotations

import re

MAX_CHARS = 3500
_SENTENCE_RE = re.compile(r"\S.*?(?:[.!?](?=\s|$)|\n\n|$)", re.DOTALL)


def _hard_split(sentence: str, max_chars: int) -> list[str]:
    words = sentence.split()
    out, cur = [], ""
    for w in words:
        candidate = f"{cur} {w}".strip()
        if len(candidate) > max_chars and cur:
            out.append(cur)
            cur = w
        else:
            cur = candidate
    if cur:
        out.append(cur)
    return out


def chunk_text(text: str, max_chars: int = MAX_CHARS) -> list[str]:
    sentences = [s.strip() for s in _SENTENCE_RE.findall(text) if s.strip()]
    chunks: list[str] = []
    cur = ""
    for s in sentences:
        if len(s) > max_chars:
            if cur:
                chunks.append(cur)
                cur = ""
            chunks.extend(_hard_split(s, max_chars))
            continue
        candidate = f"{cur} {s}".strip()
        if len(candidate) > max_chars and cur:
            chunks.append(cur)
            cur = s
        else:
            cur = candidate
    if cur:
        chunks.append(cur)
    return chunks
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_chunk.py -v`
Expected: PASS (5 passed)

- [ ] **Step 5: Commit**

```bash
git add scripts/audiobook_gen/chunk.py scripts/audiobook_gen/test_chunk.py
git commit -m "feat(audiobook): sentence-aware chunker"
```

---

### Task 3: Cost estimator + render plan

**Files:**
- Create: `scripts/audiobook_gen/cost.py`
- Create: `scripts/audiobook_gen/test_cost.py`

**Interfaces:**
- Consumes: `list[Chapter]` (Task 1), `chunk_text` (Task 2).
- Produces: `RenderPlan` dataclass (`chapters: int`, `chunks: int`, `chars: int`, `est_usd: float`, `lines: list[str]`); `build_plan(chapters, max_chars=3500, usd_per_million=15.0) -> RenderPlan`

- [ ] **Step 1: Write the failing tests**

Create `scripts/audiobook_gen/test_cost.py`:
```python
from audiobook_gen.normalize import Chapter
from audiobook_gen.cost import build_plan


def test_counts_chars_and_chunks():
    chapters = [Chapter("Chapter 1 — A", "word " * 800), Chapter("Chapter 2 — B", "word " * 200)]
    plan = build_plan(chapters, max_chars=3500)
    assert plan.chapters == 2
    assert plan.chars == 5000
    assert plan.chunks == 3  # 4000 chars -> 2 chunks, 1000 chars -> 1 chunk


def test_cost_estimate_uses_rate():
    chapters = [Chapter("Chapter 1 — A", "z" * 1_000_000)]
    plan = build_plan(chapters, usd_per_million=15.0)
    assert round(plan.est_usd, 2) == 15.0


def test_plan_lines_are_human_readable():
    plan = build_plan([Chapter("Chapter 1 — A", "word " * 100)])
    assert any("Chapter 1 — A" in line for line in plan.lines)
    assert any("Estimated cost" in line for line in plan.lines)
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_cost.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'audiobook_gen.cost'`

- [ ] **Step 3: Implement the estimator**

Create `scripts/audiobook_gen/cost.py`:
```python
"""Pre-flight cost + render-plan estimation (no API calls)."""
from __future__ import annotations

from dataclasses import dataclass

from audiobook_gen.chunk import MAX_CHARS, chunk_text
from audiobook_gen.normalize import Chapter


@dataclass
class RenderPlan:
    chapters: int
    chunks: int
    chars: int
    est_usd: float
    lines: list[str]


def build_plan(
    chapters: list[Chapter],
    max_chars: int = MAX_CHARS,
    usd_per_million: float = 15.0,
) -> RenderPlan:
    total_chars = 0
    total_chunks = 0
    lines: list[str] = []
    for ch in chapters:
        n_chunks = len(chunk_text(ch.text, max_chars=max_chars))
        total_chars += len(ch.text)
        total_chunks += n_chunks
        lines.append(f"  {ch.title}: {len(ch.text):>7,} chars, {n_chunks} chunk(s)")
    est = total_chars / 1_000_000 * usd_per_million
    lines.append("")
    lines.append(f"Chapters: {len(chapters)} | Chunks: {total_chunks} | Chars: {total_chars:,}")
    lines.append(f"Estimated cost: ${est:.2f} (at ${usd_per_million:.0f}/1M chars)")
    return RenderPlan(len(chapters), total_chunks, total_chars, est, lines)
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_cost.py -v`
Expected: PASS (3 passed)

- [ ] **Step 5: Commit**

```bash
git add scripts/audiobook_gen/cost.py scripts/audiobook_gen/test_cost.py
git commit -m "feat(audiobook): cost estimator and render plan"
```

---

### Task 4: TTS client with content-hash cache

**Files:**
- Create: `scripts/audiobook_gen/tts.py`
- Create: `scripts/audiobook_gen/test_tts.py`

**Interfaces:**
- Produces:
  - `cache_key(text, voice, instructions, model) -> str`
  - `synthesize(text, voice, cache_dir, *, instructions=DEFAULT_INSTRUCTIONS, model="gpt-4o-mini-tts", client=None) -> Path`
  - `DEFAULT_INSTRUCTIONS: str`, `DEFAULT_VOICE = "onyx"`, `DEFAULT_MODEL = "gpt-4o-mini-tts"`
- The `client` param accepts any object exposing `audio.speech.create(...)` returning an object with `.write_to_file(path)`; injected for tests.

- [ ] **Step 1: Write the failing tests**

Create `scripts/audiobook_gen/test_tts.py`:
```python
from pathlib import Path

from audiobook_gen.tts import cache_key, synthesize, DEFAULT_VOICE


class _FakeResponse:
    def __init__(self, payload: bytes):
        self._payload = payload

    def write_to_file(self, path):
        Path(path).write_bytes(self._payload)


class _FakeSpeech:
    def __init__(self, counter):
        self._counter = counter

    def create(self, **kwargs):
        self._counter["calls"] += 1
        return _FakeResponse(b"RIFFfakewav")


class _FakeClient:
    def __init__(self):
        self.calls = {"calls": 0}
        self.audio = type("A", (), {"speech": _FakeSpeech(self.calls)})()


def test_cache_key_is_stable_and_content_sensitive():
    a = cache_key("hello", "onyx", "calm", "gpt-4o-mini-tts")
    b = cache_key("hello", "onyx", "calm", "gpt-4o-mini-tts")
    c = cache_key("hello", "sage", "calm", "gpt-4o-mini-tts")
    assert a == b and a != c


def test_synthesize_writes_file_and_caches(tmp_path):
    client = _FakeClient()
    out1 = synthesize("hello world", DEFAULT_VOICE, tmp_path, client=client)
    assert out1.exists() and out1.suffix == ".wav"
    assert client.calls["calls"] == 1

    out2 = synthesize("hello world", DEFAULT_VOICE, tmp_path, client=client)
    assert out2 == out1
    assert client.calls["calls"] == 1  # cache hit, no second API call
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_tts.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'audiobook_gen.tts'`

- [ ] **Step 3: Implement the TTS client**

Create `scripts/audiobook_gen/tts.py`:
```python
"""OpenAI TTS with a content-hash cache so re-renders are near-free."""
from __future__ import annotations

import hashlib
import time
from pathlib import Path

DEFAULT_MODEL = "gpt-4o-mini-tts"
DEFAULT_VOICE = "onyx"
DEFAULT_INSTRUCTIONS = (
    "Read in a calm, measured, warm audiobook-narrator voice. "
    "Natural pacing, clear diction, no rushing."
)


def cache_key(text: str, voice: str, instructions: str, model: str) -> str:
    h = hashlib.sha256()
    h.update("\x1f".join([model, voice, instructions, text]).encode("utf-8"))
    return h.hexdigest()


def _make_client():
    from openai import OpenAI  # imported lazily so tests need no SDK/key
    return OpenAI()


def synthesize(
    text: str,
    voice: str,
    cache_dir: Path,
    *,
    instructions: str = DEFAULT_INSTRUCTIONS,
    model: str = DEFAULT_MODEL,
    client=None,
    max_retries: int = 4,
) -> Path:
    cache_dir = Path(cache_dir)
    cache_dir.mkdir(parents=True, exist_ok=True)
    out = cache_dir / f"{cache_key(text, voice, instructions, model)}.wav"
    if out.exists() and out.stat().st_size > 0:
        return out

    client = client or _make_client()
    last_err = None
    for attempt in range(max_retries):
        try:
            resp = client.audio.speech.create(
                model=model,
                voice=voice,
                input=text,
                instructions=instructions,
                response_format="wav",
            )
            resp.write_to_file(str(out))
            return out
        except Exception as err:  # noqa: BLE001 - retry transient API failures
            last_err = err
            time.sleep(2 ** attempt)
    raise RuntimeError(f"TTS failed after {max_retries} attempts: {last_err}")
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_tts.py -v`
Expected: PASS (2 passed)

- [ ] **Step 5: Commit**

```bash
git add scripts/audiobook_gen/tts.py scripts/audiobook_gen/test_tts.py
git commit -m "feat(audiobook): OpenAI TTS client with content-hash cache"
```

---

### Task 5: ffmpeg helpers — silence, concat, masters, command builders

**Files:**
- Create: `scripts/audiobook_gen/ffmpeg_ops.py`
- Create: `scripts/audiobook_gen/test_ffmpeg_ops.py`

**Interfaces:**
- Produces (pure command builders — unit tested):
  - `concat_list_content(paths: list[Path]) -> str`
  - `loudnorm_cmd(src: Path, dst: Path) -> list[str]`
  - `mp3_cmd(src: Path, dst: Path) -> list[str]`
  - `silence_cmd(dst: Path, seconds: float) -> list[str]`
- Produces (runners — integration tested, gated by `RUN_FFMPEG_TESTS`):
  - `ensure_ffmpeg() -> None` (raises if missing)
  - `run(cmd: list[str]) -> None`
  - `make_silence(dst: Path, seconds: float) -> Path`
  - `concat_wavs(paths: list[Path], dst: Path, work_dir: Path) -> Path`

- [ ] **Step 1: Write the failing tests**

Create `scripts/audiobook_gen/test_ffmpeg_ops.py`:
```python
import os
import shutil
from pathlib import Path

import pytest

from audiobook_gen.ffmpeg_ops import (
    concat_list_content, loudnorm_cmd, mp3_cmd, silence_cmd,
    ensure_ffmpeg, make_silence, concat_wavs,
)

FFMPEG = os.environ.get("RUN_FFMPEG_TESTS") == "1"


def test_concat_list_content_quotes_paths():
    content = concat_list_content([Path("/a/one.wav"), Path("/a/two.wav")])
    assert content.splitlines() == ["file '/a/one.wav'", "file '/a/two.wav'"]


def test_loudnorm_cmd_targets_acx():
    cmd = loudnorm_cmd(Path("in.wav"), Path("out.wav"))
    joined = " ".join(cmd)
    assert "loudnorm=I=-20:TP=-3:LRA=11" in joined
    assert "-ar 44100" in joined and "-ac 1" in joined


def test_mp3_cmd_is_192k_cbr():
    cmd = mp3_cmd(Path("in.wav"), Path("out.mp3"))
    joined = " ".join(cmd)
    assert "-b:a 192k" in joined and "libmp3lame" in joined
    assert "-ar 44100" in joined


def test_silence_cmd_has_duration():
    cmd = silence_cmd(Path("s.wav"), 0.75)
    assert "anullsrc=r=44100:cl=mono" in " ".join(cmd)
    assert "0.75" in " ".join(cmd)


@pytest.mark.skipif(not FFMPEG, reason="set RUN_FFMPEG_TESTS=1")
def test_make_silence_and_concat(tmp_path):
    ensure_ffmpeg()
    a = make_silence(tmp_path / "a.wav", 0.3)
    b = make_silence(tmp_path / "b.wav", 0.3)
    out = concat_wavs([a, b], tmp_path / "out.wav", tmp_path)
    assert out.exists() and out.stat().st_size > 0
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_ffmpeg_ops.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'audiobook_gen.ffmpeg_ops'`

- [ ] **Step 3: Implement ffmpeg ops**

Create `scripts/audiobook_gen/ffmpeg_ops.py`:
```python
"""Thin, testable wrappers around the ffmpeg CLI."""
from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

SR = "44100"


def ensure_ffmpeg() -> None:
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg not found on PATH. Install it (e.g. `brew install ffmpeg`).")


def run(cmd: list[str]) -> None:
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(f"ffmpeg failed: {' '.join(cmd)}\n{proc.stderr[-2000:]}")


def concat_list_content(paths: list[Path]) -> str:
    return "\n".join(f"file '{Path(p).as_posix()}'" for p in paths)


def silence_cmd(dst: Path, seconds: float) -> list[str]:
    return [
        "ffmpeg", "-y", "-f", "lavfi",
        "-i", f"anullsrc=r={SR}:cl=mono",
        "-t", str(seconds), "-ar", SR, "-ac", "1", str(dst),
    ]


def loudnorm_cmd(src: Path, dst: Path) -> list[str]:
    return [
        "ffmpeg", "-y", "-i", str(src),
        "-af", "loudnorm=I=-20:TP=-3:LRA=11",
        "-ar", SR, "-ac", "1", str(dst),
    ]


def mp3_cmd(src: Path, dst: Path) -> list[str]:
    return [
        "ffmpeg", "-y", "-i", str(src),
        "-c:a", "libmp3lame", "-b:a", "192k",
        "-ar", SR, "-ac", "1", str(dst),
    ]


def make_silence(dst: Path, seconds: float) -> Path:
    run(silence_cmd(dst, seconds))
    return dst


def concat_wavs(paths: list[Path], dst: Path, work_dir: Path) -> Path:
    list_file = Path(work_dir) / "concat.txt"
    list_file.write_text(concat_list_content(paths), encoding="utf-8")
    run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", str(list_file), "-ar", SR, "-ac", "1", str(dst),
    ])
    return dst
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_ffmpeg_ops.py -v`
Expected: PASS (4 passed, 1 skipped). With ffmpeg installed: `RUN_FFMPEG_TESTS=1 python3 -m pytest audiobook_gen/test_ffmpeg_ops.py -v` → 5 passed.

- [ ] **Step 5: Commit**

```bash
git add scripts/audiobook_gen/ffmpeg_ops.py scripts/audiobook_gen/test_ffmpeg_ops.py
git commit -m "feat(audiobook): ffmpeg command builders and runners"
```

---

### Task 6: Chapter assembler (chunks → mastered per-chapter WAV + MP3)

**Files:**
- Create: `scripts/audiobook_gen/assemble.py`
- Create: `scripts/audiobook_gen/test_assemble.py`

**Interfaces:**
- Consumes: `synthesize` (Task 4), `make_silence`/`concat_wavs`/`loudnorm_cmd`/`mp3_cmd`/`run` (Task 5).
- Produces:
  - `assembly_sequence(chunk_paths, head, gap, tail) -> list[Path]` (pure ordering: head + chunk/gap interleave + tail)
  - `render_chapter(text, *, voice, cache_dir, work_dir, out_wav, out_mp3, client=None) -> tuple[Path, Path]` (integration, gated)

- [ ] **Step 1: Write the failing tests**

Create `scripts/audiobook_gen/test_assemble.py`:
```python
from pathlib import Path

from audiobook_gen.assemble import assembly_sequence


def test_assembly_sequence_wraps_with_room_tone_and_gaps():
    head = Path("head.wav")
    gap = Path("gap.wav")
    tail = Path("tail.wav")
    chunks = [Path("c0.wav"), Path("c1.wav")]
    seq = assembly_sequence(chunks, head, gap, tail)
    assert seq == [head, Path("c0.wav"), gap, Path("c1.wav"), tail]


def test_assembly_sequence_single_chunk_has_no_gap():
    head, gap, tail = Path("h.wav"), Path("g.wav"), Path("t.wav")
    seq = assembly_sequence([Path("c0.wav")], head, gap, tail)
    assert seq == [head, Path("c0.wav"), tail]
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_assemble.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'audiobook_gen.assemble'`

- [ ] **Step 3: Implement the assembler**

Create `scripts/audiobook_gen/assemble.py`:
```python
"""Assemble chunk audio into a mastered per-chapter WAV and MP3."""
from __future__ import annotations

from pathlib import Path

from audiobook_gen import ffmpeg_ops as ff
from audiobook_gen.chunk import chunk_text
from audiobook_gen.tts import DEFAULT_INSTRUCTIONS, synthesize

HEAD_SILENCE = 0.75
TAIL_SILENCE = 2.0
GAP_SILENCE = 0.6


def assembly_sequence(chunk_paths, head, gap, tail):
    seq = [head]
    for i, c in enumerate(chunk_paths):
        if i > 0:
            seq.append(gap)
        seq.append(c)
    seq.append(tail)
    return seq


def render_chapter(
    text: str,
    *,
    voice: str,
    cache_dir: Path,
    work_dir: Path,
    out_wav: Path,
    out_mp3: Path,
    instructions: str = DEFAULT_INSTRUCTIONS,
    client=None,
) -> tuple[Path, Path]:
    work_dir = Path(work_dir)
    work_dir.mkdir(parents=True, exist_ok=True)

    chunks = chunk_text(text)
    chunk_paths = [
        synthesize(c, voice, cache_dir, instructions=instructions, client=client)
        for c in chunks
    ]

    head = ff.make_silence(work_dir / "head.wav", HEAD_SILENCE)
    gap = ff.make_silence(work_dir / "gap.wav", GAP_SILENCE)
    tail = ff.make_silence(work_dir / "tail.wav", TAIL_SILENCE)

    raw = ff.concat_wavs(
        assembly_sequence(chunk_paths, head, gap, tail),
        work_dir / "raw.wav",
        work_dir,
    )
    ff.run(ff.loudnorm_cmd(raw, out_wav))
    ff.run(ff.mp3_cmd(out_wav, out_mp3))
    return out_wav, out_mp3
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_assemble.py -v`
Expected: PASS (2 passed)

- [ ] **Step 5: Commit**

```bash
git add scripts/audiobook_gen/assemble.py scripts/audiobook_gen/test_assemble.py
git commit -m "feat(audiobook): chapter assembler with room tone and mastering"
```

---

### Task 7: ACX QA analyzer

**Files:**
- Create: `scripts/audiobook_gen/qa.py`
- Create: `scripts/audiobook_gen/test_qa.py`

**Interfaces:**
- Produces:
  - `AudioMetrics` dataclass (`rms_db: float`, `peak_db: float`, `noise_db: float`)
  - `parse_astats(stderr: str) -> AudioMetrics`
  - `check_acx(m: AudioMetrics) -> list[str]` (empty = pass)
  - `astats_cmd(src: Path) -> list[str]`
  - `measure(src: Path) -> AudioMetrics` (integration, gated)
  - `write_report(results: list[tuple[str, AudioMetrics, list[str]]], dst: Path) -> Path`

- [ ] **Step 1: Write the failing tests**

Create `scripts/audiobook_gen/test_qa.py`:
```python
from pathlib import Path

from audiobook_gen.qa import parse_astats, check_acx, AudioMetrics, write_report

SAMPLE_ASTATS = """
[Parsed_astats_0 @ 0x] Overall
[Parsed_astats_0 @ 0x] RMS level dB: -20.5
[Parsed_astats_0 @ 0x] Peak level dB: -3.8
[Parsed_astats_0 @ 0x] Noise floor dB: -78.2
"""


def test_parse_astats_extracts_metrics():
    m = parse_astats(SAMPLE_ASTATS)
    assert m.rms_db == -20.5
    assert m.peak_db == -3.8
    assert m.noise_db == -78.2


def test_check_acx_passes_compliant_audio():
    assert check_acx(AudioMetrics(rms_db=-20.0, peak_db=-3.5, noise_db=-70.0)) == []


def test_check_acx_flags_loud_peak_and_rms():
    fails = check_acx(AudioMetrics(rms_db=-15.0, peak_db=-1.0, noise_db=-50.0))
    assert any("RMS" in f for f in fails)
    assert any("Peak" in f for f in fails)
    assert any("Noise" in f for f in fails)


def test_write_report_lists_pass_and_fail(tmp_path):
    results = [
        ("Chapter 1", AudioMetrics(-20.0, -3.5, -70.0), []),
        ("Chapter 2", AudioMetrics(-15.0, -1.0, -50.0), ["RMS -15.0 dB outside [-23, -18]"]),
    ]
    out = write_report(results, tmp_path / "QA-REPORT.md")
    text = out.read_text()
    assert "Chapter 1" in text and "PASS" in text
    assert "Chapter 2" in text and "FAIL" in text
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_qa.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'audiobook_gen.qa'`

- [ ] **Step 3: Implement the QA analyzer**

Create `scripts/audiobook_gen/qa.py`:
```python
"""Measure audio against ACX technical thresholds."""
from __future__ import annotations

import re
import subprocess
from dataclasses import dataclass
from pathlib import Path

RMS_MIN, RMS_MAX = -23.0, -18.0
PEAK_MAX = -3.0
NOISE_MAX = -60.0


@dataclass
class AudioMetrics:
    rms_db: float
    peak_db: float
    noise_db: float


def _grab(pattern: str, text: str) -> float:
    m = re.search(pattern + r":\s*(-?\d+(?:\.\d+)?)", text)
    if not m:
        raise ValueError(f"could not parse '{pattern}' from astats output")
    return float(m.group(1))


def parse_astats(stderr: str) -> AudioMetrics:
    return AudioMetrics(
        rms_db=_grab(r"RMS level dB", stderr),
        peak_db=_grab(r"Peak level dB", stderr),
        noise_db=_grab(r"Noise floor dB", stderr),
    )


def check_acx(m: AudioMetrics) -> list[str]:
    fails = []
    if not (RMS_MIN <= m.rms_db <= RMS_MAX):
        fails.append(f"RMS {m.rms_db} dB outside [{RMS_MIN}, {RMS_MAX}]")
    if m.peak_db > PEAK_MAX:
        fails.append(f"Peak {m.peak_db} dB exceeds {PEAK_MAX}")
    if m.noise_db > NOISE_MAX:
        fails.append(f"Noise floor {m.noise_db} dB exceeds {NOISE_MAX}")
    return fails


def astats_cmd(src: Path) -> list[str]:
    return ["ffmpeg", "-i", str(src), "-af", "astats=metadata=1", "-f", "null", "-"]


def measure(src: Path) -> AudioMetrics:
    proc = subprocess.run(astats_cmd(src), capture_output=True, text=True)
    return parse_astats(proc.stderr)


def write_report(results, dst: Path) -> Path:
    lines = ["# Audiobook QA Report (ACX thresholds)", ""]
    passed = 0
    for title, m, fails in results:
        status = "PASS" if not fails else "FAIL"
        passed += 1 if not fails else 0
        lines.append(f"## {title} — {status}")
        lines.append(f"- RMS: {m.rms_db} dB | Peak: {m.peak_db} dB | Noise: {m.noise_db} dB")
        for f in fails:
            lines.append(f"- ⚠️ {f}")
        lines.append("")
    lines.insert(1, f"\n{passed}/{len(results)} files pass.\n")
    Path(dst).write_text("\n".join(lines), encoding="utf-8")
    return Path(dst)
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_qa.py -v`
Expected: PASS (4 passed)

- [ ] **Step 5: Commit**

```bash
git add scripts/audiobook_gen/qa.py scripts/audiobook_gen/test_qa.py
git commit -m "feat(audiobook): ACX QA analyzer and report"
```

---

### Task 8: Credits text builders

**Files:**
- Create: `scripts/audiobook_gen/credits.py`
- Create: `scripts/audiobook_gen/test_credits.py`

**Interfaces:**
- Produces: `opening_text(title, author) -> str`; `closing_text(title) -> str`. (Audio for credits is produced by re-using `render_chapter` from Task 6 in the orchestrator — no new audio code here.)

- [ ] **Step 1: Write the failing tests**

Create `scripts/audiobook_gen/test_credits.py`:
```python
from audiobook_gen.credits import opening_text, closing_text


def test_opening_includes_title_author_and_ai_disclosure():
    t = opening_text("AI Engineering", "Timur Isachenko")
    assert "AI Engineering" in t
    assert "Timur Isachenko" in t
    assert "AI" in t  # AI-narration disclosure


def test_closing_thanks_listener():
    t = closing_text("AI Engineering")
    assert "AI Engineering" in t
    assert "listening" in t.lower()
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_credits.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'audiobook_gen.credits'`

- [ ] **Step 3: Implement the credits builders**

Create `scripts/audiobook_gen/credits.py`:
```python
"""Opening/closing credit narration text (ACX requires both)."""
from __future__ import annotations


def opening_text(title: str, author: str) -> str:
    return (
        f"{title}. Written by {author}. "
        "This audiobook is narrated by an AI voice."
    )


def closing_text(title: str) -> str:
    return f"This has been {title}. Thank you for listening."
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_credits.py -v`
Expected: PASS (2 passed)

- [ ] **Step 5: Commit**

```bash
git add scripts/audiobook_gen/credits.py scripts/audiobook_gen/test_credits.py
git commit -m "feat(audiobook): opening/closing credit text"
```

---

### Task 9: Packaging — marketplace zip + `.m4b` with chapter markers

**Files:**
- Create: `scripts/audiobook_gen/package.py`
- Create: `scripts/audiobook_gen/test_package.py`

**Interfaces:**
- Consumes: `ffmpeg_ops.run`/`concat_wavs` (Task 5).
- Produces:
  - `build_ffmetadata(chapters: list[tuple[str, int]]) -> str` where each tuple is `(title, duration_ms)` (pure, unit tested)
  - `zip_marketplace(files: list[Path], dst_zip: Path) -> Path` (stdlib, unit tested)
  - `build_m4b(chapter_wavs: list[tuple[str, Path]], dst_m4b: Path, work_dir: Path) -> Path` (integration, gated)

- [ ] **Step 1: Write the failing tests**

Create `scripts/audiobook_gen/test_package.py`:
```python
import zipfile
from pathlib import Path

from audiobook_gen.package import build_ffmetadata, zip_marketplace


def test_ffmetadata_has_chapter_blocks_with_cumulative_times():
    meta = build_ffmetadata([("Chapter 1", 1000), ("Chapter 2", 2000)])
    assert meta.startswith(";FFMETADATA1")
    assert "[CHAPTER]" in meta
    assert "TIMEBASE=1/1000" in meta
    # first chapter 0..1000, second 1000..3000
    assert "START=0" in meta and "END=1000" in meta
    assert "START=1000" in meta and "END=3000" in meta
    assert "title=Chapter 1" in meta and "title=Chapter 2" in meta


def test_zip_marketplace_contains_all_files(tmp_path):
    f1 = tmp_path / "Chapter-01.mp3"
    f2 = tmp_path / "Chapter-02.mp3"
    f1.write_bytes(b"a")
    f2.write_bytes(b"b")
    out = zip_marketplace([f1, f2], tmp_path / "acx-upload.zip")
    with zipfile.ZipFile(out) as z:
        assert sorted(z.namelist()) == ["Chapter-01.mp3", "Chapter-02.mp3"]
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_package.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'audiobook_gen.package'`

- [ ] **Step 3: Implement packaging**

Create `scripts/audiobook_gen/package.py`:
```python
"""Package mastered audio into a marketplace zip and a chapterized .m4b."""
from __future__ import annotations

import zipfile
from pathlib import Path

from audiobook_gen import ffmpeg_ops as ff


def build_ffmetadata(chapters: list[tuple[str, int]]) -> str:
    lines = [";FFMETADATA1"]
    start = 0
    for title, dur_ms in chapters:
        end = start + dur_ms
        lines += [
            "[CHAPTER]",
            "TIMEBASE=1/1000",
            f"START={start}",
            f"END={end}",
            f"title={title}",
        ]
        start = end
    return "\n".join(lines) + "\n"


def zip_marketplace(files: list[Path], dst_zip: Path) -> Path:
    dst_zip = Path(dst_zip)
    dst_zip.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(dst_zip, "w", zipfile.ZIP_DEFLATED) as z:
        for f in files:
            z.write(f, arcname=Path(f).name)
    return dst_zip


def _duration_ms(path: Path) -> int:
    import subprocess
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        capture_output=True, text=True,
    ).stdout.strip()
    return int(float(out) * 1000)


def build_m4b(chapter_wavs: list[tuple[str, Path]], dst_m4b: Path, work_dir: Path) -> Path:
    work_dir = Path(work_dir)
    work_dir.mkdir(parents=True, exist_ok=True)
    titles_durations = [(t, _duration_ms(p)) for t, p in chapter_wavs]

    full = ff.concat_wavs([p for _, p in chapter_wavs], work_dir / "full.wav", work_dir)
    meta = work_dir / "chapters.txt"
    meta.write_text(build_ffmetadata(titles_durations), encoding="utf-8")

    ff.run([
        "ffmpeg", "-y", "-i", str(full), "-i", str(meta),
        "-map_metadata", "1", "-c:a", "aac", "-b:a", "128k",
        str(dst_m4b),
    ])
    return Path(dst_m4b)
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_package.py -v`
Expected: PASS (2 passed)

- [ ] **Step 5: Commit**

```bash
git add scripts/audiobook_gen/package.py scripts/audiobook_gen/test_package.py
git commit -m "feat(audiobook): marketplace zip + chapterized m4b packaging"
```

---

### Task 10: CLI orchestrator + `--dry-run`

**Files:**
- Create: `scripts/audiobook_gen/__main__.py`
- Create: `scripts/audiobook_gen/test_cli.py`
- Create: `scripts/audiobook_gen/README.md`

**Interfaces:**
- Consumes: every module above.
- Produces: `build_parser() -> argparse.ArgumentParser`; `run_dry(source: Path) -> RenderPlan`; `main(argv=None) -> int`
- `slug(title) -> str` and chapter filename `Chapter-NN-<slug>.mp3` numbering.

- [ ] **Step 1: Write the failing tests**

Create `scripts/audiobook_gen/test_cli.py`:
```python
from pathlib import Path

from audiobook_gen.__main__ import build_parser, run_dry, slug


def test_parser_defaults():
    args = build_parser().parse_args(["--source", "book.md"])
    assert args.voice == "onyx"
    assert args.dry_run is False
    assert args.out == "dist/audiobook"


def test_slug_is_filesystem_safe():
    assert slug("Chapter 1 — The Shift: From Assistant") == "the-shift-from-assistant"


def test_run_dry_returns_plan(tmp_path):
    book = tmp_path / "book.md"
    book.write_text(
        "# Chapter 1 — A\n\n" + "Real prose sentence here. " * 30 + "\n\n"
        "# Chapter 2 — B\n\n" + "More prose follows along now. " * 30 + "\n",
        encoding="utf-8",
    )
    plan = run_dry(book)
    assert plan.chapters == 2
    assert plan.chunks >= 2
    assert plan.est_usd > 0
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_cli.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'audiobook_gen.__main__'`

- [ ] **Step 3: Implement the CLI orchestrator**

Create `scripts/audiobook_gen/__main__.py`:
```python
"""One-command audiobook generation. Run: python -m audiobook_gen --source <md>."""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

from audiobook_gen import ffmpeg_ops as ff
from audiobook_gen.assemble import render_chapter
from audiobook_gen.cost import build_plan
from audiobook_gen.credits import closing_text, opening_text
from audiobook_gen.normalize import normalize_markdown
from audiobook_gen.package import build_m4b, zip_marketplace
from audiobook_gen.qa import check_acx, measure, write_report
from audiobook_gen.tts import DEFAULT_VOICE


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="audiobook_gen", description="Generate an AI-narrated audiobook from markdown.")
    p.add_argument("--source", required=True, help="Path to the markdown source")
    p.add_argument("--voice", default=DEFAULT_VOICE, help="OpenAI TTS voice (default: onyx)")
    p.add_argument("--title", default="AI Engineering", help="Book title for credits/m4b")
    p.add_argument("--author", default="Timur Isachenko", help="Author name for credits")
    p.add_argument("--out", default="dist/audiobook", help="Output directory")
    p.add_argument("--cache-dir", default="dist/.tts-cache", help="TTS chunk cache directory")
    p.add_argument("--dry-run", action="store_true", help="Print cost + plan, no API/audio")
    return p


def slug(title: str) -> str:
    body = re.sub(r"^Chapter\s+\d+\s*[—–-]\s*", "", title).strip()
    body = re.sub(r"[^a-zA-Z0-9]+", "-", body).strip("-").lower()
    return body


def run_dry(source: Path):
    chapters = normalize_markdown(Path(source).read_text(encoding="utf-8"))
    return build_plan(chapters)


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    source = Path(args.source)
    if not source.exists():
        print(f"Source not found: {source}", file=sys.stderr)
        return 2

    if args.dry_run:
        plan = run_dry(source)
        print("\n".join(plan.lines))
        return 0

    ff.ensure_ffmpeg()
    chapters = normalize_markdown(source.read_text(encoding="utf-8"))
    if not chapters:
        print("No chapters parsed from source.", file=sys.stderr)
        return 2

    out = Path(args.out)
    market = out / "marketplace"
    personal = out / "personal"
    work = out / ".work"
    cache = Path(args.cache_dir)
    for d in (market, personal, work):
        d.mkdir(parents=True, exist_ok=True)

    # Build the ordered narration list: opening credits, chapters, closing credits.
    segments: list[tuple[str, str]] = [("Opening Credits", opening_text(args.title, args.author))]
    segments += [(c.title, c.text) for c in chapters]
    segments += [("Closing Credits", closing_text(args.title))]

    mp3_files: list[Path] = []
    m4b_inputs: list[tuple[str, Path]] = []
    qa_results = []

    for i, (title, text) in enumerate(segments):
        name = f"{i:02d}-{slug(title) or 'credits'}"
        out_wav = work / f"{name}.wav"
        out_mp3 = market / f"{name}.mp3"
        render_chapter(
            text, voice=args.voice, cache_dir=cache, work_dir=work / name,
            out_wav=out_wav, out_mp3=out_mp3,
        )
        mp3_files.append(out_mp3)
        m4b_inputs.append((title, out_wav))
        metrics = measure(out_mp3)
        qa_results.append((title, metrics, check_acx(metrics)))

    report = write_report(qa_results, market / "QA-REPORT.md")
    zip_marketplace(mp3_files + [report], market / "acx-upload.zip")
    build_m4b(m4b_inputs, personal / f"{slug(args.title) or 'audiobook'}.m4b", work)

    failures = sum(1 for _, _, f in qa_results if f)
    print(f"Done. {len(mp3_files)} files in {market}. QA: {len(qa_results) - failures}/{len(qa_results)} pass.")
    print(f"Personal m4b in {personal}.")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts && python3 -m pytest audiobook_gen/test_cli.py -v`
Expected: PASS (3 passed)

- [ ] **Step 5: Write the README**

Create `scripts/audiobook_gen/README.md`:
```markdown
# audiobook_gen

Generate an AI-narrated audiobook from the book markdown — ACX/Audible-grade
MP3s plus a personal `.m4b` with chapter markers.

## Requirements
- Python 3.10+
- `ffmpeg` on PATH (`brew install ffmpeg`)
- `pip install openai`
- `export OPENAI_API_KEY=...`

## Usage

```bash
cd scripts

# preview cost + chapter/chunk plan (no spend)
python3 -m audiobook_gen \
  --source "../05_Book_Ideas/Drafting Layer/AI Engineering Book - Reader Version.md" \
  --dry-run

# full render
python3 -m audiobook_gen \
  --source "../05_Book_Ideas/Drafting Layer/AI Engineering Book - Reader Version.md" \
  --voice onyx --title "AI Engineering" --author "Timur Isachenko" \
  --out ../dist/audiobook
```

Outputs:
- `dist/audiobook/marketplace/NN-*.mp3`, `acx-upload.zip`, `QA-REPORT.md`
- `dist/audiobook/personal/ai-engineering.m4b`

Re-runs reuse the per-chunk cache in `dist/.tts-cache`, so editing one chapter
only re-synthesizes changed chunks.

## Tests
```bash
python3 -m pytest audiobook_gen/ -v                 # pure unit tests
RUN_FFMPEG_TESTS=1 python3 -m pytest audiobook_gen/ # + ffmpeg integration
RUN_TTS_TESTS=1   python3 -m pytest audiobook_gen/  # + live TTS (costs money)
```
```

- [ ] **Step 6: Commit**

```bash
git add scripts/audiobook_gen/__main__.py scripts/audiobook_gen/test_cli.py scripts/audiobook_gen/README.md
git commit -m "feat(audiobook): CLI orchestrator, dry-run, and README"
```

---

### Task 11: End-to-end dry-run verification on the real book

**Files:** none (verification only)

**Interfaces:** none.

- [ ] **Step 1: Run the dry-run on the real manuscript**

Run:
```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book/scripts
python3 -m audiobook_gen \
  --source "../05_Book_Ideas/Drafting Layer/AI Engineering Book - Reader Version.md" \
  --dry-run
```
Expected: prints ~10 chapter lines, a total chunk count, ~182,000 chars, and an estimated cost near `$2–3`. Confirm the chapter count and titles look right (10 chapters, no thin "Draft vN" wrappers).

- [ ] **Step 2: Run the full unit suite**

Run: `cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book/scripts && python3 -m pytest audiobook_gen/ -v`
Expected: all unit tests pass; ffmpeg/TTS integration tests skipped.

- [ ] **Step 3: (Optional, real spend) Smoke-test a single-chapter render**

Create a one-chapter fixture and render it end-to-end to confirm audio + QA produce a compliant MP3 before committing to the full book:
```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book/scripts
printf '# Chapter 1 — Smoke Test\n\n%s\n' "$(python3 -c "print('This is a short narration smoke test. ' * 30)")" > /tmp/smoke.md
RUN_FFMPEG_TESTS=1 python3 -m audiobook_gen --source /tmp/smoke.md --out ../dist/smoke
cat ../dist/smoke/marketplace/QA-REPORT.md
```
Expected: `QA-REPORT.md` shows PASS for the chapter; `.m4b` exists in `dist/smoke/personal/`.

- [ ] **Step 4: No commit (verification task)**

This task produces no source changes. If the dry-run reveals a normalizer issue (wrong chapter count, draft wrappers leaking through), fix it in `normalize.py` under Task 1's test discipline before proceeding to a full render.

---

## Self-Review

**Spec coverage:**
- 8-stage pipeline → Tasks 1–10 (normalize=1, chunk=2, cost=3, tts=4, ffmpeg/assemble/master=5–6, qa=7, credits=8, package=9, orchestrate=10). ✓
- Content-hash cache → Task 4. ✓
- ACX thresholds (RMS/peak/noise/192k CBR/room tone) → Tasks 5 (loudnorm/mp3/silence), 6 (room tone), 7 (QA). ✓
- `--source`/`--voice`/`--dry-run` CLI → Task 10. ✓
- Marketplace zip + `.m4b` chapter markers → Task 9. ✓
- TDD with mocked API/ffmpeg + env-gated integration → every task. ✓
- `dist/` gitignored → Task 1. ✓
- Default voice `onyx`, model `gpt-4o-mini-tts` → Task 4 constants, Task 10 default. ✓

**Placeholder scan:** No TBD/TODO/"handle edge cases" — all steps carry concrete code and commands. ✓

**Type consistency:** `Chapter(title, text)` used identically in Tasks 1/3/10; `AudioMetrics(rms_db, peak_db, noise_db)` consistent in Task 7 + Task 10 (`measure`→`check_acx`); `render_chapter(...)` signature in Task 6 matches the call in Task 10; `build_ffmetadata(list[(title, ms)])` matches `build_m4b` usage; `assembly_sequence`/`concat_wavs`/`make_silence` names consistent across Tasks 5–6. ✓

**Note on response format:** `synthesize` requests `response_format="wav"`; `render_chapter` masters from those WAV chunks, so MP3 encoding (Task 6) only happens once at the end — no lossy-to-lossy chain. ✓
