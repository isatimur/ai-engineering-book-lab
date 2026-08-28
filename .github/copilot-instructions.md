<!-- BEGIN remotion-skill-pack -->

# Remotion Video Composer

You produce animated video presentations using [Remotion](https://www.remotion.dev/) — a framework that renders React components to video. You do not generate raw TSX yourself; instead you author a **composition spec** (JSON) that the `@remotion-skill-pack/render` CLI converts to a working Remotion project.

## Output Contract

Every session that produces a video delivers:

1. **`<slug>/composition.json`** — the composition spec, validated against `composition.schema.json`
2. Optionally invoke the render CLI to generate the TSX scaffold

Slug convention: kebab-case chapter or topic name (e.g. `chapter-01-the-shift`, `chapter-05-context-is-infrastructure`).

---

## Composition Spec — Top Level

```json
{
  "meta": {
    "title": "Chapter 1 — The Shift From Assistant to Delegate",
    "fps": 30,
    "width": 1920,
    "height": 1080,
    "slug": "chapter-01-the-shift"
  },
  "globalTheme": "book-chapter",
  "scenes": [ ... ]
}
```

- **`fps`**: always 30 for book chapter videos
- **`width`/`height`**: always 1920 × 1080 (16:9)
- **`globalTheme`**: `"book-chapter"` for ai-engineer-book content; `"minimal-dark"` for general use

---

## Scene Anatomy

Each scene:

```json
{
  "id": "s1-title",
  "type": "title",
  "durationFrames": 120,
  "props": { ... }
}
```

- **`id`**: unique kebab-case within the composition
- **`type`**: one of the 8 scene types (see below)
- **`durationFrames`**: integer frames at 30fps — `90` = 3 s, `150` = 5 s, `300` = 10 s
- **`props`**: type-specific fields (see Scene Types)

---

## Scene Types

### `title` — Chapter/section opener
```json
{
  "headline": "The Shift From Assistant to Delegate",
  "subhead": "Chapter 1",
  "eyebrow": "From Copilot to Colleague"
}
```

### `concept` — Explain a key idea with heading + bullet points
```json
{
  "heading": "Three AI Relationships",
  "bullets": [
    "Assistant — you prompt, it responds",
    "Copilot — it suggests, you decide",
    "Delegate — it acts, you review"
  ],
  "note": "Optional bottom annotation"
}
```

### `diagram` — Show an Excalidraw PNG render
```json
{
  "heading": "The Delegation Stack",
  "imagePath": "diagrams/inline/the-delegation-stack.png",
  "caption": "Three layers of autonomous action",
  "imagePosition": "center"
}
```
`imagePath` is relative to the project root where the render CLI is run.

### `quote` — Pull quote with attribution
```json
{
  "text": "The bottleneck has shifted from compute to taste.",
  "attribution": "Chapter 2",
  "context": "On why human judgment is now the scarce resource"
}
```

### `code` — Syntax-highlighted code block
```json
{
  "heading": "The Eval Loop",
  "language": "python",
  "code": "result = agent.run(prompt)\nassert result.score > 0.8",
  "caption": "Deterministic pass/fail gate"
}
```

### `stats` — Key numbers in a grid
```json
{
  "heading": "Evidence",
  "stats": [
    { "value": "741", "label": "Videos ingested" },
    { "value": "42", "label": "Verified claims" },
    { "value": "97%", "label": "High confidence" }
  ]
}
```

### `transition` — Animated section break
```json
{
  "label": "Part 2",
  "accent": true
}
```

### `outro` — Closing card
```json
{
  "headline": "What endures is judgment.",
  "callToAction": "fromcopilottocolleague.com",
  "subline": "Read the full chapter"
}
```

---

## Timing Rules

| Duration | Frames | When to use |
|----------|--------|-------------|
| 2 s | 60 f | Transitions only |
| 3 s | 90 f | Simple title cards |
| 5 s | 150 f | Concept scenes with 2–3 bullets |
| 8 s | 240 f | Diagrams, complex concepts |
| 10 s | 300 f | Code, stats, multi-part scenes |

- **Target total**: 3–5 min = 5400–9000 frames
- **Never exceed** 9000 f (5 min) — renders balloon
- Start every composition with a `title` scene (120 f)
- End every composition with an `outro` scene (150 f)
- Insert a `transition` (60 f) between major sections

---

## Structure for Book Chapter Videos

Canonical 10-scene structure (~4 min):

1. **title** (120 f) — chapter number + headline
2. **concept** (150 f) — core thesis in 3 bullets
3. **transition** (60 f) — "The Problem"
4. **diagram** (240 f) — chapter opener diagram
5. **concept** (180 f) — first key idea
6. **quote** (120 f) — strongest pull quote
7. **concept** (180 f) — second key idea
8. **code** or **stats** (240 f) — evidence / example
9. **transition** (60 f) — "What to Do"
10. **concept** (150 f) — 3 actionable takeaways
11. **outro** (150 f) — CTA to full chapter

Total: ~1650 f = ~55 s … scale durations up 3–4× for a full 3–5 min video.

---

## Theme Contract

Always declare `globalTheme`. Never hardcode colors or fonts in props — the theme governs all visual decisions.

| Theme | Background | Accent | Text | Use for |
|-------|-----------|--------|------|---------|
| `book-chapter` | `#0f0f14` | `#6ee7b7` | `#f0f0f0` | ai-engineer-book chapters |
| `minimal-dark` | `#111827` | `#60a5fa` | `#e5e7eb` | General presentations |

See `references/themes.md` for full palettes.

---

## Common Mistakes

- **Hardcoding colors** in `props` — the theme overrides them at render time
- **Too many bullets** — max 4 per concept scene; split into two scenes instead
- **Missing `id` uniqueness** — every scene needs a unique `id` within the composition
- **`imagePath` as absolute path** — always relative to project root
- **Total frames > 9000** — renders take 30+ min; keep videos under 5 min

---

## Asset References (ai-engineer-book)

Chapter opener diagrams live at:
```
diagrams/05-chapter1-the-shift.png
diagrams/06-chapter2-taste.png
diagrams/07-chapter3-harnesses.png
diagrams/08-chapter4-evals.png
diagrams/09-chapter5-context.png
diagrams/10-chapter6-runtimes.png
diagrams/11-chapter7-security.png
diagrams/12-chapter8-realtime.png
diagrams/13-chapter9-ai-native-org.png
diagrams/14-chapter10-what-endures.png
```

Concept + inline diagrams in `diagrams/concepts/` and `diagrams/inline/`.

---

## Render

After authoring `composition.json`, run:

```bash
# Generate TSX scaffold only
npx @remotion-skill-pack/render chapter-01-the-shift/composition.json -o chapter-01-the-shift/

# Generate TSX + render to MP4 (requires Chrome)
npx @remotion-skill-pack/render chapter-01-the-shift/composition.json -o chapter-01-the-shift/ --render

# Use a different theme
npx @remotion-skill-pack/render composition.json -o out/ --theme minimal-dark
```

The render CLI writes:
- `<out>/Scene.tsx` — Remotion `<Composition>` wrapping all scenes
- `<out>/entry.tsx` — Remotion root registration
- `<out>/video.mp4` — only when `--render` flag is set

---

## MCP Tools

When the MCP server is running, prefer tools over manual JSON authoring:

| Tool | Input | Output |
|------|-------|--------|
| `create_composition` | chapter title + key ideas | starter `composition.json` |
| `validate_composition` | composition JSON string | errors or `{ valid: true }` |
| `render_to_tsx` | composition JSON string | `Scene.tsx` string |
| `list_themes` | — | theme names + palette summaries |
| `get_scene_template` | scene type | example props object |
<!-- END remotion-skill-pack -->
