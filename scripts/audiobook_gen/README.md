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

Outputs:
- `dist/audiobook/marketplace/NN-*.mp3`, `acx-upload.zip`, `QA-REPORT.md`
- `dist/audiobook/personal/ai-engineering.m4b`

Re-runs reuse the per-chunk cache in `dist/.tts-cache`, so editing one chapter
only re-synthesizes changed chunks.

## Tests
```bash
cd scripts
python3.11 -m pytest audiobook_gen/ -v                 # pure unit tests
RUN_FFMPEG_TESTS=1 python3.11 -m pytest audiobook_gen/ # + ffmpeg integration
RUN_TTS_TESTS=1   python3.11 -m pytest audiobook_gen/  # + live TTS (costs money)
```
