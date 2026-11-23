---
video_id: "HY_JyxAZsiE"
playlist_index: 40
title: "Spec-Driven Development: Agentic Coding at FAANG Scale and Quality — Al Harris, Amazon Kiro"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=HY_JyxAZsiE"
duration: "1:03:50"
duration_seconds: 3830
view_count: 43698
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/HY_JyxAZsiE.txt"
themes:
  - "Evals & Reliability"
  - "Coding Agents"
ingested_at: "2026-04-24T10:51:12+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Al Harris, principal engineer at Amazon on the Kiro agentic IDE, argues that vibe coding leans too hard on the operator, and that spec-driven development brings the whole SDLC into a tight loop: a prompt becomes EARS-format requirements, a design, correctness properties for property-based testing, and a task list. The spec is a living, structured artifact that non-LLM automated reasoning can check for ambiguity and conflicts. In a live workshop he shows how to 'sharpen' the workflow with MCP servers, custom artifacts such as ASCII wireframes and explicit test cases, steering docs, and by asking the agent to challenge his own biased prompt."
---
# Spec-Driven Development: Agentic Coding at FAANG Scale and Quality — Al Harris, Amazon Kiro

## Summary
Al Harris is a principal engineer at Amazon on Kiro, an agentic IDE built by a team of "three or four people sitting in a closet." Kiro went generally available the Monday before the talk, after a public preview in July. His thesis: vibe coding works only when the operator supplies the guardrails and the workflow. Spec-driven development builds that structure into the tool and respects "25, 30 years" of SDLC practice. The session is half talk, half live workshop and Q&A.

**What a spec is**
Harris defines a spec three ways. It is a set of artifacts that capture the state of the system at a point in time. It is a structured workflow: requirements, then design, then a task list. And it is a set of tools on top that make results reproducible. Kiro turns a prompt into requirements with acceptance criteria in EARS (the "easy approach to requirement syntax"), a "when ... then ... shall" structured natural language.

**Why the structure matters**
EARS let Kiro pass requirements through non-LLM tools. The GA release derives correctness properties from the requirements and design, then runs property-based tests (he cites Hypothesis and fast-check) that try to find one case that falsifies each invariant. Kiro also scans requirements for ambiguity and conflicting constraints with "classic automated reasoning techniques." The stated goal is to use the LLM "less and less over time."

**Sharpening the toolbox (200, 400, 800 grit)**
- 200 grit: use MCP servers in every phase, not just coding. He pulls Asana tasks to seed requirements and adds the AWS documentation and fetch MCPs for research. Changing MCP config mid-session breaks the prompt cache and slows things down.
- 400 grit: customize the artifacts. Because they are natural language, he asks for ASCII wireframes in the design and for explicit unit test cases in each task, since LLMs "are very good at saying I'm done" when tests fail.
- 800 grit: change the process itself. His prompt to store memory in S3 biased the whole spec; asking "is this the idiomatic way?" surfaced the AgentCore memory feature. His rule: anything in the prompt steers the agent, for better or worse.

**Live demo and operating details**
He builds "Gramps," a dad-joke agent deployed to AgentCore with CDK, adding session memory through a LangGraph checkpointer. He writes hard-won deploy lessons into steering docs, and has steering attribute Kiro's commits to a co-author. Answers from the Q&A:
- Each task runs in a fresh session seeded only with the spec. Kiro has no subagents yet.
- Kiro keeps agent context small and lets the agent discover context. The code index serves the UI more than the agent.
- There is no incremental pruning. The priority is a 90-95% prompt-cache hit rate, and the current summarization at the cap can take 30-45 seconds.
- Specs map to features. They are mutated over time, not appended, so later PRs show requirement diffs. On the Kiro team, spec reviews have replaced design docs.
- Brownfield results depend on cohesive modules and a reliable test suite.

**Why spend time up front**
A 10-second prompt that fails costs little. An hour spent on a reviewed design doc should "get it right." So specs aim at reproducible, accurate output, not latency.

## Why it matters
- Gives a concrete chain from structured requirements (EARS) to correctness properties to property-based tests: one way to make "done" checkable, not just claimed.
- The S3 bias demo shows that the operator's wording anchors the whole spec, and that asking the agent for alternatives is a cheap fix.
- Spec reviews replacing design docs, with specs mutated as living documentation, is an org practice a team can copy.
- Q&A details (fresh session per task, small context plus discovery, cache hit rate over summarization) show real harness trade-offs inside a shipping IDE.
- The point that brownfield success tracks module cohesion and test reliability ties agent quality back to codebase quality.

## Metadata
- Video: https://www.youtube.com/watch?v=HY_JyxAZsiE
- Duration: 1:03:50
- Playlist index: 40
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[Coding Agents]]

## Transcript excerpt
> For those of you who haven't heard of us, Kira is an agentic ID. Um, we launched generally available this most recent Monday, I think the 17th, but we launched public preview on, uh, in July, >> uh, I think July 14th. So, out there for a few months getting customer feedback, um, all that good stuff. We're going to talk a little bit about using Spectriven development to sharpen your AI toolbox. I did a show of hands. About a quarter of the people here familiar with Spectrum and Dev. My name is Al Harris. Um, principal engineer at Amazon. I've been working on Curo for the last. Uh, and we're a very small team. We were basically three or four people sitting in a closet doing what we thought we...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/HY_JyxAZsiE.txt]]
- Description cue: In the AI coding era, we have powerful tools, but tools still require honing to work effectively. Spec-Driven Development allows for reproducible and reliable delivery, but spending time up-front...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Coding Agents**.
