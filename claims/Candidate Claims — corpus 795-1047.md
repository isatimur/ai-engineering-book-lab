# Candidate Claims — corpus #795–1047

Draft ledger entries from `research_passes/2026-08-05-new-patterns-corpus-795-983.md`.
**Not part of the canonical ledger.** These are anchored and verified but await a
taste call on the three open questions in that pass (does FDE earn a section; is
"environments" a sixth layer or out of scope; refresh or footnote Chapter 4's judge
taxonomy). Promote by moving an entry into `claims/Claims Ledger.md`; discard by
deleting it here.

Every anchor below was produced by `99_Meta/scripts/anchor/cli.py` against the
committed VTT transcripts and returned `confidence: high`.

---

## C1) Practitioners disagree on whether forward-deployed engineering is a product function or a go-to-market function

- **Why it matters:** Chapter 9 argues judgment becomes the scarce resource and that
  someone must own it, but leaves the staffing question open. FDE is the corpus's
  answer arriving as an org pattern — and the people running it do not agree on what
  it is. The disagreement is the finding, not a gap to resolve.
- **Support level:** moderate (two direct, opposed primary sources; a nine-talk cluster
  behind them, but no outcome data on either model)
- **Supporting sources:**
  - [[945-1OMHGsUZiqA-how-forward-deployed-engineering-is-done-at-kepler-vinoo-ganesh|#945 — Vinoo Ganesh, Kepler]] — argues the role belongs to product, explicitly not sales.
    - **Anchor:** `1OMHGsUZiqA` 00:04:46.880 → 00:04:47.840 · confidence: high
    - **Quote:** "not the go to market function."
  - [[945-1OMHGsUZiqA-how-forward-deployed-engineering-is-done-at-kepler-vinoo-ganesh|#945 — Vinoo Ganesh, Kepler]] — notes Palantir's FDE *became* GTM later, framing the GTM reading as drift from the original.
    - **Anchor:** `1OMHGsUZiqA` 00:00:26.880 → 00:00:28.240 · confidence: high
    - **Quote:** "became a go-to market strategy"
  - [[949-RVxym6mmIns-how-forward-deployed-engineering-is-done-at-cognition-jia-wu|#949 — Jia Wu, Cognition]] — takes the opposite position outright.
    - **Anchor:** `RVxym6mmIns` 00:16:53.640 → 00:16:54.080 · confidence: high
    - **Quote:** "everybody is go-to-market"
  - [[949-RVxym6mmIns-how-forward-deployed-engineering-is-done-at-cognition-jia-wu|#949 — Jia Wu, Cognition]] — gives the reasoning behind that stance.
    - **Anchor:** `RVxym6mmIns` 00:16:55.680 → 00:16:57.520 · confidence: high
    - **Quote:** "make the customer successful at all costs."
- **Caveats / counterpoints:** Both are self-reports from companies selling the model;
  neither presents outcome data. A third framing exists — Ramp (#948) treats FDE as
  scoping discipline plus automating the FDE pipeline itself — so "product vs. GTM"
  may be a false binary. Sierra's "dirty secret" talk (#947) is the cluster's own
  skeptical entry and should be read before this claim ships.
- **Candidate chapters:** 9, possibly 1
- **Reusable phrasing:** The people building the role cannot agree whether the
  forward-deployed engineer is a product function or a sales function — which tells
  you the pattern is real and its definition is not yet settled.

## C2) Coding benchmarks are being gamed by retrieval of the answer, at rates that differ sharply by model family

- **Why it matters:** Chapter 4 argues evals are the control system and warns that a
  comfortably-passing benchmark is a warning sign. This supplies the mechanism —
  agents recovering golden patches from git history — and, unusually, a measured rate.
- **Support level:** moderate (single primary source, but a specific quantified
  measurement across four model families)
- **Supporting sources:**
  - [[941-Yk87oUPVaxU-deepswe-a-contamination-resistant-coding-benchmark-james-shi-datacurve|#941 — James Shi, Datacurve]] — measured how often models fish `git log` for the golden patch on SWE-bench Pro.
    - **Anchor:** `Yk87oUPVaxU` 00:06:00.080 → 00:06:02.160 · confidence: high
    - **Quote:** "25% and 18% of the time"
    - Context: Opus 4.6 and 4.7 respectively, against roughly 1% for Gemini models and zero observed instances for GPT models.
- **Caveats / counterpoints:** One team's measurement on one benchmark; the model
  versions are a moving target. Surge AI (#980) makes a stronger, contested
  memorization claim about SWE-Bench Verified that is *not* anchored here and should
  not be cited without independent verification.
- **Candidate chapters:** 4
- **Reusable phrasing:** When a quarter of an agent's attempts reach the answer by
  reading the commit history, the benchmark is measuring retrieval, not repair.

## C3) Fixed-rubric LLM-as-judge is reaching its limit — four independent teams moved past it

- **Why it matters:** Chapter 4's judge taxonomy (panel of diverse models, median
  voting) is one generation behind what the corpus now shows. This is convergent
  evidence, which is stronger than any single talk.
- **Support level:** moderate (three anchored primary sources reaching the same
  limitation independently; the fourth is thematically aligned but has no quote
  specific enough to anchor)
- **Supporting sources:**
  - [[930-q2JrUKBMf0w-the-future-of-evals-from-llm-as-a-judge-to-agent-as-a-judge-aparna-dhinakaran-arize-ai|#930 — Aparna Dhinakaran, Arize]] — names the structural limit and proposes agent-as-judge (adaptive, dynamic) as the successor.
    - **Anchor:** `q2JrUKBMf0w` 00:04:12.040 → 00:04:13.880 · confidence: high
    - **Quote:** "LLM as a judge just gives you a fixed rubric"
  - [[934-b_PmGocP4rc-evaling-video-slop-maor-bril-character-ai|#934 — Maor Bril, Character.AI]] — their trained video judge optimized for overall impression instead of the rubric's stated axes: the failure mode observed from the inside.
    - **Anchor:** `b_PmGocP4rc` 00:11:26.640 → 00:11:28.400 · confidence: high
    - **Quote:** "scored the vibe as opposed to the"
  - [[980--npY6XjM8CQ-when-will-the-benchmaxxing-plague-end-nick-heiner-surge-ai|#980 — Nick Heiner, Surge AI]] — same pressure from the benchmark side.
    - **Anchor:** `-npY6XjM8CQ` 00:05:54.720 → 00:05:56.160 · confidence: high
    - **Quote:** "Reward hacking is also a big problem."
  - [[968-jWq-aZIU0kM-benchmarks-the-good-the-bad-and-the-ugly-ali-khial-g2i|#968 — Ali Khial, G2i]] — **listed without an anchor on purpose.** The talk covers verifiers and rubrics, but its wording is a survey of the landscape rather than a claim about judge limits; anchoring it would overstate what the speaker said. Cite as background, not support.
- **Caveats / counterpoints:** Four teams noticing a limitation is not four teams
  agreeing on the replacement — agent-as-judge, learned judges, and better verifiers
  are different fixes. Do not compress them into one prescription.
- **Candidate chapters:** 4
- **Reusable phrasing:** Four teams hit the same wall from four directions: a judge
  with a fixed rubric grades what it was told to look for, not what went wrong.

---

## C4) Prompt caching inverted the economics of context compaction — full history can beat summarizing on cost *and* quality

- **Why it matters:** Chapter 5 argues good context architecture is "knowing what
  to keep live, what to summarize, what to index, and what to leave out," and frames
  that restraint as design rather than weakness. This does not refute the chapter's
  principle, but it **complicates its economics**: the assumption that summarizing
  saves money stopped holding once cache discounts arrived, because compaction
  invalidates the cache. A chapter that recommends compaction without naming the
  caching interaction is giving advice one pricing change out of date.
- **Support level:** moderate-to-strong (two independent teams reaching the same
  conclusion from different directions — a costed compaction experiment and a
  memory-harness ablation; the first reports spending roughly $500-600 on eval runs)
- **Supporting sources:**
  - [[1019-WP3hjUXd918-context-engineering-in-2026-louis-fran-ois-bouchard-omar-solano-samridhi-vaid-towards-ai|#1019 — Bouchard, Solano & Vaid, Towards AI]] — measured full history against compaction techniques on cost, latency and recall.
    - **Anchor:** `WP3hjUXd918` 00:45:39.920 → 00:45:41.359 · confidence: high
    - **Quote:** "here we don't touch the context"
  - [[1019-WP3hjUXd918-context-engineering-in-2026-louis-fran-ois-bouchard-omar-solano-samridhi-vaid-towards-ai|#1019 — Bouchard, Solano & Vaid, Towards AI]] — the compaction arm's quality cost.
    - **Anchor:** `WP3hjUXd918` 00:45:31.680 → 00:45:33.680 · confidence: high
    - **Quote:** "quality degraded to 38%."
  - [[1005-R3-anFK1YM8-memory-harnesses-for-long-running-research-agents-stefania-druga-sakana-ai|#1005 — Stefania Druga, Sakana AI]] — independent convergent result from the memory side: added retrieval machinery cost more and bought nothing while the task still fit the window.
    - **Anchor:** `R3-anFK1YM8` 00:06:33.040 → 00:06:37.600 · confidence: high
    - **Quote:** "when your task fits in context, the harness doesn't add much."
- **Caveats / counterpoints:** The result is contingent on provider pricing — they
  cite a cache discount on the order of 50x on one model versus another — so it is a
  statement about 2026 economics, not about information theory. Context windows have
  hard limits regardless of price, so "never compact" cannot generalize to
  arbitrarily long sessions. Verify the current discount before citing the ratio.
- **Candidate chapters:** 5 (complicates), 6
- **Reusable phrasing:** Compaction used to be the obvious economy. Then caching made
  the un-touched context the cheap one, and the summarizer became the thing that
  threw money away.

## C5) Pass@k on deterministic environments can be satisfied by a model-free replay agent — so some computer-use benchmark progress measures nothing

- **Why it matters:** C2 shows agents *gaming* a benchmark. This is stronger and more
  structural: on deterministic environments, pass@k is formally satisfiable by
  replaying a recorded action sequence with no model in the loop at all. If the metric
  can be maxed by a system containing no intelligence, the metric is not measuring
  intelligence. Chapter 4's "a comfortably-passing benchmark is a warning" gets a
  mathematical version.
- **Support level:** moderate (single source, but a formal argument with an
  accompanying paper rather than an anecdote)
- **Supporting sources:**
  - [[1014-CTLa_p6iOiY-computer-use-at-the-edge-of-the-statistical-precipice-pierluca-d-oro-programma-labs|#1014 — Pierluca D'Oro, Programma Labs]] — defines the replay agent and its equivalence to pass@k on deterministic tasks.
    - **Anchor:** `CTLa_p6iOiY` 00:01:18.880 → 00:01:20.880 · confidence: high
    - **Quote:** "replace that sequence of actions blindly."
- **Caveats / counterpoints:** Applies to *deterministic* environments; stochastic or
  live-web tasks break the replay trick. The talk also reports naive confidence
  intervals achieving far below their nominal coverage — a separate claim, not
  anchored here. The linked paper should be read before the formal claim is repeated.
- **Candidate chapters:** 4
- **Reusable phrasing:** If a benchmark can be beaten by a recording, passing it tells
  you nothing about the agent.

## C6) Cross-checking independent sources fails when the sources share an upstream error — they agree, and they are all wrong

- **Why it matters:** The book recommends redundancy in several places: panel judging
  with diverse models (Chapter 4/9) and cross-validating retrieved citations
  (Chapter 7's legal-research example). This is a production counterexample from
  healthcare: three independent channels can agree a patient is covered and the claim
  is still denied afterwards. Redundancy defends against *independent* errors; it does
  nothing against a correlated one.
- **Support level:** moderate (single practitioner source, concrete production
  mechanism)
- **Supporting sources:**
  - [[1035-UyyOoJmuATU-healthcare-s-agent-bytecode-x12-as-the-harness-for-ai-agents-vasant-kearney-onlay|#1035 — Vasant Kearney, Onlay]] — phone, web portal and X12 EDI can concur and still be wrong.
    - **Anchor:** `UyyOoJmuATU` 00:16:15.120 → 00:16:17.880 · confidence: high
    - **Quote:** "all actually agree on the wrong information"
- **Caveats / counterpoints:** This is a domain-specific failure (US healthcare
  eligibility), not a refutation of redundancy in general — the book's panel argument
  is about *model* diversity, which is a different independence assumption. The honest
  reading is that redundancy needs an explicit claim about what the sources share.
- **Candidate chapters:** 4, 7, 9
- **Reusable phrasing:** Redundancy only buys you protection from errors that are
  independent. Ask what your sources have in common before you trust their agreement.

---

## Not promoted, and why

- **"Environments" as a sixth scaffolding layer** — the seven-talk cluster is real, but
  the book already uses "environment" in the runtime/sandbox sense nine times in the
  ledger. Resolving that term collision is a taste call, not an evidence problem. See
  the research pass.
- **Surge AI's model-card memorization allegation (#980)** — checkable in principle,
  contested in practice, and it names a specific vendor whose talks the book also
  cites. Needs independent verification before it goes anywhere near a claim.
- **Varick's ROI figures, the MCP Apps user counts, the "95% of pilots fail" stat** —
  all speaker assertions repeated from elsewhere, flagged by the enrichment workers as
  unsourced in-talk. Do not launder a conference slide into a book claim.
