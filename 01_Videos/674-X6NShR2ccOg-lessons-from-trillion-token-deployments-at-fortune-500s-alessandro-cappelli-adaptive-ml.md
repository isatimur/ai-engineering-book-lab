---
video_id: X6NShR2ccOg
playlist_index: 674
title: "Lessons from Trillion Token Deployments at Fortune 500s — Alessandro Cappelli, Adaptive ML"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=X6NShR2ccOg"
duration: "18:35"
duration_seconds: 1115
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/X6NShR2ccOg.txt"
themes:
  - "Models & Inference"
  - "Org Design & Leadership"
ingested_at: 2026-05-19T11:03:51+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Alessandro Cappelli, co-founder and CCO of Adaptive ML, argues that 95% of GenAI pilots fail to reach production not because the MVP is hard but because companies misidentify getting to MVP as the finish line — what he calls 'the myth of the last mile.' His claim: neither prompt engineering nor instruction fine-tuning can systematically incorporate ongoing production feedback; only reinforcement learning can, because RL is designed to integrate reward signals continuously. Adaptive ML builds an RL Ops platform used by AT&T, Manulife, and CCS (medical supply). The concrete numbers: AT&T spends millions just summarizing call-center transcripts; RL-trained smaller models cut both latency (sub-333ms required for speech-to-speech customer support) and cost at scale. The contrarian edge: RL's main downside is operational complexity — running PPO requires orchestrating four models simultaneously — which is the problem Adaptive's platform is designed to absorb."
---

# Lessons from Trillion Token Deployments at Fortune 500s — Alessandro Cappelli, Adaptive ML

## Summary

Alessandro Cappelli, co-founder and chief customer officer at Adaptive ML, opens with a blunt statistic: 95% of GenAI pilots fail to reach production. His diagnosis is not technical — it's a framing failure he calls "the myth of the last mile."

### The myth of the last mile

The common assumption is that getting to a demo that impresses stakeholders is the hard part, after which productionization is merely "the last mile." Cappelli argues the inverse: the MVP is just the first mile. The real marathon is getting from MVP to production and then continuously improving the system as the real world introduces defects that your pre-production evaluation never covered.

The core problem is that neither of the two most common approaches can handle this continuous improvement loop:
- **Prompt engineering**: change the system prompt to fix a defect, and you'll likely introduce new ones. There's no mathematical handle on the tradeoffs.
- **Instruction fine-tuning (SFT)**: you can iterate on your dataset, but doing so is expensive and you'd have to repeat the process every time production introduces new edge cases.

RL, by design, integrates reward signals continuously. It treats production data as part of the training signal rather than something that exists outside the training loop.

### Why RL gives you more than accuracy

Cappelli makes three claims about RL's advantages over SFT at enterprise scale:

1. **Smaller models, same performance**: RL-trained models reach SFT-equivalent performance with fewer parameters, which directly reduces serving cost. For AT&T, summarizing every customer-agent call transcript costs millions per year; a model trained via RL that can do this with 5× fewer parameters changes the economics materially.

2. **Latency as a hard constraint**: Speech-to-speech customer support systems cannot tolerate more than ~333ms latency. You cannot meet that constraint with large frontier models. You need a small, fast model — and RL is the most efficient path to getting a small model to perform at the quality you need.

3. **Model ownership**: An RL-trained model is trained on your business data. You own it. If Anthropic or OpenAI silently updates a model and shifts behavior, your product breaks. An owned model doesn't do that.

### Where the human goes in RL

Cappelli addresses the common objection that RL requires expensive human annotation campaigns (RLHF). His reframing: the human's job is to define the rubrics and the scenarios — a task that takes hours, not weeks, and does not require iteration "dozens of times." The actual reward signal computation is handled by LLMs-as-judges, which are themselves calibrated against a small set of human-labeled examples.

As more production data accumulates, the team moves from prompted LLM judges to trained reward models, scaling the human signal without scaling the human headcount.

### The agent era raises the stakes further

Agents require more tokens and leave less room for errors — they modify production databases and interact with customers directly. This raises both the tokenomics challenge (an agent use case can cost 10× what a summarization pipeline costs) and the quality bar. Cappelli argues RL's advantage only widens in the agent era, because RL was originally designed to train agents operating in environments — which is exactly what LLM agents are.

### What Adaptive ML is actually building

The Adaptive Engine is an RL Ops platform that handles the orchestration complexity — running PPO requires managing four models simultaneously, which is hard enough that most teams can't do it without infrastructure. The platform exposes pre-built recipes so teams can define the reward rubrics without implementing the underlying algorithms like GSPO or PPO themselves.

## Metadata
- Video: https://www.youtube.com/watch?v=X6NShR2ccOg
- Duration: 18:35
- Playlist index: 674
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hello everyone. I am Alessandro Cappelli. I'm co-founder and chief customer officer at Adaptive ML. At Adaptive ML we build an RL ops platform as in reinforcement learning operation that allows large enterprises like AT&T, Manulife, CCS to build, evaluate, and serve in production their own specialized large large language models. I'm I'm here to show you how reinforcement learning RL is not just any other algorithm for post-training, but is an an algorithm that at its core will bring models to production. Around 3 years ago uh I was part of a team that trained Falcon. Falcon around 3 years ago was one of the most widely adopted open-source models and we realized with, you know, my team that...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/X6NShR2ccOg.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
