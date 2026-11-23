---
video_id: "PbHm2qKnu10"
playlist_index: 271
title: "Training Agentic Reasoners — Will Brown, Prime Intellect"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=PbHm2qKnu10"
duration: "19:17"
duration_seconds: 1157
view_count: 21625
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/PbHm2qKnu10.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:11:29+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Will Brown of Prime Intellect argues that reasoning and agents are the same thing: an agent's harness, tools, environment and evals map directly onto RL's policies, actions, states and rewards, and tuning prompts against evals is doing RL by hand. RL now works at scale, as DeepSeek and o3 show, and teams that RL the best open models for their tasks can build a moat beyond API wrappers. He explains advantage estimation and why GRPO beats DPO and PPO in practice, treats reward hacking as an eval-design problem, backs LLM-generated rubrics for fuzzy tasks, and presents his verifiers library for multi-turn agent RL."
---
# Training Agentic Reasoners — Will Brown, Prime Intellect

## Summary
Will Brown works at Prime Intellect. People talk about reasoning and agents as separate topics. His thesis is that they are the same thing, and that reinforcement learning is the tool that joins them.

**RL works now**
DeepSeek surprised people with cost, quality and openness, but Brown stresses a further point: RL at scale worked with few tweaks. With a good setup, a good signal and a capable base model, more RL gives a better model. The big labs bet on this. OpenAI stopped serving GPT-4.5 through the API but doubles down on RL, and o3 sells because it uses many tools well in agentic settings. Generic LLM APIs go off the rails after enough steps in complex systems; RL trains the model to do better at exactly that. Claude is a good coding agent probably because it was RL-trained in almost that while-loop-with-tools setting. o3 learned its image-cropping trick through RL with tools.

**Agents are RL**
Harness, environment, tools and iteration map onto policies, actions, states, rewards and transitions. If you tune prompts, swap tools and check evals, you are "doing RL by hand". RL is an algorithm to improve on eval scores. Teams that RL the best open models for their tasks will have an advantage and a moat beyond being a wrapper API.

**How the algorithms work**
You have tasks (prompts), rollouts (possibly many-step completions) and evaluations. Because sampling is non-deterministic, some rollouts beat others. The advantage estimate finds where the good path split from the bad one, so the model learns more of the good behavior without changing much else. In his view DPO lacks this fine-grained signal, PPO has it but is expensive, and GRPO is the efficient, simple middle ground. He advises ignoring most daily papers and their sensational titles and thinking about what RL does as a whole.

**Rewards and evals**
Most open RL code targets math and code, partly, he admits, because his GSM8K snippet went viral, and math is easy to grade. Real tasks are messier. Reward hacking shows how hard evals are: it must be easier to do the task than to game the eval, because models follow the path of least resistance. For fuzzy tasks he likes "rubric" as an umbrella for reward models, reward functions and LLM judges. He cites a DeepSeek paper on reward models that generate rubrics on the fly and a recent creative-writing paper that does the same.

**The verifiers library**
Multi-turn is where things are headed: agentic search, tool calls, games, computer use, memory. Environments are harnesses, rewards are evals, tasks are prompts, and the policy should look like an LLM API. His library, verifiers, now on pip, makes an RL-trainable agent look like a normal agent: a rollout is a while loop over turns with an OpenAI-compatible client. It offers parsers and rubrics as optional blocks. A Wordle demo with a 7B model rewards solving the puzzle, with more reward for fewer turns. Environments double as eval and synthetic-data loops: debug with Claude, DeepSeek or OpenAI APIs, generate data for an SFT warm-up, then run RL. The training is fully async, slightly off-policy, and runs on a couple of GPUs.

## Why it matters
- Gives a clean bridge from agent engineering to RL: prompt and harness tuning against evals is manual RL, so agent builders already own most of the pieces.
- Explains, in plain terms, why GRPO took over (fine-grained advantage from sampling at low cost) and where DPO and PPO fall short.
- Reframes reward hacking as an eval-design failure, with a clear design rule: make the task easier than the hack.
- Offers a practical path for small teams: design environments as evals, debug with hosted APIs, warm up with SFT on synthetic data, then RL an open model on a few GPUs.

## Metadata
- Video: https://www.youtube.com/watch?v=PbHm2qKnu10
- Duration: 19:17
- Playlist index: 271
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] Hi everyone, I'm Will Brown. I'm at Primeelect. Uh today I want to talk about training agentic reasoners. Um, just kind of as a very high level overview, I think a lot of people here are really excited about reasoning and a lot of people here are really excited about agents. But I feel like a lot of the conversations between these two topics are kind of like different where people are like, "Oh, reasoning is this one thing and agents are this other thing." And the considerations of like reasoning are very different from the considerations of building agents. And I think the high level thesis of this talk is like no, they're kind of the same thing. Um, and you'll see why as we get...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/PbHm2qKnu10.txt]]
- Description cue: This talk will be a technical deep dive into RL for agentic reasoning via multi-turn tool calling, similar to OpenAI's o3 and Deep Research. In particular, we'll cover:

## Book angles
- Could support a chapter/section on **Models & Inference**.

