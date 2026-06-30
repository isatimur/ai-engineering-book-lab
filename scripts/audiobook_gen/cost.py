"""Pre-flight cost + render-plan estimation (no API calls)."""
from __future__ import annotations

from dataclasses import dataclass

from audiobook_gen.chunk import MAX_CHARS, chunk_text
from audiobook_gen.normalize import Chapter


@dataclass
class RenderPlan:
    chapters: int
    chunks: int
    chars: int
    est_usd: float
    lines: list[str]


def build_plan(
    chapters: list[Chapter],
    max_chars: int = MAX_CHARS,
    usd_per_million: float = 15.0,
) -> RenderPlan:
    total_chars = 0
    total_chunks = 0
    lines: list[str] = []
    for ch in chapters:
        n_chunks = len(chunk_text(ch.text, max_chars=max_chars))
        total_chars += len(ch.text)
        total_chunks += n_chunks
        lines.append(f"  {ch.title}: {len(ch.text):>7,} chars, {n_chunks} chunk(s)")
    est = total_chars / 1_000_000 * usd_per_million
    lines.append("")
    lines.append(f"Chapters: {len(chapters)} | Chunks: {total_chunks} | Chars: {total_chars:,}")
    lines.append(f"Estimated cost: ${est:.2f} (at ${usd_per_million:.0f}/1M chars)")
    return RenderPlan(len(chapters), total_chunks, total_chars, est, lines)
