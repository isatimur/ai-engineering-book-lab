---
video_id: FlzpEGHNVKQ
playlist_index: 677
title: "Building a Chess Coach — Anant Dole and Asbjorn Steinskog, Take Take Take"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=FlzpEGHNVKQ"
duration: "18:22"
duration_seconds: 1102
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/FlzpEGHNVKQ.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-19T11:03:59+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Anant Dole and Asbjørn Steinskog, engineers at Play Magnus (Magnus Carlsen's chess company), describe the AI pipeline behind their production chess coach. Core insight: LLMs hallucinate moves and can't calculate — but they're excellent at translating structured analysis to English. The pipeline keeps them in that lane: Stockfish evaluates positions, Maya (U of Toronto) predicts move probabilities by human rating, custom detectors extract tactical themes and threats, then Gemini Flash translates the structured context package into commentary in under 3 seconds. Eval suite: 16 chess scenarios, Gemini Flash scores 75%, Claude thinking gets 60% but too slowly. The autonomous improvement loop wires bad-commentary Slack reports into Claude Code Channels (research-preview MCP), which runs a triage skill, modifies detectors, regenerates commentary, and submits a PR — engineer approves from their phone."
---

# Building a Chess Coach — Anant Dole and Asbjørn Steinskog, Play Magnus

## Summary

Anant Dole and Asbjørn Steinskog, engineers at Play Magnus (the chess company founded by Magnus Carlsen), describe the AI pipeline powering the game review feature in Play Magnus's iOS and Android app — a production system used by real players to understand why a move was good or bad.

### Why LLMs can't play chess but can explain it

The talk opens with a brief history of chess engines to set up the core problem. Shannon's 1949 taxonomy: Type A engines brute-force all moves (scaled by computation into the 1997 Deep Blue that beat Kasparov); Type B engines use intuition and selective search (revived by DeepMind's AlphaZero). Then LLMs arrived and people tried using them to play chess. The result: entertaining failure. A Kaggle-hosted LLM chess tournament — with Magnus Carlsen commentating from the Play Magnus office — showed models hallucinating illegal moves and playing incoherent games.

The contrarian insight: there's nothing wrong with transformer architecture for chess specifically. DeepMind trained a transformer to predict Stockfish evaluations from board positions, and it plays at grandmaster strength. But it can't explain chess because it was never trained on language. The gap to fill is explanation — and LLMs are good at explanation when given the right inputs.

### The pipeline: separate analysis from narration

The production architecture strictly separates computation from narration:

1. **Stockfish** runs through the entire game, producing the ground-truth best move and evaluation for each position
2. **Maya** — a research neural network from the University of Toronto — predicts the probability distribution of moves that humans at a given rating would actually play. This lets the system say "this move is brilliant not only because it's best, but because it's so hard to find that only 2% of players at your level would play it"
3. **Custom detectors** extract tactical and structural patterns: forks, pins, skewers, doubled pawns, threats implied by a move, defensive resources available. This is the most labor-intensive component — an "ultimately large JSON file" that gets pruned iteratively as quality improves
4. **LLM (Gemini Flash)** receives the entire structured context package and translates it into English commentary. The LLM is explicitly forbidden from reasoning about the position independently — its job is translation, not analysis

The result: commentary that can explain not just "F5 is a bad move" but "F5 threatens to trap your queen, but you can capture the central pawn first because that defends the escape square."

### Latency vs quality under consumer constraints

Consumer players expect analysis fast — sub-3-second end-to-end is the target. Gemini Flash achieves ~1 second time-to-first-token and ~3 second end-to-end average. Reasoning models (Claude with thinking) got to about 60% on their eval suite but took too long. GPT-5 Mini had lower accuracy. Gemini Flash scores ~75% on their 16 scenario eval suite, which tests tactical patterns, blunders, and hallucination-limiting cases. None of the models pass all 16 scenarios consistently; they run all three models via Open Router to continuously monitor whether new model releases move the needle.

### The autonomous improvement loop via Claude Code Channels

The most novel part of the demo: a closed feedback loop for improving commentary quality without manual developer intervention. When a user in-app reports commentary as bad, it posts to a Slack channel, which also injects an event into a Claude Code Channel session (a research-preview feature that acts as an MCP server, injecting events into a running Claude Code session). Claude Code wakes up, receives the board position and bad commentary, runs the team's custom `commentary_triage` skill, modifies detector code or prompts, regenerates commentary with the proposed changes, verifies the result, and asks via Slack whether the fix looks correct. If the engineer approves from their phone, Claude Code submits a PR directly to GitHub. The live demo during the talk showed Claude actively working on a reported commentary — and ultimately asking the presenter "what specifically feels wrong?" before determining nothing was wrong after all.

## Metadata
- Video: https://www.youtube.com/watch?v=FlzpEGHNVKQ
- Duration: 18:22
- Playlist index: 677
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Afternoon, everyone. So, our next talk will be something a little bit different. We're going to dive into the world of chess. Quick show of hands, who has heard of Magnus Carlsen? Okay, fantastic. No introduction needed, but widely considered the best chess player in the world. He also founded a company called Play Magnus. Uh this is where myself, Ananth, and my colleague Asbjørn currently work at. And we're going to talk to you today about how we built our AI chess coach that now you can use and is in production. So, first up, quick agenda. We'll quickly discuss a bit more about Play Magnus, what it is we actually built, what it is we actually launched. Uh Asbjørn will then go into a quick...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/FlzpEGHNVKQ.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
