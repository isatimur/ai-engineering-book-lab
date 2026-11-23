---
video_id: "2cEGQEllBGc"
playlist_index: 443
title: "Don't just slap on a chatbot: building AI that works before you ask"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=2cEGQEllBGc"
duration: "5:46"
duration_seconds: 346
view_count: 1657
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/2cEGQEllBGc.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:18:35+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Arthur Objartel, a product designer at Evil Martians focused on dev tools and AI, argues against bolting a chat window onto every product. Drawing on an AI issue tracker he designed, he shows proactive AI that acts before the user asks, an idea he says Clippy had right but executed badly: a suggestion mode that asks specific questions while the user types, an action mode that splits an issue into sub-issues, and a question plus action mode that weighs timelines and resources, all reversible in one click. His three rules: supplement user agency, recommend but never force, and stay inside the natural workflow."
---
# Don't just slap on a chatbot: building AI that works before you ask

## Summary
Arthur Objartel is a product designer at Evil Martians who focuses on dev tools and AI. In this short talk he challenges the habit of "just slapping on a chat interface and calling it a day". His thesis: AI should not wait to be asked. It should notice what the user needs and help inside the flow of work. He draws on an AI issue tracker he worked on, where he "did the complete opposite of what everyone else was doing".

**Clippy had the right idea**
Twenty-five years ago Clippy tried proactive help. Arthur says it had "the right idea just terrible execution and terrible timing". The technology now exists to do it right.

**Three modes in the issue tracker**
- *Suggestion mode*: the AI tracks what the user writes in real time. When someone reports an issue, it asks specific, contextual questions that move the work forward, not a generic offer of help. No chat window.
- *Action mode*: when an issue can be split, the AI proposes sub-issues. It uses previous data on how similar work was organized, so the split is not random.
- *Question plus action mode*: the AI also reasons about timelines and resources, like a project manager who always pays attention, and asks the right questions as it helps.
All of it happens with no context switch and no extra windows. For user control, any change can be reverted in one click.

**Three rules for proactive AI**
1. AI should supplement user agency, not replace it.
2. AI should offer recommendations, never force them.
3. AI should be part of the natural workflow, not stop it.

**Beyond issue tracking**
Code editors could watch for common pitfalls, which helps developers who are new to a language or framework. Design tools could suggest accessible design while you work, not after. Communication tools could prepare context before a meeting or find the document someone just mentioned on a call.

**How to start**
Look for friction points where users stop to ask for help. Find behavior patterns: where users usually need help and what they always ask. Above all, think about context and where users get stuck. AI interface design is still young and has no full playbook, so teams should experiment with unexpected UI instead of copying chat.

## Why it matters
- Offers a concrete alternative to the chat-first pattern: AI that reads in-progress input and intervenes at the right moment.
- The three modes (suggestion, action, question plus action) give a simple ladder of how far proactive AI should go in a work tool.
- One-click revert is a cheap, specific answer to the user-control objection to proactive AI.
- The three rules and the friction-point method are a short design checklist for teams adding AI to existing products.

## Metadata
- Video: https://www.youtube.com/watch?v=2cEGQEllBGc
- Duration: 5:46
- Playlist index: 443
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> you know what's wrong with AI today everyone's racing to add chat Bots to their products just slapping on a chat interface and calling it a day and I get it it's the easy solution but is it actually helping anyone hi I'm Arthur I'm a product designer at evil Marti focused on death tools and AI today I want to challenge how we think about AI in products share what I've learned from the trenches and give you practical principles you can apply in your own work when I started working on tigon an AI issue tracker I decided to do something different actually I did the complete opposite of what everyone else was doing and you know what it worked here is something funny the solution we needed has...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/2cEGQEllBGc.txt]]
- Description cue: Everyone's racing to add chatbots to their products, but is that REALLY the best way to integrate AI? In this talk, Arthur Objartel from Evil Martians challenges the status quo of AI integration...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://evilmartians.com/chronicles/dont-just-slap-on-a-chatbot-building-ai-that-works-before-you-ask>
