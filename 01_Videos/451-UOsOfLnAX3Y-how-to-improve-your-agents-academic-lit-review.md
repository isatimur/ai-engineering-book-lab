---
video_id: "UOsOfLnAX3Y"
playlist_index: 451
title: "How to Improve Your Agents: Academic Lit Review"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=UOsOfLnAX3Y"
duration: "39:02"
duration_seconds: 2342
view_count: 3755
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/UOsOfLnAX3Y.txt"
themes:
  - "Voice & Realtime"
  - "Agent Architecture"
ingested_at: "2026-04-24T12:18:54+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Columbia's Joe (Arklex AI) surveys agent self-improvement research (reflection, MCTS dialogue planning, R-MCTS for GUI agents) with results on BIG-Bench-Hard, Visual Web Arena, and OSWorld."
---
# How to Improve Your Agents: Academic Lit Review

## Summary
Joe, from Columbia University and founder of Arklex AI, surveys academic techniques for improving agent reasoning and self-correction, framing agents via a five-level autonomy scale (from 2017-era retrieval chatbots to fully-trusted, "Jarvis"-style delegation) and a perception-reasoning-reflection-action loop. He details a self-refine/reflection method in which a model critiques and revises its own chain-of-thought answers, showing that small models (e.g., 7B Llama) generate noisy self-feedback that degrades results ("blind leading the blind"), and proposes fixing this by having a larger LLM edit the small model's feedback before using it as on-policy training data - reaching 48% on BIG-Bench-Hard reasoning tasks after three correction iterations, roughly double the gain from plain supervised fine-tuning on the same data. He then presents Monte Carlo Tree Search adapted to dialogue planning (an EMNLP 2023 donation-persuasion task), using an "open-loop" MCTS variant to handle human response variance with zero training data, and reports it beat non-planning baselines in both LLM-judge comparisons and live Mechanical Turk donation studies, with the model learning to delay its "big ask" and diversify persuasion strategies. Extending this to GUI/visual agents - where plain GPT-4V scores around 16% versus roughly 88% for humans on Visual Web Arena-style tasks - he introduces R-MCTS, tree search augmented with contrastive reflection (a cached vector-database memory of past task outcomes) and multi-agent debate for state evaluation, which topped the Visual Web Arena leaderboard and was the best non-fine-tuned method on the OSWorld desktop-agent benchmark using test-time compute alone. He closes by describing "exploratory learning," which trains models on the full search-tree traversal, including backtracking, rather than only the best-found trajectory, and previews Arklex, his team's open-source agent framework for multi-agent, multi-user orchestration problems like scheduling and human handover.

## Why it matters
- Surveys concrete, cited techniques (self-refine reflection, MCTS-based dialogue planning, R-MCTS for GUI agents) with quantified benchmark results, giving academic grounding for claims about agent reasoning and self-improvement methods.
- The five-level autonomy framework (chatbot, agent-assist, agent-as-a-service, autonomous multi-task, fully-trusted delegation) offers a reusable taxonomy for classifying real-world agent deployments by risk and human oversight.
- Documents the GPT-4V-versus-human gap on GUI benchmarks (about 16% vs. 88%) and how test-time search, not fine-tuning, closed much of it - relevant to any discussion of inference-time scaling versus pretraining or fine-tuning investment.

## Metadata
- Video: https://www.youtube.com/watch?v=UOsOfLnAX3Y
- Duration: 39:02
- Playlist index: 451
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Voice & Realtime]]
- [[Agent Architecture]]

## Transcript excerpt
> hello everybody today I'm going to talk about AI agents Beyond chat GPT this talk is tailored for a more research oriented a audience my name is Joe I'm from Columbia University I'm also the founder of AR Collex AI so many people are talking about agents what are these Bill Gates is very bullish on it talking about the biggest re solution in Computing Andrew en is talking about this is a massive AI progress so Sam Alman from opening up is talking about uh 2025 is the year of agent we also hear a lot of negative voice about oh these are just Sim wrapper of large language model uh they they really can plan then we can't really have agents and we're also talking about oh autog GPT is not great...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/UOsOfLnAX3Y.txt]]
- Description cue: In this video, I dive into the capabilities of Arklex AI's agent framework, highlighting how AI agents can collaborate with human agents to enhance productivity. Compared to LangChain, CrewAI,...

## Book angles
- Could support a chapter/section on **Voice & Realtime**.
- Could support a chapter/section on **Agent Architecture**.
