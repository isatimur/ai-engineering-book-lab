---
video_id: "b0xlsQ_6wUQ"
playlist_index: 400
title: "The Future of Qwen: A Generalist Agent Model — Junyang Lin, Alibaba Qwen"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=b0xlsQ_6wUQ"
duration: "25:14"
duration_seconds: 1514
view_count: 8154
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/b0xlsQ_6wUQ.txt"
themes:
  - "Models & Inference"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:16:46+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Junyang Lin of Alibaba's Qwen team argues that the field is moving from training models to training agents, through RL with environment feedback. He walks through Qwen 3: open-weight mixture-of-experts models (235B total with 22B active, and 30B with 3B active), six dense sizes down to a 4B for phones, and a hybrid mode that puts thinking and non-thinking in one model. A thinking budget caps reasoning tokens: on a math benchmark, scores rise from about 40 to over 80 at 32,000 tokens. Qwen 3 supports 119 languages and dialects (up from 29) and better MCP tool use. He also covers a 7B omni model and plans to scale context, modalities and RL."
---
# The Future of Qwen: A Generalist Agent Model — Junyang Lin, Alibaba Qwen

## Summary
Junyang Lin speaks for Alibaba's Qwen team, which builds open large language and multimodal models with the goal of a generalist model and generalist agent. His thesis: "we are moving from the era of training models to training agents", with scaling now coming from reinforcement learning in real environments, not only from pre-training.

**From instruction tuning to RL**
Qwen 2.5 Max, released before the Spring Festival, was a large instruction-tuned model that he says was competitive with the state-of-the-art models of the time. The team then found RL raised reasoning scores steadily: on a 2024 math benchmark, a 32B model climbed from about 65 to 80.

**Qwen 3**
- Sizes: two mixture-of-experts models (235B total with 22B active, and 30B total with only 3B active) plus six dense models. He says the 30B MoE can beat the earlier 32B dense model on some tasks. A distilled 4B model with thinking rivals the previous 72B flagship and runs on mobile devices.
- Hybrid thinking: one model does both reasoning and near-instant chat, switched by prompt or hyperparameter. He calls this possibly a first for open source.
- Thinking budget: a cap on thinking tokens truncates reasoning. On the math benchmark, a small budget scores just over 40 and a 32,000-token budget over 80. If 95% accuracy is enough, an 8,000-token budget may do, so you stop wasting tokens.
- Languages: 119 languages and dialects, up from 29 in Qwen 2.5.
- Agents: stronger coding, MCP support, and tool calls inside the thinking process, so the model thinks, calls a tool, reads feedback and keeps thinking. A demo organises a desktop through file-system tools.

**Multimodal and omni**
Qwen 2.5 VL performs well on vision-language benchmarks, and a visual reasoning model shows the same gains from longer thinking. A 7B omni model accepts text, images, video and audio and outputs text and audio for voice and video chat. It beat Qwen 2.5 VL 7B on vision tasks, but lost some language and agent ability, which the team wants to recover.

**Open source and products**
Most models ship under Apache 2.0, from 0.6B to 235B, with quantized formats including one for Apple devices. A Qwen 3 coder is in progress. Qwen Chat offers WebDev, which turns a short prompt into a deployable website or card, and Deep Research, which plans, searches step by step and writes a PDF report; the team is fine-tuning a model with RL for it.

**What comes next**
More room in pre-training (better data cleaning, multimodal and synthetic data, perhaps RL in pre-training). Scale RL compute for long-horizon reasoning with environment feedback. Scale context to at least 1 million tokens this year for most models, then 10 million. Scale modalities, because vision makes GUI agents and computer use possible, and unify image understanding and generation.

## Why it matters
- The thinking budget gives a concrete cost lever: engineers can trade reasoning tokens for accuracy per task instead of choosing between a reasoning model and a chat model.
- The MoE numbers (3B active beating a 32B dense model on some tasks) support chapters on cheap, fast open-weight inference.
- Interleaving tool calls with thinking is a clear statement of where agent models are heading: reason, act, observe, keep reasoning.
- The roadmap (RL with environments, 1M to 10M context, vision for GUI agents) is a lab's own view of the next scaling axes.
- The omni model's drop in language and agent skill is an honest example of the trade-offs in adding modalities.

## Metadata
- Video: https://www.youtube.com/watch?v=b0xlsQ_6wUQ
- Duration: 25:14
- Playlist index: 400
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[RAG & Retrieval]]

## Transcript excerpt
> Hey everyone, I'm Jinang fromWent team Alib to be here in AI engineer world fair 205 and I'm very excited to share some progress about quen to all of you. I think you guys know about quen and uh maybe you are developers I'm very happy to share some more things about Gwen to all of you. is a large a series of large language models and large multimodel models and uh we have a dream of building a journalist model and generalist agent and before I start I would like to share some important links to all of you uh maybe you know our product our chat interface quench chat uh which is chat.quen.ai AI uh it is very easy to use. You can interact with our latest models. You can use our multimodel...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/b0xlsQ_6wUQ.txt]]
- Description cue: Since Alibaba launched the Qwen series of large models in 2023, the Qwen series of large language models and multimodal large models have been continuously updated and improved. This presentation...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **RAG & Retrieval**.
