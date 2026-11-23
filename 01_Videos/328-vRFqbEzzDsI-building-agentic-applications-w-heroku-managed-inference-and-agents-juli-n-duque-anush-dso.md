---
video_id: "vRFqbEzzDsI"
playlist_index: 328
title: "Building Agentic Applications w/ Heroku Managed Inference and Agents — Julián Duque & Anush Dsouza"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=vRFqbEzzDsI"
duration: "52:35"
duration_seconds: 3155
view_count: 532
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/vRFqbEzzDsI.txt"
themes:
  - "MCP & Tooling"
  - "Models & Inference"
ingested_at: "2026-04-24T12:13:54+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Anush Dsouza (product manager, Heroku AI) and Julián Duque (principal developer advocate) present Heroku Managed Inference and Agents as Heroku's git-push simplicity applied to AI, with a focus on day-two operations. Attaching the add-on gives an app three environment variables for an OpenAI-compatible endpoint. A separate streaming agents endpoint runs first-party tools (dyno commands, Postgres schema and query on read-only followers, HTML and PDF to markdown, code execution in Python, Node, Ruby and Go) on one-off dynos that scale to zero. MCP servers deployed to Heroku plug into the same endpoint or are exposed remotely."
---
# Building Agentic Applications w/ Heroku Managed Inference and Agents — Julián Duque & Anush Dsouza

## Summary
Julián Duque is a principal developer advocate at Heroku and Anush Dsouza is a product manager for Heroku AI. This lunch-hour workshop runs in a browser: attendees deploy a Jupyter notebook to Heroku and walk through the new Managed Inference and Agents add-on.

**The pitch: Heroku for AI**
Dsouza draws a line from the internet, cloud and web apps to AI. Heroku once made Rails apps easy to deploy and scale with a single git push; now the goal is to make "every software engineer right now is an AI engineer". Most solutions solve day-one problems. Heroku targets day two: operating and scaling, picking the right model, and running tools safely. Its answer is an opinionated, curated model list inside an agentic control loop on Heroku's trusted compute (dynos), extended through the Model Context Protocol. One CLI command attaches AI to an app as a resource. The primitives: inference, MCP (remote servers, and standard-IO servers that scale to zero), and pgvector for embeddings. Web search and memory tools are planned.

**Provisioning and inference**
Attach the add-on from the app's resources page and pick a model. On offer: Anthropic text models (versions 3.5, 3.7 and 4), an embedding model and an image model. Inference runs on the same infrastructure as the app, so data does not go to third parties. The add-on sets three config variables (inference URL, key and model ID). The chat completions endpoint is about 95% compatible with the OpenAI API, so the OpenAI SDK works. The notebook shows a raw HTTP call, then server-sent-event streaming of deltas rendered as markdown.

**The agents endpoint**
A separate endpoint runs Heroku-native tools, always as a stream, because tool calls take time. Each tool runs on a one-off dyno that spins up, runs and scales back to zero, so you pay only for the compute used.
- Dyno run command: run a trusted script or Unix command on a named app. Asking the server's date shows how tools give an LLM real-time context.
- Postgres get schema and run query: the model reads the real schema first, so it does not hallucinate SQL. On a solar company's hourly energy metrics, it answered how much energy was saved in 30 days and broke it down by system. These tools only work on read-only follower databases. Duque says "LLMs are not trusted" with write access; for that, deploy your own MCP "under your own risk".
- HTML or PDF to markdown, chained with Python code execution: fetch an algorithm snippet from a Wikipedia page, then run it to compute the greatest common divisor of 252 and 105.
- Code execution in Python, Node, Ruby and Go, with a packages parameter so the model can install dependencies first.
Adding tools adds capability but also latency.

**Bring your own MCP**
Any process type in the Procfile-style process file that starts with `mcp` is treated as an MCP server. Duque forks the official Perplexity MCP, adds that entry, deploys with a button, and attaches it. A Brave search MCP, namespaced as `mcp brave`, runs on a dyno as standard IO and scales to zero. The same servers are exposed through a toolkit SSE endpoint behind a bearer token (OAuth is in progress), so an external MCP client or IDE can call them. The demo lists Brave and Perplexity tools from a plain Python MCP client.

## Why it matters
- Frames the platform problem as day two (operations, model choice, tool safety) rather than day one, a useful lens for evaluating any agent platform.
- Shows a concrete pattern for safe tool execution: ephemeral compute per tool call that scales to zero, plus read-only database followers for LLM-driven SQL.
- The schema-first database tools illustrate a simple anti-hallucination step: give the model the real schema through a tool before it writes a query.
- Treating MCP servers as a deployable process type, reachable both by the platform's agent loop and by external clients, is a clean model for hosting shared tools.

## Metadata
- Video: https://www.youtube.com/watch?v=vRFqbEzzDsI
- Duration: 52:35
- Playlist index: 328
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]
- [[Models & Inference]]

## Transcript excerpt
> [Music] Welcome, welcome you all to this launch and learn. I hope you are enjoying launch right now that the conference brought you. Um we are going to be talking about our recent uh product that we announced at Heroku which is the Heroku manage inference and agents or part of the Heroku AI offering and we will be talking about the fundamentals of building agentic applications with this service. This is not a session. This is a workshop. So if you want to follow along just bring your laptop. You only need a browser. you are not going to install anything in your computer. I swear that is going to be uh easy to follow along. Also, this content is going to be available for you if you want to...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/vRFqbEzzDsI.txt]]
- Description cue: In this workshop, you’ll learn how to use Heroku Managed Inference and Agents to build agentic applications. We’ll cover how to provision and deploy LLM models to your app, run untrusted...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Models & Inference**.
