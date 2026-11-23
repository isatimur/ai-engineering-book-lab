---
video_id: "jQcsVk0KWiQ"
playlist_index: 231
title: "A Taxonomy for Next-gen Reasoning — Nathan Lambert, Allen Institute (AI2) & Interconnects.ai"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=jQcsVk0KWiQ"
duration: "19:21"
duration_seconds: 1161
view_count: 15701
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/jQcsVk0KWiQ.txt"
themes:
  - "Models & Inference"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:09:11+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Nathan Lambert (AI2, Interconnects.ai) looks six months past o1 and DeepSeek R1 and argues that reasoning skills are mostly solved; the next frontier is planning. He offers a taxonomy of four traits for training autonomous reasoning models: skills, calibration, strategy and abstraction. Models overthink (hundreds of tokens for 2 plus 3), dive into problems without a plan, and cannot break hard tasks into tractable subtasks. He expects planning to follow the reasoning arc of human data, then SFT, then RL, and suggests post-training compute will soon match pre-training, so we may rename post-training as training."
---
# A Taxonomy for Next-gen Reasoning — Nathan Lambert, Allen Institute (AI2) & Interconnects.ai

## Summary
Nathan Lambert (Allen Institute (AI2) and Interconnects.ai) reflects on six months of reinforcement learning with verifiable rewards after o1 and DeepSeek R1. His point: everybody has a reasoning model now, so the useful question is where the puck is going. His answer is planning. Models that work autonomously on long tasks need traits that math-and-code RL does not give them natively, and "gains aren't free": labs must add each new capability on purpose.

**A taxonomy of four traits**
- **Skills**: math, code, search, tool use. Largely done. o3 is his most-used model for finding information; it found the CoastRunners over-optimization example and gave him the download link.
- **Calibration**: match output tokens to problem difficulty. Today the user carries this burden through model selectors, extended-thinking toggles and reasoning-effort settings. Reasoning models spend hundreds to a thousand tokens on "2 plus 3" and 10 to 100x more tokens than instruction models.
- **Strategy**: go in the right direction from the start. He gave a FrontierMath question to DeepSeek R1-0528; it went straight into constructing a polynomial with no sketch of the problem. At 10,000 to 40,000 tokens per attempt, a wrong direction costs dollars and minutes against products that expect 1 to 30 minutes of latency.
- **Abstraction**: break a hard task into tractable subtasks, or hand a subtask to a bigger model. Today humans do this, for example by launching Claude Code in ten terminal windows.

**Planning must become model-native**
Deep research and Claude Code are likely prompted to plan. Lambert wants that inside the model. He recalls that Q-star, then Strawberry, then o1 took OpenAI 12 to 18 months of human-written reasoning traces to make backtracking and verification reliable. Planning should be easier: few people can write a 10,000-token reasoning trace, but many experts can write a good five-to-ten-step plan or check one. The path is initial data, then SFT, then RL on bigger tasks. He also suggests structured plan tokens before thinking tokens. Lack of planning explains why deep research sometimes gives "a masterpiece" and sometimes "a dud".

**Parallel compute and the RL recipe**
Parallel compute, as in o1 Pro, does not take problems from zero to one the way inference-time scaling did. It makes answers more robust. His rough recipe for a reasoning model: collect many questions with verifiable answers, filter out questions the base model solves 0 or 100 times out of 100 (they waste compute and add gradient noise), then run stable RL. Clipping tricks and reference-model resets add only a few points. Data and stable infrastructure carry the result.

**Rename post-training as training**
o1 used about 1% of compute for post-training, and o3 raised that 10x. DeepSeek V3 used 0.18%, but his rough estimate puts R1's RL at 10 to 20% of compute. Post-training compute heads toward parity with pre-training.

## Why it matters
- The four-trait taxonomy (skills, calibration, strategy, abstraction) splits the goal of agents that plan into separate data and training problems a team can work on one at a time.
- The calibration argument puts a number on overthinking (10 to 100x token growth) and treats it as a cost, latency and infrastructure problem, not only a quality one.
- It explains why agent products such as deep research are uneven: strong skills with weak planning give inconsistent coverage.
- The difficulty-filtering step (drop questions solved 0/100 or 100/100) is a concrete, reusable rule for building RL datasets.
- The compute data points from o1, o3 and DeepSeek support a chapter claim that post-training is becoming the main training phase.

## Metadata
- Video: https://www.youtube.com/watch?v=jQcsVk0KWiQ
- Duration: 19:21
- Playlist index: 231
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] I really came to this thinking about trying to reflect on six months into this like reinforcement learning with verifiable rewards post 01 post deepseeek and I think that a lot of this stuff is somewhat boring because everybody has a reasoning model Um, we all know the basics of you can scale RL at training time and the numbers will go up and that's deeply correlated with being able to then do this inference time scaling. Um, but really in AI right now everybody there's a lot of people are up to speed. But the crucial question is like where are things going to go and how do you skate where the puck is going? So, a lot of this talk is really me trying to process is like where is this...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/jQcsVk0KWiQ.txt]]
- Description cue: Current AI models are extremely skilled, which was seen as the step change in evaluation scores across the industry in the first half of 2025, but often fail when presented with even medium...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Evals & Reliability**.
