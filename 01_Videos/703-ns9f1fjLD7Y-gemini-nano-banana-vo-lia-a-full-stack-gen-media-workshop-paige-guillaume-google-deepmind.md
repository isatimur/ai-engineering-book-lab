---
video_id: ns9f1fjLD7Y
playlist_index: 703
title: "Gemini, Nano Banana, VO, & LIA: A Full Stack Gen Media Workshop — Paige & Guillaume, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ns9f1fjLD7Y"
duration: "1:54:35"
duration_seconds: 6875
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ns9f1fjLD7Y.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-24T23:36:46+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Paige Bailey (Google DeepMind, previously Palm 2/Gemini/Gemma teams) and Guillaume Vernade lead a nearly two-hour hands-on workshop covering the full Google generative media stack released in the previous six months: Gemini 3.1 Flash Live (real-time audio), Nano Banana 2 (native image generation and editing), Embedded 2.0 (multimodal embedding space), LIA 3 (music generation), VO 3.1 (video), and Gemma 4 (open models). The session is structured as a live demo in AI Studio. Paige's contrarian view: everybody sprinting to build agent frameworks, vector databases, and MCP servers is solving problems the models will absorb — focus on opinionated use-case depth instead."
---

# Gemini, Nano Banana, VO, & LIA: A Full Stack Gen Media Workshop — Paige & Guillaume, Google DeepMind

## Summary

Paige Bailey has been doing machine learning since 2009 — numpy/scipy/scikit-learn contributor, CUDA work in geosciences before it was fashionable for ML, TensorFlow GPU support work, GitHub VS Code/Copilot early UX, and then the original Palm 2, Gemini, and Gemma teams at Google. Guillaume Vernade is a generative media specialist at DeepMind. The session is a near-two-hour live demo workshop, primarily in AI Studio, covering the recent Google generative media releases.

**The model release inventory (preceding 6 weeks)**

- **Gemini 3.1 Flash Live**: Real-time audio-in/audio-out model for live conversation
- **Gemini 3.1 Pro and Flash Light**: High-capability and cost-efficient text/vision models; Augment Code reportedly replatformed their entire agent infrastructure to Gemini 3.1 Pro for cost/performance
- **Nano Banana 2**: Native image generation and editing model (reverse image search, math-corrected homework, arrow-on-map → rendered scene)
- **Embedded 2.0**: Multimodal embedding model — video, audio, images, code, and text in a single unified vector space, enabling true multimodal search
- **LIA 3**: Music generation
- **Genie 3**: World model building
- **VO 3.1 Light**: Video generation
- **Gemma 4**: Open model family, Apache 2 license, released the previous week

**AI Studio as the entry point**

The workshop uses AI Studio as its primary surface. Key demonstrated capabilities:
- Video analysis: pass a YouTube URL with start/end timestamps, ask questions about frame content (dinosaur species with fun facts, bounding boxes around specific objects)
- Code execution tool: one-liner to stand up a sandboxed Python environment where Gemini can write and run code against uploaded data, produce segmentation masks, draw bounding boxes
- Build feature: similar to v0.dev/Lovable — generates web apps from prompts, now with database and OAuth integration
- Gemini 3.1 Flashlight at ~$0.25/million tokens — nearly an order of magnitude cheaper than Pro while still handling video/audio

**Paige's "sprinting to the wrong thing" thesis**

In the Q&A, Paige argues that many engineering teams are sprinting to build things models will absorb: vector databases (context windows now handle what 8k-token windows couldn't), fine-tunes for language support (models now natively multilingual), agent frameworks (likely to get absorbed), and MCP servers (already giving way to skills as the preferred pattern). Her recommendation: focus on opinionated, use-case-specific depth where the value comes from knowing the customer problem — that's what the model can't absorb.

**Practical workshop takeaways**

- The `get code` button in AI Studio generates production-ready SDK code from any playground configuration — if you get it working in the playground, you get working code for your app immediately.
- Code execution + multimodal understanding together is a powerful combination: analyze video, extract structured data, run Python to process that data, all in one call.
- Gemma 4 under Apache 2 is significant for applications where open weights and licensing clarity matter.

## Why it matters
- The multimodal embedding space (Embedded 2.0) is a qualitatively different capability: search across modalities with a single query, not per-modality indexes.
- The "everything sprints to the right thing get absorbed" pattern is a strategic bet-sizing heuristic: build where model commoditization is slowest, not fastest.
- AI Studio's code export feature makes it a fast prototyping-to-production path for Gemini API applications, worth knowing for any team evaluating the Google stack.

## Metadata
- Video: https://www.youtube.com/watch?v=ns9f1fjLD7Y
- Duration: 1:54:35
- Playlist index: 703
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> My name is Paige. I started doing machine learning a long time ago. Um around 2009 2010. Um was primarily working with um though it feels like forever ago. I was just talking with a friend about this recently. Um, back in 2009 2010, it was kind of wild that companies would even trust open source software to do business critical work. Um, and so I was contributing to things like numpy, sci-fi, like little like little antenna these microphones. Um, >> yeah. >> Sure. Cool. Cool. Um so numpy, scypi, uh mapplot lib, which is still just as excruciatingly painful to use. Um uh scikitlearn, kind of the early days of the scientific computing stack. Um and eventually started working as an engineer....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ns9f1fjLD7Y.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
