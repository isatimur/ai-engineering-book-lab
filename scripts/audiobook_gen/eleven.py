"""ElevenLabs TTS backend with the same content-hash WAV cache as tts.py.

Mirrors the tts.synthesize contract (text -> cached 44.1 kHz mono WAV Path) so
render_chapter can drive either engine. ElevenLabs returns mp3, which we decode
to WAV via ffmpeg to keep the assembly pipeline format-uniform.
"""
from __future__ import annotations

import hashlib
import json
import time
import urllib.error
import urllib.request
from pathlib import Path

from audiobook_gen import ffmpeg_ops as ff

API_ROOT = "https://api.elevenlabs.io/v1/text-to-speech"
DEFAULT_MODEL = "eleven_multilingual_v2"
DEFAULT_VOICE = "nPczCjzI2devNBz1zQrb"  # Brian — deep, resonant, comforting
OUTPUT_FORMAT = "mp3_44100_128"         # available on Creator tier
DEFAULT_SETTINGS = {
    "stability": 0.5,
    "similarity_boost": 0.75,
    "style": 0.0,
    "use_speaker_boost": True,
}


def cache_key(text: str, voice: str, model: str, settings: dict) -> str:
    h = hashlib.sha256()
    payload = "\x1f".join(
        ["elevenlabs", model, voice, json.dumps(settings, sort_keys=True), text]
    )
    h.update(payload.encode("utf-8"))
    return h.hexdigest()


def build_request(text: str, voice: str, model: str, settings: dict, api_key: str):
    url = f"{API_ROOT}/{voice}?output_format={OUTPUT_FORMAT}"
    body = json.dumps({"text": text, "model_id": model, "voice_settings": settings})
    return urllib.request.Request(
        url,
        data=body.encode("utf-8"),
        method="POST",
        headers={
            "xi-api-key": api_key,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
        },
    )


def _default_post(req) -> bytes:
    with urllib.request.urlopen(req, timeout=120) as resp:
        return resp.read()


def synthesize(
    text: str,
    voice: str,
    cache_dir: Path,
    *,
    model: str = DEFAULT_MODEL,
    api_key: str,
    settings: dict | None = None,
    max_retries: int = 4,
    post=None,
) -> Path:
    settings = settings or DEFAULT_SETTINGS
    post = post or _default_post
    cache_dir = Path(cache_dir)
    cache_dir.mkdir(parents=True, exist_ok=True)
    out = cache_dir / f"{cache_key(text, voice, model, settings)}.wav"
    if out.exists() and out.stat().st_size > 0:
        return out

    req = build_request(text, voice, model, settings, api_key)
    last_err = None
    for attempt in range(max_retries):
        try:
            audio = post(req)
        except urllib.error.HTTPError as err:
            detail = ""
            try:
                detail = err.read().decode("utf-8", "replace")[:500]
            except Exception:  # noqa: BLE001
                pass
            # 4xx other than rate-limit (429) won't fix themselves — fail fast so
            # a bad key / exhausted quota surfaces immediately, not after backoff.
            if 400 <= err.code < 500 and err.code != 429:
                raise RuntimeError(f"ElevenLabs {err.code}: {detail}") from err
            last_err = RuntimeError(f"ElevenLabs {err.code}: {detail}")
            time.sleep(2 ** attempt)
            continue
        except Exception as err:  # noqa: BLE001 - retry transient network failures
            last_err = err
            time.sleep(2 ** attempt)
            continue

        tmp = out.with_suffix(".mp3")
        tmp.write_bytes(audio)
        ff.to_wav(tmp, out)
        tmp.unlink(missing_ok=True)
        return out

    raise RuntimeError(f"ElevenLabs TTS failed after {max_retries} attempts: {last_err}")
