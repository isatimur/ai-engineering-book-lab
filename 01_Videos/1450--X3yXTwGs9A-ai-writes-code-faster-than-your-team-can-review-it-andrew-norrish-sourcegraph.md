---
video_id: -X3yXTwGs9A
playlist_index: 1450
title: "AI Writes Code Faster Than Your Team Can Review It - Andrew Norrish, Sourcegraph"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-X3yXTwGs9A"
duration: "18:57"
duration_seconds: 1137
view_count: 7800
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/-X3yXTwGs9A.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-11-08T07:29:01+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Andrew Norrish, director of field engineering at Sourcegraph, argues that agentic coding has moved the bottleneck from writing code to reviewing it, and that the cost now lands on SREs and platform teams. Twice as many PRs, each more than twice as large, mean unreviewed AI code reaches production and incidents rise faster than teams can hire. His answer: aim AI at well-bounded domains with full code context. He shows three cases: HackerOne security triage, a root-cause agent that finds the faulty commit and can revert it, and an in-house code review agent whose evals run across hundreds of historical branches."
---

# AI Writes Code Faster Than Your Team Can Review It - Andrew Norrish, Sourcegraph

## Summary
Andrew Norrish is director of field engineering at Sourcegraph, which builds code search and code graph tools for very large codebases. For about a year agents have been Sourcegraph's primary customers, and its search, graph and navigation tools now act as a codebase context engine for them. The talk, framed for finance, SRE and platform audiences, does not cover hands-on coding. It covers what AI-driven development does to the people who keep production running.

**The story customers keep telling**
Teams adopt agentic tools, velocity rises and codebases balloon. Leadership buys AI tooling and expects heavy use. For years the first roadmap question was how many heads AI could save; at Sourcegraph's latest customer advisory board that question did not come up for maybe the first time. The bottleneck moved from how fast a human can type code to how fast a human can review the code the AI writes.

**The numbers he cites**
- Expectations that about two thirds of new code will be AI-written by 2027.
- Some organisations estimate almost twice as many PRs merged, each more than double the size of a human PR, so developers spend almost twice as long on review.
- AI code feels harder to review because it was not written by or for a human.
- Almost every developer says they do not trust all AI code, yet almost half say they do not always verify it.
- More incidents per PR, more rollbacks, hotfixes and customer-facing incidents traced to AI code; he also cites an Anthropic report that reliance on AI lowers developers' comprehension of their code.

**Why SREs carry the cost**
AI-written PRs often lack organisational context, especially when a codebase is too big to clone locally and the agent must guess. That code gets merged, often without a human seeing it. SREs then resolve more incidents, without runbooks, in code nobody has read. Cross-service root causes push teams back to slow manual commit scanning, and one fix may need to reach hundreds or thousands of repos. Hiring more SREs is a band-aid; incidents outpace hiring.

**Where AI wins**
Not broad end-to-end automation, but well-bounded domains with full context: vulnerability remediation, security scanning, large migrations, and non-developers prototyping tools. SRE and platform teams already work in such semi-autonomous areas, so they are both the barometer of AI code quality (by incident count) and the teams with the most to gain.

**Investigation, prevention, remediation**
Sourcegraph maps its tools to these three SRE needs: deterministic search across every repo, branch and commit plus an agentic deep search with cited answers; monitors that alert on risky or non-compliant patterns at commit time; and bulk changes across all repos.

**Three examples**
- Sourcegraph's own security team routes HackerOne webhooks to agentic search, which decides whether a report needs a fix, a deeper human review, or can be ignored.
- A customer with over 5,000 developers runs a root-cause agent on downtime or error spikes: it pulls logs and traces, finds the deployed branch or tag ("it's rarely main"), searches Git history for the commit and author, then reverts and redeploys or hands the investigation to SREs.
- Another customer's in-house code review agent, used by thousands of developers on a huge monorepo, runs evals over hundreds of historical branches, using a read-only code finder agent instead of grep.

## Why it matters
- Puts numbers on the review bottleneck: about twice the PRs, each over twice the size, with almost half of developers not always verifying AI code.
- Shifts the reliability story from the author to the responder: SRE incident load is the real measure of whether AI coding is working.
- Argues that AI succeeds in bounded, context-rich domains, which gives a practical rule for where to point agents first.
- The root-cause agent (deployed branch, Git history search, then revert or hand-off) is a concrete pattern for automated incident response.
- Shows an eval design for code review agents: replay hundreds of historical branches, with deterministic search instead of a non-deterministic tool.

## Metadata
- Video: https://www.youtube.com/watch?v=-X3yXTwGs9A
- Duration: 18:57
- Playlist index: 1450
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Um welcome to AI's trust layer for Wall Street, SRE and platform engineering. My name is Andrew Norish. I'm the director of field engineering at Sourcegraph. Our field engineers work on the front lines with our customers, collaborating closely with the software engineers, the other technical team members at some of the largest companies in the world, and helping them build and manage their code bases better using the Sourcegraph platform. If you haven't heard of Sourcegraph before, we build code search and code graph products that help the owners of the largest code bases and the most complex code bases in the world deeply understand those code bases. For the last year or so, on...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-X3yXTwGs9A.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
