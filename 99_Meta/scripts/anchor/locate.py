from dataclasses import dataclass

from vtt import TimedWord, normalize


@dataclass
class Anchor:
    video_id: str
    start: str
    end: str
    quote: str
    confidence: str  # "high" | "medium" | "low"


def _confidence(ratio: float) -> str:
    if ratio >= 0.9:
        return "high"
    if ratio >= 0.6:
        return "medium"
    return "low"


def locate_quote(stream: list[TimedWord], phrase: str, video_id: str) -> Anchor:
    target = [n for n in (normalize(t) for t in phrase.split()) if n]
    if not target or len(stream) < len(target):
        return Anchor(video_id, "", "", "", "low")
    n = len(target)
    best_score = -1.0
    best_i = 0
    for i in range(len(stream) - n + 1):
        window = stream[i : i + n]
        hits = sum(1 for w, t in zip(window, target) if w.norm == t)
        score = hits / n
        if score > best_score:
            best_score = score
            best_i = i
    window = stream[best_i : best_i + n]
    quote = " ".join(w.word for w in window)
    return Anchor(
        video_id=video_id,
        start=window[0].timestamp,
        end=window[-1].timestamp,
        quote=quote,
        confidence=_confidence(best_score),
    )
