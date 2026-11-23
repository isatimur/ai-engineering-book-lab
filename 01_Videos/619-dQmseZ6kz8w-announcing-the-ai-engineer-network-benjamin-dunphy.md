---
video_id: "dQmseZ6kz8w"
playlist_index: 619
title: "Announcing the AI Engineer Network: Benjamin Dunphy"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=dQmseZ6kz8w"
duration: "7:44"
duration_seconds: 464
view_count: 2346
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/dQmseZ6kz8w.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:26:43+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Benjamin Dunphy, co-founder of the AI Engineer Summit, opens the inaugural 2023 summit for 500 selected attendees. He tours the sponsors, from Auto GPT (once just an open-source project, now the presenting sponsor) to Microsoft and GitHub, then announces two things about Network, the conference mobile app: LLM-based 'generative matching' that pairs attendees by the problem they state in their profile, and the open-sourcing of both the event app and the matching algorithm, built on a hosted Postgres database with PG Vector. His thesis: conferences are already high-signal, and LLM matching can make the hallway conversations better."
---
# Announcing the AI Engineer Network: Benjamin Dunphy

## Summary
Benjamin Dunphy, co-founder of the AI Engineer Summit, gives the short welcome address that opens the stage program of the first AI Engineer Summit in 2023. He hosts with his co-founder, who takes the stage right after him to set the context for two days of talks. The talk is part sponsor roll call, part product launch. It is a useful time capsule of who backed the new "AI Engineering" field at its first gathering.

**Who was in the room**
Dunphy walks through the sponsors with a joke for each. Auto GPT was "just an open source project" a few months earlier, the fastest-growing one in history, and is now the presenting sponsor. An open-source database company broke its no-event-sponsorship policy to be a diamond sponsor. Microsoft, which he credits with pumping $13 billion into OpenAI, staffs a booth with its startups program, next to GitHub and the Copilot team. He then turns to the audience: 500 people were selected for the inaugural summit. Each is an experienced software engineer who is shipping to production or has founded an AI-native company. He also thanks the live-stream viewers and teases 2024 announcements that will expand participation limits.

**Network and generative matching**
His main point is that conferences are already high signal, because they gather experts on one niche subject. He asks whether that can be improved. The conference app, called Network, already holds the schedule, the expo partners, and nearby restaurants and cafes. The new feature is AI-enhanced matching with a "generative matching algorithm", which he admits is a fancy way of saying they use LLMs to match people. In your profile you state the problem you want solved, and the matcher connects you with people who can help. For now the matching works only for in-person attendees.

**Open-sourcing the app**
The second announcement: they open-source Network, both the event app and the matching algorithm. The goal is a simple, powerful mobile event experience for any event in the world. He credits a lead engineer for the mobile app, a second engineer for the matching algorithm, an auth partner, and a database partner that supplies Postgres with PG Vector. The repo is live the same day.

## Why it matters
- Records the founding moment of the AI Engineer Summit: 500 hand-picked attendees, each required to be shipping AI to production or founding an AI-native company.
- Shows an early, simple LLM application in the wild: match people by a free-text problem statement, backed by vector search in Postgres.
- The sponsor list (Auto GPT as presenting sponsor, Microsoft's $13 billion OpenAI bet) captures the 2023 ecosystem that the rest of the summit talks speak to.
- The open-source release of both app and matcher gives a concrete, inspectable artifact for a chapter on community and org building.

## Metadata
- Video: https://www.youtube.com/watch?v=dQmseZ6kz8w
- Duration: 7:44
- Playlist index: 619
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] Engineers Founders sponsors Partners colleagues and Friends welcome to the AI engineer Summit 2023 I am yeah yeah I am deeply honored to have the opportunity to host you all at this event with my co-host swix and I'm especially delighted to kick off the presentation portion of the summit we've curated two days of stage talk content for you from some of the top Founders and engineers in this virging new industry of AI Engineering in just a few moments swix is going to come on stage to help set the context for those talks but for my time on stage I really want to know who is here so Auto GPT is here a few months ago they were just an open source project mind you the fastest growing...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/dQmseZ6kz8w.txt]]
- Description cue: Benjamin Dunphy ( co-founder of the AI Engineer Summit and managing partner at Software 3.0, LLC, welcomes attendees to the Summit, and makes a few key announcements...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/aiDotEngineer/Network>
