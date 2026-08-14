---
video_id: ewtOo0scUh0
playlist_index: 974
title: "Data and Environment Curation for Post-Training LLMs — Mahesh Sathiamoorthy, Bespoke Labs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ewtOo0scUh0"
duration: "19:12"
duration_seconds: 1152
view_count: 697
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ewtOo0scUh0.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-04T17:21:40+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Bespoke Labs' Mahesh Sathiamoorthy details the Open Thoughts data-curation recipe (multi-answer sampling beats more questions) and a Credit Karma post-training case that fixed compliance and latency."
---

# Data and Environment Curation for Post-Training LLMs — Mahesh Sathiamoorthy, Bespoke Labs

## Summary
Mahesh Sathiamoorthy, co-founder/CEO of Bespoke Labs and a former Google DeepMind researcher, walks through Bespoke's open-source curation work: Curator (a synthetic SFT data-curation tool), Bespoke Stratos, and the multi-university Open Thoughts consortium (with Stanford, UC Berkeley, and UW) that built a published reasoning-data curation recipe with a demonstrated scaling law — cited in public by Microsoft's CSO and referenced by John Schulman as used internally at Thinking Machines. Two counterintuitive findings from that recipe work: sampling many answers per question (e.g., answering one question 16 times) beat collecting more unique questions answered once, and stronger models are not consistently better teachers than weaker ones — a pattern that repeated when the team moved on to "Open Thoughts Agents," curating trajectories and RL environments rather than model answers, where SFT still drove most of the gains and RL contributed mainly the last few percentage points. He gives one concrete enterprise post-training case: Intuit's Credit Karma app, which explains why a credit card was recommended, had a compliance problem and a latency problem, because it needed a long list of compliance rules and its training data was imbalanced (e.g., mostly 0% APR examples caused the fine-tuned model to hallucinate specific numbers). Bespoke's fix was a curation recipe that added structured tags to the training data so the model learned the required form rather than memorizing specific numbers, which improved compliance, latency, and throughput and let the enterprise "own" the model instead of depending on increasingly expensive frontier APIs. He closes by sketching an emerging reference stack for post-training agents: an RL-environment layer (building, quality-measuring, versioning), a compute/orchestration layer below it (sandboxes, rollout checkpointing/rollback for long-horizon tasks), and an SFT/RL/prompt-optimization layer on top.

## Why it matters
- The Credit Karma case is a rare concrete, named example of enterprise post-training paying off in production (compliance, latency, throughput gains) rather than a research demo — useful counter-evidence to claims that post-training is mostly a frontier-lab activity.
- The two counterintuitive curation findings (multi-answer sampling beats more questions; stronger teacher models aren't always better teachers) are specific, testable claims for a chapter on data/RL-environment curation methodology.
- The three-layer reference stack (RL environments → compute/orchestration/checkpointing → SFT/RL/prompt-optimization) gives the book a concrete architectural sketch of what "post-training infrastructure" looks like in practice, complementing the Prime Intellect talk in this same batch.

## Metadata
- Video: https://www.youtube.com/watch?v=ewtOo0scUh0
- Duration: 19:12
- Playlist index: 974
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hey everyone, um today I'll be talking about data and uh environment curation for uh post- training LLMs. And I am Mahesh Satyimi. Um I'm co-founder and CEO of Bespoke Labs. And previously I was a researcher and uh engineer at uh Google deep mind. So very briefly I will tell you a little bit about uh bespoke and uh after that the talk will be mostly around uh opensource work we have done. So bespoke is an applied data research lab with a mission to help enterprises and frontier labs access high quality data and RL environments for their post training needs. So very briefly what we do and what we have done is that last year we put out something called curator which is a tool for curating uh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ewtOo0scUh0.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
