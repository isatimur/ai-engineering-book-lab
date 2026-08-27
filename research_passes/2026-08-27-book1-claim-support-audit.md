# Research Pass — 2026-08-27 — Book 1: claim-to-quote support (partial)

- **Target:** the same audit run on book 2 — does each quote actually support its claim? Book 1 matters more: it is **published**, and `/evidence` shows the ledger to readers as proof of method.
- **Status: PARTIAL.** The audit hit the org monthly spend limit mid-run. Claims **29–42** completed; 1–28 and 43–54 did not. Recorded rather than silently abandoned.

## What completed: claims 29–42 — clean

**13 of 13 SUPPORTED**, no overreach. Notably the evidence is genuinely diverse
where book 2's was not: #31 spans OpenAI, Cloudflare, an independent
Apple-PCC analyst, Los Alamos and Google; #37 rests on three large-scale studies
(120k devs, 100k devs, 20M PRs) rather than talk-stage assertion.

Two light-touch flags, both the book-2 pattern of *honest caveat, optimistic
level*:
- **#33** — "converges" reads as an industry-wide trend from three vendor talks (Anthropic, GitHub, Keycard) who all sell this architecture.
- **#39** — the caveat calls "alignment debt" a "freshly-coined term… not yet" validated, while the level says **strong**. Should be moderate.

## What a cheap mechanical filter found — and one real defect

With agents unavailable, a free structural filter (superlatives, causal
clauses, quote counts) flagged **3 of 54** claims. Book 1 is far denser than
book 2: **198 quotes / 54 claims** with only **2 single-quote claims**, against
book 2's 93 / 43 with 10. That density is why book 2's dominant failure mode —
one company generalised into a field-wide law — barely appears here.

The top-ranked flag turned out to be a real, live defect.

### #45 — "The best evals encode judgment mined from operational history" (was: strong)

Its **only** source is Preeti Somal (Temporal), quoted as *"handle state
potentially over long periods of time. There needs to be human interaction for
approvals"* — durable execution and approvals, not evals. Checked the
transcript directly: **"eval" appears 0 times, "observability" 0 times.**

The cause is visible in the ledger itself. A **2026-08-22 correction** removed
this claim's only on-point source — a "Govind Jain, Stripe" video with a
crawl-commit-history-and-grade-reproduction recipe — because **that video does
not exist anywhere in the corpus**. The fabricated source was correctly deleted;
the claim was left behind at **strong** with nothing supporting it.

**That is the finding worth generalising: a correction that removes a source
must re-examine the claim's support level.** Deleting bad evidence silently
converts a well-supported claim into an unsupported one wearing a strong label —
and this one was live on the site.

Fixed here, following the file's own correction convention: level lowered to
**tentative**, the remaining source annotated with what it actually covers, and
a dated correction block explaining why. The claim may well be true — Chapter 4
argues it independently — but the ledger has no evidence for it right now.

## The other two mechanical flags — resolved without agents

- **#53** "Agents fabricate having verified" — **SUPPORTED**. Its quotes carry it
  directly: *"The agent gets blocked, it needs to please you and it makes things
  up"* and *"There's no error, no warning, just the wrong answer."*
- **#44** "Subagent specialization makes process explicit and encodes team
  judgment into roles" — **mild OVERREACH, but honestly labelled.** Its quote
  (*"a good harness is really operationalized around giving the model text at the
  right time"*) is about harnesses generally, not subagent roles, and the source
  transcript mentions "sub agents" exactly once, in a passing list. The bridge
  from quote to claim is the ledger's gloss.
  **Not edited**, and the distinction from #45 is the point: #44 is already
  marked **moderate**, single-source, with a caveat. The label tells the truth
  about the evidence. #45 claimed **strong** with zero support — that was a
  factual error about the ledger's own state, which is why it was fixed and this
  is only flagged.

## Honest limits

- Two thirds of book 1's claims (1–28, 43–54) are **still unaudited** for
  claim-to-quote support. The mechanical filter cleared them structurally, which
  is much weaker than a read.
- The filter cannot see the book-2 failure modes that matter most: a hedge
  asserted flatly, a foil quoted as a verdict, a mechanism no quote mentions.
  Only reading finds those.
- Resume with claims 1–28 and 43–54 when budget allows.
