# Chapter 2 — Taste Still Matters When Code Gets Cheap


One of the easiest mistakes to make in an AI-heavy moment is to confuse abundance with mastery. When code gets cheaper to produce, it becomes tempting to think that engineering itself has become cheaper in the same proportion. A team can now generate ten versions of a feature instead of one. A founder can spin up a prototype in a weekend. A product manager can produce a plausible spec without waiting on a formal writing cycle. A junior engineer can land patches that would have taken much longer before. The system seems to remove friction everywhere.

Some of that is real. A lot of routine output really has become cheaper.

But cheap output does not mean cheap judgment.

In some ways, the opposite is happening. When code, copy, plans, tests, and glue work become easier to generate, the new bottleneck shifts toward deciding what should exist, what quality looks like, what tradeoffs are acceptable, what should be rejected, and how to tell the difference between elegant speed and expensive slop. The human contribution does not disappear. It becomes easier to see.

If Chapter 1 says the big shift is from suggestion to delegated execution, Chapter 2 says the human side of that shift is not less craft but more visible craft. Once a machine can produce more work than a human can carefully inspect by default, taste stops being a soft virtue and becomes part of the operating system.

## Cheap generation raises the value of judgment

Matt Pocock captures the first principle cleanly: “software fundamentals matter now more than they actually ever have.” That can sound backward at first. Surely fundamentals matter less if a capable coding system can fill in the syntax, scaffold the endpoint, wire the form, and draft the tests.

But the more the machine handles surface-level production, the more the remaining human work concentrates around leverage points.

Which abstraction belongs here?
Which dependency will quietly punish us six months from now?
Which draft only looks polished because nobody asked whether the premise is right?
Which shortcut is a useful prototype move and which one is a long-term maintenance trap?
Which bug is local and which one reveals that the architecture itself is under-specified?

Those decisions were always important. What changes is their visibility. In a slower, human-only workflow, bad decisions were often partially hidden by the fact that all production was expensive. Teams naturally moved slower, touched fewer surfaces, and had more incidental review embedded in the cost of making anything. Cheap generation strips away that natural throttle. You can now produce a much larger amount of work on top of weak decisions.

This is why AI often behaves as an amplifier before it behaves as a replacement. Good operators get more leverage. Sloppy operators get more slop, faster.

The point is not that the tools are bad. The point is that they magnify what is already there. If the team has strong standards, explicit constraints, and people who can discriminate well, the new speed is extraordinary. If the team lacks those things, the same speed just means they can industrialize confusion.

## Taste is not aesthetic preference; it is quality discrimination under abundance

The word taste can sound soft, almost decorative, as if it refers only to style or personal preference. In engineering it means something harder.

Taste is the ability to notice the difference between output that merely works and output that fits. What that ability comes down to, in practice, is a recognizable set of tells: a patch that is technically correct but shaped wrong for the system around it, a component boundary that is too clever, a naming choice that will confuse the next person, a generated paragraph that says the obvious thing in the most generic way possible, a workflow with one hidden step too many, a prototype convenience about to become permanent structure. None of these trip a test. Each is the moment where merely working and actually fitting come apart, and recognizing them on sight is what taste actually buys you.

Tuomas Artman, reflecting with Gergely Orosz on craft at Linear, raises the right unsettling question: “What happens when agents are capable of doing everything immediately for you?”

The obvious answer is speed.
The more important answer is that speed changes what human excellence consists of.

If the machine can produce immediately, the scarce skill is less often the manual act of producing and more often the act of selecting, directing, constraining, sequencing, and refusing. Taste becomes the discipline of quality discrimination under abundance.

AI does not simply remove toil and leave the rest of engineering unchanged. In many cases it removes one kind of toil by placing heavier demands on another kind of work. Someone still has to know what “good” means. Someone still has to tell the difference between a local success and a systemic mistake. Someone still has to notice when the generated work optimizes for velocity in a way that quietly damages legibility, maintainability, or trust.

This is also why taste is inseparable from architecture. The strongest engineers are not just better at cleaning up generated output. They are better at shaping the conditions under which good output is likely to be produced in the first place.

There is a second reason to read generated code closely. When you wrote every line, comprehension came free with authorship. A model breaks that bundle: it hands you working code you did not build and therefore do not yet understand, and that understanding now has to be paid for separately, after the fact. Reading the diff stops being a courtesy and becomes the load-bearing step — reading it like an author, reconstructing why each choice was made rather than confirming the lines parse, tracing one path the tests do not cover to ask whether the design would survive it.

## The friction is your judgment

Armin Ronacher and Cristina Poncela Cubeiro offer one of the sharpest counterweights to the rhetoric of frictionless shipping. Their talk, titled *The Friction Is Your Judgment*, begins with the argument that we should add some friction back, not because speed is bad, but because some friction is actually judgment in disguise.

A lot of traditional software friction is waste. Slow builds, unclear ownership, handoffs nobody needs, cumbersome tooling, meetings that exist only because the system is poorly designed — none of that deserves romantic defense. AI can remove a lot of this, and good riddance.

But not all friction is waste. Some of it is where the human mind actually enters the loop.

The pause before merge.
The question about whether this belongs in the system at all.
The extra review pass on a security-sensitive path.
The insistence on naming something precisely.
The decision to rewrite a generated function because it violates the grain of the codebase, even if it passes today.

Those moments are easy to misclassify as inefficiency, especially when generation tools make everything else feel instant. But in many teams, that is the moment where quality is actually being created.

This is one of the deeper cultural adjustments AI engineering demands. Teams have to learn to separate needless friction from meaningful resistance. If they remove both at once, they often do not end up with a higher-performing system. They end up with a faster path to lower standards.

There is a test for which is which. Cut the pause if removing it only costs keystrokes — boilerplate, glue, scaffolding the model can regenerate on demand. Keep the pause if removing it costs a decision: whether the architecture can carry this, whether the draft is right or merely plausible, whether the frame is correct before the model executes it. The first kind of friction is waste; the second is where the judgment lives, and the cost of skipping it now scales with how fast the model executes the wrong frame.

The key phrase here is not “slow down.” It is “know what your pauses are for.”

A good team does not defend friction because it likes pain. It defends the points in the process where judgment is doing real work.

## Vibe coding is a mode, not a production philosophy

The phrase vibe coding is useful partly because it is a little embarrassing. It names a behavior many people recognize immediately: low-spec, high-speed, intuition-led building where the model is steered by momentum more than by explicit structure.

That mode is not worthless. In fact, it can be brilliant.

For exploration, interface sketching, rough prototypes, internal tooling, one-off automation, toy apps, or situations where learning by doing is more valuable than formal design, vibe coding can be the correct move. It can widen the top of the funnel. It can make experimentation cheap enough that more people discover what is actually worth building. It can give individuals a level of expressive power that used to require a small team.

The problem begins when a useful exploratory mode quietly hardens into a default production philosophy. Corey Gallon at Rexmore calls this the vibe-coding hangover: the app works on Friday, and “then Monday rolls around, you want to add a feature, and you realize that you don't understand it, you can't maintain it, and you have to throw most or all of it away.”

Vibe coding is not the enemy. Unexamined vibe coding is.

A strong manuscript should avoid the lazy reaction of treating all AI-native building as unserious. That would miss the real shift. But it should also avoid the equal and opposite mistake of treating momentum as a substitute for engineering. Chris Kelly at Augment Code is blunt about it. AI code is still code, and vibes do not cut it in production — where production means four-nines uptime, thousands of users, and gigabytes of data, the moment a mistake is paid by people who never saw the prompt. It still has to live somewhere. It still interacts with systems, constraints, users, security boundaries, and future maintainers. The machine does not repeal software reality.

So the right stance is not anti-vibe but mode-aware.

Being mode-aware comes down to one switch: use vibe coding where the cost of being wrong is low and the goal is discovery, and leave it behind the moment the output has to endure. The tell is the Monday that Gallon described — the app still works, but now it has to change, and no one understands it well enough to change it safely. If that Monday is coming, the exploratory mode has already outlived its usefulness.

That shift in mode is itself a form of judgment.

## The new scarce skill is problem framing

One of the most underrated effects of stronger generation tools is that they expose weak framing much faster.

If a human engineer receives a vague task, progress may be slow enough that ambiguity reveals itself early. Questions emerge. Missing constraints become obvious. A meeting happens. The task gets reshaped before too much damage is done.

A machine can take a badly framed prompt and sprint in the wrong direction with alarming competence. This makes problem framing more valuable, not less. Sean Grove at OpenAI puts the point directly: the new scarce skill is “writing specifications that fully capture the intent.”

Framing a task well comes down to answering a specific set of questions before the work is delegated — a gate it has to clear, not a courtesy.

What exactly is the task?
What counts as success?
What constraints matter?
What should the system optimize for: speed, clarity, correctness, extensibility, reversibility?
What is allowed to remain rough, and what must be production-grade now?
What would make this output unacceptable even if it looks superficially complete?

These questions used to be signs of seniority. They now become the gate itself: operational prerequisites anyone must clear before directing cheap delegated execution.

Once we say the future is delegated work, the immediate human consequence is that directing work becomes a first-class technical skill. The manager, staff engineer, founder, designer, or individual developer who can frame a problem well suddenly gains disproportionate leverage because the system can execute rapidly against that frame.

The inverse is also true. A badly framed task can now waste far more time than before because the generator will happily produce large amounts of plausible but misaligned output. In a high-output environment, the quality of the question increasingly shapes the quality of the answer.

## Review becomes more important because generation outruns intuition

A subtle danger of AI-assisted work is that it can generate artifacts faster than human intuition can responsibly validate them. This matters in code, but also in strategy docs, product copy, research notes, customer communication, and operational plans. Humans are easily seduced by fluency and completion. A thing that looks finished exerts psychological pressure to be accepted. A thing that arrived quickly can feel like found value. The system does not merely save time; it changes the emotional texture of review.

That is why review becomes a more strategic function in AI-native teams.

Not review as bureaucratic blockage.
Review as quality discrimination.
Review as the moment where the team asks whether the artifact is actually fit for purpose.
Review as the place where tacit standards become visible.

Chris Kelly at Augment Code puts it bluntly: “code review is by far the most important skill” — and one the industry under-trained, because it interviewed for solving leetcode puzzles rather than for reading someone else’s code and judging why it is good or bad. It is the skill agents now demand at volume, because every line they write is a line you did not, and therefore have to evaluate cold.

This is where swyx’s “war on slop” is useful. Slop is not just bad code or generic writing. It is output that consumes trust faster than it creates value. It is work that looks done but transfers the cost downstream. It burdens the next person with confusion, cleanup, or false confidence. In a world of cheap generation, slop is not a side effect. It is the default failure mode.

Anti-slop discipline is not elitism. It is economic realism.

Cheap output that requires expensive cleanup is not actually cheap.
Fast drafts that hide slow confusion are not actually fast.
A system that creates reviewer fatigue is not scaling intelligence; it is scaling cognitive debt.

The human reviewer is therefore not an obstacle to AI productivity. In a well-designed loop, the reviewer is the mechanism through which standards survive abundance.

## Constraints are a form of care

One of the recurring mistakes people make with powerful models is to imagine that creativity and constraints oppose each other. In reality, constraints are often what allow useful creativity to emerge.

Itamar Friedman at Qodo frames the problem through confidence — “vibe coding with confidence,” he calls it — asking how teams can move fast while staying grounded in the codebase and its standards. The confidence does not come from the vibes; it comes from the verification wrapped around them, high-quality tests and a reviewing pass on the generated diff before it merges. The answer is not to remove constraints but to make the right ones explicit.

Constraints do several jobs at once.

They reduce wasted search.
They make evaluation clearer.
They preserve local quality norms.
They allow work to be delegated without requiring the delegator to hover over every step.
They turn taste from a private opinion into something operational.

This is true for codebase rules, product principles, review checklists, domain boundaries, writing standards, and architectural decisions. The team that can state its constraints well can delegate more safely than the team that relies on vibe, memory, and implied context.

Once judgment becomes more valuable, the next question is how to encode it. A lot of what we call taste at the individual level turns into harnesses, specs, and repo affordances at the system level.

## The software factory still needs adults in the room

The recurring software-factory case helps make this concrete.

A team begins with exciting outputs from coding agents. The first lesson is that the repo needs more structure. The second lesson is that even a better harness does not eliminate the need for human standards. Someone still has to decide what the harness should teach. Someone still has to define acceptable tradeoffs, review boundaries, and quality bars. Someone still has to distinguish changes that merely compile from changes that improve the system.

The same is true in the High-Stakes Colleague case. A legal or tax workflow can be given better retrieval, better tools, validation passes, and trajectory review. But none of those layers removes the need for domain judgment. They are ways of making judgment scalable and inspectable.

AI does not make seniority irrelevant. In many contexts it makes seniority more leveraged and more legible.

The senior engineer, strong editor, careful researcher, or domain expert is no longer valuable mainly because they can personally grind through more output. They are valuable because they can define standards, frame problems, reject seductive nonsense, and shape systems so that more of the generated work lands inside the right quality envelope.

## The human job is shifting from production to direction

It would be too simple to say that humans now only direct while machines produce. In practice, people still produce a lot, and in some cases manual work remains the fastest or safest path.

But as a directional statement, the shift is real. A larger share of human value moves toward:

- framing tasks well
- defining constraints
- choosing abstractions
- sequencing work
- reviewing outputs
- preserving coherence across many generated artifacts
- deciding when to trust the system and when to narrow its scope

This is why the AI-native skill set does not look like the disappearance of engineering fundamentals. It looks like fundamentals migrating upward into more leveraged parts of the loop.

The better the generators get, the more dangerous it becomes to confuse typing with thinking. What remains scarce is not the ability to produce tokens. It is the ability to direct production toward something coherent, durable, and worth keeping.

In that sense, taste is not a nostalgic defense of craftsmanship against automation but the discipline that keeps automation from collapsing into trash.

## Closing move

When code gets cheaper, many people instinctively ask what happens to programmers.

A better question is what happens to standards.

If the cost of generation collapses while the cost of bad judgment remains stubbornly high, then the defining skill of the next era is not mere production. It is the ability to know what should be produced, under what constraints, to what quality bar, with what review discipline, and with what willingness to throw seductive garbage away.

That is what taste means here.
Not luxury.
Not style.
Not personal branding.

Judgment under abundance.

And once that becomes the scarce resource, the next technical question follows naturally: how do you build environments where that judgment can survive delegation?

That is the work of the next chapter.
