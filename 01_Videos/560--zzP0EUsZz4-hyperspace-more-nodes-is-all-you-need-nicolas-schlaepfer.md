---
video_id: "-zzP0EUsZz4"
playlist_index: 560
title: "Hyperspace  More Nodes Is All You Need: Nicolas Schlaepfer"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-zzP0EUsZz4"
duration: "5:48"
duration_seconds: 348
view_count: 2214
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/-zzP0EUsZz4.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:23:53+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Nicolas Schlaepfer, an AI engineer at Hyperspace, a decentralized AI network with no GPUs of its own that runs inference on community computers, launches the Hyperspace product in a five-minute demo. A fine-tuned planning model (Hyper Engine V3) turns a query into a DAG in JSON, streamed into an editable node editor; each node runs with a reasoning model and a Llama 3 70B summarizer, can execute Python in a terminal, and can scrape the web into markdown. The thesis: a mix of many diverse models beats one big closed-source model."
---
# Hyperspace  More Nodes Is All You Need: Nicolas Schlaepfer

## Summary
Nicolas Schlaepfer is an AI engineer at Hyperspace. This is a five-minute product launch, not a deep technical talk. Hyperspace calls itself a decentralized AI network with "no gpus" of its own. Community members contribute compute from their personal computers. Its existing app, aios, runs on Windows and Mac and uses llama.cpp for inference, so a user can chat with a model served by "somebody in Belgium". The thesis behind the new product: one big closed-source model is not the answer; a mix of many diverse experts gives the best AI experience.

**The product: planning as a DAG**
Hyperspace mixes prompt engineering, a visual React Flow editor, Python execution and web browsing for retrieval. The core is a fine-tuned model that outputs agentic plans. A query goes in, and a methodical plan comes out as a DAG in JSON. The orchestration model is called Hyper Engine V3, and it streams nodes into the editor one at a time.

**User control in the node editor**
The demo stresses that the user stays in control. Each node has a title, a task description and an expected output, and the user can edit all three. The user can also add as many nodes as they like before execution. The editor sits next to a terminal and targets power users.

**How a node runs**
Each node builds its own query from three inputs: the overall goal, the local goal of the node, and the output of the previous node. Two models do the work. A reasoning model handles reasoning, and Llama 3 70B handles summarization. Schlaepfer says the split gives a more diverse set of synthesized answers. Nodes that produce Python can run it, and a terminal opens with the output.

**Agent primitives**
The team built in-house web scraping with Puppeteer and Beautiful Soup, converting HTML to markdown that is easier for LLMs to digest. A virtual file system tracks the working directory. The stated aim is to supply the primitives an agent needs: memory, Python execution, planning and code generation. Access was to open through a waitlist later that week.

## Why it matters
- A concrete example of plan-then-execute agent design: a dedicated fine-tuned model emits the whole plan as a JSON DAG before any step runs.
- Shows a human-in-the-loop pattern where the plan is editable data (title, task, expected output per node), not hidden reasoning.
- Each node's context is explicit: overall goal, local goal and previous output, a simple recipe for context passing between steps.
- Represents the decentralized-inference bet: consumer machines running llama.cpp instead of owned GPUs, paired with a many-models philosophy.

## Metadata
- Video: https://www.youtube.com/watch?v=-zzP0EUsZz4
- Duration: 5:48
- Playlist index: 560
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] hello everybody uh my name is Nicholas schlapfer I'm an AI engineer I think I'm at the right place um today I'm going to be pronouncing uh a new product we've been working on at hyperspace um a little bit about us uh we are a decentralized AI network uh we have no gpus um we're building a community who takes uh the resources from their personal computer and contributes uh to our decentralized Network um we have a product currently out called aios um you can download it for Windows and Mac it uses llama CPP and does inference so technically you can download it get inference from somebody in Belgium and you can have a chat experience like that so we're hoping to oh actually sorry um...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-zzP0EUsZz4.txt]]
- Description cue: Hyperspace is launching a new kind of agentic planning model, alongwith a breakthrough new AI application for power users. This is meant to run on the Hyperspace peer-to-peer AI network: the...

## Book angles
- Could support a chapter/section on **Models & Inference**.
