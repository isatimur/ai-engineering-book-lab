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
