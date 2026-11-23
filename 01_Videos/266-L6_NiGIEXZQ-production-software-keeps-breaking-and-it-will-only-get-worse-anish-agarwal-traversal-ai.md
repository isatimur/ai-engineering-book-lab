---
video_id: "L6_NiGIEXZQ"
playlist_index: 266
title: "Production software keeps breaking and it will only get worse — Anish Agarwal, Traversal.ai"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=L6_NiGIEXZQ"
duration: "18:13"
duration_seconds: 1093
view_count: 3933
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/L6_NiGIEXZQ.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T12:11:18+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Anish Agarwal, CEO of Traversal, argues that AI coding tools shrink the development phase but make production troubleshooting worse: humans lose context on AI-written code while systems grow more complex, so engineers risk spending most of their time on call. AIOps anomaly detection gives too many false positives, pasting logs into an LLM fails at trillion-log scale, and runbook-driven ReAct agents are too slow. Traversal combines causal machine learning, reasoning models, and swarms of thousands of parallel agent tool calls. Colleague Matt shows a DigitalOcean case with about a 40% cut in mean time to resolution."
---
# Production software keeps breaking and it will only get worse — Anish Agarwal, Traversal.ai

## Summary
Anish Agarwal, CEO of Traversal, gives the first half of this talk; Matt, the company's first hire and a former high-frequency trading engineer, gives the second. Agarwal splits software engineering into system design, development, and troubleshooting production incidents. AI coding tools are squeezing the development part. The hope is that engineers then focus on creative system design. His warning is the opposite: without automated troubleshooting, most of us will spend our time on QA and on call.

**Why troubleshooting gets worse**
As AI writes more code, humans have less context on how it works. At the same time, teams push AI to build more complex systems. Less understanding plus more complexity makes incidents harder. Today's workflow is "dashboard dumpster diving" across thousands of dashboards, then staring at the code base for a related pull request or config change, then pulling 30 to 100 people into a Slack incident channel.

**Why existing approaches fail**
- AIOps: traditional anomaly detection on numerical data gives thousands of alerts and more noise than signal.
- LLMs on logs: fine if you know which log to read, but production systems hold terabytes and maybe a trillion logs. That does not fit in a context window, or even in memory. LLMs also handle numerical data poorly.
- ReAct-style agents: they depend on runbooks, which are out of date the moment they are written. A plain tool-calling loop over a large system can take days, but an incident needs an answer in two to five minutes.

**Traversal's combination**
Agarwal's answer is out-of-sample troubleshooting from first principles, for incidents never seen before. It combines three parts: statistics (causal machine learning, to separate the root cause from the many correlated failures around it), semantics (reasoning models reading log fields, metric metadata and code), and a new agentic control flow, swarms of agents making thousands of parallel tool calls for an exhaustive search of telemetry. Code agents and vector search then tie a lead to a specific change, and the system pulls in the right team with context.

**DigitalOcean case study**
Matt describes on-call life at DigitalOcean, a cloud provider with hundreds of thousands of customers: 40 to 60 engineers searching hundreds of millions of metrics and tens of billions of logs from thousands of services for one root-cause log. With Traversal, an ambient AI starts from the same alert context, runs a swarm of expert AI SREs over petabytes of observability data in parallel, and posts a finding to the Slack channel in about five minutes. In the example, it traced a cascade to a deployment, which engineers rolled back. The UI cites observability data, gives confidence levels for root-cause candidates, explains its reasoning, shows an AI-generated impact map, and takes follow-up questions. Matt reports about a 40% reduction in mean time to resolution. He calls this as much an AI infrastructure problem as an agents problem, and a needle-in-a-haystack pattern that also fits network observability and cybersecurity.

## Why it matters
- Turns the 'AI writes the code' story around: it predicts that the cost moves to on call, because humans lose context on AI-written systems.
- Gives a clear failure analysis of three naive designs (anomaly detection, log-in-the-prompt, runbook ReAct agents), each tied to a concrete limit: false positives, trillion-log scale, and a two-to-five-minute time budget.
- Offers a reusable architecture for needle-in-a-haystack agent work: causal statistics to rank leads, reasoning models for semantics, and massively parallel agent swarms for exhaustive search.
- Gives a named production result (DigitalOcean, about 40% lower MTTR, about five minutes to a cited root cause) and a UI pattern of citations, confidence levels and follow-up questions for trust.

## Metadata
- Video: https://www.youtube.com/watch?v=L6_NiGIEXZQ
- Duration: 18:13
- Playlist index: 266
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> [Music] hi everyone. Thank you for uh coming to our talk. Uh so he was kind enough to already introduce us. Um so I'm the CEO. Matthew was the first person who joined us. Uh if any difficult questions, please direct it towards Matt. Um now if you think about the three major categories of of software engineering at least as we see it there's three things that show up to me the system design where you think about you know how do you actually architect a system a lot of the the talks we saw in this uh track have been about that in some sense at a high level second is actually developing software right putting in the business logic of your particular company and and all of the devops that comes...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/L6_NiGIEXZQ.txt]]
- Description cue: Software is eating the world. AI is eating software. AI-powered SWE means a whole lot more software is going to be written that powers mission critical systems in the coming years, with hardly...

## Book angles
- Could support a chapter/section on **Coding Agents**.
