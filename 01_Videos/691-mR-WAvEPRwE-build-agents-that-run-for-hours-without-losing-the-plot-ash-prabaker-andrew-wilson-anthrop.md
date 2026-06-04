---
video_id: mR-WAvEPRwE
playlist_index: 691
title: "Build Agents That Run for Hours (Without Losing the Plot) — Ash Prabaker & Andrew Wilson, Anthropic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=mR-WAvEPRwE"
duration: "1:15:40"
duration_seconds: 4540
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/mR-WAvEPRwE.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-19T11:04:30+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ash Prabaker & Andrew Wilson (Anthropic applied AI team) give the most detailed public account of how Anthropic builds long-running agents — 5-6+ hour runs, $200 budgets, building full apps from a single vague prompt. Three failure modes for long agents: context limits/amnesia, poor planning, and models that can't judge their own output. Solution: a planner-generator-evaluator harness with adversarial pressure, shared state via files rather than context, and contracts negotiated between generator and evaluator before building starts. The harness co-evolves with models — components added for one model's weaknesses get retired as the next model improves."
---

# Build Agents That Run for Hours (Without Losing the Plot) — Ash Prabaker & Andrew Wilson, Anthropic

## Summary

Ash Prabaker and Andrew Wilson (Anthropic applied AI team) present both the history of long-running agent capability and the current state of harness design from first-hand experience building systems that run for 5-6 hours at $100-200 per run.

**The three failure modes of long-running agents (Andrew Wilson):**
1. **Context limits and "context anxiety"** — finite context windows cause amnesia on session restart; agents also exhibit "context sense anxiety" where they rush to finish as they approach the context limit.
2. **Poor planning** — out-of-the-box models try to one-shot everything or build half a feature and stop; they need external planning structure.
3. **Models can't judge their own output** — models are sycophantic about their own work, marking a button "done" even when the backend doesn't exist. Self-evaluation is fundamentally flawed.

**Model capability curve (data):** Sonnet 3.7 (Feb 2025) could run for ~1 hour with minimal scaffold. Opus 4.6 (current) runs for ~12 hours with the same minimal scaffold. Anthropic's internal anecdote: tasks that took 20 minutes on Opus 3.5 now produce fully-featured apps in 3-5 hours on modern models.

**The harness evolution:** Claude Code has shipped progressively alongside model releases — computer use → MCP spec → Claude Code → checkpoints → Agent SDK → skills → server-side compaction → 1M context GA. Each model release came with harness changes. The harness doesn't disappear as models improve — it evolves, filling the gaps the current model has, with some components being retired as models improve past needing them.

**The core harness pattern (Ash Prabaker) — Planner-Generator-Evaluator:**
Inspired by GANs (generator + discriminator). Three distinct roles with separate context windows:
- **Planner:** Takes a one-line prompt, produces a high-level sprint plan. Deliberately avoids granular technical specs because granular plans cascade errors over multi-hour runs. Stores as `featurelist.json` (not markdown — models are less likely to overwrite JSON).
- **Generator (builder):** Implements one feature at a time in a fresh context window. Reads the progress file, runs the init script, picks one incomplete feature, builds, runs tests (Playwright), commits to Git, marks feature complete.
- **Evaluator:** Does NOT just read diffs. Launches Playwright, opens the live app, clicks around, tests functionality. Uses a rubric with four criteria: Design, Originality, Craft, and Functionality (weighted toward Design and Originality to fight AI-slop aesthetics). Uses few-shot examples from reference sites to calibrate taste. Hands critique back to generator.

**The key innovation: pre-build contracts.** Before the generator writes a single line, generator and evaluator negotiate what "done" means — via files on disk (one writes markdown, the other reads, iterate until agreement). The evaluator then grades against this negotiated contract, not the original vague spec. 27 contract criteria were generated for the retro game app demo. Granular criteria → actionable critique; vague criteria → generator ignores it.

**Why adversarial evaluator > self-evaluation:** Tuning a standalone critic to be harsh is tractable. Tuning a builder to be self-critical is not. This exploits the gap between LLM ability to critique vs. generate — the same gap that exists between human art critics and artists.

**Demo results:** "Build a retro game maker" with vs. without the harness. Without: visually passable, play mode completely broken (arrow keys do nothing, no physics loop). With harness ($200, 6 hours): app named itself "Retro Forge," 54-color palette, AI sprite assistant, physics loop running, arrow keys work, player collides with walls. The evaluator caught FastAPI route ordering bugs, Boolean logic errors in the delete key — things CI would miss because they require actually using the app.

**Harness adaptation as models improve:** Sprint decomposition was critical for Opus 4.5 (context anxiety); Opus 4.6 can hold a 2-hour continuous build without it. Evaluator runs every sprint for 4.5; only at end of generation for 4.6. The recipe changes, the loop stays the same.

**Key debugging insight:** The primary loop for improving the harness was reading agent traces — finding where the agent's judgment diverged from human judgment and tuning the prompt for that specific failure. "The same muscle as reading a stack trace." You can pipe agent transcripts to another agent to automatically update prompts (closing the loop on harness development itself).

**Shared state via filesystem:** For very long-running agents, file system is the preferred shared state mechanism rather than context windows. Progress files, feature lists, contracts — all on disk, readable by any agent in any context window.

## Why it matters

This is the most detailed public description of Anthropic's internal long-running agent harness design. It's primary source material for the book's argument that "colleague-grade" AI work requires: (1) adversarial evaluation rather than self-evaluation, (2) negotiated contracts between roles before work begins, (3) separate context windows per role, and (4) harnesses that co-evolve with model capability rather than remaining static. The planner-generator-evaluator structure is a concrete implementation of what the book calls "constrained delegation."

## Metadata
- Video: https://www.youtube.com/watch?v=mR-WAvEPRwE
- Duration: 1:15:40
- Playlist index: 691
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]
- [[Org Design & Leadership]]

## Key claims (for claims ledger)
- Models cannot reliably judge their own output — sycophancy extends to self-evaluation of code completeness.
- Adversarial evaluators (separate context window, harsh rubric) catch bugs that self-evaluation misses because the evaluator actually uses the app.
- Generator and evaluator should negotiate a contract (what "done" means) before work begins — grade against the contract, not the original vague spec.
- Granular evaluation criteria (27 criteria for one app) are required to make critique actionable.
- Harnesses co-evolve with models: components needed for one model's weaknesses get retired when the next model improves past them.
- Anthropic's internal runs: Opus 4.5 era, 20-minute tasks → now 3-5 hours produces fully-featured apps. Opus 4.6 runs ~12 hours with minimal scaffold.
- Shared filesystem is preferred over context windows for state sharing in long-running multi-agent systems.
- Debugging harnesses requires reading traces with the same discipline as reading stack traces.

## Book angles
- Chapter 6 (software factory) — planner-generator-evaluator is the concrete implementation of AI-native software production.
- Chapter 7 (reliability) — adversarial evaluation as the primary reliability mechanism; self-evaluation as a known anti-pattern.
- Chapter 8 (constrained delegation) — the harness is the control plane; contracts negotiated before work begins are the delegation specification.
- Chapter 9 (org design) — PM/IC/QA role decomposition made concrete: "we didn't invent this, we just gave each role its own context window."
- Chapter 10 (future) — capability doubling curve (1 hour → 12 hours in 1 year) as the quantitative basis for the book's trajectory claims.
