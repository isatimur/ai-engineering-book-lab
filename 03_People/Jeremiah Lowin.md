# Jeremiah Lowin

**Role:** Founder & CEO, Prefect  
**Organization:** Prefect  
**Themes:** [[MCP & Tooling]], [[Agent Architecture]]

## Overview

Jeremiah Lowin founded Prefect, a workflow orchestration platform. In AI engineering circles he is best known for a sharp critique of how MCP servers are being built — arguing that most are naive REST wrappers that will fail agents by giving them the wrong interface to act on the world.

## Appearances in corpus

- [[039-96G7FLab8xc-your-mcp-server-is-bad-and-you-should-feel-bad-jeremiah-lowin-prefect|#39 — Your MCP Server is Bad (and you should feel bad)]] (MCP & Tooling)

## Key claims / positions

- Most MCP servers are REST APIs renamed — they expose the wrong granularity of actions for agents.
- Good MCP tool design requires thinking about what an agent needs to accomplish a goal, not what a developer needs to call an endpoint.
- Tool schemas matter more than tool implementations: a well-designed schema is self-documenting to the LLM.
- Orchestration and tool-use are separable concerns; confusing them makes both worse.

## Manuscript relevance

Chapter 3 (tool design) — Lowin's critique is the sharpest formulation in the corpus of the "tools must be agent-native, not API-native" principle.
