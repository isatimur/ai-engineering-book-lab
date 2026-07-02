# audiobook_gen

Generate an AI-narrated audiobook from the book markdown — ACX/Audible-grade
MP3s plus a personal `.m4b` with chapter markers.

## Requirements
- Python 3.10+ (this repo's pytest runs under `python3.11`)
- `ffmpeg` + `ffprobe` on PATH (`brew install ffmpeg`)
- `pip install openai`
- `export OPENAI_API_KEY=...`

## Usage

```bash
cd scripts

# preview cost + chapter/chunk plan (no spend)
python3 -m audiobook_gen \
  --source "../05_Book_Ideas/Drafting Layer/AI Engineering Book - Reader Version.md" \
  --dry-run

# full render — OpenAI (voice onyx)
export OPENAI_API_KEY=...
python3 -m audiobook_gen \
  --source "../05_Book_Ideas/Drafting Layer/AI Engineering Book - Reader Version.md" \
  --engine openai --voice onyx --title "AI Engineering" --author "Timur Isachenko" \
  --out ../dist/audiobook

# full render — ElevenLabs (voice Brian, deep/onyx-like)
export ELEVEN_API_KEY=...
python3 -m audiobook_gen \
  --source "../05_Book_Ideas/Drafting Layer/AI Engineering Book - Reader Version.md" \
  --engine elevenlabs --voice nPczCjzI2devNBz1zQrb \
  --title "AI Engineering" --author "Timur Isachenko" \
  --out ../dist/audiobook
```

`--engine` selects the TTS backend (`openai` default, or `elevenlabs`). Voice
defaults per engine (onyx / Brian). ElevenLabs is metered per character (~171k
for this book); a full render fits inside a Creator-tier monthly quota.

Outputs:
- `dist/audiobook/marketplace/NN-*.mp3`, `acx-upload.zip`, `QA-REPORT.md`
- `dist/audiobook/personal/ai-engineering.m4b`

Re-runs reuse the per-chunk cache in `dist/.tts-cache`, so editing one chapter
only re-synthesizes changed chunks.

## Tests
```bash
python3.11 -m pytest audiobook_gen/ -v                 # pure unit tests
RUN_FFMPEG_TESTS=1 python3.11 -m pytest audiobook_gen/ # + ffmpeg integration
RUN_TTS_TESTS=1   python3.11 -m pytest audiobook_gen/  # + live TTS (costs money)
```
```
