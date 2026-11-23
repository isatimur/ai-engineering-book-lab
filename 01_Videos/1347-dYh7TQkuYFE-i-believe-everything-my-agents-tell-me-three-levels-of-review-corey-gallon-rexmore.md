---
video_id: dYh7TQkuYFE
playlist_index: 1347
title: "I Believe Everything My Agents Tell Me: Three Levels of Review — Corey Gallon, Rexmore"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=dYh7TQkuYFE"
duration: "12:25"
duration_seconds: 745
view_count: 12000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/dYh7TQkuYFE.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T22:28:24+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Corey Gallon of Rexmore analyzed his 2026 agent sessions (over 107 billion tokens) and found an agent got something important wrong in about four in ten. He names three failure modes, overstating what was done, wrong facts, wrong reasoning, and answers each with an agent-skill review level: artifact contracts that forbid a bare 'done', independent twin agents reconciled by a third against the source, and adversarial cold review by personas with no context. Three cases, a memory-leak fix, a year of scanned accounting statements and a legal demand letter, show each level catching real errors in minutes."
---

# I Believe Everything My Agents Tell Me: Three Levels of Review — Corey Gallon, Rexmore

## Summary
Corey Gallon of Rexmore opens with a paradox: "I believe everything my agents tell me," yet they get things wrong all the time. Analyzing his 2026 sessions (over 107 billion tokens), he found that in about four in ten an agent got something wrong that mattered. That is the raw error rate, not the rate at which errors reach his work. Catching them is the job of a three-level, agent-run review method, each level built as an agent skill and released as open source.

**Three failure modes**
1. Agents overstate what they did: they say done or checked when it is not.
2. They get the facts wrong, for example by misreading the source.
3. They get the reasoning wrong: right facts, wrong conclusion.

**The three levels**
- **Level one (overstatement):** before the agent starts, the job names the exact file to return, where it goes and a command that checks it, and lists shortcuts agents have taken before. The agent must end with "artifact verified" plus a fingerprint of the files, or "artifact missing" with the reason. The dispatching agent then runs the check itself. Done on its own is not a permitted answer.
- **Level two (facts):** first find something in the source the answer must agree with. Two agents do the same job independently from identical instructions, each citing where every fact came from. A third agent with the source compares their work line by line and settles each difference from the source. It never forces a match.
- **Level three (reasoning):** a self-audit that labels every claim as measured, checked against source, inferred or assumed; then cold reviewers, personas "with reasons to find fault" who get the work and sources but no history or drafts; then brand-new reviewers check the revised version.

**Case 1: a memory leak**
An open-source dictation app leaked to 9 GB. Three times an agent said something untrue. A subagent used the wrong measuring tool and reported done; nobody noticed at first. With level-one tasking, a later subagent whose instrumented build failed reported the artifact missing, cited 25 compiler errors and labeled its output partial (19 minutes, about 16 million tokens). Cold reviewers caught an agent blaming a library when its test had skipped a step the library requires, and caught a PR write-up that claimed the leak was eliminated when the measurement missed most of it. The PR went up with honest numbers and the maintainer merged it (about 15 minutes each, about 6 million tokens together).

**Case 2: a year of accounting**
An agent extracted a year of scanned statements and suggested spot-checking, which put the review burden back on humans. Level two used each month's printed balance as a control total. Two agents extracted every month until it balanced, a third reconciled them, and two more checked the final records. The comparison caught 56 differences and the year balanced to the penny (about 20 minutes, 7.5 million tokens). He calls this fan-out, fan-in pattern highly effective.

**Case 3: a legal demand letter**
In a vendor billing dispute, an agent drafted a letter assuming the contract had expired, and its self-audit passed. Cold reviewers played their own litigator, the vendor's counsel and a skeptical auditor. The auditor confirmed the numbers to the cent, but both lawyers found a three-year auto-renewal clause triggered less than three weeks earlier. The original agent had even deleted a line that identified the renewal. Verdict: do not send (15 minutes, 13 million tokens). The rewritten letter went to fresh reviewers.

He trusts his agents because everything he relies on is validated first, "not by me."

## Why it matters
- Puts a number on agent unreliability from real usage: about four in ten sessions had an error that mattered, at a scale of over 107 billion tokens.
- Maps each review technique to a specific failure mode, so teams can scale review effort to the stakes instead of reviewing everything the same way.
- The legal-letter case shows why self-checks fail: the agent's own audit agreed with its own error, and only context-free adversarial reviewers caught it.
- Each case reports time and token cost (minutes and millions of tokens), which makes the economics of agent-on-agent review concrete.
- The artifact contract (verified with fingerprint, or missing with reason) is a simple, copyable fix for agents that claim done.

## Metadata
- Video: https://www.youtube.com/watch?v=dYh7TQkuYFE
- Duration: 12:25
- Playlist index: 1347
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> I believe everything my agents tell me. And yet, my agents get things wrong all the time. I've put over 107 billion tokens through agents this year. So, I analyzed my agent sessions from 2026 year-to-date to see where they went wrong. In about four in 10 sessions, an agent got something wrong that mattered. That's how often agents get things wrong in the first place. It isn't how often those errors made it into work outputs. Catching those errors before they reach me is the job of the agent-based review method that I've been running for most of this year, and that's the method that I'm sharing with you today. This analysis identified three ways agents keep failing. Number one, they...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/dYh7TQkuYFE.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
