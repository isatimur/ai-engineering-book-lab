---
video_id: "TswQeKftnaw"
playlist_index: 210
title: "AI powered entomology: Lessons from millions of AI code reviews — Tomas Reimers, Graphite"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=TswQeKftnaw"
duration: "10:21"
duration_seconds: 621
view_count: 4410
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/TswQeKftnaw.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T11:44:06+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Tomas Reimers, co-founder of Graphite, explains how the team tuned Diamond, its AI code reviewer, by sorting review comments on two axes: what an LLM can catch, and what developers want to hear from an LLM. They had LLMs categorize 10,000 human review comments, then prompted the bot only for the overlap (bugs, accidentally committed code, performance, security, doc mismatches, style). Two live metrics keep it honest: a downvote rate under 4%, and the share of comments that lead to a code change in the same PR, which is about 50% for humans and reached 52% for the bot by March."
---
# AI powered entomology: Lessons from millions of AI code reviews — Tomas Reimers, Graphite

## Summary
Tomas Reimers is a co-founder of Graphite, which builds Diamond, an AI code reviewer that connects to GitHub and finds bugs. In this ten-minute talk he explains how the team made LLM review comments useful. His thesis: an LLM can find real bugs, but only if you limit it to the comments it can get right and that developers want to receive from a bot.

**AI can find bugs, and it can annoy you**
The project began about a year earlier, when Graphite saw AI-written code and bugs rise together. Early tests with Claude caught real defects. One returned a database ORM class uninstantiated and crashed the server. Another did border-radius math that divided by a negative number and crashed the front end. But the same model also told developers to revert code "because it used to do it", and made wrong claims about CSS.

**Two axes, not one**
The first split was simple: what LLMs can catch and what they cannot. That was not enough. The bot still left comments like "add a comment describing what this class does", extract this logic into a function, or add tests. These are technically correct, and developers found them pedantic from a bot but fine from a human. Graphite's designers were baffled that engineers rated similar comments so differently. So the team added a second axis: what humans want to receive from an LLM.

**The comment taxonomy**
The team took 10,000 review comments from its own and open-source codebases, had several LLMs categorize them many times, and summarized the result. Comments that LLMs can catch and humans want: logic bugs, accidentally committed code (more common than expected), performance and security concerns, documentation that disagrees with code, and style that follows codebase patterns. Humans want tribal knowledge too ("we used to do it this way"), but that lives in senior developers' heads, so the LLM cannot reach it. Code-cleanliness and best-practice advice is the reverse: the LLM can always produce it, but people do not welcome it from a bot. Reimers notes this boundary may move as context grows.

**Measuring it continuously**
Graphite re-prompted the bot to stay in the useful quadrant, then built two metrics to check that it stays there as models change (for example from Sonnet to Opus or Claude 4):
- Upvote and downvote emoji reactions on each comment. A downvote spike means the model is past its capability and hallucinating. The rate is now under 4%.
- The share of comments that lead to the described change within the same PR. Across open-source repos and repos Graphite can see, only about 50% of human comments do. Some are fixed in a follow-up, some are heads-up advice, some are honest disagreement. By March the bot reached 52%.

## Why it matters
- The two-axis model (can the LLM catch it, and does the developer want it from an LLM) is a reusable design rule for any AI reviewer or assistant that leaves unsolicited advice.
- The metric of whether a comment leads to a change in the same PR gives an outcome-based eval for review bots, with a human baseline of about 50% to compare against.
- Downvote spikes as a hallucination alarm show how a cheap in-product signal can watch for drift when you swap models.
- The finding that developers reject correct but generic advice from a bot shows that AI review quality is a social problem as well as an accuracy problem.

## Metadata
- Video: https://www.youtube.com/watch?v=TswQeKftnaw
- Duration: 10:21
- Playlist index: 210
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> [Music] Thank you all so much for coming to this talk. Um, thank you for being at this conference. Generally, my name is Tomas. I'm one of the co-founders of Graphite and I'm here to talk to you around AI power entomology. If you don't know, entomology is the study of bugs. It's something that we do. We is very near and dear to our heart and part of what our product does. So, Graphite, for those of you that don't know, builds a product called Diamond. Diamond is an AI powered code reviewer. You go ahead, you uh you connect it to your GitHub, and it goes ahead and finds bugs. The project started about a year ago. What we started to notice was that the amount of code being written by AI was...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/TswQeKftnaw.txt]]
- Description cue: This talk will explore insights from millions of automated code reviews, revealing trends in bugs, vulnerabilities, and code health that Graphite’s AI code review agent have uncovered. This...

## Book angles
- Could support a chapter/section on **Coding Agents**.
