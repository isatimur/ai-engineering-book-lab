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
summary: "Snorkel AI's Rustem Feyzkhanov argues every company needs a private, production-mimicking benchmark built on the Harbor task format, continuously refreshed from production traces, not just static public benchmarks."
---

# From Agent Traces to Agent Simulations — Rustem Feyzkhanov, Snorkel AI

## Summary
Rustem Feyzkhanov, who leads the AI platform team at Snorkel AI (a company that sells benchmarks and runs millions of agent simulations per month), argues that production traces alone are useful for spotting failures but not for repeatable comparison — different runs hit different database states and tool versions, so you can't compare configurations apples-to-apples. His fix is offline simulation: turn traces into repeatable tasks and replay them under controlled conditions, scoring not just success rate but cost, latency, and retries. He contrasts this with public benchmarks like SWE-bench (GitHub issue fixing), Terminal-Bench, and computer-use benchmarks, which are useful for orienting on frontier model quality but too generic to ship against — private benchmarks need to mirror a company's own tools, policies, and workflows. For task construction he describes the Harbor format (from the Terminal-Bench team): an instruction.md, a Dockerfile/Compose environment, an Oracle solution plus verifiers (hidden from the agent), and metadata; environments use sidecar containers, mocked APIs, and simulated users (an LLM playing the human) to approximate production without running it. Verifiers combine deterministic checks, LLM-/agent-as-judge scoring, and targeted subject-matter-expert review reserved for cases where the agent and verifier disagree, and the benchmark suite itself gets treated as software with its own CI pipeline (checking pinned dependencies, running the Oracle to confirm solvability, tagging task difficulty) since agents can reward-hack loose verifiers or fail against broken ones. In production this becomes a two-loop system — observability traces feed benchmark expansion, and a simulation runner gates releases — and he flags fixing everything via prompt instructions ("never do this") as an anti-pattern versus placing fixes in the harness, a skill, or structured output where they belong; he also mentions using simulation-generated traces to fine-tune a small planner model to match a large model's performance on specific tasks.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

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
