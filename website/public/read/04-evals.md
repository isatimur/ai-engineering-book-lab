# Chapter 4 — Evals Are the Control System


The first failure mode of AI systems is obvious: they can be wrong.

The second is more dangerous: they can look right often enough that teams stop measuring.

A demo works twice in a row. A prototype returns a plausible answer. A coding agent lands a decent patch in a familiar repo. Everyone starts speaking in the language of vibes. The system feels promising. It feels almost ready. And because modern models are so good at producing locally convincing output, that feeling can persist far longer than it should.

Ido Pesok captures the seduction perfectly with a line that sounds almost comic because it is so familiar: “It worked first try... I even tested it twice... So from there we’re good to ship, right?” Every team working with generative systems has lived some version of that moment. The problem is not that the demo was fake. The problem is that a successful demo is not yet a control loop.

That is why the real role of evals is often misunderstood. Evals are not there to decorate a launch deck or to compare two models in the abstract. They are there to create a feedback system around delegated work. As the task horizon stretches from single-line completion to repo-scale changes and multi-step workflows, the gap between toy metrics and operational reliability gets wider. The hard question stops being “Is the model smart?” and becomes “Can this system repeatedly do useful work in our environment without silently drifting out of bounds?”

In other words, evals are not a side practice. They are the control system of production AI.

## The software factory needs a quality system

In the previous chapter, Meridian turned an ordinary payments repository into a more legible workplace for coding agents. They added rules, specs, validations, and cleaner task surfaces. The harness improved, and the agent's output improved with it.

But that only gets Meridian halfway.

A more legible workplace makes delegated work possible. It does not by itself make delegated work trustworthy. The moment the repo starts behaving like a software factory, a new question appears: how do you know whether the factory is producing good work consistently?

This is where many teams stall. They do the hard thinking required to structure tasks and tighten the repository, but they still assess outcomes the way people assess demos: by gut feel, by a few handpicked examples, or by whether a trusted engineer was pleasantly surprised in the last week. That is not nothing. Human judgment matters. But without a more systematic loop, the team is still flying mostly by anecdote.

A real factory needs quality control. A delegated software factory needs evals.

The crucial shift is to stop thinking of evals as a one-time gate and start thinking of them as an ongoing instrument panel. They tell you when a new model is better on your work and when it is merely different. They tell you whether a prompt revision improved one slice of performance while quietly damaging another. They tell you whether a new retrieval strategy or tool description increased completion rate but also increased latency or cost. They tell you whether your agent can still handle the classes of failure that hurt you last month.

Without that loop, teams are not really running a production system. They are running a series of hopeful anecdotes.

## A failure slice from the factory floor

The easiest way to see what evals are for is to watch what happens when they are missing.

By now Meridian's team has upgraded from "small safe edits" to "multi-file implementation tasks." The agent is asked to add rate limiting to an internal API endpoint, thread the new behavior through a background job, and preserve an existing admin override. On first inspection the run looks good. The patch compiles. Tests pass. The PR description is tidy. A reviewer glances at the diff and says some version of the most expensive sentence in modern engineering: looks fine.

Two days later support reports something odd. A class of admin-triggered backfills is now stalling in production. Nothing is fully broken, but jobs are queuing longer than usual. Customers are not yet furious. Engineers are not yet panicking. The system is merely drifting into a worse state.

The postmortem is revealing. The agent did in fact implement rate limiting. It even mirrored the main service pattern correctly. But it also applied that same throttle to the backfill path, where the intended rule was different. The relevant exception had existed only in an old review comment and in the head of Meridian's most senior payments engineer — the one person who remembered why that path was special. The code still type-checked. The unit tests still passed because none of them covered the override path under production-like volume. The patch was locally plausible, globally wrong.

This is the shape of many AI failures in production. They are not spectacular hallucinations. They are near-misses that survive ordinary review because each individual move looks reasonable. The model did not go insane. The system simply had no reliable way to notice that an important slice of behavior had regressed.

Once Meridian sees this pattern clearly, the eval work almost writes itself. They add a regression case for the admin override path. They mine previous incidents for similar "special path" behavior. They create a task slice for patches that touch both product logic and operations logic. They stop asking only whether the patch passes and start asking which real failure families it still protects against.

That is what a control system looks like in practice. It converts an expensive lesson into a reusable instrument.

## The unit of evaluation changed

A lot of inherited evaluation habits break because the unit of AI work changed faster than the measurement habits around it.

Naman Jain describes the shift in one sentence: “My first project was actually working on generating single line... snippets and my last project was generating an entire codebase.” That arc should reshape how we think about evals. If the system is no longer doing tiny local completions, then tiny local tests are no longer enough.

The snippet era made certain shortcuts possible. You could ask whether the completion looked plausible. You could measure pass@k on constrained benchmark tasks. You could infer quite a lot from unit-level success. Those methods were not useless. They were matched to a smaller unit of work.

But once the task becomes a codebase change, a retrieval workflow, a multi-step customer-support resolution, or an hours-long planning loop, the evaluation target becomes more complicated. The system may make a series of locally sensible moves and still fail globally. It may retrieve relevant documents but rank them badly. It may edit the right files but leave the repo in a state that is hard to review. It may satisfy an obvious user request while violating a subtler business or safety constraint.

When the unit of work changes, the unit of evaluation must change too.

This is one reason Pesok’s title, “Evals Are Not Unit Tests,” matters so much. The point is not that software-testing instincts are irrelevant. It is that application-layer AI systems are not deterministic functions in the old sense. Pesok frames the problem at the right level: “This will be a focus on what do evals mean for your users, your apps and your data. The model’s now in the wild, out of the lab, and it needs to work for your use case.”

That is the chapter’s hinge. Production evals are not only about model capability. They are about situated system behavior.

## Real-world tasks beat synthetic cleverness

Once teams accept that the old unit of evaluation is insufficient, they face a second problem: what should replace it?

Here Naman Jain offers the most useful methodological rule in the corpus: “Your task should be natural and sourced from the real world and then you should be able to reliably grade them.” That sentence is a quiet standard for seriousness. It rejects two common temptations at once.

The first temptation is synthetic cleverness: tasks invented because they are easy to generate, easy to score, or flattering to the system. The second is unscored realism: impressive examples that feel close to reality but cannot be graded consistently enough to support iteration. Good eval design has to balance both. The task should resemble actual work, and the scoring should be stable enough that teams can compare versions, prompts, tools, and models over time.

Jain’s concrete example is instructive. Rather than inventing toy tasks, his team looks at real repositories: “We take a codebase... we crawl over all the commits... and we find the commits... related to performance optimization.” That is a different epistemology. Instead of asking what benchmark problem might approximate software engineering, the team mines the history of software engineering itself.

This matters beyond coding.

In a support system, the right eval set may come from painful historical tickets. In a legal workflow, it may come from real review patterns that produced escalations. In a research tool, it may come from queries whose wrong answers were persuasive enough to mislead users. The strongest eval sets are often not imagined in a conference room. They are harvested from the places where the system or its human predecessors actually struggled.

This is why human-seeded evals matter so much. Samuel Colvin’s framing is useful not because it romanticizes manual labor, but because it reminds us that humans are often the only reliable source of task realism early on. They know which failures are expensive, which edge cases are recurrent, and which “good-looking” outputs are secretly wrong. Early eval discipline often begins with a human saying: this class of mistake bit us three times last month; from now on it belongs in the test set.

The more a system does real work, the less synthetic evals can tell you.

## Reliability got harder, not easier

One of the stranger habits of the AI era is to talk as if more capable models somehow dissolved the old reliability problem.

They did not.

Samuel Colvin says it plainly: “We still want to build reliable scalable applications and that is still hard. Arguably it’s actually harder with Gen AI than it was before.” The reason is not mysterious. Classical software often failed in brittle but inspectable ways. Generative systems fail in a broader distribution of ways, including ones that appear superficially correct. They also fail in places where multiple layers interact: prompt design, retrieval quality, tool calling, context assembly, schema handling, business logic, state management, and user input variability.

That is exactly why naïve evaluation feels so attractive. It offers a fantasy of simplification. If only we could reduce the system to a single score, a single benchmark, a single judge model, a single red-green dashboard, the uncertainty would shrink back to familiar scale.

But the right answer to complexity is not false simplicity. It is a richer control system.

For coding systems, some parts of that loop can be relatively crisp. Colvin points out that if you are using a coding agent, “it can use type safety or running type checking to basically mark its own homework.” That is a powerful phrase because it describes one layer of automated self-verification. Static checks, tests, schemas, and validators let the system catch classes of error before a human ever reviews the result.

But those checks are only part of the story. A patch can type-check and still be architecturally clumsy. A retrieval answer can cite real documents and still be unhelpful. A polite assistant can satisfy style constraints while failing the user’s actual goal. Production reliability requires multiple layers of evidence, not one.

## Application-layer evals are about users, apps, and data

The deeper you go into production AI, the less useful it is to talk about evaluation as if it were only an abstract research discipline.

Pesok’s framing matters precisely because it drags evals down into application reality: users, apps, and data. That is where all the ugly variables live. Real users phrase things badly. They ask underspecified questions. They contradict themselves. They have different levels of expertise. They appear in bursts. They produce distributions of input that no tidy benchmark fully captures.

Meanwhile the application has costs, latency budgets, permission boundaries, brand expectations, and failure modes whose importance is highly uneven. A hallucinated movie recommendation is embarrassing. A hallucinated clause in a contract review is much worse. An answer that takes ten seconds instead of three may be acceptable in one workflow and fatal in another. A coding patch that is 95 percent correct but painful to review may still lose economically.

This is why application-layer evals tend to look messier than leaderboard metrics. They often mix objective checks with rubric-based human review. They carry slice-level metrics instead of one universal score. They ask not only whether the output was correct, but whether it was usable, safe, timely, cheap enough, and appropriate for this workflow.

That messiness is not evidence that evals are immature. It is evidence that the work is real.

Once the model is in the wild, the system inherits the asymmetries of the use case. A production eval program has to reflect them.

## Observability becomes tomorrow’s eval set

The best line in the chapter may belong to Phil Hetzel: “Observability and eval... it’s actually the same problem from a systems perspective.” That sentence is powerful because it collapses a false separation.

Teams often imagine observability as the thing you do after deployment and evals as the thing you do before deployment. In reality, the two should feed each other continuously. Observability shows you what the system is actually doing in the wild. Evals let you replay, score, compare, and improve against those patterns before you ship the next change.

That means production traces are not only for debugging incidents. They are raw material for the next generation of offline evaluation.

A user conversation that exposed a prompt weakness can become a regression example. A failed coding task can become a benchmark slice. A costly retrieval miss can become a dataset item for future ranking experiments. An escalation to human review can become a labeled example of where the autonomy boundary was crossed badly.

This creates the eval flywheel:

1. observe real behavior in production
2. identify painful or important failure patterns
3. label and structure those patterns into reusable datasets
4. compare prompts, tools, models, or workflows against them
5. deploy improvements
6. observe again

Once you see the loop, Chapter 3’s harness story becomes more concrete. A harness without observability cannot learn. Observability without eval discipline cannot prioritize. The control system requires both.

This is also why Hetzel insists that “an eval platform is not just a test runner.” A runner executes checks. A real platform also stores datasets, versions scoring logic, supports comparisons, surfaces disagreements, and creates enough trust in results that teams will actually use them to make decisions. In mature AI engineering, the platform around evaluation becomes part of the product-development process itself.

## Evals are how teams externalize judgment

There is a cultural misconception hiding inside a technical one. People often talk as if evals are mostly about metrics. In practice, they are also about institutionalizing judgment.

A team may claim that it wants “better answers,” “cleaner patches,” or “safer behavior,” but until those standards are converted into examples, rubrics, thresholds, and review habits, they remain aspirations. Evals force a harder question: what, exactly, are we willing to call good enough?

That is why evaluation work is often uncomfortable. It surfaces disagreement. One engineer cares most about correctness. Another cares about cost. A PM cares about task completion and delight. A support lead cares about escalation quality. A security reviewer cares about worst-case behavior, not average behavior. An eval system does not make these tradeoffs disappear. It makes them discussable.

In that sense, evals are a control system not only for the model, but for the organization. They are how teams turn fuzzy standards into inspectable ones.

This is also why a good eval program usually contains multiple layers:

- fast automatic checks for obvious regressions
- scenario datasets sourced from real tasks
- slice-level analysis for important subpopulations or failure types
- human or expert review where judgment cannot be safely collapsed into a scalar
- comparison workflows that help teams decide whether a change is actually an improvement

None of this is glamorous. But neither is version control, incident response, or CI. The operational disciplines that matter most rarely look magical from the outside.

## The control system is organizational, not only technical

The final mistake to avoid is thinking that evals belong to one heroic person.

In immature AI teams, evaluation often starts that way: one careful engineer, one spreadsheet, one growing pile of examples, one increasingly overworked human who knows where the bodies are buried. That is a reasonable beginning. It is not a durable end state.

Once AI systems matter, evals have to become institutional. Someone has to own datasets. Someone has to decide how failures are labeled. Someone has to maintain slices as the product changes. Someone has to adjudicate when an automatic judge disagrees with expert review. Someone has to keep the loop connected to product decisions instead of letting it degrade into ritual.

This is another implication of Hetzel’s point that an eval platform is not just a runner. It is shared infrastructure. It sits between engineering, product, design, operations, and whatever domain expertise the application depends on. It gives those groups a common object to argue over constructively.

That is also why the question “Do we have evals?” is usually too small. The better question is: do we have an operating habit for turning real failures into better systems?

If the answer is no, then the team does not yet have a control system. It has occasional measurement.

## Evals are what make delegation trustworthy

Once AI systems start doing work instead of merely suggesting it, measurement stops being optional. You cannot supervise every action directly. You cannot reason from benchmark scores to production trust. You cannot ship on vibes indefinitely, no matter how impressive the model feels during a demo.

What you can do is build a control system: representative tasks, credible scoring, production observability, regression sets from real failures, comparison loops, and a habit of turning mistakes into reusable tests.

That is what evals are for.

Not to tell you whether your model is impressive, but to tell you whether your system is safe to trust.

And this is the deeper continuity between the chapters so far. Chapter 3 argued that delegated work depends on a legible harness. Chapter 4 adds that a legible harness is still not enough. Once the machine can act, the surrounding system needs a way to notice drift, compare alternatives, preserve painful lessons, and keep quality from collapsing into anecdote.

That is what a control system does. It lets a team steer.

The natural next question is what the system is actually steering with. Once teams can structure work and measure outcomes, they run into a third bottleneck: whether the agent is seeing the right information, in the right shape, at the right moment. That is the subject of the next chapter. Context is not merely input. It is infrastructure.

---

_From "From Copilot to Colleague: How AI Engineering Turns Models into Dependable Systems" by Timur Isachenko & Daniel Mohanrao · https://fromcopilottocolleague.com/read/04-evals_
