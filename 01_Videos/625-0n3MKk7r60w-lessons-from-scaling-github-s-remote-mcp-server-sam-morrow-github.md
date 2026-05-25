---
video_id: 0n3MKk7r60w
playlist_index: 625
title: "Lessons from Scaling GitHub's Remote MCP Server — Sam Morrow, GitHub"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=0n3MKk7r60w"
duration: "20:34"
duration_seconds: 1234
view_count: 2026
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/0n3MKk7r60w.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-04-29T22:48:23+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sam Morrow (GitHub MCP server lead) shares hard production lessons from scaling to ~8 million tool calls a week. Key claims: more tools hurt agents (GitHub hit 100+ tools, agents got worse); every elegant opt-in solution was ignored because users never change defaults; a 49% context reduction came from usage-pattern analysis, not guesswork; and dynamic client registration for OAuth is a 'well-intentioned mistake' GitHub rejected. The server now instantiates a fresh SDK server object per request — no session affinity — which is how it scales horizontally. Security (plain-text PATs everywhere, prompt-injection exfil attacks) remains unsolved and applies to all MCP setups, not just GitHub's."
---

# Lessons from Scaling GitHub's Remote MCP Server — Sam Morrow, GitHub

## Summary

Sam Morrow leads development of GitHub's MCP server, which launched publicly in April 2024, became the most-starred repo on GitHub that week, and now serves close to 8 million tool calls per week with 11 million Docker downloads of the stdio server, 126 contributors, and ~30,000 stars.

**Too many tools hurt agents.** After community contributions rapidly expanded the server to 100+ tools, agents got noticeably worse — context windows blew out faster, models got confused and forgetful. LangChain had already published research in February showing this exact failure mode. GitHub's problem was that platform coverage (repos, issues, PRs, Actions, Projects, and more) inherently requires many tools, but agents can't handle all of them loaded simultaneously.

**Users don't configure, they use defaults.** GitHub tried several elegant solutions: tool sets (grouping related tools for users to select), dynamic tool selection (agents discover sets in chunks), and even a RAG-based semantic tool search. None were widely adopted because most users never touched the JSON config. The lesson: any solution that requires user configuration will be used by a minority. GitHub eventually focused on shrinking the default set rather than building opt-in alternatives, achieving a 49% reduction in initial context load by analyzing actual usage patterns, then cutting output tokens further (list-pull-requests lost 75% of its output tokens by trimming fields).

**Stateless horizontal scaling with per-request server instances.** Rather than a single stateful MCP process, GitHub builds a new SDK server instance on every request and adds the user's permitted tools to it at startup. Redis stores session data (used primarily to identify self-reported client identity for analytics). This architecture handles horizontal scaling without session affinity.

**Security: the "lethal trifecta" applies everywhere.** Prompt-injection exfil attacks (Invariant Labs demonstrated one specifically naming GitHub's server) work against almost any MCP+agent setup with read + write tools available. Users routinely store long-lived, over-privileged plain-text PATs in locations agents can access. GitHub's mitigations: OAuth 2.1 with PKCE support (they helped add PKCE to GitHub's auth server), step-up OAuth scopes so tool calls can request elevated permissions interactively rather than failing, and PAT-scope-based tool filtering (connect with a read-only PAT, get only read-only tools). Dynamic client registration was evaluated and rejected as creating unbounded app-database growth.

**What's coming.** Morrow expects tool counts in the thousands to become normal once the MCP spec solves tool-grouping and client-level filtering. He predicts OAuth setup and tool selection will become fully autonomous, and tool use will shift toward compositional/piped patterns (referencing Cloudflare's code-mode and Anthropic's tool-search API).

## Why it matters
- The "users ignore elegant opt-in solutions" finding generalizes beyond MCP: product decisions that require configuration will cluster at defaults.
- The 49% context reduction via usage-pattern analysis (not guesswork) is a concrete, repeatable method for trimming MCP server context.
- The stateless per-request server pattern is a directly reusable architecture for anyone building production MCP servers that need to scale horizontally.
- Security: the prompt-injection exfil problem is structural, not a GitHub-specific bug — important framing for any chapter on MCP in production.

## Metadata
- Video: https://www.youtube.com/watch?v=0n3MKk7r60w
- Duration: 20:34
- Playlist index: 625
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> All right. Hello, London. >> [applause] >> And I hope everyone's been enjoying the AI Engineer Europe so far. For there's so many amazing speakers. I've been like watching talks and talking to people for days now and it's been immense. I'm Sam. I lead development of GitHub's MCP server and yeah, I'm here to talk about mostly challenges we've faced building and scaling our remote server, how we've overcome them, and uh before I will start, I just like I like messing with people. So, you know, here quick show of hands, who's used an MCP server? Good. Good. Uh who's used GitHubs? Who has a hot take on GitHub? >> [laughter] >> And uh yeah, does anyone build a server or client? Oh,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/0n3MKk7r60w.txt]]
- Description cue: GitHub operates one of the most heavily-utilised MCP servers in the ecosystem, with over 4 million downloads of the stdio server alone. Discover the architectural decisions, technical challenges and lessons learned while building and scaling a remote MCP server on production infrastructure. The session walks through the journey from initial implementation to horizontal scaling, covering the specific challenges of condensing a platform as expansive as GitHub into a coherent MCP interface. Attendees will learn practical strategies for managing tool overload, optimizing context usage, implementing distributed session storage, and maintaining observability without compromising user privacy. Whether building a first remote server or optimizing an existing implementation, attendees will gain concrete patterns, anti-patterns, and architectural guidance from real production experience.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
