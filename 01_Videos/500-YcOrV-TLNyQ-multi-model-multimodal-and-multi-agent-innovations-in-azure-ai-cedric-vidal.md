---
video_id: "YcOrV-TLNyQ"
playlist_index: 500
title: "Multi model multimodal and multi agent innovations in Azure AI: Cedric Vidal"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=YcOrV-TLNyQ"
duration: "28:56"
duration_seconds: 1736
view_count: 475
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/YcOrV-TLNyQ.txt"
themes:
  - "Models & Inference"
  - "Coding Agents"
ingested_at: "2026-04-24T12:20:56+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Cedric Vidal, principal AI advocate at Microsoft, gives an almost all-demo tour of how far Azure AI has moved since the days of text-only GPT. GPT-4o reads printed and handwritten French menus, translates them and reasons about vegan options, and judges fallen power lines and a tilted house for energy and insurance monitoring. A video translation service dubs him into German in his own voice. A small Microsoft vision model answers the same image question, and a 4-bit 3.8B model runs fully in the browser over WebGPU. A code-interpreter agent parses his kitesurfing GPX file and maps his tacks."
---
# Multi model multimodal and multi agent innovations in Azure AI: Cedric Vidal

## Summary
Cedric Vidal, a principal AI advocate at Microsoft, gives a 29-minute talk that is almost all live demos, covering "multi" everything: multiple models, multimodality, multiple languages and agents. His frame: a year earlier the only choice was GPT and text. Now Azure AI Studio has GPT-4o, vision, speech, many vendors' models, and the Assistants API for agents. Recent announcements include general availability of AI Studio, GPT-4 Turbo with Vision, DALL-E 3, Whisper, fine-tuning for GPT-4 and a batch inference API.

**Vision plus reasoning in one model**
- A printed restaurant menu: GPT-4o reads it and works out which dishes are vegan, which OCR alone could not do.
- A handwritten French chalkboard menu: the model recognizes the handwriting, translates it and reasons about it in one pass. Vidal stresses the difference from the old pipeline of image-to-text and then reasoning. The model now "understands natively both pixels and text", with shared internal representations for visual and textual concepts.
- Fallen power lines, from a real energy-industry conversation: "is the electricity working here?" The answer could come back as JSON to drive automated dashboards that watch camera feeds across a grid.
- A collapsed, tilted house as an insurance claims example.
- He notes GPT-4o is also much faster to answer.

**Speech: video translation**
A new Azure service translates a video of Vidal into German in his own voice. It keeps the delivery: when he whispers, the dub whispers, and when he yells, it yells. He says he stitched the clips together himself.

**Model choice**
The model catalog lists 1,600 models. Serverless deployment means paying per token with nothing to manage, a relief when GPUs are hard to get. Managed infrastructure means renting GPUs whether or not you use them. Model benchmarks compare accuracy and other metrics. A small Microsoft Research multimodal model with a 128k context answers the power-line question more simply but correctly. A 3.8B-parameter model from the same family, quantized to 4 bits and about 2 GB, downloads and runs in the browser through WebGPU on an M2 MacBook Pro. It would keep working offline, which suits sensitive data.

**RAG and evaluation**
GPT-4 Turbo, with knowledge to April 2023, knows only older models in one car maker's range. After Vidal indexes Wikipedia pages on the range, the chat playground answers with the newer models, though the demo first fails on one model and works on GPT-3.5 Turbo. AI Studio evaluation then scores coherence, groundedness and relevance on a one-row dataset, with coherence 4 on a 1 to 5 scale.

**Agent with code interpreter**
Vidal uploads a GPX file from his watch, recorded kitesurfing in the bay the Sunday before. The agent writes and runs Python in a sandbox to answer "how long was I on the water" (42 minutes) and to count his tacks, which needs angle changes between GPS points and a threshold. It then draws the session on a map and marks each turn with a red cross. He knew nothing about the GPX format and "didn't code a single line".

**Coming next**
A preview GitHub feature reads a Python repo, writes a specification, plans the change, and generates a Java GUI front end, taking corrections at every step.

## Why it matters
- The menu demos show the difference between OCR-then-reason pipelines and native multimodal models, with handwriting, translation and reasoning done in one call.
- Infrastructure monitoring with JSON output from image questions is a concrete pattern for turning vision models into automated monitoring.
- The in-browser 4-bit small model over WebGPU is an early, concrete case for on-device inference and privacy.
- The GPX code-interpreter demo is a good example of agents handling an unfamiliar, non-CSV file format and doing geometric reasoning in code.
- The RAG demo against a knowledge cutoff, with its live failure and fallback, makes an honest teaching example for grounding and model swaps.

## Metadata
- Video: https://www.youtube.com/watch?v=YcOrV-TLNyQ
- Duration: 28:56
- Playlist index: 500
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Coding Agents]]

## Transcript excerpt
> [Music] uh so um I'm Cedric Vidal I'm an principal AI Advocate at Microsoft uh and today I'm going to uh we're going to do quite cool stuff uh we're going to do to talk about multi many things uh multi models multimodality multilingual multi-agents all of this with AI um so yeah and also one particularity is apart from a few slides at the beginning it's only demos uh and to be honest bear with me in case one of them or all of them don't work uh but it's going to be fun we'll see how it goes um so as you know you know AI is the platform out there uh we have um a lot of uh AI Services uh we can do a machine learning uh and we also uh do all of that responsibly with the whole responsib life...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/YcOrV-TLNyQ.txt]]
- Description cue: Explore GPT-4, multi-modality, and demos integrating sight and language with Dall-E and Whisper. Learn about developer tools, AI assistants, scalable applications, and customization. Focus...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Coding Agents**.
