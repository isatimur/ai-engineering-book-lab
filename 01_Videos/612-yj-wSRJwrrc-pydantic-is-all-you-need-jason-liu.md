---
video_id: "yj-wSRJwrrc"
playlist_index: 612
title: "Pydantic is all you need: Jason Liu"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=yj-wSRJwrrc"
duration: "17:55"
duration_seconds: 1075
view_count: 226819
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/yj-wSRJwrrc.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:26:24+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jason Liu argues that most production LLM apps are systems, not chatbots, that need structured output, and that Pydantic models are the right way to prompt for it. With his library instructor, a Pydantic class becomes the response model for OpenAI function calling, so the schema, docstrings and field descriptions are the prompt, outputs arrive typed, and validators (including LLM-backed ones) plus max retries drive automatic re-asking. He calls this structured prompting, closer to domain modeling than prompt engineering, and shows maybe-types as escape hatches, query decomposition for RAG, DAG query plans, knowledge graphs, and citation validation by quoted substrings."
---
# Pydantic is all you need: Jason Liu

## Summary
Jason Liu calls this "the most reduced scope talk of today": type hints. His thesis is that Pydantic might be all you need to build with language models, through structured prompting, where an object defines what you want back "rather than kind of praying to the llm gods that the comma is in the right place".

**The problem**
In production, he says, 90% of applications ask a model for JSON and parse it, often with regular expressions, because LLMs must be backwards compatible with systems and schemas we cannot change. Most of us build systems, not chatbots. Begging for JSON is fragile: Riley Goodside could only get JSON out of Bard by threatening a human life; output may arrive wrapped in chatty text; keys drift between user and username, unseen without good logging. Prompts, schemas and outputs are all strings, like writing code in a text editor instead of an IDE. OpenAI function calling helps by taking a JSON schema, but you still get an untyped dict with missing keys, misspellings and hallucinated values.

**Pydantic plus instructor**
Pydantic validates data models from type hints, has 70 million downloads a month, and emits JSON schema, the format function calling takes. It coerces a string into a datetime, and the IDE knows the fields for autocomplete. His library instructor patches the completion call so you pass a Pydantic class as the response model and get back an instance of that type. He also recommends Marvin for more models and features. The benefit is less better JSON than better code: nested references, methods, reusable classes. Docstrings and field descriptions travel in the schema, so the model holds prompt, data and behaviour together; code quality, prompt quality and data quality stay in sync.

**Validation and re-asking**
Ordinary validators raise errors you can catch. An LLM validator can enforce a rule such as "don't say mean things", with the error text produced by a model call. Set max retries and instructor sends the validation errors back for another attempt. He stresses this is not prompt chaining, just validation error handling and re-asking, ordinary code; a check can be a character count or a database lookup.

**Design patterns**
- An escape hatch: a maybe-type with a result, an error flag and a message, instead of checking for "I don't know" in all caps.
- Reusable components, such as a time range used for work and leisure time, with an optional chain-of-thought field you can enable in testing and disable in production.
- Key-value extraction with consistency validators, and an index field so the model counts to five and stops.
- IDs and friend lists that extract a network from text.

**Applications**
- RAG: a search object with type, query and date filter plus an execute method, so one call decomposes a question into multiple searches across email and video.
- Planning: a DAG of questions with dependencies, built in one call, which a classical system can run in parallel instead of an agent loop.
- Knowledge graphs mirroring a visualization API in about 40 lines.
- Citations: each fact carries substring quotes that validators check against the source chunk, dropping unsupported facts, so answers point to sentences, not page numbers.
He closes that this "goes into domain modeling more than it goes to prompt engineering", and points to structured evals and multimodal outputs such as bounding boxes as next steps.

## Why it matters
- It reframes prompt engineering as domain modeling: the typed schema, docstrings and field descriptions become the reviewable prompt.
- Validation-driven re-asking with max retries is a concrete reliability pattern that keeps LLM error handling in ordinary code.
- The substring-quote validator shows a way to enforce grounding in code instead of asking the model not to hallucinate.
- The DAG query plan, built in one call and run by classical code, is a lighter alternative to iterative agent loops for multi-hop questions.
- The maybe-type escape hatch is a small, reusable fix for the common failure of models that never admit they cannot find an answer.

## Metadata
- Video: https://www.youtube.com/watch?v=yj-wSRJwrrc
- Duration: 17:55
- Playlist index: 612
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] hey guys so I didn't know I was going to be one of the keynote speakers so this is probably going to be the most reduced scope talk of today I'm talking about typ hints and in particular I'm talking about how pantic might be all you need to build with language models in particular I want to talk about structured prompting which is the idea that we can use object to Define what we want back out rather than kind of praying to the llm gods that the comma is in the right place and the bracket was closed so everyone here basically kind of knows or at least agrees that large language models are kind of eating software but what this really means in production is 90% of the applications you...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/yj-wSRJwrrc.txt]]
- Description cue: Please return only json, do not add any other comments ONLY RETURN JSON OR I'LL TAKE A LIFE

## Book angles
- Could support a chapter/section on **Evals & Reliability**.


## Related notes
- Related note: [[559-pZ4DIH2BVqg-pydantic-is-still-all-you-need-jason-liu|#559 — Pydantic is STILL all you need: Jason Liu]]
- Canonical companion for this topic pair: [[612-yj-wSRJwrrc-pydantic-is-all-you-need-jason-liu|#612 — Pydantic is all you need: Jason Liu]]
