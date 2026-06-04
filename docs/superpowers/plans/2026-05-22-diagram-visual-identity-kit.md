# Diagram Visual Identity Kit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable visual identity and template kit so every future *From Copilot to Colleague* diagram is on-brand, consistent, and fast to produce.

**Architecture:** Two layers. (A) The global `excalidraw-diagram` skill palette is enriched generically. (B) The book repo gains `diagrams/STYLE.md` (book identity) and `diagrams/templates/` (six copy-and-fill skeleton `.excalidraw` files). Diagrams are hand-authored JSON; no generator.

**Tech Stack:** Excalidraw JSON (schema v2, `fontFamily: 3`), the `excalidraw-diagram` skill renderer (`render_excalidraw.py`, Playwright + Chromium).

**Project convention:** Do NOT run `git commit` — the user commits manually. Each task ends with a render/verify step instead of a commit.

**Spec:** `docs/superpowers/specs/2026-05-22-diagram-visual-identity-kit-design.md`

---

### Task 1: Enrich the global skill palette

**Files:**
- Modify: `~/.claude/skills/excalidraw-diagram/references/color-palette.md`

- [ ] **Step 1: Read the current file** to preserve every existing value.

- [ ] **Step 2: Rewrite as a strict superset.** Keep every existing semantic row and value. Add:
  - An **on-fill text color** column to the Shape Colors table (e.g. Primary → text `#374151` on light, `#ffffff` on dark).
  - A **Muted / Transient** row: fill `#fef3c7`, stroke `#b45309`, text `#92400e` — "neither good nor bad, just fading; use for transient/background categories."
  - An **Evidence Artifact** section formalizing: card background `#1e293b`, card stroke `#334155`, plain code `#e2e8f0`, before/naive code `#fca5a5`, after/engineered code `#86efac`, path/dir text `#4ade80`, JSON/data `#22c55e`.
  - A **Markers & Badges** row: number badge fill `#3b82f6` / stroke `#1e3a5f` / text `#ffffff`; dot marker `#3b82f6`.
  - A **Connectors** section: data-flow arrow = source semantic stroke; governance arrow = `#6d28d9` dashed; leader line = `#cbd5e1` dotted.
  - A one-line "use for" note on every entry.

- [ ] **Step 3: Verify no regression.** Re-render an existing diagram:

```bash
cd ~/.claude/skills/excalidraw-diagram/references
uv run python render_excalidraw.py ~/Dev/LifeOS/knowledge-bases/ai-engineer-book/diagrams/03-scaffolding-stack.excalidraw
```
Expected: PNG path printed, no error. (The palette file is reference text; this confirms the renderer is unaffected.)

---

### Task 2: Write the book style guide

**Files:**
- Create: `~/Dev/LifeOS/knowledge-bases/ai-engineer-book/diagrams/STYLE.md`

- [ ] **Step 1: Write `STYLE.md`** with seven sections (per spec Part B):
  1. **Palette mapping** — table: book concept → global semantic slot → hex. trust=blue `#3b82f6`/`#1e3a5f`; dependable=green `#047857`/`#d1fae5`; naive/before=red `#dc2626`/`#fee2e2`; transient=amber `#b45309`/`#fef3c7`; AI/control=purple `#6d28d9`/`#ddd6fe`; evidence=dark `#1e293b`.
  2. **Signature mark** — two `line` elements centered under the title, y = title bottom + ~10px: left segment `#3b82f6` ~110px, right segment `#047857` ~110px, `strokeWidth: 3`, `roughness: 0`. Encodes *Copilot → Colleague*. New diagrams only.
  3. **Title system** — eyebrow (`CHAPTER N` / section label, 13-14px, `#64748b`, uppercase) → title (34-44px, `#1e40af`) → signature mark → role line (14-15px, `#64748b`).
  4. **Citation style** — `— Speaker, Role · corpus video #N`, `#475569`, 14px.
  5. **Evidence-artifact convention** — dark cards `#1e293b`; before-code `#fca5a5`, after-code `#86efac`, plain `#e2e8f0`; real code/config/data only.
  6. **Defensibility rules** — every quantitative claim cites a corpus video #; evidence artifacts are real, never fabricated; each shape must mirror its concept (argue, not decorate).
  7. **Template catalog** — table of the six templates in `templates/` with a one-line "when to use" each.

- [ ] **Step 2: Verify** the file exists and every section is filled (no `TBD`).

```bash
grep -c "^## " ~/Dev/LifeOS/knowledge-bases/ai-engineer-book/diagrams/STYLE.md
```
Expected: `7` or more.

---

### Task 3: Build the `inline-figure` skeleton (new design)

**Files:**
- Create: `~/Dev/LifeOS/knowledge-bases/ai-engineer-book/diagrams/templates/inline-figure.excalidraw`

- [ ] **Step 1: Author the skeleton.** Canvas ~760×460. Elements:
  - eyebrow text `[SECTION LABEL]` at (40, 30), 13px, `#64748b`.
  - title text `[Figure title]` at (40, 50), 24px, `#1e40af`.
  - signature mark: two `line` elements at y≈86 — `#3b82f6` from x40→150, `#047857` from x150→260, strokeWidth 3.
  - a dashed placeholder `rectangle` "central visual zone" at (40, 110) size 680×270, stroke `#cbd5e1` dashed, no fill, with a centered free-text note `[ central visual zone — the single idea ]`.
  - caption text `[one-line caption]` at (40, 396), 13px, `#475569`.
  - citation text `— [Speaker] · corpus video #[N]` at (40, 420), 12px, `#64748b`.
  - All `fontFamily: 3`, `roughness: 0`, `opacity: 100`. Wrapper: `type: excalidraw`, `version: 2`, `appState` white bg.

- [ ] **Step 2: Render to verify it is valid.**

```bash
cd ~/.claude/skills/excalidraw-diagram/references
uv run python render_excalidraw.py ~/Dev/LifeOS/knowledge-bases/ai-engineer-book/diagrams/templates/inline-figure.excalidraw
```
Expected: PNG path printed, no error.

- [ ] **Step 3: Read the PNG** and confirm: title, signature underline (blue→green), dashed visual zone, caption, citation all visible and non-overlapping.

---

### Task 4: Build the `concept-card` skeleton (new design)

**Files:**
- Create: `~/Dev/LifeOS/knowledge-bases/ai-engineer-book/diagrams/templates/concept-card.excalidraw`

- [ ] **Step 1: Author the skeleton.** Canvas ~900×620. Elements:
  - eyebrow text `CONCEPT` at (50, 36), 13px, `#64748b`.
  - concept name `[Concept Name]` at (50, 56), 32px, `#1e40af`.
  - signature mark: two `line` elements at y≈100 — `#3b82f6` x50→160, `#047857` x160→270, strokeWidth 3.
  - definition text `[One-line definition of the concept.]` at (50, 118), 15px, `#374151`.
  - section label `HOW IT WORKS` at (50, 160), 12px, `#64748b`.
  - dashed placeholder `rectangle` "mini-visual zone" at (50, 182) size 800×260, stroke `#cbd5e1` dashed, centered note `[ how-it-works mini visual ]`.
  - section label `EXAMPLE` at (50, 462), 12px, `#64748b`.
  - dark evidence `rectangle` at (50, 480) size 800×80, fill `#1e293b`, stroke `#334155`; free-text `[ concrete example — real code / config / data ]` inside, 12px `#e2e8f0`.
  - footer text `Appears in: ch [X], ch [Y]   ·   — [Speaker] · corpus video #[N]` at (50, 578), 12px, `#64748b`.
  - All `fontFamily: 3`, `roughness: 0`, `opacity: 100`.

- [ ] **Step 2: Render to verify.**

```bash
cd ~/.claude/skills/excalidraw-diagram/references
uv run python render_excalidraw.py ~/Dev/LifeOS/knowledge-bases/ai-engineer-book/diagrams/templates/concept-card.excalidraw
```
Expected: PNG path printed, no error.

- [ ] **Step 3: Read the PNG** and confirm all zones render cleanly, no overlap, no text overflow.

---

### Task 5: Derive the four skeletons from existing diagrams

**Files:**
- Create: `diagrams/templates/chapter-card.excalidraw` (from `diagrams/06-chapter2-taste.excalidraw`)
- Create: `diagrams/templates/layered-stack.excalidraw` (from `diagrams/03-scaffolding-stack.excalidraw`)
- Create: `diagrams/templates/flow-pipeline.excalidraw` (from `diagrams/02-autoresearch-machine.excalidraw`)
- Create: `diagrams/templates/relationship-map.excalidraw` (from `diagrams/04-theme-corpus-map.excalidraw`)

- [ ] **Step 1: For each, copy the source diagram** to the template path, then strip content to placeholders: replace concrete titles/labels/claims/code/quotes with bracketed placeholders (`[Chapter title]`, `[claim 1]`, `[before-code sample]`, `[Speaker · video #N]`, etc.), keeping all geometry, colors, and structure intact. Keep counts generic (e.g. chapter-card keeps 4 claim badges; layered-stack keeps a base + 5 layers; relationship-map keeps ~6 nodes).

- [ ] **Step 2: Add the signature mark** to `chapter-card`, `layered-stack`, and `flow-pipeline` (two `line` segments under the title per STYLE.md). `relationship-map` and `chapter-card` already have title blocks — place the mark consistently.

- [ ] **Step 3: Render all four to verify validity.**

```bash
cd ~/.claude/skills/excalidraw-diagram/references
for f in chapter-card layered-stack flow-pipeline relationship-map; do
  uv run python render_excalidraw.py ~/Dev/LifeOS/knowledge-bases/ai-engineer-book/diagrams/templates/$f.excalidraw
done
```
Expected: four PNG paths printed, no errors.

- [ ] **Step 4: Read each PNG** and confirm the skeleton is clean — placeholders visible, geometry intact, signature mark present.

---

### Task 6: Smoke-test + register the kit

**Files:**
- Create (temp): `/tmp/sp1-smoke.excalidraw`
- Modify: `~/Dev/LifeOS/knowledge-bases/ai-engineer-book/diagrams/README.md`

- [ ] **Step 1: Smoke-test the kit.** Copy `templates/inline-figure.excalidraw` to `/tmp/sp1-smoke.excalidraw`, fill the placeholders with a real example (e.g. section label `THE HARNESS`, title `What an AGENTS.md gives an agent`, a simple central visual, a real caption + citation), and render it.

```bash
cd ~/.claude/skills/excalidraw-diagram/references
uv run python render_excalidraw.py /tmp/sp1-smoke.excalidraw
```
Expected: PNG path printed.

- [ ] **Step 2: Read the smoke-test PNG** and confirm it renders correctly with the signature mark visible — this proves the template is usable for SP2.

- [ ] **Step 3: Add a "Style & templates" section** to `diagrams/README.md` (near "How these were made") linking `STYLE.md` and listing the six templates in `templates/`.

- [ ] **Step 4: Clean up** the smoke-test file: `rm /tmp/sp1-smoke.excalidraw /tmp/sp1-smoke.png`.

---

## Self-Review

**Spec coverage:**
- Part A (global palette enrichment) → Task 1 ✓
- Part B (`STYLE.md`, 7 sections) → Task 2 ✓
- Part C (6 templates: inline-figure, concept-card → Tasks 3-4; chapter-card, layered-stack, flow-pipeline, relationship-map → Task 5) ✓
- Success criteria (palette enriched + no regression → T1; STYLE.md → T2; 6 skeletons render → T3-5; inline-figure smoke-test → T6) ✓

**Placeholder scan:** Bracketed `[...]` tokens are intentional template placeholders, not plan gaps. No `TBD`/`TODO` in the plan itself.

**Type consistency:** File paths, the six template names, and the signature-mark spec (two line segments, `#3b82f6` + `#047857`, strokeWidth 3) are identical across Tasks 2-6.
