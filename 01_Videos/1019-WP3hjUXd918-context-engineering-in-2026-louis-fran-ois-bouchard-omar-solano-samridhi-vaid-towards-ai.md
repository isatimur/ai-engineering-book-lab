---
video_id: WP3hjUXd918
playlist_index: 1019
title: "Context Engineering in 2026 — Louis-François Bouchard, Omar Solano & Samridhi Vaid, Towards AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=WP3hjUXd918"
duration: "1:03:26"
duration_seconds: 3806
view_count: 4200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/WP3hjUXd918.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:05+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Towards AI find that for their AI tutor, keeping full chat history beats compaction and summarization on cost, latency, and recall, because of prompt-caching discounts."
---

# Context Engineering in 2026 — Louis-François Bouchard, Omar Solano & Samridhi Vaid, Towards AI

## Summary
Louis-François Bouchard, Omar Solano, and Samridhi Vaid (Towards AI) report results from ~$500-600 of evals (11 presets across single-turn and multi-turn tasks) on their production AI tutor, a LangChain "create_agent" React loop with hybrid (dense + BM25) retrieval over an 8M-token course corpus. Their central, counterintuitive finding: not touching context at all ("full history") beat sliding windows, summarization, selective retention, and prompt compression on cost, latency, and recall — their own production defaults (clear tool outputs past 5,000 tokens, summarize past 30,000) scored worse than doing nothing, and multi-turn fact recall dropped from strong marks to 38% under summarization. They confirmed this held on a cheaper model too: on DeepSeek V4 Flash, full history recalled specific details 95% of the time versus 32% after compaction, because prompt caching (up to 50x cheaper on DeepSeek) makes resending old tokens far cheaper than recomputing a freshly summarized context, and compaction breaks the cache since providers can't detect the content is unchanged. Scaling further, they saw no context-rot degradation on distinctive facts up to 800k tokens, but pure dense/semantic retrieval collapsed to 0% recall at 400k tokens on facts buried mid-context while BM25 held 100%, and a locally hosted model capped at a 32k context window (bumping model size from 7B to 32B doesn't extend context) forced them toward RAG, which hit 100% local retrieval accuracy versus 33% for raw local chat history. They also tested letting the agent browse a Claude-Code-generated wiki over the raw knowledge base via bash commands; it added no retrieval benefit and ran 50% slower than plain retrieval, so it stayed a nice-to-have. At projected scale (100k-1M turns/day), they estimate DeepSeek costs of roughly $18,000-$180,000/month, versus about $40,000/month on Gemini and $1,900/month on DeepSeek for 1,000 students, and shipped a production config of DeepSeek V4 Flash, hybrid retrieval, and full history kept until a 30k-token compaction threshold.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=WP3hjUXd918
- Duration: 1:03:26
- Playlist index: 1019
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right. Good afternoon everyone. Thank you for joining and not watching the game. Uh I hope it will be a bit more interesting or at least you will learn something compared to to uh hopefully Germany winning or some uh anyways. Yeah. All right. Is it fine? Okay. All right. So I'm here to talk about we are here to talk about context engineering in 2026. And more specifically, we are here because we've all lived that that situation where you try to do things with an agent and ultimately it does just exactly the thing that you don't want it to do. And it in my case it usually ends up like this where I'm super mad and I just type back hoping it it learns. And uh usually the problem here is...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/WP3hjUXd918.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/towardsai/ai-tutor-app>
