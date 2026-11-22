# chapter

## Overview
Components that render a book chapter: the article body, illustrations, the sticky figure stage, the explainer video, and the full-book reader. Book 1 uses `ChapterArticle`. Books 2 and 3 use `SecondBookArticle`.

## Interface
- `AssessmentCta()`: aside with links to `/assess` and `/enterprise`. [AssessmentCta.tsx:AssessmentCta]
- `ChapterArticle({ chapter: BookChapter })`: splits `chapter.content` on blank lines and renders a `MarkdownBlock` per block. It adds `InlineIllustration` after `## ` headings, `ExpandableSummary`, `EvidenceClaimMarkers`, and a "Practical checklist" callout. [ChapterArticle.tsx:ChapterArticle]
- `ChapterExplainerVideo({ video: ChapterVideo })`. [ChapterExplainerVideo.tsx:ChapterExplainerVideo]
- `ChapterIllustration({ chapter, index? })`: the `index` prop is declared but not used. [ChapterIllustration.tsx:ChapterIllustration]
- `ChapterStage({ chapter, activeIndex })`: crossfading stack of the opener and inline figures, with a progress bar. [ChapterStage.tsx:ChapterStage]
- `DynamicVisuals({ colorMarker, type: 'gradient' | 'particles' | 'geometric' })`. [DynamicVisuals.tsx:DynamicVisuals]
- `ExpandableSummary({ chapter })`: toggle that shows `chapter.promise` and the first three paragraphs. [ExpandableSummary.tsx:ExpandableSummary]
- `FullBookReader({ textOnly? = false })`: all chapters inside a `LightboxProvider`, plus `AskAI`. Internal parts: `ListenButton`, `ChapterOpener`, `ChapterReaderItem`. [FullBookReader.tsx:FullBookReader]
- `Hero()`: reads `stats.corpus.videos` and `bookReadingTime`; links to `/read/graph`. [Hero.tsx:Hero]
- `InlineIllustration({ fig: InlineDiagram, label })`. [InlineIllustration.tsx:InlineIllustration]
- `SecondBookArticle({ chapter })`: article renderer for books 2 and 3. [SecondBookArticle.tsx:SecondBookArticle]

## Invariants
- `ChapterArticle` and `SecondBookArticle` drop a leading `# ` H1 block. [ChapterArticle.tsx:ChapterArticle] [SecondBookArticle.tsx:SecondBookArticle]
- `ChapterArticle` splits the checklist at the block equal to `## Practical checklist`. With no such block, no callout renders. Checklist blocks get no figures. [ChapterArticle.tsx:ChapterArticle] [ChapterArticle.tsx:renderBlock]
- `ChapterIllustration` returns `null` when `opener(chapter.number)` is empty. `ChapterStage` returns `null` when it has no opener and no figures. [ChapterIllustration.tsx:ChapterIllustration] [ChapterStage.tsx:ChapterStage]
- `ChapterReaderItem` counts a figure anchor as passed when its top is above 35% of `window.innerHeight`. `textOnly` hides the opener and the sticky stage. `JudgeScorecard` renders only when `scoreForChapter(chapter.number)` returns a value. [FullBookReader.tsx:ChapterReaderItem]
- `InlineIllustration` is hidden at `lg` and up, because the sticky stage shows the figure on desktop. [InlineIllustration.tsx:InlineIllustration]
- `SecondBookArticle` turns `[[id|Label]]` into `Label` and `[[id]]` into `id`. It does not use the book 1 manifest or evidence markers. [SecondBookArticle.tsx:stripWikilinks]

## Side Effects
- `ChapterIllustration`, `ChapterStage`, `InlineIllustration`, and `ChapterOpener` call `useLightbox().open(src, title)` on click. [ChapterStage.tsx:ChapterStage] [FullBookReader.tsx:ChapterOpener]
- `ListenButton` calls `useAudiobook()` `playChapter(index)` or `toggle(index)`. [FullBookReader.tsx:ListenButton]
- `ChapterReaderItem` adds passive `scroll` and `resize` listeners on `window` and removes them on cleanup. [FullBookReader.tsx:ChapterReaderItem]
- `ChapterExplainerVideo` renders a native `<video controls preload="metadata">`. [ChapterExplainerVideo.tsx:ChapterExplainerVideo]
- `Hero` uses `motion` scroll parallax. `DynamicVisuals` calls `Math.random()` during render, so particle positions change on each render. [Hero.tsx:Hero] [DynamicVisuals.tsx:DynamicVisuals]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory.
