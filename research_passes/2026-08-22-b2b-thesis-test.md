# Research Pass — 2026-08-22 — Testing the B2-B vertical thesis

- **Target:** does the corpus actually support book two's recommended thesis — *in a regulated domain, what changes is not the model but the constraints around it*?
- **Pass type:** hypothesis test (designed to be able to fail)
- **Method:** enriched 16 genuine vertical-domain talks (word-boundary targeting after the [count correction](2026-08-20-book-two-coverage.md)), and required each worker to report per talk either **what the domain specifically forced** — a constraint, verification step, escalation path, or named regulation — or the words *"generic: domain is incidental."*
- **Why framed that way:** the thesis had already been overstated once (counts inflated ~48%). The failure mode to guard against was workers straining to find domain significance that was not there, so the negative answer was made explicitly acceptable.

## Verdict (full 16-talk sample): the thesis holds for a slim majority, and **two distinct forcing mechanisms** emerge

Across both batches: **9 of 16 showed real domain forcing, 7 were generic or
out-of-scope — a 44% miss rate in a sample selected *for* being domain talks.**

That miss rate is the headline. It means "regulated domain" is not by itself a
predictor that the engineering changes.

### Domain genuinely forced the engineering (5)

- **Ensemble Health (#187)** — off-the-shelf GenAI could not be trusted for payer appeal letters, so a clinician retains final sign-off before submission. A human gate, not a model upgrade.
- **WhyHow (#216, legal)** — chose a graph/schema architecture over raw LLM output because, in the speaker's words, *"lawyers don't really like when things are incorrect."* Their chained-accuracy math (95% per step compounding down to ~77%) is the stated reason for guardrails plus human review.
- **Anterior (#446, health)** — verification driven directly by **legal exposure**: active US lawsuits over inappropriate healthcare AI automation produced a real-time reference-free eval layer with an escalation ladder (stronger model → on-call clinician → customer dashboard).
- **Varsha Shah (#793, finance)** — a cross-jurisdictional normalisation layer, because currency, tax and reporting rules differ by country, plus an audit-feedback loop that *prioritises cases for human investigators* rather than acting autonomously.
- **Radicait (#881, science)** — hierarchical hypothesis generation because agents plateau on open-ended problems, plus a separate multimodal QC skill and escalation to a stronger model, since no current model reliably spots something like a small lung nodule. **Note the difference:** this is *open-ended science* forcing, not regulatory forcing. Same shape, different cause.

### Generic — the domain is incidental (3)

- **Writer (#406)** — billed as evaluating domain-specific LLMs for real-world finance, but the eval methodology (query vs. context failure categories) is domain-agnostic, and the speaker says a medical version shows the same pattern. No finance-specific regulation, audit or escalation appears.
- **Gradient / Albatross (#473)** — titled as training an expert finance LLM; the speaker explicitly frames the underlying requirements as general and cross-industry, and the flagship long-context demo uses **Mark Twain fiction**, not a finance task. Verified in the transcript.
- **MongoDB (#539)** — a standard tool-calling/ReAct/memory tutorial that happens to use arXiv search as sample data. No scientific-verification or citation-checking concern.

### Batch 1 additions — domain forced the engineering (4)

- **Intuit / TurboTax (#197, finance)** — the cleanest confirmation in the corpus: **the LLM never touches the tax calculation.** Numbers come from a deterministic tax engine; a dedicated guardrail model then checks every generated explanation for hallucinated figures before a taxpayer sees it, and tax analysts act as prompt engineers building the golden eval set. All of it because a wrong number is a legal-liability event.
- **Telemedicine agents (#339, health)** — a separate self-evaluation call produces a confidence score with deductions for complexity, gating human approval below a 75% threshold; escalation routes to a named physician's assistant on Slack, or to "call 911". A rigid deterministic flowchart broke on real patient language, forcing a "blueprint + anchors" design.
- **Bright Wave (#423, finance)** — verification is a *separate* fact-check model call rather than a self-check, because a single pass is "primed to be credulous"; every finding carries a citation and audit trail.
- **Novartis (#553, science)** — imposed a literal knowledge cutoff, date-restricting the RAG corpus to pre-1998 papers so the model could not simply recite a memorised discovery (RNA interference, 1998), grading success on escalating discovery tiers rather than QA accuracy. Verified in the transcript.

### Batch 1 additions — generic or out of scope (4)

- **Deep research workshop (#008)** — general agent-building workshop; a keyword sweep for scientific/clinical/peer-review/arXiv terms returned zero hits.
- **AXA / DSPy (#469, insurance)** — the only genuinely insurance-specific constraint is **data residency** (internally hosted model to keep customer data off third-party infrastructure). The rest is standard practice.
- **LLM safeguards (#516, tagged legal)** — an enterprise security checklist; its one concrete high-stakes example is a field-medic triage app, not a legal use case. The domain tag does not match the content.
- **Single-cell biology (#862, health)** — representation-learning research with no agent, deployment, verification or regulatory content. Not evidence either way.

## The refinement that matters: forcing has two causes, and neither is "the domain"

Sorting the 9 positive cases, the trigger is never the domain label. It is one
of two things:

1. **Liability or irreversibility of a wrong answer** — Intuit (a wrong number
   is legally actionable), telemedicine (triage), Anterior (active lawsuits),
   Ensemble Health (payer submission), WhyHow (accuracy compounding in legal
   work), Bright Wave (cited financial research), Shah (cross-jurisdictional
   compliance). Seven of nine.
2. **Problem structure, unrelated to regulation** — Novartis (must prove
   *reasoning* rather than recall, hence the artificial knowledge cutoff) and
   Radicait (open-ended science, hence hierarchical hypotheses and QC
   escalation). Two of nine.

The negative cases fit the same rule from the other side: AXA's only real
constraint was data residency — a *storage* obligation, not a wrong-answer
consequence — and the finance-LLM talks that argued their methods were
cross-industry had no irreversible action anywhere in the loop.

**So the honest thesis is not "regulated domains change the engineering."** It
is closer to: *engineering changes where a wrong answer causes irreversible
harm, and regulated domains are simply where that condition clusters.* That is
a sharper claim, it explains the 7 misses instead of ignoring them, and it
predicts which non-regulated domains should show the same forcing.

## What this does to the recommendation

**It survives, weakened and better specified.** Five independent cases of a
domain forcing a *specific* engineering response — human sign-off, schema over
free text, escalation ladders, jurisdictional normalisation — is a real spine,
and notably the forcing mechanisms differ (liability, accuracy compounding,
regulation, problem structure). That variety is a book, not an anthology.

But two of the strongest-sounding titles in the sample — an "expert finance
LLM" and a "domain-specific LLM evaluation for finance" — turn out to argue
**the opposite of the thesis**, saying their methods are cross-industry. That
counter-evidence comes from inside the vertical, which makes it the sharpest
material in the pass: the honest version of book two must explain *why some
verticals force new engineering and others genuinely do not*, rather than
asserting that domains always do.

Working hypothesis worth testing next: forcing appears where a **wrong answer
creates liability or irreversible harm** (a denied claim, a missed nodule, a
filed brief), and is absent where the domain only supplies vocabulary and
documents. The Radicait case suggests a second, separate forcing mechanism —
problem open-endedness — that has nothing to do with regulation.

## Caveats

Sixteen talks is still a modest sample and they were the ones still on boilerplate, so
the already-enriched vertical talks (which include the strongest healthcare
material) are not represented here. The remaining ~13 genuine vertical talks
should be run the same way before the recommendation is treated as settled.
Figures quoted by these speakers are self-reported unless marked otherwise;
none were independently verified beyond confirming they appear in the
transcript.
