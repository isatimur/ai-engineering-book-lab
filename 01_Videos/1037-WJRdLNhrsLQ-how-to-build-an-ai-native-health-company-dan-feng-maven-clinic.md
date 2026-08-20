---
video_id: WJRdLNhrsLQ
playlist_index: 1037
title: "How to build an AI-Native Health Company — Dan Feng, Maven Clinic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=WJRdLNhrsLQ"
duration: "17:19"
duration_seconds: 1039
view_count: 799
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/WJRdLNhrsLQ.txt"
themes:
  - "Org Design & Leadership"
ingested_at: 2026-08-20T22:28:41+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dan Feng (Maven Clinic) describes shifting to 2-4 week sprint planning, engineers doing implementation directly with AI, and multi-model cross-checks for high-stakes tasks."
---

# How to build an AI-Native Health Company — Dan Feng, Maven Clinic

## Summary
Dan Feng describes Maven Clinic's (a digital health platform for women's health: maternity, fertility, parenting, menopause) two-year transition to "AI native," anchored by an internal orchestration layer called Maven Intelligence and a three-part framework: internal AI tool adoption, AI built into the product (a 24/7 chatbot as a cheaper substitute for human agents), and changing culture/process. Planning shifted from multi-week requirement docs to 2-4 week sprints with short one-to-two-page PRDs, since long mid-term (3-6 month) plans no longer hold as model capability shifts; senior engineers stopped delegating implementation to other engineers because AI lets them build directly, and hiring/performance reviews now weight genuine AI engagement and blurred PM-engineer boundaries. Their coding-tool rollout started with low-risk tasks (unit tests, documentation) to build internal rules and skills before mandating AI tools for all implementation, and code review was restructured around self-identified low-risk PRs, a 500-line PR cap, and stacked PRs, explicitly to avoid "rubber stamp" approvals as engineers began shipping thousands of lines a day. On reliability, Feng frames failure tolerance as task-dependent: an appointment-scheduling failure rate of roughly 1 in 1,000 is acceptable, but reimbursement-amount errors are not, so high-stakes flows like receipt processing require multiple models to independently agree before proceeding (escalating to a human otherwise); integration tests must hit a consistent ~90% pass rate across repeated runs (since LLM output varies), and post-launch an automated rubric-scoring system plus a dedicated human review team spot-check conversations, scaling up to roughly 20% review coverage right after a new feature ships.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=WJRdLNhrsLQ
- Duration: 17:19
- Playlist index: 1037
- Transcript status: `unavailable`

## Theme hooks
- [[Org Design & Leadership]]


## Transcript excerpt
> Transcript unavailable.

## Transcript notes
- Transcript not available during ingestion.

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
