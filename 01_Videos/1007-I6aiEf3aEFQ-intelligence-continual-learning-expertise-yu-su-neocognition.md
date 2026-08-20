---
video_id: I6aiEf3aEFQ
playlist_index: 1007
title: "Intelligence + Continual Learning = Expertise — Yu Su, NeoCognition"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=I6aiEf3aEFQ"
duration: "19:43"
duration_seconds: 1183
view_count: 5100
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/I6aiEf3aEFQ.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:36:26+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Yu Su (Ohio State / NeoCognition) argues intelligence and expertise are orthogonal, and defines continual learning as adaptive compression of experience into reusable structures."
---

# Intelligence + Continual Learning = Expertise — Yu Su, NeoCognition

## Summary
Yu Su (Ohio State professor, COO of NeoCognition) distinguishes "intelligence" — the capacity to reason through unfamiliar problems given context, which frontier models increasingly have — from "expertise," accumulated situated competence that lets an agent act reliably and efficiently in a specific domain. He frames today's brittleness (coding agents excel while everyday digital-work agents fail, citing Andrew Ng's "decade of agents" remark) as a modern Moravec's paradox: symbolic tasks like coding are easy for LLMs because code is already language-native and reward is verifiable, while the real world is millions of idiosyncratic "microworlds" each needing learned local structure. He defines continual learning as "adaptive compression of experience into reusable structures for future behavior," decomposed into four choices — what experience, how to compress it, what structure results (parameters, vectors, graphs, skills, world models), and how the structure is used (recall, prediction, planning, control). Plotting raw intelligence against expertise as orthogonal axes, he argues a strong continual-learning algorithm could produce "unbounded expertise from bounded intelligence" once a model crosses a competence threshold, meaning further scaling might matter less than better continual-learning methods. He cites Anthropic's revenue growing roughly 400x to an announced $40B (with a newer figure near $60B annualized) as evidence coding is the first mass market for language agents, and closes by naming open problems: measuring expertise per domain, reconciling the reliability-versus-plasticity trade-off, and combining parametric and non-parametric learning.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=I6aiEf3aEFQ
- Duration: 19:43
- Playlist index: 1007
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> All right. I understand that I'm standing between you and the lunch, so I'll try to be quick. My name is Isu. I'm a professor at The Ohio State, The Ohio State, and I also have another job, which is COO at a company called The Neo Cognition, and we focus on agents and continual learning. So, today's talk, it won't be too technical, but I would it will be mainly a conceptual one. But, I think it's a very important conceptual distinction that I will try to make between what is intelligence and what is expertise. And through this, I will try to answer some of the very bothering questions for me that um like why we are so successful at the coding agents, but they're so terrible at...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/I6aiEf3aEFQ.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
