# Chapter 7 — Security, Identity, and High-Stakes Trust

## Role in the book
Raise the cost of autonomy. Make clear that acting systems require more than helpfulness; they require identity, boundaries, and defensible control.

## Supporting source cluster
- [[031-AHtGAgQ0Q_Q-why-and-how-you-need-to-sandbox-ai-generated-code-harshil-agrawal-cloudflare|#31 — Why, and how you need to sandbox AI-Generated Code? — Harshil Agrawal, Cloudflare]]
- [[032-BurJvbqFr4c-your-insecure-mcp-server-won-t-survive-production-tun-shwe-lenses|#32 — Your Insecure MCP Server Won't Survive Production — Tun Shwe, Lenses]]
- [[037-VSdV-AdSlis-identity-for-ai-agents-patrick-riley-carlos-galan-auth0|#37 — Identity for AI Agents - Patrick Riley & Carlos Galan, Auth0]]
- [[086-TnSGx36Ly0Q-government-agents-ai-agents-meet-tough-regulations-mark-myshatyn-los-alamos-national-lab|#86 — Government Agents: AI Agents Meet Tough Regulations — Mark Myshatyn, Los Alamos National Lab]]
- [[148-Gi4V8viBGYQ-how-to-defend-your-sites-from-ai-bots-david-mytton-arcjet|#148 — How to defend your sites from AI bots — David Mytton, Arcjet]]
- [[149-CCsWZ5bJlO8-the-unofficial-guide-to-apple-s-private-cloud-compute-jmo-confsec|#149 — The Unofficial Guide to Apple’s Private Cloud Compute - Jmo, CONFSEC]]
- [[150-blmAkayzE8M-how-to-secure-agents-using-oauth-jared-hanson-keycard-passport-js|#150 — How to Secure Agents using OAuth — Jared Hanson (Keycard, Passport.js)]]
- [[152-w7IMuYsBNr8-openai-on-securing-code-executing-ai-agents-fouad-matin-codex-agent-robustness|#152 — OpenAI on Securing Code-Executing AI Agents — Fouad Matin (Codex, Agent Robustness)]]
- [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206 — From Copilot to Colleague: Trustworthy Agents for High-Stakes - Joel Hron, CTO Thomson Reuters]]
- [[211-6Tpm4m1YxHk-critical-ai-inference-your-cio-can-trust-sahil-yadav-hariharan-ganesan-telemetrak|#211 — Critical AI Inference your CIO can Trust — Sahil Yadav, Hariharan Ganesan, Telemetrak]]
- [[624-CD6R4Wf3jnY-what-we-learned-scaling-mcps-to-enterprise-karan-sampath-anthropic|#624 — What we learned scaling MCPs to Enterprise — Karan Sampath, Anthropic]]
- [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625 — Lessons from Scaling GitHub's Remote MCP Server — Sam Morrow, GitHub]]
- [[627-EmhRyw6xeT0-one-login-to-rule-them-all-cross-app-access-for-mcp-garrett-galow-workos|#627 — One Login to Rule Them All: Cross-App Access for MCP — Garrett Galow, WorkOS]]

## Strongest claims
1. The moment agents can act, identity and authorization move to the center.
2. Sandbox, least privilege, and auditability are product requirements, not security afterthoughts.
3. Protocol standardization expands the attack surface if governance lags.
4. High-stakes trust requires bounded autonomy plus traceability.
5. Enterprise MCP adoption pushes toward gateways, blessed platforms, and a root of trust.
6. Repeated per-tool OAuth flows are not just annoying; they are a governance and IT visibility problem.

## Useful quotes / excerpts
> "Identity for AI agents and how we authorize agents, MCP servers..." — [[037-VSdV-AdSlis-identity-for-ai-agents-patrick-riley-carlos-galan-auth0|Auth0 talk]]

> "Your insecure MCP server won't survive production." — [[032-BurJvbqFr4c-your-insecure-mcp-server-won-t-survive-production-tun-shwe-lenses|Tun Shwe]]

> "The really important thing for security teams ... is they need to establish a root of trust." — [[624-CD6R4Wf3jnY-what-we-learned-scaling-mcps-to-enterprise-karan-sampath-anthropic|Karan Sampath]]

> GitHub filtered tools by PAT scopes and used step-up OAuth to request additional privileges only when needed. — [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|Sam Morrow]]

> Cross-app access proposes the identity provider as a trust bridge so MCP clients and servers can obtain credentials without repeated manual consent flows. — [[627-EmhRyw6xeT0-one-login-to-rule-them-all-cross-app-access-for-mcp-garrett-galow-workos|Garrett Galow]]

## Open questions
- How security-heavy should the book become before it loses the primary engineering narrative?
- Is high-stakes legal work the best framing example, or does code-executing security resonate better?
- Which security principles belong in the main text versus sidebars/checklists?
- Should cross-app access be framed as a likely future pattern or as one possible enterprise path?
