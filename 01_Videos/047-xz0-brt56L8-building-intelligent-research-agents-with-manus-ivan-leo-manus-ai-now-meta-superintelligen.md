---
video_id: "xz0-brt56L8"
playlist_index: 47
title: "Building Intelligent Research Agents with Manus - Ivan Leo, Manus AI (now Meta Superintelligence)"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=xz0-brt56L8"
duration: "1:21:30"
duration_seconds: 4890
view_count: 20686
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/xz0-brt56L8.txt"
themes:
  - "Evals & Reliability"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T10:51:31+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Manus AI's Ivan Leo demos the Manus API's task lifecycle, webhooks, Slack Block Kit integration, and a browser operator that drives the user's own authenticated Chrome sessions."
---
# Building Intelligent Research Agents with Manus - Ivan Leo, Manus AI (now Meta Superintelligence)

## Summary
Ivan Leo (Manus AI, now Meta Superintelligence) live-codes a workshop building a Slack integration on the Manus API, covering the task lifecycle (running/pending/completed/error states, typically 3-5 minutes per task), the files API (uploads auto-delete after 48 hours), webhook registration versus polling, and Slack-specific mechanics (Events API challenge verification, thread-ts tracking via a key-value store, Block Kit UI, markdown-to-Slack formatting). He contrasts the full Manus 1.5 model for complex tasks with the faster Manus 1.5 light, and demos a remote browser operator that drives the user's own local Chrome session rather than a sandboxed instance like Browserbase, so it can act on authenticated sites such as Google Maps, LinkedIn, and Instagram, plus a Notion-connector demo where Manus OCRs a receipt and updates a company expense-policy page accordingly. He also describes building a conference-schedule app by having Manus scrape the AI Engineer website into JSON and wire it to a Chroma vector database (via API key) for a personalized recommendation timeline, noting that each Manus session ships with a full Docker image so users can install Redis/BullMQ or Stripe with auto-configured webhooks. In Q&A he says Manus has no cross-conversation memory yet (on the roadmap), that user data is hosted in the US and staff don't read chat transcripts except when a user reports a bug, and that slide/PPTX export via the API is coming within about two weeks for feature parity with the web UI.

## Why it matters
- Walks through concrete production-agent-API mechanics — task states, webhooks vs. polling, file lifecycle/auto-deletion, Slack thread-state management — that a book chapter can use as a reference architecture for agent integrations.
- The local-browser-operator pattern (driving the user's own authenticated Chrome instead of a sandboxed browser) is a distinct architectural choice worth citing against sandboxed browser-automation approaches like Browserbase.
- Q&A candidly surfaces current limitations (no persistent memory, data-residency/privacy posture, planned permission system for browser access) that are useful primary-source evidence on agent-product maturity.

## Metadata
- Video: https://www.youtube.com/watch?v=xz0-brt56L8
- Duration: 1:21:30
- Playlist index: 47
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [music] Yeah, I think I can just start. Um so the way this workshop will just be run is we'll show a few demos of what we built with Manis what we have at the moment and then um if you guys have any questions at any point in time feel free to stop me um throughout this whole workshop what we're going to be using is the new manus API and it will go basically will reproduce our original Slackbot um so if you use our new Madis app you can actually now use Madness in Slack uh so hopefully it works since I'm doing it live I'm a little worried but uh let's see So I think a common question that a lot of people are asking is what is manis and what does manness actually do right which is quite fair...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/xz0-brt56L8.txt]]
- Description cue: AI agents are no longer confined to chat interfaces. From our original Manus app for powerful conversations, to Mail Manus for transforming your inbox into an organized command center, we've...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **RAG & Retrieval**.
