"""Measure audio against ACX technical thresholds."""
from __future__ import annotations

import re
import subprocess
from dataclasses import dataclass
from pathlib import Path

RMS_MIN, RMS_MAX = -23.0, -18.0
PEAK_MAX = -3.0
NOISE_MAX = -60.0


@dataclass
class AudioMetrics:
    rms_db: float
    peak_db: float
    noise_db: float


def _grab(pattern: str, text: str) -> float:
    m = re.search(pattern + r":\s*(-?\d+(?:\.\d+)?)", text)
    if not m:
        raise ValueError(f"could not parse '{pattern}' from astats output")
    return float(m.group(1))


def parse_astats(stderr: str) -> AudioMetrics:
    return AudioMetrics(
        rms_db=_grab(r"RMS level dB", stderr),
        peak_db=_grab(r"Peak level dB", stderr),
        noise_db=_grab(r"Noise floor dB", stderr),
    )


def check_acx(m: AudioMetrics) -> list[str]:
    fails = []
    if not (RMS_MIN <= m.rms_db <= RMS_MAX):
        fails.append(f"RMS {m.rms_db} dB outside [{RMS_MIN}, {RMS_MAX}]")
    if m.peak_db > PEAK_MAX:
        fails.append(f"Peak {m.peak_db} dB exceeds {PEAK_MAX}")
    if m.noise_db > NOISE_MAX:
        fails.append(f"Noise floor {m.noise_db} dB exceeds {NOISE_MAX}")
    return fails


def astats_cmd(src: Path) -> list[str]:
    return ["ffmpeg", "-i", str(src), "-af", "astats=metadata=1", "-f", "null", "-"]


def measure(src: Path) -> AudioMetrics:
    proc = subprocess.run(astats_cmd(src), capture_output=True, text=True)
    return parse_astats(proc.stderr)


def write_report(results, dst: Path) -> Path:
    lines = ["# Audiobook QA Report (ACX thresholds)", ""]
    passed = 0
    for title, m, fails in results:
        status = "PASS" if not fails else "FAIL"
        passed += 1 if not fails else 0
        lines.append(f"## {title} — {status}")
        lines.append(f"- RMS: {m.rms_db} dB | Peak: {m.peak_db} dB | Noise: {m.noise_db} dB")
        for f in fails:
            lines.append(f"- ⚠️ {f}")
        lines.append("")
    lines.insert(1, f"\n{passed}/{len(results)} files pass.\n")
    Path(dst).write_text("\n".join(lines), encoding="utf-8")
    return Path(dst)
