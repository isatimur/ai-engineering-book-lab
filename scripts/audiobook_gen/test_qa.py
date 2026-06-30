from pathlib import Path

from audiobook_gen.qa import parse_astats, check_acx, AudioMetrics, write_report

SAMPLE_ASTATS = """
[Parsed_astats_0 @ 0x] Overall
[Parsed_astats_0 @ 0x] RMS level dB: -20.5
[Parsed_astats_0 @ 0x] Peak level dB: -3.8
[Parsed_astats_0 @ 0x] Noise floor dB: -78.2
"""


def test_parse_astats_extracts_metrics():
    m = parse_astats(SAMPLE_ASTATS)
    assert m.rms_db == -20.5
    assert m.peak_db == -3.8
    assert m.noise_db == -78.2


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
