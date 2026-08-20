---
video_id: AN65uc645mE
playlist_index: 1034
title: "200 Million Patient Interactions Later — Vivek Muppalla, Hippocratic AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=AN65uc645mE"
duration: "20:40"
duration_seconds: 1240
view_count: 573
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/AN65uc645mE.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:34+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Hippocratic AI's Vivek Muppalla details Polaris, a 31-model voice constellation behind 200M+ patient calls, reporting 99.89% vs 81% human accuracy on a safety rubric and lower transcription error."
---

# 200 Million Patient Interactions Later — Vivek Muppalla, Hippocratic AI

## Summary
Vivek Muppalla (engineering lead, Hippocratic AI) describes a voice-agent platform that has conducted over 200 million clinical phone conversations across 60-plus health systems with zero significant safety incidents and an 8.5-out-of-10 patient satisfaction score, built to resolve the tradeoff between clinically accurate models (tens of seconds to a minute of latency) and fast models (not accurate enough for safe clinical conversation). Their "Polaris" constellation architecture runs 31 models per conversation — one central conversational model plus 30 specialist models covering medications, labs, and scheduling — where each specialist first checks whether it needs to speak before contributing, backed by asynchronous background verifiers that check tool-call parameters and outcomes. The speech-recognition layer is a decoder-only audio LLM built on a fine-tuned Whisper V3 large-turbo encoder plus a conformer projector that preserves prosody, fed with conversation context and a finite list of the patient's actual medications, cutting medical-transcription word error rate by more than 50% versus off-the-shelf ASR while running at roughly 3x lower P99 latency. Inference optimizations include 4-bit quantization, speculative decoding, and a KV-cache system with over a 96% hit rate; for evaluation they combine synthetic testing with roughly 7,000 trained clinicians who have scored some 700,000-800,000 conversations, and across five product generations report 99.89% accuracy on a human-harm-style safety rubric (correctness, no harm, minor/severe harm, death) versus about 81% for human clinicians graded on the same scale. They also built and published a benchmark called HEART to measure conversational empathy, arguing safety alone isn't enough for patients to trust and keep using the system.

## Why it matters
- Provides hard, named metrics (200M+ conversations, 99.89% vs 81% human accuracy on a safety rubric, 50%+ lower word error rate, 96%+ KV-cache hit rate) for a healthcare voice-agent deployment — rare quantified, production-scale evidence in this corpus.
- Details a concrete multi-model "constellation" architecture (31 parallel specialist models that self-select whether to speak, plus synchronous and asynchronous verification layers) as an alternative to single-model agent design for latency-critical, high-stakes domains.
- Documents a purpose-built ASR approach (decoder-only audio LLM conditioned on conversation and domain context) built specifically to fix medical transcription errors that generic speech-to-text models miss — a concrete pattern for voice-agent reliability.

## Metadata
- Video: https://www.youtube.com/watch?v=AN65uc645mE
- Duration: 20:40
- Playlist index: 1034
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hope everyone's having a great conference. Super excited to get started. Uh how many of you all just quick show of hands have ever gotten a proactive healthcare call from your provider? Yeah, looks like no one. Me neither. Uh I'm uh Vivek of a few hands over there. I'm Vivek. I run uh engineering at Hippocratic. Uh we've built a product that calls patients and can have clinical conversations. Uh and we're over 200 million conversations in at this point. Uh here's the reality of like healthcare uh across all of human history, the entire system has been built on scarcity, right? Not enough clinicians, not enough time, not enough money. And hence the word triage. We're always trying...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/AN65uc645mE.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
