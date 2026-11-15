# Gates

Every standing check in The Lab, what it catches, and — the part that was
missing — **where it actually runs**. Eight checks exist that no workflow and
no runner invokes. Eleven CI gate steps have never executed, eight of them
labelled "(blocking)".

Verified 2026-11-14 by reading the workflow files and one live run of each.

## The headline: CI is green and checks nothing

`evidence-gates.yml` carries every anchor gate. Each step is conditioned on
`steps.guard.outputs.enabled == 'true'`, which requires a `CORPUS_TOKEN` secret
with read access to the private transcripts mirror. **That secret does not
exist.** Repo secrets today are `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`,
`VERCEL_TOKEN`.

So on every push the job skips all eleven gate steps — eight "(blocking)", two
"(ceiling)", one "(advisory)" — and reports **success**. The latest run shows
`Is the transcript corpus reachable? -> success`, then 16 `-> skipped` (the
eleven gates plus checkout, corpus checkout, the corpus-present assertion,
setup-python and the failure-issue step), then `gates: success`.

This is not neglect — it is documented in ROADMAP under 2026-09-17, because the
gates resolve quotes against a 26 MB gitignored corpus a runner cannot see. The
problem is that a dormant gate and a passing gate look identical on a pull
request. **Until `CORPUS_TOKEN` is set, treat a green check as "not run".**

To arm them: create a fine-grained PAT with read access to
`isatimur/ai-engineer-corpus-transcripts`, add it as `CORPUS_TOKEN`, and the
guard flips with no code change.

## Where each check runs

| Check | Catches | Runs in |
|---|---|---|
| `verify_ledger.py` | an anchor that no longer resolves to its quote | evidence-gates *(dormant)* · integrity runner |
| `verify_prose_quotes.py` | a chapter quote in no transcript | evidence-gates *(dormant)* · integrity runner |
| `check_quote_speakers.py` | a quote credited to the wrong person | evidence-gates *(dormant)* |
| `check_title_quotes.py` | a talk title printed as speech | evidence-gates *(dormant)* |
| `check_credited_unmatched.py` | a named credit matching no tape | evidence-gates *(dormant)* |
| `check_dropped_quotes_in_prose.py` | a quote the ledger dropped, still in prose | evidence-gates *(dormant)* |
| `check_agenda_quotes.py` | a quote that announces a talk instead of arguing | **nothing** |
| `check_label_quotes.py` | a quoted phrase in entry prose that misattributes | **nothing** |
| `check_questioner_quotes.py` | words spoken by the questioner, not the speaker | **nothing** |
| `check_support_levels.py` | a support level the evidence does not carry | **nothing** |
| `check_time_bound_evidence.py` | evidence true when spoken, maybe not now | **nothing** |
| `check_truncated_negation.py` | a quote that lost a "not" at its left edge | **nothing** |
| `check_claim_staleness.py` | claims resting only on older talks | **nothing** |
| `check_spans.py` | judge-flagged spans absent from the corpus | **nothing** |
| `check_book_consistency.py` | cross-chapter contradictions | book-consistency.yml |
| `corpus_health.py` | backfill debt; **duplicate video ids (always fails)** | ingest-channel.yml |
| `check_note_frontmatter.py` | malformed note frontmatter | ingest-channel.yml |
| `check_diagram_sync.py` | a figure whose source moved past its render | diagrams-check.yml |
| `commit_regenerated.sh` | a regen job republishing a stale derived value | stats-regen.yml · evidence-regen.yml |
| `scripts/test_*.py` | the controls above, actually executed | script-tests.yml |

`scripts/check_claims_integrity.py` describes itself as "one command for every
quote-fidelity check". It runs two of them. Read that docstring as intent.

## Running them by hand

The anchor gates need the transcript mirror present at
`99_Meta/transcripts/`, so they only work on a machine that has it.

```bash
# the two the integrity runner covers, both books
python3 scripts/check_claims_integrity.py

# any single gate; --ledger claims-2 for book 2, --strict to exit 1
python3 99_Meta/scripts/anchor/check_truncated_negation.py
python3 99_Meta/scripts/anchor/check_time_bound_evidence.py --max-age-days 90

# corpus integrity — duplicates fail with or without --strict
python3 99_Meta/scripts/corpus_health.py
```

## Two gates that fail differently, on purpose

`corpus_health.py` reports backfill debt but exits 0 unless `--strict`, because
debt is expected: YouTube blocks CI runners, so nightly notes land without
transcripts. A **duplicate video id** exits 1 regardless, because two notes for
one talk is never expected, never self-heals, and double-counts that talk in
every theme tally and in the synthesis pack.

`check_truncated_negation.py` is deliberately loose. It fires when a quote
carries no negation and one sits in the six words before it, which flags
innocent cases — a previous sentence ending in "not". A gate narrow enough to
fire only on certainty would not have fired on the inversion that prompted it.

## The rule these all serve

A gate that cannot fail is worse than no gate, because it looks like
verification. Four instances so far:

- `evidence-gates.yml`, green and skipping every step, above.
- `ingest-channel.yml` set `missing_count` from a `jq` parse that had been
  failing since 2026-09-19. The empty value matched neither `== '0'` nor
  `!= '0'`, so the steps that update and close the tracking issue both skipped
  while the job passed. Issue #67 froze for two months. Fixed in PR #77.
- `diagrams-check.yml` called `stat -f %m`, which is BSD. GNU coreutils reads
  `-f` as *file system*, so every call errored on `ubuntu-latest` — inside an
  `elif`, where `errexit` does not apply, so the error was swallowed and the
  counter stayed 0. It printed "0 stale, 0 missing-source" daily while a
  withdrawn speaker's name stayed on a published figure for 57 days.
- `stats-regen.yml` had a working gate and a broken writer. Two runs raced; the
  loser rebased a stale computation onto the winner's tree, the rebase applied
  cleanly because the competing commit touched inputs and not the derived
  file, and the site published 1455 videos against a 1458-note corpus. The run
  holding the right answer was the one that went red.

The last two share a cause worth naming: **the tests that catch them were
written, and nothing ran them.** `script-tests.yml` exists so that stops being
true, and fails rather than passes when it finds no tests to run.

When adding a check, make it fail once on purpose before trusting it.
