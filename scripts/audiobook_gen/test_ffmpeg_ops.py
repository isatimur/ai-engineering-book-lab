import os
import subprocess
from pathlib import Path

import pytest

from audiobook_gen.ffmpeg_ops import (
    concat_filter, loudnorm_cmd, mp3_cmd, silence_cmd,
    ensure_ffmpeg, make_silence, concat_wavs, SR,
)

FFMPEG = os.environ.get("RUN_FFMPEG_TESTS") == "1"


def test_concat_filter_resamples_every_input():
    # Each input must be aresampled to the common rate before concat, otherwise
    # mixed-rate inputs (24 kHz TTS + 44.1 kHz silence) corrupt the stream.
    graph = concat_filter(3)
    assert graph.count(f"aresample={SR}") == 3
    assert "concat=n=3:v=0:a=1[out]" in graph


def test_loudnorm_cmd_targets_acx():
    cmd = loudnorm_cmd(Path("in.wav"), Path("out.wav"))
    joined = " ".join(cmd)
    assert "loudnorm=I=-19.5:TP=-3:LRA=11" in joined
    assert "-ar 44100" in joined and "-ac 1" in joined


def test_mp3_cmd_is_192k_cbr():
    cmd = mp3_cmd(Path("in.wav"), Path("out.mp3"))
    joined = " ".join(cmd)
    assert "-b:a 192k" in joined and "libmp3lame" in joined
    assert "-ar 44100" in joined


def test_silence_cmd_has_duration():
    cmd = silence_cmd(Path("s.wav"), 0.75)
    assert "anullsrc=r=44100:cl=mono" in " ".join(cmd)
    assert "0.75" in " ".join(cmd)


@pytest.mark.skipif(not FFMPEG, reason="set RUN_FFMPEG_TESTS=1")
def test_make_silence_and_concat(tmp_path):
    ensure_ffmpeg()
    a = make_silence(tmp_path / "a.wav", 0.3)
    b = make_silence(tmp_path / "b.wav", 0.3)
    out = concat_wavs([a, b], tmp_path / "out.wav", tmp_path)
    assert out.exists() and out.stat().st_size > 0


def _probe(path: Path, entry: str) -> str:
    return subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", entry,
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        capture_output=True, text=True,
    ).stdout.strip()


@pytest.mark.skipif(not FFMPEG, reason="set RUN_FFMPEG_TESTS=1")
def test_concat_handles_mismatched_sample_rates(tmp_path):
    # Regression: 24 kHz TTS chunks + 44.1 kHz silence must concat without the
    # speed/pitch corruption the concat demuxer produced. Build a 24 kHz clip
    # and a 44.1 kHz clip, concat, and assert correct rate AND total duration.
    ensure_ffmpeg()
    lo = tmp_path / "lo24k.wav"
    subprocess.run(
        ["ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
         "-t", "1.0", "-ar", "24000", "-ac", "1", str(lo)],
        capture_output=True, text=True, check=True,
    )
    hi = make_silence(tmp_path / "hi44k.wav", 1.0)  # 44.1 kHz

    out = concat_wavs([hi, lo], tmp_path / "out.wav", tmp_path)

    assert _probe(out, "stream=sample_rate") == SR
    # ~2.0s total; mismatched-rate corruption would skew this badly.
    assert abs(float(_probe(out, "format=duration")) - 2.0) < 0.1
