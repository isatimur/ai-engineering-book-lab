---
video_id: "idDnpGqJd80"
playlist_index: 483
title: "Building an AI assistant that makes phone calls [Convex Workshop]"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=idDnpGqJd80"
duration: "50:53"
duration_seconds: 3053
view_count: 1748
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/idDnpGqJd80.txt"
themes:
  - "Org Design & Leadership"
  - "Voice & Realtime"
ingested_at: "2026-04-24T12:20:11+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Tom Redmond, head of DX at Convex, demos Floyd, a proof-of-concept personal assistant that places real phone calls for its user. A voice request is transcribed by Google Cloud speech-to-text, saved to a reactive Convex database, picked up by an Express server that builds a context-aware action plan with GPT-4o, and then voiced over Twilio with OpenAI text-to-speech in a streaming loop. His thesis: a reactive database removes polling and websocket plumbing from the client, and voice-agent latency is the sum of every hop, so tricks like a pre-recorded greeting and short prompts matter more than any single model."
---
# Building an AI assistant that makes phone calls [Convex Workshop]

## Summary
Tom Redmond, head of developer experience at Convex, runs an 8 a.m. workshop on Floyd, an assistant that does what a real personal assistant does: get on the phone. Most AI assistants set timers and calendar events. Redmond argues that enough real-time pieces now exist to let an assistant that knows your context hold a "non creepy" conversation with another human. He calls the code a proof of concept with no auth and no prompt-injection guard, and he tells the room not to ship it.

**The pipeline**
- The client streams the user's voice to Google Cloud speech-to-text and saves the request text to Convex. That is all the client does.
- An Express server subscribes to pending requests through a reactive query, so nothing polls. It sets the status to in flight, pulls everything the database knows about the user, and saves the relevant subset onto the request.
- GPT-4o first writes an action plan (for a sick-day call: the child's full name, the school, the reason, the date, the steps). That plan goes back in as context for the call.
- Twilio places the call and streams audio over a websocket, chunked per utterance. Audio goes to Google Cloud for transcription, the text goes to GPT-4o, the reply goes to OpenAI text-to-speech, and the audio goes back to Twilio as base64. Each transcript line is appended to Convex, and the client sees it live through a one-line `useQuery`.

**Live demos**
Every number is rewired to call Redmond, who plays the school and then a flower shop. The flower call shows the bail-out path. When the shop asks for details Floyd lacks, it says it will call back, and the design is to text the user for the missing budget or vendor.

**Why Convex**
Redmond first tried Next.js on Vercel and hit the wall that serverless hosting and stateful websockets do not mix. With Convex, backend queries, schemas and HTTP actions live in the client codebase but run on a custom V8 engine next to the database. You get type safety from database to front end and no caching to think about. Developers debug through dashboard logs. He did not know if breakpoints work.

**Latency lessons**
- The first exchange is the slowest, so Floyd plays a pre-generated greeting the moment someone says hello. That buys time for the first full loop.
- The prompt grows with the conversation, so latency gets worse as the call goes on. Trimming every prompt, or using the threads API, would help.
- Text-to-speech on three sentences can take two to five seconds. His fixes: pay for lower latency or switch providers. He uses Opus encoding for phone-quality streaming.
- Total latency is the sum of every hop, and he bets the stack will be twice as fast in six months without any work from him.

**Disclosure stance**
Floyd says up front that it is an AI. Redmond's bet: businesses will not mind talking to an AI when it is buying a real service or making a harmless change, and they may learn to talk to agents efficiently.

## Why it matters
- A clear end-to-end voice-agent pipeline (speech-to-text, LLM, text-to-speech, telephony) with each hop named, and a good case study for streaming architecture.
- The pre-recorded greeting that covers first-turn latency is a cheap, reusable trick for any phone agent.
- It shows prompt growth as a hidden latency cost in long conversations, which argues for trimming context turn by turn.
- The plan-first step (GPT-4o writes a structured action plan, then uses it as call context) is a simple pattern for grounding agents in user data.
- An honest list of what a demo leaves out (auth, prompt injection, call trees), useful for any chapter on getting voice agents to production.

## Metadata
- Video: https://www.youtube.com/watch?v=idDnpGqJd80
- Duration: 50:53
- Playlist index: 483
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Voice & Realtime]]

## Transcript excerpt
> [Music] well hello everybody thank you for braving the early morning uh 8 A.M is rough for the best of us so I really do appreciate the crawling out of bed and coming to uh check out this talk my name is Tom Redmond I am the head of DX at a company called convex we're building a platform that people are able to build their companies on from day one to year two hopefully year 10 and year 20 and Beyond Today I wanted to walk through this idea that I've had for a long time about building a better AI assistant it came to me a little while ago um after trying a number of AI assistants most of which can pretty much set calendar events and reminders and timers and things like that and I thought to...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/idDnpGqJd80.txt]]
- Description cue: In this workshop, we'll use a variety of technologies to build a better AI assistant. This workshop leverages a Convex vector database to establish a knowledge base, Google Cloud speech-to-text,...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **Voice & Realtime**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/get-convex/ai-world-fair.git>
