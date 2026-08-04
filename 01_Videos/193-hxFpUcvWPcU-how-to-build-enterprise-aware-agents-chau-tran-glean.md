---
video_id: "hxFpUcvWPcU"
playlist_index: 193
title: "How to build Enterprise Aware Agents - Chau Tran, Glean"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=hxFpUcvWPcU"
duration: "19:53"
duration_seconds: 1193
view_count: 10541
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/hxFpUcvWPcU.txt"
themes:
  - "Agent Architecture"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T11:43:19+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Glean's Chau Tran reframes workflows-vs-agents as agents generating workflows, proposing golden-workflow libraries for agent eval/training and authoritativeness signals for workflow retrieval."
---
# How to build Enterprise Aware Agents - Chau Tran, Glean

## Summary
Chau Tran (Glean) reframes the workflows-vs-agents debate: a workflow is imperative code or a declarative graph giving predictability and low cost, while an agent dynamically plans and executes its own steps at higher cost and latency — but the trace of any successful agent run is itself a workflow, so agents can be thought of as "task in, workflow out." He proposes collecting a library of "golden workflows" (task-to-steps records) to evaluate agents on whether they took the right steps, not just whether the final answer looks right, and to train agents via either supervised fine-tuning/RLHF or dynamic prompting that retrieves similar past workflows as in-context examples. He argues fine-tuning suits generalized, stable behaviors (like custom hardware) while dynamic prompting with search suits personalized, fast-changing requirements (like software), and that agents in turn can generate and refine workflows for workflow-building platforms (how Glean's own agent-to-workflow feature works) and act as a "workflow discovery engine" that captures new successful task executions as reusable workflows over time. On workflow search itself, he says pure textual similarity (hybrid lexical/vector/reranking) is insufficient in enterprise settings because many similar-looking workflows compete, so retrieval also needs "authoritativeness" signals from a knowledge graph — who created a workflow, their track record, whether it's referenced on Slack, etc.

## Why it matters
- Gives a concrete, testable resolution to the workflows-vs-agents framing debate (agent execution trace = workflow) that a book chapter on agent architecture can use directly.
- Golden-workflow libraries as an evaluation method — grading agents on intermediate steps against a company's own recorded task-to-workflow data, not just end output — is a reusable eval pattern distinct from LLM-as-judge approaches covered elsewhere.
- The fine-tuning-vs-dynamic-prompting tradeoff (generalizable/stable vs. personalized/fast-changing) and the "authoritativeness" gap in workflow/document retrieval are specific, transferable engineering claims grounded in Glean's production experience.

## Metadata
- Video: https://www.youtube.com/watch?v=hxFpUcvWPcU
- Duration: 19:53
- Playlist index: 193
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] Thanks Alex for the introduction. That was a very impressive LLM generated summary of me. Uh I've never heard it before but uh nice. Um so um today I'm going to talk to you about something that has been keeping me up at night. Uh probably some of you too. So how to build enterprise aware agents. How to bring the brilliance of AI into the messy complex realities of uh how your business operated. So let's jump straight to the hottest question of the month for AI builders. Uh should I build workflows or should I build agents? So what are workflows? Workflows are system where LLMs and tools are orchestrated through predefined code paths. So there are two main ways where you can um...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/hxFpUcvWPcU.txt]]
- Description cue: While LLMs demonstrated impressive reasoning capabilities, their out-of-the-box reasoning is akin to hiring a brilliant but brand-new employee who doesn’t have the enterprise context of “how...

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **RAG & Retrieval**.
