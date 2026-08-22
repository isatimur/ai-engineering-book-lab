---
video_id: "TquUsN1QsWs"
playlist_index: 187
title: "AI That Pays: Lessons from Revenue Cycle — Nathan Wan, Ensemble Health"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=TquUsN1QsWs"
duration: "18:19"
duration_seconds: 1099
view_count: 1022
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/TquUsN1QsWs.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T11:43:03+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ensemble Health built a custom appeal-letter pipeline with clinician sign-off before payer submission, since off-the-shelf GenAI wasn't sufficient for RCM denials."
---
# AI That Pays: Lessons from Revenue Cycle — Nathan Wan, Ensemble Health

## Summary
Nathan Wan (head of AI, Ensemble Health Partners) argues most healthcare revenue-cycle denials are technical registration and data errors, not medical disagreements, so the highest-leverage fix is upstream data correction rather than a smarter appeal generator. For clinical denials, an off-the-shelf GenAI model could draft an appeal letter but "wasn't sufficient" on its own; Ensemble instead built a custom model and pipeline in partnership with its clinical experts, who retain final say on whether a generated letter meets the quality bar before it goes to the payer. The team reports a 40% reduction in appeal turnaround time and tracks quality via the denial overturn rate, framing this as directly measurable ROI rather than a hand-wavy value claim. A separate obstacle noted is data unification: EMRs mix text, images, labs, notes, and tables across many formats, which the speaker says challenges any multimodal LLM trying to parse them correctly.

## Why it matters
- The domain forced a human-in-the-loop gate: a clinical expert signs off on each AI-drafted appeal before payer submission, rather than trusting model output standalone.
- Off-the-shelf GenAI was explicitly insufficient for the regulated appeal-writing task; a custom model/pipeline built with clinical experts was needed.
- The stated ROI metrics (turnaround time, denial overturn rate) are transcript-grounded figures tied to the regulated payer/provider process, not generic model benchmarks.

## Metadata
- Video: https://www.youtube.com/watch?v=TquUsN1QsWs
- Duration: 18:19
- Playlist index: 187
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] So great to be here today. U excited to talk to you about a little bit of the healthare system that often gets overlooked. It's part of the healthare system. A system that actually continues to grow in multiple dimensions. Over the past couple of decades, its size, cost, and complexity outpace many other benchmarks. That's because right now 40% of hospitals operate at a negative margin. Let me put it another way. Almost half the hospitals in the country are losing money. It's uh and it's not because of the clinical costs. It's because of the broken and manual processes around the revenue cycle. There's delays, denials, a lot of rework, a lot of lost revenue. My name is Nathan. I'm...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/TquUsN1QsWs.txt]]
- Description cue: While much of the AI innovation in healthcare has centered on clinical and patient-facing applications, Revenue Cycle Management (RCM) remains an underexplored yet critical domain. Given the...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
