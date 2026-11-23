---
video_id: "Ahtaha9fEM0"
playlist_index: 173
title: "Introduction to LLM serving with SGLang - Philip Kiely and Yineng Zhang, Baseten"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Ahtaha9fEM0"
duration: "43:42"
duration_seconds: 2622
view_count: 4167
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Ahtaha9fEM0.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T11:42:25+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Philip Kiely, a Baseten developer advocate, and Yineng Zhang, an SGLang core maintainer and Baseten engineer, run a hands-on workshop on serving LLMs with SGLang, the open-source runtime that grew from an arXiv paper to almost 15,000 GitHub stars in 18 months. Their thesis: performance with SGLang is about knowing its flags and how they interact. Zhang shows that raising the CUDA graph max batch size above the L4 default of 8 keeps CUDA graphs on during decode, and that Eagle 3 speculative decoding needs a parameter sweep on prompts that match the real workload. Baseten picks SGLang for how easy it is to configure and extend."
---
# Introduction to LLM serving with SGLang - Philip Kiely and Yineng Zhang, Baseten

## Summary
Philip Kiely is a developer advocate at Baseten. Yineng Zhang is an SGLang core maintainer, inference lead on the project, a FlashInfer contributor and a Baseten software engineer; he came to SGLang from click-through-rate ranking model optimization. Together they run a workshop that deploys models on cheap L4 GPUs (which support FP8) and then tunes them.

**What SGLang is and why teams pick it**
SGLang is an open-source fast serving framework for LLMs and vision models, usually named alongside vLLM and TensorRT-LLM. Kiely lists its strengths: strong performance across many GPUs, production readiness, day-zero support for new Qwen and DeepSeek releases, and an open community, so "you can fix it" when something breaks. Users include Baseten, xAI, inference and cloud providers, research labs and universities. The arXiv paper came out in December 2023; 18 months later the repo has almost 15,000 stars.

**The core lesson: it is all flags**
Serving with SGLang is one launch-server command plus flags. The skill is knowing the flags, the support matrix and how they interact. A heavy speculation algorithm plus a very large batch size will not go well; quantization plus other optimizations will. In the workshop, attendees package the command with Truss, a YAML config, and ship it to a Baseten GPU. Changing the accelerator line moves the same config to an H100.

**Demo 1: CUDA graph max batch size**
Zhang launches Llama 3 8B Instruct on an L4 with the FA3 attention backend and drives traffic with an LM eval tool. He uses GSM8K at concurrency 128, 8-shot, about 200 prompts. The server log shows the default CUDA graph max batch size on L4 is 8. With 10 running requests, decode runs with CUDA graphs off, at about 15 tokens per second per user. He relaunches with the max set to 32, and decode now shows CUDA graphs on. He admits the two runs are "not easy to compare." The method is the point: read the server log during a realistic workload, see that CUDA graphs are off during decode, and raise the limit.

**Demo 2: Eagle 3 speculative decoding**
Eagle builds its draft model from several layers of the target model, not from a separate small model. Its token acceptance rate is higher, and a higher acceptance rate means more speed. The config sets the algorithm, the draft model path, the number of steps, top-k and draft tokens. For example, depth 3 with top-k 1 means at most 4 draft tokens. A bundled script sweeps combinations across batch sizes 1 to 16. Kiely's warning: benchmark on prompts that match production, because speculation is "very topic and content dependent."

**Codebase and Q&A**
The repo has the SRT runtime (PD disaggregation, constrained decoding, function calling, an OpenAI-compatible server), a kernel library, a cache-aware router and a front-end language. New models can copy the Llama implementation as a reference. Baseten uses all three runtimes and leans on TensorRT-LLM most. It picks vLLM for broad compatibility, for example Gemma at launch. For air-gapped defence use, they say to pin and inspect an open-source release and run it in your own VPC.

## Why it matters
- The CUDA graph demo is a small, concrete example of a default that silently caps decode performance once real concurrency exceeds it.
- The Eagle 3 advice to tune on prompts that match production applies to any speculative decoding setup.
- It gives a practitioner's comparison of runtimes: SGLang for extensibility, vLLM for compatibility, TensorRT-LLM as Baseten's heaviest-used engine.
- It frames open-source runtimes as a way to unblock yourself on new models without waiting for core developers.

## Metadata
- Video: https://www.youtube.com/watch?v=Ahtaha9fEM0
- Duration: 43:42
- Playlist index: 173
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] Hey everyone. Um, so we're going to we're going to go ahead and get started here. Um, we've got a nice close group here today. Um, and that's I think to everyone's benefit. Um, this workshop is really for you. You know, I love the sound of my own voice. I love talking. That's why I'm a developer advocate. Um, but the, you know, the the purpose of this workshop is to help you get comfortable with SG lang. So, if you have questions, if you have ideas, if you have bugs, uh, askang um or or me. Uh, and we're we're definitely going to be able to tailor this workshop to you and your interests and what you're working on. Um, so the title of this workshop is an introduction to LLM serving...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Ahtaha9fEM0.txt]]
- Description cue: Do you want to learn how to serve models like DeepSeek and Qwen with SOTA speeds on launch day? SGLang is an open-source fast serving framework for LLMs and VLMs that generates trillions of...

## Book angles
- Could support a chapter/section on **Models & Inference**.
