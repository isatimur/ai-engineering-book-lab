# Research Pass — 2026-08-22 — Testing the B2-B vertical thesis

- **Target:** does the corpus actually support book two's recommended thesis — *in a regulated domain, what changes is not the model but the constraints around it*?
- **Pass type:** hypothesis test (designed to be able to fail)
- **Method:** enriched 16 genuine vertical-domain talks (word-boundary targeting after the [count correction](2026-08-20-book-two-coverage.md)), and required each worker to report per talk either **what the domain specifically forced** — a constraint, verification step, escalation path, or named regulation — or the words *"generic: domain is incidental."*
- **Why framed that way:** the thesis had already been overstated once (counts inflated ~48%). The failure mode to guard against was workers straining to find domain significance that was not there, so the negative answer was made explicitly acceptable.

## Verdict: the thesis holds for a majority, not a rule — and the counter-evidence is the interesting part

Of the 8 talks reported in detail so far, **5 showed real domain forcing and 3 were generic** — a ~37% miss rate in a sample selected *for* being domain talks.

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

Eight talks is a small sample and they were the ones still on boilerplate, so
the already-enriched vertical talks (which include the strongest healthcare
material) are not represented here. The remaining ~13 genuine vertical talks
should be run the same way before the recommendation is treated as settled.
Figures quoted by these speakers are self-reported unless marked otherwise;
none were independently verified beyond confirming they appear in the
transcript.
