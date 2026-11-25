# Remotion — explainer video series

Programmatic video for *From Copilot to Colleague*, built with
[Remotion](https://www.remotion.dev/) (React → video). Chapter 1 is the pilot
episode; the intent is one short explainer per chapter, same visual system,
same pacing shape.

## What's here

```
remotion/
├── src/
│   ├── index.ts          # registerRoot — Remotion's entry point
│   ├── Root.tsx           # registers every <Composition> (one per chapter)
│   ├── theme.ts            # brand tokens copied from website/src/data/book.ts; FPS lives here too
│   ├── shared/
│   │   └── primitives.tsx  # SceneBackground, FadeInOut, Kicker, Big, TermCard,
│   │                        # SeriesWithProgress — every chapter imports these, none forks them
│   ├── chapter01/
│   │   ├── durations.ts    # frame budget per scene (single source of truth)
│   │   ├── Scenes.tsx       # one component per beat, sourced from chapter-01.md
│   │   └── Chapter01.tsx    # <SeriesWithProgress scenes={[...]} /> — see the pattern
│   └── chapter02/           # same shape, chapter 2's content
│   └── ogcard/
│       ├── OgCard.tsx       # 1200x630 branded social-preview card (legible at thumbnail size,
│       │                     # unlike the dense whiteboard-style chapter diagrams)
│       └── chapters.ts       # chapter number/title/promise, mirrored from website/src/data/bookChapters.ts
├── scripts/
│   └── render-og-cards.mjs  # renders all 10 OgCard stills in one pass
├── public/cover.png        # copied from website/public/covers/ — keep in sync manually
└── out/                     # render output, gitignored (published cuts go to ../launch-assets/)
```

Every line of copy in each chapter's `Scenes.tsx` is lifted verbatim or
lightly compressed from that chapter's `website/src/content/chapter-0N.md` —
nothing is invented for video that isn't already in the chapter. Each quote
card cites a real Source Anchor already in the Claims Ledger:

| Chapter | Quote | Anchor |
|---|---|---|
| 1 | Barry Zhang & Mahesh Murag, Anthropic — "Agents have intelligence and capabilities, but not always expertise that we need for real work." | `CEvIs9y1uog`, 00:00:35–00:00:39 |
| 2 | Sean Grove, OpenAI — "the new scarce skill is writing specifications that fully capture the intent" | `8rABwKRsec4`, 00:09:02–00:09:07 |

The on-screen timestamp (e.g. "0:35") is always that anchor's real start time,
not a stylistic flourish.

## Render it

```bash
cd remotion
npm install
npm run render:ch01     # → out/chapter-01-the-shift.mp4 (1920x1080, 30fps, h264)
npm run render:ch02     # → out/chapter-02-taste.mp4
npm run render:og        # → out/og/chapter-01.png .. chapter-10.png (1200x630 og:image cards)
npm run still:ch01       # → single PNG frame, for a quick sanity check
npm run studio            # interactive Remotion Studio (scrub, preview, tweak)
```

After `render:og`, copy the outputs to `../website/public/og/chapter-0N.png` — that's
where `website/src/data/bookChapters.ts#ogCardPath` and `ChapterDetail.tsx` expect
them. If a chapter title/promise changes in `website/src/data/bookChapters.ts`,
update the mirrored copy in `src/ogcard/chapters.ts` (and `scripts/render-og-cards.mjs`)
and re-render.

### Books 2 and 3

Each chapter explainer of the draft books is one spec file,
`src/draft/specs/book{2,3}-NN.ts`, rendered by the shared template
`src/draft/Explainer.tsx` (same ten beats and 1,005 frames as book 1).
Every line comes from the chapter text; the quote is an evidence anchor's own
words. Backdrops are text-free Higgsfield stills in `public/draft/`.

```bash
npm run check:explainers:draft     # quote vs. evidence anchor; lists trimmed lines
npm run render:explainers:draft    # renders missing mp4s into ../website/public/video/book{2,3}/
                                   # and writes ../website/src/data/draftVideos.json
npm run render:explainers:draft -- Book3Chapter04 --force   # re-render one
```

On a Mac, set `REMOTION_BROWSER_EXECUTABLE="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.
The script passes `--gl=angle --concurrency=1`; expect about 6 minutes per video.

This sandbox has `google-chrome-stable` preinstalled; `remotion.config.ts`
points the renderer at it (`/usr/local/bin/google-chrome`) so no browser
download is needed. On a machine without a preinstalled Chrome, delete that
line (or set `REMOTION_BROWSER_EXECUTABLE`) and Remotion will download its own
headless Chromium on first render.

The published cut lives at
[`../launch-assets/from-copilot-to-colleague-ch1-explainer.mp4`](../launch-assets/from-copilot-to-colleague-ch1-explainer.mp4)
— copy `out/chapter-*.mp4` there after every re-render that should ship.

## Adding Chapter 3 (and the rest of the series)

Chapter 2 (`src/chapter02/`) is the second worked example — use it, not just
Chapter 1, to see what varies (durations, scene count, card labels) versus
what doesn't (imports from `shared/primitives.tsx`, the `SeriesWithProgress`
assembly pattern, the theme).

1. Copy `src/chapter02/` (durations.ts, Scenes.tsx, Chapter0N.tsx) →
   `src/chapter03/`. Do **not** copy `shared/primitives.tsx` or `theme.ts` —
   every chapter imports those from `../shared/primitives` and `../theme` as-is.
   Forking them per chapter is exactly the drift this structure exists to prevent.
2. Rewrite `Scenes.tsx`'s content from that chapter's `website/src/content/chapter-0N.md`:
   keep the same shape (hook → title → core framework/argument beats → one
   sourced quote card with its real anchor timestamp → a concrete
   takeaway/framework recap → outro/CTA), but let the beat count and hold
   times flex with how many ideas the chapter actually needs — don't force
   every chapter into exactly 10 scenes.
3. Register the new composition in `Root.tsx` (new `id`, e.g. `"Chapter03"`,
   importing that chapter's own `TOTAL_DURATION_IN_FRAMES`).
4. Add `render:ch03` / `still:ch03` scripts to `package.json` mirroring the
   ch01/ch02 ones.
5. Quote cards must cite a real Source Anchor from `claims/Claims Ledger.md` —
   grep the ledger for the chapter's claim numbers, use the anchor's own
   verbatim quote and start timestamp, never a paraphrase presented as a quote.
6. After rendering, copy the published cut to `../launch-assets/` **and** to
   `../website/public/video/`, then add an entry to
   `website/src/data/chapterVideos.ts` so the chapter page picks it up
   automatically (embed, `VideoObject` schema, `og:video` tags — all wired
   generically off that registry, nothing chapter-specific to touch in
   `ChapterDetail.tsx` or `structuredData.ts`).

## Design notes

- **Palette / type** come straight from the live site's dark theme
  (`Catalogue.tsx`): ink `#1F1D1B`, paper `#F9F7F1`, accent `#C2410C` (the same
  orange used in the GitHub badges). No new brand decisions made here.
- **1920×1080 @ 30fps** — universal for YouTube/LinkedIn/X native video. If a
  vertical cut is wanted for Shorts/Reels later, add a second `<Composition>`
  with `width={1080} height={1920}` reusing the same scene components (they're
  centered flex layouts, so they reflow reasonably; re-check text sizes).
- **No external font fetching during render** — headings use `Georgia` (serif)
  and the system sans/mono stacks, all present in Chrome by default. Keeps
  rendering reproducible without a network call; swap in `@remotion/google-fonts`
  later if the brand wants a specific display face.

## Interface

- `[package.json:scripts]` — `studio`, `render:ch01`, `still:ch01`, `render:ch02`, `still:ch02`, `render:og`, `upgrade`. Each `render:*` / `still:*` script names a composition `id` from `src/Root.tsx`.
- `[remotion.config.ts]` — Remotion CLI config: `setBrowserExecutable` (from `$REMOTION_BROWSER_EXECUTABLE`, default `/usr/local/bin/google-chrome`), `setVideoImageFormat('jpeg')`, `setOverwriteOutput(true)`, `setChromiumOpenGlRenderer('swangle')`.
- `public/cover.png` — static asset that the chapter `OutroScene`s load with `staticFile('cover.png')`.
- Subdirectories:
  - [src](./src/README.md) — entry point, composition registry (`Chapter01`, `Chapter02`, `OgCard`), and theme.
    - [src/shared](./src/shared/README.md) — `SeriesWithProgress`, `FadeInOut`, `TermCard` and other shared primitives.
    - [src/chapter01](./src/chapter01/README.md) — Chapter 1 explainer.
    - [src/chapter02](./src/chapter02/README.md) — Chapter 2 explainer.
    - [src/ogcard](./src/ogcard/README.md) — 1200x630 og:image card.
  - [scripts](./scripts/README.md) — `render-og-cards.mjs`, the batch renderer behind `npm run render:og`.

## Invariants

- One frame rate for the series: `[src/theme.ts:FPS]` (30).
- Each chapter's `durations.ts:SCENE_DURATIONS` is the single source of its frame budget; `Root.tsx` reads its `TOTAL_DURATION_IN_FRAMES`.
- Chapters import `src/shared/primitives.tsx` and `src/theme.ts`; they never fork them.
- Chapter OG data lives in two hand-kept copies that must match `website/src/data/bookChapters.ts`: `[src/ogcard/chapters.ts:OG_CARD_CHAPTERS]` and `[scripts/render-og-cards.mjs:CHAPTERS]`. The script does not import the TypeScript list.
- Quote-card timestamps are the real Source Anchor start times (see the table above).

## Side Effects

- Renders write to `out/` (gitignored): `out/chapter-*.mp4`, `out/chapter-*.png`, `out/og/chapter-NN.png`. `setOverwriteOutput(true)` replaces existing files.
- Every render launches a headless Chrome from the `remotion.config.ts` path.
- Copies to `../launch-assets/`, `../website/public/og/` and `../website/public/video/` are manual steps; no script here performs them.

## Verification

- Run: `<test-command>` (no test script in `package.json`).
- Manual check: `npx remotion studio` (all three compositions load), `npm run still:ch01`, and `npm run render:og`.
