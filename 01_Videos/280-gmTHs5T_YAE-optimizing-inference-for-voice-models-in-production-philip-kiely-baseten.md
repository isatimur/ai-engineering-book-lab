---
video_id: "gmTHs5T_YAE"
playlist_index: 280
title: "Optimizing inference for voice models in production - Philip Kiely, Baseten"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=gmTHs5T_YAE"
duration: "15:13"
duration_seconds: 913
view_count: 3081
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/gmTHs5T_YAE.txt"
themes:
  - "Models & Inference"
  - "Voice & Realtime"
ingested_at: "2026-04-24T12:11:51+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Philip Kiely of Baseten argues that TTS models like Orpheus are essentially LLMs (a Llama 3.2 3B backbone), so LLM tooling such as TensorRT-LLM and FP8 quantization, including the KV cache, makes them fast. The goal differs from LLMs: once you reach the roughly 83 tokens per second a real-time stream needs, optimize time to first byte and concurrency instead. With a compiled audio decoder and 15 ms dynamic batching, the stack reaches about 150 ms TTFB and more concurrent streams on half an H100. His main warning: client code, sessions, network hops and DNS hairpins can add back more latency than runtime work saves."
---
# Optimizing inference for voice models in production - Philip Kiely, Baseten

## Summary
Philip Kiely works at Baseten, a model inference platform that runs production workloads for AI-native startups and enterprises. His talk covers TTS model architecture, the metrics that matter, runtime optimizations, how to measure success, and how infrastructure and client code can undo all that work. His running example is Orpheus TTS from Canopy Labs, chosen because it is open source and good.

**Everything is an LLM (usefully wrong)**
Kiely splits models into autoregressive transformers that are LLMs or close to them (embeddings, Whisper-style transcription, TTS) and diffusion-style image models, a very different problem. Orpheus has a Llama 3.2 3B backbone; its Hugging Face config lists a Llama causal-LM architecture. So the normal Llama tooling applies. The changes to watch are a larger vocabulary for speech tokens such as laughs, and an extended context length that every optimization must support.

**Different goals from LLMs**
Time to first token becomes time to first byte, or even time to first sentence. Tokens per second matter differently: for an LLM you want as many as possible, but Orpheus needs only about 83 tokens per second for a real-time stream, which is nothing for a 3B model. Past that mark, the targets are time to first byte for latency and concurrency for cost: fit as many voice agents as possible on one GPU or less.

**Runtime techniques**
- Run on TensorRT-LLM, which he finds faster than common alternatives despite a harder setup.
- Quantize to FP8 on Hopper GPUs, including the KV cache, without the quality loss small models often show.
- Treat the audio side as its own problem: run the audio decoder on the GPU with torch.compile and PyTorch inference mode.
- Use dynamic batching for audio decoding, flushing a batch every 15 milliseconds; a bigger batch trades latency for throughput. Token-level continuous batching is not there yet.
- Profiling showed the system is often CPU-bound, because both GPU loops touch the CPU. He calls that a good place to be, since CPUs are cheap to add.

**Results**
On an H100 MIG, half an H100, which suits small models that want Hopper and FP8 without paying for 80 GB, an off-the-shelf baseline served 16 simultaneous streams under variable traffic and 24 under constant traffic. The optimized stack supports much higher concurrency, a few cents per hour of conversation at list prices, and about 150 ms time to first byte in real-world tests. At volume that beats per-token APIs.

**Do not add the latency back**
A quick-start client using requests sends calls one at a time and opens a new session each time. Production code should look like a benchmark script: a multiprocess pool, a shared session, and real concurrency. Voice stacks often use LiveKit or Pipecat with WebSockets or gRPC. Sending a query to New York instead of California can erase the runtime gains. TTS is only one of three parts of a voice agent: listening, thinking, talking. Keep the models in the same data center. A 10 ms DNS hairpin across four or five pipeline steps (chunking, an interruption model and so on) costs 40 to 50 ms, which can be 10% of a voice SLA.

## Why it matters
- Shows that TTS inference is an LLM serving problem, so existing LLM tools (TensorRT-LLM, FP8 weights and KV cache) carry over directly.
- Redefines the optimization target for voice: hit the real-time token rate (about 83 tokens per second for Orpheus), then spend effort on time to first byte and concurrency, not raw throughput.
- Gives concrete serving numbers: about 150 ms TTFB, a baseline of 16-24 streams per half H100, and a few cents per hour of conversation.
- Makes the case that infrastructure and client code (shared sessions, co-located models, no DNS hairpins) can matter more than runtime tuning for end-to-end voice latency.

## Metadata
- Video: https://www.youtube.com/watch?v=gmTHs5T_YAE
- Duration: 15:13
- Playlist index: 280
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Voice & Realtime]]

## Transcript excerpt
> [Music] Uh hello everyone. Thank you so much for being here for uh sticking around for this talk. Um I'm going to be talking about optimizing inference for voice models in production. I'm going to be talking mostly about the runtime component but also just a little bit on the infrastructure side. Um just a quick introduction. Um I'm Philip from B 10. Base 10 is a model inference platform. Uh we run production workloads for a wide variety of AI native startups and enterprises. Um I'm based in here in SF. Um I actually just moved here. It's really awesome. My favorite part about being in SF is much better sports teams than I had in Chicago. Um and uh one of my favorite voice models is Orpheus...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/gmTHs5T_YAE.txt]]
- Description cue: How do you get time to first byte (TTFB) below 150 milliseconds for voice models -- and scale it in production? As it turns out, open-source TTS models like Orpheus have an LLM backbone that...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Voice & Realtime**.
