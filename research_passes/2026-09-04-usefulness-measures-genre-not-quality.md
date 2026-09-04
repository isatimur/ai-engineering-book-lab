# Research Pass — 2026-09-04 — ch01 and ch10 are not weak; `usefulness` measures genre

Book 1 was about to get a targeted `usefulness` pass on chapters 1 and 10, the two the
canonical panel labels **weak** (47.3 each). The pass was not made. The evidence says the
score is measuring what those chapters *are*, not how good they are, and editing to raise it
would damage the book.

## The fail rate tracks how concrete a chapter's job is

Panel v10, per chapter — share of paragraphs scored under 50:

| chapter | usefulness | fail-band | the chapter's job |
|---|---|---|---|
| 07 Security | **74.0** | **15%** | concrete controls and practices |
| 06 / 09 / 08 / 03 | 64–66 | 23–27% | technical mechanism |
| 05 / 04 | 61 | 35–39% | mechanism plus argument |
| 02 Taste | 54.6 | 43% | argument |
| **01 The Shift** | **47.3** | **61%** | opening, framing, thesis |
| **10 What Endures** | **47.3** | **57%** | closing, reflection, synthesis |

A perfect gradient from "lists concrete controls" to "states the book's argument". The two
lowest chapters are the two whose function is framing and synthesis.

## What the judge is actually penalising

Its own stated reasons, verbatim: *"meta-commentary about the structure of the book"*,
*"a summary of the topics covered in the upcoming chapters"*, *"a transition statement"*,
*"describes the structure of the book and the use of composites"*.

And the paragraphs it puts in the fail band include:

* `ch01 L4` — **the book's opening line**: "For a while, the most impressive thing AI could
  do was answer." Scored **15**.
* `ch01 L8` — **the thesis**: "The deeper transition begins when the system is no longer
  asked only to suggest. It is asked to return with work done." Scored **15**.
* `ch01 L127` — the chapter's closing thesis: "…trust is earned through architecture, not a
  pile of isolated tricks." Scored 30.
* `ch10 L12` — the book's central claim restated: "What endures is a pattern for turning
  machine capability into dependable work." Scored 30.
* `ch10 L34` — the central synthesis: "…not support accessories for intelligence but the
  means by which intelligence becomes situated." Scored 30.

These are abstract **because they are synthesis**. Making them score well means making them
actionable, and making a thesis actionable means turning it into a checklist. The opening
line of the book cannot be a checklist.

## The metric has already plateaued, after a real pass

Book usefulness: v7 60.5 → v8 49.5 → **v9 60.6** → **v10 60.5**.

The 09-02 pass was substantial and deliberate — ten parallel chapter editors, 105
fidelity-bound edits, −1010 words, every chapter covered — and it produced the 49.5 → 60.6
move. Chapters 1 and 10 were edited in it, and that pass explicitly recorded "Ch10 kept
reflective" as a decision. They still sit at 47.3. The remaining gap is not editable slack;
it is the genre.

## Consequence

**Do not run a usefulness pass on chapters 1 and 10.** A future session reading "two chapters
labelled weak" will be tempted to fix them. That is how a book loses its opening.

`usefulness` stays useful *within* a chapter of a given kind — it is what surfaced the
listicle stems and dead transitions the 09-02 pass removed. It should not be
compared across chapters of different function, and a chapter-level `weak` on 01 or 10 is not
a ship-blocker. The panel agrees: **0 ship-blockers across all ten chapters.**

## What would change this conclusion

If `usefulness_connective` classified thesis and synthesis prose the way it already
classifies list stems (commit `676f5db`), the substantive score would separate genre from
quality and the comparison would mean something. Today it catches 13% of ch01 and 5% of ch10
— it is tuned for connective tissue, not for framing. That is the real improvement available
here, and it is an instrument change, not a manuscript change.

## Correction to my own earlier answer

I told the operator book 1 was not ready to announce partly because "usefulness is weak on
ch01 and ch10, the first and last chapters a reader sees". That reason is withdrawn. It is
not a quality defect and it does not block the announcement. The audio staleness and the
ship-gate remain.
