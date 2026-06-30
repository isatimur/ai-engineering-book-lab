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
