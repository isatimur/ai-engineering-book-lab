---
video_id: b_PmGocP4rc
playlist_index: 934
title: "Evaling Video Slop — Maor Bril, Character.ai"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=b_PmGocP4rc"
duration: "23:13"
duration_seconds: 1393
view_count: 967
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/b_PmGocP4rc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:22:30+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Character.ai's Maor Bril describes distilling a slow LLM-as-judge video eval pipeline into a small pairwise-trained VLM (JudgeJudy) that scores generated video on axes like storytelling and physics."
---

# Evaling Video Slop — Maor Bril, Character.ai

## Summary
Maor Bril (Character.ai) argues that video-generation quality (Kling, SeaDance, Veo, Sora) outran the tooling to judge it: frame-level metrics like CLIP score and LPIPS check per-frame prompt match and inter-frame drift but say nothing about whether a video tells its intended story, and full LLM-as-judge scoring is slow, expensive, and prompt-sensitive. Character.ai's fix was to build a repeatable benchmark combining frame metrics with human-calibrated LLM-as-judge scores, then distill that "committee of experts" into a small Qwen-based VLM (~3 seconds to score a 15-second clip) so evaluation could run inside the generation loop and catch drift early, when it's cheapest to fix. A first version of that model was confidently wrong — scoring a static 4-second shot 9.2 on camera work, and rating hovering-ghost physics as "great" — because it had learned to score overall coherence/"vibe" rather than the specific axes (storytelling, physics, pacing) it was meant to grade; the fix was training on paired comparisons (A vs. B, not absolute 1–10 scores) using real-footage-vs-AI-footage pairs with matched encoding, deliberately avoiding an AI-detector shortcut. Character.ai has since moved from a fixed evaluation pipeline to an agentic workflow where the generation agent has its own tools to validate and self-correct its output, since a fixed pipeline doesn't cover the long tail of user-specific stories, characters, and voices. Bril's stated takeaways: score relative (pairwise) rather than absolute, evaluate the specific axes you care about instead of expecting them to emerge, and put eval as close to the generation loop as possible; he also notes lip-sync scoring remains unsolved.

## Why it matters
- A concrete, named failure mode — a judge model that confidently scores "vibe"/coherence instead of the intended axes — is a specific cautionary case for any chapter on building custom eval judges, not just video ones.
- "Score relative, not absolute" (pairwise training beats 1–10 rubrics) and "put eval inside the generation loop" are transferable eval-design principles that extend beyond video to any generative pipeline needing fast, cheap, in-loop scoring.
- The build-vs-distill economics (frontier LLM-as-judge vs. a small dedicated VLM) ground the recurring cost/accuracy/latency trade-off in eval infrastructure with real numbers (~3 sec/clip) and an explicit unit-economics framing tied to generation volume.

## Metadata
- Video: https://www.youtube.com/watch?v=b_PmGocP4rc
- Duration: 23:13
- Playlist index: 934
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> So, hi. I'm Mayur. I've been with Character for a bit over 2 years and we'll talk about AI slop, right? I think that, you know, when we look at video generations as a whole, right? We have like two kind of uh parallel tracks. One is the the video generation, which became insanely good from from models like Kling and SeaDance and VEO and Sora. We still remember Sora. But but but the part that got left behind is how we evaluate the quality of the video that was generated, right? So, on on the one hand, um we we we still kind of squint at it and decide whether or not it's it's good, but on the other hand, we know that the generation has gotten a lot better. And when when we when we...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/b_PmGocP4rc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/character-ai/judgejudy>
