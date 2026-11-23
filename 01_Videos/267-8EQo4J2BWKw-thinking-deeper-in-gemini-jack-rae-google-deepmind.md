---
video_id: "8EQo4J2BWKw"
playlist_index: 267
title: "Thinking Deeper in Gemini — Jack Rae, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=8EQo4J2BWKw"
duration: "18:13"
duration_seconds: 1093
view_count: 30191
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/8EQo4J2BWKw.txt"
themes:
  - "Models & Inference"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:11:20+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jack Rae, tech lead of thinking in Gemini at Google DeepMind, argues that progress in AI comes from finding the key bottleneck and solving it: n-gram data limits, short context, the fixed RNN state, and now fixed test-time compute. Thinking adds a dynamic loop of thousands of tokens before the answer, trained by reinforcement learning, which produced emergent hypothesis testing and self-correction. It stacks with pre-training and post-training scaling, gives developers a continuous thinking-budget dial in Gemini 2.5, and powers Deep Think, which lifts USA Math Olympiad results from about the 50th to the 65th percentile."
---
# Thinking Deeper in Gemini — Jack Rae, Google DeepMind

## Summary
Jack Rae is a Google researcher and the tech lead of thinking within Gemini. His talk has three parts: why thinking matters as a research step, what thinking is and why developers should care, and what comes next. His core claim is that progress toward general intelligence comes from naming the most pressing bottleneck in current models and then solving it.

**A history of bottlenecks**
- 1948: Claude Shannon builds a word bigram model from hand-counted statistics. His bottleneck is data and compute, solved only by digitized text and modern computers.
- 2000s: Google colleagues such as Jeff Dean train n-gram models over trillions of tokens for speech recognition and translation. The bottleneck is short context, because storage grows exponentially with context length.
- 2010: recurrent neural language models compress the past into a state and reach paragraphs. The new bottleneck is the fixed-size state, which is lossy.
- Attention keeps all past embeddings and aggregates them on the fly, which leads to transformers.
- 2024: LLMs are strong, but they are trained to respond immediately. Each answer gets a fixed amount of test-time compute. A bigger model helps, but users may want a thousand or a million times more compute on hard tasks, and less on easy ones.

**What thinking is**
The model emits extra text before its final answer. This adds a loop of potentially tens of thousands of iterations, and the model learns how many to use. Gemini learns this after pre-training through reinforcement learning, with positive and negative rewards for solving tasks. Rae says the team was not sure such a vague signal would work. An early trace showed the model posing a hypothesis, testing it, saying the formula does not hold, and trying another approach. Learned strategies now include breaking problems down, exploring several solutions, drafting code in modules, intermediate calculation and tool use.

**Why developers should care**
Test-time compute scaling stacks with pre-training scaling (data and model size) and post-training scaling (quality and diversity of human feedback), for a multiplicative effect. A chart from 2.0 Flash experimental (no thinking) to the first 2.5 Pro shows math, code and science scores tracking log-scale test-time compute. Thinking also turns the cost-quality trade-off from a discrete choice of model size into a continuous slider: thinking budgets ship in 2.5 Flash and Pro.

**What comes next**
- Efficiency: the models sometimes overthink, and the goal is thinking that adapts without tuning.
- Deeper thinking: Deep Think, a very high budget mode on 2.5 Pro for trusted testers, uses deeper and parallel chains of thought that integrate. On the USA Math Olympiad, 2.5 Pro is around the 50th percentile and Deep Think reaches the 65th. Base-model and algorithm gains stack.
- Long, open-ended coding: colleagues had Gemini vibe-code the original DQN setup, including an Atari emulator, in minutes, work that once took months.
- Data efficiency: he cites a famous early 20th-century mathematician who built vast theory from one textbook. He wants models to think for millions of inference tokens over little data and build knowledge that pushes the frontier.

## Why it matters
- Gives a compact frame for reasoning models: thinking is the answer to a fixed test-time compute bottleneck, in the same line as attention answering the fixed RNN state.
- Explains why thinking is trained with plain RL on correctness rewards rather than hand-built structure, and that self-correction emerged from it.
- Gives developers a practical lever: thinking budgets turn model choice into a continuous cost-quality dial, while overthinking remains an open efficiency problem.
- Supplies concrete numbers for test-time scaling (USA Math Olympiad around the 50th percentile for 2.5 Pro, 65th for Deep Think) and the claim that it multiplies with pre-training and post-training gains.

## Metadata
- Video: https://www.youtube.com/watch?v=8EQo4J2BWKw
- Duration: 18:13
- Playlist index: 267
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] [Applause] Hi everybody. Uh yeah, my name is Jack. I'm a researcher at Google and I'm the tech lead of thinking within Gemini and I'm going to give a brief deep dive into thinking from the research perspective uh within Gemini. So I'm going to kind of give this talk in three stages. One is to give a research motivation of why we actually are excited about thinking in terms of unblocking bottlenecks towards intelligence. And I'm going to give a kind of uh give a few examples of how often discovering the most precient bottlenecks uh in kind of our current uh models uh our most advanced systems how often if you can just identify the crucial kind of uh issues and shortcomings you often...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/8EQo4J2BWKw.txt]]
- Description cue: Progress towards general intelligence has been marked by identifying fundamental intelligence bottlenecks within existing models and developing solutions that improve the architecture or training...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **RAG & Retrieval**.
