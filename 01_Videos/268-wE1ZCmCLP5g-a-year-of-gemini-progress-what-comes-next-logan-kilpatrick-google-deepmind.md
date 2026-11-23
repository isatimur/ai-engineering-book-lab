---
video_id: "wE1ZCmCLP5g"
playlist_index: 268
title: "A year of Gemini progress + what comes next — Logan Kilpatrick, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=wE1ZCmCLP5g"
duration: "11:58"
duration_seconds: 718
view_count: 15455
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/wE1ZCmCLP5g.txt"
themes:
  - "Models & Inference"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:11:22+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Logan Kilpatrick, who leads developer work at Google DeepMind, launches what he hopes is the final Gemini 2.5 Pro update and recaps a year that felt like ten. His explanation for the turnaround is organizational: Google merged its AI research teams into DeepMind, then moved product teams in, so one group now builds models, the Gemini app and the Gemini API. The formula: bring the best people together, find infrastructure advantages, and ship. He notes a 50x rise in AI inference on Google servers in a year and previews proactive assistants, native audio, agentic-by-default models, new embeddings and a deep research API."
---
# A year of Gemini progress + what comes next — Logan Kilpatrick, Google DeepMind

## Summary
Logan Kilpatrick does developer work at Google DeepMind. This short talk has three parts: a model launch, a recap of a year of Gemini progress, and a preview of what comes next for the models, the Gemini app and the developer platform. His thesis is that Gemini's recent momentum comes as much from organization as from research.

**The launch**
He announces what he hopes is the final update to Gemini 2.5 Pro. He says it is state of the art on coding and HLE benchmarks, and closes gaps that developers flagged in earlier versions. He calls 2.5 Pro the turning point, both inside Google and in how the developer ecosystem sees Gemini. It is available at ai.dev and in the Gemini app.

**A year of progress**
A slide from Google I/O felt to him like ten years of work packed into twelve months. Research bets across DeepMind, in science and robotics and in custom models such as AlphaProof and AlphaGeometry, feed back into the mainline Gemini model. Adoption grew too: Google servers processed 50x more AI inference than a year earlier. Demand for the video generation model is "burning all the TPUs down".

**The organizational story**
Google once had many separate AI research teams. It brought them together and gave DeepMind a new mandate: build models and deliver them to Google and the world, not only do foundational research. Earlier this year it took a second step and moved the product teams into DeepMind. One group now does the research, builds the models, and ships the Gemini app and the Gemini API. His summary: bring the best people together, find infrastructure advantages, and ship.

**What comes next**
- Gemini app: a universal assistant. A Google account used to sign you in without carrying state; Gemini becomes the thread that unifies Google's products. He is most excited about proactivity, because most AI products still make the user do all the work.
- Models: Gemini was built as one multimodal model. Native audio (TTS and natural speech) now powers Gemini Live, and video may join the mainline model. Diffusion experiments promise very high tokens per second but remain research.
- Agentic by default: models are becoming systems, and much of today's developer scaffolding may move into the reasoning step.
- More small and large models, and new ideas for infinite context, since he says attention cannot scale that way.
- Developer platform: a state-of-the-art Gemini embeddings model for RAG, a deep research API, video and image generation models in the API, and AI Studio repositioned as a developer platform with built-in agents and coding agents.

## Why it matters
- Credits a lab's comeback to org design: merging research teams, then moving product teams into the model lab so research, models and products ship from one place.
- Gives a growth number for the inference market: a 50x year-over-year increase in AI inference processed on Google servers.
- Flags a shift for builders: if models become agentic by default, scaffolding they build today may be absorbed into the model's reasoning step.
- Names concrete platform bets (embeddings for RAG, a deep research API, proactive assistants) that help date the state of the Gemini developer stack in mid-2025.

## Metadata
- Video: https://www.youtube.com/watch?v=wE1ZCmCLP5g
- Duration: 11:58
- Playlist index: 268
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] Awesome. Thank you, Ben. Excited for the AI education summit. Should be fun. Um, my name is Logan. I do developer stuff at DeepMind, and I'm excited to talk about Gemini stuff. Um, yeah, hopefully folks know what Gemini is. So, no introduction needed. Um, I'll talk about three things really quickly. We'll do some fun announcement stuff. Um, we'll talk about sort of recapping a year of progress in Gemini. And then we'll talk about what's coming next across the model side, across the Gemini app side, and also across uh, of course the developer platform. So, the fun stuff which is we announced a new Gemini model today. Um, so we haven't officially announced it, but we'll post live on...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/wE1ZCmCLP5g.txt]]
- Description cue: Over the last year, Google and Gemini models have shown rapid progress across all dimensions (model, product, etc). Let's highlight all the work that has happened, how we got the worlds best...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Org Design & Leadership**.
