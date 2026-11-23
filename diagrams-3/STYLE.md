# Diagram Style Guide — Third Book (*The Shape of the Work*)

Book 3's visual identity. It uses the same method as `diagrams/STYLE.md` (book 1) and
`diagrams-2/STYLE.md` (book 2): one Excalidraw file per figure, and one shape per
concept. The palette is different, so the three books read as related but distinct. The
signature colours come from `docs/superpowers/specs/2026-11-15-third-book-design.md`,
Q6: slate `#475569` → orange `#c2410c`.

> The same rule as books 1 and 2 applies: **a diagram argues; it does not decorate.**

## 1 · Palette

Every hex value below differs from book 1's and book 2's semantic slots. The
conventions carry over: red means warning or naive, and dark means evidence.

| Book concept | Slot | Fill | Stroke | Text |
|---|---|---|---|---|
| Naive / the "before" / a gate that cannot fail | Warning | `#fbe0e0` | `#b42318` | heading `#b42318` · body `#7a1a12` |
| Engineered / the "after" / a gate that can fail | Engineered (slate) | `#e6ebf1` | `#3f4c5f` | heading `#3f4c5f` · body `#1f2a3a` |
| Claim bubbles / "what this chapter argues" | Argument (orange) | `#ea580c` | `#9a3412` | `#ffffff` |
| Evidence (specs, diffs, logs, CI output) | Evidence card | `#1f1b17` | `#4a3f35` | header `#fdba74` · body `#f5ede4` |
| Human in the loop (reviewer, author, approver) | Human | `#fff1e6` | `#c2410c` | `#7c2d12` |

**Why:**
- **Orange is the argument.** It is book 3's signature hue, so it marks what the chapter claims. A brighter shade (`#ea580c`) keeps it apart from book 1's `#c2410c` "Start" stroke.
- **Slate is the engineered state.** Book 3 is about process, and a working process looks plain: specs, gates and plans. Success here is calm, not green.
- **"Human" is a book 3 slot.** Books 1 and 2 do not have one. Book 3's argument turns on where the human stands: intent, review and approval. That needs its own colour, and pale orange ties it to the argument.

The grey UI and citation colours are shared with books 1 and 2: `#64748b` eyebrow, `#94a3b8` muted, `#475569` citation, `#cbd5e1` quote rule.

## 2 · Signature mark

A thin two-segment rule sits under the title, at `y = title bottom + ~10px`:
- left segment: ≈110 px, stroke `#475569` (slate)
- right segment: ≈110 px, stroke `#c2410c` (orange)
- both: `strokeWidth: 3`, `roughness: 0`

## 3 · Title system

The title system has an eyebrow, a title, the signature mark and a role line, the same structure as books 1 and 2.
- **Title colour:** `#2e3a4b`.
- **Eyebrow text:** `BOOK 3 · CHAPTER N · HOW IT WORKS`, or `… · THE ARGUMENT` for openers.

## 4 · Motifs

- **The pipeline of artefacts:** intent → spec → plan → code → gates → review → live. Most book 3 mechanisms are a stage in this pipeline. Show which stage a figure is about by highlighting it on the full line.
- **A gate that can fail vs one that cannot:** a comparison panel. The naive gate (warning) always passes. The engineered gate (slate) has a red path that it actually takes.

## 5 · Everything else

Evidence cards, citation style and defensibility follow `diagrams/STYLE.md` §4–6. Each figure carries a sources line taken from its `sources` field in `diagrams-3/figures.json`. Render, resize and quantise exactly as book 2 does (`docs/superpowers/specs/2026-11-23-second-book-parity-design.md`, Drawing).
