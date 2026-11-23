---
video_id: "kDlqpN1JyIw"
playlist_index: 409
title: "Vercel AI SDK Masterclass: From Fundamentals to Deep Research"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=kDlqpN1JyIw"
duration: "59:52"
duration_seconds: 3592
view_count: 36672
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/kDlqpN1JyIw.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:17:09+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Nico Albanese of Vercel teaches the AI SDK in two parts. First the primitives: generateText with a one-line model swap (GPT-4o mini, Perplexity Sonar Pro, Gemini with search grounding), tools with typed parameters and an execute function, maxSteps to turn tool calls into a multi-step agent, and structured outputs with generateObject and Zod. Then he builds a deep research clone in Node: generate sub-queries, search with Exa, an agentic loop that searches and judges relevance, extract learnings and follow-up questions, recurse by depth and breadth, and have o3-mini write a markdown report. His thesis: a mostly fixed workflow with one agentic step can produce a strong report in 218 lines."
---
# Vercel AI SDK Masterclass: From Fundamentals to Deep Research

## Summary
Nico Albanese works on the AI SDK at Vercel. This workshop has two halves: the building blocks of the SDK, then a deep research clone built as a Node.js terminal script. His thesis: a structured workflow with a small agentic core, plus careful context control, gets you far with little code.

**Fundamentals**
- Unified interface: `generateText` takes a prompt or a messages array, and a one-line change swaps the model. GPT-4o mini cannot say when the 2025 AI Engineer Summit took place; Perplexity's Sonar Pro and Gemini Flash with search grounding can, and the SDK exposes their citations through a `sources` property.
- Tools: each tool has a description (which the model uses to decide when to call it), parameters, and an `execute` function. The `tool` helper adds type safety between parameters and arguments. With a tool call, the model returns no text, only tool results.
- Multi-step agents: instead of hand-written conditionals per tool, `maxSteps` feeds each tool result back to the model until it answers in plain text or hits the limit. A weather demo makes parallel calls for San Francisco and New York, then calls an add tool, in three steps. The model infers latitude and longitude from the city name.
- Structured outputs: an experimental output option on `generateText`, or `generateObject`, which he calls his favourite function. Zod schemas define the shape, and `.describe()` on a field steers generation, shown by asking for ten jargon-heavy definitions of an AI agent.

**The deep research build**
The workflow takes a query, generates sub-queries, searches each, extracts learnings and follow-up questions, and recurses. Depth sets how many levels down; breadth sets how many queries per level. The test prompt comes from a Gemini team talk: what do you need to be a D1 shot put athlete.
- Search uses Exa with one result and live crawl. He strips fields such as favicons before results enter context: fewer tokens are cheaper, and the model is "so much more effective" without irrelevant data.
- The agentic step: `generateText` with a search tool and an evaluate tool, up to five steps. Evaluate uses `generateObject` in enum mode (relevant or irrelevant). An irrelevant result returns a message telling the model to search again with a more specific query.
- Results pass through local variables, not tool parameters, so the model never re-types a 10,000-token page.
- Learnings come from `generateObject` with a learning string and a follow-up questions array. A global research store holds queries, results, learnings and completed queries.
- The evaluator gets the URLs already used, so duplicate sources count as irrelevant.
- o3-mini writes the final report. A first pass is good but unstructured; a system prompt with a persona, today's date, markdown formatting and permission to speculate if flagged gives a much better report.

He finishes with a working report after about a minute, in 218 lines of code.

## Why it matters
- A clear walkthrough of how a tool loop works: tool call, tool result, next generation, stop on plain text or step limit.
- The deep research clone shows the hybrid pattern of a fixed workflow with one bounded agentic step, a useful model for production agents.
- Concrete context tactics: trim tool output, keep long payloads in local state instead of model-generated arguments, and pass only URLs for deduplication.
- Enum-mode relevance checks with corrective tool messages are a simple self-correction pattern that any agent can reuse.
- The before-and-after report shows how much a system prompt with persona, date and format rules changes output quality.

## Metadata
- Video: https://www.youtube.com/watch?v=kDlqpN1JyIw
- Duration: 59:52
- Playlist index: 409
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> Hey folks, my name is Nico. I work on the AI SDK at Verscell. And in this session today, we're going to be looking at building agents with the AI SDK. Now, this session is roughly divided into two sections. We're going to start with a fundamental section. This is going to introduce you to the building blocks that you need to understand about using the AI SDK before we jump into building agents. And then we're going to be building a deep research clone uh in Node.js. JS. So without further ado, let's get right into it. To follow along, the first thing that you're going to have to do is clone the repository here, install the dependencies, copy over uh any environment variables, um and then...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/kDlqpN1JyIw.txt]]
- Description cue: Full workshop presented by Nico Albanese from Vercel, at the 2025 AI Engineer Summit in New York, Feb 2025:  and

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://aie-feb-25.vercel.app/docs>
