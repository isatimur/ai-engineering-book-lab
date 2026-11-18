# Covers

The three covers of the AI Engineer Press series are **grown from the corpus**.
Every mark on every one of them is one talk. There are as many marks as there
are notes in `01_Videos/` — 1,469 at the time of writing — each placed by its
ingest order, coloured by the theme its note actually carries, and sized by how
long the talk actually ran.

Nothing on these plates is decorative, and no image model drew any of it.

| Book | Organism | What the shape says |
|---|---|---|
| *From Copilot to Colleague* | a lichen thallus | phyllotaxis, the packing a sunflower head uses. Oldest talks dense at the centre, newest at the ruffled margin. |
| *The Model Layer & The Long Tail* | a feather | barbs ordered by how common their theme is: the ochre mass of Coding Agents is the body, the rare domains attenuate to the tip. |
| *The Shape of the Work* | a river delta | one narrow channel enters at the bottom and splits into ten distributaries weighted by each theme's real share. The channel is slight; the branching is the picture. |

## The pipeline

Three stages, each reproducible from the one before it:

```
01_Videos/*.md                             the corpus — 1,469 notes
      |  diagrams/covers/_grow_specimen.py
      v
diagrams/covers/plates/<slug>.{svg,png}    the plate, with no lettering on it
      |  scripts/compose-cover.sh  + the titles in website/src/data/
      v
diagrams/covers/<slug>.png                 the master, type set in Didot
      |  scripts/build-cover-derivatives.sh
      v
website/public/covers/<slug>.*             what the pages load
```

```bash
python3 diagrams/covers/_grow_specimen.py   # regrow the plates from the corpus
scripts/build-covers.sh                     # set the type, derive what ships
```

`scripts/build-covers.sh` runs the last two stages together and is the normal
entry point. Both are deterministic: two runs over an unchanged corpus produce
byte-identical output.

## Why the type is set separately

The plates carry no words at all. Earlier covers were generated with their
titles baked into the pixels, and every text defect they had came from asking
an image model to typeset: one printed "and" where the title has "&", another
set its subtitle in a weight the other two books do not use.

So the model — and now the generator — never sees the words. `compose-cover.sh`
reads them out of `website/src/data/book.ts`, `bookChaptersTwo.ts` and
`bookChaptersThree.ts`, the same files the website renders from. The cover and
the page cannot disagree, and **a retitle is a script rerun rather than a new
image to pay for and proofread.** Both book titles are still interim, so this
matters.

## Rendering

Use `rsvg-convert`. Not ImageMagick.

ImageMagick will happily accept a `.svg` and silently render the paper
gradient as solid black — measured at 65% RMSE against a correct render, with
no error and no non-zero exit. `_grow_specimen.py` shells out to
`rsvg-convert` deliberately and refuses to run without it.

## The gate

`python3 diagrams/covers/_grow_specimen.py --check` runs in `diagrams-check`.

Covers are the same kind of artifact as the corpus diagrams: correct the day
they are made, and quietly wrong afterwards. A file-freshness check cannot see
that, because nothing about the plate is stale — it is simply drawn from fewer
talks than the corpus now holds.

The check separates two different failures, the way
`diagrams/_update_corpus_counts.py` does:

- **Shape** — a plate grown as one organism and relabelled as another, a plate
  missing entirely, or a theme with no colour assigned to it (which would draw
  silently as undifferentiated grey). These fail at any tolerance.
- **Lag** — the corpus has grown since the plates were drawn. This fails only
  past **5%**, about 73 talks. The ingest adds talks most nights, and a gate
  that fires every night is a gate everyone learns to ignore.

Negative controls live in `scripts/test_grow_specimen.py`, including the ones
that prove the gate can fail.

## One number that is easy to confuse

`theme_mix` in `plates/grown-from.json` counts each note's **first** theme tag.
`99_Meta/Corpus Stats.md` counts **every** tag on multi-tagged notes. Coding
Agents is ~906 by the first measure and ~945 by the second. The covers draw the
first; the manifest records which, so the two cannot be quietly swapped.
