#!/usr/bin/env python3
"""Re-point the three corpus-count diagrams at `99_Meta/Corpus Stats.md`.

Three diagrams quote the size and shape of the corpus:

  * `04-theme-corpus-map` — a bar chart of every theme, sized by note count
  * `02-autoresearch-machine` — the pipeline, with the corpus as its input
  * `maps/02-methodology-deep-dive` — the same pipeline, in more detail

All three were drawn when the corpus held 794 notes and were never revisited.
`scripts/check_diagram_sync.py` and `scripts/sync-diagrams.sh --check` both
reported them clean, because both ask only whether the PNG is newer than its
`.excalidraw` source. Neither asks whether the source is still *true*. A
diagram can be perfectly in sync and badly wrong, which is the same shape of
defect as a gate that passes without checking anything.

This script closes that gap by deriving the numbers instead of storing them.
Run it after the corpus grows, then render:

    python3 diagrams/_update_corpus_counts.py
    scripts/sync-diagrams.sh

It is idempotent: a second run against an unchanged corpus writes nothing and
exits 0. With --check it writes nothing ever and exits 1 when a diagram has
drifted from the stats file, which makes it usable as a gate.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
STATS = REPO / "99_Meta" / "Corpus Stats.md"

# Where each theme lands in book 1, and which act that chapter belongs to.
#
# A row is five elements that must agree: the bar's fill and outline, the
# theme name, the count, and the chapter label. Reordering rows without
# carrying all five leaves a blue bar wearing a green chapter label. Each act
# therefore owns a full palette, read off the original drawing.
#
# `general` was the one row whose colours already disagreed with themselves:
# a green bar and a green count under a grey "Background" label. The legend
# says background rows are grey, so it is grey here.
ACTS: dict[str, dict[str, str]] = {
    "scaffolding": {  # ch 3-7
        "fill": "#60a5fa",
        "stroke": "#1e3a5f",
        "name": "#1e293b",
        "count": "#1e3a5f",
        "chapter": "#1e3a5f",
    },
    "stress": {  # ch 8
        "fill": "#fef3c7",
        "stroke": "#b45309",
        "name": "#1e293b",
        "count": "#92400e",
        "chapter": "#b45309",
    },
    "widening": {  # ch 9-10
        "fill": "#a7f3d0",
        "stroke": "#047857",
        "name": "#1e293b",
        "count": "#065f46",
        "chapter": "#047857",
    },
    "background": {  # deliberately no chapter
        "fill": "#cbd5e1",
        "stroke": "#64748b",
        "name": "#64748b",
        "count": "#64748b",
        "chapter": "#64748b",
    },
}

BACKGROUND_LABEL = "Background — not a book chapter (by design)"

THEME_MAP: dict[str, tuple[str, str]] = {
    "Coding Agents": ("Chapter 3 · Harnesses, Specs & Codebases", "scaffolding"),
    "Evals & Reliability": ("Chapter 4 · Evals Are the Control System", "scaffolding"),
    "RAG & Retrieval": ("Chapter 5 · Context Is Infrastructure", "scaffolding"),
    "Agent Architecture": ("Chapter 6 · Runtimes, State & Control Plane", "scaffolding"),
    "MCP & Tooling": ("Chapter 7 · Security, Identity & Trust", "scaffolding"),
    "Security & Guardrails": ("Chapter 7 · Security, Identity & Trust", "scaffolding"),
    "Voice & Realtime": (
        "Chapter 8 · Realtime, Voice,\nand the Cost of Being Interruptible",
        "stress",
    ),
    "Org Design & Leadership": ("Chapter 9 · The AI-Native Organization", "widening"),
    "Models & Inference": (BACKGROUND_LABEL, "background"),
    "General AI Engineering": (BACKGROUND_LABEL, "background"),
}

BAR_X = 440.0
BAR_MAX_W = 480.0
COUNT_GAP = 12.0
# A theme with five notes is a 2px sliver at this scale. The bar is drawn with
# a floor so the row stays legible; the printed count beside it carries the
# truth, so the floor cannot mislead anyone who reads the number.
MIN_BAR_W = 4.0


def read_stats(stats_path: Path | None = None) -> tuple[int, dict[str, int]]:
    """Total note count and per-theme counts, from the stats file."""
    stats_file = stats_path or STATS
    text = stats_file.read_text(encoding="utf-8")
    total_match = re.search(r"^- Total notes: (\d+)$", text, re.MULTILINE)
    if not total_match:
        raise SystemExit(f"no 'Total notes' line in {stats_file}")
    total = int(total_match.group(1))

    parts = text.split("## Theme counts", 1)
    if len(parts) != 2:
        raise SystemExit(f"no '## Theme counts' section in {stats_file}")
    # Stop at the next heading. Without this the "Frequent speakers" list below
    # parses as themes, because both sections are `- Name: N`.
    themes_block = re.split(r"^## ", parts[1], maxsplit=1, flags=re.MULTILINE)[0]
    themes = {
        m.group(1): int(m.group(2))
        for m in re.finditer(r"^- (.+?): (\d+)$", themes_block, re.MULTILINE)
    }
    if not themes:
        raise SystemExit(f"no theme counts parsed from {stats_file}")
    return total, themes


def by_id(doc: dict) -> dict[str, dict]:
    return {e["id"]: e for e in doc["elements"]}


def set_field(el: dict, field: str, value, changes: list[str], label: str) -> None:
    if el.get(field) != value:
        changes.append(f"{label}: {el.get(field)!r} -> {value!r}")
        el[field] = value
    # Excalidraw keeps the unwrapped source in `originalText` and the wrapped
    # copy in `text`. Every text element in these three files holds the two
    # identical; writing only one of them leaves the renderer free to pick the
    # stale half.
    if field == "text" and "originalText" in el:
        el["originalText"] = value


def write_doc(path: Path, doc: dict) -> None:
    """Write back in the on-disk format: 2-space indent, raw UTF-8, one newline.

    `ensure_ascii=True` would escape every `·` and `—` in the file and turn a
    six-line change into a whole-file diff.
    """
    path.write_text(
        json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


def update_theme_map(path: Path, total: int, themes: dict[str, int]) -> list[str]:
    doc = json.loads(path.read_text(encoding="utf-8"))
    els = by_id(doc)
    changes: list[str] = []
    pretty = f"{total:,}"

    unknown = sorted(set(themes) - set(THEME_MAP))
    if unknown:
        raise SystemExit(
            f"themes with no chapter mapping: {unknown}\n"
            f"Add them to THEME_MAP in {Path(__file__).name} before rendering."
        )

    rows = sorted(themes.items(), key=lambda kv: (-kv[1], kv[0]))
    if len(rows) > 10:
        raise SystemExit(
            f"{len(rows)} themes but the chart has 10 rows; the diagram needs "
            "new rows drawn before this script can fill them."
        )

    set_field(
        els["t_sub"],
        "text",
        f"What {pretty} videos are actually about — and where "
        "From Copilot to Colleague draws from",
        changes,
        "subtitle",
    )
    set_field(els["corpus_n"], "text", pretty, changes, "headline count")
    set_field(
        els["chart_note"],
        "text",
        "Each bar = videos carrying that theme tag. Videos carry several tags, "
        f"so the counts exceed {pretty}.",
        changes,
        "chart note",
    )

    top = rows[0][1]
    for i, (theme, count) in enumerate(rows, start=1):
        chapter, act = THEME_MAP[theme]
        palette = ACTS[act]
        width = max(round(count / top * BAR_MAX_W, 1), MIN_BAR_W)
        set_field(els[f"nm{i}"], "text", theme, changes, f"row {i} theme")
        set_field(els[f"ct{i}"], "text", str(count), changes, f"row {i} count")
        set_field(els[f"cl{i}"], "text", chapter, changes, f"row {i} chapter")
        set_field(els[f"bar{i}"], "width", width, changes, f"row {i} bar width")
        set_field(els[f"ct{i}"], "x", BAR_X + width + COUNT_GAP, changes, f"row {i} count x")
        set_field(els[f"bar{i}"], "backgroundColor", palette["fill"], changes, f"row {i} bar fill")
        set_field(els[f"bar{i}"], "strokeColor", palette["stroke"], changes, f"row {i} bar stroke")
        set_field(els[f"nm{i}"], "strokeColor", palette["name"], changes, f"row {i} name ink")
        set_field(els[f"ct{i}"], "strokeColor", palette["count"], changes, f"row {i} count ink")
        set_field(els[f"cl{i}"], "strokeColor", palette["chapter"], changes, f"row {i} chapter ink")

    if changes:
        write_doc(path, doc)
    return changes


def update_corpus_mentions(path: Path, total: int, replacements: dict[str, str]) -> list[str]:
    """Rewrite elements that quote the corpus size in prose."""
    doc = json.loads(path.read_text(encoding="utf-8"))
    els = by_id(doc)
    changes: list[str] = []
    pretty = f"{total:,}"
    for element_id, template in replacements.items():
        if element_id not in els:
            raise SystemExit(f"{path.name}: no element {element_id!r}")
        set_field(els[element_id], "text", template.format(n=pretty), changes, element_id)
    if changes:
        write_doc(path, doc)
    return changes


def printed_rows(path: Path) -> list[dict]:
    """What the chart currently shows, row by row, top to bottom."""
    els = by_id(json.loads(path.read_text(encoding="utf-8")))
    rows = []
    for i in range(1, 11):
        count = els[f"ct{i}"]["text"].replace(",", "").strip()
        rows.append(
            {
                "theme": els[f"nm{i}"]["text"],
                "count": int(count) if count.isdigit() else None,
                "chapter": els[f"cl{i}"]["text"],
                "fill": els[f"bar{i}"]["backgroundColor"],
                "bar_stroke": els[f"bar{i}"]["strokeColor"],
                "name_ink": els[f"nm{i}"]["strokeColor"],
                "count_ink": els[f"ct{i}"]["strokeColor"],
                "chapter_ink": els[f"cl{i}"]["strokeColor"],
            }
        )
    return rows


def structural_problems(path: Path, themes: dict[str, int], tolerance: float) -> list[str]:
    """Ways the chart's SHAPE disagrees with the corpus, as opposed to its lag.

    Judged from the drawing and the stats file, never from a diff of what a
    rewrite would change. The first version of this check compared change
    labels, and so called any row swap structural — including the near-ties
    that the nightly ingest produces on its own. Evals & Reliability and Agent
    Architecture sit four notes apart; four more talks would have reordered
    the chart, failed the gate on an unrelated corpus PR, and opened an issue
    a night until someone re-rendered a picture that was not wrong.

    So a swap counts as structural only once the ranking is wrong by more than
    the tolerance. A mislabelled or miscoloured row counts at any tolerance,
    because no amount of waiting makes it right.
    """
    rows = printed_rows(path)
    problems: list[str] = []

    drawn = [r["theme"] for r in rows]
    if sorted(drawn) != sorted(themes):
        missing = sorted(set(themes) - set(drawn))
        extra = sorted(set(drawn) - set(themes))
        if missing:
            problems.append(f"themes in the corpus but not on the chart: {missing}")
        if extra:
            problems.append(f"themes on the chart but not in the corpus: {extra}")
        return problems  # Row-by-row checks below assume the same ten themes.

    for i, row in enumerate(rows, start=1):
        chapter, act = THEME_MAP[row["theme"]]
        palette = ACTS[act]
        if row["chapter"] != chapter:
            problems.append(
                f"row {i} ({row['theme']}) points at {row['chapter']!r}, not {chapter!r}"
            )
        for field, want in (
            ("fill", palette["fill"]),
            ("bar_stroke", palette["stroke"]),
            ("name_ink", palette["name"]),
            ("count_ink", palette["count"]),
            ("chapter_ink", palette["chapter"]),
        ):
            if row[field] != want:
                problems.append(
                    f"row {i} ({row['theme']}) {field} is {row[field]}, not {want} for {act}"
                )

    for upper, lower in zip(rows, rows[1:]):
        above, below = themes[upper["theme"]], themes[lower["theme"]]
        if below > above * (1 + tolerance):
            problems.append(
                f"{lower['theme']} ({below}) is drawn below {upper['theme']} ({above}); "
                f"the ranking is wrong by more than {tolerance:.0%}"
            )

    return problems


def stated_total(path: Path) -> int | None:
    """The corpus size the theme map currently prints, or None if unreadable."""
    doc = json.loads(path.read_text(encoding="utf-8"))
    text = by_id(doc).get("corpus_n", {}).get("text", "")
    digits = text.replace(",", "").strip()
    return int(digits) if digits.isdigit() else None


def verdict(
    changes: list[str],
    problems: list[str],
    printed: int | None,
    total: int,
    tolerance: float,
) -> tuple[bool, str]:
    """Does this drift fail the gate? Returns (ok, one-line reason).

    Three rules, in order:
      * any structural problem fails, at any tolerance — the chart is making a
        claim the corpus does not support;
      * an unreadable headline fails, because lag cannot be measured;
      * otherwise a numeric lag fails only once the printed total is more than
        `tolerance` behind the real one.
    """
    if problems:
        return False, f"{len(problems)} structural problem(s)"
    if not changes:
        return True, "in sync"
    if printed is None:
        return False, "headline count unreadable"
    behind = abs(total - printed) / total
    if behind > tolerance:
        return False, f"{behind:.1%} behind, tolerance {tolerance:.0%}"
    return True, f"{behind:.1%} behind, within tolerance {tolerance:.0%}"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="report drift without writing; exit 1 if any diagram is stale",
    )
    parser.add_argument(
        "--tolerance",
        type=float,
        default=0.05,
        help=(
            "how far the printed corpus size may fall behind the real one "
            "before --check fails, as a fraction (default: 0.05). The corpus "
            "grows nightly; a gate that failed on every new note would be "
            "routed around within a week. Structural drift fails regardless."
        ),
    )
    args = parser.parse_args()

    total, themes = read_stats()

    plan = [
        (REPO / "diagrams" / "04-theme-corpus-map.excalidraw", None),
        (
            REPO / "diagrams" / "02-autoresearch-machine.excalidraw",
            {
                "t_sub": "How a {n}-video corpus becomes a source-backed book",
                "input_t": "AI Engineer YouTube channel\n{n}-video corpus",
                "p_l1_1t": "01_Videos/  ·  {n} video notes",
            },
        ),
        (
            REPO / "diagrams" / "maps" / "02-methodology-deep-dive.excalidraw",
            {
                "input_t": "AI Engineer YouTube channel\n"
                "{n}-video corpus  ·  ground truth, kept stable",
                "p_l1a_t": "01_Videos/   ·   {n} video notes",
            },
        ),
    ]

    if args.check:
        # Work on copies: load, mutate in memory, compare, never write.
        import shutil
        import tempfile

        with tempfile.TemporaryDirectory() as tmp:
            stale = []
            for path, replacements in plan:
                copy = Path(tmp) / path.name
                shutil.copy(path, copy)
                changes = (
                    update_corpus_mentions(copy, total, replacements)
                    if replacements
                    else update_theme_map(copy, total, themes)
                )
                if changes:
                    stale.append((path, changes))
            if not stale:
                print(f"all 3 corpus diagrams agree with {STATS.name} ({total:,} notes).")
                return 0

            for path, changes in stale:
                print(f"DRIFT  {path.relative_to(REPO)}")
                for change in changes:
                    print(f"         {change}")

            all_changes = [c for _, cs in stale for c in cs]
            theme_map_path = plan[0][0]
            printed = stated_total(theme_map_path)
            problems = structural_problems(theme_map_path, themes, args.tolerance)
            ok, reason = verdict(all_changes, problems, printed, total, args.tolerance)

            print()
            print(
                f"The diagrams print {printed if printed is None else format(printed, ',')} "
                f"notes; the corpus holds {total:,} — {reason}."
            )
            for problem in problems[:8]:
                print(f"  · {problem}")

            if not ok:
                print(
                    "\nFix locally, then commit the sources and the PNGs:\n"
                    "    python3 diagrams/_update_corpus_counts.py\n"
                    "    scripts/sync-diagrams.sh"
                )
                return 1

            print("\nBehind, but not wrong. Not failing.")
            return 0

    touched = 0
    for path, replacements in plan:
        changes = (
            update_corpus_mentions(path, total, replacements)
            if replacements
            else update_theme_map(path, total, themes)
        )
        if changes:
            touched += 1
            print(f"updated  {path.relative_to(REPO)}")
            for change in changes:
                print(f"           {change}")
        else:
            print(f"current  {path.relative_to(REPO)}")

    print(f"\n{touched} diagram source(s) rewritten for {total:,} notes.")
    if touched:
        print("Now run: scripts/sync-diagrams.sh")
    return 0


if __name__ == "__main__":
    sys.exit(main())
