# Target 2 Delta — 2026-05-26 — Parallel-agent counter-claim

## Files modified
- `05_Book_Ideas/Chapter Packets v1/03_Harnesses_Specs_and_Codebases_Agents_Can_Actually_Use.md`
- `05_Book_Ideas/Chapter Packets v1/06_Runtimes_State_and_the_Human_Control_Plane.md`

## Named tension introduced

**In Chapter 3 — "the parallelism question."**

The "software factory" framing in #629 (Cursor, Zakariasson) and #632 (OpenAI Codex) leans on parallel sub-agents as the source of leverage — fan a master task into independent parallel units, spawn many workers, scale to hundreds or thousands. Luke Alvoeiro at Factory (#653) — another AI software-factory company — explicitly says Factory tried parallel software-engineering agents and abandoned them because "agents conflict. They step on each other's changes. They duplicate work. They make inconsistent architectural decisions." Factory's production system (Missions) runs features **serially** with one active writer at a time, and the 16-day mission run is the longest production data point in the corpus. Anthropic's planner-generator-evaluator (#691) is a third data point on the single-writer path — one generator at a time, each role in its own context window, with a file-based contract negotiated before any code is written.

The disagreement is not "parallel vs. serial" in the abstract. Both sides agree that read-only work parallelizes well (search, review, lint). They disagree about whether multiple **writers** working concurrently on the same codebase produce more output or more thrash. The chapter keeps the disagreement open and names it.

**In Chapter 6 — "coordination, not parallelism, is the unsolved primitive."**

Lou Bichard at Ona (#704) recasts the parallelism debate as a runtime question: runtime, orchestration, and triggers are solved (containers, Kubernetes, webhooks); what is missing is **coordination** — the agent-native primitive that lets workers pick up tasks, signal completion, and hand off without a human in the loop. This explains why the three shipping architectures in the corpus look different: each substitutes a known coordination mechanism (serial execution at Factory, file-based negotiated contracts at Anthropic, sub-agent fan-out at OpenAI Codex) for the missing primitive. Bichard's diagnosis is the cleanest framing in the corpus of where software-factory infrastructure actually stands.

## Source Anchors captured (both sides)

### PRO parallel workers as the throughput mechanism

- `rnDm57Py54A` 00:20:19.840 → 00:20:23.039 · **#629 Zakariasson, Cursor:** "spawn a shitload of agents and just like let them do the work"
- `rnDm57Py54A` 00:21:54.080 → 00:21:56.720 · **#629 Zakariasson, Cursor:** "you can scale this to like 100 or a thousand agents."
- `MhHEGMFCEB0` 00:32:50.559 → 00:32:56.960 · **#632 OpenAI Codex:** "you can spin off um a master task into decomposible parallel and independent tasks"
- `MhHEGMFCEB0` 00:10:53.519 → 00:10:57.600 · **#632 OpenAI Codex:** "sub aents which allow you to parallelize uh a particular feature or bug request"

### ANTI parallel writers; serial, role-separated, or coordination-first

- `ow1we5PzK-o` 00:09:32.880 → 00:09:36.440 · **#653 Alvoeiro, Factory:** "it doesn't really work for tasks in the like software dev domain because agents conflict."
- `ow1we5PzK-o` 00:09:37.400 → 00:09:42.000 · **#653 Alvoeiro, Factory:** "They step on each other's changes. They duplicate work. They make inconsistent architectural decisions."
- `ow1we5PzK-o` 00:09:50.440 → 00:09:52.600 · **#653 Alvoeiro, Factory:** "The difference with missions is that we run features serially."
- `ow1we5PzK-o` 00:10:15.240 → 00:10:18.320 · **#653 Alvoeiro, Factory:** "This is serial execution with with targeted internal parallelization."
- `ow1we5PzK-o` 00:09:06.200 → 00:09:08.440 · **#653 Alvoeiro, Factory:** "Our longest mission ran for 16 days"
- `mR-WAvEPRwE` 00:04:35.000 → 00:04:39.240 · **#691 Anthropic:** "from Opus 3.7, it's around 1 hour and up to Opus 4.6,"
- `mR-WAvEPRwE` 00:14:54.560 → 00:14:58.560 · **#691 Anthropic:** "this was a jump from about 4 hours up to 12 hours with sort of that very simple harness."
- `mR-WAvEPRwE` 00:24:58.520 → 00:25:01.440 · **#691 Anthropic:** "We just kind of gave each role its own kind of context window."
- `mR-WAvEPRwE` 00:25:18.240 → 00:25:23.320 · **#691 Anthropic:** "we have the two agents basically negotiate what done actually means."
- `5Sui_OnSRlY` 00:01:29.040 → 00:01:34.480 · **#704 Bichard, Ona:** "some people talk about software factory with these like parallel agents, like one individual IC running lots of coding agents"
- `5Sui_OnSRlY` 00:06:06.920 → 00:06:10.760 · **#704 Bichard, Ona:** "one of the biggest difficulties if you try and build this today is effectively agent coordination."
- `5Sui_OnSRlY` 00:14:08.440 → 00:14:11.760 · **#704 Bichard, Ona:** "the runtime. There are many options for this now, sandboxes and and containers"
- `5Sui_OnSRlY` 00:14:17.000 → 00:14:17.920 · **#704 Bichard, Ona:** "the thing that's missing for me is coordination."
- `5Sui_OnSRlY` 00:12:28.560 → 00:12:32.400 · **#704 Bichard, Ona:** "GitHub is not a coordination layer for agents. It gets incredibly overwhelming."
- `5Sui_OnSRlY` 00:13:05.640 → 00:13:10.360 · **#704 Bichard, Ona:** "through sort of state machines, you know, by building out workflows and effectively state machines"

## Proposed Claims Ledger additions

> **Do NOT edit `claims/Claims Ledger.md` from this delta.** These are proposals for the orchestrator to merge.

### Proposal A — strengthen and qualify existing Claim #14

Existing Claim #14 ("The harness is evolving from a local loop into a staged software factory") currently reads as one-sided support for the factory metaphor. The proposed update keeps the claim but adds the counterpoint to the **Caveats** block and adds Alvoeiro / Bichard / Anthropic as supporting sources for the more nuanced reading:

- Append to **Supporting sources** under Claim #14:
  - `[[653-ow1we5PzK-o-the-multi-agent-architecture-that-actually-ships-luke-alvoeiro-factory|#653 — Luke Alvoeiro, Factory]]` — staged plan/produce/review/ship loop, but features run serially with one active writer at a time; longest run 16 days.
    - **Anchor:** `ow1we5PzK-o` 00:09:50.440 → 00:09:52.600 · confidence: high
    - **Quote:** "The difference with missions is that we run features serially."
  - `[[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Ash Prabaker & Andrew Wilson, Anthropic]] — staged loop (planner-generator-evaluator) but a single writer at a time; each role in its own context window; pre-build contract negotiated by files on disk.
    - **Anchor:** `mR-WAvEPRwE` 00:24:58.520 → 00:25:01.440 · confidence: high
    - **Quote:** "We just kind of gave each role its own kind of context window."
- Rewrite **Caveats / counterpoints** as: "'Factory' can overstate current capability and imply unbounded parallel writers prematurely. Teams shipping production multi-agent systems disagree about whether parallelism is the leverage point: Factory (#653) runs features serially with bounded read-only parallelism; Anthropic (#691) runs one writer at a time with role-separated context windows; Cursor (#629) and OpenAI Codex (#632) push parallel sub-agent fan-out as the throughput mechanism. The factory metaphor describes orchestration of work-units; it is contested whether it implies many concurrent writers."
- Raise **Support level** from `moderate` to `strong`. The disagreement is itself evidence of a real industry-wide pattern that the book can describe with named tension.

### Proposal B — new Claim "Coordination is the unsolved runtime primitive for multi-agent systems"

- **Why it matters:** Gives Chapter 6 a sharp diagnosis of where software-factory infrastructure actually stands today — runtime/orchestration/triggers are solved; coordination is not. Bridges Chapter 3's parallelism debate into Chapter 6's runtime language.
- **Support level:** moderate (single primary source with strong on-stage examples; corroborating evidence from the architectural choices visible in #653 and #691).
- **Supporting sources:**
  - `[[704-5Sui_OnSRlY-the-missing-primitive-for-agent-swarms-lou-bichard-ona|#704 — Lou Bichard, Ona]]` — explicit naming of coordination as the missing primitive; Stripe Minions and Ramp Inspect as at-scale public examples; GitHub explicitly ruled out as a coordination layer.
    - **Anchor:** `5Sui_OnSRlY` 00:14:17.000 → 00:14:17.920 · confidence: high
    - **Quote:** "the thing that's missing for me is coordination."
    - **Anchor:** `5Sui_OnSRlY` 00:13:05.640 → 00:13:10.360 · confidence: high
    - **Quote:** "through sort of state machines, you know, by building out workflows and effectively state machines"
  - `[[653-ow1we5PzK-o-the-multi-agent-architecture-that-actually-ships-luke-alvoeiro-factory|#653 — Luke Alvoeiro, Factory]]` — coordination problem eliminated by construction (serial execution).
    - **Anchor:** `ow1we5PzK-o` 00:09:37.400 → 00:09:42.000 · confidence: high
    - **Quote:** "They step on each other's changes. They duplicate work. They make inconsistent architectural decisions."
  - `[[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Ash Prabaker & Andrew Wilson, Anthropic]] — file-based contract negotiation between roles as a substitute for an explicit coordination layer.
    - **Anchor:** `mR-WAvEPRwE` 00:25:18.240 → 00:25:23.320 · confidence: high
    - **Quote:** "we have the two agents basically negotiate what done actually means."
- **Caveats / counterpoints:** Bichard is a vendor-coded talk; he benefits from the coordination story being unsolved. The corroborating force comes from observing that the two strongest shipping architectures (#653, #691) both work around coordination rather than solving it. A second non-vendor source explicitly naming "coordination" as the gap would strengthen the claim further.
- **Candidate chapters:** 3, 6, 9
- **Reusable phrasing:** Runtime is solved. Orchestration is solved. Triggers are solved. Coordination is the primitive that is still missing — and the architectures that ship today work around its absence.

## What you did NOT do (and why)

- **Did not promote the parallelism tension into a single combined claim.** The disagreement is real and worth naming, but turning it into one "claim" would force a synthesis (e.g., "parallel writers fail on most software tasks") that the corpus does not yet uniformly support. Proposal A — strengthening Claim #14 by adding the counterpoint to its caveat block — keeps the disagreement visible without prematurely deciding it.
- **Did not write a third proposed Claim about validation contracts** despite Alvoeiro and Anthropic both arriving at "contracts negotiated before coding" independently. This is a strong observation, but it crosses Chapter 4 (evals) and Chapter 7 (reliability) territory and belongs in a follow-up pass that touches those chapters; cramming it into a Target 2 delta would dilute the parallelism focus.
- **Did not strengthen Claim #16** ("AI-native advantage depends on organizational coherence, not output volume alone") despite Alvoeiro's "bottleneck is human attention, not intelligence" framing being a clean fit. Claim #16 already cites #653; adding Bichard's "coordination is missing" would be the right anchor, but the better place to do it is alongside a Chapter 9 pass, not in this Target 2 work.
- **Did not edit `claims/Claims Ledger.md`** — per the instructions, the orchestrator handles ledger merging. All claim changes are written as proposals in this delta.
- **Did not add an explicit prose draft section to either chapter packet.** Chapter Packets v1 deliberately keep the "named tension" framing at packet granularity (cluster + claims + anchors + open questions). Prose drafting belongs in the manuscript pass, not the packet edit.

## What remains weak

- The Anthropic talk's content does not directly engage the "parallelism is bad" claim — it just demonstrates an architecture (planner-generator-evaluator, one writer at a time) that is consistent with it. The strongest direct anti-parallel-writer claim still rests on a single source (#653). #704 makes the structural argument (coordination is the gap) but does not specifically say parallel writers underperform — he is more agnostic about which substitute wins. So the Proposal A caveat language ("teams disagree") is accurate; a stronger one-sentence claim ("parallel writers underperform serial ones") would still be over-promotion.
- Robert Brennan (#42, OpenHands) is referenced as the caveat anchor for "parallel refactors work in narrow scopes" but his talk was not re-anchored in this pass — the existing ledger anchor on him is reused. A fresh anchor specifically on "narrow batched instructions" would tighten the caveat.
