---
video_id: "DeFF3J8T5Pk"
playlist_index: 316
title: "How fast are LLM inference engines anyway? — Charles Frye, Modal"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=DeFF3J8T5Pk"
duration: "16:07"
duration_seconds: 967
view_count: 1765
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/DeFF3J8T5Pk.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:13:21+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Charles Frye of Modal argues that open-weights models plus mature open-source inference engines now make self-hosting sensible. He presents Modal's LLM almanac, a public benchmark of about ten open models on three open-source engines across about ten context lengths, run out of the box on one H100 per replica. His main finding: prefill-heavy workloads (1,024 tokens in, 128 out) get about four times the throughput of decode-heavy ones (128 in, 1,024 out) at almost the same time to first token. So to raise quality within a latency SLO, reach for more context before reasoning."
---
# How fast are LLM inference engines anyway? — Charles Frye, Modal

## Summary
Charles Frye works at Modal and has spoken at AI Engineer since the first summit in 2023. He jokes that for a long time it was the "OpenAI rapper conference", because open models were not good enough to build on. His thesis now: that has flipped. With the Llama, Qwen and DeepSeek families catching up to frontier labs, and with open-source engines handling KV caching, paged attention, multi-token prediction and speculative decoding, "it sort of finally makes sense to self-host". The engines he benchmarks are captioned as VLM, SGLang and Tensor TLM.

**A prediction that held**
In 2023 Frye said that if capability requirements saturate, open models will catch up to proprietary ones and then dominate those cases, as with operating systems, databases and programming languages. He says that happened. Most inference libraries from that time are gone, but the VLM engine survived.

**Why Modal built the almanac**
Customers kept asking questions like how fast an 8-billion-parameter Llama runs on SGLang with 128 tokens in and 1,024 out. At first each answer took days to get trustworthy packages and numbers, then an hour or two, then 15 to 20 minutes with their own benchmarking software. Applying a performance mantra, "do it when they're not looking", Modal precomputed a large benchmark: about ten models, three engines, about ten context lengths. It is published as an LLM almanac page on modal.com, with methodology, open-source code, an executive summary and snippets you can run with `uvx modal run`. All numbers are out-of-the-box settings. Frye invites contributions of tuned configurations, especially for the engine with many cryptic knobs.

**Reading the results**
- Latency targets: 1 second to first token is a common SLO. 300 ms is a tighter interactive one, which he calls a made-up number that became real through repetition.
- A Qwen 3 mixture-of-experts model on VLM serves about one request per second at 128 in, 1,024 out under a 300 ms first-token limit. SGLang's support for the 8-bit quant was buggy, so only VLM results exist for it.
- Gemma 3 27B ran only in BF16 at first and gets about the same throughput, which suggests less optimization work. It showed the biggest gap between SGLang and VLM.
- Flipping to 1,024 in, 128 out (decode-dominated to prefill-dominated) gives about four requests per second, roughly a 4x gain, with almost identical time to first token despite ten times more input. He calls it "basically a free lunch".

**The design lesson**
Prefill is parallel matrix-matrix work that loads weights once and reuses them. Decode is autoregressive and memory-bound. With FP8 or FP4 on newer GPUs the gap should grow, since multiply cost is roughly quadratic in bit width. So when a product owner wants better quality without breaking latency, "don't immediately reach for reasoning. Reach for context instead."

**Methodology**
Numbers are per replica, one H100. You reach high total QPS by scaling out. To find maximum throughput they send a thousand requests at once. For minimum latency they send one request at a time. They sweep between the two, since queueing theory says latency blows up past the maximum.

## Why it matters
- Gives a concrete, public data source and method for sizing self-hosted open-model inference, instead of vendor claims.
- The 4x prefill-versus-decode result, at nearly flat time to first token, is a strong argument to spend tokens on context before spending them on reasoning when latency matters.
- Ties engine performance to how much optimization work a model family has received, so a newer or less popular model can be slower than its size suggests.
- The throughput sweep (all-at-once for maximum RPS, one-at-a-time for minimum latency) is a reusable benchmarking recipe for any serving stack.
- Frames when self-hosting now makes sense: saturated capability needs, cost of large backfill jobs, and custom models too expensive to run on a provider.

## Metadata
- Video: https://www.youtube.com/watch?v=DeFF3J8T5Pk
- Duration: 16:07
- Playlist index: 316
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] Thanks everybody for coming. Um, yeah, I wanted to talk about some work I've done recently on trying to figure out uh just how fast these inference engines are when you run open models on them. Uh so the kind of been talking at AI engineer since it was AI engineer summit two years ago. Um and the for a long time it's basically been the like OpenAI rapper conference, right? It's like because just because yeah, what am I going to do? Am I going to run an agent with BERT? Probably not. Um, and that was like it was exciting to talk about all these cool new technologies, see people building stuff like cursor on top of them or Devon. Um, but for me as somebody coming from like having...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/DeFF3J8T5Pk.txt]]
- Description cue: Open weights models and open source inference servers have made massive strides in the year since we last got together at AIE World's Fair.

## Book angles
- Could support a chapter/section on **Models & Inference**.
