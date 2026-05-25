---
video_id: "CEvIs9y1uog"
playlist_index: 83
title: "Don't Build Agents, Build Skills Instead – Barry Zhang & Mahesh Murag, Anthropic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=CEvIs9y1uog"
duration: "16:22"
duration_seconds: 982
view_count: 1174164
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/CEvIs9y1uog.txt"
themes:
  - "MCP & Tooling"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T11:22:12+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Barry Zhang and Mahesh Murag (Anthropic) argue that the agent scaffolding layer has converged and Claude Code is already a general-purpose agent — the remaining gap is domain expertise, not capability. Their solution: Agent Skills, organized collections of files (folders with SKILL.md, scripts, and assets) that package procedural knowledge agents can progressively load at runtime. The central insight is that skills protect the context window — only metadata is shown until the agent decides it needs a skill — enabling hundreds of composable skills without front-loading the context. Within five weeks of launch: thousands of skills created by users including non-technical finance, legal, and recruiting teams. The computing analogy is pointed: models are processors, agent runtimes are operating systems, skills are applications — and anyone can build them by putting stuff in a folder."
---
# Don't Build Agents, Build Skills Instead – Barry Zhang & Mahesh Murag, Anthropic

## Summary
Barry Zhang and Mahesh Murag from Anthropic gave this talk roughly five weeks after launching Agent Skills, at which point thousands of skills had already been created. The talk is both a product announcement and an architectural argument about where the agent ecosystem is heading.

**The convergence thesis**
The presenters argue that the agent infrastructure layer has converged: MCP became the standard for tool connectivity, Claude Code proved that a general-purpose agent with bash and a file system can handle tasks across domains (finance reports, code, documents), and the SDK provides a production-ready agent out of the box. The remaining gap is not scaffolding — it is domain expertise.

**The tax accountant analogy**
The central framing: you want Barry (experienced tax professional) doing your taxes, not Mahesh (300 IQ genius who would re-derive the 2025 tax code from first principles). Current agents are Mahesh — brilliant but missing the consistent execution and institutional knowledge that makes work reliable. Skills are designed to give agents the Barry property.

**What skills actually are**
Skills are folders. Deliberately simple: a SKILL.md with core instructions and a directory map, optional scripts as tools, and other assets. They work with git, Google Drive, zip files. No new primitives required. Simplicity is intentional — anyone, human or agent, can create and consume them using any computer.

**Progressive disclosure as the key design constraint**
At runtime, only skill metadata (name + one-line description) is shown. When an agent decides it needs a skill, it reads the full SKILL.md and files. This means you can equip an agent with hundreds of skills without blowing the context window — skills are fetched on demand, not frontloaded. Scripts inside skills live in the file system until needed, rather than always occupying context.

**The ecosystem five weeks in**
Three categories of skills emerged: foundational (e.g., Anthropic's own document creation skills; Cadence's bioinformatics EHR analysis skills), ecosystem/partner (Browserbase's Stagehand web automation skill; Notion's workspace skills), and enterprise (Fortune 100 companies using skills to encode organizational best practices; developer productivity teams serving tens of thousands of developers encoding code-style standards). Non-technical users in finance, legal, and recruiting are creating skills — the first signal that skills lower the barrier to extending agents beyond engineering.

**The architecture that is emerging**
The presenters sketch a converging general architecture: an agent loop managing context, coupled with a runtime environment (file system + code execution), connected to MCP servers for external data, equipped with a library of hundreds or thousands of skills pulled in at runtime. This is already how Anthropic deployed Claude to financial services and life sciences after launch — a fixed agent + domain-specific MCP servers + domain-specific skill library.

**Skills as a path to continuous learning**
Claude can already create skills via the Skill Creator skill. The vision: skills are a structured format for memory such that anything Claude writes down can be used by a future version of itself. Day 30 Claude knows your team's practices; a new joiner's Claude is already trained on your org. As the ecosystem grows, skills built by others compound your own agent's capabilities — analogous to how MCP servers built by others already do.

**The computing stack analogy**
Models = processors (massive investment, limited alone). Agent runtimes = operating systems (orchestrating resources around the processor). Skills = applications (where the real value is created, by millions of developers encoding domain expertise). The application layer is where Google and Meta can't dominate — it's where everyone builds.

## Why it matters
- Progressive disclosure is the specific mechanism that makes hundreds of composable skills viable without context window exhaustion — a reusable pattern for any multi-skill agent architecture.
- The non-technical adoption signal (finance, legal, recruiting) is early evidence that skills lower the agent extensibility barrier below the "must be a developer" threshold.
- The continuous learning path (skills as structured memory, agent-created skills) is the most explicit Anthropic statement about how Claude's in-context learning compounds over time.
- The MCP + skills architecture described here is already live in production (financial services, life sciences launches) — not a roadmap item.

## Metadata
- Video: https://www.youtube.com/watch?v=CEvIs9y1uog
- Duration: 16:22
- Playlist index: 83
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [music] All right, good morning and thank you for having us again. Last time we were here, we're still figuring out what an agent even is. Today, many of us are using agents on a daily basis. But we still notice gaps. We still have slots, right? Agents have intelligence and capabilities, but not always expertise that we need for real work. I'm Barry. This is Mahes. We created agent skills. In this talk, we'll show you why we stopped building agents and started building skills instead. A lot of things have changed since our last talk. MCP became the standard for agent connectivity. Cloud Code, our first coding agent, launched to the world and our cloud agent SDK now provides a production...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/CEvIs9y1uog.txt]]
- Description cue: In the past year, we've seen rapid advancement of model intelligence and convergence on agent scaffolding. But there's still a gap: agents often lack the domain expertise and specialized knowledge...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Org Design & Leadership**.
