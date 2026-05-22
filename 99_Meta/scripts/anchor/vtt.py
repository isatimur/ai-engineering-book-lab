import re
from dataclasses import dataclass
from pathlib import Path

_CUE_HEADER = re.compile(r"^(\d\d:\d\d:\d\d\.\d\d\d)\s+-->\s+\d\d:\d\d:\d\d\.\d\d\d")
_INLINE_TS = re.compile(r"<(\d\d:\d\d:\d\d\.\d\d\d)>")
_TAGS = re.compile(r"</?c>")


@dataclass
class TimedWord:
    word: str       # verbatim token, punctuation preserved
    norm: str       # normalized form, for matching
    timestamp: str  # "HH:MM:SS.mmm"


def normalize(token: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", token.lower())


def _words(text: str, timestamp: str) -> list[TimedWord]:
    out: list[TimedWord] = []
    for tok in _TAGS.sub("", text).split():
        n = normalize(tok)
        if n:
            out.append(TimedWord(word=tok, norm=n, timestamp=timestamp))
    return out


def _parse_fresh_line(line: str, cue_start: str) -> list[TimedWord]:
    parts = _INLINE_TS.split(line)
    words = _words(parts[0], cue_start)
    for i in range(1, len(parts) - 1, 2):
        words.extend(_words(parts[i + 1], parts[i]))
    return words


def load_word_stream(vtt_path: str) -> list[TimedWord]:
    lines = Path(vtt_path).read_text(encoding="utf-8").splitlines()
    stream: list[TimedWord] = []
    i = 0
    while i < len(lines):
        m = _CUE_HEADER.match(lines[i])
        if not m:
            i += 1
            continue
        cue_start = m.group(1)
        i += 1
        text_lines: list[str] = []
        while i < len(lines) and lines[i] != "":
            text_lines.append(lines[i])
            i += 1
        fresh = next((ln for ln in reversed(text_lines) if _INLINE_TS.search(ln)), None)
        if fresh is not None:
            stream.extend(_parse_fresh_line(fresh, cue_start))
    return stream
