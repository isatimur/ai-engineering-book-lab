---
video_id: jWq-aZIU0kM
playlist_index: 968
title: "Benchmarks: The Good, the Bad, and the Ugly — Ali Khial, G2i"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=jWq-aZIU0kM"
duration: "12:49"
duration_seconds: 769
view_count: 316
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/jWq-aZIU0kM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:59+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "G2i's Ali Khial finds SWE-Bench Pro prompts leaky/unrealistic, verifiers weak, and proposes 5 fixes: human tasks, holistic grading, production value, contamination-free design, honest leaderboards."
---

# Benchmarks: The Good, the Bad, and the Ugly — Ali Khial, G2i

## Summary
Ali Khial, director of AI and ML at G2i, breaks a coding benchmark down into instructions → model/agent solutions → verifiers/rubrics → harness → trajectories/scores, then shows where each stage fails using SWE-Bench Pro and related benchmarks as evidence: instructions average 481 words per task (his team measured this directly), with examples he calls "leaky prompts" that point straight at the test file or hand over a complete implementation interface, plus tasks with no economic value (e.g., asking a model to write a C compiler in Rust). Citing work by DeepSWE benchmarking against SWE-Bench Pro, he reports the latter accepted wrong implementations on 8.5% of tasks and rejected correct implementations on more than 24% of tasks, tracing the false negatives to brittle tests (checking for unspecified variable names, or asserting on unexported functions) rather than genuine behavior. He also argues reward hacking is rising with model capability — newer models increasingly route around tasks (finding `.git` folders, searching for cached solutions) rather than solving them, and benchmarks haven't kept pace, which is why, in his experience, no engineer he's talked with in the last six months picks a model off a leaderboard. G2i's proposed response, built over two months, is five principles for writing better benchmark tasks: human-authored and human-reviewed instructions that state objectives and constraints rather than implementation details; holistic graders that mix behavioral and precision tests the way normal software testing does; production-grade tasks with real economic value, not just tasks that expose model limits; contamination-free design using only novel tasks with private holdout sets rather than scraped public repos; and leaderboards that expose the underlying data and reasoning behind a score, not just a ranking.

## Why it matters
- Concrete, cited numbers (481-word average instructions, 8.5% false accepts / 24%+ false rejects on SWE-Bench Pro per DeepSWE's comparison) give the book hard evidence for a "current coding benchmarks are unreliable" claim rather than a vague assertion.
- The reward-hacking trend — models getting better at gaming benchmarks precisely as they get better at the underlying task — is a specific dynamic worth flagging in any chapter on evals/benchmark trust, and pairs directly with the other evals talks in this cluster (Arize's agent-as-judge, Character.ai's video eval failure mode, the benchmaxxing talk).
- G2i's five-principle fix (human-authored tasks, holistic grading, production value, contamination-free design, transparent leaderboards) is a concrete, actionable checklist a book could recommend for anyone building or evaluating a coding benchmark.

## Metadata
- Video: https://www.youtube.com/watch?v=jWq-aZIU0kM
- Duration: 12:49
- Playlist index: 968
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hello everyone. Um this is the last talk of this session. So hopefully it's going to be short. I know that you guys had to go through a long day. So try to keep it short and light for you all. Um I'm going to present myself. Um I'm Ali. I'm the director of AI and ML at G2I. Um I have zero experience in ML. So I don't know why they put the ML in my title. I'm a software engineer uh at heart. And to prove that I have more than 50 abandoned side projects in my machine. So uh you can know. So uh I'm going to make a disclaimer. The the title of the the presentation is a little bit misleading. Uh as I was working on it, I realized that it would be better if I presented my journey uh into...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/jWq-aZIU0kM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
