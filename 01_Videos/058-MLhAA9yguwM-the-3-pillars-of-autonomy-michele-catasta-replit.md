---
video_id: "MLhAA9yguwM"
playlist_index: 58
title: "The 3 Pillars of Autonomy – Michele Catasta, Replit"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=MLhAA9yguwM"
duration: "24:42"
duration_seconds: 1482
view_count: 8082
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/MLhAA9yguwM.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T10:51:58+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Michele Catasta of Replit argues that coding agents for non-technical users need 'Waymo' autonomy, not 'Tesla FSD' supervision: the agent takes all technical decisions, and autonomy means a long span with no technical input from the user, not long run time as a vanity metric. His three pillars are frontier model capability, verification and context management. Replit found over 30% of agent-built features broken on first pass, so it tests apps autonomously with generated Playwright code, about 10x cheaper and faster than computer use, inside subagents. Next bet: the core loop as orchestrator of parallel subagents."
---
# The 3 Pillars of Autonomy – Michele Catasta, Replit

## Summary
Michele Catasta leads work on Replit's coding agent, which is built for non-technical users. He says autonomy has been Replit's north star since the first agent launched "September last year." He starts from a plot of agent latency versus value: fast, in-the-loop tools for experts on one side, agents that run for hours on the other. He adds a third dimension: autonomy for people who cannot code.

**Two kinds of autonomy**
Supervised autonomy is like Tesla FSD: you still need a licence and sit at the wheel for the long-tail events. Replit wants the Waymo experience, where the user sits in the back with no wheel and no licence. Knowledge workers cannot judge an agent's technical choices, so the agent must take all of them.

**Redefining autonomy**
Autonomy should not be confused with long run time, and it should not become "a vanity metric." Agent 3 takes all technical decisions, but it runs for hours only when the task is broad. With a narrow scope it is still fast. The target is to maximize "irreducible runtime": the span in which the user makes no technical decisions, while still controlling *what* gets built.

**The three pillars**
1. Frontier model capability, the "baseline IQ" in the loop. He leaves this to the model labs.
2. Verification: test local correctness at every step, or compounding errors topple the castle.
3. Context management: stay globally coherent with user intent while working on single tasks.

**Verification and painted doors**
Without testing, agents build "painted doors": buttons with no handler, mock data instead of a database. Replit's internal evals found over 30% of features broken on first build, so almost every app had at least one. Users will not click-test every field, and asking them to do it gave a bad experience. So Replit built autonomous testing. It breaks the feedback bottleneck, stops small errors from compounding, and checks model "laziness" when a model claims a task is done. He walks the spectrum: LSP static analysis, execution, unit tests (functional only), API tests (endpoints only), and browser testing via computer use (screenshots, slow, costly) or DOM-based browser use. Replit generates apps that are easy to test and combines database reads, logs, API calls and clicks, with screenshots as a fallback. Instead of a fixed browser tool set that misses long-tail interactions, the agent writes Playwright code. LLMs write it well, it is more expressive, and each test becomes a reusable regression test. The result is roughly an order of magnitude cheaper and faster than computer use.

**Context management and subagents**
Long-context models are not needed. Most tasks, even ambitious ones, fit within 200,000 tokens. Keep state in the codebase (docs written as code is written), in plans and task lists on the file system, and in memory files read back when relevant. The key ingredient is subagent orchestration: fresh context, the minimum input, return only the result. After Replit's new subagent orchestrator, memories per compression rose from about 35 to 45-50. For testing, subagents were "almost mandatory": browser observations in the main loop confused it.

**Parallelism**
Parallel agents trade compute for time. They duplicate about 80% of context across windows, and they create merge conflicts that Replit's users do not understand. The current "user as orchestrator" model leaves task decomposition and merging to the user. Replit's next bet is "the core loop as the orchestrator": the agent decomposes tasks itself, runs testing in parallel with coding, and shapes subtasks to reduce merge conflicts.

## Why it matters
- Separates autonomy (no technical decisions asked of the user) from run time, which gives a better metric than "hours run" for agent products.
- The 30%-broken-features finding and the "painted doors" framing make a strong case for autonomous verification in every app-building agent.
- Writing Playwright code instead of calling fixed browser tools is a concrete, reusable design: more expressive, reusable as regression tests, and about 10x cheaper than computer use.
- The subagent data point (memories per compression from about 35 to 45-50) and the need to isolate browser observations show why verification and context management depend on each other.
- "Core loop as orchestrator" names the next design step for parallel agents when users cannot decompose tasks or resolve merges.

## Metadata
- Video: https://www.youtube.com/watch?v=MLhAA9yguwM
- Duration: 24:42
- Playlist index: 58
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> [Music] So at Raplet, we're building a coding agent for nontechnical users. It's a very peculiar challenge I would say compared to many people in this room. And what I'm going to talk about today is why autonomy has become kind of the northstar that we keep chasing you know since we launched the very first version of rapid agent September last year. Let's start from this very interesting plot in case my clicker worked which now does. Um I'm sure you all have seen it the semiync value that published by Zixs a few weeks ago and it kind of clarified a bit the landscape you know for all of us uh agent builders. On one hand, you have the low latency interactions that really allow you to stay in...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/MLhAA9yguwM.txt]]
- Description cue: AI agents exhibit vastly different degrees of autonomy. Yet, the ability to accomplish objectives without supervision is the critical north star for agent progress, especially in software creation....

## Book angles
- Could support a chapter/section on **Coding Agents**.
