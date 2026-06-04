---
video_id: fLUtUkqYHnQ
playlist_index: 630
title: "Everything I Learned Training Frontier Small Models — Maxime Labonne, Liquid AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=fLUtUkqYHnQ"
duration: "20:13"
duration_seconds: 1213
view_count: 6703
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/fLUtUkqYHnQ.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-04-29T22:48:31+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Maxime Labonne shares a practical take on Everything I Learned Training Frontier Small Models. A new class of small models is emerging with the ability to reliably follow instructions and call tools while running on-device under 1 GB of memory."
---

# Everything I Learned Training Frontier Small Models — Maxime Labonne, Liquid AI

## Summary
Maxime Labonne shares a practical take on Everything I Learned Training Frontier Small Models. A new class of small models is emerging with the ability to reliably follow instructions and call tools while running on-device under 1 GB of memory.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=fLUtUkqYHnQ
- Duration: 20:13
- Playlist index: 630
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hi everyone, my name is Maxim Labon. Uh in this presentation I want to talk about the lessons I've learned uh pre-raining small models. Um so for context I work at Liquid AI as head of pre-raining. At Liquid, we mostly focus on edge models for ondevice deployment. And as you can see here, we have models from 350 million parameters to 24 billion parameters. So this is very very small. And um yesterday we released our new VLM uh 450M and the week before we released the new version of the 350M model for text. Um so this is what we do. We work across text uh vision and audio and uh yeah the models are available on hugging face if you want to try them out. Um in this presentation I want to talk...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/fLUtUkqYHnQ.txt]]
- Description cue: A new class of small models is emerging with the ability to reliably follow instructions and call tools while running on-device under 1 GB of memory. In this talk, we'll break down how to post-train frontier small models using the LFM2.5 recipe: on-policy preference alignment, agentic reinforcement learning, and curriculum training with iterative model merging. We'll cover training challenges unique to the 1B scale, like doom loops, capability interference, and how to fix them. The goal is to give you a concrete playbook to fine-tune and deploy small models for your own use cases, from structured data extraction to multi-turn tool use.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
