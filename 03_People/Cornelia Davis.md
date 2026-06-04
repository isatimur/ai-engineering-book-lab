# Cornelia Davis

**Role:** CTO / Technical Fellow, Temporal  
**Organization:** [[Temporal]]  
**Themes:** [[Agent Architecture]]

## Overview

Cornelia Davis is a distributed systems veteran (Pivotal, Broadcom) who joined Temporal and became one of the clearest voices on why durable execution is the correct infrastructure primitive for production AI agents. Her AI Engineer talk demonstrates the Temporal + OpenAI integration pattern with direct attention to production-grade concerns.

## Appearances in corpus

- [[038-k8cnVCMYmNc-openai-temporalio-building-durable-production-ready-agents-cornelia-davis-temporal|#38 — OpenAI + Temporal: Building Durable, Production Ready Agents]] (Agent Architecture)

## Key claims / positions

- Production agent failures are predominantly infrastructure failures (timeouts, partial execution, lost state), not model failures.
- Temporal's durable execution model makes retries, timeouts, and compensation logic first-class concepts rather than application-layer afterthoughts.
- The workflow-as-code model (vs. YAML/DSL orchestration) is essential for agents because agent logic is too dynamic for static workflow definitions.
- Every serious agent deployment needs an answer to "what happens when this fails halfway through" — Temporal is one answer.

## Manuscript relevance

Chapter 4 (durable runtime) — Cornelia Davis is the canonical Temporal advocate in the corpus. Her talk is primary evidence for the claim that workflow orchestration is not optional for production agents.
