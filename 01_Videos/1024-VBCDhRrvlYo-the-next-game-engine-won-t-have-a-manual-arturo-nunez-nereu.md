---
video_id: VBCDhRrvlYo
playlist_index: 1024
title: "The Next Game Engine Won't Have a Manual — Arturo Nunez, Nereu"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=VBCDhRrvlYo"
duration: "19:33"
duration_seconds: 1173
view_count: 803
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/VBCDhRrvlYo.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:14+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Nereu's Arturo Nunez replaces game-engine boilerplate with natural-language tags (an ATS) and an LOD-based method for assembling LLM context from 6-7k vision-tagged assets."
---

# The Next Game Engine Won't Have a Manual — Arturo Nunez, Nereu

## Summary
Arturo Nunez, formerly of Unity for close to 10 years and later MongoDB, describes Nereu, a game engine where players describe intent in natural language ("add a robot," "make it move with WASD and animate it") instead of manually wiring meshes, renderers, colliders, and rigid bodies. Every asset carries tags through what he calls an ATS (asset tag system), modeled on entity-component-system / data-oriented design from game development, so an AI assistant can query and apply tags like character, vehicle, or drivable — there is no scripting system by design, only a JavaScript escape hatch for advanced users. To keep LLM context manageable, Nereu borrows the game-dev concept of level of detail: assets near the player or being edited get full tag and settings context sent to the model, while distant assets get minimal representation, the same way distant geometry gets lower-fidelity rendering. The roughly 6,000-7,000 3D assets in the library were tagged by running vision models over screenshots rather than by hand. Nunez says he built the engine iterating daily with an AI coding assistant and domain-expert friends, and he contrasts his tag-driven approach with "world model" game generation, which he argues still can't hit real-time 60fps at 4K with physics simulation.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=VBCDhRrvlYo
- Duration: 19:33
- Playlist index: 1024
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hello. Hi everyone. Thank you for being here. Um let's start the presentation. Uh I really appreciate you having interest in in learning more about uh game development. So, today I'm going to talk about how I think the next game engine won't have a manual and uh at the end you'll see what I mean by by this. My name is Arturo. I'm uh working on this tool called Nereo and uh first I want to show you kind of like how it works today. Uh so you get a glimpse of what I mean by all this. Um So, we we we we can start asking for what we want and describing something like, "Okay, I want to add a robot." Um okay, so I ask my assistant to help me add a robot. It found some assets that are...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/VBCDhRrvlYo.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
