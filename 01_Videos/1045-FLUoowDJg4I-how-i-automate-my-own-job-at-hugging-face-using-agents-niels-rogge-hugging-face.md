---
video_id: FLUoowDJg4I
playlist_index: 1045
title: "How I automate my own job at Hugging Face using agents — Niels Rogge, Hugging Face"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=FLUoowDJg4I"
duration: "20:37"
duration_seconds: 1237
view_count: 1200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/FLUoowDJg4I.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:55+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Niels Rogge describes automating Hugging Face research outreach, moving from a deterministic LLM workflow to a Claude Agent SDK agent on Modal running GLM 5.2, plus Daily Papers and Papers With Code."
---

# How I automate my own job at Hugging Face using agents — Niels Rogge, Hugging Face

## Summary
Niels Rogge, a Hugging Face ML engineer on the community science team, describes automating the team's manual outreach to researchers who publish model weights and datasets on Google Drive, GitHub releases, Dropbox, or Zenodo instead of the Hugging Face Hub. In 2024 he first built a deterministic workflow — plain LLM API calls chained in a fixed pipeline, no agent framework, following Anthropic's "Building Effective Agents" advice to start simple — that finds a paper's GitHub repo, reads its README, checks whether artifacts and metadata cards already exist on the Hub, and then opens a GitHub issue or pull request; it runs nightly as a cron job via GitHub Actions, with Langfuse for tracing. He later rebuilt the follow-up-reply step as a fully autonomous agent using the Claude Agent SDK — citing an AI Engineer NYC workshop on the SDK and a Cursor talk about replacing 12,000 lines of workflow code with a 200-line skill as reasons to switch — deployed on Modal's batch-processing feature so each parallel container runs one agent loop over Bash and a Hugging Face CLI skill; he now runs it on GLM 5.2 via Hugging Face's inference-providers routing instead of Claude models. He reports concrete outcomes: thousands of GitHub issues opened with only two negative replies, PaddleOCR migrating its models to the Hub after an agent-opened issue, the "Tiny Recursive Models" issue drawing 60+ upvotes, and an agent unprompted crediting him as a model-card author — while recommending Hamel Husain's writing on LLM evals to avoid producing "slop." He also mentions two adjacent efforts on the same pipeline: a "Daily Papers" X/Twitter account that passed 90,000 followers unattended, and a from-scratch revival of Papers With Code at paperswithcode.co.

## Why it matters
- A concrete, numbers-backed case study of the workflow-to-agent migration path — deterministic pipeline first, autonomous agent later — explicitly grounded in Anthropic's own "Building Effective Agents" guidance, directly useful for a chapter on choosing between workflows and agents.
- Names a specific deployment stack (Claude Agent SDK, Modal batch containers, Langfuse tracing, GLM 5.2 via Hugging Face inference providers) with stated reasons for each choice, giving a real production setup rather than a hypothetical one.
- Surfaces a genuine design tension — the agent deliberately doesn't disclose it's a bot, to avoid issues being dismissed — alongside measurable community reception (thousands of issues, ~2 negative replies), useful evidence for a section on AI agents interacting with humans at scale.

## Metadata
- Video: https://www.youtube.com/watch?v=FLUoowDJg4I
- Duration: 20:37
- Playlist index: 1045
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Okay. All right. Hello everyone. Thanks for coming by. Today I'll talk about how I automate my own job at Hugging Face using agents. Um short introduction. I'm just uh Niels from Belgium, the land of beer, fries, and chocolate. I studied at KU Leuven, and I'm a machine learning engineer at Hugging Face for 5 years now. Uh today I'll talk about the community science team at Hugging Face, which is the team I'm part of. Uh then I'll talk about how I automate large parts of the community science team. And finally, I'll also discuss some other efforts uh that we do at Hugging Face. So, let's start with the community science team at Hugging Face. So, basically, this started when I was...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/FLUoowDJg4I.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
