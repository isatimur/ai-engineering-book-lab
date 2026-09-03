# Chapter 8 — Realtime, Voice, and the Cost of Being Interruptible


Text chat flatters AI systems.

It hides latency behind a blinking cursor. It tolerates awkward pauses. It lets a weak handoff look like thoughtful reflection. It gives users time to scroll, reinterpret, and silently repair what the system failed to make clear on the first pass. A lot of fragile AI feels smarter in text simply because text is forgiving.

Voice removes that mercy.

Imagine Hargrove's assistant — the one that built its retrieval binder in Chapter 5, gained durable state and staged sign-off in Chapter 6, and had its authority scoped behind a gateway in Chapter 7 — on a live support call with a client whose account is locked, whose case crosses billing and compliance rules, and whose patience is running out in real time. The agent has to understand messy speech, notice that the caller interrupted to add a crucial exception, retrieve the right internal policy, check the client record, decide whether it can act directly or must escalate, explain what it is doing, and avoid sounding either lost or overconfident while all of this is happening.

The same themes that shaped Chapters 3 through 7 — scaffolding, evals, context, runtime design, authority boundaries, and human control — are all still here. The difference is that realtime compresses them into milliseconds, so problems chat can hide become audible. Voice is not merely another modality; it is a systems stress test for trustworthy agency. Kwindla Hultman Kramer draws the line by the clock: real time is anything inside "conversational latency of a few hundred milliseconds or less."

## Realtime exposes whether the rest of the architecture was honest

The field often treats voice as a charming frontier, a natural interface waiting for slightly better models. That framing is too soft. Voice matters because it strips away excuses. If the context architecture is weak, the system will fumble the thread. If the runtime is brittle, interruptions will break it. If the security model is sloppy, approvals will be too casual and authority too ambient. If the control plane is underdesigned, the user will be forced to rescue the interaction constantly. If the tool layer is slow, the product will sound incompetent no matter how good the core model is in isolation.

## Realtime systems reveal what chat can hide

In text interfaces, turn-taking is loose. The user sends a message, waits, and receives a response. Even when the latency is annoying, the social contract survives. Spoken interaction is different: timing itself becomes part of the product.

People expect overlap, acknowledgment, interruption handling, backchannels, and rapid repair. They do not experience conversation as a sequence of perfectly separated turns. They experience it as a continuous negotiation of attention. Users do not only want the answer faster. They want the system to behave as if it understands the rhythm of interaction.

In the support-call scenario, that rhythm is not cosmetic. If the caller corrects their own account number halfway through a sentence, the system has to revise state. If the caller says, “No, wait, that was the old policy,” the system has to distinguish between abandoned context and active context. If the agent says “One moment while I check that” and then disappears into silence, the user does not experience a neutral backend delay. They experience incompetence.

This is what the modern voice material names so well. The gap is no longer only transcription quality or speech synthesis quality. The real test is narrower and harder: timing, overlap, and interruption — the three ways a live conversation actually breaks. Even as speech models improve, systems still wait too long, cut in too aggressively, or lose coherence when the human changes direction mid-stream. Passing means handling those three, not sounding more eloquent. A model can be perfectly articulate and still fail all of them, because the thing under test is whether the system can coordinate listening, reasoning, tool use, and speaking under live pressure.

That matters far beyond voice. A realtime system is simply the most unforgiving version of a general truth: trustworthy AI depends on the loop around the model. Voice makes that visible because the human is still there to feel every systems defect as behavior.

## Latency is a budget across the whole loop

One of the most useful mistakes in voice discourse is treating latency as a single number. In practice, latency is a budget distributed across the entire loop: audio capture, transport, speech recognition, turn segmentation, model reasoning, tool invocation, retrieval, speech generation, and playback. A system can have a fast core model and still feel terrible because the orchestration around it burns the budget in awkward places.

Practitioners put numbers on the budget. Neil Zeghidour at Gradium AI sets the target for natural conversation at the whole loop: “the entire stack of understanding, producing an answer, and pronouncing it” has to land “around 200 milliseconds,” measured end to end, not at any single stage. Kwindla Hultman Kramer, whose Pipecat work treats this as infrastructure, is specific that the number to watch is the tail, not the average: “in most cases in a voice AI conversation, you care a lot if your P95 goes up above 800, 900, 1,000 milliseconds for the entire voice-to-voice response chain,” and every inference call inside that chain “has to be much faster than that by definition.”

The support-call case makes this concrete. The user does not care whether the delay came from ASR, retrieval, the permissions gateway, or a slow billing tool. They only hear that the agent became hesitant exactly when confidence mattered. So the rule is to spend the latency budget on the first audio rather than on silence: a quick spoken acknowledgment followed by a slightly slower answer beats a long silent pause followed by a polished response. Streaming partial understanding can outperform a more globally optimal batch pipeline. Fast first audio rescues a system whose deeper reasoning takes longer, provided the interaction contract is designed honestly.

Better speech sharpens a further point. As speech layers improve, tool calls increasingly become the bottleneck — “The main bottleneck is becoming the tool call,” as Zeghidour puts it, once speech recognition, the model, and synthesis are all fast. The variance bites: a tool call or open router runs “between 500 milliseconds and 4 seconds,” and a 4-second pause in conversation is not a slow response but a dead line. That tool-call bottleneck is a major book-level insight because it ties voice directly back to Chapters 5, 6, and 7. If a user asks a realtime system for account data, a calendar lookup, a support action, or an environment check, the speech stack may no longer be the slowest part. The true latency may come from retrieval, permission checks, network round-trips, or a workflow step waiting on some other service.

This is why teams that think they are building a speech product often discover they are really building an orchestration product. Low-latency interaction depends on pipeline design, caching, progressive disclosure, asynchronous tool behavior, and clean state handoff just as much as it depends on model speed.

Realtime trust is budgeted. Spend too much of that budget in the wrong layer and the interaction stops feeling intelligent.

## Voice works best when it reuses a stronger underlying system

A second correction: voice does not usually require reinventing everything. The seductive but often wasteful instinct is to treat voice as an entirely separate product stack. Build a bespoke conversational brain. Recreate all the tools. Redo the runtime. Start over from scratch because speech feels special.

In practice, a more durable pattern keeps emerging: keep the core agent, keep its tools, keep its evals, keep its workflow logic, and wrap a dedicated voice layer around it. That preserves continuity with the core spine: voice does not reject the earlier chapters but demands they were built well enough to survive a harsher interface.

Luke Harries at ElevenLabs puts the case for wrapping plainly: “I’ve already got my agent. I spent loads of time doing the evals.” The eval work is the asset to preserve, not discard, so the move is to “wrap it up into its own first-class primitive” — adding a voice engine to the agent rather than rebuilding as a voice agent. As he notes, “your chat agent actually normally does the majority of tool calling.” The voice layer’s job is to make that agent audible.

If the support colleague already has usable tools, sensible permissions, durable state, and a clear control plane, the voice layer can focus on listening, segmentation, interruption handling, and output behavior. If the underlying system is weak, voice will merely expose the weakness faster. But if the underlying system is sound, voice becomes an additional interface rather than a separate metaphysics.

This is why the best voice architecture discussions sound modular rather than mystical. Separate what must be low-latency from what can remain deliberative. Keep speech pipelines specialized. Let the core workflow engine remain the same where possible. Use streaming and partial updates at the interface, not chaos in the business logic. The pattern mirrors the whole book’s attitude toward AI systems generally: compositional systems beat monolithic magic.

## Turn-taking is a runtime problem wearing a UX costume

It is tempting to file interruption handling under experience polish. That is too shallow.

Interruption, barge-in, clarification, and resumption are runtime semantics. When a human cuts the system off, what state is preserved? Which partial output is discarded? Does a tool call continue in the background? If so, how is the result surfaced later? If the agent asked a question and the user answered indirectly, how much of the prior plan should remain binding? If two signals arrive at once — a user correction and an already-returning tool result — which one takes priority? These are execution questions, not copywriting questions.

In the support-call scenario, that might mean the agent has already begun a retrieval step when the caller reveals that the account belongs to a different region. If the runtime cannot cancel, redirect, or downgrade the old plan cleanly, the system starts answering with stale assumptions. The human hears this as conversational failure, but the root problem is execution semantics.

One ceiling here is architectural rather than a matter of orchestration speed: whether the system can listen and speak at the same time. Most production speech-to-speech systems are half-duplex — as Zeghidour says, “The model is either listening or it’s speaking” — so they cannot process a user’s back-channel while their own output is playing. Natural conversation is shot through with overlap; in Japanese, where back-channeling is a politeness norm, he notes it runs “up to 20% of the time.” The honest response is to match the use case to the constraint, not patch it with longer silence thresholds. Structured, turn-based flows survive half-duplex cleanly; open-ended companion chat does not, because the user will interject and the model will read every interjection as a barge-in.

A spoken system has to do state management in public. It needs a runtime that can pause, redirect, summarize, and resume without forcing the user to reconstruct everything manually. It also needs security boundaries that do not disappear just because the interface became conversational. A friendly voice does not make overscoped authority less dangerous.

In fact, the opposite is often true. Because it feels human, voice manufactures false confidence: users reveal more, approve more casually, and assume the system understood more precisely than it actually did. That is the trap — the warmer the interface, the cheaper approval becomes exactly where approval should be expensive. So the rule inverts the intuition. The more consequential the action, the more deliberate the confirmation has to be, precisely because the medium is coaxing everyone to skip it.

This is where the human control plane comes into the room. In chat, the control plane may live in a dashboard, a trace view, or a review queue. In voice, part of it must also live inside the interaction itself: clear acknowledgments, visible escalation, graceful fallback, repeatable confirmations, and a way to hand off when uncertainty is too high. A realtime agent cannot rely on the user reading the logs later to discover what went wrong.

## Realtime pushes model and inference architecture in specific directions

Voice is changing the model stack itself, not only the front end. The pressure for lower first-audio latency, more natural streaming, and tighter multimodal coordination is pushing systems toward architectures optimized for interaction, not merely offline quality. Speech tokenization, streaming generation, lower-latency synthesis, and specialized serving strategies matter because the product requirement is not just to produce good output but to produce good output now. Samuel Humeau of Mistral notes speech labs have "converged to some common patterns," building audio generation on the same autoregressive decoder backbone that powers language models.

This is why realtime cannot be treated as a pure UX question. Realtime experience is partly an inference architecture story. Model families, serving strategies, batching decisions, transport layers, and hardware choices all leak into the user experience. The system does not get to hide its internals when every extra delay becomes audible.

Once AI systems have to participate in live loops, model design and systems design start bending toward the requirements of interaction. Realtime is a forcing function on the whole stack, not just another benchmark.

## Voice makes the human control plane immediate

In many AI systems, the human control plane sits slightly above the action. A reviewer inspects a trace. A manager checks a queue. An expert signs off on a draft after the system has done most of its work.

Voice compresses that distance. The human is often present during execution. They can hear the system hesitate, watch it recover, and decide in real time whether to trust it. That changes how control has to be surfaced. The system needs visible acknowledgment when it is uncertain. It needs graceful ways to clarify rather than bluff. It needs escalation paths that do not feel like collapse. And it needs a social understanding of when to stop pretending and hand off.

This is where the High-Stakes Colleague returns in its most exposed form. A high-stakes voice system is not just a more personable chatbot but a colleague operating while the human is still in the room. That means both capability and humility have to be legible. The system should know when to keep going, when to ask, when to confirm, and when to defer.

A support call is the clearest example, but the principle is broader. Any realtime AI system — a meeting assistant, a voice-driven enterprise copilot, a reactive research interface, even some forms of robot mediation — has to make supervision cheap enough that the human can stay oriented without becoming a full-time operator. That is the same control-plane argument as Chapter 6, now under stronger time pressure.

## Embodied edges make the same lesson even harsher

Robotics and other embodied systems appear here only as confirmation — a harsher environment where the same architectural failures show up faster, with less room to hide.

The more tightly an AI system couples to the world, the less room there is for hidden confusion. Delay becomes visible. State mismatch becomes dangerous. Recovery behavior matters more than eloquent explanation. A model that can improvise impressively in a sandbox may still be unusable when timing, environment state, and safety constraints are all moving at once.

Embodied systems are useful here even though the book does not become a robotics book. They prove by extreme example what voice already suggests: autonomy is a property not of the model alone but of the whole scaffolding around it — sensing, memory, runtime, interfaces, control boundaries, and human oversight. Text lets the field pretend otherwise for longer than it should.

## Voice is where trustworthy AI has to perform in public

Latency budgets, half-duplex ceilings, and a control plane that has to work in public are what make the soft framing untenable. Voice is where trustworthy AI has to perform, under interruption, under latency pressure, and under immediate human judgment — where architecture stops being abstract and becomes audible behavior.

Dependable AI is not merely a property of good answers.
It is a property of good loops.
And realtime interaction is where that truth becomes impossible to ignore.

## Practical checklist

- **Spend your latency budget on first audio, not on silence.** A quick spoken acknowledgment followed by a slower answer beats a long silent pause followed by a polished one — streaming partial understanding rescues a system whose deeper reasoning takes longer.
- **Match the interaction to the half-duplex constraint, not around it.** Structured, turn-based flows survive a system that can't listen and speak at once. Open-ended companion chat doesn't — the model will read every interjection as a barge-in.
- **Invert your confirmation cost on purpose.** The warmer the interface, the cheaper approval feels to the user — so make confirmation more deliberate exactly where the action is more consequential, not less.
- **Wrap voice around your strongest existing agent; don't rebuild one for it.** Keep its tools, its evals, its workflow logic. If the underlying system is weak, voice will expose that faster, not fix it.
- **Give the system a way to say "I'm not sure" out loud.** Visible acknowledgment, graceful clarification, and a real escalation path matter more in voice than in chat, because the human is in the room watching it hesitate in real time.

---

_From "From Copilot to Colleague: How AI Engineering Turns Models into Dependable Systems" by Timur Isachenko & Daniel Mohanrao · https://fromcopilottocolleague.com/read/08-realtime_
