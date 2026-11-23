---
video_id: bUJgirn4_yc
playlist_index: 890
title: "When Agents Meet Physical Data: The Other Physics of Agent Harnesses - Dmitry Petrov, DataChain"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=bUJgirn4_yc"
duration: "27:33"
duration_seconds: 1653
view_count: 407
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/bUJgirn4_yc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:21:20+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dmitry Petrov, creator of Data Version Control and now building the open-source DataChain, argues that coding agents fail on physical data (video, sensor logs, robot telemetry) because its physics differ: a few thousand files explode into millions of nested objects. The fix is not a stronger model but a data harness that lets the agent see data through Pydantic schemas backed by a database, run heavy jobs on a checkpointed, incremental execution engine, answer questions from reusable metadata layers, and remember datasets in a shared Markdown knowledge base with source code and lineage."
---

# When Agents Meet Physical Data: The Other Physics of Agent Harnesses - Dmitry Petrov, DataChain

## Summary
Dmitry Petrov has worked with data for about ten years. He built Data Version Control ("Git for data") and now works on DataChain. His claim: agents are bad at data, and worst at physical data such as video, sensor data and robot telemetry. He cites Anthropic reporting only 21% accuracy on data projects before adding data harnesses and context, and OpenAI describing six layers of context for its data agent. Both cases deal with structured business data in warehouses. Physical data has no such luxury. The LLM is the brain; the harness must let the agent see the data, act on it, test results and remember.

**Seeing: the neutron-star problem**
A few thousand video files look small, but inside are clips, frames, objects, labels and confidences. Like a neutron star, the size is small and the mass huge: 2,000 videos can yield millions of objects. Teams first dump metadata as millions of JSON files on S3 (high latency, no consistency), then move to a central database and end up with two stacks and two languages that researchers avoid. Petrov's answer is Pydantic schemas in Python, transpiled to SQL, so data, schema and code share one language.

**Demo**
With DataChain's skill installed in Claude Code, the agent asks scoping questions (a YOLO model, its smallest size, a simple velocity method, per-frame granularity) and processes 91 January dashcam clips in 24 minutes. It then answers that 82 of 91 clips contain people with a fast query against the local database instead of parsing JSON. Those 90 videos already produced about 100,000 records. The generated Pydantic model holds the file (path, checksum, e-tag, size), frame ID, timestamp, class, confidence and a nested bounding box.

**Acting: an execution engine with checkpoints**
In structured data the warehouse is the engine; for unstructured data you must reinvent one. DataChain ties typed Python functions, Pydantic inputs and outputs, the metadata warehouse and object storage together, in a Dask-like style for unstructured data. A mapper returns one object per file, a generator many; you set parallelism, such as 40 machines. Because LLM calls over binaries are expensive, incremental updates and checkpoints are a must: after a crash, fix the bug and resume; when new files land, process only those.

**Testing: answer from metadata layers**
Tests are the agent's hands, but running scripts over raw data is the slowest, most expensive path. In data there is usually one correct answer. Petrov borrows dimensional modeling, star schemas and the one-big-table approach: before answering, the agent checks whether a dataset can answer the question in one SQL-like query, and if not, builds a layer general enough for related questions too.

**Memory: a shared knowledge base**
Teams pay again and again for the same compute. DataChain writes one Markdown file per dataset with a description, session context on why it was built, storage dependency, a data preview, schema, stats and the source code, which he calls the most crucial part. Source data, code and results form lineage, so a teammate's agent reuses results instead of recomputing.

His close: on physical data, frontier coding agents' intuition points the wrong way because the laws of physics change, and the fix is a data harness, not a stronger model.

## Why it matters
- Extends harness engineering beyond code: for multimodal and physical data, schema, execution, tests and memory must all be rebuilt for the agent.
- Concrete scale numbers (91 clips to about 100,000 records; 2,000 videos to millions of objects) explain why file-by-file JSON metadata breaks agents.
- Checkpointed, incremental execution is framed as mandatory when each file costs LLM calls, a cost model coding agents do not face.
- The agent-builds-reusable-metadata-layer pattern applies classic dimensional modeling to agent tool design.
- Dataset knowledge files with source code and lineage show how to share expensive agent work across a team.

## Metadata
- Video: https://www.youtube.com/watch?v=bUJgirn4_yc
- Duration: 27:33
- Playlist index: 890
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> How could intelligent work with physical data? Video recordings, sensor data, robots telemetry, and sometimes all of those combined in a single multi-model project. If you try this, you probably have seen how badly it fails. And today we'll discuss the reasons and all the physics laws behind the problems and how to fix it. This year two frontier labs published very interesting results and surprising results that agents in general are not good at data. Uh, Anthropic published that accuracy for data projects on their agents is only 21% until you add specific data harnesses to them and provide context. OpenAI published a whole layers of context, six layers of context in order to make the data...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/bUJgirn4_yc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
