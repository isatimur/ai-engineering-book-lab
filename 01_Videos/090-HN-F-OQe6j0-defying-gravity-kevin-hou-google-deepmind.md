---
video_id: "HN-F-OQe6j0"
playlist_index: 90
title: "Defying Gravity - Kevin Hou, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=HN-F-OQe6j0"
duration: "25:10"
duration_seconds: 1510
view_count: 104295
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/HN-F-OQe6j0.txt"
themes:
  - "Models & Inference"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T11:22:29+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kevin Hou, who leads product engineering for Google Antigravity, presents the new agent-first IDE launched with Gemini 3 Pro and the three-step logic behind it. First, raise the capability ceiling with an agent-controlled Chrome browser for context and verification, plus image generation for mockups. Second, a new interaction pattern: an agent manager with an inbox and dynamic artifacts (plans, task lists, walkthroughs, screen recordings) that users comment on like Google Docs. Third, a research-product flywheel inside DeepMind, where internal use exposes model gaps that evals miss, such as the model's early weakness with artifacts."
---
# Defying Gravity - Kevin Hou, Google DeepMind

## Summary
Kevin Hou leads the product engineering team at Google Antigravity, a new IDE from Google DeepMind released the same week as Gemini 3 Pro. He calls it the first IDE from a foundation lab and "unapologetically agent first." The talk covers what the product is, then the three-step logic that produced it.

**Three surfaces**
- The agent manager: one window, an agent-first view that sits "one level higher" than diffs, with an inbox for items that need approval (for example, terminal commands) and OS-level notifications so one person can run many agents at once.
- The editor: a VS Code fork with fast autocomplete and an agent sidebar. Command-E or Control-E jumps between editor and agent manager in under 100 milliseconds, the escape hatch for the last 80 to 100 percent of a task.
- An agent-controlled Chrome browser with the user's own authentication. It retrieves context (Google Docs, GitHub dashboards, bug dashboards) and verifies work by clicking, scrolling and running JavaScript, then returns a screen recording instead of a diff.

He apologizes for capacity errors during launch week, blaming a "global chip shortage."

**Why now: products follow models**
"The product is only ever as good as the models that power it." Autocomplete, chat and agents each followed a model step change. Sitting inside DeepMind, the team had Gemini months early and worked with researchers on strengths and gaps. He names four areas of improvement: intelligence and instruction following, more nuanced tool use, longer-running tasks, and multimodality.

**Step one: raise the ceiling**
Browser use is the big unlock: writing code is now the easy part, while "what to build" is human imagination and "how to build it" depends on institutional context the browser can reach. Image generation lets users start a website in image space, comment on a mockup, and let the agent apply the comments. The image model shipped in the editor on day one, two days after the Gemini launch.

**Step two: artifacts**
An artifact is something the agent generates as a dynamic representation of information. Scrolling chain of thought is hard to follow; artifacts are the visual summary — "the PowerPoint is my artifact." The model decides whether a task needs one and which type: an implementation plan with open questions (it auto-continues if it has none), a task list, architecture or Mermaid diagrams, screenshots, recordings, and a closing walkthrough that works like a PR description. Artifacts can be shared with subagents or saved to memory, for example an API schema learned by running curl requests. Users leave Google Docs-style comments on text and Figma-style comments on images, batch them, and the agent folds them in without stopping its task loop.

**Step three: the research-product flywheel**
"Be your biggest user." Google engineers and DeepMind researchers use Antigravity internally, which shows model gaps "that eval just simply can't give you." Two examples: the team and the computer-use team found gaps on both sides (data mismatch on one, a broken harness on the other), and artifacts worked poorly in early model versions until researchers gave the model "a hill to climb," so Gemini 3 Pro launched handling them well.

## Why it matters
- A lab-built IDE that moves the main workspace from the editor to an agent manager, a concrete data point on where coding-agent UX is heading.
- Artifacts are a reusable design pattern for supervising agents: reviewable plans, task lists and walkthroughs instead of raw reasoning traces.
- Browser recordings as proof of work show verification moving from diffs to observable behaviour.
- The research-product flywheel is a clear argument for co-designing harness and model, and for dogfooding as a signal beyond evals.

## Metadata
- Video: https://www.youtube.com/watch?v=HN-F-OQe6j0
- Duration: 25:10
- Playlist index: 90
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [music] All right. Hello. Last one of the day. Can we get a uh little energy boost? Who's ready? Who's ready? [applause] All right, happy Friday. I hope everyone has had a good week, a good conference. Um, and let me tell you, it's been a really bad week if you are Gravity. Wicked 2 is coming out tonight. And then, of course, Anti-gravity came out earlier this week alongside Gemini 3 Pro on Tuesday. Google Anti-gravity is a brand new IDE out of Google DeepMind. It's the first one from a foundational lab and it is coming right off the press. In fact, um I probably should be working on the product right now, but I wanted to spend some time to share what we've built here today. Anti-gravity is...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/HN-F-OQe6j0.txt]]
- Description cue: Why we built Google Antigravity, and discussing the future of agentic IDEs with Gemini 3.

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Org Design & Leadership**.
