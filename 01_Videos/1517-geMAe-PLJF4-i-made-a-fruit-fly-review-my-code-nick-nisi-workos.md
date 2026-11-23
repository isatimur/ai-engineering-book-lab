---
video_id: geMAe-PLJF4
playlist_index: 1517
title: "I Made a Fruit Fly Review My Code - Nick Nisi, WorkOS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=geMAe-PLJF4"
duration: "16:37"
duration_seconds: 997
view_count: 9600
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/geMAe-PLJF4.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-11-12T00:07:25+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Nick Nisi, engineering manager of the developer and agent experiences team at WorkOS, argues that human code review is now the bottleneck, and makes the point with a stunt: a simulated fruit fly connectome (176,000 neurons) that reviews JavaScript. A small model turns each diff into 30 'smells', learned memories link them to sugar or bitterness, and the fly approves about 88% correctly. If a fly can do it, humans should review only what gets escalated: a team-owned review skill, a risk classifier and automated reviewers gate each PR, and agents must attach proof such as screenshots, tests and smoke tests."
---

# I Made a Fruit Fly Review My Code - Nick Nisi, WorkOS

## Summary
Nick Nisi is a software engineer and engineering manager at WorkOS, where he leads the developer and agent experiences (DX) team. His thesis: coding agents have solved writing code, CI and AI reviewers check PRs, and the work is "stuck waiting for me." If humans no longer write the code, why must a human review it? What matters is whether it does what you expect. If review survives, its purpose changes: to bring context back to the human about what changed and why, not to catch what an AI reviewer missed.

**The fruit fly stunt**
The word bug came from a moth found in a relay in 1947; Nisi uses a bug to find bugs. Others have made a simulated fly brain play Doom and Beat Saber; he made it review JavaScript. The brain is a connectome of a male fruit fly, scanned slice by slice under an electron microscope: 176,000 neurons, 6.3 million connections and over 125 million synapses. He changed nothing except a small subset of neurons used to store memories.

**How a fly reads code**
The fly does not know what code is. A small, fast model acts as its sensilla (its nose) and asks 30 non-biased questions about the diff; the answers reach the brain as a smell — literal code smells. Before review, the fly trains on the codebase: tests that pass give it sugar water and reward dopamine; tests that reveal a bug give a bitter taste and punishment dopamine. At review time, if the tongue comes out, the PR "smells good"; if it retracts, request changes. Nisi checked that the fly is not redundant: remove the memories and it scrambles its answers.

**Results**
In a live game the room went three for three and the fly two for three. In his testing the fly was right about 88% of the time, and on harder cases it requested changes 96% and 98% of the time. It catches what changed, altered conditionals and removed logic, but it cannot say why or how to fix it. Commercial AI reviewers do much better. Nothing, he says, knows why — and that is the human's job. Anyone can try it at fruitfly.review.

**An escalation pipeline instead of default review**
- A team review skill, owned by the team that GitHub code owners tag, encoding the bare minimum a DX engineer at WorkOS would check. The team keeps it current.
- A lightweight classifier model that asks whether the change is too complex, does what it claims, or carries significant risk.
- Automated reviewers such as Code Rabbit and Graphite.
- If any step fails, escalate to a human; if none fail, merge without one. When something breaks, audit the chain and fix the skill or reviewer.

**Proof over reading**
Since the human cares about behaviour, the agent must prove the work: screenshots, videos, test results, command output, smoke tests the human can run, and easy repro steps. The summary should explain why the change happened, whether business logic changed, and which alternatives were tried and dropped. Manual checks fade as trust grows.

## Why it matters
- A memorable demonstration that pass/fail code review signals can come from a very simple learner: a fly connectome was right about 88% of the time.
- Reframes review: the human's remaining job is to understand why the change happened, not to hunt bugs an AI reviewer would find.
- Proposes a concrete gate chain (team skill, risk classifier, automated reviewers) that sends only failing PRs to humans.
- Puts the team-owned review skill forward as the artifact teams maintain, and the place to fix things after an incident.
- Shifts the burden of evidence to the agent: screenshots, videos, test output and smoke tests replace line-by-line reading.

## Metadata
- Video: https://www.youtube.com/watch?v=geMAe-PLJF4
- Duration: 16:37
- Playlist index: 1517
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Welcome. Thank you for coming to my talk. My name is Nick Nisi and I am a software engineer and engineering manager at WorkOS where I lead the developer and agent experiences team. Uh and it's a lot of fun and I do lots of really fun stuff there. Uh and at WorkOS we do have a booth here. So if you want to chat with me about this talk or about uh WorkOS itself, come down and see us uh downstairs. Uh but I want to talk to you about what I see as the big bottleneck in software development right now. Uh code is being written faster than ever. Uh and we are putting up more PRs than ever before. But there's a bottleneck there. We've got good CI, we've got linting, we've got agents...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/geMAe-PLJF4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
