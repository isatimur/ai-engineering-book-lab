---
video_id: "ju73sWVtvU0"
playlist_index: 617
title: "Building AI For All: Amjad Masad & Michele Catasta"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ju73sWVtvU0"
duration: "25:13"
duration_seconds: 1513
view_count: 2348
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/ju73sWVtvU0.txt"
themes:
  - "Models & Inference"
  - "Coding Agents"
ingested_at: "2026-04-24T12:26:38+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Amjad Masad, Replit's CEO, argues AI should not be a paid add-on but part of every programming interaction, and announces AI for all Replit users plus Model Farm, inference in three lines of code. Michele Catasta, head of AI, rebuts the claim that small GPU-poor models are pointless: Replit's 3.3B code model, trained from scratch on 1 trillion tokens of carefully filtered, permissively licensed code repeated over epochs, beats a peer 3B model, nears a model twice its size, and its Replit-tuned variant hits 36% on HumanEval. The model targets sub-250 ms P95 latency, over 200 tokens per second, and two-minute deploys."
---
# Building AI For All: Amjad Masad & Michele Catasta

## Summary
This opening keynote has two halves. Amjad Masad, co-founder and CEO of Replit, makes the product case; Michele Catasta, head of AI at Replit, makes the model case.

**Masad: AI in every interaction**
He traces programming from punch cards to text, a "10x Improvement if not 100", then IDEs; Replit once gave every user language-server intelligence despite the CPU and RAM cost. Today's AI coding tools give some people perhaps 50 to 100% gains, and he expects 10x, 100x, perhaps 1,000x over the next decade. Replit's mission is access, to "empower the next billion developers", so he rejects AI as add-ons with "cute names" that only some users get. AI must be infused in every programming interaction and be the default. The announcement: AI for Replit's millions of users, including people coding on Android phones, which he calls the biggest deployment of AI-enhanced coding, "burning as much GPU as we're burning CPU". Because AI in the call stack also creates value, Model Farm offers model inference inside the IDE in three lines of code, free until year end, starting with Google Cloud models.

**Catasta: small models are not a waste**
An industry analysis had argued that training small models on few GPUs is meaningless. Catasta disagrees. Replit's code completion runs on its own model, kept under 250 ms P95 latency so completion feels instant. Following the Chinchilla insight that models were undertrained, the team trades training compute for inference speed: up to 300 tokens per parameter and 1 trillion tokens of code (about 200 billion tokens across five epochs, plus a linear cool-down), 30 languages and developer Q&A posts.

**Data is the secret ingredient**
Starting from BigCode's The Stack, which keeps only permissively licensed code, they filtered out auto-generated, minified and unparseable code and toxic content on Spark. A paper on data-constrained scaling showed loss after four or five repeats is comparable to fresh data, which let them use a small, high-quality, permissively licensed subset many times, so the model can ship open source under a commercial licence.

**The model**
Version 1.5 is 3.3B parameters, 4K context, a 32K code-specific vocabulary for better compression, trained on 128 H100s, with fast attention and grouped-query attention. It tops StarCoder 3B in every listed language and comes close to a 7B code model from Meta with twice the size and 2.5x the data. A variant further trained on public Replit code (30 billion tokens, three epochs, a cut-off weeks old) reaches 36% pass@1 on HumanEval, a score he says once took a model almost 200x larger.

**Built for inference**
The goal is speed, not benchmarks: above 200 tokens per second on one model with no batching, tuned for an optimised GPU serving stack. Deploys fell from 18 minutes to two, so scaling can follow traffic spikes; the switch flipped for all users minutes after the announcement. Open-sourcing the first version brought fine-tunes and local, privacy-aware completion tools. Coming next: an instruction-tuned version on 210,000 coding instructions, a fill-in-the-middle format aware of the syntax tree, and hosting on Perplexity's labs.

## Why it matters
- It is a concrete case for small, inference-optimised models: training past the compute-optimal point to buy sub-250 ms P95 latency and over 200 tokens per second.
- The data recipe, aggressive filtering plus repeating a small permissive subset over epochs, shows data quality and licensing shaping model strategy together.
- Cutting deploy time from 18 minutes to two links serving infrastructure directly to whether a free AI feature can reach millions of users.
- Masad's argument that AI must be the default, not a paid add-on, frames access as a product decision for coding tools.
- The Replit-tuned variant with a recent cut-off shows a vendor using its own user code to keep a model current on new libraries.

## Metadata
- Video: https://www.youtube.com/watch?v=ju73sWVtvU0
- Duration: 25:13
- Playlist index: 617
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Coding Agents]]

## Transcript excerpt
> [Music] excited to be here I agree with uh swix and Ben that it feels like feels like a moment it feels like a historical moment here um my name is amjad I'm the co-founder of repet where we aspire to be the fastest way to get from an idea to a deployed software that you can scale so I'm going to take you back a little bit not like swix to the 6 600 AD but perhaps to the start of computing all right so um very early computers the eniac was the first your in complete uh you know programmable uh vum and machine computer the way you programmed it is like you literally punched cards um not physically but you had a machine that sort of punched these cards these are sort of binary code for the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ju73sWVtvU0.txt]]
- Description cue: What is the future of Software Engineering in the age of AI? Amjad Masad, Founder & CEO of Replit, and Michele Catasta, head of AI at Replit, provide their take on this in this opening keynote...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Coding Agents**.
