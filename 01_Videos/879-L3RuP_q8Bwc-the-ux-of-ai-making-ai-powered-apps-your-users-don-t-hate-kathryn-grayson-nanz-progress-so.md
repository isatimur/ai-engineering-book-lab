---
video_id: L3RuP_q8Bwc
playlist_index: 879
title: "The UX of AI: Making AI-Powered Apps Your Users Don't Hate - Kathryn Grayson Nanz, Progress Software"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=L3RuP_q8Bwc"
duration: "35:59"
duration_seconds: 2159
view_count: 3700
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/L3RuP_q8Bwc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:31+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kathryn Grayson Nanz, senior design and developer advocate at Progress Software, argues that AI has a serious UX problem: the gap in knowledge between developers and users is one of the widest she has seen, and users give up after a few bad tries. From her user research she groups the fixes into five pillars (trust, clarity, control, transparency, meaningful benefit), with patterns such as citations, plan approval, AI-content labels, streaming and visible reasoning, a big red stop button, version history, granular permissions, cost estimates, suggested prompts and next-step actions."
---

# The UX of AI: Making AI-Powered Apps Your Users Don't Hate - Kathryn Grayson Nanz, Progress Software

## Summary
Kathryn Grayson Nanz (Kat) is a senior design and developer advocate at Progress Software with a front-end and design background. Her thesis: AI "has a kind of serious UX problem." Features land everywhere, users try them with little idea how they work, get poor results and disengage, so builders "only have so many chances to get this right." She calls the developer-user knowledge gap for AI one of the widest she has seen with any technology.

**Meet users where they are**
She compares the moment to the first Macintosh GUI, which borrowed real-world vocabulary and icons, then moved to technical terms as users learned. Comparing System 1 with System 6 control panels, she puts AI at "around system 3." Builders should reuse familiar patterns, such as chat layouts, then adapt them for new needs like sources, stopping a reply and agentic tools. She contrasts a beginner-friendly Copilot agent chat (examples, large buttons, voice) with a Teams chat that assumes familiarity. AI cannot design these patterns for us yet: it only remixes what exists, and AI-generated UI "tends to look pretty darn average."

**Five pillars from user research**
- **Trust.** AI is a black box and everyone has seen hallucinations. Do not claim your tool is the exception. Be honest about limits and help users verify: citations as tooltips, inline links or side-panel sources (the assistant as "librarian"), which also let users reuse output with a trail of accuracy. For agents, show an action plan to approve first. Mark AI-generated content, because reactions to it are polarized.
- **Clarity.** Drop the "magic" framing and the sparkle icon: "users deserve clarity over dramatics." Stream output so users can judge and stop early and stay engaged. Let the model think out loud so users can see where it went off the rails. Highlight new or changed content, especially during autonomous work.
- **Control.** Users must stay "in the driver's seat," with a prominent emergency brake, not a buried menu. Following the safe-exploration idea from Nielsen's heuristics, version history becomes "pretty much a non-negotiable" with non-deterministic output: from simple undo across about the last 10 steps to checkpoints, with granular rollback so users keep the good parts. That matters more as token costs rise.
- **Transparency.** Permissions are not binary (read versus delete, read email versus send), and not one-time: once, per folder, notify each time. Memory needs the ability to forget, and the user has the final say. Users need a history of grants and the ability to revoke them, time and cost estimates before approval, and a visible signal when an agent controls the browser.
- **Meaningful benefit.** A blank "ask AI" box asks users to do the hard work of prompting. Offer examples, templates, suggested prompts and guided workflows. Add next-step action buttons and integrations so output flows into documents, repos and tickets. Otherwise it stays a novelty.

**Closing argument**
Models keep getting better, so "the differentiator for the AI-powered software we build isn't performance anymore." It is the experience around the model. The line between design and development is blurring, and developers now own these UX questions whatever their job title.

## Why it matters
- It gives a clear five-pillar framework (trust, clarity, control, transparency, meaningful benefit) for a book section on user-facing AI products, a topic most agent talks skip.
- Many patterns map directly onto agent design: plan approval, a visible emergency stop, granular permissions, memory the user can edit, and cost estimates before execution.
- The argument that version history is non-negotiable for non-deterministic output, and that granular rollback saves tokens, links UX choices to reliability and cost.
- The claim that experience, not model performance, is now the differentiator offers a counterweight to model-centric chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=L3RuP_q8Bwc
- Duration: 35:59
- Playlist index: 879
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hi. My name is Kat. I'm a senior design and developer advocate at Progress Software, and I have spent most of my career focused on the front end. After taking a somewhat meandering path through design and into development, I eventually found my niche in the space where those two worlds overlap. My design background has given me a lot of insight into the UX side of software engineering, and the user research that I get to do as part of my work as developer advocate is one of my favorite parts of the world. I have spent a lot of my career teaching developers about design, about UX, and about how to build more user-friendly software. Something that's always been valuable, but is more crucial...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/L3RuP_q8Bwc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://bsky.app/profile/kgrayson.com>
