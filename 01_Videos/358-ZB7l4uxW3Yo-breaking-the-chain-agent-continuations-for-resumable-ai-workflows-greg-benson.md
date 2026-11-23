---
video_id: "ZB7l4uxW3Yo"
playlist_index: 358
title: "Breaking the Chain: Agent Continuations for Resumable AI Workflows - Greg Benson"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ZB7l4uxW3Yo"
duration: "27:02"
duration_seconds: 1622
view_count: 2386
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/ZB7l4uxW3Yo.txt"
themes:
  - "Agent Architecture"
ingested_at: "2026-04-24T12:15:05+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Greg Benson, a computer science professor at the University of San Francisco and chief scientist at SnapLogic, presents agent continuations. The idea comes from continuations in programming language theory: suspend an agent at any point, even deep inside nested sub-agents, and package its full state as a serializable object built on the messages array plus resume metadata. The application can collect a human approval or persist the state, shut down every agent loop, and later resume exactly where it stopped. A prototype on the OpenAI Python API shows a multi-level HR agent pausing for approval inside an account sub-agent. He claims novelty in combining human approval with arbitrary nesting."
---
# Breaking the Chain: Agent Continuations for Resumable AI Workflows - Greg Benson

## Summary
Greg Benson is a professor of computer science at the University of San Francisco and chief scientist at SnapLogic. His talk presents agent continuations, a mechanism from SnapLogic's Agent Creator research group. It captures the full state of a complex agent so you can pause for human approval and resume after a failure.

**The production problems**
- Human in the loop: high-risk tool calls, such as transferring money or deleting an account, need a human decision.
- Long-running agents: the longer an agent runs, the more likely a network or hardware failure. Rate limits on popular new models add another reason to stop and resume.
- Distributed execution: agents run in the cloud, in web apps, or behind Slack, not only on a desktop.
- Nesting: orchestrators with sub-agents, which have their own sub-agents, are now common.

**Agent loop persistence**
The agent loop is code that runs on some machine. Most frameworks keep that loop running while they wait, for example for a reply in Slack. Benson wants to shut the loop down entirely and restart it later, for example when the human approves.

**The idea**
Continuations are a long-standing concept in programming languages: stop a program at a point, bundle its state, and continue later. Few languages support them, because they need rich runtime support. The key insight for agents: the messages array is already a log of every interaction, replayed to the LLM on each call, so it holds most of the state. Add a little metadata and it is enough.

**How it works**
- Mark a tool as needing approval, and use a continuation agent class instead of the normal agent class. Otherwise the code looks like any decorator-based tool framework.
- A request returns either the final answer or a continuation object. The application inspects why it stopped, sets approval to true or false, and sends the object back through the same request method.
- The object holds the messages array, a resume request that names the exact tool call to resume, and a processed field with the decision. The format is recursive: a sub-agent's resume request holds its own continuation with its own messages, to any depth.
- As the suspension propagates up, each level wraps the object. The top level lifts the approval data to the surface so the application can act on it easily.
- After suspension, no agent loop needs to keep running.

**Demo**
A top-level HR agent has an email tool and an account sub-agent, whose authorize-account tool needs approval. Benson writes the first response to a file, edits the approval by hand, and sends it back. The agent rebuilds both levels of state and finishes with the account created. The final output is a normal messages array with no trace of the continuation.

**Status and next steps**
The prototype uses only the OpenAI Python API and is on GitHub. A newer version adds general suspension points: after a time limit, after a number of turns, or on an asynchronous request. The team plans to extend existing frameworks rather than ship a new one. He says other frameworks have state management but lack either the approval element or arbitrary nesting. SnapLogic also built continuations into its visual Agent Creator platform.

## Why it matters
- Separates waiting from running: an agent that waits hours for approval does not need a live process.
- Builds on the messages array that every agent already keeps, which makes the approach portable across frameworks.
- The recursive format addresses human approval deep inside multi-level sub-agent trees, a case he says other state-management schemes miss.
- The same snapshot supports checkpointing and fault tolerance for long-running agents, which links human-in-the-loop design to reliability.

## Metadata
- Video: https://www.youtube.com/watch?v=ZB7l4uxW3Yo
- Duration: 27:02
- Playlist index: 358
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]

## Transcript excerpt
> So, you've built some agents and they're working. Actually, they may be working really well, doing amazing things. And now you want to put these agents into a production setting. What are the other things you have to worry about? For example, do your agents need some form of human approval during their processing steps? Will your agents be running for long periods of time in the presence of failure? How do you address these issues? Today, we're going to be learning about a new mechanism that addresses both these issues, and I'm really excited to talk about it. So, let's get started. Hi, I'm Greg Benson. I'm a professor of computer science at the University of San Francisco and I'm chief...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ZB7l4uxW3Yo.txt]]
- Description cue: AI agents are powerful—but brittle. Once an agent chain starts, you either let it run or you tear it down and lose state. Agent Continuations change that contract. Borrowing from programming‑la...

## Book angles
- Could support a chapter/section on **Agent Architecture**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/SnapLogic/agent-continuations>
