# Book Website Rework — Content Placement & Diagrams Integration

**Date:** 2026-05-23
**Status:** Draft (awaiting review)
**Topic surface:** `website/` (the *From Copilot to Colleague* online representation)
**Scope:** Single coherent rework — pull every upstream feature from `isatimur/bookshelf` worth pulling, wire every recently generated diagram into the reader, and re-organize the site into three coherent surfaces.

---

## 1 · Context

`website/` is the online representation of *From Copilot to Colleague*. It is forked from `isatimur/bookshelf` at pinned commit `d8cced91284f6843172d448f95bd59dcb482c0b3` (2026-05-18). Since the pin, upstream has shipped three commits:

| SHA | Date | What |
|---|---|---|
| `f2ac98f` | 2026-05-20 | Update images and add sharing functionality (`ShareModal`, `GLOSSARY`/`GlossaryTerm` mechanism, `FloatingDecorations`, expanded `DemoChapter`, 9 placeholder PNGs) |
| `ce6d228` | 2026-05-22 | Add book catalogue and navigation (`Catalogue.tsx` — 3D spine + cover-flip cinematic, `audio.ts` — scroll feedback) |
| `c2a5909` | 2026-05-22 | Prune catalogue and add footer section |

Independently of upstream, the lab generated **~94 diagrams** in `diagrams/` between 2026-05-21 and 2026-05-22 (14 main + 18 concepts + 60 inline + 2 maps). Only 14 are currently wired into the site (chapter openers). The other ~80 sit on disk unused.

Both threads need to land in one ship moment. A straight `git merge` from upstream would clobber the lab's customizations (`bookChapters.ts`, `ChapterArticle`, `chapterDiagram`, etc., across 1075 lines of customized `App.tsx`). The right approach is **cherry-pick by concept**, not by file.

---

## 2 · Site shape — three surfaces

Three routed surfaces using **wouter** (~2KB; smallest router compatible with the existing `vercel.json` SPA rewrite). React state alone is rejected because it loses bookmarkable URLs; React Router is rejected as overweight for three routes.

| Path | Surface | Purpose |
|---|---|---|
| `/` | **Catalogue** | The book on a shelf. Cinematic spine → cover-flip opens into `/read`. *About the Lab* essay below the shelf. |
| `/visual-guide` | **Visual Guide** | Three narrative sections: **The book at a glance** (4 overview diagrams) → **How to read this book** (2 maps) → **Concepts** (18-diagram grid, deep-linkable by `#concept-<id>`). |
| `/read` | **Reader** | Hero → Chapters 1–10. Each chapter: opener diagram + prose + inline figs at H2 boundaries + glossary terms wired into prose. Cross-links to `/visual-guide` for any concept. |

All three surfaces are hot-linkable. The Reader keeps its current single-scroll long-form character.

---

## 3 · Catalogue surface (`/`)

Adapted from upstream `Catalogue.tsx`. Single-book — `BOOKS` array hard-coded:

```ts
{
  id: 'from-copilot-to-colleague',
  title: 'From Copilot to Colleague',
  subtitle: 'How AI Engineering Turns Models into Dependable Systems',
  author: 'Timur Isachenko',
  coverImage: '/covers/from-copilot-to-colleague.png',
  spineColor: '#1A1A1A',
  category: 'AI Engineering'
}
```

**Adopt from upstream:** 3D spine card, hover-lift transform, cover-flip cinematic open animation (`AnimatePresence` + ~2.3s timing), `scrollAudio.initialize()` invocation on book select.

**Drop from upstream:** multi-book stacking math (`hIndex`-relative `yTranslate` shuffle), `kintsugi` crack overlay (book-specific to a different volume), the `aiEngineerCover` import.

**About the Lab footer** — keep the upstream essay's *structure* (italic intro, bulleted list of what The Method does, bordered "workflow" callout, closing italic line) but rewrite using `CONTEXT.md` vocabulary:

- The headline stays informal: *"I've been running a slightly unusual experiment."*
- Replace *"book in public"* phrasing with explicit *The Lab / The Method / The Manuscript* framing.
- Workflow callout: `videos → claims → source anchors → chapter drafts → public iterations`
- Closing: *"This started as 'let's make better notes.' It's turning into a public experiment in writing, judging, and continuously improving The Method that produces it."*
- Footer copy goes to a new file `src/content/about-the-lab.md` so it can be edited without touching React.

---

## 4 · Visual Guide surface (`/visual-guide`)

Three sections in narrative order. Single-page, scroll-anchored.

### 4.1 Section: *The book at a glance*

Four overview diagrams stacked vertically, each full-bleed with a paragraph caption to the side (desktop) or below (mobile):

| Order | Diagram | Caption draws from |
|---|---|---|
| 1 | `01-book-argument-spine.png` | "The ten chapters as a four-act dependency arc — Problem, Scaffolding Stack, Stress Test, Widening." |
| 2 | `02-autoresearch-machine.png` | "How a 693-video corpus becomes a source-backed book: Source → Synthesis → Evidence → Manuscript, with a Research-Org control plane." |
| 3 | `03-scaffolding-stack.png` | "The book's central thesis in one picture: a raw model wrapped by five engineered layers that earn their place by specific failures they prevent." |
| 4 | `04-theme-corpus-map.png` | "Ten corpus themes sized by video count, mapped to chapters." |

Caption source-of-truth: `diagrams/README.md` Part I sections.

### 4.2 Section: *How to read this book*

Two maps, each with a paragraph:

| Order | Diagram | Caption |
|---|---|---|
| 1 | `diagrams/maps/01-readers-path.png` | "A suggested path through the chapters for different reader profiles." |
| 2 | `diagrams/maps/02-methodology-deep-dive.png` | "For readers who want to inspect The Method itself." |

### 4.3 Section: *Concepts*

Anchor: `id="concepts"` (so chapter prose can deep-link via `/visual-guide#concepts` or `/visual-guide#concept-<slug>`).

Grid of 18 concept cards, responsive (1 / 2 / 3 columns). Each card:

```
┌─────────────────────────────────────┐
│        [thumbnail 16:10]            │
│ ─────────────────────────────────── │
│ Harness Engineering                 │
│ Chapter 3 · A prepared              │
│ environment that lets agents do     │
│ real work without slop.             │
└─────────────────────────────────────┘
```

Click → lightbox enlarge (full diagram + extended caption + "Appears in: Chapter N" link to `/read#book-chapter-NN`). Each card has `id="concept-<slug>"` for deep linking.

Concept list comes from `public/diagrams/manifest.json` (see §7).

---

## 5 · Reader surface (`/read`)

Keeps the existing `FullBookReader` + `ChapterArticle` structure. Changes:

1. **`TopNav`** gets a `← Catalogue` button (left side, before the AI PRESS chip). Visible only when not on `/`. Uses upstream's `onBackToCatalogue` prop pattern.

2. **Hero** kept as-is (4-image parallax + spinning red badge). The "[ AI Engineer Book ]" label gets the subtitle line: *How AI Engineering Turns Models into Dependable Systems*.

3. **Per-chapter dark sidebar** (`ChapterIllustration`, currently driven by `chapterIllustrations[].position` over a woodcut PNG sheet) — **replaced**. The new sidebar shows a tinted, focus-cropped version of that chapter's opener diagram (e.g. ch01 → `05-chapter1-the-shift.png`), framed against the existing dark `#1f1f20` panel with the same `DynamicVisuals` overlay. CSS: `background-image` + `background-position: center` + `background-size: cover` + a `mix-blend-overlay` darkening layer. Argument-true decoration.

4. **Chapter opener diagram** stays at the top of each article (already wired via `chapterDiagram` map; no change).

5. **Inline figs auto-placement** — existing slot at every `## ` heading (currently rendered by `InlineIllustration` over the woodcut sheet) is **swapped** to render `/diagrams/inline/ch{NN}-fig{N}-*.png`. The figure caption uses the figure's `display` text from the manifest (see §7). If a chapter has more H2s than figures (3 figs available per chapter), extra H2s render diagram-free. If fewer, extra figs are skipped silently.

6. **Glossary terms** wired into `InlineText` — see §6.

7. **Footer share row** at the end of the article: opens `ShareModal` (see §8).

The currently-rendered "Concept guide" cards (`ConceptMap` component) that appear under the chapter promise paragraph — **removed**. Their function is replaced by inline figs at H2 boundaries plus glossary popovers.

---

## 6 · Glossary system — side drawer

### 6.1 Data model

New file `src/glossary.ts`:

```ts
export type GlossaryTerm = {
  id: string;                  // 'harness-engineering'
  display: string[];           // ['Harness', 'harnesses', 'harness engineering']
  definition: string;          // 2–4 sentence definition
  diagram?: string;            // '/diagrams/concepts/harness-engineering.png'
  chapterRef?: string;         // '03'  — chapter where the concept is anchored
};
export const GLOSSARY: GlossaryTerm[] = [ /* ~30 entries */ ];
```

### 6.2 Vocabulary (~30 terms)

Three sources combined:

| Source | Count | Examples |
|---|---|---|
| `CONTEXT.md` lab vocabulary | 6 | The Lab, The Method, The Manuscript, Claim, Source Anchor, Support level |
| Concept diagrams (one term per diagram) | 18 | Agentic product design, Agent observability, Agent runtime replay vs snapshot, AI-native organization, Coding evals, Constrained delegation, Context engineering, Durable agents, GraphRAG, Harness engineering, Hierarchical memory, Human control plane, Model context protocol (MCP), One-shot AI failure, Software factory, Spec-driven development, Vibe coding, Voice agents |
| Chapter concepts without a dedicated concept diagram | ~6 | Assistant vs delegate, Repo as interface, Vibe engineering, Authority boundary, Scoped agent identity, Alignment debt |

Definitions authored from:
- For lab vocabulary: `CONTEXT.md` directly.
- For concept-diagram terms: `diagrams/README.md` chapter section + the diagram's own text.
- For chapter-only concepts: pulled from `public/drafting/Chapter NN.md` and from `diagrams/inline/` figure context.

### 6.3 Term detection — `InlineText`

Extend the existing `InlineText` component. After the bold/code/italic split, run a final pass that:

1. Loads the GLOSSARY at module level (small enough to inline).
2. Builds a single case-insensitive regex from every `display` form across every term, longest-match first (so "harness engineering" wins over "harness").
3. Wraps matches in `<button class="glossary-term">…</button>`. Click → calls a setter passed via context to open the drawer for that term id.

Rendering: a thin dotted underline (`border-b border-dotted border-current/40`), no color change. Cursor: `help`.

### 6.4 Side drawer

Re-uses the existing `Sidebar` slide-pane mechanism (same overlay, same easing) but bound to a *separate* state: `activeGlossaryTermId | null`. Width: same 400/500 as Sidebar.

```
┌─ glossary drawer ─────────────────────────┐
│ HARNESS ENGINEERING               [X]     │
│ ─────────────────────────────────────     │
│ A prepared environment around an agent —  │
│ specs, tests, tools, and a staged plan →  │
│ produce → review → ship loop — that lets  │
│ the agent do real work without slop.      │
│                                           │
│ ┌─────────────────────────────────────┐   │
│ │  [concept diagram thumbnail 16:10]  │   │
│ └─────────────────────────────────────┘   │
│ See full diagram on the Visual Guide  →   │
│                                           │
│ ─────────────────────────────────────     │
│ Appears in: Chapter 3 — Harnesses,        │
│ Specs & Codebases Agents Can Use      →   │
└───────────────────────────────────────────┘
```

The "See full diagram →" link navigates to `/visual-guide#concept-<id>`. The "Appears in" link navigates to `/read#book-chapter-<NN>` (and closes the drawer).

Keyboard: `Esc` closes drawer.

---

## 7 · Diagram pipeline

A small Node script — `website/scripts/sync-diagrams.mjs` — runs in `prebuild` (added to `package.json`). It copies the source-of-truth diagrams from `../diagrams/` into `website/public/diagrams/` under a renamed, organised layout, and emits a manifest.

### 7.1 Layout under `public/diagrams/`

```
public/diagrams/
├── manifest.json                              # see §7.2
├── overview/
│   ├── spine.png            ← 01-book-argument-spine.png
│   ├── machine.png          ← 02-autoresearch-machine.png
│   ├── stack.png            ← 03-scaffolding-stack.png
│   └── corpus-map.png       ← 04-theme-corpus-map.png
├── openers/
│   ├── ch01.png             ← 05-chapter1-the-shift.png
│   ├── ch02.png             ← 06-chapter2-taste.png
│   ├── …                                       (10 total)
│   └── ch10.png             ← 14-chapter10-what-endures.png
├── concepts/
│   ├── agentic-product-design.png             (18 total)
│   ├── …
│   └── voice-agents.png
├── inline/
│   ├── ch01-fig1.png        ← ch01-fig1-assistant-copilot-delegate.png
│   ├── …                                       (3 per chapter; 30 total)
│   └── ch10-fig3.png
└── maps/
    ├── readers-path.png
    └── methodology-deep-dive.png
```

The script keeps the source filenames in the manifest's `sourceFile` field so editors can find the original `.excalidraw` next to the source PNG.

### 7.2 Manifest schema

`public/diagrams/manifest.json`:

```json
{
  "overview": [
    { "id": "spine", "title": "The Argument Spine", "src": "/diagrams/overview/spine.png",
      "caption": "...", "sourceFile": "01-book-argument-spine.excalidraw" }
  ],
  "openers": [
    { "chapter": "01", "src": "/diagrams/openers/ch01.png",
      "title": "Assistant vs delegate", "sourceFile": "05-chapter1-the-shift.excalidraw" }
  ],
  "concepts": [
    { "id": "harness-engineering", "title": "Harness Engineering", "chapter": "03",
      "src": "/diagrams/concepts/harness-engineering.png",
      "summary": "A prepared environment that lets agents do real work without slop.",
      "sourceFile": "10-harness-engineering.excalidraw" }
  ],
  "inline": [
    { "chapter": "01", "index": 1, "src": "/diagrams/inline/ch01-fig1.png",
      "title": "Assistant, copilot, delegate", "sourceFile": "ch01-fig1-assistant-copilot-delegate.excalidraw" }
  ],
  "maps": [
    { "id": "readers-path", "title": "Reader's path", "src": "/diagrams/maps/readers-path.png",
      "caption": "...", "sourceFile": "01-readers-path.excalidraw" }
  ]
}
```

The Visual Guide and the side drawer consume the manifest. The `chapterDiagram` map and `chapterVisualGuides` in `App.tsx` are replaced by reads from the manifest at module load.

### 7.3 Script behaviour

- Idempotent: only copies if source mtime is newer than destination.
- Concept slugs derived from the source filename (strip the `NN-` prefix).
- Inline figure short ids derived as `ch{NN}-fig{N}`.
- Manifest titles and captions read from a small `diagram-meta.json` file (committed in `website/`) keyed by source filename. Missing entries log a warning and fall back to the source filename humanized.
- Exit non-zero if a required source diagram is missing (so the build fails loudly).

---

## 8 · Upstream pulls — adopt list

| Upstream feature | Pull verbatim | Pull adapted | Drop |
|---|---|---|---|
| `Catalogue.tsx` |   | 3D spine, cover-flip cinematic, About-the-Lab footer scaffold | Multi-book stacking math; `kintsugi` overlay; `aiEngineerCover` import; upstream essay copy (rewritten) |
| `audio.ts` (`ScrollAudioFeedback`) | ✓ |   |   |
| `ShareModal` (from upstream `App.tsx`) |   | Layout, share targets (copy URL, X/Twitter, LinkedIn) | Upstream's specific copy and any hardcoded URL |
| `GlossaryTerm` mechanism |   | Detection pattern + click handler | Upstream's term list, styling (we use a different `glossary-term` styling) |
| `TopNav` `onBackToCatalogue` prop |   | The "back to catalogue" affordance |   |
| `Hero` refinements |   | Cherry-pick genuine improvements after diff inspection | Anything conflicting with our 4-image parallax hero |
| 9 placeholder PNGs |   |   | ✓ — we use our own diagrams |

---

## 9 · Declared defaults (small calls)

- **Scroll audio**: opt-in. Default off. New `SettingsModal` subsection: **Sound** → `Off / Paper / Mute` (Off = no listener attached; Paper = `ScrollAudioFeedback.playTick`; Mute = same as Off but explicitly set so a future ambient mode can distinguish).
- **Woodcut illustration sheet** (`/assets/illustrations/*.png`): retired. Files stay on disk for git history; no code references remain.
- **About-the-Lab essay**: adapted from upstream's prose using `CONTEXT.md` vocabulary; final wording reviewed inline before commit.
- **Settings**: keep theme, typography, font-size, line-spacing as-is; add Sound subsection (above).
- **Browser title fix** (noted in `README.md` as a maintenance gap on the deployed Cloud Run app): `<title>From Copilot to Colleague — An Online Book</title>` and `<meta name="description">` aligned with the catalogue subtitle.
- **The deployed Cloud Run URL** (`editorial-book-ui-41282466630.us-west1.run.app`) stays as the canonical deployment; Vercel preview deploys from `vercel.json` continue alongside.

---

## 10 · Cover generation

A portrait editorial cover, 2:3 aspect, 1200 × 1800.

**Prompt direction:** Editorial book cover. Title *From Copilot to Colleague* set in a high-contrast serif. Subtitle *How AI Engineering Turns Models into Dependable Systems* set smaller below in italic. Author *Timur Isachenko* at the bottom. Background: solid `#1F1D1B` (matches catalogue surface). Imagery: abstract scaffolding / lattice / wireframe — referencing the book's "five engineered layers" thesis without being literal. Subtle paper texture overlay. No human figures, no AI clichés (no glowing brains, no robotic hands).

**Iteration loop:** Generate 2–3 candidates with the same model (Flux / Ideogram / GPT Image depending on what produces the cleanest typography). Pick one in review; final goes to `website/public/covers/from-copilot-to-colleague.png`. Source images kept in `diagrams/covers/` for reference.

---

## 11 · Out of scope for v1

- Audiobook playback. The existing `AUDIOBOOK` button + scrubber in `BottomNav` stays decorative until a real audio source exists.
- Full-text search across chapters or glossary.
- Reading-progress persistence across sessions.
- Comments / annotations.
- Mobile gesture polish beyond what upstream provides.
- New chapter content edits — we wire what's already in `src/content/chapter-XX.md`. Chapter prose is not rewritten in this rework.
- Public `/concepts/`, `/themes/`, `/drafting/` directory exposure as routes. They stay markdown in the repo for now.
- Internationalization. Single locale (English).
- Analytics. No tracking added.

---

## 12 · Risks & mitigations

| Risk | Mitigation |
|---|---|
| Upstream's `App.tsx` evolved separately; cherry-pick conflicts | Pull by *concept* into our existing structure; never `git merge`. Diff each upstream block before porting. |
| 30 glossary terms × case-insensitive regex over every prose paragraph may be slow | Memoize compiled regex at module load; benchmark on Chapter 3 (longest). If slow, switch to a tokenized scan. |
| Inline fig auto-placement after H2 may land a figure in a section it doesn't illustrate well | Inspect each chapter after wiring; if any placement is jarring, hand-edit the chapter markdown to insert a sub-`##` heading to control where the fig drops. Documented as known follow-up. |
| Generated cover may look generic | Reserve 2–3 generation passes; if none acceptable in v1, fall back to typography-only cover (no image). |
| The deployed Cloud Run + new Vercel preview routes diverge | Both serve from the same build; `vercel.json` rewrites + Cloud Run's static server both fall through to `index.html`. Verified via the upstream-supplied `server.js` and `vercel.json` patterns. |
| `wouter` may not handle the `#anchor` deep-link case cleanly for `/visual-guide#concept-xyz` | Use plain `window.location.hash` + `scrollIntoView` in a `useEffect` keyed on `location.hash`; wouter doesn't intercept hash. |

---

## 13 · Acceptance criteria

1. Visiting `/` shows the single-book catalogue. Clicking the spine plays the cover-flip transition and lands on `/read`.
2. Visiting `/visual-guide` shows the four overview diagrams, then the two maps, then the 18-concept grid. Each concept card opens a lightbox.
3. Deep-linking to `/visual-guide#concept-harness-engineering` scrolls directly to that card and (optional) opens its lightbox.
4. The Reader (`/read`) shows the existing Hero, then ten chapters. Each chapter shows the opener diagram at the top, the prose with auto-placed inline figs at each `## ` heading, and the dark sidebar showing a tinted crop of the opener diagram (no woodcut sheet).
5. Glossary terms in chapter prose render with a dotted underline. Clicking one opens the right-side drawer with definition + concept-diagram thumbnail. "See full diagram →" navigates to `/visual-guide#concept-<id>`.
6. The Catalogue → Reader navigation works both directions (Reader's TopNav has `← Catalogue`).
7. The Share modal opens from the Reader's TopNav and copies the deep link.
8. The Settings modal has a Sound subsection. Selecting Paper enables scroll ticks.
9. The browser title reads *From Copilot to Colleague — An Online Book* (no more generic Vite title).
10. `npm run build` succeeds with no warnings about missing diagrams. The build manifest at `public/diagrams/manifest.json` is up to date with `diagrams/`.

---

## 14 · Build sequence (orientation — the plan will detail)

1. Salvage upstream artifacts (`audio.ts`, `Catalogue.tsx`, `ShareModal` skeleton, `GlossaryTerm` mechanism) into a `/tmp` reference; no copy yet.
2. Add `wouter`. Lift a `view` router shell into `App.tsx`. Wire `/`, `/visual-guide`, `/read`.
3. Diagram sync script + manifest. Run it once; commit the manifest and the renamed `public/diagrams/` tree.
4. Catalogue (`/`) — adapt upstream `Catalogue.tsx` to single-book + lab essay. Cover placeholder until §10 ships.
5. Visual Guide (`/visual-guide`) — three sections + concept grid + lightbox.
6. Reader (`/read`) — replace woodcut sidebar with cropped opener; wire inline figs from manifest; add `← Catalogue` button.
7. Glossary — author `src/glossary.ts` (~30 terms); extend `InlineText`; build side drawer.
8. Share modal + scroll-audio Settings toggle.
9. Cover generation (§10), title fix, accessibility pass (focus rings on glossary terms, drawer trap, Esc to close).
10. Manual QA against §13.

---

## 15 · Open questions left for the plan

- Exact set of ~6 chapter concepts without a concept diagram (final list emerges as glossary is authored).
- Lightbox library vs hand-rolled `<dialog>` — defer to plan.
- Whether `diagram-meta.json` (titles + captions) is hand-authored or extracted from `diagrams/README.md` automatically — defer to plan.
