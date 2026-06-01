# Chapter 7 — Security, Identity, and High-Stakes Trust

Once AI systems can act, trust stops being only a question of model quality. It becomes a question of bounded authority.

A helpful model can get away with being vague about power. An acting system cannot.

The moment an AI system can call tools, execute code, traverse accounts, or continue working after the user has stopped watching, security moves to the center of the product. The important question is no longer whether the model sounds smart. It is whether the system has a clear identity, narrow permissions, real execution boundaries, and enough evidence left behind that a human institution can understand what happened later.

That is why agent security is not mainly a prompt-safety problem. It is a delegated-authority problem. Traditional software security often focused on discrete requests. Agentic systems stretch the unit of risk across a workflow: interpretation, retrieval, tool use, retries, follow-up behavior, and approval boundaries. Trust has to cover the whole path.

The strongest support for this claim in the current corpus is not a single definitive study. It is a pattern of practitioner convergence. Security talks, identity talks, and high-stakes workflow talks keep arriving at the same practical lesson from different directions: once systems can act on behalf of users, the hard part is no longer only generating a plausible next step. It is controlling what powers were delegated, under what conditions, and with what record of use.

## Identity is the substrate of trust

The most common engineering shortcut for connecting an agent to a real system is to give the agent a standing credential — a long-lived API key, a service-account token, a personal access token "borrowed" from the human operator. The shortcut works, in the sense that the system can act. It also dissolves the question the chapter is trying to take seriously.

A standing credential is not a delegation. It is the agent inheriting the entire authority of whoever's credential it borrowed, for as long as the credential remains valid, across whatever surface that credential touches. There is no scope to revoke. There is no expiry that maps to the actual task. There is no record that an agent was acting, rather than a human acting on the same key. The unit of trust the system has just granted is much larger than the unit of work it was asked to do.

Patrick Riley and Carlos Galan at Auth0 frame this directly. Their work on identity for AI agents starts from the position that "we authorize agents, MCP servers" — making the agent and its capabilities first-class citizens in the identity provider, not invisible passengers on a human's credential. The shift looks technical but it is structural. Once the agent is a real principal in the identity layer, it can have its own scopes, its own lifetimes, its own audit footprint, and its own revocation path.

Jared Hanson at Keycard pushes the same argument from the developer side. The common habit of treating an agent like an API consumer — with a permanent key paired to a permanent identity — does not survive contact with workflow reality. Agents act on behalf of specific users, for specific tasks, with specific data. Hanson's case is that securing agents using OAuth is not just a protocol choice; it is the right shape for the delegation. The agent gets a token that is bounded to a session, a user, and a set of scopes. When the work is done, the authority ends.

Garrett Galow at WorkOS pushes the framing further. His talk on cross-app access for MCP proposes the identity provider as a *trust bridge* between MCP clients and servers — so that the credentials flowing through the agent can be obtained without repeated manual consent flows, and so that the IT organization keeps visibility into which third-party systems are reading which data. That is the structural answer to a question every team running agents at scale eventually faces: how do you let an agent move between tools without making each tool feel like an independent integration project?

The shared move across these three talks is to treat agent identity as a first-class engineering object — not a label, not a service-account workaround, but a principal in the identity system with bounded scope, bounded lifetime, and an audit footprint. An agent that is authenticated as a blurry extension of a human is not delegated. It is impersonating.

## A concrete failure case

A concrete failure case makes the point clearer than abstract warnings.

Imagine a tax-preparation agent operating inside a professional workflow of the kind described by Joel Hron at Thomson Reuters. The system ingests source documents, extracts fields, maps them into a tax engine, checks validation errors, revisits documents to resolve missing information, and assembles a draft return. Nothing in that flow requires the model to be malicious for trouble to begin. It only has to be slightly wrong in a place where authority and evidence are easy to blur.

Suppose one document is ambiguous, a number is mapped to the wrong field, and the validation engine throws an error. The agent now has several possible powers: search for more supporting material, pull additional client records, reinterpret the rule, override a warning, or proceed with a draft that looks internally coherent. In a weak design, those powers can collapse into one another. The same system that is supposed to summarize evidence also has enough access to fetch more data, make a judgment call, and keep moving. From the outside, the workflow still looks smooth. The danger is not theatrical failure. The danger is an authority boundary disappearing inside a competent-looking trajectory.

That is the chapter's core point. In high-stakes work, the risky move is often not one bad answer. It is a system quietly crossing from assistance into authorization.

## Least privilege is different for agents than for users

Least privilege is the oldest piece of security advice, and on its own it is not enough.

In classic SaaS software, a narrow scope usually constrains a bounded API action. In agentic systems, the same scope can be recombined across many steps. A permission that seems harmless in isolation can become more powerful when paired with retrieval, reasoning, persistence, and retries. So "only give the agent the minimum access it needs" is correct but incomplete. Teams also have to ask: minimum access for which stage of the workflow?

This is where Hanson's argument compounds with Galow's. A standing credential gives the agent maximum scope for the maximum duration. An OAuth-scoped token with cross-app access gives the agent a narrow scope for a narrow duration, mediated by an identity provider that can see the request and revoke it. The first option lets the agent do anything the human can do, on a schedule the agent chooses. The second option lets the agent do this specific thing, for this specific task, with an audit trail that survives the interaction.

The deeper claim is that identity and authority are joint design objects. Granular authority without a principal to attach it to is unenforceable. A principal without scope is just a louder user. The hard work is binding them: producing an agent-shaped identity with agent-shaped scopes that match the agent-shaped workflows the system actually runs.

## Sandboxing is product infrastructure

The same principle appears in code-executing environments, with the stakes turned up.

Fouad Matin's security guidance for coding agents at OpenAI keeps returning to sandboxing, network restriction, privilege boundaries, and human review. Those recommendations are not merely about preventing spectacular compromise. They are about acknowledging that a capable system will sometimes be confused, manipulated, or overly eager. Real safety has to live in the runtime and permission system, not only in the model.

Harshil Agrawal at Cloudflare makes the same case from the platform side. His talk on sandboxing AI-generated code argues that the sandbox is not an afterthought added once the model misbehaves; it is the substrate the agent runs on. If the agent is going to execute code, that execution needs to be bounded by default — network restricted, filesystem scoped, time-limited, resource-capped. The bounds are the product. Without them, the system is not running code on behalf of a user. It is granting the model an open shell on infrastructure.

Apple Private Cloud Compute, profiled by Jmo at CONFSEC, sits at the high end of this spectrum. The architecture is built around the principle that even Apple cannot see what runs inside a user's session. The cryptographic boundary is structural. That model is overkill for most product surfaces, but it makes the point in the strongest possible form: when the cost of getting trust wrong is unbounded, the boundary has to be designed-in rather than enforced socially. The right amount of sandbox for an enterprise coding agent is less than Apple's. It is also not zero.

The claim the chapter wants to leave in the ledger is that sandbox, least privilege, and auditability belong in the same category as evals, harnesses, and durable runtimes: they are product infrastructure, not security overhead. A team that treats them as the security team's problem will discover the boundary by getting it wrong in production. A team that treats them as part of the runtime spec has a chance of getting them right before that.

## Standardized protocols expand the attack surface

A common hope around the rise of the Model Context Protocol is that standardization will reduce the security problem by giving everyone a known interface to attack and defend. The actual pattern in the corpus is closer to the opposite. Easier interoperability means more tools can be exposed more quickly, which makes the questions of scope, mediation, review, and audit more urgent rather than less.

Tun Shwe at Lenses puts the bottom line plainly: "Your insecure MCP server won't survive production." The talk is essentially a tour of the ways MCP servers ship with assumptions that survive demo conditions and fail under real load. Authentication treated as a configuration option. Tool descriptions trusted as input. Servers exposed publicly because internal routing was the harder problem. None of these are MCP-specific bugs. They are the predictable consequences of pulling a wire protocol into a category — capability exposure — that has not had the security review the wire has.

Karan Sampath at Anthropic, working on enterprise MCP rollouts, names the structural answer from the governance side. "The really important thing for security teams ... is they need to establish a root of trust," he says. The enterprise version of this problem is not just performance, and it is not even just authentication. It is whether the security team can inspect the capability surface, reason about its risks, and produce a defensible record of what was allowed and why. A protocol that makes capability exposure faster does not lower that bar; it raises it.

David Mytton at Arcjet builds the same argument from outside-the-perimeter. His talk on defending sites from AI bots reads as a parallel chapter to the MCP discussion: as the ability to script automated interaction expands, the cost of identifying and bounding that interaction expands with it. The defender's surface is no smaller. It is larger, and the attacker now has standardized tools.

The claim this section anchors is that protocol standardization expands the attack surface if governance lags. It is not an argument against standardization. It is an argument that standardization is a forcing function for governance work that has to happen in parallel, not afterwards.

## Enterprise MCP rolls up to gateways and a root of trust

Once enterprise teams take the MCP security problem seriously, the architecture they reach for converges on a recognizable shape. There is a gateway. There is a policy plane. There is a registry of blessed servers. There is a permissions model that knows about identities, tools, and approval requirements. There is an audit log that records what each agent invocation actually did. The shape looks a lot like the API-gateway and IAM patterns that mature enterprise SaaS settled into a decade earlier — applied to a new category of capability.

Sampath's enterprise MCP work names the architectural conclusion directly. The root of trust is established at the platform, not at the individual tool. Servers are reviewed before they are allowed in the corporate environment. Tools are scoped to the principals that should be able to call them. Audit is built in at the gateway layer rather than tacked onto each integration. This is the enterprise equivalent of moving from "anyone can install any app" to "we have an internal app store with security review." It is not glamorous. It is the work that lets the technology be used.

Sam Morrow's GitHub MCP work shows the same shape at production scale. As part of scaling MCP for GitHub's customers, the team filtered tools by PAT (personal access token) scopes — so an agent invoking a GitHub MCP server only sees the tools its token actually authorizes — and used step-up OAuth to request additional privileges only when needed, rather than pre-granting them. The effect is that the agent's effective capability surface is dynamically bounded by the identity it is acting under and the task it is currently performing. Capability follows authority, not the other way around.

These two cases together make the architectural argument concrete. Enterprise MCP adoption pushes toward gateways, blessed platforms, and a root of trust. Naming the pattern matters because it changes what teams build first. Instead of "ship one MCP server and add another, and another," the platform shape becomes the first deliverable. Individual servers are then deployed against a structure that knows how to govern them.

## Per-tool OAuth flows are a governance problem

A related issue surfaces in everyday agent operation, and it is one of the cases where what looks like a UX annoyance is actually a governance failure.

Most current MCP and agent integrations require the user to authorize each tool separately. The agent wants to talk to email. Consent flow. The agent wants to talk to calendar. Consent flow. The agent wants to talk to the document store. Consent flow. To the operator, this is a paper-cut sequence of OAuth dialogs. To the security team, it is far worse: it is invisible. Each consent grant happens between the user and the third-party tool, mediated by an identity layer the enterprise may or may not control. The IT organization has no central record of what authority the user just delegated, to which tools, under what scopes, with what expiry.

Galow's cross-app access work at WorkOS is one of the cleanest framings of the structural answer. The identity provider becomes the bridge between MCP clients and servers, so that credentials can be obtained without repeated manual consent flows *and* so that the enterprise has a single place to see — and revoke — what was delegated. That second part is the load-bearing one. A faster consent flow with no visibility is not progress. A consent flow that produces a visible, revocable audit trail at the identity layer is.

Hanson's OAuth argument fits into the same shape. The right pattern for agent credentials is short-lived, scoped tokens issued through a flow the identity provider can audit — not standing keys, not impersonation, not human credentials borrowed for agent work. Morrow's step-up OAuth on GitHub is the same pattern at the tool layer: the agent never holds more authority than it currently needs, and any escalation goes through a flow that produces a record.

The claim is simple: repeated per-tool OAuth flows are not just annoying; they are a governance and IT visibility problem. The fix is structural — push the trust bridge into the identity provider — and the architectural payoff is the same as in the gateway argument: the enterprise can answer the basic auditing questions ("who delegated what, to whom, when, and for how long?") because the system was built to capture them, not because someone reconstructed them after the fact.

## Audit as part of the trust model

The chapter has so far drawn most of its evidence from enterprise and developer-tools contexts. The corpus contains one public-sector talk that is worth surfacing because it raises the constraints to a level that makes them clearer than the enterprise versions.

Mark Myshatyn at Los Alamos National Lab presented on government agents at one of the AI Engineer events. The talk reads, in places, like the rest of this chapter taken to a higher cost function. When the user is a federal employee, the data is classified, and the action might be regulated under specific statutes, the identity, authority, and audit questions stop being best practices and become legal requirements. The agent has to act under a real principal. The scope has to be documented. The audit trail has to survive review. The boundaries have to be enforceable, not aspirational. The talk is useful in the manuscript not because every enterprise looks like a national lab, but because the national lab makes the constraints visible — and most of them turn out to be the same constraints other regulated industries are starting to discover for themselves.

The observability argument from the previous chapter returns here in a stricter form. Audit trails, trajectory views, approval logs, and replayable histories are not just debugging conveniences. They are part of the trust model. If a system drafts a return, assembles a legal research memo, or performs a sensitive code change, an institution needs to be able to answer basic questions afterward: who authorized this path, what evidence was consulted, what tools were used, what warnings appeared, and where a human judgment entered or failed to enter. Without those answers the institution cannot certify the work. Without certification, the work cannot ship.

This is also where the manuscript has to stay honest. Conference talks are especially good at surfacing strong patterns, field reports, and architecture instincts. They are weaker as proof of universal effectiveness. So the responsible claim here is not that the industry has solved trustworthy delegation. It has not. The more grounded claim is that serious teams keep discovering the same constraints: narrow scopes, explicit identities, mediated tools, sandboxes, review points, and inspectable histories.

A machine colleague is not trustworthy because it sounds careful. It is trustworthy, if at all, because its power has shape.

The next chapter takes the chapter-7 frame and stress-tests it under realtime conditions, where the cost of getting bounded authority wrong becomes audible to the user inside a single conversation. But the move there only works because the chapter behind it has named the shape of power, the substrate of identity, and the architecture of audit. Those are the pieces. The next chapter is what happens when they have to ship under a 200-millisecond clock.
