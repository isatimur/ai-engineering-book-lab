---
video_id: uiP88SpCi1Q
playlist_index: 791
title: "Your Agent Is Wasting Tokens and You Don't Know It - Erik Hanchett, AWS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=uiP88SpCi1Q"
duration: "5:55"
duration_seconds: 355
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/uiP88SpCi1Q.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-28T23:47:35+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Erik Hanchett of AWS shares five token-saving techniques for agents in Strands Agents: prompt caching, difficulty-based model routing, tool-result offloading, capped tool loops, and sliding-window history trimming."
---

# Your Agent Is Wasting Tokens and You Don't Know It - Erik Hanchett, AWS

## Summary
Erik Hanchett (AWS senior developer advocate) gives a lightning talk with five concrete techniques for cutting agent token costs, demoed with AWS's Strands Agents SDK (portable across model providers). First, cache the system prompt (`cache_prompt=default`) and optionally tool prompts/messages, so only the first call sends the full prompt and subsequent calls send a reduced version. Second, route requests by task difficulty — e.g., Claude Haiku for simple tasks, Claude Sonnet for harder ones, chosen via an if-statement or even a cheap model that decides the routing — rather than using one expensive model for everything. Third, offload large tool results to local or cloud storage and summarize them instead of re-injecting the full result into context on every agent loop iteration (Strands has APIs for this). Fourth, cap tool-call loops with a max-iterations setting to prevent runaway/infinite looping, and use observability tools before deployment to check how long and how often each tool call runs. Fifth, trim conversation history using Strands' "sliding window conversation manager" (default keeps the last 10 messages), trading off loss of earlier history, which can be mitigated by summarizing the dropped history back into the context.

## Why it matters
- Gives specific, implementable cost-reduction techniques (prompt caching, model routing by difficulty, tool-result offloading/summarization, capped tool loops, sliding-window history trimming) grounded in a real SDK (Strands Agents) rather than generic advice.
- Names concrete model choices (Claude Haiku vs. Sonnet) for difficulty-based routing, useful as a case study for cost/performance tradeoff discussions in agent design.
- Surfaces a common failure mode (uncapped tool-call loops burning tokens) and the observability practice (checking tool call duration/count pre-deployment) used to catch it.

## Metadata
- Video: https://www.youtube.com/watch?v=uiP88SpCi1Q
- Duration: 5:55
- Playlist index: 791
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hey everyone, my name is Eric Hanchett. I am a senior developer advocate at AWS and I'm going to talk to you about how you can save on token costs. Now, I'm going to show you five ways that you can reduce your token costs while using and creating agents. So, the first way you can do that is to cache your system prompt. Let me show you some code. Now, I'm using AWS's Strands agents. This works with all different providers. This is a little bit of pseudo code, but the idea is that you can add cache prompt equals default. And what that'll do is on the first call of your agent, it will send the full system prompt over and then on every subsequent call, it will have a much reduced system prompt...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/uiP88SpCi1Q.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
