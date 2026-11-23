---
video_id: "knH3fmGAteQ"
playlist_index: 293
title: "Serving Voice AI at Scale — Arjun Desai (Cartesia) & Rohit Talluri (AWS)"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=knH3fmGAteQ"
duration: "17:05"
duration_seconds: 1025
view_count: 1725
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/knH3fmGAteQ.txt"
themes:
  - "Voice & Realtime"
  - "Models & Inference"
ingested_at: "2026-04-24T12:12:23+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Arjun Desai (co-founder, Cartesia) and Rohit Talluri (AWS foundation model team) hold a short fireside chat on enterprise voice AI. Desai argues that in voice you have milliseconds, not seconds, so text-to-speech must be fast enough to leave the LLM slack to reason. Cartesia builds on state space models, which generate in constant time per step where transformers scale quadratically. Its Sonic 2 model is two and a half times faster than its first, at about 40 ms model latency, and on-device runs are about five times faster than a cloud round trip. He prefers orchestrated pipelines over speech-to-speech models for control."
---
# Serving Voice AI at Scale — Arjun Desai (Cartesia) & Rohit Talluri (AWS)

## Summary
Arjun Desai is a co-founder of Cartesia, which builds "real-time multimodal intelligence that runs on any device", and did his PhD in generative AI at Stanford. Rohit Talluri is on the AWS foundation model training and inference team. The session was planned as a fireside chat and becomes a short pitch followed by Q&A. Desai's thesis: for voice, speed is the product and quality is "table stakes".

**Why voice is different**
Text users accept 500 to 600 ms before a response and cannot read at 200 tokens per second anyway. Voice is a visceral experience: a reply a second late feels awkward. Voice also brings interruptions, accents, background noise and highly subjective taste. Cartesia optimizes for three things: quality (natural voice), latency (time to the first sound of audio) and, which Desai calls the most important, controllability, because an agent's voice reflects your brand.

**Latency as slack for the LLM**
A voice agent chains speech-to-text, an LLM and text-to-speech. The biggest problem, he says, is that "there's not enough time". Every millisecond the TTS saves goes to the LLM so it can reason more. An audience member reports that Claude feels too slow end to end with Cartesia and Pipecat. Desai says LLM latency is mostly up to the LLM providers, and dedicated instances can help.

**State space models**
Cartesia uses state space models (SSMs) instead of transformers. Transformers scale quadratically in memory and runtime with input length. An SSM keeps a state and generates at O(1) per step at inference. Desai claims Cartesia closed the historical quality gap, so its models now beat transformers on quality as well as latency. Sonic 2, its voice-generation model, is two and a half times faster than its first model, at about 40 ms model latency. Cartesia also handles the formatting edge cases between STT, LLM and TTS output so builders do not have to.

**Controllability and use cases**
Customers want voice cloning, accents and native background noise. A voice that sounds too perfect falls into an uncanny valley; callers expect phone beeps. Markets include healthcare, customer support and real-time gaming NPCs. A voice marketplace lets voice actors license their voices, and Desai says the goal is not to replace them.

**Q&A positions**
- Data: rich, high-quality data matters, but audio preference data is so diverse that one fine-tuning stage cannot capture it.
- Speech-to-speech: useful now but not production-grade for enterprise. Orchestrated pipelines give more control, though speech-to-speech will win on latency over time.
- Edge: Cartesia runs models locally. Desai says on-device is about five times faster than a cloud round trip.
- Debugging: evals are critical, and most failures show up at the LLM stage.

Talluri adds the AWS view: customer optionality through SageMaker JumpStart and Bedrock model gardens, and a search for providers like Cartesia that serve industries current foundation models underserve. Desai predicts voice AI will be the de facto norm by 2030, followed by real-time world models.

## Why it matters
- Frames voice latency as a budget across STT, LLM and TTS: a faster TTS buys reasoning time for the LLM. This is a useful lens for any real-time agent design.
- Offers a concrete architecture argument (SSMs at constant per-step cost versus quadratic transformers) for why model choice drives real-time feasibility.
- States a clear position on orchestrated pipelines versus speech-to-speech models: control wins for enterprise today, latency may win later.
- Gives quotable numbers (about 40 ms model latency, 2.5x faster than the first model, about 5x faster on edge than a cloud round trip) to set expectations, though all are vendor claims.
- The uncanny-valley point, that callers prefer some phone noise, is a reminder that 'perfect' output is not always the right target in voice UX.

## Metadata
- Video: https://www.youtube.com/watch?v=knH3fmGAteQ
- Duration: 17:05
- Playlist index: 293
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Voice & Realtime]]
- [[Models & Inference]]

## Transcript excerpt
> [Music] My name is Rohit Turri. I am a member of the foundation model training and inference team at AWS. And we have an amazing talk. Super super awesome founder here talking about voice AI. So Arjun, why don't you go ahead? Awesome. Well, thanks for the intro, Ro. Uh, I'm Arjun. I'm one of the co-founders of Cartisia AI. Uh you know I'll give you a little bit of a spiel about what we do which is that you know we build real-time multimodal intelligence that runs on any device. Um so maybe you know the topic of this conversation will be focused a little bit more on how do we build voice AI for enterprise. As many of you know, voice AI is, you know, definitely up and coming and one of the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/knH3fmGAteQ.txt]]
- Description cue: Real-Time Voice AI applications demand the lowest possible latencies to enhance user experiences with more advanced reasoning and agentic capabilities. AWS is hosting Arjun Desai, co-founder...

## Book angles
- Could support a chapter/section on **Voice & Realtime**.
- Could support a chapter/section on **Models & Inference**.
