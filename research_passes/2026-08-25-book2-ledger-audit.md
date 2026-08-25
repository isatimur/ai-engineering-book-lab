# Research Pass — 2026-08-25 — Book 2 ledger audit

- **Target:** book 2's ledger reached 43 claims / 93 anchors in days. Does it hold to book 1's evidentiary conventions?
- **Trigger:** `claims-2/` had no CI path coverage (now fixed) and had never been audited.
- **Scope:** structural audit only. No claim was edited — `claims-2/` belongs to the second-book drafting track.

## Verified healthy

- **Anchors: 93/93 resolve** to their quotes (`verify_ledger.py`). Book 1 is 198/198 after one fix. Book 2 required none.
- **Evidence is well spread:** 82 distinct videos across 93 anchors; the most-cited video carries 3. No claim rests on a narrow source cluster.
- **Median 2 anchors per claim**, range 1–4.

## One convention drift, measured

Book 1's practice is that **"strong" means corroborated**. Book 2's is looser:

| | strong claims | of which single-anchor |
|---|---|---|
| book 1 | 44 | **1 (2%)** |
| book 2 | 29 | **5 (17%)** |

Eight times the rate. The glossary defines support level as *"how well-evidenced
a Claim is — tentative, moderate, or strong"*, and book 1 has treated a lone
anchor as insufficient for "strong" in 43 of 44 cases. That is an established
norm, not a preference of mine.

The five in question:

- **#3** — Code is the best domain to scale RL, because its rewards are automatic
- **#14** — Perceived "stagnation" is a training-budget story, not a ceiling
- **#25** — The frontier bet in robotics is one general model for any robot, any task
- **#26** — In embodiment, the bug is usually the system, not the policy
- **#29** — Broad embodiment depends on tiny models, not frontier ones

Three of the five (#25, #26, #29) are contested industry *predictions* about
robotics, which is where single-source support is least defensible — a
prediction sourced to one speaker is that speaker's opinion, however good.

## Recommendation (for the book-2 track to accept or reject)

Either find a second independent source for each, or relabel to **moderate**.
Both are cheap; leaving them as-is is the only option that costs something,
because it spends book 1's hard-won convention on claims that have not earned
it. Book 1 shows the standard is achievable at scale: 198 anchors, one
exception.

## Not checked here

Whether each claim's *text* is supported by its quote — that is a reading task,
not a structural one. This pass verified that anchors resolve and that support
levels match convention, nothing more.
