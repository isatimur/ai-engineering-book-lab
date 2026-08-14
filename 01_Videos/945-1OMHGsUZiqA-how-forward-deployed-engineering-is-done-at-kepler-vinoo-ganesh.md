---
video_id: 1OMHGsUZiqA
playlist_index: 945
title: "How Forward Deployed Engineering is done at Kepler — Vinoo Ganesh"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=1OMHGsUZiqA"
duration: "22:20"
duration_seconds: 1340
view_count: 1600
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/1OMHGsUZiqA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:10+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Vinoo Ganesh argues FDE is a product-discovery function, not go-to-market, via Palantir case studies: a failed data platform, a 4-hour Slack fix, a Parquet viewer, and a hack that never died."
---

# How Forward Deployed Engineering is done at Kepler — Vinoo Ganesh

## Summary
Vinoo Ganesh (Palantir alum, now at Kepler) argues forward deployed engineering (FDE) is fundamentally a product-discovery function, not a go-to-market role, illustrated with stories from Palantir's 2013 Foundry buildout. In one, Palantir's isolated "Phoenix" data-retention design defaulted missing dates to 1970 and tried to bucket 2.3 million Cassandra key spaces, requiring 14TB of RAM just to boot — a failure traced to designing without an embedded customer. He contrasts that with a shipping company engagement where a 47-page requirements doc for a 3-month BI dashboard was replaced, after one site visit, with a 4-hour Slack alert once the FDE asked what the dispatcher actually did each morning. A second story shows a data engineer resisting a CSV-to-Parquet migration for a year until on-site observation revealed she manually opened CSVs to eyeball data quality; a one-night Parquet viewer won her approval and cut pipeline runtime from 17 hours to 2. He closes with a cautionary tale of a "temporary" Groovy retention script ("venue.groovy") that shipped to production and was still running unsupported 12 months later at a 100,000-person customer, arguing that every FDE hack becomes permanent and must be judged by whether it belongs in the core product.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=1OMHGsUZiqA
- Duration: 22:20
- Playlist index: 945
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] It's kind of an emotional thing to hear uh series of folks who've kind of been talking about how Palenter used to do things. Um it's funny in the olden days and this what this talk will be about is largely uh Palin's focus of FTE became a go-to market strategy but it wasn't that in the beginning how we were figuring out how to build foundry was through the lens of a product strategy and so my talk is going to be how we used FDE as a product strategy in 2013 to make the data platform that enabled Palunteer to then become the thing that Kevin Nat and all these folks were able to build on and it ultimately comes from like the background of something pretty simple. So my background is...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/1OMHGsUZiqA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
