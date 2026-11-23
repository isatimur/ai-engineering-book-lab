# mash_agent

## Overview

`mash-agent` judges the manuscript with the agent session you are already in. It needs no API key and spends nothing. book-mash judges by calling an LLM API. This CLI inverts that flow: it writes judging work as batch files, the agent judges them, and the CLI ingests the judgments back (`[cli.py:main]` help text).

It reuses book-mash's own unit segmentation, unit ids, snapshot hash and rubrics. So the agent grades the same units against the same words as the API judges.

A run from this CLI is a different instrument from the canonical panel. Never merge its scores into the published panel line. The code marks every run to make that mistake hard: runs land in `.mash-agent-runs/`, run ids start with `agent-`, and `run.json` carries `judge_kind: "agent"` and `canonical_panel: false`.

Workflow:

```bash
scripts/mash-agent plan --dims usefulness --batch-size 25
# read .mash-agent-runs/<run>/batches/batch-001.md, judge it, write the JSON array it asks for
scripts/mash-agent ingest --run <run> --batch 1 --from /tmp/judgments-001.json
scripts/mash-agent status --run <run>
scripts/mash-agent finalize --run <run>
```

The launcher `scripts/mash-agent` runs `exec python3 "$(dirname "$0")/mash_agent/cli.py" "$@"`.

## Interface

- `[cli.py:main]`: argparse entry point, `prog` is `mash-agent`. Subcommands:
  - `plan` (`[cli.py:cmd_plan]`): `--dims` (comma list, default `usefulness`), `--batch-size` (default 25). Writes batches and `manifest.json`.
  - `ingest` (`[cli.py:cmd_ingest]`): `--run`, `--batch`, `--from` (all required), `--judged-by` (default `unknown`). Validates and stores one batch.
  - `status` (`[cli.py:cmd_status]`): `--run`. Prints progress and the next batch.
  - `finalize` (`[cli.py:cmd_finalize]`): `--run`. Writes `scores.json` and `run.json`.
- `[cli.py:DIM_GRANULARITY]`: supported dims and their unit size. `usefulness`, `humanness`, `claim_defensibility` use paragraphs. `evidence_density` uses sections. `voice` and `redundancy` use chapters.
- `[cli.py:EXTRACTION_DIMS]`: `{"evidence_density"}`. These dims return candidate claims, not scores; the code derives the score (`[cli.py:_ingest_extraction]`).
- `[cli.py:VALID_LABELS]`: `strong`, `moderate`, `weak`, `fail`.
- `[cli.py:REPO]`, `[cli.py:RUNS_DIR]` (`REPO/.mash-agent-runs`), `[cli.py:BOOK_MASH]` (`~/Dev/LifeOS/book-mash`), `[cli.py:MASH_CORE]` (`~/Dev/LifeOS/mash-core`).
- Helpers that sibling scripts import: `[cli.py:_corpus_config]` and `[cli.py:_ensure_deps_on_path]` (imported by `scripts/show_unit.py` and `scripts/check_claim_staleness.py`). Rename them only with those callers.

## Invariants

- `plan` rejects any dim not in `DIM_GRANULARITY` before it writes anything (`[cli.py:cmd_plan]`).
- Run id is `agent-<4 chars of snapshot hash>-<UTC YYYYMMDD-HHMMSS>`. Batches are 1-based, named `batch-NNN` (`[cli.py:cmd_plan]`).
- `--run` must name an existing directory under `RUNS_DIR`, else `SystemExit` (`[cli.py:_run_dir]`).
- `ingest` accepts only a JSON array. Each row must match an expected `unit_id|dim_name` of that batch, with no duplicates. `score_0_100` is a number from 0 to 100. `label` is in `VALID_LABELS` and equals `_band(score)`. `reasoning` is a non-empty string. `actionable_takeaway` is a string (`[cli.py:cmd_ingest]`).
- For `claim_defensibility`, every `unbacked_specifics` entry must be a normalised substring of the unit text in the batch file (`[cli.py:cmd_ingest]`, `[cli.py:_normalise_span]`).
- For extraction dims, `closest_ledger_id` is null or a real ledger id (`[cli.py:_ingest_extraction]`).
- Every expected unit must be judged. Any error rejects the whole batch with exit 1 (`[cli.py:cmd_ingest]`).
- Bands: >= 80 strong, >= 50 moderate, >= 20 weak, else fail (`[cli.py:_band]`).
- `finalize` refuses a partial run: every batch needs a judgments file (`[cli.py:cmd_finalize]`). It warns, but does not fail, when batch means spread by 35 points or more over 4 or more batches.
- `book-mash.toml` `[corpus]` must define `chapters_glob`. Relative paths resolve against `REPO` (`[cli.py:_corpus_config]`).

## Side Effects

- Writes under `RUNS_DIR/<run_id>/`: `batches/batch-NNN.md` and `manifest.json` (`[cli.py:cmd_plan]`, `[cli.py:_write_batch]`). `judgments/batch-NNN.json`, overwritten without a check (`[cli.py:cmd_ingest]`). `scores.json` and `run.json` (`[cli.py:cmd_finalize]`).
- Mutates `sys.path`: puts `BOOK_MASH` and `MASH_CORE` first when they exist. When `pydantic_ai` is missing, it appends the book-mash poetry venv `site-packages` from `~/Library/Caches/pypoetry/virtualenvs/` (`[cli.py:_ensure_deps_on_path]`).
- Reads `REPO/book-mash.toml`, the chapter files and the claims index it names (`[cli.py:_corpus_config]`, `[cli.py:_units]`).
- Imports book-mash modules from outside this repo (`book_mash.corpus.loader`, `book_mash.judges.<dim>`) (`[cli.py:_load_book_mash]`, `[cli.py:_rubric]`).
- No network and no subprocess calls in `cli.py`.

## Verification

- No tests cover this package. `scripts/test_*.py` contains no mash_agent test.
- Smoke check: `python3 scripts/mash_agent/cli.py --help` (from the repo root). It prints the usage and the four subcommands.
