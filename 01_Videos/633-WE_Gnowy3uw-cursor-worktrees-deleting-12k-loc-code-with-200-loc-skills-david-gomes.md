---
video_id: WE_Gnowy3uw
playlist_index: 633
title: "Cursor Worktrees: Deleting 12K LoC Code with 200 LoC Skills — David Gomes"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=WE_Gnowy3uw"
duration: "19:22"
duration_seconds: 1162
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/WE_Gnowy3uw.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-07T23:19:10+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "David Gomes of Cursor argues that markdown is the new code. Cursor replaced its git worktree feature and its run-one-task-on-many-models feature, thousands of lines of code for isolation, setup scripts, judging and cleanup, with short markdown commands built on skills and subagents (the multi-model one is about 40 lines). Gains: far less maintenance, worktrees mid-chat, multi-repo support and better comparison. Losses: the agent can now leave its worktree, the flow feels slower and is harder to find. He fixes drift with evals that score where the agent wrote files, and with RL tasks for Composer."
---

# Cursor Worktrees: Deleting 12K LoC Code with 200 LoC Skills — David Gomes

## Summary
David Gomes works at Cursor. His thesis is that "markdown is basically the new code". He tells how his team removed a full feature, with its dependencies, tests and edge cases, and rebuilt nearly all of it as a few markdown prompts. The PR that deleted the old feature removed around 15,000 lines. The new version is "almost as good" and much cheaper to maintain.

**What the old feature did**
Git worktrees are separate checkouts, so parallel agents do not collide. Cursor 2.0 shipped worktree agents plus a mode that gives the same task to several models and lets you compare results. The code had to create and manage worktrees, feed them to the agent as context, keep agents from escaping, run user setup scripts, run a judge that marks the best result with a thumbs-up, add harness system reminders, and clean up hundreds of stale worktrees that filled users' disks.

**The replacement: skills plus subagents**
Two existing primitives, agent skills and subagents, rebuild both features. A /worktree command tells the model how to create a worktree, run the setup scripts, and stay in that checkout, with separate Windows and Linux/macOS steps. The multi-model command is about 40 lines of markdown, against roughly 4,000 lines before. The parent agent starts one subagent per model, each in its own worktree, waits, then compares and grades the results in a table. Apply and delete commands bring changes back or clean up. They ship as commands, not skills, so the prompts live on Cursor's servers and he can improve them without a client update. They load into context only when the user calls them, as skills do.

**Gains and losses**
Gains: much less code for an advanced feature that only power users use; switching into a worktree halfway through a chat; multi-repo setups, which were disabled before and now get one worktree and one PR per repo; and better judging, because the parent sees everything and can merge the best parts of two models' work. Losses: isolation used to be enforced, and now it is "a bit vibes based", so over long sessions weaker models drift into the primary checkout. The flow also feels slower because users watch the setup, and it is harder to discover without the old dropdown. Forum feedback is mixed.

**Fixing drift with evals and RL**
He runs the headless Cursor CLI with two scorers: did the agent work in its worktree, and did it touch the primary checkout. Even simple evals show Haiku often drifts while Composer does much better. Composer 2 had no RL tasks for this setting, so the team is adding them for later versions and is sharing feedback with other labs.

**What next**
A native worktree implementation in the Cursor 3.0 agent window, and research into parallel primitives that are faster, use less disk and work outside git.

## Why it matters
- A concrete case of replacing about 15,000 lines of product code with prompts, and an honest list of what was lost.
- Shows the core trade-off of prompt-based features: hard guarantees (the agent cannot leave its worktree) become soft ones that need evals and system reminders.
- The two-scorer eval (work inside the worktree, no work outside it) is a simple pattern for testing whether an agent stays in its sandbox.
- Serving command prompts from the backend lets a team iterate on agent behaviour without shipping a client release.
- Shows a model vendor closing a harness gap with RL training data, not just better prompts.

## Metadata
- Video: https://www.youtube.com/watch?v=WE_Gnowy3uw
- Duration: 19:22
- Playlist index: 633
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hi everyone. How you all doing? Thank you for uh coming today. Um I'm going to be talking about how markdown is basically the new code. Uh as TJA has already sort of previewed um we recently replaced a lot of code in the cursor application with just markdown just a skill and in today's talk I'm going to share a bit of the journey of going from a fullblown feature with a lot of code a lot of dependencies a lot of complexity and tests into a much more lightweight streamdown version of the same feature effectively but just with a single skill. Um, before I start though, I have to give you guys a little recap of git word trees and how they work in cursor. Now, if you haven't heard of word trees...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/WE_Gnowy3uw.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
