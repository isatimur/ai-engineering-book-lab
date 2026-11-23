---
video_id: "wJwTlvb_TSo"
playlist_index: 439
title: "WTF do people use Open Models for??"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=wJwTlvb_TSo"
duration: "28:01"
duration_seconds: 1681
view_count: 2426
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/wJwTlvb_TSo.txt"
themes:
  - "Evals & Reliability"
  - "Models & Inference"
ingested_at: "2026-04-24T12:18:26+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Eugene Cheah, CEO of Featherless.ai and co-lead of the RWKV project, uses Featherless data (flat-priced access to over 3,700 open models) and customer interviews to show what open models are used for: creative writing, role play and companionship (30-40% of traffic, over 60% women users), coding agents (20-30%, growing fast), chat clones (about 20%), agents and work (10-20%) and graph workflow tools (about 5%). Production users stick with old models for quarters or years because stability beats upgrades. His agent advice: build human escape hatches from day one, automate the reliable 80-90% first, then iterate, because fully reliable autonomous agents do not exist."
---
# WTF do people use Open Models for??

## Summary
Eugene Cheah is CEO of Featherless.ai and co-lead of the RWKV open source project. Featherless gives unlimited API requests to over 3,700 open models for a flat $25 a month for individuals, with no per-token billing and one large-model request at a time. That pricing, plus metadata from requesting apps, customer interviews and notes swapped with OpenRouter, lets him answer the title question. Featherless does no text logging.

**Scale of the open ecosystem**
More than 50,000 models are uploaded to Hugging Face each month, over one a minute. DeepSeek R1, a 685 GB model, had over 4 million downloads in a month.

**Model choice and staying power**
With no price difference, individuals pick models on vibes and fame, not benchmark scores. DeepSeek R1 leads, followed by the Llama family and others, which fine-tunes then fragment into many personalities. The surprise is in commercial traffic: an eight-month-old small Nemo model dominates. Small models are cheaper at scale, it had permissive licensing without the Llama license terms that worried enterprise lawyers, and cloud platforms pushed it with hundreds of tutorials. Once a team prompts a system to 99%+ accuracy with metrics in place, it does not want the model to change: "if it end broke don't fix it". A Llama 2 guard model is still about 2% of workload because safety tutorials never updated.

**Usage by segment**
- *Creative writing, role play, companionship, some therapy*: 30-40% of all traffic and the most active users, in the tens of millions with closed apps included. Over 60% of companion users are women, mirroring romance novels. Here "no one cares about MML". Users want a slow burn, not a model rushing to answer, and community fine-tunes rotate weekly.
- *Coding*: grew from under 5% to 20-30% since the R1 wave. He calls autocomplete "essentially solved" by 3B-12B models. The fight moved to near-autonomous agents with humans in the loop, or vibe coding, which can generate a thousand times the tokens of a companion chat. A closed Sonnet model still leads by over 10 to 1. He recommends an open-source agentic extension paired with Continue for autocomplete.
- *Graph workflow UIs from image diffusion*: about 5%. Reporters, lawyers and musicians chain text workflows.
- *Chat clones*: about 20%. Featherless has its own, called Phoenix.
- *Agents and work*: 10-20%.

**Agents: escape hatches over full autonomy**
For insurance claims and logistics clients, the pattern is an agent that drafts email replies after checking inventory and rules, inside a UI where a human edits and sends. At launch the AI drafts about 80-90% successfully. As confidence grows, teams classify known reliable cases and fully automate them. Teams that went straight to 100% automation got burned by an angry customer, which can delay AI adoption by a year. His view of fully reliable autonomous agents: "just don't it does not exist". Like reliability engineering, fix 80-90% of cases, then 80-90% of the remaining failures, and repeat. That only works if you do not change the model every week.

**Closing pitch**
A 72B linear transformer and attention hybrid from his team, which it says runs at under half the GPU compute of comparable transformers and cost about $100,000 to build.

## Why it matters
- Gives rare usage data on open models by segment, showing that companionship and creative writing, not enterprise agents, carry the largest share of non-coding traffic.
- Shows model stickiness in production: teams keep old models for quarters or years once prompts and metrics are stable, so model churn is a cost, not a free upgrade.
- The escape-hatch pattern (AI drafts, human sends, automate proven cases later) is a concrete rollout path for enterprise agents.
- The repeated 80-90% reliability loop reframes agent reliability as incremental engineering, not a model capability jump.

## Metadata
- Video: https://www.youtube.com/watch?v=wJwTlvb_TSo
- Duration: 28:01
- Playlist index: 439
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[Models & Inference]]

## Transcript excerpt
> there is no mod the open model Warriors Are Climbing at the gates scaling The Benchmark and more importantly the hearts of their users in the past CH months more than 50,000 AI models have been uploaded to Hing phase per month and is accelera that is more than one AI model a minute meaning by the end of this talk today that's another 500 models alone however not all models are equal the whe that crash into the room is DC R1 the first open source model to catch up and surpass GPD 4 proving that you do not need a billion dollars to compete with the big laps just a little smart and Prudence to catch up with over 4 million downloads of a 685 GB model on huging face this past month alone this...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/wJwTlvb_TSo.txt]]
- Description cue: from Eugene Cheah, CEO, Featherless.ai

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Models & Inference**.
