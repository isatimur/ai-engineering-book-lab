# 2026-05-19 — Manuscript Pass: Epistemic Integrity and Authority Boundaries

- **date:** 2026-05-19
- **target:** public manuscript layer, with emphasis on Chapter 1 and Chapter 7
- **pass type:** editorial / epistemic integrity / public-surface cleanup

## Inputs used
- Public chapter files in `public/drafting/` and `website/src/content/`
- Source transcript summaries and excerpts for:
  - `#206` Joel Hron / Thomson Reuters
  - `#225` Michael Grinich / WorkOS
  - `#150` Jared Hanson / Keycard / Passport.js
  - `#152` Fouad Matin / OpenAI Codex robustness
- Existing public / evidence / claims README notes

## Outputs changed
- `public/drafting/Chapter 1 - The Shift From Assistant to Delegate.md`
- `website/src/content/chapter-01.md`
- `public/drafting/Chapter 7 - Security, Identity, and High-Stakes Trust.md`
- `website/src/content/chapter-07.md`
- `public/EDITORIAL_METHOD.md`
- `public/README.md`

## What improved
- Removed obvious reader-facing scaffolding from Chapter 1 and Chapter 7 (for example “public-safe derivative,” “chapter promise,” and transition placeholders).
- Reframed Chapter 1 so the assistant→delegate thesis is presented as **practitioner convergence**, not settled proof.
- Rebuilt Chapter 7 around a **concrete authority-boundary failure mode**: a tax workflow where evidence gathering, judgment, validation handling, and authorization can blur inside a smooth-seeming trajectory.
- Tightened security claims so they distinguish:
  - repeated field pattern
  - durable design principle
  - unsolved frontier problem
- Added a public editorial method note so outside readers can see how claims are being graded epistemically.

## Quality signals improved
- More honest handling of conference-talk evidence
- Stronger continuity between Chapters 1, 6, and 7
- More concrete narration of “high-stakes colleague” risk
- Less draft leakage on public chapter surfaces

## Unresolved questions
- Chapters 5, 6, 8, 9, and 10 still retain “public-safe derivative” style compression and may benefit from a second pass toward fuller reader-facing prose.
- The public layer still has limited explicit inline citation behavior; later passes may want a lightweight source-note pattern without making the prose clunky.
- Voice/cadence is now more grounded, but the manuscript still needs a later stylistic pass to unify rhythm across chapters.
