# Second Book — Chapter Packets

These packets turn the two flat candidate shortlists (`Second Book - Part I Candidates.md`, `Second Book - Part II Candidates.md`) into chapter-sized working files. They are the Phase 0 output of `programs/second_book_drafting_pass.md`. Phase 1 drafts prose from them into `public/drafting-2/`.

## The shared thesis (from the design spec)

Book 1 (*From Copilot to Colleague*) assumes the model as a given — it is about *using* models. Book 2 is about everywhere that assumption breaks:

- **Part I — The Model Layer:** the assumption breaks because you are building the model itself (training, inference, frontier labs, models for non-text modalities).
- **Part II — The Long Tail:** the assumption breaks because your domain is strange enough that the generic agent playbook does not fit (robotics, regulated professions, creative work).

## Packet structure

Each chapter file contains:
- chapter role in the book (what it argues, how it connects to the shared thesis)
- supporting source cluster (wikilinks to `01_Videos/` notes, pulled only from the two shortlists)
- strongest source-backed observations worth promoting to claims (a working list; promotion to `claims-2/Claims Ledger.md` happens in Phase 1)
- useful quotes / excerpts to revisit when drafting (verbatim, with video id)
- open questions requiring editorial judgment

Quotes are drawn only from each note's `## Transcript excerpt` block (actual speech), never from the `summary:` frontmatter (which is often video-description marketing copy). The excerpts carry no timestamps, so quotes cite `(#id)` only — Source Anchors with timestamps are a later, separate pass, exactly as in book 1.

## Reproducibility note

Clusters and quotes were synthesized from the current processed corpus:
- the two candidate shortlists in `05_Book_Ideas/`
- `99_Meta/second-book-classification.json` (machine-readable buckets)
- source-note summaries, themes, and transcript excerpts in `01_Videos/`
- `docs/superpowers/specs/2026-07-27-second-book-design.md` (thesis and rough structure)

These are drafting packets, not final prose.

---

## How the real breakdown diverged from the design spec

The design spec (2026-07-27) marked its chapter sketch as a *starting hypothesis pending this classification pass*. The corpus clustered differently in four ways worth recording.

### 1. Part I is 4 chapters, but the 4th is not the one the spec guessed

The spec's Part I sketch was: training/RL · quantization & inference economics · frontier-model-building · **possibly a 4th on model-level evals**. Training, inference, and frontier all held up as dense clusters. The candidate "model-level evals" 4th chapter did **not** — only ~5-7 talks are genuinely about evaluating models themselves (253, 506, 558, 137, 397), too thin to carry a chapter. Those talks are distributed into the training and frontier packets instead.

What the corpus *did* support as a 4th chapter — and the spec did not anticipate — is a dense cluster (~11 talks) on **building foundation models for non-text modalities**: speech/TTS, generative media, recommendation, driving, and embodiment. That became **Chapter 4 — Beyond Text**. It serves the Part I thesis directly ("you're building the model itself") for every modality that is not a chatbot.

### 2. The inference chapter is large and carries two movements

**Chapter 2 — Inference Economics** draws on ~38 candidates, roughly double any other chapter. The density is real, not padding, but it splits cleanly into two movements — **serving performance** (quantization, kernels, serving engines, on-device) and **the compute substrate** (GPUs, data centers, economics, geopolitics). The packet labels both so Phase 1 drafts an argument, not a 38-video survey. Whether it should become two chapters is the packet's top open question.

### 3. Part II is 3 chapters, not the spec's "3-4"

Robotics (~7), regulated domains (~12), and creative/education/games (~10) are all robust. Notably, the spec worried "creative & education" might be thin — it is not; games alone (677, 822, 827, 918, 588) nearly carry it. The spec's "possible 4th synthesis chapter" was tested and **not** built: the leftover talks that would fill it (095, 144, 862, 565) share no argument beyond "another domain," so forcing them into a chapter would have produced a leftovers bin. They are logged below as seeds for the book's **closing synthesis chapter** instead.

### 4. The 129 Part I candidates were raw, not curated

The design spec expected Part I to be "hand-curated down to the strongest 40-60 that are actually about building/training/serving models." That curation had not happened — the 129 was the raw `Models & Inference` tag dump. This pass performed it: **89 of 124 Part I candidates** and **29 of 36 Part II candidates** routed into chapters. The remainder are genuinely off-thesis (agent-application, career, intro-course, or vendor talks the classifier caught on a keyword) and are listed as "considered, not routed" below rather than forced into a chapter.

---

## Chapter list

**Part I — The Model Layer**
- `01` Training and the Turn to RL — 22 sources
- `02` Inference Economics — 38 sources (two movements: serving performance · compute substrate)
- `03` Building Frontier Models — 19 sources
- `04` Beyond Text: Models for Speech, Media, Perception, and Action — 11 sources

**Part II — The Long Tail**
- `05` Robotics and the Physical World — 7 sources
- `06` Regulated and High-Stakes Domains — 12 sources
- `07` Creative, Education, and Games — 10 sources

**Framing (deferred — no source cluster of their own)**
- An opening intro chapter and a closing synthesis chapter are part of the book's shape (design spec Q3) but are framing, not source clusters, so they get no packet here. Phase 1 should not hunt for a packet `00` or `08`. Closing-synthesis seed material is logged below.

Total: 118 routed sources across 7 body chapters (89 Part I + 29 Part II).

---

## Resolution of the 6 `part1_part2_keyword_overlap` videos

Each was read closely (transcript excerpt + summary) and assigned to the single chapter it actually argues for, rather than letting it default to Part I because the classifier saw the `Models & Inference` tag first.

| # | Talk | Assigned to | Why |
|---|---|---|---|
| 025 | Running LLMs locally: DGX Spark | **Ch 2 (Inference)** | A data-backed local-serving trade-offs talk; the robotics keyword was spurious. Stays in Part I. |
| 110 | Tesla Optimus: High-Performance Robotics Systems | **Ch 5 (Robotics)** | About the robot's controller-to-wire software stack ("the issue will look like it's the policy but it's actually the software system") — a physical-robotics systems talk, not a model-building one. |
| 175 | Robotics: why now? (Physical Intelligence) | **Ch 5 (Robotics)** | A "why robotics is the frontier now" vision talk; it defines the domain, so it anchors the robotics chapter rather than sitting among Part I's model-training talks. |
| 229 | Robots as professional Chefs (CloudChef) | **Ch 5 (Robotics)** | A physical-robot-learning-a-trade case study; squarely a robotics-domain talk. |
| 473 | Training Albatross: An Expert Finance LLM | **Ch 6 (Regulated Domains)** | The deliberate non-default call. It argues *finance's reliability demands drive a domain-trained model* — a Part II "the domain breaks the playbook" argument — not a general training-technique talk. It pairs with the finance sub-cluster (406, 423). |
| 588 | Using AI to Build an Infinite Game | **Ch 7 (Creative)** | A generative-game-content talk ("a game with 100% AI generated content"); a creative-domain case study, not a model-layer talk. |

Five of six move to Part II; only 025 stays in Part I.

---

## Considered, not routed

These candidates were reviewed and deliberately left out of every chapter cluster. Routing them would have meant forcing off-thesis material to hit a chapter count — the one thing the brief forbids.

### Part I (35 of 124 not routed)

- **Book-1 territory — agent / RAG / prompt / app-building talks** (the classifier tagged these `Models & Inference` on a keyword; they are about *using* models): #090 Defying Gravity (agentic IDE), #166 AI Co-Scientist, #191 Building Applications with AI Agents, #202 Building Agents: the Hard Parts, #328 Heroku Managed Inference & Agents, #375 How Agents Broke App-Level Infra, #384 Browser Agents, #387 The RAG Stack After 37 Fails, #430 How Deep Research Works, #438 AI Agents Meet TDD, #450 Layered CoT, #452 The Model Isn't Wrong, You're Bad at Prompting, #462 The LLM Triangle, #463 Lessons Building GenAI Apps, #500 Azure Multi-Agent Innovations, #559 Pydantic Is All You Need, #573 Codeium Retrieval, #620 Principles for Prompt Engineering, #787 Cache-Augmented Generation.
- **Career & field-state commentary** (worth citing in the intro's framing, not a model-layer chapter): #417 AI Engineers: The Next Generation, #431 Why Agent Engineering, #519 Hiring & Building an AI Eng Team, #536 AI Engineering Without Borders, #579 From Software Developer to AI Engineer, #587 How to Become an AI Engineer, #617 Building AI For All.
- **Intro courses:** #601 AI Engineering 201, #605 Workshop: AI Engineering 201 — Inference.
- **Security-track / ops:** #148 Defend Your Sites from AI Bots, #896 Security Track Intro.
- **HCI / design:** #222 The Bitter Layout / model picker.
- **Vendor product overview or thin demo:** #392 Cognitive Shield (fraud demo), #498 Azure AI Model Catalog, #595 120k Players in a Week (viral-app growth story).

### Part II (7 of 36 not routed)

- **Closing-synthesis seeds — cross-domain transfer** (their argument is "what one domain teaches another," which is the closing chapter's job): #095 Agents Are Robots Too: What Self-Driving Taught Me, #144 From Self-Driving to Autonomous Voice Agents.
- **Closing-synthesis seeds — single-vertical outliers** (each strong, but no cluster to join; candidates for the closing chapter or a future science chapter): #862 From Tokens to Cells: Foundation Models for Single-Cell Biology, #565 Disrupting the $15T Construction Industry with Autonomous Agents.
- **Book-1 / vendor-tutorial territory:** #371 The Robots Are Coming for Your Job (AI writing API docs at Twilio), #496 RAG-Based Retail Copilot with Azure (vendor tutorial), #884 Medic for Apache Spark (data-engineering agent).
