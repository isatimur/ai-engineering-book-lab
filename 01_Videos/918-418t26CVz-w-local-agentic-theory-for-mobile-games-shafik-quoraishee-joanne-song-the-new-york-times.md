---
video_id: 418t26CVz-w
playlist_index: 918
title: "Local Agentic Theory For Mobile Games — Shafik Quoraishee & Joanne Song, The New York Times"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=418t26CVz-w"
duration: "18:04"
duration_seconds: 1084
view_count: 833
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/418t26CVz-w.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:22:05+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Shafik Quoraishee and Joanne Song of The New York Times present experimental work (their games and puzzles contain no AI) on agents that run on the phone itself. On-device agents give low latency, privacy, offline play and personalization, but must fit a constraint graph of space, a 16 ms frame budget at 60 Hz, and battery. Demos include an agentic Space Invaders player and a constraint-satisfaction mini crossword solver. Song then grounds accessibility in WCAG 2.2 and shows agents that read gaze and shaky taps, tune input tolerance and step granularity, break keyboard focus traps and resize tiny targets live."
---

# Local Agentic Theory For Mobile Games — Shafik Quoraishee & Joanne Song, The New York Times

## Summary
Shafik Quoraishee and Joanne Song work at The New York Times. They open with disclaimers: the puzzles "are made by people," the games have no AI features, and this work is experimental. It explores what local agents can do for solvability, playability and accessibility, not for generating games. Their thesis: intelligence should move from the cloud onto the device, and agents there can tune a game to each player in real time.

**Why local**
Cloud inference on mobile is expensive and adds round-trip latency. On-device models compress response time to the device's own frame computation, keep gameplay data private inside the device, work offline (a subway tunnel), and make personalization easier because features stay local.

**From finite state machines to agents**
Game AI dates to the 1980s: Pac-Man's ghosts run a finite state machine, a conditional, symbolic AI. Reinforcement learning (the Alpha series, then sample-efficient EfficientZero and EfficientZero V2 up to 2024) changes a model's weights over many training cycles for one game. An agentic system instead uses a language model with in-context learning to reason over the game state, with "no reward system to grind out"; it adapts through tool calls and device functions.

**Demos**
- An agentic Space Invaders player on a local framework they built. The loop is perceive, predict the next enemy move, decide, act, then observe again.
- A constraint-satisfaction agent for the mini crossword. It uses a constraint graph to place words, backtracks efficiently when constraints get too crowded or wrong, and uses natural language from the graph to find the correct layout.

**The on-device constraint graph**
Three budgets compete. Space: weights, compressed state history, planning artifacts and render headroom must all fit. Time: at 60 Hz a frame arrives every 16 ms, and agent planning must fit inside it or the user sees jank. Energy: phones are not yet built for agentic workloads, though NPUs help, so the loop must be curated for minimum processing. They penalize time overruns hard and use soft constraints on space. Gaze estimation (a convolutional net) is a new input, and base model intelligence, as measured by scores such as ARC-AGI, still limits complex decisions.

**Accessibility as a dial**
Song argues that fixed difficulty toggles are "completely blind to the real-time needs." They ground design in WCAG 2.2: perceivable, operable, understandable, robust. Crossword pitfalls include tiny cells that cause mistaps, invisible active-cell highlights for low-vision players, forced logins and unforgiving timers. The draft WCAG 3.0 moves from pass/fail to bronze, silver and gold, and gameplay should shift the same way. The agent continuously sets dials such as input tolerance and step granularity from live signals: eye gaze for search friction, shaky taps, handwriting recognition. It also acts: it detects a keyboard focus trap in a broken dialog and injects an exit route, and works as a "live layout auditor" that resizes undersized controls.

**What is still missing**
Plans within a 16 ms frame, predictive models that preview a layout change before it lands, long-term memory of one person's habits, a shared game-state language so one agent spans many games, better chips, and honest benchmarks that prove the agent helps. Their closing image: not one giant central brain but "billions of small local brains."

## Why it matters
- The space, time and energy constraint graph, with a hard 16 ms frame budget, is a concrete framework for designing agent loops on edge devices.
- It draws a sharp contrast between RL (change the weights per game) and in-context agents (reason over state with no reward to grind).
- Accessibility as continuously tuned dials, grounded in WCAG 2.2 and the graded WCAG 3.0 draft, is a strong example of agents adapting software to the user rather than the reverse.
- The focus-trap and target-resizing examples show agents taking corrective action live, not just monitoring.
- The closing wish list (shared state language, predictive previews, honest benchmarks) names open problems for local agents.

## Metadata
- Video: https://www.youtube.com/watch?v=418t26CVz-w
- Duration: 18:04
- Playlist index: 918
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Awesome. So, yes, as great introduction took us to we are going to be talking about local agentic theory for accessible mobile games. And we realize this is the graph track, but there are graphs here in this presentation. So, fret not if you're missing them. So, yeah. So, a few disclaimers before we continue. Since we we do work at The New York Times and there's a few things we have to say about our puzzles AI etc. Our puzzles are made by people. They're not made by AI. So, that's just a thing we this true and it'll always be true. There's no AI in the games themselves. So, there's no AI features. You might have seen Wordle Bot, that's not an AI feature. There's so all our games...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/418t26CVz-w.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

