"""Assemble chunk audio into a mastered per-chapter WAV and MP3."""
from __future__ import annotations

from pathlib import Path

from audiobook_gen import ffmpeg_ops as ff
from audiobook_gen.chunk import chunk_text
from audiobook_gen.tts import DEFAULT_INSTRUCTIONS, synthesize

HEAD_SILENCE = 0.75
TAIL_SILENCE = 2.0
GAP_SILENCE = 0.6


def assembly_sequence(chunk_paths, head, gap, tail):
    seq = [head]
    for i, c in enumerate(chunk_paths):
        if i > 0:
            seq.append(gap)
        seq.append(c)
    seq.append(tail)
    return seq


def render_chapter(
    text: str,
    *,
    voice: str,
    cache_dir: Path,
    work_dir: Path,
    out_wav: Path,
    out_mp3: Path,
    instructions: str = DEFAULT_INSTRUCTIONS,
    client=None,
) -> tuple[Path, Path]:
    work_dir = Path(work_dir)
    work_dir.mkdir(parents=True, exist_ok=True)

    chunks = chunk_text(text)
    chunk_paths = [
        synthesize(c, voice, cache_dir, instructions=instructions, client=client)
        for c in chunks
    ]

    head = ff.make_silence(work_dir / "head.wav", HEAD_SILENCE)
    gap = ff.make_silence(work_dir / "gap.wav", GAP_SILENCE)
    tail = ff.make_silence(work_dir / "tail.wav", TAIL_SILENCE)

    raw = ff.concat_wavs(
        assembly_sequence(chunk_paths, head, gap, tail),
        work_dir / "raw.wav",
        work_dir,
    )
    ff.run(ff.loudnorm_cmd(raw, out_wav))
    ff.run(ff.mp3_cmd(out_wav, out_mp3))
    return out_wav, out_mp3
