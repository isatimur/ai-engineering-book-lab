---
video_id: hacEQHHhu2Q
playlist_index: 936
title: "Why Large? Tiny LMs & Agents on Edge/Robotics — Cormac Brick, Google"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=hacEQHHhu2Q"
duration: "21:45"
duration_seconds: 1305
view_count: 3200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/hacEQHHhu2Q.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:22:33+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Cormac Brick, tech lead on Google's AI Edge team, argues that intelligence will reach most devices only through tiny models. Rising DRAM cost is the main edge constraint. Small 1 to 4 billion parameter models such as Gemma E2B need about 4 GB of RAM and work with zero-shot prompts. Tiny models up to about 500 million parameters fit far more devices but need fine-tuning on 10,000 to 10 million synthetic samples. Examples: a 270M Function Gemma mobile-actions model at over 86% reliability, and an offline voice dictation app built on two tiny Gemma models."
---

# Why Large? Tiny LMs & Agents on Edge/Robotics — Cormac Brick, Google

## Summary
Cormac Brick is a tech lead on the AI Edge team at Google. The team builds open-source runtimes for edge deployment, delivers edge AI to Google's own products, and works with the Gemma team so its models run well on many devices. His thesis: if intelligence is to reach "lots and lots and lots of devices" and not only expensive robots, we need tiny models. The talk maps what small and tiny models can do today and how to ship them.

**Why edge, and what stops it**
Edge AI gives low and steady latency, privacy, offline use and savings: cheap cloud tokens still add up when multiplied by a very large user base. The new constraint is DRAM cost. Some phone makers ship less DRAM this year, and one Raspberry Pi model costs about 2.5x its launch price. So teams must think hard about quantization and about the smallest model that can do the task. Research hours also go mostly to large models, so the low end is less studied.

**Small models: 1 to 4 billion parameters**
These ship inside phone operating systems and some apps. The playbook is mostly zero-shot prompting, plus LoRA adapters, and they handle function calling and agent skills fairly well. Gemma E2B reasons about as well as a much larger Gemma 3 model from 12 months earlier. Mixed 2-, 4- and 8-bit quantization brings it to about 2.9 bits per weight, or 841 MB for the text weights. Add runtime and KV cache and you need about 2 GB of active RAM, hence a 4 GB-plus rule of thumb per device. Decode speed is about 7.6 tokens per second on a Raspberry Pi (about 2x with MTP), up to 24 on a Jetson Nano board, and 31 on a Qualcomm IoT board with almost 4,000 tokens per second prefill. A high-resolution image is 1,120 tokens, so the NPU can process about three such frames per second.

**Why go smaller**
Small models still miss older laptops and cheap consumer devices. Some products need faster interaction. Often the model is "one tiny thing in a corner" that must run beside everything else.

**Tiny models: up to about 500 million parameters**
They need under 2 GB of RAM and run very fast, but the playbook is harder. First try fixed-task models: ASR, vision (for example a 0.5B Apple vision-language model) and embeddings. Otherwise fine-tune. Gemma 3 and Function Gemma start at 270 million parameters and decode at 45 tokens per second on a Raspberry Pi. A fine-tuned mobile-actions model maps free text to 10 functions, such as calendar or Wi-Fi, at over 86% reliability. With an ASR model in front, it gives voice-to-function-calling, which matters for devices with hard settings menus. The training data set, mobile actions, is open on Hugging Face.

**The fine-tuning recipe**
Pick a base model, check speed and memory footprint, then generate synthetic data. The team finds 10,000 to 10 million samples enough for very high reliability. For tasks like summarization or proofreading, a fine-tuned tiny model can match or beat a 2 to 4 billion parameter model.

**Production examples**
An iOS voice-dictation app runs fully offline on two fine-tuned tiny Gemma models: ASR and text cleanup with personal word biasing. Chrome's built-in summarization and proofreading APIs use tiny models to reach more users. The AI Edge Gallery app for iOS and Android is open source.

## Why it matters
- It ties model choice to hardware cost: DRAM prices, not model quality, set which devices can run AI at all.
- The memory math (2.9 bits per weight, 841 MB of weights, about 2 GB active, 4 GB device rule) is a concrete sizing method for edge deployments.
- The 10,000 to 10 million synthetic-sample recipe shows when fine-tuning a tiny model beats prompting a bigger one.
- Voice-to-function-calling at over 86% reliability on a 270M model shows that narrow, local tool-calling agents are practical today.

## Metadata
- Video: https://www.youtube.com/watch?v=hacEQHHhu2Q
- Duration: 21:45
- Playlist index: 936
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Yeah. So, yeah, a bit of a change of speed from the last two talks. So, we're looking at kind of higherend robots. If we want uh for intelligence to get into lots and lots and lots of devices and not just really expensive robots, we are going to need tiny models. And this talk is about what is the state-of-the-art of tiny models at the moment. What are the things they're good at? Um, and what are the things you can go start building today. Okay. So, yeah, firstly a bit of background like briefly on me and and the team I work on. Then we're going to take a look at small models that you may be kind of more familiar with. Just kind of explore what they can do, what they can't do um...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/hacEQHHhu2Q.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/google-ai-edge/gallery>
