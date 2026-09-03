# Research Pass — 2026-09-02 — Usefulness pass on the paragraph kinds both judges fail, plus the attribution gaps the quote audit left open

Contract: `docs/superpowers/specs/2026-09-02-usefulness-and-integrity-pass-design.md`.

## Why this shape

The 2026-08-28 passes established that usefulness (55.7 on the canonical panel) is a
real weakness and that per-paragraph usefulness scores are close to a coin flip between
adjacent bands (44% band agreement across two instruments). So this pass did not chase
individual scores. It targeted the *kinds* of paragraph the two instruments
independently put in the fail band — chapter roadmaps, chapter-to-chapter transitions
and hand-off questions, list stems, aphoristic wind-downs, section-heading fragments,
landscape description with no commitment — and used the per-unit lists only as
pointers.

## Method — Phase 1, book 1 prose

Ten editors ran in parallel, one per chapter, each confined to proposing edits as
`{old, new, kind, grounding, why}` JSON. Nothing was written to the manuscript by an
editor. A single serial apply step refused any `old` that was not an exact, unique
substring of the source of truth (`05_Book_Ideas/Drafting Layer/AI Engineering Book -
Manuscript Draft.md`) — the trap that erased the first Hetzel fix on 08-28 is the
reason edits go to the source and are grep-verified in the generated copies after sync.

Pointer lists came from the intersection of `panel-3model-v8` and the agent-judged run
`agent-d473-20260828-134213`: 158 units flagged, 102 of them weak in both instruments.

Hard rules (all in the spec): fidelity — no fact, number, name, tool, quotation or
claim not already in the chapter or a ledger entry whose Candidate chapters include it;
never touch text inside attributed quotation marks; chapter word count may not grow;
Chapter 10 stays reflective; a transition that carries the argument is rewritten to
carry it concretely, not deleted.

## Result — Phase 1

| Ch | edits | sharpen | cut | merge | skipped | words before | after | Δ |
|---|---|---|---|---|---|---|---|---|
| 1 | 21 | 14 | 3 | 4 | 6 | 3140 | 2942 | -198 |
| 2 | 21 | 4 | 5 | 12 | 16 | 3396 | 3303 | -93 |
| 3 | 6 | 2 | 3 | 1 | 3 | 3490 | 3471 | -19 |
| 4 | 10 | 7 | 3 | 0 | 6 | 3910 | 3823 | -87 |
| 5 | 8 | 5 | 1 | 2 | 0 | 3619 | 3574 | -45 |
| 6 | 3 | 2 | 1 | 0 | 2 | 4226 | 4159 | -67 |
| 7 | 14 | 6 | 5 | 3 | 4 | 3401 | 3269 | -132 |
| 8 | 10 | 3 | 4 | 3 | 3 | 3132 | 2866 | -266 |
| 9 | 8 | 4 | 1 | 3 | 1 | 3289 | 3232 | -57 |
| 10 | 4 | 3 | 0 | 1 | 17 | 2135 | 2089 | -46 |
| **all** | 105 | 50 | 26 | 29 | 58 | 33738 | 32728 | -1010 |

105 of 105 anchors resolved uniquely on the first apply; 0 refused. After sync, all 73
non-deletion edits were found verbatim in `public/drafting/` and `website/src/content/`.
`verify_prose_quotes.py` stayed at 31 unmatched spans for book 1 (no attributed quotation
was touched). Website tests 97/97; `npm run build` green. One section heading changed
(ch5, "Context is what makes intelligence situated" → "A stronger model amplifies both
good and bad context"); inline diagrams bind to headings by position, and no heading was
removed, so placement is unchanged.

58 flagged units were deliberately skipped, with a recorded reason each. The common
reasons: the unit states the chapter's central principle (judges misfire on principles
stated without a "do"), it is the opening hook whose payoff is the next paragraph, or it
is a concrete list the agent instrument already scored well. Chapter 10 skipped 17 of 21
by design.

Gate verdict (Phase 1): **REVISE on round 1, PASS on round 2.** Round 1 passed every
fidelity spot-check (17 sharpen/merge edits traced to surviving chapter text or the
ledger), every quotation-mark hunk, the no-growth rule and the Chapter 10 rule, but found
one real defect with two symptoms: the Chapter 1 editor deleted the roadmap bullet that
was the *only* preview of Chapters 7–10, and the apply step's deletion path ate the blank
line after the list so the closing thesis rendered inside the last bullet. Fixed by
replacing the topic-listing bullet with four one-line thesis bullets (Ch7–10), each
checked against its chapter's opening argument. Chapter 1 ends at 3018 words, still
−122 against its pre-pass count. PASS token in `~/Dev/ai-native-org/ledger/verdicts.md`.

## Phase 2a — do matched quotations belong to the named speaker?

The 08-28 audit tested attributed quotations for presence in *some* transcript. This
pass tested the 77 quoted spans (≥4 words) in book 1 that match a transcript for the
harder property: is the matched video's speaker the person the prose names? Speaker
per video id comes from `99_Meta/Video Inventory.md` and the `01_Videos/` note filename.
Matching reused `norm()`/`subseq_match()` from `verify_prose_quotes.py`; attribution was
detected by a verb-bound capitalised name in the ~220 characters before the span, plus a
full-sweep safety net for spans the verb list misses, plus a hand read of the five
paragraphs that quote two real speakers.

**Result: 0 misattributions in 77.** Surname-only, first-name-only, co-presenter and
organisation-as-speaker cases all resolve to the right talk. The one metadata edge case
is benign: *"Evals Are Not Unit Tests"* is Pesok's talk title, framed as a title in the
prose, and the phrase also occurs spoken in Hetzel's transcript.

One loose end the 08-28 audit's detector missed and this pass caught: two Chapter 8
spans credited to Kwindla Hultman Kramer (*"in most cases in a voice AI conversation, you
care a lot if your P95 goes up above 800, 900…"* and *"has to be much faster than that by
definition"*) sit in the unmatched list. Checked by hand against his four talks: both are
verbatim in `IA4lZjh9sTs` (Pipecat Cloud, Daily). The checker misses them because the
span boundary falls inside a digit sequence ("800, 900, 1,000"). No prose change.

Full table and method: `/tmp/book-pass/integrity-2a.md` at the time of the pass; the
substance is recorded here. Not established: book 2 speaker attribution; a guest quoted
inside a host-filed transcript, which the inventory cannot split (none surfaced).

## Phase 2b — book 2's 16 unmatched spans

Book 2's source of truth is `public/drafting-2/*.md` itself — `sync-second-book.mjs`
copies it *into* `website/src/content-2/`, so the book 1 generated-file trap does not
apply. The 08-28 method was applied to all 16 unmatched spans: locate, look back ~220
characters for a verb-bound name, classify, then search all 1074 transcripts and read the
raw VTT at the ledger's own anchor timestamp.

| verdict | n | what |
|---|---|---|
| real, ASR drift | 6 | Madra "25"↔"Twenty-five"; Cheah ×3 ("GPD 4", "big laps", "Hing phase"); TurboTax "Turboax"; Myshatyn "applied a IML" — five of six ledger-anchored with the book's wording |
| talk title, framed as title | 3 | no change |
| verifier artifact | 1 | ch1 prose between two real quoted terms |
| **subtitle presented as speech** | 1 | Duffy (#253) — relabelled as the talk's subtitle |
| **not spoken, in quotes** | 4 | GR00T framing line (ch4); two Pekelis phrases (ch6, #473); Quoraishee gloss (ch7, checked against both the catalogued talk 418t26CVz-w and the uncatalogued NYT Connections talk P_uhFGH4J9Y the sentence actually cites) — quotation marks dropped, wording kept as author framing |
| **paraphrase in quotes** | 1 | Jansepar (ch7) — restored to the spoken words at anchor 3E7VAZaTG9M 00:00:44.8 |

Five edits, four files. The Duffy relabel needed a second pass: the first version quoted the
subtitle loosely; the gate caught it and it now reads byte-exactly as the inventory has it,
*"How What We Measure Shapes AI—and Us"*, and a stray dangling "Alex Duffy" token that had sat
after the closing quote since the chapter was drafted went with it. Rule 3 held: in every case the raw VTT at the ledger's anchor
timestamp covers a *different* span than the edited phrase (Duffy's anchor covers
"benchmarks are just memes that shape…", Pekelis's "they kind of apply across
industries", Jansepar's "transformed KH Academy into an AI first organization"), so no
anchored wording changed. Unmatched spans 16 → 12; the four that remain flagged are the
Duffy subtitle (now labelled as such) and three real-with-drift quotes.

Flagged for a future anchoring pass, not fixed here: ledger entries #253 and #473 quote
a subtitle / an unspoken phrase beside anchors that resolve to different words.

Gate verdict (Phase 2b): **REVISE on round 2 (the loosely quoted subtitle), PASS on round 3.** The
gate reproduced every absence claim against the transcripts and the 16 → 12 verifier move.
PASS token in `~/Dev/ai-native-org/ledger/verdicts.md`.

## Phase 3 — measurement

The canonical panel could not run (OpenRouter account overdrawn, see 08-28). The
zero-cost instrument was used instead: `scripts/mash-agent`, the manuscript judged inside
the agent session against the verbatim usefulness rubric, six judges in parallel, every
batch schema-validated on ingest. Run `agent-54c7-20260902-191248`, snapshot `54c7e3c1`,
534 units in 18 batches, judged by `claude-code/opus-4.8`. Not canonical, not published,
lives in `.mash-agent-runs/`, refused by `build_judge_scores.py`.

**Comparison with the 08-28 agent run (same instrument class, 572 units):**

| | n | mean | strong | moderate | weak | fail |
|---|---|---|---|---|---|---|
| 08-28 `agent-d473` | 572 | 54.8 | 137 | 225 | 130 | 80 |
| 09-02 `agent-54c7` | 534 | **60.0** | 105 | 306 | 93 | **30** |

| Ch | 08-28 | 09-02 | Δ |
|---|---|---|---|
| 1 | 42.6 | 50.2 | +7.6 |
| 2 | 46.9 | 53.5 | +6.6 |
| 3 | 62.2 | 64.4 | +2.2 |
| 4 | 56.9 | 61.4 | +4.5 |
| 5 | 59.7 | 63.8 | +4.1 |
| 6 | 63.7 | 63.8 | +0.1 |
| 7 | 56.2 | 65.8 | +9.6 |
| 8 | 52.2 | 63.6 | +11.4 |
| 9 | 58.6 | 63.1 | +4.5 |
| 10 | 48.3 | 48.0 | −0.3 |

**The control that makes this a finding rather than a hope.** The two runs used
different judge versions (`opus-5` on 08-28, `opus-4.8` today), so a raw comparison
could be calibration drift. Matching paragraphs by *text* across the two runs:

| paragraphs | n | 08-28 mean | 09-02 mean |
|---|---|---|---|
| text identical in both runs | 447 | 62.1 | 62.6 (Δ +0.5, band agreement 76%) |
| removed or rewritten by this pass | 125 | 28.5 (54% in the fail band) | — |
| new or rewritten text | 87 | — | 47.0 |

Unchanged prose moved half a point. The pass removed or rewrote 125 paragraphs whose
mean was 28.5 and left 87 in their place averaging 47.0. Book-level lift +5.2, of which
about +4.7 is attributable to the edits after the calibration offset. The fail band
shrank from 80 paragraphs to 30. Chapter 10 did not move, by design.

The replacements still sit below the book mean: they are the roadmap, transition and
closer positions, which the rubric caps at "framing" unless they carry a test. That is
the genre ceiling the 06-09 diagnosis named; this pass took the filler out of those
slots, it did not turn them into checklists.

### Did the cuts cost humanness, voice or redundancy? (added 2026-09-03)

Same instrument, same snapshot `54c7`, run `agent-54c7-20260902-232100`: 534 humanness
paragraphs, 10 voice chapters, 10 redundancy chapters, seven judges in parallel. 08-28
agent baselines exist for all three (`agent-d473-…-142320`, `…-142318`).

| dim | 08-28 | 09-02 | control |
|---|---|---|---|
| humanness | 70.8 (fail 9, weak 28) | **77.8** (fail 0, weak 3) | 447 text-identical paragraphs: 74.1 → 78.5 (Δ +4.5, judge calibration); removed text had scored 59.0, replacements score 74.0; edit-attributable ≈ +2.6 |
| voice | 88.7 | 85.8 | chapter-level, no text control possible. Every chapter strong in both runs. Neither judge names drift of substance in any chapter; the new judge compressed the spread (84–90 vs 82–96). Ch7's −10 is the first judge's self-inclusion bonus withdrawn — the voice baseline quotes Ch7 verbatim, and both judges note it |
| redundancy | 81.1 (5 strong) | 82.3 (9 strong) | Ch2 +8, Ch6 +6, Ch7 +6 — the chapters where the most cross-chapter recap was cut. Ch10 60 → 60 in kind: the capstone recaps by design |

The cuts did not cost humanness: the paragraphs removed were the book's least human
(59.0 against a chapter mean above 70), and what replaced them scores at the book mean.
Redundancy improved where recap paragraphs were cut. Voice moved within instrument noise
with no chapter flagged by either judge.

### Canonical panel v9 (added 2026-09-03)

Credits arrived, and `panel-3model-v9` ran: deepseek-chat, llama-3.3-70b, qwen-2.5-72b
through OpenRouter, median of three, snapshot `7c61` = commit `8221593` (my pass plus a
peer session's two integrity fixes to Ch5 and Ch10). Every member run: zero null scores.
Merge: 1,736 units, zero with fewer than two votes. Total spend for the valid members
about $1.10 including the diagnostic reruns. Published to `judge-scores.json` and `/quality`.

| dim | v8 (08-22) | v9 (09-03) | Δ |
|---|---|---|---|
| humanness | 86.2 | 86.0 | −0.2 |
| voice | 90.0 | 88.4 | −1.6 |
| usefulness | 49.5 | **60.6** | **+11.1** |
| evidence_density | 70.0 | 79.8 | +9.8 |
| claim_defensibility | 94.6 | 93.6 | −1.0 |
| redundancy | 90.0 | 87.5 | −2.5 |

| Ch | v8 usefulness | v9 | Δ |
|---|---|---|---|
| 1 | 43.4 | 47.3 | +3.9 |
| 2 | 49.5 | 54.6 | +5.1 |
| 3 | 63.5 | 66.1 | +2.6 |
| 4 | 57.8 | 61.4 | +3.6 |
| 5 | 54.7 | 60.7 | +6.0 |
| 6 | 63.2 | 64.7 | +1.5 |
| 7 | 64.1 | 74.0 | +9.9 |
| 8 | 55.2 | 64.9 | +9.7 |
| 9 | 61.7 | 64.8 | +3.1 |
| 10 | 44.0 | 47.3 | +3.3 |

Two things to read carefully. First, the v8→v9 delta spans *every* edit since 08-22:
the 08-28 drafting-voice and quotation fixes, this pass, and the 09-03 peer fixes. The
agent-judged text-matched control attributes about +4.7 usefulness points to this pass
alone; the canonical line cannot separate the three. Second, 63% of member judgments
were cache replays of unchanged paragraphs (identical reasoning text to a v8 member),
which is correct behaviour for a content-hash cache and means the delta comes from the
37% that were re-judged — the changed text. Same shape as the agent-judged control.

Getting here took three fixes that are now recorded in `docs/ONGOING_SYNC_AND_JUDGING.md`:
OpenRouter spilling llama to a provider that returns empty responses under load (pinned
at the HTTP client), a peer session moving the corpus mid-run (two members redone), and
a book-mash cache bug that reported unchanged paragraphs under stale ids (fixed,
`bb6b1fb`, with a regression test).

## What this does not establish

- How much of the canonical +11.1 usefulness belongs to this pass versus the 08-28 and
  09-03 edits; only the agent-judged control isolates it (≈ +4.7).
- Voice at chapter granularity cannot be controlled for judge drift; a −3 book-level move
  between two judge versions is reported, not interpreted.
