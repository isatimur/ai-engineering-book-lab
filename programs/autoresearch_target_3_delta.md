# Target 3 Delta — 2026-05-26 — Ch 4 agent-readable evals

## Scope
Extend Chapter 4 (Evals Are the Control System) with the agent-readable-evals angle from #689 (Lawrence Jones, incident.io). The iteration report named this Target 3 as a conservative strengthening of existing Claims #8 and #19, not a new free-standing claim.

## Files modified
- `05_Book_Ideas/Chapter Packets v1/04_Evals_Are_the_Control_System.md`
  - Added #689 to the supporting source cluster.
  - Added a new strongest-claim bullet (#7) — agent-readable eval suites.
  - Added eight verbatim pull-quotes from #689 in "Useful quotes / excerpts" (anchored, see below).
  - Added a new section "Agent-readable evals — the next layer" covering the three operational moves (CLI over YAML, UI-as-file-system, parallelized meta-analysis) and a "Tension to preserve" note on the unit-tests framing disagreement between #689 (Jones) and #125 (Pesok).
  - Updated the Open Questions section to mark the eval-platforms question partially resolved and to add the Jones-vs-Pesok unit-tests-framing question.

## Source Anchors captured (all from `L2r6vLlLgs8`, all high confidence, all verbatim from tool output)

| # | start → end | verbatim quote | supports |
|---|---|---|---|
| 1 | 00:04:12.480 → 00:04:14.320 | "evals for me are AI unit tests." | Tension framing; Claim #8 nuance |
| 2 | 00:04:26.200 → 00:04:27.080 | "evals live in YAML files" | Operational baseline for Claim #8 extension |
| 3 | 00:06:43.480 → 00:06:44.880 | "coding agents weren't able to work with them." | Problem statement for new Claim #7-of-chapter / Claim #8 extension |
| 4 | 00:06:59.640 → 00:07:01.760 | "small CLI tool that we call eval tool" | Core mechanic for agent-readable-evals claim (extends Claim #8) |
| 5 | 00:07:03.600 → 00:07:06.440 | "designed to allow agents to leverage our eval suite files." | Same claim, intent statement |
| 6 | 00:07:41.080 → 00:07:43.560 | "create an eval case where it proves that the thing is failed" | Agent eval-write loop, extends Claim #8 |
| 7 | 00:10:41.600 → 00:10:42.560 | "agents can't properly use them." | UI-debugger gap, motivates Claim #19 extension |
| 8 | 00:11:00.000 → 00:11:02.400 | "download all of the UI that we have as a file system?" | "UI as file system" pattern, extends Claim #19 |
| 9 | 00:14:06.080 → 00:14:06.960 | "25 agents in parallel" | Scrapbook parallelized analysis, extends Claim #19 |
| 10 | 00:16:12.400 → 00:16:14.320 | "prioritize any of the debugging tools" | Generalization to debugging tooling at large |
| 11 | 00:16:20.040 → 00:16:22.400 | "file systems are exceptionally good agent context." | Headline principle for both extensions |
| 12 | 00:15:52.200 → 00:15:53.040 | "these patterns do generalize." | Speaker explicitly generalizes — anchors the chapter's promotion |

All 12 anchors were obtained from `99_Meta/scripts/anchor/cli.py L2r6vLlLgs8 "<phrase>"` and the `quote` field is copied verbatim from the tool's JSON output. No hand-typing, no paraphrase.

## Proposed Claims Ledger additions / strengthenings

### Strengthen Claim #8 — "Evals are a control system, not just a test suite"
Add #689 to the supporting sources list with **two anchors** (the claim supports two distinct mechanics from the same talk):

- `[[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|#689 — Lawrence Jones, incident.io]]` — extends the control-system framing from human-readable to coding-agent-readable: evals live as YAML next to prompt files, accessed by a CLI agents can drive.
  - **Anchor:** `L2r6vLlLgs8` 00:06:59.640 → 00:07:01.760 · confidence: high
  - **Quote:** "small CLI tool that we call eval tool"
  - **Anchor:** `L2r6vLlLgs8` 00:07:03.600 → 00:07:06.440 · confidence: high
  - **Quote:** "designed to allow agents to leverage our eval suite files."

Optional addition to the "Caveats / counterpoints" line: note the productive tension with #125 (Pesok) — Jones explicitly calls them "AI unit tests" (`00:04:12.480 → 00:04:14.320`); Pesok titles his talk "Evals Are Not Unit Tests." Both framings are defensible because they describe different surfaces of the same artifact (agent-facing CLI vs human reasoning posture).

### Strengthen Claim #19 — "Evals are strongest when they are trace-linked and fed by production observability"
Add #689 to supporting sources. This claim is the natural home for the "UI as file system" and "scrapbook" anchors — both are observability-into-eval mechanics, not eval-suite mechanics:

- `[[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|#689 — Lawrence Jones, incident.io]]` — production traces and backtest results exported as file systems for agent-driven cohort analysis; closes the "from monitoring to fix" loop with a coding agent in the middle.
  - **Anchor:** `L2r6vLlLgs8` 00:11:00.000 → 00:11:02.400 · confidence: high
  - **Quote:** "download all of the UI that we have as a file system?"
  - **Anchor:** `L2r6vLlLgs8` 00:14:06.080 → 00:14:06.960 · confidence: high
  - **Quote:** "25 agents in parallel"

The existing caveat on Claim #19 ("not every failure should be auto-converted into a durable regression") survives unchanged — Jones's scrapbook is about *triage and clustering*, not about silently writing new evals.

### No new free-standing claim is proposed.
The iteration report explicitly recommended keeping promotion conservative ("at the edge of what one talk supports"). Two strengthenings of existing claims is the right weight. If a second independent source surfaces (#695 Marc Klingen's Langfuse skill talk was flagged as a possible crossover), the agent-readable-evals pattern could be promoted to its own claim later.

## What you did NOT do (and why)

- **Did not edit `claims/Claims Ledger.md`.** The brief explicitly forbade it ("the orchestrator handles ledger merging"). All proposed ledger edits are documented above for the orchestrator to apply.
- **Did not anchor the phrase "download your UI as a file system" exactly as the iteration report phrased it.** Jones says "download all of the UI that we have as a file system?" — the leading "all of" and the trailing question mark are part of the verbatim transcript. The chapter packet and this delta use the verbatim form. The iteration-report shorthand "download your UI as a file system" is paraphrase; I kept it out of the chapter packet's pull-quotes.
- **Did not promote the "AI unit tests" framing to a strong claim.** Jones uses the phrase once, casually, and Pesok's whole talk title disagrees. I named the tension and left it as a tension. Promoting either side to a strong claim would flatten disagreement — explicitly forbidden by the program.
- **Did not source a second independent talk to corroborate the "agent-readable evals" pattern.** Scanning #695 (Langfuse) and #694–#708 in general would extend scope beyond Target 3. The iteration report flagged this as a watch-item for a future pass.
- **Did not add Source Anchors to the Chapter 4 packet itself.** Chapter packets carry pull-quotes with wikilinks; Source Anchors live in the Claims Ledger per ADR-0002. The anchors are recorded above for the orchestrator to merge.
- **Did not run the anchoring CLI on #680 or #655.** Both already carry anchors in Claim #19 and were not edited.

## Status
- 12 high-confidence Source Anchors captured from #689.
- 1 chapter packet edited (Ch 4) with 8 pull-quotes and a ~350-word new section.
- 0 ledger edits (left to orchestrator).
- 2 existing claims (#8, #19) proposed for strengthening; 0 new claims promoted.
- 1 productive tension named (#689 vs #125 on "are evals unit tests?").
