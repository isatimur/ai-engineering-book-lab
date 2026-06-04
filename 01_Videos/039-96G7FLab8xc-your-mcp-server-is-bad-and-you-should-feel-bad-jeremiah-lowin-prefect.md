---
video_id: "96G7FLab8xc"
playlist_index: 39
title: "Your MCP Server is Bad (and you should feel bad) - Jeremiah Lowin, Prefect"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=96G7FLab8xc"
duration: "54:33"
duration_seconds: 3273
view_count: 17929
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/96G7FLab8xc.txt"
themes:
  - "MCP & Tooling"
ingested_at: "2026-04-24T10:51:09+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jeremiah Lowin (Prefect / fastmcp) argues that most MCP servers are bad products masquerading as good APIs. The core failure: builders copy REST API design conventions that work for human developers but actively harm agents. Agents discover tools on every invocation (expensive), cannot iterate cheaply, and have severely limited context — so MCP design must optimize for none of the things a REST API optimizes for. Five principles: outcomes over operations, flatten arguments, document everything, treat errors as prompts, and curate the token budget ruthlessly."
---
# Your MCP Server is Bad (and you should feel bad) - Jeremiah Lowin, Prefect

## Summary

Jeremiah Lowin is the founder of Prefect and creator of fastmcp — the de facto standard library for building MCP servers (1.5M downloads/day at time of talk). That vantage point gives him an unusually broad empirical view of what bad MCP servers look like at scale.

The core argument: agents are not developers. Three dimensions separate them from humans using APIs — **discovery, iteration, and context**. Humans discover an API once; agents re-enumerate every tool on every invocation, consuming tokens each time. Humans iterate quickly; agents pay full context cost on every round trip. Humans have rich long-term memory; agents have a context window. Any MCP server designed as if it were a REST API ignores all three constraints and will fail agents accordingly.

**The five actionable design principles:**

1. **Outcomes over operations.** Don't expose atomic API endpoints — expose agent stories. Instead of three separate calls (get user → filter orders → check status), expose one tool: `track_latest_order(email)`. The agent shouldn't be your orchestrator; you know the algorithm, so encode it. "One tool equals one agent story."

2. **Flatten your arguments.** Nested dicts and complex objects force agents to invent structure and correlate schemas across context. Use top-level primitives. Use `Literal` or `enum` types for constrained choices — agents follow type constraints more reliably than prose descriptions.

3. **Instructions are not optional.** Undocumented tools get guessed at. Document the server, every tool, every argument. Examples act as implicit contracts: an example with two tags means you'll almost always get exactly two tags back, regardless of any instruction to use more. Examples are powerful but are interpreted as patterns, not just illustrations.

4. **Errors are prompts.** Agents don't receive HTTP status codes — they receive text injected into context. An uninformative error (`ValueError: invalid input`) sends the agent into a retry loop with no new information. Rich, actionable error messages are free documentation and literally become the agent's next prompt. Consider progressive disclosure: let the first error teach the agent how to succeed on the second attempt.

5. **Curate the token budget.** Discovery costs tokens. A server with 50 tools the agent will only use 2 of is burning the most scarce resource on every session start. "Curate" is the most important word for MCP server designers. The GitHub MCP server reportedly ships ~200k tokens on handshake — that is a product design failure, not an API design failure.

**Additional notes:** the MCP `readonly` annotation signals no side effects; ChatGPT uses it for permission prompting. Block and GitHub have published MCP design playbooks that Lowin endorses. Client non-compliance (Claude Desktop sending structured arguments as strings) is an ongoing ecosystem problem that server builders must defensively accommodate.

## Why it matters

Lowin's framework reframes MCP server design from a technical exercise into a product design discipline — his term is "agentic product design." The analogy to human UX is exact: you wouldn't expose a raw database schema as a user interface; don't expose a raw REST API as an agent interface. This is the most comprehensive, actionable treatment of MCP tool design in the corpus.

## Metadata
- Video: https://www.youtube.com/watch?v=96G7FLab8xc
- Duration: 54:33
- Playlist index: 39
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]
- [[Agent Architecture]]

## Key claims (for claims ledger)
- Most MCP servers copy REST API conventions that are actively harmful for agents.
- Agents re-discover tools on every session start; discovery is never free, always token-expensive.
- Errors from MCP tools are injected directly into the agent's context — design them as prompts.
- Examples in tool documentation act as implicit contracts for output structure (e.g., number of items).
- The single most important word for MCP server designers is "curate."

## Book angles
- Chapter 3: Tool design and the MCP layer — primary source for agent-native interface design principles.
- Chapter 7: Reliability — bad tool design is a hidden reliability risk (agents retry on confusion, filling context with noise).
- Chapter 8: Constrained delegation — the `readonly` annotation as a lightweight permission primitive.
