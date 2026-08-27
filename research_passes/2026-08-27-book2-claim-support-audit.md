# Research Pass — 2026-08-27 — Book 2: does each quote support its claim?

- **Target:** the gap left open by every previous check. Anchor verification proves a quote *exists* in its cited transcript (book 2: 93/93). It says nothing about whether the quote **supports the claim attached to it** — which is where a claim can outrun its evidence while looking fully sourced.
- **Method:** adversarial read of all 43 claims against their 93 quotes, with explicit attention to **causal and superlative clauses** ("best", "because", "usually", "depends on"). Read-only: `claims-2/` belongs to the second-book track.
- **Independent verification:** the three highest-consequence findings were re-checked against transcripts by hand before recording. All three held.

## Result

| verdict | count |
|---|---|
| SUPPORTED | 28 |
| OVERREACH | 13 |
| UNSUPPORTED | 1 |
| UNCLEAR | 1 |

**Two thirds hold. One third of the ledger's claims are stated more strongly
than their quotes carry** — and every anchor resolves, so no existing check
would have caught any of it.

## The one to fix before anything else — claim #3

> "Code is the best domain to scale RL, **because its rewards are automatically
> verifiable**" — marked **strong**, single quote: *"autonomous coding as the
> root node problem"*.

Verified by hand. The full sentence is *"we are starting with autonomous coding
as the root node problem for this mission"* — a company statement about **where
it chose to start**. And the word **"verifiab" appears zero times in the entire
transcript**. The claim's superlative ("best") and its load-bearing mechanism
("because rewards are automatically verifiable") have *no* support in the cited
source.

Suggested rewording: *"Reflection.ai treats autonomous coding as the priority
('root node') problem on the path to general capability."* That is what the
evidence says.

## Two more verified by hand

- **#7** — "Inference, not training, is the **largest** and **most contested** market in AI software" (strong). The source hedges: *"inference **might be** the largest market ever in software."* Verified verbatim. "Most contested" appears in neither quote.
- **#42** — "A creative pipeline can now run fully autonomously, and the standard it is measured against is a human" (moderate). The quoted line is a **German newspaper's sceptical claim** — *"it could easily take another 5 years until AI explains chess as well as a human trainer"* — which the speaker cites as a **foil he is arguing against**, not his own verdict, and not evidence the pipeline met that bar. Verified verbatim.

## The systematic pattern (more useful than any single claim)

The recurring failure is not invention. It is **generalising a single company's
practice into a field-wide law**, then labelling it strong:

- #15 "Frontier progress is bottleneck-hunting" — two DeepMind researchers describing DeepMind.
- #26 "In embodiment, the bug is **usually** the system" — one Tesla Optimus engineer, one robot.
- #29 "Broad embodiment **depends on** tiny models" — a four-word fragment, *"we are going to need tiny models."*
- #19 "**Non-text model architectures** are converging by tokenization" — all evidence is speech/TTS only; the ledger's own reusable phrasing already scopes it to speech. The title should match.
- #9, #13 — vendor self-assessment ("first to surpass GPT-4", "#1 open model") read as a market-wide trend.

And a second pattern worth naming: **the caveats are already honest while the
level field is not.** #9, #13, #14, #15, #26 each carry a caveat conceding
single-source status or vendor bias — and are still labelled **strong**. The
ledger writer saw the weakness and recorded it in prose, then did not carry it
into the field that machines and readers actually sort on.

Claims **#25** and **#34** show the correct practice already exists in this
ledger: *"strong (as a framing of the frontier bet); the bet itself is
unproven"* and *"strong (moderate on the specific self-reported figures)"*.
Applying that discipline to the eight inconsistent claims would resolve most of
this pass.

## Disposition

Nothing edited. Every finding proposes a **weaker wording, never a deletion** —
overreach here is almost always a real insight stated too strongly, and deleting
it would lose the insight. Full per-claim detail, including suggested rewordings
for all 13 OVERREACH claims, is in this pass's source audit; the book-2 track
owns the decision.

## What this pass does not establish

Whether the 28 SUPPORTED claims are *interesting*, whether chapter prose uses
these claims faithfully, and whether book 1's 54 claims have the same problem —
book 1 was never audited this way. Given book 2 came in at one-third overreach,
**book 1 deserves the same pass**, and its age is no defence: book 1 is where
the one fabricated quotation was found.
