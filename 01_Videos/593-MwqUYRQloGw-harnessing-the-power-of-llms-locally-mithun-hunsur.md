---
video_id: "MwqUYRQloGw"
playlist_index: 593
title: "Harnessing the Power of LLMs Locally: Mithun Hunsur"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=MwqUYRQloGw"
duration: "17:09"
duration_seconds: 1029
view_count: 2423
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/MwqUYRQloGw.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:25:25+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Mithun Hunsur, maintainer of llm, a Rust library for local LLM inference that grew out of rewriting llama.cpp in Rust, argues that local models trade raw size for control: immediate streaming of the prompt, machine-cost instead of per-token pricing, cheap fine-tunes, privacy, and direct control of sampling. Quantization makes them fit consumer hardware. He shows a Discord bot, a system-wide autocomplete, and a Wikipedia date-extraction pipeline where a small fine-tuned model replaced GPT-3/4 as too slow and costly. Costs: hardware limits, the fast-cheap-good trade-off, ecosystem churn, and odd licences."
---
# Harnessing the Power of LLMs Locally: Mithun Hunsur

## Summary
Mithun Hunsur, an Australian in Sweden who builds a game engine by day, maintains llm, a Rust library that is "an all in one solution for local inference of llms". His case: cloud models are bigger, but local models, which you own and run on your own machine, win on control.

**Cloud versus local**
- Size: size is a rough proxy for intelligence, and the closed models are far larger than open ones, but a smaller, focused model can beat a large general one.
- Latency: cloud models need the full prompt before inference; locally you can feed the prompt as it arrives, which matters for live conversation.
- Cost: the cloud charges per token; locally you pay for the machine, and a machine you already own is "basically free".
- Customisation: cloud fine-tuning often costs more to train and to use; locally there are hundreds of custom models, and fine-tuning your own is easy.
- Privacy: "local mods let you privately embarrass yourself".
Quantization is the "secret source": it lossily compresses a model while keeping most of its quality, so it fits consumer memory and runs faster.

**Origins and principles**
When he first saw llama.cpp in March, he set out to rewrite it in Rust; another developer beat him to it, they merged projects, and he became maintainer. Six principles: it must be a library (llama.cpp was then an application), customisable at every point, multi-architecture behind one interface, Rust-native rather than bindings, backend-agnostic (CPU, GPU), and identical across Windows, Linux and macOS. The API loads a model, opens sessions that can be reused for conversation without re-feeding context, and streams tokens through a callback; the inference call is just a helper loop, and loading, inference and sampling are all customisation points. A demo ran a 7B model on a MacBook CPU, then faster with GPU acceleration.

**What he built with it**
- A Discord bot: request, generation thread, channel, response task. Swap Discord for HTTP and it is the same pattern.
- A system-wide autocomplete: take the text left of the cursor, prompt a model, type the result. It works offline and can use a model fine-tuned on your own writing.
- A real data-extraction task: a timeline of the dates in Wikipedia. Regex cannot capture context; GPT-3 and 4 were imperfect even after prompt engineering, and too expensive and slow for millions of dates. He generated a representative dataset with GPT-3, built a tool to review and fix data points, and fine-tuned a "small fast and consistent model" that returns structured output he treats as a black-box function.

**Benefits and costs**
Benefits: escape Python dependency hell by shipping self-contained binaries, which unlocks desktop apps; the Rust ecosystem lets one language cover bot, utility, pipeline and explorer; direct control of token sampling instead of round-tripping logits; and the chance to try new papers before cloud vendors ship them. Costs: you still need real hardware; the fast, cheap, good triangle forces trade-offs; ecosystem churn breaks workflows even with a standard file format; and open models often carry strange licence clauses, so they are not "capital F free".

## Why it matters
- It gives a compact, five-axis comparison of cloud and local models (size, latency, cost, customisation, privacy) that a chapter on deployment choices can reuse.
- The Wikipedia date pipeline is a worked case of distilling GPT output into a small fine-tuned model when frontier APIs are too slow and costly at millions of items.
- It names quantization as the enabler of local inference and explains why smaller weights also run faster.
- Its candid list of costs, hardware, churn that breaks workflows, and restrictive licences, balances the usual enthusiasm for open models.
- The session-reuse and callback design shows what library-level control over inference and sampling looks like, in contrast to hosted APIs.

## Metadata
- Video: https://www.youtube.com/watch?v=MwqUYRQloGw
- Duration: 17:09
- Playlist index: 593
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] right good day everyone good to see you all today I'm here to tell you to how to harness the power of local LMS using our rust Library quick intro I'm aone as you just heard but I go by Phil packs online I hail from Australia H the accent but I live in Sweden I do a lot of things for computers but my day job is at ambient where I build a game engine of the future today though I'm here to talk to you about lm. RS a rushed library that I maintain so lm. RS or LM between friends I realized that after dis ambigu when I started when I signed the Simon newsletter it's an all in one solution for local inference of llms but what does that actually mean well most of the models we've...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/MwqUYRQloGw.txt]]
- Description cue: Discover llm, a revolutionary Rust library that enables developers to harness the potential of large language models (LLMs) locally. By seamlessly integrating with the Rust ecosystem, llm empowers...

## Book angles
- Could support a chapter/section on **Models & Inference**.
