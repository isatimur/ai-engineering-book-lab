# Canonical Claims Ledger schema

## Status

accepted

## Context

The Method's claims layer was incoherent: the two ledger files used different formats (`## N)` numbered headings in one, unnumbered `###` headings in the other), and book-mash's loader expected a third format entirely (`## claim:<id>` with `**Strength:**` / `**Text:**` / `**Sources:**`), so it indexed **zero** claims and `claim_defensibility` / `evidence_density` scored every paragraph as unsupported. Since The Method is the product (the repo is a public experiment) and book-mash is a component of The Method, a measurement engine that cannot read its own claims files is a coherence defect that blocks "Done."

## Decision

There is **one** canonical Claims Ledger schema, and **one** ledger file (`Claims Ledger.md`). The two existing ledgers merge into it, the research-pass instructions that author claims emit the schema, and book-mash's loader targets it exactly.

A claim entry:

- is a numbered `## N)` heading whose text **is** the claim's prose
- carries fields: `**Why it matters:**`, `**Support level:**` (`tentative | moderate | strong`), `**Supporting sources:**` (a list of Source Anchors — see ADR-0002), `**Caveats / counterpoints:**`, `**Candidate chapters:**`, `**Reusable phrasing:**`
- has identity `claims#<N>` — a number unique within the single ledger, stable across re-wording of the heading text

A claim binds to chapters **many-to-many** via `**Candidate chapters:**`. book-mash judges Chapter N against every claim whose `Candidate chapters` list includes N; the binding key is the chapter *number*, so book-mash's loader must expose a chapter number, not only the slug id.

## Considered and rejected

A **lenient loader** — book-mash fuzzy-parses whatever the research passes emit. Rejected: it hides the real problem rather than fixing it (the two ledgers genuinely disagree with each other), and it turns the loader into guesswork that drifts further as the corpus grows.

## Consequences

- One-time migration of the two existing ledgers into a single `Claims Ledger.md` — mainly normalizing headings to numbered `## N)`. `Support level` is already the term the files use; book-mash's code (`Strength`) is what changes.
- book-mash's `claims_index.py` is rewritten to the canonical field names; `claim_defensibility`'s chapter binding changes from `claim:<id>` prefix-matching to `Candidate chapters` membership.
- A single ledger makes double-counting a claim structurally impossible — the two source ledgers overlapped (both covered chapters 3–6), so merging is also the fix for that latent dedup bug. If the ledger ever grows unwieldy it may later be split *by theme* with strict non-overlap, but not by chapter span.
