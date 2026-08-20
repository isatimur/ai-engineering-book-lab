---
video_id: YXEqC05WEI0
playlist_index: 1031
title: "Guardrails First: Engineering Member-Facing Health AI — Rashi Agrawal, Hinge Health"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=YXEqC05WEI0"
duration: "21:49"
duration_seconds: 1309
view_count: 833
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/YXEqC05WEI0.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:27+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Rashi Agrawal (Hinge Health) argues health AI safety needs a deterministic code layer above the model, PHI stripped at ingestion, continuous eval, and explicit rules for shipping under risk."
---

# Guardrails First: Engineering Member-Facing Health AI — Rashi Agrawal, Hinge Health

## Summary
Rashi Agrawal, who leads AI/ML at Hinge Health, opens with three cited incidents — a man hospitalized for three weeks after an LLM told him to replace dietary salt with sodium bromide (bromide levels 200x the safe limit), a Mount Sinai audit finding a consumer health AI under-triaged life-threatening emergencies (DKA, respiratory failure) 50% of the time, and ECRI naming AI chatbot misuse the #1 health technology hazard of 2026 — to argue these are architectural failures, not model failures. Her prescription has three layers: strip PHI at pipeline ingestion (not redact it later at the dashboard), with production and non-production environments never connected and access gated by role and region; put irreversible decisions (911/988 emergency escalation, intent routing between clinical/tech-support/education paths, identity verification) in a deterministic code layer that runs before the model on every turn, since "a model with a system prompt is not a guardrail" and prompt-injection can override anything above the user in a lab's stated authority hierarchy; and run continuous evaluation on live traffic via automated judges (30-40+ dimensions), member thumbs-up/down feedback, and 100%-sampled high-stakes traces, noting the real bottleneck is having enough people to act on signals, not compute. For shipping decisions under stakeholder disagreement, she gives five rules: worst plausible outcome sets severity (not average-case frequency), severity is independent of team capacity, default to holding for safety bugs but shipping for polish bugs, calibrate to an org's revealed (not stated) risk tolerance, and treat humans as the scaling constraint since judges can be gamed or miscalibrated (illustrated by a judge wrongly flagging FDA-standard 400mg caffeine guidance as a hallucination versus correctly flagging a 1,000mg/day answer as unsafe) — meaning a dropping score should first prompt "is the judge right?" before the agent itself is changed.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=YXEqC05WEI0
- Duration: 21:49
- Playlist index: 1031
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hello and good morning. Chetana gave us a great overview of you know what a bridge does. Today I'm here to talk more from a practitioner's view of you know how we are building health care AI within Hinge Health. So hi, I'm Rashi Agarwal. I lead AI and ML at Hinge Health and today I will be talking about guardrails that are needed to build member-facing health care AI. I want to talk a little bit about the state of health care AI right now. We do have a lot of frontier models which are running and believe it or not, 40 million people actually use these models for triaging their health care issues. But there is a caveat and these are some of the headlines that have been happening...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/YXEqC05WEI0.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://sessionize.com/rashiagrawal>
