---
video_id: "pPvoLjYj_mY"
playlist_index: 406
title: "Evaluating Domain Specific LLMs for Real World Finance — Waseem Alshikh, Writer"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=pPvoLjYj_mY"
duration: "12:01"
duration_seconds: 721
view_count: 9519
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/pPvoLjYj_mY.txt"
themes:
  - "Org Design & Leadership"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:17:01+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Writer's finance benchmark found reasoning models keep answering under bad context but hallucinate, with even the best model's grounding-plus-answer score capped near 81%."
---
# Evaluating Domain Specific LLMs for Real World Finance — Waseem Alshikh, Writer

## Summary
Waseem Alshikh (Writer) built a benchmark called FAIL to test whether financial-services domain-specific LLMs are still worth building now that general models score near 90% accuracy on standard benchmarks. The eval splits failures into query failures (misspelled, incomplete, or out-of-domain questions) and context failures (missing context, OCR errors from converting physical documents, or irrelevant/wrong context), then scores models separately on whether they answer at all versus whether the answer stays grounded in the supplied context. On financial tasks the two diverge sharply: reasoning/thinking models almost never refuse to answer, but when given wrong or irrelevant context they hallucinate instead of flagging the mismatch, scoring 50-70% worse on grounding than on raw answer rate. Even the best model's combined robustness-plus-grounding score tops out around 81%, meaning roughly one in five financial queries gets a confidently wrong answer, which Alshikh uses to argue general models alone aren't sufficient and that reliable deployment still needs domain-specific models plus a full RAG/guardrail stack. He notes Writer sees a similar pattern in an equivalent medical benchmark, which suggests the grounding-failure finding itself is not unique to finance.

## Why it matters
- The eval categories (misspelling, incomplete/out-of-domain queries; missing-context, OCR-error, irrelevant-context) are presented as a finance benchmark, but the speaker says a medical version shows the same pattern — the grounding-failure finding looks domain-agnostic rather than finance-specific.
- No named financial regulation, audit trail, or human escalation step appears in the talk; finance functions here as the benchmark's subject matter rather than a source of distinct constraints.
- Transcript-grounded figure worth keeping: even the top model's combined grounding-plus-answer score was about 81%, i.e., roughly one in five answers wrong under imperfect context — used to argue for domain-specific models and guardrail infrastructure, not for a finance-specific control.

## Metadata
- Video: https://www.youtube.com/watch?v=pPvoLjYj_mY
- Duration: 12:01
- Playlist index: 406
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] hello everyone my name is Wasim I'm one of the co-founder and CTO ater today I'm going to just tell you a quick story about actually what we building a trer what we doing but before we dive in I would love just to give you quick history of writer so writers we start the company in 2020 we love to say the story of writer is the story of the Transformer we started building those decoder encoder model in the early days and we start we kept building those model and build a lot of them today we have a family of models I believe around 16 we published we have another 20 coming in the way and we keep building those models and you're going to see from this list those model com in two...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/pPvoLjYj_mY.txt]]
- Description cue: In today's rapidly evolving financial landscape, AI applications and agents are transforming high-value workflows, like risk assessment, fraud detection, and customer service. As financial...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **RAG & Retrieval**.
