# Chapter Starter — Chapter 7: Security, Identity, and High-Stakes Trust

## Working chapter promise
Once AI systems can act, trust stops being a vague feeling about model quality and becomes a concrete question of boundaries: who the agent is, what it can access, what it is allowed to do, how its actions are constrained, and what evidence remains afterward.

## Possible opening
For most of software history, security teams could treat the interface and the execution path as reasonably separate things. A user clicked a button. A backend enforced permissions. A developer called an API. The system did not improvise much in between. Agentic systems weaken that comfort.

An agent does not only receive requests; it interprets intent, chooses tools, traverses multiple systems, and may keep working after the human has stopped watching. That means the old security question — "can this user access this resource?" — becomes a larger one: "can this delegated actor decide, retrieve, execute, and continue safely on this user's behalf?" The moment work crosses that line, prompt quality is no longer the main source of trust. Identity, permissions, sandboxing, gateways, traceability, and approval surfaces move to the center.

This is why so many recent talks sound less like product demos and more like control-system design. The speakers are not mainly asking how to expose more tools. They are asking how to keep tool use bounded once exposure becomes easy. They are not only asking how to make agents powerful. They are asking how to make that power legible, revocable, and safe under real organizational risk.

## Draft throughline
The chapter should move from **"tool access creates new attack surfaces"** to **"high-stakes trust comes from identity, constraint, and auditable delegation."**

## Section skeleton

### 7.1 Agency changes the security unit from requests to delegated workflows
**Draft direction:**
The chapter should open by reframing the problem. A traditional integration executes a fairly explicit call path. An agentic system may interpret the task, fan out into tools, retry, and continue over time. This expands the trust boundary from one API call to a workflow that mixes model judgment with system permissions.

**Source anchors:**
- [[152-w7IMuYsBNr8-openai-on-securing-code-executing-ai-agents-fouad-matin-codex-agent-robustness|#152]]
- [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206]]
- [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625]]

**Key move:**
Explain that the risk surface is no longer only the tool endpoint. It is the full delegated path from intent to action to follow-up behavior.

### 7.2 Sandboxing and least privilege are not implementation details
**Draft direction:**
Fouad Matin gives the chapter one of its clearest hard edges: code-executing agents should be sandboxed, and control should not live only at the model layer. This section should insist on a layered view of safety: model behavior matters, but deterministic system controls matter more once an agent can run code or invoke powerful tools.

**Source anchors:**
- [[031-AHtGAgQ0Q_Q-why-and-how-you-need-to-sandbox-ai-generated-code-harshil-agrawal-cloudflare|#31]]
- [[150-blmAkayzE8M-how-to-secure-agents-using-oauth-jared-hanson-keycard-passport-js|#150]]
- [[152-w7IMuYsBNr8-openai-on-securing-code-executing-ai-agents-fouad-matin-codex-agent-robustness|#152]]

**Key move:**
Make the argument that good security architecture assumes the model can be manipulated and therefore puts real boundaries in the runtime, OS, token scope, and execution environment.

### 7.3 Standardized tool access creates a governance problem, not just an integration win
**Draft direction:**
The MCP cluster is useful here because it keeps the book honest. Standardized tool contracts make integration easier, but the later talks repeatedly show that this also multiplies enterprise concerns: security, observability, access control, tool overload, privacy, and discoverability. This section should push against protocol triumphalism.

**Source anchors:**
- [[032-BurJvbqFr4c-your-insecure-mcp-server-won-t-survive-production-tun-shwe-lenses|#32]]
- [[624-CD6R4Wf3jnY-what-we-learned-scaling-mcps-to-enterprise-karan-sampath-anthropic|#624]]
- [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625]]

**Key move:**
Argue that interoperability shifts the bottleneck upward: from wiring tools to governing how they are exposed, grouped, inspected, and authorized.

### 7.4 Enterprise trust tends to collapse toward gateways, policy layers, and roots of trust
**Draft direction:**
Karan Sampath and Garrett Galow together provide a strong structural insight: once many tools and many identities are involved, enterprises tend to want a trusted mediation layer. Whether called a gateway, identity hub, or policy plane, the pattern is similar. The system needs one place to mediate auth, access control, logging, and shared policy.

**Source anchors:**
- [[037-VSdV-AdSlis-identity-for-ai-agents-patrick-riley-carlos-galan-auth0|#37]]
- [[624-CD6R4Wf3jnY-what-we-learned-scaling-mcps-to-enterprise-karan-sampath-anthropic|#624]]
- [[627-EmhRyw6xeT0-one-login-to-rule-them-all-cross-app-access-for-mcp-garrett-galow-workos|#627]]

**Key move:**
Show why the dream of frictionless tool access keeps reintroducing the need for centralized trust infrastructure.

### 7.5 Identity for agents is really about delegated authority
**Draft direction:**
This section should make identity feel concrete rather than abstract. The hard problem is not merely authenticating the human. It is safely carrying that authority across multiple systems while preserving scope, revocation, and auditability. Garrett Galow's "consent screens on top of consent screens" framing can do real rhetorical work here.

**Source anchors:**
- [[037-VSdV-AdSlis-identity-for-ai-agents-patrick-riley-carlos-galan-auth0|#37]]
- [[150-blmAkayzE8M-how-to-secure-agents-using-oauth-jared-hanson-keycard-passport-js|#150]]
- [[627-EmhRyw6xeT0-one-login-to-rule-them-all-cross-app-access-for-mcp-garrett-galow-workos|#627]]

**Key move:**
Translate identity into plain language: the system must know on whose behalf the agent acts, what powers it holds, how long those powers last, and how they can be withdrawn.

### 7.6 High-stakes trust depends on inspectability, not just prevention
**Draft direction:**
Security is often narrated as blocking bad actions, but the stronger book framing is broader: trustworthy systems also preserve evidence. Joel Hron's trajectory framing and the observability material make this section possible. In high-stakes domains, being able to reconstruct what the agent did is part of the product.

**Source anchors:**
- [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206]]
- [[628-_fQ7Z_Wfouk-why-building-eval-platforms-is-hard-phil-hetzel-braintrust|#628]]
- [[655--aM2EDTiaMs-everything-you-need-to-know-about-agent-observability-danny-gollapalli-and-ben-hylak-raind|#655]]

**Key move:**
Argue that audit trails, trajectory views, and reviewable histories are how organizations convert bounded autonomy into something they can actually trust.

## Candidate closing paragraph
The future of secure AI systems will not be won by the teams that merely expose the most tools. It will be won by the teams that make delegated power bounded, attributable, and inspectable. That means agents with real identities, narrow permissions, sandboxed execution, mediated access layers, and histories that can be reviewed after the fact. In low-stakes settings, those controls may feel heavy. In high-stakes settings, they are the only reason the system deserves trust at all.

## Fresh tensions worth preserving
1. **Interoperability vs governance:** the easier it becomes to connect tools, the more pressure builds for gateways, policy layers, and access control. ([[624-CD6R4Wf3jnY-what-we-learned-scaling-mcps-to-enterprise-karan-sampath-anthropic|#624]], [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625]])
2. **Agent usefulness vs least privilege:** useful agents need meaningful access, but meaningful access raises the blast radius of prompt injection and model mistakes. ([[152-w7IMuYsBNr8-openai-on-securing-code-executing-ai-agents-fouad-matin-codex-agent-robustness|#152]], [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206]])
3. **Debuggability vs privacy:** rich traces help trust and improvement, but deep observability can become its own data exposure problem. ([[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625]], [[655--aM2EDTiaMs-everything-you-need-to-know-about-agent-observability-danny-gollapalli-and-ben-hylak-raind|#655]])
4. **Distributed convenience vs centralized trust:** developers like direct connections; enterprises keep reinventing trusted chokepoints. ([[624-CD6R4Wf3jnY-what-we-learned-scaling-mcps-to-enterprise-karan-sampath-anthropic|#624]], [[627-EmhRyw6xeT0-one-login-to-rule-them-all-cross-app-access-for-mcp-garrett-galow-workos|#627]])
5. **Model controls vs system controls:** prompt-level safeguards matter, but runtime and OS boundaries are what actually fail closed. ([[152-w7IMuYsBNr8-openai-on-securing-code-executing-ai-agents-fouad-matin-codex-agent-robustness|#152]])