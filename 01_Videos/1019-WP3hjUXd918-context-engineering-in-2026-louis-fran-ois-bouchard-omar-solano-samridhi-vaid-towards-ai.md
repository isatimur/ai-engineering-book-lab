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
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:05+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Louis-François Bouchard, Omar Solano and Samridhi Vaid of Towards AI test context-management strategies on their open-source AI tutor and find that the default advice is wrong for them: not touching the context at all beat sliding windows, summarization, selective retention and prompt compression on cost, latency and recall. Prompt caching (up to 50x cheaper on DeepSeek) makes resending old tokens cheap, while compaction breaks the cache. Full history recalled details 95% of the time versus 32% after summarization. Their rule: do not compact by default; name the constraint first, such as a 32k local context window."
---

# Context Engineering in 2026 — Louis-François Bouchard, Omar Solano & Samridhi Vaid, Towards AI

## Summary
Louis-François Bouchard, Omar Solano and Samridhi Vaid of Towards AI run courses for AI engineers, with an AI tutor that answers student questions from their lessons. In this workshop they test which context-management techniques actually help that tutor. Their headline finding contradicts their own defaults: leaving the context untouched beat every compaction strategy they tried.

**The toolbox (Bouchard)**
Context management has three tiers. Cheap, non-LLM moves: truncate outlier tool outputs to head and tail, use a sliding window, clear old tool results. LLM-based moves: selective retention, rolling summarization, a full reset with a summary when the window fills, and delta summarization for sub-agents. Offloading: memory files, RAG, and an LLM-wiki index of about 450 tokens that points to chunks and raw files. Graph RAG tied with plain RAG on their data and cost more to set up. The catch is prompt caching: cached tokens can be up to 50x cheaper on DeepSeek, but any rewrite of the context breaks the cache. Compaction only pays if it compresses the context by more than the cache discount, so "summarization is potentially a trap". He also urges logging everything: cache-hit rate, time to first token and user frustration.

**The system and the evals (Solano)**
The tutor is a single ReAct-style agent built with LangChain's create agent method and middleware. Its main tool is hybrid search (dense embeddings plus BM25, top 30, reranked to top 5, capped at 100,000 tokens) over a corpus of more than 8 million tokens. A second tool lets the agent browse the knowledge base with read-only bash: raw files, generated titles and a Claude Code-built wiki, with an 8-second command limit, 40,000-character output cap and 20 commands per turn. It gave the same recall and ran 50% slower, so it added nothing. The evals used 60 real student Q&A pairs scraped from their forum, plus synthetic multi-turn sessions that plant a fact, add filler and probe recall. Grading mixed code checks with an LLM judge run on a coding-agent subscription. Eleven presets cost over $500. Their untested production default (clear tool outputs after 5,000 tokens, summarize after 30,000) dropped to 38% multi-turn recall. Full history was cheaper, faster and better, because clearing tool outputs forced the agent to re-retrieve what it already had.

**Extended experiments (Vaid)**
- On DeepSeek V4 Flash, full history recalled specific details 95% of the time versus 32% after summarizing. In a 36-turn, 1.78-million-token run, the preset that sent the most tokens was the cheapest, because 97% were cached.
- No context rot on distinctive facts up to 800k tokens. Ambiguous facts scored about half as well.
- Locally on a MacBook, the context capped at 32k. Moving from a 7B or 8B model to 32B did not extend it. Local chat recall fell to 33%, but local RAG over pasted documents hit 100%. Overstuffing the window took about 340 seconds and returned a single token.
- Dense retrieval held about 80% up to 200k tokens but fell to 0% at 400k for facts buried mid-context. BM25 stayed at 100%.
- At 1,000 students, Gemini would cost about $40,000 a month versus about $1,900 on DeepSeek.

They shipped DeepSeek V4 Flash with hybrid retrieval and full history, compacting only past 30k tokens.

## Why it matters
- Hard evidence that compaction can hurt on cost, latency and recall at once once prompt caching is in play, which challenges a common default.
- Gives a usable break-even rule: compaction pays only if it compresses by more than the provider's cache discount.
- Shows a failure mode of aggressive tool-output clearing: the agent re-fetches what it already had, and that costs more.
- The dense-versus-BM25 result at 400k tokens is a concrete argument for hybrid retrieval over pure semantic search.
- The eval design (real forum Q&A, planted-fact multi-turn probes, a gate that checks the strategy actually fired) is a reusable template for testing context strategies.

## Metadata
- Video: https://www.youtube.com/watch?v=WP3hjUXd918
- Duration: 1:03:26
- Playlist index: 1019
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right. Good afternoon everyone. Thank you for joining and not watching the game. Uh I hope it will be a bit more interesting or at least you will learn something compared to to uh hopefully Germany winning or some uh anyways. Yeah. All right. Is it fine? Okay. All right. So I'm here to talk about we are here to talk about context engineering in 2026. And more specifically, we are here because we've all lived that that situation where you try to do things with an agent and ultimately it does just exactly the thing that you don't want it to do. And it in my case it usually ends up like this where I'm super mad and I just type back hoping it it learns. And uh usually the problem here is...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/WP3hjUXd918.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/towardsai/ai-tutor-app>
