---
video_id: HEFSExa0xl0
playlist_index: 824
title: "Teaching Coding Agents to do Spreadsheets - Nuno Campos, Witan Labs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=HEFSExa0xl0"
duration: "19:09"
duration_seconds: 1149
view_count: 4000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/HEFSExa0xl0.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Nuno Campos of Witan Labs describes four months of work that took coding agents from about 50% to 92% on an internal financial analysis benchmark for spreadsheets. A three-agent design and every spreadsheet representation tried (SQL, XML, CSV, HTML) were dead ends on their own. The breakthrough was replacing about 15 tools with one stateful Node.js REPL over a C# engine, which jumped accuracy to 74% and removed timeouts. High-fidelity formula and render engines close the verification loop. His lessons: many tool calls mean you invented a bad scripting language, build the feedback loop your domain lacks, prefer deterministic evals, and check traces for plumbing bugs."
---

# Teaching Coding Agents to do Spreadsheets - Nuno Campos, Witan Labs

## Summary
Nuno Campos of Witan Labs spent four months trying to make coding agents as good at spreadsheets as they are at Python or JavaScript. On an internal financial analysis benchmark they went from around 50% accuracy to 92%. The talk covers what moved the needle, what did not, and the dead ends.

**Why spreadsheets are hard**
A human opening an unknown Excel file sees structure at once: a revenue table, assumptions, a chart. An LLM sees none of it. Asked for revenue, it must work out which one (net, gross, which quarter or year) and whether the number is an input or a formula.

**Dead ends**
- A three-agent split around an edit agent with a five-step process (define the end state, plan, execute, verify). It moved errors into planning, where they were easier to fix, but it was too rigid: discovery ran once up front and context did not flow between agents.
- Nearly every way of representing a spreadsheet to an LLM. SQL and XML (the on-disk format) failed. CSV or TSV views of a range and HTML did not work alone but survived as pieces of the final design. HTML led to a render engine that shows the agent the spreadsheet as an image.

**The breakthrough: one REPL**
They replaced about 15 tools with a single Node.js REPL tool, where each old tool became a JavaScript function. JavaScript is easy to sandbox and familiar to LLMs, and he says Python would work as well. The spreadsheet code itself is in C#, so each language does what it is good at. Before, an agent made 10 to 15 sequential tool calls and often timed out, and parallel calls did not help because results could not be combined. He calls the REPL code mode with persistent state. Variables survive between calls, so agents wrote shorter scripts than the 50-line scripts common in pure code mode and put more reasoning between steps. New capabilities are just new methods plus a TypeScript type definitions file in the prompt. The REPL took accuracy from 50% to 74%. Fuzzy search, formula tracing, prompt work and bug fixes took it to 92%. With a 5-minute task limit, timeouts dropped to zero.

**Verification loop**
As with compilers and tests for code, agents need feedback. They built a formula engine and a render engine as the source of truth. The loop is only as good as the engine: one that implements half of Excel's formulas gives worse results, because correct formulas fail. The REPL is today's best interface and may give way to computer use. The verification loop is the durable part, and each of four or five model releases got more out of it.

**Domain knowledge, evals, plumbing**
Domain knowledge in the prompt survived every tool change. It reminds the model what to focus on rather than teaching it. Evals moved from LLM-as-judge only, where a score change could come from the judge, to deterministic checks where possible: feed the same inputs into a golden spreadsheet and the model's one and compare outputs. Many apparent reasoning failures were bugs, such as a wrong example in a prompt or a failing tool the model kept retrying.

## Why it matters
- 'You've kind of invented a bad scripting language' is a sharp test for when to swap many tools for code mode or a REPL, and the 50% to 74% jump gives a measured effect.
- The point that persistent REPL state leads to shorter scripts with more reasoning between them adds a concrete argument beyond plain code mode.
- Low-fidelity verifiers can make results worse, which is a useful caution for any team building simulators or checkers for agents.
- The golden-spreadsheet black-box test is a reusable pattern for deterministic evals of generated artifacts.
- Separating the changeable interface from the durable verification loop and domain prompt gives a way to decide where to invest as models change.

## Metadata
- Video: https://www.youtube.com/watch?v=HEFSExa0xl0
- Duration: 19:09
- Playlist index: 824
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Cool. Uh, hi everyone. My name is Nuno and I wanted to talk to you about how how we spent the last 4 months teaching coding agents to master spreadsheets. Um, so uh, essentially our goal was to get coding agents to be as good at spreadsheets as they are at, you know, Python, JavaScript, or whatever your favorite language is. Uh, we started at uh, around 50% accuracy on a financial analysis benchmark and got to 92%. So, I'll chat about what actually moved the needle and what didn't and dead ends and um, yeah, let's see. Uh, so spreadsheets are a little bit harder for AI than you might think at first. Um, if you uh, if you think about how you would, you know, if you open Excel, uh, how you'd...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/HEFSExa0xl0.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/witanlabs/research-log>
