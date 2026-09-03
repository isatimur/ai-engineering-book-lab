# Chapter 7 — Creative, Education, and Games

The long tail ends in the domains that look least like engineering: a game, a classroom, a song. The generic playbook breaks here too, but not the way it broke in the last chapter. The constraint is no longer stakes. It is subjectivity, pedagogy, and play. There is no ground-truth label for a fun level, a good lesson, or a moving piece of music, and often no way to check the answer at all. A wrong output does not cost a patient or a lawsuit; it costs the experience, which is the whole product.

That would seem to be the model's home turf — the place where fluent, plausible, creative output is exactly what you want. It is not. Across chess, mobile games, tutoring, and music, the practitioners who shipped something real converge on the same discipline: keep the model in a narrow lane — translating, generating, or coaching — and let a structured system around it hold the ground truth. The weight of the evidence sits with games, so this chapter leads there.

## Games

### The model explains; the engine computes

The cleanest statement of the pattern comes from chess. Anant Dole and Asbjørn Steinskog, engineers at Play Magnus — Magnus Carlsen's company — walked through the pipeline behind their production chess coach, the game-review feature that tells a player why a move was good or bad. Their talk is called "how we built our AI chess coach that now you can use and is in production", and the design is a study in restraint.

The system never lets the model touch the chess. Stockfish plays the whole game and produces the ground-truth best move and evaluation for every position. A research network from the University of Toronto predicts what a human at a given rating would actually play, so the coach can say a move is brilliant because only a small fraction of players at your level would find it. Hand-built detectors extract the tactical structure — forks, pins, threats, defensive resources — into a large structured package. Only then does an LLM enter, and only to turn that package into English. It is explicitly forbidden from reasoning about the position on its own. The reason is blunt: LLMs hallucinate moves and cannot calculate, but they are excellent at explaining once the analysis is handed to them. The model is a translator, and everything that has to be *true* is computed before it speaks. That is the chapter's whole thesis in one architecture — the structured system owns the truth, and the model owns the words.

### The puzzles stay human, and the agents run local

The New York Times games team draws the same line from the other side. Shafik Quoraishee and Joanne Song, presenting local agentic patterns for accessible mobile games, open with a disclaimer they clearly mean: "Our puzzles are made by people. They're not made by AI." They repeat it plainly — "There's no AI in the games themselves". The craft that makes a puzzle worth solving stays human-authored; the AI lives at the edges, in accessibility and responsiveness, not in the ground truth of the game. Their argument for pushing agentic behavior on-device is the same one that ran through the inference chapter — local execution buys low latency and reach — applied to play. It is the earlier NYT case study, Quoraishee's look at the interplay between human intuition and artificial intelligence in puzzle-solving in Connections, carried to its conclusion: the model can help around the puzzle, but the puzzle is human.

### Generating the content is easy; making it good is not

The demos make building a game with AI look solved. The practitioners who tried it say the opposite. Jeff Schomay built a small exploration game, *Infinite Game*, and reports, without hedging, "I made a game with 100% AI generated content" — and the interesting part of his talk is not that the generation worked but where it strained. A game needs a flood of cheap, disposable ideas while you prototype and near-infinite depth once you play, and generating that volume is now the trivial part; making the generated content actually good is the problem that remains. Danielle An and David Hoe of Meta put the caution in their title — "Think You Can Build a Game with AI? Think Again!" The difficulty in game-making with AI has moved, but it has not disappeared. Generation is cheap; judgment about what is worth generating is not.

### The pipeline can run itself, and the bar is a human trainer

Autonomy is arriving anyway. Stephan Steinfurt of TNG built a chess YouTube channel run entirely by AI — a creative pipeline that generates and publishes with no human in the loop. What makes the case sharp is the standard he set it against. A major German newspaper, surveying new approaches to combining AI with chess, had written that "it could easily take another 5 years until AI explains chess as well as a human trainer." Steinfurt quotes that line as the claim he set out to challenge, not as his own verdict. The measure the field reaches for is not benchmark accuracy but a person: the human trainer who can explain the game well. It is worth setting beside the Play Magnus loop, which improves its own commentary automatically — a user reports bad output, an agent rewrites a detector and regenerates the explanation — yet still stops to ask an engineer to approve the change from their phone. Full autonomy is technically in reach; the human is kept at the one gate where taste is the product.

## Education

### The constraint is pedagogy, not capability

Education is where it is most tempting to treat a better model as the answer, and the practitioners are the ones resisting it. Shawn Jansepar, who leads AI and learning at Khan Academy, frames the Khanmigo work not as a model problem but as an organizational one — how he "transformed Khan Academy into an AI-first organization". Scaling a tutor turns out to be about roadmap, product, and learning outcomes across a whole institution, not about which model sits underneath. The binding constraint is pedagogy: what actually helps a student learn, which is a design question no capability jump answers on its own.

Stefania Druga makes the urgency concrete from the multimodal side. She notes that 70% of generative AI users are Generation Z, citing a recent Salesforce study, and argues "education needs a wakeup call". Her interest is in combining sound, image, and video into learning activities that build critical and creative thinking — the model as raw material for a designed experience, not as the teacher. In both cases the model is capable enough already; the unsolved work is turning capability into learning, and that is pedagogy's problem, not the lab's.

## Creative

### Making music is an orchestration problem, not a model

Creative production lands on the same shape the media chapter described. Thor Schaeff of Google DeepMind walked through Gemini's audio stack as a chain of specialized parts, not a single generator. One model reads a recording for speaker, emotion, and language in a single structured call; a small set of base voices is steered by a written "director's note"; a native speech-to-speech model handles live conversation without a cascaded transcribe-then-speak pipeline; and a separate music model, Lyra, is invoked as a callable tool by the conversational model to compose a song on request. The product is the composition of these pieces under structured control. Phlo Young's workshop carries the framing in its title — "AI Music Generation, From Prompt to Production" — the same prompt-to-production arc, treated as a pipeline to be assembled rather than a single button to press. This is the generative-media argument from the model chapter, seen from the domain side: in creative work the craft is not one great model but several specialized ones, composed well.

## One lane, many domains

Three subjective domains, one discipline. The chess coach lets an engine calculate and uses the model only to narrate. The Times keeps its puzzles human and sends the AI to the edges. The infinite-game builders find that generation is cheap and judgment is not. Khan Academy and the multimodal educators treat the model as capable material for a designed experience whose real constraint is pedagogy. The music stack composes specialized models under control rather than trusting one to do everything. In every case the model is a component in a system, never the system — kept in the lane it is good at, while something structured, and often someone human, holds the ground the experience stands on.

That is the counterintuitive result of the long tail. Where correctness is fuzzy and the output is the whole point, the answer is not to give the model more room. It is to draw its lane more precisely, and to be clear about what only a person, an engine, or a designer can own. The domains that look least like engineering turn out to demand the most of it.
