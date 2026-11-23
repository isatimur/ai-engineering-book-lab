---
video_id: "CXsbjcrf_5g"
playlist_index: 385
title: "Text-to-Speech Data Preparation and Fine-tuning Workshop - Ronan McGovern"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=CXsbjcrf_5g"
duration: "34:00"
duration_seconds: 2040
view_count: 1316
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/CXsbjcrf_5g.txt"
themes:
  - "Voice & Realtime"
  - "Models & Inference"
ingested_at: "2026-04-24T12:16:11+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ronan McGovern of Trellis Research walks through fine-tuning Sesame's CSM-1B token-based text-to-speech model on his own voice in one free Colab notebook. He explains audio codebooks and Sesame's 32 hierarchical tokens per window, split between a 1B backbone and a small depth decoder. He builds a data set from a single-speaker YouTube video with yt-dlp and Whisper turbo, fixes transcript spellings by hand, stacks segments into 41 clips of up to 30 seconds, and trains LoRA adapters (rank 32, alpha 16) with Unsloth on a T4. Fine-tuning plus voice cloning gives the closest voice; he suggests about 500 clips for better results."
---
# Text-to-Speech Data Preparation and Fine-tuning Workshop - Ronan McGovern

## Summary
Ronan McGovern runs the Trellis Research YouTube channel. In this hands-on workshop he fine-tunes Sesame's CSM-1B text-to-speech model so it sounds like a specific voice: his own, taken from one of his YouTube videos. Everything runs in one Colab notebook on a free T4 GPU, with the notebook and slides in the Trellis Research GitHub. He also names Orpheus from Canopy Labs as another token-based TTS model.

**How token-based TTS works**
A text LLM predicts the next text token. A TTS model takes text (and ideally earlier text and audio) and predicts the next audio token. Audio becomes discrete through a codebook: a dictionary of vectors for sounds, trained with an encoder-decoder that converts a wave to tokens and back and learns from the reconstruction loss. One token per time step is not enough, so most models use several hierarchical tokens per window. Sesame uses 32: the main 1B transformer predicts the zeroth token and a much smaller depth decoder produces the other 31. The printed architecture shows the backbone, the depth decoder, and the codec model.

**Data preparation**
- Pick a single-speaker video; two speakers need diarization, which the notebook does not support.
- Download with yt-dlp (run in Colab, since elsewhere YouTube may block you) and transcribe with Whisper turbo, which he calls almost as good as large and much faster.
- Read the JSON transcript and find-replace misspellings, such as Trellis with two Ls, then re-upload it.
- Stack Whisper segments until they pass 30 seconds, giving 41 rows, and push the data set to Hugging Face. He thinks about 50 clips of 30 seconds is where fine-tuning starts to have an effect; 20 clips of 10 seconds was not enough. Ending rows on sentence boundaries (NLTK or a regex) would be better.
- The data set needs an audio and a text column, plus an optional source column for speaker ID; it defaults to speaker zero.

**Baseline first**
Before training he runs zero-shot inference: with non-zero temperature you get a random voice, often a woman's. Voice cloning, which passes a sample clip as context, is different from fine-tuning and gets closer to his voice but not all the way.

**Fine-tuning with Unsloth**
- Load CSM-1B in float16 on a T4 (bfloat16 on Ampere or newer). No quantization needed: the model is a few GB and the T4 has 15 GB.
- Apply LoRA adapters to attention (Q, V, O) and MLP layers (gate, up, down), rank 32, alpha 16, with the adapter learning rate scaled to adapter size. Just under 2% of parameters are trainable. No need to train embeddings, since tokens do not change.
- Virtual batch size 8, one epoch, learning rate 2e-4, 8-bit AdamW, constant schedule. He cuts warm-up steps because there are only five steps per epoch. Training takes about 10 minutes, uses under half the GPU memory, and loss falls from about 6.34 to 3.72 and is still falling.
- He notes what a fuller run needs: an eval split, watching eval loss and grad norm (around one or less), and TensorBoard logging.
- Save LoRA adapters only, or merge to 16-bit and push the full model to the hub.

**Results**
The fine-tuned model gives a male voice with a slight Irish accent, but pacing is off and the 'T' in 'tuned' still sounds a bit American. Fine-tuning plus cloning sounds best, even reproducing a natural-sounding slip. About 30 minutes of video was enough; for better results without cloning, aim for about 500 rows of 30 seconds.

## Why it matters
- Gives a clear, compact explanation of codebooks and hierarchical audio tokens, which makes token-based TTS feel like a familiar next-token LLM problem.
- Separates voice cloning (in-context sample) from fine-tuning (weight change) with side-by-side results, and shows the two combine best.
- Concrete data-size guidance for voice fine-tuning: 41 clips works, about 50 thirty-second clips is a floor, about 500 is the target.
- Shows a cheap, reproducible pipeline (yt-dlp, Whisper, Hugging Face, Unsloth LoRA on a free T4) and names the eval and monitoring steps the demo skips.

## Metadata
- Video: https://www.youtube.com/watch?v=CXsbjcrf_5g
- Duration: 34:00
- Playlist index: 385
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Voice & Realtime]]
- [[Models & Inference]]

## Transcript excerpt
> Welcome to this workshop on text to speech model fine-tuning. I'm Ronan of the Trellis Research YouTube channel and today I'll be walking you through data preparation and fine-tuning of Sesame's CSM 1B model. You should be able to follow along. All of the materials are available on the Trellis research GitHub. If you go to AI Worldsfare-2025, you'll be able to find the collab notebook and also the slides that I'm going to go through for this workshop. Now, by the end of this workshop, you should be able to train a texttospech model so that it sounds like a specific voice. You should be able uh to understand how token-based texttospech models work. The one we're going to train today is...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/CXsbjcrf_5g.txt]]
- Description cue: By the end of this workshop, you'll have train Sesame's CSM-1B text-to-speech model on a voice from a Youtube video. The workshop will cover data preparation, fine-tuning and evaluation.

## Book angles
- Could support a chapter/section on **Voice & Realtime**.
- Could support a chapter/section on **Models & Inference**.
