# Diagram Style Guide — *From Copilot to Colleague*

The visual identity for every diagram in this book. It specializes the generic
`excalidraw-diagram` skill palette for *From Copilot to Colleague*. Read this
before building any new diagram; copy a skeleton from [`templates/`](templates/).

> One rule above all: **a diagram argues, it does not decorate.** Every shape
> mirrors the concept it represents. If you removed the text, the structure
> alone should still carry the point.

---

## 1 · Palette mapping

The book's concepts map onto the skill's semantic slots. Use these — do not
invent colors.

| Book concept | Semantic slot | Fill | Stroke | Text on fill |
|--------------|---------------|------|--------|--------------|
| Trust / the main subject | Primary | `#3b82f6` · `#93c5fd` light | `#1e3a5f` | `#ffffff` / `#1e3a5f` |
| Dependable / the desired end state | End/Success | `#a7f3d0` · `#d1fae5` light | `#047857` | `#065f46` |
| Naive / the "before" / failure | Warning | `#fee2e2` | `#dc2626` | `#991b1b` |
| Transient / "churns" / background | Muted | `#fef3c7` | `#b45309` | `#92400e` |
| The model / AI / control plane | AI/LLM | `#ddd6fe` | `#6d28d9` | `#4c1d95` |
| Source / input | Start | `#fed7aa` | `#c2410c` | `#7c2d12` |
| Excluded / "not a chapter" | Neutral | `#cbd5e1` | `#64748b` | `#334155` |
| Evidence (code/config/data) | Evidence card | `#1e293b` | `#334155` | see §5 |

The recurring **before → after** pair is Warning red (left, the naive way) →
Success green (right, the engineered way). The transition arrow is Start orange
`#c2410c`.

---

## 2 · Signature mark

Every **new** diagram carries the book's signature: a thin two-segment rule
centered under the title.

- Two `line` elements, placed at `y = title bottom + ~10px`.
- Left segment ≈110px wide, stroke `#3b82f6` (blue — *copilot*).
- Right segment ≈110px wide, stroke `#047857` (green — *colleague*).
- `strokeWidth: 3`, `roughness: 0`.

It encodes the book's arc — *from Copilot to Colleague* — in two strokes. It is
the one mark that says "this diagram belongs to this book."

The 14 original diagrams predate the mark and are **not** retrofitted.

---

## 3 · Title system

Every diagram opens with the same block, top-centered:

1. **Eyebrow** — `CHAPTER N` or a section label. 13–14px, `#64748b`, uppercase,
   letter-spaced.
2. **Title** — 34–44px, `#1e40af`.
3. **Signature mark** — §2.
4. **Role line** — one sentence on what the diagram is for. 14–15px, `#64748b`.

All text uses `fontFamily: 3` (the code/mono font), `roughness: 0`,
`opacity: 100`. Free-floating text does **not** wrap in the renderer — insert
manual `\n` line breaks.

---

## 4 · Citation style

Every claim or quote that comes from the corpus is attributed:

```
— Speaker, Role · corpus video #N
```

Color `#475569`, ~12–14px. Quotes use curly quotes `“ ”`.

---

## 5 · Evidence-artifact convention

Concrete samples make a diagram defensible. Show real code, config, or data —
never fabricated.

- Sample sits in a dark card: fill `#1e293b`, stroke `#334155`.
- `fontFamily: 3`, ~12px, `lineHeight` 1.5–1.6.
- **Before / naive** code is red-tinted: `#fca5a5`.
- **After / engineered** code is green-tinted: `#86efac`.
- Plain / neutral code: `#e2e8f0`. Paths & identifiers: `#4ade80`.
- Keep lines short (≤ ~70 chars) — the renderer does not wrap.

---

## 6 · Defensibility rules

The book — and its diagrams — must hold up to scrutiny.

1. **Cite everything.** Every quantitative claim, statistic, or quote names its
   corpus video (`#N`). No number without a source.
2. **Real evidence only.** Code, config, and data samples are realistic and
   representative. Never invent an API, a metric, or a result.
3. **Argue, don't decorate.** Each shape, color, and layout choice carries
   meaning. If an element is only decorative, cut it.
4. **Show the tension.** Where the corpus disagrees, show the disagreement —
   the before/after frame exists to make tradeoffs visible, not to flatten them.
5. **One idea per figure.** A diagram that needs a paragraph to explain itself
   is two diagrams.

---

## 7 · Template catalog

Skeletons live in [`templates/`](templates/). Copy one, fill the `[bracketed]`
placeholders, render with the skill renderer.

| Template | When to use |
|----------|-------------|
| `chapter-card.excalidraw` | A chapter's hero diagram — full-page before → after with code samples, claims, and a quote. |
| `inline-figure.excalidraw` | A small figure for a single idea, dropped at a chapter section break. |
| `concept-card.excalidraw` | A standalone explainer for one named concept (glossary entries). |
| `layered-stack.excalidraw` | "X is built of layers" — a base wrapped by stacked layers with side annotations. |
| `flow-pipeline.excalidraw` | A process or pipeline — stacked stages with flow arrows and an optional control rail. |
| `relationship-map.excalidraw` | Nodes and edges — concept graphs, theme maps, reading paths. |

**To render any diagram:**

```bash
cd ~/.claude/skills/excalidraw-diagram/references
uv run python render_excalidraw.py <path-to-file.excalidraw>
```
