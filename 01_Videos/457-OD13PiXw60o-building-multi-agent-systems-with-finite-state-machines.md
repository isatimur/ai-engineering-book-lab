---
video_id: "OD13PiXw60o"
playlist_index: 457
title: "Building Multi agent Systems with Finite State Machines"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=OD13PiXw60o"
duration: "17:11"
duration_seconds: 1031
view_count: 4076
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/OD13PiXw60o.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:19:08+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Adam Terlson argues that finite state machines (statecharts) and the actor model give agentic systems everything LLMs lack: predictability, traceability, auditability, recoverability by event replay, and model-based testing. Combine them, and the machine supplies structure while the LLM supplies intelligence. He walks a ladder of agentic state machine patterns built with XState: tool use, human-in-the-loop approval, critic feedback, multi-agent collaboration, LLM orchestration where a planner emits events checked by transition guards, and agentic chartering, where the LLM writes the whole statechart."
---
# Building Multi agent Systems with Finite State Machines

## Summary
Adam Terlson's thesis: as AI gets more autonomous, the challenge is not only intelligence but predictability, observability and control. He links this to Gartner's number two 2025 trend, AI governance platforms, and argues that state machines can be a foundation for governing agent decisions and behaviour.

**State machines and actors**
A finite state machine models states and the transitions that events trigger. His rock-paper-scissors example shows five parts: state definitions, transition logic, guards that enforce valid transitions (if the throws match, throw again), actions and side effects, and context (stored data). Strictly it is a statechart, which adds hierarchical and parallel states. The actor model adds concurrent, encapsulated execution. An actor can only send and receive messages, update its internal state and create new actors, and a state machine defines its behaviour.

**What state machines give, and cost**
A Best Buy mentor told him he had never met a state machine he did not like. The benefits: predictable, traceable and auditable, reliable and recoverable (replay the event log to rebuild state, or stop part-way to branch history), low latency, declarative, and testable by model-based testing that exercises every valid transition. They also support the Saga pattern, with compensating transactions to undo failed steps. The costs: limited flexibility, state explosion, explicit transitions (unmodeled events are only logged), one event at a time per actor (he points to Azure Service Bus sessions and AWS SQS FIFO message groups), versioning when replaying old logs, and a learning curve.

His key observation: these advantages are "everything that llms are not". So pair them: actors give autonomy and communication, the state machine gives structure, the LLM gives dynamic intelligence.

**The agentic state machine patterns, by rising autonomy**
- Tool use: the LLM describes the call, it does not make it. Tools also enable RAG, for example fetching inventory so a recipe uses only available ingredients.
- Human in the loop: an approval state waits for an authenticated, authorized message. In the demo an admin first denies, then approves.
- Feedback: a recipe writer sends output to a nutrition critic ("use less sugar") and revises.
- Collaboration: specialized agents for recipe, procurement, preparation, feedback and reporting. The report feeds back into the writer, and the machine needs no final state.
- Orchestration: a central planning agent picks the next state. Its tool is a set of event emitters, and transition guards enforce that each jump is valid.
- Chartering (his own name for it): the LLM generates the whole statechart, which separates planning from execution. He gave an OpenAI reasoning model a privacyrights.org article on leaving the White Pages data broker, and it built a good process essentially zero-shot.

He ends on emergence. If it comes, he says, it will be because building agentic systems feels like building with Legos, composing specialized units. He credits XState for all the charts and points to his demo, red versus blue.

## Why it matters
- It frames LLMs and state machines as complements with opposite strengths, which gives a clear design rule: put the LLM inside a structure that is predictable and auditable.
- Transition guards on LLM-emitted events are a concrete way to let a planner choose the next step without letting it make invalid moves.
- Event-log replay, branching history and model-based testing bring proven reliability and testing tools to agent workflows.
- The six-step autonomy ladder, from tool use to chartering, is a useful map for deciding how much control to hand the model.
- Human-in-the-loop approval as an ordinary state that waits for an authorized message is a simple governance pattern.

## Metadata
- Video: https://www.youtube.com/watch?v=OD13PiXw60o
- Duration: 17:11
- Playlist index: 457
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> hi I'm Adam charlson and in this video I'll walk you through how finite State machines provide a structured reliable foundation for building applications including AI agents as AI becomes more autonomous the challenge isn't just intelligence or model performance it's also how to build systems with predictability observability and control espe important qualities when orchestrating large language models so the year is 2025 and the top AI Trends as listed by Gartner and probably everyone else too is a gentic AI we're autonomous AI plans and acts to achieve all our hopes and dreams but the number two Trend called out by Gardner is just as if not more important and that is the development of AI...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/OD13PiXw60o.txt]]
- Description cue: State machines and the Actor model are a timeless foundation for designing robust, scalable, and maintainable distributed systems by providing clear abstractions for managing state, concurrency,...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/adamterlson/AgenticStateMachines>
