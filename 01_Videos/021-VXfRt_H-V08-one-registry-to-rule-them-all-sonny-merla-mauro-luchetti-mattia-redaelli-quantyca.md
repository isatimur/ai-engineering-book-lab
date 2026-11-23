---
video_id: "VXfRt_H-V08"
playlist_index: 21
title: "One Registry to Rule them All - Sonny Merla, Mauro Luchetti, & Mattia Redaelli, Quantyca"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=VXfRt_H-V08"
duration: "22:47"
duration_seconds: 1367
view_count: 3019
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/VXfRt_H-V08.txt"
themes:
  - "MCP & Tooling"
ingested_at: "2026-04-24T10:50:25+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sonny Merla (Amplifon) with Mauro Luchetti and Mattia Redaelli (Quantyca) show how Amplifon, a hearing-care company in 26 countries with 10,000+ stores, stopped dozens of teams from rebuilding their own agent plumbing. Their thesis: governance at scale needs one AI gateway plus three linked registries (MCP servers, A2A agent cards, and use cases), fed automatically by CI/CD from template repositories. Enterprise metadata such as ownership, environment, auth model, cost attribution and use-case linkage turns a catalog into impact analysis and lineage, so the team can trace which use cases break when a model or server fails."
---
# One Registry to Rule them All - Sonny Merla, Mauro Luchetti, & Mattia Redaelli, Quantyca

## Summary
Sonny Merla, Global Data Science and AI Manager at Amplifon, opens with the problem: dozens of teams on three continents build AI agents, and each one wires its own connections, security model and infrastructure. "You get chaos." Mauro Luchetti (AI Center of Excellence Manager) and Mattia Redaelli (AI Engineer) from Quantyca, the team that built the solution, then walk through the architecture and a demo.

**The operating model first**
Amplifon launched the Amplify program in January 2025. A small "control tower" sets security, legal, technology and strategy guidelines and picks the first use cases. A committee runs the strategy in countries and at corporate level. The program has three pillars: governance, platform and factory. Merla names three problems it must solve: short LLM life cycles (be ready to act when a model changes), governance and compliance (know where AI runs, for regulators and for lineage), and enterprise scaling across teams on different infrastructures.

**One gateway, three registries**
- **AI gateway**: one endpoint for every model in the company catalog, with identity-provider authentication, per-use-case budgets (monthly or weekly) that "erode" as developers spend, and central audit and monitoring of all requests and responses.
- **MCP registry**: a private extension of the community's official MCP registry. It holds internal servers plus a curated set of approved public servers.
- **A2A registry**: built on the agent card standard (identity, endpoint, capabilities, modalities, auth requirements). Agents publish their card automatically on deploy, so agent development becomes "self-documenting".
- **Use case registry**: links each use case to the agents, MCP servers and models it uses, and to the systems it touches.

**Metadata as the governance engine**
Each registered server carries ownership, environment (dev, test, prod), authentication model, cost attribution and use-case linkage. Luchetti stresses these are not nice-to-have fields. They enable impact analysis and a complete audit trail of what AI tooling exists and who uses it.

**Demo and developer path**
Redaelli shows the catalog with demo data: use case pages with status, version, assets and life cycle history; a lineage view (for example a ticket-optimization use case linked to two agents and its models) to find affected use cases during an outage; an inspector that connects to an MCP server or checks A2A card compatibility; and form-based wizards that generate server.json files and agent cards. Two GitHub template repositories (one MCP, one A2A) ship FastAPI boilerplate, Dockerfiles, auth, cost tracking and a platform-level observability integration for tracing and evals. The A2A blueprint is framework-agnostic: it defines interfaces and ports, and teams plug in their framework of choice. Tagging a branch triggers a GitHub Action that pushes the Docker image and publishes the metadata to the registry. At runtime, agents call MCP and A2A proxies through the gateway, which resolve the backend URL from the catalog. The platform is still in progress and not yet in production.

## Why it matters
- A concrete enterprise reference architecture for MCP and A2A sprawl: gateway on top, three registries linked by a use-case layer.
- Shows that the useful part of a registry is its metadata (owner, environment, cost, use-case links), because it powers impact analysis when a model or server fails.
- Publishing agent cards and server.json from CI/CD keeps the catalog true without manual upkeep.
- Template repositories with auth, cost tracking and observability built in are the lever that makes central governance cheap for product teams.
- Pairs a technical platform with an explicit operating model (control tower plus committee), a useful case for chapters on org design for AI.

## Metadata
- Video: https://www.youtube.com/watch?v=VXfRt_H-V08
- Duration: 22:47
- Playlist index: 21
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]

## Transcript excerpt
> What happens when you have dozen of teams across three continents all building AI agents, each one wiring up their own connections, reinventing their own security model, deploying their own infrastructures? You get chaos. Hi, I'm Sonny Merla, Global Data Science and AI Manager at Amplifon, and I'm here today with Mauro Luchetti, AI Center of Excellence Manager, and Mattia Redaelli, AI Engineer at Quantica, the team that design and build the technical solution that we are about to describe. Today, we are going to show you how Amplifon tackled down this problem by launching their own Amplify program, and specifically how we design an enterprise-grade registry system for MCP and A2A agents....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/VXfRt_H-V08.txt]]
- Description cue: As internal MCP servers and A2A agents explode in number, discovery and governance become critical challenges for production-grade AI systems. We'll demonstrate how we built an enterprise infrastru...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://quantyca-my.sharepoint.com/:b:/g/personal/mauro_luchetti_quantyca_it/IQBUCcMBzsAfSZtJXrCdaqV0AaUyDhifxP360fqCUupyaGc>
