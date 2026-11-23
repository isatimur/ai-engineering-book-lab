---
video_id: "E0k9Ppq6yXY"
playlist_index: 412
title: "Stateful Agents — Full Workshop with Charles Packer of Letta and MemGPT"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=E0k9Ppq6yXY"
duration: "1:19:34"
duration_seconds: 4774
view_count: 9528
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/E0k9Ppq6yXY.txt"
themes:
  - "Agent Architecture"
ingested_at: "2026-04-24T12:17:16+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Charles Packer, MemGPT co-author and Letta founder, argues that memory is the most important unsolved problem for agents: transformers are stateless, so an agent must close the loop by updating its own state, not by appending to a list in process memory. In this workshop he shows Letta's server-side agents. Editable core memory blocks sit in context; recall and archival stores sit outside it. Every model call is a tool call with reasoning and a heartbeat flag to keep going. Context caps evict and summarise old messages. He ends with stateful multi-agent message passing over APIs, shown by two agents arguing over a secret key."
---
# Stateful Agents — Full Workshop with Charles Packer of Letta and MemGPT

## Summary
Charles Packer wrote the MemGPT paper as a Berkeley PhD student and now runs Letta. This workshop uses a Jupyter notebook against a Letta server in Docker, then Letta's web development environment. His thesis: "an LLM taking actions in a loop" misses the key part. The loop is closed and the agent must be updated, but the transformer is stateless. So memory, or statefulness, is "probably the most important thing to solve".

**Why stateless agents fall short**
The default way to hold state is appending to a list in Python or Node.js process memory. That is why observability tools exist: the context is a black box of tokens. He frames context as a compilation problem: arrange a large state into the best possible context window, and let an LLM do it, not a human. His MemGPT example: an AI asks about the user's boyfriend James on Valentine's Day, the user says they broke up, and the agent must rewrite that fact or repeat the mistake later. Enterprises also have more data per user than a 10-million-token window holds, so agents need a second learning phase into in-context memory, not into weights.

**How Letta agents work**
- Server and client: agents live on a server backed by FastAPI and Postgres. You send single messages to an agent handle, never the full history.
- Core memory blocks: strings such as human and persona that sit in context. The agent edits them with tools such as core memory replace, and blocks can be shared across agents.
- Recall memory is write-protected conversation history; archival memory is a vector store the agent writes to and searches. The context includes counts of what lies outside it, so the agent knows what it does not know.
- Every model call is a tool call, even sending a message, with a reasoning field. Instead of looping until it says done, the agent must set a heartbeat flag to keep going, which he says derails less.
- Context caps: you can hold every payload under, say, 4K tokens. On overflow, Letta evicts messages to recall memory and runs a configurable summariser. When a block is full, the error tells the agent to move data to archival memory.
- Tool rules prune edges from a fully connected graph, the inverse of LangGraph. He prefers this because models keep getting better at tool calling.
- Tools are Python, run in a sandbox (E2B supported), can import the Letta client to manage other agents, and include Composio integrations.

**The development environment**
The web UI shows a context breakdown (about 1,000 tokens of system prompt, tool schemas, external summary, messages) and a context simulator with the full payload. Tools can be tested apart from the agent. He sees this as the next form of the playground.

**Stateful multi-agent**
Most multi-agent frameworks trap agents in one Python file. With agents as API services, multi-agent is message passing: async send with a receipt, send and wait for reply, or broadcast to agents by tag. His demo: an angry agent guarding a secret key and a second agent sent to comfort it. Removing the messaging tool cuts one off.

**Q&A notes**
Tool counts above roughly 12-15 degrade performance on models like GPT-4o mini. Letta is testing a split-thread agent with memory tools on a separate subconscious agent. Its largest enterprise deployment is a multi-agent system with no chat, processing transactions and learning about users. Archival memory has no forgetting, only timestamps for consolidation.

## Why it matters
- It gives a precise definition of a stateful agent and a reason it matters: transformers have no state, so the framework or the model must own memory updates.
- The core, recall and archival tiers, plus eviction and summarisation under a hard context cap, are a concrete design for long-running agents with bounded latency and cost.
- The heartbeat pattern (the agent must ask to continue) is a reusable alternative to loops that run until the model says it is done.
- Treating agents as persistent API services turns multi-agent design into message passing, with async, sync and broadcast patterns.
- The context simulator answers a common pain point: seeing the exact payload the model gets, without separate tracing tools.

## Metadata
- Video: https://www.youtube.com/watch?v=E0k9Ppq6yXY
- Duration: 1:19:34
- Playlist index: 412
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]

## Transcript excerpt
> So today I'm going to be going over a workshop. So there is like an interactive component. I think you can probably get a lot out of this talk just by watching. But if you do want to participate, um you're going to probably want to install Docker on your laptop if you don't already have it. And then you're going to want to pull this Docker image. Uh if you do this, it should be very easy to follow along. There's also a notebook in the channel. It's called I think like workshops letter and you can just hop over to the I think I also made like a tiny URL for it. Um but if you hop over to this link, this is like the notebook I'll be running over for maybe like the first 30 minutes. And this...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/E0k9Ppq6yXY.txt]]
- Description cue: A cornerstone of human intelligence is the ability to learn: as humans interact with the world, we form new memories and can adapt from experience. In this workshop, participants will learn...

## Book angles
- Could support a chapter/section on **Agent Architecture**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/letta-ai/tutorials>
