# Research Pass — 2026-09-18 — The 41 unmatched prose quotes, read at last

`verify_prose_quotes.py` has reported a standing "UNMATCHED" list for months — 30 spans in book 1,
11 in book 2 — quoted text that appears in no transcript we hold. The script labels them "drifted,
external, or self-quotation" and nobody had read them. This pass reads them.

## The question that makes the list tractable

Most unmatched spans are unmatched *by nature*. The books quote themselves constantly: rhetorical
questions ("Where is the human most valuable?"), illustrative dialogue ("One moment while I check
that"), framing devices. None of those claim a source, so none can be wrong about one.

The dangerous case is narrow: **a span the prose credits to a named person, which appears in no
transcript.** That is words in someone's mouth with nothing behind them, and it is the shape of
every attribution defect found so far.

## Result: two real defects, both now fixed

| | unmatched | credited to a person |
|---|---|---|
| Book 1, before | 30 | 1 |
| Book 1, after | 29 | 0 |
| Book 2, before | 11 | 3 |
| Book 2, after | 10 | 2, both cleared |

**Book 1 — an unmarked elision.** Chapter 2 quoted Corey Gallon: "then Monday rolls around, you
want to add a feature, and you realize that you don't understand it…". His tape reads "You want to
add a feature **or you want to change the way that it works** and you realize…". The book dropped
that clause with no ellipsis. Marked it. The quote now matches, which is how a silent compression
should end: not argued about, just repaired and verifiable.

Checked while there: "calls this the vibe-coding hangover" is *not* a title-as-speech defect
despite matching the talk's title. Gallon defines vibe coding and "the hangover" in adjacent
sentences and his own site for the talk is `vibecodinghangover.com`. The coinage is his.

**Book 2 — a dropped intensifier.** Chapter 2 quoted Sunny Madra as "Twenty-five years ago we
crossed the 1 gigahertz speed barrier". The tape says "**just** 25 years ago". The numeral-to-word
change is conventional; dropping "just" removes the recency emphasis the sentence is built on, and
there is no stated convention in `CONTEXT.md` or `AGENTS.md` permitting it. Restored to the tape.

**Book 2 — two that are the transcript's fault, not the book's.** Eugene Cheah's "surpass GPT-4"
and "compete with the big labs" are rendered correctly in the book and wrongly in the ASR output,
which has "gpd 4" and "big laps". They cannot match until the transcript is fixed. Recorded in the
new gate's cleared list with that reason rather than left to re-litigate.

## The new gate

`99_Meta/scripts/anchor/check_credited_unmatched.py`. The existing ceiling on unmatched count
catches an ADDED bad quote but not a SWAP: exchange one unmatched span for another and the count
holds. This gate asks the narrow question instead, and is blocking at zero.

It **composes** the two existing checks rather than reimplementing them — it shells out to
`verify_prose_quotes.py --json` for the span set and applies `check_quote_speakers.py`'s
attribution patterns. That was the lesson of this pass, learned the hard way: the first version
re-derived both, and disagreed with the real gate in both directions at once, missing the one real
book 1 defect while inventing three in book 2. A check built on its own reimplementation of another
check is a different instrument wearing the same name.

Proven to fail before being trusted: against a fixture crediting Samuel Colvin with an invented
sentence it exits 1; on the real corpus, 0. Ceilings drop to 29 and 10.

## What this does not establish

- **The cleared list is a promise to re-check.** Two entries, both blocked on ASR errors in one
  transcript. Fixing `wJwTlvb_TSo` would empty it. A cleared entry that outlives its reason is a
  permanent hole.
- **Attribution detection is pattern-based.** `credited_names` matches the shapes the books use
  ("Name says", "says Name", "(Name, Org)", possessives). A credit phrased outside those shapes is
  invisible to it, so zero flagged is not proof of zero credited.
- **Nothing here runs in CI yet.** The gates are wired into `evidence-gates.yml`, which stays
  dormant until a `CORPUS_TOKEN` secret exists, because every one of them needs the gitignored
  transcript corpus. Until then this is a local check that someone has to remember to run — which
  is exactly the condition that let these two sit in shipped prose.
