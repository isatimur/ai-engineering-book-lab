---
video_id: 1P1hJ36rxM0
playlist_index: 872
title: "\"Software engineering is not about writing code\" — Benoit Schillings, Google DeepMind VP of Research"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=1P1hJ36rxM0"
duration: "20:26"
duration_seconds: 1226
view_count: 9600
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/1P1hJ36rxM0.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:31+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Benoit Schillings, Google DeepMind VP of Research, argues that superhuman syntax generation is done and code is now nearly free, so the bottleneck moves to specifying what is wanted, decomposing huge codebases and owning architecture. With about 80% of new GitHub code machine-generated, training data is running out, and he expects AlphaZero-style self-play to push coding further. His agenda: models that write secure code from the start, open-ended evals such as lossless compression, multimodal reasoning, strongly typed languages built for models, and code as the tool for science."
---

# "Software engineering is not about writing code" — Benoit Schillings, Google DeepMind VP of Research

## Summary
Benoit Schillings is VP of Research at Google DeepMind. Until a year and a half before the talk he worked at Google X. His team builds whatever Gemini will need between one month and one year out, including code, reasoning, network topology and reinforcement learning research. His thesis is in the title: writing code is solved, and the hard part of software engineering is everything around it.

**Origin story and personal humility**
In 2018 his team started a project at X called Pitchfork to see how ML could speed up code evolution, such as the small edit that waits three days for review. Nobody at Google gave it "the time of day," and he admits he dismissed coding in English because "English is not a programming language." He has written code for 45 years, starting with assembly games for the Apple II and Commodore 64, and he distrusted compilers and garbage collection before he came round. Today he uses Python and vibe coding.

**Three eras of software**
First, the machine was the limit, and assembly demanded precision. Then, in the cloud era, the limit was the human brain, which holds a context of seven to nine rich tokens, and that shaped modular design, libraries and functions. Now, at the AI frontier, writing code is easy. The bottleneck is making sure the code is what you wanted. Humans keep architecture and inductive thinking: seeing a system in a wider context and spotting patterns.

**Where models stand**
He calls syntax generation superhuman: he can no longer improve a function Gemini writes. But "software engineering is not about writing code." It is joining a company with 35 million lines of PHP and having to change it. Managing that complexity, and architecture at the level of hardware optimization, security and avoiding regrets ten years later, is where the frontier still moves.

**Running out of data, turning to self-play**
Code was a unique domain: plenty of scrapeable data and cheap verification through compiling and unit tests. But he says about 80% of new code added to GitHub is machine-generated, so mining human knowledge is ending. The answer is self-play, as with AlphaZero. Models set their own challenges, judge answers and even judge architecture. He compares it to locking a brilliant engineer in a room for two years with pizza and verifiable challenges.

**Consequences of nearly free code**
Code volume will explode, and soon nobody will read it, as almost nobody checks compiler output. He wants:
- **Active guardrails.** Model-driven vulnerability discovery will be a never-ending cycle, so the goal is models that write correct, secure code from the start.
- **Inductive architecture.** Models must get better at transferring knowledge across domains and at planning the right decomposition of a problem.
- **Better evals.** He calls a popular benchmark that only checks whether code runs and produces the right output "infamous." He proposes open-ended tasks, such as writing the best lossless compressor for 10 megabytes, scored on compressed size plus source size.
- **Richer reasoning.** Coding is visual, which is why Gemini was multimodal from the start.
- **New languages for models.** Strongly typed, Lean-inspired, not necessarily human-readable, so the burden of correctness falls on the model.

**Beyond code**
Free experimentation in code opens chemistry, where humans understand little beyond molecules of 20 atoms, and biology, where nature "did an incredible engineering job and terrible job at documentation." It also opens solutions human bias stops us from seeing.

## Why it matters
- A senior frontier-lab research lead states plainly that function-level code writing is over and moves the debate to specification, decomposition and architecture.
- The claim that about 80% of new GitHub code is machine-generated, plus the turn to self-play, explains how coding models may keep improving without new human data.
- His criticism of pass/fail coding benchmarks, and the compression-style open-ended eval, offers a concrete alternative design for an evals chapter.
- The proposal for strongly typed, model-first languages that put the burden of correctness on the model echoes other talks on verification-first agent design.

## Metadata
- Video: https://www.youtube.com/watch?v=1P1hJ36rxM0
- Duration: 20:26
- Playlist index: 872
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Please welcome to the stage the vice president of research [music] at Google DeepMind, Benois Schillings. >> [music] >> All right, good morning. Uh this is really quite exciting to be here and have a chance to to speak with all of you. Uh my name is Benois Shellings. I'm actually a bit of a noob when it comes to to machine learning. Till a year and a half ago, I was working for Google X which some of you may know. We've done things like Whimo, which seems to be at every street corner now. Uh we also do things like Glass. So, you know, we we had a mix of hit and success. But in many ways this was for me an interesting formative experience on how to run a research team in a place like...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/1P1hJ36rxM0.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
