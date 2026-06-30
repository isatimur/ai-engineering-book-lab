"""Thin, testable wrappers around the ffmpeg CLI."""
from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

SR = "44100"


def ensure_ffmpeg() -> None:
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg not found on PATH. Install it (e.g. `brew install ffmpeg`).")


def run(cmd: list[str]) -> None:
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(f"ffmpeg failed: {' '.join(cmd)}\n{proc.stderr[-2000:]}")


def concat_list_content(paths: list[Path]) -> str:
    return "\n".join(f"file '{Path(p).as_posix()}'" for p in paths)


def silence_cmd(dst: Path, seconds: float) -> list[str]:
    return [
        "ffmpeg", "-y", "-f", "lavfi",
        "-i", f"anullsrc=r={SR}:cl=mono",
        "-t", str(seconds), "-ar", SR, "-ac", "1", str(dst),
    ]


def loudnorm_cmd(src: Path, dst: Path) -> list[str]:
    return [
        "ffmpeg", "-y", "-i", str(src),
        "-af", "loudnorm=I=-20:TP=-3:LRA=11",
        "-ar", SR, "-ac", "1", str(dst),
    ]


def mp3_cmd(src: Path, dst: Path) -> list[str]:
    return [
        "ffmpeg", "-y", "-i", str(src),
        "-c:a", "libmp3lame", "-b:a", "192k",
        "-ar", SR, "-ac", "1", str(dst),
    ]


def make_silence(dst: Path, seconds: float) -> Path:
    run(silence_cmd(dst, seconds))
    return dst


def concat_wavs(paths: list[Path], dst: Path, work_dir: Path) -> Path:
    list_file = Path(work_dir) / "concat.txt"
    list_file.write_text(concat_list_content(paths), encoding="utf-8")
    run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", str(list_file), "-ar", SR, "-ac", "1", str(dst),
    ])
    return dst
