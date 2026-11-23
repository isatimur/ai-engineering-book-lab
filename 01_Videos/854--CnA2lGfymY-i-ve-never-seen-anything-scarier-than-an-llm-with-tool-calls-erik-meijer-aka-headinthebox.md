---
video_id: -CnA2lGfymY
playlist_index: 854
title: "\"I've never seen anything scarier than an LLM with tool calls.\" — Erik Meijer aka @HeadinTheBox"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-CnA2lGfymY"
duration: "21:13"
duration_seconds: 1273
view_count: 5000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/-CnA2lGfymY.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Erik Meijer gives a 20-minute tutorial on making agents provably safe with elementary type systems and compiler knowledge. Safety of text answers is not a mathematical property, but tool calls (shipped in June 2023) add an IO side effect that can wipe your files before a safe answer arrives. His fix: push IO to the right. The model returns a program, a free-monad expression of the computation, which can be type-checked, taint-analyzed and proved safe before anything runs. He calls it proof-carrying code from the 1990s: agents are dangerous until proven safe."
---

# "I've never seen anything scarier than an LLM with tool calls." — Erik Meijer aka @HeadinTheBox

## Summary
Erik Meijer says up front that this is "not a product pitch." It is a 20-minute tutorial on how "elementary type systems and compiler knowledge" can make AI agents provably safe. He opens with his coding agent deleting one of his files while he prepared the slides. His premise: if anything stands between a model and its goal, it will do whatever it can to reach the goal, so models are intrinsically dangerous and must be tamed.

**From text to tools, told through type signatures**
He tells the story as a sequence of function signatures. The first LLM was an innocent function from question to answer. Prompt injection then brought back the SQL-injection problem, worse, because LLMs make no distinction between code and text. The labs answered with a safety interface, which he shows in Lean and in a simpler verification language: given a proper question, return a safe answer. But nobody can write a formal proof that an answer is safe, because "that's not a mathematical property." Hence LLM-as-judge startups and alignment baked into weights, which still get jailbroken. Still, he says, words alone do nothing until a human acts on them.

**The giant leap for chaos**
In June 2023, OpenAI announced tool calls in GPT-4, and every vendor copied it. The signature gains only a little IO, "a small step for a type but a giant leap for chaos." To compute the answer, the agent now runs the agentic loop with side effects, and might empty your bank account before it returns a safe answer. Lean's IO type even mentions the real world, as a warning of irreversible effects. He recalls a definition of an agent from last year's conference, an LLM "wrecking its environment in a loop," and cites the lethal trifecta: private data, untrusted content and tools.

**Push IO to the right**
His fix, explained with a Dutch football fans' chant, moves the IO to the right. The model no longer runs the loop. It returns a plan, and a trusted executor runs it, which air-gaps the agentic loop from the agent. But a value of type IO is a black box that Lean will not let you inspect.

**Reify the plan into a program**
The last step: the model returns an expression, a program that represents the computation, in effect a free monad. Any compiler course makes data-flow analysis, type checking and taint analysis on such programs trivial, which addresses the trifecta. A simple inductive interpreter and an inductive proof follow, and models can generate those proofs.

**The takeaways**
He credits the idea to proof-carrying code, invented by academics in the 1990s. Three points: agents are "dangerous until proven safe"; the plan languages are produced, consumed and proved by machines, so "we should stop designing languages for humans"; and the machinery is programming 101. He points to a Harvard group's GitHub implementation that uses a different language but the same principle.

## Why it matters
- It frames agent safety as a type-signature problem: the danger is not bad words but the IO side effects that tool calls added, which gives a precise vocabulary for guardrail chapters.
- The plan-then-execute pattern, with the plan reified as an inspectable program, offers a formal alternative to LLM-as-judge and alignment for tool-using agents.
- Taint analysis over the generated program is a concrete, compiler-style answer to the lethal trifecta of private data, untrusted content and tools.
- The claim that agent plan languages should be designed for machines rather than humans is a provocative design principle for harness builders.

## Metadata
- Video: https://www.youtube.com/watch?v=-CnA2lGfymY
- Duration: 21:13
- Playlist index: 854
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Please welcome to the stage the research scholar at Linet's Labs, Eric Meyer. Well, um, can you go back one slide? Sorry. All right. Good afternoon everybody. Thanks for being here after a long day of talks, exhibits, side effects. Oh, sorry. That was the site event. Um I hope that um you have as much fun watching this talk as I had uh creating it. Um let me first get this out of the way. This is not a product pitch or announcement or anything. It's a 20inut tutorial of how you can use elementary type systems and compiler knowledge to make AI provably safe. And I'm sharing all my secrets with you today. Um hopefully to kind of inspire some of you that next year you will have a booth...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-CnA2lGfymY.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://spawn-queue.acm.org/doi/pdf/10.1145/3676287>
