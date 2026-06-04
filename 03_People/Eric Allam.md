# Eric Allam

**Role:** Co-founder, Trigger.dev  
**Organization:** Trigger.dev  
**Themes:** [[Agent Architecture]], [[Coding Agents]]

## Overview

Eric Allam co-founded Trigger.dev, an open-source background jobs and agent orchestration platform. His 2026 AI Engineer talk offers a clear technical taxonomy of the two dominant approaches to durable agent execution: replay (Temporal-style) vs. snapshot (checkpoint-based).

## Appearances in corpus

- [[666-svCnShDvgQg-two-roads-to-durable-agents-replay-vs-snapshot-eric-allam-trigger-dev|#666 — Two Roads to Durable Agents: Replay vs. Snapshot]] (Agent Architecture)

## Key claims / positions

- Two fundamentally different approaches to durable agent execution: replay (re-execute from event log) vs. snapshot (serialize and restore state).
- Replay is more auditable; snapshot is faster to resume — neither is universally better.
- The choice of durability primitive locks in your debugging model, observability model, and recovery model.
- Trigger.dev adopts a snapshot-first approach because LLM calls are not deterministically replayable.

## Manuscript relevance

Chapter 4 (durable runtime) — provides the clearest taxonomy of durability approaches in the corpus. Pairs with Jonas Templestein (event sourcing) and Cornelia Davis (Temporal/replay).
