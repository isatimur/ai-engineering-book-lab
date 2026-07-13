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
│   ├── theme.ts            # brand tokens copied from website/src/data/book.ts
│   └── chapter01/
│       ├── durations.ts    # frame budget per scene (single source of truth)
│       ├── primitives.tsx  # SceneBackground, FadeInOut, Kicker — shared across chapters
│       ├── Scenes.tsx       # one component per beat, sourced from chapter-01.md
│       └── Chapter01.tsx    # assembles the scenes into a <Series>
├── public/cover.png        # copied from website/public/covers/ — keep in sync manually
└── out/                     # render output, gitignored (published cuts go to ../launch-assets/)
```

Every line of copy in `chapter01/Scenes.tsx` is lifted verbatim or lightly
compressed from `website/src/content/chapter-01.md` — nothing is invented for
video that isn't already in the chapter. The one quote (Barry Zhang & Mahesh
Murag, Anthropic) is the same Source Anchor already in the Claims Ledger
(`CEvIs9y1uog`, 00:00:35–00:00:39); the "0:35" on screen is that anchor's
start timestamp, not a stylistic flourish.

## Render it

```bash
cd remotion
npm install
npm run render:ch01     # → out/chapter-01-the-shift.mp4 (1920x1080, 30fps, h264)
npm run still:ch01       # → single PNG frame, for a quick sanity check
npm run studio            # interactive Remotion Studio (scrub, preview, tweak)
```

This sandbox has `google-chrome-stable` preinstalled; `remotion.config.ts`
points the renderer at it (`/usr/local/bin/google-chrome`) so no browser
download is needed. On a machine without a preinstalled Chrome, delete that
line (or set `REMOTION_BROWSER_EXECUTABLE`) and Remotion will download its own
headless Chromium on first render.

The published cut lives at
[`../launch-assets/from-copilot-to-colleague-ch1-explainer.mp4`](../launch-assets/from-copilot-to-colleague-ch1-explainer.mp4)
— copy `out/chapter-*.mp4` there after every re-render that should ship.

## Adding Chapter 2 (and the rest of the series)

1. Copy `src/chapter01/` → `src/chapter02/` (durations.ts, primitives.tsx,
   Scenes.tsx, Chapter02.tsx). `primitives.tsx` and `theme.ts` are meant to be
   reused as-is — don't fork the visual language per chapter.
2. Rewrite `Scenes.tsx`'s content from that chapter's `website/src/content/chapter-0N.md`:
   keep the same shape (hook → title → core framework/argument beats → one
   sourced quote card with its real anchor timestamp → stats or a concrete
   takeaway → outro/CTA), but let the beat count and hold times flex with how
   many ideas the chapter actually needs — don't force every chapter into
   exactly 10 scenes.
3. Register the new composition in `Root.tsx` (new `id`, e.g. `"Chapter02"`).
4. Add `render:ch02` / `still:ch02` scripts to `package.json` mirroring the
   ch01 ones.
5. Quote cards must cite a real Source Anchor from `claims/Claims Ledger.md` —
   grep the ledger for the chapter's claim numbers, use the anchor's own
   verbatim quote and start timestamp, never a paraphrase presented as a quote.

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
