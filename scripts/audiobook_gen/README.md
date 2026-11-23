# audiobook_gen

Generate an AI-narrated audiobook from the book markdown — ACX/Audible-grade
MP3s plus a personal `.m4b` with chapter markers.

## Requirements
- Python 3.10+ (this repo's pytest runs under `python3.11`)
- `ffmpeg` + `ffprobe` on PATH (`brew install ffmpeg`)
- `pip install openai`
- `export OPENAI_API_KEY=...`

## Source selection

The canonical manuscript lives in `website/src/content/chapter-01.md` …
`chapter-10.md`. **This is the default source** — no flag is needed:

```bash
python3 -m audiobook_gen --dry-run          # reads canonical website/src/content
python3 -m audiobook_gen --engine openai …  # same, but full render
```

You can also point at a different directory of chapter files or a single
combined file:

| Flag | Behaviour |
|---|---|
| *(none)* | Reads `website/src/content/chapter-*.md` sorted by chapter number |
| `--source-dir DIR` | Reads chapter-*.md files from DIR in numeric order |
| `--source FILE` | Reads a single combined markdown file (legacy / one-off) |

`--source` and `--source-dir` are mutually exclusive.

## Usage

```bash
cd scripts

# --- Canonical one-command paths (recommended) ---

# preview cost + chapter/chunk plan (no spend)
python3 -m audiobook_gen --dry-run

# full render — OpenAI (voice onyx)
export OPENAI_API_KEY=...
python3 -m audiobook_gen \
  --engine openai --voice onyx \
  --title "From Copilot to Colleague" --author "Timur Isachenko" \
  --out ../dist/audiobook

# full render — ElevenLabs (Oliver — clean, British, steady; Eleven v3)
export ELEVEN_API_KEY=...
python3 -m audiobook_gen \
  --engine elevenlabs --voice L1aJrPa7pLJEyYlh3Ilq \
  --title "From Copilot to Colleague" --author "Timur Isachenko" \
  --out ../dist/audiobook

# --- Alternative: explicit directory or file ---

# render from a custom chapter directory
python3 -m audiobook_gen --source-dir /path/to/chapters --dry-run

# render from a legacy single combined file
python3 -m audiobook_gen --source /path/to/combined.md --dry-run
```

`--engine` selects the TTS backend (`openai` default, or `elevenlabs`). Voice
defaults per engine (onyx / Oliver). ElevenLabs is metered per character (~171k
for this book); a full render fits inside a Creator-tier monthly quota.

### Eleven v3 best practices

When `--engine elevenlabs` is used, the pipeline applies [Eleven v3 prompting
guidance](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices#prompting-eleven-v3):

- **Oliver** voice with `eleven_v3` and **Natural** stability (0.5) for subtle tag response
- **`[professional]`** delivery tag on the first chunk of each chapter/credits segment
- **`apply_text_normalization: on`** and **`language_code: en`** for numbers, dates, abbreviations
- **`previous_text` / `next_text`** across chunks for continuity when stitching long chapters
- Local expansions for tech acronyms (API → A P I, LLM → L L M) and URLs before synthesis
- Paragraph breaks preserved (v3 does not support SSML `<break>` — pacing uses structure + assembly silences)

Re-rendering after changing prep logic invalidates the per-chunk cache automatically.

Outputs:
- `dist/audiobook/marketplace/NN-*.mp3`, `acx-upload.zip`, `QA-REPORT.md`
- `dist/audiobook/personal/<title-slug>.m4b` (`from-copilot-to-colleague.m4b` with the default `--title`)

Re-runs reuse the per-chunk cache in `dist/.tts-cache`, so editing one chapter
only re-synthesizes changed chunks.

## Tests
```bash
cd scripts
python3.11 -m pytest audiobook_gen/ -v                 # pure unit tests
RUN_FFMPEG_TESTS=1 python3.11 -m pytest audiobook_gen/ # + ffmpeg integration
RUN_TTS_TESTS=1   python3.11 -m pytest audiobook_gen/  # + live TTS (costs money)
```

## Interface

Entry points:

- `[__main__.py:main]` and `[__main__.py:build_parser]`: the `python3 -m audiobook_gen` CLI. Flags: `--source`, `--source-dir`, `--engine {openai,elevenlabs}`, `--voice`, `--model`, `--title`, `--author`, `--out` (default `dist/audiobook`), `--cache-dir` (default `dist/.tts-cache`), `--dry-run`.
- `[build_web_alignment.py:main]`: a separate CLI. It writes a heuristic word-timing `.align.json` for one chapter. Flags: `--chapter`, `--display-md`, `--mp3`, `--out` (all required), `--book-md`, `--source-tag` (default `heuristic`).

Modules:

| Module | Public symbols |
|---|---|
| `__main__.py` | `resolve_source_text`, `make_synth`, `run_dry`, `slug` |
| `normalize.py` | `Chapter`, `normalize_markdown`, `CHAPTER_RE`, `SYMBOL_EXPANSIONS` |
| `chunk.py` | `chunk_text`, `MAX_CHARS` (3500) |
| `cost.py` | `RenderPlan`, `build_plan` |
| `credits.py` | `opening_text`, `closing_text` |
| `tts.py` (OpenAI) | `synthesize`, `cache_key`, `DEFAULT_MODEL` (`gpt-4o-mini-tts`), `DEFAULT_VOICE` (`onyx`) |
| `eleven.py` (ElevenLabs) | `synthesize`, `synthesize_with_timestamps`, `cache_key`, `build_body`, `build_request`, `build_timestamps_request`, `DEFAULT_MODEL` (`eleven_v3`), `DEFAULT_VOICE`, `DEFAULT_SETTINGS`, `V3_REQUEST_OPTS`, `API_ROOT` |
| `eleven_prepare.py` | `prepare_chunk_text`, `expand_spoken_tokens`, `context_snippet`, `SEGMENT_OPENING_TAG` (`[professional]`) |
| `assemble.py` | `ChunkSynth`, `assembly_sequence`, `render_chapter` |
| `ffmpeg_ops.py` | `ensure_ffmpeg`, `run`, `make_silence`, `to_wav`, `concat_wavs`, `concat_filter`, `silence_cmd`, `loudnorm_cmd`, `mp3_cmd`, `to_wav_cmd`, `SR` |
| `package.py` | `build_ffmetadata`, `zip_marketplace`, `build_m4b` |
| `qa.py` | `AudioMetrics`, `measure`, `parse_astats`, `check_acx`, `astats_cmd`, `write_report` |
| `alignment.py` | `WordTiming`, `chars_to_words`, `offset_words`, `merge_word_lists`, `build_display_map`, `active_word_index`, `heuristic_word_timings`, `normalize_token`, `tokenize_display`, `strip_markdown_for_display` |

`eleven.py:synthesize_with_timestamps` exists, but no other module in this package calls it.

## Invariants

- `--source` and `--source-dir` are mutually exclusive. Source priority is `--source`, then `--source-dir`, then `website/src/content` (`[__main__.py:resolve_source_text]`).
- `--dry-run` returns 0 before the ffmpeg check, any API call, or any file write (`[__main__.py:main]`).
- `ff.ensure_ffmpeg()` runs before any TTS spend. Both `ffmpeg` and `ffprobe` must be on PATH (`[ffmpeg_ops.py:ensure_ffmpeg]`).
- Exit codes: 2 when no chapter parses, 1 when any ACX QA check fails, 0 otherwise (`[__main__.py:main]`).
- Segment order is opening credits, then chapters, then closing credits. File names use a two-digit index plus a slug (`[__main__.py:main]`).
- `normalize_markdown` drops chapters under 50 words. It removes code fences and `## Draft note` / `## Draft status note` blocks (`[normalize.py:normalize_markdown]`).
- A chunk never exceeds `MAX_CHARS`. Over-long sentences split on words (`[chunk.py:chunk_text]`).
- The cache key is a SHA-256 of every input that changes the audio. For ElevenLabs this is model, voice, settings, request options, `previous_text`, `next_text` and text (`[eleven.py:cache_key]`). For OpenAI it is model, voice, instructions and text (`[tts.py:cache_key]`). A non-empty cached WAV is reused.
- ElevenLabs fails fast on 4xx other than 429. It retries 429, 5xx and network errors with `2**attempt` back-off, up to 4 times (`[eleven.py:synthesize]`). OpenAI retries every exception the same way (`[tts.py:synthesize]`).
- `[professional]` is prepended only to the first chunk of a segment. Neighbour context is trimmed to 500 characters (`[eleven_prepare.py:prepare_chunk_text]`, `[eleven_prepare.py:context_snippet]`).
- Loudness target is `loudnorm=I=-19.5:TP=-3:LRA=11`, 44.1 kHz mono. MP3 is libmp3lame 192k (`[ffmpeg_ops.py:loudnorm_cmd]`, `[ffmpeg_ops.py:mp3_cmd]`). The `.m4b` is AAC 128k (`[package.py:build_m4b]`).
- Concatenation uses the concat filter with per-input `aresample`, not the concat demuxer (`[ffmpeg_ops.py:concat_filter]`).
- ACX thresholds: RMS from -23.0 to -18.0 dB, peak at most -3.0 dB, noise floor at most -60.0 dB (`[qa.py:check_acx]`).

## Side Effects

- Network: HTTPS POST to `https://api.elevenlabs.io/v1/text-to-speech/{voice}` through `urllib` (`[eleven.py:build_request]`). The OpenAI SDK calls `client.audio.speech.create` (`[tts.py:synthesize]`).
- Env vars, read by name: `ELEVEN_API_KEY` or `ELEVENLABS_API_KEY`, and `OPENAI_API_KEY` (`[__main__.py:make_synth]`). A missing key raises `SystemExit`.
- Subprocesses: `ffmpeg` for silence, conversion, loudnorm, MP3, concat, m4b and astats. `ffprobe` for durations (`[ffmpeg_ops.py:run]`, `[package.py:build_m4b]`, `[qa.py:measure]`, `[build_web_alignment.py:probe_duration]`).
- Disk writes: `<out>/marketplace/` (MP3s, `QA-REPORT.md`, `acx-upload.zip`), `<out>/personal/<slug>.m4b`, `<out>/.work/`, and SHA-256-named WAVs in `--cache-dir` (`[__main__.py:main]`, `[tts.py:synthesize]`, `[eleven.py:synthesize]`).
- Disk reads: chapter markdown from the source directory or file (`[__main__.py:_collect_dir]`).
- Sleeps between retries (`[eleven.py:synthesize]`, `[tts.py:synthesize]`).

## Verification

- Run: `cd scripts && python3.11 -m pytest audiobook_gen/ -v`
- With ffmpeg integration: `RUN_FFMPEG_TESTS=1 python3.11 -m pytest audiobook_gen/`
- No-spend smoke check: `cd scripts && python3 -m audiobook_gen --dry-run`
- The CI loop in `.github/workflows/script-tests.yml` does not run these tests. It globs only `scripts/test_*.py` and `99_Meta/scripts/test_*.py`.
