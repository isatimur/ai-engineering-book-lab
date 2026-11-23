---
video_id: Ib5t2RLtxvM
playlist_index: 935
title: "From Agent Traces to Agent Simulations — Rustem Feyzkhanov, Snorkel AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Ib5t2RLtxvM"
duration: "20:24"
duration_seconds: 1224
view_count: 1700
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Ib5t2RLtxvM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:22:32+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Rustem Feyzkhanov, who leads the AI platform team at Snorkel AI, argues that every company needs its own benchmark. Production traces find failures, but they cannot compare agent configurations fairly, because database state and tool versions change between runs. Offline simulation turns traces into repeatable tasks in the Harbor format, with a Docker environment, hidden Oracle and verifiers, sidecar mocks and simulated users. Treat the benchmark as software with its own CI, use it as a release gate, and feed it from production failures in a second loop."
---

# From Agent Traces to Agent Simulations — Rustem Feyzkhanov, Snorkel AI

## Summary
Rustem Feyzkhanov leads the AI platform team at Snorkel AI, a data-as-a-service company that sells benchmarks and runs millions of agent simulations per month. His three takeaways: every company needs a benchmark; it must be as close to production as possible; and it must be part of the agent life cycle, a data set that production traces keep filling, not a static file.

**Traces find failures; simulations compare**
A trace shows the input prompt, the agent's actions and the output, so it is good for finding failures in production. But A/B tests on live traffic hit different database states and tool versions, so you "never fully compare apples to apples". Offline simulation turns traces into repeatable tasks. You then compare agent configurations on success rate, cost, latency and retries, in parallel, and test the full stack: model, thinking level, prompt, harness, skills and tools.

**Public benchmarks orient; private benchmarks ship**
SWE-bench, Terminal-Bench and computer-use benchmarks each cover one narrow domain and mostly report pass rate. A private benchmark must match your use cases, tools and policies. He lists three uses: release the agent, gate each change against regressions, and optimize cost or latency, including training. Snorkel used simulation environments to fine-tune a small model to match a large one on specific tasks.

**Anatomy of a task**
He uses the Harbor format from the Terminal-Bench team. The agent sees instruction.md and an environment (a Dockerfile or Docker Compose). It does not see the Oracle solution or the verifiers. Metadata completes the task. The Oracle proves the task is solvable.

**Environments as mini production**
The agent should not know it runs in a simulation. Use a database snapshot, sidecar containers for API services, databases and MCP tools, mocked APIs, and a simulated user: an LLM with its own prompt. For long-horizon tasks, split the work into steps with their own prompts and verifiers, and stop early when the agent fails.

**Verifiers read the whole world**
Verifiers check the final environment state, the trace and the artifacts. Use deterministic checks for outputs and tool calls, LLM-, harness- or agent-as-judge for plan and trace quality, and subject matter experts only where agent and verifiers disagree.

**Benchmarks are software**
Agents can reward-hack, verifiers can be too broad or simply wrong, and results can vary a lot. So give the benchmark its own CI: pin dependencies, check the base image and fixtures, run the Oracle, run the agent several times, and tag tasks simple, medium or hard.

**Fix things in the right place**
He calls prompt stuffing an anti-pattern: "Never do this or only do that." Fix context overload in the harness, a missing procedure in a skill, and output shape in structured output. In production, run two connected loops: observability failures expand the benchmark, and a simulation runner gates each release. In Q&A he recommends a held-out split of about 80/20, plus happy-path and edge cases such as failing tools.

## Why it matters
- It gives a precise reason live traces are not enough for evals: database state and tool versions drift, so comparisons are not fair.
- The Harbor task layout (visible instruction and environment, hidden Oracle and verifiers) is a concrete template for an in-house agent benchmark.
- The benchmark-CI checklist, especially running the Oracle to prove solvability, tackles reward hacking and broken verifiers before they skew results.
- The rule to put each fix in the harness, a skill or structured output, not the prompt, is a reusable design principle for agent iteration.

## Metadata
- Video: https://www.youtube.com/watch?v=Ib5t2RLtxvM
- Duration: 20:24
- Playlist index: 935
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Okay. Oh, yeah. Thanks everyone for coming. And I know this is the last session before lunch. So, thanks for staying here. Let's make it smooth and with good vibes. Just as that said. And thanks that for introduction. And for inviting me. So, yeah. My name is Rustam. I'm leading AI platform team uh at Snorkel. And uh today I want to tell you how to turn agent traces into agent simulations and why this uh becomes the next stage for agent evaluations. So, three main things that I want you to take away from my talk is uh every company needs a benchmark. It's the only way to reliably evaluate, release, and improve your agents. It has to be as close to production as possible. Uh it...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Ib5t2RLtxvM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://www.dropbox.com/scl/fi/lyp1my0oc9whpusps29t7/Agent-Simulations-Talk.pdf>
