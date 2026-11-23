---
video_id: "y6L5RkEqQ8g"
playlist_index: 396
title: "ChatGPT is poorly designed. So I fixed it"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=y6L5RkEqQ8g"
duration: "5:21"
duration_seconds: 321
view_count: 7471
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/y6L5RkEqQ8g.txt"
themes:
  - "Coding Agents"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:16:37+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "In a five-minute lightning talk, the speaker (unnamed in the transcript; he mentions work at Warp terminal) argues that ChatGPT ships the org chart: voice and text feel like two apps from two companies, and the model picker is a confusing science fair. He builds a fix with off-the-shelf APIs. A realtime voice model runs the live call, a send-chat-message tool pushes links and drafts into an iMessage-style text panel, and a second tool hands deep questions to a reasoning model. He notes the text tool needed no system prompt, only a tool description. Source code is on GitHub as fixgpt."
---
# ChatGPT is poorly designed. So I fixed it

## Summary
This is a five-minute lightning talk. The speaker is not named in the transcript; he says he explores these patterns at Warp terminal, a developer tool. His thesis: ChatGPT is one of the fastest-growing apps in history, yet it is confusing because it ships the org chart.

**The problem: two apps in one**
He shows ChatGPT's two voice buttons, voice-to-text and voice-to-voice. In voice mode he asks for a group email about the AI Engineer World's Fair. The model writes a good email but can only speak it. To work on the written text, you must end the call and find the transcript. Voice and text feel like they "were built by two different companies". He quotes another engineer's phrase "shipping the org chart": an EV dashboard turned out to be three Android tablets chained together, each with its own font. At OpenAI, he says, a whiz kid ships a technical improvement, marketing is never consulted, and users face a "science fair" of model names.

**Two fixes with off-the-shelf tools**
He wants two changes: voice and text at the same time, and smart choice of model based on the request.
- A realtime voice model runs the live audio chat. A chat button opens an iMessage-style panel, like texting a friend during a FaceTime call, with call controls at the top and text replies for details such as email drafts.
- Tool calls handle the rest. A send-chat-message tool pushes links and drafts into the text panel. A second tool hands deep questions to a reasoning model and returns a fuller answer.

**The Warp pattern**
In Warp, a simple ask such as undoing the last commit goes to a coding agent that runs terminal commands. A complex ask, such as refactoring a codebase to Flutter, triggers a plan from a reasoning model first. He says simple heuristics work: if the user asks for details or pros and cons, hand off to reasoning, show how long it is thinking, and hand back a detailed reply.

**The demo**
He asks for a park to visit in California; the voice agent sends a link to the chat. He asks for the history of a national park and says "go deep"; the voice reply points him to the chat for details. He stresses that the text tool needed no system prompt, only a tool description. The code is on his GitHub as fixgpt.

## Why it matters
- A clear, small example of tool calls as a bridge between modalities: the voice model stays in the call and a tool writes the long-form text.
- Model routing as a tool call: the fast model decides when to hand off to a reasoning model, instead of making the user pick from a model menu.
- The point that a tool description alone, with no system prompt, steered the model well is a useful data point on how much prompting modern models need.
- Shipping the org chart is a sharp frame for product chapters on why AI apps feel stitched together, and how a single interface can hide several models.

## Metadata
- Video: https://www.youtube.com/watch?v=y6L5RkEqQ8g
- Duration: 5:21
- Playlist index: 396
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Org Design & Leadership]]

## Transcript excerpt
> That GPT is one of the fastest growing fastest growing apps in history. But with hundreds of millions of people using this every day, has no one stopped to ask why is this app so confusing? Now let's demonstrate that with a conversation. I have chat GBT pulled up and we actually see two buttons to interact with voice. This is the voicetoext option and this is voice to voice. Hey, OpenAI. How's it going? Hey there. I'm doing great. Thanks for asking. How about you? What's new on your end? Sounds pretty good with a little bit of vocal fry, but let's try something a little bit more descriptive. I want you to write a group email just saying, "I'm super excited for the AI Engineer World's Fair...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/y6L5RkEqQ8g.txt]]
- Description cue: Let's fix ChatGPT's greatest design sins. We'll design and build a working app that makes ChatGPT multi-modal and multi-model. And no, you don't need to know what those words mean to use it....

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/bholmesdev/fixgpt>
- resource: <https://www.gettheleverage.com/p/why-is-ai-marketing-so-so-bad>
