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
DEFAULT_MODEL = "eleven_v3"
DEFAULT_VOICE = "L1aJrPa7pLJEyYlh3Ilq"  # Oliver — clean, British, steady
VOICE_LABEL = "Oliver"
OUTPUT_FORMAT = "mp3_44100_128"         # available on Creator tier
DEFAULT_SETTINGS = {
    "stability": 0.75,
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


def build_timestamps_request(text: str, voice: str, model: str, settings: dict, api_key: str):
    url = f"{API_ROOT}/{voice}/with-timestamps?output_format={OUTPUT_FORMAT}"
    body = json.dumps({"text": text, "model_id": model, "voice_settings": settings})
    return urllib.request.Request(
        url,
        data=body.encode("utf-8"),
        method="POST",
        headers={
            "xi-api-key": api_key,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    )


def _default_post(req) -> bytes:
    with urllib.request.urlopen(req, timeout=120) as resp:
        return resp.read()


def _default_post_json(req) -> dict:
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode("utf-8"))


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


def synthesize_with_timestamps(
    text: str,
    voice: str,
    cache_dir: Path,
    *,
    model: str = DEFAULT_MODEL,
    api_key: str,
    settings: dict | None = None,
    max_retries: int = 4,
    post=None,
) -> tuple[Path, dict]:
    """Return (cached WAV path, alignment dict with character timings)."""
    import base64

    from audiobook_gen.alignment import chars_to_words

    settings = settings or DEFAULT_SETTINGS
    post = post or _default_post_json
    cache_dir = Path(cache_dir)
    cache_dir.mkdir(parents=True, exist_ok=True)
    stem = cache_key(text, voice, model, settings)
    out = cache_dir / f"{stem}.wav"
    align_path = cache_dir / f"{stem}.align.json"

    if out.exists() and align_path.exists():
        return out, json.loads(align_path.read_text(encoding="utf-8"))

    req = build_timestamps_request(text, voice, model, settings, api_key)
    last_err = None
    for attempt in range(max_retries):
        try:
            payload = post(req)
            if isinstance(payload, (bytes, bytearray)):
                payload = json.loads(payload.decode("utf-8"))
        except urllib.error.HTTPError as err:
            detail = ""
            try:
                detail = err.read().decode("utf-8", "replace")[:500]
            except Exception:  # noqa: BLE001
                pass
            if 400 <= err.code < 500 and err.code != 429:
                raise RuntimeError(f"ElevenLabs {err.code}: {detail}") from err
            last_err = RuntimeError(f"ElevenLabs {err.code}: {detail}")
            time.sleep(2 ** attempt)
            continue
        except Exception as err:  # noqa: BLE001
            last_err = err
            time.sleep(2 ** attempt)
            continue

        audio_b64 = payload.get("audio_base64") or ""
        alignment = payload.get("normalized_alignment") or payload.get("alignment") or {}
        tmp = out.with_suffix(".mp3")
        tmp.write_bytes(base64.b64decode(audio_b64))
        ff.to_wav(tmp, out)
        tmp.unlink(missing_ok=True)

        chars = alignment.get("characters") or []
        starts = alignment.get("character_start_times_seconds") or []
        ends = alignment.get("character_end_times_seconds") or []
        words = chars_to_words(chars, starts, ends)
        align_doc = {
            "words": [{"text": w.text, "start": w.start, "end": w.end} for w in words],
            "characters": alignment,
        }
        align_path.write_text(json.dumps(align_doc), encoding="utf-8")
        return out, align_doc

    raise RuntimeError(f"ElevenLabs timestamps failed after {max_retries} attempts: {last_err}")
