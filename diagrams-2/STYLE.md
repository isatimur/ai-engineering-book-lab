# Diagram Style Guide — Second Book (working title: *Beyond the Harness*)

The visual identity for every diagram in the second book. Same method as
`diagrams/STYLE.md` (book 1) — hand-built Excalidraw, one shape per concept —
with a distinct palette and signature mark so the two books read as related
but separate (per `docs/superpowers/specs/2026-07-27-second-book-design.md`, Q5).

> Same rule as book 1: **a diagram argues, it does not decorate.**

---

## 1 · Palette mapping

Book 2 gets its own hex values for every semantic slot — none of the fills,
strokes, or text colors below are equal to book 1's (compare against
`diagrams/STYLE.md` §1). The universal *conventions* book 1 established
(red reads as warning/naive, dark reads as evidence, signature colors can
double as a semantic slot) carry over; the specific colors do not.

| Book concept | Semantic slot | Fill | Stroke | Text |
|--------------|---------------|------|--------|------|
| Naive / the "before" / failure | Warning | `#f5d5d0` | `#a8412e` | heading/label/takeaway `#a8412e` · subtitle `#7a2f20` · body `#4d1d13` |
| Engineered / the "after" / desired end state | Success (teal) | `#ccfbf1` | `#0f766e` | heading/label/takeaway `#0f766e` · subtitle/body `#134e4a` |
| Claim bubbles / "what this chapter argues" | Argument (rose) | `#e11d48` | `#881337` | number `#ffffff` · heading `#9f1239` |
| Evidence (code/config/data cards) | Evidence card | `#0b2b2e` | `#134e4a` | see `diagrams/STYLE.md` §5 for structural convention |
| Naive-panel code accent (light) | — | — | `#e8a79c` | — |
| Engineered-panel code accent (light) | — | — | `#5eead4` | — |

**Reasoning:**

- **Warning stays red** — red-for-warning is a near-universal convention
  worth keeping even though book 1 already uses it; the fix is a different
  shade (`#a8412e`/`#f5d5d0` — a brick/pomegranate red), not a different
  hue. It is not tied to either signature color, since "naive" is a
  per-diagram narrative state, not a Part I/II identity marker.
- **"After/desired" ties to the teal signature half deliberately.** Book 1's
  own signature mark (`diagrams/STYLE.md` §2) reuses its exact Primary/Success
  hexes (`#3b82f6`/`#047857`) as the signature stroke colors — signature
  colors doing double duty as a semantic slot is established book-1
  precedent, not a defect. Book 2 follows the same pattern: the teal
  signature half (`#0e7490`, "the model layer") reappears, at a distinct
  shade (`#0f766e`/`#ccfbf1`), as the "engineered/desired" slot.
- **Claim bubbles reuse the rose signature half the same way** — a different
  shade of rose (`#e11d48`/`#881337`) than the signature stroke (`#be185d`),
  giving the book's two identity hues one semantic job each (teal → positive
  outcome, rose → the argument itself) instead of only ever appearing in the
  title-area signature mark.
- **Evidence cards stay dark, but book-2-dark**, not book 1's exact slate
  (`#1e293b`/`#334155`) — a dark teal-charcoal (`#0b2b2e`/`#134e4a`) that
  echoes the same teal identity rather than a neutral gray.

**Deliberately shared, not book-2-specific:** the generic UI/citation grays
(`#64748b` eyebrow/role text, `#94a3b8` muted subtext, `#374151` claim-bubble
body text, `#cbd5e1` quote rule, `#475569` citation/quote text) are inherited
unchanged from book 1's title-system and citation-style conventions (§2 and
§4 below say those sections are shared verbatim). `#64748b` and `#cbd5e1`
happen to also be book 1's Neutral/"excluded" slot hex values, but here they
are used only as generic UI gray (eyebrow, role line, divider rule) under the
explicitly-shared title/citation conventions — not as a re-instantiation of
book 1's Neutral semantic slot, which book 2 does not define. `#ffffff` and
`transparent` are universal and unconstrained by either book's palette.

## 2 · Signature mark

Every diagram carries the book's signature: a thin two-segment rule centered
under the title.

- Two `line` elements, placed at `y = title bottom + ~10px`.
- Left segment ≈110px wide, stroke `#0e7490` (teal — *the model layer*).
- Right segment ≈110px wide, stroke `#be185d` (rose — *the long tail*).
- `strokeWidth: 3`, `roughness: 0`.

Book 2 does not reuse book 1's exact signature hexes (blue `#3b82f6` / green
`#047857`) or any of book 1's exact semantic-slot hex values (§1 table above
has the book-2 equivalents) — every fill/stroke a book-2 diagram uses is a
distinct value from book 1's, even where the underlying *convention* (red =
warning, dark = evidence) is intentionally kept. This is what lets the two
books' diagrams read as related but never be mistaken for one another.

## 3 · Title system

Same structure as book 1 (`diagrams/STYLE.md` §3): eyebrow, title, signature
mark, role line. Title color for book 2 is `#155e75` (dark teal) instead of
book 1's `#1e40af` (dark blue). Eyebrow and role-line gray (`#64748b`) are
unchanged from book 1 — see the "deliberately shared" note in §1.

## 4 · Part-specific motifs (fill in once chapter content exists)

- **Part I (Model Layer)** diagrams should favor a pipeline motif (data →
  weights → deployed model) — reuse the `flow-pipeline.excalidraw` skeleton
  from `diagrams/templates/`.
- **Part II (Long Tail)** diagrams should favor a "generic pattern meets
  domain constraint" motif — a shape that starts uniform and is visibly
  reshaped by a domain-specific constraint. No skeleton exists for this yet;
  build one once the first Part II chapter is drafted and a real example is
  available to design against (don't invent a placeholder motif now).

## 5 · Template catalog

`diagrams-2/templates/chapter-card.excalidraw` is currently the **only**
adapted skeleton. Its structure (eyebrow/title/signature/role, before/after
panel pair, evidence cards, claim bubbles, quote block) is ready to use and
carries the book-2 palette from §1. Its **body content is not** — the claim
bubbles, panel headings/body text, code snippets, and quote are inherited
book-1 *sample* content (vibe-coding-vs-vibe-engineering, from book 1's
actual chapter 2) copied over purely to prove the skeleton renders. Every
piece of that text must be replaced wholesale with real book-2 chapter
content before this template is used to build an actual diagram — it is a
skeleton to adapt, not a ready-to-use example.

## 6 · Everything else

Evidence-artifact convention, citation style, and defensibility rules are
identical to book 1 — see `diagrams/STYLE.md` §4-6. Not repeated here to
avoid drift between two copies of the same rules; both books point at book
1's version for those sections. (Colors are the one exception: book 2's
evidence-card colors are its own — §1 above — even though the structural
convention for evidence cards is shared.)
