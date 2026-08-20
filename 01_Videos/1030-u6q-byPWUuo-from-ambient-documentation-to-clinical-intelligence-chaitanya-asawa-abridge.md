---
video_id: u6q-byPWUuo
playlist_index: 1030
title: "From Ambient Documentation to Clinical Intelligence — Chaitanya Asawa, Abridge"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=u6q-byPWUuo"
duration: "21:35"
duration_seconds: 1295
view_count: 742
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/u6q-byPWUuo.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:25+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Chaitanya Asawa (Abridge) details clinician-rubric LM judges, small post-trained per-section models, and cost-gated order detection built on 100M medical conversations a year."
---

# From Ambient Documentation to Clinical Intelligence — Chaitanya Asawa, Abridge

## Summary
Chaitanya Asawa, who leads engineering for clinical decision support and agentic experiences at Abridge, traces the company's path from ambient clinical-note generation (SOAP notes that used to cost clinicians about two hours a day of after-hours "pajama time") to a voice-driven assistant that can answer clinical-trial-eligibility questions, place orders like an echocardiogram, and prep next-day charts, now deployed across roughly 300 US health systems including Kaiser, Mayo, and Johns Hopkins. He frames quality, latency, and cost as "hard mode" KPIs in healthcare and describes an eval stack built around expert-calibrated LM judges: because the generator-verifier gap is narrow (unlike a problem such as Sudoku), Abridge has independent physicians write rubrics from real clinical cases, a third physician adjudicate two rubrics into one, and a fourth physician QA it, before an LM judge scores agent responses against the rubric elements — supplemented by separate adversarial/boundary, clinical-safety, and tone judges. For cost and latency at a run rate of 100 million medical conversations a year, Abridge decomposes note generation into small, specific workflows and post-trains smaller models per clinical-note section rather than using one frontier model for everything, and for in-visit order detection it uses cheap, fast gating models to detect trigger events before invoking a heavier order-matching model, to avoid the cost of continuously polling with a large model.

## Why it matters
- Gives a detailed, reusable eval design for high-stakes domains where model-as-judge and model-as-generator are too similar to trust: multi-physician rubric construction plus separate quality/safety/adversarial/tone judges.
- Shows a concrete cost/latency pattern — decomposing one large task into many small post-trained models, and gating expensive model calls behind cheap trigger detectors — grounded in a specific run rate (100M conversations/year).
- Documents a real deployment scale (about 300 US health systems) and staged-rollout practice (offline benchmarks to alpha to beta/A-B to continuous monitoring) for shipping agentic AI where errors have direct clinical and financial consequences.

## Metadata
- Video: https://www.youtube.com/watch?v=u6q-byPWUuo
- Duration: 21:35
- Playlist index: 1030
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Thank you so much for everyone being here. We're going to get started in a second. Um but before we get started, I am curious, how many of you currently work in the healthcare industry in some shape or form? Oh, that's amazing to hear. Uh how many of you are clinicians by training? Okay, a couple. How many people in the room are engineers? Okay, awesome. Um and then how many people have heard of Abridge before? Okay. Awesome. Uh well, I'm going to let you hear actually from our users to start off on a little about Abridge. >> [music] >> Full day of 22 patients, out by 4:30 p.m., >> notes done. That's nice. >> When I think about Abridge, I think the thing that comes to mind is...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/u6q-byPWUuo.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
