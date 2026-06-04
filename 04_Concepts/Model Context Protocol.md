# Model Context Protocol

## Working definition
Model Context Protocol (MCP) is an emerging interface layer for exposing tools, data, and capabilities to models through standardized contracts rather than ad hoc custom integrations.

## Core synthesis
In the corpus, MCP matters less as a specific branded standard and more as a signal of architectural convergence. Teams want a common way to present actions and resources to models. This reduces glue code, improves interoperability, and makes tool ecosystems more composable. The strategic importance is that tool access is becoming an application layer.

But the newer material sharpens a second point: **standardization creates a context-management and governance problem as much as an integration benefit**. Once tools are easy to expose, teams quickly run into tool overload, context-window blowups, poor discoverability, weak observability, and fragmented identity flows. Standardizing the doorway does not make the room safe — or even navigable.

## What this concept is really about
- Turning tool integration into a reusable interface problem.
- Decoupling model-facing capabilities from bespoke per-app wiring.
- Making agent environments more portable and composable.
- Surfacing new security and governance requirements.
- Forcing explicit design of discovery, reduction, and authorization layers.

## Recurring patterns in the corpus
1. **Protocols accelerate ecosystem formation.**
2. **Tool quality becomes visible debt.** Bad server design leads directly to bad agent behavior.
3. **Security cannot be bolted on later.** Identity and authorization matter as soon as tools can act.
4. **Discovery and usability matter.** A standardized tool is not automatically a usable tool.
5. **MCP fits into a larger runtime story.** It is one layer among harnesses, workflows, memory, and control planes.
6. **Naive MCP creates a mega-context problem.** Dumping every endpoint into context makes the protocol self-defeating.
7. **Enterprise adoption wants a root of trust.** Decentralized server creation still pushes organizations toward a gateway, blessed platform, or identity hub.

## Important distinctions
### MCP is not the whole runtime
It standardizes tool and resource access, but not every concern about planning, orchestration, durability, or evaluation.

### Exposure is not permission
Making a tool available to a model does not answer what it may do, on whose behalf, and under what audit trail.

### Tool count is not capability
More tools can make systems worse if discovery, grouping, and intent encoding are weak.

## Design implications
- Treat schema and capability design as UX for models.
- Require identity, authorization, and logging around exposed tools.
- Curate tool sets per workflow rather than dumping everything into one surface.
- Measure tool utility and misuse, not just protocol compliance.
- Add progressive discovery, grouping, and context-reduction strategies.
- Prefer a trusted gateway or equivalent control layer in enterprise settings.
- Reduce repeated auth friction through shared identity patterns when possible.

## Why it matters for the book
MCP gives the book a concrete way to discuss the emerging agent stack. It helps explain why the future of AI systems depends on interfaces between models and real environments, not just better chat. The late-corpus twist is that MCP is not only about interoperability; it is also about **how context, trust, and authorization are operationalized once interoperability works**.

## Source cluster
- [[011-8txf05vVVl4-code-mode-let-the-code-do-the-talking-sunil-pai-cloudflare|#11 — Code Mode: Let the Code do the Talking - Sunil Pai, Cloudflare]]
- [[012-v3Fr2JR47KA-the-future-of-mcp-david-soria-parra-anthropic|#12 — The Future of MCP — David Soria Parra, Anthropic]]
- [[032-BurJvbqFr4c-your-insecure-mcp-server-won-t-survive-production-tun-shwe-lenses|#32 — Your Insecure MCP Server Won't Survive Production — Tun Shwe, Lenses]]
- [[034-U00AOI1eJUE-bending-a-public-mcp-server-without-breaking-it-nimrod-hauser-baz|#34 — Bending a Public MCP Server Without Breaking It — Nimrod Hauser, Baz]]
- [[037-VSdV-AdSlis-identity-for-ai-agents-patrick-riley-carlos-galan-auth0|#37 — Identity for AI Agents - Patrick Riley & Carlos Galan, Auth0]]
- [[039-96G7FLab8xc-your-mcp-server-is-bad-and-you-should-feel-bad-jeremiah-lowin-prefect|#39 — Your MCP Server is Bad (and you should feel bad) - Jeremiah Lowin, Prefect]]
- [[083-CEvIs9y1uog-don-t-build-agents-build-skills-instead-barry-zhang-mahesh-murag-anthropic|#83 — Don't Build Agents, Build Skills Instead – Barry Zhang & Mahesh Murag, Anthropic]]
- [[176-wXVvfFMTyzY-a2a-mcp-workshop-automating-business-processes-with-llms-damien-murphy-bench|#176 — A2A & MCP Workshop: Automating Business Processes with LLMs — Damien Murphy, Bench]]
- [[622-YBYUvGOuotE-mcp-mega-context-problem-matt-carey|#622 — MCP = Mega Context Problem - Matt Carey]]
- [[624-CD6R4Wf3jnY-what-we-learned-scaling-mcps-to-enterprise-karan-sampath-anthropic|#624 — What we learned scaling MCPs to Enterprise — Karan Sampath, Anthropic]]
- [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625 — Lessons from Scaling GitHub's Remote MCP Server — Sam Morrow, GitHub]]
- [[627-EmhRyw6xeT0-one-login-to-rule-them-all-cross-app-access-for-mcp-garrett-galow-workos|#627 — One Login to Rule Them All: Cross-App Access for MCP — Garrett Galow, WorkOS]]

## Open questions
- Will MCP-like interfaces consolidate into a durable standard or fragment by vendor/runtime?
- What is the right permission model for delegated tool use?
- How should teams certify third-party tool surfaces before exposing them to agents?
- Where should progressive discovery live: client, server, gateway, or all three?
- Does enterprise MCP settle around protocol purity, or around managed gateways plus identity infrastructure?
