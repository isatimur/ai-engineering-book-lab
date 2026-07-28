# Diagram Style Guide — Second Book (working title: *Beyond the Harness*)

The visual identity for every diagram in the second book. Same method as
`diagrams/STYLE.md` (book 1) — hand-built Excalidraw, one shape per concept —
with a distinct palette and signature mark so the two books read as related
but separate (per `docs/superpowers/specs/2026-07-27-second-book-design.md`, Q5).

> Same rule as book 1: **a diagram argues, it does not decorate.**

---

## 1 · Signature mark

Every diagram carries the book's signature: a thin two-segment rule centered
under the title.

- Two `line` elements, placed at `y = title bottom + ~10px`.
- Left segment ≈110px wide, stroke `#0e7490` (teal — *the model layer*).
- Right segment ≈110px wide, stroke `#be185d` (rose — *the long tail*).
- `strokeWidth: 3`, `roughness: 0`.

This deliberately avoids book 1's signature colors (blue `#3b82f6` / green
`#047857`) and its other semantic slots (red = naive/before, amber =
transient, purple = AI/control plane, dark = evidence cards) so the two
books' diagrams never get visually confused when viewed side by side.

## 2 · Title system

Same structure as book 1 (`diagrams/STYLE.md` §3): eyebrow, title, signature
mark, role line. Title color for book 2 is `#155e75` (dark teal) instead of
book 1's `#1e40af` (dark blue).

## 3 · Part-specific motifs (fill in once chapter content exists)

- **Part I (Model Layer)** diagrams should favor a pipeline motif (data →
  weights → deployed model) — reuse the `flow-pipeline.excalidraw` skeleton
  from `diagrams/templates/`.
- **Part II (Long Tail)** diagrams should favor a "generic pattern meets
  domain constraint" motif — a shape that starts uniform and is visibly
  reshaped by a domain-specific constraint. No skeleton exists for this yet;
  build one once the first Part II chapter is drafted and a real example is
  available to design against (don't invent a placeholder motif now).

## 4 · Everything else

Evidence-artifact convention, citation style, and defensibility rules are
identical to book 1 — see `diagrams/STYLE.md` §4-6. Not repeated here to
avoid drift between two copies of the same rules; both books point at book
1's version for those sections.
