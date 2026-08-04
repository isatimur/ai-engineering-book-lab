---
video_id: "mQ7_Zje7WKE"
playlist_index: 137
title: "The 2025 AI Engineering Report — Barr Yaron, Amplify"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=mQ7_Zje7WKE"
duration: "12:33"
duration_seconds: 753
view_count: 7940
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/mQ7_Zje7WKE.txt"
themes:
  - "RAG & Retrieval"
  - "Models & Inference"
ingested_at: "2026-04-24T11:25:13+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Barr Yaron (Amplify) presents the 2025 AI Engineering survey (n=500): RAG leads at 70%, fine-tuning is more common than expected, agents lag plain LLM use, and evaluation is the top pain point."
---
# The 2025 AI Engineering Report — Barr Yaron, Amplify

## Summary
Barr Yaron, an investment partner at Amplify, presents early results from Amplify's 2025 State of AI Engineering survey of 500 respondents. Beyond few-shot prompting, RAG is the dominant customization method (70% of respondents), but fine-tuning turned out to be far more widespread than expected — 40% of fine-tuners cite LoRA/QLoRA, with DPO, reinforcement fine-tuning, and plain supervised fine-tuning also common, driven mostly by researchers and research engineers. Teams update models monthly or more often (50%+, 17% weekly) and update prompts even faster (70% monthly, 10% daily), yet 31% still have no system for managing prompts at all. Agents — defined in the survey as systems where an LLM controls the core decision-making or workflow — lag plain LLM usage badly: 80% say LLMs work well at their job versus under 20% for agents, though most production agents already have write access and some act independently with a human in the loop. On infrastructure and process, 65% use a dedicated vector database (35% self-hosted, 30% third-party), 60% rely on standard observability tooling, and evaluation is named the single most painful part of AI engineering today.

## Why it matters
- A rare quantified snapshot (500 respondents) of what practitioners actually do — RAG at 70% adoption, LoRA/QLoRA at 40% of fine-tuners, 65% on dedicated vector databases — that grounds claims elsewhere in the book with real adoption numbers instead of anecdote.
- Surfaces the gap between hype and production reality: agents are widely planned but only used well by under 20% of respondents versus 80% for plain LLMs, and evaluation is named the top pain point despite heavy investment in monitoring and offline eval.
- Documents operational churn (50%+ updating models monthly, 70% updating prompts monthly, 31% with no prompt management at all) that is direct evidence for a chapter on the maintenance burden of shipped AI systems.

## Metadata
- Video: https://www.youtube.com/watch?v=mQ7_Zje7WKE
- Duration: 12:33
- Playlist index: 137
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Models & Inference]]

## Transcript excerpt
> [Music] [Applause] All right. Hi everyone. Uh, thank you for having me here and huge thanks to Ben, to Swix, to all the organizers who've put so much time and heart into bringing this community together. Yeah. All right. So, we're here because we care about AI engineering and where this field is headed. So, to better understand the current landscape, we launched the 2025 state of AI engineering survey. And I'm excited to share some early findings with you today. All right, before we dive into the results, the least interesting slide. Uh I don't know everyone in this audience, but I'm bar. I'm an investment partner at Amplify, where I'm lucky to invest in technical founders, including...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/mQ7_Zje7WKE.txt]]
- Description cue: Come hear the results of the 2025 State of AI Engineering:

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Models & Inference**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://www.amplifypartners.com/blog-posts/the-2025-ai-engineering-report>
