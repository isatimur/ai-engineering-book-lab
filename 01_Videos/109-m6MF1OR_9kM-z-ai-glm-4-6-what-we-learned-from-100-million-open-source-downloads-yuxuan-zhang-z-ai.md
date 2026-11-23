---
video_id: "m6MF1OR_9kM"
playlist_index: 109
title: "Z.ai GLM 4.6: What We Learned From 100 Million Open Source Downloads — Yuxuan Zhang, Z.ai"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=m6MF1OR_9kM"
duration: "19:39"
duration_seconds: 1179
view_count: 5626
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/m6MF1OR_9kM.txt"
themes:
  - "RAG & Retrieval"
  - "Evals & Reliability"
ingested_at: "2026-04-24T11:23:20+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Yuxuan Zhang (Z.ai) walks through how the open-weight GLM 4.6 was built and why Z.ai bets on open source: over 65 models released and more than 100 million downloads. He says GLM 4.6 is the only open model tied for first on LM Arena and nears Claude Sonnet 4 on the open CC-Bench agentic coding set. The training recipe runs 15T general tokens, 7T code and reasoning tokens, repo-level mid-training at 32K context, 500B synthetic reasoning tokens and long-context agent data up to 200K, then RL in an in-house framework with colocated and decoupled modes, a two-stage difficulty curriculum, single-stage 64K RL and token-level loss."
---
# Z.ai GLM 4.6: What We Learned From 100 Million Open Source Downloads — Yuxuan Zhang, Z.ai

## Summary
Yuxuan Zhang of Z.ai presents the GLM 4.6 model series and the training choices behind it. Z.ai has open-sourced its work since 2022: language, vision understanding, image generation and video generation models. 2025 was its "open source year", adding dense 9B and 32B GLM-4 models and GLM 4.5 and 4.6, its first mixture-of-experts family. Over 65 models have passed 100 million downloads across hubs, and GitHub lists about 1,500 community projects. The thesis: an open model can reach the frontier when the data pipeline and the RL system are designed for agentic work.

**Results**
On public benchmarks, especially maths and coding, GLM 4.6 clearly improves on GLM 4.5 and beats open models from the same period. It beats Claude Sonnet 4 on several benchmarks but still trails Claude Sonnet 4.5. On LM Arena, which tracks real user preference, it ties for first with GPT-5 and Claude Sonnet 4.5 and is the only open model there. Z.ai also built CC-Bench to test real agentic coding on a Claude Code based platform. Version 1.1 adds 22 hard tasks for 74 in total, across front-end work, internal tools, data analysis and algorithms. Full agent trajectories (planning, tool calls, code edits, execution) are open on Hugging Face. GLM 4.6 comes close to Claude Sonnet 4 (a 68.6 percent win rate figure is quoted) and beats other open baselines.

**Data pipeline**
- General pre-training: about 15 trillion tokens of web pages, books, encyclopedia and multilingual text at 4K context, for a strong all-round base.
- Reasoning continued training: about 7 trillion extra tokens of code and reasoning data, from high-quality open repositories plus maths and science with step-by-step reasoning.
- Mid-training on repo-level code: multiple files, issues, pull requests and diffs from one project packed into a long context of 32K, so the model sees the key files of a medium repo in one shot.
- About 500 billion tokens of synthetic reasoning data with thinking traces, the groundwork for task breakdown, reflection on mistakes and long-chain reasoning.
- About 100 billion tokens of long-context and agent data, pushing context to 128K for GLM 4.5 and 200K for GLM 4.6, with multi-step tool calls, search and code execution.

**RL system**
Z.ai built and open-sourced its own RL framework. Short reasoning tasks use a colocated, synchronous mode: training and inference share the same GPUs and each batch samples from the latest policy. Agentic tasks such as software engineering call browsers and back-end APIs, so slow environments would stall shared workers. Those run in a decoupled, asynchronous mode: rollout workers talk to real environments and write trajectories to a shared data buffer, and the trainer consumes them and pushes new weights periodically. Training stays in BF16, while rollouts use blockwise FP8 quantized weights for speed.

**RL findings**
- A two-stage difficulty curriculum (medium problems first, then very hard ones sampled 512 times) keeps rewards rising where medium-only training plateaus.
- For a model already given 64K SFT, staged RL at 16K, 32K and 48K makes it forget long-context ability; single-stage RL at 64K performs better.
- For code, token-level mean loss converges faster and more stably than sequence-level loss and cuts short template answers that game the reward.
- For science RL on GPQA Diamond, a small expert-verified set beats a larger mixed-quality set.

**Vision and access**
The GLM 4.5 vision model keeps native image resolution and aspect ratio, adds time index tokens for video, and supports GUI agent control. GLM 4.6 has about 355 billion parameters and runs on open inference frameworks, the Z.ai API and a GLM coding plan.

## Why it matters
- A rare detailed public recipe for a frontier-class open model, with token counts and context length at each training stage.
- The colocated versus decoupled RL design is a concrete answer to the problem of slow agent environments stalling training.
- Specific RL lessons (difficulty curriculum, single-stage long-context RL, token-level loss, quality over quantity for science data) that a training chapter can cite.
- CC-Bench with open full trajectories is an example of an agentic coding eval built on real tasks rather than isolated problems.

## Metadata
- Video: https://www.youtube.com/watch?v=m6MF1OR_9kM
- Duration: 19:39
- Playlist index: 109
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Evals & Reliability]]

## Transcript excerpt
> Hello everyone. I'm John from VAI and I'm very happy to here to talk about our latest model series uh J 4.6 series. And let's jump right in. First uh I will introduce the GM series model. Gen 4.6 Six is not our first open source model since 2022 starting from the very first G30B. We have been quite serious about open source our work. Over the years, we have released a whole family of models such as chat gem 6p for language model and the code for vision understanding code view for image generation and the video for video generation and the very uh many more across the different domains and on this side you can see a map of our open source model so far and include the different color such as...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/m6MF1OR_9kM.txt]]
- Description cue: GLM 4.6 is the only open-source model currently tied for #1 on the LMSYS Chatbot Arena, standing shoulder-to-shoulder with GPT-4o and Claude 3.5 Sonnet. In this talk, Zhang Yuxuan from zAI...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- model: <https://huggingface.co/ZHANGYUXUAN-zR>
- paper: <https://arxiv.org/abs/2312.08914>
- paper: <https://arxiv.org/abs/2408.06072>
- paper: <https://arxiv.org/abs/2507.01006>
- paper: <https://arxiv.org/abs/2508.06471>
- repo: <https://github.com/CosmosShadow/gptpdf>
- repo: <https://github.com/chatchat-space/Langchain-Chatchat>
