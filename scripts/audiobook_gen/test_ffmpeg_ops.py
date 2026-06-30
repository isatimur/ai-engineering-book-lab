import os
from pathlib import Path

import pytest

from audiobook_gen.ffmpeg_ops import (
    concat_list_content, loudnorm_cmd, mp3_cmd, silence_cmd,
    ensure_ffmpeg, make_silence, concat_wavs,
)

FFMPEG = os.environ.get("RUN_FFMPEG_TESTS") == "1"


def test_concat_list_content_quotes_paths():
    content = concat_list_content([Path("/a/one.wav"), Path("/a/two.wav")])
    assert content.splitlines() == ["file '/a/one.wav'", "file '/a/two.wav'"]


def test_loudnorm_cmd_targets_acx():
    cmd = loudnorm_cmd(Path("in.wav"), Path("out.wav"))
    joined = " ".join(cmd)
    assert "loudnorm=I=-20:TP=-3:LRA=11" in joined
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
