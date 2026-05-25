---
video_id: "am_oeAoUhew"
playlist_index: 16
title: "Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Ryan Lopopolo, OpenAI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=am_oeAoUhew"
duration: "46:21"
duration_seconds: 2781
view_count: 61323
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/am_oeAoUhew.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
ingested_at: "2026-04-24T09:58:54+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ryan Lopopolo (Member of Technical Staff, OpenAI) spent nine months building software exclusively with agents — banning his team from touching their editors — and spent over one billion output tokens a day doing it (~$1,000+/day). His core thesis: code is free; the scarce resources are now human time, attention, and context window. The harness engineer's job is to surface the right text to the model at the right time. Concrete claims: write tests that limit file length to 350 lines because context is limited; use 'garbage collection Fridays' where engineers convert every code-review comment into a lint rule or reviewer agent; treat the LLM as a fuzzy compiler whose constraints are your non-functional requirement docs. Surprising angle: every time you have to type 'continue' to an agent is a harness failure."
---
# Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Ryan Lopopolo, OpenAI

## Summary
Ryan Lopopolo is a Member of Technical Staff at OpenAI who spent nine months building software exclusively through agents, banning his team from opening their editors. He describes himself as a "token billionaire," spending over a billion output tokens per day (over $1,000/day). This is a dense, practitioner keynote followed by a Q&A session — essentially the most detailed public account of how a senior engineer actually operationalizes coding agents at scale.

**The three scarce resources**
Code is free. The scarce resources are now human time, human and model attention, and context window. The engineer's job is to figure out how to deploy unlimited parallel agent capacity against well-defined work, and to remove themselves from the loop as quickly as possible.

**What harness engineering actually is**
A harness surfaces instructions to the model at the right time. Not all upfront (overwhelming), not never (agent goes off-rails) — just-in-time. Concretely: React component decomposition rules don't need to be in the system prompt; they belong in a lint or test that fires after the agent has already built the component. The agent sees the failure, reads the message, and self-corrects.

**Non-functional requirements as the core artifact**
The insight Lopopolo returns to most: a single patch requires roughly 500 small decisions about non-functional requirements (naming, error handling, retry logic, timeouts). Agents have seen every possible choice for each, so they need your specification. Writing those down — in docs, lint rules, reviewer agents — is the actual job. One engineer on his team documented what a good QA plan looks like; now every agent trajectory produces a good QA plan automatically.

**Specific techniques**
- Tests that check source code structure (max file length: 350 lines), not just behavior — adapting the codebase to the model's context constraints.
- Error messages written as prompts: not "unknown type" but "you shouldn't have an unknown here because we parse-don't-validate at the edge and you have a type derived from Zod."
- "Garbage collection Fridays": one day/week where the whole team converts every code-review comment into a durable lint, test, or reviewer agent.
- 750-package PNPM workspace with strict package privacy, so the agent always knows which directory subtree contains most of the change it needs to make.
- 5–10 skills max, not hundreds — prefer making existing skills more robust over proliferating new ones.
- PR as the collaboration hub: agents can acknowledge, defer, or reject feedback; being too prescriptive causes agents to get "bullied" by reviewers and break.

**The LLM-as-fuzzy-compiler mental model**
Lopopolo frames it directly: all of the harness constraints are optimization passes on acceptable code. Swapping models is like changing the code-generation backend — the constraints around what acceptable code looks like should remain stable across model versions.

**The future he is building toward**
Take a token budget and a quarter's worth of work. Give it the success metrics. Let machines run continuously. Remove himself from the loop entirely. Every interaction still required = harness failure.

## Why it matters
- The most detailed practitioner account of operating at billion-token/day scale with coding agents.
- The "every 'continue' is a harness failure" framing is a sharp forcing function for harness design.
- Garbage collection Fridays is an immediately actionable org ritual for closing the feedback loop between review comments and automated enforcement.
- The just-in-time prompt injection pattern (defer constraints to lint/test time rather than frontloading) is a concrete architectural principle that applies well beyond coding agents.

## Metadata
- Video: https://www.youtube.com/watch?v=am_oeAoUhew
- Duration: 46:21
- Playlist index: 16
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]

## Transcript excerpt
> Our next speaker is here to speak about harness engineering. How to build software when humans steer and agents execute. Please join me in welcoming to the stage member of technical staff at OpenAI, Ryan Leopo. Good morning, London. I'm super excited to be here today. I'm Ryan Laapo and for the last nine months I have had the privilege of building software exclusively with agents. Uh I am a token billionaire and I believe that in order for us to get into our AGI future, we want everybody to be token billionaires to use the models to do the full job. And what that means is to lean into the idea that the models are capable of being a full software engineer. And I've lived that experience by...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/am_oeAoUhew.txt]]
- Description cue: With a special post keynote...

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.
