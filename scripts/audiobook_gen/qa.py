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


# astats reports pristine/digital-silence segments (our room tone) as -inf, and
# occasionally nan — so the number grammar must accept those, not just decimals.
_NUM = r"(-?(?:\d+(?:\.\d+)?|inf|nan))"


def _grab(pattern: str, text: str) -> float:
    m = re.search(pattern + r":\s*" + _NUM, text)
    if not m:
        raise ValueError(f"could not parse '{pattern}' from astats output")
    return float(m.group(1))


def _overall_section(stderr: str) -> str:
    """astats prints a per-channel block FIRST, then an 'Overall' block. We want
    the Overall numbers, so slice from the last 'Overall' marker onward — a plain
    first-match search would read the per-channel values instead."""
    idx = stderr.rfind("Overall")
    return stderr[idx:] if idx != -1 else stderr


def parse_astats(stderr: str) -> AudioMetrics:
    section = _overall_section(stderr)
    return AudioMetrics(
        rms_db=_grab(r"RMS level dB", section),
        peak_db=_grab(r"Peak level dB", section),
        noise_db=_grab(r"Noise floor dB", section),
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
    if proc.returncode != 0:
        # A failed ffmpeg run has no astats output; surface the real error
        # instead of a misleading "could not parse" ValueError downstream.
        raise RuntimeError(f"ffmpeg astats failed for {src}:\n{proc.stderr[-2000:]}")
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
