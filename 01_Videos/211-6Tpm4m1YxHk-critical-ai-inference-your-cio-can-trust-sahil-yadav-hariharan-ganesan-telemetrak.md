---
video_id: "6Tpm4m1YxHk"
playlist_index: 211
title: "Critical AI Inference your CIO can Trust — Sahil Yadav, Hariharan Ganesan, Telemetrak"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=6Tpm4m1YxHk"
duration: "19:04"
duration_seconds: 1144
view_count: 665
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/6Tpm4m1YxHk.txt"
themes:
  - "Org Design & Leadership"
  - "Models & Inference"
ingested_at: "2026-04-24T11:44:09+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sahil Yadav and Hariharan Ganesan (Telemetrak) argue that mission-critical AI fails silently and expensively, and that teams need an MLOps extension they call XTOPS with four parts: traceability, plain-English explanations, adaptive guardrails and human-in-the-loop playbooks. They propose two metrics for CIOs, mean time to resolve explainable errors and trust-adjusted risk in dollars. A worker-safety case study shows GPS drift causing 70% false-positive alerts that workers learned to ignore; the fix took 8 months, and the resulting framework targets 7 days and saved about 500k dollars in fines per site per year."
---
# Critical AI Inference your CIO can Trust — Sahil Yadav, Hariharan Ganesan, Telemetrak

## Summary
Sahil Yadav and Hariharan (Hari) Ganesan have deployed AI for ten years in health monitoring, industrial IoT and telecom network automation. Their thesis: AI in mission-critical systems fails silently, the cost of those failures is large and hard to see in advance, and trust must be built into the AI life cycle and priced in a language a CIO understands.

**The governance gap**
They cite surveys that 78% of companies adopt AI and 95% invest in it, but only 11% focus on AI governance. Their examples of silent failures: an AI decision that caused a telecom network outage, a gas sensor that misread data and put lives at risk, and a supply-chain AI that got SKUs wrong and lost millions.

**The pillars of trust**
- Show its work: every important decision comes with a simple English explanation that a user, decision maker or auditor can act on without a data scientist.
- Adaptive control: smart guardrails that slow the system down, change course or call a human when it drifts. Hari calls it "a lane assist for your AI".
- Human in the loop: roles and playbooks so the right expert gets pinged at the right time with the right information.
- Traceability underneath all three: every piece of data and every change is digitally signed and trackable, like a software bill of materials or a tracked parcel.

**XTOPS**
They call their life-cycle approach XTOPS, which Hari describes as MLOps "with built-in conscience". Data gets verifiable lineage. Models are trained to explain themselves so that drift in their reasoning shows. Deployment adds automatic guardrails. Operations add human-AI teaming and fast click-to-fix feedback. Compared with standard MLOps it offers context-aware guardrails instead of static IAM and security policies, and trust dashboards that leadership and boards can read. They stress that adoption is a journey, not a switch.

**Metrics a CIO can use**
- MTRE, mean time to resolve explainable errors: how fast the team understands why something unexpected happened and ships a fix. They say this can take months today, while a biased model keeps doing damage.
- Trust-adjusted risk in dollars: the business cost when trust breaks, from fines, engineering effort, regulatory scrutiny and lost brand value. A serious privacy or credit-bias incident can reach 700 million dollars.

**Case study: worker safety**
Yadav previously worked at a worker-safety company (captioned as Guard Hat) that built wearable IoT devices. They sent health and environmental data to a backend AI that predicted incidents. GPS input caused 70% false positives, so workers stopped reacting to alerts, which created safety and liability risk. Without the framework, about 70% of resolution time went to finding the problem and 20% to finding a fix, and nothing detected GPS drift. With it, the target flow is: day zero an ignored alert, day two attribution telemetry flags the anomaly, day seven a fix or a GPS reroute ships. The real fix took 8 months, and the framework that came out of it became an enterprise standard. Risk exposure was about 2.5 million dollars per site per year, and the work saved about 500k in fines per site per year. False alerts fell and the trust score rose. In Q&A they admit reputational damage is very hard to quantify.

## Why it matters
- The 70% false-positive GPS case is a concrete example of alert fatigue: a bad input made users ignore a safety system, which turned a model problem into a liability problem.
- MTRE and trust-adjusted risk in dollars give a way to report AI reliability to executives in time and money instead of model metrics.
- The honest gap between an 8-month real fix and a 7-day target shows that explainability and drift telemetry must exist before the incident, not after.
- The talk frames guardrails, explanations and human escalation as one life-cycle discipline on top of MLOps, useful for a chapter on operating AI in regulated or safety-critical settings.

## Metadata
- Video: https://www.youtube.com/watch?v=6Tpm4m1YxHk
- Duration: 19:04
- Playlist index: 211
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Models & Inference]]

## Transcript excerpt
> [Music] Hey guys, thanks for being here. I'm Sahil. Uh I am here with Hari. We're we're presenting on AI. Um obviously we're talking about trust, but let me give you a little background about us. Um over the past 10 years we have deployed AI in various industries from from health um monitoring to industrial IoT to uh network automation in telecom networks and uh there's been one question that has been asked all along all this time can we trust AI some of these systems are used in mission critical applications but the question really is can we trust the inferences of the these AI systems because they are impacting businesses, they're impacting business decisions and the bottom line at the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/6Tpm4m1YxHk.txt]]
- Description cue: Enterprise AI adoption is accelerating, but with it comes a hard question: Do we trust the model’s decisions? In this 18-minute talk, I’ll explore the invisible risks behind automated decision-...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **Models & Inference**.
