# Chapter 4 — Evals Are the Control System

The obvious failure mode of AI is that it can be wrong. The more dangerous one is that it can look right often enough that the team stops measuring.

A demo works twice. A prototype feels sharp. A coding agent lands a decent patch. A support assistant answers a handful of questions convincingly, and everyone starts speaking in the language of vibes — the system feels promising, maybe even close to ready. That is exactly where the trouble begins, because a promising feeling is not a control loop. Production trust comes from the ability to compare versions, catch regressions, preserve hard-won lessons, and measure whether the system still works when real users, real data, and real edge cases arrive. That is what evals are for, and this chapter argues they are not a side practice you bolt on before launch. They are the operating system of a system you intend to trust.

This is the same argument Chapter 2 made about review, now mechanized. There, judgment under abundance was a human posture; here it becomes an instrument. Once a system does delegated work, you cannot eyeball every output, and the discipline that kept cheap generation honest has to become something you can run.

## The unit of evaluation changed

For most of the short history of AI evaluation, the unit was small: a single completion, a one-line answer, a snippet judged in isolation. That worked while the systems themselves were small. It stops working the moment the system's job grows.

Naman Jain, who builds coding evals at Cursor, names the shift in his own work: "coding capabilities have leapt from generating one-line snippets to completing entire codebases with agentic workflows." When the deliverable was a snippet, you could grade the snippet. When the deliverable is a multi-file change across a real repository, grading the diff line by line tells you almost nothing about whether the system did the job. The unit of evaluation has to grow to match the unit of work. A codebase change, a multi-step workflow, a retrieval-heavy research task — each has to be judged at the level it operates, not at the level that happens to be easy to score.

This is why the chapter's title insists on *control system* rather than *test suite*. A test suite checks fixed assertions about small units. A control system steers a large, drifting process toward a goal over time. The distinction is not pedantic. It determines what you build, what you measure, and whether your measurement survives contact with a system that does real work.

## Evals are not unit tests — and also are

Ido Pesok, working on evals at Vercel's v0, gave a talk with a deliberately blunt title: "Evals are not unit tests." His point is a reasoning posture. A unit test encodes a binary fact — the function returns 4, or it is broken. An eval rarely encodes a fact like that. It encodes a judgment about quality, helpfulness, safety, or fit, and treating a pass/fail eval score as if it were a unit test's green checkmark quietly smuggles in a certainty the measurement does not have. Application-layer evals are messy because reality is messy: users, latency, cost, policy, and workflow constraints all bear on whether an output was actually good, and none of them reduce cleanly to true or false.

It is worth holding that against a practitioner who says the opposite. Lawrence Jones at incident.io calls them, flatly, "AI unit tests" — and stores them as YAML files next to the prompts they grade. The disagreement looks sharp and is actually productive, because the two are describing different surfaces of the same artifact. Pesok is describing the human reasoning stance: do not mistake a quality score for a correctness proof. Jones is describing the agent-facing interface: what the eval looks like to a coding agent that just needs to add or modify a case. Both are right. An eval is not a unit test in its epistemology and is very much like one in its ergonomics, and a chapter that flattens that tension loses something true about how the discipline actually works.

## Real tasks beat synthetic cleverness

If evals encode judgment rather than facts, the question becomes where the judgment comes from — and the strongest answer in the corpus is that it is mined, not invented.

The best evaluation sets are rarely written from scratch in a clean room. They are drawn from operational history: the failed support conversations, the difficult research tasks, the painful coding regressions, the edge cases that triggered an escalation. What hurt you in production is far more informative than what looked clever in a benchmark, because it is real, specific, and already known to matter. Jain's team builds exactly this way — taking a real codebase, crawling its commit history, and mining the commits that fixed actual problems into graded tasks the agent then has to reproduce. The eval is not a synthetic puzzle. It is a re-run of work that happened.

Samuel Colvin at Pydantic adds the discipline that keeps this honest under the pressure of the GenAI era. "We still want to build reliable, scalable applications," he notes, "and that is still hard — arguably harder with Gen AI than it was before." Human-seeded evals — examples a knowledgeable person labeled because they encode a real failure mode — are unusually valuable precisely because they carry that hard-won knowledge into a form the system can be tested against repeatedly. The seeding is the point. A human who has seen the system fail in a particular way writes the case that catches that failure forever after.

The cost is real: natural tasks are harder to score and harder to maintain than toy benchmarks. But that difficulty is evidence of realism, not a reason to retreat. The more the system does genuine work, the less a synthetic eval can tell you about it.

## Observability and evals are the same problem

Here the chapter's argument turns from offline measurement to the live system, and the cleanest statement of the turn comes from Phil Hetzel at Braintrust: "Observability and eval, to us, are actually the same problem from a systems perspective." That sentence is worth sitting with, because it dissolves a distinction most teams treat as fixed.

The usual mental model keeps them apart: evals are the offline thing you run before shipping, observability is the production thing you watch after. Hetzel's claim is that they are one loop. Production traces are not merely debugging artifacts you inspect when something breaks. They are the raw material for tomorrow's regression set. Every real interaction the system has — every success, every failure, every weird edge case a user actually hit — is a candidate eval case, and the strongest teams close that loop deliberately: traces feed failure analysis, failure analysis feeds the eval set, the eval set steers the next version, and the next version is watched in production again. Observability is not downstream of evals. It is where the next generation of evals is born.

This is also why Hetzel insists that "an eval platform is not just a test runner." A test runner executes assertions and reports pass/fail. An eval platform has to hold datasets, persist results across versions, support comparison workflows, render traces beside scores, and produce scoring credible enough to act on. The infrastructure is not incidental to the discipline. It is the discipline, made operable. A team that treats evals as a script they run by hand will measure once, feel reassured, and miss the drift that the loop was supposed to catch.

## When the agents read the evals too

There is a final turn that the rest of this book has been setting up, and the corpus has exactly one strongly-argued account of it. Once coding agents are doing most of the implementation work, the eval system stops being something only humans read. It becomes an artifact the agents themselves must navigate and modify.

Lawrence Jones at incident.io describes building this the hard way. The team stored evals as YAML next to their Go prompt files, and then watched the natural instinct — wrap the evals in richer and richer browser UIs — fail twice over. Humans liked the dashboards but did not have time to use them, and the coding agents could not navigate them at all: "coding agents weren't able to work with them." The unlock was not a better UI. It was a small CLI — "a small CLI tool that we call eval tool, designed to allow agents to leverage our eval suite files." The eval suite became an interface an agent fleet could plug into, rather than a destination a human had to visit.

The same inversion solved their observability problem. incident.io had built rich web UIs to debug AI traces; the agents, again, could not use them. So instead of wrapping the trace database in a fancier front end, they dumped the whole thing as a file tree — because, as Jones puts it, "file systems are exceptionally good agent context." Then they pushed it further: their "scrapbook" pipeline downloads every backtest investigation as a file system and runs roughly twenty-five agents in parallel, one per investigation, clustering the analyses into cohort patterns. The output is not a number on a dashboard. It is a structured improvement report — agents evaluating agent output, with the human receiving a diff instead of a chart. Jones is careful to generalize: "these patterns do generalize" beyond incident response.

The chapter holds this conservatively — it rests on one talk, however well argued — but it is the natural endpoint of the control-system frame. When the thing being steered can also read the steering instrument, the eval system becomes part of the agent's own loop. The measurement and the work begin to share a substrate.

## Why this is the operating system of trust

Pull the threads together and the chapter's claim resolves. Evals are not a quality-assurance ritual performed before launch and forgotten. They are how a delegated system earns and keeps trust over time. They externalize judgment — turning fuzzy standards like *good*, *safe*, and *useful* into examples, rubrics, and thresholds a system can be held to. They scale to the real unit of work instead of the convenient one. They draw their cases from what actually hurt rather than what looked clever. They close a loop with production rather than running once in a lab. And, increasingly, they become an interface the agents themselves participate in.

This connects directly forward. Chapter 5 will argue that context is the infrastructure determining what the model can even see — and an eval is how you find out whether your context assembly earns its tokens. Chapter 6 will argue that runtimes carry the work across time — and an eval is how you know the long-running system still behaves after the tenth resume. Chapter 9 will make eval and review capacity the throughput limit of an entire organization. In every case the eval is the instrument that converts a hope about the system into evidence about it.

The book's recurring claim is that reliability comes from the scaffolding around the model, not from the model's cleverness. Evals are the part of that scaffolding that tells you whether the rest of it is working. Without them, every other discipline in this book is a guess you have decided to believe. With them, it becomes something you can measure, steer, and trust.
