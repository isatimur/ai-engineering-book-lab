# Audiobook Generation Pipeline — Design

**Date:** 2026-06-30
**Status:** Approved (pending implementation plan)
**Scope:** Turn the AI Engineering Book markdown into AI-narrated audio that is (a) marketplace-grade for ACX/Audible/Findaway and (b) personally listenable on the road.

---

## Goal

One command turns a markdown source into:

- **Marketplace output** — per-chapter MP3s compliant with ACX technical spec, plus a QA report and a packaged zip ready to upload.
- **Personal output** — a single `.m4b` audiobook with embedded chapter markers for CarPlay / phone navigation.

The book is ~28,700 words / ~182K characters across 10 chapters with clean `# Chapter N —` headings. At OpenAI TTS pricing (~$15 / 1M chars) a full render is **~$3**.

## Decisions (locked)

| Decision | Choice |
|---|---|
| Output target | Both marketplace-grade **and** personal |
| TTS engine | OpenAI `gpt-4o-mini-tts` |
| Default voice | `onyx` (deep, warm, calm narrator); configurable via `--voice` |
| Source file | Configurable at runtime via `--source <any.md>` |
| Mode | Fully automatic, one command (no interactive gate) |
| Personal format | `.m4b` with chapter markers |
| Language | Python (matches repo's pytest/book-mash tooling) |
| Audio engine | `ffmpeg` system binary via subprocess (no heavy Python audio deps) |

"Fully automatic" is reconciled with "marketplace-grade" by: the run never prompts; instead it emits `QA-REPORT.md` (PASS/FAIL per file vs ACX) and exits non-zero if any file fails. An optional `--dry-run` prints cost + chapter/chunk plan without spending.

## Architecture — 8-stage pipeline

Lives at `scripts/audiobook_gen/`, run as `python -m audiobook_gen`. Each stage is an isolated, independently testable module.

```
markdown source
  1. parse/normalize   split by "# Chapter N"; strip code fences, diagram image
                       refs, tables, "Draft note"/"Draft status note" blocks,
                       citations/footnotes; markdown -> speech-friendly prose;
                       expand symbols (-> "to", "e.g." -> "for example", etc.)
  2. chunk             split each chapter into <=3,500-char chunks on sentence
                       boundaries (OpenAI TTS hard limit = 4,096 chars/request)
  3. tts (OpenAI)      gpt-4o-mini-tts per chunk with `instructions` steering;
                       retry + exponential backoff;
                       CONTENT-HASH CACHE keyed by (text, voice, instructions)
                       so unchanged chunks are never re-rendered
  4. assemble          concat chunks per chapter; paragraph-gap silences;
                       ACX room tone (0.75s head / 2.0s tail)
  5. master (ffmpeg)   loudnorm (EBU R128, ~ -20 LUFS -> ACX RMS -18..-23dB)
                       + -3dB true-peak limiter
  6. credits           synth opening (title / author / "narrated by an AI voice")
                       and closing credits as separate ACX-compliant files
  7. QA (ffmpeg astats) measure RMS / peak / noise floor / duration per file;
                       write QA-REPORT.md with PASS/FAIL vs ACX thresholds
  8. package           marketplace: per-chapter 192kbps CBR MP3 @44.1kHz + zip
                       personal:    single .m4b with embedded chapter metadata
```

### ACX target thresholds (stage 5 + 7)

- RMS between **-23dB and -18dB**
- Peak max **-3dB**
- Noise floor below **-60dB** (trivially met by TTS digital silence)
- **192kbps CBR MP3**, 44.1kHz
- 0.5–1s room tone at head, 1–5s at tail, per file
- Each chapter a separate file; opening + closing credits present

## Key design choices

**Content-hash cache (stage 3)** is the cost/iteration lever. Each chunk's audio is stored keyed by a hash of its text + voice + instructions. Editing one chapter and re-running re-synthesizes only changed chunks; the ~$3 is effectively one-time.

**Two outputs, one render.** Mastered per-chapter WAVs are the single source feeding both the marketplace MP3s and the `.m4b`. No double TTS spend.

**Automatic but safe.** `--dry-run` previews cost + plan with zero API calls. The real run is one command; QA failures are surfaced in the report and exit code, never as a mid-run prompt.

## CLI

```bash
# preview cost + plan, no spend
python -m audiobook_gen \
  --source "05_Book_Ideas/Drafting Layer/AI Engineering Book - Reader Version.md" \
  --dry-run

# full render
python -m audiobook_gen \
  --source "<any.md>" --voice onyx \
  --title "AI Engineering" --author "Timur Isachenko" \
  --out dist/audiobook
```

Outputs:
- `dist/audiobook/marketplace/Chapter-NN.mp3` + `acx-upload.zip` + `QA-REPORT.md`
- `dist/audiobook/personal/AI-Engineering.m4b`

## Components & boundaries

| Module | Responsibility | Depends on |
|---|---|---|
| `normalize.py` | markdown -> list of `(chapter_title, spoken_text)` | none (pure) |
| `chunk.py` | spoken_text -> chunks `<=` limit on sentence boundaries | none (pure) |
| `tts.py` | chunk -> audio bytes; cache; retry/backoff | OpenAI SDK, cache dir |
| `assemble.py` | chunks -> per-chapter WAV with room tone/gaps | ffmpeg |
| `master.py` | WAV -> ACX-loudness WAV; -> 192k MP3 | ffmpeg |
| `credits.py` | title/author -> opening/closing audio | tts.py, assemble.py |
| `qa.py` | audio file -> metrics -> PASS/FAIL; report | ffmpeg astats |
| `package.py` | files -> marketplace zip + `.m4b` | ffmpeg |
| `cost.py` | char count -> $ estimate + plan | none (pure) |
| `__main__.py` | CLI wiring, orchestration, `--dry-run` | all above |

Pure modules (`normalize`, `chunk`, `cost`) are fully unit-testable with no I/O.

## Dependencies

- `openai` Python SDK — reads `OPENAI_API_KEY` from env
- `ffmpeg` system binary (assert presence at startup with a clear error)
- Output dir `dist/` added to `.gitignore`

## Testing (TDD)

Unit tests (no API key, no audio render needed):

- **normalize** — strips code/draft-notes/diagrams/citations; splits the 10 chapters correctly; expands symbols.
- **chunk** — never exceeds char limit; splits only on sentence boundaries; preserves paragraph structure.
- **qa** — parses representative ffmpeg `astats` output into metrics; applies ACX thresholds to PASS/FAIL correctly (boundary cases).
- **cost** — char count -> dollar estimate; chapter/chunk plan.

Integration tests gated behind env flags (`RUN_TTS_TESTS`, `RUN_FFMPEG_TESTS`):

- one real TTS chunk renders and caches; second call hits cache (no API call).
- ffmpeg master produces a file whose measured RMS/peak fall in ACX range.

## Out of scope (YAGNI)

- Multi-voice / character casting
- Music beds or sound design
- Non-OpenAI engines (architecture leaves `tts.py` swappable, but only OpenAI is built)
- Automated upload to ACX/Findaway (we produce the upload-ready zip; submission stays manual)
