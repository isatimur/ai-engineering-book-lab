---
video_id: WkBPX-oDMnA
playlist_index: 831
title: "Understanding is the new bottleneck — Geoffrey Litt, Notion"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=WkBPX-oDMnA"
duration: "19:33"
duration_seconds: 1173
view_count: 92000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/WkBPX-oDMnA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Geoffrey Litt, a design engineer at Notion, argues that humans must still understand the code agents write, not to verify correctness (agents get better at that) but to participate: understanding is what lets you have the next idea, and losing it builds cognitive debt. Borrowing from education, he shows three techniques: an Explain Diff skill that writes a background-first explainer with interactive figures, literate code diffs and a five-question quiz he must pass before asking for review; microworlds, ephemeral UIs such as a step-through debugger for his Prolog interpreter; and shared spaces where teams and agents discuss plans together."
---

# Understanding is the new bottleneck — Geoffrey Litt, Notion

## Summary
Geoffrey Litt is a design engineer at Notion and opened the design engineering track with a hot take: "I think it is still important for people to understand how code works." Agents land 50,000-line PRs and keeping up is hard, but reading code line by line is no longer the only way to understand. The talk shares the practices he uses daily.

**Why understand: participate, not just verify**
Most people think humans understand to verify, a thumbs up or down on correctness. Agents are getting better at those checks with the right verification loop, and he does not mind. The deeper reason is "understanding to participate". Each loop changes you, and that understanding is what you bring to the next one. Rich mental models that you can recombine without asking anyone are what let you make creative leaps. Better agents do not remove this need. He uses the term cognitive debt, an analogy to tech debt that Simon Willison has also blogged about: vibe coding goes well until you realize you have no idea what is going on and can no longer participate.

**Technique 1: explanations**
The field that studies understanding is education. He asks what the best possible explanation of one code change would look like. His Explain Diff skill, used daily by him and coworkers, writes an explainer doc as HTML, markdown or a Notion page. In his example, a Zen garden game moves from top-down to isometric view. The doc follows four principles:
- Background first: the engine, coordinate system and subsystems, personalized to what you already know.
- Intuition before details: the goal was to make the garden feel 3D using only 2D drawing tricks.
- Interactive figures, used with taste because they can be slop: drag rocks around and watch coordinates and Z layers change, built with Notion's new HTML blocks.
- Literate code diffs: prose before each file, in a sensible order.
Reading is easy to fake, so he borrows from Andy Matuschak ("Books don't work") and Michael Nielsen's essays with spaced repetition quizzes. Each explainer ends with a quiz of five medium questions, and he does not send code for review unless he passes it. He calls the quiz a speed regulator: you move at the speed of understanding, not just correctness. The skill is public.

**Technique 2: microworlds**
From Seymour Papert's Mathland: kids learn French by living in France, so build a place to live in math. For a Prolog interpreter he wrote to learn, he had Claude build an ephemeral debugger that scrubs a step-by-step timeline of interpreter state, with comments on the timeline. Fixing bugs there gave him a feel for the machine, the peripheral vision an agent fix would not give. For a website framework migration, a script worked but gave him no feel, so he had Claude build a step-by-step game: old site on the left, new on the right, with commands and moving file trees at each click. Agents can write code to help us understand code.

**Technique 3: shared spaces**
Teams need shared understanding to jam together. Notion explores multiplayer threads with humans and agents, and comments on agent-made plans. Coding agents from Claude and Cursor now run inside Notion, and his team builds a lot of code there.

**The bigger frame**
He cites Alan Kay's essay of 50 years ago on a personal computer for children of all ages, where kids modify a game's code to learn physics. Computers were meant to level humans up. Cheap code and ephemeral UIs can bring that back, putting us deeper in loops rather than taking us out.

## Why it matters
- It separates understanding to verify from understanding to participate, which gives a reason for human comprehension that better agents do not remove.
- The quiz-before-review rule is a concrete, cheap control against cognitive debt and self-deception in AI-assisted code review.
- The four explainer principles (background, intuition, interactive figures, literate diffs) form a reusable spec for agent-written change explanations.
- Microworlds reframe agents as builders of throwaway tools for understanding, not only shippable code.
- It ties the debate on reading code to education research and personal computing history, which gives a chapter deeper roots than current tooling.

## Metadata
- Video: https://www.youtube.com/watch?v=WkBPX-oDMnA
- Duration: 19:33
- Playlist index: 831
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> What's up? Yeah, thank you for coming to the design engineering track at AI. Is everyone having fun? Yeah, I think this is going to be a great track, so get excited. All right, let's get going. Um, my name's Jeffrey Litt. I'm a design engineer at Notion currently. And I'm here to drop a hot take for this room, maybe. I think it is still important for people to understand how code works. >> [applause and cheering] >> Now, some of you might agree, some of you might disagree. Let's actually Let's do Let's try a poll. I'm curious for this room. Raise your hand if you agree with that opinion. Okay, maybe some selection bias. Any brave Okay, raise your hand if you disagree with this...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/WkBPX-oDMnA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
