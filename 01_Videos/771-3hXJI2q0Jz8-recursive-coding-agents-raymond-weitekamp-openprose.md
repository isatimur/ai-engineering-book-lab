---
video_id: 3hXJI2q0Jz8
playlist_index: 771
title: "Recursive Coding Agents - Raymond Weitekamp, OpenProse"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=3hXJI2q0Jz8"
duration: "23:48"
duration_seconds: 1428
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/3hXJI2q0Jz8.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-28T23:47:05+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Raymond Weitekamp (OpenProse) argues that today's agents are mismanaged geniuses: intelligence is not the bottleneck, reliable orchestration is. He applies recursive language models, where the prompt is a variable in a REPL and the model decomposes it into sub-calls, to coding agents. He cites RLM results such as a small Qwen model beating frontier LLMs on the Long CoT benchmark, gives a rubric for what counts as an RLM, and shows a fully recursive Pi coding agent, Claude Code dynamic workflows, and OpenProse, a markdown language compiled by the coding agent that declares sub-agent work, skill and tool dependencies, and turns golden sessions into reusable workflows."
---

# Recursive Coding Agents - Raymond Weitekamp, OpenProse

## Summary
Raymond Weitekamp presents work from his independent research and his role at OpenProse on recursive coding agents: applying the lessons of recursive language models (RLMs) to coding agents. His motivation is trust. One day a single long prompt gives him an almost working SaaS app; the next, Claude Code empties his Solana wallet. His thesis, borrowing a phrase from the MIT authors of the RLM paper: today's agents are mismanaged geniuses. The intelligence is there; the missing layer is how we specify, manage, reuse and verify the work. The slides live at recursivecodingagents.com, with a companion GitHub repo.

**What an RLM is**
In an RLM the context itself is the object of computation. The full prompt is a variable, possibly many files, inside a REPL (Python in the original paper). The model is told to explore it symbolically instead of reading it all into context, and to hand pieces to sub-LLMs or sub-RLMs, then work back up to an answer. He calls RLMs the new reasoning models and the next paradigm of test-time compute, because code execution becomes reasoning.

**Claimed results**
- The original paper shows RLMs processing tens of millions of tokens, orders of magnitude past the context window.
- His own work found the default RLM harness works as a top-10 memory system with no changes.
- With the DSPy RLM implementation, a small Qwen model that runs on a laptop beat Opus and GPT-5.4 used as plain LLMs on the Long CoT long-reasoning benchmark.
- Symbolica's RLM harness, Agentica, scored in the 30s on ARC-AGI-3 within hours of release, when frontier models sat near 2–3%. He says the ARC Prize team declined to run the private evaluation, and the Long CoT maintainers created a separate open-harness leaderboard. His view: he cares about results, not whether they come from latent space or code execution.

**A rubric for what counts**
An RLM needs an executable environment, an externalised prompt, code that calls the model, model-chosen decomposition, and symbolic state. Plain LLMs and RAG fail. Coding agents with sub-agents and loops come close. Hard-coded map-reduce, including a lambda-calculus RLM project, does not count, because the model does not decide the decomposition.

**Experiments and tools**
He first wrapped the RLM package as a CLI tool for a coding agent. Then he made the Pi coding agent fully recursive (Pi calls Pi calls Pi at a set depth), first by forking, now as a pure extension plus a wrapper named after the Y combinator. Other projects: the TypeScript AXE framework, a pure-bash Unix RLM by a colleague at OpenProse, and Claude Code dynamic workflows, which he and others argue finally make Claude Code an RLM. He wrote one workflow that is not an RLM (hard-coded map-reduce) and one that is (deep research over a file system).

**OpenProse**
OpenProse is a programming language compiled by your coding agent, not your computer: a markdown spec in logical English. A prose write command has Claude Code, Codex or Pi author a .prose.md file. Programs declare sub-agent work, verify it in the parent session, and list skills and tools as explicit dependencies. A newer feature has the agent deconstruct a golden session into a reusable workflow. Use cases: repo-scale migrations, recursive directory analysis, audits, bug sweeps and red-team agents.

## Why it matters
- Reframes agent reliability as an orchestration problem, not an intelligence problem, with a concrete mechanism (model-chosen recursive decomposition) to address it.
- The five-part rubric gives a precise way to tell an RLM from sub-agents, loops or hard-coded map-reduce, which helps when comparing agent architectures.
- The benchmark disputes (ARC-AGI-3, a separate open-harness leaderboard) show that harness design can move scores so far that leaderboards split.
- OpenProse's explicit skill and tool dependencies for sub-agents are a practical pattern for making multi-agent workflows fail loudly instead of silently.
- Turning a golden session into a reusable workflow is a direct answer to good-day, bad-day variance in coding agents.

## Metadata
- Video: https://www.youtube.com/watch?v=3hXJI2q0Jz8
- Duration: 23:48
- Playlist index: 771
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hello there. My name is Raymond Whitcomb and today I'm going to talk about recursive coding agents, which is this idea of applying the lessons of recursive language models, RLMs, to coding agents. This is some work that I have done both in my independent research um Raw Works uh and also more recently in my role at OpenProse. So, to motivate this a little bit, we all want outcomes. We all want agents that are working on our behalf. We want reliable co-workers that are getting things done while we're doing something fun, while we're out on a hike, while we're cold chilling, while we're doing the do. And my argument and my experience is that the bottleneck to this is not intelligence. The...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/3hXJI2q0Jz8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/rawwerks/recursive-coding-agents>
