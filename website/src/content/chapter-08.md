# Chapter 8 — Realtime, Voice, and the Cost of Being Interruptible

Text chat flatters AI systems. Voice does not.

In text, users tolerate delay, awkwardness, and weak handoffs because the interface gives the system time to recover. In spoken interaction, every defect becomes audible. If the model pauses too long, it sounds confused. If a tool call stalls, it sounds incompetent. If the system interrupts badly or loses the thread after a clarification, it stops feeling like an unfinished prototype and starts feeling like a bad conversational partner.

That asymmetry is why voice deserves a chapter, not a section. Realtime interaction pressure-tests almost every earlier claim in the book. Weak context becomes an audible loss of thread. Brittle runtime design becomes broken interruption handling. Sloppy authority boundaries become dangerous casual approvals. Slow tools become conversational incompetence. Voice does not introduce a new thesis; it makes the existing one harder to hide from.

## A stress test the model alone cannot pass

The natural assumption among engineers stepping into voice for the first time is that the model is the bottleneck. If the speech-to-speech system feels stiff, the obvious culprit is the LLM. Make it smarter, make it faster, and the experience converges to a conversation.

The practitioners building production voice systems do not see it that way anymore. Sean DuBois at OpenAI and Kwindla Hultman Kramer at Daily titled their joint talk "Your realtime AI is ngmi" for a reason: the gap between current voice agents and natural conversation, in their experience, is dominated by problems no model improvement will close. Tool-call variance. Overlap handling. Interruption recovery. Turn budgets. None of those are model-quality problems. They are systems problems with an architectural shape.

Neil Zeghidour at Gradium AI makes the strongest version of this argument. "The main bottleneck is becoming the tool call," he says, after walking through what each layer of a voice agent now costs. Speech recognition is fast. The model itself is fast. Speech synthesis is fast. What is not fast — and worse, what is not *predictable* — is the call out to a function or an external service that the agent has to make in the middle of a sentence. "You have a tool call or open router that is going to have a latency between 500 milliseconds and 4 seconds," he notes. The variance is more painful than the average. A 4-second pause in conversation is not a slow response. It is a dead line.

Dippu Singh frames the same problem from inside the contact-center stack. "Processing real-time voice data is an engineering minefield of latency, accents, and interruptions," he writes, and the word *minefield* is doing real work. The failures do not announce themselves on the way in. They cascade. A bad turn cue causes the next turn to misroute, which causes the retrieval to fetch the wrong record, which causes the response to be confidently wrong. By the time anyone notices, the call is over.

The chapter that follows treats voice the way the rest of the book has treated coding, evaluation, context, and runtime: as a problem of the loop around the model, not of the model itself.

## Latency is a budget across the whole stack

Zeghidour's working number for natural conversation is precise. "The entire stack of understanding, producing an answer, and pronouncing it" needs to land "around 200 milliseconds." That is the budget. Not the recognition latency. Not the inference latency. The end-to-end turn budget — from the user finishing their sentence to the user hearing the system's reply.

Two hundred milliseconds is approximately the length of a comfortable conversational gap in English. Use it as a pass/fail line, not an aspiration: measure end-to-end turn latency from end-of-utterance to first audio packet, and treat anything past ~200ms as a hesitation the user will register consciously or not. Two beats and the system feels slow; three and it feels confused. The trap is optimizing the wrong number — shaving inference milliseconds while the turn budget blows out on a tool call.

Inside that budget, the system has to do at least: detect end-of-utterance, transcribe the audio, build the context, run inference, possibly call one or more tools, generate the response text, synthesize it as audio, and start streaming it. The components that have been heavily optimized — speech recognition, model inference, text-to-speech — are no longer the dominant cost. Mark Backman's Daily workshop on realtime voice walks through this in production-grade detail: the engineering wins of the last two years have come almost entirely from squeezing variance out of orchestration, not from making any single component faster on the median.

Kwindla Hultman Kramer's Pipecat Cloud work makes the same point as infrastructure rather than commentary. The whole architecture is organized around the budget. Audio frames arrive on a deterministic clock. Each stage of the pipeline has a deadline. The system is designed assuming that any individual call might be late, and the orchestration handles the lateness — not the component that was late.

This is the inversion the chapter rests on. In a text agent, latency is a property you optimize. In a voice agent, latency is the substrate the system has to be built on. Once you accept that, every other architectural choice — wrap-don't-rebuild, full-duplex vs half-duplex, fillers, parallel tool calls — falls out as a consequence.

## Wrap, don't rebuild

A common mistake in voice projects is to assume that the existing chat agent has to be redesigned for voice. The instinct is reasonable. Voice feels different enough from text that surely the architecture has to change.

Luke Harries at ElevenLabs makes the case for the opposite move with one of the more honest sentences in the corpus. "I've already got my agent. I spent loads of time doing the evals," he says, framing the eval infrastructure not as something the voice migration can throw away but as the asset that justifies keeping the existing architecture. The right move, in his framing, is to "wrap it up into its own first-class primitive" — to add a voice engine *to* the agent rather than rebuild *as* a voice agent.

The reasoning is sharper than it first appears. The hard parts of a production agent — the tools, the evals, the durable state, the permission model, the retry logic, the observability — are not voice-specific. They are agent-specific. Throwing them away to start from a speech-native stack means throwing away the work that made the system trustworthy in the first place. As Harries notes, "your chat agent actually normally does the majority of tool calling." The voice layer's job is to make that agent audible. The agent's job remains the same.

Thor Schaeff's ElevenLabs workshop on building conversational AI agents is essentially an operational version of the same argument. The starting point is the agent you have. The voice layer adds turn detection, barge-in handling, partial audio streaming, and a speech model — but it does not replace the orchestration that already worked.

This pattern shows up across the cluster. Brooke Hopkins at Coval frames her voice work as "from self-driving to autonomous voice agents," and the analogy is not casual: she treats the voice runtime the way an autonomy stack treats the perception and planning layers — as composable subsystems with their own contracts, not as a monolithic rewrite of the underlying control system. The operational test: if adding voice forces you to touch the agent's tools, evals, or state model, you are rebuilding when you should be wrapping. Draw the seam at the interface, give the voice layer (turn detection, barge-in, audio streaming, speech model) its own contract, and leave the orchestration untouched. The agent persists across the migration. The interface does not.

The deeper claim is that the architectural move the book has been advocating since Chapter 3 — keep the orchestration durable, change the surfaces around it — is exactly the move that pays off when voice arrives. A team that built a strong text agent has already done most of the voice work. A team that built a thin chat wrapper has to start over.

## Half-duplex is the silent architectural ceiling

Once the engineering of latency and orchestration is in place, the next ceiling is conversational, not technical.

Most production speech-to-speech systems are half-duplex. They can listen, or they can speak, but not both at the same time. As Zeghidour puts it directly: "The model is either listening or it's speaking." That single architectural choice has consequences for every interaction that does not happen one turn at a time, which is to say, every interaction that resembles real conversation.

Real conversation has overlap. The listener says *mhm* while the speaker keeps going. The speaker pauses and the listener fills the pause with a question. Both parties speak briefly at the same time when the listener wants to take the turn. Zeghidour names these patterns explicitly. "Overlap between uh people speaking on one another." "Back-channeling." Both are first-class features of human dialogue, and both are unavailable to a model that can only do one of listening or speaking at any given moment.

Tom Shapland's LiveKit talk "Why ChatGPT Keeps Interrupting You" is essentially a case study in what half-duplex feels like at scale. The system has no way to lean in without taking the turn. It has no way to wait without going silent. Every conversational micro-decision collapses into the same binary: am I listening, or am I speaking?

The instinct of many teams is to patch this in product. Add a *wait* button. Add a tone-detection heuristic. Add a longer silence threshold. The trap: each patch helps marginally and is paid for in worse responsiveness somewhere else — a longer silence threshold buys cleaner turn-taking at the cost of a slower system. Treat these as symptoms, not fixes. When you find yourself stacking silence-timing tweaks, the right read is that the half-duplex constraint is propagating, and the lever is the architecture, not the timing.

The cleanest long-term answer is full-duplex architecture — systems that can simultaneously listen and speak. Zeghidour's own Moshi work is one of the few production-scale demonstrations. As he is the first to point out, full-duplex models pay for the architectural change at the agent layer: the model can do conversational overlap, but it is materially weaker at the actual reasoning. The trade is real. The half-duplex world is a workplace; the full-duplex world is a research frontier.

What changes in either case is the framing. Turn-taking is not a UX polish that can be papered over with timing tweaks. It is an architectural feature of the system that determines what kinds of conversation are possible at all.

## Latency must be masked, not just minimized

The 200-millisecond budget is a useful target. It is also, for tool-call-heavy agents, often impossible. When the tool latency variance is 500 milliseconds to 4 seconds, no amount of optimization gets the worst case into the conversational window. Optimization has a floor. Conversation does not.

The systems that ship anyway do so by adding a layer the book has not yet named: latency masking.

The basic idea is that the system, while it waits for a slow operation, keeps the conversation alive. Zeghidour describes the pattern as the agent producing fillers and partial answers: "While it waits for getting the result back, it can keep the conversation going." A short acknowledgement here. A clarifying question there. A *one moment* that buys 1.5 seconds of tool time without leaving the user staring into silence.

This is not animation. It is conversational scaffolding. The fillers are doing structural work — they preserve the user's sense of turn, they signal that the system is alive, and they create slack the orchestration needs to handle variance. The decision rule: any operation whose latency variance can exceed the turn budget needs a masking strategy before it ships — a short acknowledgement or clarifying question emitted the instant the slow call starts, not after it stalls. Done well, a 3-second tool call disappears into the rhythm of the exchange. Done poorly, the same call sounds like a freeze.

Harries makes the same point from the architecture side. The voice layer needs the ability to interleave low-latency speech with the agent's longer-running operations, which is why he treats the voice engine as a first-class primitive with its own state — not as a streaming pipe attached to the agent's output. When the agent is busy, the voice layer is not idle. It is doing the conversational equivalent of nodding.

Suman Debnath's VoiceVision RAG work at AWS surfaces the same pattern at a different layer. Visual document intelligence integrated with voice response has to maintain the conversational thread while a vision model takes its turn. The user does not care that a document was being read in the background. They care that the conversation did not stall.

The reason this matters for the book's broader thesis is that latency masking is one of the cleanest examples of the scaffolding-makes-reliability argument. The model can be excellent. The tools can be excellent. The orchestration can be excellent. If the system has no way to keep the conversation alive while the orchestration runs, the experience falls apart. The masking layer is reliability infrastructure. It needs to be designed in, not bolted on at the end.

Latency masking belongs in the same architectural category as evals, harnesses, and durable runtimes. It is the runtime cost of being interruptible.

## TTS architecture is converging on LLM architecture

The voice cluster also produces one of the cleanest pieces of evidence the book has for its broader claim that scaffolding ideas generalize across substrates.

Samuel Humeau at Mistral, whose work on TTS-as-LLM is the chapter's reference for this thread, puts the convergence plainly. "Pretty much everybody is using an auto-regressive decoder backbone," he says, describing the architectural shape the leading text-to-speech systems have settled into. The same tokenize-and-stream-and-generate pattern that drove text agents now drives speech generation. The same first-packet-latency obsession that shaped LLM serving now shapes TTS serving. The substrates are different. The discipline is the same.

If Humeau's read is right, the convergence is not cosmetic. The TTS-as-LLM framing means that the things the book has spent ten chapters arguing about — streaming, conditioning, latency budgets, perceived-latency optimization — are now also the right lens for speech-generation systems. As Humeau notes, "the latency is key here" and "the perceived latency is lower" when the system streams the first audio packet before the full response has been generated. That is exactly the streaming-and-early-emit pattern the chat side has been refining for years.

Humeau also identifies the use case driving the convergence. "The king use case for text-to-speech is its usage within agents," he says — meaning the architectural choices in the TTS layer are increasingly being optimized for embedding in a larger agentic system, not for standalone audio production. The TTS layer is being shaped by the same pressures the agent layer is shaped by.

Humeau is admirably specific about where his own released model departs from the pattern: it uses diffusion or flow-matching for the per-frame stage rather than full autoregression. The convergence claim is about the backbone, not full-stack. That distinction is worth keeping; it is a reason to treat the convergence as a strong signal rather than a settled fact. But the direction is unambiguous, and on Humeau's account it shows up beyond Mistral: the same architectural family — autoregressive decoder backbones streaming token-by-token — appears across other leading voice work.

The implication for the book's broader frame is that the scaffolding-first thesis is not a text-agent argument. It is an architecture argument that happens to be especially clear at the agent layer. The voice cluster confirms it from a different substrate.

## Robotics: the same constraints at higher stakes

A short note on robotics, which the chapter title gestured at and which the corpus has enough on to anchor a single section if not yet a chapter of its own.

The robotics talks in the cluster — Annika and Aastha on GR00T N1 humanoid foundation models, Jyh-Jing Hwang on Waymo's EMMA, Quan Vuong and Jost Tobias Springberg on Physical Intelligence's "robotics: why now?" framing — read as voice agents with the latency budget tightened and the failure mode physicalized. The bottleneck shifts from tool calls to perception-to-action loops. The half-duplex ceiling shifts from turn-taking to one-action-at-a-time. The masking layer shifts from fillers to motion-plan continuity. The architectural shape is the same.

The book's claim is not that voice and robotics are the same problem. It is that they are stress-tests of the same underlying frame. When the system has to operate inside a latency budget set by physics rather than by user preference, the scaffolding-first argument is no longer a stylistic choice. It is what determines whether the system can act at all.

That makes voice the right *first* embodied edge to chapter — the engineering is mature enough to teach. Robotics is the right *next* one, and its treatment in this manuscript will deepen as the corpus does.

## What voice confirms about the book's frame

The chapter started with a claim about asymmetry: text flatters the system; voice does not. By now that asymmetry should be doing more work than it did at first read.

Every section above named a problem voice exposes that text mostly hides. Coordination, not model quality. End-to-end latency budgets, not single-component speed. Architectural reuse, not voice-native rewrites. Half-duplex ceilings, not interface choices. Masking as infrastructure, not animation. TTS-as-LLM, not isolated speech modeling. In each case the chapter's claim is that voice did not introduce a new failure mode — it made an existing one audible.

That is also the chapter's connection back to the rest of the book. Chapter 3 argued that the harness around the model determines what a coding agent can be trusted to do. Chapter 4 argued that evals are the control system that holds the harness honest. Chapter 5 argued that context is the substrate the model reasons over. Chapter 6 argued that runtimes are what carry state across the gaps in a single agent run. Each of those claims sharpens under realtime pressure. Each becomes audible. Voice is the substrate where the book's frame stops being inferable and starts being heard.

The next chapter widens out from this stress test to the organizational question the book has been pointing at since the opening. If reliable AI is a property of the loop around the model — and if the loop now includes context architecture, durable runtimes, and realtime infrastructure — then the team that ships dependable AI looks different from the team that ships a chatbot. Chapter 9 is about what that team looks like.

The last word in the voice cluster belongs to Zeghidour, who has been honest enough throughout his talk to keep saying that there is more to do. "The last mile is going to be the most difficult to solve," he says, near the end. The chapter would not put it differently. The first mile of voice was a model problem. The last mile is an infrastructure problem. The first one is mostly solved. The second one is the work.

## What to do with this

- Measure the end-to-end turn budget, not component speed. Instrument latency from end-of-utterance to first audio packet and treat ~200ms as the pass/fail line; if you're shaving inference milliseconds while a tool call blows the budget, you're optimizing the wrong number.
- Wrap your existing agent; don't rebuild it as voice-native. Add the voice layer (turn detection, barge-in, partial audio streaming, speech model) as a first-class primitive over the agent you already evaluated — and use this test: if adding voice forces you to touch the agent's tools, evals, or state model, you've crossed from wrapping into rebuilding.
- Profile your tool-call latency *variance*, not its average. A call that averages fine but spikes to 4 seconds is the real failure; Zeghidour's "500 milliseconds and 4 seconds" range is what kills conversations, because a 4-second pause is a dead line, not a slow response.
- Build a latency-masking layer for any operation whose variance can exceed the turn budget. Emit a short acknowledgement or clarifying question the instant the slow call starts — not after it stalls — so a 3-second tool call disappears into the rhythm instead of sounding like a freeze. Design it in as reliability infrastructure, not as a bolted-on afterthought.
- Recognize half-duplex as an architectural ceiling, not a UX bug. When you find yourself stacking silence-timing tweaks and *wait* buttons, stop — each patch is paid for in worse responsiveness elsewhere; the lever is the architecture, and full-duplex buys conversational overlap at the cost of weaker reasoning, so make the trade deliberately.
- Treat TTS as an LLM-shaped system. Reuse the streaming, first-packet-latency, and early-emit discipline from the chat side — stream the first audio packet before the full response is generated so perceived latency drops — because leading TTS work has converged on autoregressive decoder backbones optimized for embedding in agents.
