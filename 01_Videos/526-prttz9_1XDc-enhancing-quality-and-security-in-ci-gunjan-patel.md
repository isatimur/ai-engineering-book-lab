---
video_id: "prttz9_1XDc"
playlist_index: 526
title: "Enhancing Quality and Security in CI: Gunjan Patel"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=prttz9_1XDc"
duration: "18:27"
duration_seconds: 1107
view_count: 2155
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/prttz9_1XDc.txt"
themes:
  - "Coding Agents"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:22:25+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Gunjan Patel, a director of engineering presenting a personal side project, argues that boring work like unit tests, comments and security review should move from the fast IDE copilot to a slow, deliberate 'ghost pilot' in CI. On each pull request it improves variable names and comments, builds unit tests in stages (baseline behaviour, adversarial edge cases, cases personalized from a context.yaml and past bugs) and loops until they pass. Three simulated AI employees (red team engineer, Python developer, engineering manager) then debate security issues, and fixes are only proposed for human review, with reasoning, a policy citation and a rerun of the baseline tests."
---
# Enhancing Quality and Security in CI: Gunjan Patel

## Summary
Gunjan Patel is a director of engineering who moved to generative AI work in the last two years. He stresses that this is a side project, not a company product, and dedicates the talk to a close friend who died two weeks earlier. His topic is self-evolving code (captioned as "selfish evolving code"): outsource the boring parts of development to CI so developers keep more time for writing code.

**Copilot vs ghost pilot**
Using the flow model, he notes that unit tests and documentation push developers into boredom. Copilots serve quick, just-in-time decisions; developers are impatient and want answers in seconds. Code review needs deliberate thinking, full context, reflection and iteration. Borrowing from Thinking, Fast and Slow, copilots are the fast system and his "ghost pilot" in CI is the slow one, where nobody needs a reply in seconds.

**The four-step pipeline on each pull request**
1. Improve variable names and comments. LLMs are "cultural technology" with knowledge beyond code; renaming `rev` to annual revenue lets later steps pull in finance knowledge and find corner cases. Comments go stale, and fixing them states the intended behaviour, since bugs are gaps between intent and code. Example: `port` becomes port number.
2. Add and run unit tests, not with one "generate unit tests" prompt but in stages. The LLM first writes the expected behaviour from comments, README and PRD (the baseline). An adversarial-mindset prompt then lists edge cases (weird characters, min and max, boundaries) without writing tests yet. Personalization adds cases from team priorities in a `context.yaml` and from historical bugs in the issue tracker. Only then are tests generated, in a loop until they pass, because it is "cheap labor".
3. Find security issues against best practices and company policy, including logical-flow bugs that static and SAST tools miss, and prioritize them, because an AI asked to find issues will always find something.
4. Propose fixes, not apply them, for a human reviewer, then rerun the baseline tests so the reviewer does not waste time verifying.

**Context**
The `context.yaml` holds cloud provider, service, internal vs customer-facing, PII, frontend or backend, PRD, bug project, Slack channel and infosec guidelines. AI infers the rest: language, infra-as-code vs backend, and focus areas from past bugs such as SQL injection or timeouts. A planned feature would ask the user follow-up questions when context is missing.

**Three AI employees**
A red team engineer gets security policies and code; a Python developer takes the author's view with the PRD; an engineering manager gets business context from meeting transcripts, Slack and the PRD. They debate each issue's risk, need to fix and effort over multiple turns, and a separate step self-reflects against the original intent. He mentions an "Odyssey" exercise of exploring three paths, and says research shows such role play beats plain LLM use. His demo finds a critical Kubernetes bug, chosen from after the GPT-3.5 training cutoff, where a statement sat in the wrong place: a logic flaw SAST would miss. Output per fix: a three-bullet summary of the debate, a policy citation, a risk and effort score and a code snippet. He plans to publish GitLab CI and GitHub Actions files in a repo.

## Why it matters
- The copilot-vs-ghost-pilot split gives a clear design rule: put slow, iterative, high-context AI work in CI, where latency does not matter.
- Staged test generation (baseline intent, adversarial edge-case list, personalization, then code, looped to green) is a concrete prompt-chain recipe that beats a single prompt.
- The three-persona debate with separate self-reflection is a reusable pattern for filtering the false positives an LLM reviewer always produces.
- Proposing fixes for human review, backed by pre-established baseline tests, keeps the human as the gate while cutting verification time.

## Metadata
- Video: https://www.youtube.com/watch?v=prttz9_1XDc
- Duration: 18:27
- Playlist index: 526
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] my name is gjan Patel um I'm a director of engineering at PA alter networks uh like many of you in the last year and a half or two years I've ped to working on generative AI um The Talk today is about selfish evolving code I'm not here to sell you anything none of this is a product from our company uh this is um a side project that I've been exploring before we get started with this talk um I would like to dedicate this talk to my close friend nikil who passed away two weeks ago um it was unexpected uh but um he was very excited for me to come and do this talk uh and he was very enthusiastic about this conf itself um so I want dedicate this talk to him okay let's start with the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/prttz9_1XDc.txt]]
- Description cue: Learn how AI can enable code to self-improve in readability and security. This session explores the integration of AI into CI/CD pipelines with innovative prompting techniques for improving...

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Org Design & Leadership**.
