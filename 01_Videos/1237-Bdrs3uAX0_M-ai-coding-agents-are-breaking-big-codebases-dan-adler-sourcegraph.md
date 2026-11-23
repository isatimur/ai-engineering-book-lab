---
video_id: Bdrs3uAX0_M
playlist_index: 1237
title: "AI Coding Agents Are Breaking Big Codebases — Dan Adler, Sourcegraph"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Bdrs3uAX0_M"
duration: "12:23"
duration_seconds: 743
view_count: 17000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Bdrs3uAX0_M.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
  - "Evals & Reliability"
ingested_at: 2026-10-30T18:08:08+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dan Adler, CEO of Sourcegraph, argues that the coding agents speeding up developers are also making the large, decades-old codebases that run the world decay: duplicated code, drifting standards, brittle cross-service dependencies and new vulnerabilities, at a volume no reviewer can absorb. Agents understand code by searching it, but you cannot grep what you cannot see, and the major agent builders are not building visibility for 50,000-repo estates. He calls code-graph visibility infrastructure and launches an agentic batch-changes product that rolls one prompt across thousands of repositories."
---

# AI Coding Agents Are Breaking Big Codebases — Dan Adler, Sourcegraph

## Summary
Dan Adler is CEO of Sourcegraph. His short talk speaks for the people who own large, complex codebases, and it is aimed at the dev tools companies and harness builders who serve them. His claim: agentic coding makes owning a big codebase harder and more important than ever, and today's agent tools do not meet that need.

**Where most software lives**
72% of software industry jobs are at companies with more than 500 people, which manage thousands of repositories and decades of history. That code approves bank transactions, computes insurance payouts, tracks warehouse scans, issues paychecks and adjusts aircraft trajectories. Few engineers work at hot startups.

**The tidal wave**
Agents now write more code, faster, than ever. Teams are "exhausted" by reviewing it. Code review agents and health tools are "sandbags" and local maxima. Meanwhile large codebases decay. Agents apply different coding standards in different places. They duplicate code because they do not know a library already exists. Cross-service dependencies get more brittle, small deviations hide deeper problems, and agents uncover new vulnerabilities every day. "The call is coming from inside the house": the tools that speed us up create the conditions for failure. One executive at a top 10 car manufacturer overheard a developer say, "I don't know what this code does. AI wrote it for me", which is terrifying when the code is vehicle autopilot.

**Why current agents fall short**
Millions of lines across tens of thousands of repositories do not fit in a context window. You cannot even clone and grep them in real time. A tech leader at a top 10 US bank put it this way about an npm supply-chain issue: Claude Code can make the change, "but I have 90,000 repositories to make it in." LLMs "love to search". They build a world model by grepping, like a new hire. Repo maps in agents.md files are "barely moving the needle". Understanding is a context problem, and "you can't grep what you literally cannot see." The major model and agent companies, he says, are not building this infrastructure for 500 to half a million repositories.

**Visibility is infrastructure**
Sourcegraph's answer is a foundational code graph: search plus compiler-accurate analysis that agents can query. On top of that he announced agentic batch changes, in beta that day. One prompt starts a change that rolls out iteratively across hundreds or thousands of repositories. It self-heals by responding to CI status and PR comments, uses coding agents where judgment is needed and deterministic scripts where it is not, and tracks coverage so you know you reached 100% of the places that need the patch.

**Early-access example**
At a Japanese global shopping company with hundreds of microservices, a user patched a GitHub code injection issue (environment variables set wrongly) in two repos where he knew it existed. He then had the tool explore the rest of the codebase. It found 80 other potential vulnerabilities and patched them in one go with a consistent deterministic script.

## Why it matters
- It frames the volume of agent-generated code, not its quality per change, as the main threat to large legacy codebases.
- The '90,000 repositories' quote is a sharp illustration of where single-repo coding agents stop being enough.
- 'You can't grep what you cannot see' locates the limit of grep-driven agent exploration at estate scale, and argues for a precomputed code graph.
- The batch-changes design (agents for judgment, deterministic scripts for repetition, CI-driven self-healing, coverage tracking) is a reusable pattern for multi-repo migrations.
- The decay symptoms (duplicated libraries, drifting standards, brittle dependencies) give a checklist for measuring codebase health under heavy agent use.

## Metadata
- Video: https://www.youtube.com/watch?v=Bdrs3uAX0_M
- Duration: 12:23
- Playlist index: 1237
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hey, welcome everybody. I'm Dan Adler, CEO at SourceCraft. It is uh great to see you all here today. Thank you so much for coming out and joining us. Um, this is a talk today about the unglamorous but loadbearing work of owning a large complex codebase and why AI and agentic coding tools today make that job more difficult and more important than ever before. Just to start, the software that runs the world is not pretty. It's not new. It's not clean. It's how everything actually works. 72% of software industry employment is in companies with more than 500 people. These are the large enterprises of the world. These are the companies managing thousands of repositories and decades of...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Bdrs3uAX0_M.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Evals & Reliability**.

