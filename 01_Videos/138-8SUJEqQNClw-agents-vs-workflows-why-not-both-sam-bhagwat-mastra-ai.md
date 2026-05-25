---
video_id: "8SUJEqQNClw"
playlist_index: 138
title: "Agents vs Workflows: Why Not Both? — Sam Bhagwat, Mastra.ai"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=8SUJEqQNClw"
duration: "15:37"
duration_seconds: 937
view_count: 21699
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/8SUJEqQNClw.txt"
themes:
  - "Agent Architecture"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T11:25:13+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sam Bhagwat (co-founder Mastra.ai, formerly Gatsby) argues the agents-vs-workflows debate was largely manufactured — most real systems need both, and the interesting engineering is in composing them. Two hot takes: (1) model providers punching down on workflows are the new 'that guy' who once lectured web devs about the right way to build; (2) graph node/edge APIs (e.g. LangGraph) are harmful because they require teams to learn graph theory to write production code. The practical alternative: fluent workflow syntax where control flow is readable top-to-bottom. Core composition patterns: agents as workflow steps, workflows as agent tools, nested workflows, dynamic tool injection when >10 tools degrade agent performance."
---
# Agents vs Workflows: Why Not Both? — Sam Bhagwat, Mastra.ai

## Summary
Sam Bhagwat (Mastra.ai co-founder, previously co-founded Gatsby) sets up the talk as a "reverse mullet" — party (Twitter discourse) in the front, business (design patterns) in the back.

### The Discourse Context
Two publications triggered the agents-vs-workflows debate: Anthropic's December "Building Effective Agents" blog post (widely praised for clarity) and OpenAI's follow-up paper that contained what Bhagwat calls an "anti-workflow blast." His first hot take: model providers hold disproportionate ecosystem influence (like FAANG in web dev) and when they punch down on workflows it muddies the water for everyone building production systems. He draws an explicit parallel to Googlers who pushed anti-React opinions in the 2010s.

### Hot Take 2: Graph APIs Are Harmful
Bhagwat has personal history here — Gatsby defaulted to GraphQL for data fetching, which was "really cool in 2017" but excluded users who just wanted a React meta-framework. His claim: requiring teams to learn graph theory to write agent workflows repeats that mistake. He shows Mastra's fluent workflow syntax as the alternative — you can read the control flow top-to-bottom like normal code, see the dependency chain clearly, and reason about it without specialized knowledge.

### Agent vs Workflow Definitions
- **Agent**: turn-based game. I take a turn, agent takes a turn, maybe makes a tool call, loops until a terminal condition.
- **Workflow**: rules engine / tech tree. Dependencies determine sequencing (can't do B until A is done). Emergent properties include branching, parallelism, conditions, loops, suspend/resume.

Non-determinism is core to AI engineering — and tracing what happened matters 10x more than in traditional software, which is why workflow tooling is more important here than in general engineering.

### Composition Patterns
The real value comes from combining primitives:
- Agent as a workflow step
- Workflow as an agent tool
- Agent supervisor calling other agents as tools (agent-calls-agent pattern)
- Dynamic tool injection: if an agent has 10+ tools, consider injecting only the relevant subset per task to prevent degraded performance
- Nested workflows: a step that is itself a multi-step workflow

The pattern: start with agent-driven power, then add workflow-style control to the parts that go off the rails.

### Community of Practice Note
Bhagwat closes with a pragmatic epistemology: "We are a community of practice more than a community of theory. If your agent works with 20 tools, that probably means the theory is wrong, not your practice."

## Why it matters
- The fluent-vs-graph-API argument gives teams a concrete criterion for evaluating workflow frameworks beyond popularity.
- The composition pattern taxonomy (agent-as-step, workflow-as-tool, etc.) provides a shared vocabulary for architectural discussions.
- The "add control to what goes off the rails" heuristic is actionable: start with maximum agent autonomy, then introduce workflow guardrails incrementally.
- The discourse critique is useful context for understanding why conflicting advice (agents vs workflows) circulates from authoritative sources.

## Metadata
- Video: https://www.youtube.com/watch?v=8SUJEqQNClw
- Duration: 15:37
- Playlist index: 138
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] Okay. Agents or workflows? Why not both? Uh, thank you, Alex, for the nice intro. Um, uh, like like he said, I used to be the founder of co-founder of Gatsby. Um, I wrote a book called Principles of AI agents, which is floating around. Hopefully many of you have gotten a copy. We we have more around the conference. Uh there was a big debate uh a couple of months ago which the term on Twitter people may have noticed um which I just referenced. Um and I think like this is a big reason why I'm h why we're having this talk why we're having this track. Um this is going to be kind of like a reverse mullet talk or something like that. It's like party in the front, business in the back or...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/8SUJEqQNClw.txt]]
- Description cue: One current hot debate is should you make your top-level abstraction a ReAct type agent running in a loop? or should you make it a structured workflow graph?

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Org Design & Leadership**.
