"""Panel-median merge of several single-model book-mash judge runs.

book-mash (`~/Dev/LifeOS/book-mash/`) scores the SAME manuscript through one
judge model per run and writes per-run JSON to `.book-mash-runs/<run-id>/`
(scores.json + run.json). Running the same corpus snapshot through N models
gives N directly comparable runs (they share `corpus_snapshot_hash`).

This script collapses those N runs into ONE synthetic consensus run by taking
the MEDIAN score per (unit_id, dim_name) across the models that scored it. The
median cancels any single model's calibration bias (a model that runs hot or
cold on a dimension is out-voted). The output is written in book-mash's own
`.book-mash-runs/<out-id>/{scores.json,run.json}` shape so the EXISTING
`build_judge_scores.py` consumes it unchanged.

NO API / LLM CALLS. Pure local JSON processing. book-mash is never imported or
modified.

──────────────────────────────────────────────────────────────────────────────
WHICH ENTRIES ARE MERGED
A book-mash scores.json carries three layers in `scores[]`:
  • judge-native entries  — the real single-model judgments (`derived == false`
    and `model != "rollup"`). These are what we median:
        humanness / usefulness / claim_defensibility -> unit_id "paragraph:…"
        evidence_density                              -> unit_id "section:…"
        voice / redundancy                            -> unit_id "chapter:…"
  • rollup entries        — chapter/section aggregates re-emitted into scores[]
        with model == "rollup".  (We recompute these ourselves, never median
        them — medianing an aggregate would double-aggregate.)
  • derived entries       — e.g. voice/redundancy broadcast down to paragraphs
        with derived == true.  (Recomputed, never medianed.)
We merge ONLY the judge-native layer, then rebuild rollups + derived broadcasts
from the merged native scores.

ROLLUP METHOD (documented choice)
book-mash rolls paragraph->chapter as a char-count-WEIGHTED mean for the
paragraph-native dims (humanness/usefulness/claim_defensibility) and treats
voice/redundancy as chapter-native (broadcast). The per-run scores.json does
NOT carry per-unit char counts, so a faithful weighted mean is impossible from
the run artifacts alone. We therefore use the SIMPLE (unweighted) MEAN of the
merged native unit scores per (chapter, dim) — and the same simple mean for the
book rollup over chapters. This is the explicitly-sanctioned simple option; it
is consistent across all dims and fully reproducible from scores.json. The only
practical consequence vs. book-mash's weighted rollup is that very long and very
short paragraphs count equally toward a chapter average — a small, transparent
difference, and `build_judge_scores.py` anyway RE-DERIVES the paragraph dims
from the per-unit entries (which we emit faithfully) and only reads
voice/redundancy/n_paragraphs out of our `rollups` block.
"""
from __future__ import annotations

import argparse
import json
import statistics
from datetime import datetime, timezone
from pathlib import Path

# 99_Meta/scripts/ -> parents[2] is the consumer repo root.
_REPO = Path(__file__).resolve().parents[2]
_RUNS_DIR = _REPO / ".book-mash-runs"

DIMS = (
    "humanness",
    "voice",
    "usefulness",
    "evidence_density",
    "claim_defensibility",
    "redundancy",
)

# Minimum models that must have a valid (non-null) score for a unit/dim to emit
# a panel score. With fewer, we emit an error-labelled entry (score null).
MIN_PANEL_VOTES = 2

# Two models disagreeing by more than this on a unit is the "judge disagreement"
# signal printed in the summary.
DISAGREEMENT_THRESHOLD = 20.0


def _label_for(score: float | None) -> str:
    """book-mash 4-band rubric — matches build_judge_scores._label_for exactly."""
    if score is None:
        return "error"
    if score >= 80:
        return "strong"
    if score >= 50:
        return "moderate"
    if score >= 20:
        return "weak"
    return "fail"


def _chapter_slug(unit_id: str) -> str | None:
    """The chapter slug a unit belongs to, regardless of unit granularity.

    paragraph:<slug>#L..   section:<slug>#..   chapter:<slug>  all -> <slug>.
    """
    if ":" not in unit_id:
        return None
    body = unit_id.split(":", 1)[1]
    # strip a trailing #anchor (paragraph line-range or section anchor)
    return body.split("#", 1)[0] or None


def _is_native(entry: dict) -> bool:
    """True for a real single-model judgment (not a rollup/derived aggregate)."""
    return not entry.get("derived", False) and entry.get("model") != "rollup"


# ── Load + index ────────────────────────────────────────────────────────────

def load_run(run_dir: Path) -> dict:
    scores_path = run_dir / "scores.json"
    if not scores_path.exists():
        raise FileNotFoundError(f"no scores.json in {run_dir}")
    data = json.loads(scores_path.read_text(encoding="utf-8"))
    data.setdefault("_run_dir_name", run_dir.name)
    return data


def native_entries(run: dict) -> list[dict]:
    return [s for s in run.get("scores", []) if _is_native(s)]


def model_label(run: dict) -> str:
    """A short model id for this run (from its first native entry, else run_id)."""
    for s in run.get("scores", []):
        if _is_native(s) and s.get("model"):
            return s["model"]
    return run.get("run_id", run.get("_run_dir_name", "unknown"))


def _is_panel_run(run: dict) -> bool:
    """True if this run is itself a merged panel output (has a `panel` block or
    panel-median scores). Such runs must never be fed back into a merge — doing
    so medians a median and double-weights whichever seats survived."""
    if run.get("panel"):
        return True
    return any(
        str(s.get("model", "")).startswith("panel-median:")
        for s in run.get("scores", [])
    )


def auto_detect_runs(runs_dir: Path, want: int) -> list[Path]:
    """The `want` most-recent single-model completed run dirs sharing a single
    (the newest run's) corpus_snapshot_hash. Returns dirs newest-first.

    Ordering is by the run's `finished_at` timestamp, NOT directory name:
    lexical ordering sorts `panel-*` dirs above every `2026-…` run ('p' > '2'),
    which both mis-picked the newest run and let a panel be re-merged into a
    panel. Panel-output dirs are excluded outright.
    """
    candidates: list[tuple[str, str, Path, dict]] = []
    if not runs_dir.exists():
        return []
    for p in runs_dir.iterdir():
        if not (p.is_dir() and (p / "scores.json").exists() and (p / "run.json").exists()):
            continue
        try:
            run = json.loads((p / "run.json").read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            continue
        if run.get("status") != "completed" or _is_panel_run(run):
            continue
        # sort key: finished_at, then dir name as a stable tiebreak
        candidates.append((run.get("finished_at") or "", p.name, p, run))
    if not candidates:
        return []
    candidates.sort(key=lambda t: (t[0], t[1]), reverse=True)  # newest-first
    target_hash = candidates[0][3].get("corpus_snapshot_hash", "")
    same = [p for (_f, _n, p, r) in candidates if r.get("corpus_snapshot_hash", "") == target_hash]
    return same[:want]


# ── Core merge ──────────────────────────────────────────────────────────────

def merge_panel(runs: list[dict]) -> dict:
    """Build the merged scores[] list + a (unit_id, dim) -> stats index.

    Returns {"scores": [...native merged entries...], "stats": {...}} where
    stats maps (unit_id, dim_name) -> {
        per_model: {model: score|None}, valid: [scores], median: float|None,
        spread: float|None, slug: str|None, granularity: str}.
    """
    n = len(runs)
    model_labels = [model_label(r) for r in runs]

    # collect: (unit_id, dim) -> {model_index: entry}
    collected: dict[tuple[str, str], dict[int, dict]] = {}
    for idx, run in enumerate(runs):
        for e in native_entries(run):
            key = (e["unit_id"], e["dim_name"])
            collected.setdefault(key, {})[idx] = e

    merged_scores: list[dict] = []
    stats: dict[tuple[str, str], dict] = {}

    for (unit_id, dim), by_model in sorted(collected.items()):
        per_model: dict[str, float | None] = {}
        valid: list[float] = []
        valid_entries: list[tuple[float, dict]] = []
        for idx in range(n):
            e = by_model.get(idx)
            sc = e.get("score_0_100") if e else None
            per_model[model_labels[idx]] = sc
            if e is not None and sc is not None:
                valid.append(float(sc))
                valid_entries.append((float(sc), e))

        slug = _chapter_slug(unit_id)
        granularity = unit_id.split(":", 1)[0]
        spread = (max(valid) - min(valid)) if len(valid) >= 2 else None

        members = "+".join(_short_model(m) for m in model_labels)
        if len(valid) >= MIN_PANEL_VOTES:
            median = float(statistics.median(valid))
            # Representative reasoning: pick the entry whose score is closest to
            # the median (the "median model"), kept short.
            rep = min(valid_entries, key=lambda t: abs(t[0] - median))[1]
            reasoning = _short_reasoning(rep.get("reasoning", ""), median, valid)
            evidence = _union_evidence(e for _s, e in valid_entries)
            entry = {
                "dim_name": dim,
                "unit_id": unit_id,
                "score_0_100": round(median, 1),
                "label": _label_for(median),
                "reasoning": reasoning,
                "evidence_refs": evidence,
                "model": f"panel-median:{members}",
                "cost_usd": 0.0,
                "derived": False,
            }
        else:
            median = None
            entry = {
                "dim_name": dim,
                "unit_id": unit_id,
                "score_0_100": None,
                "label": "error",
                "reasoning": f"panel: {len(valid)}/{n} models scored",
                "evidence_refs": _union_evidence(e for _s, e in valid_entries),
                "model": f"panel-median:{members}",
                "cost_usd": 0.0,
                "derived": False,
            }

        merged_scores.append(entry)
        stats[(unit_id, dim)] = {
            "per_model": per_model,
            "valid": valid,
            "median": round(median, 1) if median is not None else None,
            "spread": spread,
            "slug": slug,
            "granularity": granularity,
        }

    return {"scores": merged_scores, "stats": stats, "model_labels": model_labels}


def _short_model(model: str) -> str:
    """openrouter:deepseek/deepseek-chat -> deepseek-chat (compact panel id)."""
    return model.split("/")[-1].split(":")[-1]


def _short_reasoning(reasoning: str, median: float, valid: list[float]) -> str:
    """Median model's reasoning, prefixed with the panel provenance, truncated."""
    spread = (max(valid) - min(valid)) if len(valid) >= 2 else 0.0
    prefix = f"panel-median {median:.0f} (n={len(valid)}, spread {spread:.0f}): "
    body = (reasoning or "").strip().replace("\n", " ")
    budget = 400
    if len(body) > budget:
        body = body[: budget - 1].rstrip() + "…"
    return prefix + body


def _union_evidence(entries) -> list[str]:
    seen: list[str] = []
    for e in entries:
        for ref in e.get("evidence_refs", []) or []:
            if ref not in seen:
                seen.append(ref)
    return seen


# ── Rollups ─────────────────────────────────────────────────────────────────

def build_rollups(merged_scores: list[dict]) -> dict:
    """Recompute book + per-chapter rollups as the SIMPLE MEAN of merged native
    unit scores per (chapter, dim) — see the module docstring for why simple
    mean (no per-unit char weights exist in scores.json). For each dimension a
    chapter's value is the mean of that dim's non-null merged unit scores that
    fall in the chapter; the book value is the mean over chapters that have a
    value. n_paragraphs counts the chapter's merged paragraph-granular units."""
    # chapter slug -> dim -> [scores];  plus paragraph-unit counts per chapter
    per_chapter: dict[str, dict[str, list[float]]] = {}
    para_units: dict[str, set[str]] = {}

    for e in merged_scores:
        slug = _chapter_slug(e["unit_id"])
        if slug is None:
            continue
        # Count paragraph-granular units regardless of score, BEFORE the
        # null-score skip below: a paragraph that fell to a panel-error
        # (< MIN_PANEL_VOTES valid votes -> null score) is still a real
        # paragraph in the chapter and must count toward n_paragraphs, or the
        # published scorecard undercounts the chapter's paragraphs.
        if e["unit_id"].startswith("paragraph:"):
            para_units.setdefault(slug, set()).add(e["unit_id"])
        sc = e.get("score_0_100")
        if sc is None:
            continue
        per_chapter.setdefault(slug, {}).setdefault(e["dim_name"], []).append(float(sc))

    rollups: dict[str, dict] = {}
    for slug, dims in sorted(per_chapter.items()):
        chap: dict[str, float | int] = {}
        for d in DIMS:
            vals = dims.get(d, [])
            if vals:
                chap[d] = round(sum(vals) / len(vals), 1)
        if slug in para_units:
            chap["n_paragraphs"] = len(para_units[slug])
        rollups[f"chapter:{slug}"] = chap

    # Book = mean over chapters that have a value for the dim.
    book: dict[str, float] = {}
    for d in DIMS:
        vals = [
            rollups[c][d]
            for c in rollups
            if c != "book" and d in rollups[c]
        ]
        if vals:
            book[d] = round(sum(vals) / len(vals), 1)
    rollups["book"] = book
    return rollups


def _book_from_native(entries: list[dict]) -> dict:
    """Per-model book rollup using the same simple-mean method as the panel:
    chapter mean of native unit scores per dim, then mean over chapters. Used
    only for the side-by-side spread display (not written to output)."""
    rollups = build_rollups(entries)
    return rollups.get("book", {})


# ── Assemble synthetic run ──────────────────────────────────────────────────

def assemble_output(runs: list[dict], merged: dict, out_id: str) -> tuple[dict, dict]:
    """Return (scores_json, run_json) for the synthetic panel run."""
    model_labels = merged["model_labels"]
    hashes = {r.get("corpus_snapshot_hash") for r in runs}
    if len(hashes) > 1:
        raise ValueError(
            "input runs do NOT share a corpus_snapshot_hash; they are not "
            f"comparable: {hashes}"
        )
    snapshot_hash = next(iter(hashes))
    member_run_ids = [r.get("run_id", r.get("_run_dir_name")) for r in runs]
    total_cost = round(sum(float(r.get("total_cost_usd") or 0.0) for r in runs), 6)

    rollups = build_rollups(merged["scores"])
    now = datetime.now(timezone.utc).isoformat()

    panel_block = {
        "models": model_labels,
        "member_runs": member_run_ids,
        "method": "median-per-unit-per-dim",
        "min_votes": MIN_PANEL_VOTES,
    }

    scores_json = {
        "run_id": out_id,
        "corpus_snapshot_hash": snapshot_hash,
        "book_mash_version": runs[0].get("book_mash_version"),
        "dim_registry_version": runs[0].get("dim_registry_version"),
        "started_at": now,
        "finished_at": now,
        "total_cost_usd": total_cost,
        "status": "completed",
        "panel": panel_block,
        "rollups": rollups,
        "scores": merged["scores"],
    }
    run_json = {
        "run_id": out_id,
        "corpus_snapshot_hash": snapshot_hash,
        "book_mash_version": runs[0].get("book_mash_version"),
        "dim_registry_version": runs[0].get("dim_registry_version"),
        "started_at": now,
        "finished_at": now,
        "total_cost_usd": total_cost,
        "status": "completed",
        "panel": panel_block,
        "rollups": rollups,
    }
    return scores_json, run_json


# ── Summary ─────────────────────────────────────────────────────────────────

def summarize(runs: list[dict], merged: dict, scores_json: dict) -> str:
    """Side-by-side per-model book scores, the panel median, and the per-dim
    count of units where models disagreed by > DISAGREEMENT_THRESHOLD."""
    model_labels = merged["model_labels"]
    short = [_short_model(m) for m in model_labels]
    lines: list[str] = []
    lines.append(f"PANEL MERGE  ({len(runs)} models)  ->  run_id {scores_json['run_id']}")
    lines.append(f"corpus_snapshot_hash {scores_json['corpus_snapshot_hash']}")
    lines.append(f"total_cost_usd {scores_json['total_cost_usd']}")
    lines.append("")

    # Per-model book rollups computed with the SAME simple-mean method as the
    # panel (from each run's own native scores), so the columns are apples-to-
    # apples with the PANEL column and reveal the true spread the panel collapsed
    # — even if an input run carried a stale rollups.book forward.
    per_model_book = [
        _book_from_native(native_entries(r)) for r in runs
    ]
    book_panel = scores_json["rollups"].get("book", {})
    header = f"{'dimension':<22}" + "".join(f"{s:>14}" for s in short) + f"{'PANEL':>14}{'disagree>20':>14}"
    lines.append(header)
    lines.append("-" * len(header))

    # disagreement counts per dim from stats spread
    disagree: dict[str, int] = {d: 0 for d in DIMS}
    for (_uid, dim), st in merged["stats"].items():
        if st["spread"] is not None and st["spread"] > DISAGREEMENT_THRESHOLD:
            disagree[dim] = disagree.get(dim, 0) + 1

    for d in DIMS:
        row = f"{d:<22}"
        for pmb in per_model_book:
            v = pmb.get(d)
            row += f"{(f'{v:.1f}' if isinstance(v, (int, float)) else '—'):>14}"
        pv = book_panel.get(d)
        row += f"{(f'{pv:.1f}' if isinstance(pv, (int, float)) else '—'):>14}"
        row += f"{disagree.get(d, 0):>14}"
        lines.append(row)

    lines.append("")
    total_disagree = sum(disagree.values())
    lines.append(
        f"judge-disagreement signal: {total_disagree} unit/dim pairs where models "
        f"spread > {DISAGREEMENT_THRESHOLD:.0f} pts (per-dim counts in the table)."
    )
    n_units = len(scores_json["scores"])
    n_err = sum(1 for s in scores_json["scores"] if s["score_0_100"] is None)
    lines.append(f"merged units: {n_units}  (panel-error / <{MIN_PANEL_VOTES} votes: {n_err})")
    return "\n".join(lines)


# ── CLI ─────────────────────────────────────────────────────────────────────

def run(run_ids: list[str] | None, out_id: str, n_auto: int, runs_dir: Path,
        write: bool = True) -> dict:
    if run_ids:
        run_dirs = [runs_dir / rid for rid in run_ids]
    else:
        run_dirs = auto_detect_runs(runs_dir, n_auto)
        if not run_dirs:
            raise SystemExit(f"no completed runs auto-detected in {runs_dir}")
    runs = [load_run(d) for d in run_dirs]
    if len(runs) < MIN_PANEL_VOTES:
        raise SystemExit(
            f"need >= {MIN_PANEL_VOTES} runs to form a panel, got {len(runs)}"
        )

    merged = merge_panel(runs)
    scores_json, run_json = assemble_output(runs, merged, out_id)
    summary = summarize(runs, merged, scores_json)
    print(summary)

    if write:
        out_dir = runs_dir / out_id
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / "scores.json").write_text(
            json.dumps(scores_json, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        (out_dir / "run.json").write_text(
            json.dumps(run_json, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        print(f"\nwrote {out_dir / 'scores.json'}")
        print(f"wrote {out_dir / 'run.json'}")
    return {"scores_json": scores_json, "run_json": run_json, "merged": merged,
            "summary": summary}


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument(
        "--runs", nargs="+", default=None,
        help="explicit run-ids (dir names under .book-mash-runs/) to merge. "
        "If omitted, auto-detects the N most-recent completed runs sharing the "
        "same corpus_snapshot_hash.",
    )
    ap.add_argument("--out", required=True, help="synthetic output run-id (dir name)")
    ap.add_argument("--n-auto", type=int, default=3,
                    help="how many recent runs to auto-detect when --runs omitted")
    ap.add_argument("--runs-dir", default=str(_RUNS_DIR))
    args = ap.parse_args(argv)
    run(args.runs, args.out, args.n_auto, Path(args.runs_dir), write=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
