"""Prepare manuscript chunks for Eleven v3 synthesis.

Implements prompting guidance from:
https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices#prompting-eleven-v3

- Subtle delivery tags at segment openings (not dramatic tags like [laughs])
- Preserve paragraph breaks for natural pacing (v3 has no SSML <break>)
- Expand tech terms / URLs the API normalization may miss
"""
from __future__ import annotations

import re

SEGMENT_OPENING_TAG = "[professional]"
MAX_CONTEXT_CHARS = 500

_URL_RE = re.compile(r"https?://\S+|www\.\S+", re.IGNORECASE)
_VERSION_RE = re.compile(r"\bv(\d+(?:\.\d+)*)\b", re.IGNORECASE)

# Acronyms common in this manuscript — spoken letter-by-letter for clarity.
_TECH_ACRONYMS: tuple[tuple[re.Pattern[str], str], ...] = (
    (re.compile(r"\bAI\b"), "A I"),
    (re.compile(r"\bAPIs?\b"), "A P I"),
    (re.compile(r"\bLLMs?\b"), "L L M"),
    (re.compile(r"\bMCP\b"), "M C P"),
    (re.compile(r"\bOAuth\b"), "O Auth"),
    (re.compile(r"\bSaaS\b"), "Sass"),
    (re.compile(r"\bTTS\b"), "T T S"),
    (re.compile(r"\bIAM\b"), "I A M"),
    (re.compile(r"\bGPU\b"), "G P U"),
    (re.compile(r"\bRAG\b"), "R A G"),
)


def _expand_url(match: re.Match[str]) -> str:
    raw = match.group(0)
    trailing = ""
    while raw and raw[-1] in ".,;:!?)":
        trailing = raw[-1] + trailing
        raw = raw[:-1]
    spoken = re.sub(r"^https?://", "", raw, flags=re.IGNORECASE)
    spoken = re.sub(r"^www\.", "w w w dot ", spoken, flags=re.IGNORECASE)
    spoken = spoken.replace("/", " slash ")
    spoken = spoken.replace(".", " dot ")
    spoken = spoken.replace("-", " ")
    spoken = spoken.replace("_", " ")
    spoken = re.sub(r"\s+", " ", spoken).strip()
    return f"{spoken}{trailing}" if spoken else raw


def _expand_version(match: re.Match[str]) -> str:
    parts = match.group(1).split(".")
    if len(parts) == 1:
        return f"version {parts[0]}"
    tail = " point ".join(parts[1:])
    return f"version {parts[0]} point {tail}"


def expand_spoken_tokens(text: str) -> str:
    """Local expansions before API text normalization."""
    text = _URL_RE.sub(_expand_url, text)
    text = _VERSION_RE.sub(_expand_version, text)
    for pattern, replacement in _TECH_ACRONYMS:
        text = pattern.sub(replacement, text)
    return text


def prepare_chunk_text(text: str, *, segment_start: bool = False) -> str:
    """Return text ready for eleven_v3 — structure preserved, subtle opening tag."""
    text = expand_spoken_tokens(text.strip())
    if segment_start:
        text = f"{SEGMENT_OPENING_TAG} {text}"
    return text


def context_snippet(text: str | None, *, from_end: bool = False) -> str | None:
    """Trim a neighbor chunk for previous_text / next_text API fields."""
    if not text:
        return None
    text = text.strip()
    if len(text) <= MAX_CONTEXT_CHARS:
        return text
    if from_end:
        return text[-MAX_CONTEXT_CHARS:]
    return text[:MAX_CONTEXT_CHARS]
