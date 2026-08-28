#!/usr/bin/env python3
"""mash-agent — judge the manuscript using the agent session you are already in.

WHY THIS EXISTS
book-mash judges by calling an LLM API, which needs a funded key
(`ANTHROPIC_API_KEY`, or `OPENROUTER_API_KEY` against a funded account). Inside
Claude Code / Codex / opencode you already have a model — it just is not
reachable as an API. This CLI inverts the control flow: instead of the runner
calling a model, it EMITS judging work as files, the agent judges them, and the
CLI INGESTS the judgments back. No API key, no spend.

WHAT IT IS NOT
This does not reproduce the canonical panel. The published score line
(`panel-3model-v1..v8`) is the median of deepseek-chat / llama-3.3-70b /
qwen-2.5-72b. A run produced here is a DIFFERENT INSTRUMENT — a different judge,
scored once, not medianed. Its numbers are not comparable to that line and must
never be merged into it. Everything below is built to make that mistake hard:

  * runs land in `.mash-agent-runs/`, never `.book-mash-runs/`
  * every run_id is prefixed `agent-`
  * run.json carries `judge_kind: "agent"` and `canonical_panel: false`
  * every score row's `model` field records the harness and model that judged it

WHAT IT REUSES (this is what makes it trustworthy)
Unit segmentation, unit ids, and the corpus snapshot hash come from book-mash's
own `load_chapters` / `compute_snapshot_hash`, and each dimension's rubric is
imported verbatim from its judge module's `_SYSTEM_PROMPT`. So the agent grades
the same units against the same words the API judges see. Nothing is paraphrased
here; if a rubric changes upstream, this CLI follows it automatically.

WORKFLOW
    mash-agent plan --dims usefulness --batch-size 25
    # -> .mash-agent-runs/agent-<snap>-<ts>/batches/batch-001.md ...
    # read a batch, judge every unit, write the JSON array it asks for, then:
    mash-agent ingest --run <id> --batch 1 --from /tmp/judgments-001.json
    mash-agent status --run <id>
    mash-agent finalize --run <id>
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
RUNS_DIR = REPO / ".mash-agent-runs"
BOOK_MASH = Path.home() / "Dev" / "LifeOS" / "book-mash"
# book_mash imports mash_core at package import time; both are plain source
# checkouts, so put each on sys.path rather than requiring the poetry env.
MASH_CORE = Path.home() / "Dev" / "LifeOS" / "mash-core"

VALID_LABELS = ("strong", "moderate", "weak", "fail")


def _ensure_deps_on_path() -> None:
    """Put book-mash, mash-core, and book-mash's virtualenv site-packages on sys.path.

    book-mash pulls pydantic / pydantic_ai at import time and those live in its
    poetry virtualenv, not in system Python. Discovering the venv keeps this CLI
    runnable by whatever interpreter an agent session happens to use, instead of
    forcing every caller through `poetry run`.
    """
    for d in (BOOK_MASH, MASH_CORE):
        if d.is_dir() and str(d) not in sys.path:
            sys.path.insert(0, str(d))
    try:
        import pydantic_ai  # noqa: F401
        return
    except ImportError:
        pass
    venvs = Path.home() / "Library" / "Caches" / "pypoetry" / "virtualenvs"
    for cand in sorted(venvs.glob("book-mash-*")) if venvs.is_dir() else []:
        for sp in cand.glob("lib/python*/site-packages"):
            if str(sp) not in sys.path:
                sys.path.append(str(sp))
    try:
        import pydantic_ai  # noqa: F401
    except ImportError as exc:
        raise SystemExit(
            "book-mash's dependencies are not importable and its poetry venv was "
            f"not found under {venvs}. Run `cd {BOOK_MASH} && poetry install`, or "
            "invoke this CLI with that venv's python."
        ) from exc


def _load_book_mash():
    """Import book-mash so segmentation and rubrics are shared, not reimplemented."""
    _ensure_deps_on_path()
    try:
        from book_mash.corpus.loader import compute_snapshot_hash, load_chapters
    except ImportError as exc:  # pragma: no cover - environment problem, not logic
        raise SystemExit(
            f"cannot import book-mash from {BOOK_MASH}: {exc}\n"
            "mash-agent deliberately reuses book-mash's segmentation and rubrics "
            "so its unit ids match; it will not reimplement them."
        ) from exc
    return load_chapters, compute_snapshot_hash


def _rubric(dim: str) -> str:
    """The dimension's verbatim system prompt, imported from its judge module.

    Imported rather than copied so a rubric change upstream is picked up here
    automatically; a paraphrase would silently make these scores incomparable.
    """
    _ensure_deps_on_path()
    try:
        mod = __import__(f"book_mash.judges.{dim}", fromlist=["_SYSTEM_PROMPT"])
        return mod._SYSTEM_PROMPT
    except (ImportError, AttributeError) as exc:
        raise SystemExit(f"no importable rubric for dim {dim!r}: {exc}") from exc


# Which unit granularity each dimension scores. Mirrors book-mash's dim registry;
# a mismatch here would emit unit ids the API panel never scored, making the two
# incomparable for exactly the reason this tool exists to avoid.
DIM_GRANULARITY = {
    "usefulness": "paragraph",
    "humanness": "paragraph",
    "claim_defensibility": "paragraph",
    "evidence_density": "section",
    "voice": "chapter",
    "redundancy": "chapter",
}

# book-mash hands every judge a `context` payload alongside the unit text
# (measurement.py). A judge that never sees its context is answering a different
# question than the API panel answered, so every dim below assembles the same
# context the runner builds — reusing book-mash's own helpers rather than
# reimplementing them:
#
#   usefulness           chapter_title
#   humanness            surrounding_paragraphs      via _surrounding()
#   claim_defensibility  relevant_ledger             via retrieve_relevant_claims()
#   evidence_density     claims_index                via load_claims_index()
#   voice                voice_baseline_excerpts     via _load_voice_baseline()
#   redundancy           earlier_chapter_summaries   via _summarize_chapter()
#
# All of it is local: lexical retrieval and text assembly, no API calls. The one
# piece not reproduced is redundancy's `candidate_overlap_chapter_ids`, which the
# runner fills from an embedding prefilter — it already degrades to [] when no
# embedder is configured, which is the same value used here.
SUPPORTED_DIMS = set(DIM_GRANULARITY)


def _corpus_config() -> dict:
    """The same [corpus] settings book-mash reads, from book-mash.toml."""
    import tomllib
    cfg = tomllib.loads((REPO / "book-mash.toml").read_text())
    c = dict(cfg.get("corpus", {}))
    if not c.get("chapters_glob"):
        raise SystemExit("book-mash.toml [corpus] has no chapters_glob")
    for k in ("chapters_glob", "claims_dir"):
        if c.get(k) and not Path(c[k]).is_absolute():
            c[k] = str(REPO / c[k])
    return c


def _units(dim: str) -> tuple[str, list[tuple[str, str, dict]]]:
    """(snapshot_hash, [(unit_id, unit_text, context)]) for one dim's granularity.

    Context mirrors what book-mash's runner passes each judge; see SUPPORTED_DIMS.
    """
    load_chapters, compute_snapshot_hash = _load_book_mash()
    from book_mash.corpus.claims_index import load_claims_index
    from book_mash.corpus.claim_retrieval import retrieve_relevant_claims
    from book_mash.runners.measurement import (
        _load_voice_baseline, _summarize_chapter, _surrounding,
    )

    c = _corpus_config()
    chapters = load_chapters(c["chapters_glob"], c.get("skip_sections", []))
    snap = compute_snapshot_hash(chapters)
    gran = DIM_GRANULARITY[dim]

    claims_index = None
    if dim in ("claim_defensibility", "evidence_density"):
        claims_index = load_claims_index(c["claims_dir"])
    baseline = None
    if dim == "voice":
        baseline = _load_voice_baseline(chapters, c.get("voice_baseline_chapters", []))

    def _fmt(v) -> str:
        if isinstance(v, list):
            return "\n\n".join(_fmt(x) for x in v) if v else "(none)"
        return getattr(v, "retrieval_text", lambda: str(v))() if hasattr(v, "retrieval_text") else str(v)

    out: list[tuple[str, str, dict]] = []
    earlier: list[dict] = []
    for ch in chapters:
        if gran == "chapter":
            ctx = {}
            if dim == "voice":
                ctx = {"voice_baseline_excerpts": _fmt(baseline)}
            elif dim == "redundancy":
                ctx = {"earlier_chapter_summaries":
                       _fmt([e["summary"] for e in earlier]) if earlier else "(none - first chapter)",
                       "candidate_overlap_chapter_ids": "[]"}
            out.append((f"chapter:{ch.id}", ch.full_text, ctx))
            earlier.append({"id": ch.id, "summary": _summarize_chapter(ch)})
        elif gran == "section":
            for sec in ch.sections:
                text = "\n\n".join(p.text for p in sec.paragraphs)
                ctx = {"claims_index": _fmt(claims_index)} if dim == "evidence_density" else {}
                out.append((sec.id, text, ctx))
        else:
            for sec in ch.sections:
                for i, para in enumerate(sec.paragraphs):
                    if dim == "usefulness":
                        ctx = {"chapter_title": ch.title}
                    elif dim == "humanness":
                        ctx = {"surrounding_paragraphs": _fmt(_surrounding(sec.paragraphs, i))}
                    elif dim == "claim_defensibility":
                        ctx = {"relevant_ledger": _fmt(retrieve_relevant_claims(para.text, claims_index))}
                    else:
                        ctx = {}
                    out.append((para.id, para.text, ctx))
    return snap, out


def _band(score: float) -> str:
    """MASH's 4-band rubric. Kept identical to build_judge_scores._label_for."""
    if score >= 80:
        return "strong"
    if score >= 50:
        return "moderate"
    if score >= 20:
        return "weak"
    return "fail"


def _run_dir(run_id: str) -> Path:
    d = RUNS_DIR / run_id
    if not d.is_dir():
        raise SystemExit(f"no such run: {d}")
    return d


def cmd_plan(args) -> int:
    dims = [d.strip() for d in args.dims.split(",") if d.strip()]
    for d in dims:
        if d not in DIM_GRANULARITY:
            raise SystemExit(f"unknown dim {d!r}; known: {', '.join(DIM_GRANULARITY)}")

    snap = None
    tasks: list[dict] = []
    for dim in dims:
        snap, units = _units(dim)
        for uid, text, ctx in units:
            tasks.append({"dim_name": dim, "unit_id": uid, "unit_text": text,
                          "context": ctx})

    ts = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    run_id = f"agent-{snap.split(':')[1][:4]}-{ts}"
    d = RUNS_DIR / run_id
    (d / "batches").mkdir(parents=True, exist_ok=True)
    (d / "judgments").mkdir(parents=True, exist_ok=True)

    size = args.batch_size
    batches = [tasks[i:i + size] for i in range(0, len(tasks), size)]
    for n, batch in enumerate(batches, 1):
        _write_batch(d / "batches" / f"batch-{n:03d}.md", n, len(batches), batch, run_id)

    manifest = {
        "run_id": run_id,
        "corpus_snapshot_hash": snap,
        "dims": dims,
        "batch_size": size,
        "n_batches": len(batches),
        "n_units": len(tasks),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "batches": {str(n): [t["unit_id"] + "|" + t["dim_name"] for t in b]
                    for n, b in enumerate(batches, 1)},
    }
    (d / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")

    print(f"run {run_id}")
    print(f"  snapshot   {snap}")
    print(f"  dims       {', '.join(dims)}")
    print(f"  units      {len(tasks)} in {len(batches)} batches of {size}")
    print(f"  batches    {d / 'batches'}")
    print(f"\nNext: read {d / 'batches' / 'batch-001.md'} and follow its instructions.")
    return 0


def _write_batch(path: Path, n: int, total: int, batch: list[dict], run_id: str) -> None:
    """One self-contained judging task: verbatim rubric + units + output contract.

    Self-contained on purpose — an agent should need no other file, and no memory
    of previous batches, to do this correctly.
    """
    dims = sorted({t["dim_name"] for t in batch})
    out = [
        f"# Judging batch {n} of {total} — run `{run_id}`",
        "",
        "You are the judge. Score every unit below and write the result as JSON.",
        "Do not skip units. Do not add units. Judge only what is here.",
        "",
    ]
    for dim in dims:
        out += [f"## Rubric — `{dim}` (verbatim from book-mash)", "", "```", _rubric(dim).strip(), "```", ""]

    # Hoist context that is identical across the whole batch. evidence_density
    # carries the full claims index per unit (~36k chars each) and voice carries
    # the same baseline excerpts; repeating either per unit makes a batch
    # unreadably large for no added information.
    shared: dict[str, str] = {}
    ctxs = [t.get("context") or {} for t in batch]
    if ctxs:
        for k in ctxs[0]:
            vals = {str(c.get(k, "")) for c in ctxs}
            if len(vals) == 1 and len(next(iter(vals))) > 400:
                shared[k] = next(iter(vals))
    if shared:
        out += ["## Shared context (identical for every unit in this batch)", ""]
        for k, v in shared.items():
            out += [f"### {k}", "", "```text", v.strip(), "```", ""]
    out += [
        "## Output contract",
        "",
        f"Write a JSON array of exactly {len(batch)} objects to a file, then run:",
        "",
        "```sh",
        f"mash-agent ingest --run {run_id} --batch {n} --from <that-file>.json",
        "```",
        "",
        "Each object must have these keys:",
        "",
        "```json",
        json.dumps([{
            "unit_id": batch[0]["unit_id"],
            "dim_name": batch[0]["dim_name"],
            "score_0_100": 72,
            "label": "moderate",
            "reasoning": "one or two sentences naming what the score turns on",
            "actionable_takeaway": "what a reader could change on Monday - \"\" if none",
        }], indent=2),
        "```",
        "",
        "`actionable_takeaway` is required by the rubric above: fill it when the score "
        "is moderate or better, leave it \"\" when weak or fail.",
        "",
        "`label` must match `score_0_100`: >=80 strong, >=50 moderate, >=20 weak, else fail.",
        "Ingest validates this and rejects the batch on any mismatch.",
        "",
        "## Units",
        "",
    ]
    for i, t in enumerate(batch, 1):
        out += [
            f"### {i}. `{t['unit_id']}`  ·  dim: `{t['dim_name']}`",
            "",
        ]
        for k, v in (t.get("context") or {}).items():
            if k in shared:
                continue  # rendered once above
            out += [f"context · {k}: {v}", ""]
        out += [
            "```text",
            t["unit_text"].strip() or "(empty)",
            "```",
            "",
        ]
    path.write_text("\n".join(out))


def cmd_ingest(args) -> int:
    d = _run_dir(args.run)
    manifest = json.loads((d / "manifest.json").read_text())
    key = str(args.batch)
    if key not in manifest["batches"]:
        raise SystemExit(f"batch {key} not in run {args.run}")
    expected = set(manifest["batches"][key])

    try:
        payload = json.loads(Path(args.from_file).read_text())
    except (OSError, json.JSONDecodeError) as exc:
        raise SystemExit(f"cannot read judgments: {exc}") from exc
    if not isinstance(payload, list):
        raise SystemExit("judgments must be a JSON array")

    seen, errors, rows = set(), [], []
    for i, r in enumerate(payload):
        where = f"item {i}"
        if not isinstance(r, dict):
            errors.append(f"{where}: not an object")
            continue
        uid, dim = r.get("unit_id"), r.get("dim_name")
        k = f"{uid}|{dim}"
        if k not in expected:
            errors.append(f"{where}: {k!r} is not in this batch")
            continue
        if k in seen:
            errors.append(f"{where}: duplicate {k!r}")
            continue
        score, label, reasoning = r.get("score_0_100"), r.get("label"), r.get("reasoning")
        if not isinstance(score, (int, float)) or not 0 <= score <= 100:
            errors.append(f"{where}: score_0_100 must be a number 0-100, got {score!r}")
            continue
        if label not in VALID_LABELS:
            errors.append(f"{where}: label must be one of {VALID_LABELS}, got {label!r}")
            continue
        if label != _band(float(score)):
            errors.append(f"{where}: label {label!r} disagrees with score {score} "
                          f"(band is {_band(float(score))!r})")
            continue
        if not isinstance(reasoning, str) or not reasoning.strip():
            errors.append(f"{where}: reasoning must be a non-empty string")
            continue
        takeaway = r.get("actionable_takeaway", "")
        if not isinstance(takeaway, str):
            errors.append(f"{where}: actionable_takeaway must be a string")
            continue
        # The rubric asks for a takeaway at moderate and above. Warn rather than
        # reject: an empty one costs a reporting field, a rejected batch costs the
        # whole batch. Older runs predate the field entirely.
        seen.add(k)
        rows.append({"unit_id": uid, "dim_name": dim, "score_0_100": float(score),
                     "label": label, "reasoning": reasoning.strip(),
                     "actionable_takeaway": takeaway.strip()})

    missing = expected - seen
    if missing:
        errors.append(f"{len(missing)} unit(s) not judged, e.g. {sorted(missing)[:3]}")
    if errors:
        print(f"REJECTED batch {key} — {len(errors)} problem(s):", file=sys.stderr)
        for e in errors[:15]:
            print(f"  - {e}", file=sys.stderr)
        if len(errors) > 15:
            print(f"  … and {len(errors) - 15} more", file=sys.stderr)
        return 1

    (d / "judgments" / f"batch-{int(key):03d}.json").write_text(
        json.dumps({"batch": int(key), "judged_by": args.judged_by,
                    "ingested_at": datetime.now(timezone.utc).isoformat(),
                    "rows": rows}, indent=2) + "\n")
    done = len(list((d / "judgments").glob("batch-*.json")))
    print(f"accepted batch {key}: {len(rows)} judgments "
          f"({done}/{manifest['n_batches']} batches complete)")
    return 0


def cmd_status(args) -> int:
    d = _run_dir(args.run)
    manifest = json.loads((d / "manifest.json").read_text())
    done = {int(p.stem.split("-")[1]) for p in (d / "judgments").glob("batch-*.json")}
    todo = [n for n in range(1, manifest["n_batches"] + 1) if n not in done]
    print(f"run {manifest['run_id']}  snapshot {manifest['corpus_snapshot_hash'][:18]}")
    print(f"  dims     {', '.join(manifest['dims'])}")
    print(f"  batches  {len(done)}/{manifest['n_batches']} complete")
    if todo:
        print(f"  next     batch-{todo[0]:03d}.md  (remaining: {len(todo)})")
    else:
        print("  ready to finalize")
    return 0


def cmd_finalize(args) -> int:
    d = _run_dir(args.run)
    manifest = json.loads((d / "manifest.json").read_text())
    files = sorted((d / "judgments").glob("batch-*.json"))
    done = {int(p.stem.split("-")[1]) for p in files}
    todo = [n for n in range(1, manifest["n_batches"] + 1) if n not in done]
    if todo:
        raise SystemExit(
            f"refusing to finalize: {len(todo)} batch(es) not ingested "
            f"(next: batch-{todo[0]:03d}). A partial run would report a score "
            "computed from only the units that were judged."
        )

    judged_by = sorted({json.loads(p.read_text()).get("judged_by") or "unknown" for p in files})
    model = "agent:" + "+".join(judged_by)
    scores = []
    missing_takeaway = 0
    for p in files:
        for r in json.loads(p.read_text())["rows"]:
            t = r.get("actionable_takeaway", "")
            if r["score_0_100"] >= 50 and not t:
                missing_takeaway += 1
            scores.append({
                "dim_name": r["dim_name"], "unit_id": r["unit_id"],
                "score_0_100": r["score_0_100"], "label": r["label"],
                "reasoning": r["reasoning"], "actionable_takeaway": t,
                "evidence_refs": [], "model": model, "cost_usd": 0.0,
                "derived": False,
            })

    now = datetime.now(timezone.utc).isoformat()
    (d / "scores.json").write_text(json.dumps({"run_id": manifest["run_id"], "scores": scores}, indent=2) + "\n")
    (d / "run.json").write_text(json.dumps({
        "run_id": manifest["run_id"],
        "corpus_snapshot_hash": manifest["corpus_snapshot_hash"],
        "status": "completed",
        "started_at": manifest["created_at"], "finished_at": now,
        "total_cost_usd": 0.0,
        # Load-bearing provenance. The canonical published line is the median of
        # three API judges; this is one agent judging once. Anything that consumes
        # runs must be able to tell them apart without reading the run_id.
        "judge_kind": "agent",
        "canonical_panel": False,
        "judged_by": judged_by,
        "dims": manifest["dims"],
        "note": ("Agent-judged run. NOT comparable with panel-3model-* and must "
                 "never be merged into that series or into judge-scores.json."),
    }, indent=2) + "\n")

    import statistics
    # Calibration divergence check. Batches are judged independently, often by
    # different agents, and a rubric can be specific about bands while leaving the
    # *construct* open. On 2026-08-28 an evidence_density run split cleanly at the
    # agent boundary -- batches 1-5 averaged 91.5, batches 6-10 averaged 42 -- because
    # each half invented a different definition of the thing being counted. The
    # manuscript did not change at batch 6; the construct did. A mean is meaningless
    # across that seam, so surface it loudly rather than averaging through it.
    per_batch: list[tuple[int, float]] = []
    for p_ in files:
        rows_ = json.loads(p_.read_text())["rows"]
        if rows_:
            per_batch.append((json.loads(p_.read_text())["batch"],
                              statistics.mean(r["score_0_100"] for r in rows_)))
    if len(per_batch) >= 4:
        means = [m for _, m in per_batch]
        spread = max(means) - min(means)
        if spread >= 35:
            lo = min(per_batch, key=lambda t: t[1])
            hi = max(per_batch, key=lambda t: t[1])
            print(f"\n  WARNING: batch means span {spread:.0f} points "
                  f"(batch {lo[0]}={lo[1]:.0f}, batch {hi[0]}={hi[1]:.0f}).")
            print("  That is usually judges applying different constructs, not the "
                  "manuscript changing.\n  Treat the aggregate as unsafe until you "
                  "have checked the reasoning fields across the seam.")

    by_dim: dict[str, list[float]] = {}
    for s in scores:
        by_dim.setdefault(s["dim_name"], []).append(s["score_0_100"])
    print(f"finalized {manifest['run_id']}  ({len(scores)} judgments, judged_by {', '.join(judged_by)})")
    for dim, vals in sorted(by_dim.items()):
        print(f"  {dim:22s} n={len(vals):4d}  mean {statistics.mean(vals):5.1f}  "
              f"median {statistics.median(vals):5.1f}")
    if missing_takeaway:
        print(f"  note: {missing_takeaway} unit(s) scored >=50 with no "
              f"actionable_takeaway (rubric asks for one at moderate and above)")
    print(f"\nwrote {d / 'scores.json'} and {d / 'run.json'}")
    print("NOT a canonical panel run — do not merge into panel-3model-* or judge-scores.json.")
    return 0


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(prog="mash-agent", description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("plan", help="emit judging batches for the current manuscript")
    p.add_argument("--dims", default="usefulness",
                   help="comma-separated: " + ", ".join(DIM_GRANULARITY))
    p.add_argument("--batch-size", type=int, default=25)
    p.set_defaults(fn=cmd_plan)

    p = sub.add_parser("ingest", help="validate and store one batch of judgments")
    p.add_argument("--run", required=True)
    p.add_argument("--batch", required=True)
    p.add_argument("--from", dest="from_file", required=True)
    p.add_argument("--judged-by", default="unknown",
                   help="harness and model that judged, e.g. 'claude-code/opus-5'")
    p.set_defaults(fn=cmd_ingest)

    p = sub.add_parser("status", help="show progress")
    p.add_argument("--run", required=True)
    p.set_defaults(fn=cmd_status)

    p = sub.add_parser("finalize", help="assemble scores.json + run.json")
    p.add_argument("--run", required=True)
    p.set_defaults(fn=cmd_finalize)

    args = ap.parse_args(argv)
    return args.fn(args)


if __name__ == "__main__":
    sys.exit(main())
