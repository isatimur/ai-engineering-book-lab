# Chapter 7 — Security, Identity, and High-Stakes Trust

Once AI systems can act, trust stops being only a question of model quality. It becomes a question of bounded authority.

A helpful model can get away with being vague about power. An acting system cannot.

The moment an AI system can call tools, execute code, traverse accounts, or continue working after the user has stopped watching, security moves to the center of the product. The important question is no longer just whether the model sounds smart. It is whether the system has a clear identity, narrow permissions, real execution boundaries, and enough evidence left behind that a human institution can understand what happened later.

That is why agent security is not mainly a prompt-safety problem. It is a delegated-authority problem. Traditional software security often focused on discrete requests. Agentic systems stretch the unit of risk across a workflow: interpretation, retrieval, tool use, retries, follow-up behavior, and approval boundaries. Trust has to cover the whole path.

The strongest support for this claim in the current corpus is not a single definitive study. It is a pattern of practitioner convergence. Security talks, identity talks, and high-stakes workflow talks keep arriving at the same practical lesson from different directions: once systems can act on behalf of users, the hard part is no longer only generating a plausible next step. It is controlling what powers were delegated, under what conditions, and with what record of use.

A concrete failure case makes the point clearer than abstract warnings.

Imagine a tax-preparation agent operating inside a professional workflow of the kind described by Joel Hron at Thomson Reuters. The system ingests source documents, extracts fields, maps them into a tax engine, checks validation errors, revisits documents to resolve missing information, and assembles a draft return. Nothing in that flow requires the model to be malicious for trouble to begin. It only has to be slightly wrong in a place where authority and evidence are easy to blur.

Suppose one document is ambiguous, a number is mapped to the wrong field, and the validation engine throws an error. The agent now has several possible powers: search for more supporting material, pull additional client records, reinterpret the rule, override a warning, or proceed with a draft that looks internally coherent. In a weak design, those powers can collapse into one another. The same system that is supposed to summarize evidence also has enough access to fetch more data, make a judgment call, and keep moving. From the outside, the workflow still looks smooth. The danger is not theatrical failure. The danger is an authority boundary disappearing inside a competent-looking trajectory.

That is the chapter’s core point. In high-stakes work, the risky move is often not one bad answer. It is a system quietly crossing from assistance into authorization.

This is why least privilege matters differently for agents than for ordinary integrations. In classic SaaS software, a narrow scope usually constrains a bounded API action. In agentic systems, the same scope can be recombined across many steps. A permission that seems harmless in isolation can become more powerful when paired with retrieval, reasoning, persistence, and retries. So “only give the agent the minimum access it needs” is correct but incomplete. Teams also have to ask: minimum access for which stage of the workflow?

That is where identity becomes central. Agent identity is not just naming the system. It is specifying on whose behalf it acts, which subset of authority it has, how long that authority lasts, and how it can be revoked. Several talks in this corpus push toward some version of this idea. Jared Hanson argues against the common habit of handing agents standing API keys as if they were users. Michael Grinich describes shadow or scoped identities that let an agent inherit only a bounded subset of a person’s powers rather than mirror the whole account. The exact implementation pattern may change, but the durable principle is clear: an agent should not be authenticated as a blurry extension of a human.

The same principle appears in code-executing environments. Fouad Matin’s security guidance for coding agents keeps returning to sandboxing, network restriction, privilege boundaries, and human review. Those recommendations are not merely about preventing spectacular compromise. They are about acknowledging that a capable system will sometimes be confused, manipulated, or overly eager. Real safety therefore has to live in the runtime and permission system, not only in the model.

This is also why standardized tool protocols do not remove the governance problem. They mostly solve the wiring problem. Easier interoperability means more tools can be exposed more quickly, which makes the questions of scope, mediation, review, and audit more urgent rather than less. Enterprises keep rebuilding gateways and policy planes for a reason: someone has to decide which actions exist, who can invoke them, and which ones require escalation.

The observability argument from the previous chapter returns here in a stricter form. Audit trails, trajectory views, approval logs, and replayable histories are not just debugging conveniences. They are part of the trust model. If a system drafts a return, assembles a legal research memo, or performs a sensitive code change, an institution needs to be able to answer basic questions afterward: who authorized this path, what evidence was consulted, what tools were used, what warnings appeared, and where a human judgment entered or failed to enter.

This is also where the manuscript has to stay honest. Conference talks are especially good at surfacing strong patterns, field reports, and architecture instincts. They are weaker as proof of universal effectiveness. So the responsible claim here is not that the industry has solved trustworthy delegation. It has not. The more grounded claim is that serious teams keep discovering the same constraints: narrow scopes, explicit identities, mediated tools, sandboxes, review points, and inspectable histories.

A machine colleague is not trustworthy because it sounds careful. It is trustworthy, if at all, because its power has shape.
