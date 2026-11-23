---
video_id: "Xmkl27AM2VQ"
playlist_index: 480
title: "Unveiling the latest Gemma model advancements: Kathleen Kenealy"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Xmkl27AM2VQ"
duration: "16:25"
duration_seconds: 985
view_count: 1944
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Xmkl27AM2VQ.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:20:03+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kathleen Kenealy, research engineer at Google DeepMind and technical lead of the Gemma team, presents Google's open model family and announces Gemma 2 on launch day. Gemma 2 comes in 9B and 27B sizes; she claims both beat models two to three times larger, with the 27B in the same range as Llama 3 70B and the top open model of its size on a public chatbot leaderboard. She covers responsibility by design, CodeGemma, RecurrentGemma (a state space model for long contexts), a vision-language variant with a SigLIP encoder, AI Studio access, and a 20-recipe cookbook."
---
# Unveiling the latest Gemma model advancements: Kathleen Kenealy

## Summary
Kathleen Kenealy is a research engineer at Google DeepMind and the technical lead of the Gemma team. This short launch talk introduces Gemma, Google DeepMind's family of open, lightweight models built from the same research and technology as Gemini, and announces Gemma 2 on its launch day. Her personal motive: as an academic researcher she was disappointed by how far open foundation models lagged behind proprietary ones, and she has worked on Gemma for almost two years.

**Context: Google and open research**
She places Gemma in a line of open work from Google: the Transformer, SentencePiece and BERT, TPUs, and frameworks from TensorFlow to JAX.

**Four advantages she claims**
- Responsible by design: teams inspect datasets by hand for quality and safety, evaluate safety from the earliest ablations to choose training methods, and run the final models through the same safety evaluations as Gemini.
- Strong performance for their size, beating much larger models.
- Extensibility: optimised for TPUs, GPUs and local devices, and supported in TensorFlow, JAX, Keras, PyTorch, Transformers and more.
- Open access and an open license, "that's what's powerful about Gemma".

**The model family so far**
Gemma 1.0, launched in February, is the base LLM. CodeGemma is fine-tuned for code generation and evaluation. RecurrentGemma is a state space model designed for faster, more efficient inference at long contexts, now at 2B and 9B. Gemma 1.1 improved instruction following and chat. The most requested feature, multimodality, arrived as a vision-language model (captioned "P Gemma") that pairs a SigLIP vision encoder with the Gemma 1.0 text decoder. It handles question answering, image and video captioning, object detection and segmentation, at the 2B size only, with pre-trained, fine-tuned and benchmark transfer checkpoints.

**Gemma 2**
Gemma 2 ships at 9B and 27B parameters, built on community feedback about where 1.0 and 1.1 fell short. Her claims:
- Both are the most performant models of their size and beat models two to three times larger. The 27B sits in the same ballpark as Llama 3 70B on academic benchmarks.
- Human evaluations heavily prefer Gemma over other open models, including larger ones. On the chatbot leaderboard (captioned "LMS") the 27B was the top open model of its size, and only one other open model of any size outranked it.
- Gemma 2 is better than 1.x at instruction following, creativity and factuality.
- Switching from Gemma 1 takes a couple of lines of code, with the same tools and frameworks.
- The team researched how core modelling decisions affect downstream fine-tuning, so the models should be easy to fine-tune.

She stresses that academic benchmarks do not always show how a model performs "once it's in your hands", which is why human evaluation matters.

**Getting started**
The 27B model is live in Google AI Studio for prompting right away. A Gemma cookbook on GitHub holds 20 recipes from easy to advanced and accepts pull requests. GCP research credits, better documentation, guides and Colabs for inference, fine-tuning and evaluation, and a Discord community round it out.

## Why it matters
- It records the Gemma 2 launch claims (9B and 27B, competitive with models two to three times larger, 27B near Llama 3 70B) for chapters that compare open-weight models.
- Her point that benchmarks do not show real-world behaviour, backed by human evaluations and leaderboard rank, supports an argument about how to judge models.
- RecurrentGemma as a state space model for long-context inference is a concrete example of architecture variety inside one open family.
- The explicit focus on making models easy to fine-tune, plus a cookbook that accepts pull requests, shows how an open model vendor courts developers.

## Metadata
- Video: https://www.youtube.com/watch?v=Xmkl27AM2VQ
- Duration: 16:25
- Playlist index: 480
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] my name is Kathleen canel I'm a research engineer at Google Deep Mind and as was just mentioned I'm the technical lead of the Gemma team before I get started I just wanted to say uh how awesome it is to get to be here with you all today when we were building Gemma our North Star the the thing we were most excited about was building something to empower and accelerate the amazing work being done by the open source community and since we launched our first models in February I have been absolutely Blown Away by the incredible projects and research and and innovations that have been already been built on top of Gemma um so I'm particularly excited to be here with so many developers...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Xmkl27AM2VQ.txt]]
- Description cue: Lets cut through the buzzwords and get to the point. In this talk we'll unveil the abilities of Gemma and Gemini models, and discuss how to design and build killer apps with LLMs. We'll cover...

## Book angles
- Could support a chapter/section on **Models & Inference**.
