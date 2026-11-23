---
video_id: _mi3alkqy4s
playlist_index: 1214
title: "The Death of the Code Review: What the Data Actually Says — Laurie Voss, Arize AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_mi3alkqy4s"
duration: "24:41"
duration_seconds: 1481
view_count: 115000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/_mi3alkqy4s.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T17:14:42+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Laurie Voss, head of developer relations at Arize AI and an npm co-founder, surveys the evidence on code review in the agent era. Developers with autonomous agents wrote 741% more code but shipped only 30% more software, and review is the bottleneck. Humans cannot review harder (defect finding drops past about 400 lines a sitting); tests are a weak proxy (half of benchmark-passing PRs were not mergeable for maintainers); no-human experiments hid problems or were reversed; and automated reviewers are easy to fool. The advice: stop reviewing PRs and build a review harness that codifies your definition of good, with production as the last reviewer."
---

# The Death of the Code Review: What the Data Actually Says — Laurie Voss, Arize AI

## Summary
Laurie Voss is head of developer relations at Arize AI and a co-founder of npm, Inc. Agents have made code generation fast, but human review speed "has stayed exactly the same." The talk reviews what the industry is doing and ends with one thing to do today.

**The size of the gap**
Three economists tracked over 100,000 GitHub developers against AI-usage telemetry. Those who turned on autonomous agents wrote 741% more code but shipped only 30% more software, and the authors name review as the bottleneck. Generation is solved: Voss cites a 50-million-line Ruby migration in a day and Bun's port of over a million lines of Zig to Rust in six days.

**Reviewing harder fails**
A Cisco study of 2,500 reviews and 3.2 million lines found reviewers stop finding defects past about 400 lines in a sitting or 450 lines an hour. At that pace one 10,000-line agent PR needs three or four working days of real review. People pushed to review all day burn out.

**Tests are a weak proxy**
An evaluation group had four open-source maintainers judge PRs that already passed a SWE-bench-style benchmark; only about half were mergeable. Failures were code quality and breakage outside the test suite. Cognition's Frontier Code benchmark, 150 tasks from more than 20 maintainers grading regression safety, scope discipline, test quality and maintainability, found a model scoring 88% on SWE-bench Pro scored 29% on its hardest slice; GPT 5.5 scored under 6%. Sarah Guo argues a mergeability benchmark would become a training signal, since anything cheaply verifiable gets trained against: "whoever writes today's review standard is writing next year's default model behavior."

**Automated review is mainstream**
GitHub Copilot's reviewer has done 60 million reviews, more than one in five on GitHub. Cursor's first reviewer ran eight passes in shuffled order to filter false positives, which "kill a reviewer"; a university team found multi-pass review raised quality by up to 44%. Cursor then had to tell its model to be suspicious by default, and its reviewer now spawns a fix agent. Every vendor optimizes for human acceptance; Cursor's resolution rate rose from 52% to over 70%.

**No-human experiments**
- An Anthropic researcher had 16 agents build a Rust C compiler that compiles Linux in about 2,000 sessions, with no human "in" the loop but a human "on" it who wrote the harness.
- Bun's port passed 99.8% of tests but has 13,044 unsafe blocks versus about 74 in comparable human Rust.
- OpenAI's no-manual-code product (about a million lines, 1,500 PRs, three engineers) moved review into agent-to-agent loops, and humans still spent Fridays cleaning up AI slop by hand until agents took it over.
- Dexter Horthy reversed six months of "don't read the code": "It did not end well."

**Reviewers can be fooled**
Anthropic's security reviewer README warns it is not hardened against prompt injection. A March study found vulnerable code with an innocent commit message fooled an autonomous reviewer 88% of the time, versus 35% for humans. Production behavior is the last reviewer standing.

**The advice**
Human checkpoints survive where correctness is not cheaply checkable, the blast radius is large, security matters, or someone signs the result. Humans move from engine to pilot. "Stop reviewing PRs": it is the wrong level of abstraction for 2026. Build a review harness that codifies your definition of good, company context and domain knowledge.

## Why it matters
- The 741% more code versus 30% more shipped figure is a sharp, citable measure of the review bottleneck.
- The Cisco 400-line limit shows why reviewing harder cannot scale to agent-sized PRs.
- The SWE-bench Pro versus Frontier Code gap (88% versus 29%) quantifies how far test-passing is from mergeable.
- The 88% versus 35% fooling rate makes the case that removing humans loses the reviewer that is hardest to fool.
- Gives a concrete prescription: move human judgment up into rubrics, harnesses and evals, and watch production behavior.

## Metadata
- Video: https://www.youtube.com/watch?v=_mi3alkqy4s
- Duration: 24:41
- Playlist index: 1214
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hello everybody. Thank you for following on a session about the death of the code review with a session about the death of the code review. Uh who knows howululing decisions get made, but uh Swix decided it would be funny for those two to be backtoback. Uh, hi. Uh, I'm Lori. I'm head of developer relations at Arise AI. Uh, some of you may remember me from when I used to co-found npm, Inc. These days, I think about AI and how to test it. Uh, I'm here to talk about a problem that everyone is seeing right now. The rise of AI agents has dramatically increased how fast developers can produce code. Uh, but the speed at which humans can review code. Uh, yeah, I am having a talk right now....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_mi3alkqy4s.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
