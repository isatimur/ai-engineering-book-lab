# Tejas Kumar

**Role:** Developer Advocate / Engineer, IBM  
**Organization:** IBM  
**Themes:** [[Agent Architecture]], [[Security & Guardrails]]

## Overview

Tejas Kumar is a developer advocate at IBM focused on AI agent infrastructure. His AI Engineer talk on "harnesses" provides a clear conceptual framework for the scaffolding layer that wraps and constrains agent behavior — a framing that maps directly onto the book's constrained delegation thesis.

## Appearances in corpus

- [[690-C_GG5g38vLU-harnesses-in-ai-a-deep-dive-tejas-kumar-ibm|#690 — Harnesses in AI: A Deep Dive]] (Agent Architecture, Security & Guardrails)

## Key claims / positions

- A harness is "everything around the model that gives it grounding in reality" — the model is one component, the harness is the agent.
- Five harness components: tool registry, model, context primitives, guardrails, and agent loop with verify step.
- Adding a harness (no prompt changes) turns a hallucinating GPT-3.5 Turbo browser agent into a reliable one — harness > prompt engineering for reliability.
- The verify step (a second LLM pass over tool call history) catches agent hallucinations that output inspection misses.
- Deterministic harness layers (e.g., login handlers) should replace stochastic model behavior for predictable sub-tasks.
- Prediction: 2026 = year of harnesses; 2027 = dynamically generated harnesses.
- "The model is a commodity; the harness is the product."

## Manuscript relevance

Chapter 8 (constrained delegation) — "harness" is the clearest framing in the corpus for the control plane concept. Directly supports the book's central argument. Chapter 6 (software factory) — harness-first development as the discipline replacing prompt engineering. Chapter 7 (reliability) — verify step as lightweight adversarial evaluation.
