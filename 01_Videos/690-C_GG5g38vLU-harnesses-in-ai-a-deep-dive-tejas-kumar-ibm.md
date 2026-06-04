---
video_id: C_GG5g38vLU
playlist_index: 690
title: "Harnesses in AI: A Deep Dive — Tejas Kumar, IBM"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=C_GG5g38vLU"
duration: "20:27"
duration_seconds: 1227
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/C_GG5g38vLU.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-19T11:04:27+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Tejas Kumar (IBM) gives the clearest first-principles definition of agent harnesses in the corpus: a harness is everything around the model that gives it grounding in reality. Five components: tool registry, model, context primitives, guardrails, and the agent loop (with an explicit verify step). Live demo builds a browser-use agent from scratch using GPT-3.5 Turbo — it immediately lies — then incrementally adds guardrails (max iterations, context compression) and a verify step (detects tool history lies). Result: the agent stops lying with zero prompt changes. Central claim: 2026 is the year of harnesses; 2027 will see dynamically generated harnesses."
---

# Harnesses in AI: A Deep Dive — Tejas Kumar, IBM

## Summary

Tejas Kumar (AI developer advocate, IBM) gives the clearest conceptual treatment of agent harnesses in the corpus — building from a definition through a live demo that makes every component visible.

**Definition:**

> "A harness is everything around the model that gives it grounding in reality."

The model is not the agent. The harness is the agent. The model is one component inside it. This framing inverts the typical prompt-engineering mindset: instead of trying to make the model behave correctly via prompt, you build infrastructure that constrains and channels its behavior.

**Five harness components:**

1. **Tool registry**: the catalog of tools available to the model. What tools exist, what they do, what schema they expect. The registry is a harness responsibility, not a model responsibility.

2. **Model**: the LLM itself. Swappable. The harness should be model-agnostic — you should be able to replace GPT-3.5 with Claude without changing anything else.

3. **Context primitives**: mechanisms for managing what goes in and out of the context window. Compression, summarization, sliding windows, selective retrieval. Without these, long-running agents amnesia out.

4. **Guardrails**: hard constraints on agent behavior. Max iterations, forbidden actions, output filters, content policies. Guardrails are not prompts — they are code-level enforcement.

5. **Agent loop + verify step**: the loop that drives the agent (invoke model → execute tool calls → repeat). The verify step is a separate sub-loop that checks the tool call history for hallucinations and inconsistencies *before* accepting the agent's claimed output as complete.

**The live demo:**

Tejas builds a browser-use agent with GPT-3.5 Turbo (no harness). It immediately starts lying: claims to have visited URLs it never visited, reports results that don't match actual browser state. Classic LLM sycophancy at the agent level.

He then adds the harness incrementally:
- **Max iterations guardrail**: agent can't loop forever
- **Context compression**: rolling summary replaces full history, preventing context overflow
- **Verify step**: a second LLM call that reads the tool call history and checks whether claimed actions actually occurred (detects discrepancies between `browser.visit(url)` tool call results and the agent's summary)
- **Deterministic login handler**: instead of letting the agent handle authentication (where it might guess or hallucinate credentials), the harness intercepts login-page detection and injects the credentials directly — a deterministic step in an otherwise stochastic loop

After adding the harness: **the agent stops lying. Zero prompt changes.** The same GPT-3.5 Turbo model, with a harness, produces correct results where it previously fabricated them.

His exact quote: "I did not touch the prompt once. We just built a harness and the outcome radically changed."

**The maturity prediction:**

Tejas closes with a two-year view:
- **2026**: the year of harnesses. Engineers focus on harness design rather than prompt engineering. The model is a commodity; the harness is the product.
- **2027**: dynamically generated harnesses. Harnesses that generate themselves on-the-fly based on the task. The harness becomes a meta-layer that spins up the right sub-harnesses for the problem at hand.

This prediction aligns with Anthropic's own harness evolution narrative (#691): harnesses co-evolve with models, each generation filling gaps the previous model couldn't handle on its own.

**Connection to other talks:**

The verify step is a simpler version of the adversarial evaluator in Ash Prabaker's Planner-Generator-Evaluator harness (#691). Both solve the same problem: LLMs can't reliably self-evaluate. The difference is scale — Tejas's verify step is a single pass; Prabaker's evaluator uses Playwright to actually run the app. Both are instances of the same pattern: separate the doer from the checker.

## Why it matters

This is the most accessible harness taxonomy in the corpus. Tejas gives the definition that everyone reaches for but no one else states cleanly: "everything around the model that gives it grounding in reality." The live demo is particularly valuable — it shows, not tells, what harnesses do: the same model with and without a harness produces completely different quality. This talk belongs in any reading list for engineers building their first production agent.

## Metadata
- Video: https://www.youtube.com/watch?v=C_GG5g38vLU
- Duration: 20:27
- Playlist index: 690
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Coding Agents]]
- [[Evals & Reliability]]

## Key claims (for claims ledger)
- A harness is everything around the model that gives it grounding in reality — the model is one component, not the agent.
- Five harness components: tool registry, model, context primitives, guardrails, agent loop + verify step.
- Adding a harness to a lying GPT-3.5 Turbo agent (no prompt changes) produces correct behavior — harness > prompt engineering for reliability.
- The verify step — a separate LLM pass over tool call history — detects agent hallucinations that neither the model nor the user would catch from output alone.
- Deterministic harness layers (e.g., login handlers) should replace stochastic model behavior for predictable sub-tasks.
- 2026 = year of harnesses; 2027 = dynamically generated harnesses.
- The model is a commodity; the harness is the product.

## Book angles
- Chapter 4 (durable runtime) — context primitives as the harness component that enables long-running stability; compression and sliding windows.
- Chapter 6 (software factory) — harness-first development as the engineering discipline replacing prompt engineering.
- Chapter 7 (reliability) — verify step as the lightweight version of adversarial evaluation; self-evaluation anti-pattern confirmed by demo.
- Chapter 8 (constrained delegation) — guardrails as code-level enforcement vs. prompt-level suggestion; deterministic login handler as the model for injecting determinism into stochastic loops.
- Chapter 9 (org design) — "the model is a commodity; the harness is the product" as the central message for why AI engineering is a real discipline.

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/C_GG5g38vLU.txt]]
