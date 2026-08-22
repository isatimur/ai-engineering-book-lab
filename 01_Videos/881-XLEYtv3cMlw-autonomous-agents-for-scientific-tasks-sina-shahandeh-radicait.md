---
video_id: XLEYtv3cMlw
playlist_index: 881
title: "Autonomous Agents for Scientific Tasks - Sina Shahandeh, Radicait"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=XLEYtv3cMlw"
duration: "19:23"
duration_seconds: 1163
view_count: 1600
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/XLEYtv3cMlw.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:31+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Radicait's in-silico-PET work shows coding agents plateau on open-ended science; the fix was explicit hypothesis hierarchies plus a separate model to QC scan images."
---

# Autonomous Agents for Scientific Tasks - Sina Shahandeh, Radicait

## Summary
Sina Shahandeh (Radicait) works on generating synthetic PET scans from CT scans ("in-silico PET," used to help judge whether a lung nodule is cancerous) and uses this as the case study for why coding agents plateau on open-ended, long-horizon scientific problems even though they handle straightforward implementation and hyperparameter search well: they run out of "research taste" — novel hypotheses such as switching a 2.5D convolutional architecture to a 3D one — and a plain "optimize this codebase" prompt in the Karpathy-style auto-researcher pattern saturates after a few iterations. His fix is to make hypothesis generation explicit rather than implicit: decompose the problem into a documented hierarchy of components (data, architecture, training loss, metrics, operational scripts), have the coding agent reason over that hierarchy, and generate and critique many candidate changes against it — a process that produced the 3D-convolution idea the plain loop never reached. For a separate step, image registration/alignment quality control, he notes that no current LLM is trained well enough on scientific or medical imagery to reliably notice something like a small lung nodule, so he built a dedicated skill that calls a separate multimodal model to review each generated image and flag misalignment, and routes hypothesis generation and critique to a stronger reasoning model (referred to as GPT-5.5 Pro, accessed through a tool called Oracle CLI) rather than trusting the coding agent's own judgment. He frames the core bottleneck as a lack of scientific "observation" capability in current multimodal models, not the implementation/coding part, which he considers largely solved already.

## Why it matters
- The domain — open-ended, long-horizon scientific research rather than a bounded coding task — forced an explicit hierarchical hypothesis-generation step, because agents plateau on hill-climbing alone once the problem needs a genuinely new idea.
- A concrete domain gap drove a specific architecture choice: current multimodal models aren't trained on scientific/medical imagery well enough to reliably catch something like a small lung nodule, so a separate model-review skill and escalation to a stronger reasoning model were built into the loop instead of trusting the base agent.
- No regulation, audit, or compliance process is named here — the constraint is scientific-task open-endedness and model limitations on scientific imagery, a different kind of "domain forcing" than the compliance/verification cases elsewhere in this batch, worth flagging as such.

## Metadata
- Video: https://www.youtube.com/watch?v=XLEYtv3cMlw
- Duration: 19:23
- Playlist index: 881
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hello everyone, my name is Sina Shahande. I quite my pleasure to present you this talk about uh running autonomous agents for scientific tasks. Um let's let's dive in. Um so here um I think everyone is quite familiar with the concept of auto researcher or auto research. This is the original Andre carpat is um GitHub repo where we have a ML model and we ask a coding agent to uh find def find a particular metrics and then optimize the code in order to minimize the error basically do a hill climb over model optimization. Now for many of these coding tasks um this works very well but when the problems become very much open-ended and um sometimes a long horizon like most of the scientific task...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/XLEYtv3cMlw.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
