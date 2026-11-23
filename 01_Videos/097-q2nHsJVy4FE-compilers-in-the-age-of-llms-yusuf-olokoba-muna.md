---
video_id: "q2nHsJVy4FE"
playlist_index: 97
title: "Compilers in the Age of LLMs — Yusuf Olokoba, Muna"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=q2nHsJVy4FE"
duration: "17:36"
duration_seconds: 1056
view_count: 3828
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/q2nHsJVy4FE.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T11:22:46+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Yusuf Olokoba of Muna argues that the real pain for AI engineers is boring: using more models in more places without new Docker containers and infrastructure each time. His answer is a compiler that turns plain Python inference code into a small self-contained native binary that runs in the cloud, on Apple silicon or anywhere with a C++ compiler, preparing for hybrid inference with small models near users. He walks through tracing via the abstract syntax tree into an IR, type propagation into C++, LLMs that mass-produce the native versions of elementary operations, and wrapping the result in an OpenAI-style client called from Node.js through FFI."
---
# Compilers in the Age of LLMs — Yusuf Olokoba, Muna

## Summary
Yusuf Olokoba of Muna opens with a familiar picture: an OpenAI client in the codebase, Hugging Face tabs, three "playground" repos, and an agentic workflow that is really a chain of HTTP calls. Behind the hype about voice agents and MCP, teams struggle with a boring problem: "How do I use more models in more places" without rebuilding infrastructure each time? Trying a new open model usually means a Dockerfile, a container, owned or rented hosting, and another tool in the agent's context. Developers want an OpenAI-style client that points at any model, local or remote, with minimal code changes. His team's answer is a compiler that turns plain Python into a tiny self-contained binary that runs anywhere.

**Why a compiler**
- Standardization: bring any internal or open-source model and get something easy to call, as simple as changing the model argument when OpenAI ships a new model.
- Hybrid inference: he expects small models near users, on devices or at the edge, to work in tandem with large cloud models. That requires leaving "the cages of Python code and Docker containers" for code closer to the hardware.

**The worked example**
A Python function runs Google's 270-million-parameter Gemma embedding model: it adds task prefixes to input sentences, tokenizes them and returns an embedding matrix for search or RAG. The model is small enough to run fast on consumer hardware. The goal is equivalent C++ and Rust, a compiled binary with all dependencies, and a familiar embeddings-create call.

**Tracing: three attempts**
1. PyTorch 2's Torch FX runs code on fake inputs to build a graph. It failed for two reasons: the tracer only understands PyTorch code, not NumPy or OpenCV, and fake images or dictionaries are much harder to make than fake tensors.
2. LLMs with structured outputs generated traces with almost 100 percent accuracy in their tests but "took way too much time."
3. The "old school" route won: analyze the Python abstract syntax tree with internal heuristics to build an intermediate representation (IR) of input nodes, tokenizer and model calls, and outputs.

**Type propagation**
Python is dynamic; C++ and Rust need fixed types. The compiler takes known types from the function signature and from constants (here, a map of string prefixes), generates a C++ function for each operation (string plus string), reads that function's output type, and flows types through every intermediate variable.

**Where LLMs fit**
This needs a native implementation of every Python operation the compiler meets. That is tractable because code variety comes from combining a fairly small base set of elementary operations, not from a huge number of them. The base set — arithmetic, exponentiation, NumPy and PyTorch operations — is still large, so LLMs generate the C++ and Rust equivalents, letting the team mass-produce them. He says these are fenced with verification and LLM-powered testing, though the talk does not detail how.

**From C++ to a client**
Because nearly every platform has a C or C++ compiler, the generated code compiles to a shared library. Node.js loads it through FFI bindings; the team standardized this scaffolding across compiled functions. Finally, a small client class with a nested embeddings class and a create method maps a model name to a compiled library path, runs it, and shapes the output to match the official OpenAI client — "the official OpenAI client" with access to any open model that fits in a Python function.

## Why it matters
- A concrete pattern for using LLMs inside a deterministic pipeline: the compiler owns structure and types, and LLMs only fill in a bounded set of operation implementations.
- The tracing story is an honest tradeoff record: LLM tracing was accurate but too slow, so the team went back to AST analysis.
- Makes the case for hybrid inference and on-device models as a deployment target, beyond server-side Docker containers.
- The OpenAI-compatible client over native binaries shows how to keep a familiar developer interface while swapping the runtime underneath.

## Metadata
- Video: https://www.youtube.com/watch?v=q2nHsJVy4FE
- Duration: 17:36
- Playlist index: 97
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> If you're an AI engineer right now, your day-to-day probably looks something like this. You've got an open client in your codebase. You've got a few hugging face tabs open. You've got three different repos with the word playground in them. And you've got at least one agentic workflow that's really just stringing together a bunch of HTTP calls. Right now, everyone is talking about voice agents, MCP, and these are pretty cool technologies, but when you peel back the hype a little bit, what I hear when I talk to a lot of engineering teams is that they're usually grappling with much more fundamental and boring problems. How do I use more models in more places without having to rebuild or extend...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/q2nHsJVy4FE.txt]]
- Description cue: Python is where ideas start—but it isn't where portable, low-latency software ends. In this talk, I'll show how we use LLMs inside a constrained, verifiable compiler pipeline to turn plain...

## Book angles
- Could support a chapter/section on **Models & Inference**.
