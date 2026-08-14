# Research Pass — 2026-08-05 — New patterns in corpus #795–983

- **Target:** what the newest 189 corpus videos contain that the manuscript and Claims Ledger do not yet cover
- **Pass type:** corpus synthesis / ledger gap analysis
- **Inputs used:** `01_Videos/` titles for #795–983 (clean signal — 748 corpus-wide summaries are still ingest boilerplate, so summary text was discarded as noise), `claims/Claims Ledger.md` term coverage, `evidence/Shared Artifacts.md`
- **Method:** term-frequency lift of new-corpus titles vs. the pre-#795 corpus, filtered to terms with ≤3 mentions in the ledger; clusters then read back against the actual talk list
- **Outputs changed:** this pass (no manuscript or ledger edits — findings are candidates, not claims)

## Headline finding

The corpus grew 794 → 983 while the ledger stayed anchored on the older material.
Six clusters appear in the new videos. **Two of them are structural** — they do not
extend an existing chapter, they name a layer the book's architecture currently
lacks.

---

## 1. Forward Deployed Engineering — an entire track, zero ledger coverage

**Talks (9):** #857 Cursor (Pauline Brunet) · #944 Anthropic, ex-Palantir (Kevin Bai,
"FDE 101") · #945 Kepler · #946 Decagon · #947 Sierra ("the dirty secret of FDE") ·
#948 Ramp · #949 Cognition · #950 Varick (tooling for FDEs) · #951 Factory

**Ledger mentions of "forward deployed": 0.** This is the single largest uncovered
cluster in the corpus — nine talks, consecutive conference slots, from the exact
companies the book already cites elsewhere (Anthropic, Cursor, Cognition, Sierra).

**Why it is structural, not incremental:** FDE is an answer to a question Chapter 9
raises but does not resolve — *who* does the judgment work when generation is cheap.
The pattern says: embed engineers inside the customer's context, because the scarce
input is problem understanding, not code. That is Chapter 9's "judgment layer owner"
(James Lowe's AI-PM argument) arriving as a staffing model rather than a title. The
Sierra talk ("dirty secret") is explicitly a counterpoint talk — likely the caveat
that keeps this from being a puff cluster.

**Recommended disposition:** candidate ledger claim + Chapter 9 material. Highest
priority of anything in this pass.

## 2. Environments as an engineering layer

**Talks (7):** #851 modern post-training (Prime Intellect) · #967 RL *without*
verifiable rewards (Prime Intellect) · #970 verifiable environments for biology
(LatchBio) · #974 data + environment curation (Bespoke Labs) · #975 learning on the
job / future of post-training (Applied Compute) · #977 what's next after RLHF ·
#978 rethinking environments for long-horizon work (Theta)

The book's scaffolding stack is harnesses → evals → context → runtimes → security.
**"Environment" is not one of its layers**, yet seven talks treat environment design
and curation as the engineering surface that decides agent capability. Note the
internal tension worth mining: #970 argues *verifiable* environments while #967
argues RL *without* verifiable rewards — a real disagreement, not a consensus.

**Term collision — resolve before drafting.** The ledger already uses "environment"
nine times, but always in the *runtime* sense: isolated ephemeral sandboxes per
agent, production environments, "how legible the environment is" to a coding agent.
This cluster uses it in the *training* sense: RL environments you curate to teach a
model a task. Same word, two referents. The book's own style rule is one meaning per
term, so either the new sense gets a distinct name (training environments / RL
environments) or it stays out. Do not let the collision in silently.

**Recommended disposition:** evaluate whether this is a sixth layer or a facet of
Chapter 4 (evals) — the honest answer may be that post-training moving from research
into product engineering is outside this book's scope. Decide deliberately rather
than by omission.

## 3. Evals evolving: judge → agent-judge → simulation

**Talks (10):** #930 "from LLM-as-a-judge to agent-as-a-judge" (Arize) · #931
self-improving agent anatomy (Arize) · #932 evals+prompts shaping behavior (YouTube)
· #933 closed-loop evals for a multimodal agent · #934 evaling video slop
(Character.AI) · #935 agent traces → agent simulations (Snorkel) · #938 evals-driven
development · #941 contamination-resistant coding benchmark (DeepSWE) · #968
benchmarks good/bad/ugly · #980 "when will the benchmaxxing plague end"

Chapter 4 already argues evals-as-control-system and panel judging. What is new:
**agent-as-judge** (the judge itself is agentic), **simulation** replacing static
sets, and **contamination/benchmaxxing** as a named failure mode. This extends
Chapter 4 rather than displacing it — the chapter's "mine failures, don't author
puzzles" advice survives, but its judge taxonomy is now one generation behind.

**Recommended disposition:** Chapter 4 refresh candidates; strongest single addition
is contamination-resistance, which the chapter does not address at all.

## 4. "Slop" becomes a named engineering problem

**Talks (4):** #059 swyx "no more slop" · #934 evaling video slop · #965 "fighting
slop with slop" (Boundary) · #969 "ending AI slop" (Taste Labs)

Chapter 2 ("Taste Still Matters When Code Gets Cheap") argues this thesis but
predates the vocabulary consolidating. A company literally named Taste Labs is a
useful marker that the book's Chapter 2 framing was early rather than wrong.

**Recommended disposition:** Chapter 2 corroboration; low effort, good payoff.

## 5. Long-horizon work as its own problem class

**Talks (4):** #871 Claude for long-horizon tasks (Anthropic) · #927 Vending-Bench
long-horizon agent evals (Andon Labs) · #973 scaling to long horizons · #978
rethinking environments for long-horizon work

Chapter 6 covers durable execution and state; long-horizon is the *evaluation and
capability* framing of the same pressure. Vending-Bench is a concrete named benchmark
the book could cite.

## 6. Skills as the unit of composition; MCP maturing

**Talks:** #954 "skills are the new features — skill-centric harness" (FactSet) ·
#959 vetting 2000 AI skills before developers see them (Nubank) · #981 async MCP
tasks (Cornelia Davis, Temporal) · #982 MCP apps

The ledger already carries Anthropic's "don't build agents, build skills." New here
is skills at **enterprise supply-chain scale** (#959 — vetting 2000 skills is a
governance problem, straight Chapter 9 material) and MCP acquiring async/task
semantics (#981), which connects directly to Chapter 6's durable-execution argument.

---

## New materials (from `evidence/Shared Artifacts.md`, videos ≥795)

31 artifacts across 28 talks. The ones worth a look:

| Artifact | Source | Why |
|---|---|---|
| `character-ai/judgejudy` | #934 | agent-as-judge tooling, cluster 3 |
| `harbor-framework/harbor` | #929 | eval harness (already referenced by Cline's Ara Khan in the ledger) |
| `getzep/graphiti` | #919 | temporal memory graphs |
| `humanlayer/12-factor-agents` | #923 | second citation — the only cross-talk repeat repo in the new wave |
| `google-ai-edge/gallery` | #936 | on-device/edge agents |
| `steveyegge/beads` | #902 | — |
| Agent Simulations talk deck | #935 | primary source for cluster 3 |
| *GraphRAG: The Definitive Guide* (O'Reilly) | #911 | published book overlapping the RAG chapters |

## Unresolved questions

1. Does FDE earn a manuscript section, or is it a 2026-specific staffing fashion?
   The Sierra "dirty secret" talk is the place to test that.
2. Is "environments" a missing sixth layer of the scaffolding stack, or out of scope?
3. Chapter 4's judge taxonomy is a generation behind — refresh, or footnote?

## Method caveat

Term-lift on titles only. Summaries were unusable because 748 of 983 notes still
carry ingest boilerplate ("shares a practical take on…"), which dominated the first
run and produced garbage. Enriching the notes behind these six clusters would make a
second, sharper pass possible — that is the natural next batch for
`programs/note_enrichment_pass.md`, now that its ledger-cited scope is complete.
