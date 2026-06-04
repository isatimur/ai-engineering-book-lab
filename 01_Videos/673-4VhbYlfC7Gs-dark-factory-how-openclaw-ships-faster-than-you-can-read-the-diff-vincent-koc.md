---
video_id: 4VhbYlfC7Gs
playlist_index: 673
title: "Dark Factory: How OpenClaw Ships Faster Than You Can Read the Diff — Vincent Koc"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=4VhbYlfC7Gs"
duration: "15:05"
duration_seconds: 905
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/4VhbYlfC7Gs.txt"
themes:
  - "Evals & Reliability"
  - "Agent Architecture"
ingested_at: 2026-05-19T11:03:49+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Vincent Koc (Comet, eval research) argues that static benchmarks are calcifying — AI apps change faster than hand-crafted eval suites can keep up with. Proposes malleable evals: intent-based outcomes instead of fixed test cases, self-curating suites from production traces (the agent curates its own tests), online always-on evaluation, and telemetry-in-the-loop (harness aware of its own telemetry so it can self-correct). Key frame: 80% of agent behavior is stable and can be tested statically; the 20% that keeps changing is what will wreck your business — and that 20% requires adaptive, not static, evals. NOTE: title in corpus metadata says 'Dark Factory' but the actual talk is 'Malleable Evals: From Static AI Measuring to Adaptive Systems'."
---

# Dark Factory: How OpenClaw Ships Faster Than You Can Read the Diff — Vincent Koc

> **⚠️ Corpus metadata mismatch:** The file title and conference listing say "Dark Factory: How OpenClaw Ships Faster Than You Can Read the Diff" but the actual transcript is a different talk: **"Malleable Evals: From Static AI Measuring to Adaptive Systems."** The summary below reflects the actual transcript content. Vincent Koc references his OpenClaw keynote (from the previous day) but this session is the evals workshop.

## Summary

Vincent Koc (eval researcher at Comet, core contributor to OpenClaw) argues that the field's fixation on static benchmarks is a category error. The problem isn't that evals are hard — it's that AI applications are not static, but we're testing them as if they are. He coins the term **eval calcification** for what happens when your test suite stops growing with your product.

**The static eval era and its limits.** Traditional AI evaluation looked like software engineering: write unit tests, build a hand-crafted dataset, run offline evaluation before deployment. This made sense when models and apps were relatively stable. But now software ships at "lightning speed" (he references OpenClaw shipping faster than you can read the diff), and benchmarks can't keep up. Academic conferences are dominated by static benchmark papers that are immediately irrelevant — benchmarks created to test one thing that's already been optimized away.

**The three eras of LLM engineering — and why each broke evals:**

1. **Prompt engineering era** (pre-2023): "doom scroll, wordsmith instructions, bash random words and hope it improves." Died in 2023 but people still do it. Evals were largely irrelevant.
2. **Context engineering era**: RAG, tool calling, agents. Evals became more relevant because there were now discrete components to test. Breaking an agent into its MCP tool parts and testing each one was at least partially tractable.
3. **Intent engineering era** (now): Models self-optimize based on intent. Harnesses adapt. When the agent is adapting to the individual user, how do you even define a static "correct answer" to test against?

**Intent engineering breaks static evals.** The deeper problem with adaptive systems: "How do I know my experience is different from your experience and different from someone else's?" When a harness like OpenClaw changes itself based on user intent, your test suite from three weeks ago may not test what the system does today. The evals don't just go stale — they actively mislead you.

**The 80/20 eval split.** The key practical frame: 80% of agent behavior is stable and can be tested with static, intent-defined test cases. That's fine — keep those. But 20% keeps changing, and it's that 20% that will wreck your business. "It's going to be someone who's going to come and ask a weird question or use your agent in a really strange way and it's going to be absolute hell for you." That 20% requires adaptive evals.

**Four properties of malleable evals:**

1. **Intent-based outcomes** — instead of "1 + 1 = 2," define the end state you want and let machines evaluate against it. Use rubrics (like how art is evaluated in schools), not exact string matching.
2. **Self-curating suites from traces** — agents can auto-curate their own eval suites. When production traces show your customer base has changed and is asking differently, the agent can detect the distribution shift and update the test suite. "Why are we not taking these traces and feeding them into agents and going 'something has changed'?"
3. **Online always-on evaluation** — not a periodic offline run but a continuously running evaluation service. Agents doing evals, not static benchmarks.
4. **Telemetry-in-the-loop** — if the harness is aware of its own telemetry (errors, costs, conditions), it can self-correct. Koc has a paper on this: harnesses that detect their own failures and continue rather than hard-stopping.

**The auto-research analogy.** Karpathy's auto-research: set a goal, set a target, the system tunes itself. The key insight: "our evals don't become the data set or the starting point — our evals become what is the end state that we want to get to and then we just let the machines do the work."

**Evals as living software.** The closing frame: "People need to start looking at evals not as this static data set thing, but actually as like code, as software, or as a living agent — not as a point in time, but as a self-optimizing growing solution."

## Why it matters

This is the most conceptually advanced evals talk in the corpus on where eval methodology is heading, as opposed to where it currently is. Complements Laurie Voss (#681), which covers the current state of evals practice (code evals + LLM-as-judge + human review), while Koc addresses what that practice misses at the frontier. The eval calcification problem is a genuine infrastructure gap: teams building rapidly evolving agentic systems with static test suites will find those suites actively misleading them as the system adapts. The 80/20 frame gives the book a practical heuristic for Chapter 5 (evals).

## Metadata
- Video: https://www.youtube.com/watch?v=4VhbYlfC7Gs
- Duration: 15:05
- Playlist index: 673
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[Agent Architecture]]

## Key claims (for claims ledger)
- AI applications are not static but we're testing them as if they are — this is the eval calcification problem.
- Intent engineering (harnesses that adapt to individual users) breaks static evals: there is no single "correct answer" to test against when the system adapts per user.
- 80% of agent behavior is stable and can be tested statically; the 20% that keeps changing is the existential risk.
- Self-curating eval suites: agents can detect distribution shifts in production traces and update their own test suites.
- Telemetry-in-the-loop: harnesses that are aware of their own telemetry can self-correct and self-heal.
- Evals should be defined by end state (intent), not by fixed expected outputs (data points).

## Book angles
- Chapter 5 (evals) — the "what's next" section; eval calcification as the failure mode of static evals at agent scale; 80/20 split as the practical heuristic.
- Chapter 7 (reliability) — telemetry-in-the-loop and always-on evaluation as reliability infrastructure.
- Chapter 8 (constrained delegation) — when the system adapts per-user, how do you know it's staying within constraints? Malleable evals are the measurement layer for adaptive delegation.

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/4VhbYlfC7Gs.txt]]
- ⚠️ Corpus title mismatch: metadata title is "Dark Factory" but actual talk is "Malleable Evals."
