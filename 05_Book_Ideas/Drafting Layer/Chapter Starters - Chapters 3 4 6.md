# Chapter Starters — Chapters 3, 4, 6

These are not full chapters. They are writing-ready starters: a usable opening move, section sequence, draftable claims, and source anchors strong enough to begin manuscript drafting.

---

# Chapter 3 — Harnesses, Specs, and Codebases Agents Can Actually Use

## Working chapter promise
If you want AI to write production software, do not start by asking what model to use. Start by asking whether your environment is legible, constrained, and measurable enough for delegated work.

## Possible opening
When coding agents disappoint, teams usually blame the model. The model missed a dependency. The model misunderstood the architecture. The model made a change that technically worked but violated every unwritten rule in the repository. But that diagnosis is too flattering to the humans involved. In many cases, the agent is not failing because it is stupid. It is failing because it has been dropped into a codebase whose standards are mostly tacit, whose rules live in scattered human memory, and whose notion of "good work" depends on dozens of non-functional judgments no one ever bothered to write down.

That is why Ryan Lopopolo's formulation matters: the important thing is not only the code that came out, but the prompts and guardrails that got you there. Once AI moves from autocomplete to delegated implementation, the environment becomes part of the product. Specs, tests, linting, repository shape, architecture decision records, examples of good reviews, even stable naming conventions — all of these stop being background engineering hygiene and become execution infrastructure.

This is the deeper meaning of harness engineering. The harness is not a wrapper around a model. It is the set of constraints, artifacts, and feedback loops that make a software environment workable for machine labor. A good harness does not merely increase success rates. It converts fuzzy expectations into legible boundaries. It teaches the agent what a good patch looks like in this codebase, for this team, under these constraints.

## Draft throughline
The chapter should move from **"why the agent produced slop"** to **"what the environment failed to specify"**.

## Section skeleton

### 3.1 The repo is the real interface
**Draft direction:**
The superficial interface is chat. The real interface is the codebase plus everything surrounding it. Agents do not work inside abstract tasks; they work inside concrete environments full of hidden assumptions. That is why the practical unit of agentic coding is not the code snippet but the repository.

**Source anchors:**
- [[016-am_oeAoUhew-harness-engineering-how-to-build-software-when-humans-steer-agents-execute-ryan-lopopolo-o|#16]]
- [[072-tHN44yJoeS8-coding-evals-from-code-snippets-to-codebases-naman-jain-cursor|#72]]
- [[057-ShuJ_CN6zr4-making-codebases-agent-ready-eno-reyes-factory-ai|#57]]

**Key move:**
Introduce the idea that code quality depends on hundreds of small non-functional judgments. If those are not externalized, the model has no chance of reproducing them reliably.

### 3.2 Specs are not paperwork; they are executable intent
**Draft direction:**
Al Harris gives the strongest framing here: the spec becomes the natural-language representation of the system. That line should do real work. Specs are not important because documentation is morally good. They matter because agents need a stable control surface. Requirements, design decisions, and task breakdowns let the team shift intent from fragile conversational context into persistent, inspectable artifacts.

**Source anchors:**
- [[040-HY_JyxAZsiE-spec-driven-development-agentic-coding-at-faang-scale-and-quality-al-harris-amazon-kiro|#40]]
- [[016-am_oeAoUhew-harness-engineering-how-to-build-software-when-humans-steer-agents-execute-ryan-lopopolo-o|#16]]

**Key move:**
Explain that spec-driven development matters more in an AI-native workflow than in a purely human workflow because specs let intent survive context windows, handoffs, retries, and parallelism.

### 3.3 Agent-ready codebases are designed, not discovered
**Draft direction:**
Eno Reyes provides the most useful bridge from classic engineering hygiene to AI-native environment design. The point is not just "have tests." It is "have validations and repo affordances so clear that a coding agent can navigate them without constant rescue." This section should introduce a concise checklist.

**Possible checklist:**
- stable folder structure
- explicit setup and run commands
- strong lint/type/test gates
- architectural rules in files, not in tribal memory
- examples of accepted patterns
- task specs stored with the repo
- narrow, purpose-built tools where possible

**Source anchors:**
- [[057-ShuJ_CN6zr4-making-codebases-agent-ready-eno-reyes-factory-ai|#57]]
- [[190-Zniw5c9_jx8-mentoring-the-machine-eric-hou-augment-code|#190]]
- [[621--QFHIoCo-Ko-full-walkthrough-workflow-for-ai-coding-matt-pocock|#621]]

### 3.4 The harness becomes a factory
**Draft direction:**
This is the chapter's most future-facing section. Eric Zakariasson and the Codex subagents talk push the argument from single-agent effectiveness toward system design. A mature harness starts looking like a factory: specs checked into the repo, reusable personas, specialized subagents, review slices, status views, and quality gates.

**Source anchors:**
- [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629]]
- [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632]]

**Key move:**
End the chapter by widening the reader's frame: the goal is not an agent that writes code in isolation, but a production environment where delegated coding work can be planned, executed, inspected, and improved.

## Candidate closing paragraph
The lesson is easy to miss because AI tooling is marketed at the point of generation. But the durable advantage is not generation. It is environment design. Teams that win with coding agents will not be the ones with the most magical prompt. They will be the ones that turned their repositories into legible, constrained, well-instrumented workplaces for machine collaborators. In that world, the harness is no longer a helper around the codebase. It is part of the codebase.

---

# Chapter 4 — Evals Are the Control System

## Working chapter promise
If Chapter 3 explains how to make delegated work possible, Chapter 4 explains how to make it trustworthy.

## Possible opening
The first failure mode of AI systems is obvious: they can be wrong. The second is more dangerous: they can look right often enough that teams stop measuring. A demo works twice in a row. A prototype produces a plausible answer. A coding agent lands a decent patch in a familiar repo. Everyone starts speaking in the language of vibes. The system feels promising. But production trust does not come from a promising feeling. It comes from disciplined evidence.

That is why the real role of evals is often misunderstood. Evals are not there to decorate a launch deck or to compare two models in the abstract. They are there to create a control loop around delegated work. As the task horizon stretches from single-line completion to repo-scale changes and multi-step workflows, the gap between toy metrics and operational reliability gets wider. The hard question stops being "Is the model smart?" and becomes "Can this system repeatedly do useful work in our environment without silently drifting out of bounds?"

In other words, evals are not a side practice. They are the control system of production AI.

## Draft throughline
The chapter should move from **"benchmarks are insufficient"** to **"production systems need continuous measurement loops grounded in real work."**

## Section skeleton

### 4.1 The unit of evaluation changed
**Draft direction:**
Naman Jain offers the clearest arc: from snippet completion to entire codebases and hours-long tasks. The chapter should use that progression to argue that many inherited evaluation habits are mismatched to current systems.

**Source anchors:**
- [[072-tHN44yJoeS8-coding-evals-from-code-snippets-to-codebases-naman-jain-cursor|#72]]
- [[125-L8OoYeDI_ls-evals-are-not-unit-tests-ido-pesok-vercel-v0|#125]]

**Key move:**
Explain that when the unit of work changes, the unit of evaluation must change too.

### 4.2 Real-world tasks beat synthetic cleverness
**Draft direction:**
Use Naman Jain's construct-validity framing: tasks should be natural, sourced from the real world, and reliably gradable. This is the chapter's best methodological center. The strongest concrete image is mining commits from real repositories to create eval tasks that reflect actual work.

**Source anchors:**
- [[072-tHN44yJoeS8-coding-evals-from-code-snippets-to-codebases-naman-jain-cursor|#72]]
- [[184-o_LRtAomJCs-human-seeded-evals-samuel-colvin-pydantic|#184]]

**Key move:**
Introduce the idea of **human-seeded evals** as a way of encoding painful, historically real failure modes rather than imagined ones.

### 4.3 Application-layer evals are about users, apps, and data
**Draft direction:**
Ido Pesok's framing is especially useful because it moves the discussion out of research-lab language. The system is in the wild now. It has users, state, latency, cost, edge cases, and adversarial traffic. This section should make the reader feel why app-level evals are inherently messier and more valuable than leaderboard performance.

**Source anchors:**
- [[125-L8OoYeDI_ls-evals-are-not-unit-tests-ido-pesok-vercel-v0|#125]]
- [[050-2HNSG990Ew8-shipping-ai-that-works-an-evaluation-framework-for-pms-aman-khan-arize|#50]]
- [[212-coKKKKh8Vns-how-to-run-evals-at-scale-thinking-beyond-accuracy-or-similarity-muktesh-mishra-adobe|#212]]

**Key move:**
Show why apparent reliability in a narrow prompt test often collapses when exposed to real user input distributions.

### 4.4 Observability becomes tomorrow's eval set
**Draft direction:**
This is where Phil Hetzel's line should land hard: observability and eval are the same problem from a systems perspective. Production traces are not only for debugging incidents. They are raw material for the next generation of offline evaluation.

**Source anchors:**
- [[628-_fQ7Z_Wfouk-why-building-eval-platforms-is-hard-phil-hetzel-braintrust|#628]]
- [[043-SbcQYbrvAfI-build-a-prompt-learning-loop-sallyann-delucia-fuad-ali-arize|#43]]
- [[121-MC55hdWLq4o-the-future-of-evals-ankur-goyal-braintrust|#121]]

**Key move:**
Describe the eval flywheel: observe failures -> label patterns -> turn them into datasets -> compare systems -> deploy improvements -> observe again.

### 4.5 The control system is organizational, not only technical
**Draft direction:**
An eval platform is not just a runner. It includes datasets, scoring logic, comparison workflows, interfaces for review, and norms for deciding what counts as acceptable. This is where the chapter can hint at Chapter 9: mature AI teams institutionalize evals instead of treating them as a heroic side project.

**Source anchors:**
- [[628-_fQ7Z_Wfouk-why-building-eval-platforms-is-hard-phil-hetzel-braintrust|#628]]
- [[112-a4BV0gGmXgA-five-hard-earned-lessons-about-evals-ankur-goyal-braintrust|#112]]
- [[126-CQGuvf6gSrM-2025-is-the-year-of-evals-just-like-2024-and-2023-and-john-dickerson-ceo-mozilla-ai|#126]]

## Candidate closing paragraph
Once AI systems start doing work instead of merely suggesting it, measurement stops being optional. You cannot supervise every action directly. You cannot reason from model benchmarks to production trust. What you can do is build a control system: representative tasks, credible scoring, failure capture, comparison loops, and a habit of turning real mistakes into better tests. That is what evals are for. Not to tell you whether your model is impressive, but to tell you whether your system is safe to trust.

---

# Chapter 6 — Runtimes, State, and the Human Control Plane

## Working chapter promise
The moment agents act over time, across tools, and under uncertainty, architecture becomes destiny.

## Possible opening
A chatbot can get away with amnesia. A production agent cannot.

The difference is not philosophical; it is architectural. A chat system can answer a question and disappear. But an agent that performs real work has to survive delays, retries, partial failures, changing context, tool errors, and human interruptions. It has to remember what it was doing. It has to expose what it has done. It has to know when to continue autonomously and when to stop for review. Once work becomes long-running and multi-step, the core problem is no longer model access. It is execution semantics.

This is why so many impressive demos fall apart when teams try to operationalize them. The failure is not always in the reasoning. Often it is in the runtime. The agent loses state. A retry duplicates work. A human cannot tell what happened. A subagent produces something important but there is no place for collective review. The system was built like a conversation when it should have been built like a workflow.

To move from copilot to colleague, teams need more than smart models. They need runtimes that preserve state, orchestrate actions, record history, and create a human control plane around delegated work.

## Draft throughline
The chapter should move from **"stateless chat breaks"** to **"durable workflows plus human supervision create trustworthy autonomy."**

## Section skeleton

### 6.1 Stateless systems hit a wall
**Draft direction:**
Samuel Colvin and Preeti Somal together give the chapter its first move. Longer-running workflows expose the weakness of stateless designs. The point is not that chat is useless; it is that chat is insufficient as the execution substrate for serious delegated work.

**Source anchors:**
- [[099-flf_IKnFYnE-from-stateless-nightmares-to-durable-agents-samuel-colvin-pydantic|#99]]
- [[167-1izYWsokr9s-scaling-ai-agents-without-breaking-reliability-preeti-somal-temporal|#167]]

**Key move:**
Frame durability as a trust feature, not an infrastructure detail.

### 6.2 Agentic systems are workflows with state, approvals, and parallelism
**Draft direction:**
Preeti Somal's talk is the backbone here. At the core of these systems is a complicated workflow that spans time, tools, state, and approvals. This section should make the book's argument concrete: workflows are not the opposite of agents. They are the structure within which useful agency becomes possible.

**Source anchors:**
- [[167-1izYWsokr9s-scaling-ai-agents-without-breaking-reliability-preeti-somal-temporal|#167]]
- [[138-8SUJEqQNClw-agents-vs-workflows-why-not-both-sam-bhagwat-mastra-ai|#138]]
- [[201-sl3icG-IjHo-how-to-build-planning-agents-without-losing-control-yogendra-miraje-factset|#201]]

**Key move:**
Dislodge the false dichotomy between flexible agents and rigid workflows.

### 6.3 The human control plane is an architectural layer
**Draft direction:**
One of the book's best concepts should crystallize here. Human oversight is not a polite UX flourish added after the fact. It is an execution layer: approvals, summaries, escalation points, trace inspection, and roll-up views of active work. The human is not manually doing every step, but neither are they absent.

**Source anchors:**
- [[167-1izYWsokr9s-scaling-ai-agents-without-breaking-reliability-preeti-somal-temporal|#167]]
- [[623-ClWD8OEYgp8-collaborative-ai-engineering-one-dev-two-dozen-agents-zero-alignment-maggie-appleton-githu|#623]]
- [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629]]

**Key move:**
Define the control plane in plain language: the place where a human can see, steer, inspect, and approve delegated machine work.

### 6.4 High-stakes systems tune agency instead of maximizing it
**Draft direction:**
Joel Hron's spectrum framing is the right antidote to autonomy maximalism. In legal, tax, compliance, and similar workflows, the right question is not "How autonomous can we make it?" but "Where should agency be dialed up or down?"

**Source anchors:**
- [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206]]
- [[003-XNtkiQJ49Ps-agents-need-more-than-a-chat-jacob-lauritzen-cto-legora|#3]]
- [[198-kTnfJszFxCg-3-ingredients-for-building-reliable-enterprise-agents-harrison-chase-langchain-langgraph|#198]]

**Key move:**
Introduce adjustable autonomy as the runtime expression of trust.

### 6.5 History, traces, and exportable workflows create inspectability
**Draft direction:**
A durable runtime records what happened. That sounds mundane until you realize inspectability is what makes debugging, compliance, and human review possible. In a long-running agent system, history is not just a log. It is the memory of the work.

**Source anchors:**
- [[167-1izYWsokr9s-scaling-ai-agents-without-breaking-reliability-preeti-somal-temporal|#167]]
- [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206]]

### 6.6 Subagents increase leverage only if their work can be recomposed
**Draft direction:**
The chapter should end by bringing back the software-factory case. Parallel subagents are compelling because they promise speed. But speed without a control plane becomes chaos. The key design problem is not how to spawn more workers; it is how to recombine, inspect, and approve what they produce.

**Source anchors:**
- [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629]]
- [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632]]
- [[028-2czYyrTzILg-from-chaos-to-choreography-multi-agent-orchestration-patterns-that-actually-work-sandipan-|#28]]

## Candidate closing paragraph
The real challenge of agentic systems is not producing a single intelligent response. It is sustaining useful action across time without losing control. That is a runtime problem. Durable state, explicit workflow semantics, inspectable history, and human checkpoints are not secondary implementation details. They are the machinery that turns bursts of model intelligence into dependable delegated work. If Chapter 3 was about preparing the workplace and Chapter 4 was about measuring the output, this chapter is about building the operating environment in which a machine colleague can actually be trusted to keep working.

---

## Closest-to-draft verdict

Of these three, the current drafting order should be:
1. **Chapter 3** — most immediately draftable; strongest explanatory arc and case-study fit
2. **Chapter 4** — close behind; especially strong if written around the control-system metaphor
3. **Chapter 6** — conceptually rich and source-backed, but needs the most discipline to avoid turning into a platform taxonomy
