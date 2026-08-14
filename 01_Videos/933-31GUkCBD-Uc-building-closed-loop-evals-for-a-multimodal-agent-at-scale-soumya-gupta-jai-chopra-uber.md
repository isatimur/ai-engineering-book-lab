---
video_id: 31GUkCBD-Uc
playlist_index: 933
title: "Building Closed-Loop Evals for a Multimodal Agent at Scale — Soumya Gupta & Jai Chopra, Uber"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=31GUkCBD-Uc"
duration: "21:39"
duration_seconds: 1299
view_count: 5800
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/31GUkCBD-Uc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:22:28+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Uber Eats' multimodal photo pipeline for its ~$90B marketplace uses routing, editing, and QA agents with a closed-loop, human-labeled auto-tuning system to fix drift with no human in the loop."
---

# Building Closed-Loop Evals for a Multimodal Agent at Scale — Soumya Gupta & Jai Chopra, Uber

## Summary
Soumya Gupta and Jai Chopra of Uber's computer vision team describe the multimodal agent pipeline that edits merchant food photos for Uber Eats, a marketplace with roughly $90B in yearly run rate, millions of new items added monthly, 20% year-over-year growth, and operations across 10,000 cities. The pipeline chains an image-understanding-and-routing agent — which classifies photos as enhance-or-skip, is evaluated with a precision/recall confusion matrix, and is guardrailed on recall so bad images can't slip through — into an image-editing agent that iterates against a QA agent's feedback for up to K rounds (measured by a pass@K metric via pairwise comparison of input vs. output image), followed by a final publish-ready QA gate deliberately built as a redundant "Swiss cheese model." Human-labeled data is treated as ground truth: production samples are periodically re-labeled, compared against agent outputs, and any mismatch triggers a diagnoser agent that localizes the failing component and calls a two-agent auto-tuning loop — a "reflect" agent that surfaces systemic issues and a "synthesize" agent that updates the agent's config — with new versions re-benchmarked against the golden dataset before being registered to a production agent store, with no human in the loop. Documented failure modes include a routing agent hallucinating two extra chicken wings to match a menu description reading "eight pieces," an editing agent adding shrimp that wasn't in the original photo (a faithfulness failure), removing a garnish (a completeness failure), and a reward-hacking pattern where an agent overcorrects from a rejected creative edit into an overly generic, conservative plate. The team logs every stage in a flat JSON structure from the start and ultimately tracks marketplace-level metrics like cart-add and order-completion conversion, sliced by geography, device type, and dish type.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=31GUkCBD-Uc
- Duration: 21:39
- Playlist index: 933
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> My name is Jay and I'm here with Sonya. We are part of the computer vision team at Aruba. We're going to talk to you about a real world production use. Oh, my son done. Okay. Try again. Okay. Don't worry. I'll I'll manage. You hear me now? Okay, so we're going to talk to you today about a real world production use case and specifically we're going to dive into how we design the e-bows and the e-bow loops. So All right, cool. So just before we get into the agent design, we're going to talk about a little bit about the use case. So our delivery marketplace Uber Eats, we do about 90 billion run rate per year at the moment. We were adding millions of items to the marketplace each and...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/31GUkCBD-Uc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
