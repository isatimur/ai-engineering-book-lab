---
video_id: lCBf9slCanI
playlist_index: 969
title: "Ending AI Slop — Thais Castello Branco, Taste Labs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=lCBf9slCanI"
duration: "16:30"
duration_seconds: 990
view_count: 284
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/lCBf9slCanI.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:58:01+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Taste Labs founder explains why AI lags on subjective domains (measurability, mode collapse) and how decomposing brand/style into verifiable components with 1,000+ experts enables RL training."
---

# Ending AI Slop — Thais Castello Branco, Taste Labs

## Summary
Thais Castello Branco, founder of Taste Labs (out of stealth a few weeks before this talk), argues that AI's gap on subjective domains — design, creative writing, personality — comes from two properties: capability tracks measurability, and models optimize for the statistical mean while creativity lives at the distribution's tails, producing the "mode collapse" that reads as slop. Taste Labs works two ways: with frontier labs to decide which failure modes should become RL environments versus post-training data problems, and with application-layer companies on context and user intent. Its core method is decomposing fuzzy qualities into verifiable components — for example, breaking a real company's brand (used as a worked example in the talk) into codified colors, typography, motion, and texture so an agent's output can be graded against that ground truth rather than judged wholesale by an LLM-as-judge, which is prone to reward hacking and hallucination. To counter mode collapse in preference data, Taste Labs sources judgments from a community of more than 1,000 domain experts across different styles, deliberately preserving disagreement on subjective axes (style, aesthetics) while treating disagreement on objective axes (alignment) as a data-quality flaw, and ties expert commentary directly to specific code or design elements to cut noise. Her closing recommendation is quality over quantity: a small volume of high-taste, well-decomposed expert data beats a large volume of noisy preference data for training subjective-domain capability.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=lCBf9slCanI
- Duration: 16:30
- Playlist index: 969
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hello everyone. It's great to meet you all. I'm Tais. I'm the founder of Taste Labs. For those of you who don't know us, we came out of Stealth a few weeks ago. Uh, and our whole mission is basically how do we end AI slop? And we believe that to really solve this problem, we have to first decompose and understand subjective domains. Right? I think as probably all of you know, AI has gotten quite good at things like coding and math. Uh but it's still super behind on things like design, creative writing, personality, emotional intelligence. And to understand these domains, I think we have to take a little bit of a different approach than we do with um with objective ones. So our idea is like...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/lCBf9slCanI.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
