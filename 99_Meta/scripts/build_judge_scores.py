"""Extract a committed, bundle-able judge-scores.json by merging MASH runs.

MASH (`~/Dev/LifeOS/book-mash/`) writes per-run JSON into `.book-mash-runs/`
(gitignored). The website cannot read that at deploy time, so this script
distills the completed runs into `website/src/data/judge-scores.json` — the same
committed-extract pattern as build_evidence.py -> evidence.json.

CROSS-RUN MERGE (default): MASH "warm" runs only re-judge the chapters whose
text changed that run, so a single warm run's scores.json covers only those
chapters (and often omits the chapter-native dims voice/redundancy elsewhere).
Reading one run alone therefore leaves most chapters' detail null/dropped. To
fix that durably, this script assembles a COMPLETE canonical across all
completed runs, newest-first: each chapter takes its most-recent real
measurement (its primary run), and any chapter-native dim still null is carried
forward from the next-older run that emitted it. So warm runs now yield complete
canonicals — no full cold re-judge needed just for per-chapter completeness.

Ships rollups + per-dim labels + ship-blockers + weakest-N paragraphs (with
pre-resolved prose excerpts) rather than the full per-paragraph ledger, keeping
the bundle small. Keyed by zero-padded chapter number to match bookChapters.ts.

Skip-and-fallback: if `.book-mash-runs/` is absent (it is on Vercel — gitignored),
the script prints a notice and leaves the committed artifact untouched, so the
prebuild chain never fails in CI.
"""
import argparse
import hashlib
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

# ── Substantive-usefulness rollup ───────────────────────────────────────────
# The usefulness judge scores *every* prose paragraph for operational density,
# so it floors connective tissue — transitions, scene-setters, recaps, the
# reflective register — which is structurally part of any narrative chapter.
# The headline `usefulness` rollup keeps counting all of it (honest floor); the
# parallel `usefulness_substantive` rollup isolates the operational core by
# dropping two identifiable, non-operational-by-design categories:
#   1. markdown headings mis-split into prose units (## … scored as a paragraph)
#   2. SHORT connective bridges — floored (<50), brief, and named by the judge's
#      own rationale as a structural/rhetorical move rather than a content gap.
# The conjunction (floored AND short AND judge-named-structural) is deliberately
# conservative: a *long* low-usefulness paragraph is real filler and keeps
# counting (and is a manuscript-edit target, not a metric exclusion).
_SUBSTANTIVE_MAX_WORDS = 45
_CONNECTIVE_MARKERS = (
    "transition", "transitional", "scene-setting", "scene setting",
    "narrative bridge", "frames the", "framing", "rhetorical", "sets up",
    "set up", "setup", "sets the stage", "recap", "signpost", "connective",
    "reflective", "meta-commentary", "meta commentary", "introduces",
    "introduction", "opening", "thesis", "motivat", "context-setting",
    "closes the chapter", "pivot", "aphoris",
)


def _word_count(text: str) -> int:
    return len(re.findall(r"[A-Za-z0-9']+", text))


def _is_heading_unit(text: str) -> bool:
    """A markdown heading mis-scored as a prose paragraph (parsing artifact)."""
    return text.lstrip().startswith("#")


def _is_connective_usefulness(score: float | None, text: str, reasoning: str) -> bool:
    """Short, floored paragraph the judge's rationale names as structural."""
    if score is None or score >= 50:
        return False
    if _word_count(text) > _SUBSTANTIVE_MAX_WORDS:
        return False
    low = reasoning.lower()
    return any(m in low for m in _CONNECTIVE_MARKERS)


def _head_sha() -> str | None:
    try:
        out = subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            cwd=_REPO, capture_output=True, text=True, check=True,
        )
        return out.stdout.strip() or None
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


def _completed_runs(runs_dir: Path) -> list[Path]:
    """All run dirs with a completed status, newest-first (lexical recency).

    Used by the cross-run merge: each chapter takes its newest *actual*
    measurement, so warm runs (which only re-judge changed chapters) still
    yield a complete canonical by carrying older chapters forward.
    """
    if not runs_dir.exists():
        return []
    out: list[Path] = []
    for p in sorted(runs_dir.iterdir(), reverse=True):
        if not (p.is_dir() and (p / "scores.json").exists()):
            continue
        try:
            run = json.loads((p / "run.json").read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            continue
        if run.get("status") == "completed":
            out.append(p)
    return out


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
    """Return (resolve_fn, full_fn, wrapper_boundary_line) for a chapter's
    drafting file. `resolve` yields a 160-char excerpt for display; `full`
    yields the untruncated paragraph text for classification (word count,
    heading detection)."""
    fname = NUMBER_TO_DRAFTING.get(number)
    lines: list[str] = []
    if fname:
        path = _DRAFTING / fname
        if path.exists():
            lines = path.read_text(encoding="utf-8").splitlines()
    boundary = _wrapper_boundary(lines)

    def full(start: int, end: int) -> str:
        if not lines:
            return ""
        return " ".join(
            ln.strip() for ln in lines[max(0, start - 1):end] if ln.strip()
        )

    def resolve(start: int, end: int) -> str:
        chunk = full(start, end)
        return (chunk[:160] + "…") if len(chunk) > 160 else chunk

    return resolve, full, boundary


def _load_scores(run_dir: Path) -> dict:
    return json.loads((run_dir / "scores.json").read_text(encoding="utf-8"))


def _units_by_chapter(scores: dict) -> dict[str, list[dict]]:
    """Group per-unit paragraph scores by chapter slug (carries the regex match)."""
    by_chapter: dict[str, list[dict]] = {}
    for s in scores.get("scores", []):
        m = _UNIT.match(s.get("unit_id", ""))
        if not m:
            continue  # chapter/section-level units handled via rollups
        by_chapter.setdefault(m.group("slug"), []).append({**s, "_m": m})
    return by_chapter


def _chapter_fingerprint(scores: dict, slug: str) -> str | None:
    """Stable hash of a chapter's *measurement* in one run: its prose-paragraph
    per-unit scores + reasoning, plus the chapter-native voice/redundancy rollup.

    MASH warm runs carry prior state forward verbatim, so a chapter's
    fingerprint is identical across runs until the run that actually re-judged
    it changes a value. The newest run whose fingerprint differs from the
    next-older run is therefore the chapter's most-recent real measurement —
    the only reliable per-chapter "judged this run" signal in the artifacts
    (the rollup voice/redundancy *keys* lag, as warm runs propagate them)."""
    if f"chapter:{slug}" not in scores.get("rollups", {}):
        return None
    UNIT = _UNIT
    items: list[tuple] = []
    for s in scores.get("scores", []):
        m = UNIT.match(s.get("unit_id", ""))
        if m and m.group("slug") == slug:
            items.append(
                (s["unit_id"], s["dim_name"], repr(s.get("score_0_100")),
                 repr(s.get("reasoning", ""))[:80])
            )
    roll = scores.get("rollups", {}).get(f"chapter:{slug}", {})
    items.append(("__roll_voice__", repr(roll.get("voice"))))
    items.append(("__roll_redundancy__", repr(roll.get("redundancy"))))
    items.sort()
    return hashlib.md5(repr(items).encode("utf-8")).hexdigest()


def _assemble_chapter(scores: dict, slug: str, num: str, version_id: str | None) -> dict | None:
    """Build one chapter's committed record from ONE run's scores.json.

    Identical scoring semantics to the original single-run path: wrapper-boundary
    exclusion, prose-only paragraph rollups, chapter-native dims from the run
    rollup, substantive-usefulness re-average, ship-blockers, weakest-N. Returns
    None if this run has no rollup for the chapter."""
    rollups = scores.get("rollups", {})
    roll = rollups.get(f"chapter:{slug}")
    if roll is None:
        return None  # chapter not in this run

    resolve, full_text, boundary = _excerpt_resolver(num)
    all_units = _units_by_chapter(scores).get(slug, [])

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

    # Substantive-usefulness rollup: re-average usefulness over the
    # operational core, dropping headings + short connective bridges (see
    # the classifiers above). `usefulness` stays the honest all-paragraph
    # floor; `usefulness_substantive` and its excluded count sit beside it.
    use_units = [
        u for u in units
        if u["dim_name"] == "usefulness" and u.get("score_0_100") is not None
    ]
    subst_vals = []
    excluded = 0
    for u in use_units:
        m = u["_m"]
        text = full_text(int(m.group("start")), int(m.group("end")))
        sc = u["score_0_100"]
        if _is_heading_unit(text) or _is_connective_usefulness(sc, text, u.get("reasoning", "")):
            excluded += 1
        else:
            subst_vals.append(sc)
    rollup["usefulness_substantive"] = (
        round(sum(subst_vals) / len(subst_vals), 1) if subst_vals else None
    )
    rollup["usefulness_connective"] = excluded
    rollup["usefulness_total"] = len(use_units)

    labels = {d: _label_for(rollup[d]) for d in DIMS}

    return {
        "slug": slug,
        "version_id": version_id,
        "corpus_snapshot_hash": scores.get("corpus_snapshot_hash"),
        # Additive provenance: the run this chapter's primary data came from.
        # (Website ignores unknown keys; existing fields are unchanged.)
        "primary_run_id": scores.get("run_id"),
        "rollup": rollup,
        "labels": labels,
        "coverage": coverage,
        "ship_blockers": ship_blockers,
        "weakest": weakest,
    }


def _select_primary_runs(
    completed: list[Path], requested: Path | None
) -> dict[str, Path]:
    """Map each chapter number -> the run dir whose data it should use.

    Default: newest completed run whose per-chapter fingerprint differs from the
    next-older run = its most recent real measurement; oldest run if it never
    changed. When a specific `--run` is requested, that run wins for every
    chapter it contains; remaining chapters fall back to the merge selection."""
    primary: dict[str, Path] = {}
    if not completed:
        return primary

    # Pre-load scores once per run for fingerprinting.
    loaded = {p: _load_scores(p) for p in completed}

    for slug, num in SLUG_TO_NUMBER.items():
        chosen = completed[-1]  # oldest baseline (carry-forward floor)
        for i in range(len(completed) - 1):
            cur, older = completed[i], completed[i + 1]
            fp_cur = _chapter_fingerprint(loaded[cur], slug)
            fp_old = _chapter_fingerprint(loaded[older], slug)
            if fp_cur is None:
                continue
            if fp_cur != fp_old:
                chosen = cur
                break
        primary[num] = chosen

    if requested is not None:
        req_scores = _load_scores(requested)
        for slug, num in SLUG_TO_NUMBER.items():
            if f"chapter:{slug}" in req_scores.get("rollups", {}):
                primary[num] = requested  # requested run wins where it has the chapter
    return primary


def _backfill_native_dims(
    chapter: dict, num: str, slug: str, completed: list[Path],
    primary: Path,
) -> dict:
    """Carry forward null chapter-native dims (voice, redundancy) from the
    next-older completed run that emitted a non-null value for this chapter.

    Each carried dim is recorded additively under `carried_dims` so the
    dashboard can flag that the value is older than the chapter's primary."""
    rollup = chapter["rollup"]
    native_null = [d for d in ("voice", "redundancy") if rollup.get(d) is None]
    if not native_null:
        return chapter

    # Search runs older than the primary, newest-first.
    try:
        start = completed.index(primary) + 1
    except ValueError:
        start = 0
    carried: dict[str, str] = {}
    for older in completed[start:]:
        if not native_null:
            break
        older_scores = _load_scores(older)
        roll = older_scores.get("rollups", {}).get(f"chapter:{slug}", {})
        still_null = []
        for d in native_null:
            val = roll.get(d)
            if val is not None:
                rollup[d] = val
                carried[d] = older_scores.get("run_id") or older.name
            else:
                still_null.append(d)
        native_null = still_null

    if carried:
        # Re-label the dims whose value changed by the carry-forward.
        for d in carried:
            chapter["labels"][d] = _label_for(rollup[d])
        chapter["carried_dims"] = carried
    return chapter


def build(
    completed: list[Path],
    head_sha: str | None,
    requested: Path | None = None,
) -> dict:
    """Assemble a COMPLETE canonical by merging across all completed runs.

    Each chapter takes its most-recent real measurement (primary run); any
    chapter-native dim (voice/redundancy) still null is carried forward from the
    next-older run that emitted it. The book rollup and coverage are recomputed
    from the merged per-chapter rollups, exactly as before."""
    version_id = f"git:{head_sha}" if head_sha else None
    primary = _select_primary_runs(completed, requested)

    # The headline `run` block describes the newest completed run (the build's
    # vantage point); per-chapter provenance lives on each chapter record.
    head_run = requested or (completed[0] if completed else None)
    head_scores = _load_scores(head_run) if head_run is not None else {}

    chapters: dict[str, dict] = {}
    loaded: dict[Path, dict] = {}
    for slug, num in SLUG_TO_NUMBER.items():
        src = primary.get(num)
        if src is None:
            continue
        if src not in loaded:
            loaded[src] = _load_scores(src)
        ch = _assemble_chapter(loaded[src], slug, num, version_id)
        if ch is None:
            continue
        ch = _backfill_native_dims(ch, num, slug, completed, src)
        chapters[num] = ch

    # Book rollup: average the (prose-only, recomputed) chapter rollups so the
    # headline number matches what the dashboard shows per chapter.
    book: dict[str, float | None] = {}
    for d in DIMS:
        vals = [c["rollup"][d] for c in chapters.values() if c["rollup"].get(d) is not None]
        book[d] = round(sum(vals) / len(vals), 1) if vals else None

    # Book substantive usefulness: same chapter-mean treatment as the headline,
    # plus the share of prose paragraphs the substantive rollup set aside.
    sub_vals = [c["rollup"].get("usefulness_substantive") for c in chapters.values()
                if c["rollup"].get("usefulness_substantive") is not None]
    book["usefulness_substantive"] = (
        round(sum(sub_vals) / len(sub_vals), 1) if sub_vals else None
    )
    conn_total = sum(c["rollup"].get("usefulness_connective", 0) for c in chapters.values())
    para_total = sum(c["rollup"].get("usefulness_total", 0) for c in chapters.values())
    book["usefulness_connective"] = conn_total
    book["usefulness_total"] = para_total

    # Aggregate per-dim coverage across the prose units of all chapters, so the
    # dashboard can be honest about partial runs (e.g. rate-limited dimensions).
    coverage: dict[str, dict] = {}
    for d in DIMS:
        scored = sum(c["coverage"][d]["scored"] for c in chapters.values())
        total = sum(c["coverage"][d]["total"] for c in chapters.values())
        coverage[d] = {"scored": scored, "total": total}
    # evidence_density is scored at section granularity (unit_id "section:..."),
    # which the paragraph filter above excludes; count it from each chapter's
    # PRIMARY run so the merged coverage reflects the same provenance as the
    # rollups (dedup by unit_id across primary runs).
    ed_units: dict[str, dict] = {}
    for num, ch in chapters.items():
        src = primary.get(num)
        if src is None:
            continue
        if src not in loaded:
            loaded[src] = _load_scores(src)
        slug = ch["slug"]
        for s in loaded[src].get("scores", []):
            uid = s.get("unit_id", "")
            if s.get("dim_name") == "evidence_density" and slug in uid:
                ed_units[uid] = s
    if ed_units:
        coverage["evidence_density"] = {
            "scored": sum(1 for s in ed_units.values() if s.get("score_0_100") is not None),
            "total": len(ed_units),
        }
    min_cov = min(
        (c["scored"] / c["total"]) for c in coverage.values() if c["total"]
    ) if any(c["total"] for c in coverage.values()) else 1.0
    partial = min_cov < 0.95

    return {
        "schema_version": 1,
        "run": {
            "run_id": head_scores.get("run_id"),
            "corpus_snapshot_hash": head_scores.get("corpus_snapshot_hash"),
            "book_mash_version": head_scores.get("book_mash_version"),
            "dim_registry_version": head_scores.get("dim_registry_version"),
            "finished_at": head_scores.get("finished_at"),
            "total_cost_usd": head_scores.get("total_cost_usd"),
            "status": head_scores.get("status"),
            "dims": DIMS,
            "coverage": coverage,
            "partial": partial,
            # Additive: the runs whose measurements were merged into this build,
            # newest-first, so the dashboard can show cross-run provenance.
            "merged_run_ids": [
                _load_scores(p).get("run_id") or p.name for p in completed
            ],
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
    parser.add_argument(
        "--version-id",
        default=None,
        help="git short-sha to label the run with (default: current HEAD). Use "
        "to preserve the manuscript snapshot a re-run reflects when HEAD has "
        "advanced for unrelated reasons.",
    )
    args = parser.parse_args(argv)

    runs_dir = Path(args.runs)
    completed = _completed_runs(runs_dir)
    if not completed:
        print(
            "[build_judge_scores] no completed MASH run found "
            f"({args.runs} absent or empty) — keeping committed judge-scores.json"
        )
        return 0

    # DEFAULT: merge across all completed runs so warm runs (which re-judge only
    # the chapters that changed) still produce a COMPLETE canonical — each
    # chapter takes its most-recent real measurement, null voice/redundancy
    # carried forward from older runs. `--run <id>` makes that run primary for
    # the chapters it contains; the merge still fills the rest + backfills dims.
    requested: Path | None = None
    if args.run:
        cand = runs_dir / args.run
        if (cand / "scores.json").exists():
            requested = cand
        else:
            print(f"[build_judge_scores] --run {args.run} not found; using merge default")

    data = build(completed, args.version_id or _head_sha(), requested=requested)
    out = Path(args.out)

    # Accumulate a compact per-run history so /quality can plot version-over-version
    # trends. Carry forward any prior history, then upsert this run (keyed by run_id),
    # newest last. Each entry is small (book rollup + per-chapter rollup + metadata).
    prior: list[dict] = []
    if out.exists():
        try:
            prev = json.loads(out.read_text(encoding="utf-8"))
            prior = prev.get("history", []) or []
        except (OSError, json.JSONDecodeError):
            prior = []
    snapshot = {
        "run_id": data["run"]["run_id"],
        "version_id": next(iter(data["chapters"].values()), {}).get("version_id"),
        "finished_at": data["run"]["finished_at"],
        "partial": data["run"]["partial"],
        "book": data["book"],
        "chapters": {n: c["rollup"] for n, c in data["chapters"].items()},
    }
    history = [h for h in prior if h.get("run_id") != snapshot["run_id"]]
    history.append(snapshot)
    history.sort(key=lambda h: h.get("finished_at") or "")
    data["history"] = history

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
