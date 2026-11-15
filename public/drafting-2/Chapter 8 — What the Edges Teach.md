# Chapter 8 — What the Edges Teach


This book has two halves, and a reader could be forgiven for thinking they were stapled together.

The first half is about building the model: post-training, reinforcement learning, serving economics, the compute substrate, what it takes to sit at the frontier. The second half is about places where the generic playbook does not fit: robots, prior authorization, legal review, chess coaching, crossword puzzles, music production. One half is a story about labs and GPUs. The other is a story about domains and their rules. They do not obviously belong in the same volume.

They belong here because they fail the same assumption, from opposite directions.

Book 1 took the model as given. You did not build it; you wrapped it, steered it, fed it context, held it accountable. Everything in that book was engineering that began after the weights were frozen. Part I of this book breaks that assumption from underneath: the weights are not frozen, and behavior is increasingly trained in rather than prompted in. Part II breaks it from the side: the weights may be fine, and the playbook still fails, because the domain brings a standard that no amount of general capability satisfies.

Two different edges of the same thesis. This chapter is about what they say together.

## Both halves move the line of what is given

Every engineering discipline runs on a line between what you accept and what you build. The interesting question in any era is where that line sits.

Part I moved it down. When Alessandro Cappelli of Adaptive ML argues that "reinforcement learning RL is not just any other algorithm for post-training, but is an an algorithm that at its core will bring models to production" (Alessandro Cappelli, Adaptive ML), he is saying the model's behavior is now something you produce, not something you receive. The line dropped below the weights.

Part II moved it sideways. The constraint stopped being a property of the model at all. In Rishabh Garg's account of Tesla's Optimus work, "the issue will look like it's the policy but it's actually the software system" (Rishabh Garg, Tesla Optimus) — the thing limiting the robot is the timing and the protocol between the controller and the wire. That is one team's experience on one humanoid, and it should be read as such. But it names a pattern Part II kept finding: the binding constraint sits outside the model, in a place the model cannot reach.

The two moves look unrelated. Both are the same discovery. The thing you are allowed to treat as given keeps shrinking, and the engineering keeps expanding into the space it vacates.

## Capability consolidates; accountability does not

Put the two halves side by side and they appear to argue with each other.

Part I is a story of consolidation. The largest personalization surfaces on the internet are collapsing fleets of specialized models into one. Yesu Feng of Netflix describes the aim as using one foundation model to cover every recommendation use case, because "by integrating the foundation model into all systems we can create high leverage" (Yesu Feng, Netflix). LinkedIn's team states the same ambition more completely: to build one model that can "solve all the personalization tasks that that LinkedIn has with just one model" (Hamed & Maziar, LinkedIn AI). YouTube rebuilt recommendation on top of Gemini. Even the architectures are converging — Samuel Humeau of Mistral explains that modern speech synthesis is language modeling over discrete tokens because "humanity is extremely good at modeling sequences of token" (Samuel Humeau, Mistral). One template, absorbing everything.

Part II is a story of specialization, and it is just as emphatic. Building a chess coach, the Play Magnus team let Stockfish compute the truth and gave the language model a single job: "the LLM's job is only to translate this information" (Dole & Steinskog, Play Magnus). It is explicitly forbidden from reasoning about the position. At the New York Times, Shafik Quoraishee and Joanne Song draw the line harder still: "Our puzzles are made by people. They're not made by AI. So, that's just a thing we this true and it'll always be true. There's no AI in the games themselves." (Quoraishee & Song, NYT) Gemini's audio stack composes a speaker-attribute extractor, a steerable voice, a native speech-to-speech model, and a separate music model invoked as "a tool to then generate a song using Lyra" (Thor Schaeff, Google DeepMind) — several specialized pieces, deliberately not one.

So which is it: one model for everything, or many models in narrow lanes?

Both, because they are claims about different things. Consolidation is happening in **capability** — what a single trained artifact can do. Specialization is happening in **accountability** — who answers for a given output being right. The Netflix model absorbs more surfaces because capability generalizes well. The crossword stays human because accountability does not generalize at all. A model that is better at everything is still not the party responsible for the puzzle being solvable.

This is the single most useful thing the two halves say together, and it resolves what looks like a contradiction in the field's own literature. The frontier consolidates. The lanes stay drawn. They are not competing predictions.

## The constraint was never compensation for a weak model

Book 1 described constrained delegation: prepared environments, explicit intent, bounded authority, review aimed where it matters. A fair reading of that book is that the constraints are scaffolding — necessary because models are not yet good enough, and destined to loosen as they improve.

Part II is the evidence against that reading.

Waseem Alshikh of Writer makes the quantitative version of the case with a finance benchmark that separates answering from grounding. Even the strongest model scores around 81% on the combined measure, and he puts the number in its place: "81% sounds a great number if you think in the reality" (Waseem Alshikh, Writer). Roughly one answer in five is wrong under imperfect context. In a domain where a confident wrong answer carries unbounded cost, that is not a gap waiting to be closed by the next release; it is a reason the general model is disqualified from holding the decision at all. Leo Pekelis, who trains a finance model rather than buying one, reaches it from the other side: taking a generalist model off the shelf "isn't really going to get you too far" (Leo Pekelis, Gradient). Both are moderate-support accounts from teams with something to sell, and should be weighed as such — but they agree on the shape.

Look then at how the high-stakes teams actually ship. Dan Mason's telemedicine workflow gates on a confidence score, escalates out-of-script cases to a physician's assistant, and routes genuine medical judgment to "call 911, go to your doctor," (Dan Mason). Christopher Lovejoy, a doctor turned AI engineer at Anterior, describes an escalation ladder that sends low-confidence prior-authorization cases to "give it to an on call clinician to review it" (Christopher Lovejoy, Anterior). At Ensemble Health, a clinical expert signs off before an appeal reaches the payer, so that the expert can "make the final decision on whether or not uh the letter meets the meets the standard of quality" (Nathan Wan, Ensemble Health).

None of those is a workaround. Each is a designed place to park unbounded risk with a named human. A better model makes the escalation rarer. It does not remove the need for somewhere to escalate to, because the thing being supplied is not accuracy. It is answerability.

The Times line is the cleanest statement of it in the whole corpus, and it is worth reading again for what kind of sentence it is: *it'll always be true*. That is not a capability forecast. It is a commitment about who makes the thing.

## What you can measure is what you can delegate

If the constraint is not the model, what actually sets the limit?

Both halves answer: the measure.

In Part I this is mechanical. Reinforcement learning only works against a reward you can compute, which is why code became the domain where RL scaled first — its rewards are machine-checkable. The reward function stops being an evaluation detail and becomes the specification. What you can score, you can train toward; what you cannot score, you cannot train toward, however much compute you point at it.

In Part II the same fact arrives wearing different clothes. Lovejoy describes building a real-time, reference-free evaluation layer, where "reference free also known as label free means that you evaluate before you know the true outcome" (Christopher Lovejoy, Anterior) — scoring every case before ground truth exists, and letting those scores decide which cases reach a scarce human. That eval layer is not a gate before shipping. It is the thing customers pay for. The SonderMind team is explicit about where its ground truth comes from: "our system isn't deciding what correct is in a clinical edge case like this one. A licensed professional is." (Reed & Revere, SonderMind)

Train a model and the measure is a reward. Deploy into a regulated domain and the measure is an eval. They are the same object seen from two ends of the pipeline, and in both halves it is load-bearing in a way the model is not. A domain where you cannot say what good looks like is a domain you cannot delegate into, no matter which weights you hold.

This is where book 2 rejoins book 1 rather than departing from it. Book 1 argued that evals are the control system. Part I says the control system is also the training signal. Part II says that in the domains with the most at stake, the control system is the product.

## The failure is usually in the system

One more thing both halves keep finding, and it is the least glamorous.

Part II's version is Garg's: the robot failure that looks like the policy is the software system. Part I's version is a research habit. Raia Hadsell describes DeepMind's approach as looking "for root nodes. You know we're not going to waste time on the leaves." (Raia Hadsell, DeepMind) Jack Rae states the general form: "So, progress has really been marked by identifying key bottlenecks towards intelligence and then solving them." (Jack Rae, DeepMind) Both sources are DeepMind describing DeepMind, so this is one lab's account of its own research culture rather than a law of the field.

Even discounted that far, the symmetry is striking. At the frontier, progress comes from correctly naming the one thing that is limiting the system. In a deployment, failure comes from mis-naming it — blaming the policy when the protocol is at fault. The skill in both cases is diagnostic rather than generative. Generating candidate fixes is cheap now. Knowing which thing is actually broken is not, and nothing in the last three years has made it cheaper.

## What the edges teach

Book 1 named an enduring pattern: constrained delegation. This book does not replace it. It says where the constraints come from.

They do not come from the model being weak.
They do not dissolve as the model improves.
They are not scaffolding to be removed later.

They come from the domain — from what must be true, who has to answer for it, and what can be measured before anyone finds out. A better model moves work across the line faster. It does not move the line.

That is why the two halves belong in one book. Part I shows that the model has become something you build, which means its behavior is now your responsibility rather than a vendor's. Part II shows that building it better does not transfer the other responsibilities to it. You end up owning more of the stack and less of the excuse.

The domains that looked least like engineering turned out to demand the most of it. The same is true of the model layer: it looked like research and turned out to be an engineering discipline with a training loop attached. Both edges lead to the same place, which is the unglamorous centre of this whole subject — knowing what good looks like, being able to measure it, and having someone who answers when it is not.

## Practical checklist

- **Name what is given.** Write down what you are treating as fixed: the weights, the serving stack, the domain rules. Most project surprises come from something on that list quietly moving.
- **Separate capability from accountability.** Ask which outputs the model may produce, and separately, who answers for each being right. If the second answer is "the model," you have not finished the design.
- **Find the measure before the model.** If you cannot state what a good output is and compute it before ground truth arrives, you do not yet have a delegation problem — you have a definition problem.
- **Build the escalation path as a staffed thing.** A confidence threshold with no named human behind it is a logging statement.
- **Suspect the system first.** When something fails, check the plumbing between components before you blame the policy or the prompt. It is more often the wire than the mind.
- **Draw the model's lane narrowly in subjective domains.** Let a structured system own anything that must be true, and let the model own the language around it.
- **Re-read your constraints yearly.** Some are compensations for a weak model and should be retired. Others are commitments about who makes the thing. Keep the second kind on purpose, and know which is which.
