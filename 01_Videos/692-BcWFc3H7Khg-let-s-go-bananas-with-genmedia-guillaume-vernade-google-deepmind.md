---
video_id: BcWFc3H7Khg
playlist_index: 692
title: "Let's go Bananas with GenMedia — Guillaume Vernade, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=BcWFc3H7Khg"
duration: "1:17:14"
duration_seconds: 4634
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/BcWFc3H7Khg.txt"
themes:
  - "Models & Inference"
ingested_at: 2026-05-19T11:04:32+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Guillaume Vernade, developer advocate at Google DeepMind, runs a hands-on workshop covering the full Google GenMedia stack: Imagen (image generation), Veo (video), and Lyria (music). His framing: DeepMind's vision is a single world model that ingests all modalities; individual product releases are tactical subdivisions of that ambition. The workshop uses Wind in the Willows (Project Gutenberg) as a prompt-generation source, chaining Gemini 2.5 Flash (prompt author), Imagen/Veo (image/video generation), and Lyria (music clips) to produce illustrated book assets — demonstrating multimodal orchestration with structured output and chat-mode context threading. Practical notes: Veo 3.1 Light costs $0.05/second (~$0.40/video), enabling cheap prompt iteration before upcaling; Lyria Real-Time is a live predictive music model (not diffusion) that responds to prompts within 2 seconds like a DJ."
---

# Let's go Bananas with GenMedia — Guillaume Vernade, Google DeepMind

## Summary

Guillaume Vernade is a developer advocate at Google DeepMind, previously a video game producer who worked on Stadia. His job is making Google's model releases usable for developers: documentation, code samples, demos, prompt guides, and providing internal advocacy ("common sense") to product teams. A recurring frustration he cites: Google's tendency to create multiple products doing the same thing with incompatible APIs — the Imagen brand being one example he fought against unsuccessfully, before it was eventually retired.

### The GenMedia vision

DeepMind's internal goal is a single "world model" capable of ingesting all sensory modalities (video, audio, text, sensor data) and outputting across all modalities. For practical release purposes the team ships individual model families: Imagen for image generation, Veo for video, Lyria for music. By the time of the workshop Gemma 4 had just shipped (not Gemma 3 as the slide still showed). DeepMind's cadence: a new gen-media release roughly every month, with something shipping every five days across all of DeepMind.

**Key model updates at the time of the workshop:**
- Imagen/Nano Banana 2: supports resolutions from 520px to 4K; includes image grounding (can search the web for reference images and use them as visual context).
- Veo 3.1 Light: $0.05/second (~$0.40/video), designed for cheap prompt iteration before upscaling with higher-cost Veo 3 or 3.1.
- Lyria (clip mode): generates 30-second clips or full 3-minute songs via diffusion.
- Lyria Real-Time: a predictive (non-diffusion) model that generates music continuously until stopped, responds to prompt changes within ~2 seconds — a live DJ-style tool.

### Gemini API vs Vertex AI

Vernade distinguishes the two main access paths: the Gemini Developer API is designed for developers wanting quick starts without infrastructure overhead; Vertex AI is the enterprise path with full data residency, access control, and compliance. The same SDK works with both, allowing developers to start on the API and migrate to Vertex without rewriting code.

### Workshop: illustrating a book with GenMedia

The hands-on workshop uses *The Wind in the Willows* (Kenneth Grahame, Project Gutenberg) as raw material. The pipeline:

1. Upload the book as a file via the Gemini API's file-upload API.
2. Initialize a Gemini 2.5 Flash chat session with the book in context and instruct it to generate structured prompts (JSON with `name` and `prompt` fields) for each chapter, character, and scene — using chat mode so the model maintains style consistency across all generated prompts.
3. Pass prompts to Imagen/Nano Banana 2 for character and scene images.
4. Pass prompts to Veo for video scenes.
5. Pass prompts to Lyria for music clips.

Cost: approximately $1 for the full notebook run (mostly video generation). For those without a paid API key, Nano Banana 1 has a free tier and can be swapped in for image-only generation.

Vernade also demonstrates DeepMind's service-tier pricing: standard (normal queue), Flex (50% discount, may be delayed minutes), and Priority (2× price, guaranteed fast processing). The priority tier was added the day before the workshop and is not yet supported for Veo.

## Why it matters
- The Lyria Real-Time model (predictive, not diffusion, ~2 second latency) is an architecturally distinct capability that has no equivalent in most developer awareness — worth highlighting in any section on generative media.
- The chat-mode context threading pattern (feeding a book to Gemini once, then generating hundreds of prompts that share visual style context) is a practical multimodal orchestration technique.
- Veo 3.1 Light's $0.40/video price point marks a threshold where iterative video prompt development becomes economically viable, paralleling early text-generation cost drops.
- The honest Gemini API / Vertex tradeoff discussion is more developer-useful than typical vendor evangelism.

## Metadata
- Video: https://www.youtube.com/watch?v=BcWFc3H7Khg
- Duration: 1:17:14
- Playlist index: 692
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> So good morning everyone. Thank you for being here so early in the morning and um to be able to be the few ones who pass security to uh to be actually be here. Um I'm uh I'm Guiam and I will talk tell you about uh Jen Media in general. Um like uh so this is this is my life as u as Nano Banana sees it. Um basically I I joined Google six years ago. I used to be a video game producer before. Um, I initially worked on Stadia, the streaming game company that uh product that uh that we killed as so many other product um and uh and I've been at DeepMind for two years now. Uh and uh as I worked as a um what we called a developer advocate. So if you're not familiar with what the developer advocate...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/BcWFc3H7Khg.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
