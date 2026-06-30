"""Package mastered audio into a marketplace zip and a chapterized .m4b."""
from __future__ import annotations

import subprocess
import zipfile
from pathlib import Path

from audiobook_gen import ffmpeg_ops as ff


def build_ffmetadata(chapters: list[tuple[str, int]]) -> str:
    lines = [";FFMETADATA1"]
    start = 0
    for title, dur_ms in chapters:
        end = start + dur_ms
        lines += [
            "[CHAPTER]",
            "TIMEBASE=1/1000",
            f"START={start}",
            f"END={end}",
            f"title={title}",
        ]
        start = end
    return "\n".join(lines) + "\n"


def zip_marketplace(files: list[Path], dst_zip: Path) -> Path:
    dst_zip = Path(dst_zip)
    dst_zip.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(dst_zip, "w", zipfile.ZIP_DEFLATED) as z:
        for f in files:
            z.write(f, arcname=Path(f).name)
    return dst_zip


def _duration_ms(path: Path) -> int:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        capture_output=True, text=True,
    ).stdout.strip()
    return int(float(out) * 1000)


def build_m4b(chapter_wavs: list[tuple[str, Path]], dst_m4b: Path, work_dir: Path) -> Path:
    work_dir = Path(work_dir)
    work_dir.mkdir(parents=True, exist_ok=True)
    titles_durations = [(t, _duration_ms(p)) for t, p in chapter_wavs]

    full = ff.concat_wavs([p for _, p in chapter_wavs], work_dir / "full.wav", work_dir)
    meta = work_dir / "chapters.txt"
    meta.write_text(build_ffmetadata(titles_durations), encoding="utf-8")

    ff.run([
        "ffmpeg", "-y", "-i", str(full), "-i", str(meta),
        "-map_metadata", "1", "-c:a", "aac", "-b:a", "128k",
        str(dst_m4b),
    ])
    return Path(dst_m4b)
