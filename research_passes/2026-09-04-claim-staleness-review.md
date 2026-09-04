# Research Pass — 2026-09-04 — Reviewing 30 claims against later evidence

The operator declined to freeze book 1: new talks keep arriving and some claims may have
aged. That makes staleness a standing question. Thirty ledger entries whose cited evidence
predated the corpus growth were read against later material by five parallel reviewers,
each required to quote any talk it asserted something about.

## Result: 2 genuinely outdated pieces of evidence out of 30 claims

**Not a single claim statement was falsified.** Support levels hold. What decayed was
evidence *inside* claims — which is the failure mode anchor verification cannot see, because
a quote can resolve perfectly to its timestamp and still assert something no longer true.

### 1. `claims#28` — a novelty claim that novelty killed

> "there's this third thing, which I think is like really new and no one is doing it yet,
> which is training things into weights." — #48, Jack Morris

Overtaken by 19 later talks on fine-tuning and post-training, most directly
**#851** (Will Brown, Prime Intellect, added 2026-07-27): *"we also train models with our
customers where we have lots of people we work with who their goal is to do large scale
model training on their own workflows"*, and **#975** (Raymond Feng, Applied Compute, added
2026-08-04) on bring-your-own-harness training against production traces. Morris's note
entered 2026-06-04, so these are seven to eight weeks later.

The claim itself — context misassembly is the next failure frontier — is untouched, and its
other three sources are unaffected. Marked `**Superseded**` in place. The prose was checked
first: the stale half never reached a chapter.

### 2. `claims#35` — a 2025 survey cited while its 2026 edition sits unused

The sharpest finding, and the one that matches "outdated **versions**" exactly.

`#137 — The 2025 AI Engineering Report (Barr Yaron, Amplify)` is an annual survey. **The
same speaker's 2026 edition is in the corpus as #906, added 2026-07-27, and is cited nowhere
in the ledger.**

The quoted 80% figure stands as a 2025 datapoint. Its *next sentence* does not:

| | |
|---|---|
| #137 (2025) | "less than 20% say the same about agents. Agents aren't everywhere yet, but they're coming." |
| #906 (2026) | "95% say they're using agents, roughly double last year." |

Marked `**Newer edition**` rather than `Superseded`, because the cited quote itself is fine —
what is stale is the *edition*. Only two dated-edition sources are cited anywhere in the
ledger, and this was one of them.

## The rest: no claim falsified, but real enrichment found

* **`claims#5` and `claims#62` — a counterpoint that was always available, not newer.** Two
  reviewers reported Matt Pocock (#621) contradicting spec-as-stable-control-surface: *"the
  specs to code movement… I tried this. I really tried it and it sucks."* **Both framed it as
  newer material and both were wrong** — #621 entered 2026-05-25, *before* #40 (06-04) and
  #265 (06-04), the very sources those claims rest on. So it is not decay; it is contrary
  evidence that sat uncited in the corpus while the claims were written strong. Arguably the
  worse finding. #1021 (Ankit Jain, 2026-08-20) *is* genuinely later and carries the same
  objection independently.
* **`claims#45`** — reported as having no valid supporting sources, with #689 (incident.io)
  documenting the mechanism failing operationally: production-mined evals *"become extremely
  unmaintainable very quickly"*. Unverified here; flagged.
* **`claims#46` and `claims#9`** — two reviewers independently found a cited quote that does
  not support the claim it is filed under (#138 Bhagwat under bounded authority; #184 Colvin
  under realistic evals). This is the exact residual left open on 09-03: a real phrase from
  the right speaker attached to the wrong claim passes every existing check.
* **`claims#70`** — #704 (Ona) names an unsolved sixth requirement, coordination, absent from
  the entry's five-component list.
* **`claims#32/#33`** — flagged unreviewed: #703 (Paige Bailey, DeepMind) says *"mostly people
  have kind of moved away from MCP servers and are adopting skills"*. A live outdated
  candidate for the MCP-adoption entries. Not investigated.

## What this corrected in the instrument

`check_claim_staleness.py` shipped hours earlier asserting playlist index was the recency
signal. A reviewer disproved it from the tape: **#621 says "this is what my keynote is on
tomorrow", and that keynote is #1** — so a 621 precedes a 1. Index order disagrees with
git-add order on 32 of 1073 adjacent pairs. The tool now dates every note by when it entered
git and compares each claim against its *own* newest source rather than a global cutoff.

That correction also changes what the output means: per-claim, **70 of 71 claims** now have
later same-topic material, because the corpus grew after nearly every claim was written. The
count is not the signal; the score threshold and human reading are.

## Standing conclusion

Topic overlap is almost never staleness. Thirty claims, five reviewers, and the honest yield
is **two** decayed pieces of evidence — both now marked in place, neither requiring a claim
to change. The ledger held up. The value of the pass is that it is now repeatable and that
two marking conventions exist:

* `**Superseded (date):**` — the quote's assertion has stopped being true
* `**Newer edition (date):**` — the quote stands, but a later edition of that source exists

Neither ever deletes: the speaker did say it, the anchor stays valid, and the book may want
the quote as a marker of when something was still new.
