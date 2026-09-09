# Research Pass — 2026-09-09 — Reading all 43 of book 2's ledger entries against their sources

Book 1 had every entry read against its sources. Book 2 had only mechanical checks: anchors
resolve, speakers are real, one agenda quote. That asymmetry was the clearest remaining gap, and
closing it was overdue.

Dispatch manifest: [`2026-09-09-book2-audit-dispatch.json`](2026-09-09-book2-audit-dispatch.json).
Three batches, 43 entries, no entry unassigned. Batch 2 died on a session limit and was re-run —
this time the failure was visible within seconds, because the manifest exists to be diffed against
returned reports. That is the process change the [lost-batch
pass](2026-09-09-misfiling-batch-3-rerun.md) promised, working on its first outing.

## Result: 29 defects in 43 entries

Book 1's audit found 8 in 71. Book 2's rate is roughly six times higher, which the measurement
below had predicted before a single entry was read.

| batch | entries | entries with defects | defects |
| --- | --- | --- | --- |
| 1 | 15 | 9 | 9 |
| 2 | 14 | 11 | 15 |
| 3 | 14 | 5 | 5 |

Six sources were **dropped outright** — no replacement — because a keyword sweep of the whole talk
returned zero or near-zero hits on the claim's subject:

| entry | source | swept for | hits |
| --- | --- | --- | --- |
| claims#2 | #397 NVIDIA | reinforcement, rl, rlhf, post-train, reward, policy gradient | 0 |
| claims#7 | #316 Modal | market, revenue, price, econom, dollar, business, spend | 0 |
| claims#23 | #244 fal | orchestr, chain, pipeline, compos, specialized, combine, stack, workflow | 0 |
| claims#1 | #251 Reflection | agentic, multi-turn, tool use ("agent" once, in Q&A) | ~0 |
| claims#11 | #547 Groq | LPU, silicon, chip, hardware, architecture | 1, in Q&A |
| claims#16 | #49 Poolside | world model, verifiab, start with code, generalize | 0 |

claims#2 is the sharpest of these. The claim asserts that **RL** is the post-training method that
carries a model to production. The cited talk never says "reinforcement learning" — its data
flywheel is explicitly SFT and LoRA, the very method the claim says cannot ingest field feedback.
The quote was not merely off-subject; it was evidence for the opposite mechanism.

Where the talk *did* argue the claim, the anchor was replaced rather than dropped: 30 replacements
and widenings in all, every one re-verified verbatim against the word-level VTT before editing.

## The dominant shape: the agenda-sentence lift

Book 1's defects were varied. Book 2's cluster hard on one pattern — a clause excerpted from
inside a sentence whose main verb is *"today I'm going to talk about"*.

The cooking-robot entry is the pure case. Its anchor **and all three of its label's quoted
phrases** came from a single sentence 17 seconds into the talk:

> "Today I'm going to tell you guys how we took a general purpose robot that was not meant for
> cooking. It was just a robot with two hands. how we trained it or put it through culinary school
> and it's now a professional chef that's working in various different kitchens doing actual real
> work like a chef."

The whole entry rested on a promise to speak, not on anything argued. Two minutes later the
speaker states the actual generalization mechanism, and that is now the anchor.

Mistral's entry is the same shape with the best available repair: *"why we do open source and how
we do open source"* — a subject named, nothing evidenced — replaced by the passage five minutes
in where he answers it: *"open source is somewhat uh competitive with profit that's actually not
the case."*

## Two defects worth naming separately

**A truncated quote that reversed its own meaning.** claims#39 anchored *"everybody can build a
game over the weekend,"* — trailing comma included — under a claim that building a good AI game
is harder than the demo suggests. The sentence continues *"but what is the next thing?"* Read
alone the quote asserts the opposite of the claim it supported. **A trailing comma on a ledger
quote is now a known tell.**

**A correction that was itself wrong.** claims#3's 2026-08-28 note said the source "states only
that coding is the 'root node' problem" and that "the automatic-verifiability mechanism is this
ledger's synthesis, not the speaker's words." Chowdhery states it herself, twice and explicitly.
The old anchor was her company's mission statement; the claim's real proposition sat 45 seconds
earlier. The support level stays `moderate`, but the recorded reason is now the true one
(single-source) rather than a false statement about the source. A downgrade with a wrong reason is
still a defect — it teaches the next reader something untrue.

## A new mechanical check, and it caught both books

claims#32's *label* quoted the motivating challenge as "the reliability of executing numerous
chained" financial workflows. That phrase is nowhere in the transcript. `verify_ledger.py` checks
`**Quote:**` lines and had never looked at the prose above them — where 88 more inline quotations
sat unverified across the two ledgers.

`check_label_quotes.py` now checks them. Nine candidates, all read by eye, two classes:

- **Smoothed** — the substance is on tape, the wording tidied. A label wrote "is an algorithm"
  where the tape stutters "is an an algorithm"; another dropped two "um"s. Mild, still a misquote.
- **Never spoken** — `"from hype to habit"` scores **zero hits on both words** in a 1,948-word
  talk. `"from monitoring to fix"` has no "monitor" anywhere in its source. claims#25's definition
  of context platform engineering is not uttered, though the speaker does describe a toolkit that
  "lets you configure agent swarms". These are slide text or report phrasing. **ASR never captures
  on-screen words, so slides are a legitimate source — they are just not speech, and nothing in
  the ledger distinguished the two.** They are now labelled for what they are.

## What predicted the defect rate, and what it cost to know

Six of the seven defects in the earlier lost batch sat in the first 90 seconds of their talk. That
produced `rank_early_anchors.py` and, with it, a testable prediction: book 2 has **48 of 93
anchors under 90 seconds (52%)** against book 1's 15%, so its defect rate should be far higher.

It was. The prediction was made before any entry was read and held.

The mechanism is not subtle. Harvesting an anchor from the opening of a transcript lands on the
part where speakers say what they are *about* to argue. Book 2's ledger was built that way; book
1's largely was not.

A second, independent signal points the same way. Support levels in book 1 discriminate: P(a
`strong` entry has more sources than a `moderate` one) = **0.79**. In book 2 it was **0.57** — near
chance, with 31% ties, and both labels sharing a median of 2 sources. Source count is only a
proxy, and one on-point source can outweigh three adjacent ones, so `check_support_levels.py`
prints and never fails. But the reading confirmed what the number suggested.

## Levels changed

`claims#2` strong → moderate (single-source). `claims#7` moderate, now flagged single-source.
`claims#16` strong → moderate (single-source). `claims#23` moderate → **tentative**: its dropped
source was a conference pleasantry *and* the entry's own annotation ("a catalog of specialized
models chained under control") had no support either. `claims#27` (book 1) strong → moderate.

Book 2 stands at 88 anchors, all resolving, and passes every check: anchors, prose quotations,
attribution, agenda quotes, questioner quotes, titles.

## What this does not close

Book 2 rates `strong` on a median of 2 sources where book 1 uses 3. Thirteen of its `strong`
entries carry fewer than three. Whether that is a defect or a different-but-defensible standard is
an editorial decision, not a script's, and it is now measurable either way.

Nor does one reading make an entry safe. Batch 2 applied a stricter rule than the others —
treating any agenda-sentence lift as a defect even when the lifted clause was thesis-bearing —
which is part of why its count is highest. Its severity notes are per-case and honest about it.
Three readers, three calibrations, and the disagreement is itself information about where the
ledger's standard is unwritten.
