# Voice Agents

## Working definition
Voice agents are AI systems that interact through spoken conversation and therefore must manage speech recognition, synthesis, turn-taking, interruption, latency, and often tool use under realtime constraints.

## Core synthesis
The corpus treats voice as more than a new output modality. It is a harsher operating environment for AI systems. Text chat lets teams hide latency, awkward pauses, brittle handoffs, and shallow state management behind a forgiving interface. Voice does not. In spoken interaction, delay feels broken, interruption feels rude, and weak state tracking becomes immediately obvious.

A recurring claim across the corpus is that the hard part of voice agents is not merely adding speech-to-text and text-to-speech. The hard part is coordinating a realtime control loop: listening, deciding, speaking, pausing, resuming, handling overlap, invoking tools, and recovering gracefully when downstream systems are slow.

The newest voice batch sharpens this further in two directions. First, Luke Harries argues that voice often works best as a wrapper around an already-competent chat agent, suggesting a modular stack where the core agent runtime and the voice interface are separable. Second, Neil Zeghidour argues that the remaining gap to natural conversation comes from systems issues like tool latency, overlap, and paralinguistic understanding more than from a lack of raw generative capability. Samuel Humeau adds the model-side explanation: TTS itself is converging toward token-based, streaming architectures that increasingly resemble LLM systems.

## What this concept is really about
- Treating spoken interaction as a systems problem, not just a modality add-on.
- Designing for turn-taking, backchannels, and interruption tolerance.
- Managing perceived latency as carefully as raw latency.
- Separating the agent brain from the voice interface when that improves reuse and control.
- Recognizing that realtime UX exposes architectural weakness faster than chat does.

## Recurring patterns in the corpus
1. **Latency dominates user trust.** A voice agent can be semantically correct and still feel unusable if it responds too slowly.
2. **Turn-taking is architecture.** Interruption handling, endpointing, and overlap are central design choices, not polish.
3. **Tool calls are the hidden bottleneck.** Once speech layers get faster, action latency often becomes the slowest part of the loop.
4. **Speech-to-speech is promising but incomplete.** Lower latency helps, but human-like conversation also depends on overlap, emotion, and timing.
5. **Voice pushes modularity.** Many teams can preserve an existing text-agent core and attach a dedicated voice layer.
6. **Inference choices shape UX.** Streaming, discrete tokenization, and first-audio latency directly affect how "alive" a system feels.

## Important distinctions
### Voice is not just chat with audio
A spoken system has different expectations around pacing, overlap, and error recovery. What is acceptable in text often feels broken in speech.

### Low model latency is not enough
A fast TTS or STT component does not solve slow tool calls, weak turn-taking, or missing state management.

### Realtime performance includes perception
Users experience conversational smoothness, not only benchmark latency. Partial streaming and timely acknowledgements can matter as much as raw speed.

## Design implications
- Budget latency across the whole loop: ASR, model, tools, TTS, transport.
- Add explicit policies for interruption, pause/resume, and backchannel behavior.
- Treat tool invocation as part of the conversational UX, not only backend logic.
- Consider wrapping proven text agents with specialized voice engines instead of rebuilding everything end to end.
- Measure realtime quality with interaction-level evals, not only component metrics.

## Why it matters for the book
Voice agents strengthen one of the book's most important claims: once AI leaves the chat box and enters a living environment, scaffolding becomes visible. Realtime systems make trust legible. They reveal that dependable AI depends on orchestration, latency management, runtime design, and human-centered control surfaces — not just smarter models.

## Source cluster
- [[026-IEF842ZEU5A-contact-center-voice-ai-low-latency-intelligence-extraction-from-messy-audio-streams-dippu|#26 — Contact Center Voice AI: Low-Latency Intelligence Extraction from Messy Audio Streams — Dippu Singh]]
- [[143-MPtCBaZn84A-full-workshop-building-conversational-ai-agents-thor-schaeff-elevenlabs|#143 — [Full Workshop] Building Conversational AI Agents - Thor Schaeff, ElevenLabs]]
- [[145-E71YtNbCFXY-your-realtime-ai-is-ngmi-sean-dubois-openai-kwindla-kramer-daily|#145 — Your realtime AI is ngmi — Sean DuBois (OpenAI), Kwindla Kramer (Daily)]]
- [[146-1v9zBiZKlIY-why-chatgpt-keeps-interrupting-you-dr-tom-shapland-livekit|#146 — Why ChatGPT Keeps Interrupting You — Dr. Tom Shapland, LiveKit]]
- [[227--OXiljTJxQU-building-effective-voice-agents-toki-sherbakov-anoop-kotha-openai|#227 — Building Effective Voice Agents — Toki Sherbakov + Anoop Kotha, OpenAI]]
- [[287-iXhba366fQc-building-voice-agents-with-openai-dominik-kundel-openai|#287 — Building voice agents with OpenAI — Dominik Kundel, OpenAI]]
- [[413-2p2ErKRELHM-voice-agent-engineering-nik-caryotakis-superdial|#413 — Voice Agent Engineering — Nik Caryotakis, SuperDial]]
- [[478-heYmh_lsX5s-giving-a-voice-to-ai-agents-scott-stephenson-ceo-deepgram|#478 — Giving a Voice to AI Agents: Scott Stephenson, CEO, Deepgram]]
- [[479-dRQHikOrH2A-how-to-build-the-world-s-fastest-voice-bot-kwindla-hultman-kramer|#479 — How to build the world's fastest voice bot: Kwindla Hultman Kramer]]
- [[600-qpPgCA664xw-building-reactive-ai-apps-matt-welsh|#600 — Building Reactive AI Apps: Matt Welsh]]
- [[661-DCZZ3AJKzuc-give-your-chat-agent-a-voice-luke-harries-elevenlabs|#661 — Give Your Chat Agent a Voice — Luke Harries, ElevenLabs]]
- [[662-P_RI1kCkRbo-voice-ai-when-is-the-her-moment-neil-zeghidour-gradium-ai|#662 — Voice AI: when is the "Her" moment? — Neil Zeghidour, Gradium AI]]
- [[663-3jGAU2sbAyY-why-tts-models-now-look-like-llms-samuel-humeau-mistral|#663 — Why TTS Models Now Look Like LLMs — Samuel Humeau, Mistral]]

## Open questions
- What is the best runtime abstraction for overlap, interruption, and tool-call waiting in voice systems?
- Which parts of natural conversation can be approximated with orchestration, and which require better foundation models?
- How should teams evaluate voice quality when correctness, latency, and interaction smoothness can trade off against each other?
