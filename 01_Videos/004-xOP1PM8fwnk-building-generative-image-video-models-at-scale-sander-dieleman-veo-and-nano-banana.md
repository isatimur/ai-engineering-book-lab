---
video_id: "xOP1PM8fwnk"
playlist_index: 4
title: "Building Generative Image & Video models at Scale - Sander Dieleman (Veo and Nano Banana)"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=xOP1PM8fwnk"
duration: "40:46"
duration_seconds: 2446
view_count: 2811
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/xOP1PM8fwnk.txt"
themes:
  - "RAG & Retrieval"
  - "Coding Agents"
ingested_at: "2026-04-24T09:58:27+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sander Dieleman, a research scientist on the Google DeepMind generative media team behind Veo and Nano Banana, gives a behind-the-scenes tour of training diffusion models at scale in eight parts: data curation, learned latent representations, the denoising mechanism, architecture, sharding, sampling, distillation and control. His thesis: diffusion works so well for images and video because it is 'spectral autoregression', generating coarse structure before fine detail, and classifier-free guidance lets these smaller models 'punch well above their weight'. He also argues that time spent on data is often a better investment than tweaking the model."
---
# Building Generative Image & Video models at Scale - Sander Dieleman (Veo and Nano Banana)

## Summary
Sander Dieleman is a research scientist at Google DeepMind, there for over a decade, on the generative media team that builds Veo and Nano Banana. His talk is a "whirlwind tour" of what goes into training audiovisual diffusion models at scale, in eight sections, with most depth on modeling and sampling. He closes with a Q&A.

**Data first**
Data curation is "really really essential" for quality. Academic research trained him to use fixed benchmark datasets and not look at the data; the field now has to unlearn that. He says time spent improving data is sometimes a better investment than tuning the model or optimizer. He shares few details, because curation is part of the "secret sauce".

**Learned latents, not pixels or codecs**
Thirty seconds of 1080p video at 30 fps is several gigabytes per training example, so raw pixels do not scale. Teams train their own autoencoder instead of using JPEG or H.265, because standard codecs obscure the structure that generative modeling needs. The example from the original Stable Diffusion autoencoder maps a 256x256 RGB image to a 32x32 latent grid with extra channels. For video, latents can cut tensor size by two orders of magnitude. The latents keep the grid topology and the semantic content; they compress only local texture.

**Diffusion as spectral autoregression**
The denoiser predicts the average of all images that could explain a noisy input, so a one-step prediction is blurry. Sampling takes a small step in that direction, often adds a little fresh noise back to stop errors from accumulating, and repeats. A Fourier view explains why this suits images: natural image spectra follow a power law, while Gaussian noise is flat. More noise drowns out higher frequencies first, so generation runs coarse to fine. Training can also weight the perceptually important scales more.

**Architecture and scale**
Early models used U-Nets; transformers now dominate because the field can reuse LLM scaling knowledge, with fully bidirectional attention instead of a causal mask. Most video models noise the whole space-time volume jointly. A hybrid, autoregressive in time with diffusion per frame, fits real-time generation; he names Genie as an example. His team builds in JAX and uses its sharding tooling to move from data parallelism to model parallelism.

**Guidance, distillation, control**
Guidance runs the model with and without the prompt, then amplifies the difference. It costs two evaluations per step and trades diversity for a large gain in quality. He thinks people "would be surprised at how bad today's models are" without it. Oversaturated images signal a guidance scale set too high; one paper ramps guidance up only in the middle of sampling. Distillation here cuts sampling steps, not model size: consistency models predict the end of the path, but one step is a "tall order", so a few steps work better. Reference images, camera motion and event timing need conditioning beyond text, and these signals often enter in post-training. Preference tuning with RL or DPO also happens there.

**From the Q&A**
Guidance works best when there is a semantic gap between the conditioning signal and the output. That is why it works so well for text-to-image, less well for segmentation masks, and why language models rarely use it. Deterministic samplers are required for many distillation methods, including consistency models.

## Why it matters
- The "diffusion is spectral autoregression" framing gives a clear, non-mathematical model of why diffusion beats token-by-token generation for images and video.
- Guidance explains why media models can stay smaller than LLMs: one inference-time trick buys quality at the cost of diversity and a second forward pass.
- His call to spend effort on data over model tweaks comes from a lab that trains frontier media models, and it runs against academic habit.
- The list of conditioning signals text cannot express (reference identity, camera motion, event timing) maps the product surface that video models must add in post-training.

## Metadata
- Video: https://www.youtube.com/watch?v=xOP1PM8fwnk
- Duration: 40:46
- Playlist index: 4
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Coding Agents]]

## Transcript excerpt
> Um, I'm going to get started. >> The sounds all right. Okay, I can I can hear myself. Okay, great. Uh, thanks for coming everyone. Uh, I'm uh Sander. I'm a research scientist at Google DeepMind. I've been there for over a decade now. Uh I'm on the generative media team. So we work on models like uh VO and nano banana and I want to this talk is kind of a bit of a behind the scenes perspective on like uh everything that goes into training these uh models at scale. Um and so it's going to be focused on uh diffusion models because that's sort of the the the modeling paradigm that at least nowadays people tend to use for generating audiovisisual data which is a bit different from uh the language...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/xOP1PM8fwnk.txt]]
- Description cue: Speaker info:

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Coding Agents**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://sander.ai/2025/04/15/latents.html>
