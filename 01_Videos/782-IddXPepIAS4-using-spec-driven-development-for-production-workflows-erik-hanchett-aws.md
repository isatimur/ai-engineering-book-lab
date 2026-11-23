---
video_id: IddXPepIAS4
playlist_index: 782
title: "Using Spec-Driven Development for Production Workflows - Erik Hanchett, AWS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=IddXPepIAS4"
duration: "17:47"
duration_seconds: 1067
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/IddXPepIAS4.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-28T23:47:21+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Erik Hanchett, senior developer advocate at AWS, explains spec-driven development: write requirements, a design document and a task list as markdown before any code, because coding assistants act like eager interns that go off the rails without guidance. He shows the flow in Kiro, the AWS AI IDE and CLI with vibe and spec modes: clarifying questions, EARS-format requirements, a design doc with mermaid diagrams, then tasks with property-based tests. His tips: keep steering docs in a Goldilocks zone, use skills, ask for the top four tasks as an MVP first, pull tickets in through MCP, and remember the human owns the result."
---

# Using Spec-Driven Development for Production Workflows - Erik Hanchett, AWS

## Summary
Erik Hanchett is a senior developer advocate at AWS with over 15 years of software development experience. His short talk defines spec-driven development as creating structured specifications before any code is written: markdown files for requirements and design that guide a coding assistant. The goal is not only faster code but higher-quality code.

**Why specs: the AI intern**
He compares coding assistants to interns. As an intern he once dropped everything whenever a VP voiced a random idea, until his manager taught him to write it down and plan it. LLMs are similarly over-eager and go off the rails with too much leeway. Frontier models keep improving, and some harnesses add planning modes, but he argues nothing beats written documents with a human in the middle before code generation starts.

**Cautions before you start**
- Context: keep your agents.md or CLAUDE.md file (steering docs in Kiro) in a Goldilocks zone, neither too much nor too little.
- Skills: on-demand instruction files triggered by keywords or a slash command help at every stage, from design docs to task execution.
- Trust: you are the human in the loop and the code reviewer. If something goes wrong, you get blamed, not the agent. AI review tools help but do not replace you.

**Kiro and the history behind it**
AWS saw customers vibe coding but not getting the output they wanted, and some had built a bespoke pattern of having agents write requirements and design docs first. AWS packaged that into Kiro, an AI IDE with a CLI version, built around vibe and spec modes. He says the preview went viral with tens of thousands of downloads, so AWS had to gate it. He notes users are shifting from IDEs to CLIs. You can also do the flow by hand (requirements, then design, then tasks, reviewing each) or with GitHub's open-source tool for the same process.

**The three phases**
- Requirements: clarifying questions first, then user stories and requirements in EARS format. A quick plan mode generates everything at once.
- Design: a higher-level document with mermaid diagrams or ASCII art. You can start here instead. This is the point to stop and add your own expertise and taste, and to check for inconsistencies and hallucinations.
- Implementation: a task list with property-based tests checked against the requirements and design. In TypeScript these use fast-check, running dozens or hundreds of randomised cases.

Spec mode works for legacy apps too; he has seen years-old projects with dozens of spec files. There is also a spec mode for bug fixes, though small fixes can be vibe coded.

**Tips**
Ask the agent to move the top four tasks up front as an MVP so you see something working early. His demo, a movie website in an 80s synthwave theme, started from design, with tasks one to four rebuilt to deliver a browsable grid with search, genre filtering and sorting. On MCP, he rejects the claim that it is dead; it is still maturing, especially on security. He likes it for pulling Jira or Asana tickets and product-manager requirements into specs, wired in through steering rules or the first prompt.

## Why it matters
- Gives a compact, tool-agnostic recipe for spec-driven development (requirements, design, tasks, each reviewed by a human) that any coding agent can follow.
- Property-based tests generated from the requirements give a concrete link between the spec and verification, not just documentation.
- The ask-for-an-MVP-from-the-top-four-tasks tip is a simple way to get early working software out of a long agent-generated plan.
- Frames accountability plainly: the developer, not the agent, owns generated code, which shapes how review fits into agent workflows.
- Shows MCP as the bridge from existing project-management artefacts into specs, a practical use case beyond tool calling.

## Metadata
- Video: https://www.youtube.com/watch?v=IddXPepIAS4
- Duration: 17:47
- Playlist index: 782
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hey everyone, my name is Eric Hanchett, and today I want to tell you guys all about spec-driven development and how you might use it in your workflows today. So, there's a couple of things we want to talk about. First, what is spec-driven development? And then, how can it make you a better and faster coder? So, we just don't want you to code faster, but we want you to actually create higher-quality code from it. And I think really spec-driven development helps you with this, and I'm going to explain why and how. It's a structured specifications are created before any code is written. That's the definition of really the specs or the requirements of this spec-driven development, and it goes...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/IddXPepIAS4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
