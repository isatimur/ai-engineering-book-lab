---
video_id: "0tVu-V3_fFw"
playlist_index: 399
title: "Designing AI To Scale Human Thought — Jun Yu Tan, Tusk"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=0tVu-V3_fFw"
duration: "12:24"
duration_seconds: 744
view_count: 966
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/0tVu-V3_fFw.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:16:44+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jun Yu Tan, founding engineer at Tusk, argues that instead of making humans accommodate agents that automate complex, high-judgment work poorly, we should spend that compute helping humans do better work. He proposes three augmentation patterns: blind spot detection, cognitive partnership and proactive guidance. Tusk applies the first to pull requests: it writes and runs unit tests to surface only verified bugs, and he says it caught verified bugs in 43% of PRs. A novelty-criticality grid decides which findings interrupt the user. He adds that trust must be progressive, contextual and bidirectional, and that products should track user skill growth, not only engagement."
---
# Designing AI To Scale Human Thought — Jun Yu Tan, Tusk

## Summary
Jun Yu Tan is a founding engineer at Tusk, an AI testing platform. His thesis: instead of making humans accommodate AI systems that automate complex tasks "suboptimally", spend that compute helping humans produce high-quality work in the first place. He admits some ideas are speculative.

**Automation versus augmentation**
Automation of discrete tasks is easy to measure, sell and benchmark. But it risks skill atrophy (vibe-coding an app you do not understand), and high-judgment, high-context work such as coding and design still lives in the minds of experienced people. His contrast: an automated email assistant writes and sends for you; an augmenting one brainstorms points, suggests phrasings and warns that a line may sound harsh. An automated coder opens a PR from a Slack message; an augmenting one reviews your PR and points out a missed edge case. He compares it to an offshore contractor versus a new team member you grow with.

**Pattern 1: blind spot detection**
The question is not "what do you do wrong" but what you did not consider. The hard part is signal-to-noise: challenge thinking without making people defensive, and speak when a unit of work is ready. At Tusk, a commit triggers generated unit tests that run against the codebase, so the tool surfaces only verified issues. It also lists its business and engineering assumptions and possible fixes, and learns from thumbs up or down. He calls this "systematic pessimism". He says it caught verified bugs in 43% of pull requests and added almost a thousand new tests in two months.

**The novelty-criticality grid**
- High novelty, high criticality (a new race condition, exposed customer data): interrupt.
- High novelty, low criticality (new language features): gentle, explained suggestions.
- Low novelty, high criticality (standard security checks): clear warnings, no long explanation.
- Low novelty, low criticality (formatting): batch and make optional.
People process only about three meaningful suggestions per review, so prioritisation spends the attention budget.

**Patterns 2 and 3**
Cognitive partnership builds a theory of mind of how a user thinks and learns, without being creepy. Proactive guidance is hardest: the problem is when to suggest, not what. It should feel like serendipity, not interruption.

**Trust and skill growth**
Trust should be progressive (prove itself on low-stakes suggestions first), contextual (good at code review, maybe bad at design feedback) and bidirectional (each side adapts). Augmenting tools should show skill growth and unlock complexity as competence rises. He urges teams to track whether users get better, not just engagement, and cites ChatGPT's memory feature as proof that feeling understood builds stickier products.

## Why it matters
- A clear design vocabulary for human-in-the-loop AI: blind spot detection, cognitive partnership and proactive guidance.
- Tusk's pattern of executing generated tests before reporting a bug is a concrete way to cut false positives in AI code review.
- The novelty-criticality grid is a reusable rule for when an AI reviewer should interrupt, warn, suggest or stay quiet.
- The progressive, contextual, bidirectional model of trust is a useful frame for chapters on adoption and UX of agents.
- Tracking user skill growth as a product metric is a counterpoint to automation-first agent roadmaps.

## Metadata
- Video: https://www.youtube.com/watch?v=0tVu-V3_fFw
- Duration: 12:24
- Playlist index: 399
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> Hi everyone, I'm Jun, founding engineer at Tusk. I'm excited to share about a paradigm for building the next generation of AI interfaces, the ones that put humans in the center, augmenting our capabilities, and helping us be more thoughtful and creative. It's a collection of ideas that I've been thinking about for a while now. Though some of these concepts might be a little bit more speculative, I do hope to encourage more builders in the space to consider these patterns and principles. Now, it's often said that 2025 is the year of the agents and rightfully so. From general agents performing research and browser use for you to deeply verticalized apps across all industries, AI agents are...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/0tVu-V3_fFw.txt]]
- Description cue: Forget the hype of AI automation replacing jobs. The future lies in human augmentation — revealing blind spots, sparking creativity, and amplifying thoughtful decision-making. In this talk,...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://jytan.net/blog/2025/ai-augmentation>
