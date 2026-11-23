---
video_id: "bmWZk9vTze0"
playlist_index: 241
title: "MCP is all you need — Samuel Colvin, Pydantic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=bmWZk9vTze0"
duration: "15:24"
duration_seconds: 924
view_count: 65119
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/bmWZk9vTze0.txt"
themes:
  - "MCP & Tooling"
ingested_at: "2026-04-24T12:09:39+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Samuel Colvin, creator of Pydantic and co-maintainer of the MCP Python SDK, argues that people overcomplicate agent-to-agent communication: for autonomous agents written in code, MCP tool calling covers most of it. MCP beats plain OpenAPI through dynamic tools, logging during execution, tracing, stdio subprocesses and above all sampling, where a tool that is itself an agent sends LLM calls back through the client. His Pydantic AI demo runs a SQL-writing agent inside an MCP tool to keep the main agent's context small, with progress logs and a Logfire trace across client and server."
---
# MCP is all you need — Samuel Colvin, Pydantic

## Summary
Samuel Colvin created Pydantic, the Python data validation library downloaded about 360 million times a month and used in all the Python AI SDKs and agent frameworks. Pydantic became a company in early 2023 and now also builds Pydantic AI, an agent framework, and Pydantic Logfire, its commercial observability platform. He is also a "somewhat inactive" co-maintainer of the MCP Python SDK. The title plays on the earlier AI Engineer talks "Pydantic is all you need". He admits it is unrealistic, but the shared point is that people overcomplicate things, here by inventing new ways to do agent-to-agent communication.

**Scope: autonomous agents in code**
Colvin is not talking about MCP's original use case, coding agents in desktop apps and IDEs. For agents written in code, two MCP primitives, prompts and resources, matter little. The third, tool calling, matters a lot.

**Why not just OpenAPI**
Tool calling is more complicated than it looks. MCP adds:
- dynamic tools that come and go with server state during a run;
- logging, so a tool can return data to the user while it still runs;
- sampling, "perhaps the most confusingly named part of MCP";
- tracing and observability;
- running as a subprocess over standard in and standard out.

**Sampling**
MCP composes agents and tools like browsers and websites: neither needs to know about the other. But when a tool is itself an agent, every agent needs its own LLM access, configuration and budget, and a remote MCP server worries about the cost. Sampling lets the server send its LLM request back through the client, which proxies it to the model and returns the answer. Support was thin at the time; Pydantic AI's support for both client and server sides was still a PR.

**The demo**
A research agent for open source packages has one MCP tool that queries the BigQuery public dataset of Python package downloads. Inside the tool, a Pydantic AI agent writes the SQL. It has a big system prompt with the table schema and examples. An output validator strips markdown fences, checks the table name, runs the query, and raises a model retry if it fails. Typed MCP context logging sends progress to the client before the tool finishes, which helps for deep research that runs for minutes. Results return as XML-like data, which models read well. The tool runs on the FastMCP server inside the MCP SDK, and the function docstring becomes the tool description.

**Inference inside the tool limits context**
Colvin argues against putting the SQL instructions in the main agent or the tool description. Models dislike that much data in a description, and it adds overhead to every call whether or not the tool runs. The main agent only sends a natural-language question. Asked how many downloads Pydantic had this year, the agent answered about 1.6 billion. The Logfire trace showed the outer agent calling GPT-4o, the client calling the server, the inner agent's LLM call proxied back through the client, and the generated SQL. He also passes the current date so the model does not assume it is 2023.

## Why it matters
- It makes a concrete case against inventing new agent-to-agent protocols: MCP tool calls, with sampling, already cover agents calling agents.
- Sampling solves a real cost and configuration problem for remote agentic tools, which can borrow the caller's model instead of paying for their own.
- Running inference inside a tool is a reusable context-management pattern: the main agent never carries the SQL schema and examples it rarely needs.
- The demo combines several reliability techniques worth citing: output validators that run the query, retry on failure, typed context logging, and tracing across client and server.
- Colvin's list of what MCP adds over OpenAPI (dynamic tools, logging, sampling, tracing, stdio subprocesses) answers a common objection directly.

## Metadata
- Video: https://www.youtube.com/watch?v=bmWZk9vTze0
- Duration: 15:24
- Playlist index: 241
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]

## Transcript excerpt
> [Music] So yeah, I'm talking about uh MCP is all you need. A bit about who I am before we get started. I'm best known as the creator of Pyantic uh data validation library for Python that is uh fairly ubiquitous. downloaded about 360 million times a month. So someone pointed out to me that's like 140 times a second. Uh Pantic is used in general Python development everywhere but also in Genai. So it's used in all of the SDKs and agent frameworks in Python basically. Uh Pantic became a company uh uh beginning of 23 and we have uh built two things beyond Pantic since then. Pantic AI uh an agent framework for Python built on the same principles as Pantic um and Pantic Logfire observability...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/bmWZk9vTze0.txt]]
- Description cue: Everyone is talking about agents, and right after that, they’re talking about agent-to-agent communications. Not surprisingly, various nascent, competing protocols are popping up to handle...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.
