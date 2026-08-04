---
video_id: Bc6Ojl2XS1w
playlist_index: 755
title: "From Transcription to Live Music: Gemini's Audio Stack — Thor Schaeff, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Bc6Ojl2XS1w"
duration: "19:34"
duration_seconds: 1174
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Bc6Ojl2XS1w.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-09T21:18:47+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Google DeepMind's Thor Schaeff demos Gemini's audio stack: one-call speaker/emotion/language extraction, director's-note voice steering, native audio-to-audio Gemini 3.1 Flash Live, and Lyra 3 music generation."
---

# From Transcription to Live Music: Gemini's Audio Stack — Thor Schaeff, Google DeepMind

## Summary
Thor Schaeff (Google DeepMind, developer experience for the Gemini API and AI Studio) walks through DeepMind's audio stack built on Gemini 3's audio-understanding foundation, which he says goes beyond transcription to reason about emotion, pacing, accent, and overlapping speakers. He demos "EchoScript," an AI Studio app that in a single Gemini 3 Flash preview API call — using a structured-output response schema — returns a summary, per-speaker labels, timestamps, detected language, English translation, and emotion classification for a multilingual recording. For speech generation, he shows that instead of a large filterable voice library typical of other TTS providers, Gemini works from roughly 30 base voices steered via a "director's note" prompt (scene, accent, delivery instructions) that leverages the same audio understanding, demonstrated by pushing a base voice into an Irish-accented and then Singaporean-accented performance. He introduces Gemini 3.1 Flash Live as a native, full-duplex speech-to-speech model that ingests real-time text/audio/video (screen or camera at up to 1 frame/second) and reasons directly in the audio domain rather than through a cascaded ASR-to-LLM-to-TTS pipeline, and recommends Google's published Gemini "agent skills" to help coding agents handle the added complexity of real-time audio APIs. He closes with Lyra 3, a music-generation model split into a 30-second "Clip" jingle generator and a full-length "Pro" song generator with lyrics, demonstrated live via a "Life Jukebox" app where the Live model calls Lyra as a tool to compose a German techno-Schlager song about the UK startup scene on request.

## Why it matters
- Documents a concrete pattern for multi-attribute audio extraction (speaker ID, timestamps, language, translation, emotion) in a single structured-output API call, useful evidence for a chapter on multimodal/audio agent tooling.
- Distinguishes native audio-to-audio reasoning (Gemini 3.1 Flash Live) from cascaded ASR→LLM→TTS pipelines as an explicit architectural choice with stated latency/intelligence tradeoffs, relevant to any discussion of real-time voice agent design.
- The tool-calling demo (a live conversational model invoking a separate music-generation model, Lyra, as a callable tool) is a concrete example of model-as-tool composition in a real-time multimodal agent, not just text-based tool use.

## Metadata
- Video: https://www.youtube.com/watch?v=Bc6Ojl2XS1w
- Duration: 19:34
- Playlist index: 755
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right. What's new in AI audio? I'm sorry. It's a little bit misleading because the title leaves out the Ask Google DeepMind. So, we're just kind of looking at, you know, what we've been working on at DeepMind. If we were to look at everything in AI audio, we'd be spending a lot of time here, but you know, I'd love to show you kind of what we're what we're working on at Yeah, this is me. Hi, everyone. I'm Thor. I work on the developer experience at Google DeepMind working on the Gemini API and Google AI Studio. Uh Hello to them. As you welcome. My name is Torsten. Uh bonjour. Je m'appelle Thor. Je suis très désolé, mon français c'est très mauvais. Uh konnichiwa or writing that. Um That...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Bc6Ojl2XS1w.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
