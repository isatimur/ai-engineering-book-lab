---
video_id: 0RNNfxpdbQk
playlist_index: 884
title: "Medic for Apache Spark - First Aid for Failing Jobs - Drasko Profirovic, Pinterest"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=0RNNfxpdbQk"
duration: "11:21"
duration_seconds: 681
view_count: 268
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/0RNNfxpdbQk.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
  - "MCP & Tooling"
ingested_at: 2026-07-26T22:21:10+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Drasko Profirovic, a staff engineer at Pinterest, walks through Medic, an agent that answers 'Why did a job fail?' for Spark with an evidence-backed root cause and grounded fixes. The path ran from MCP tools to a single ReAct agent to a multi-agent system on LangGraph's deep agent library. The key moves: a record/playback test harness with offline evals, an exception classifier that filters red-herring log errors, a quarantined sub-agent that reads metrics as a rendered image for a fixed token cost, and parallel hypothesis research with a supervisor picking the highest-confidence cause."
---

# Medic for Apache Spark - First Aid for Failing Jobs - Drasko Profirovic, Pinterest

## Summary
Drasko Profirovic is a staff engineer at Pinterest on the data platform side. Support rotations for Spark feel like a never-ending stream of questions, and distributed systems are hard to debug, above all for newcomers. Humans must choose which team to help first; LLMs can scale out. The goal for Medic: ask "Why did a job fail?" and get back a deep research document with evidence for the root cause and fixes grounded in the job's context, on Slack, the Airflow UI and other surfaces users already work in.

**From MCP tools to a single ReAct agent, and why it broke**
The team first exposed data resources through MCP. That worked but needed careful human prompting. Next came one ReAct agent with one prompt holding the method, the report format and examples of common failures. Beta trials exposed the limits: prompt tuning became unsustainable because detail in one area degraded another; quality swung between shallow and verbose; there were no controls to keep the agent on track; large log outputs filled the context window; and testing was manual against production data that later expired.

**Observability and a record/playback harness**
OpenTelemetry traces went to LangFuse, so each run showed as a waterfall of steps. The end-to-end harness has two modes. Record mode calls real systems and saves tool responses as fixtures checked in as code. Playback mode runs the agent on those fixtures, writes the report, and grades it with offline evals; one example caps suggested fixes at three to control verbosity. This let the team quantify quality and catch regressions.

**Logs: an exception classifier**
Many exceptions in logs are benign, and regex filters did not scale. The classifier learns which exceptions appear in successful jobs and treats them as red herrings. It fingerprints, clusters and ranks exceptions by relevance and by how close they occur to job termination. The agent stopped reading raw logs and got two MCP tools: top-K truncated exceptions, and full detail for one exception. This cut the chance of anchoring on a misleading error.

**Metrics: images in a quarantined sub-agent**
Raw time series are token-inefficient and fail on long jobs. A sub-agent renders the metrics as an annotated graph collage, like a Grafana dashboard with min and max called out, and reasons over the image. The token cost is fixed regardless of job duration. It spots executors dropping to zero, plateaus and bottlenecks, then returns a summary to the parent.

**Multi-agent architecture**
The rebuild uses LangGraph's deep agent library: each agent gets its own prompt and a subset of MCP tools, plus built-in to-do lists and a virtual file system. The flow: classify intent; a triage agent checks job state and forms failure hypotheses; research agents test each hypothesis in parallel and return a score and root cause; the supervisor picks the highest-confidence cause; a healer agent proposes fixes from runbooks in a vector database. Adding scope became one new prompt, which is how Medic gained Spark SQL optimization. A trial of deterministic LangGraph workflows proved brittle next to the ReAct style. Next steps: learning from user feedback, and Flink and Trino.

## Why it matters
- A clean record/playback pattern for agent evals: tool responses as checked-in fixtures, offline graders on the report, regressions caught before production.
- Rendering time-series metrics as an image is a concrete trick for fixed, predictable token cost on unbounded data.
- The exception classifier shows how to shape tool outputs (top-K plus drill-down) so the model does not anchor on noise.
- A first-hand data point that deterministic workflows proved more brittle than ReAct-style agents for open-ended diagnosis.
- The journey from one prompt to specialized agents shows when a single-agent design stops scaling.

## Metadata
- Video: https://www.youtube.com/watch?v=0RNNfxpdbQk
- Duration: 11:21
- Playlist index: 884
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]
- [[MCP & Tooling]]


## Transcript excerpt
> Hi. My name is Draško Proferović. I'm a staff engineer at Pinterest. Today, I'll cover Medic for Apache Spark, which is our agentic diagnostics tool built to troubleshoot Spark failures. We'll dive into why we built the Medic, the journey from prototype to the current architecture, lessons learned along the way, and what's next. A bit of background about myself. I had the opportunity to work at a few companies under the data platform org. Despite many differences between those companies, there's at least one similarity. The high bar for providing quality support to partner teams who rely on the infrastructure owned by the data platform org. I'm sure I'm not alone when I say that the support...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/0RNNfxpdbQk.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **MCP & Tooling**.

