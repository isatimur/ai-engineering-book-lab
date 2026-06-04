# Design — Diagram Visual Identity Kit (SP1)

_Date: 2026-05-22_

## Context

The book *From Copilot to Colleague* has 14 diagrams (4 structural + 10 chapter
before→after) in `diagrams/`, a gallery `diagrams/README.md`, and per-chapter
diagrams wired into `website/`. They were built with the global
`excalidraw-diagram` skill using its default palette.

The next goal is to expand the visual system substantially. That expansion was
decomposed into four sub-projects:

- **SP1 — Visual identity & template kit** _(this spec)_
- SP2 — Inline chapter figures (30-50 "intermediate illustrations")
- SP3 — Concept visual glossary (18 concept diagrams)
- SP4 — Book-level maps + interactive website index

SP1 is the foundation: it locks a reusable visual identity and template kit so
SP2-4 are fast and come out consistent the first time.

## Goal

Produce a documented visual identity and a kit of reusable Excalidraw skeleton
templates, so that:

- every future book diagram is on-brand and consistent without re-deciding style
- SP2-4 reduce to "copy a skeleton, fill the text, render"
- the book reads as visually **distinctive** and **defensible**

## Non-goals

- Restyling the 14 existing diagrams (they stay as-is)
- Building any content figures — that is SP2, SP3, SP4
- Touching `website/` — SP4 owns the interactive index; SP2 wires inline figures
- Writing a diagram generator script or templating layer (the skill forbids it;
  templates are real files you copy)

## Decisions locked during brainstorm

1. **Identity home — both.** Enrich the global skill palette generically *and*
   add a book-local style guide that specializes it.
2. **Rebrand degree — formalize + signature accent.** Keep the working semantic
   colors; add a distinctive signature; do not restyle existing diagrams.
3. **Approach — guide + skeleton files.** Templates are real `.excalidraw`
   files, not inline JSON snippets.

## Design

### Part A — Global skill palette enrichment

Rewrite `~/.claude/skills/excalidraw-diagram/references/color-palette.md` to be
richer and better-documented. Generic only — nothing book-specific.

Changes:
- Give every semantic shape a **fill / stroke / on-fill-text triplet** (today
  only fill + stroke are listed; text color is left implicit).
- Add a **Muted / Transient** row (amber `#fef3c7` / `#b45309`) as distinct from
  Decision, since the 14 diagrams needed a "neither good nor bad, just fading"
  category.
- Formalize the **evidence-card conventions** the diagrams already use:
  card background `#1e293b`, plain code `#e2e8f0`, "before/naive" code
  `#fca5a5`, "after/engineered" code `#86efac`, path/dir text `#4ade80`,
  JSON/data `#22c55e`.
- Add **marker & badge colors** (number badges, dots) and **connector styles**
  (solid arrows, dashed governance arrows, dotted leader lines `#cbd5e1`).
- Each entry documents *when to use it*.

This is a strict superset of the current palette — existing diagrams remain
valid.

### Part B — Book style guide: `diagrams/STYLE.md`

The book-specific specialization. Sections:

1. **Palette mapping.** trust = blue (`#3b82f6` family), dependable = green
   (`#047857` family), naive/before = red (`#dc2626` family), transient = amber
   (`#b45309` family), AI/control plane = purple (`#6d28d9` family), evidence =
   dark cards. Each maps a book concept to the global palette's semantic slot.
2. **Signature mark.** A thin two-segment rule centered under every diagram
   title: left half `#3b82f6` (blue — copilot), right half `#047857` (green —
   colleague), `strokeWidth: 3`, ~220px total (two `line` elements, ~110px
   each). Encodes the book's arc. Applies to **new** diagrams (SP2-4); the 14
   existing diagrams are not retrofitted.
3. **Title system.** eyebrow (`CHAPTER N` or section label, 13-14px, slate,
   uppercase, tracked) → title (34-44px, `#1e40af`) → signature mark → role
   line (14-15px, slate). Standard top-of-diagram block.
4. **Citation style.** `— Speaker, Role · corpus video #N`, slate `#475569`.
5. **Evidence-artifact convention.** Real code/config/data only, in dark cards;
   before-code red-tinted, after-code green-tinted, plain code neutral.
6. **Defensibility rules.** Every quantitative claim cites a corpus video #;
   evidence artifacts are real, never fabricated; diagrams must *argue* (each
   shape mirrors its concept), not decorate.
7. **Template catalog.** Index of the six templates with a one-line "when to
   use" each, pointing at `diagrams/templates/`.

### Part C — Template kit: `diagrams/templates/`

Six skeleton `.excalidraw` files. Each is a real, render-valid file with
placeholder text (`[TITLE]`, `[claim 1]`, etc.) that you copy and fill.

| File | Purpose | Origin |
|---|---|---|
| `chapter-card.excalidraw` | full-page before→after chapter diagram | cleaned skeleton of the ch2-10 layout |
| `inline-figure.excalidraw` | small (~760×460) single-idea section figure | **new — designed in SP1** |
| `concept-card.excalidraw` | standalone concept explainer (~900×620) | **new — designed in SP1** |
| `layered-stack.excalidraw` | "X is built of layers" | cleaned skeleton of `03-scaffolding-stack` |
| `flow-pipeline.excalidraw` | processes / pipelines | cleaned skeleton of `02-autoresearch-machine` |
| `relationship-map.excalidraw` | nodes + edges (graphs, maps) | cleaned skeleton of `04-theme-corpus-map` |

**New template — `inline-figure`** (the key SP2 enabler): canvas ~760×460.
Layout: a compact title strip (eyebrow + short title + signature mark), a
central visual zone (~720×300) left open for the single idea, an optional
one-line caption + citation at the bottom. Small enough to sit at a chapter
section break.

**New template — `concept-card`** (the key SP3 enabler): canvas ~900×620.
Layout: concept name (large) + one-line definition; a "how it works" mini-visual
zone (~860×280); a concrete example in a dark evidence card; an
`appears in: ch X, Y` footer + citation.

The four non-new templates are produced by copying the cleanest existing
diagram, stripping its content to placeholders, and applying Part A/B styling.

## Success criteria

SP1 is complete when:

1. The global `color-palette.md` is enriched (Part A) and a prior diagram still
   renders unchanged.
2. `diagrams/STYLE.md` exists with all seven sections (Part B).
3. All six skeleton files exist in `diagrams/templates/` and each renders to PNG
   without error.
4. One smoke-test diagram, built by copying `inline-figure.excalidraw` and
   filling placeholder text, renders correctly with the signature mark visible.

## Risks

- **Global palette edit affects other projects.** Mitigated: the enrichment is a
  strict superset — only additions and documentation, no value changes to
  existing semantic slots.
- **Template drift.** If SP2-4 diverge from the templates, the kit loses value.
  Mitigated: STYLE.md is the single source of truth; templates reference it.
