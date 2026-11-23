---
video_id: "U00AOI1eJUE"
playlist_index: 34
title: "Bending a Public MCP Server Without Breaking It — Nimrod Hauser, Baz"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=U00AOI1eJUE"
duration: "40:50"
duration_seconds: 2450
view_count: 1237
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/U00AOI1eJUE.txt"
themes:
  - "MCP & Tooling"
ingested_at: "2026-04-24T10:50:56+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Nimrod Hauser, founding engineer at Baz (AI code reviewers), argues that third-party agent tools are generic integration code with shallow descriptions, and you must tailor them to your use case. Using a toy version of Baz's spec reviewer on Playwright's MCP server, the vanilla run fails: the agent invents a URL and returns a 404 screenshot. Five practices fix it: curate the 21 tools down to 16 or fewer, wrap tools with use-case descriptions (prefer the accessibility snapshot), add deterministic guardrails such as path validation with agent-facing error messages, compose new tools like an evidence screenshot tool, and call tools as plain functions for deterministic steps like a JWT login."
---
# Bending a Public MCP Server Without Breaking It — Nimrod Hauser, Baz

## Summary
Nimrod Hauser is a founding engineer at Baz, which has built AI code reviewers since 2023; he has about 20 years in back end and data. His subject is third-party agent tools, whether from an MCP server, a library or copy-paste. A tool is "just callable functions wrapped with a nice description", in effect integration code written by another team. Out of the box such tools can make agents unpredictable, degrade results, and even cause security issues, for example leaking one tenant's data to another because the tool knows nothing about your architecture.

**The use case and the baseline**
Baz's spec reviewer compares requirements with implementation. It reads a ticket and a Figma design, then uses Playwright's MCP server to open the app on the branch, decide pass or fail, and save a screenshot as evidence. In a toy version, each iteration subclasses a base class with one `get tools` method. The V0 baseline loads all tools as-is through LangChain: 21 tools with descriptions like "Press a key on the keyboard." The run fails. The agent tries a made-up spec-reviewer URL, gets a 404, and botches the screenshot. He does not blame Playwright: a public server has to be generic.

**Five practices**
1. **Curate.** Drop tools the use case never needs (resize, drag, running code in the browser). 21 tools become 16, so the context window is smaller and the choice simpler.
2. **Wrap.** Replace generic descriptions with your own, from experience. For example: before click or hover, call the snapshot tool, which is really an accessibility snapshot listing buttons and menus in text, and prefer it over a visual screenshot. The wrapper just calls the original tool with a new description.
3. **Deterministic guardrails.** Agents ignore instructions ("needle in the haystack", "lost in the middle"), so enforce sensitive rules in code. Before the screenshot tool runs, the wrapper extracts the path or filename argument and checks it sits inside the screenshots root. On failure it does not crash the run. It returns an agent-facing message ("access is denied... save it here") so the agent retries correctly.
4. **Compose new tools.** An "evidence" tool built on the screenshot tool has its own description: use it only for final evidence, and put the ticket number in the filename. It can carry its own guardrails or deterministic pre-steps.
5. **Treat tools as plain functions.** Login is tricky, differs per client and involves secrets, yet every run needs it. So the code calls the MCP tools directly, injects JWT tokens into local storage, clicks login, and only then hands the logged-in browser to the agent.

**The final run**
With all changes, the agent navigates to the agents tab, finds the configuration drawer, returns a pass with reasoning, and saves a screenshot named with the ticket. The design was dark mode and the run was light mode; he notes the real product does pixel-perfect checks.

**Trade-offs**
There is "no one-size-fits-all." Curation shrinks context, while wrapping adds longer descriptions. Some steps should be deterministic, others flexible. You tinker until the tools fit.

## Why it matters
- A clear before-and-after case: the same public MCP server fails or succeeds depending on how its tools are curated and described.
- The five practices form a reusable checklist for anyone putting third-party MCP tools into production agents.
- The guardrail pattern (validate arguments in a wrapper, return an aligning error instead of raising) is a simple, general way to enforce security rules agents might ignore.
- Pulling deterministic steps such as authentication out of the agent loop shows where agentic control should stop.
- The accessibility-snapshot tip is a concrete browser-agent technique: text structure beats screenshots for navigation.

## Metadata
- Video: https://www.youtube.com/watch?v=U00AOI1eJUE
- Duration: 40:50
- Playlist index: 34
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]

## Transcript excerpt
> Hi everyone, and welcome to our talk today about bending a public MCP server without breaking it. But today we may have just broken it because our MCP server seems to have caught on fire. We're glad you're here. We need all the help we can get. Let's go through our talk and see how we can improve whatever is going on right here. I'm Hauser. I work at Buzz. We've been building AI powered code reviewers for the past few years now, as well as a bunch of other features, anything that can can make the lives of people at the R&D easier and better, whether they're devs, PMs, anything else. If it's Agentech, we're probably tinkering with it. But let's jump right in and start looking at what's going...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/U00AOI1eJUE.txt]]
- Description cue: Public MCP servers often look ready-to-use, until the reality of production hits. You might find your agents ignoring perfectly good tools, unwanted side-effects exhausting your container's...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://prezi.com/view/TSBwBXLNcXzzWrLbRiit>
