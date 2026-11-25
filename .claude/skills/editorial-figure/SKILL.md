---
name: editorial-figure
description: Draw or redraw a book figure as an editorial figure, a live HTML component fed by data. Use when adding a figure to a chapter, replacing an Excalidraw PNG in website/public/diagrams, or editing data under website/src/data/figures.
---

# Editorial figure

Book figures are live HTML: `EditorialFigure` (`website/src/components/figures/`) draws one from a data object in `website/src/data/figures/`. The style is the back of the chapter-1 postcard (`FigureFlip`): a bracketed mono kicker, a serif title with an italic accent line, one accent colour, whitespace, big italic numbers, a verbatim quote, a mono sources line. Rules and type, no boxes and arrows.

Excalidraw is retired for book figures. The PNGs in `website/public/diagrams/` stay only until their chapter is redrawn; draw new figures here, never in `diagrams/*.excalidraw`.

## Steps

1. **Read the argument.** Open the old PNG (`website/public/diagrams/manifest.json` → `inline`, chapter, index) and its source in `diagrams/` (`.excalidraw` or `_gen_chNN_gap_diagrams.py`). Read the chapter section it sits under (`website/src/content*/chapter-NN.md`). Write the figure's claim as one sentence. Done when you can say it in one sentence.
2. **Pick the layout** from the claim, with the table below. Done when one layout carries the claim with no leftover facts.
3. **Write the data** in `website/src/data/figures/<book>/chNN.ts` and register the chapter in `data/figures/index.ts`. Schema per layout: [LAYOUTS.md](LAYOUTS.md). Keep the old figure's facts; simplify freely; add nothing the sources do not say.
4. **Source every fact** (rules below). Done when the chapter's test is green.
5. **Prove it** (loop below). Done when every screenshot is read and clean.

## Choosing a layout

| The claim is… | Layout |
| --- | --- |
| a share of a whole ("code is 14–16% of the stream") | `bars` |
| a shift from one state to another, or two peers side by side | `compare` |
| carried by two or three numbers | `stats` |
| a sequence: rungs, stages, a pipeline, where something breaks | `flow` |
| one person's sentence, with the contrast it implies | `quote` |
| a set of parts: what sits under a surface, what converges | `matrix` |

One accent per figure, on the element the claim is about (`hot: true`). An accent on anything else is noise. `bars` needs a real, sourced share; with no number, pick another layout instead of inventing widths.

## Sourcing

- Every quote is **verbatim** from the chapter markdown or the book's Claims Ledger (`claims/`, `claims-2/`, `claims-3/` → `Claims Ledger.md`). A chapter sentence may be quoted with `by: 'Chapter N'`. Never quote a paraphrase.
- Every number carries `basis`: a verbatim line from the chapter or ledger that states it (as digits or a word). A count the text never states ("ten practices") carries `count`: the counted items, verbatim, and the test checks the tally.
- Every digit printed on the figure (outside the kicker, the sources line and the attribution) is declared in `stats` or `numbers`, or the test fails.
- `sources` names the corpus ids and speakers (`#206 — Joel Hron, Thomson Reuters`) and the chapter.

The test per chapter (model: `website/src/data/figures/book1/ch01.test.tsx`) enforces all four. Add one for each new chapter.

## i18n

The book will ship in ru, then zh, es, pt, de, fr, ja. So:

- Every visible string lives in the data file. Layout code adds only punctuation and glyphs (`[ ]`, `→`, `“ ”`); the fixture test in `ch01.test.tsx` fails if it prints a word.
- The text alternative (`describeFigure`) is built from data the same way.
- Quotes stay in English in every edition. A translated edition adds `quote.translation`; never edit `quote.text`.
- A translation is a new data file per language, not a code change.

## Proof loop

Run from `website/`:

1. `npx vitest run` and `npx tsc -b`. Both green.
2. `npm run build`. Then `git checkout --` any sitemap whose only change is `lastmod`, and delete `tsconfig.tsbuildinfo`.
3. `npx vite preview --port 4341` (background), then drive it with `npx @playwright/cli -s=<name>` (in zsh, wrap it in a shell function). Screenshot each figure (`[data-figure-id="…"]`) on its chapter page at **1400 px and 390 px**.
4. **Read every screenshot.** Look for overlap, clipping, text under 14 px, a stranded word or separator, an accent on the wrong element. Fix and repeat from 1.

At 390 px every layout must reflow to one column and stay readable: that is the reason to leave PNG. Figures are text, so they need no lightbox.
