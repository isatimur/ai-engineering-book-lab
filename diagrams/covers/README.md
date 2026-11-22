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
| *The Model Layer & The Long Tail* | a pinnate frond | leaflets ordered by how common their theme is, their lengths carrying the long tail: broad basal leaflets crowded with Coding Agents, single rare domains at the tip. |
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

> Note: the plates (`.svg`, `.png`) do not change between runs. The manifest
> `plates/grown-from.json` does change on a new day, because
> `_grow_specimen.py:grow_all` writes `"grown_on": date.today().isoformat()`.

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

---

## Interface

`_grow_specimen.py` is the only source file here. It runs as a script:

- `python3 diagrams/covers/_grow_specimen.py` (or `--grow`) calls
  `main` -> `grow_all`. Any other first argument prints the docstring and
  returns 2. `--check` anywhere in the arguments calls `check`.
- `read_corpus(repo=REPO) -> list[tuple[str, int]]`: one
  `(first theme, duration_seconds)` pair per `01_Videos/*.md` note, in sorted
  filename order.
- `theme_mix(marks)`: count per first theme, `"(untagged)"` for notes with no
  theme, sorted by count then name.
- `duration_band(marks)`: the 5th and 95th percentile of talk length, used to
  clamp mark size.
- `rosette(marks)`, `longtail(marks)`, `delta(marks)`: one SVG body per
  organism, registered in `FORMS`.
- `svg(body)`: wraps a body in the `W` x `H` (1696 x 2528) paper.
- `rasterize(src, dst)`: renders SVG to PNG with `rsvg-convert`.
- `problems(manifest, marks)`: the shape failures listed in
  [The gate](#the-gate).
- `check() -> int`: the CI gate. Exits 0 or 1.
- Constants: `SPECIMENS` (slug -> form), `THEME_INK` (theme -> colour),
  `FALLBACK_INK`, `TOLERANCE = 0.05`, `PLATES`, `MANIFEST`.

## Invariants

- Each slug in `_grow_specimen.py:SPECIMENS` must match the cover filename
  that `scripts/build-covers.sh` looks for.
- Every theme in the corpus must have a colour in `THEME_INK`.
  `grow_all` exits with an error and `problems` reports a failure when a theme
  has none.
- `read_corpus` reads only the first 41 lines of each note (`lineno > 40`
  stops it). The `themes:` list and `duration_seconds:` must sit in that
  window. A missing or non-integer duration counts as 0.
- `check` measures lag as `abs(now - drawn) / now`. A corpus that shrinks
  counts as lag too. An empty `01_Videos/` fails.
- `problems` checks that each `<slug>.png` exists and that the manifest
  `forms` match `SPECIMENS`. It does not check the `.svg`.
- `rasterize` must use `rsvg-convert`. Do not replace it with ImageMagick
  (see [Rendering](#rendering)).
- `--check` is pure Python. It needs no `rsvg-convert` and writes nothing.

## Side Effects

- `grow_all` reads `01_Videos/*.md`. It creates `plates/` if needed and writes
  `plates/<slug>.svg`, `plates/<slug>.png` and `plates/grown-from.json`.
- `rasterize` starts an `rsvg-convert` subprocess (`check=True`).
- `check` reads `plates/grown-from.json` and `01_Videos/*.md`, and prints
  `OK` or `FAIL` lines to stdout.

## Verification

- Run: `python3 scripts/test_grow_specimen.py` (from the repo root)
- Gate: `python3 diagrams/covers/_grow_specimen.py --check` (runs in
  `.github/workflows/diagrams-check.yml`)
- Lint: `ruff check diagrams/covers/_grow_specimen.py` (runs in
  `.github/workflows/script-tests.yml`)
