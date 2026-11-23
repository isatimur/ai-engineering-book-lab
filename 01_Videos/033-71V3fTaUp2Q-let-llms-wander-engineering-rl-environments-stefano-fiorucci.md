---
video_id: "71V3fTaUp2Q"
playlist_index: 33
title: "Let LLMs Wander: Engineering RL Environments — Stefano Fiorucci"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=71V3fTaUp2Q"
duration: "40:35"
duration_seconds: 2435
view_count: 5156
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/71V3fTaUp2Q.txt"
themes:
  - "Org Design & Leadership"
  - "Evals & Reliability"
ingested_at: "2026-04-24T10:50:54+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Stefano Fiorucci of Deepset argues that RL environments with verifiable rewards let models learn by trial and error instead of imitating human examples, so a small specialized model can beat a large closed one on a narrow task. He maps classic RL concepts to LLMs, shows Prime Intellect's open-source Verifiers library (single-turn, multi-turn, tool and MCP environments), then trains Liquid AI's small LFM-2 at tic-tac-toe: SFT warm-up on 200 synthetic games, then RL with controllable minimax opponents, seeded turns and stratified batches. It ends up beating its teacher GPT-5 mini against an optimal opponent. Key lessons: large batch sizes and hidden environment biases."
---
# Let LLMs Wander: Engineering RL Environments — Stefano Fiorucci

## Summary
Stefano Fiorucci is an AI and software engineer who works on AI orchestration at Deepset, where he develops the open-source Haystack framework, and tinkers with small models, fine-tuning and RL at night. His talk explains reinforcement learning environments for evaluating and training LLMs, and ends with a hands-on experiment.

**From imitation to interaction**
The standard recipe (pre-training, supervised fine-tuning, RL for preference alignment) is showing limits. OpenAI's o1 linked gains to more RL compute and more thinking time; DeepSeek R1 showed how, with reinforcement learning from verifiable rewards and the lighter GRPO algorithm. In SFT the model mimics curated examples and stays near their distribution. With verifiable rewards (a correct answer, a won game, a successful tool call) it explores and "is no longer limited by the quality of human examples." The LLM is the agent; the environment holds data, harness and scoring rules. He notes DeepSeek and MiniMax reports describe thousands of such environments.

**Verifiers as environment software**
Prime Intellect's open-source Verifiers library packages environments as installable Python packages for both eval and training. It offers single-turn, multi-turn, tool, MCP, stateful tool and recursive language model environments; parsers; and rubrics of weighted reward functions. It works with any OpenAI-compatible endpoint and integrates with several trainers. Examples: a reverse-text environment scored by longest common subsequence, and a "double-check" environment that replies "Are you sure?". An environments hub aims to fight fragmentation, so open models do not lag "because they lack the right playgrounds."

**Engineering a tic-tac-toe environment**
Start simple (model plays X, random opponent), evaluate, then iterate:
- Play first or second; add a minimax opponent whose skill is set by a random-move probability range.
- Reward think tags; replace instant loss on invalid moves with a -0.1 penalty, capped at eight turns.
- Cut GRPO noise with per-example seeds and turn seeds from board state, so the opponent answers the same position the same way.
- Use stratified sampling so each batch has a balanced mix of opponent difficulty.

**The experiment**
GPT-5 mini played well; Liquid AI's LFM-2 struggled with format and valid moves. An SFT warm-up on 200 GPT-5 mini games (losses filtered out) fixed format in minutes. RL with CISPO, against opponents with 20 to 70% random moves, produced a player that dominates random opponents and draws 85% against optimal ones. A second run (0 to 25% random moves, higher temperature) dipped during exploration, then reached new highs and beat GPT-5 mini against an optimal opponent.

**Lessons from failed runs**
- Batch sizes below 256 caused instability and collapse; large batches learn slowly but stably.
- Hidden bias: a minimax that always picked the first free cell among equal moves gave great benchmarks but a "clueless" model that had memorized one opponent.
- Training only against perfect opponents made the model too defensive.
- Reasoning models waste budget on long traces; consider turning an instruct model into a reasoner. Pick a base model that shows promising behavior.
- Inspect rollouts, test in the real task, and once training starts well, "go for a walk."

## Why it matters
- Clear explanation of why verifiable-reward RL differs from SFT: exploration lets models surpass the examples they were given.
- Treats environments as reusable software artifacts with parsers, rubrics and state, a useful frame for anyone building evals or training loops.
- The tic-tac-toe build is a concrete catalog of environment design moves: curriculum through opponent skill, soft penalties, seeding for low-variance GRPO groups, stratified batches.
- The minimax-bias story warns that strong benchmark numbers can hide a model that memorized a quirk of the environment.
- Supports the claim that a small model with SFT warm-up plus RL can beat its larger teacher on a narrow task at low cost.

## Metadata
- Video: https://www.youtube.com/watch?v=71V3fTaUp2Q
- Duration: 40:35
- Playlist index: 33
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Evals & Reliability]]

## Transcript excerpt
> Hello everybody and welcome to Let's Learn Wander engineering reinforcement learning environments. A few words about me. I am Stefano Fiorucci, a AI and software engineer. By day, I work on AI orchestration at Deepset, where I develop Haystack, an open-source LLM framework. By night, I love tinkering with small language models, fine-tuning, and reinforcement learning. Today, I'm going to talk about reinforcement learning environments for language models evaluation and training. This has been a hot topic over the past year, and I find it fascinating for several reasons. These environments let models learn by interacting, exploring, and improving from feedback. They are natural gyms for LLM...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/71V3fTaUp2Q.txt]]
- Description cue: Reasoning models like DeepSeek R1 have demonstrated that learning from interaction is just as critical as learning from examples. To build these capabilities ourselves, we need to move beyond...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- model: <https://huggingface.co/anakin87>
- repo: <https://github.com/anakin87/llm-rl-environments-lil-course>
- resource: <https://drive.google.com/file/d/116PKThwtyTxeH1GmZQ7bL3HPYM6KCgHa/view>
