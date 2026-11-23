---
video_id: 17-YSUHo6Lk
playlist_index: 1048
title: "Agentic SDLC at Uber — Uday Kiran Medisetty & Adam Huda, Uber"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=17-YSUHo6Lk"
duration: "18:26"
duration_seconds: 1106
view_count: 5900
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/17-YSUHo6Lk.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-25T01:52:29+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Uday Kiran Medisetty and Adam Huda describe Uber's path to a managed 'software factory', where over 70% of PRs now come from local or cloud agents and lines of code per engineer doubled year over year. Medisetty covers six building blocks: a model gateway (100M+ requests a day, PII redaction under 100 ms), an MCP gateway that cut token use over 40%, pre-warmed cloud dev environments, a 2,500-skill marketplace, a 40-million-entry context graph, and a company-wide assistant. Huda then follows a World Cup pickup feature from Slack idea to cloud-agent PR, inner-loop validation, self-healing CI and managed maintenance loops."
---

# Agentic SDLC at Uber — Uday Kiran Medisetty & Adam Huda, Uber

## Summary
Uday Kiran Medisetty and Adam Huda of Uber describe the company's "journey towards a managed software factory". Uber has a few thousand engineers across 12 global tech sites. Over the last year, more than 70% of its PRs have come from local or cloud agents, and lines of code per engineer doubled year over year. Automated migrations number more than 250 and cover 9 million lines of code. Medisetty credits six earlier years of moving to monorepos and Bazel as the foundation.

**Six building blocks (Medisetty)**
- **Model gateway.** One OpenAI- and Anthropic-compatible endpoint for every internal and external use case. Middleware handles identity, redacts 20+ PII types and runs an AI guard of five specialised safety models, all in under 100 ms. Every request is attributed per user, project and team, which enables spend limits and audit traces for benchmarking. It serves 800+ projects and more than 100 million model requests a day.
- **MCP gateway.** A crawler turns thousands of internal APIs into MCP servers with one config change. SaaS tools such as Google, Slack and Jira are hosted behind the same gateway, which does token exchange. To cut the "token tax", they moved from direct MCPs to a single discover-and-invoke MCP, then to a CLI projection, then to an auto-installed code-mode skill that writes Python scripts for the heaviest cases. With 1,000+ tools, this saved more than 40% fleet-wide.
- **Agent environments.** Cloud dev environments were "agentified" as pre-provisioned Kubernetes balloon pods with repos snapshotted and search indexes built, so agents start in seconds. A mega environment holds all repositories for cross-repo agents.
- **Skills.** Duplicated, hard-to-find, low-quality skills led to a managed marketplace of 2,500 skills with lint checks, automated review, one-command install and persona-based auto-install. It handles 20,000+ executions a day, and traces now feed back to skill authors.
- **Context graph.** Agents wasted tokens finding basic context across 20 to 30 systems. One graph with 150 node and edge types and 40 million entries links mobile apps, back end, data lake, design docs, Jira and incidents. A SQL question about cash trips in India used far fewer tokens, turns and less latency with the graph.
- **Assistant.** An internal assistant on Slack, CLI and web uses the skills, MCPs and graph. Teams can personalise it, with 300 personas in a month and 20,000+ sessions a day.

**One feature end to end (Huda)**
A World Cup idea, a better pickup spot away from stadium crowds, starts in Slack. The assistant does business research, drafts requirements (a North America rollout), Figma mock-ups for an A/B test and a code plan, which compresses weeks of alignment. A cloud coding agent then works across backend and front-end repos and stops at a draft PR to save CI load. Inner-loop checks now include visual validation (simulator screenshots compared with Figma) and staging integration tests. A fast medium-sized model does early review, and a stronger reasoning model does the deeper outer-loop review. CI self-heals. Each agent PR carries a table of the checks it passed, with screenshots, so reviewers can trust it.

**Maintenance and bottlenecks**
Services enroll in managed maintenance loops, such as feature-flag cleanup that removes the losing variant. Loops run on Sundays when CI capacity is free and limit how many diffs land on Monday morning. Landed or rejected diffs become labelled data to improve the skill. Monthly, incident reviews become new maintenance skills. The new bottlenecks are CI capacity, how many experiments can run, and deciding "should we build it" rather than "can we".

## Why it matters
- One of the few enterprise-scale data points on agent adoption: over 70% of PRs agent-generated, 100M+ model requests a day, 2,500 skills.
- The MCP token-tax progression (direct MCP, single meta-MCP, CLI projection, code mode) is a concrete path for cutting tool-context cost, with a 40% saving.
- Shows centralised gateways (model and MCP) as the place to enforce PII redaction, attribution and spend control.
- The context graph and the attached check table on agent PRs both address the same problem: agents need cheap context, and reviewers need cheap evidence.
- Managed, scheduled maintenance loops with diff caps are a practical guard against agents flooding humans and CI.

## Metadata
- Video: https://www.youtube.com/watch?v=17-YSUHo6Lk
- Duration: 18:26
- Playlist index: 1048
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hey uh let's get started. Uh good morning everyone. I'm Udai. I'm here with my colleague Adam. We'll talk about our journey towards manage software factory. And in the beginning in the first part of the talk I'll talk about the key building blocks that we are investing in. And later Adam's going to talk about how we take all of these blocks to build an end to-end cohesive solution for our engineers. To set some context, we have few thousand engineers across 12 global tech sites. Over the last year, all of the investments we made in agentic AI have led to more than 70% of our PRs now either by local or cloud agents. And all of this led to twice the number of lines of code per...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/17-YSUHo6Lk.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
