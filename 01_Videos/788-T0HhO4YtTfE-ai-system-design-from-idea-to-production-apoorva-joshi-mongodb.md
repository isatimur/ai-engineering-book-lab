---
video_id: T0HhO4YtTfE
playlist_index: 788
title: "AI System Design: From Idea to Production - Apoorva Joshi, MongoDB"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=T0HhO4YtTfE"
duration: "28:53"
duration_seconds: 1733
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/T0HhO4YtTfE.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-28T23:47:31+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Apoorva Joshi, a data scientist turned developer advocate at MongoDB, argues that in the vibe-coding era the spec is the hard part, not the code. She gives a four-phase framework (product requirements, system design, evaluation and monitoring, optimization) and applies it end to end to a hypothetical health insurance claims review system: a solution-agnostic business problem with baselines, SMART success metrics, a data strategy keyed to update frequency, a control-flow RAG design with human review for denials, guardrail and faithfulness metrics, reviewer override rate in production, and structured outputs for reliability."
---

# AI System Design: From Idea to Production - Apoorva Joshi, MongoDB

## Summary
Apoorva Joshi is a data scientist turned developer advocate at MongoDB who spent the first part of her career building ML for cybersecurity. Her thesis: vibe coding works when stakes are low and you can eyeball the output, but for anything people depend on, "just ship it" is dangerous. She cites the line "Specs are the new code" from AI lab talks, then gives a repeatable four-phase framework and runs one worked example through every phase: a claims review assistant for a fictional insurer, MDB Health.

**Phase 1: product requirements**
- State the business problem so it is user-specific, measurable and solution-agnostic. Her example: medical reviewers take an average of 2 days per claim review, four times the industry standard for non-urgent cases and 12 times for urgent ones. The statement does not say "agent".
- Gather constraints early: patient data stays in the approved cloud, only models on that cloud, complex cases need a senior physician, and every denial needs a human reviewer. Add performance limits such as latency, monthly inference spend and uptime SLAs.
- Classify the role of AI on three axes: critical or complementary (complementary here), reactive or proactive (reactive, triggered by a claim), and level of autonomy (semi-autonomous at most).
- Set one or two SMART success metrics: cut urgent claim processing from 2 days to 1 hour within 90 days of launch.

**Phase 2: system design**
- Data strategy per source: clinical guidelines and coverage policies as PDFs in Confluence, claims history in MongoDB. Match pipeline cadence to update frequency: guidelines yearly, policies quarterly, claims hourly to support the 1-hour target.
- Retrieval per source: vector search with metadata pre-filtering, or hybrid search, because diagnosis and procedure codes slip past pure vector search. Claims history uses an exact match on patient ID after removing PII.
- Start with the simplest design, evaluate it, and iterate. She warns that jumping to an agent, or letting a coding agent pick the architecture, gives an over-engineered system. Her pick is RAG plus a control-flow workflow plus human in the loop, with LLM-as-router as a possible later step.
- Design the UX and feedback loop: citations explain each verdict, and reviewers override verdicts with a reason and flag irrelevant citations.

**Phase 3: evaluation and monitoring**
Guardrails on input (reject 'write me a poem') and output (a verdict without citations is invalid). Metrics: claim rejection rate, missing citation rate, faithfulness, claim processing time as the North Star, and cost per recommendation. In production, add implicit signals: how often humans override the AI verdict, and how long reviewers take to read a recommendation, which can point to verbose or confusing output.

**Phase 4: optimization**
Accuracy comes down to what enters the context window: prompt engineering, reranking, and memory. For cost and latency: semantic caching on similar past claims and batch processing. For reliability: structured outputs, so every response carries both decision and citations.

## Why it matters
- It names the spec, not the code, as the hard part of building with AI, and shows what a good spec looks like in concrete sentences and numbers.
- The worked example links each design choice back to a requirement: the 1-hour target sets the hourly claims pipeline, and the denial rule sets the human-in-the-loop step.
- Her rule to design the simplest system, evaluate it, and iterate is a direct counter to over-building agents, with a mapping from workflow shape to pattern (RAG, control flow, router, human in the loop, fine-tuning).
- The metric set separates guardrail compliance, response quality, domain metrics and system health, and adds human override rate as a production signal that needs no labels.
- The example is hypothetical, so it supports a chapter on method, not on measured results.

## Metadata
- Video: https://www.youtube.com/watch?v=T0HhO4YtTfE
- Duration: 28:53
- Playlist index: 788
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hi everyone. I'm Apurva and I'm a data scientist turned developer advocate currently at MongoDB. I spent the first of my career building machine learning applications for various cybersecurity use cases and I now use that applied machine learning knowledge to help AI builders successfully build AI applications with MongoDB and Voyage AI. In this talk you'll learn how to think through building AI systems end-to-end from idea to production. We'll take a real-world use case and walk through all the steps of designing it and hopefully in the end you'll walk away with a repeatable framework that you can apply to any AI system you design. Now, you might be thinking in the age of AI do we even...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/T0HhO4YtTfE.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
