---
video_id: HvMyYLTfvhg
playlist_index: 1050
title: "Building Agents Is Trivial Now, Context Is the Next Frontier — Jeff Ng, Unblocked"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=HvMyYLTfvhg"
duration: "13:22"
duration_seconds: 802
view_count: 2200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/HvMyYLTfvhg.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-25T01:52:32+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jeff Ng, a founding engineer at Unblocked, argues that building agents is now easy, since cloud primitives and frameworks absorb durability, sandboxing and observability, but agents still get things 'confidently wrong' because they lack organisational context. His demo: a Linear issue-enrichment agent recommends re-enabling async dispatch, the exact change that caused an outage days earlier, because it never saw the Slack discussion or the postmortem. Locally, humans act as the context layer. Without them you need a context engine that reconciles, ranks and permission-scopes knowledge, because 'MCP is great at access, but access isn't understanding.'"
---

# Building Agents Is Trivial Now, Context Is the Next Frontier — Jeff Ng, Unblocked

## Summary
Jeff Ng is a founding engineer at Unblocked. His short talk has two halves: building agents "has actually gotten pretty easy", but agents "still get things confidently wrong". The gap, in the closing line, "isn't intelligence, it's context."

**The infrastructure tax is mostly gone**
Six months ago, he says, an agent took a team about a quarter to build, because a production agent needs much more than a model and tools. He singles out three "taxes" that add no capability:
- **Checkpoints and state persistence.** Agent runs are long and stateful, but infrastructure is ephemeral. A crash loses message history, tool calls and loop position. Restarting wastes tokens, adds latency and risks doubled side effects.
- **Sandboxes.** Agent-generated and third-party code needs isolation so it cannot read environment secrets, reach the network freely or take down a shared host.
- **Observability.** Answering "where did this fail?" means stitching logs and traces from half a dozen systems.

Cloud players such as Cloudflare and AWS now ship primitives for these, and agent frameworks sit on top. Defining an agent comes down to a model, instructions, tools and skills, and a sandbox location.

**The demo that goes wrong**
He builds an issue-enrichment agent for Linear. It fetches a ticket, classifies it as a feature or a bug, searches the code and writes a plan. The test ticket reports a serious regression in their agentic QA pipeline: time to first character of three to four seconds instead of hundreds of milliseconds. The agent recommends re-enabling async dispatch, which sounds sensible. It is wrong. That setting had caused an outage a few days earlier, and a support engineer had disabled it on purpose. The agent never saw the Slack thread where engineers worked through the outage, or the postmortem ticket.

**Humans are the hidden context layer**
Locally we rarely hit this, because the engineer supplies missing facts, catches errors and steers on every turn: "we're there to babysit the agent". Once agents are trivial to deploy and run without a human, the missing context becomes "a silent failure".

**Context engine, not more MCPs**
He defines a context engine as a system that gives task-relevant information based on who is asking, resolves conflicts across data sets, respects the access roles of the user or agent, and delivers a synthesised answer. Unblocked connects docs, code, tickets and conversations, builds a model of the organisation, and hands agents a slice that is reconciled, ranked and scoped to permissions. Why not just attach Slack, Linear and GitHub MCPs? Raw results flood the context window, raise cost, and leave the agent to decide ad hoc between conflicting sources. With the context engine attached, the same agent finds the postmortem and Slack thread, gets a summary, and now recommends a change that prevents another outage. He also points to coding-agent planning, code review, customer success and sales as uses.

## Why it matters
- A crisp, reproducible failure story: a plausible agent fix that would have re-triggered a real outage because decision history lived in Slack and a postmortem.
- Names the human-as-context-layer effect, which explains why agents that work well interactively fail silently when run autonomously.
- The 'access isn't understanding' argument draws a useful line between connecting tools (MCP) and reconciling what they return.
- Lists the infrastructure taxes (durable state, sandboxing, observability) that frameworks now absorb, which helps explain why agent-building effort is shifting to context.
- Vendor talk: the context engine is Unblocked's product, so the before-and-after demo is a single example, not a benchmark.

## Metadata
- Video: https://www.youtube.com/watch?v=HvMyYLTfvhg
- Duration: 13:22
- Playlist index: 1050
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hi all. Uh, my name is Jeff. I'm a founding engineer at Unblock and I'm here to talk to you about how building agents has actually gotten pretty easy, but unfortunately they still get things confidently wrong. So six months ago, it required a team's effort and basically a quarter to build out an agent. Um, an agent is more than just models and tools. It's the models, the tools, and everything required to build out a production service. Here are some examples of the different systems necessary in order to build something out. Each one of these was basically its own company or at least a company function. Not going to go through each one of these, but you know, a few of that stood out...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/HvMyYLTfvhg.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
