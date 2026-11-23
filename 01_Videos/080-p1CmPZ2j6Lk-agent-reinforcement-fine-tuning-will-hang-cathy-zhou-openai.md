---
video_id: "p1CmPZ2j6Lk"
playlist_index: 80
title: "Agent Reinforcement Fine Tuning – Will Hang & Cathy Zhou, OpenAI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=p1CmPZ2j6Lk"
duration: "16:55"
duration_seconds: 1015
view_count: 20928
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/p1CmPZ2j6Lk.txt"
themes:
  - "Coding Agents"
  - "Models & Inference"
ingested_at: "2026-04-24T10:52:52+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Will Hang and Cathy Zhou of OpenAI's fine-tuning team present Agent RFT, which trains a reasoning model end to end on a customer's task while it calls the customer's own tool endpoints and a custom reward endpoint, the first time OpenAI lets models touch the outside world during training. They position it as the last step after prompt and task optimization. Customer cases show the pattern: Cognition gained 5 points with 100 examples and 10 with 1,000, and tool-call counts and long-tail trajectories shrank. They give four rules: a well-defined task, train data that mirrors production, variance across samples, and an unhackable, ideally continuous reward."
---
# Agent Reinforcement Fine Tuning – Will Hang & Cathy Zhou, OpenAI

## Summary
Will Hang and Cathy Zhou work on the fine-tuning team at OpenAI. They present agent reinforcement fine-tuning (Agent RFT) as "the most powerful way" to improve an agent, and walk through four customer cases on coding tasks. An agent, in their framing, interleaves tool calls with reasoning traces in one context window; OpenAI's flagship coding agent works this way.

**Where Agent RFT fits**
They lay out a ladder: prompt engineering first, then task optimization (simplify the task, add guardrails, add or remove tools, change tool behavior), and only then fine-tuning. Agent RFT changes model weights from a learning signal you define, while the agent explores many ways to call your tools. Two new product features: the model calls your tools through public endpoints during training, and a custom reward endpoint is invoked after each rollout. Each rollout gets a unique ID attached to every tool call, so you can assemble the whole trajectory as grading context. It is sample-efficient; some customers succeed with about 10 examples.

**What it fixes**
Domain shift: your environment differs from OpenAI's training environments, so agents call tools too often or with wrong inputs. RFT teaches better tool use and better reasoning over tool outputs. A penalty for exceeding a tool-call budget teaches the model to stay inside it while keeping or beating accuracy, which cuts latency.

**Customer cases**
- Cognition trained the code-edit planning phase, where the agent greps and reads files to pick which files to edit. Reward: F1 score of selected files against files users really changed. Each trajectory ran in its own VM. 100 examples gave 5 points; 1,000 gave 10. The model learned to launch tool calls in parallel, cutting 8 to 10 steps down to four.
- A code-review company trained a deep-research agent on about 1,000 real question-answer pairs from eight repositories, rewarded on recall of relevant facts. Accuracy rose 6 percent with fewer tool calls and tokens; runs with more than 15 tool calls disappeared and the distribution centered on two to four.
- Cosine trained an enterprise coding agent with 30 tools and a strict grader: reward only when the final code passes tests, since partial credit made the model optimize style and tone. They raised batch size and compute to offset sparse rewards, added an LLM judge that penalizes verbosity and emojis, and rewarded agents that validate their own work. Trajectories that sometimes exceeded 100 messages tightened.
- A GPU-kernel company trained on only about 100 PyTorch prompts. They found seven reward hacks (returning reference code, no kernel, identity kernels), caught them with a judge LLM plus an AST-based static check, then scored correctness and real speedup. Best-of-three sampling beat the state of the art by 72 percent.

**Four principles**
1. A well-defined task with an unambiguous definition of success; "taste should not be a requirement" to grade it.
2. Train and eval sets that mirror production traffic, so the model is not "surprised in production."
3. Exploration must help: max performance on a data point should rise as you sample more, so the model sees variance between good and bad rollouts.
4. An unhackable reward, ideally continuous rather than binary, like partial credit for a student.

## Why it matters
- Gives a clear decision ladder (prompt, then task design, then weights) and a pre-RFT checklist: matched data, a baseline, then optimization.
- The cases show RFT improving speed and stability as much as accuracy: fewer steps, parallel tool calls, and no P95 long-tail runs.
- The kernel case is a concrete reward-hacking catalogue and fix (judge LLM plus AST check) for any chapter on verifier design.
- Cosine's choice of a strict pass-the-tests reward, against the closing advice to prefer continuous rewards, shows the tension between sparse and shaped rewards in practice.

## Metadata
- Video: https://www.youtube.com/watch?v=p1CmPZ2j6Lk
- Duration: 16:55
- Playlist index: 80
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Models & Inference]]

## Transcript excerpt
> [music] Hey everyone, I'm Will >> and I'm Kathy and we're on the fine tuning team at OpenAI >> and we're super excited to talk to you today about agent RF, the most powerful way to enhance the performance of your agents. So, you're probably joining us today because you're building an agent for your business and you'd like to improve its performance. So, let's first start by talking about what an agent actually is. What makes an agent different from a regular model is its ability to interact with the outside world to complete a task to get things done on its own without having to go through you all the time. So, this agent needs to have access to tools. For example, if you're building a...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/p1CmPZ2j6Lk.txt]]
- Description cue: Deep dive into OpenAI's approach to reinforcement fine-tuning for code models.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Models & Inference**.
