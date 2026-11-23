---
video_id: 4UtrRVtUN_g
playlist_index: 1415
title: "How to Build an AI Code Review Agent - Daksh Gupta, Greptile"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=4UtrRVtUN_g"
duration: "18:27"
duration_seconds: 1107
view_count: 40000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/4UtrRVtUN_g.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-31T03:13:45+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Daksh Gupta, co-founder of Greptile, whose review agents see about 1% of GitHub pull requests, gives the playbook his team hands to companies that build their own. A sandboxed agent on a PR webhook works in a day but misses bugs and context, costs $3-25 per PR, and writes nitpicks that coding agents then turn into defensive code. His fixes: prompts built on a catalog of your own incident bug types, a live dataset of historical bad PRs (catastrophic bugs hit about 1 in 1,000 PRs), model inversion for a 10% higher catch rate, a codebase knowledge base instead of grep, docs and tickets for intent, vision-based end-to-end testing, and a mix of small and frontier models."
---

# How to Build an AI Code Review Agent - Daksh Gupta, Greptile

## Summary
Daksh Gupta is a co-founder of Greptile, which builds agents that review and test pull requests with full codebase context. Many thousands of companies use it, and about 1% of all GitHub pull requests go through it. When a company's needs are too specialized, Greptile helps it build its own reviewer for free. This talk is that advice: how to build a great AI code review agent, and how to judge one you buy.

**The naive version and what breaks**
Get a sandbox (Firecracker works), put an agent in it, and prefer a model-independent open-source harness such as Open Code or Pi. Wire a PR webhook and post feedback through GitHub's review APIs. About five minutes later you get comments. Then five things go wrong:
- It misses bugs, which seem "fractally infinite."
- It misses context, worst for companies with thousands of microservice repos.
- It costs $3 to $25 per pull request.
- It writes nitpicks that annoy humans and "wreck your code base," because coding agents address every comment and write painfully defensive code.
- Each rerun finds new bugs on the same PR.

**Five improvements**
1. Optimize the prompt. Mine past outages for the bug types you produce most, catalog them, and ask for those. Define nitpicks and forbid them. Small prompt changes swing comment counts a lot, and a reviewer can show the presence of bugs but not their absence.
2. Build a dataset of historical PRs that caused incidents, and score each agent version on them. Catastrophic bugs appear in about one of every thousand PRs, so a regression can hide for a long time. Keep the dataset current: 80-90% of bugs repeat old mistakes, but agents make novel ones.
3. Use model inversion. Claude models are about three times more likely to produce "one-off errors", and GPT models are more likely to produce auth bypasses. A model reviewing its own output fails the same way, so review Claude code with GPT and vice versa. Detect the author from fingerprints (codex/ branch names, co-authored-by lines) about 80% of the time, and use heuristics or telemetry for the rest. Flipping models gave a 10% higher catch rate.
4. Add codebase context. Grep is imprecise and expensive; most coding agent tokens go to grep, file reads and cache writes. Greptile indexes the codebase into a knowledge base by area (auth flows, diagrams, files). Docs and tickets from Jira, Linear, Confluence or Notion supply intent, since a Slack prompt carries little. Greptile merges these into a "living wiki" with production telemetry.
5. Test autonomously. Spin up the stack in dependency-rich sandboxes and test flows with computer vision, catching bugs such as a button hidden on iPhones. You need documented flows and a simple build script; Greptile uses forward deployed engineers for this.

**Cutting cost**
Even then a review costs $3 to $20. Greptile uses frontier models for about 20% of the work, the critical tasks such as bug analysis, and smaller models for exploration, file reads and lightweight computer use, across 20 subtasks with model choice tuned by a research team. Swapping simple tasks to simple models gets 70-80% of the gain, but only a large dataset shows when a swap hurts bug catching. A cheap model can also re-rank context before it enters the frontier model's cache.

## Why it matters
- It lists the failure modes of a naive review agent, including nitpicks that make coding agents write defensive code.
- The incident-based PR dataset answers a hard eval problem: catastrophic bugs are rare, so regressions stay hidden.
- Model inversion is a cheap, concrete tactic with a stated 10% catch-rate gain.
- The 20% frontier, 80% small-model split gives a working cost pattern for multi-step agents.

## Metadata
- Video: https://www.youtube.com/watch?v=4UtrRVtUN_g
- Duration: 18:27
- Playlist index: 1415
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Um all right, my name is Dax. I am one of the co-founders of a company called Griptile and we build agents that review and test pull requests with the full context of the code base. And by reviewing and testing these pull requests, we reveal bugs, logical errors, code quality concerns, primarily from the AI-generated code. Now, to give you a sense of scale, many thousands of companies use Griptile every day. About 1% of all pull requests on GitHub go through us and a variety of many different types of code bases, whether it's the CUDA code base at Nvidia or the wallet code base at Coinbase and many, many others. And every now and then, we meet a company where we're actually not...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/4UtrRVtUN_g.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
