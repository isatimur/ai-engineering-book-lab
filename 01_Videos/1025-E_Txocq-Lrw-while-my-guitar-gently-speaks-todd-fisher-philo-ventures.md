---
video_id: E_Txocq-Lrw
playlist_index: 1025
title: "While my guitar gently speaks — Todd Fisher, Philo Ventures"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=E_Txocq-Lrw"
duration: "18:35"
duration_seconds: 1115
view_count: 730
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/E_Txocq-Lrw.txt"
themes:
  - "Coding Agents"
  - "MCP & Tooling"
  - "Voice & Realtime"
ingested_at: 2026-08-20T22:28:16+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Todd Fisher demos a guitar-to-speech/singing pipeline combining JUCE audio plugins, YIN pitch detection, Whisper STT, and a local LLM to make his guitar talk and sing in real time."
---

# While my guitar gently speaks — Todd Fisher, Philo Ventures

## Summary
Todd Fisher (Philo Ventures) demos an audio pipeline that makes his guitar speak and sing, built as a personal side project using a custom JUCE-based plugin inside Logic Pro. Early attempts play back whole text-to-speech clips (via Piper) triggered by a guitar note, then move to per-word playback using energy-gap segmentation (splitting on near-silence) combined with a sonority-peak syllabifier (vowel-based syllable detection), falling back to manual drag-to-edit segmentation when automatic detection fails. To make the guitar sing rather than speak, he detects the played note's fundamental frequency with the YIN pitch algorithm, generates a synthesized ADSR sawtooth note, and pushes it through a vocoder mixed with vocal samples from the open-source VocalSet dataset, pitch-shifted per note using the WORLD pitch-shifting library — a process too heavy to run live, so the singing samples are pre-baked offline rather than generated in real time. In a live demo he also wires up a conversational mode: speech captured via microphone is transcribed with Whisper, sent to a local LLM running on his machine, and the response is played back through the guitar's talk-box-style pipeline.

## Why it matters
- A concrete, non-chatbot example of AI/DSP integration in a hobbyist project — the real engineering is in the signal-processing plumbing (pitch detection, phoneme segmentation, vocoding), not just LLM prompting.
- Surfaces where automatic AI-driven segmentation fails in practice (energy-gap silence detection breaks on connected speech) and shows the builder's fallback to manual correction — a realistic error-recovery pattern for AI-augmented creative tools.
- Shows a local-first, latency-sensitive architecture (on-device Whisper plus a local LLM) chosen because the live/interactive use case can't tolerate cloud round-trips, plus a pragmatic pre-bake workaround for the parts too heavy to run in real time.

## Metadata
- Video: https://www.youtube.com/watch?v=E_Txocq-Lrw
- Duration: 18:35
- Playlist index: 1025
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[MCP & Tooling]]
- [[Voice & Realtime]]


## Transcript excerpt
> So I am Todd Fisher. I love the guitar. That's one of my passions in life. Uh today I want to talk about uh this project I've been working on for a while here, effectively making my guitar speak. Uh but of course I want to start out with kind of framing it under this awesome premise. You know, we've all been to live performances where like your mind was just blown and it was awesome. I you know, the the first one I remember way back I was in high school. I went to a Slipknot concert, so a little bit heavier music uh here in the Bay Area. And I remember at some point the drummer was drumming a cool drum solo and his drum set started raising up and I was like, "Whoa, that's cool." And...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/E_Txocq-Lrw.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Voice & Realtime**.
