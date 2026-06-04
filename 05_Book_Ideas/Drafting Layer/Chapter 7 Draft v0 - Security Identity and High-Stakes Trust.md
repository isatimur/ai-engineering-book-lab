# Chapter 7 Draft v0 — Security, Identity, and High-Stakes Trust

## Draft note
This pass turns Chapter 7 from a starter into a real prose chapter that follows naturally from Chapter 6. If Chapter 6 argued that delegated work needs durable runtimes and a human control plane, Chapter 7 argues that durable action also needs bounded authority. The chapter keeps the High-Stakes Colleague in the foreground while pulling the Software Factory back in where code execution and tool access make the risk concrete.

---

# Chapter 7 — Security, Identity, and High-Stakes Trust

A helpful model can get away with being vague about power. An acting system cannot.

The moment an AI system can read across accounts, call tools, execute code, trigger workflows, or continue working after the user has moved on, trust stops being a soft judgment about how smart the model sounds. It becomes a hard architectural question. Who is this system acting as? What can it reach? What can it do without asking again? What happens if it is manipulated? What evidence remains after the fact? And how quickly can that power be reduced, revoked, or redirected when something goes wrong?

That is why security belongs immediately after runtimes in the book’s spine. Chapter 6 argued that long-running delegated work needs state, checkpoints, observability, and a human control plane. Chapter 7 adds the next constraint: a control plane without authority boundaries is still not trustworthy. Durable execution tells you what the system is doing over time. Security determines whether it should have been allowed to do it at all.

The core mistake in immature agent systems is to treat tool access as a product feature before treating delegated authority as a systems problem. That works for demos because the happy path flatters the design. The agent seems capable. It reaches many systems. It stitches steps together. But the same freedom that makes the demo look magical also enlarges the blast radius of every prompt injection, every misread instruction, every overscoped token, and every badly described tool.

In other words, the more the system looks like a colleague, the more the organization has to care about identity, permissions, mediation, and audit.

## Agency turns security from request control into workflow control

Traditional application security often had a relatively stable unit of action. A user clicked a button. An API call hit a service. The backend checked permissions. The execution path was constrained enough that teams could think in discrete requests.

Agentic systems weaken that comfort.

An agent does not only receive a command. It interprets intent, decides how to pursue it, fans out into tools, retries when steps fail, and may continue moving through a workflow long after the original prompt is gone from the user’s attention. The trust boundary therefore expands. The key question is no longer only whether a given user may access a given resource. It becomes whether a delegated machine actor can decide, retrieve, execute, and continue safely on that user’s behalf.

That is a much larger surface.

The High-Stakes Colleague makes the shift obvious. In legal, tax, and compliance workflows, the system is not merely answering a question. It may gather evidence, traverse internal sources, use validation engines, draft conclusions, and surface a recommendation for human sign-off. The risk does not live at one tool endpoint. It lives across the trajectory. A single misstep in that chain can leak the wrong document, overstate a conclusion, or cross a permission boundary that the human did not realize had been delegated.

The Software Factory exposes the same problem from another angle. A code agent with repository access is not dangerous only when it writes a bad patch. It is dangerous when it can quietly inspect secrets, mutate CI configuration, add a dependency, call external services, or keep iterating after a misleading instruction entered the loop. Once code execution enters the picture, the old fantasy that trust can be solved primarily at the prompt layer becomes hard to defend.

This is why Chapter 7 should resist security theater. The important move is not to say that AI is spooky and therefore needs more generic caution. The real move is to notice that agency changes the unit of control from isolated calls to delegated workflows. The right architecture must therefore constrain workflows, not merely decorate prompts.

## Sandboxes matter because models are not where trust ultimately lives

One of the clearest lessons from the code-execution material is that system controls matter more than model intentions.

If an agent can execute code, browse untrusted content, open files, or chain across tools, then the design must assume it can be induced into bad behavior. Maybe by a malicious instruction. Maybe by a poisoned page. Maybe by a bug in tool descriptions. Maybe by a simple misunderstanding. The source of failure matters less than the consequence: a model cannot be the final enforcement layer for its own power.

That is why sandboxing is not an implementation detail. It is part of the product.

A serious code-executing agent should run in a constrained environment. Filesystem access should be scoped. Network access should be explicit. Secrets should be minimized. Tool permissions should be narrow by default. Risky operations should require step-up approval rather than inheriting broad ambient authority. If the system needs to browse arbitrary inputs, those inputs should not sit on the same trust plane as production credentials.

This is an old security instinct, but agent systems give it new urgency. In classic software, code paths were written by developers and at least somewhat knowable in advance. In agentic software, the system is choosing among many possible paths at runtime. That makes deterministic boundaries even more valuable. The model may improvise, but the environment should fail closed.

This is also why security-heavy discussions increasingly sound like runtime design rather than model evaluation alone. They are about OS boundaries, execution isolation, token scope, credential lifetimes, and mediation layers. They are about what the system can do even when the model is confused, manipulated, or simply too eager.

The underlying principle is blunt: assume the agent will sometimes be wrong, and build so that being wrong is survivable.

## Least privilege becomes a product design discipline

Least privilege is easy to praise and surprisingly hard to operationalize in agent systems.

A useless agent can be perfectly safe. The challenge is to make the system powerful enough to matter without giving it so much authority that one mistake becomes expensive. This is where many teams discover that access control is no longer a back-office function. It becomes part of the product experience.

A strong design does not expose every tool and every permission up front. It gives the system a constrained initial surface, then expands authority only when the workflow truly requires it. GitHub’s production lessons point in this direction: scope what the system can see based on existing credentials, filter tool exposure by permission, and use step-up flows for stronger actions. That pattern matters because it treats tool discovery and authorization as connected problems.

The same logic should apply beyond coding. A research agent may not need write access at all. A support agent may need to read account metadata but not issue refunds. A legal workflow may need broad retrieval across documents but no authority to send anything externally. A scheduling agent may need access to calendars yet no permission to message third parties without confirmation.

These choices do not merely protect the organization. They shape the behavior of the system itself. Narrower powers reduce the number of tempting but unsafe paths the model can wander into. A better security design often makes the system easier to reason about, not only safer.

That is why Chapter 7 should frame least privilege as an engineering discipline of product scoping. Safe delegation is not achieved by asking the model to be careful. It is achieved by making carelessness less powerful.

## MCP and standardized tool access do not remove governance; they raise its stakes

Protocol enthusiasm can make this easy to forget.

Standardized tool access is genuinely useful. It lowers integration friction. It gives model-facing systems a common way to discover capabilities. It reduces the amount of one-off glue every vendor has to invent. All of that is real progress.

But interoperability does not dissolve governance problems. It concentrates them.

Once many tools can be exposed through a common protocol, the main bottleneck moves upward. Teams no longer ask only, “Can we connect this service?” They start asking, “Should this be exposed at all? To which agents? Under which identities? With what logging, discovery rules, consent surfaces, and policy constraints?” The protocol solves the wiring problem and reveals the management problem.

That is why the enterprise MCP discussions are so useful for this chapter. They keep the book from confusing integration ease with production readiness. The easier it becomes to connect tools, the more pressure builds for curation, grouping, authorization, visibility, and roots of trust. The system needs to know not only what exists, but what is blessed, what is risky, what is scoped to a team, and what requires escalation.

This also connects back to Chapter 5. Context overload and capability overload are cousins. A model flooded with too many possible tools is not only inefficient. It is harder to govern. Progressive discovery, capability grouping, and mediated exposure help both cognition and security at once.

A mature tool ecosystem therefore does not eliminate chokepoints. It creates better reasons for them.

## Enterprises keep reinventing gateways because gateways solve several problems at once

Developers often prefer directness. Connect the agent to the tool. Let the model call the thing. Keep the stack simple.

Organizations with real risk tend to rediscover a different preference: mediated access.

Whether it is called a gateway, a policy plane, an identity hub, or a root of trust, the pattern keeps returning for understandable reasons. A trusted mediation layer can centralize auth, narrow credential handling, standardize policy enforcement, capture logs, and provide one place to revoke or reshape access when the environment changes. It can also make security teams less allergic to agent adoption because they are not being asked to bless an uncontrolled mesh of direct tool connections.

This is not bureaucracy for its own sake. It is a response to what delegated machine work actually does inside institutions. Once many tools, many users, many teams, and many workflows are involved, local convenience stops being the only design goal. The organization needs consistent trust infrastructure.

The High-Stakes Colleague is again the clearest mirror. A professional workflow is only trustworthy if the surrounding institution can answer basic questions reliably: who authorized this path, what authority was used, what evidence was consulted, and what policy applied when the system crossed into a consequential step? A gateway pattern makes those questions cheaper to answer.

The same is true in the Software Factory. A central access and policy layer can decide which repositories, environments, and operations are exposed to coding agents at all. It can keep risky powers off the default path. It can make the difference between a coding assistant that is merely fast and a software factory that is governable.

## Identity for agents is really the problem of delegated authority

Identity talk can sound abstract until you name what is actually at stake.

The hard problem is not only authenticating the human user. It is safely carrying that user’s authority across multiple systems while preserving scope, duration, attribution, and revocation. The agent has to act on someone’s behalf without becoming an unbounded extension of their account.

In plain language, the system must know four things.

Who the human is.
What powers the agent has been granted.
How long those powers last.
How those powers can be withdrawn or narrowed.

That is what makes delegated identity different from ordinary session management. A human being can interpret context, notice risk, and stop themselves. An agent can move faster and across more surfaces, but it is less inherently trustworthy. So the identity system has to carry more of the burden.

This is why repeated ad hoc consent flows are not just annoying UX. They signal a deeper architectural gap. If every tool asks separately, the organization loses coherence. Users get habituated to clicking through permissions they do not fully understand. Security teams lose visibility into the aggregate authority the workflow has accumulated. The agent itself becomes a messy stack of partially granted powers rather than a cleanly governed delegated actor.

Cross-app access patterns and identity-provider mediation are attractive because they acknowledge that this sprawl will not scale. If agents are to become real workers inside enterprises, they need identities and authorization paths that are as manageable as those of human workers, while still being more bounded.

That phrase matters: more bounded, not less. Nobody grants a junior employee universal access to every internal system on day one. The same common sense should govern agents.

## High-stakes trust depends on inspectability as much as prevention

Security discourse often focuses on blocking bad actions. Agent systems require a wider frame.

In high-stakes environments, trust also depends on being able to reconstruct what happened. Which sources were consulted? Which tool calls were made? Which permissions were exercised? Which output did the system present for review, and what path led there? If an answer is disputed, if a workflow failed, or if a regulator asks questions later, the organization needs more than a statement that the model was generally aligned.

It needs evidence.

This is where Chapter 7 should deliberately touch Chapter 6’s observability argument again. Rich traces, approval logs, trajectory views, and reviewable histories are not only operational conveniences. They are part of the security story. They let an institution convert bounded autonomy into something defensible.

Joel Hron’s high-stakes framing is especially powerful here because it does not pretend the answer is unrestricted autonomy under perfect prevention. The answer is constrained execution plus inspectable paths. The system can do meaningful work, but it leaves behind a trail that domain experts and organizations can actually examine.

That said, the chapter should not fake simplicity. Inspectability creates its own tension. Detailed traces can expose sensitive data, internal reasoning artifacts, or privileged content. A trustworthy architecture therefore needs selective retention, role-based visibility, redaction strategies, and different surfaces for operators, reviewers, and auditors. But that tension is not an argument against inspection. It is an argument for governing inspection properly.

The same pattern keeps recurring: wherever agent systems create new power, they also create a need for better-structured oversight.

## Trustworthy autonomy is tuned, not maximized

The chapter’s deepest continuity with the rest of the manuscript is the rejection of autonomy maximalism.

A childish architecture asks, “How much can we let the agent do?” A mature architecture asks, “What authority is appropriate at this step, for this domain, under this level of risk?”

That distinction matters because it ties security directly to product seriousness. In the High-Stakes Colleague, the system is valuable precisely because autonomy is dialed. It can retrieve, synthesize, validate, and draft, but some transitions remain deliberately human. In the Software Factory, subagents can search, summarize, patch, and test, while merge rights, deployment actions, or broader environment changes remain gated. In both cases, trust comes not from proving the system can do everything, but from deciding what it should never do casually.

This is what high-stakes trust actually looks like in practice: layered controls, bounded identities, narrow permissions, mediated access, sandboxed execution, and enough visibility that a human institution can remain responsible for the work.

## Security is the architecture of deserved trust

Once AI systems act, security cannot remain a sidebar to product capability.

It is the architecture that determines whether delegated power is deserved.

Identity tells the system on whose behalf it acts. Authorization determines which powers it actually holds. Sandboxing and least privilege contain the damage when the model is wrong. Gateways and roots of trust turn sprawl into governable infrastructure. Audit trails and inspectable trajectories turn machine action into something institutions can review, defend, and improve.

This is the next step in the book’s accumulating argument.

Chapter 3 argued that delegated work needs a legible workplace.
Chapter 4 argued that it needs a quality system.
Chapter 5 argued that it needs the right working set of information.
Chapter 6 argued that it needs durable execution and a human control plane.
Chapter 7 adds that none of this deserves trust unless authority itself is bounded, attributable, and revocable.

A machine colleague is not trustworthy because it sounds confident.
It is trustworthy only when its power has shape.

## Draft status note
This pass established:
1. a full prose Chapter 7 that extends the Chapter 6 control-plane argument into identity, permissions, and security architecture
2. a clear throughline from request security to delegated-workflow security
3. strong reuse of the High-Stakes Colleague with targeted returns to the Software Factory for code-execution risk
4. integration of sandboxing, least privilege, MCP governance, gateways, delegated identity, and inspectability without turning the chapter into a checklist
5. a clean bridge toward Chapter 8, where realtime systems expose these trust requirements under time pressure
