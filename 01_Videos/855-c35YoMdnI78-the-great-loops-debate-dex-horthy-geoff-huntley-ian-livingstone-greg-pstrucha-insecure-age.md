---
video_id: c35YoMdnI78
playlist_index: 855
title: "The Great Loops Debate — Dex Horthy, Geoff Huntley, Ian Livingstone, Greg Pstrucha, @insecure-agents"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=c35YoMdnI78"
duration: "1:00:16"
duration_seconds: 3616
view_count: 12000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/c35YoMdnI78.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "An Oxford-style debate hosted by the Insecure Agents podcast on whether agent-loop hype outruns practice. Geoff Huntley (creator of the Ralph loop) and Ian Livingstone (Key Card) argue loops are inevitable, cost about $10.42 an hour and work when pre-commit hooks, types and tests stop them from closing early. Dex Horthy (Human Layer) and Greg Pstrucha (Sentry) answer that the hype outruns the discipline: verification is still partial, errors compound across iterations, token bills grow, and humans must read the code and own architecture. Both sides agree that the human stays liable."
---

# The Great Loops Debate — Dex Horthy, Geoff Huntley, Ian Livingstone, Greg Pstrucha, @insecure-agents

## Summary
The host of the Insecure Agents podcast, from Key Card, runs an Oxford-style debate on one thesis: is there a gap between the hype behind agent loops and what works in practice? On the "no delta" side are Geoff Huntley, creator of the Ralph loop, and Ian Livingstone, CEO and co-founder of Key Card. On the "delta" side are Dex Horthy, CEO of Human Layer, and Greg Pstrucha, a developer at Sentry. The winner is the team that changes the most minds.

**The pro-loop case**
Huntley saw engineers at Canva prompting in a loop by hand and realized "this is a programmable thing." He reduced it to a bash loop and has not written code by hand in two and a half years. He says the models have been good enough for a year, that looped code beats what most founders can hire, and that it works out to $10.42 an hour. The engineering is to stop the loop from closing until it meets your requirements: pre-commit hooks that echo a prompt, static analyzers, deterministic tests, simulators. "The model's a drunk," so you engineer away its failure domains. Livingstone argues that all development is already a loop (CI/CD, PRs, design review, lint), and as fewer humans use software through UIs, it becomes narrower and more verifiable.

**The skeptic case**
Horthy points out that Kubernetes runs on loops too, but deterministic ones, and took years to mature. Loops are good for driving a small, isolated task toward a desired end state. The hype tells people to rise an abstraction level and stop reading code, when "we need to step down an abstraction level." Pstrucha says post-verification agent code is "still crap," that a 5% error rate compounded over 10 to 20 iterations ends near a coin flip, and asks whether an engineer's token budget can be $10K, $100K or $1 million a month.

**Points of practice**
- Ralph's fresh context each iteration keeps work in the "smart zone." Horthy's guideline is about 100,000 tokens, maybe 200,000 with million-token windows, and under 60,000 for the hardest problems. Huntley compares usable context to an eighth of a 720k floppy disk and strips all skills and markdown when a new model ships, because models have different tastes.
- Pstrucha pays about five dollars a PR for security scans worth the cost, and says loops work on well-specified rewrites with years of test suites behind them, and on throwaway prototypes.
- Horthy uses Huntley's Loom experiment as a case of hype outrunning discipline: Huntley says Loom needs better languages or models before it will work.
- Livingstone says goal-seeking models find exploits humans never found, so safety must come from infrastructure, not the model. Huntley adds: never keep secrets as files.

**Future and closing**
Pstrucha wants humans to keep architecture and the call on what not to build, because "agents love complexity." Horthy's advice is to build small incremental loops for a real 2 to 3x speedup rather than chase 100x. Livingstone notes that Git allows one signer per commit, while a human must stay liable for an agent's work. Huntley closes: type systems are in, loops in Python or Ruby will be "a clown show," and you should generate your own dependencies to own your supply chain. The hand vote was too close to call.

## Why it matters
- It puts the strongest pro-loop and skeptic positions side by side, and shows where they agree: verification, not model intelligence, is the bottleneck.
- Concrete numbers ($10.42 an hour for a loop, about five dollars a PR for security scans, context guidelines of 60k to 200k tokens) give a coding-agents chapter real cost and context data.
- The pre-commit hook as a prompt is a simple, reusable way to add back pressure that stops a loop from closing early.
- The compounding-error argument and the one-signer Git problem name two open issues for software factories: reliability across iterations and attribution of agent work.

## Metadata
- Video: https://www.youtube.com/watch?v=c35YoMdnI78
- Duration: 1:00:16
- Playlist index: 855
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hi, welcome to the great loops debate. My name is Ali Howard, the host of the insecure agents podcast. I also am a member of technical staff at Key Card and I'm super excited to bring the loops debate to you here today. You might recognize some familiar faces on stage today that did the MCP debate with us at AIE code back in November. Um, that was so much fun. We thought maybe we would do it a second time. Um, but this time we would debate loops and instead of just Ian versus Jax, we uh, we recruited some more people for each of them to have on their team. Um, so here on stage with me today to debate loops, we have Ian Livingston, CEO and co-founder of Key Card. We've got Jeffrey Huntley,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/c35YoMdnI78.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://ghuntley.com/loop>
- resource: <https://ghuntley.com/ralph>
- resource: <https://www.anthropic.com/institute/recursive-self-improvement>
