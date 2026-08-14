---
video_id: q2JrUKBMf0w
playlist_index: 930
title: "The Future of Evals: From LLM as a Judge to Agent as a Judge — Aparna Dhinakaran, Arize AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=q2JrUKBMf0w"
duration: "6:06"
duration_seconds: 366
view_count: 1600
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/q2JrUKBMf0w.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
  - "MCP & Tooling"
ingested_at: 2026-07-26T22:22:24+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Arize's Aparna Dhinakaran argues fixed-rubric LLM-as-judge evals miss dynamic agent failures, and previews Signal, a long-running agent-as-judge that reads traces and files fix PRs."
---

# The Future of Evals: From LLM as a Judge to Agent as a Judge — Aparna Dhinakaran, Arize AI

## Summary
Aparna Dhinakaran, a founder of Arize, cites scale numbers from Arize's customer base — over 100 million evals run per month, an average of 12 eval jobs per team, and top teams running more than 3,800 distinct evaluators — to argue that what teams need to evaluate changed faster than eval tooling did: from single-prompt answers in 2023, to tool calls and reasoning in 2024, to today's long-horizon, sub-agent-spawning loops on real-world data. She uses Arize's own product agent, Alex, as an example: as it gained longer memory, dynamic UI generation, and the ability to search across large trace volumes, it also started forgetting context and getting stuck in loops — failure modes she says classical LLM-as-judge evals with fixed rubrics can't catch because each agent trajectory is different. Her proposed fix is "agent as a judge": Arize's newly released Signal is a long-running agent that reads incoming traces, discovers failure patterns such as repeated calls to the same tool or inefficient trajectories, and can open a pull request with a fix. She frames this as additive, not a replacement — most teams still need deterministic evals and LLM-as-judge, with agent-as-judge as a third layer for dynamic, non-deterministic agent behavior.

## Why it matters
- Names a concrete failure mode LLM-as-judge structurally can't catch (fixed rubric vs. every-trajectory-different agents), a sharp argument for a chapter on eval methodology limits.
- The Signal example — an agent that reads traces, finds patterns like tool-call loops, and files a fix PR — is a specific instance of "evals feeding a continual-improvement loop," a recurring theme candidate.
- Concrete adoption numbers (100M+ evals/month, 3,800+ evaluators at top teams) are citable evidence for how central evals have become to production AI teams.

## Metadata
- Video: https://www.youtube.com/watch?v=q2JrUKBMf0w
- Duration: 6:06
- Playlist index: 930
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> Awesome. Well, hey everyone. My name is Aparna, one of the founders of Arize. We work with some amazing teams to help them build evals. Um, and we have an incredible lineup of talks for you all today at the evals track. Um, it's happening in room 2005 and there's going to be amazing speakers from Term Bench and Uber and Snorkel kind of all happening after this. Um, but today I'm here to talk to you about the future of evals. Evals have gone from the new skill that every PM and every AI engineer has to learn to the thing that every serious AI team is betting on. We've been really fortunate to get to work with some of the best AI teams in the world. So, we get a front row seat into...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/q2JrUKBMf0w.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **MCP & Tooling**.
