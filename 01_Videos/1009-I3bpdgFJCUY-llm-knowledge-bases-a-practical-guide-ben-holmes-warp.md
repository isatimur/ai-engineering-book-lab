---
video_id: I3bpdgFJCUY
playlist_index: 1009
title: "LLM Knowledge Bases: a practical guide — Ben Holmes, Warp"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=I3bpdgFJCUY"
duration: "21:17"
duration_seconds: 1277
view_count: 3300
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/I3bpdgFJCUY.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-08-14T11:36:29+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Warp's Ben Holmes shows a note-enrichment pipeline: voice capture, an agent enrich-note skill with fixed tags and backlinks, wiki generation, and scheduled cloud automation via oz.dev."
---

# LLM Knowledge Bases: a practical guide — Ben Holmes, Warp

## Summary
Ben Holmes (developer relations, Warp) demonstrates a workflow for turning ad hoc notes — voice-dictated using local, on-device dictation tools rather than typed — into a structured, agent-navigable knowledge base. An "enrich note" agent skill adds a timestamp, pulls tags from a fixed reference list (so the model can't invent new ones freely), web-searches for the source, and finds backlinks to related notes, runnable across models including open-weight ones inside Warp's terminal. He then generates topic wikis (crediting a gist from Andrej Karpathy as the origin of the "LLM knowledgebase" idea) that group notes into people, places, and concept sections, and automates the whole enrich-and-rebuild cycle on a schedule using Warp's oz.dev cloud sandbox, which syncs the markdown folder via the Obsidian headless CLI, runs the agent skill, and syncs the changes back overnight. He closes by showing agent-generated HTML/Tailwind graph visualizations of the note corpus that cluster notes by topic into clickable, explorable views of how they interconnect.

## Why it matters
- Spells out a concrete, reusable note-enrichment pipeline (voice capture, an enrich-note skill with a fixed tag vocabulary, wiki generation, scheduled cloud automation) directly relevant to any project that maintains a growing knowledge base from raw notes or transcripts.
- Cites a named origin (a Karpathy gist) for the "LLM knowledgebase" pattern and a concrete automation platform (oz.dev with the Obsidian headless CLI) as evidence of how the pattern gets operationalized.
- Shows agent-generated visualization (topic clustering, clickable graph views) as a low-effort way to surface patterns across a large note corpus, relevant to synthesis and pattern-finding work.

## Metadata
- Video: https://www.youtube.com/watch?v=I3bpdgFJCUY
- Duration: 21:17
- Playlist index: 1009
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] All right. Are we ready to go? Okay, we're ready to go. Are y'all ready to go? >> We ready? All right. Let's do this thing. Uh, all right. Well, hello everyone. I'm Ben Holmes, developer relations lead at Warp. Uh, you might have heard of Warp as a terminal that's really nice to use for you and your coding agents. You may have also heard of it as a cloud platform that helps you build out software factories. If you haven't, we have a booth in the expo. You can go talk to us about it. Uh, but today I'm actually going to be talking about something called LLM knowledge bases. Uh, maybe a show of hands. How many people have an Apple Notes folder that's a complete disorganized mess that...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/I3bpdgFJCUY.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
