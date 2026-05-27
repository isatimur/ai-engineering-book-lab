# Chapter 4 — Evals Are the Control System

## Role in the book
Turn trust into measurement. This is where the book argues that evaluation is the real operating system of production AI.

## Supporting source cluster
- [[023-X4dEHRzBLmc-judge-the-judge-building-llm-evaluators-that-actually-work-with-gepa-mahmoud-mabrouk-agent|#23 — Judge the Judge: Building LLM Evaluators That Actually Work with GEPA — Mahmoud Mabrouk, Agenta AI]]
- [[050-2HNSG990Ew8-shipping-ai-that-works-an-evaluation-framework-for-pms-aman-khan-arize|#50 — Shipping AI That Works: An Evaluation Framework for PMs – Aman Khan, Arize]]
- [[072-tHN44yJoeS8-coding-evals-from-code-snippets-to-codebases-naman-jain-cursor|#72 — Coding Evals: From Code Snippets to Codebases – Naman Jain, Cursor]]
- [[112-a4BV0gGmXgA-five-hard-earned-lessons-about-evals-ankur-goyal-braintrust|#112 — Five hard earned lessons about Evals — Ankur Goyal, Braintrust]]
- [[121-MC55hdWLq4o-the-future-of-evals-ankur-goyal-braintrust|#121 — The Future of Evals - Ankur Goyal, Braintrust]]
- [[125-L8OoYeDI_ls-evals-are-not-unit-tests-ido-pesok-vercel-v0|#125 — Evals Are Not Unit Tests — Ido Pesok, Vercel v0]]
- [[126-CQGuvf6gSrM-2025-is-the-year-of-evals-just-like-2024-and-2023-and-john-dickerson-ceo-mozilla-ai|#126 — 2025 is the Year of Evals! Just like 2024, and 2023, and … — John Dickerson, CEO Mozilla AI]]
- [[184-o_LRtAomJCs-human-seeded-evals-samuel-colvin-pydantic|#184 — Human seeded Evals — Samuel Colvin, Pydantic]]
- [[212-coKKKKh8Vns-how-to-run-evals-at-scale-thinking-beyond-accuracy-or-similarity-muktesh-mishra-adobe|#212 — How to run Evals at Scale: Thinking beyond Accuracy or Similarity — Muktesh Mishra, Adobe]]
- [[628-_fQ7Z_Wfouk-why-building-eval-platforms-is-hard-phil-hetzel-braintrust|#628 — Why building eval platforms is hard — Phil Hetzel, Braintrust]]
- [[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|#689 — Fighting AI with AI — Lawrence Jones, incident.io]]

## Strongest claims
1. Benchmarks alone do not create trust; operational eval loops do.
2. Repo-level and task-level evals are more predictive than snippet-level evals.
3. Human-seeded evals are unusually valuable because they encode real failure modes.
4. Evals must measure the system, not only the model.
5. Eval platforms are not just batch runners; they also need datasets, UIs, persistence, comparison workflows, and credible scoring.
6. Observability and eval form a flywheel: production traces become the next generation of offline evals.
7. Once coding agents are doing the work, the eval system itself must be agent-readable — a CLI over YAML, not a browser UI — so the agents being evaluated can also participate in modifying their own measurement.

## Useful quotes / excerpts
> "Coding capabilities have leapt from generating one-line snippets to completing entire codebases with agentic workflows." — [[072-tHN44yJoeS8-coding-evals-from-code-snippets-to-codebases-naman-jain-cursor|Naman Jain]]

> "Evals are not unit tests." — [[125-L8OoYeDI_ls-evals-are-not-unit-tests-ido-pesok-vercel-v0|Ido Pesok]]

> "An eval platform is not just a test runner." — [[628-_fQ7Z_Wfouk-why-building-eval-platforms-is-hard-phil-hetzel-braintrust|Phil Hetzel]]

> "Observability and eval to us ... it's actually the same problem from a systems perspective." — [[628-_fQ7Z_Wfouk-why-building-eval-platforms-is-hard-phil-hetzel-braintrust|Phil Hetzel]]

> "evals for me are AI unit tests." — [[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|Lawrence Jones]]

> "evals live in YAML files" — [[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|Lawrence Jones]]

> "coding agents weren't able to work with them." — [[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|Lawrence Jones]]

> "small CLI tool that we call eval tool ... designed to allow agents to leverage our eval suite files." — [[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|Lawrence Jones]]

> "agents can't properly use them." — [[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|Lawrence Jones]] (on the visual debugger UIs incident.io built for humans)

> "download all of the UI that we have as a file system?" — [[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|Lawrence Jones]]

> "file systems are exceptionally good agent context." — [[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|Lawrence Jones]]

> "25 agents in parallel" — [[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|Lawrence Jones]] (the "scrapbook" pipeline that clusters backtest failures into actionable reports)

> "these patterns do generalize." — [[689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident|Lawrence Jones]]

## Agent-readable evals — the next layer

The first six claims above all describe evals as a control system for *humans* — humans write them, humans read the scorecards, humans decide what to do next. Lawrence Jones (incident.io, #689) closes the loop the rest of the book has been opening: once coding agents are doing most of the implementation work, the eval system itself becomes an artifact they must read and modify. The chapter's existing thesis ("evals are not unit tests") gets a deliberate counter-framing from a practitioner who explicitly calls them "AI unit tests" — and the disagreement is productive, because Jones is describing the agent-facing surface, not the underlying epistemology.

Three operational moves to anchor a section on this:

1. **CLI over YAML, not browser UI over database.** incident.io stores evals as YAML next to Go prompt files. The natural temptation was to keep adding rich web UIs for editing them; what actually unlocked agent self-improvement was a "small CLI tool that we call eval tool ... designed to allow agents to leverage our eval suite files." The eval suite became an interface, not a destination. This is the structural move that converts Claim #8 (evals as control system) from a human-centric framing into one that an agent fleet can plug into.

2. **"Download your UI as a file system."** incident.io built rich browser UIs to debug AI traces — humans liked them, but humans didn't have time to use them, and coding agents couldn't navigate them at all. The unlock was inverting the export direction: rather than wrap the database in a fancier UI, dump the full trace as a file tree the agent can `grep` through. "file systems are exceptionally good agent context." This is the operational reason production observability (Claim #19) needs an export format, not only a dashboard.

3. **Parallelized meta-analysis.** Aggregate backtest numbers ("86% accurate") move up or down but don't say why. incident.io's "scrapbook" pipeline downloads every backtest investigation as a file system, runs roughly "25 agents in parallel" — one per investigation — then clusters their analyses into cohort patterns. The output is not a number but a structured improvement report. This is what an eval *control system* actually looks like once the loop closes: agents evaluating agent output, with humans receiving a diff instead of a dashboard.

Jones explicitly generalizes the pattern beyond incident response: "these patterns do generalize." The chapter should keep promotion conservative — this is one strongly-argued talk — but it is exactly the operational layer the open question "should the chapter include a dedicated section on eval platforms as organizational infrastructure?" was reaching for.

### Tension to preserve
Jones calls evals "AI unit tests"; Ido Pesok (Vercel v0, #125) titled his talk "Evals Are Not Unit Tests." The disagreement is not actually about epistemology — Jones is describing an agent-facing CLI surface (what the file looks like to a coding agent that just needs to add or modify a case), Pesok is describing the human reasoning posture (whether you should treat eval pass/fail as binary correctness signal). Both can be true. The chapter should name this gap rather than flatten it.

## Open questions
- Should the chapter emphasize coding evals specifically or use them as one case of a broader eval thesis?
- How much methodology detail belongs here versus an appendix?
- Which diagram best explains eval loops to non-research readers?
- Should the chapter include a dedicated section on eval platforms as organizational infrastructure? **(Partially resolved — see "Agent-readable evals" above. Remaining sub-question: how much of the section should be #689's concrete CLI/file-system patterns vs. a more abstract argument?)**
- Where does the AI-unit-tests-vs-not-unit-tests tension between #689 (Jones) and #125 (Pesok) belong — inside Chapter 4, or as a callback in Chapter 9?
