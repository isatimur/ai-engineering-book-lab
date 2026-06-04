# Ash Prabaker

**Role:** Engineering / Research, Anthropic  
**Organization:** [[Anthropic]]  
**Themes:** [[Agent Architecture]], [[Coding Agents]]

## Overview

Ash Prabaker works at Anthropic on long-running agent systems. His 2026 AI Engineer talk (with Andrew Wilson) is one of the most detailed public treatments of the engineering challenges of agents that run for hours — context management, checkpointing, and maintaining coherence across extended tasks.

## Appearances in corpus

- [[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Build Agents That Run for Hours (Without Losing the Plot)]] (Agent Architecture, with Andrew Wilson)

## Key claims / positions

- Context management is the central unsolved engineering problem for long-horizon agents — not capability, not safety.
- Agents "losing the plot" (losing track of original goals mid-task) is a concrete, measurable failure mode distinct from hallucination.
- Checkpoint/resume patterns borrowed from distributed systems are directly applicable to agent durability.
- Hours-long agents require explicit goal state tracking separate from conversation context.

## Manuscript relevance

Core source for Chapter 4 (durable runtime) and Chapter 8 (constrained delegation). Long-horizon agent management is a key subplot of the book's argument about what "colleague-grade" reliability requires.
