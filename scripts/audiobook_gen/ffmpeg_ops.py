"""Thin, testable wrappers around the ffmpeg CLI."""
from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

SR = "44100"


def ensure_ffmpeg() -> None:
    # Both binaries are needed: ffmpeg renders/masters, ffprobe measures
    # chapter durations for the .m4b markers. Check both up front so a missing
    # ffprobe fails BEFORE any paid TTS spend, not deep inside build_m4b.
    for binary in ("ffmpeg", "ffprobe"):
        if shutil.which(binary) is None:
            raise RuntimeError(
                f"{binary} not found on PATH. Install ffmpeg (e.g. `brew install ffmpeg`)."
            )


def run(cmd: list[str]) -> None:
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(f"ffmpeg failed: {' '.join(cmd)}\n{proc.stderr[-2000:]}")


def silence_cmd(dst: Path, seconds: float) -> list[str]:
    return [
        "ffmpeg", "-y", "-f", "lavfi",
        "-i", f"anullsrc=r={SR}:cl=mono",
        "-t", str(seconds), "-ar", SR, "-ac", "1", str(dst),
    ]


def loudnorm_cmd(src: Path, dst: Path) -> list[str]:
    # I=-19.5 LUFS centers full chapters near RMS -20 and keeps even the short
    # credit segments (whose long tail room tone drags ungated RMS down) above
    # the ACX -23 dB floor. TP=-3 keeps true peaks at the ACX ceiling.
    return [
        "ffmpeg", "-y", "-i", str(src),
        "-af", "loudnorm=I=-19.5:TP=-3:LRA=11",
        "-ar", SR, "-ac", "1", str(dst),
    ]


def mp3_cmd(src: Path, dst: Path) -> list[str]:
    return [
        "ffmpeg", "-y", "-i", str(src),
        "-c:a", "libmp3lame", "-b:a", "192k",
        "-ar", SR, "-ac", "1", str(dst),
    ]


def to_wav_cmd(src: Path, dst: Path) -> list[str]:
    return ["ffmpeg", "-y", "-i", str(src), "-ar", SR, "-ac", "1", str(dst)]


def make_silence(dst: Path, seconds: float) -> Path:
    run(silence_cmd(dst, seconds))
    return dst


def to_wav(src: Path, dst: Path) -> Path:
    run(to_wav_cmd(src, dst))
    return dst


def concat_filter(n: int) -> str:
    """filter_complex graph that resamples every input to a common rate/layout
    before concatenating. The concat *demuxer* does NOT resample, so feeding it
    44.1 kHz silence and 24 kHz OpenAI-TTS chunks corrupts the stream (wrong
    speed/pitch). The concat *filter* with a per-input aresample fixes this."""
    legs = "".join(
        f"[{i}:a]aresample={SR},aformat=channel_layouts=mono[a{i}];" for i in range(n)
    )
    inputs = "".join(f"[a{i}]" for i in range(n))
    return f"{legs}{inputs}concat=n={n}:v=0:a=1[out]"


def concat_wavs(paths: list[Path], dst: Path, work_dir: Path) -> Path:
    paths = [Path(p) for p in paths]
    cmd = ["ffmpeg", "-y"]
    for p in paths:
        cmd += ["-i", str(p)]
    cmd += [
        "-filter_complex", concat_filter(len(paths)),
        "-map", "[out]", "-ar", SR, "-ac", "1", str(dst),
    ]
    run(cmd)
    return dst
