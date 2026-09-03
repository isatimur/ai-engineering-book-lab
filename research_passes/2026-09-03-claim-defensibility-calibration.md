# Research Pass — 2026-09-03 — Calibrating the claim_defensibility judge before running it

`claim_defensibility` is the one MASH dimension with no valid reading. It is also the
dimension that tests the book's premise directly: every claim carries a source anchor.
This pass is the work done *before* judging 534 paragraphs, and it changed the
instrument twice before a single batch was scored.

## 1. The judge was reading a near-arbitrary slice of the ledger

The rubric lets the judge answer "no matching ledger entry = unsupported". That verdict
is only safe if the judge saw every entry. It did not: `retrieve_relevant_claims`
returns the top 8 claims by IDF-weighted lexical overlap.

Measured on snapshot `54c7e3c1` (534 paragraphs, 54 claims):

| | |
|---|---|
| paragraphs with >8 claims at nonzero overlap (truncation happens) | **520 / 534** |
| of those, rank-8 → rank-9 relative score gap under 10% | **439** |
| median rank-8 → rank-9 gap | **3.3%** |

The 9th claim is all but tied with the 8th, so which 8 the judge sees is close to a coin
flip — and an "unsupported" flag was partly an artefact of where the list got cut.

Passing the **whole ledger** is also cheaper: 34k chars hoisted once per batch by the
existing shared-context path, against ~57k for top-8 repeated across 10 units. Run total
3.6M → 2.4M chars. Batches now state that the ledger is complete, because "not backed
here" only means "backed nowhere" if the judge knows it saw everything.

**This defect is in the canonical API judge too** — it still uses `DEFAULT_TOP_K = 8`.

## 2. Aggregate agreement hid total disagreement on the deliverable

First calibration: three judges, same batch, batch 1 → 93.4 / 93.6 / 94.2. A 0.8-point
spread looks like a well-behaved instrument. It is not evidence of one. Batch 1 is the
chapter 1 opener, where the rubric's Step 0 makes every answer "strong" before the
ledger comparison ever runs. The judges agreed that they can read Step 0.

Second calibration, on the most claim-dense batch in the corpus (batch 34, selected
mechanically by density of digits and named organisations):

| unit | D | E | Δ |
|---|---|---|---|
| L114 | 93 | 92 | 1 |
| L116 | 87 | 85 | 2 |
| L120 | 88 | 88 | 0 |
| L122 | 93 | 93 | 0 |
| L124 | 92 | 92 | 0 |
| **L126** | **83** | **74** | **9** |
| **L128** | **82** | **73** | **9** |
| L130 | 85 | 85 | 0 |
| **L132** | **84** | **64** | **20** |
| L134 | 94 | 94 | 0 |

Means 88.1 vs 84.0 — a 4.1-point mean difference, which reads as fine. But the flagged
set (<80) was **D: none, E: three. Zero overlap.** The entire deliverable is the flagged
set, and the two judges shared none of it.

The `finalize` divergence guard cannot catch this. It compares batch means, and with
Step 0 pushing most units to 90+ every batch mean clusters near 90 however violently
judges disagree about the handful of units that can produce a defect. **On this
dimension that guard is effectively absent.**

## 3. The disagreement is a rubric ambiguity, not a construct split

The three disputed units are D's three lowest scores. Both judges picked out the same
paragraphs and named the same phrases. They split on one question: the rubric says to
treat "a match against a supporting quote **or source**" as valid backing. Does a quoted
phrase that is absent from the ledger's excerpts, by a speaker who *is* the listed source
for that claim, count as backed?

D said yes, and explicitly reported reversing its own first pass (68–76 → 82–84) on that
clause. E said no.

**D is right, and it is checkable.** All three flagged phrases were searched across the
1074-transcript corpus:

| phrase | in ledger excerpts | in corpus |
|---|---|---|
| "GitHub is not a coordination layer for agents" | no | **yes** — `5Sui_OnSRlY` |
| "work on parallel tasks and instantly switch between them" | no | **yes** — `ClWD8OEYgp8` |
| "serial execution with targeted internal parallelization" | no | **yes** — `ow1we5PzK-o` |

The third needs a note. An exact-substring search calls it a miss: the transcript reads
"serial execution with **with** targeted internal parallelization", an ASR stutter, and
the book correctly prints it once. That is the documented limit of exact matching and
precisely why `verify_prose_quotes.py` uses gap-tolerant subsequence matching. The book
is more accurate than the source it is checked against. Not a defect — and worth stating,
because an over-eager reading of that MISS would have manufactured a second Hetzel.

A claims ledger lists *representative* quotes, not full transcripts. Prose drawing
further on a listed source is backed. Both judges' substantive finding was identical
and correct; only the band assignment diverged.

## Consequence for the run

Judging 534 paragraphs on a 0–100 score would produce a defect list that depends on which
agent drew which batch. Two changes before the fan-out:

1. **The deliverable is the named phrases, not the threshold.** Every judgment carries an
   explicit list of specific assertions it could not back. Judges agree on that perfectly
   and disagree on the score, so the artefact should be the thing they agree on.
2. **The "or source" clause is pinned in the prompt**, with the reasoning above, so the
   band assignment stops being a coin flip.

Verification then composes two instruments: `claim_defensibility` names a phrase the
ledger does not carry, and `verify_prose_quotes.py` answers whether it is in the corpus
at all. In neither = the Hetzel class, a ship-blocker. In the corpus but not the ledger =
elaboration from a listed source, which is fine.

## Standing note: the snapshot hash is not portable

`compute_snapshot_hash` folds `file_path` into the digest, so identical text hashes
differently under a relative glob than an absolute one (`a2d924a5` vs `54c7e3c1`).
Nothing is broken — `book_mash/config.py` and `mash_agent` both absolutise against the
config file's directory — but a run launched from a git worktree at another path would
produce a different hash over the same text, and `panel_merge` would refuse to merge the
two. Left unchanged: re-basing the hash would strip published panel v8 of a snapshot
anyone can recompute.

---

# Results — the run itself

534 paragraphs, snapshot `54c7e3c1`, agent-judged, **not** canonical panel.

| | |
|---|---|
| mean | **91.6** (median 92.0) |
| `fail` band (ship-blockers) | **0** |
| paragraphs with a flagged span | **12** |
| flagged spans | **14** |

The score is a first reading on a changed instrument. It is not comparable with any
earlier number and it is **not** evidence that the book is well anchored — a judge shown
all 54 claims has more surface on which to find *some* match, which corrects the false
"unsupported" flags but makes the opposite error likelier. The defect list is the result;
the mean is context.

## Triage — every flagged span was read

**Two real findings.**

1. `chapter-10#L36` — *"AI changes nothing"* was printed as Dax Raad's quoted provocation.
   He never says it: **zero occurrences across his 3,374-word talk**. It is the title of
   `108-o3gmwzo-Mik-ai-changes-nothing-dax-raad-opencode`. This is the **fourth** instance
   of the talk-title-as-speech pattern, after Morris and Carey (fixed 08-28) and Hetzel's
   outright fabrication. Now attributed as a title. The argument is untouched.

2. `chapter-5#L106` — *"cut their input tokens by a measured 94 percent"* overstated the
   source in two ways at once. Sakthivel measured 94% on a **public benchmark** (FastAPI,
   53 files, 20 questions), not on Tesco's codebase, and he volunteers the limit on stage:
   *"The 94% again the worst case, reading full files every time… Real savings are lower
   than 94%."* The book's "their … measured" claimed a realised production result. Now
   states the benchmark and carries his caveat. A book about source-anchored claims should
   not be less careful than its source was.

**Four flags where the book is right and the checker is not.** Two are ASR corrections —
Khattab's transcript reads *"birth text Davinci 2 up to four 04 mini"* where the book
correctly prints `text-davinci-002` and `o4-mini`, and Factory's reads *"serial execution
with **with** targeted internal parallelization"*. Two are talk titles the book **already**
handles correctly: *The Friction Is Your Judgment* in italics after "Their talk, titled",
and "Matt Carey's talk title names the trap precisely". Those two are what a correct fix
looks like, and they are why finding #1 is a defect and they are not.

**Three verified-correct attributions.** Kelly's *"code review is by far the most important
skill"* is verbatim in his own talk; his four-nines/thousands-of-users/gigabytes definition
of production is near-verbatim and unquoted; and Rogut really does relay Jeff Dean —
*"the exact quote is you don't need a trillion at once, you need the right million."*

**Five ledger-coverage gaps, not attribution defects.** `pass@k`, lost-in-the-middle,
step-up auth, tool-descriptions-as-input, and the voice-interface behavioural claim are all
unquoted book-voice assertions with no named attribution. Matin's four controls likewise:
the ledger records only sandboxing to him, but **all four are in his talk** — sandboxing,
disabling internet access, unprivileged sandbox via seccomp/landlock, and "finally
requiring human review". The ledger is thinner than the corpus here. That is a ledger
backlog item, not a prose defect, and it is the lower-severity class.

## What the judges caught that I had not

Two judges reported, unprompted, that **the calibration note was in none of the 54 batch
files**. They were right: the edit wiring `_OR_SOURCE_NOTE` into `_write_batch` was applied
in a patch script that raised on a later assertion before writing, so the constant survived
and the call site did not. The run stands, because the identical calibration text was in
every dispatch prompt and so was delivered uniformly — but the batch file is meant to be
self-contained, and it was not. Fixed and verified by rendering.

## Residual this pass does not close

The "or source" clause makes a quote backed when the speaker is *any* listed source for the
claim. A real phrase, from the right speaker, attached to the **wrong** claim still passes.
One judge surfaced exactly that shape (Kelly quoted on review capacity, where his only
ledger anchor sits on the vibe-coding entry); it checked out here, but the instrument would
not have caught it if it had not. The earlier quote audit flagged the same gap from the
other direction. Neither pass closes it.
