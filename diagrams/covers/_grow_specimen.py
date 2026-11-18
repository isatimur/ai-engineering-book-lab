#!/usr/bin/env python3
"""Grow the cover plates from the corpus itself.

Every mark on every plate is one talk. There are as many marks as there are
notes in `01_Videos/`, each placed by its ingest order, coloured by the theme
its note actually carries and sized by how long the talk actually ran. None
of it is decorative. A different corpus grows a different organism, and this
one grows a new mark on the rim every night the ingest runs.

Three natural orders, one per book:

  rosette   phyllotaxis, the packing a sunflower head and a lichen thallus
            both use. Oldest talks dense at the centre, newest at the ruffled
            margin. The corpus drawn as the living thing it is.
  longtail  a feather. Barbs ordered by how common their theme is, so the
            ochre mass of Coding Agents forms the body and the rare domains
            attenuate to the tip. The long tail, drawn as anatomy.
  delta     a branching network seen from above. One narrow channel enters at
            the bottom and splits, and splits again, into ten distributaries
            weighted by each theme's real share. The channel is slight; the
            branching is the whole picture.

The plates carry no lettering. `scripts/compose-cover.sh` sets the type from
the titles in `website/src/data/`, because a model that draws well still
spells badly and a cover should not be proofread by hand.

Usage:
  python3 diagrams/covers/_grow_specimen.py           # regrow every plate
  python3 diagrams/covers/_grow_specimen.py --check   # CI gate, no rendering

Growing needs `rsvg-convert` (brew install librsvg). `--check` is pure Python
so it runs anywhere.
"""

from __future__ import annotations

import json
import math
import re
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path

W, H = 1696, 2528
GOLDEN = math.radians(137.50776405)

REPO = Path(__file__).resolve().parent.parent.parent
PLATES = REPO / "diagrams" / "covers" / "plates"
MANIFEST = PLATES / "grown-from.json"

# Which organism each book is. The slugs match the cover filenames, so
# scripts/build-covers.sh finds a plate by the name it already knows.
SPECIMENS: dict[str, str] = {
    "from-copilot-to-colleague": "rosette",
    "the-model-layer-and-the-long-tail": "longtail",
    "the-shape-of-the-work": "delta",
}

# How far the plates may fall behind the corpus before CI complains. The
# ingest adds talks most nights; a gate with no tolerance would fail on
# every corpus pull request until somebody learned to ignore it. Same
# reasoning, and the same number, as diagrams/_update_corpus_counts.py.
TOLERANCE = 0.05

# A naturalist's palette: earth pigments, nothing that looks like a dashboard.
THEME_INK: dict[str, str] = {
    "Coding Agents": "#b4823c",
    "Evals & Reliability": "#788a66",
    "Agent Architecture": "#6b7b8f",
    "Org Design & Leadership": "#a0523d",
    "MCP & Tooling": "#8a7859",
    "RAG & Retrieval": "#5d7868",
    "Models & Inference": "#8f7890",
    "Voice & Realtime": "#c08d4c",
    "Security & Guardrails": "#4c5764",
    "General AI Engineering": "#978f80",
}
FALLBACK_INK = "#8a8275"

FM_THEME = re.compile(r'^\s*-\s*"(.+?)"\s*$')


def read_corpus(repo: Path = REPO) -> list[tuple[str, int]]:
    """Return (primary theme, duration seconds) per note, in ingest order.

    Ingest order is the filename's leading index, the playlist position the
    ingest assigned, so the spiral reads outward in the order the corpus
    actually learned things.

    The theme is the note's FIRST tag. That is deliberately not the same
    measure as `99_Meta/Corpus Stats.md`, which counts every tag on a
    multi-tagged note: Coding Agents is 906 notes as a primary theme and 945
    as a tag. The plates show the primary mix, and `theme_mix` in the
    manifest records which number was drawn so the two cannot be confused.
    """
    out: list[tuple[str, int]] = []
    for note in sorted((repo / "01_Videos").glob("*.md")):
        theme, duration, in_themes = "", 0, False
        with note.open(encoding="utf-8") as fh:
            for lineno, line in enumerate(fh):
                if lineno > 40:
                    break
                if line.startswith("themes:"):
                    in_themes = True
                    continue
                if in_themes:
                    hit = FM_THEME.match(line)
                    if hit and not theme:
                        theme = hit.group(1)
                    elif not line.startswith(("  -", "\t-")):
                        in_themes = False
                if line.startswith("duration_seconds:"):
                    try:
                        duration = int(line.split(":", 1)[1].strip())
                    except ValueError:
                        duration = 0
        out.append((theme, duration))
    return out


def theme_mix(marks: list[tuple[str, int]]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for theme, _ in marks:
        counts[theme or "(untagged)"] = counts.get(theme or "(untagged)", 0) + 1
    return dict(sorted(counts.items(), key=lambda kv: (-kv[1], kv[0])))


def duration_band(marks: list[tuple[str, int]]) -> tuple[int, int]:
    """The 5th and 95th percentile of talk length.

    Clamping to this band stops one four-hour workshop from swallowing its
    neighbours while still letting a long talk read as a bigger mark.
    """
    durations = sorted(d for _, d in marks if d > 0)
    if not durations:
        return 1, 2
    lo = durations[len(durations) // 20]
    hi = durations[-len(durations) // 20]
    return lo, max(hi, lo + 1)


def rosette(marks: list[tuple[str, int]]) -> list[str]:
    """Book 1: a lichen thallus, one scale per talk.

    An early pass made a halftone dot field — evenly pale, hollow in the
    middle, obviously a chart. A thallus is none of those things: it is
    densest at its oldest point, it overlaps itself into a continuous
    surface, and it has a ruffled margin the substrate shows through.
    """
    n = len(marks)
    # Sits low in the frame: the title block owns the top third, and the
    # specimen is the thing you look down at underneath it.
    cx, cy = W / 2.0, 1588.0
    r_max = 556.0
    lo, hi = duration_band(marks)
    span = max(hi - lo, 1)

    body: list[str] = []

    # The substrate: a soft stone wash directly under the organism. An
    # earlier version was offset, which read as a misprinted second copy
    # rather than as the rock it is sitting on.
    stone = []
    for k in range(180):
        a = 2 * math.pi * k / 180
        wobble = 1.0 + 0.075 * math.sin(3 * a + 0.7) + 0.042 * math.sin(7 * a + 2.1)
        rr = r_max * 1.21 * wobble
        stone.append(f"{cx + rr * math.cos(a):.1f},{cy + rr * math.sin(a):.1f}")
    body.append(
        f'<polygon points="{" ".join(stone)}" fill="#cdc3ae" fill-opacity="0.30" '
        f'filter="url(#soften)"/>'
    )

    # The margin: lobed, the way a foliose lichen's edge actually grows.
    rim = []
    for k in range(480):
        a = 2 * math.pi * k / 480
        lobe = 1.0 + 0.052 * math.sin(11 * a) + 0.028 * math.sin(23 * a + 1.3)
        rr = r_max * 1.028 * lobe
        rim.append(f"{cx + rr * math.cos(a):.1f},{cy + rr * math.sin(a):.1f}")
    body.append(
        f'<polygon points="{" ".join(rim)}" fill="#e8dcc4" fill-opacity="0.75" '
        f'stroke="#6b5c43" stroke-width="1.5" stroke-opacity="0.5"/>'
    )

    # Rhizines: the fine anchoring filaments at the edge of a real thallus.
    for k in range(260):
        a = 2 * math.pi * k / 260 + 0.013
        lobe = 1.0 + 0.052 * math.sin(11 * a) + 0.028 * math.sin(23 * a + 1.3)
        r0 = r_max * 1.028 * lobe
        r1 = r0 + 16.0 + 26.0 * abs(math.sin(5 * a + 0.9))
        body.append(
            f'<line x1="{cx + r0 * math.cos(a):.1f}" y1="{cy + r0 * math.sin(a):.1f}" '
            f'x2="{cx + r1 * math.cos(a):.1f}" y2="{cy + r1 * math.sin(a):.1f}" '
            f'stroke="#5e5039" stroke-width="1.15" stroke-opacity="0.42"/>'
        )

    # Nearest-neighbour spacing in a phyllotactic packing is about
    # r_max/sqrt(n). Scales are drawn a little wider than that, so they close
    # into one surface instead of scattering into separate dots.
    spacing = r_max / math.sqrt(n)
    for i, (theme, duration) in enumerate(marks):
        angle = i * GOLDEN
        frac = math.sqrt((i + 0.5) / n)
        x = cx + r_max * frac * math.cos(angle)
        y = cy + r_max * frac * math.sin(angle)
        weight = min(max((duration - lo) / span, 0.0), 1.0)
        size = spacing * (1.08 + 0.16 * frac) * (0.84 + 0.32 * weight)
        ink = THEME_INK.get(theme, FALLBACK_INK)
        # The old centre is darker, the rim younger and paler — how a thallus
        # actually ages outward.
        opacity = 0.95 - 0.26 * frac
        body.append(
            f'<g transform="translate({x:.2f},{y:.2f}) '
            f'rotate({math.degrees(angle) + 90.0:.2f})">'
            f'<ellipse rx="{size * 0.62:.2f}" ry="{size:.2f}" fill="{ink}" '
            f'fill-opacity="{opacity:.2f}" stroke="#2a2016" stroke-width="0.7" '
            f'stroke-opacity="0.38"/></g>'
        )
    return body


def longtail(marks: list[tuple[str, int]]) -> list[str]:
    """Book 2: a feather, one barb per talk.

    An earlier pass packed the marks under a decaying curve and produced
    exactly what that is — an area chart with rounded corners. A feather
    carries the same distribution and is unmistakably alive.
    """
    n = len(marks)
    counts = theme_mix(marks)
    ordered = sorted(marks, key=lambda m: (-counts.get(m[0], 0), m[0], -m[1]))

    # The rachis, a shallow arc from lower left to upper right.
    x0, y0 = 286.0, 2010.0
    x1, y1 = 1430.0, 880.0
    bend = 190.0
    lo, hi = duration_band(marks)
    span = max(hi - lo, 1)

    def spine(t: float) -> tuple[float, float, float]:
        """Point on the rachis and its tangent angle, at fraction t."""
        mx, my = (x0 + x1) / 2 + bend, (y0 + y1) / 2 + bend * 0.42
        x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * mx + t**2 * x1
        y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * my + t**2 * y1
        dx = 2 * (1 - t) * (mx - x0) + 2 * t * (x1 - mx)
        dy = 2 * (1 - t) * (my - y0) + 2 * t * (y1 - my)
        return x, y, math.atan2(dy, dx)

    body: list[str] = []
    per_side = max(n // 2, 1)
    for i, (theme, duration) in enumerate(ordered):
        side = 1.0 if i % 2 == 0 else -1.0
        t = (i // 2 + 0.5) / per_side
        px, py, tangent = spine(t)
        # Vane width: a quick swell near the quill, then a long attenuation.
        vane = 336.0 * (t + 0.06) ** 0.26 * (1.0 - t) ** 1.5
        weight = min(max((duration - lo) / span, 0.0), 1.0)
        # The duration swing narrows toward the tip, so one long talk among
        # the rare themes cannot throw a spike out past the vane.
        length = vane * (0.76 + 0.40 * weight * (1.0 - 0.6 * t))
        # Barbs sweep back toward the tip, as they do on a real feather.
        ang = tangent + side * (math.pi / 2) - side * (0.62 - 0.30 * t)
        ex, ey = px + length * math.cos(ang), py + length * math.sin(ang)
        cxp = px + length * 0.55 * math.cos(ang + side * 0.22)
        cyp = py + length * 0.55 * math.sin(ang + side * 0.22)
        ink = THEME_INK.get(theme, FALLBACK_INK)
        body.append(
            f'<path d="M{px:.1f},{py:.1f} Q{cxp:.1f},{cyp:.1f} {ex:.1f},{ey:.1f}" '
            f'fill="none" stroke="{ink}" stroke-width="{1.15 + 0.95 * (1 - t):.2f}" '
            f'stroke-opacity="{0.60 - 0.14 * t:.2f}" stroke-linecap="round"/>'
        )

    # The quill last, so it sits over the barbs where they meet it.
    pts = [f"{sx:.1f},{sy:.1f}" for sx, sy, _ in (spine(s / 80) for s in range(81))]
    body.append(
        f'<polyline points="{" ".join(pts)}" fill="none" stroke="#5f5139" '
        f'stroke-width="5.5" stroke-opacity="0.72" stroke-linecap="round"/>'
    )
    return body


def delta(marks: list[tuple[str, int]]) -> list[str]:
    """Book 3: a river delta seen from above, one grain of sediment per talk."""
    n = len(marks)
    counts = theme_mix(marks)
    themes = sorted(counts, key=lambda t: -counts[t])

    cx, base_y = W / 2.0, 2206.0
    branches: list[str] = []
    tips: list[tuple[float, float, str]] = []

    def grow(x: float, y: float, ang: float, length: float, width: float,
             depth: int, theme: str) -> None:
        nx, ny = x + length * math.cos(ang), y + length * math.sin(ang)
        branches.append(
            f'<line x1="{x:.1f}" y1="{y:.1f}" x2="{nx:.1f}" y2="{ny:.1f}" '
            f'stroke="#7d6a4c" stroke-width="{width:.2f}" '
            f'stroke-opacity="{min(0.62, 0.20 + width * 0.09):.2f}" '
            f'stroke-linecap="round"/>'
        )
        if depth == 0:
            tips.append((nx, ny, theme))
            return
        for spread in (-1.0, 1.0):
            grow(nx, ny, ang + spread * (0.40 - 0.03 * depth),
                 length * 0.74, width * 0.68, depth - 1, theme)

    # The trunk: one narrow channel, drawn before anything branches.
    trunk_top = base_y - 196.0
    branches.append(
        f'<line x1="{cx:.1f}" y1="{base_y + 120:.0f}" x2="{cx:.1f}" '
        f'y2="{trunk_top:.1f}" stroke="#7d6a4c" stroke-width="7" '
        f'stroke-opacity="0.6" stroke-linecap="round"/>'
    )

    # Angle is shared evenly and only the channel's weight carries the
    # theme's size. Allocating angle by share instead gave Coding Agents 62%
    # of the fan, piled all its sediment on one edge and left the other bare.
    centred: list[str] = []
    for j, theme in enumerate(themes):
        centred.insert(len(centred) // 2 + (j % 2), theme)

    fan = math.radians(164.0)
    for j, theme in enumerate(centred):
        share = counts[theme] / n
        mid = -math.pi / 2 - fan / 2 + fan * (j + 0.5) / len(centred)
        grow(cx, trunk_top, mid, 206.0 + 92.0 * share**0.35,
             3.0 + 8.0 * share**0.5, 5, theme)

    lo, hi = duration_band(marks)
    span = max(hi - lo, 1)

    by_theme: dict[str, list[int]] = {}
    for theme, duration in marks:
        by_theme.setdefault(theme, []).append(duration)
    tips_by_theme: dict[str, list[tuple[float, float]]] = {}
    for x, y, theme in tips:
        tips_by_theme.setdefault(theme, []).append((x, y))

    body = list(branches)
    for theme, durs in by_theme.items():
        spots = tips_by_theme.get(theme) or [(cx, trunk_top)]
        ink = THEME_INK.get(theme, FALLBACK_INK)
        for i, duration in enumerate(durs):
            tx, ty = spots[i % len(spots)]
            a = (i * GOLDEN) % (2 * math.pi)
            rr = 7.0 + 5.4 * math.sqrt(i // len(spots) + 1)
            weight = min(max((duration - lo) / span, 0.0), 1.0)
            size = 5.0 * (0.80 + 0.42 * weight)
            body.append(
                f'<ellipse cx="{tx + rr * math.cos(a):.1f}" '
                f'cy="{ty + rr * math.sin(a) * 0.82:.1f}" '
                f'rx="{size * 0.72:.1f}" ry="{size:.1f}" fill="{ink}" '
                f'fill-opacity="0.80" stroke="#2a2016" stroke-width="0.5" '
                f'stroke-opacity="0.28"/>'
            )
    return body


FORMS = {"rosette": rosette, "longtail": longtail, "delta": delta}


def svg(body: list[str]) -> str:
    """Wrap the marks in the paper the specimen is mounted on."""
    marks = chr(10).join("  " + b for b in body)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
        f'viewBox="0 0 {W} {H}">\n'
        f"  <defs>\n"
        f'    <radialGradient id="paper" cx="50%" cy="56%" r="78%">\n'
        f'      <stop offset="0%" stop-color="#f7f1e4"/>\n'
        f'      <stop offset="62%" stop-color="#f1e9d9"/>\n'
        f'      <stop offset="100%" stop-color="#e3d8c2"/>\n'
        f"    </radialGradient>\n"
        f'    <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">\n'
        f'      <feGaussianBlur stdDeviation="26"/>\n'
        f"    </filter>\n"
        f"  </defs>\n"
        f'  <rect width="{W}" height="{H}" fill="url(#paper)"/>\n'
        f"{marks}\n"
        f"</svg>\n"
    )


def rasterize(src: Path, dst: Path) -> None:
    """Render with rsvg-convert, and only with rsvg-convert.

    ImageMagick will happily accept the .svg and silently render the paper
    gradient as solid black — measured at 65% RMSE against a correct render.
    Whatever else changes here, the raster step must not become `magick
    plate.svg`.
    """
    if not shutil.which("rsvg-convert"):
        raise SystemExit("rsvg-convert is required to grow plates (brew install librsvg)")
    subprocess.run(
        ["rsvg-convert", "-w", str(W), "-h", str(H), str(src), "-o", str(dst)],
        check=True,
    )


def grow_all() -> int:
    marks = read_corpus()
    mix = theme_mix(marks)
    unmapped = [t for t in mix if t not in THEME_INK and t != "(untagged)"]
    if unmapped:
        raise SystemExit(
            f"themes with no ink: {unmapped}. Add them to THEME_INK rather than "
            f"letting them render as undifferentiated grey."
        )

    PLATES.mkdir(parents=True, exist_ok=True)
    for slug, form in SPECIMENS.items():
        svg_path, png_path = PLATES / f"{slug}.svg", PLATES / f"{slug}.png"
        svg_path.write_text(svg(FORMS[form](marks)), encoding="utf-8")
        rasterize(svg_path, png_path)
        print(f"grew {slug:38s} {form:9s} {png_path.stat().st_size // 1024:5d} KB")

    MANIFEST.write_text(
        json.dumps(
            {
                "notes": len(marks),
                "grown_on": date.today().isoformat(),
                "forms": SPECIMENS,
                "theme_mix": mix,
                "note": (
                    "theme_mix counts each note's FIRST theme tag, which is not "
                    "the all-tags tally in 99_Meta/Corpus Stats.md."
                ),
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"\n{len(marks)} marks per plate. Next: scripts/build-covers.sh")
    return 0


def problems(manifest: dict, marks: list[tuple[str, int]]) -> list[str]:
    """Everything wrong with the plates that growing more talks cannot fix."""
    found: list[str] = []
    for slug, form in SPECIMENS.items():
        if not (PLATES / f"{slug}.png").exists():
            found.append(f"{slug}: no grown plate")
        if manifest.get("forms", {}).get(slug) != form:
            found.append(
                f"{slug}: plate was grown as "
                f"{manifest.get('forms', {}).get(slug)!r}, code now says {form!r}"
            )
    for theme in theme_mix(marks):
        if theme not in THEME_INK and theme != "(untagged)":
            found.append(f"theme with no ink, drawn as grey: {theme}")
    return found


def check() -> int:
    if not MANIFEST.exists():
        print(f"FAIL  no manifest at {MANIFEST.relative_to(REPO)}")
        return 1
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    marks = read_corpus()
    now, drawn = len(marks), int(manifest.get("notes", 0))

    found = problems(manifest, marks)
    if found:
        for line in found:
            print(f"FAIL  {line}")
        print(f"\n{len(found)} structural problem(s). Regrow: {Path(__file__).name}")
        return 1

    if not now:
        print("FAIL  no notes in 01_Videos/")
        return 1
    behind = abs(now - drawn) / now
    if behind > TOLERANCE:
        print(
            f"FAIL  the plates were grown from {drawn:,} talks; the corpus holds "
            f"{now:,} — {behind:.1%} apart, tolerance {TOLERANCE:.0%}"
        )
        return 1
    if drawn == now:
        print(f"OK    the plates and the corpus both hold {now:,} talks")
    else:
        print(
            f"OK    plates grown from {drawn:,}, corpus holds {now:,} — "
            f"{behind:.1%} apart, within tolerance {TOLERANCE:.0%}"
        )
    return 0


def main(argv: list[str]) -> int:
    if "--check" in argv:
        return check()
    if argv and argv[0] not in ("--grow", ""):
        print(__doc__)
        return 2
    return grow_all()


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
