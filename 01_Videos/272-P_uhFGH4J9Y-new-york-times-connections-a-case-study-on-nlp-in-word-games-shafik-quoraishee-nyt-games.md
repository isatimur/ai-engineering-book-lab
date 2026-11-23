---
video_id: "P_uhFGH4J9Y"
playlist_index: 272
title: "New York Times' Connections: A Case Study on NLP in Word Games — Shafik Quoraishee, NYT Games"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=P_uhFGH4J9Y"
duration: "18:31"
duration_seconds: 1111
view_count: 4758
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/P_uhFGH4J9Y.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:11:32+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Shafik Quoraishee, a game developer at NYT Games, presents independent, preliminary research on solving the Connections puzzle with explainable AI instead of a black-box LLM. Connections, with 16 words in four groups of four, decoys, and a hard purple tier, still stops LLMs from reaching a 100% solve rate. He models the board as an augmented graph coloring problem, argues that semantic similarity is not enough, scores word pairs on several relation types, and shows that relational alignment separates easy from hard puzzles. A graph neural network plus reinforcement learning solver lifts solve rates on a small set of hard puzzles."
---
# New York Times' Connections: A Case Study on NLP in Word Games — Shafik Quoraishee, NYT Games

## Summary
Shafik Quoraishee is a game developer on the New York Times games team, with a background in machine learning, mobile development and data science. He stresses that this is his own independent research, not NYT internal work, and that the results are preliminary. He also notes that Connections puzzles and game code are human-made. His thesis: Connections is a good test bed for abstract reasoning, and an explainable, graph-based solver says more about how a puzzle is solved than an LLM does.

**The game**
Connections launched in beta in June 2023 and fully in August 2023. It became the most-played NYT game after Wordle, with hundreds of millions of plays in its first year. Each daily puzzle has 16 words to sort into four groups of four, with no overlaps and four wrong guesses allowed. Difficulty rises from yellow (obvious) to green, blue (idioms, wordplay, trivia) and purple, which uses decoy overlaps.

**Why it suits AI research**
Decoys test whether a model avoids surface similarity. Each solution needs a clean, explainable reason. Fixed puzzles make it a reproducible benchmark. Third-party benchmarks show LLMs improving but not perfect; a live ChatGPT attempt in the talk gave a wrong answer. He also worries that LLMs may simply recall solutions posted online, and that their reasoning stays a black box.

**Humans and chance**
Players mix fast System 1 intuition with slow System 2 reasoning, and fail in both modes: an obvious-looking group was wrong, or an obvious group was overthought. Random guessing from the full board has about zero chance of winning. After one correct group it is roughly 1 in 5,000 to 6,000; with two groups left, 1 in 35.

**Graph formulation**
He models the board as an augmented graph coloring problem: 16 words are vertices, four colors are categories, and edge weights are relation strength. This shrinks the search space. His slogan is that semantic similarity is not all you need. Words relate by orthography (anagrams), morphology (shared suffixes), encyclopedic links (globe, mirror, post and sun as newspapers), association (red things) and polysemy (mole as animal, birthmark, spy or unit), which trips up people and AIs most.

**Relational alignment**
He scores word pairs with several metrics and shows heat maps. Overall alignment differs between an easy puzzle (solve rate in the 70s, in percent) and a hard one (19%), so difficulty can be computed and tracked over time. Because each pair has a score per relation type, radar charts and a semantic distribution framework track which category types (hypernymy, morphology, orthography) appear over time.

**The solver**
Semantic graphs are built from WordNet, ConceptNet and word embeddings, which gives multi-dimensional hypergraphs with inter-cluster and intra-cluster strengths. A graph convolutional network takes the graph and proposes candidate subgraphs. A reinforcement learning system then optimizes edge and node weights and navigates the clusters. On a small set of hard puzzles, the solve rate improved somewhat. Next steps are more puzzles, a link to an abstract-reasoning benchmark, and game development uses.

## Why it matters
- Shows why a fixed, public puzzle set is both a useful reasoning benchmark and a contamination risk, since solutions sit on the internet.
- Gives a concrete taxonomy of word relations beyond embedding similarity, which explains where LLMs and people fail (polysemy and decoys).
- Demonstrates a computable difficulty signal (relational alignment) that tracks human solve rates, a useful idea for puzzle design and for eval-set curation.
- Offers an explainable alternative architecture, graph construction plus a GNN plus RL, for problems where you need to see the reasoning, not just the answer.

## Metadata
- Video: https://www.youtube.com/watch?v=P_uhFGH4J9Y
- Duration: 18:31
- Playlist index: 272
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] Uh, yes, AI and a case study on the New York Times connections, which is um the team that I work on is our games team and I work on our popular games. Um, if anyone's uh heard of Connections before or played Connections um or not, since some people might have. So, um again, a little bit about me, a game developer at the times. I worked previously in media for most of my career. Um and uh I have a background in machine learning, mobile development, and data science. So, the majority of this talk is going to probably involve a little bit of all of those. So caveats about what you're about to see and I'll get through as much of it as I can because it's some of it's a little bit dense...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/P_uhFGH4J9Y.txt]]
- Description cue: This session will examine the interplay between human intuition and artificial intelligence in puzzle-solving, using the popular New York Times Connections game as a practical case study.
...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
