---
video_id: grdoOC1BT1s
playlist_index: 827
title: "Think You Can Build a Game with AI? Think Again! - Danielle An & David Hoe, Meta"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=grdoOC1BT1s"
duration: "18:00"
duration_seconds: 1080
view_count: 1900
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/grdoOC1BT1s.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Danielle An and David Hoe, who have led AI-driven game creation work at Meta for over a year, argue that AI lets anyone prompt a working game over a weekend, but those games all look alike. What separates a good game is still aesthetics, cohesion, playtesting and taste. They show key art as an anchor for consistent style, a multiplayer game with unscripted LLM-driven NPCs built in a couple of days, and a shift from linear waterfall game production to parallel iteration in hours or days. Open problems: non-determinism across the whole agentic stack, token economics, and content safety for runtime LLMs."
---

# Think You Can Build a Game with AI? Think Again! - Danielle An & David Hoe, Meta

## Summary
Danielle An, a principal engineer at Meta, and David Hoe lead some of Meta's AI-driven game creation work and have done so for over a year. They replace slides with an interactive game: the audience scans a QR code, a voting system picks who controls the character, and each NPC reveals a slide. David built the games they show in the last 12 hours. The talk is light on engineering detail and heavy on product lessons.

**The prompted-game plateau**
By 2026 many people, or their kids and parents, have prompted a platformer or Tetris clone with a chat model. It impresses at first, works out of the box only if you are lucky, and the novelty wears off because everyone asks for the same thing and the results look similar. The real change is that skill gates are gone: a coder who cannot draw or model in 3D can generate art, and an artist no longer waits for engineers. That does not mean everyone can make a good game.

**What makes a game stand out**
Aesthetics beyond colored boxes, cohesion so that UI, story and art feel like one universe, and playtesting with real people. Once every game looks polished, the remaining differentiator is taste: a feel for which humans would enjoy the game and why. An art director they work with shows a workflow that uses one key art image (a bear) as an anchor. It sets the art style for the assets, hints at gameplay, and keeps the model cohesive across sessions.

**Runtime LLMs**
Their team built a four-player competitive game in a couple of days where every NPC is driven by an LLM at runtime. Players give each NPC a personality (thief, honorable, fast), and the NPCs decide on their own to steal cubes, block or kick each other. Nothing is scripted, so no two games repeat. They say this genre was not possible before the last 18 months or so, because inference was too slow and models too expensive. They admit the industry is early: the Star Trek idea of asking for a forest with bears to hunt and having it appear is not today's reality.

**What changed in how teams work**
Game production used to be a linear waterfall (design, art, modeling, animation, code) where upstream decisions are costly to revisit. With AI, disciplines work in parallel and iterations take hours or days instead of months, which means more playtests and more fun. A runtime game master can also personalize play, for example helping a less coordinated player keep up with friends in co-op.

**Platform-scale problems**
At Meta's scale, agentic systems sit everywhere: user prompting, runtime NPC decisions, and serving, ranking and delivering content. That brings non-determinism through the whole stack. Model upgrades or prompt changes can throw the system off, and engineers used to stability against a known codebase struggle to debug it. For engineers they flag token economics (making creators, players and the platform profitable) and content safety when runtime LLMs generate images and content.

## Why it matters
- It names where AI-made games commoditize (first prompt) and where value moves (taste, cohesion, playtesting), a pattern that applies to any generated product.
- Key art as a style anchor is a simple, concrete technique for keeping generated assets and sessions consistent.
- The LLM-driven NPC game is a concrete example of runtime LLMs as product mechanics, made possible by faster and cheaper inference.
- The waterfall-to-parallel shift is a clear claim about how AI changes cross-discipline team workflows.
- It raises end-to-end non-determinism, token economics and content safety as open problems at platform scale, without claiming answers.

## Metadata
- Video: https://www.youtube.com/watch?v=grdoOC1BT1s
- Duration: 18:00
- Playlist index: 827
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> Hello, thank you for joining us before lunch especially. So, I appreciate it. Uh, I'm David from our AI for Meta. I'm Danielle. I'm a principal engineer at Meta. And we have a little set of slides here. We thought we'd make a make a little different experience today. So, instead of non-interactive slides, you get some interactive slides. So, if anyone's interested, you can just scan this QR code. I'll try and make it bigger for you. And uh if you get fidgety, have a go and see what this does along the way. This is linked up to by the way. So, instead of slides, each NPC will reveal the slide content. So, depending on how chaotic you want things to be, you have control. Everyone...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/grdoOC1BT1s.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
