---
video_id: "cwjs1WAG9CM"
playlist_index: 613
title: "Building Context-Aware Reasoning Applications with LangChain and LangSmith: Harrison Chase"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=cwjs1WAG9CM"
duration: "18:54"
duration_seconds: 1134
view_count: 3485
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/cwjs1WAG9CM.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:26:27+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Harrison Chase (LangChain) frames context-aware apps via four context-delivery methods (prompting, few-shot, RAG, fine-tuning) and a chain-router-agent architecture spectrum, plus eval as unsolved."
---
# Building Context-Aware Reasoning Applications with LangChain and LangSmith: Harrison Chase

## Summary
Harrison Chase (LangChain) frames "context-aware reasoning applications" along two axes: how context reaches the model and how the system reasons and acts. He enumerates four context-delivery methods - zero-shot instruction prompting, few-shot examples (best for tone and structured output), retrieval-augmented generation ("an open-book test"), and fine-tuning (useful once you have thousands of examples, again mainly for tone and structured parsing) - and a reasoning-architecture spectrum running from a single LLM call, to a fixed chain of calls, to an LLM-driven router (branching but acyclic), to a looping "agent" that decides when to stop, to fully autonomous AutoGPT/Voyager-style agents that dynamically create their own tools and drop the plan-execute-validate scaffolding. He identifies four recurring engineering bottlenecks that LangChain and LangSmith were built to address: choosing and debugging the orchestration architecture, data engineering (loading, transforming, and inspecting exactly what context reaches the prompt), prompt engineering (inspecting and editing the fully assembled prompt mid-chain), and evaluation, which he says is hard because of a lack of both labeled data and good quantitative metrics - recommending eval datasets built from hand-labeling, production traffic, or LLM auto-generation, alongside "vibe checks," LLM-assisted evaluation, and direct or indirect production feedback (thumbs up/down, click-through) with A/B testing. He closes by flagging an open question: what skill set defines an "AI engineer," given that context work often needs data engineers while the reasoning and prompting work is often best done by non-technical subject-matter experts or product managers.

## Why it matters
- An early taxonomy of LLM application architectures (chain, router, agent, autonomous agent) that gives a concrete vocabulary for classifying agent designs by degree of autonomy and cyclicality.
- Names concrete context-delivery techniques (zero-shot, few-shot, RAG, fine-tuning) with stated use cases, useful as a reference framework for how engineers choose among them.
- Surfaces evaluation as a named, unsolved bottleneck (lack of data plus lack of metrics) with specific mitigations (vibe checks, LLM-as-judge, production feedback loops) that anticipates the eval-tooling ecosystem discussed elsewhere in the book.

## Metadata
- Video: https://www.youtube.com/watch?v=cwjs1WAG9CM
- Duration: 18:54
- Playlist index: 613
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] thank you guys for having me and then thank you guys for being here this is this is maybe one of the most famous uh screens of of 2023 and and yet I believe and I think we all believe and that's why we're all here that this is just the beginning of a lot of amazing things that we're all going to create because as good as chat GPT is and as good as the language models that underly them are by themselves they're just the start by themselves they don't know about current events they cannot run the code that you write and they don't remember their previous interactions with you in order to get to a future where we have truly personalized and actually helpful AI assistants we're going to...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/cwjs1WAG9CM.txt]]
- Description cue: How can companies best build useful and differentiated applications on top of language models? Many of the products and companies built do this by providing the relevant context to LLMs and...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
