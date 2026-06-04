# Agent Runtime Replay vs Snapshot

## Working definition
Replay vs snapshot is a runtime design tradeoff for durable agents: reconstruct state by replaying an event history, or resume from saved snapshots of execution state.

## Core synthesis
Durable agents need a way to survive interruptions, retries, failures, and long-running tasks. The new question is not whether agents need state, but how that state should be represented and recovered.

Replay-oriented systems preserve an event history and rebuild the workflow from it. Snapshot-oriented systems preserve checkpoints of the working state. Each approach changes debuggability, cost, determinism, latency, and developer ergonomics.

This concept sharpens [[Durable Agents]] by giving Chapter 6 a concrete runtime-level tradeoff.

## Tradeoffs

### Replay
- Strong audit trail.
- Easier to reason about causality.
- Useful when deterministic reconstruction matters.
- Can become expensive or awkward when histories grow or nondeterminism leaks in.

### Snapshot
- Faster resume path.
- More direct continuation for complex state.
- Useful when preserving execution state is more practical than rebuilding it.
- Can hide causal history unless paired with good logs.

## Design questions
- Does the agent need exact reproducibility or fast continuation?
- Which parts of state are deterministic enough to replay?
- Which tool calls and model outputs must be recorded?
- How much history does a human reviewer need?
- Where do approval checkpoints belong?

## Source cluster
- [[666-svCnShDvgQg-two-roads-to-durable-agents-replay-vs-snapshot-eric-allam-trigger-dev|#666 - Two Roads to Durable Agents: Replay vs. Snapshot]]
- [[038-k8cnVCMYmNc-openai-temporalio-building-durable-production-ready-agents-cornelia-davis-temporal|#38 - Building Durable, Production Ready Agents]]
- [[044-kmV-qg4uoNI-building-durable-agents-with-workflow-devkit-ai-sdk-peter-wielander-vercel|#44 - Building durable Agents with Workflow DevKit & AI SDK]]
- [[099-flf_IKnFYnE-from-stateless-nightmares-to-durable-agents-samuel-colvin-pydantic|#99 - From Stateless Nightmares to Durable Agents]]
- [[167-1izYWsokr9s-scaling-ai-agents-without-breaking-reliability-preeti-somal-temporal|#167 - Scaling AI Agents Without Breaking Reliability]]

## Output uses
- Chapter 6 update: runtimes, state, and the human control plane
- YouTube episode: "Replay vs Snapshot: Two Roads To Durable Agents"
- Practical guide on choosing agent durability patterns
