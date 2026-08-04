---
video_id: "kv-QAuKWllQ"
playlist_index: 151
title: "How we hacked YC Spring 2025 batch’s AI agents — Rene Brandel, Casco"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=kv-QAuKWllQ"
duration: "17:33"
duration_seconds: 1053
view_count: 2480
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/kv-QAuKWllQ.txt"
themes:
  - "Security & Guardrails"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T11:41:24+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Casco's Rene Brandel breached 7 of 16 public YC X25 AI agents in 30 minutes each via IDOR data leaks, code-sandbox escapes, and SSRF-style git-credential theft."
---
# How we hacked YC Spring 2025 batch’s AI agents — Rene Brandel, Casco

## Summary
Brandel (CEO, Casco, a red-teaming startup) describes attacking 16 publicly-launched YC X25 batch AI agents, giving himself 30 minutes per target, and breaching 7 of them via three recurring vulnerability classes. First, cross-user data access via IDOR (insecure direct object reference): leaking a system prompt revealed tools like "look up user info by ID," and a user ID found in a public product-demo video URL let him traverse interconnected user/chat/document IDs across the whole system — the fix he gives is authenticating *and* authorizing every request against an access-control matrix, not just checking token validity. Second, code-sandbox escapes: an agent restricted to writing Python files and reading files (no "dangerous" function calls) could still be made to overwrite its own `app.py` — the file containing its security checks — with empty strings, after which arbitrary code execution enabled service/metadata endpoint discovery, stealing a service token, and querying BigQuery for full customer data; his fix is never rolling your own code sandbox and using proper isolation (Firecracker-based, not bare containers). Third, SSRF: an agent that pulled database schemas from a private GitHub repo via a URL string could be pointed at an attacker-controlled repo instead, causing it to leak the git credentials used to authenticate the fetch, which then unlocked the target's entire private codebase. His overarching argument, backed by an Anthropic usage-distribution stat he cites (developers are ~3.4% of the population but 37% of Claude's usage), is that agent security is broader than prompt-injection/LLM-safety concerns — agents should be treated like users, not trusted services, for authentication, authorization, and input/output sanitization.

## Why it matters
- Gives three named, reproducible-sounding vulnerability classes (IDOR via leaked system prompts, code-sandbox self-modification, SSRF-driven credential theft) with concrete real-world outcomes, useful as case-study evidence for a security/guardrails chapter.
- The "treat agents as users, not services" framing is a specific, actionable design principle distinguishing agent security from classic API security — good for a book section contrasting agent threat models with traditional web app security.
- A field-tested statistic (7 of 16 live YC startup agents breached in under 30 minutes each) that grounds claims about the current immaturity of agent security practices in something more concrete than general concern.

## Metadata
- Video: https://www.youtube.com/watch?v=kv-QAuKWllQ
- Duration: 17:33
- Playlist index: 151
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Security & Guardrails]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] So, yeah. Who's ready to hack some agents? Yeah. Oh, wow. All right. So, let me first introduce myself a little bit. I'm Renee. I'm the CEO of Casco. We're a YC company, and we specialize in red teaming AI agents and apps. And so we spent uh I spent my previous time at AWS working on AI agents, but I've always really loved working on AI. In fact, there's a video of me 10 years ago building voice to code and I won Europe's largest hackathon by doing that. And so I would talk to it, say, build me a blog post and it would generate the sites. And it was actually it was kind of fun. Like it did uh things like um yeah, load in pictures from San Francisco. And you can see how horribly slow...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/kv-QAuKWllQ.txt]]
- Description cue: We hacked 7 of the16 publicly-accessible YC X25 AI agents. This allowed us to leak user data, execute code remotely, and take over databases. All within 30 minutes each. In this session, we'll...

## Book angles
- Could support a chapter/section on **Security & Guardrails**.
- Could support a chapter/section on **Org Design & Leadership**.
