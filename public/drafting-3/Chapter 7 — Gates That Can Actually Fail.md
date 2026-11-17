# Chapter 7 — Gates That Can Actually Fail


Chapter 6 argued that verification has to fail differently from the thing it verifies. This chapter is about building the gates that do it, in a pipeline where most of the code arrives from a machine and the volume keeps climbing.

The problem is not that teams lack gates. It is that gates have two failure modes, both of which look like success from a distance: one fires so often that people route around it, and one never fires at all.

## You are going to rebuild CI, and worse

Sumaiya Shrabony has the most useful observation for anyone starting from a blank repository. Build agents independently, she says, and you will rebuild five things in roughly a fixed order.

You change a prompt or a skill and something downstream breaks, so you build a way to test whether the output still matches the expected shape. "Congratulations, you have reinvented regression testing" (Sumaiya Shrabony). You set up a scheduled task. "One day, it silently fails, but you haven't noticed for a week. So, you build alerts. You just reinvented CI monitoring" (Sumaiya Shrabony). One skill changes its output schema and three downstream skills break, so you add validation at the boundary — contract testing, rediscovered.

The reason this matters is not that reinvention is wasteful, though it is. It is the detail in the middle: *it silently fails, but you haven't noticed for a week*. That is the characteristic failure of agent infrastructure, and it is the same shape as every example in the previous chapter. The job did not crash. It reported nothing, which is what it reports when everything is fine.

Decades of CI practice exist largely as scar tissue around that exact problem. A team that builds agent plumbing without it gets to acquire the scars personally.

## Determinism was doing more work than anyone noticed

Nathan Sobo describes Zed's testing culture, which is unusually rigorous: they can replay a particular interleaving of network packets, freeze it, and get full control. They were, he says, "very hardcore about testing and being empirical" — and even with non-deterministic components they had locked things down and "never have flaky tests on CI" (Nathan Sobo, Zed).

Then: "as soon as an LLM enters the picture, that's all out the window" (Nathan Sobo, Zed).

This is worth stating plainly because it dismantles a common hope. Zed did not have flaky tests because of superior discipline that an AI feature would also benefit from. They had no flaky tests because the system was deterministic, and the determinism was the foundation the entire practice rested on. Introduce a model and the foundation is gone, regardless of how good the engineers are.

What replaces it is not a better assertion. It is a different kind of measurement — distributions rather than equalities, thresholds rather than exact matches, and an acceptance that a single run proves less than it used to. The gate stops asking *did this produce the right answer* and starts asking *is this still within the range we decided was acceptable*, which requires somebody to have decided what that range is.

## Volume changes the economics

Gautam Korlam frames the infrastructure problem as rebuilding CI for AI-scale commit volume, drawing on more than a decade of build and merge infrastructure work, and he is explicit that these are "new bottlenecks we're seeing in software factories" (Gautam Korlam, Sonar) — particularly in regulated industries where the checks are not optional.

The arithmetic is unforgiving. A suite that takes twenty minutes is a minor tax at thirty commits a day and a hard ceiling at three hundred. Worse, the obvious fixes degrade the gate: run fewer checks, sample instead of covering, or let things merge while the suite is still running. Each is a reasonable response to cost, and each quietly converts a gate into a report.

This is the pressure under which gates stop being able to fail. Not a decision anyone announced — an accumulation of sensible optimisations, each shaving a little certainty off, until the pipeline is fast and green and nobody can say what it last caught.

## The two deaths

A gate dies in one of two ways, and they require opposite remedies.

**It cries wolf.** Too many findings, too many false positives, and people learn to click past it. The remedy is precision, and precision costs coverage. Uber's experience in the last chapter applies here: an ignored reviewer is worse than no reviewer, because it occupies the slot where a real check would have gone and makes everyone feel covered.

**It never objects.** This is the quieter death and by far the more dangerous, because every signal it emits is the one you wanted. A gate that has never gone red is indistinguishable from a gate that cannot go red. The diagrams check in the last chapter ran for months, succeeding every time, reading nothing.

The asymmetry matters: the first death is loud and gets fixed, while the second is silent and gets praised. Nobody files a ticket about a check that keeps passing.

## What makes a gate real

Three properties, all cheap, none of which require a product.

**It has been observed failing.** Break the thing it guards, on purpose, and watch it go red. A check never seen to fail is a hypothesis. This is the single highest-value habit in this book, and it costs minutes.

**It can distinguish *broken* from *failed*.** A check that crashes and a check that found a real problem are different events, and collapsing them is how crashes get read as findings — or worse, how a crash gets read as a pass. A verifier in this repository was changed to exit 2 when it crashed, 1 when it legitimately failed, and 0 when clean, precisely because the first two had been indistinguishable.

**It can say it could not check.** This is the property most gates lack. GitHub expires workflow logs after ninety days, and a verifier reading an expired log gets an empty response rather than an error — so evidence that has aged out is indistinguishable from evidence that was never there. The fix is a third outcome alongside pass and fail: *unverifiable*, meaning the check ran, could not reach the evidence, and is telling you so. Without it, every aging artifact silently becomes a pass.

That third state is the structural answer to this whole chapter. Most gates offer two answers to a three-answer question, and the missing answer always defaults to the reassuring one.

## What follows

A change that passes every gate is not yet in front of a user. Between the green tick and the running system there is a deployment, and that gap turns out to be wider than most teams believe — wide enough that this repository published thirty consecutive commits that triggered no deployment at all, while reporting success on every one.

That is Chapter 8.
