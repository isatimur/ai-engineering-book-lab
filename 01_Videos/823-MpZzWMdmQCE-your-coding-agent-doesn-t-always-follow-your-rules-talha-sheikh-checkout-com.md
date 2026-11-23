---
video_id: MpZzWMdmQCE
playlist_index: 823
title: "Your coding agent doesn't always follow your rules — Talha Sheikh, Checkout.com"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=MpZzWMdmQCE"
duration: "10:08"
duration_seconds: 608
view_count: 2300
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/MpZzWMdmQCE.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Talha Sheikh of Checkout.com says that when a coding agent reports 'task completed', the developer is still the enforcement layer who has to check it. He built Vector, a tool that Claude Code hooks call at session end to run deterministic checks from a config file and tell the agent to retry until they pass. His thesis: new models gain capability, not reliability, and instructions are not verification. Guardrails can let a smaller, cheaper model do the job. Since every company enforces different rules, enforcement should be a shared, language-agnostic contract that runs at every level. TLDR: work on the harness, not the code."
---

# Your coding agent doesn't always follow your rules — Talha Sheikh, Checkout.com

## Summary
Talha Sheikh works at Checkout.com. His ten-minute talk opens with a familiar loop. Claude Code splits a feature into subtasks, runs sub-agents, and reports "Task completed". Then you run it and something fails, you ask for a fix, and another small thing is missing. Whatever spec he gave, detailed or thin, he always had to tell it one more thing. His conclusion: "I am the enforcement layer." He wanted to play Cyberpunk while the agent worked, so he needed something deterministic to check the agent's claim that it was done, and done the way he wanted.

**Vector: deterministic checks via hooks**
He built a tool he calls Vector. A Claude Code hook calls it when a session finishes. A config file defines the test cases. If a check fails, Vector tells the agent to try again, and his demo output shows a failure, a retry, and then all checks passing. His framing: the question is not whether the agent can do the task, but whether you can trust it.

**The objection, and his answer**
An Anthropic engineer told him a smarter future model would make enforcement unnecessary. His answer has three parts:
- New models gain capability, but that is not the same as reliability.
- Better specs, MCP servers, sub-agents and context are worth having, but instructions are not verification. You still need to check.
- Guardrails change the cost curve. With enough of them, a smaller model like Haiku or an open-source model can reach the output you want. A frontier Opus model is the most expensive route; more time in the harness can cut cost sharply.

**From tool to pattern**
Talking to people at events, he found every company building its own enforcement: Anthropic, his own employer, Meta. One person's checks do not fit another's rules. So enforcement must be a pattern, not a product: language-agnostic, shareable, with each team bringing its own checks. It should run at every level: end of conversation, pre-commit, inside multi-agent workflows, on async agents, and as a non-deterministic LLM-as-judge check where needed. At its core it is a contract that says, for a given task, what must be fulfilled.

**Industry convergence**
He lists the same idea elsewhere: an Anthropic pattern where one agent writes code and an advisor feeds back, OpenAI's harness engineering, code review vendors that do comprehensive PR reviews, and conference lines such as "enforce don't instruct" and "slow the hell down". You go slow not because agents code slowly but because verification takes time.

**The shift**
The value is no longer the code you create but the verification you design. "It's not about can you code, but can you verify?" In Q&A he says the tool is public as Vector Harness. Asked whether he is a top token spender at his company, he jokes that he needs those tokens to build the verification layer.

## Why it matters
- It names the developer-as-enforcement-layer problem and gives a concrete fix: a session-end hook that runs deterministic checks and loops the agent until they pass.
- The capability-versus-reliability distinction is a useful counter to the view that the next model will make verification unnecessary.
- The cost argument links harness investment to model choice: more guardrails can let a cheaper model do the job of a frontier one.
- The call to treat enforcement as a language-agnostic contract at every level (conversation, commit, multi-agent, async, judge) gives a layered model for verification design.
- It gathers several independent sources that land on the same conclusion (verify the agent's work, do not trust it), which helps a chapter show the idea is widely held.

## Metadata
- Video: https://www.youtube.com/watch?v=MpZzWMdmQCE
- Duration: 10:08
- Playlist index: 823
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hello, hello. Um Have you ever given a task to Claude code and uh you give it a feature and you be like, "Okay, cool. Uh can you build this for me?" And Claude code starts putting it out into subtasks and you see it very Okay, this is pretty cool. You see it running a multiple sub agents. They're all right, that's really cool and you can see like ripping through all of your tasks, sub agents being completed and it gives you like a final output. Task completed. Like, "Amazing. Great." But when you actually try to run it, actually be like, "Oh, well, it's it's not Something else failed. Hey Claude, can you fix this little bit thing?" Uh well, you just try it again. Okay, it's...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/MpZzWMdmQCE.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
