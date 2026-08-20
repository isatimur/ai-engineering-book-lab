---
video_id: YgEv7IQzGdM
playlist_index: 1021
title: "How to Kill the Code Review — Ankit Jain, Aviator"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=YgEv7IQzGdM"
duration: "16:26"
duration_seconds: 986
view_count: 5100
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/YgEv7IQzGdM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:09+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Aviator's Ankit Jain argues code review's real job is alignment, not diff-reading, proposing intent capture from agent sessions and an AI slop registry of recurring feedback as its replacement."
---

# How to Kill the Code Review — Ankit Jain, Aviator

## Summary
Ankit Jain (co-founder, Aviator) revisits code review after a five-layer trust model he had previously posted about, arguing the layer he originally missed was alignment: review isn't just bug-catching, it's knowledge sharing, mentorship, and architectural discussion, and that function has to survive even as line-by-line diff review disappears. He cites 861% code churn, a rising incidents-to-PR ratio, review wait times running roughly 4x longer, and more than 30% of changes now merging without any review, and criticizes today's AI-review setups where one AI agent writes the code, another reviews it in a GitHub UI, and a human just skims and merges. He rejects pure spec-driven development as a repeat of 1970s waterfall — no feedback loop, and LLM non-determinism means code won't follow a spec deterministically — arguing instead that real intent lives in the back-and-forth prompts with a coding agent, decisions that get thrown away once a PR is opened, and should instead be captured as acceptance criteria. Paired with an "AI slop registry" of codified, recurring human review comments (so the same issue never has to be flagged twice), those criteria generate a test plan that a verification system runs against a live preview — including an agent browsing the app, filling forms, and capturing screenshots as evidence — shifting the reviewer's job from reading diffs to checking intent, architecture, and verification evidence. Aviator is piloting a product called Verify built on this alignment-plus-verification model, and Jain recommends teams mine their last 1,000 review comments to seed their own AI slop registry.

## Why it matters
- Names concrete, quantified pain points (861% code churn, more than 30% of changes merged unreviewed, roughly 4x longer review wait times) that motivate rethinking code review at agent-driven velocity.
- Introduces two reusable concepts — capturing "intent" from agent conversation sessions rather than the diff, and an "AI slop registry" of codified recurring review feedback — that reframe what a human reviewer should check once AI both writes and reviews code.
- Offers a specific critique of spec-driven development (comparing it to 1970s waterfall) grounded in LLM non-determinism, a useful counterpoint for any chapter covering spec-first or plan-then-code agent workflows.

## Metadata
- Video: https://www.youtube.com/watch?v=YgEv7IQzGdM
- Duration: 16:26
- Playlist index: 1021
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Okay. Ooh, hello. Hey everyone. Thanks for joining in. Today, uh we will be talking about how to kill the code reviews. Everyone's favorite topic. I'm Ankit, co-founder of Aviator. At Aviator, we are building AI code verification platform. So, we'll bring in some of the ideas and concepts that we talked about in the uh that we build in our product. Uh but first, let's dive into a little bit. So, a few months ago, I wrote a post on LinkedIn space about uh how to kill code review, creating a framework, a five-layer trust model. So, this model was focused around how do we actually layer by layer build trust into the code that can then be merged without needing line-by-line review....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/YgEv7IQzGdM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://www.latent.space/p/reviews-dead>
