---
name: chapter-explainer-video
description: Produce a short branded explainer video (and matching Open Graph social card) for a book chapter using the Remotion pipeline. Use when asked to make/render a chapter video, extend the explainer video series to a new chapter, or generate a chapter's og:image card.
---

# Chapter Explainer Video

Renders a ~30-second branded explainer video for one chapter, plus its
`og:image` social card, using the `remotion/` project — and wires both into
the live site. Full reference: [`remotion/README.md`](../../../remotion/README.md).
This skill is the condensed, step-ordered version of that doc.

## Hard rule before anything else

**Every line of on-screen copy must come from that chapter's own
`website/src/content/chapter-0N.md`.** Any quote card must cite a real
Source Anchor from `claims/Claims Ledger.md` — the exact verbatim quote and
`video_id` + start timestamp already in the ledger, not a paraphrase
presented as a quote, and not a quote from a different chapter's claims.
This mirrors the book's own no-fabrication standard; a video that violates
it is worse than no video.

## Steps

### 1. Read the chapter and pick a quote

Read `website/src/content/chapter-0N.md`. Pick one Source Anchor from the
Claims Ledger that's actually cited in that chapter's prose:

```bash
grep -n -B3 -A2 "<distinctive phrase from the chapter's quote>" "claims/Claims Ledger.md"
```

Confirm the anchor's `video_id` and start timestamp — both go on screen
verbatim (e.g. "Source-anchored · 9:02" using the anchor's real start time).

### 2. Scaffold the chapter folder

Copy the most recently added `remotion/src/chapterNN/` folder (not
`chapter01/` specifically — later chapters are closer to the current
pattern) to `remotion/src/chapterMM/`:

- `durations.ts` — frame budget per scene, own name/values per chapter.
- `Scenes.tsx` — one component per beat. Import `SceneBackground`,
  `FadeInOut`, `Kicker`, `Big`, `TermCard` from `../shared/primitives` —
  never fork these; that duplication is exactly what the shared module
  exists to prevent.
- `ChapterMM.tsx` — a few lines: `<SeriesWithProgress scenes={[...]} />`.

Shape (flex the beat count/holds to what the chapter needs, don't force
exactly this many scenes): hook → title card → core-argument beats → one
sourced quote card → a concrete takeaway/framework recap → outro/CTA.

### 3. Register and render

In `remotion/src/Root.tsx`, add a `<Composition id="ChapterMM" .../>`
importing that chapter's `TOTAL_DURATION_IN_FRAMES`. In `package.json`, add
`render:chMM` / `still:chMM` scripts mirroring the existing ones.

```bash
cd remotion
npm run render:chMM   # -> out/chapter-MM-<slug>.mp4 (1920x1080, 30fps, h264)
```

Spot-check with a few `remotion still` frames (hook, the emphasized card,
the quote card, outro) before trusting the full render — check `theme.ts`
colors rendered correctly and no text overflow.

### 4. Render the matching OG card

Add this chapter's number/title/promise to
`remotion/src/ogcard/chapters.ts` and `remotion/scripts/render-og-cards.mjs`
(mirrored from `website/src/data/bookChapters.ts` — keep both in sync), then:

```bash
npm run render:og
```

### 5. Publish

```bash
cp out/chapter-MM-<slug>.mp4 ../launch-assets/from-copilot-to-colleague-chMM-explainer.mp4
cp out/chapter-MM-<slug>.mp4 ../website/public/video/chapter-MM-<slug>.mp4
cp out/<poster-still>.png    ../website/public/video/chapter-MM-poster.png
cp out/og/chapter-MM.png     ../website/public/og/chapter-MM.png
```

Add an entry to `website/src/data/chapterVideos.ts` (real duration from
`ffprobe`, real description — no invented claims). `ChapterDetail.tsx`,
`structuredData.ts` (`VideoObject` JSON-LD), and `Seo.tsx` (`og:video` tags)
already read that registry generically — no other per-chapter code changes
needed.

### 6. Verify before shipping

```bash
ffprobe -v error -show_entries format=duration -show_entries stream=codec_name,width,height,r_frame_rate -of default=noprint_wrappers=1 out/chapter-MM-<slug>.mp4
cd ../website && npx vitest run && npx tsc --noEmit && npm run build
grep -o "VideoObject" dist/read/MM-<slug>.html   # confirm schema present
grep -o '<video[^>]*>' dist/read/MM-<slug>.html  # confirm the player element is in the static HTML
```

Revert build churn (`sitemap.xml`, `src/data/versions*`) before committing —
see the repo's standing convention for what `npm run build` regenerates that
shouldn't be committed.
