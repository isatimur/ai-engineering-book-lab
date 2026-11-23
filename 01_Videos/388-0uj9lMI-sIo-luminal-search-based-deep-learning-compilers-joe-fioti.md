---
video_id: "0uj9lMI-sIo"
playlist_index: 388
title: "Luminal - Search-Based Deep Learning Compilers - Joe Fioti"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=0uj9lMI-sIo"
duration: "24:35"
duration_seconds: 1475
view_count: 720
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/0uj9lMI-sIo.txt"
themes:
  - "Models & Inference"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:16:18+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Joe Fioti, one of the creators of Luminal, argues for radical simplification through search. ML library complexity multiplies as ops times data types times devices, pushing PyTorch past 3 million lines; Luminal expresses every model as a static graph of 12 primitive ops in under 5,000 lines and emits CUDA directly. Hand-written compilers grow too complex as hardware gets simpler, so, like AlphaGo, Luminal applies 20 to 25 simple rewrite rules in e-graphs, profiles the equivalent kernels, and keeps the fastest. The search rediscovered flash attention on its own. He also covers buffer reuse, up-front kernel dispatch, training via an external autograd, and a serverless Luminal cloud."
---
# Luminal - Search-Based Deep Learning Compilers - Joe Fioti

## Summary
Joe Fioti is one of the creators of Luminal. His talk, "radical simplification through search," argues that ML libraries can be far simpler than today's without losing performance, if compilers and search do the hard work.

**Why ML libraries got complicated**
Deep learning is simple linear algebra, yet PyTorch has over 1,200 operations, over 15 data types, and many devices. Complexity is multiplicative: ops times data types times devices. PyTorch is now over 3 million lines, and that makes it buggy and hard to extend. Older libraries were also built around dynamism for RNN and LSTM experiments, but in a transformer the only dynamic parts are KV cache length and sequence length.

**Twelve primitive ops**
Luminal builds every model from 12 ops: unary (such as exp2, log2, sine, reciprocal, square root), binary (add, multiply, modulo, less-than), and reductions (sum and max). Subtraction, division, matmul (a broadcast multiply then a sum reduce via shape tracking), and convolution all come from these. Models are static directed acyclic graphs. The result covers language, vision-language, CNN, RNN, and diffusion models in under 5,000 lines, "learnable in an afternoon." It emits CUDA directly, removing the stack of transformers, PyTorch, hand-written kernel libraries, and NVIDIA's low-level CUDA libraries. By default it is very slow: Llama 7B takes all day for a sentence. Compilers make it fast.

**Why search, not hand-written compilers**
Compiler complexity grows with the square or cube of the generated code's complexity. Meanwhile hardware gets simpler and faster as it moves work to software: CPUs predict, GPUs need explicit memory and dispatch, TPUs need the programmer to schedule everything. This is the classic VLIW compiler problem: past a point humans cannot write the compiler. Luminal's answer copies AlphaGo: "search ate the complexity of Go." Graphs become expressions in egglog, which uses e-graphs to hold a huge space of logically equivalent kernels compactly. About 20 to 25 simple rewrite rules each make a small, equivalence-preserving change. Luminal profiles the candidates and picks the fastest, using Monte Carlo search to prune when the space gets too big.

**What the search finds**
- Kernel fusion: data movement is about 99% of GPU time and energy, so merging chained ops into one kernel that loads and writes once is far faster.
- Flash attention: the industry took about five years after transformers (2017) to discover it in 2022. Luminal's search found it by itself from naive multi-head attention, which Fioti believes no other compiler can do.

**Deterministic passes after search**
Buffer reuse, because the whole graph is known ahead of time, and dispatching all kernels at once into a queue instead of a CPU round trip per kernel.

**Training and what is next**
An external autograd crate derives a backward graph, so all compilers and search apply to training too. Because it is an extension, outsiders can write their own autograd or training setups. Today Luminal supports CPU, CUDA, and Metal; plans include AMD, TPUs, and other accelerators, 3D distributed training and inference, and RL with environments encoded in the graph so the model and environment step together on the GPU. Luminal cloud takes an exported graph file and returns a serverless inference endpoint, handling optimization, batching, queuing, and provisioning, billed only while the graph runs.

## Why it matters
- Applies the lesson that search beats hand-written rules to systems: rewrite rules plus profiling replace expert-written compiler heuristics.
- Rediscovering flash attention automatically is a concrete, striking data point for search-based optimization.
- The multiplicative complexity argument (ops times types times devices) explains why new hardware struggles to get good software support.
- The 99% data-movement figure and kernel fusion example give a clear mental model for why inference speed is a memory problem.

## Metadata
- Video: https://www.youtube.com/watch?v=0uj9lMI-sIo
- Duration: 24:35
- Playlist index: 388
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[RAG & Retrieval]]

## Transcript excerpt
> Hey everyone, I'm Joe. I'm one of the creators of Luminal. And so today in this talk, I'm going to explain what it is, how it works, and why we really think that it's the future of ML libraries. So the title of the talk is radical simplific simplification through search. And that really is the theme of Luminal. We are far simpler than most other ML libraries. And yet we are not taking a hit on performance or capability because we are using uh compilers and more specifically search. So deep learning fundamentally is very simple. It's simple linear algebra. And so basically all that really is is is you know scalers, vectors, matrices and tensors. And then a couple core ops, a couple core...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/0uj9lMI-sIo.txt]]
- Description cue: Luminal is a deep learning compiler for CPUs, GPUs, and ASICs that takes a search-first approach to discovering efficient kernels, such as flash attention, automatically.

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **RAG & Retrieval**.
