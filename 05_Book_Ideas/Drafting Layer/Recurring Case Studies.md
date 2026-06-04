# Recurring Case Studies

Purpose: give the book 2 recurring examples that can anchor multiple chapters so the manuscript feels cumulative rather than like a tour of disconnected talks.

---

## Case Study 1 — The Agent-Ready Codebase Becomes a Software Factory

### Short label
**The Software Factory**

### Core story
A team starts by using AI as a fast autocomplete layer inside an ordinary repo. Results are inconsistent: good demos, uneven production quality, and too much manual cleanup. The team then realizes the bottleneck is not only the model but the environment. They rewrite the working surface for agents: clearer repo structure, tighter rules, stronger tests, explicit specs, reusable personas, and a staged workflow for planning, coding, review, and verification. Over time, the repo stops being just a place code lives and becomes a managed production environment for machine work — a software factory.

### Why this is one of the best anchors
- It is highly legible to the book's core audience.
- It ties directly to the book's thesis that scaffolding creates trust.
- It naturally spans individual productivity, platform design, and org change.
- It gives Chapters 3, 4, and 6 a shared concrete object.

### Best source cluster
- [[016-am_oeAoUhew-harness-engineering-how-to-build-software-when-humans-steer-agents-execute-ryan-lopopolo-o|#16 — Ryan Lopopolo, OpenAI]]
- [[040-HY_JyxAZsiE-spec-driven-development-agentic-coding-at-faang-scale-and-quality-al-harris-amazon-kiro|#40 — Al Harris, Amazon Kiro]]
- [[057-ShuJ_CN6zr4-making-codebases-agent-ready-eno-reyes-factory-ai|#57 — Eno Reyes, Factory AI]]
- [[072-tHN44yJoeS8-coding-evals-from-code-snippets-to-codebases-naman-jain-cursor|#72 — Naman Jain, Cursor]]
- [[099-flf_IKnFYnE-from-stateless-nightmares-to-durable-agents-samuel-colvin-pydantic|#99 — Samuel Colvin, Pydantic]]
- [[167-1izYWsokr9s-scaling-ai-agents-without-breaking-reliability-preeti-somal-temporal|#167 — Preeti Somal, Temporal]]
- [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629 — Eric Zakariasson, Cursor]]
- [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632 — Vaibhav Srivastav & Katia Gil Guzman, OpenAI]]

### What this case study demonstrates
1. **Harness design** — prompts alone do not scale; rules, docs, tests, and repo structure matter.
2. **Specs as executable intent** — specs become a control surface for distributed machine work.
3. **Codebase-level evals** — success must be measured on real tasks in real repos.
4. **Runtime concerns** — parallel agents need orchestration, history, and human review.
5. **Org redesign** — the team gradually behaves less like a group of solo coders and more like operators of a factory.

### Best chapter uses

#### Chapter 3 — Harnesses, Specs, and Codebases Agents Can Actually Use
This is the primary chapter for the case study. The chapter can show the repo's evolution from messy shared context to a prepared environment where agents can reliably act.

#### Chapter 4 — Evals Are the Control System
Use the same factory to ask: how do you know it works? Introduce repo-level evals, regression datasets, traces from failed runs, and review queues as the factory's quality system.

#### Chapter 6 — Runtimes, State, and the Human Control Plane
Extend the case from one agent to many. The question becomes: once multiple agents are spawned, where do state, approvals, retries, and roll-up visibility live?

#### Chapter 9 — The AI-Native Organization
Show the org consequences: repo councils, rules ownership, specialized reviewer personas, and new expectations about what senior engineers actually do.

### Suggested recurring beats
- **Beat 1:** the team gets exciting output but too much slop.
- **Beat 2:** they add rules, specs, and stronger validation.
- **Beat 3:** they stop thinking in prompts and start thinking in environments.
- **Beat 4:** they spawn multiple specialized agents and now need orchestration.
- **Beat 5:** they discover that the real product is not only code generation but a managed system of delegated work.

### Best supporting lines
- "The important thing is not the code but the prompt and the guardrails that got you there." — Ryan Lopopolo
- "The spec then becomes the natural language representation of your system." — Al Harris
- "Building your own software factory... and the practical steps getting there." — Eric Zakariasson
- "Here's what everyone is working on... and here's what you as a human need to review." — Eric Zakariasson

### Editorial caution
Do not let this become a vendor-specific coding-agent chapter. The value of the case is that it models a general pattern: prepared environment -> measurable execution -> orchestrated delegation.

---

## Case Study 2 — High-Stakes Legal and Tax Workflows Move from Assistant to Colleague

### Short label
**The High-Stakes Colleague**

### Core story
A professional-services system begins as a helpful assistant: it summarizes documents, answers questions, and cites sources. But legal and tax users do not just need help; they need work done correctly inside bounded, high-stakes workflows. The system therefore evolves into a constrained colleague. It retrieves from proprietary content, uses domain-specific tools, validates intermediate results, records its path, tunes autonomy by task, and surfaces its reasoning trail for expert review. The point is not maximal freedom. The point is dependable delegated work under professional risk.

### Why this is one of the best anchors
- It perfectly fits the title **From Copilot to Colleague**.
- It demonstrates why trust architecture matters in domains where being wrong is expensive.
- It broadens the book beyond coding without leaving the dependable-systems frame.
- It naturally activates chapters on context, runtime, and security.

### Best source cluster
- [[003-XNtkiQJ49Ps-agents-need-more-than-a-chat-jacob-lauritzen-cto-legora|#3 — Jacob Lauritzen, Legora]]
- [[154-W1MiZChnkfA-scaling-enterprise-grade-rag-lessons-from-legal-frontier-calvin-qi-harvey-chang-she-lance|#154 — Calvin Qi, Harvey + Chang She, Lance]]
- [[193-hxFpUcvWPcU-how-to-build-enterprise-aware-agents-chau-tran-glean|#193 — Chau Tran, Glean]]
- [[198-kTnfJszFxCg-3-ingredients-for-building-reliable-enterprise-agents-harrison-chase-langchain-langgraph|#198 — Harrison Chase, LangChain/LangGraph]]
- [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206 — Joel Hron, Thomson Reuters]]

### What this case study demonstrates
1. **The shift in goal** — from helpfulness to productivity.
2. **Context architecture** — proprietary content, retrieval, and domain grounding matter.
3. **Runtime design** — long-running trajectories, validation engines, and inspectable paths matter.
4. **Control boundaries** — autonomy should be dialed by workflow, not maximized in the abstract.
5. **Trust and governance** — auditability and human review are part of the product, not a tax on the product.

### Best chapter uses

#### Chapter 1 — The Shift: From Assistant to Delegate
This is the cleanest opening use. Legal and tax work make the stakes obvious: an assistant can be merely helpful; a colleague must be dependable.

#### Chapter 5 — Context Is Infrastructure
Use this case to show that domain performance is downstream of information architecture: proprietary corpora, retrieval layers, citation tools, and knowledge topology.

#### Chapter 6 — Runtimes, State, and the Human Control Plane
This is where the case becomes especially strong. The system's note-writing, trajectory inspection, and validation loops are a concrete control-plane story.

#### Chapter 7 — Security, Identity, and High-Stakes Trust
The case naturally sharpens questions of permissions, provenance, audit trails, and professional accountability.

#### Chapter 9 — The AI-Native Organization
The existence of such a system implies changes in workflows, review norms, and the role of domain experts.

### Suggested recurring beats
- **Beat 1:** helpful assistant answers questions with citations.
- **Beat 2:** users want the system to perform multi-step domain work.
- **Beat 3:** the team constrains tools, content, and workflows instead of chasing unrestricted autonomy.
- **Beat 4:** the system gains validation engines, trajectories, notes, and review checkpoints.
- **Beat 5:** the resulting product behaves less like chat and more like a bounded professional colleague.

### Best supporting lines
- "That north star has shifted from helpfulness to productive." — Joel Hron
- "We like to define it more as a spectrum... these are dials... depending on the use case." — Joel Hron
- "The AI system can use [the validation engine] to validate the work that it's doing... and resolve to finish the workflow." — Joel Hron
- "These are... the trajectories that the model would be following..." — Joel Hron

### Editorial caution
Do not frame this case as 'AI replaces lawyers.' The stronger framing is that professional systems become constrained collaborators embedded inside expert workflows.

---

## Recommendation: how to use both together

These two case studies complement each other well.

- **Software Factory** shows the book's thesis inside software engineering itself.
- **High-Stakes Colleague** proves the thesis generalizes to domains where trust, context, and auditability matter even more.

Together they let the book alternate between:
- a code-centric case readers can immediately picture
- a domain-heavy case that raises the stakes and widens the book beyond coding agents

## Recommended distribution across the manuscript
- **Chapter 1:** open with High-Stakes Colleague
- **Chapter 3:** major use of Software Factory
- **Chapter 4:** continue Software Factory through quality control
- **Chapter 5:** major use of High-Stakes Colleague via legal research / enterprise knowledge
- **Chapter 6:** explicitly pair both cases
- **Chapter 7:** reuse High-Stakes Colleague
- **Chapter 9:** return to Software Factory as org redesign

## Final recommendation
If only one case study gets heavier repetition, make it **The Software Factory** because it is the most legible and structurally useful. But keep **The High-Stakes Colleague** as the book's title-justifying mirror case, because it best explains why scaffolding, controls, and bounded autonomy matter in the first place.
