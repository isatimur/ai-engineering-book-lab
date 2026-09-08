# Research Pass — 2026-09-09 — Re-running the audit batch that was silently lost

The [2026-09-04 misfiling audit](2026-09-04-ledger-misfiling-audit.md) claimed all 71 ledger
entries had been read against their sources. That was false. One of six review batches —
entries 22, 23, 24, 26, 27, 29, 30 — died on a rate limit and never reported. I counted agents
dispatched instead of verdicts returned, so a batch that failed looked exactly like a batch that
found nothing.

`claims#29` was covered later by accident, when the agenda-quote detector independently found
its mis-filing. The other six had been read by nobody, and the audit's own summary was
carrying them as clean.

This is the failure the whole project exists to catch: a completeness claim recorded as
established without the check that would test it. Recording it here rather than quietly
re-running it, because the interesting part is not the defects — it is that the ledger's
process produced a confident false statement about its own coverage.

## Result: the lost batch was the richest of the six

Seven mis-filings in three of its six entries. Every other batch found zero, one, or two.

| Entry | Verdict |
| --- | --- |
| claims#22 | clean — 1 source, 2 anchors |
| claims#23 | clean — 2 sources, 3 anchors |
| claims#24 | clean — 3 sources, 4 anchors |
| claims#26 | 3 mis-filings of 7 sources |
| claims#27 | 3 mis-filings of 4 sources |
| claims#30 | 1 mis-filing of 3 sources |

### claims#26 — three agenda lines, three same-talk replacements

All three quotes named a subject instead of asserting one. Neo4j's *"we want to look at
patterns for successful graph applications"*, NVIDIA's *"how can we create a graph rack system
what are the advantages of it"*, and Zep's *"why you need to model your memory after your
business domain"* — the last a topic label lifted out of the middle of an agenda sentence
(*"I'm here today to tell you that... and why you need to..."*).

All three talks argue the claim properly a couple of minutes later, so all three were replaced
from the same speaker rather than dropped.

### claims#27 — two sources evidenced nothing and were dropped, not re-quoted

The Mendelevitch talk is 853 words end to end. Its *"about 73% of LM customers... say that
factual accuracy is their top challenge"* is the setup for hallucination mitigation, not a
statement about working sets, and the transcript contains no corpus-size-versus-relevance
argument anywhere. The reviewer proposed a substitute — *"we have corpus understanding which
allows you to plan properly based on your data"* — and I rejected it: that is a product feature
list, and swapping it in to preserve a source count is quote-shopping.

The Harvey/Lance talk is worse. It argues the *opposite* emphasis (*"one of these corpuses can
be like yeah tens of millions of docs"*, *"the scale is just going to keep getting larger"*),
and the entry's own annotation about separating authoritative from background sources appears
nowhere in it. Two defects on one source: the quote and the annotation.

Glean's agenda line was replaceable — the talk makes the argument at 17:21, and makes it
better than the ledger did: *"when you want to search for something there will be like hundreds
or thousand of similar looking documents or workflows and uh the problem becomes how do you
choose the right one"*.

**Support level dropped strong → moderate.** The claim was rated on four sources. Two of them
evidenced nothing. Fixing quotes while leaving the rating untouched would have preserved the
error in the number that actually gets read.

### claims#30 — a hook filed under the wrong claim

WorkOS's *"consent screens on top of consent screens"* is a real line, correctly attributed,
opening the talk. It is about OAuth friction — which is `claims#34`'s subject, not this
entry's. The trust-bridge material the annotation describes shows up five minutes later and is
now the anchor.

## Two of seven proposed replacements were not verbatim

The reviewer returned *"...how do you choose the right one."* and *"...between applications."*
Neither transcript has that punctuation; both are unpunctuated ASR. Checked before editing, as
the earlier confidence-downgrade incident taught. Same trap, caught this time by policy rather
than luck.

## What this changed downstream

Six of the seven defects sat in the **first ninety seconds** of their talk. That is a fact
about how the ledger was harvested, not about those talks — the opening of a transcript is
where speakers say what they are about to argue, before they argue it.

Measured on the pre-fix ledger:

| cutoff | share of anchors | share of batch-3 defects |
| --- | --- | --- |
| < 60s | 11% | 4 of 7 |
| < 90s | 15% | 6 of 7 |
| < 120s | 18% | 6 of 7 |

That became `99_Meta/scripts/anchor/rank_early_anchors.py` — a triage tool, not a detector. It
does not vote. Early anchors are often honest.

It also re-prioritised book 2. **48 of book 2's 93 anchors are under ninety seconds — 52%,
against book 1's 15%.** Book 2's ledger was not built the same way, and its expected defect
count is correspondingly higher.

## Process change

The lost batch was invisible because I tracked agents launched, not verdicts returned. From
here, a dispatched entry list is written to a file and diffed against the IDs appearing in
returned reports. A missing entry has to fail loudly; silence must never read as clean.

Anchors went 245 → 243. All resolve.
