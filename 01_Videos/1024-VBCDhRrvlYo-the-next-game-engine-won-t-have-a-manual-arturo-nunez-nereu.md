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
  - "Agent Architecture"
ingested_at: 2026-08-20T22:28:14+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Arturo Nunez, who spent almost 10 years at Unity, presents Nereu, a browser game engine where you describe intent in a player's words ('make this robot move with WASD') and an AI assistant applies tags instead of wiring meshes, colliders and rigid bodies. His thesis: today's engines put context on the engine, not on game design, so LLMs reinvent the same camera or movement code each time. Nereu's asset tag system, modelled on entity-component-system design, has built-in systems act on tags. Context is assembled by level of detail: rich data for assets near the edit, a stub for distant ones."
---

# The Next Game Engine Won't Have a Manual — Arturo Nunez, Nereu

## Summary
Arturo Nunez worked at Unity for almost 10 years, then at MongoDB, and now builds Nereu. His thesis: making a game asks for too many skills (programming, 3D modelling, rendering, animation, music), and current engines plus LLMs only build "a bridge between two worlds". You still must know the engine's vocabulary, or the LLM "goes rogue" and reinvents the same wheel each time. He wants to flip the default so the context is the game design, not the engine.

**The demo**
He asks the in-engine assistant to "add a robot". It finds assets tagged or described as robots and makes one the player character. Pressing play does nothing until he says "make this robot move with WASD and animate it." He then adds buildings from an asset library, describes rain (the engine spawns a particle system set up as rain), and asks for a camera that follows the character. He frames this as the language players already know from tutorials: "press A to jump, press A again in the air to double jump". No coding and no asset importing are needed.

**From components to tags**
In a classic engine, a controllable character needs a mesh, renderer, animator, rigid body, collider and audio source, plus movement logic. Most of that is boilerplate every game repeats. Nereu treats everything as an asset that renders and usually has physics, and you add tags for intent: character, animated, double jump, and event rules such as "when you collect a coin, increase the score". This is the asset tag system, taken from entity-component-system and data-oriented design. Systems query the world for tags, for example "move all objects with the vehicle, player and drivable tags". Put those tags on a building and it drives in a kart-style game. The hard part is decomposing genres and moods (a "scary" platformer touches lighting and post-processing) into tags and systems.

**How the assistant works**
The prompt combines scene context, the kind of assets in use (robots, medieval) and the user's own description of the game. The agent then adds or removes tags through tool calls. There is no scripting system on purpose. The engine is JavaScript in the browser, so advanced users can extend it.

**Context by level of detail**
Feeding a whole scene bloats the context: his simple demo had about 100 objects, mostly grass. So he borrows level of detail from rendering. Objects near what the user is editing get full tags and setting values. Nearby objects get a stub such as "a player at this position". The context updates as the user moves.

**How he builds it**
He builds daily in conversation with Claude, checks ideas with friends who specialise in areas like lighting, and cuts settings users rarely touch. Each new tool's definition goes to the assistant. A vision model tagged 6,000 to 7,000 assets from screenshots. The product is in closed alpha. He rejects one-shot games "nobody is going to play", and argues world models are a different medium because 60 frames per second at 4K with physics is "still far away".

## Why it matters
- A clear example of designing a domain vocabulary (tags plus built-in systems) so an agent composes known pieces instead of generating fresh code.
- Level-of-detail context assembly is a transferable pattern: rank state by closeness to the user's focus and send full detail only there.
- Using a vision model over screenshots to label 6,000 to 7,000 untagged assets is a practical way to make a legacy library usable by an agent.
- Shows a deliberate product choice to remove scripting and shrink the settings surface, which trades flexibility for agent reliability.

## Metadata
- Video: https://www.youtube.com/watch?v=VBCDhRrvlYo
- Duration: 19:33
- Playlist index: 1024
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]


## Transcript excerpt
> [music] >> Hello. Hi everyone. Thank you for being here. Um let's start the presentation. Uh I really appreciate you having interest in in learning more about uh game development. So, today I'm going to talk about how I think the next game engine won't have a manual and uh at the end you'll see what I mean by by this. My name is Arturo. I'm uh working on this tool called Nereo and uh first I want to show you kind of like how it works today. Uh so you get a glimpse of what I mean by all this. Um So, we we we we can start asking for what we want and describing something like, "Okay, I want to add a robot." Um okay, so I ask my assistant to help me add a robot. It found some assets that are...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/VBCDhRrvlYo.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.

