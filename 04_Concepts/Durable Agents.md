# Durable Agents

## Working definition
Durable agents are AI systems designed to survive time, retries, interruptions, and multi-step workflows without losing state or coherence.

## Core synthesis
The corpus repeatedly contrasts demo agents with production agents. The difference is rarely "intelligence" alone. It is the ability to persist intent, state, checkpoints, and recovery paths across long-running work. Stateless chat loops are fine for momentary assistance; they become painful for real delegation.

Durability shows up as workflow orchestration, resumability, checkpointing, state stores, event logs, and explicit human handoffs. The recurring insight is that once an agent acts over minutes, hours, or days, you are no longer building a prompt product. You are building a distributed system with probabilistic decision nodes.

The newest batch makes this more concrete in two ways. First, Jonas Templestein frames the runtime itself as an **event-sourced stream system** with pause/resume semantics and circuit breakers for runaway loops. Second, Anthropic shows that long-running coding agents still rely on harness-level structure even as models improve: better models can simplify the loop, but they do not remove the need for planners, evaluators, checkpoints, or explicit state transitions.

## What this concept is really about
- Replacing brittle loops with resumable workflows.
- Explicitly modeling failure, pause, retry, and approval states.
- Separating transient reasoning from durable task state.
- Making long-horizon delegated work inspectable and recoverable.

## Recurring patterns in the corpus
1. **Long-running tasks need checkpoints.** Otherwise one model miss or timeout destroys progress.
2. **State should be inspectable.** Operators need to know what the agent believes, has done, and plans next.
3. **Durability reduces hidden costs.** Teams spend less time reconstructing failed work.
4. **Human approvals fit naturally into durable workflows.** Control is easier when state is explicit.
5. **Durability is a platform concern.** It often belongs in the runtime more than the prompt.

## Important distinctions
### Durable does not mean fully autonomous
A durable agent may still require human approvals at key points. Durability is about continuity and recoverability, not unchecked freedom.

### State is not just transcript
Conversation history is insufficient for serious workflows. Durable systems need structured task state and event boundaries.

## Design implications
- Use workflow runtimes or equivalent persistence layers for long tasks.
- Log state transitions, not only chat messages.
- Design resumability before scaling task complexity.
- Insert human checkpoints where errors are expensive or irreversible.

## Why it matters for the book
This concept helps the book explain why dependable delegation requires architecture, not just model progress. Durable agents are where "colleague" starts to become operationally believable.

## Source cluster
- [[038-k8cnVCMYmNc-openai-temporalio-building-durable-production-ready-agents-cornelia-davis-temporal|#38 — OpenAI + @Temporalio : Building Durable, Production Ready Agents - Cornelia Davis, Temporal]]
- [[044-kmV-qg4uoNI-building-durable-agents-with-workflow-devkit-ai-sdk-peter-wielander-vercel|#44 — Building durable Agents with Workflow DevKit & AI SDK - Peter Wielander, Vercel]]
- [[099-flf_IKnFYnE-from-stateless-nightmares-to-durable-agents-samuel-colvin-pydantic|#99 — From Stateless Nightmares to Durable Agents — Samuel Colvin, Pydantic]]
- [[167-1izYWsokr9s-scaling-ai-agents-without-breaking-reliability-preeti-somal-temporal|#167 — Scaling AI Agents Without Breaking Reliability — Preeti Somal, Temporal]]
- [[208-5rMc-moNVx0-stateful-environments-for-vertical-agents-josh-purtell-synth-labs|#208 — Stateful environments for vertical agents — Josh Purtell, Synth Labs]]
- [[412-E0k9Ppq6yXY-stateful-agents-full-workshop-with-charles-packer-of-letta-and-memgpt|#412 — Stateful Agents — Full Workshop with Charles Packer of Letta and MemGPT]]
- [[666-svCnShDvgQg-two-roads-to-durable-agents-replay-vs-snapshot-eric-allam-trigger-dev|#666 — Two Roads to Durable Agents: Replay vs. Snapshot — Eric Allam, Trigger.dev]] *(clearest taxonomy: context durability vs. execution durability; Firecracker VM snapshots)*
- [[679-vi-2nasppAg-make-your-own-event-sourced-agent-harness-using-stream-processors-jonas-templestein-iterat|#679 — Make your own event-sourced agent harness using stream processors — Jonas Templestein, Iterate]] *(most radical position: event stream IS the runtime; pure event sourcing for debuggability and recovery)*
- [[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Build Agents That Run for Hours (Without Losing the Plot) — Ash Prabaker & Andrew Wilson, Anthropic]] *(capability curve data: 1hr→12hrs in one year; context anxiety; shared filesystem as state for long runs)*

## Open questions
- Which state belongs in the runtime, memory system, or application DB?
- How should teams test recovery behavior, not just happy-path execution?
- What are the right abstractions for pause/resume across different agent frameworks?
