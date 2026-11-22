# data

## Overview
Typed content and configuration for the site: the three books' chapter lists, the press library, the assessment, the glossary, the audiobook tracks, the chapter videos, and the site origins. This directory also holds JSON written by the build scripts. Do not edit the generated JSON by hand. Some JSON files are thousands of lines long.

## Interface
- `bookChapters.ts`: types `BookChapter`, `ChapterStatus`; `chapters` (10 chapters); `chapterPath(c)` -> `/read/NN-slug`, `ogCardPath(c)`, `chapterParam(c)`, `chapterByParam(param)`. [bookChapters.ts:chapters]
- `bookChaptersTwo.ts`: `BOOK_TWO_TITLE`, `BOOK_TWO_SUBTITLE`, `BOOK_TWO_COVER`, `chaptersTwo` (8), `chaptersTwoWordCount`, `chapterTwoPath`, `chapterTwoParam`, `chapterTwoByParam`. [bookChaptersTwo.ts:chaptersTwo]
- `bookChaptersThree.ts`: `BOOK_THREE_TITLE`, `BOOK_THREE_SUBTITLE`, `BOOK_THREE_COVER`, `chaptersThree` (12), `chaptersThreeWordCount`, `chapterThreePath`, `chapterThreeParam`, `chapterThreeByParam`. [bookChaptersThree.ts:chaptersThree]
- `book.ts`: `BOOK_ORIGIN`, `PRESS_ORIGIN`, `SITE_ORIGIN`, `PRESS_HOME_PATH`, `PRESS_PATH_PREFIXES`, `isPressPath`, `publicUrl`, `absoluteUrl`, `BOOK`, `authorsLine`, `authorsSpineLine`. [book.ts:publicUrl]
- `library.ts`: `LIBRARY` (3 entries), type `LibraryEntry`, `PLANNED_CHAPTERS = 12`, `CLASSIFIED_TALKS = 133`, `LIBRARY_SUBTITLES`. [library.ts:LIBRARY]
- `assessment.ts`: `DIMENSIONS` (5), `QUESTIONS` (30), `LIKERT`, `BAND_INFO`, `QUESTIONS_PER_DIMENSION = 6`, `normalizeDimension`, `bandForScore`, `computeResult`, `questionsForDimension`. [assessment.ts:computeResult]
- `audiobook.ts`: `AUDIOBOOK` (10 tracks), `PLAYBACK_SPEEDS`, `NARRATION_CREDIT`, `TOTAL_SECONDS`, `formatClock`. [audiobook.ts:AUDIOBOOK]
- `glossary.ts`: type `GlossaryTerm`, `GLOSSARY`. [glossary.ts:GLOSSARY]
- `geo.ts`: `whatIsThisBookAnswer`, `howIsThisDifferentAnswer`, `bookDefinitionEntries`. [geo.ts:bookDefinitionEntries]
- `chapterVideos.ts`: type `ChapterVideo`, `chapterVideos`, `chapterVideoFor(slug)`. [chapterVideos.ts:chapterVideoFor]
- `artifacts.ts`: `ARTIFACTS` (3), types `Artifact`, `ArtifactLink`, `ArtifactBadge`. [artifacts.ts:ARTIFACTS]
- `spadeHeroVideos.ts`: `SPADE_HERO_VIDEOS`, `resolveVideoSrc(slot, preferLocal = true)`, `heroScrubVideo`, `heroAmbientVideo`, `heroMobileVideo`. [spadeHeroVideos.ts:resolveVideoSrc]
- Generated JSON: `diagram-manifest.json` (by `scripts/sync-diagrams.mjs`), `press-explainer.json` (by `scripts/gen-press-explainer.mjs`), `third-book-outline.json` (by `scripts/sync-third-book.mjs`). Other JSON: `judge-scores.json`, `stats.json`, `versions.json`, `ledgers/*.json`, `versions/NN/*.md`. [../../scripts/sync-diagrams.mjs:main] [../../scripts/gen-press-explainer.mjs:data] [../../scripts/sync-third-book.mjs:outlineSrc]

## Invariants
- `AUDIOBOOK` must stay in the same order as `chapters`, with matching `number`. Only a comment states this; no code checks it. [audiobook.ts:AUDIOBOOK]
- `formatClock` turns NaN, Infinity, and negative input into 0. [audiobook.ts:formatClock]
- `computeResult` counts an unanswered question as 1. `bandForScore`: 70 and up is `advanced`, 40 and up is `developing`, else `early`. [assessment.ts:computeResult] [assessment.ts:bandForScore]
- `publicUrl('/press')` returns `https://aiepress.com/`. Other press paths go to `PRESS_ORIGIN`; all other paths go to `BOOK_ORIGIN`. [book.ts:publicUrl]
- `middleware.ts` and `scripts/gen-sitemap.mjs` keep their own copies of `PRESS_PATH_PREFIXES`. `src/lib/middleware.test.ts` checks the middleware copy against this one. [book.ts:PRESS_PATH_PREFIXES] [../lib/middleware.test.ts:PRESS_PATH_PREFIXES] [../../scripts/gen-sitemap.mjs:PRESS_PATH_PREFIXES]
- Word counts are computed with `countWords`, not typed by hand. [bookChapters.ts:countWords]
- Chapter entries in `bookChaptersTwo.ts` and `bookChaptersThree.ts` must keep `number` then `slug` as adjacent single-quoted fields, because `scripts/gen-sitemap.mjs` parses them with a regex. [bookChaptersThree.ts:chaptersThree]
- Every `../content-3/chapter-NN.md` that `bookChaptersThree.ts` imports must exist, or the build fails. [bookChaptersThree.ts:chaptersThree]
- `chapterVideoFor` returns `undefined` for a chapter with no video. Callers must skip the video block. [chapterVideos.ts:chapterVideoFor]
- `library.ts` derives book 3 status from the chapter count (`In design`, `Drafting`, `First draft`). [library.ts:bookThreeStatus]
- The three hero video exports use a non-null `find(...)!`, so each role must exist in `SPADE_HERO_VIDEOS`. [spadeHeroVideos.ts:heroScrubVideo]

## Side Effects
- Chapter markdown is bundled at build time with Vite `?raw` imports from `../content/`, `../content-2/`, and `../content-3/`. [bookChapters.ts:chapters] [bookChaptersTwo.ts:chaptersTwo] [bookChaptersThree.ts:chaptersThree]
- `geo.ts` and `library.ts` import `./stats.json`. [geo.ts:whatIsThisBookAnswer] [library.ts:LIBRARY]
- `scripts/sync-audio.mjs` rewrites `approxSeconds` in `audiobook.ts` in place. [../../scripts/sync-audio.mjs:patchAudiobookTs]
- No `.ts` file here touches localStorage, `window`, timers, or the network. [bookChapters.ts:chapters]

## Verification
- Run from `website/`: `npm test` (Vitest) and `npm run lint` (`tsc --noEmit`).
- Scope to this directory: `npx vitest run src/data`.
