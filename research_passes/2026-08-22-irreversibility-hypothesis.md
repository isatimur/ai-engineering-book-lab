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

## Falsification test run (same day) — the risky quadrant now has four cases, all behaving

The caveat below noted that regulated-but-recoverable rested on a single case
(AXA), and that deliberately hunting more such talks was the test that could
still break the hypothesis. That test was run immediately. Three more
regulated-domain talks whose actions are **recoverable** — a human reads the
output before anything happens:

- **Harvey / LanceDB (#154, legal RAG)** — legal document retrieval at three
  data scales with a tiered eval strategy. One apparent forcing hit turned out
  to be "deterministic success criteria" describing *recall metrics*, not a
  deterministic guard on an action. **No forcing.**
- **AlixPartners (#205, M&A / litigation support)** — an internal GenAI platform
  for vendor categorisation, enterprise RAG and contract extraction. Two
  apparent hits: one a general caveat that LLMs are "stochastic and not
  necessarily deterministic", the other the phrase "escalation procedures"
  appearing as **the content of a sample user query** ("what is Acme's
  escalation procedures for reporting safety violations?") — not their own
  escalation design. **No forcing.**
- **Vectara (#100, enterprise deep research)** — zero forcing signatures.
  **No forcing.**

All three sit in regulated domains handling sensitive legal, financial and
corporate material. None built an escalation ladder, a human sign-off gate, or a
deterministic guard, because nothing in their loop cannot be undone. What they
built instead was **eval discipline** — which is book one's subject, not book
two's.

That is four independent cases in the quadrant designed to falsify the
hypothesis, and the hypothesis holds in all four. It is now the best-supported
claim in either book's scoping work.

Note the method trap, twice in one pass: both apparent counter-hits were grep
false positives that required reading the surrounding sentence. Forcing
signatures cannot be counted mechanically.

## Mechanism test — irreversible action, forcing absent, harm demonstrated

The previous caveat named the harder test: find work where the action **is**
irreversible and the team demonstrably did **not** build forcing, then see
whether harm follows. Without that, this is a correlation.

**[[151-kv-QAuKWllQ-how-we-hacked-yc-spring-2025-batch-s-ai-agents-rene-brandel-casco|#151 — Rene Brandel, Casco]]** supplies it, and does so
adversarially rather than anecdotally. He took publicly launched YC X25 AI
agents, timeboxed each attempt, and counted:

- **Anchor:** `kv-QAuKWllQ` 00:03:57.120 → 00:03:58.319 · confidence: high
  · **Quote:** "out of 16 agents that were launched"
- **Anchor:** `kv-QAuKWllQ` 00:04:01.360 → 00:04:02.319 · confidence: high
  · **Quote:** "we hacked seven of them."

**Seven of sixteen, at roughly thirty minutes each.** The three recurring
failure classes he names are precisely absences of the forcing this pass
identified: IDOR (no authorization boundary between users' data),
code-sandbox escapes (no isolation around execution), and SSRF-style
git-credential theft (no egress control). Data leakage and stolen credentials
are irreversible — you cannot un-disclose them.

Set against the forcing quadrant, the pairing is clean. Cloudflare, Deno,
Docker and Decawork built authorization boundaries, isolation and egress
control *before* shipping; these sixteen shipped without, and a single
researcher defeated 44% of them inside half an hour each.

A second, milder case from the same tier: **Amazon AGI Lab (#1001)** reports
RL-trained agents meeting real UIs — an expense agent locking its own account
after a session expired, and a model clicking a *sponsored* lookalike submit
button and beginning to fill in personal details on the wrong site. Both are
irreversible-ish actions taken because nothing sat between intent and effect;
the fixes described are sandbox, reward and harness changes — again, structure
outside the model.

**What this upgrades.** The hypothesis was: engineering changes where a wrong
answer is irreversible. The Casco result adds the contrapositive with evidence
— where the action is irreversible and that engineering is *absent*, harm is
not hypothetical but reproducible on demand. That is closer to a mechanism than
a correlation, and it is the single most quotable result in either book's
scoping work.

**Honest limits.** Casco sells agent security, so he is a motivated witness;
what makes it usable is that the claim is a *count he performed*, not a market
statistic, and the failure classes are standard named vulnerabilities rather
than proprietary findings. He also tested early-stage YC launches, which are
the least hardened software in the corpus — the result should not be
generalised to mature deployments without saying so.

## Caveats

- The 2×2 is my sorting of others' talks; "irreversible" is a judgement per
  case, not a property anyone in the corpus declared. Someone else could sort
  Stripe or Aviator differently.
- ~~One cell rests on a single strong case (AXA).~~ **Resolved above:** four
  cases now, all as predicted. The remaining weakness is the opposite corner —
  non-regulated *recoverable* work is represented by only three talks, and the
  prediction there is also no forcing, so it is a weaker test.
- A harder future test: find a talk where an action **is** irreversible and the
  team demonstrably did *not* build forcing, then see whether they report harm.
  That would move this from a correlation to something closer to a mechanism.
- No claim here is anchored yet. The quotes referenced (Dahl's `psql` example,
  Intuit's split, the pre-1998 cutoff) are transcript-verified; the *argument*
  is mine and unanchored.
