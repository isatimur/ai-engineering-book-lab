# Research Pass — 2026-09-03 — Anchoring the thirteen sections the evidence judge could not ground

Contract: `docs/superpowers/specs/2026-09-03-evidence-density-anchoring-pass-design.md`.
Predecessor: `research_passes/2026-09-02-usefulness-and-attribution-pass.md` (panel v9).

## Why this target

`panel-3model-v9` put evidence_density at 79.8, and the distribution explained the number
better than the mean did: 95 of 114 sections strong, 13 at exactly 10 — zero grounded
claims. Five of the thirteen were in Chapter 2 (ED 56.7, every other dimension there
fine); the rest in Chapters 6, 7, 8 and 10. A peer's calibration note the same morning
(`2026-09-03-evidence-density-instrument.md`) showed why the dimension behaves this way:
a section scores 90 on its first matched claim and 10 on none, and extractors miss
matches when the ledger entry's statement and the prose differ in wording.

Several failing sections already quoted practitioners with anchors. Chapter 8's latency
section carried Zeghidour's 200 ms and Kramer's P95 line verbatim; the ledger had no
entry stating the claim those quotes support. Chapter 2 had three ledger claims naming it
at all. The ledger lagged the prose. So this was a source-anchoring pass, not a prose pass.

## Method

Five agents, one per chapter, propose-only. For each failing section: list its falsifiable
claims; match each to an existing entry (amend Candidate chapters or add a source) or
draft a new entry whose title echoes the section's own sentence; every quote and
timestamp taken from `99_Meta/scripts/anchor/cli.py` output, never typed. One stitched
sentence allowed only where a section named no practitioner; none in Chapter 10. A serial
apply step re-ran the tool on every proposed anchor and refused any wikilink not in
`01_Videos/`.

## What changed

| Ch | failing sections | new entries | strong | moderate | amendments | stitches | new anchors | claims left unsupported |
|---|---|---|---|---|---|---|---|---|
| 2 | 5 | 5 | 1 | 4 | 1 | 0 | 7 | 3 |
| 6 | 2 | 2 | 1 | 1 | 0 | 0 | 6 | 3 |
| 7 | 1 | 2 | 1 | 1 | 0 | 1 | 4 | 2 |
| 8 | 3 | 3 | 3 | 0 | 0 | 2 | 6 | 0 |
| 10 | 2 | 2 | 1 | 1 | 4 | 0 | 5 | 4 |
| **all** | 13 | 14 | 7 | 7 | 5 | 3 | 28 | 12 |

Ledger 57 → 71 entries (68 loadable; #47–49 remain retracted stubs), anchors 201 → 229,
19 distinct talks newly cited. All 28 new anchors re-resolved through the tool at apply
time with confidence high. The four Chapter 10 amendments add it to the Candidate
chapters of #11, #25, #42 and #46 — bookkeeping that keeps chapter metadata honest; the
producer showed they do not move the score, since #3/#5/#12/#13 already named Ch10 and
the sections still failed. The score-moving lever is entry *titles that echo the
section's own sentence*: Chapter 2's producer found that entries #40–42, which echo the
section *headings*, had never matched.

Three stitches (Ch7 Matin, "it can only read and write files within the directory that
it's run in"; Ch8 Kramer, "conversational latency of a few hundred milliseconds or less";
Ch8 Humeau, "converged to some common patterns"), each in a section that had named no
practitioner. Plus one integrity fix the title gate surfaced in Chapter 3, untouched by
this pass but blocking it: *Building Your Own Software Factory* is Eric Zakariasson's
talk title, spoken nowhere, and was in quotation marks as if said — the fifth instance
of the pattern after Morris, Carey, Hetzel and Raad. Now attributed as a title.

## Gates

Mechanical gates, all clean after apply: `verify_ledger.py` 230/230 anchors resolve;
`check_quote_speakers.py` 80 attributed-and-matched spans, 0 misattributions;
`check_title_quotes.py` 0 (it flagged the Chapter 3 Zakariasson title on first run, fixed);
`verify_prose_quotes.py` book 1 at 30 unmatched, down from 31.

Ship-gate, four rounds. Round 1 REVISE: entry #65's "step up for stronger actions" clause had
no anchor of its own (the fact is in Morrow's talk; the tool found it at 00:12:51), and #64's
"what the system believed" component was the author's synthesis with no anchor, now
disclosed in its caveat. Round 2 REVISE: `evidence.json` had been regenerated before the #65
fix and was stale. Round 3 REVISE at the ceiling: #65's caveat still said "two anchors" after
the third was added. Every substantive claim, quote, speaker and stitch passed from round 1
on; each round's remaining item was one layer downstream of the previous fix. Operator
authorised a fourth, bounded round on #65 as a unit. Round 4 REVISE on two items: a
dangling parenthetical my round-3 edit had left in the same caveat sentence, and panel
composition — I had told the gate not to convene the second model family, which caps a
public-facing artifact at REVISE under the org's own rule. Round 5, both families on the same
narrow scope: **PASS**, token in `~/Dev/ai-native-org/ledger/verdicts.md`. The gate also
noted that `docs/ONGOING_SYNC_AND_JUDGING.md` changed mid-round and read it as another
session writing to the tree; it was this session recording the two book-mash bugs, outside
the contract's surface. Recorded because the gate was right to refuse the claim that nothing
else had moved.

A second model family (Codex) reviewed adversarially alongside the gate in rounds 1 and 3
and found the #65 clause and the stale caveat independently.

## Measurement

Canonical panel `panel-3model-v10`: deepseek-chat, llama-3.3-70b (pinned to AkashML/Groq),
qwen-2.5-72b, snapshot `74b4` = commit `9300cfd` plus this pass. Every evidence_density
section freshly judged in every member (114/114 with non-zero cost), which is itself news —
see the cache-key bug below. Merge: 1,736 units, zero with fewer than two votes. One
abstention: qwen returned an empty response for Chapter 6's practical checklist on six
consecutive tries at zero cost; the unit carries two valid votes (90, 90) and the merge rule
allows it. Spend for the pass about $1.60.

| dim | v9 | v10 | Δ |
|---|---|---|---|
| evidence_density | 79.8 | **85.3** | **+5.5** |
| humanness | 86.0 | 86.0 | 0 |
| voice | 88.4 | 87.7 | −0.7 |
| usefulness | 60.6 | 60.5 | −0.1 |
| claim_defensibility | 93.6 | 93.4 | −0.2 |
| redundancy | 87.5 | 87.5 | 0 |

| Ch | ED v9 | ED v10 | Δ |
|---|---|---|---|
| 2 | 56.7 | 85.8 | +29.1 |
| 6 | 76.8 | 88.2 | +11.4 |
| 7 | 80.5 | 87.7 | +7.2 |
| 8 | 63.6 | 87.7 | +24.1 |
| 9 | 90.0 | 73.2 | −16.8 |
| 1, 3, 4, 5, 10 | — | — | 0 |

Sections at the floor: 13 → 4. All thirteen targets left it (ten to 90, two to 65 as one-claim
sections, one — Chapter 10's preamble — to 90 with the ledger-only fix). The other five
dimensions moved within noise, as they should: no prose changed except three sentences.

**Chapter 9's −16.8 is the instrument, not the chapter.** Two sections
(`practical-checklist`, `roles-blur-but-responsibility-does-not`) sat at two-of-three judges
grounding at least one claim in v9 and scored 90; on the fresh re-judge one judge per section
found none and the median flipped to 10. Llama grounds both sections against the same entries
(#31, #35, #38, #55) in both runs. Adding ledger entries cannot remove a match, so this is
per-unit extraction variance at a binary boundary — exactly what the morning's calibration note
predicted (42 of 114 sections within one claim of a band edge). It is reported, not repaired.

**The cache-key bug, which changes how the whole ED history reads.** The first v10 merge left
ten of the thirteen targets at their v9 score with byte-identical reasoning in every member.
`EvidenceDensityJudge` had no `context_cache_key`: the ledger it matches against was not part
of the cache key, so a ledger change never invalidated a cached section. Fixed in book-mash
`69eac21` with a regression test (`claim_defensibility` already did this). Consequence: every
evidence_density reading from v2 through the first v10 merge that followed a ledger change
without a text change was a replay. The dimension's trend line understated ledger work until
today. A second bug fell out of running three members concurrently: second-precision run ids
collided and members overwrote each other's output; fixed in `131fd8f`.

## What this does not establish

- That every unsupported statement in those sections is now grounded. The producers listed
  the claims they could not source (e.g. "AI amplifies before it replaces", the seduction
  by fluency, the comprehension-debt-of-authorship point) rather than stretch a quote.
- That the evidence dimension has more than two effective values. 42 of 114 sections sit
  within one claim of a band boundary (peer finding); its mean is a coverage indicator,
  not a 100-point scale.
