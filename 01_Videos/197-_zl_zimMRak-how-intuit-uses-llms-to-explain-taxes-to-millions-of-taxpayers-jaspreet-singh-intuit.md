---
video_id: "_zl_zimMRak"
playlist_index: 197
title: "How Intuit uses LLMs to explain taxes to millions of taxpayers - Jaspreet Singh, Intuit"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_zl_zimMRak"
duration: "18:59"
duration_seconds: 1139
view_count: 1038
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/_zl_zimMRak.txt"
themes:
  - "RAG & Retrieval"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T11:43:30+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Intuit keeps LLMs out of tax calculations, using a deterministic tax engine for the numbers and a guardrail model to catch hallucinated figures before they reach the taxpayer."
---
# How Intuit uses LLMs to explain taxes to millions of taxpayers - Jaspreet Singh, Intuit

## Summary
Jaspreet Singh (Intuit) describes TurboTax's tax-explanation assistant, and the central design decision is architectural: the LLM never calculates a tax number — every figure comes from Intuit's proprietary, deterministic tax knowledge engine, and a separate guardrail ML model checks each LLM-generated explanation against those numbers to catch hallucination before it reaches the user. In-house tax analysts act as the prompt engineers and build the initial manual, golden-dataset evaluations that automated LLM-as-judge scoring is later trained against, precisely because a wrong number carries legal liability — a point an audience question raised explicitly and Singh confirmed Intuit "focuses heavily on legal and privacy controls." Model changes are treated as high-risk events: even upgrading between versions of the same vendor's model (Claude Instant to Claude Haiku) required a full re-evaluation cycle, and IRS form changes each tax year force the underlying knowledge engine and prompts to be rebuilt annually. Latency is a load-bearing product constraint, not a nuisance — complex tax situations balloon prompt size, and combined with April 15 filing-deadline traffic spikes, this forced explicit fallback UX design rather than an assumption of fast LLM responses.

## Why it matters
- The verification mechanism is architectural, not just prompted: keep the LLM out of the calculation path entirely and gate its explanatory text with a dedicated hallucination-checking model before it reaches a taxpayer.
- Domain experts (tax analysts) are folded into the pipeline as prompt engineers and as the source of the golden eval set — legal liability for a wrong number is the stated reason.
- Regulatory cadence (IRS forms change yearly) and seasonal traffic (the April 15 filing deadline) are treated as recurring engineering constraints, not one-off features.

## Metadata
- Video: https://www.youtube.com/watch?v=_zl_zimMRak
- Duration: 18:59
- Playlist index: 197
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] Hi, I'm Jaspit. I'm a senior staff engineer in it. I work on Genifi for Turboax. And today we'll be talking about how we use LLMs at Inuit to well help you understand your taxes better. So I think uh to just to understand the scale right uh into Turboax successfully processed 44 million tax returns for tax year 23 and that's really the scale we're going for. We want everybody to be have high confidence in how their taxes are filed and understand them that they are getting the best deductions uh that they can. So, so this is the experience that we work on. So uh you go into Turboax, you uh enter your information, then you go through what credits you are eligible for and so on. And we...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_zl_zimMRak.txt]]
- Description cue: I will talk about how Intuit uses LLMs to explain tax situations to Turbotax users.

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Org Design & Leadership**.
