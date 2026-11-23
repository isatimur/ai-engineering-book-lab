---
video_id: u-rJwPPU3QA
playlist_index: 732
title: "How to talk to statues — Joe Reeve, ElevenLabs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=u-rJwPPU3QA"
duration: "33:28"
duration_seconds: 2008
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/u-rJwPPU3QA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
ingested_at: 2026-06-04T14:10:19+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Joe Reeve, in the growth team at ElevenLabs, tells how he vibe coded a statue app in Cursor in two hours: photograph a statue, run deep research on it, design a matching voice from a text description, and start a voice-agent call within 30 seconds. The video went from 50,000 to 1.5 million impressions and drew museums and auction houses. His point is that the glue and the story around existing scalable APIs matter more than hard technical problems. The open Q&A covers voice UX: people are too polite to interrupt agents, voice needs a visual channel, and audio lacks skim listening."
---

# How to talk to statues — Joe Reeve, ElevenLabs

## Summary
Joe Reeve works in the growth organisation at ElevenLabs, an audio AI foundation model company (text to speech, transcription, licensed music generation, sound effects, voice design and a managed agents platform). The session opens with his viral statue app and then becomes an open discussion with the audience about voice interfaces, vibe coding and making videos.

**The statue app**
You take a picture of a statue. The app runs an OpenAI deep research query on its identity, writes historical knowledge and a prompt for how the statue might have sounded, then calls ElevenLabs' voice design API, which he calls underused, to generate a voice from a text description. It then creates an ElevenLabs agent and starts the call. The whole chain runs in about 30 seconds. He built it in Cursor in two hours on a Sunday and published the one-shot prompt. The first post got 50,000 impressions; one CEO called to say a team of ten had spent a year on the same idea. A follow-up post saying he had vibe coded it in two hours reached 1.5 million impressions. Museums, Bonhams and Christie's then asked to let people talk to their objects.

**Scaling and content**
Asked how to take the prototype to production, he says the hard parts (agents, voice design) are APIs built to scale, and logins can be one-shot with off-the-shelf services. To him, vibe coding shows that the glue, and "telling a good story about the glue", matter more than solving hard technical problems. The long-tail work is content: curators should design the narrative instead of relying on web research, and many museums already expose their collection databases through APIs; he names the V&A's public API. Curators could today only edit the system prompt and knowledge files in the ElevenLabs dashboard. A former head of the Americas at the British Museum, now running the Sainsbury Centre, is studying what an object should sound like given where its stone came from, where it was carved and where it has lived.

**Voice interaction problems**
- Voice and other interfaces are still a binary; voice plus generative UI is mostly missing.
- He wants to talk to a product-manager agent that briefs the coding agent, not to the coding agent itself.
- People are too polite to interrupt voice agents. He has learned to interrupt hard, which improves the experience, but does not know how to give users permission.
- Audience members note low information density in spoken replies, that a terse spoken answer sounds rude, and that you cannot tell how long a reply will be. Ideas raised: skim listening with forward and back taps by concept, push-to-talk instead of fragile voice interruption, and a visual nudge when the agent wants to speak.
- Most platforms generate the full text, then audio, and append a user's interruption to the end. Since playback timestamps are known, he suggests editing the transcript to forget what was never heard, and running an async loop over the transcript to ask whether the agent has anything to add.

**Vibe coding and video**
He thinks vibe coding has not gone consumer yet and expects an "Instagram filters moment" for it. His template is the now-deprecated Facebook Instant Games API: he bought a Fruit Ninja clone for 15 pounds, added its social and ad primitives, and woke up to 15 million users, mostly in Vietnam. On video: he edited the statue video on his phone in about 20 to 25 minutes. Median view time is 6 to 12 seconds, so front-load the hook, add captions, and add music, which people underrate.

## Why it matters
- The statue app is a compact case study of a voice agent assembled from APIs (deep research, voice design from text, managed agent) in two hours, with a 30-second setup per object.
- The claim that the glue and the story around it matter more than hard technical problems is a useful frame for prototyping with AI APIs.
- Editing the agent's transcript at the playback timestamp of an interruption is a concrete fix for a common voice-agent flaw.
- The audience's list of voice UX gaps (polite users, no length cues, no skim listening, no back-channel 'uh-huh') is raw material for voice interface design.
- The note that curators, not web research, must own the narrative shows where the real work lies when a voice prototype meets an institution.

## Metadata
- Video: https://www.youtube.com/watch?v=u-rJwPPU3QA
- Duration: 33:28
- Playlist index: 732
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]


## Transcript excerpt
> [music] >> Can I get a vibe check of the room? How's everyone feeling? Are we like we really want to hear what Joe has to say about statues or are we like I just want to like chill and just sit in a quiet room. How people feeling? Statues. Statues. Okay, that's good to hear. You're much more lively than statues which I spent a surprising amount of my my life with recently so um This I'm going to well actually I'll quickly introduce myself. I'm Joe. I work in the growth organization at 11 Labs. Hands up if you've actually I've got a slide for that. Hands up if you've ever used slash heard of 11 Labs. Okay. So that this next slide you'll probably be familiar with a lot of it. Um 11 Labs does...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/u-rJwPPU3QA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://elevenlabs.io/blog/talk-to-a-statue-building-a-multi-modal-elevenagents-powered-app>
