---
video_id: UyyOoJmuATU
playlist_index: 1035
title: "Healthcare’s Agent Bytecode: X12 as the Harness for AI Agents — Vasant Kearney, Onlay"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=UyyOoJmuATU"
duration: "20:25"
duration_seconds: 1225
view_count: 479
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/UyyOoJmuATU.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:36+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Vasant Kearney (Onlay) argues the X12 EDI standard grounds healthcare-claims agents like a strict language, and that even agreeing systems can all be wrong about coverage."
---

# Healthcare’s Agent Bytecode: X12 as the Harness for AI Agents — Vasant Kearney, Onlay

## Summary
Vasant Kearney (Onlay) argues that healthcare claims agents need a strict, pre-existing structure to reason against, the way older constrained languages like COBOL or TypeScript give models clear, predictable values to work within — and that structure already exists as X12, the public EDI standard insurers use (e.g., a 270 eligibility request, a 275 for imaging/attachment submission, a 999 syntax acknowledgment, an 835 remittance/EOB), so agents don't need an invented schema. He stresses there's no ground truth in claims data: phone calls, web portals, and X12 responses from an insurer can all agree a patient is covered and still all be wrong once a claim is later denied, so his system treats any claim state as "semi-correct, correct until downstream evidence proves otherwise." For the agent's execution layer, Onlay stores memory in a database rather than locally (unlike Claude Code or Codex-style local memory) because enterprise healthcare needs that separation, and it layers organization-level and user-level memory to learn repeated multi-step workflows for specific users at multi-site health systems — while flagging that persistent memory risks biasing a user toward repeating what they did yesterday, so any inferred default must stay overridable. He also argues for a middle ground between pure agentic reasoning (expensive, slow, and error-compounding across a roughly 50-step claims workflow) and fully hardcoded logic (unmanageable code bloat), and warns against using large, expensive models for routine actions that must run thousands of times a day.

## Why it matters
- Gives a concrete example of grounding agent output in a pre-existing external standard (X12 transaction codes) instead of a model-invented schema, a transferable pattern for other regulated or structured domains.
- Documents a specific reliability failure mode — multiple independent systems agreeing on a wrong answer (patient coverage), with no ground truth to check against — relevant to any discussion of agent trust and verification limits.
- Names concrete engineering tradeoffs (database vs. local agent memory in enterprise settings, org/user memory personalization vs. bias risk, and cost-gating model size against task frequency) that are specific design decisions rather than general advice.

## Metadata
- Video: https://www.youtube.com/watch?v=UyyOoJmuATU
- Duration: 20:25
- Playlist index: 1035
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hey everybody. How's everyone doing today? Good. So, this is a bit about my background, but I think it's always really good to learn what the audience background is if it's more on the technical side, which I know this conference is, healthcare side. Let's get a quick show hands to see who Who here is on the healthcare side? Ooh, wow. That's a lot of you. There's more than I expected. Wow. Okay. Who here is on the technical does the genetic workflows? Wow, okay. Overlap. All right. As should be expected at this conference. Who here has models running right now somewhere doing some work? Wow. It's like the whole audience. Okay. All right. So, I know who I'm talking to. Wonderful....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/UyyOoJmuATU.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
