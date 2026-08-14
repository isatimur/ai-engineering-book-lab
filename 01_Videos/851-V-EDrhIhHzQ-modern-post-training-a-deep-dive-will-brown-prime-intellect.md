---
video_id: V-EDrhIhHzQ
playlist_index: 851
title: "Modern Post-Training: A Deep Dive  — Will Brown, Prime Intellect"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=V-EDrhIhHzQ"
duration: "46:52"
duration_seconds: 2812
view_count: 7400
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/V-EDrhIhHzQ.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Will Brown (Prime Intellect) details the Verifiers V1 environment redesign (task/harness/runtime) and async Prime RL training at GLM-5 scale (28 nodes, <5min/step, ~$50K per 1,000-step run)."
---

# Modern Post-Training: A Deep Dive  — Will Brown, Prime Intellect

## Summary
Will Brown, who leads applied research at Prime Intellect, walks through the V1 rewrite of the open-source Verifiers library, which decomposes RL/eval environments into a task set (data and scoring rules), a harness (the agent loop — a basic tool loop, or a CLI agent like Codex/Claude Code/Open Code, or something built with LangChain/DSPy), and a runtime (local, Docker, or Prime's own sandbox layer). He describes an "interception server" pattern that hands each harness rollout a fake OpenAI/Anthropic-compatible endpoint so the same harness code runs unmodified across eval, RL, SFT-data-collection, and on-policy/self-distillation settings, plus a standalone "renderers" library (following OpenAI's harmony and Thinking Machines' Tinker) for managing the token/message duality that chat-template bugs routinely corrupt. Prime RL, the async-first training framework built on Torch Titan, trains models like GLM-5 and Kimi K2.5/2.6 at scale — Brown cites a GLM-5 step across 28 nodes in under 5 minutes with 131K context, letting a 1,000-step run finish in about 3 days for roughly $50K in rental cost, with rollouts running ~16 steps off-policy on average. Prime Intellect also operates a 10,000+ GPU marketplace and a hosted training platform, with multi-tenant LoRA training live today and full fine-tuning due within weeks.

## Why it matters
- Unifying evals, RL, SFT data collection, and distillation under one composable "environment" (task set + harness + runtime) abstraction is a concrete architectural pattern for a chapter on agent training infrastructure.
- The interception-server and renderers patterns are specific engineering fixes for two recurring agent-RL pain points — keeping harness code training-agnostic, and preventing tokenizer/chat-template mismatches — worth citing as solved problems rather than open ones.
- Real cost and scale figures (28 nodes, <5 min/step, ~$50K per 1,000-step run, <10-person core team) ground claims about large-scale RL post-training becoming economically viable outside frontier labs.

## Metadata
- Video: https://www.youtube.com/watch?v=V-EDrhIhHzQ
- Duration: 46:52
- Playlist index: 851
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hey guys, how's it going? Thanks for showing up. This was a little bit of a last-minute assembly. I know a few days ago I was like talking to Swix. I was like, "Hey, can I still do a workshop?" And he was like, "We have one slot left. It's Monday at 4:30." And I was like, "I'll take it." Um and uh then yeah, um I wanted to kind of just do a bit of an update on uh some of the stuff we've been building at Primed and Loaded. So, if you don't uh know me, hi. I'm Will Brown. I lead applied research at Primed and Loaded. Uh we do a lot of stuff around uh every part of the kind of AI research infrastructure stack. Uh today is going to be about post-training, which is where I spend a lot of my time...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/V-EDrhIhHzQ.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
