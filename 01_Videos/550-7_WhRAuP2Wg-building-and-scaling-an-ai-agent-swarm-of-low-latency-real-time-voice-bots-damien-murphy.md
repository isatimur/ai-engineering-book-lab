---
video_id: "7_WhRAuP2Wg"
playlist_index: 550
title: "Building and Scaling an AI Agent Swarm of low latency real time voice bots: Damien Murphy"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=7_WhRAuP2Wg"
duration: "1:07:23"
duration_seconds: 4043
view_count: 3201
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/7_WhRAuP2Wg.txt"
themes:
  - "Voice & Realtime"
ingested_at: "2026-04-24T12:23:27+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Damien Murphy, senior applied engineer at Deepgram, runs a workshop on a pre-release voice agent API that wraps speech-to-text, an LLM and text-to-speech into one audio-in, audio-out WebSocket, demoed as a drive-thru bot whose LLM places orders through function calls. His thesis: low latency comes from co-locating the pieces and handling endpointing, barge-in and time to first token, and big voice systems should be swarms of small single-purpose agents behind a router, not one huge prompt. Q&A covers semantic endpointing, long-running tools via webhooks, output moderation, regional autoscaling, three-pass human labeling and diarization limits."
---
# Building and Scaling an AI Agent Swarm of low latency real time voice bots: Damien Murphy

## Summary
Damien Murphy is a senior applied engineer at Deepgram, a customer-facing role in which he has helped hundreds of companies build and scale real-time voice bots. Deepgram trains its own models (over a thousand in production) and tunes them for poor call-center audio. This hour-long workshop builds a voice agent on a pre-release Deepgram API, then turns into a long Q&A. His thesis: low latency is mostly an infrastructure problem, and complex voice systems should be swarms of small agents.

**From three services to one API**
The classic stack chains speech-to-text, an LLM and text-to-speech. He cites about 500 ms for transcription and 700 ms for the LLM and TTS. Co-locating them cuts latency, but turns the job into an infrastructure challenge. The new voice agent API takes audio in and sends audio out over one WebSocket, and handles endpointing (deciding when the user has finished). Once latency drops far enough, the bot answers too fast, so teams add delays to avoid seeming rude.

**The workshop app**
A vanilla JS client and an Express server run a SpongeBob-style drive-thru. The config sets the LLM, a system prompt with the menu, and an add-item function with a per-call ID. The LLM places orders itself; the client only polls the order to display it. Details: the browser sends 48 kHz audio, downsampled to 16 kHz; telephony can send 20 ms chunks for lower latency; the client clears queued audio on a user-started-speaking event so users can barge in. Lifecycle messages include the user transcript, function calls and results, and the assistant's text, which you can use for moderation. Stretch goals: add remove-item, get-order, and a menu function so items can go out of stock. There are 12 voices; one is his own cloned voice.

**Latency and conversation design**
- **Time to first token** is the key LLM metric. Start TTS after five or 10 tokens. Most LLMs output about 30 tokens per second, and even a top model can take 900 ms to first token. Longer system prompts raise it.
- **Semantic endpointing**: when a user says they need a minute to find an account number, the bot should wait, not reply on silence alone. Back-channel cues help with card numbers.
- **What would a human do?** Nobody can catch his email address over the phone without spelling it out, so build that logic in.
- Self-hosted transcription can reach about 50 ms end-of-speech latency, versus about half a second hosted. Self-hosted runs re-infer five times a second over a 3 to 5 second window.

**Agent swarms**
Do not put a whole business in one system prompt. Use a routing agent with single-purpose sub-agents: booking, cancellation, tech support with RAG, account support with verification, a card-payment agent. Benefits: lower complexity, the cheapest model that works (costs drop about 10x every six months, he says), and reuse across flows.

**Q&A highlights**
- Long-running tools: return at once, then use a webhook handler that tells the LLM when the job finishes.
- Prompt injection: you cannot stop it on the way in (ask three times and a bot breaks its rules), so moderate output.
- Memory: for long calls, use a memory system that updates facts such as a changed address.
- Scaling: distance kills latency, so run autoscaling clusters per region, and plan for spikes such as an outage or a disaster.
- Fine-tuning speech-to-text needs 20 to 50 hours of audio, labeled in three human passes from about 12% word error rate to about 99% label accuracy.
- Diarization needs about 30 seconds per speaker, and short replies like yeah are the hardest to attribute.
- Call centers: one human agent can hand card collection to an AI voice and run five calls at once.

## Why it matters
- Gives concrete latency budgets and levers for voice agents: co-location, chunk size, time to first token, and self-hosted transcription at about 50 ms.
- The router-plus-sub-agents design is a practical answer to oversized system prompts in production voice systems.
- Semantic endpointing, barge-in and back-channeling show that voice UX is a turn-taking problem, not only a speech-quality problem.
- The webhook pattern for long-running tools and output-side moderation are reusable reliability patterns for any real-time agent.
- The advice to analyze existing calls first and automate the largest category is a clear starting plan for call-center automation.

## Metadata
- Video: https://www.youtube.com/watch?v=7_WhRAuP2Wg
- Duration: 1:07:23
- Playlist index: 550
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Voice & Realtime]]

## Transcript excerpt
> [Music] hey everybody yes we're going to get started here uh thanks everybody for coming along um and thanks to AI Engineers for for having us uh my name is Daman Murphy I'm a senior applied engineer at Deep gr a lot of people ask me what is an applied engineer it's a customer facing engineer right so we work directly with customers uh to basically help them achieve their business cases um yeah about 20 years of experience full stack developer uh been working in pre-sales post sales uh really just customer facing roles for the last 10 years or so uh I've helped hundreds of companies uh working with deep gram to actually build uh and scale low latency real-time voice spots uh a lot has...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/7_WhRAuP2Wg.txt]]
- Description cue: Multimodality: AI Agents are becoming more powerful at a rapid pace! In this talk you will learn best practices and considerations to think about when building your AI Agent Swarm. All aspects...

## Book angles
- Could support a chapter/section on **Voice & Realtime**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/DamienDeepgram/deepgram-workshop-client>
- repo: <https://github.com/DamienDeepgram/deepgram-workshop-server>
- resource: <https://console.deepgram.com/signup>
