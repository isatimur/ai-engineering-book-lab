---
video_id: LQW_Wvqhp04
playlist_index: 1432
title: "Why Humans Can't Keep Up With AI-Written Code - Tariq Shaukat, Sonar"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=LQW_Wvqhp04"
duration: "16:35"
duration_seconds: 995
view_count: 3600
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/LQW_Wvqhp04.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-31T01:40:09+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Tariq Shaukat, CEO of Sonar, applies Toyota production system lessons to agentic software factories: code is abundant, confidence is scarce. He names five limits: human review does not scale (lines of code up 2,450% but releases up only 30%, and people agree with wrong AI four times in five), agents struggle in large codebases, errors compound over long tasks, LLM judges flip 7-34% of verdicts, and time to exploit nears zero. His code confidence formula multiplies intent, guide rails, independent verification and evidence, so any zero gives zero. He cites customer results: 36% lower token cost and 92% fewer issues per commit."
---

# Why Humans Can't Keep Up With AI-Written Code - Tariq Shaukat, Sonar

## Summary
Tariq Shaukat is CEO of Sonar. His talk is about building software factories that work for enterprises, and he starts with real factories. In the 1980s, good cars still had gaps between panels, until a Lexus commercial rolled a ball bearing along the seams. That reflected a new mindset: quality over volume, fix the system rather than symptoms, design for buildability, solve problems as they occur, and let anyone stop the line. Agile, Kanban, error budgets and continuous integration all grew from that Toyota production system thinking. Agents now break it.

**Code is abundant**
Research on asynchronous agents found lines of code up 2,450% and commits up 240%, but releases up only 30%. Sonar's upcoming state of code survey says 5% of developers run agentic software factories today, 34% expect to within a year, and 39% in financial services. He cites a recent article by Satya Nadella on insider risk from models, which calls for containment and governance built on deterministic system design, human controls and reliable operating procedures.

**Five hard limits**
1. Human in the loop does not scale. Beyond volume, there is "cognitive surrender": in one study people agreed with AI 93% of the time when it was right, and four times out of five when it was wrong.
2. Agents struggle with large codebases. In a code translation study, accuracy was 91% at 10,000 lines and collapsed by 50,000. Another study found a 30x variance in tokens for the same task, spent on navigating the codebase. His analogy: drive to New York from White Plains or from Albuquerque.
3. Errors compound. A task-horizon benchmark shows a preview model completing 16-hour human tasks at 50% accuracy, but the curve flattens at 80%. At 95% accuracy per step, 20 steps leave about 36%.
4. LLMs are "unreliable reward seeking judges." A PayPal AI research paper found 7-17% of verdicts change across identical replications. A Meta study found that asking "are you sure?" flips 7-34% of answers.
5. As time to exploit approaches zero, response is too slow, so prevention must be designed into the factory.

**The code confidence formula**
Confidence is the product of four factors, so any zero makes it zero:
- Intent: be crystal clear about what you want built.
- Guide rails, not guard rails: small nudges that keep agents on the road rather than barriers at its edge.
- Verification that is independent and thorough, with issues fixed rather than deferred.
- Evidence that is consistent, auditable and repeatable.

**Results he reports**
Sonar Vortex supplies intent and guide rails in the agentic loop. On long tasks in large codebases, customers saw a 36% cut in token cost and a 92% cut in issues per commit. For verification, Sonar combines deterministic and agentic methods: "use CPUs when you can use CPUs," GPUs when needed. In a survey of over 1,000 customers, SonarQube users were 81% more likely to report a very positive AI impact on code security, 34% on time to market, and 76% on outage frequency. Evidence means passing quality gates and standards such as IT general controls or MISRA for cars. His close: factories of the future must deliver confidence.

## Why it matters
- The gap between 2,450% more code and 30% more releases makes the review bottleneck concrete.
- The cognitive surrender figure (agreeing with wrong AI four times in five) undercuts human in the loop as a governance strategy.
- The LLM-judge instability numbers (7-17% on replication, 7-34% when challenged) warn against relying only on LLM review.
- The multiplicative confidence formula gives a checklist for factory design. The results are vendor claims from Sonar's own customers.

## Metadata
- Video: https://www.youtube.com/watch?v=LQW_Wvqhp04
- Duration: 16:35
- Playlist index: 1432
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Uh I My name is Tariq Shakir. I am the CEO of Sona, as you just heard. And we're here to talk today about how we have been um helping companies build software factories that actually work for enterprises. And I thought it'd be an interesting way to start to start looking at actual factories cuz we know how to build actual factories. And for those of you who have a little bit of the gray hair and all of this sort of thing, you may uh remember the 1980s. And in the 1980s, you could find cars that were really good cars. But if you look at the picture here and if you remember those times, the cars like didn't quite fit together perfectly. Right? You'd have different pieces that would...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/LQW_Wvqhp04.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
