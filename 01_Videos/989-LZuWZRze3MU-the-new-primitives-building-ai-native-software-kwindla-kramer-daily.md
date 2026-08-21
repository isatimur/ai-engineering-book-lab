---
video_id: LZuWZRze3MU
playlist_index: 989
title: "The New Primitives: Building AI Native Software — Kwindla Kramer, Daily"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=LZuWZRze3MU"
duration: "21:14"
duration_seconds: 1274
view_count: 5600
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/LZuWZRze3MU.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-08-14T11:35:44+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kwindla Kramer (Daily/Pipecat) frames agents as one stage in computing history and cites Tavus's Knowledge Navigator remake and his own Gradient Bang game as early AI-native software."
---

# The New Primitives: Building AI Native Software — Kwindla Kramer, Daily

## Summary
Kwindla Kramer (Daily; creator of Pipecat, an open-source, vendor-neutral voice-agent framework he says is used by AWS, NVIDIA, Anthropic, and thousands of startups) argues today's agent work is one stage in an 80-year arc of computing eras, not an endpoint. He walks the arc from Vannevar Bush's 1945 "As We May Think" and the memex, through 1950s programming languages, 1960s interactive/graphical computing (illustrated with Star Trek's talking computer versus HAL 9000), 1970s relational databases and Smalltalk, 1980s personal computers and VisiCalc, 1990s multimodal web, 2000s mobile and gestural UI (Minority Report and Iron Man, both consulted on by MIT Media Lab researcher John Underkoffler, whose gestural-interface work Kramer commercialized via a startup he co-founded with Underkoffler in 2006), to 2010s cloud infrastructure. He frames present-day loops, tool calls, and context engineering — illustrated with a Satya Nadella clip describing multimodal harnesses with progressive tool disclosure for token efficiency — as "agents plus plus," a step toward a coming "AI-native software" layer, analogous to how the web superseded static 1995-era HTML pages. As evidence this is already emerging, he points to two concrete artifacts: a Tavus-produced remake of Apple's 1987 "Knowledge Navigator" concept video, shot in one continuous take using only currently available technology, and his own project "Gradient Bang," a multiplayer game built with LLMs at the core of every interaction (hundreds of concurrent inference calls per moment) demonstrating asynchronous non-blocking context compression, long-running sub-agents that share context, progressive skills loading, dynamic UI generation, and conversational voice control.

## Why it matters
- Supplies a reusable historical framing device (abacus to stored-program computer to personal computer to agents, with VisiCalc as a counter-argument to AI-driven unemployment fears) that a book chapter can use to position "agents" as one stage rather than the destination.
- Grounds the "AI-native software beyond agents" claim in two named, checkable artifacts (Tavus's Knowledge Navigator remake, Kramer's own Gradient Bang game with its listed sub-agent/context-sharing patterns) rather than pure speculation.
- Surfaces Nadella's "harness" framing (models, data, and tools in a loop; progressive, token-efficient tool disclosure) as a named industry articulation of context engineering worth cross-referencing against other talks in the corpus.

## Metadata
- Video: https://www.youtube.com/watch?v=LZuWZRze3MU
- Duration: 21:14
- Playlist index: 989
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> Good morning. I know a lot of you in this room. It's great to see you. Welcome to the voice track at AI Engineer World's Fair. For those of you who don't know me, my name is Quinn La Holman Cramer. I work at a company called Daily. We make developer infrastructure for real-time audio, video, and AI. And we're the team behind Pipe Cat, which is the most widely used framework for building voice agents today. Pipe Cat is open source and vendor neutral. It's used by companies like AWS and Nvidia and Anthropic and thousands of startups and scale-ups and enterprises. And today I'm going to talk about what kind of agents we're building today, including voice agents, but not just voice...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/LZuWZRze3MU.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/pipecat-ai/pipecat>
