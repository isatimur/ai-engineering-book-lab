"""Word-level alignment helpers for audiobook karaoke highlighting."""
from __future__ import annotations

import re
from dataclasses import dataclass


@dataclass
class WordTiming:
    text: str
    start: float
    end: float


def chars_to_words(
    characters: list[str],
    starts: list[float],
    ends: list[float],
) -> list[WordTiming]:
    """Group character-level ElevenLabs alignment into word timings."""
    if not characters:
        return []
    words: list[WordTiming] = []
    buf: list[str] = []
    w_start: float | None = None
    w_end = 0.0

    for ch, s, e in zip(characters, starts, ends, strict=False):
        if ch.isspace() or ch == "\n":
            if buf:
                words.append(WordTiming("".join(buf), w_start if w_start is not None else s, w_end))
                buf, w_start = [], None
            continue
        if not buf:
            w_start = s
        buf.append(ch)
        w_end = e

    if buf:
        words.append(WordTiming("".join(buf), w_start if w_start is not None else 0.0, w_end))
    return words


def offset_words(words: list[WordTiming], offset: float) -> list[WordTiming]:
    if offset <= 0:
        return list(words)
    return [WordTiming(w.text, w.start + offset, w.end + offset) for w in words]


def merge_word_lists(chunks: list[list[WordTiming]]) -> list[WordTiming]:
    out: list[WordTiming] = []
    for chunk in chunks:
        out.extend(chunk)
    return out


def normalize_token(word: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", word.lower())


def tokenize_display(text: str) -> list[str]:
    """Tokenize visible prose (markdown markers already stripped by caller)."""
    return [w for w in re.findall(r"\S+", text) if w]


def build_display_map(spoken_words: list[str], display_words: list[str]) -> list[int | None]:
    """Greedy map: display token index -> spoken token index (or None)."""
    spoken_norm = [normalize_token(w) for w in spoken_words]
    display_norm = [normalize_token(w) for w in display_words]
    mapping: list[int | None] = []
    j = 0
    for d in display_norm:
        if not d:
            mapping.append(None)
            continue
        while j < len(spoken_norm) and spoken_norm[j] != d:
            j += 1
        if j < len(spoken_norm):
            mapping.append(j)
            j += 1
        else:
            mapping.append(None)
    return mapping


def active_word_index(words: list[WordTiming], t: float) -> int:
    """Return the index of the word active at time t (seconds)."""
    if not words:
        return -1
    lo, hi = 0, len(words) - 1
    if t < words[0].start:
        return 0
    if t >= words[-1].end:
        return len(words) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        w = words[mid]
        if t < w.start:
            hi = mid - 1
        elif t >= w.end:
            lo = mid + 1
        else:
            return mid
    return max(0, min(lo, len(words) - 1))


def heuristic_word_timings(
    spoken_text: str,
    duration: float,
    *,
    head_silence: float = 0.75,
    tail_silence: float = 2.0,
) -> list[WordTiming]:
    """Evenly distribute words across the narrated span (fallback without API timestamps)."""
    words = re.findall(r"\S+", spoken_text)
    if not words or duration <= head_silence + tail_silence:
        return []
    usable = duration - head_silence - tail_silence
    weights = [max(1, len(w)) for w in words]
    total = sum(weights)
    t = head_silence
    out: list[WordTiming] = []
    for word, weight in zip(words, weights, strict=False):
        span = usable * (weight / total)
        out.append(WordTiming(word, t, t + span))
        t += span
    return out


def strip_markdown_for_display(block: str) -> str:
    text = block
    text = re.sub(r"^#{1,6}\s+", "", text)
    text = re.sub(r"^>\s?", "", text, flags=re.MULTILINE)
    text = re.sub(r"^[-*]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\d+\.\s+", "", text, flags=re.MULTILINE)
    text = text.replace("**", "").replace("__", "").replace("`", "")
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    return text.strip()
