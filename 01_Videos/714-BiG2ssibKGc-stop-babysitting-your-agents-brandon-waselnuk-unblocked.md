---
video_id: BiG2ssibKGc
playlist_index: 714
title: "Stop babysitting your agents... — Brandon Waselnuk, Unblocked"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=BiG2ssibKGc"
duration: "18:54"
duration_seconds: 1134
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/BiG2ssibKGc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
  - "MCP & Tooling"
ingested_at: 2026-06-04T14:09:44+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Brandon Waselnuk of Unblocked argues that the gap for coding agents is context, not intelligence, and that access is not understanding. He rejects three myths (naive RAG over docs, enough MCPs, a 1M-token window) and describes a context engine that reasons across all systems of record, resolves conflicts between code and Slack, respects permissions, personalises via a social graph and returns a small token-optimised answer. In a same-prompt test, the MCP-only run compiled but would have broken the system; the engine-backed PR got one nitpick. Lessons: solve conflicts, and do not cache good answers."
---

# Stop babysitting your agents... — Brandon Waselnuk, Unblocked

## Summary
Brandon Waselnuk works at Unblocked, which builds a context engine for agents. His thesis: a freshly spawned agent is a brilliant engineer with zero context about your org, and today you are its context engine. To stop babysitting, you must give it understanding, not only access. The talk covers three myths, the properties of a context engine, three hard lessons, and two demos.

**The context ladder**
He compares an agent to a new hire who builds context over months by asking good questions and dropping what does not help. Most teams sit at the "you are the context engine" stage: autocomplete, or an agentic IDE where a human triggers every job. The next rung is curated, static context: CLAUDE.md and AGENTS.md files and repos of company knowledge. These go stale, need upkeep and lack runtime data.

**Three myths**
- *Naive RAG over docs is context.* It fails through "satisfaction of search", a radiology term: the reader stops at the first finding. Ask for a Zendesk integration and the agent takes the first pattern it finds as the answer. You correct it, file by file, and you are babysitting again.
- *Enough MCPs and I'm done.* MCPs are pipes. They give access, not reasoning across sources.
- *A 1M-token context window solves it.* A full window gives no entities or relationships, and the agent "basically just can't reason over that much data".

**What a context engine must do**
It pulls static sources and runtime signals across every system of record, reasons exhaustively, and returns a small, token-optimised research packet before the agent plans. Key properties: a social graph as a pivot (which repos you work in, your PR history, who you work with); conflict resolution, for example when main says one thing and the CTO says in Slack it was built wrong; permissions carried through OAuth over MCP, so private chats reach only their owner; and the right context at the right time. Background agents need this most, or you wake up to a question instead of a PR.

**The comparison**
They ran the same real prompt twice: once with MCP access to each needed SaaS tool, once with the context engine only. The naive run compiled and passed the code checks, but a senior engineer said it would have broken the whole system. It missed the Bedrock fallback and broke the custom callers. The engine-backed PR got one nitpick and a go-ahead to merge.

**Three hard lessons**
They first optimised for access and waited for the model to work it out; years later it had not. They first let the agent pick between conflicting sources; conflicts turned out to be "that bad". They cached good answers for latency, but a cached answer can be a lie a day later because the system has changed.

**Demos and use**
A soon-to-be open-source tool builds a social and expert graph from a repo: who ships, who reviews whom, heat maps and peer tables. A second demo shows an agent asking the MCP for a Zendesk integration plan, then sending explore agents to the right places. His pattern: use the engine for planning, run execution, then use it again for code review. Teams also put it in "ask engineering" channels and use it for ticket enrichment, triage and incidents.

## Why it matters
- The "satisfaction of search" framing names a precise failure mode of agent retrieval: stopping at the first plausible pattern instead of searching exhaustively.
- The same-prompt comparison shows that passing compile and code checks says little about whether a change fits the org's architecture.
- Conflict resolution between code, docs and chat, weighted by who said what, is a concrete design requirement for any agent knowledge layer.
- The warning against caching good answers is a useful counterpoint to latency-driven memory designs.
- Carrying OAuth permissions through MCP shows how data governance shapes context-engine architecture once an org passes about 20 people.

## Metadata
- Video: https://www.youtube.com/watch?v=BiG2ssibKGc
- Duration: 18:54
- Playlist index: 714
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]
- [[MCP & Tooling]]


## Transcript excerpt
> Hello everybody. It's good to see you. I'm Brandon. I work at Unblocked. It's a great place. And my goal is to make it so that you don't have to babysit your agents anymore. I'm sure we all have a different take on what that means. What I think of is care and feeding. Basically, agents, whenever you spawn that by typing Claude in your CLI, let's assume whatever tool you may use, they exist and it's like a brilliant software engineer has just spawned and it knows nothing about what it needs to do. It knows nothing about your org. It's completely zero context in its head. So, typically what happens is people have to move through building that context, which we'll go through in the beginning....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/BiG2ssibKGc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **MCP & Tooling**.

