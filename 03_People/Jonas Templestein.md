# Jonas Templestein

**Role:** Founder, Iterate  
**Organization:** Iterate  
**Themes:** [[Agent Architecture]], [[MCP & Tooling]]

## Overview

Jonas Templestein is the founder of Iterate, focused on event-sourced agent infrastructure. His work centers on using stream processors as the underlying substrate for agent harnesses — a low-level systems approach to making agents durable and debuggable.

## Appearances in corpus

- [[679-vi-2nasppAg-make-your-own-event-sourced-agent-harness-using-stream-processors-jonas-templestein-iterat|#679 — Make your own event-sourced agent harness using stream processors]] (Agent Architecture)

## Key claims / positions

- Event sourcing is the right primitive for agent durability: every action is a fact, replay is free, debugging becomes tractable.
- Stream processors (Kafka, Redpanda) give you exactly the semantics agents need: ordered, durable, replayable.
- DIY agent harnesses built on proven streaming infrastructure beat purpose-built agent frameworks on production robustness.
- The agent harness is an infrastructure concern, not a product concern — own it.

## Manuscript relevance

Chapter 4 (durable runtime) — event sourcing as alternative to workflow engines like Temporal. Complements the Cornelia Davis / Temporal perspective.
