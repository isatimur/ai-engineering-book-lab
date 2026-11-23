---
video_id: "N4vCBM5YbN0"
playlist_index: 315
title: "Building Code First AI Agents with Azure AI Agent Service — Cedric Vidal, Microsoft"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=N4vCBM5YbN0"
duration: "1:54:06"
duration_seconds: 6846
view_count: 1523
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/N4vCBM5YbN0.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:13:19+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Cedric Vidal, principal AI advocate at Microsoft, leads a two-hour workshop that builds a command-line sales-analysis agent for a fictional outdoor-gear retailer on Azure AI Agent Service. The service is stateful: agents, threads and instructions live in the cloud. The agent gains one tool at a time: function calling that writes SQL against SQLite, file search over a product PDF, code interpreter for charts, and Bing grounding. Vidal says 'function calling' is really function routing, that LLMs are bad at math and need a calculator tool, and that the hardest problem in looping multi-agent systems is defining when the task is done."
---
# Building Code First AI Agents with Azure AI Agent Service — Cedric Vidal, Microsoft

## Summary
Cedric Vidal is a principal AI advocate at Microsoft. This is a nearly two-hour hands-on workshop, with long stretches of lab setup and Wi-Fi trouble. The use case: salespeople at a fictional outdoor and hiking gear retailer ask questions in plain English, and the agent writes the queries and picks the display (table or pie chart) itself, instead of developers hard-coding every view.

**What an agent is**
Vidal admits even specialists do not agree. His working definition: semi-autonomous software that gets a goal and works "relentlessly" with tools and data until the goal is met. It must reason over context, integrate data sources, and act on the world. He places the workshop in the middle of the spectrum: tools and multiple data sources, but no goal-driven loop.

**Why a stateful service**
Most LLM apps are stateless, so the developer stores conversations and runs tools. Azure AI Agent Service moves state, agent configuration and some data integrations to the cloud. The cost is a programming model you must learn: create or reconnect to an agent (like SQL create-or-update), create or reuse a thread, run the agent on the thread, poll the run status, show the response. Instructions are uploaded once and reused. Tools can run client side or server side.

**Tools, added one by one**
- Function calling. Vidal hates the name: "it's not function calling, it's function rooting". The LLM only emits JSON naming a function and arguments; the app executes it. Here the function just runs whatever SQL the LLM writes against SQLite. The schema sits in the instructions, and the Python docstring and parameter names are passed to the model. This works for common databases the model saw in training, not exotic ones. Asked for last quarter's revenue, it guessed the wrong months until told the date, so Vidal suggests adding a date tool. Follow-up questions can reuse earlier results without a new query.
- File search: a product PDF is chunked into an AI Search vector store. The agent then joins unstructured PDF data with SQL results, for example adding brand names to a sales table, which Vidal contrasts with old OLAP-cube work.
- Code interpreter: writes and runs Python in a sandbox to draw a pie chart and simulate a 20% regional sales drop.
- Bing grounding for competitor prices; the demo failed with resource not found, possibly after recent API changes.

**Lessons from Q&A**
- Vague instructions widen what an agent can do but raise error rates; specific ones narrow scope but succeed more often.
- One agent with many tools picks the wrong tool more often. Route to specialist agents, possibly sharing memory, with AutoGen-style topologies.
- Confidential columns: an instruction is "not bulletproof". Use column-level access control as in normal code.
- Math: LLMs are bad at arithmetic. He tells of a chatbot giving a convincing but wrong compound-interest result, and advises a dedicated calculator tool rather than code interpreter.
- MCP is function calling plus life-cycle management: it pulls and starts the tool server and declares its functions.
- Without a planning loop, an agent misses a second data source when the question gives no hint. Looping systems need a definition of done, which he calls the hardest part.
- You do not need the service at all; it just bundles the vector store, conversation storage and web search that most apps need.

## Why it matters
- The create-agent, thread, run, poll, respond sequence is a clear model of a stateful agent API, and shows what moves out of app code when state lives server side.
- Reframing function calling as function routing, where the model emits JSON and your code executes it, is a useful teaching point for tool-use chapters.
- The demos show concrete failure modes: wrong date assumptions, missed second data sources without planning, and nondeterministic results on the same question.
- Practical guardrail advice: enforce access control in code not prompts, delegate math to a calculator tool, and split tools across specialist agents.
- Names the definition of done as the hardest part of looping multi-agent systems, a good anchor for any discussion of agent termination.

## Metadata
- Video: https://www.youtube.com/watch?v=N4vCBM5YbN0
- Duration: 1:54:06
- Playlist index: 315
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] Well, um this is very exciting because uh I mean 2025 is clearly the year of agents. Uh compared to the past two years, things have moved so fast. We went from very simple uh prompts which were already incredible but now uh we move to uh the next step where we have uh agents that can autonomously uh achieve goals um without us knowing exactly how they do that which is quite incredible. Um but the question is how do you make them um so that's what we're going to see today. Um, I am Cedric Vidal. I am a principal AI advocate at Microsoft. Uh, you can find my information down below. Um, and today I'm gonna be uh your host and um I'm going to be helped today by proctors uh by Mark uh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/N4vCBM5YbN0.txt]]
- Description cue: This workshop offers a hands-on introduction to developing Large Language Model (LLM)-powered AI agents using Microsoft’s Azure AI Agent Service. Participants will build a conversational...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
