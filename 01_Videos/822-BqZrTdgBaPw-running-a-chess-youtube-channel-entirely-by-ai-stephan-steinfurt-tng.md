---
video_id: BqZrTdgBaPw
playlist_index: 822
title: "Running a Chess YouTube Channel entirely by AI — Stephan Steinfurt, TNG"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=BqZrTdgBaPw"
duration: "16:31"
duration_seconds: 991
view_count: 1000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/BqZrTdgBaPw.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
  - "MCP & Tooling"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Stephan Steinfurt of TNG shows a pipeline that pulls games from lichess every night, has a tool-using agent analyze them, and uploads narrated chess videos to YouTube with no human edit. His thesis: engines play chess well but cannot explain it, and LLMs explain well but play badly, so the agent gets tools (legal moves, a board to play and take back moves, an engine, checks-captures-threats, human-like move predictions, web search) and does the thinking itself. Conflicting tool views help. He reports about 1 in 20 videos with a weird error, 20 to 30 cents per video, and a channel at roughly 500k views and over 4,000 subscribers."
---

# Running a Chess YouTube Channel entirely by AI — Stephan Steinfurt, TNG

## Summary
Stephan Steinfurt works at TNG in Munich. A big German newspaper recently quoted someone calling an AI that explains chess as well as a human trainer the "holy grail of chess programming", possibly five years away. His team showed the paper videos made entirely by their AI engine. He opens with one: a two-minute narrated breakdown of a queen blunder and a rook sacrifice that sets up a knight fork, found that morning among the videos the system makes and uploads every night.

**The core problem**
Chess engines have played well for decades but cannot explain chess. LLMs can describe things but cannot play chess well. The work is combining them.

**Pipeline**
Every night the system downloads games from lichess, runs a background analysis, then lets the agent study them in more depth. The agent writes a special intermediate format that is rendered into video. The agent also picks which squares to highlight, which arrows to draw, and whether a move counts as brilliant. Narration uses a text-to-speech model with audio tags, so a line can be marked as excited.

**Tools around the model**
- A legal-moves tool, so the model never reasons about impossible moves.
- A full board where the agent plays moves, takes them back, and explores variations.
- A chess engine on demand.
- A checks, captures and threats tool, named after a common beginner heuristic. In his example position the best move is a non-obvious rook sacrifice, while some checking moves are plainly bad. Showing all candidates lets the agent explain why tempting moves fail, not only the best one.
- A model from the University of Toronto that predicts what a player of a given rating might play, to surface human moves.
- Web search for the historical context of a game.

**Who does the thinking**
The first version used Python scripts to assemble engine data and checks, then asked the LLM to write prose. Reasoning models changed that: the agent now thinks about positions and calls tools itself. Grok 4 was the best model last autumn. He calls the latest Gemini Pro model the best on chess so far, and says its reasoning traces show much better chess understanding. He finds conflicting information from the tools, best moves against human moves, helpful because it balances the commentary.

**Slop or not**
The input is real human games, so the pitch is a video of your own game to send to friends and family. That is something top streamers will never make. They avoid view-bait effects such as exploding kings.

**Numbers from the Q&A**
- Around 500k channel views and more than 4,000 subscribers, most from the last month.
- Full automation turned on only a few weeks ago. He still often watches videos before upload.
- About every 20th video has a very weird description, such as a missed checkmate, often traced to a missing tool call.
- Cost is about 20 to 30 cents per video, euros for much longer ones. They do not optimize cost yet. Redundant tool calls, like the agent going through a game twice, are known waste.
- The channel is not monetized yet, so it runs at a loss. Pitching videos at the right skill level is still an open question.

## Why it matters
- A clear case of pairing a strong narrow tool (the engine) with an LLM narrator, where the design question is which side does the thinking.
- Reasoning models moved the work from scripted pre-analysis to an agent that calls tools itself. That migration story applies beyond chess.
- Deliberately giving the agent conflicting tool outputs (best move against human move, checks against captures) improves explanation quality instead of confusing it.
- It gives rare operating numbers for a fully automated content pipeline: about 1 error in 20 outputs and cents per unit.
- It shows a gradual trust path from reviewing every output to publishing and taking down bad videos afterwards.

## Metadata
- Video: https://www.youtube.com/watch?v=BqZrTdgBaPw
- Duration: 16:31
- Playlist index: 822
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]
- [[MCP & Tooling]]


## Transcript excerpt
> Hello everyone. Um yeah, Swyx wrote a blog post and said, "Okay, don't write boring titles." So, I changed my title again actually and said, "Okay, we are working on the holy grail of chess programming." And if you knew me, I mean, I'm usually not the kind of guy who oversells stuff. So, it's actually a quote from someone else about this because like roughly a week ago there was an article on on one of the biggest newspapers in Germany which was um discussed a couple of approaches to um yeah, new approaches to doing um yeah, combining AI with chess. And yeah, they had said um it could easily take another 5 years until AI explains chess as well as a human trainer. Wilhelm Weber calls it the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/BqZrTdgBaPw.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **MCP & Tooling**.

