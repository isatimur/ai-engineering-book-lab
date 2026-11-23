---
video_id: "rD23-VZZHOo"
playlist_index: 147
title: "Serving Voice AI at $1/hr: Open-source, LoRAs, Latency, Load Balancing - Neil Dwyer, Gabber"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=rD23-VZZHOo"
duration: "16:09"
duration_seconds: 969
view_count: 6731
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/rD23-VZZHOo.txt"
themes:
  - "Voice & Realtime"
  - "Models & Inference"
ingested_at: "2026-04-24T11:41:12+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Neil Dwyer, CTO of Gabber, explains how a small team self-hosts Orpheus, an open-source real-time TTS model built on a 3B Llama, to make consumer voice AI cheap, since end-to-end platforms can cost over $5 an hour. Key lessons: Orpheus needs about 85 audio tokens per second to keep up with real time; LoRA fine-tunes give emotive voice clones and can also train away 600 ms of leading silence, cutting P50 latency to about 100 ms; FP8 dynamic quantization lets L40S GPUs batch 10 streams at 95 to 105 tokens per second; and a consistent hash ring keeps each session on a GPU that holds its LoRA."
---
# Serving Voice AI at $1/hr: Open-source, LoRAs, Latency, Load Balancing - Neil Dwyer, Gabber

## Summary
Neil Dwyer is CTO of Gabber, a small startup that provides real-time infrastructure for AI personas: voice, memory, tool calling and soon video input. His background is real-time media: game streaming infrastructure at a company later acquired by Amazon, a multiplayer web-games startup, and then LiveKit, where he wrote the first code of the LiveKit agents platform. The talk is a field report on serving the open-source Orpheus TTS model in production.

**Why self-host**
Gabber targets consumer apps: AI companions, NPCs, therapists, personal trainers and toys. Some voice platforms cost upwards of $5 an hour end to end, which does not work for about 90% of consumer apps; most need something close to free. AI girlfriend apps came first because users already pay per credit. To reach everyone else, Gabber had to run its own models on its own GPUs. Orpheus was the first good open-source model for real-time streaming rather than slower-than-real-time generation. Gabber put it on an H100, a tweet went viral, and the company split into "before Orpheus and after Orpheus."

**How Orpheus works**
It starts as a 3-billion-parameter Llama, pre-trained on about 100,000 hours of voice plus text data, and outputs tokens for an open-source 24 kHz audio codec. One second of audio is about 85 tokens, so serving needs 90 to 100 tokens per second or the audio has gaps.

**LoRA clones**
One-shot cloning works poorly with only 100,000 hours of pre-training, so Gabber uses low-rank fine-tunes (rank 16, alpha 32, nearly all projections). His live demo cloned his brother Jack's voice from only 10 minutes of audio (30 is better), overfit across five epochs, yet still emotive: "I'm kind of sick" sounded sad.

**Latency and head-of-line silence**
Latency comes from time to first token, tokens per second, network, and — the biggest cause — what he calls head-of-line silence. A default Orpheus voice starts with about 600 ms of silence. Filtering it out does not help much, because the GPU still spends time generating those tokens while running barely faster than real time. A LoRA fine-tune trained the silence away, giving about 100 ms P50: half a second "basically for free." This matters because the pipeline starts the LLM during the end-of-turn wait, begins audio after two sentences for emotional context, and has about 1.5 seconds before a reply sounds bad.

**Serving stack**
Gabber needed batching, many LoRAs in one batch on one GPU, and one load balancer. An open-source inference server did all three. FP16 was slower than real time on L40S GPUs, but FP8 dynamic quantization, with no calibration work, reached 105 tokens per second on base voices and 95 on LoRA voices at batch size 10.

**Sticky load balancing**
LoRAs weigh 100 to 200 MB, and sessions can stream input and run arbitrarily long (storytelling), so a session must stay on one GPU that has its LoRA loaded. Gabber uses a textbook consistent hash ring with virtual nodes: removing a server moves only a few sessions, and a popular clone can be added to more servers. A WebRTC backend terminates clients, connects to any GPU over websockets, asks a shared store which GPU owns the session, and proxies over private TCP.

## Why it matters
- Puts a cost frame on voice AI: over $5 an hour fails most consumer apps, which pushes teams to self-host open models.
- Turns real-time TTS into one sizing number: about 85 audio tokens per second of speech, so the serving stack must sustain 90 to 100.
- Shows LoRA fine-tuning used for latency, not only voice: training away 600 ms of leading silence bought half a second.
- Gives a reusable latency budget: start the LLM during the end-of-turn wait and get first audio out within about 1.5 seconds.
- Offers a simple multi-LoRA routing design (consistent hash ring plus proxy) that a small team can run.

## Metadata
- Video: https://www.youtube.com/watch?v=rD23-VZZHOo
- Duration: 16:09
- Playlist index: 147
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Voice & Realtime]]
- [[Models & Inference]]

## Transcript excerpt
> [Music] I'm Neil. That's that's Jack in the in the front there, but it's just me. Um, so yeah, we're really just going to talk about our experience um ho hosting Orpheus uh inference um for our real real time stack. So, I'm Neil um the CTO at a company called Gabber, small startup. Uh but I spent a lot of my career doing real-time media stuff. So, sending audio and video around the internet. Um started at a company called Bibo. Um was ultimately acquired by Amazon. But, uh there I was doing a lot of we did like a game streaming app kind of like OBS. Um built uh a lot of the streaming infrastructure there. Built a ML pipeline to watch people play video games. Um, so they would watch people...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/rD23-VZZHOo.txt]]
- Description cue: This is a talk that goes over our experience deploying Orpheus (Emotive, Realtime TTS) to production. It will cover topics:

## Book angles
- Could support a chapter/section on **Voice & Realtime**.
- Could support a chapter/section on **Models & Inference**.
