import subprocess

import pytest

from audiobook_gen import qa
from audiobook_gen.qa import parse_astats, check_acx, AudioMetrics, write_report, measure

# Real astats output emits a per-channel block (with its OWN numbers) BEFORE the
# Overall block. Parsing must read Overall, not the first match it sees.
SAMPLE_ASTATS = """
[Parsed_astats_0 @ 0x] Channel: 1
[Parsed_astats_0 @ 0x] RMS level dB: -11.1
[Parsed_astats_0 @ 0x] Peak level dB: -0.9
[Parsed_astats_0 @ 0x] Noise floor dB: -40.0
[Parsed_astats_0 @ 0x] Overall
[Parsed_astats_0 @ 0x] RMS level dB: -20.5
[Parsed_astats_0 @ 0x] Peak level dB: -3.8
[Parsed_astats_0 @ 0x] Noise floor dB: -78.2
"""


def test_parse_astats_extracts_overall_not_per_channel():
    m = parse_astats(SAMPLE_ASTATS)
    assert m.rms_db == -20.5
    assert m.peak_db == -3.8
    assert m.noise_db == -78.2


def test_parse_astats_handles_inf_noise_floor():
    # Digital-silence room tone drives astats' noise floor to -inf; that must
    # parse (as float -inf) and pass the ACX noise check, not crash.
    stderr = (
        "[astats] Overall\n"
        "[astats] RMS level dB: -19.8\n"
        "[astats] Peak level dB: -9.9\n"
        "[astats] Noise floor dB: -inf\n"
    )
    m = parse_astats(stderr)
    assert m.noise_db == float("-inf")
    assert check_acx(m) == []


def test_measure_raises_on_ffmpeg_failure(tmp_path, monkeypatch):
    def fake_run(*args, **kwargs):
        return subprocess.CompletedProcess(args, returncode=1, stdout="", stderr="No such file")

    monkeypatch.setattr(qa.subprocess, "run", fake_run)
    with pytest.raises(RuntimeError, match="astats failed"):
        measure(tmp_path / "missing.mp3")


def test_check_acx_passes_compliant_audio():
    assert check_acx(AudioMetrics(rms_db=-20.0, peak_db=-3.5, noise_db=-70.0)) == []


def test_check_acx_flags_loud_peak_and_rms():
    fails = check_acx(AudioMetrics(rms_db=-15.0, peak_db=-1.0, noise_db=-50.0))
    assert any("RMS" in f for f in fails)
    assert any("Peak" in f for f in fails)
    assert any("Noise" in f for f in fails)


def test_write_report_lists_pass_and_fail(tmp_path):
    results = [
        ("Chapter 1", AudioMetrics(-20.0, -3.5, -70.0), []),
        ("Chapter 2", AudioMetrics(-15.0, -1.0, -50.0), ["RMS -15.0 dB outside [-23, -18]"]),
    ]
    out = write_report(results, tmp_path / "QA-REPORT.md")
    text = out.read_text()
    assert "Chapter 1" in text and "PASS" in text
    assert "Chapter 2" in text and "FAIL" in text
