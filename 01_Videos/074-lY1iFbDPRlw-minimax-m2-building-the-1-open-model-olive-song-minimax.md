---
video_id: "lY1iFbDPRlw"
playlist_index: 74
title: "Minimax M2: Building the #1 Open Model – Olive Song, MiniMax"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=lY1iFbDPRlw"
duration: "13:41"
duration_seconds: 821
view_count: 91098
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/lY1iFbDPRlw.txt"
themes:
  - "Models & Inference"
  - "Evals & Reliability"
ingested_at: "2026-04-24T10:52:38+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Olive Song, who works on reinforcement learning and model evaluation at MiniMax, explains how the team shaped MiniMax M2, an open-weight model with only 10 billion active parameters built for coding and agentic workplace tasks. She says it topped open models on benchmarks, led downloads in week one and reached top three in OpenRouter token usage. She ties four traits to training choices: scaled environments plus in-house expert developers as reward models, interleaved thinking across tens to 100 tool calls, perturbation pipelines so it generalizes across agent scaffolds, and a small, cheap size that makes parallel multi-agent work practical."
---
# Minimax M2: Building the #1 Open Model – Olive Song, MiniMax

## Summary
Olive Song works on reinforcement learning and model evaluation at MiniMax. MiniMax builds both foundation models (text, vision-language, video, speech and music generation) and in-house applications, including agents. She says this sets it apart from other labs: researchers sit beside in-house developers and get first-hand feedback on what developers need. Her subject is MiniMax M2, an open-weight model with only 10 billion active parameters, designed for coding and agentic workplace tasks and "very cost-efficient."

**Adoption over benchmark numbers**
M2 ranks at the top of open models on intelligence and agent benchmarks. But "numbers don't tell everything": some high-scoring models "suck" once plugged into a real environment. So she points to adoption. M2 had the most downloads in its first week and climbed to top three in token usage on OpenRouter. The talk then maps four model traits to the training behind each.

**1. Coding experience: scaled environments and scaled experts**
Developers need a model that works in their languages and workflows. MiniMax built training data from real internet data and scaled both the number of RL environments with verifiable coding goals and the infrastructure to train on them efficiently. The result is a full-stack, multilingual coding model. Beyond environments, MiniMax "scaled expert developers as reward models." In-house experts took part in problem definition, bug fixing and repo refactoring. They identified behaviors developers enjoy and trust, and they gave precise rewards for behavior and final deliverables.

**2. Long-horizon tasks: interleaved thinking**
A standard tool-using reasoning model thinks, calls tools, gets results, thinks once more and answers. Real environments are noisy: tool errors and unexpected results. M2 thinks again after each tool response and decides whether it has enough information. It interleaves thinking with tool calls, "tens to 100 turns" within one user turn. This lets it adapt to noise, switch tools, and automate workflows across Gmail, Notion and a terminal from one model call. A trading illustration shows it staying stable through a stock market shake-up.

**3. Generalization across agent scaffolds: perturbation pipelines**
At first the team thought generalization meant tool scaling: train on many tools, including invented ones. That worked until they changed the agent scaffold. Their conclusion: generalization is "adaptation to perturbations across the model's entire operational space," meaning tool info, system prompts, user prompts, chat templates, environments and tool responses. They built and maintain data perturbation pipelines that cover all of these.

**4. Multi-agent scalability**
Because M2 is small and cheap, many copies can run in parallel. In the MiniMax Agent app, copies research, write and analyze reports, and build front-end views at the same time, supporting long-running and parallel agentic tasks.

**What comes next**
For M2.1 and M3: better coding, memory, context management, proactive workplace AI, vertical experts, and perhaps integration of MiniMax's audio and video models. She asks the community for feedback.

## Why it matters
- "Expert developers as reward models" is a concrete practice: put in-house experts into problem definition and reward design, not only benchmark checks.
- The interleaved-thinking pattern (reason after every tool result, across tens to 100 calls) is a clear design answer to noisy, long-horizon environments.
- Defining agent generalization as robustness to perturbations across the whole operational space, not just new tools, explains why models break when scaffolds change, and how to train against it.
- Using downloads and OpenRouter token share as evidence, and warning that high benchmark scores can fail in real environments, is a useful point for evaluation chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=lY1iFbDPRlw
- Duration: 13:41
- Playlist index: 74
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Evals & Reliability]]

## Transcript excerpt
> [music] Hi. Hi everyone. Um, I'm Olive. It's my great honor here today to present on our new model, Miniax M2. Um, I actually lived in New York City for six years, so it feels great to come back. Um, but with a different role. Um, I currently study reinforcement learning and model evaluation at Miniax. Um, let me just get a quick sense of the room. Who here has heard or have tried of Miniax before? Oh, a couple of there. Yeah, not everybody, but I guess Yeah, but here's the value, right, of me standing here today. Um so we are a global company that works on both foundation models and applications. We develop multi modality models including text um vision language models our video generation...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/lY1iFbDPRlw.txt]]
- Description cue: Introducing Minimax's latest AI model and its applications in code generation.

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Evals & Reliability**.
