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
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:27+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Rashi Agrawal, who leads AI and ML at Hinge Health, argues that most health AI safety failures are architectural decisions made before any token is generated, not model failures. Her three layers: strip PHI at ingestion, before it reaches the data lake; put must-not-fail decisions (911 or 988 escalation, intent routing, identity checks) in a code layer that runs before the model on every turn, because 'a model with a system prompt is also not a guardrail'; and score live traffic continuously with judges, member feedback and sampled traces. She adds five rules for ship-or-hold calls, and a habit: check the judge before you change the agent."
---

# Guardrails First: Engineering Member-Facing Health AI — Rashi Agrawal, Hinge Health

## Summary
Rashi Agrawal leads AI and ML at Hinge Health. She gives a practitioner's view of the guardrails member-facing health AI needs. She opens with the "production baseline". A 60-year-old man asked an AI assistant how to cut salt, was told to swap it for sodium bromide, and spent three weeks in hospital with bromide levels 200 times the safe limit. A Mount Sinai safety test found a consumer health AI under-triaged life-threatening emergencies, such as diabetic ketoacidosis and respiratory failure, 50% of the time. ECRI named AI chatbot misuse the number one health technology hazard of 2026. Her claim: these are architecture failures, not model failures.

**Layer one: protect PHI by architecture, not policy**
Most teams redact PHI when a log reaches a dashboard. She strips it at the pipeline boundary, at ingestion, so "the PHI was never there". Production and non-production have no pipes between them, because one pipe can leak member data into dev. Access depends on role and geographic region, and engineers outside the regulated region cannot reach raw PHI. HIPAA, FDA good machine learning practice and state laws are design inputs, not add-ons.

**Layer two: deterministic rules above the model**
"What can never be wrong cannot be left to probability." A code layer runs first on every turn and makes the irreversible calls; the model handles the long tail. She notes that the labs publish an authority hierarchy (root, system, developer, user, guideline), and every layer above user is "one prompt injection away" from override. Three examples:
- Emergency escalation: self-harm, suicidal ideation or acute emergencies route to 911 or 988, and the model never sees the turn.
- Intent routing: the model may help classify, but high-stakes paths (clinical versus tech support, education or exercise) take a deterministic route.
- Identity verification: an authentication check, because authentication is a security boundary and prompts are not.

**Layer three: continuous evaluation**
Pre-launch evals are necessary but not enough. In production she uses 30 to 40 or more automated judges on live traffic (clinical accuracy, safety, escalation, drift, refusal), thumbs up or down on every message as the "truth signal", and sampled traces with 100% sampling of high-stakes cases. The bottleneck is "having enough people to read the signal". Some failures return after every fix, so each new production failure becomes a new judge.

**Deciding when architecture is not enough**
She describes one open issue five days before launch, with clinical, legal, compliance, product and engineering each seeing a different risk. Her five rules:
1. Worst plausible case sets severity, not the average.
2. Severity is not capacity. Fix it, delay, or accept the risk with explicit sign-off; never quietly downgrade.
3. Asymmetric default: hold for safety bugs, ship for polish bugs.
4. Calibrate to revealed risk tolerance, meaning what already ships, not stated tolerance.
5. Humans are the constraint, and fast follows are committed debt.

**Verify the scorer**
A clinical accuracy judge drops from 4.9 to 4.5. Before changing prompts, ask whether the judge is right. When an agent gave the FDA-standard caffeine limit of 400 mg with a caveat for pregnancy and medication, the judge wrongly flagged a hallucination, so fix the judge. When the agent said 1,000 mg a day was fine, the judge was right, so fix the agent. Her summary: "Don't prompt what you can code."

## Why it matters
- Gives a crisp rule for where guardrails belong: irreversible, must-not-fail decisions go in code that runs before the model, not in the system prompt.
- PHI stripped at ingestion instead of redacted at display is a concrete pattern for any regulated-data pipeline.
- The five ship-or-hold rules are a reusable decision framework for launches where stakeholders see different risks.
- The caffeine example is a clear case for treating LLM judges as software to verify and fix, not as ground truth.
- Names human reviewer capacity, not compute, as the limit on continuous evaluation.

## Metadata
- Video: https://www.youtube.com/watch?v=YXEqC05WEI0
- Duration: 21:49
- Playlist index: 1031
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hello and good morning. Chetana gave us a great overview of you know what a bridge does. Today I'm here to talk more from a practitioner's view of you know how we are building health care AI within Hinge Health. So hi, I'm Rashi Agarwal. I lead AI and ML at Hinge Health and today I will be talking about guardrails that are needed to build member-facing health care AI. I want to talk a little bit about the state of health care AI right now. We do have a lot of frontier models which are running and believe it or not, 40 million people actually use these models for triaging their health care issues. But there is a caveat and these are some of the headlines that have been happening...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/YXEqC05WEI0.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://sessionize.com/rashiagrawal>
