# Research Pass — 2026-09-04 — Reading all 71 ledger entries against their sources

Two mis-filed quotes were found earlier today by reviewers reading entries against their
sources — a verbatim quote, from a listed speaker, filed under a claim it does not support.
Nothing in the toolchain detects that class: the anchor resolves, the speaker is real, the
words are exact. So the remaining 41 entries that had never been read this way were read.

Six reviewers in parallel. One batch died on a rate limit; its entries were covered
afterwards by the mechanical check below.

## Result: 8 mis-filed sources across 71 entries

**No support level dropped.** Every affected entry was already carried by its other sources,
so each fix removed *false* support rather than weakening a claim. The ledger went from 243
resolving anchors to 244.

### A new defect class: the right words in the wrong mouth

`claims#16` and `claims#12` both credited Eric Zakariasson with:

> "maintaining a factory would require you to have an overview of the processes you want your
> coding agents to go through."

Those words are an **audience question**. The transcript runs *"…let's go ahead and merge /
you a quick question. This factory building leaves us with a scattered ecosystem… As
maintaining a factory would require you to have an overview…"* and Zakariasson's turn begins
only at the next `>>` marker: *"Yeah, it's it's a really good question."*

Real words, real transcript, resolving anchor, wrong speaker. And it had been **copied into
two entries** — the second only surfaced because the ledger was grepped after the first fix.
Both now cite his own answer.

### One mis-titled note produced two bad citations

`claims#8` cited #184 (Colvin, *Human-seeded evals*) with a generic opener — *"We still want
to build reliable scalable applications and that is still hard"* — under a claim about evals
as a control system. The decisive evidence is Colvin himself, twice:

> "I'm not going to be able to get to the eval stuff today"
> "I won't talk about how eval split in because I don't have time."

The talk is titled *Human-seeded evals* and contains no eval content at all. That is why the
**same talk** was also mis-filed under `claims#9` hours earlier. A note whose title does not
match the delivered talk is a standing trap for anyone citing from the title.

### The rest

| entry | cited | what the quote was actually about |
|---|---|---|
| `claims#65` | #152 Matin | Codex network egress; zero hits for scope / credential / token / permission |
| `claims#11` | #653 Alvoeiro | the talk's 19-second opening promise about capability scaling |
| `claims#36` | #207 Glenfield | technical hiring; all 957 words read, nothing on review or governance |
| `claims#39` | #160 Stein | product management under probabilistic behaviour, single-team throughout |
| `claims#29` | #85 Debnath | vision-based retrieval; **zero** latenc / mask / filler / millisecond in 13,223 words |
| `claims#36` | #162 Lowe | the AI-PM role; zero review / governance / guardrail / approval |

Where the speaker's own talk carried the claim elsewhere, only the anchor moved (`claims#11`).
Where it did not, the source was removed rather than re-anchored (`claims#29`) — there was no
on-point material to move to.

## One subclass turned out to be mechanical

The general class needs a reader. But the **agenda line** — a speaker declaring their own
topic — is a regex away, and it carries near-zero evidentiary weight while passing every
automated check. `check_agenda_quotes.py` found `claims#29` (in the batch that died) and
confirmed `claims#36`'s second defect.

It deliberately still reports one hit. `claims#37` quotes *"I'm going to talk about how we pay
engineers. And we pay engineers like salespeople."* The second sentence **is** the thesis, and
the talk backs the ledger's annotation (*"my belief is that this is an incentive issue"*).
Naming a source's thesis can be the honest choice, which is why the tool says candidates, not
verdicts.

## What this does and does not close

All 71 entries have now been read against their sources at least once. Thirty-four of the 41
in this pass came back clean, and the reviewers were explicitly told that a quote supporting a
claim in different words is *correct* — the discipline that came from the failed detector
experiment earlier today.

What it does not close: reviewers also flagged several **weak-but-clean** citations — agenda
lines whose talks are on-subject, sub-sentence anchor slices, a quote that is adjacent rather
than on-point. Those are quote-upgrade opportunities, not defects, and they are a separate
pass. Nor does one reading make an entry permanently safe: the same reviewers disagreed about
borderline cases, and a second pass would likely surface a different handful.
