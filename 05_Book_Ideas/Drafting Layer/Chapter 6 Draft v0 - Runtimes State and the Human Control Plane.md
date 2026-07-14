# Chapter 6 Draft v0 — Runtimes, State, and the Human Control Plane

# Chapter 6 — Runtimes, State, and the Human Control Plane

A chatbot can get away with amnesia. A production agent cannot.

That difference is not philosophical. It is architectural.

A chat system can answer a question, emit a patch, suggest a draft, and disappear. But the moment you ask a system to do work that unfolds across time, tools, failures, and approvals, the center of gravity moves. The question is no longer only whether the model can produce a smart next token. The question is whether the surrounding system can preserve intent, survive interruption, recover from error, expose its progress, and stop in the right places for human review.

This is where many impressive agent demos break. The model itself may be good enough. The harness may be decent. The evals may even exist. The context may be strong. But the system was still built like a conversation when it needed to be built like a workflow. It loses track of what already happened. A retry repeats work or performs the same action twice. A human cannot tell which subagent did what. An approval arrives too late, after the expensive or risky step already happened. The agent does not fail because it is unintelligent. It fails because it has nowhere durable to stand.

That is why the next layer in the book’s argument is runtime design. If Chapter 3 was about making delegated work possible, Chapter 4 about making it measurable, and Chapter 5 about making it properly informed, Chapter 6 is about making it operationally trustworthy. Once agents act over time, architecture becomes destiny.

## Stateless systems hit a wall

The easiest way to understand the runtime problem is to notice how much modern agent discourse still inherits its assumptions from chat.

Chat is an excellent interface for short-lived assistance. It is forgiving. It is intuitive. It lets a user redirect the system turn by turn. For many workflows, that is enough. But chat history is a weak execution substrate for delegated work. A transcript is not the same thing as state. It does not cleanly represent task progress, pending approvals, completed tool calls, rollback boundaries, or which intermediate outputs are binding versus disposable.

Samuel Colvin states the break point simply: “Once we get into longer running workflows, that’s where it really becomes a problem.” The line matters because it does not claim stateless systems are always bad. It claims they hit a wall when work acquires duration. A short answer can be regenerated. A half-finished research trajectory, a partially executed software task, or a multi-step legal workflow cannot be managed so casually.

This is the same shift the book has been tracing from the beginning. In a toy setting, you can still tell yourself the model is the product. In a real system, the surrounding structure becomes inseparable from the capability. Preeti Somal gives the trust version of the same point: agent systems “must scale and provide durability and reliability. Otherwise, no one’s going to trust your agent.” That is not a platform engineer’s hobbyhorse. It is the operating condition for delegation.

Trust fails quickly when continuity fails.

A coding agent that loses its place after every interruption is not a colleague. It is an intern with total amnesia. A research agent that cannot resume after a timeout is not autonomous. It is brittle. A support or legal workflow that cannot survive approvals, waiting periods, or tool outages is not production-ready no matter how eloquent the underlying model sounds in a demo.

Durability, then, is not extra credit. It is the runtime expression of seriousness. And the newer runtime material suggests something slightly sharper than the original draft implied: durable systems increasingly look evented, not merely persistent. The important thing is not just that a run can be resumed, but that the system has explicit transitions, pause-and-resume semantics, and a history rich enough to distinguish plan, execution, approval, and recomposition.

## The software factory needs an operating system

Meridian’s case from Chapters 3 and 4 becomes even more revealing here.

The team already improved its repo. It already built a better harness. It already added stronger validations and more realistic evals. Small delegated work now goes well. Then the team raises the ambition again. Instead of isolated patches, it asks the system to investigate a bug, spawn a few subagents, inspect a cluster of files, propose a fix, run checks, and prepare a reviewable summary for a human.

This is where a second class of problems appears.

One subagent finds the relevant failure but another, working off a slightly older branch of understanding, proposes a different patch. A retry of the validation step reruns something the first attempt had already completed. The human reviewer receives fragments of work rather than a coherent roll-up. The system still has intelligence and context, but no stable execution semantics. It is a workshop full of talented workers without a foreman’s board, without station history, and without a clean shift handoff.

That is the deeper meaning of the software-factory metaphor. A factory is not only a prepared environment and a quality system. It also needs an operating system. It needs durable task identities, queues, checkpoints, resumability, visibility, and clear places for review. Otherwise increasing the number of workers only multiplies confusion.

This is why Chapter 6 naturally belongs beside Chapter 3 rather than floating off into platform taxonomy. Harnesses without runtime semantics are fragile. The repo may be legible, the tasks may be specified, the standards may be measured, and the context may be well assembled. But if the work itself cannot persist and be supervised, the colleague illusion still breaks the first time the system has to keep going after the first clever turn.

## Agentic systems are workflows with state

A lot of debate about agents versus workflows turns out to be a category error.

People sometimes speak as if workflows are rigid and agents are flexible, so choosing workflows means giving up on real agency. In production systems, the opposite lesson often emerges. Workflow structure is what makes useful agency survivable.

Somal gives the chapter its best backbone here: “At the core of agentic AI applications is a complicated workflow... [that] needs to handle state potentially over long periods of time. There needs to be human interaction for approvals...” That sentence should kill the fake dichotomy. The system does not become less agentic because it has durable workflow semantics. It becomes more usable.

Useful agentic systems are not free-floating intelligence. They are stateful workflows with probabilistic decision nodes.

That framing clarifies a lot at once. It explains why pause and resume matter. It explains why retries should not live in ad hoc prompt logic. It explains why approvals belong naturally inside execution rather than as awkward afterthoughts. It explains why application state cannot be reduced to whatever is still visible in the prompt window. And it explains why runtime tooling increasingly looks closer to distributed-systems infrastructure than to prompt folklore.

In a serious coding workflow, state may include the current task plan, completed tool runs, validation status, pending questions for the human reviewer, and links to specific artifacts the agent produced. In a high-stakes professional workflow, it may include evidence bundles, validation checkpoints, unresolved exceptions, approval boundaries, and which output is ready for expert sign-off. In both cases, the core requirement is the same: the agent needs a structured memory of work, not merely a growing transcript of conversation.

This is what durability buys. It lets the system preserve the difference between “what was said” and “what has happened.” Luke Alvoeiro’s multi-agent material reinforces the same point from the coordination side: long-running systems need shared mission state, milestone checkpoints, and ways to stop drift before many locally plausible workers diverge.

## History is part of execution, not just debugging

Once you start thinking in workflows rather than turns, history changes meaning.

In chat systems, history is mostly there to help the next answer feel continuous. In durable systems, history is part of execution itself. It tells the runtime what has already happened, what can be retried safely, which approvals were granted, what state changed, and where the agent should resume.

That is why durable-agent discussions keep converging on structured histories, checkpoints, and replayable event logs. Not because engineers enjoy complexity, but because long-running work creates obligations. If the system did something important, someone may later need to inspect it. If a run failed halfway through, the team may need to resume from a meaningful boundary rather than start from zero. If a result is contested, the organization may need to know what the system saw, which tools it used, and which step introduced the mistake.

Somal makes this visibility requirement explicit: “We also store all of the workflow history... so that you can look at the visibility of what is happening as your agent is navigating this complex set of interactions.” That line captures a crucial shift. History is not archival fluff. It is the substrate of inspection.

This is also where runtime design begins to touch Chapter 4’s control-system argument. A good history lets a team do more than recover execution. It lets them learn. Failed trajectories become eval cases. Slow steps become optimization targets. Repeated approval bottlenecks reveal design problems in the control plane. The runtime is not merely keeping the work alive. It is generating the evidence by which the system can later improve.

## Replay, snapshot, and the shape of continuity

Once durability becomes a real concern, a more technical tradeoff appears: how exactly should continuity be represented?

One family of systems leans on replay. Preserve an event history, then reconstruct state from what happened. Another family leans on snapshots. Save checkpoints of working state so execution can continue more directly. Both approaches are reasonable. Both reveal something about what the team values.

Replay-oriented designs are attractive when causality and auditability matter. They preserve a strong sense of how the system got here. They make it easier to reason about the chain of events. They fit environments where exact reconstruction is important and where state should emerge from recorded steps rather than from opaque frozen blobs.

Snapshot-oriented designs are attractive when fast continuation and complex live state matter more. They reduce the cost of resuming. They can feel more natural when the system’s working memory is elaborate, when rebuilding everything is awkward, or when pause-and-resume is expected to be frequent.

The chapter does not need to turn this into a runtime taxonomy lesson. The point is simpler. The existence of this tradeoff proves that runtime semantics are not incidental details. Once agents operate over time, teams are making the kinds of decisions mature distributed systems always have to make: what gets persisted, what gets recomputed, what must be auditable, what can be resumed cheaply, and which failure modes are acceptable.

In other words, the “agent problem” is quietly becoming a systems problem.

## The human control plane is an architectural layer

This is where the chapter’s title concept should crystallize.

A recurring mistake in agent discourse is to treat human involvement as a temporary crutch on the way to full autonomy. But the more capable systems become, the less persuasive that framing looks. In valuable systems, human control is not a leftover from immaturity. It is an architectural layer.

The human control plane is the set of interfaces, approvals, visibility layers, and intervention mechanisms through which people supervise delegated machine work. It is the place where a person can see what is active, understand what happened, inspect evidence, redirect a task, approve a risky transition, or teach the system something reusable.

That means a chat transcript is usually not enough.

Operators need queue views, roll-up summaries, pending-review surfaces, uncertainty cues, state inspection, and clean intervention points. They need something closer to a control room than a message thread. If the only way to supervise a complex agent system is to read back through thousands of tokens and manually reconstruct what happened, then the control plane does not exist yet.

This is why the later coding and collaboration materials are so important. Eric Zakariasson’s line is one of the cleanest expressions of the problem: “Here’s what everyone is working on... and here’s what you as a human need to review.” That is the control plane in plain English. Not omniscient micromanagement, but selective visibility into a fleet of delegated work.

Maggie Appleton sharpens the same point from the collaboration angle. The missing thing is not merely more autonomous workers. It is a shared space in which plans, context, intermediate work, and review can be coordinated collectively. The challenge is no longer only model reasoning. It is organizational legibility.

That is what makes the human control plane such a useful abstraction. It ties together execution, observability, oversight, and team coordination under one idea: make supervision operationally cheap enough that humans can stay above the loop without vanishing from it.

## Human control is not human micromanagement

The phrase human-in-the-loop can accidentally trivialize the design problem.

It can suggest a binary choice: either humans approve everything, or the system is autonomous. But the more useful reality is a gradient of control. Humans may stay out of the way for low-risk steps, review plans before expensive ones, approve external actions, inspect only exceptions, or intervene only when uncertainty spikes. Control can sit before, during, and after execution.

That is why a well-designed control plane should reduce the need for constant rescue, not institutionalize it. The goal is not to make every system depend on manual babysitting. The goal is to create high-leverage checkpoints where human judgment matters most.

A coding factory, for example, might let subagents explore, search, summarize, draft, and run validations autonomously, while reserving merge decisions, large architectural changes, or dependency additions for review. A high-stakes professional workflow might allow autonomous evidence gathering and draft assembly, while requiring expert sign-off before client-facing output or consequential recommendations. In both cases, the right design question is not “How do we keep the human involved everywhere?” It is “Where is the human most valuable?”

That is a control-plane question, not a prompt question.

## High-stakes systems tune agency instead of maximizing it

The High-Stakes Colleague case makes this point unavoidable.

In legal, tax, compliance, healthcare, and similar workflows, the dream of unrestricted autonomy becomes less impressive the closer you get to real operational risk. The system is not valuable because it can do everything without supervision. It is valuable because it can do the right things with the right boundaries.

Joel Hron offers the right antidote to autonomy maximalism: agency should be thought of as a spectrum, a set of dials adjusted by use case. That framing matters because it replaces the childish question — how autonomous can we make it? — with the adult one: where should autonomy be high, where should it be low, and who decides?

That difference is foundational to trustworthy product design.

The north star, as Hron puts it, has shifted “from helpfulness to productive.” But productive does not mean unsupervised. In high-stakes work, productivity often depends on carefully staged authority. The system may be allowed to gather evidence, route across tools, synthesize findings, and even validate parts of its own work. But certain boundaries remain deliberately human. An approval is not evidence that the system failed. It is evidence that the organization understands where risk actually lives.

This is another reason Chapter 6 should pair the Software Factory with the High-Stakes Colleague. The same control-plane principle appears in both, even though the surface domain is different. In software, a human may review the patch before merge. In professional services, a human may review the trajectory before the conclusion is accepted. In both cases, adjustable autonomy is the runtime expression of trust.

## Legacy systems become runtime components

One of the most practical ideas in the High-Stakes Colleague material is that old systems are not just obstacles to agentic work. They often become runtime components of the new control plane.

Hron points out that existing validation engines can be repurposed as tools the AI system uses to inspect and correct its own work. That is a powerful pattern because it shows how durable execution changes the role of traditional enterprise software. Systems that once only served human operators now become structured checkpoints, rule engines, and verification layers inside a machine-mediated workflow.

The chapter should linger on this because it helps demystify agent architecture. Not every trustworthy agent system is built from scratch as a magical new organism. Often it is assembled from older, more stable parts: permission systems, validators, databases, workflow engines, audit trails, search layers, review queues. The model is the volatile component. The rest of the runtime is what prevents volatility from becoming operational chaos.

That is also why runtime design is inseparable from organizational design. As soon as an agent can call the old validation engine, write into the old workflow record, and surface outputs to the old reviewer queue, the boundary between “AI system” and “business process” starts to collapse. The runtime becomes the place where those worlds meet.

## Observability is part of the control plane

None of this works if the system is opaque.

Classic monitoring tells you whether a service is up, slow, or erroring. Agent observability has to answer a different kind of question: what did the system believe it was doing, what did it actually do, where did it drift, and what should a human now inspect?

That is why agent observability is not merely a nicer logging story. It is what makes the human control plane real. Humans cannot steer what they cannot see.

Good agent traces capture plans, tool calls, state changes, intermediate outputs, timings, and boundaries between durable steps. They should support two levels at once: deep inspection of a single trajectory and roll-up supervision across many concurrent tasks. The first helps engineers debug strange failures. The second helps operators manage a fleet.

This is where Chapter 4’s line from Phil Hetzel keeps paying off: observability and eval are often the same problem from a systems perspective. In Chapter 6 the claim becomes more concrete. The runtime records the trajectory. Observability renders it legible. The control plane decides where humans inspect it. Evals later mine it for reusable lessons. One layer feeds the next.

There is also an honest tension here the chapter should keep visible. Richer traces increase trust, debuggability, and governance capacity. They also increase privacy, retention, and security risk. The answer is not to avoid observability. It is to design it consciously: redaction, selective retention, risk-based views, and different surfaces for debugging versus audit. Even here, the control plane is doing governance work.

## Parallel workers create leverage only if work can be recomposed

The final runtime lesson is about subagents.

Parallel workers are compelling because they offer the same thing every manager has wanted forever: more throughput. OpenAI’s subagent materials and the coding-factory case both point toward a future where one human can launch many narrow specialists at once. Searcher, implementer, reviewer, summarizer, debugger, policy checker, migration scout. The leverage is real.

But subagents do not solve the control problem. They intensify it.

More workers mean more intermediate artifacts, more opportunities for duplicated effort, more state to coordinate, and more need for roll-up visibility. Parallelism without recomposition is just chaos at higher speed. That is why the runtime problem and the org-design problem are starting to rhyme: in both cases, leverage comes from preserving coherence across many active threads of work, not from maximizing raw worker count. The key design challenge is not how to spawn more workers. It is how to merge, compare, inspect, and route their outputs so that the human remains oriented.

This is why the best visions of multi-agent work keep converging on planning boards, supervisor views, task decomposition layers, and explicit review queues. Those are not administrative extras. They are the infrastructure that lets parallelism produce leverage rather than entropy.

The Software Factory shows the coding version of this. The High-Stakes Colleague shows the professional-services version. In both, the real question is the same: when many machine workers are active, where does coherent human judgment re-enter the system?

That place is the control plane.

## The runtime is what turns intelligence into dependable work

The real challenge of agentic systems is not producing one intelligent response. It is sustaining useful action across time without losing control.

That is a runtime problem.

Durable state, explicit workflow semantics, structured approvals, inspectable histories, observability, and reviewable roll-ups are not secondary implementation details. They are the machinery that turns bursts of model intelligence into dependable delegated work. Without them, the system remains trapped in the demo layer: locally impressive, globally fragile.

This is the deeper continuity across the book’s middle run.

Chapter 3 argued that delegated work needs a legible workplace.
Chapter 4 argued that it needs a quality loop.
Chapter 5 argued that it needs the right working set of information.
Chapter 6 adds that none of this is enough if the work cannot persist, recover, and be supervised over time.

A machine colleague is not just a model with tools. It is a model inside an operating environment.

And the better that operating environment gets, the less the future of AI engineering looks like chat and the more it looks like building dependable systems for shared human-and-machine work.
