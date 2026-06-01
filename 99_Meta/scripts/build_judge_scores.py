"""Extract a committed, bundle-able judge-scores.json from the latest MASH run.

MASH (`~/Dev/LifeOS/book-mash/`) writes per-run JSON into `.book-mash-runs/`
(gitignored). The website cannot read that at deploy time, so this script
distills the latest completed run into `website/src/data/judge-scores.json` —
the same committed-extract pattern as build_evidence.py -> evidence.json.

Ships rollups + per-dim labels + ship-blockers + weakest-N paragraphs (with
pre-resolved prose excerpts) rather than the full per-paragraph ledger, keeping
the bundle small. Keyed by zero-padded chapter number to match bookChapters.ts.

Skip-and-fallback: if `.book-mash-runs/` is absent (it is on Vercel — gitignored),
the script prints a notice and leaves the committed artifact untouched, so the
prebuild chain never fails in CI.
"""
import argparse
import json
import re
import subprocess
from pathlib import Path

# 99_Meta/scripts/ -> parents[2] is the repo root.
_REPO = Path(__file__).resolve().parents[2]
_DEFAULT_RUNS = _REPO / ".book-mash-runs"
_DEFAULT_OUT = _REPO / "website" / "src" / "data" / "judge-scores.json"
_DRAFTING = _REPO / "public" / "drafting"

DIMS = [
    "humanness",
    "voice",
    "usefulness",
    "evidence_density",
    "claim_defensibility",
    "redundancy",
]

# MASH chapter slugs are filename-derived; map them to the website's zero-padded
# chapter number. Robust explicit map (update if a chapter is renamed).
SLUG_TO_NUMBER = {
    "chapter-1-the-shift-from-assistant-to-delegate": "01",
    "chapter-2-taste-still-matters-when-code-gets-cheap": "02",
    "chapter-3-harnesses-specs-and-codebases-agents-can-actually-use": "03",
    "chapter-4-evals-are-the-control-system": "04",
    "chapter-5-context-is-infrastructure": "05",
    "chapter-6-runtimes-state-and-the-human-control-plane": "06",
    "chapter-7-security-identity-and-high-stakes-trust": "07",
    "chapter-8-realtime-voice-and-the-cost-of-being-interruptible": "08",
    "chapter-9-the-ai-native-organization": "09",
    "chapter-10-what-endures": "10",
}

# Map a zero-padded number back to its public/drafting filename for excerpt resolution.
NUMBER_TO_DRAFTING = {
    "01": "Chapter 1 - The Shift From Assistant to Delegate.md",
    "02": "Chapter 2 - Taste Still Matters When Code Gets Cheap.md",
    "03": "Chapter 3 - Harnesses Specs and Codebases Agents Can Actually Use.md",
    "04": "Chapter 4 - Evals Are the Control System.md",
    "05": "Chapter 5 - Context Is Infrastructure.md",
    "06": "Chapter 6 - Runtimes, State, and the Human Control Plane.md",
    "07": "Chapter 7 - Security, Identity, and High-Stakes Trust.md",
    "08": "Chapter 8 - Realtime, Voice, and the Cost of Being Interruptible.md",
    "09": "Chapter 9 - The AI-Native Organization.md",
    "10": "Chapter 10 - What Endures.md",
}

WEAKEST_N = 3
_UNIT = re.compile(r"^paragraph:(?P<slug>[a-z0-9-]+)#L(?P<start>\d+)-L(?P<end>\d+)$")


def _head_sha() -> str | None:
    try:
        out = subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            cwd=_REPO, capture_output=True, text=True, check=True,
        )
        return out.stdout.strip() or None
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


def _latest_run(runs_dir: Path, run_id: str | None) -> Path | None:
    if not runs_dir.exists():
        return None
    if run_id:
        cand = runs_dir / run_id
        return cand if (cand / "scores.json").exists() else None
    # Run dirs are <date>-<HHMM>-<hash>, lexically sortable by recency.
    candidates = sorted(
        (p for p in runs_dir.iterdir() if p.is_dir() and (p / "scores.json").exists()),
        reverse=True,
    )
    for p in candidates:
        try:
            run = json.loads((p / "run.json").read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            continue
        if run.get("status") == "completed":
            return p
    return candidates[0] if candidates else None


def _label_for(score: float | None) -> str:
    """MASH 4-band rubric (strong/moderate/weak/fail); error when score is null."""
    if score is None:
        return "error"
    if score >= 80:
        return "strong"
    if score >= 50:
        return "moderate"
    if score >= 20:
        return "weak"
    return "fail"


def _wrapper_boundary(lines: list[str]) -> int:
    """1-based line of the first standalone '---' separator that closes the
    Draft v0 wrapper. Units starting at or before this line are editorial
    scaffolding (draft note + argument arc), not book prose. 0 = no wrapper."""
    for i, ln in enumerate(lines, start=1):
        if ln.strip() == "---":
            return i
    return 0


def _excerpt_resolver(number: str):
    """Return (resolve_fn, wrapper_boundary_line) for a chapter's drafting file."""
    fname = NUMBER_TO_DRAFTING.get(number)
    lines: list[str] = []
    if fname:
        path = _DRAFTING / fname
        if path.exists():
            lines = path.read_text(encoding="utf-8").splitlines()
    boundary = _wrapper_boundary(lines)

    def resolve(start: int, end: int) -> str:
        if not lines:
            return ""
        chunk = " ".join(
            ln.strip() for ln in lines[max(0, start - 1):end] if ln.strip()
        )
        return (chunk[:160] + "…") if len(chunk) > 160 else chunk

    return resolve, boundary


def build(run_dir: Path, head_sha: str | None) -> dict:
    scores = json.loads((run_dir / "scores.json").read_text(encoding="utf-8"))
    rollups = scores.get("rollups", {})
    version_id = f"git:{head_sha}" if head_sha else None

    # Group per-unit scores by chapter slug.
    by_chapter: dict[str, list[dict]] = {}
    for s in scores.get("scores", []):
        m = _UNIT.match(s.get("unit_id", ""))
        if not m:
            continue  # chapter/section-level units handled via rollups
        by_chapter.setdefault(m.group("slug"), []).append({**s, "_m": m})

    chapters: dict[str, dict] = {}
    for slug, num in SLUG_TO_NUMBER.items():
        roll = rollups.get(f"chapter:{slug}")
        if roll is None:
            continue  # chapter not in this run
        resolve, boundary = _excerpt_resolver(num)
        all_units = by_chapter.get(slug, [])

        # Drop units that fall inside the Draft v0 wrapper (editorial scaffolding
        # before the '---' separator) — MASH scores public/drafting/*.md whole,
        # but only the prose body is the published chapter.
        units = [u for u in all_units if int(u["_m"].group("start")) > boundary]

        # de-duplicate paragraph indices in stable order for paragraph_index labelling
        para_order: dict[str, int] = {}
        for u in units:
            key = u["unit_id"]
            if key not in para_order:
                para_order[key] = len(para_order)

        def _enrich(u: dict) -> dict:
            m = u["_m"]
            start, end = int(m.group("start")), int(m.group("end"))
            return {
                "dim_name": u["dim_name"],
                "paragraph_index": para_order[u["unit_id"]],
                "score": u.get("score_0_100"),
                "label": u.get("label") or _label_for(u.get("score_0_100")),
                "reasoning": u.get("reasoning", ""),
                "evidence_refs": u.get("evidence_refs", []),
                "para_excerpt": resolve(start, end),
            }

        ship_blockers = [
            _enrich(u) for u in units
            if u["dim_name"] == "claim_defensibility" and (u.get("label") == "fail")
        ]
        ship_blockers.sort(key=lambda x: (x["score"] if x["score"] is not None else 0))

        weakest: list[dict] = []
        coverage: dict[str, dict] = {}
        for dim in DIMS:
            dim_all = [u for u in units if u["dim_name"] == dim]
            scored = [u for u in dim_all if u.get("score_0_100") is not None]
            coverage[dim] = {"scored": len(scored), "total": len(dim_all)}
            scored.sort(key=lambda u: u["score_0_100"])
            weakest.extend(_enrich(u) for u in scored[:WEAKEST_N])

        # Recompute paragraph-level rollups from prose-only scored units so wrapper
        # paragraphs don't skew the average. Chapter-native dims (voice, redundancy)
        # are not paragraph-decomposable here, so fall back to the run's rollup.
        PARA_DIMS = {"humanness", "usefulness", "claim_defensibility"}
        rollup: dict[str, float | None] = {}
        for d in DIMS:
            if d in PARA_DIMS:
                vals = [u["score_0_100"] for u in units
                        if u["dim_name"] == d and u.get("score_0_100") is not None]
                rollup[d] = round(sum(vals) / len(vals), 1) if vals else None
            else:
                rollup[d] = roll.get(d)
        rollup["n_paragraphs"] = roll.get("n_paragraphs")
        labels = {d: _label_for(rollup[d]) for d in DIMS}

        chapters[num] = {
            "slug": slug,
            "version_id": version_id,
            "corpus_snapshot_hash": scores.get("corpus_snapshot_hash"),
            "rollup": rollup,
            "labels": labels,
            "coverage": coverage,
            "ship_blockers": ship_blockers,
            "weakest": weakest,
        }

    # Book rollup: average the (prose-only, recomputed) chapter rollups so the
    # headline number matches what the dashboard shows per chapter.
    book: dict[str, float | None] = {}
    for d in DIMS:
        vals = [c["rollup"][d] for c in chapters.values() if c["rollup"].get(d) is not None]
        book[d] = round(sum(vals) / len(vals), 1) if vals else None

    # Aggregate per-dim coverage across the prose units of all chapters, so the
    # dashboard can be honest about partial runs (e.g. rate-limited dimensions).
    coverage: dict[str, dict] = {}
    for d in DIMS:
        scored = sum(c["coverage"][d]["scored"] for c in chapters.values())
        total = sum(c["coverage"][d]["total"] for c in chapters.values())
        coverage[d] = {"scored": scored, "total": total}
    # evidence_density is scored at section granularity (unit_id "section:..."),
    # which the paragraph filter above excludes; count it from the raw scores.
    ed_all = [s for s in scores.get("scores", []) if s.get("dim_name") == "evidence_density"]
    if ed_all:
        coverage["evidence_density"] = {
            "scored": sum(1 for s in ed_all if s.get("score_0_100") is not None),
            "total": len(ed_all),
        }
    min_cov = min(
        (c["scored"] / c["total"]) for c in coverage.values() if c["total"]
    ) if any(c["total"] for c in coverage.values()) else 1.0
    partial = min_cov < 0.95

    return {
        "schema_version": 1,
        "run": {
            "run_id": scores.get("run_id"),
            "corpus_snapshot_hash": scores.get("corpus_snapshot_hash"),
            "book_mash_version": scores.get("book_mash_version"),
            "dim_registry_version": scores.get("dim_registry_version"),
            "finished_at": scores.get("finished_at"),
            "total_cost_usd": scores.get("total_cost_usd"),
            "status": scores.get("status"),
            "dims": DIMS,
            "coverage": coverage,
            "partial": partial,
        },
        "book": book,
        "chapters": dict(sorted(chapters.items())),
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Extract website/src/data/judge-scores.json from the latest MASH run."
    )
    parser.add_argument("--runs", default=str(_DEFAULT_RUNS))
    parser.add_argument("--run", default=None, help="specific run_id (default: latest completed)")
    parser.add_argument("--out", default=str(_DEFAULT_OUT))
    args = parser.parse_args(argv)

    run_dir = _latest_run(Path(args.runs), args.run)
    if run_dir is None:
        print(
            "[build_judge_scores] no MASH run found "
            f"({args.runs} absent or empty) — keeping committed judge-scores.json"
        )
        return 0

    data = build(run_dir, _head_sha())
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    n_ch = len(data["chapters"])
    n_blockers = sum(len(c["ship_blockers"]) for c in data["chapters"].values())
    print(
        f"judge-scores.json: run {data['run']['run_id']} -> {n_ch} chapters, "
        f"{n_blockers} ship-blockers, cost ${data['run']['total_cost_usd']}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
