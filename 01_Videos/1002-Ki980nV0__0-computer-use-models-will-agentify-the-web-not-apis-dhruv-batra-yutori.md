---
video_id: Ki980nV0__0
playlist_index: 1002
title: "Computer-use models will agentify the web, not APIs — Dhruv Batra, Yutori"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Ki980nV0__0"
duration: ""
duration_seconds: null
view_count: null
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Ki980nV0__0.txt"
themes:
  - "Agent Architecture"
  - "Models & Inference"
ingested_at: 2026-08-14T11:36:16+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Argues the web's long tail will never get APIs and computer-use agents like Navigator (97% Mind2Web accuracy, $0.80/task) will 'agentify' it via pixels-in vision, not scraping."
---

# Computer-use models will agentify the web, not APIs — Dhruv Batra, Yutori

## Summary
Dhruv Batra (Yutori) argues the long tail of the web — most of the ~200 million active sites — will never expose APIs, because real sites hide data behind scanned PDFs, JPEG menu galleries, or FOIA email requests rather than structured endpoints. He shows that even modern JS-rendered pages (an NBA score, an e-commerce stock-status dropdown) compute what's on screen from asynchronously fetched JSON, so agents that just parse HTML miss the actual rendered state — the web was built for human eyes, so agents need vision rather than scraping. Yutori's Navigator model shipped in November as pure screenshot-in/click-out, and its newer version can also write and execute JavaScript on demand, verifying success by reading the resulting screenshot. On the Online Mind2Web benchmark, Navigator N1.5 hits 97% human-eval accuracy (8/300 trajectories wrong, which Batra calls saturated), and the team reports roughly $0.80 per 20-30-step browser task versus about $230 for larger frontier-model agents, with accuracy close to frontier models named in the talk as Opus 4.7 and "GPT 5.5." His conclusion: the web gets "agentified" not through APIs but through swarms of cheap browser agents clicking buttons like humans and returning structured results as an emergent, ad hoc API layer.

## Why it matters
- Concrete counterargument to the "agents will just call APIs" narrative, backed by real examples (restaurant menus, school-district procurement) showing why structured endpoints won't reach the long tail.
- Documents that modern pages compute displayed state from async JSON rather than static HTML, a concrete technical reason coding agents can't just parse markup and must use vision.
- Gives a named benchmark (Online Mind2Web) and cost/latency figures ($0.80 vs. $230 per task, 97% human-eval accuracy) that quantify how fast computer-use agents are improving.

## Metadata
- Video: https://www.youtube.com/watch?v=Ki980nV0__0
- Duration: 
- Playlist index: 1002
- Transcript status: `unavailable`

## Theme hooks
- [[Agent Architecture]]
- [[Models & Inference]]


## Transcript excerpt
> Transcript unavailable.

## Transcript notes
- Transcript not available during ingestion.

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Models & Inference**.
