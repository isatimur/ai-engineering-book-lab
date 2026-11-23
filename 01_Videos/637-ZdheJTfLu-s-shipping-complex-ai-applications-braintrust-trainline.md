---
video_id: ZdheJTfLu-s
playlist_index: 637
title: "Shipping complex AI applications — Braintrust & Trainline"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ZdheJTfLu-s"
duration: "1:38:34"
duration_seconds: 5914
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ZdheJTfLu-s.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-07T23:19:17+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "A hands-on workshop by a Braintrust engineer with Trainline AI engineers Usama and Mayank. Thesis: AI pilots fail in production not because models are weak but because operational rigor lags. Trainline shows how its multi-agent travel assistant (refunds, alternative trains, human handover) uses offline and online evals to switch to cheaper models safely. The workshop builds a support-triage agent from one prompt to five stages with tool calls, then adds nested tracing, a golden dataset with code and LLM-judge scorers, managed prompts and parameters, sampled online scoring, and a replay-fix-rerun loop for a production failure."
---

# Shipping complex AI applications — Braintrust & Trainline

## Summary
This is a 98-minute hands-on workshop from AI Engineer Europe in London. A Braintrust engineer, with a background in formal mathematics and over a decade in banking and capital markets, leads it with two Trainline AI engineers, Usama and Mayank. The thesis: most generative AI pilots fail to reach production not because models are not smart, but because "operational rigor" has not kept up. Demos work, production goes wrong, teams patch the prompt, and nobody tracks what changed. The fix is a flywheel: get data in, find failure modes, fix, ship, monitor, repeat.

**The Trainline case**
Trainline sells tickets across many rail carriers and reports 27 million active users. It runs classic ML, such as a disruption forecast that works like a weather app for trains, and a travel assistant that is a multi-agent system, not just a chatbot. The assistant can find alternative trains, process refunds and hand over to human support. The team places agentic systems between deterministic software and non-deterministic ML, so they need both kinds of quality checks. They score the assistant from tone of voice to helpfulness on complex ticket rules. Offline evals let them try cheaper models when LLM costs become "bizarre", and online evals confirm the effect in production. Non-technical colleagues need to self-serve traces instead of asking engineers for logs.

**Building the agent in stages**
The workshop app is a fictional support-triage agent in TypeScript using GPT-5 mini. Each git tag is a runnable checkpoint:
- One prompt, one call, structured JSON out.
- Local tools for help-desk articles and account history; in real life these would be vector search, MCP or CLIs.
- Five stages: collect context, triage, policy review, reply writer, and a final package with an optional escalation tool. As with breaking a monolith into microservices, more stages add failure points but make each one easy to locate.

**Tracing**
Wrap the provider SDK and nest every step under one parent span per interaction, including multi-turn conversations. The trace records tokens, cost, latency, time to first token and custom metadata for filtering and alerts. A timeline view shows which step is slow.

**Evals and the golden set**
A seeded dataset of 10 categorized cases with expected outputs. Deterministic scorers (category, schema, escalation reason present) are cheap, so run them always. Use an LLM judge with a custom rubric only where code cannot decide, for example brand style. The goal is to ship on evidence, not "vibes".

**Managed mode and online scoring**
Prompts, tools, scorers and parameters move to Braintrust, so a product manager can switch the model in the UI and set a new baseline without a code change. He still recommends version control as the source of truth. Online scoring runs as automations on live logs: start LLM-judge sampling high, then drop to 5-10% to control cost.

**Closing the loop**
The example failure: a user writes that a CFO cannot export invoices before a board meeting but says it is not urgent, and the model rates it low. They replay five failure cases, tighten the prompt, rerun against all cases to check for regressions, and diff the experiments. His closing advice: observability is "table stakes"; pick one critical live system, add tracing, collect edge cases and build deterministic scores first.

## Why it matters
- A full, reproducible recipe for taking an agent from one prompt to traced, evaluated, monitored production, with checkpoints per step.
- Trainline gives a real enterprise reason for evals: switching to cheaper models without losing quality on a customer-facing multi-agent assistant.
- The sampling guidance (deterministic scorers always, LLM judges high at first then 5-10%) is a concrete cost rule for online evaluation.
- The CFO-invoice failure is a clean example of a model following the user's words while missing the business context, and of turning it into a regression test.
- Shows why one parent span per conversation matters: without the nested structure, you cannot see where a multi-step agent fails.

## Metadata
- Video: https://www.youtube.com/watch?v=ZdheJTfLu-s
- Duration: 1:38:34
- Playlist index: 637
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Good afternoon everybody. Welcome to sunny London. Hey um is everyone's first time here? I think it is because this is the first conference. Amazing. Amazing. Well, thank you very much for joining today's session. Um hopefully you are in the right session but for those who uh need to double click uh this is a hands-on workshop to delivering quality AI applications of brain trust and we're also be partnering with our colleagues at uh trainon which I'll introduce themselves shortly. Uh so probably be wondering who's this guy does he even go here what's his name introduction to myself is uh you can call me Jirean but like the band Juran Jirean with a G. So hopefully folks are Simon Leon fan...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ZdheJTfLu-s.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://uk.linkedin.com/in/mayank-soni>
