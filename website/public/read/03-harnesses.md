# Chapter 3 — Harnesses, Specs, and Codebases Agents Can Actually Use

When coding agents disappoint, teams usually blame the model.

The model missed a dependency. The model misunderstood the architecture. The model refactored the right function but violated a local convention no outsider could have guessed. The model produced code that technically passed, yet somehow still felt wrong. In the postmortem, intelligence becomes the default suspect.

Sometimes that diagnosis is fair. Models do fail because they are weak, distracted, or simply not yet capable enough for the task. But in production codebases, that explanation is often too flattering to the humans involved. Many agent failures are not evidence that the model is hopeless. They are evidence that the environment was never made legible enough for delegated work.

Ryan Lopopolo puts the inversion bluntly: “The important thing is not the code but the prompt and the guardrails that got you there.” The line sounds almost rude in a field obsessed with generated output. But it captures one of the deepest shifts in AI-native engineering. Once you ask a machine to do implementation work instead of merely suggesting snippets, the surroundings become part of the product. The harness around the model starts determining what kind of work is even possible.

If you want AI to write production software, do not begin by asking what model to use. Begin by asking whether your repository, specs, validations, and workflow are structured well enough for a machine collaborator to operate without constant rescue.

## A small software-factory vignette

Consider a team that starts where many teams now start: with a good model inside an ordinary repo. The repo has no `AGENTS.md`, no checked-in setup script, lint that warns instead of failing, and a test suite a contributor can skip without anyone noticing.

At first the results feel magical. The agent writes tests faster than the humans expect. It handles small UI changes cleanly. It can even land a respectable refactor if a senior engineer hovers nearby and corrects its misunderstandings in real time. So the team expands the scope. They ask it to wire together a new endpoint, touch a migration, update a frontend state machine, and preserve some vague house style that nobody has ever written down.

The watch-for here is the moment scope crosses from tasks one senior can supervise in real time to tasks that run unsupervised. That is exactly where quality stops being merely good or bad and starts being erratic.

The patches arrive with no shared failure signature. One uses a dependency the team would never approve, because nothing in the repo encodes the approved set. Another passes tests but ignores a performance convention learned the hard way six months earlier, because that convention lives in one engineer's memory and not in a lint rule. A third is logically fine yet shaped in a way that makes review irritating and rollback risky. The team says the model is inconsistent. What they really mean is that the workplace is inconsistent — the same task can produce three different answers because the environment never pinned down which one is right.

So they change the workplace instead of swapping the model.

They add explicit setup scripts instead of Slack archaeology. They tighten lint and type gates. They create agent-facing instructions. They check in examples of accepted patterns. They write slimmer task specs before handing work off. They stop relying on “everyone kind of knows how we do migrations here.” The repo becomes less like a haunted archive of past decisions and more like a managed surface for machine labor.

That is the recurring case I will call the software factory, and it shows exactly where the leverage sits. The breakthrough is not that the model suddenly became a genius. It is that the team converted tacit judgment into things the agent can read and run: an approved-dependency list the agent checks, a performance rule promoted from memory to a failing test, a setup script that replaces Slack archaeology. Eno Reyes of Factory AI puts the punchline starkly — when you imagine the fully autonomous flow where a filed bug is picked up, fixed, reviewed, and shipped in an hour, "the limiter is not the capability of the coding agent. The limit is your organization's validation criteria." The model was always good enough for the small wins. What gated the larger ones was how much of the team's own standard had been made mechanical.

## The repo is the real interface

Most coding tools still present themselves through chat. You type a request, maybe select a few files, and wait for the assistant to propose a patch. That interface is useful, but it has a predictable trap: it implies the real problem lives in the prompt, so a disappointing result sends you back to reword the prompt rather than to fix the repo. The tell that you have fallen into it is a prompt that has grown three paragraphs of "and remember to" caveats — every one of those caveats is a standard that should have lived in a file the agent reads on every task, not in the wording of one request.

In practice, the prompt is only the visible tip of a much larger system, and the part you can edit on Monday is the part below the waterline.

That part is the codebase plus everything around it: the setup instructions, the architecture, the naming conventions, the tests, the lint rules, the examples of good patches, the traces of previous reviews, the ADRs, the failure cases, and the rules about performance or security that no single file states explicitly. A human engineer entering a mature repository absorbs these constraints slowly. They ask teammates what matters. They notice which patterns recur. They learn what kinds of changes get approved quickly and which ones trigger suspicion.

An agent gets none of that apprenticeship unless the team encodes it, because the agent has no teammates to ask and no memory of last quarter's incident. Whatever was learned in a hallway is, to the agent, simply not there.

Lopopolo makes the obligation explicit: “Your job is to build systems, software and structures that enable your team to be successful. And to do that, we need to make them legible to those agents that are driving the implementation.” That sentence is more radical than it first appears. It means the team is no longer only maintaining software for other humans. It is also maintaining a working environment for machine contributors. There is a cheap test for legibility you can run today: clone the repo into a fresh container and time how long it takes an agent to reach a green test run from nothing. If the answer is "it can't, because step four lives in someone's shell history," you have found a legibility hole — and every such hole is a place the agent will guess.

That is why documentation, ADRs, examples, and historical breadcrumbs matter so much. Those are not decorative artifacts around the “real” software process. In an AI-native workflow, they become part of the execution environment itself. If human expectations live only in scattered memory, the agent cannot inherit them. If the rules of good work are mostly tacit, the agent will violate them in ways that look mysterious only because the team never externalized its own standards.

This is also why the practical unit of AI coding is no longer the snippet. It is the codebase. Naman Jain of Cursor describes the shift cleanly: “My first project was actually working on generating single line... snippets and my last project was generating an entire codebase.” The practical consequence is a shift in where you spend effort. At snippet scale, the prompt is most of the signal and the repo barely matters. At codebase scale the ratio inverts: the agent makes most of its decisions by reading files you wrote weeks ago, so an hour spent making setup, conventions, and accepted patterns explicit pays off across every future task, while an hour spent perfecting one prompt pays off once.

The core mistake many teams make is to treat code generation as the primary problem and repo legibility as a secondary concern. In reality, the second often dominates the first — so the diagnostic move when an agent disappoints is to invert the blame: before swapping models, ask what a new senior hire would have had to ask a teammate to do this task safely, then check whether that answer exists anywhere the agent can read it. A capable model dropped into a murky repository is like a strong engineer dropped into an organization with no onboarding, inconsistent standards, and no access to prior decisions. You can still get lucky. You cannot count on it.

## Good code contains hundreds of unstated decisions

One reason this problem is easy to underestimate is that most of what separates an acceptable patch from a poor one is non-functional and unstated. Lopopolo gives it a memorable scale: producing a single patch, he says, “probably requires 500 little decisions along the way around the underspecified non-functional requirements that go into producing good code.” The exact number is not the point. The point is that repositories are dense with decisions that matter greatly but are rarely captured in the task description.

Here is the mechanism that turns that density into bad output, in Lopopolo's words: the models “during their training have seen trillions of lines of code that make every possible choice of those non-functional requirements that you could ever imagine.” So when a requirement is left unspecified, the agent does not stall — it samples one of the trillions of conventions it has seen, and there is no reason that sample matches yours. A human fills the same gap by reaching for the local norm they absorbed on the job; the agent has no local norm to reach for.

That is where slop comes from, and it is why “do not produce slop” in a prompt does nothing.

The sloppy patch is rarely the sign of a stupid model. It is the sign of a task whose success criteria were never written down, so the agent picked plausible defaults and you happened not to want them. The fix is not a sharper scolding in the prompt. It is to find the specific decision the agent guessed wrong and promote that one non-functional requirement into a durable artifact — a rule, a test, an example — so the next trajectory inherits it instead of re-rolling the dice.

Once you see the problem this way, the prescription changes. The answer is not only “prompt better.” It is to reduce the amount of silent guesswork that the environment demands. Externalize architecture choices. Store examples of accepted patterns. Make non-functional constraints explicit. Give the system stable ways to discover how this team expects software to be built.

That is what harness engineering means. Not a fancier wrapper around a model, but the systematic conversion of tacit engineering judgment into durable, machine-usable constraints. Lopopolo describes the raw materials concretely: “leaving breadcrumbs, documentation, ADRs, persona oriented documentation around what a good job looks like.” The payoff is that the encoding is done once and reused everywhere — get one engineer to write down what a good QA plan looks like, and, in his words, “every agent trajectory is going to get a good QA plan.” That is the leverage that makes the up-front cost worth it: a tacit standard written down once stops being re-litigated on every task.

The move has a cost you should expect and budget for. Lopopolo is blunt that fixing the environment “requires taking short-term velocity hits” — you stop, find the blocker, put the guardrail in place — before the leverage shows up. Cheap generation, the subject of the previous chapter, is what makes that trade pay: when the act of producing code is no longer the bottleneck, the hour you spend encoding judgment is repaid across every future trajectory that inherits it.

## Specs are not paperwork; they are executable intent

This is where spec-driven development earns its place — not as a documentation preference, but as the artifact that holds the 500 unstated decisions still enough for an agent to read them on every retry.

In a purely human workflow, specs often compete with direct conversation. A strong team can get away with more ambiguity because engineers resolve a surprising amount through meetings, hallway discussions, pull-request comments, and local intuition. In an AI-mediated workflow, that ambiguity becomes more expensive. The failure mode is relying on chat to carry intent: context windows expire, tasks get retried, work gets decomposed into subproblems, and different agents touch different layers of the same system — so any intent that lives only in transient conversation dissolves the moment one of those events fires. The operational test is whether a piece of intent would survive a fresh agent picking up the task cold; if it would not, it belongs in a persistent artifact, not the prompt.

Al Harris of Amazon's Kiro team offers one of the clearest framings in the corpus: “specs are natural language, you're using specs as a control surface to explain what you want the system to do.” Treating the spec as a control surface has a concrete behavioral consequence. When the output is wrong, you do not hand-patch the output; you find the line in the spec that under-specified the result, fix it there, and regenerate — the same discipline you would apply to source rather than to a compiled binary. If you find yourself repeatedly editing generated code that the next run will overwrite, that is the signal the spec, not the patch, is the thing to change.

Harris also describes spec-driven development as “a structured workflow that we push you through to reliably deliver high-quality software,” split into requirements, design, and execution phases. The practical value of the split is that it forces the expensive disagreements early: you settle what problem is being solved and how before any code exists, so the execution phase is not where you discover the requirement was wrong. The spec is not a memo attached to the work. It is the stage gate the work passes through.

A useful spec in an AI-native environment is the place you pre-resolve the decisions the agent would otherwise sample at random. Concretely, that means stating the things a task description usually omits: the problem being solved, the constraints the agent should not have to rediscover by trial and error, and the non-functional requirements that are the first to get dropped — which dependencies are allowed, what the rollback story is, the performance budget, the expected test shape, the compatibility line you cannot cross. A good heuristic for what belongs in the spec is exactly the set of things a reviewer would otherwise flag in a pull request; write those down before generation so they never become a review comment at all.

Seen this way, specs are context compression with an evaluation dividend. They pull intent out of chat history and tribal knowledge into one artifact the workflow returns to on every retry — and because the artifact names a concrete notion of success, you can grade an agent run against it. A vague prompt gives you nothing to grade; a spec gives you the pass/fail line.

This does not mean every ticket needs an elaborate design doc. Over-specification can absolutely collapse exploration into bureaucracy, and small or exploratory work is best discovered through fast iteration — writing a heavy spec there is the wrong choice. The test for when to reach for one: the moment the cost of misunderstanding rises — because the task is large, parallelized across agents, safety-sensitive, or expensive to review — write the spec before generating. Below that line, prompt and iterate; above it, externalize intent first, because that is where a stable representation of intent becomes leverage rather than ceremony.

The counterintuitive part is that a stronger model raises the value of the spec rather than lowering it. A weak generator fails visibly — broken builds, obvious nonsense — and the failure is its own alarm. A strong generator fails plausibly: it produces code that compiles, passes the thin tests you have, and looks right, while quietly making the wrong non-functional choice. The better the model, the more its mistakes hide behind competence, and the more you need an external, written notion of success to catch them. The spec is that notion.

## Agent-ready codebases are designed, not discovered

Eno Reyes is especially useful here because he connects old-fashioned engineering hygiene to an AI-native operating model. He begins with a deliberately basic question: “Do you have some automated validation for the format of your code?... for professional software engineers [it's] like, yeah, of course we do.” Then comes the important turn: “But I think you can go a step further.”

The step further is the part teams miss. Reyes's point is not just that validation should exist, but that the validation surface is now also a tool the agent can extend. You can “ask a coding agent, could you figure out where we're not being opinionated enough about our linters,” and have it generate the missing rule or the missing test. He cites a deliberately low bar from his own team — “a slop test is better than no test” — because once even a rough check exists, the next agent notices it, follows the pattern, and the rules ratchet tighter. So agent-readiness is not a fixed audit you pass once. It is a loop: better agents make the environment more opinionated, which makes the agents more reliable, which frees time to make the environment better still.

That loop only runs if the basics are in place. A practical checklist for the starting state usually includes at least the following:

- a stable folder structure rather than a maze of historical accidents
- explicit setup, build, and run commands that do not rely on oral tradition
- strong type, lint, and test gates the agent can run repeatedly
- architecture decisions stored in files instead of buried in memory
- examples of accepted patterns for tests, APIs, migrations, and reviews
- specs or task briefs stored close enough to the work that they survive handoff
- narrower tools or scripts for common operations where free-form shell access is unnecessary

A concrete first move on the list: most coding agents now read an `AGENTS.md` file at the repo root — Reyes calls it “an open standard that almost every single coding agent supports” — so the cheapest available win is to write down setup commands, the approved-dependency policy, and links to accepted patterns there, where every agent will see them. None of this is glamorous, and that is the point. The largest gains usually come not from frontier prompting technique but from reducing the avoidable ambiguity an agent would otherwise resolve by guessing.

The level of validation also sets a hard ceiling on how ambitious your delegation can get. Reyes is explicit that you cannot safely fan out parallel agents or decompose a large modernization into subtasks until single-task execution succeeds “nearly 100% of the time” — if you cannot automatically tell whether one PR is safe, running twenty in parallel just multiplies the unverified output. So the checklist is not only repo hygiene; it is the gate that decides whether the multi-agent patterns later in this chapter are even available to you.

The same affordances help weaker humans too — new hires, cross-functional contributors, future maintainers — which is why “agent-ready” is less an alien new standard than a sharper test of whether the team encoded its own expectations in reusable form. The agent is exposing the difference between standards the team possesses and standards the team can operationalize, and the gap is measurable: it is every rule an engineer enforces in review that is not yet enforced by a check the agent can run.

## The harness is a workflow, not just a wrapper

It is tempting to imagine the harness as a thin layer around a model: maybe a system prompt, a tool list, a sandbox, and a few guardrails. That is too narrow.

A real harness includes environment setup, repository policy, validation steps, task decomposition, review surfaces, memory of prior work, failure handling, and the sequence in which all those things are applied. Lopopolo's working definition gets at what ties them together: “a good harness is really operationalized around giving the model text at the right time.” The unifying job is timing and selection of context — which file, rule, or example reaches the model at the step where it needs it — which is why a harness is a workflow and not a static config blob. The practical diagnostic is to take one disappointing run and ask, at the step it went wrong, whether the relevant constraint was in front of the model. Usually it was sitting in a file the harness never surfaced at that moment.

The software-factory metaphor sharpens this. Eric Zakariasson of Cursor talks about “building your own software factory,” and the phrase earns its keep by redirecting attention from one-off generation to staged production with checks and roll-up visibility — a factory does not assume every worker can safely improvise in every direction. His subtler, more actionable point is that the factory itself needs a spec: to set it, he says, you would keep “a folder in the codebase” with markdown guidance, best practices, and rules. That is the concrete instruction hiding in the metaphor — the process gets a checked-in home, a directory of rules files, rather than living in human habit. Once it is in the repo, the harness is versioned, reviewable, and inherited by every agent the way code is.

This is also where the book's middle spine starts locking together. Once the harness is the unit of design, two questions follow immediately. How do you know the work it produces is good — which is measurement, the subject of Chapter 4. And how does it hold work together across a task that spans hours and tools — which is runtime and state, taken up later. Chapter 3 does not end the argument; it hands the book directly into Chapter 4.

## Subagents and specialization belong to the harness

The same logic extends beyond a single agent.

One of the most interesting developments in modern coding systems is the move toward specialized roles: research agents, review agents, refactor agents, debugging agents, and broader subagent frameworks that let a larger task be decomposed into parallel, semi-independent work. OpenAI's Codex demo makes the shape concrete. Each subagent is defined by a file giving it a name, a description, a sandbox mode — write-enabled or read-only — and its own instructions. Asked to review a repository of persona files, the orchestrator drops into plan mode, partitions the files into review slices, spins up a fixed pool of reviewers (capped at a concurrency limit — six on the presenter's machine), hands each one its assigned files plus pointers to the relevant repo guidance, then tears them down and collates the results. The pattern is reusable: the same partition-then-collate loop runs a security sweep across a commit just as well as a review across a directory.

The key insight is not merely that parallelism makes things faster. It is that specialization makes process explicit. Defining a review agent forces you to answer, in a file, what it should look at, what tools it gets, and what counts as a finding — questions a generalist prompt lets you leave fuzzy.

So when a team writes a dedicated review agent, a repo-auditing agent, or a migration agent restricted to read-only access plus a single codemod script, it is encoding judgment about how that kind of work should be done, and the role file becomes a durable part of the harness. This mirrors what strong human organizations already do: they do not hand every task to a generalist from a blank slate; they create roles, review structures, and bounded responsibilities so judgment scales past any one person.

But subagents also intensify the need for good scaffolding. More workers without a stronger harness do not create a factory. They create chaos faster. The mistake to watch for: adding parallel agents before you can recompose, inspect, and evaluate their output — at that point you have multiplied generation without multiplying the checks, and the throughput is illusory. The rule of thumb is to add a subagent role only once the recomposition and review surface for its output already exists. And recomposition is not the only missing precondition: the moment subagents do more than read — editing files, running migrations, touching a database — they need *isolated* environments, or they corrupt each other's work before any reviewer sees it. The write-or-read sandbox mode in a role file is the first move toward that; Chapter 6 takes up the full question of per-agent runtime isolation, where the lesson is blunt — for code an agent wrote, a shared environment, and even a plain container, is not a real boundary. That means subagents are not an argument against harness engineering. They are evidence that harness engineering is becoming more important.

## The new advantage is environment design

The marketing of AI coding tools naturally focuses on generation. That is the visible magic. The agent edits a file. It writes a test. It proposes a patch. Those moments are real and often impressive.

But generation is the part competitors can buy. The harness is the part they have to build.

Everyone with a budget can rent the same frontier model; what differs is the environment it runs in. So the advantage accrues to the team that makes the repository legible, promotes non-functional judgment out of senior heads and into rules and tests, treats specs as reusable intent, and invests in validations that let the agent check its own work. Reyes puts a number on the stakes that is worth quoting because it is unusually specific: making this investment, he argues, is where “the real like 5x, 6x, 7x comes from,” and the catch is that “it's a choice that you as an organization have” — the model will not hand it to you.

That is why harness engineering deserves to be a primary discipline rather than a tactical trick. The harness is not a helper bolted onto the codebase; it is being checked into the codebase, versioned and reviewed alongside the code it governs.

The winners in AI coding will not simply be the teams with the strongest models. As Reyes frames it, the limiter is no longer the capability of the agent — it is the organization's own validation criteria, which is to say the workplace the model has to operate in.

That is the bridge into the next chapter. Once the environment can produce delegated work at all, the obvious next question is no longer how to generate more. It is how to know whether the generated work is actually good.

## What to do with this

- When an agent disappoints, invert the blame before swapping models: ask whether your repository, specs, validations, and workflow are structured well enough for a machine collaborator to operate without constant rescue. Treat the unexplained "sloppy patch" as a missing success criterion, not a stupid model.
- Run the agent-readiness checklist on one repo this week: a stable folder structure, explicit setup/build/run commands, strong type/lint/test gates the agent can run repeatedly, architecture decisions stored in files, examples of accepted patterns for tests/APIs/migrations/reviews, and specs stored close enough to the work to survive handoff.
- Stop relying on "everyone kind of knows how we do migrations here." Externalize the tacit standards: check in examples of accepted patterns, write down non-functional constraints, and replace Slack archaeology with setup scripts the agent can read.
- Gate spec-writing by cost of misunderstanding, not by habit. For small or exploratory work, prompt and iterate; once a task is large, parallelized, safety-sensitive, or expensive to review, write the spec first — with constraints and non-functional requirements — so it persists across retries and handoffs.
- Apply the survival test to intent: if a fresh agent picking up the task cold would lose a piece of intent because context expired or work was decomposed, move that intent out of chat and into a persistent artifact.
- Encode the factory's own rules into the repo. Create a folder of markdown guidance, best practices, and rules so process stops living only in human habit, and add a specialized subagent role only once the surface to recompose and review its output already exists.

---

_From "From Copilot to Colleague: How AI Engineering Turns Models into Dependable Systems" by Timur Isachenko & Daniel Mohanrao · https://fromcopilottocolleague.com/read/03-harnesses_
