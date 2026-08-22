---
video_id: "yYxr6LdXNWM"
playlist_index: 216
title: "Knowledge Graphs in Litigation Agents — Tom Smoker, WhyHow"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=yYxr6LdXNWM"
duration: "19:13"
duration_seconds: 1153
view_count: 4036
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/yYxr6LdXNWM.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T11:44:23+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "WhyHow's litigation agents use per-lawyer knowledge graphs, not raw LLM chat, because lawyers need auditable accuracy and chained 95%-accurate agents compound to 77% success."
---
# Knowledge Graphs in Litigation Agents — Tom Smoker, WhyHow

## Summary
Tom Smoker (WhyHow) describes litigation-support agents that scrape the web for mass-tort/class-action leads and turn findings into per-lawyer knowledge graphs and reports rather than a shared chat interface. He argues the legal domain forces a different architecture because "lawyers don't really like when things are incorrect" — probabilistic LLMs can't be trusted alone, so most engineering effort goes into guardrails, episodic memory, and graph-based state that can be captured, pruned, and queried, not into the model itself. He gives a concrete reason chained agent workflows fail here: five agents each 95% accurate compound to roughly 77% end-to-end success, which he frames as the core problem of decision-making under uncertainty that the graph and guardrails exist to contain. For legal discovery, the graph lets an expert dismiss most of an unreviewed "mountain" of documents and hone in on the few nodes that actually matter, functioning as a schema-driven filter rather than a chatbot; he describes the overall system as "ML-filtered," with LLMs serving mainly as connective tissue between deterministic graph/extraction steps.

## Why it matters
- Domain-forced architecture: a testable, prunable graph/schema layer replaces trust in raw LLM output, because legal work demands specific, defensible correctness.
- Transcript-grounded accuracy math (95% per-agent accuracy compounding to ~77% over five chained agents) is the stated justification for guardrails and human-in-the-loop review rather than end-to-end agent autonomy.
- Verification lands with a human: the graph narrows massive document sets to a handful of relevant nodes, but the lawyer or domain expert still makes the final call.

## Metadata
- Video: https://www.youtube.com/watch?v=yYxr6LdXNWM
- Duration: 19:13
- Playlist index: 216
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] Hello everyone. I am here to talk about graph rag as we're here for the track. But I'm talking about what to do in the legal industry and what we do in the legal industry and what does it look like to turn documents into graphs and use those graphs in the age of AI. I tend to have to qualify why I'm at places. Uh there's various reasons why I could be talking today. Uh you choose the one that you want to, but generally I've been working in graphs for about a decade. I have a good relationship with the NeAJ team. Uh and I've been doing graphs for a long time, but primarily I am the technical founder of a company called Yhar.ai and we find cases first uh before lawyers do and then...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/yYxr6LdXNWM.txt]]
- Description cue: Structured Representations are pretty important in the law, where the relationships between clauses, documents, entities, and multiple parties matter. Structured Representation means Structured...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
