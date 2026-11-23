---
video_id: ynJyIKwjonM
playlist_index: 658
title: "Agentic Search for Context Engineering — Leonie Monigatti, Elastic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ynJyIKwjonM"
duration: "1:03:13"
duration_seconds: 3793
view_count: 26000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ynJyIKwjonM.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
  - "RAG & Retrieval"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Leonie Monigatti of Elastic argues that context engineering is about 80% agentic search: the search tools decide what moves from context sources into the context window. Her LangChain workshop on conference session data shows a top-3 semantic search tool failing on a niche acronym, a general ESQL query tool failing on a SQL-style wildcard until an agent skill teaches the syntax, and a shell tool where grep fakes semantic search with long synonym lists until a semantic grep CLI is added. Her advice: combine low-floor specialized tools with high-ceiling general ones, start general, log behavior, then specialize."
---

# Agentic Search for Context Engineering — Leonie Monigatti, Elastic

## Summary
Leonie Monigatti works at Elastic, the company behind Elasticsearch. This one-hour workshop rests on her "personal hot take": context engineering is about 80% agentic search. Most talk about context curation ignores the arrow from context sources to the context window, and that arrow is the search tool. Her one take-home message: "doing good search is incredibly difficult", so there are many search techniques and you must curate your own stack.

**From RAG to many context sources**
Classic RAG ran a fixed pipeline: the user message became a vector query, and the results went into the prompt whether needed or not, with no second hop. Agentic RAG turned retrieval into a tool the agent calls when it wants. Now context lives in many places: local files, plan files, skills, databases, the web and long-term memory, each with native tools. On top sits the shell tool, which lets an agent use ls, grep, database CLIs, scripts or curl.

**Three failure modes**
At Elastic, internal and external teams building agents hit the same problems: the agent calls no tool and answers from memory; it calls the wrong tool (a colleague struggled to stop an agent using web search instead of the database); or it generates bad parameters. Fixes: write a real tool description with core purpose, when to use and when not to use, and relationships such as load this skill first. If that fails, reinforce it in the system prompt. Long parameter lists and free-form query languages raise the error rate.

**The demos**
On this conference's session data:
- A semantic search tool with top-3 results finds a talk on regulatory constraints, but a niche acronym returns unrelated talks.
- An execute-query tool for ESQL, Elastic's piped query language, wraps errors in try/except so the agent can self-correct. The model wrote a SQL-style percent wildcard, got zero results, and zero results looked like a valid answer. A short agent skill on ESQL syntax, loaded by progressive disclosure and named in the tool description, fixes it. The same tool counts 27 sessions on one day by aggregation, so the LLM never has to count or fill its context with a list.
- A shell tool over a folder of session files: grep finds exact matches, and for semantic questions the agent chains synonyms such as compliance, governance and GDPR. It works, but she asks if you would list every animal to find animal superhero movies. Adding a semantic grep CLI finds the right talk on the first try.

**Practical advice**
There is no silver bullet. Pair specialized tools with a "low floor" (simple parameters, few mistakes, small models are fine) with general tools that give a "high ceiling" for unexpected questions but need more iterations. If you do not know user behavior yet, start general, log behavior, and specialize where you see four or five tool calls per question. In Q&A she notes stronger models cut parameter errors a lot, warns against piling band-aid instructions into prompts, and cites a benchmark where an agent with both bash and database tools scored highest by checking one against the other. A colleague recommends offloading loaded skills and old tool results to a file store.

## Why it matters
- Reframes context engineering as mainly a search-tool design problem, a useful lens for chapters on RAG and agent context.
- The zero-results example shows a quiet failure: an empty result can look like a valid answer, so tools must return errors the agent can act on.
- The low-floor, high-ceiling framing gives a clear rule for choosing between specialized and general-purpose tools.
- Shows the real cost of bash-only search: grep can fake semantic search with synonym lists, but less efficiently than a semantic tool.
- Pushes work into the tool, such as aggregation inside the query, so the model neither counts nor fills its context with raw rows.

## Metadata
- Video: https://www.youtube.com/watch?v=ynJyIKwjonM
- Duration: 1:03:13
- Playlist index: 658
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]
- [[RAG & Retrieval]]


## Transcript excerpt
> Everyone ready? >> Yes. >> Awesome. Welcome to AI engineer. Thanks for joining my session. We are going to be talking about agentic search for context engineering today. My name is Leonei. I work at Elastic, the company behind Elastic Search. And usually I like to talk about retrieval on Twitter. Today I'm super excited to be doing this in person. Uh, a little bit of housekeeping. If you want to access the slides and the code we will be looking at, you can scan the QR code. So let's start with why I'm excited about search and retrieval and hopefully why you are excited about it by the end of this workshop as well. Who here has built an agent or some form of it before? Awesome. Then you've...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ynJyIKwjonM.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **RAG & Retrieval**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/iamleonie/workshop-agentic-search>
