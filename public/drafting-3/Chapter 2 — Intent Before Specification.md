# Chapter 2 — Intent Before Specification


A specification is an answer. The previous chapter argued that the constraint moved upstream into deciding and agreeing; this one is about the step before any document helps, which is working out what you actually want.

Skipping it has always been possible. What changed is the speed at which skipping it produces working software that nobody needed.

## The default direction is the wrong thing

Kent C. Dodds opens his material on product engineering by quoting Dax Raad, who built OpenCode, on where the new capability tends to go on its own. The default place for new coding-agent ability to go, Raad says, "is work on the wrong things. Products go from good to bad faster than ever" (Dax Raad, quoted by Kent C. Dodds, EpicProduct.engineer).

Read that as a claim about direction rather than quality. Agents are not making worse code. They are making more of whatever they are pointed at, and most of the time nobody checked the pointing. A team that was mildly wrong about its priorities now gets to be mildly wrong at several times the throughput, and the result arrives looking finished.

This is the first reason intent comes before specification. A specification written on top of an unexamined goal is not a safeguard. It is a faster path to the wrong destination, and a more convincing one, because the document makes the destination look deliberate.

## Deciding what to build became the scarce skill

James Lowe of i.AI builds his argument from a post by Andrew Ng. Writing software, especially prototypes, is getting cheaper — partly from coding agents, partly because AI features make things possible that were not. Lowe reports Ng's conclusion: "this will lead to increased demand for people who can decide what to build" (Andrew Ng, quoted by James Lowe, i.AI).

That is the economic shape of the shift in one line. When the expensive thing was construction, judgment about what to construct was comparatively cheap to leave implicit. When construction is cheap, the judgment is the cost centre, and it is the part no tool has automated.

Lowe's own argument is that this work needs real expertise in the technology, not just in the market — that you cannot decide well what to build with AI if you do not understand what AI can and cannot do. The role he describes sits between disciplines rather than inside either.

## The engineer's half of that job

Dodds is careful to say he is not asking engineers to become product managers, and then he draws the line precisely. "Your job as a product engineer is to connect the customers — understanding what the customer needs — to the technical choices that are being made so that you don't paint yourself into a corner and you don't overbuild" (Kent C. Dodds, EpicProduct.engineer). He lists what falls out of that connection: the data model, the workflow shape, observability, constraints, failure modes, and the smallest slice.

Notice that every item on that list is a decision a specification would record and none of them is a decision a specification can make. The document captures the conclusion. Reaching it requires knowing what the user is trying to do, which is not information the repository contains.

Dodds's instrument for getting there is a job statement. You work down to the underlying why and turn it into a statement of the job the user is hiring the product to do, because that "helps a lot with making sure you're building the right thing" (Kent C. Dodds, EpicProduct.engineer). He then breaks the job into three dimensions — functional, social, and emotional: whether it does the thing, who else is involved when the user does it, and how they feel while doing it.

The failure he is guarding against is specific, and it is not laziness. It is solving a problem that seemed compelling to one person and was never general, which produces software that works perfectly and serves nobody.

## The complication: sometimes you cannot write it down first

Here the chapter has to argue against its own title, because one of the clearest voices in this material says the document cannot come first.

Ben Stein of Teammates describes building with capabilities whose limits nobody knows yet. His team composes pieces, puts them in front of people, and finds out what emerges. The honest part is what he says about specifying it up front: "if you asked me I could not sit down in front of a Google doc and be like oh let me like type out what this thing should" (Ben Stein, Teammates). The new job, as he puts it, became discovering what is possible — building things and then discovering what they can do.

This is not an argument against intent. It is an argument against a particular theory of where intent comes from. The waterfall assumption is that intent is fully available at the start, in someone's head, waiting to be transcribed. For a product built on capabilities that did not exist last year, it is not. Some of it has to be found by building.

So the sequence is not *specify, then explore*. It is closer to: hold a clear question, probe cheaply until the answer is real, and only then write down what you learned. The thing that must precede the specification is not a complete picture. It is an honest account of what you know, what you are guessing, and which guesses the next week is meant to settle.

A spike that resolves an unknown is upstream work. A spike that becomes the product by accident is how the unexamined goal gets built after all, and the difference between the two is whether anybody wrote down what it was for.

Kenneth Auchenberg, who worked on the early VS Code team and later ran developer products at Stripe, states the counterweight as a principle he has built by for years: "building products is really about shipping something to someone always wins" (Kenneth Auchenberg). It is the sentence any chapter arguing for upstream work has to survive. Contact with a real user settles questions that no amount of internal discussion resolves, and a document circulating among people who agree with each other can simulate progress indefinitely.

Both things are true, and the resolution is not a compromise between them. Shipping is how you learn what people want. Intent is how you decide what to ship next and what to stop doing. Teams get into trouble by treating either as the whole job — endless discovery that reaches nobody, or continuous shipping with no account of what any of it was for, which is Raad's wrong-things problem with a faster engine.

Hursh Agrawal, CTO of The Browser Company, shows the same instinct applied to his own time. His week is fifteen-plus recurring meetings, and his answer to the manager's schedule is to keep prototyping — not to stay technically relevant, but because building the thing is how he keeps a grip on what it should be (Hursh Agrawal, The Browser Company). Judgment about what to build decays when it stops touching the material.

## What this means in practice

Two instruments do most of the work before a specification exists, and neither produces a document.

The first is interrogation. Most stated requirements are solutions in disguise, and the fastest way to find the actual requirement is to push on the stated one until it either explains itself or collapses. Why this, why now, what happens if we do nothing, who is harmed if we are wrong. A requirement that survives that is worth specifying. One that does not has saved everyone a sprint.

The second is deliberate option generation. The first idea is rarely the best one and is almost always the most available one, which is a different property. Laying out two or three real alternatives — including the one where nothing is built — turns an unexamined default into a choice someone made on the record.

Both are cheap, and both are routinely skipped for the same reason: they feel like delay, while generating code feels like progress. Chapter 1's argument applies directly. Time saved on a stage that is not the constraint is not saved at all, and if the constraint is now agreement about what to build, an hour of argument is the most productive hour in the week.

## What follows

Once intent is settled enough to commit to, the question becomes what form to commit it in — and that is where the systems in this book start disagreeing in earnest. What belongs in a specification, how binding it should be, whether it describes behaviour or generates it, and what it is for once the code exists are all live questions with incompatible answers in current practice.

That is Chapter 3. The order matters: a specification is a good answer to a question you have already asked properly, and an expensive way to avoid asking it.
