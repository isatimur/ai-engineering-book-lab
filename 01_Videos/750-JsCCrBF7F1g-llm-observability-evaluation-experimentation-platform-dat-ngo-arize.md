---
video_id: JsCCrBF7F1g
playlist_index: 750
title: "LLM Observability, Evaluation, Experimentation Platform — Dat Ngo, Arize"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=JsCCrBF7F1g"
duration: "16:32"
duration_seconds: 992
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/JsCCrBF7F1g.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-09T21:18:38+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dat Ngo (Arize) structures the agent lifecycle as OpenTelemetry observability, five sources and four scopes of eval signal, and experimentation, with an example of out-of-order tool calls causing silent failures."
---

# LLM Observability, Evaluation, Experimentation Platform — Dat Ngo, Arize

## Summary
Dat Ngo (AI architect at Arize, working across large enterprises like Uber, Booking, and Reddit) structures the LLM lifecycle as observability, evals, then experimentation. Observability is built OpenTelemetry-first — an auto-instrumenter adds traces/spans as the "audit record" of what an agent did, plus session-level views (referencing Anthropic's "managed agents" paper) and distributional views across all instantiations of an agent to see which branch/path traffic takes and where latency concentrates. He gives a worked trajectory-eval example: signal drops on one path because component B was called before A despite depending on it, meaning the LLM's own tool-call ordering, not the components themselves, was the root cause. He breaks eval signal into five sources — LLM-as-judge, human feedback, golden datasets (used to tune the judge), deterministic/logic-based checks (e.g., valid JSON schema), and cost — and four scopes (span, multi-span, trajectory, session/state-machine), arguing teams should run the minimal eval set needed rather than evaluate everything given the cost of each eval. Arize ships this as open-source Phoenix (single-container, no Kubernetes) for engineers and Arize AX for large enterprises, with a stated end-state goal of an AI system (their agent "Alex") that generates and runs its own evals from traces without a human choosing them.

## Why it matters
- Gives a concrete taxonomy (five signal sources, four eval scopes) for structuring an evals program, directly reusable for a chapter on LLM observability and evaluation architecture.
- The trajectory-eval example (out-of-order tool calls causing a silent signal drop) is a specific, non-generic illustration of why span-level checks alone miss multi-step agent failures — useful evidence for a chapter on debugging agent trajectories.

## Metadata
- Video: https://www.youtube.com/watch?v=JsCCrBF7F1g
- Duration: 16:32
- Playlist index: 750
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Okay, I didn't know if there's like a cut scene, but okay, so really nice to meet you all. My name is Dat. I work at Arize AI, so I'll talk a little bit about what that is. A little bit about me and kind of what I want to share today is um you know, I I work very deeply in in the space. I'm an AI architect. I work with a lot of the largest enterprises across the world to talk about, you know, we work on things like observability, evaluation, experimentation, but really it's just how do you make AI work, right? So, I do spend a lot of tokens um in this space. So, this is last OpenAI DevDay. I think I made it to probably somewhere between 100 billion and 1 trillion tokens last...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/JsCCrBF7F1g.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
