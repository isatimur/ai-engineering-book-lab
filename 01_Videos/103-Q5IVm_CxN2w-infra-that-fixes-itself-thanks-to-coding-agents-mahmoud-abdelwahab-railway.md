---
video_id: "Q5IVm_CxN2w"
playlist_index: 103
title: "Infra that fixes itself, thanks to coding agents — Mahmoud Abdelwahab, Railway"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Q5IVm_CxN2w"
duration: "18:08"
duration_seconds: 1088
view_count: 948
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Q5IVm_CxN2w.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T11:23:00+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Mahmoud Abdelwahab shares a practical take on Infra that fixes itself, thanks to coding agents. This talk shows how we built Railway Autofix, a plug-in template you can drop into any Railway project to monitor your infrastructure, and open PRs with fixes when issues are detected. Key angle: focuses on agent design and orchestration; keeps returning to production-grade engineering."
---
# Infra that fixes itself, thanks to coding agents — Mahmoud Abdelwahab, Railway

## Summary
Mahmoud Abdelwahab shares a practical take on Infra that fixes itself, thanks to coding agents. This talk shows how we built Railway Autofix, a plug-in template you can drop into any Railway project to monitor your infrastructure, and open PRs with fixes when issues are detected. Key angle: focuses on agent design and orchestration; keeps returning to production-grade engineering.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=Q5IVm_CxN2w
- Duration: 18:08
- Playlist index: 103
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> your app's infrastructure should fix itself. Let me show you. So, right now I'm on the Rayway dashboard and I have a bunch of services that are deployed and all of these services have one thing in common. They all have bugs and problems. So, for example, this service has a memory leak. If I click on it, go to metrics, we can just see memoryization keeps growing high and very quickly. This is just a sign of a memory leak and pretty sure the service would eventually crash. If I look over at the amount of requests, we have a high number of 500s. So, the server is failing to respond. We have a high request error rate of 94%. And we also have an extremely high response time of like multiple...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Q5IVm_CxN2w.txt]]
- Description cue: This talk shows how we built Railway Autofix, a plug-in template you can drop into any Railway project to monitor your infrastructure, and open PRs with fixes when issues are detected. We use...

## Book angles
- Could support a chapter/section on **Coding Agents**.
