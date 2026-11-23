---
video_id: hMlLw1LeIK8
playlist_index: 886
title: "Voice Agents That Handle Interrupts - Chintan Agrawal and Daniel Wirjo, AWS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=hMlLw1LeIK8"
duration: "32:57"
duration_seconds: 1977
view_count: 474
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/hMlLw1LeIK8.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:21:14+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Chintan Agrawal and Daniel Wirjo, AWS solutions architects for APJ startups, argue that turn taking in voice agents is an audio-pipeline problem, not an LLM problem: the same model and prompt feel broken or natural depending on how fast the system notices the user. Humans switch turns in about 200 ms; the best measured cascaded pipeline is 755 ms. They compare three levels (Silero VAD silence timers, STT-provider turn detection, local VAD plus the open Smart Turn model), break down the latency budget, show why P95 matters more than P50, and demo all three in Pipecat."
---

# Voice Agents That Handle Interrupts - Chintan Agrawal and Daniel Wirjo, AWS

## Summary
Chintan Agrawal and Daniel Wirjo are solutions architects on the AWS APJ startup team. Their topic is turn taking: how a voice agent knows the user has finished, and when to stop talking. The opening demo makes the point. With the same model and prompt, one agent talks over a user's mid-sentence correction for almost two seconds; the other backs off in under 200 ms. The difference is purely the audio pipeline.

**The 200 ms constraint**
Humans switch turns in about 200 ms. At 800 ms things feel off; at 1.5 seconds users hang up. The best published cascaded result they cite, from Salesforce, is 755 ms, nearly 4x slower than human turn taking. Where the gap cannot close, good turn taking must make the experience feel better than the raw numbers.

**Where turn taking lives**
Besides STT, LLM and TTS, the pipeline has voice activity detection (VAD) at the front, a smart turn detector that decides whether to respond now or wait, and an interruption handler that flushes TTS and cancels LLM generation when the user barges in.

**Three levels**
- Level 1, Silero VAD: a 2 MB, roughly 300,000-parameter model (STFT features, four conv layers, an LSTM, a sigmoid). One parameter, minimum silence duration, is the whole user experience: too low and the agent cuts people off, too high and there is dead air. Sales agents might use 200 ms; other domains 1,000 to 1,200 ms. VAD cannot tell a thinking pause from a finished thought or a backchannel.
- Level 2, STT-provider detection: Cartesia and Deepgram detect turns inside the streaming STT, with P50 around 300 ms and 250 ms. They use audio plus linguistic context, but when they misfire you cannot see why; the decision happens on someone else's server.
- Level 3, local VAD plus Smart Turn: an 8 MB, BSD-2-licensed model that runs during silence and reads prosody and intonation. Smart Turn v3.2 has 58.9% recall and 68.4% precision; the VAD timer stays as a safety net, so the agent is never stuck. A Meta paper reports 87.7% recall, but without released code. Owning the classifier also lets the agent tell a real correction from a filler or a cough instead of stopping every time.

In code, the three Pipecat pipelines are almost identical; only the turn analyzer changes.

**The latency budget**
A breakdown from a Daily co-founder: about 40 ms mic, 52 ms network and jitter buffer, 300 ms transcription plus endpointing, 500 to 650 ms LLM time to first byte, and roughly 85 to 120 ms TTS and playback, for 1,100 to 1,300 ms total over cloud APIs. Co-locating all models on one GPU cluster reached about 500 ms. STT and LLM eat about two-thirds of the budget, so they are the only real levers. In their June 2026 benchmarks against a 700 ms TTFT target, Nemotron-3 Ultra hit 529 ms P50 and GPT-4.1 536 ms, but GPT-4.1 spiked to 1.7 s at P95 and a Claude model passed 4 s. One slow response breaks a conversation. After 15 to 20 turns, models also drift from the system prompt, so context pruning or session resets are needed.

**Production lessons and demo**
False interruptions raise escalation to humans. Five systems scale and fail differently, so they point to Pipecat Cloud or an AWS reference architecture. Wirjo's demo, a travel assistant, shows the 300 ms VAD timer cutting him off mid-sentence, Cartesia waiting through his pause, and Smart Turn logging a high completion probability before replying.

## Why it matters
- Moves the voice-agent quality debate from model choice to pipeline engineering, with a concrete before/after demo on an identical model.
- The three-level ladder gives a clear trade-off between simplicity, accuracy and transparency for turn detection.
- The latency budget shows that STT and LLM time to first token are the only two big levers, and that P95 tail latency, not P50, decides voice UX.
- Flags multi-turn instruction drift after 15 to 20 turns as a voice-specific failure needing context pruning or resets.
- Links false interruptions to higher human-escalation rates, a measurable business cost of poor turn taking.

## Metadata
- Video: https://www.youtube.com/watch?v=hMlLw1LeIK8
- Duration: 32:57
- Playlist index: 886
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hey everyone. I'm Chintan and I have my colleague Daniel with me. We are solutions architect on the AWS APJ startup team. So today we are going to talk about something we've been working on for a while. Which is turn taking in voice agents. What I mean by that is how does the system actually know that you have finished speaking and it's time for the agent to respond? These are all audio engineering problems. They are not LLM problems because you can have the perfect model, perfect track but the experience still might feel broken if the turn taking is off. So we are going to walk you through the concepts and three different approaches to solving this. And Daniel is going to you know make it...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/hMlLw1LeIK8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/wirjo/pipecat-turn-detection-demo>
