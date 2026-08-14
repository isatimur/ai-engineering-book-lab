---
video_id: cJ0EOzey--o
playlist_index: 977
title: "What's Next After RLHF? — Diogo Almeida, TypeSafe AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=cJ0EOzey--o"
duration: "18:05"
duration_seconds: 1085
view_count: 1300
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/cJ0EOzey--o.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-04T17:21:47+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "OpenAI RLHF co-author Diogo Almeida argues LLMs, including Claude Code, are stuck in an assistance-only RLHF paradigm, and previews TypeSafe AI's post-training approach for automation."
---

# What's Next After RLHF? — Diogo Almeida, TypeSafe AI

## Summary
Diogo Almeida, an OpenAI alum who co-authored GPT-4, ChatGPT, and the original InstructGPT/RLHF work, argues that essentially all deployed LLMs today (he estimates roughly 100%) are RLHF models optimized for human preference, which makes them strong at "assistance" (human-in-the-loop) tasks but structurally unsuited for "automation" (removing the human from the loop) — a divide he uses to explain why frontier models solve hard math problems yet customer service still needs a human to approve costly decisions. He argues Claude Code is still part of the same RLHF-driven "assistance era," not a new paradigm, because its reward asymmetry (always erring toward pleasing the user) means SaaS's underlying building blocks haven't gotten smarter since 2019 — LLMs have only made software cheaper and faster to write ("just-in-time software," a term he credits to Garry Tan), not more expressive. He frames hallucination as intrinsic to RLHF's reward-model asymmetry, comparable to mode-dropping in GANs, since it is easier for a reward model to penalize visible uncertainty than to reward calibrated correctness. His startup, TypeSafe AI, is building a third post-training paradigm distinct from RLHF (optimizing for human preference) and RLVR (optimizing for verifiable correctness) — one optimized for calibrated decision-making aimed at real automation, with a different API shape, expected to launch soon.

## Why it matters
- Gives a sharp assistance-vs-automation framework, backed by a concrete example (unsolved math problems vs. customer service still needing a human), for a chapter distinguishing categories of AI-agent maturity.
- First-hand claim from an RLHF co-inventor that current agentic coding tools like Claude Code remain within the RLHF/assistance paradigm rather than a genuinely new automation paradigm — a citable primary-source view for agent-architecture debates.
- Names a concrete reliability mechanism (reward-model asymmetry causing hallucination, likened to GAN mode-dropping) and a stated business pattern (never let AI make costly decisions; push cost onto the user) — both usable as evidence in an evals/reliability chapter.

## Metadata
- Video: https://www.youtube.com/watch?v=cJ0EOzey--o
- Duration: 18:05
- Playlist index: 977
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Excellent. I will say that um I might speed run through this. Feel free if you don't disag- agree with something to yell out. It's way more fun for me if things get interactive. Um otherwise, I will go through this. Uh first, can I have like a vague show of hands of who knows what RLHF is? Oh, excellent. I might be able to skip through that part quickly and get into the interactive stuff. So, my name's Tiago Almeida. I'm talking about what's next after RLHF. More accurately, I think this should be called what's next after the chat GPT era that I think we're all in. And my hint for you guys is it is not the Claude code era. I will justify this later on, but I actually believe them to be part...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/cJ0EOzey--o.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
