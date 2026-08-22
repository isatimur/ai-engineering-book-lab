# Research Pass — 2026-08-22 — Testing the irreversibility hypothesis

- **Target:** the refined hypothesis from `2026-08-22-b2b-thesis-test.md` — *engineering changes where a wrong answer causes irreversible harm; regulated domains are simply where that condition clusters.*
- **Why this pass exists:** that hypothesis makes a **falsifiable prediction**. If it is right, the same forcing must appear in **non-regulated** work wherever the action is irreversible, and must be **absent** in regulated work where nothing irreversible happens. Both halves are checkable against evidence already in the repo, so this pass cost no new enrichment.
- **Method:** sorted already-enriched talks into a 2×2 on two axes — is the domain regulated, and is a wrong answer irreversible — then checked which quadrants contain forced engineering.

## The 2×2, populated

|  | **Wrong answer irreversible** | **Wrong answer recoverable** |
|---|---|---|
| **Regulated domain** | **FORCING** — Intuit (#197): the LLM never touches the tax calculation; guardrail model screens every explanation. Telemedicine (#339): confidence gate at 75%, escalation to a named PA or 911. Anterior (#446): escalation ladder driven by active lawsuits. Ensemble Health (#187): clinician sign-off before payer submission. WhyHow (#216): schema/graph over free text. Bright Wave (#423): separate fact-check model. Shah (#793): cross-jurisdictional normalisation + human-prioritised audit. | **NO FORCING** — AXA (#469): the only insurance-specific constraint is **data residency**, a storage obligation with no wrong-answer consequence. Everything else is standard practice. |
| **Not regulated** | **FORCING** — Cloudflare (#984): null-origin iframe + network-isolated Durable Object, so agent-introduced XSS has nothing to exfiltrate to. Deno (#1020): the concrete threat is an agent spawning `psql` and dropping the users table, answered with a **byte-level proxy** — explicitly because "alignment is not security". Docker (#1047): just-in-time scoped access. Decawork (#1043): agent identity, citing the EchoLeak CVE and Replit deleting a production database despite a code freeze. Stripe (#745): shared payment tokens and an HTTP 402 protocol, because money movement does not un-move. | **NO FORCING** — Writer (#406): eval methodology the speaker says applies identically to medicine. MongoDB (#539): a ReAct tutorial using arXiv as sample data. Single-cell biology (#862): representation-learning research, no agent at all. |

Three of four quadrants behave exactly as the hypothesis predicts, and the
fourth — regulated-but-recoverable — is the one that would have falsified it.
AXA sits there, and shows no forcing.

## What this means for book two

**Book two is not a vertical book.** The organising idea is *irreversibility*,
and verticals are where irreversibility is dense enough to be legible. That
reframing does real work:

1. **It explains the 44% miss rate** from the previous pass instead of
   apologising for it. Talks tagged with a regulated domain but lacking an
   irreversible action were never on-thesis.
2. **It widens the evidence base honestly.** The sandboxing cluster, agent
   identity, and payments are all on-thesis without being regulated — material
   the "applied vertical AI" framing would have excluded.
3. **It predicts the engineering response, not just its existence.** Across all
   twelve forcing cases the answer is the same shape: **move the irreversible
   step out of the model.** A deterministic tax engine, a byte-level proxy, a
   clinician sign-off, a scoped sandbox, a payment token, a schema. Nobody
   solved it with a better prompt or a bigger model.
4. **It connects to book one rather than repeating it.** Book one argues
   dependability comes from scaffolding around the model. This is the sharper
   successor claim: *the scaffolding is load-bearing exactly where actions
   cannot be undone* — which is why Chapter 7's abstract high-stakes trust
   needed a whole book to become concrete.

Candidate title direction, recorded not chosen: something in the register of
*What Cannot Be Undone* — the engineering of irreversible action.

## Caveats

- The 2×2 is my sorting of others' talks; "irreversible" is a judgement per
  case, not a property anyone in the corpus declared. Someone else could sort
  Stripe or Aviator differently.
- One cell rests on a single strong case (AXA). The hypothesis would be much
  better tested by deliberately hunting more regulated-but-recoverable talks —
  compliance reporting, document search, internal analytics — where the
  prediction is *no* forcing. That is the next honest test, and it is the one
  that could still break this.
- No claim here is anchored yet. The quotes referenced (Dahl's `psql` example,
  Intuit's split, the pre-1998 cutoff) are transcript-verified; the *argument*
  is mine and unanchored.
