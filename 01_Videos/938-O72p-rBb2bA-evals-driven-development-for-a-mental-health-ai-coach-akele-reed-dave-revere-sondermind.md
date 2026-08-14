---
video_id: O72p-rBb2bA
playlist_index: 938
title: "Evals-Driven Development for a Mental Health AI Coach — Akele Reed & Dave Revere, SonderMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=O72p-rBb2bA"
duration: "21:17"
duration_seconds: 1277
view_count: 1500
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/O72p-rBb2bA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:22:37+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "SonderMind engineers describe Sonder's separate input/output LLM-judge guardrails, a clinician-annotation-to-eval CI loop, and an open-sourced guardrail-scenario dataset."
---

# Evals-Driven Development for a Mental Health AI Coach — Akele Reed & Dave Revere, SonderMind

## Summary
Akele Reed and Dave Revere (SonderMind, a mental health care company that has served over a million people, partnering with Headspace, Aetna, and Anthem) describe the architecture behind "Sonder," a clinically grounded AI coach with conversational and voice interfaces: input guardrails screen the incoming user message before the core model responds, and output guardrails watch the AI's response and the conversation as a whole, both implemented as separate LLM-as-judge calls (rather than folded into the main prompt) because separating them makes guardrails harder to jailbreak, at a deliberate cost and latency trade-off. Their explicit design goal is "more correct triggers," not "more triggers": general-purpose LLM guardrails were too conservative and had to be turned off on day one because they filtered nearly everything, so SonderMind built its own, calibrated against scenarios ranging from an active domestic-violence crisis (disengage, surface resources) to ambiguous past trauma (surface resources, keep talking) to no-risk relationship talk (pass through silently). Their "learning loop" runs on clinician annotation: a licensed clinician (Caroline Collie) reviews traced conversations — including indirect, coded self-harm language such as "I packed a box today, just one to feel what it would be like to be gone" — and annotates them with an expected observation, turn index, and category, which an extraction script converts into typed evals that gate every prompt, model, or guardrail change in CI. Their calibration philosophy explicitly rejects chasing "perfect" benchmarks in favor of tracking real failure modes (false positives, false negatives, category, timing) against clinician-defined ground truth, since over-triggering guardrails can itself deny people needed care. They also open-sourced 200 input-guardrail and 100 output-guardrail scenarios, clinically reviewed and calibrated against real conversation patterns across single- and multi-turn cases, as a shared baseline for others building similar systems.

## Why it matters
- Gives a concrete example of guardrails built as separate LLM-as-judge calls, with an explicit rationale (jailbreak resistance) and an acknowledged cost/latency trade-off — a useful case study for agent-safety architecture.
- The clinician-annotation-to-typed-eval pipeline ("a clinician's judgment living in CI") is a specific, reusable pattern for evals-driven development in any high-stakes domain, not just mental health.
- The open-sourced 200/100 guardrail-scenario dataset is a citable, checkable artifact — real numbers and real scope — for a book section on safety evals.

## Metadata
- Video: https://www.youtube.com/watch?v=O72p-rBb2bA
- Duration: 21:17
- Playlist index: 938
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Uh my name is Aka Breed and my colleague Dave Revier and I are going to talk to you today about engineering a mental health AI coach ethically and safely. Just as a heads up, this this talk does contain some sensitive content. There will be mentions of suicide, self harm, and domestic violence. Please take care. We work at Sondermind and Sunderemind is a mental health care company. We match individuals with human therapists and psychiatrists all across the country. We believe that everyone who needs care should have access to care and we want that care to be of high quality. Sandermind has served over a million people across the country and we we partner with some of the biggest...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/O72p-rBb2bA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
