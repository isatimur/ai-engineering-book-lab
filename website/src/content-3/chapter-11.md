# Chapter 11 — The Factory and Its Discontents


The corpus this book is built from contains dozens of talks about software factories, and they are not describing the same thing. Some mean a person running many agents at once. Some mean a pipeline that runs without anybody present. Some mean a metaphor they think is actively harmful.

This chapter takes the disagreement seriously, because it is the clearest live argument in the field, and because the people on each side have built things.

## A definition worth arguing with

Lou Bichard offers the sharpest version, and sharpens it further by ruling something out. A software factory is "the commitment to incrementally moving the human out of the loop within the SDLC. Such that the human is not proactively interacting with a computer" (Lou Bichard, Ona).

He then rejects the usage most people reach for. He has seen talks describing a factory as parallel agents — "one individual IC running lots of coding agents at the same time" — and says plainly that this is not his definition (Lou Bichard, Ona).

That distinction is worth holding onto, because it separates two futures that get conflated constantly. One is amplification: an engineer with leverage, present, directing. The other is absence: a system that runs when nobody is watching, where the human role is to design the process rather than to participate in it. Chapter 5's parallel agents belong to the first. The factory, properly meant, is the second.

Zach Lloyd states the direction as a prediction: "the discipline of software engineering is going to become something more like factory engineering" (Zach Lloyd, Warp). Not engineers using better tools — engineers whose object of work is the production line rather than the product.

If that is right, the skill that appreciates is process design, and the skill that depreciates is writing the change yourself. That is a serious claim about careers, and it deserves the scrutiny the rest of this chapter gives it.

## The prevailing narrative, stated fairly

Dex Horthy summarises the mood he is arguing against, and he does it without strawmanning: some teams have built a lights-off factory where nobody reads the code, and "the prevailing narrative is we should just spend more tokens. You are the bottleneck. The models are good enough. Code is free. just ship more stuff" (Dex Horthy, HumanLayer).

Every clause there is defensible in isolation. Tokens are cheap against salaries. Models are far better than they were. Chapter 1 established that the human *is* now the constraint. The narrative is a reasonable extrapolation from true premises, which is what makes it persuasive.

## The cracks

Horthy's talk exists because the extrapolation is not holding. "We are starting to see the cracks" (Dex Horthy, HumanLayer), and he names them concretely: companies that should not be having outages "are having outages due to coding agent mishaps", and "code bases are falling apart faster than they ever have before" (Dex Horthy, HumanLayer).

Both failures are ones this book has already explained mechanically, which is some evidence the explanations are right.

The outages are Chapter 8. Removing humans from the loop removes the last stage where somebody notices something looks wrong, and that noticing was doing more work than anyone measured, because it never produced an artifact when it succeeded.

The decaying codebases are Chapter 9. Volume against a system too large to hold in view produces local correctness and global incoherence, and no per-change gate catches it.

His title carries the argument: harness engineering is not enough. You can build excellent machinery — isolation, gates, parallelism, retries — and still fail, because the machinery does not supply judgement about what should be built or coherence about how it fits together.

## The measurement objection

Ryan Cooke's talk is a direct rebuttal, and his strongest move is about evidence rather than philosophy.

The usual proof that a factory is working is throughput: more pull requests, a higher share of AI-authored changes. Cooke's objection is that these numbers "can actually disguise how well these systems are working". Percentage or number of PRs "may be lying in overall increase in PRs", and "it's very hard to distinguish whether the output is actually driving outcomes" (Ryan Cooke, WorkOS).

So his team measures outcomes rather than code output, and asks whether the automation is driving value for the engineering organisation — a question with a cost attached, since building this needs dedicated full-time teams.

This is Chapter 10's statistic in decision form. Lines of code up 2,450%, releases up 30%. Any factory measured on the first number is a triumph. The same factory measured on the second is an expensive way to grow a queue.

And the point generalises past factories, which is why it belongs near the end of this book. Every intervention in these chapters can be justified by a metric that moves. Whether it moved the thing you wanted is a separate question, and almost nobody instruments it, because the proxy is easier to collect and always looks better.

## Where the metaphor leaks

A factory makes the same thing repeatedly. Its entire discipline — tolerances, throughput, defect rates, line balancing — assumes a fixed product and variation that is pure loss.

Software never makes the same thing twice. Anything built twice gets extracted into a function. What remains is, by construction, the part nobody has done before.

So the metaphor imports machinery from a domain where variation is the enemy into one where variation is the whole job. That is why it works brilliantly for Chapter 5's CVE remediation — thousands of instances of one well-specified change, genuinely a manufacturing problem — and why it strains the moment the work requires deciding what the thing should be.

The honest synthesis is that the factory is real for a specific and growing class of work, and oversold as a general theory of software. Both Bichard and Lloyd are describing something true about where repetitive, well-specified work is heading. Horthy and Cooke are right that the hard part does not live there.

## What is actually settled

Four things can be stated with reasonable confidence from this material.

**The direction is real.** More work will be done by systems running unattended, and process design is becoming a first-class engineering skill.

**Harness quality is necessary and not sufficient.** Excellent machinery with unexamined intent produces more of the wrong thing, faster, which is Chapter 2's argument arriving at industrial scale.

**Throughput metrics are nearly worthless as evidence.** They move whether or not anything improves. The number to instrument is the one that embarrasses you.

**The failures are not exotic.** They are outages from a missing human check and codebases that lost coherence — the two things this book predicted from the mechanics, which is mild confirmation that the mechanics were described correctly.

## What follows

Which leaves the question this book has deferred since Chapter 1, and that the whole corpus disagrees about: how much process is worth paying for, and how far out of the loop a person should actually go.

That is the last chapter, and it does not have a universal answer. It has a way of deciding.
