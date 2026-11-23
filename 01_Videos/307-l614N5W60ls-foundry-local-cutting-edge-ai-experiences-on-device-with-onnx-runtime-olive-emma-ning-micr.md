---
video_id: "l614N5W60ls"
playlist_index: 307
title: "Foundry Local: Cutting-Edge AI experiences on device with ONNX Runtime/Olive — Emma Ning, Microsoft"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=l614N5W60ls"
duration: "22:52"
duration_seconds: 1372
view_count: 584
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/l614N5W60ls.txt"
themes:
  - "Models & Inference"
  - "MCP & Tooling"
ingested_at: "2026-04-24T12:12:59+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Emma Ning, a product manager in Microsoft's AI framework team, presents Foundry Local, a Windows and macOS stack for cross-platform apps powered by local AI. She gives four reasons for local AI (offline use, privacy, cost at scale, real-time latency) and shows the layers: ONNX Runtime for hardware acceleration, a management service that pulls models from Azure AI Foundry, a CLI, and Python and JavaScript SDKs. Live demos compare two small models, build a document summarizer that runs unchanged on Windows and Mac, and run a private-preview local agent that combines one model with MCP servers to OCR a receipt."
---
# Foundry Local: Cutting-Edge AI experiences on device with ONNX Runtime/Olive — Emma Ning, Microsoft

## Summary
Emma Ning is a product manager at Microsoft, in the AI framework team that works on ONNX Runtime and Olive. Her talk introduces Foundry Local, which lets developers build cross-platform applications powered by local AI. She notes that her live demos do not depend on the conference Wi-Fi, because everything runs on the laptop.

**Why local AI**
Ning gives four reasons drawn from customer conversations:
- Low bandwidth or offline use.
- Privacy and security: legal documents or patient data that must never leave the device.
- Cost: a game on millions of devices making hundreds of millions of inference calls a day is not sustainable in the cloud.
- Real-time latency that a cloud round trip cannot meet.
She says local AI is ready now because client devices have modern GPUs and NPUs, model makers publish leaner models built for local inference, and runtimes keep adding new optimizations.

**The stack**
Microsoft builds on existing assets. She says Azure AI Foundry is trusted by over 70,000 organizations and offers over 1,900 models, and ONNX Runtime has over 10 million downloads a month. Windows gives reach. Foundry Local stacks these: ONNX Runtime at the bottom to accelerate across hardware, a new management service that hosts models on the device and downloads open-source models from Azure AI Foundry on demand, then a CLI and SDKs. It was announced a month earlier at Microsoft's developer conference and runs on Windows and macOS. On Windows it is built into the platform. Microsoft works with Nvidia, Intel, AMD and Qualcomm to plug in their accelerators. Over 100 customers joined the private preview. In a video, the CEO of Pieces says his team first rolled its own runtime and then used another local runner, but still had versioning, performance and user-experience problems. With Foundry Local they got to a production build fast, with better memory management, time to first token and tokens per second. A second customer pairs it with local speech-to-text for sensitive banking-style data.

**Demos**
- CLI: install with winget or Homebrew; `foundry model list` shows each model in CPU, CUDA, integrated-GPU and NPU variants; `foundry cache` lists downloaded models. A 1.5-billion-parameter model answers at about 90 tokens per second in verbose mode. A larger mini model is slower but gives more detailed answers, and she picks it for her app.
- Cross-platform app: a summarizer for internal project documents that cannot go to the cloud. The JavaScript SDK creates a Foundry Local manager, initializes it with a model name, and points a client at the local endpoint. A teammate on a Mac runs the same code with `npm run start` and picks the smaller model, which gives a shorter summary.
- Local agents (private preview): an agent is one model plus one or more MCP servers. `foundry agent list` shows three samples. The OCR agent uses a file-system MCP server and an OCR MCP server, asks permission for each server and for a directory, then searches for a receipt, extracts the text and returns the total.

**Caveat**
Ning's best-practice note: local models are generally not as capable as cloud models, so do not expect the work a cloud model or cloud agent can do. But they unlock a lot of potential.

## Why it matters
- Gives a crisp four-part case for on-device inference (offline, privacy, cost at scale, latency) that frames when local beats cloud.
- Shows a concrete local-AI architecture: one runtime with hardware-specific model variants, a local model service, and SDKs that make the same app code run on Windows and Mac.
- The model-comparison demo (faster small model versus slower, more detailed one) is a simple example of picking a local model on the speed-quality trade.
- Defines a local agent as one model plus MCP servers with per-server and per-directory permission prompts, a useful pattern for privacy-sensitive agents.
- Includes a candid limit: local models cannot match cloud agents, so scope local work accordingly.

## Metadata
- Video: https://www.youtube.com/watch?v=l614N5W60ls
- Duration: 22:52
- Playlist index: 307
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[MCP & Tooling]]

## Transcript excerpt
> [Music] Hello everybody. Uh my name is Ima. I'm a program man uh product manager at Microsoft. It's a pleasure to talk to you today about Foundry local which enables developers to easily build up crossplatform applications powered by local AI. So let's get started. Uh the first question is if the cloud AI is so powerful why do we need local AI? So here are four key reasons based on our conversations and observations with our customers. So first of all, how does cloud AI work in environments with low network bandwidth or even offline access? Many of you have experienced the bad internet during this conference, right? And a common sentence we have heard from many speakers with live demo is oh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/l614N5W60ls.txt]]
- Description cue: About Emma Ning 
Emma Ning is a Principal PM in the Microsoft AI Framework team, focusing on AI model operationalization and acceleration with ONNX Runtime/Olive for open and interoperable...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **MCP & Tooling**.

