---
video_id: "AHtGAgQ0Q_Q"
playlist_index: 31
title: "Why, and how you need to sandbox AI-Generated Code? — Harshil Agrawal, Cloudflare"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=AHtGAgQ0Q_Q"
duration: "38:27"
duration_seconds: 2307
view_count: 3587
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/AHtGAgQ0Q_Q.txt"
themes:
  - "Security & Guardrails"
ingested_at: "2026-04-24T10:50:49+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Cloudflare's Harshil Agrawal treats AI-generated code as untrusted, prescribing capability-based sandboxing (isolates vs. containers), a proxy-secrets pattern, and an 8-item checklist."
---
# Why, and how you need to sandbox AI-Generated Code? — Harshil Agrawal, Cloudflare

## Summary
Harshil Agrawal (senior developer advocate, Cloudflare) frames AI-generated code as untrusted code running with the host application's full privileges, naming three concrete threats: hallucinating LLMs (nonexistent imports, infinite loops, unbounded recursion), the "over-helpful" LLM that reads environment variables and secrets while trying to be useful, and direct or indirect prompt injection that turns the LLM into an attack vector. His fix is capability-based security — default-deny everything, then explicitly grant minimal capabilities — applied across a spectrum from raw `eval` (zero isolation, never use for untrusted code) to V8 isolates (quarter-millisecond startup, JS/TS/Python/Wasm only, no file system or process model) to full Linux containers (seconds to start, real file system, processes, and networking). He demos two Cloudflare-built apps to show the trade-off in practice: an Open Claw-style agent that generates and runs JavaScript skills inside dynamic worker isolates with `globalOutbound` set to null and only explicit RPC bindings exposed (e.g., a restricted `database.query` method), versus Prompt Motion (promptmotion.app), a video-generation app needing `git clone`/`npm install`/dev servers that requires one container per user, orchestrated via Cloudflare's Sandbox SDK and a Durable Object. He closes with an eight-item checklist — default-deny network, minimal explicit capabilities, one sandbox per user, resource/timeout limits (Cloudflare containers default to a 10-minute timeout), keeping secrets out of the sandbox via a proxy pattern, guaranteed try/finally cleanup, full audit logging, and input validation before execution — plus a decision rule: if the code needs a file system, processes, or package installs, use a container; otherwise use an isolate, and most real agents end up needing both.

## Why it matters
- Supplies a concrete, actionable security framework (capability-based/default-deny security, the isolate-vs-container decision tree, the eight-item checklist) that a chapter on AI code-execution safety can draw on directly rather than gesture at abstractly.
- Names specific threat categories (hallucinating LLM, "over-helpful" LLM reading secrets, direct/indirect prompt injection) with concrete technical countermeasures (`globalOutbound` null, scoped RPC bindings, the proxy-secrets pattern) instead of generic security advice.
- Documents two real production systems (an Open Claw-style isolate-based agent, the container-based Prompt Motion app) as citable case studies showing how the same threat model produces different architecture choices depending on requirements.

## Metadata
- Video: https://www.youtube.com/watch?v=AHtGAgQ0Q_Q
- Duration: 38:27
- Playlist index: 31
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Security & Guardrails]]

## Transcript excerpt
> Hey everyone, thanks for being here. I am Hershel. I'm a senior developer advocate at Cloudflare. I spend my days building things with AI and educate and empower others to do so. Today I want to talk about something that sort of keeps me up at night and I suspect once we go through a couple of the slides, some of you will feel the same. Let me start with a question. Now if this was an in-person event, I would have asked you to show off your hands, but just ask this yourself. Have you built something where an LLM generates the code that actually runs? I am going to suspect that most of you have done that. We have gone from auto complete to full code generations to autonomous agents that...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/AHtGAgQ0Q_Q.txt]]
- Description cue: We are using AI to write code. Moreover, we are using it to be more productive. However, giving AI access to our machine and let them run on their own is dangerous. Imagine, giving AI access...

## Book angles
- Could support a chapter/section on **Security & Guardrails**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://harshil.dev/slides/sandbox-ai-engineer>
