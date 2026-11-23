---
video_id: ZpK5PWX2YRM
playlist_index: 830
title: "Should AI Engineers Still Read Code in 2026? The Z/L Continuum — Alex Volkov, ThursdAI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ZpK5PWX2YRM"
duration: "21:35"
duration_seconds: 1295
view_count: 4000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ZpK5PWX2YRM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Alex Volkov, host of the ThursdAI podcast, sets two AI Engineer Europe talks against each other: Ryan from OpenAI saying 'Code is free' and Mario Zechner saying read every line of critical code. Survey data backs both: more output and deleted code, but 242% more incidents per PR and 31% more PRs merged with no review. His correction to his own Z/L continuum: it is about tasks, not people. The better question is what proof a specific change needs. His routing table: read auth, money movement, permissions and irreversible data; split PRs; verify with traces, evals and shadow mode; separate writer and checker agents. Self-grading loops hide review, not remove it."
---

# Should AI Engineers Still Read Code in 2026? The Z/L Continuum — Alex Volkov, ThursdAI

## Summary
Alex Volkov hosts the ThursdAI podcast and newsletter, has tracked AI releases weekly for three and a half years, and is an AI evangelist with Weights & Biases and CoreWeave. His talk, on the leadership track, is a meta-talk about two of the most-watched AI Engineer talks. At AI Engineer Europe, Ryan from OpenAI said "Code is free" and humans no longer need to concern themselves with implementation. A day later Mario Zechner, creator of Pi, said "Slow the down", called agent errors compounding "booboos", and said to read every line of critical code. Volkov put them on a line he calls the Z/L continuum. His one-line frame: "code got cheap, attention didn't."

**The backdrop**
He dates the break to December 2025, citing METR data on models finishing tasks that take engineers over 16 hours. Boris Cherny, creator of Claude Code, has 100% of his code written by the tool and still ships 20 to 30 PRs. He says 80% of Anthropic's code is AI-written and GitHub is on track for 14 billion commits this year against 1 billion last year.

**Both sides have data**
A Faros AI survey of 22,000 engineers (April 2026) shows the optimists are right about output: an 861% increase in code deletion per PR. Anthropic says it ships eight times more code per quarter than in 2025. But output is not stability. The same survey shows a 31% increase in PRs merged with no review, human or agent, and a 242% increase in incidents per PR. A second study puts bugs per developer up six times. Claude's status page looks like a Christmas tree. Anthropic's essay on recursive self-improvement calls human code review a new bottleneck and cites Amdahl's law.

**His mea culpa**
The continuum is real, but it is about the tasks, not the people. The same engineer can skip reading one piece of code and must read every line of another. Read closely, the two speakers agree. Ryan moves attention up a layer: humans are bad at catching the same mistake repeatedly, so turn each review catch into docs, a linter or a reviewer, and inspect the system rather than every line. Mario routes by task: let non-critical code rip and read critical code. To find what is critical, Volkov adds, ask your agents. The better question is "what proof does this specific change need?"

**The routing table**
- Read every line of authentication, money movement, permissions and irreversible data.
- Decompose into atomic, reviewable PRs, and let agents do the splitting.
- Verify with traces, evals and shadow mode.
- Separate the agent that writes code from the one that tests it. Otherwise it is like setting your own exam and grading it.
- Engineer guardrails, observability and rollback: reading spends attention once, while engineering makes the system remember.

**Capability drift and loops**
New models push the line toward Ryan's end, but drift changes where proof belongs and does not remove it. He quotes an Anthropic speaker: they used to check that Claude does the work right, now they check that it does the right work. Andrej Karpathy said it has never felt so tempting to stop looking at code, but not in production. Loops are cron jobs that discover a task, plan, execute, verify and retry. "If the builder grades itself, you didn't remove the review, you hid it." He closes: not every line needs your eyes, but every system still needs your judgment.

## Why it matters
- It turns a polarized debate into a routing decision per change, with a concrete list of code classes that always need human reading.
- The survey numbers (861% more deletion, 31% more unreviewed merges, 242% more incidents per PR) give a chapter quotable evidence that output gains and quality costs arrive together.
- Separating writer and checker agents, and the line about self-grading loops hiding review, are sharp design rules for verification in agent pipelines.
- The read-once versus engineer-to-remember contrast links code review practice to harness engineering.
- The capability drift idea explains why the right review layer moves over time without the need for proof going away.

## Metadata
- Video: https://www.youtube.com/watch?v=ZpK5PWX2YRM
- Duration: 21:35
- Playlist index: 830
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Two talks at the AI Engineer Europe. One guy is saying, "Code is free." and deleted his ID. And the other one is saying, "Read every effing line of code." So, should AI engineers still read code their agents output I named this the Desolation of Apollo Continuum. And you guys probably have argued about this in Slack. You probably talked about this in the hallway track. So, let's talk about this here. Because code got cheap, attention didn't. As you may know, back in December 2025, something big changed. AI engineering has changed forever, and it broke its own trendline. Actually, Swyx, the organizer of AI Engineer, is collecting evidence to that single moment in time at the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ZpK5PWX2YRM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://thursdai.news/zl>
- resource: <https://www.anthropic.com/institute/recursive-self-improvement>
