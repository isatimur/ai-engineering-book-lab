# scripts

## Overview

Repo tooling for the book. Most scripts are gates: they check that the manuscript, claims ledgers, diagrams, audio and scores agree, and they exit non-zero on drift. Other scripts build covers, sync the manuscript and diagrams into the website, and commit regenerated files from CI. Two subpackages hold larger tools: the audiobook pipeline and the agent-judge CLI.

Most Python scripts resolve the repo root from `__file__` (`REPO = Path(__file__).resolve().parents[1]`), so they work from any directory. Exceptions: `verify_artifact_anchors.py` defaults `--repo` to `.`, and `audiobook_gen` runs as `python3 -m audiobook_gen` from `scripts/`.

## Interface

Subpackages:

- [audiobook_gen](./audiobook_gen/README.md): renders the book to ACX MP3s and a chaptered `.m4b` with OpenAI or ElevenLabs TTS (`python3 -m audiobook_gen`, run from `scripts/`).
- [mash_agent](./mash_agent/README.md): `plan` / `ingest` / `status` / `finalize` CLI that lets the current agent session judge the manuscript with book-mash rubrics. The launcher `mash-agent` in this folder runs `mash_agent/cli.py`.

Gate scripts:

| Script | CLI | Purpose |
|---|---|---|
| `verify_artifact_anchors.py` | `--ledger PATH` (required), `--repo PATH` (default `.`) | Checks every `**Artifact anchor:**` block (kinds `commit`, `run`, `file`, `range`) against git history and `research_passes/` captures (`[verify_artifact_anchors.py:verify]`, `[verify_artifact_anchors.py:CHECKS]`). |
| `check_claims_integrity.py` | `--book {1,2,3}` (default all), `--strict` | One-command quote-fidelity runner. Runs `verify_prose_quotes.py`, `verify_ledger.py` and `verify_artifact_anchors.py` for each book (`[check_claims_integrity.py:BOOKS]`, `[check_claims_integrity.py:VERIFIERS]`). |
| `check_book_consistency.py` | `--sync-only` | Checks manuscript sync, audio freshness and judge-score freshness for the 10 chapters (`[check_book_consistency.py:check_manuscript_sync]`, `[check_book_consistency.py:check_audio_freshness]`, `[check_book_consistency.py:check_scores_freshness]`). |
| `check_diagram_sync.py` | `--quiet`, `--repo PATH` | Checks `website/src/data/diagram-manifest.json` entries against sources, renders and web copies by git ancestry and SHA-256 (`[check_diagram_sync.py:main]`, `[check_diagram_sync.py:SECTIONS]`). |

Analysis scripts (read-only, print to stdout):

| Script | CLI | Purpose |
|---|---|---|
| `check_claim_staleness.py` | `--after DATE`, `--top N` (default 3), `--min-score` (default 6.0) | Ranks claims that newer same-topic talks may challenge. Runs at import; it has no `main()`. |
| `check_spans.py` | `--run ID` (required), `--min-words` (default 4) | Sorts `unbacked_specifics` spans from a mash-agent run into in-corpus, not-in-corpus and too-short. |
| `show_unit.py` | `--run ID`, `--unit ID` (repeatable), `--claims N` (default 5) | Prints a paragraph unit and its top ledger claims for a mash-agent run. |
| `bakeoff_score.py` | `--repo PATH` (required), `--book` (default `2`) | Scores a harness worktree: the runner must fail on a crashing `verify_prose_quotes.py` stub and pass when healthy. |
| `bakeoff_score_r2.py` | `--repo PATH` (required) | Scores a harness worktree: rebuilding evidence must keep `evidence.json` / `evidence-2.json` byte-identical and give `evidence-3.json` at least one row after a seed anchor. |

Build and sync scripts:

| Script | CLI | Purpose |
|---|---|---|
| `sync_manuscript_to_public.py` | `--dry-run` | Splits the compiled manuscript into `public/drafting/` and `website/src/content/chapter-NN.md`, then runs the website `gen-llms.mjs` and `gen-sitemap.mjs` (`[sync_manuscript_to_public.py:main]`). |
| `sync-diagrams.sh` | `--force`, `--check` | Renders stale `.excalidraw` sources with `npx @excalidraw-skill-pack/render` and copies PNGs into `website/public` (`[sync-diagrams.sh:process_section]`). |
| `build-covers.sh` | `[slug ...]` (default: three books) | Composes each cover master with `compose-cover.sh`, then builds served derivatives (`[build-covers.sh:book_row]`). |
| `compose-cover.sh` | `--art`, `--out`, `--title`, `--subtitle` (required); `--author`, `--ink`, `--sub-ink`, `--rule`, `--title-size`, `--sub-size` | Sets title type on a text-free plate at 1696x2528. |
| `build-cover-derivatives.sh` | `<slug>` or `--all` | Writes `website/public/covers/<slug>.png`, `<slug>.webp` and `<slug>-600w.webp` (`[build-cover-derivatives.sh:build_one]`). |
| `commit_regenerated.sh` | `--message`, `--regen CMD`, `-- FILES...` (all required) | Commits and pushes regenerated files, with retry. On a rejected push it resets to the remote tip and re-runs the generator; it never rebases. |

Library:

- `book_mash_path.py`: `[book_mash_path.py:ensure_on_path]` puts the sibling `book-mash` checkout on `sys.path`, or raises `RuntimeError`.

## Invariants

- Gate exit codes: 0 pass, 1 drift or failure. `verify_artifact_anchors.py` exits 2 on an unusable git repo (`[verify_artifact_anchors.py:GitEnvironmentError]`). `check_claims_integrity.py` exits 2 when any verifier crashes; a crash outranks every other result (`[check_claims_integrity.py:crashed]`).
- `check_claims_integrity.py` must run locally. Transcripts are gitignored, so in CI it passes vacuously (module docstring). Prose misses fail only with `--strict`. An unverifiable count prints but does not change the exit code.
- `verify_artifact_anchors.py` reports `checked`, `unverifiable` and `failed` counts that never overlap. "Unverifiable" never means the verifier could not run (`[verify_artifact_anchors.py:verify]`). A missing commit or range endpoint is unverifiable only in a shallow clone; otherwise it fails (`[verify_artifact_anchors.py:check_commit]`).
- An anchor excerpt needs at least 4 characters and 2 letters or digits, and must not be a universal diff fragment (`[verify_artifact_anchors.py:excerpt_problem]`). A commit ref is 7-40 hex characters; a run ref is digits (`[verify_artifact_anchors.py:ref_problem]`). `check_run` never uses the network; it reads only `research_passes/`.
- `check_book_consistency.py`: a canonical chapter must equal the published portion of its drafting file (`[check_book_consistency.py:check_manuscript_sync]`). Times come from the git commit time, with file mtime as a fallback (`[check_book_consistency.py:_mtime]`). Audio drift is accepted policy until chapters freeze; do not re-render audio only to go green (`[check_book_consistency.py:main]` comment).
- `check_diagram_sync.py` judges freshness by git ancestry, not timestamps. It does not check `diagrams/covers/`. A file with no git history prints as unknown and does not fail the run.
- `sync-diagrams.sh` compares mtimes, so it is valid only in a working copy. CI uses `check_diagram_sync.py`.
- `sync_manuscript_to_public.py` returns 1 unless it finds exactly 10 chapters and a drafting file for each. It writes a file only when the content changes.
- `show_unit.py` refuses a run whose `corpus_snapshot_hash` differs from the corpus on disk.
- `commit_regenerated.sh` makes no empty commit: no diff means `pushed=false` and exit 0. It exits 2 on bad arguments and 1 after the last failed push.
- The five `.sh` scripts use `set -euo pipefail`. The `mash-agent` launcher is a one-line `exec` and does not.

## Side Effects

- Git (read-only): `verify_artifact_anchors.py`, `check_book_consistency.py`, `check_diagram_sync.py` and `check_claim_staleness.py` run `git log`, `git show`, `git rev-parse` and similar.
- Git (writes): `commit_regenerated.sh` sets a local `user.name` / `user.email`, commits, and runs `git push origin HEAD:<branch>` (default `main`). On a rejected push it runs `git reset --hard origin/<branch>`, which discards all uncommitted changes in the working tree. It runs the `--regen` string with `eval`.
- Subprocesses: `check_claims_integrity.py` runs the verifiers in `99_Meta/scripts/anchor/`. `bakeoff_score.py` runs `check_claims_integrity.py`. `bakeoff_score_r2.py` runs `99_Meta/scripts/anchor/build_evidence.py`. `sync_manuscript_to_public.py` runs `node`. Cover scripts run ImageMagick `magick`. `sync-diagrams.sh` runs `npx` (may download the renderer) and `jq`.
- Temporary file mutation: `bakeoff_score.py` replaces `99_Meta/scripts/anchor/verify_prose_quotes.py` with a crashing stub and restores it in `finally`. `bakeoff_score_r2.py` appends a seed to `claims-3/Claims Ledger.md`, rebuilds `website/src/evidence*.json`, and restores them in `finally`. Both act on the `--repo` worktree.
- Disk writes: `public/drafting/`, `website/src/content/` (sync script); `diagrams/covers/<slug>.png` and `website/public/covers/` (cover scripts); `website/public/` diagram copies (`sync-diagrams.sh`).
- Reads outside the repo: `compose-cover.sh` needs `/System/Library/Fonts/Supplemental/Didot.ttc`. `book_mash_path.py`, `show_unit.py` and `check_claim_staleness.py` load the sibling `book-mash` checkout.
- Env vars (names only): `COVER_INK`, `COVER_SUB_INK`, `COVER_RULE` (`build-covers.sh`); `COMMIT_REGEN_MAX_ATTEMPTS`, `COMMIT_REGEN_BACKOFF`, `COMMIT_REGEN_BRANCH`, `GITHUB_OUTPUT` (`commit_regenerated.sh`).

## Verification

- Run (from the repo root; this is what `.github/workflows/script-tests.yml` runs):

  ```bash
  for t in scripts/test_*.py 99_Meta/scripts/test_*.py; do python3 "$t"; done
  ```

- Lint: `ruff check scripts/ 99_Meta/scripts/` (CI pins `ruff==0.5.7`).
- Run `python3 scripts/check_claims_integrity.py` locally. CI cannot see the gitignored transcripts.
- Subpackage tests: see [audiobook_gen](./audiobook_gen/README.md#verification). The loop above does not run them.
