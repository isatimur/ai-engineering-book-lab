---
video_id: 1UmZHb_E_SM
playlist_index: 1018
title: "How Web Data Infrastructure Powers the Next Generation of AI — Patricija Žemaitytė, Oxylabs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=1UmZHb_E_SM"
duration: "19:03"
duration_seconds: 1143
view_count: 2100
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/1UmZHb_E_SM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:03+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Patricija Zemaityte (Oxylabs) recounts three scaling stories: a video-API build for AI training, cutting SERP latency from 4s to 550ms, and scraping traffic reaching 6B daily requests."
---

# How Web Data Infrastructure Powers the Next Generation of AI — Patricija Žemaitytė, Oxylabs

## Summary
Patricija Žemaitytė, a product manager at Oxylabs (a proxy/web-data infrastructure provider founded in 2015), tells three build stories that argue AI progress is bottlenecked by data-delivery infrastructure, not model quality. First: a client asked for a video-download API for AI training in two weeks at 5 petabytes/month; Oxylabs shipped it, then iteratively added transcript support, then subtitle support (after discovering the client actually needed subtitles, not transcripts), then search and metadata, turning a one-off request into a full video API suite within about three months — while, by 2026, the client had amassed 30 petabytes of data and Oxylabs was still waiting on payment. Second: after a 2024 client's sub-second SERP-delivery request (against a ~4-second baseline) went untested and was shelved, a 2025 client's request for zero-retention, sub-second search with a two-week deadline forced a from-scratch redesign that hit 650ms P90 within two weeks, then got "blocked really bad" during a live client test and had to be rebuilt around browsers before reaching a shipped fast-search API at 550ms average latency, with traffic on that surface growing from 400 million to almost 6 billion daily requests. Third: a scraping/web-unlocker product had to scale from about 10,000 to 60,000 requests per second in under two months (internally "Project 60," now pushing toward 100,000 as "Project 150"), where the real bottleneck wasn't the servers but load-testing with traffic realistic enough to trust, since observability itself becomes part of the load at scale.

## Why it matters
- Grounds the abstract claim "AI needs live data, not just training" in three dated, numbered engineering case studies (petabyte-scale video pipelines, sub-second SERP latency, requests-per-second scaling), useful as concrete evidence rather than a vendor platitude.
- Surfaces a data-infrastructure lesson relevant to any RAG/agent chapter: requirements from clients were repeatedly wrong on the first try (transcripts vs. subtitles), and speed itself gates what product/use case is even possible (4s vs. 550ms SERP latency).
- Documents that scaling request volume (10K→60K→100K req/s) breaks not at the server layer but at load-testing and observability, a specific operational failure mode worth citing for a reliability/scale discussion.

## Metadata
- Video: https://www.youtube.com/watch?v=1UmZHb_E_SM
- Duration: 19:03
- Playlist index: 1018
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Okay, hello everyone. So, mostly I talk today starts with models. This one starts somewhere less glamorous with infrastructure that decides whether those models get fresh, usable, real-time data at all. So, I work at Oxylabs and Oxylabs was established in 2015 and describes itself as a web intelligence platform and a premium proxy provider. In simple terms, we built infrastructure that allows companies to extract public web data at scale. And as we all know, public web data theoretically is available for everyone. But when you But in practice, if you want to connect your AI models, agents, databases, you need infrastructure layer. Uh so, this is what we do and this is where what...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/1UmZHb_E_SM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://oxylabs.io/press-area/from-web-to-artificial-intelligence>
