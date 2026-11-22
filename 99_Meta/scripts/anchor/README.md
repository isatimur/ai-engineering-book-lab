# anchor

## Overview

Tools that tie book quotes to the talks they came from. The core finds a phrase in a WebVTT transcript and returns a timed Source Anchor. Around that core sit checkers. They read a Claims Ledger or chapter prose and report quotes that no longer match a transcript, have the wrong speaker, or look risky (agenda lines, questioner lines, truncated negation, time-bound claims). One builder turns the ledger into `website/src/evidence.json`.

Most checkers report candidates for a human to judge. They exit non-zero only with `--strict`.

## Interface

Library (import by sibling name; this folder has no `__init__.py`):

- `TimedWord(word, norm, timestamp)` dataclass; `timestamp` is `HH:MM:SS.mmm` [vtt.py:TimedWord]
- `load_word_stream(vtt_path: str) -> list[TimedWord]` [vtt.py:load_word_stream]
- `normalize(token: str) -> str` lowercases and strips everything outside `[a-z0-9]` [vtt.py:normalize]
- `Anchor(video_id, start, end, quote, confidence)` dataclass; `confidence` is `high`, `medium` or `low` [locate.py:Anchor]
- `locate_quote(stream, phrase, video_id) -> Anchor` [locate.py:locate_quote]
- `extract_video_id(raw: str) -> str` accepts a bare 11-char id or a ledger wikilink `<digits>-<id>-...`; raises `ValueError` otherwise [cli.py:extract_video_id]
- `subseq_match(quote_tokens, body_tokens, max_gap=3) -> bool` and `norm(t)`, reused by other checkers [verify_prose_quotes.py:subseq_match]
- `credited_names(lead, tail)` and `attribution_holds(lead, tail, matched_slugs)` [check_quote_speakers.py:credited_names]
- `questioner_hit(flat, quote)` [check_questioner_quotes.py:questioner_hit]
- `parse_ledger(ledger_path) -> list[dict]`, `build_index(claims) -> dict` [build_evidence.py:parse_ledger]

Command-line tools (run from the repo root):

| Script | Flags | Exit 1 when |
| --- | --- | --- |
| `cli.py` | `video` `phrase` `--transcripts` `--markdown` | bad video id or missing transcript [cli.py:main] |
| `build_evidence.py` | `--ledger` `--out` | never; parse errors raise `ValueError` [build_evidence.py:main] |
| `verify_ledger.py` | `--ledger` `--transcripts` `--quiet` | any Anchor/Quote pair fails to resolve [verify_ledger.py:main] |
| `verify_prose_quotes.py` | `--glob` `--min-words` `--max-unmatched` `--json` | unmatched spans exceed `--max-unmatched` [verify_prose_quotes.py:main] |
| `check_credited_unmatched.py` | `--glob` `--strict` | `verify_prose_quotes.py` fails, or `--strict` and a hit [check_credited_unmatched.py:main] |
| `check_quote_speakers.py` | `--glob` `--min-words` `--strict` | `--strict` and a hit [check_quote_speakers.py:main] |
| `check_title_quotes.py` | `--glob` `--min-words` `--strict` | `--strict` and a hit (module-level script, no `main`) [check_title_quotes.py:--strict] |
| `check_label_quotes.py` | `--ledger` `--strict` | `--strict` and a failure [check_label_quotes.py:main] |
| `check_agenda_quotes.py` | `--ledger` `--strict` | `--strict` and a hit (module-level script) [check_agenda_quotes.py:--strict] |
| `check_questioner_quotes.py` | `--ledger` `--strict` | `--strict` and a hit [check_questioner_quotes.py:main] |
| `check_truncated_negation.py` | `--ledger` `--transcripts` `--lookback` `--strict` | `--strict` and a flag [check_truncated_negation.py:main] |
| `check_time_bound_evidence.py` | `--ledger` `--strict` `--max-age-days` | `--strict` and an unmarked, expired or undated quote (module-level script) [check_time_bound_evidence.py:--strict] |
| `check_dropped_quotes_in_prose.py` | `--since` (required) `--book` `--strict` | `--strict` and a hit [check_dropped_quotes_in_prose.py:main] |
| `check_support_levels.py` | `--ledger` | never [check_support_levels.py:main] |
| `rank_early_anchors.py` | `--ledger` `--cutoff` | never [rank_early_anchors.py:main] |

## Invariants

- Repo root is `parents[3]` of each script [verify_ledger.py:_REPO]. `cli.py` uses `parents[2]` to reach `99_Meta/transcripts/raw` [cli.py:_DEFAULT_TRANSCRIPTS]; `check_credited_unmatched.py` uses `HERE.parents[2]` [check_credited_unmatched.py:REPO]. Moving this folder breaks every default path.
- A video id is exactly 11 chars of `[A-Za-z0-9_-]` [cli.py:_BARE_ID].
- Confidence bands: ratio >= 0.9 is `high`, >= 0.6 is `medium`, else `low` [locate.py:_confidence]. An empty phrase or a stream shorter than the phrase gives an empty `low` anchor [locate.py:locate_quote].
- The VTT parser uses only the last cue line that carries an inline `<HH:MM:SS.mmm>` tag; cues without one are dropped [vtt.py:_CUE_HEADER].
- Ledger format: `**Anchor:** \`<id>\` start → end` followed by `**Quote:** "..."` at end of line. Each Quote pairs with the nearest preceding unpaired Anchor [verify_ledger.py:_ANCHOR]. Claim headings match `^## (\d+)\)` [build_evidence.py:_CLAIM].
- `verify_ledger.py` passes an anchor only at `high` or `medium` confidence with a start time; otherwise it falls back to a normalized substring match against `plain/<vid>.txt` [verify_ledger.py:main].
- `build_evidence.py` raises `ValueError` when a claim has Artifact anchors but no `**Candidate chapters:**`, or when an Artifact block misses or repeats one of `kind`, `ref`, `date`, `excerpt` [build_evidence.py:_artifact_anchors]. It adds `artifact_anchors` to the output only when present [build_evidence.py:build_index].
- Time-bound review markers are `**Superseded`, `**Newer edition`, `**Prescription superseded`, `**Currency checked` [check_time_bound_evidence.py:_MARKERS].
- Ledger and prose verifiers need local transcripts. `99_Meta/transcripts` is gitignored, so on a clean checkout they have nothing to check [verify_ledger.py:docstring].

## Side Effects

- Reads `99_Meta/transcripts/raw/<id>.en.vtt` (fallback `.en-orig.vtt`) and `99_Meta/transcripts/plain/<id>.txt` [check_label_quotes.py:on_tape].
- Reads `<ledger>/Claims Ledger.md` (default `claims/`), `01_Videos/*.md` file names, and chapter files under `public/drafting/` [check_quote_speakers.py:main].
- Writes `website/src/evidence.json` (or `--out`) [build_evidence.py:main].
- Writes unmatched spans to the `--json` path [verify_prose_quotes.py:--json].
- `check_credited_unmatched.py` runs `verify_prose_quotes.py` as a subprocess and leaves its temp JSON file behind (`delete=False`, never removed) [check_credited_unmatched.py:main].
- `check_dropped_quotes_in_prose.py` runs `git show <rev>:<path>` for `--since` and `HEAD` [check_dropped_quotes_in_prose.py:ledger_at].
- `build_evidence.py` puts `<repo>/scripts` on `sys.path` to import `verify_artifact_anchors.parse_anchors` [build_evidence.py:_REPO].
- No network calls.

## Verification

- Run: `cd 99_Meta/scripts/anchor && python3 -m unittest discover -p 'test_*.py'` (68 tests, fixtures in `./testdata/`).
- CI does not run these tests. `.github/workflows/script-tests.yml` finds tests with `-maxdepth 1`, so it stops at `99_Meta/scripts/`.
