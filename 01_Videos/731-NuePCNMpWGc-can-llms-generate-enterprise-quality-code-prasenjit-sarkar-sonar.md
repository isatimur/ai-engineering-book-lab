---
video_id: NuePCNMpWGc
playlist_index: 731
title: "Can LLMs generate Enterprise Quality Code? — Prasenjit Sarkar, Sonar"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=NuePCNMpWGc"
duration: "15:12"
duration_seconds: 912
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/NuePCNMpWGc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-04T14:10:17+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Prasenjit Sarkar of Sonar argues that leaderboard pass rates (80%+ on functional tests) hide security, maintainability and tech-debt problems in LLM code. Sonar ran 53+ models over 4,444 Java assignments and analysed the output with SonarQube: the top model by pass rate, Gemini 3.1 Pro High (84.17%), still had 614 bugs and 210 security issues per million lines; Claude Sonnet 4.6 had the highest risk at 300; GPT 5.4 wrote 1.2 million lines. Newer models write more code with subtler bugs. Sonar's fix is a guide, verify, solve cycle with 1 to 5 second pre-commit analysis and a remediation agent."
---

# Can LLMs generate Enterprise Quality Code? — Prasenjit Sarkar, Sonar

## Summary
Prasenjit Sarkar of Sonar asks whether the code LLMs generate is enterprise ready: maintainable, secure and readable. Development has moved from IDEs to agentic coding platforms, and he cites a Pragmatic Engineer survey from March 2026 in which 55% of developers use AI agents regularly. His answer: functional pass rates hide the problems, so teams need quality analysis in the agent loop. It is a vendor talk that ends in Sonar's product line.

**What the leaderboards miss**
Model makers report pass rates of 80% or more on benchmarks such as HumanEval, MBPP and SWE-bench. These measure functional correctness on test cases. They miss security, real-world reliability, architecture and engineering discipline, maintainability and the tech debt the code creates.

**Sonar's evaluation**
Sonar ran models over 4,444+ distinct Java assignments from an open data set and analysed the output with SonarQube Enterprise. It has evaluated 53+ models and versions and publishes the data on a public leaderboard. Figures from the talk:
- *Gemini 3.1 Pro High:* the top pass rate, 84.17%; 307,000 lines of code, cyclomatic complexity 234, 614 bugs and 210 security issues per million lines.
- *Claude Sonnet 4.6:* the highest risk, 300 security issues per million lines, and 627,000 lines of code.
- *GPT 5.4 and GPT 5.4 Pro High:* 1.2 million lines for the same assignments. GPT 5.2 High wrote about a million, while earlier models such as GPT 4.0 wrote under 250,000.

He separates cyclomatic complexity (how many branches and loops) from cognitive complexity, a Sonar measure of how hard code is for a human to read and maintain.

**Trends across models**
Newer models are more verbose and more complex. Total vulnerabilities per model are falling, and old issue types are being fixed, which he credits to reinforcement learning. But models now produce finer bugs and new kinds of vulnerability that are "very very hard for a human being to detect".

**Why it happens**
Training data mixes code of varied quality and contains insecure examples and subtle logic errors. LLMs are probabilistic, so the same prompt gives different code on different days. They lack the context of your company's code and architecture, and their output is hard to explain or diagnose.

**The ACDC cycle**
Sonar's answer is an "agent-centric development cycle" with three stages over an inner and outer loop:
- *Guide:* a context augmentation product that pushes code-base context to the LLM, and a private-beta product that cleans training data, on the idea that problem data yields problem code.
- *Verify:* SonarQube agentic analysis, in open beta, called by the coding agent through MCP before commit. It takes 1 to 5 seconds, against 1 to 5 minutes for CI, and the agent fixes the issues before the PR.
- *Solve:* a remediation agent, in open beta, fixes issues that fail the PR quality gate, or tech debt chosen from the dashboard, with one PR per issue for human review. It re-runs analysis and compilation on each fix and discards any fix that would cause a regression.

## Why it matters
- The model-by-model figures (bugs and security issues per million lines, lines of code per task set) give concrete evidence that functional pass rate is a poor proxy for production quality.
- The verbosity trend, from under 250,000 lines for an older GPT model to 1.2 million for GPT 5.4 on the same tasks, quantifies a maintenance cost that benchmarks do not show.
- The claim that newer models trade fewer old vulnerabilities for subtler new bugs argues for automated analysis over human review alone.
- Running static analysis through MCP before commit (seconds, not CI minutes) is a concrete pattern for putting quality gates inside the agent's inner loop.
- The remediation agent's rule (re-analyse, recompile, discard fixes that regress) is a clear example of a verify loop around an autonomous fixer.

## Metadata
- Video: https://www.youtube.com/watch?v=NuePCNMpWGc
- Duration: 15:12
- Playlist index: 731
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> All right. Okay. Sorry guys for the little hiccup. Okay. So, my name is Prasanjit Sarkar and today's session is all about is our all the LLMs are they generating the code which is enterprise ready, right? So, let's look at the first slide. In the first slide we are talking about um Adnan Qureshi who 2 months back said that a lot of things has been changed in the software development area. Earlier we used to write code in IDE. Now things has been changed. Now it's all about agentic. So, you are spinning up agents. You are just giving instructions in English and English is now the new programming language. Everybody's talking about that. And then you are letting it go, but you...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/NuePCNMpWGc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
