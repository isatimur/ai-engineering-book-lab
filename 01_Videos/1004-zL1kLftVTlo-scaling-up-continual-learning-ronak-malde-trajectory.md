---
video_id: zL1kLftVTlo
playlist_index: 1004
title: "Scaling up Continual Learning — Ronak Malde, Trajectory"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=zL1kLftVTlo"
duration: "23:03"
duration_seconds: 1383
view_count: 796
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/zL1kLftVTlo.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:36:20+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Trajectory's Ronak Malde proposes on-policy self-distillation as a single-rollout, per-token alternative to GRPO, detailing divergence and hint-leakage failures found scaling it past 120B parameters."
---

# Scaling up Continual Learning — Ronak Malde, Trajectory

## Summary
Ronak Malde — who led research at an AI coding startup before founding Trajectory — argues that benchmark scaling has become too slow and expensive (some evals now take 4 to 24+ hours) while frontier labs pour money into RL environments that ignore the hundreds of trillions of daily inference tokens that could serve as training signal instead. He traces post-training from SFT to RLHF/DPO to GRPO against four criteria (on-policy sampling, online task distribution, minimal parallelism, per-token reward), noting GRPO still needs costly parallel rollouts and gives only sequence-level reward. His proposed fix, on-policy self-distillation (OPSD), has a smarter teacher score the student's own single rollout after a "hint" (e.g. a golden-solution snippet) is inserted into the teacher's prompt, then matches the student's log-probs to the hint-augmented teacher's per-token distribution — removing the need for grouped rollouts. He reports OPSD pushes past the point where GRPO saturates around Sonnet-level performance on LiveCodeBench, while using fewer tokens per solve since the objective doesn't reward longer chains of thought; scaling OPSD to 120B+ parameter agents doing 100+ tool calls surfaced two new failure modes — a long-horizon divergence collapse into hedge tokens ("wait," "maybe") and "hint leakage," where the student shortcuts by parroting the hint's answer — addressed with per-step KL-divergence-weighted loss and a "residual guidance" blend of partial- and full-hint teacher log-probs. Trajectory's product ingests production agent traces and turns them into a continually retrained, redeployed agentic loop, with early access at Harvey and Rogo among named customers.

## Why it matters
- Documents on-policy self-distillation as a concrete, technically specific alternative to GRPO/RLHF for continual learning — single-rollout, per-token dense reward, addressing the infrastructure cost that makes RL environments expensive.
- Reports real scaling failure modes (hedge-token divergence collapse, hint leakage) that only appeared at 120B+ parameters and 100+ tool calls — evidence that techniques validated in short-horizon settings don't survive production scale unchanged.
- Frames the core thesis — that hundreds of trillions of daily inference tokens are wasted training signal — as a direct argument for why continual learning, not further pretraining scale, is the next unlock.

## Metadata
- Video: https://www.youtube.com/watch?v=zL1kLftVTlo
- Duration: 23:03
- Playlist index: 1004
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] All right. Hey everyone. Uh, thanks for coming by over here. Hope you enjoyed the chat by part on uh, how to measure continual learning. Now I'm here to talk about how we scale it up. So a bit of background about me. I uh went to this company called WinSurf where I was growing the research team over there. Uh we trained this model called sui 1 that ended up leading to the two billion acquisition at deep mind and then I ended up giving up all the acquisition money to start trajectory where we're building the platform for continual learning. So uh right to dive in I think it's useful to talk a little bit about what AI progress uh has looked like for the past couple years. So we've...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/zL1kLftVTlo.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
