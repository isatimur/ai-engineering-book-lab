---
video_id: "fgkXEIbZpGc"
playlist_index: 71
title: "Building in the Gemini Era – Kat Kampf & Ammaar Reshi, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=fgkXEIbZpGc"
duration: "17:57"
duration_seconds: 1077
view_count: 16722
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/fgkXEIbZpGc.txt"
themes:
  - "Models & Inference"
  - "Coding Agents"
ingested_at: "2026-04-24T10:52:30+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kat Kampf (vibe coding in Google AI Studio) and Ammaar Reshi (AI Studio product and design lead) show Gemini 3 Pro and Nano Banana Pro in launch week. They pitch Gemini 3 on two strengths, one-shot UI and design sense and agentic tool calling, and Nano Banana Pro on search-grounded world knowledge, text rendering, localization and up to 14 consistent people per image. Live demos built in AI Studio's free vibe-coding mode include a comic-book maker, search-grounded laptop stickers, a UI clone with export to the new anti-gravity IDE, and a 3D racing game turned multiplayer for 23 audience players, ahead of a coming full-stack runtime."
---
# Building in the Gemini Era – Kat Kampf & Ammaar Reshi, Google DeepMind

## Summary
Kat Kampf works on vibe coding in Google AI Studio. Ammaar Reshi leads AI Studio's product and design team. They speak in the week Google DeepMind launched Gemini 3 Pro (on a Tuesday) and Nano Banana Pro (the day before the talk). Their thesis: with Gemini 3 "we can really build anything," and AI Studio aims to let anyone build software without thinking about the plumbing.

**Gemini 3 Pro**
Kampf names two major capabilities. First, UI and design sense: strong design understanding and good websites in one shot. Second, agentic tool calling for complex work in large codebases. She shows a SWE experiment with a base agent harness across several models, where Gemini 3 scores well above the others.

**Nano Banana Pro**
Reshi lists the image model's gains:
- World knowledge grounded in Google Search, such as a detailed infographic on how to make a tea.
- Better text rendering, including text wrapped around a can, and localization that translates text inside a reference image.
- Consistency for up to 14 people in one group shot, "our benchmark so far."
- Creative controls: "change the focus to the flowers" keeps the rest of the image.
- A range of aspect ratios and selectable resolution.

**AI Studio's build mode**
AI Studio's vibe-coding mode is free. "AI chips" add Gemini API features to an app: Search grounding, Maps grounding, and the Live API (Kampf's demo critiques her tennis swing from a webcam, and another checks posture). Most models need no API key, and visitors to a shared app use their own free quota, so a viral app does not bring "a crazy surprise API bill." Gemini also works inside the loading screen, suggesting how to extend the app being built.

**Live demos**
- A vibe-coded comic-book app: upload faces, pick a genre and language, and get a story with rich text rendering. Readers choose the plot's direction midway. Reshi says some stories "genuinely made me laugh."
- A one-prompt "slick animation website" with shader transitions and self-chosen typography, a contrast to the "purple gradients" he dislikes as a designer.
- Search-grounded laptop stickers: the model searches for Reshi and builds stickers around his children's book, *Alice and Sparkle*. Grounding also brings in same-day news past the model's knowledge cutoff.
- Using AI Studio to build AI Studio: a one-shot clone of AI Studio from a screenshot, with a new flow to export to anti-gravity, Google's new agentic IDE. Telling the model to "be creative" gives export designs the team would not have come up with.
- A 3D racing game in three.js, turned multiplayer in a couple of prompts. Twenty-three audience members joined by QR code, and the runtime held.

**What comes next**
All apps so far are front-end React. A full-stack runtime with backend support is coming "very very soon." The principle is intent over details: ask for a multiplayer app and AI Studio wires up Express. If an app needs storage, it gets storage, and an e-commerce app gets payments. Kampf closes: "we get to be the first generation of engineers who are building tools for a world where anyone can build software," citing a tech-support worker who started vibe coding after a YouTube video.

## Why it matters
- A dated launch-week record of how Google positioned Gemini 3 Pro: one-shot UI quality plus agentic tool calling.
- The free-quota model, where visitors use their own quota, is a distinct answer to the cost risk of shipping AI-powered apps.
- Building AI Studio with AI Studio shows vibe coding as a product ideation tool that escapes a team's habitual patterns, with a handoff to a full IDE when the web tool hits its limits.
- The full-stack runtime principle (infer storage, payments, servers from intent) states the design goal of tools for non-engineers.

## Metadata
- Video: https://www.youtube.com/watch?v=fgkXEIbZpGc
- Duration: 17:57
- Playlist index: 71
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Coding Agents]]

## Transcript excerpt
> [music] We are super excited to be here. It's been obviously a very exciting week in AI. It's been a very exciting and busy week over here at DeepMind. I'm so super excited to chat with you about our newest models and build some demos live with you all. I'm Cat. I work on Vibe Cody and AI Studio. This is Amomar. He leads our product and design team for AI Studio. Uh but I want to step back for a second and talk about uh the journey at DeepMind generally. So what's I think particularly unique about Google's journey right now is that Deep Mind has been innovating here for not just this week or this past year but for years and years uh with things like the transformer, Alph Go, etc. And this...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/fgkXEIbZpGc.txt]]
- Description cue: A deep dive into the latest capabilities of Google DeepMind's Gemini 3 and the newly released "Nano Banana Pro" image model within Google AI Studio. Kat and Ammaar demonstrate "vibe coding"—a...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Coding Agents**.
