---
video_id: "sYgE4ppDFOQ"
playlist_index: 67
title: "Code World Model: Building World Models for Computation – Jacob Kahn, FAIR Meta"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=sYgE4ppDFOQ"
duration: "16:41"
duration_seconds: 1001
view_count: 10919
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/sYgE4ppDFOQ.txt"
themes:
  - "RAG & Retrieval"
  - "Models & Inference"
ingested_at: "2026-04-24T10:52:21+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jacob Kahn, a researcher at FAIR Meta, presents the Code World Model (CWM), a 32B dense transformer that learns program execution, not just code syntax. He argues that world models and LLMs are not opposites: an LLM can autoregressively predict a transition function over program states, written as line-by-line execution traces with local variables. CWM is trained end to end, is bash-first with few tools, and is post-trained with a highly asynchronous RL system that swaps checkpoints mid-trajectory, over about 200 billion tokens. Uses he proposes: a neural debugger, simulating actions before running them, and approximating the halting problem."
---
# Code World Model: Building World Models for Computation – Jacob Kahn, FAIR Meta

## Summary
Jacob Kahn is a researcher at FAIR Meta. He presents the Code World Model (CWM) and what it means to build world models for computation. The goal is models that reason, plan and make decisions. Code is the starting sandbox because it is constrained and has rules. A world model, in his framing, predicts future observations from past observations and actions. He calls the split between world models and LLMs "a bit of a false dichotomy": a world model is a parameterization of a problem, and an LLM is one way to use it.

**Model execution, not just syntax**
A token-based model of code sees only syntax in and syntax out. CWM instead models execution. An execution trace for a function (his example counts the r's in "strawberry") uses frame separators for each executed line and lists local variables. Each trace line maps to a program line, so a model can learn it. Traces can scale to repositories, distributed systems, contest solutions, and natural-language descriptions of execution. Both program execution and an agent's decisions are transition functions: state, action, next state. An LLM can generate this token by token, "almost a chain of thought."

**Why simulate**
In a normal agent loop the model acts, gets feedback from the environment, and retries. With a world model it can imagine the action and get feedback in a simulated environment, producing execution traces without running code. "We don't have to interact with the real world unless we're ready to."

**Data and training**
The team gathered large amounts of GitHub event data at the repository level, mutated PRs, ran tests and CI on passing repos, and generated execution traces. CWM is a 32-billion-parameter dense transformer "for research," with long context, trained end to end in house. Pre-training covers a few trillion tokens. Then come domain mid-training, long-context mid-training, instruction and reasoning fine-tuning, and joint RL with agentic reasoning.

**Bash-first agentic RL**
CWM is very bash-oriented: it has fewer tools than other models and must learn the terminal. In the software-engineering RL setup it gets a GitHub issue and a repo, then uses bash to inspect and change files and submit. SFT before RL, plus rejection sampling of failed agentic traces, bootstraps the model.

**Asynchronous post-training**
Post-training scale gives strong reasoning returns, so throughput matters. Samplers run trajectories in a terminal environment, and trainers score them and compute gradients. Model checkpoints and trajectories are both queued and sent eagerly. Models are even swapped mid-trajectory. That is slightly off-policy, but the volume of data keeps the setup "relatively on policy" with few bottlenecks. Post-training covers about 200-some billion tokens and yields a small open model that "punches above its weight."

**What it enables**
CWM traces functions line by line and reports local variable values with high accuracy. Proposed uses:
- A neural debugger: write the shape of a program with gaps, and the model fills them by simulating execution, instead of needing a full natural-language spec.
- Reasoning about expensive systems, such as large distributed systems, without running them.
- Approximating the halting problem by simulating execution dynamics, which he admits "will make theoreticians bristle."

The model is on Hugging Face, with inference code on GitHub and a detailed technical report.

## Why it matters
- Offers a different training target for code models: execution traces as a learnable transition function, not only code tokens.
- The imagine-before-you-act idea points to agents that simulate expensive or risky actions before running them.
- The asynchronous RL design (queued checkpoints and trajectories, mid-trajectory model swaps) is a concrete recipe for scaling agentic post-training throughput.
- A bash-first model with few tools, trained on GitHub issues, is an independent data point for the "bash is enough" approach to coding agents.

## Metadata
- Video: https://www.youtube.com/watch?v=sYgE4ppDFOQ
- Duration: 16:41
- Playlist index: 67
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Models & Inference]]

## Transcript excerpt
> [music] Great to be here everyone. I'm Jacob Khan. I'm a researcher at at Farret Medai. I'm going to talk today about the code world model which I'll abbreviate as CWM and what it means to build world models for computation. This is work done by an incredible team at fair uh extends all over the world and I'm very grateful to be collaborating with them. So what's our goal with CWM? Our primary goal is to build models that reason, plan and make decisions. And we start with code because it's an interesting sandbox in which to think about reasoning, right? It's constrained. uh there are certain rules with code and so our our goal is to predict future observations given past observations and...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/sYgE4ppDFOQ.txt]]
- Description cue: Today, most neural models for code learn from code itself: sequences of tokens that capture syntax rather than computation. While this allows models to learn the shape of code, true reasoning...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Models & Inference**.
