# Chapter 3 — Harnesses, Specs, and Codebases Agents Can Actually Use

When coding agents disappoint, teams usually blame the model.

The model missed a dependency. The model misunderstood the architecture. The model refactored the right function but violated a local convention no outsider could have guessed. The model produced code that technically passed, yet somehow still felt wrong. In the postmortem, intelligence becomes the default suspect.

Sometimes that diagnosis is fair. Models do fail because they are weak, distracted, or simply not yet capable enough for the task. But in production codebases, that explanation is often too flattering to the humans involved. Many agent failures are not evidence that the model is hopeless. They are evidence that the environment was never made legible enough for delegated work.

Ryan Lopopolo puts the inversion bluntly: “The important thing is not the code but the prompt and the guardrails that got you there.” The line sounds almost rude in a field obsessed with generated output. But it captures one of the deepest shifts in AI-native engineering. Once you ask a machine to do implementation work instead of merely suggesting snippets, the surroundings become part of the product. The harness around the model starts determining what kind of work is even possible.

This chapter’s claim is simple: if you want AI to write production software, do not begin by asking what model to use. Begin by asking whether your repository, specs, validations, and workflow are structured well enough for a machine collaborator to operate without constant rescue.

## A small software-factory vignette

Consider a team that starts where many teams now start: with a good model inside an ordinary repo.

At first the results feel magical. The agent writes tests faster than the humans expect. It handles small UI changes cleanly. It can even land a respectable refactor if a senior engineer hovers nearby and corrects its misunderstandings in real time. So the team expands the scope. They ask it to wire together a new endpoint, touch a migration, update a frontend state machine, and preserve some vague house style that nobody has ever written down.

Quality immediately gets erratic.

One patch uses a dependency the team would never approve. Another passes tests but ignores a performance convention learned the hard way six months earlier. A third is logically fine yet shaped in a way that makes review irritating and rollback risky. The team says the model is inconsistent. What they really mean is that the workplace is inconsistent.

So they change the workplace.

They add explicit setup scripts instead of Slack archaeology. They tighten lint and type gates. They create agent-facing instructions. They check in examples of accepted patterns. They write slimmer task specs before handing work off. They stop relying on “everyone kind of knows how we do migrations here.” The repo becomes less like a haunted archive of past decisions and more like a managed surface for machine labor.

That is the recurring case I will call the software factory. It matters because it shows where the leverage really sits. The breakthrough is not that the model suddenly became a genius. The breakthrough is that the team stopped treating its own tacit judgment as invisible infrastructure.

## The repo is the real interface

Most coding tools still present themselves through chat. You type a request, maybe select a few files, and wait for the assistant to propose a patch. That interface is useful, but it can also be misleading. It suggests that the real problem lives in the prompt.

In practice, the prompt is only the visible tip of a much larger system.

The real interface is the codebase plus everything around it: the setup instructions, the architecture, the naming conventions, the tests, the lint rules, the examples of good patches, the traces of previous reviews, the ADRs, the failure cases, and the rules about performance or security that no single file states explicitly. A human engineer entering a mature repository absorbs these constraints slowly. They ask teammates what matters. They notice which patterns recur. They learn what kinds of changes get approved quickly and which ones trigger suspicion.

An agent does not get that apprenticeship unless the team builds it.

Lopopolo makes the obligation explicit: “Your job is to build systems, software and structures that enable your team to be successful. And to do that, we need to make them legible to those agents that are driving the implementation.” That sentence is more radical than it first appears. It means the team is no longer only maintaining software for other humans. It is also maintaining a working environment for machine contributors.

That is why documentation, ADRs, examples, and historical breadcrumbs matter so much. Those are not decorative artifacts around the “real” software process. In an AI-native workflow, they become part of the execution environment itself. If human expectations live only in scattered memory, the agent cannot inherit them. If the rules of good work are mostly tacit, the agent will violate them in ways that look mysterious only because the team never externalized its own standards.

This is also why the practical unit of AI coding is no longer the snippet. It is the codebase. Naman Jain describes the shift cleanly: “My first project was actually working on generating single line... snippets and my last project was generating an entire codebase.” Once the unit of work becomes the repository, environment design stops being background hygiene and becomes first-order leverage.

The core mistake many teams make is to treat code generation as the primary problem and repo legibility as a secondary concern. In reality, the second often dominates the first. A capable model dropped into a murky repository is like a strong engineer dropped into an organization with no onboarding, inconsistent standards, and no access to prior decisions. You can still get lucky. You cannot count on it.

## Good code contains hundreds of unstated decisions

One reason this problem is easy to underestimate is that experienced engineers are bad at seeing their own tacit judgment. Good code does not differ from bad code only in correctness. It differs in tone, proportion, naming, performance discipline, dependency choices, rollback safety, test shape, compatibility assumptions, reviewability, and fit with the broader system.

Lopopolo gives this problem a memorable scale when he says that producing a single patch can require “500 little decisions” around underspecified non-functional requirements. The exact number is not the point. The point is that repositories are dense with decisions that matter greatly but are rarely captured in the task description. A human engineer often fills those gaps through craft and context. A coding agent fills them through inference under uncertainty.

That is where slop comes from.

The sloppy patch is not always the sign of a stupid model. It is often the sign of a task whose invisible success criteria were never written down. The agent guessed because the environment forced it to. Then humans act surprised that the guesses look generic.

Once you see the problem this way, the prescription changes. The answer is not only “prompt better.” It is to reduce the amount of silent guesswork that the environment demands. Externalize architecture choices. Store examples of accepted patterns. Make non-functional constraints explicit. Give the system stable ways to discover how this team expects software to be built.

That is what harness engineering really means. Not a fancier wrapper around a model, but the systematic conversion of tacit engineering judgment into durable, machine-usable constraints.

This is also where Chapter 2 should still be echoing in the reader’s mind. Cheap generation raised the value of judgment. Chapter 3 is where that judgment stops living only inside senior people and starts getting encoded into the environment.

## Specs are not paperwork; they are executable intent

This is where spec-driven development becomes more than a documentation preference.

In a purely human workflow, specs often compete with direct conversation. A strong team can get away with more ambiguity because engineers resolve a surprising amount through meetings, hallway discussions, pull-request comments, and local intuition. In an AI-mediated workflow, that ambiguity becomes more expensive. Context windows expire. Tasks get retried. Work gets decomposed into subproblems. Different agents touch different layers of the same system. Without persistent artifacts, intent keeps dissolving back into transient conversation.

Al Harris offers one of the clearest framings in the corpus: “The spec then becomes the natural language representation of your system. It has constraints, it has concerns around functional requirements, non-functional requirements...” That framing matters because it upgrades the spec from document to control surface.

Harris makes a second point that is just as important: spec-driven development is “a structured workflow that we push you through to reliably deliver high-quality software... requirements, design, and execution phases.” In other words, the spec is not a memo attached to the work. It is part of the workflow that shapes the work.

A useful spec in an AI-native environment does several jobs at once. It records what problem is being solved. It states constraints the agent should not have to rediscover through trial and error. It makes room for non-functional requirements that are otherwise easy to drop. It persists across retries and handoffs. And it creates a shared object that humans and machines can both inspect.

Seen this way, specs are a form of context compression. They take sprawling intent that would otherwise live in chat history, tribal knowledge, or remembered conversation and package it into a stable artifact the workflow can keep returning to. They also make evaluation easier, because a system with a concrete spec can be judged against a clearer notion of success than one that began with a vague prompt and hope.

This does not mean every ticket needs an elaborate design doc. Over-specification can absolutely collapse exploration into bureaucracy. Some work is best discovered through fast iteration. But once the cost of misunderstanding rises — because the task is large, parallelized, safety-sensitive, or expensive to review — explicit intent becomes leverage.

The deeper point is that spec-driven development matters more, not less, in an era of powerful coding agents. The stronger the generator, the more valuable a stable representation of intent becomes.

## Agent-ready codebases are designed, not discovered

At this point the argument can sound abstract, so it helps to come back to repository mechanics.

Eno Reyes is especially useful here because he connects old-fashioned engineering hygiene to an AI-native operating model. He begins with a deliberately basic question: “Do you have some automated validation for the format of your code?... for professional software engineers [it's] like, yeah, of course we do.” Then comes the important turn: “But I think you can go a step further.”

That extra step is the real substance of agent-readiness. The question is not simply whether a team has linting or tests. It is whether the codebase has enough automated validation and explicit structure that a coding agent can move through it with bounded risk. A repository becomes agent-ready when it exposes enough of its standards, setup, and quality gates that delegated work becomes legible.

A practical checklist usually includes at least the following:

- a stable folder structure rather than a maze of historical accidents
- explicit setup, build, and run commands that do not rely on oral tradition
- strong type, lint, and test gates the agent can run repeatedly
- architecture decisions stored in files instead of buried in memory
- examples of accepted patterns for tests, APIs, migrations, and reviews
- specs or task briefs stored close enough to the work that they survive handoff
- narrower tools or scripts for common operations where free-form shell access is unnecessary

None of this is glamorous. That is exactly why it matters. The biggest gains in coding agents often come not from frontier prompting technique but from reducing avoidable ambiguity in the repository itself.

There is also an organizational benefit hiding inside this technical one. Better repositories do not only help machines. They help weaker humans, new hires, cross-functional contributors, and future maintainers. In that sense, “agent-ready” is not some alien new standard imposed by AI. It is a sharper test of whether the team actually encoded its own expectations in reusable form.

The agent is exposing the difference between standards the team possesses and standards the team can operationalize.

## The harness is a workflow, not just a wrapper

It is tempting to imagine the harness as a thin layer around a model: maybe a system prompt, a tool list, a sandbox, and a few guardrails. That is too narrow.

A real harness includes environment setup, repository policy, validation steps, task decomposition, review surfaces, memory of prior work, failure handling, and the sequence in which all those things are applied. In other words, it is a workflow.

This is where the software-factory metaphor becomes useful. Eric Zakariasson talks directly about “building your own software factory,” and the phrase lands because it redirects attention from one-off generation to staged production. A factory has specifications, stations, checks, feedback loops, and manager-visible status. It does not assume that every worker can safely improvise in every direction.

Zakariasson makes a subtler point too: the factory itself needs a spec. “To set the spec for the factory,” he says, you would likely have a folder in the codebase with markdown guidance, best practices, and rules. That is exactly the conceptual move this chapter needs. The harness has to be encoded somewhere. Once it is checked into the repo, process stops living only in human habit and becomes part of the codebase’s working surface.

This is also where the book’s middle spine starts locking together. Once you think in harnesses, you immediately care about evaluation and runtime semantics. A harness that cannot measure quality is incomplete. A harness that cannot preserve state across longer tasks is fragile. Chapter 3 does not end the argument. It hands the book directly into Chapter 4.

## Subagents and specialization belong to the harness

The same logic extends beyond a single agent.

One of the most interesting developments in modern coding systems is the move toward specialized roles: research agents, review agents, refactor agents, debugging agents, and broader subagent frameworks that let a larger task be decomposed into parallel, semi-independent work. OpenAI’s Codex materials describe subagents as “the ability wherein you can spin off a master task into decomposable parallel and independent tasks.”

The key insight is not merely that parallelism can make things faster. It is that specialization makes process explicit.

When a team creates a dedicated review agent, a repo-auditing agent, or a migration-focused agent with narrow tools and instructions, it is encoding judgment about how work should be done. The role itself becomes part of the harness. This mirrors what strong human organizations already do. They do not treat every task as a blank slate executed by a generalist. They create roles, review structures, and bounded responsibilities so judgment can scale.

But subagents also intensify the need for good scaffolding. More workers without a stronger harness do not create a factory. They create chaos faster. Parallel output is only valuable if the pieces can be recomposed, inspected, and evaluated. That means subagents are not an argument against harness engineering. They are evidence that harness engineering is becoming more important.

## The new advantage is environment design

The marketing of AI coding tools naturally focuses on generation. That is the visible magic. The agent edits a file. It writes a test. It proposes a patch. Those moments are real and often impressive.

But the durable advantage is increasingly elsewhere.

It belongs to teams that make their repositories legible. Teams that externalize non-functional judgment instead of leaving it trapped in senior engineers’ heads. Teams that treat specs as reusable intent rather than ceremonial paperwork. Teams that invest in validations and repo affordances that help an agent check its own work. Teams that gradually turn loose process into a staged, inspectable software factory.

This is why harness engineering deserves to be treated as a primary discipline instead of a tactical trick. The harness is not a helper around the codebase. It is becoming part of the codebase.

And that may turn out to be one of the most important shifts in software engineering culture. The winners in AI coding will not simply be the teams with access to the strongest models. They will be the teams that built workplaces those models can actually understand.

That is the bridge into the next chapter. Once the environment can produce delegated work at all, the obvious next question is no longer how to generate more. It is how to know whether the generated work is actually good.
