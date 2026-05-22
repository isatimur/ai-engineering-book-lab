# AI Engineering Book Lab

A public experiment testing whether a source corpus plus autonomous agent loops can produce a source-backed AI engineering book. The reproducible method is the product; the manuscript is its proof-of-output.

## Language

**The Lab**:
The public experiment itself — corpus, agent loops, and the workflow that turns source material into book artifacts.
_Avoid_: "the project", "the repo"

**The Method**:
The reproducible research-and-writing machine — bounded research passes, reusable agent instructions, claims/evidence layers, cumulative logs. This is the deliverable.
_Avoid_: "the pipeline", "the process"

**The Manuscript**:
The book-length draft (chapters in `public/drafting/`). Proof that The Method works — not the product itself.
_Avoid_: "the book" (implies a shippable product)

**Done**:
The state where The Method is documented and visibly works. The Manuscript may remain a strong, honest draft; it need not be publishable.

### Claims layer

**Claim**:
A reusable, source-backed assertion The Manuscript can draw on. Its prose text is the ledger entry's heading.

**Claims Ledger**:
The single file collecting all **Claims**. A **Claim**'s chapters come from its **Candidate chapters** field, never from file structure.

**Support level**:
How well-evidenced a **Claim** is — `tentative | moderate | strong`.
_Avoid_: "Strength" (book-mash's code used this; canonical term is "Support level")

**Candidate chapters**:
The chapters a **Claim** may be used in. A **Claim** relates to chapters many-to-many.

**Source Anchor**:
A precise pointer from a **Claim** into a source video — `video id + timestamp` — marking the moment that grounds the **Claim**. Replaces a bare whole-video reference.
_Avoid_: "citation", "reference" (those imply a whole-video pointer)

## Relationships

- **The Lab** runs **The Method** over a source corpus to produce **The Manuscript**
- **The Manuscript** is evidence that **The Method** works; it is not the deliverable
- "**Done**" is a property of **The Method**, not of **The Manuscript**
- **book-mash** (the multi-judge measurement engine) is a component of **The Method**, not external QA tooling — so its coherence counts toward "**Done**"
- A **Claim** lives in a **Claims Ledger** and is a candidate for one or more chapters (**Candidate chapters**)
- A **Claim**'s supporting sources are **Source Anchors** — each pointing at the exact moment in a video that grounds it

## Example dialogue

> **Dev:** "Chapter 5 still reads like a rough draft — does that block us?"
> **Domain expert:** "No. The Manuscript is allowed to stay a good draft. What can't stay rough is The Method — if the research-and-writing machine isn't reproducible and documented, the Lab hasn't shipped."

## Flagged ambiguities

- The repo presents itself as both "a public experiment" and "a book" — resolved: it is an experiment (**The Lab**). **The Manuscript** is proof-of-output, not the product. The product is **The Method**.
- book-mash's loader used "Strength" / "Text" / "Sources" and per-chapter `claim:<id>` namespacing; the real ledgers use "Support level" / heading-as-text / "Supporting sources" / cross-chapter "Candidate chapters" — resolved: a single canonical **Claims Ledger** schema wins, and book-mash conforms to it.
