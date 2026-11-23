---
video_id: "7MiFIhlkBoE"
playlist_index: 465
title: "Patrick Dougherty: How to Build AI Agents that Actually Work"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=7MiFIhlkBoE"
duration: "17:44"
duration_seconds: 1064
view_count: 11943
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/7MiFIhlkBoE.txt"
themes:
  - "RAG & Retrieval"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:19:27+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Patrick Dougherty, former co-founder and CTO of a company that rebuilt its whole product around AI agents two years ago, shares the lessons. His thesis: build agents that reason, not agents that rely on what the model knows. He gives small retrieval tools (search tables, get table detail, profile a column) instead of dumping schemas, tunes the agent-computer interface (JSON for GPT-4o, XML for Claude), calls fine-tuning a waste of time, skips frameworks for production because of credential pass-through, and caps multi-agent teams at five to eight agents under one manager agent."
---
# Patrick Dougherty: How to Build AI Agents that Actually Work

## Summary
Patrick Dougherty was co-founder and CTO of a company (captions spell it "Rosco") that, two years before this talk, decided to "rip apart our entire product and rebuild it around AI agents". The product let an agent search and query enterprise data in a data warehouse. This short solo talk lists the lessons.

**A strict definition of an agent**
Three criteria: it takes directions toward one objective, it can call at least one tool and get a response, and it reasons autonomously about how and when to use its tools. A predefined, prompt-chained sequence of tools does not count.

**Reasoning over knowledge**
Instead of RAG that stuffs content into the system prompt, the team built discrete retrieval tools. Given all tables and columns at once, the agent got overwhelmed and picked the wrong column or wrote SQL that did not run. Small tools such as search tables, get table detail and profile a column, used iteratively, worked better. His demo: a simplified Salesforce schema (accounts, contacts, opportunities) and the question of how many customers churned last month. GPT-4o wrote a confident but wrong query. o1 concluded that the schema cannot answer the question. The lesson: give the model freedom to say the data is not there.

**Iterate on the agent-computer interface**
The ACI is the exact syntax and structure of tool calls and their responses. Tweaks that feel trivial have a large effect on accuracy. Customers had tables with 500 or 1,000 columns, so tool results could reach 30,000 tokens, and GPT-4o claimed visible columns did not exist. Switching the result format from markdown to JSON fixed that at once. Claude, by contrast, worked best with XML. Also, the way a model hallucinates tool arguments shows the format it expects; change the schema to match.

**The model is the brain**
Cheaper models can run sub-tasks, but the model that picks the next tool call must be generally intelligent. His favourite for this, even over reasoning models, was Claude 3.5, for its balance of speed, cost and decisions.

**Skip fine-tuning and, for production, frameworks**
Fine-tuning was "a waste of time" and often reduced reasoning, because it overfit the model to a fixed task sequence. The team used no framework: LangGraph and CrewAI did not exist when they started, and later the need to pass each end user's Snowflake permissions to the agent through OAuth made a framework hard to scale. Use abstractions to prototype; avoid depending on them in production.

**The moat is the ecosystem, not the prompt**
System prompts hold little IP. The user experience, the connections and the security protocols around the agent take the most time and form the moat.

**Multi-agent design**
A year in, the team added multi-agent features. Use a manager agent that owns the outcome and delegates to worker agents with narrower context and tools. Keep the team to five to eight agents, a "two pizza rule"; 25 or 50 agents invite infinite loops. Incentivize the manager with the overall objective rather than forcing workers through fixed steps.

## Why it matters
- The GPT-4o versus o1 churn-query demo is a clean example of a model refusing an impossible task versus fabricating SQL, useful for chapters on reasoning models and reliability.
- The markdown-to-JSON fix for GPT-4o and the XML preference for Claude give concrete evidence that tool-response format is a model-specific tuning lever.
- Credential cascade through OAuth is a specific, production-grade reason to own agent code instead of adopting a framework.
- The five-to-eight-agent cap with a manager agent offers a simple, testable rule for multi-agent architecture.

## Metadata
- Video: https://www.youtube.com/watch?v=7MiFIhlkBoE
- Duration: 17:44
- Playlist index: 465
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Org Design & Leadership]]

## Transcript excerpt
> hi I'm Patrick I was the co-founder and CTO of Rosco and two years ago we decided to rip apart our entire product and rebuild it around AI agents these are some of the lessons we learned first of all let's start out with a definition since a lot of people use the term agent but don't necessarily mean the same thing that I do for my definition I came up with there's three specific criteria that it has to have to be considered an AI agent number one the agent needs to be able to take directions these can be human or AI provided but it should be one specific objective or overarching goal two it has to have access to call at least one tool and get a response back and three it should be able to...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/7MiFIhlkBoE.txt]]
- Description cue: Two years ago, we decided to completely re-engineer our product from scratch for AI Agents. We had no frameworks, no SDKs, and no idea if it would actually work. These are the lessons we learned...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://www.klarity.ai>
