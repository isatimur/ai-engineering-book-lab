---
video_id: "KVgbERRPU4M"
playlist_index: 448
title: "OpenLLMetry is all you need"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=KVgbERRPU4M"
duration: "9:12"
duration_seconds: 552
view_count: 2158
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/KVgbERRPU4M.txt"
themes:
  - "MCP & Tooling"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:18:47+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "The CEO of Traceloop argues that GenAI observability should not need a new stack: OpenLLMetry extends OpenTelemetry, the CNCF standard for logs, metrics and traces, with auto-instrumentations for more than 40 providers, including foundation models (OpenAI, Anthropic, Cohere, Gemini, Bedrock), vector databases (Pinecone, Chroma) and frameworks (LangChain, LlamaIndex, CrewAI, Haystack). The instrumentations monkey-patch client libraries, so traces flow into Datadog, Sentry, Grafana Tempo or Dynatrace, and switching vendors is only a configuration change."
---
# OpenLLMetry is all you need

## Summary
The speaker is the CEO of Traceloop, the company behind OpenLLMetry. In a nine-minute talk he makes one argument: LLM apps do not need their own observability silo. They can ride on OpenTelemetry, the standard that every major observability platform already speaks. OpenLLMetry is the bridge.

**OpenTelemetry first**
He spends half the talk on plain cloud observability. OpenTelemetry is a CNCF project, one of the largest after Kubernetes. It is "a protocol first and foremost" for three signals:
- Logs: arbitrary events, emitted as is. A Python `print` is logging.
- Metrics: values you view in aggregate across days or users. In the cloud that means CPU, memory and latency. For GenAI it means token usage, latency and error rate.
- Traces: the tracking of a multi-step process, such as a request that crosses microservices. He says tracing fits GenAI well, because chains, workflows and tool-running agents are all multi-step processes.

**The ecosystem around the protocol**
- SDKs in 11 languages let you emit signals by hand.
- Instrumentations emit them automatically. They monkey-patch the client library your app uses, for example a Postgres client, and add almost no latency.
- Collectors are self-deployed components, for example on Kubernetes. They filter data, obscure PII and sensitive fields, and fan out to more than one provider.

**What OpenLLMetry adds**
Traceloop and its community wrote OpenTelemetry instrumentations for GenAI. There are now more than 40 providers: foundation models (OpenAI, Anthropic, Cohere, Gemini, Bedrock), vector databases (Pinecone, Chroma) and frameworks (LangChain, LlamaIndex, CrewAI, Haystack). Because the output is standard OpenTelemetry, the traces land in Datadog, Sentry, Grafana Tempo, Dynatrace or any other platform that supports the format.

**A worked example: Pinecone**
The Pinecone instrumentation shows the queries sent to Pinecone and the indexing inside it. It also exposes the returned vectors, their distances and scores, and latencies, all in the standard format.

**No lock-in**
His closing point: you are never tied to one platform. All OpenTelemetry platforms accept the exact same format, so a switch is just a configuration change.

## Why it matters
- It frames LLM observability as an extension of existing cloud observability, not a separate tool category. A team can reuse the platform it already runs.
- The logs, metrics and traces split gives a clear map for GenAI telemetry: token usage and error rate as metrics, agent and chain steps as traces.
- Auto-instrumentation by monkey-patching client libraries means teams get model, vector database and framework spans without hand-written logging code.
- The collector is the named place to strip PII from prompts and responses before they leave your environment.
- The vendor-neutral format is the talk's answer to lock-in: changing observability vendors becomes a configuration change.

## Metadata
- Video: https://www.youtube.com/watch?v=KVgbERRPU4M
- Duration: 9:12
- Playlist index: 448
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]
- [[Evals & Reliability]]

## Transcript excerpt
> hey everyone I'm near the CEO of Trace Loop and today I'm going to talk to you a bit about open elemetry which is a nice open source project we' built you can probably hear from the name open elemetry that it originates in another project called open Telemetry and in case you're not familiar with open Telemetry I'm going to spend the next couple of minutes explaining to you what open Telemetry is so you know we're not talking about gen yet we're not talking about llms just plain simple cloud observability open Telemetry is an open source project it's maintained by the cncf it's one of the largest projects out there after kubernetes uh that is maintained by the cncf and it standardizes a way...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/KVgbERRPU4M.txt]]
- Description cue: OpenLLMetry ( is an open-source project for tracing and monitoring GenAI agents and apps anywhere you want - whether it's Datadog, New Relic, Dynatrace,...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/traceloop/openllmetry>
