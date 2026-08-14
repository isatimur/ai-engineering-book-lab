# Candidate Claims — corpus #795–1013

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
