---
video_id: "pZ4DIH2BVqg"
playlist_index: 559
title: "Pydantic is STILL all you need: Jason Liu"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=pZ4DIH2BVqg"
duration: "15:21"
duration_seconds: 921
view_count: 22447
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/pZ4DIH2BVqg.txt"
themes:
  - "Models & Inference"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:23:51+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jason Liu returns a year after his 'Pydantic is all you need' talk to say almost nothing has changed: define a Pydantic response model, add validators, and let the LLM fill typed data structures instead of strings you parse and pray over. He shows the Instructor API (one client, three verbs: create, create with iterable, create with partial), validator-driven retries, URL-checking validators, structured search queries for RAG, and classifiers via Literal types. Lessons from the year: one retry is usually enough, error messages matter, and fine-tuning on function calling cut 4-5% failures to zero."
---
# Pydantic is STILL all you need: Jason Liu

## Summary
Jason Liu comes back a year after his "Pydantic is all you need" talk with a short, confident message: nothing has changed, and he was right. An LLM that returns a string you pass to `json.loads` and hope for the best is like an intern who writes a bad API. Schemas and structured responses give you compatibility, composability and reliability. The goal is to program with data structures that everyone already knows, not to "beg and pray to the llm gods".

**The library one year on**
Instructor is still a `pip install`. It reached 1.0, ships in Python, TypeScript, Ruby, Go and Elixir, with a Rust version in progress. Liu calls it the "600 lines of code that you do not want to write". He reports 40% month-over-month growth in the Python library. The 1.0 break was one renamed method. It now supports local runtimes plus Anthropic, Cohere, Gemini and other APIs. The API has one noun (the client) and three verbs: create, create with iterable (stream several objects), and create with partial (stream a validated partial object, useful for generative UI). The return type is inferred from `response_model`, so the IDE flags mistakes.

**Validators as prompts**
A field validator can check, for example, that a name is uppercase. With retries on, the error message goes back to the model and it corrects itself. A model-level validator on a receipt checks that price times quantity adds up to the total. Liu says this fails in maybe 1% of cases, but then it shows up as a red bar in Datadog, which is what he wants.

**Generation, RAG and extraction examples**
- A RAG answer carries content plus a list of follow-up questions.
- A validator extracts URLs with a regex and checks each returns a 200, so no hallucinated links reach the user.
- Embeddings cannot capture "latest news". A search object with query, optional start and end dates, limit and a source field lets the model pick the backend. Iterable mode turns "difference between X and Y" into two parallel searches. Two models and two functions make an "Advanced rag application".
- A `Literal` of spam or not spam is a classifier. Adding chain of thought lifts accuracy by about 15%.
- Meeting transcripts become a type, title, action items with owners, and summary.
- An annotated type turns a markdown table from an image into a DataFrame, with before-validators, serializers and JSON schema hints.

**What he learned this year**
One retry is usually enough for OpenAI and Anthropic models, so well-written error messages matter most. Faster models make it affordable to trade latency for quality. In consulting he sees 4-5% failure on complex validations, and fine-tuning on function calling brings that to zero, even for simple models such as GPT-3.5. In enterprises, RAG drifts toward report generation, and agents toward generating workflows and DAGs for an execution engine, instead of a ReAct loop you hope will end.

His close: generative AI becomes generating data structures. You own the objects, the functions, the control flow and the prompts. That makes "software 3.0" backwards compatible with existing software.

## Why it matters
- Gives a compact, copyable pattern for reliable LLM output: typed response model, validators, and error messages fed back as retry prompts.
- The URL-check and receipt-total validators show how to catch hallucinations with plain code and surface them in monitoring.
- Treats RAG query planning as structured output (dates, source, parallel queries), a cheap fix for what embeddings cannot capture.
- The claim that agents should emit DAGs for an execution engine, not run open ReAct loops, is a useful counterpoint for agent-architecture chapters.
- Field data from consulting: 4-5% complex-validation failures fall to zero after fine-tuning on function calling.

## Metadata
- Video: https://www.youtube.com/watch?v=pZ4DIH2BVqg
- Duration: 15:21
- Playlist index: 559
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] so the context from last year's talk was pantic all you need it was a very popular talk you know it kind of like kicked off my Twitter career and uh today I'm coming back a year later to basically say the same thing again uh pantic is still all you need and really my goal is to share with you sort of what I've learned for the past last year and and and the problem has always been the fact that if I had hired an intern to write an API for me and that API returns a string that I have the Json loads into a dictionary and then just pray that the data was still there to begin with I would be pretty pissed off I would probably just fire them replace them with Devon and just prompted to...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/pZ4DIH2BVqg.txt]]
- Description cue: PLEASE ONLY RETURN JSON

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **RAG & Retrieval**.

## Related notes
- Related note: [[612-yj-wSRJwrrc-pydantic-is-all-you-need-jason-liu|#612 — Pydantic is all you need: Jason Liu]]
- Canonical companion for this topic pair: [[612-yj-wSRJwrrc-pydantic-is-all-you-need-jason-liu|#612 — Pydantic is all you need: Jason Liu]]
