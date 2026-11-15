# Evidence capture — the diagrams gate that passed 190 times while checking nothing

- **date:** 2026-11-15
- **why this file exists:** GitHub expires Actions logs after 90 days. **93 of the 190 runs below have already lost their logs.** The rest expire on a rolling daily basis. This captures the evidence while it is still retrievable, so the record does not depend on a retention window.
- **anchors:** `docs/GATES.md` ("The rule these all serve"), PR #85, and the book-3 design spec's Ch 7 worked-examples table (`docs/superpowers/specs/2026-11-15-third-book-design.md`).

## The census

Every `diagrams-check` run in the repository's history, queried from the Actions API on 2026-11-15:

| | |
|---|---|
| total runs | **190** |
| conclusion `success` | **190** |
| conclusion `failure` | **0** |
| first run | 2026-05-26 |
| last run before the fix | 2026-11-03 (scheduled); 2026-11-15 15:58 (final broken run) |

The gate ran daily for over five months and never once failed. It was also, for that entire period, unable to check anything.

## The defect

`scripts/sync-diagrams.sh --check` called `stat -f %m`, which is BSD syntax. GNU coreutils reads `-f` as *file system*, so on `ubuntu-latest` every call errored. The call sat inside an `elif`, where `errexit` does not apply, so the failure was swallowed and read as "not newer". The counter stayed at zero and the step printed a clean result.

## The evidence, verbatim

Measured per run: the number of `stat` errors, against what the step then reported.

| run date | run id | `stat` errors | reported |
|---|---|---|---|
| 2026-08-28 | 33208667480 | **256** | `check complete: 0 stale, 0 missing-source` |
| 2026-09-21 | 35619509449 | **256** | `check complete: 0 stale, 0 missing-source` |
| 2026-10-12 | 38290786659 | 256 | `check complete: 0 stale, 0 missing-source` |
| 2026-11-03 | 41677298413 | **256** | `check complete: 0 stale, 0 missing-source` |

Identical across three months. Sample output, 2026-11-03:

```
==> overview
stat: cannot read file system information for '%m': No such file or directory
stat: cannot read file system information for '%m': No such file or directory
Inodes: Total: 18690560   Free: 17670955: integer expected
stat: cannot read file system information for '%m': No such file or directory
...
check complete: 0 stale, 0 missing-source
```

The `Inodes:` line is the tell. `stat -f` returned a filesystem report, and the numeric comparison then tried to use it as a timestamp.

## What it cost

The withdrawal commit `53df9ab` (2026-09-19, "remove Daniel Chalef from the book and corpus, on request") edited `diagrams/inline/ch05-fig1-rag-is-not-memory.excalidraw`. The rendered `.png` was never regenerated, and the gate that existed to catch exactly this reported success every day for **57 days**. The published figure carried the withdrawn speaker's name until 2026-11-15.

A commitment made to a person was broken by a green tick.

## Retention status at capture time

| | |
|---|---|
| log retention | 90 days (GitHub default) |
| oldest log still retrievable | 2026-08-28 (2026-08-17 confirmed already gone) |
| runs with logs expired | **93 of 190** |
| runs still capturable | 97, declining daily |

Run *metadata* (date, conclusion, id) survives longer than logs and is still available back to 2026-05-26. The conclusion column above is therefore complete for all 190; the error counts are only recoverable for the surviving 97.

## Method note

The 190-run census and the per-run error counts are reproducible with the GitHub CLI:

```bash
gh api "repos/isatimur/ai-engineering-book-lab/actions/runs?per_page=100" --paginate \
  --jq '[.workflow_runs[] | select(.name=="diagrams-check")] | .[] | "\(.created_at[0:10]) \(.id) \(.conclusion)"'

gh run view <id> --log | grep -c "cannot read file system"
```

For runs whose logs have expired, `gh run view --log` returns empty rather than an error — silence that looks identical to a clean run. That is worth knowing before trusting any future audit of this kind: absence of errors in an expired log is not evidence of absence.
