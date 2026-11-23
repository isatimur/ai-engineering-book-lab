# lib

## Overview
Framework-light helpers for the site. The modules cover chapter URLs, the evidence graph and ledgers, judge scores, the diagram manifest, chapter versions and diffs, search, glossary matching, audiobook alignment, reader persistence, JSON-LD, the lightbox, and scroll audio. Most modules are pure. The side effects are listed below.

## Interface
- Chapter URLs: `chapterByNumber`, `readChapterUrl`, `graphUrl`, `experienceUrl`, `parseExperienceHash`, type `ExperienceSurface`. [chapterLinks.ts:graphUrl]
- Evidence types: `Anchor`, `ArtifactAnchor`, `EvidenceClaim`, `GraphNode`, `GraphEdge`, `EvidenceGraphData`. [evidenceTypes.ts]
- Evidence graph: `buildEvidenceGraph`, `getEvidenceGraph` (cached), `filterGraphByChapter`, `claimsForChapter`, `anchorForNode`, `parseSpeakerLabel`, `chapterLabel`. [evidenceGraph.ts:buildEvidenceGraph]
- Evidence ledger: `buildEvidenceLedger(): LedgerRow[]`, `ledgerByChapter`. [evidenceLedger.ts:buildEvidenceLedger]
- Event ledgers: `eventLedgerSlugs`, `getEventLedger`, `listEventLedgers`, `ledgerStats`, `buildEventLedgerRows`, types `EventLedger`, `EventLedgerClaim`, `EventLedgerRow`. [eventLedgers.ts:getEventLedger]
- Artifact labels: `artifactAnchorLabel(anchor)`. [artifactAnchors.ts:artifactAnchorLabel]
- Judge scores: `judgeScores`, `scoreForChapter`, `hasJudgeData`, `labelColor`, `weakestForDim`, `DIMS`, `DIM_LABELS`, types `JudgeScores`, `ChapterScore`, `JudgeLabel`. [judgeScores.ts:scoreForChapter]
- Diagram manifest: `manifest`, `opener`, `inlineFigsForChapter`, `conceptById`, `mapById`, type `DiagramManifest`. [manifest.ts:manifest]
- Versions: `versions`, `chapterNumbers`, `versionsForChapter`, `loadVersionContent(contentRef): Promise<string>`, type `ChapterVersion`. [versions.ts:loadVersionContent]
- Diff: `toBlocks`, `diffMarkdown`, `wordDiff`, `diffStats`, types `DiffBlock`, `WordPart`, `DiffStats`. [diff.ts:diffMarkdown]
- Search: `markdownToText`, `buildSearchIndex(chapters, glossary)`, `search(index, query, limit = 20)`, types `SearchRecord`, `SearchResult`, `MatchRange`. [search.ts:search]
- Glossary: `splitWithGlossary(text, terms)`, `_resetGlossaryCache`, `GlossaryContext`, `useGlossary`. [glossaryMatch.ts:splitWithGlossary] [glossaryContext.tsx:useGlossary]
- Listen alignment: `alignmentUrl`, `loadChapterAlignment`, `activeSpokenWordIndex`, `activeDisplayWordIndex`, `spokenIndexForDisplay`, `isDisplayWordActive`, type `ChapterAlignment`. [listenAlignment.ts:loadChapterAlignment]
- Reader persistence: `saveScrollProgress`, `loadScrollProgress`, `saveSettings`, `loadSettings`, `saveLastChapter`, `loadLastChapter`, `scrollToProgress`. [readingProgress.ts:saveScrollProgress]
- Reader mode: `TEXT_ONLY_KEY`, `isTextOnlyFromSearch`, `loadTextOnlyPreference`, `saveTextOnlyPreference`, `syncTextOnlyUrl`. [readerMode.ts:isTextOnlyFromSearch]
- Reading stats: `totalWordCount`, `readingMinutes`, `formatReadingTime`, `bookReadingTime`. [readingStats.ts:formatReadingTime]
- JSON-LD builders: `bookJsonLd`, `whatIsThisBookJsonLd`, `aboutTheMethodJsonLd`, `chapterJsonLd`, `breadcrumbJsonLd`, `chapterVideoJsonLd`, `ledgersIndexJsonLd`, `eventLedgerJsonLd`, `booksCollectionJsonLd`, `pressJsonLd`. [structuredData.ts:bookJsonLd]
- UI helpers: `LightboxProvider`, `useLightbox`. [lightbox.tsx:LightboxProvider]
- Audio: class `ScrollAudioFeedback` and singleton `scrollAudio`. [audio.ts:scrollAudio]
- Hash: `hashText(s)` (djb2 variant, base 36). [hashText.ts:hashText]

## Invariants
- Chapter keys are zero-padded to two digits in `chapterByNumber`, `graphUrl`, `scoreForChapter`, `versionsForChapter`, and `saveLastChapter`. Evidence lookups use `String(parseInt(n, 10))` instead. [chapterLinks.ts:chapterByNumber] [evidenceGraph.ts:claimsForChapter]
- `readChapterUrl` falls back to `/read`. `experienceUrl` and `parseExperienceHash` accept only chapter numbers in `1..chapters.length`. [chapterLinks.ts:readChapterUrl] [chapterLinks.ts:parseExperienceHash]
- JSON data (`evidence.json`, ledgers, `judge-scores.json`, `diagram-manifest.json`, `versions.json`) is cast to types with no runtime validation. [evidenceGraph.ts:evidenceData] [eventLedgers.ts:REGISTRY]
- `buildEvidenceGraph` dedupes edges by `${type}:${source}->${target}` and keeps the larger node on an id clash. [evidenceGraph.ts:buildEvidenceGraph]
- `buildEvidenceLedger` sorts by chapter, then by claim id with numeric compare. `listEventLedgers` sorts by title. [evidenceLedger.ts:buildEvidenceLedger] [eventLedgers.ts:listEventLedgers]
- `diffMarkdown` pairs a removed part followed by an added part into `changed` blocks. [diff.ts:diffMarkdown]
- `search` requires every query term to match in a multi-term query and caps results at `limit`. [search.ts:search]
- `splitWithGlossary` builds its regex once. Later `terms` arguments are ignored until `_resetGlossaryCache()`. [glossaryMatch.ts:buildRegex]
- `loadChapterAlignment` returns `null` on any failure and never throws. `loadVersionContent` throws `version content not found: <ref>` for an unknown ref. [listenAlignment.ts:loadChapterAlignment] [versions.ts:loadVersionContent]
- `loadLastChapter` returns only values that match `/^\d{2}$/`. `loadSettings` merges stored JSON over the defaults. Storage errors are swallowed. [readingProgress.ts:loadLastChapter] [readingProgress.ts:loadSettings]
- `readingMinutes = max(1, ceil(words / 238))`. [readingStats.ts:readingMinutes]
- The lightbox clamps zoom to `[0.25, 6]`. [lightbox.tsx:LightboxProvider]
- `ScrollAudioFeedback.initialize` does nothing without `window`. `playTick` plays only when the context is running, at most once per 0.05 s. [audio.ts:ScrollAudioFeedback]
- The JSON-LD builders use only `BOOK`, `chapters`, `geo`, `LIBRARY`, and event-ledger data. [structuredData.ts:booksCollectionJsonLd]

## Side Effects
- localStorage keys: `book:reader:progress`, `book:reader:settings`, `book:reader:last-chapter`, `book:reader:text-only`. [readingProgress.ts:PROGRESS_KEY] [readerMode.ts:TEXT_ONLY_KEY]
- `syncTextOnlyUrl` calls `history.replaceState` (or `pushState`). `scrollToProgress` calls `window.scrollTo`. [readerMode.ts:syncTextOnlyUrl] [readingProgress.ts:scrollToProgress]
- `loadChapterAlignment` fetches `/audiobook/ch-NN.align.json`. [listenAlignment.ts:loadChapterAlignment]
- `versions.ts` sets up `import.meta.glob('../data/versions/**/*.md', { query: '?raw' })` lazy loaders. [versions.ts:contentLoaders]
- Static JSON imports at module load: `../evidence.json`, `../data/ledgers/*.json` (5 files), `../data/judge-scores.json`, `../data/diagram-manifest.json`, `../data/versions.json`. [evidenceGraph.ts:evidenceData] [eventLedgers.ts:REGISTRY] [judgeScores.ts:judgeScores] [manifest.ts:manifest] [versions.ts:versions]
- `ScrollAudioFeedback` creates an `AudioContext` and plays noise through the Web Audio API. [audio.ts:ScrollAudioFeedback.playTick]
- `LightboxProvider` adds a `window` `keydown` listener while open and sets `document.body.style.overflow = 'hidden'`. It restores the old value on cleanup. [lightbox.tsx:LightboxProvider]
- Module-level caches: `cached` (graph) and `cachedRegex` (glossary). [evidenceGraph.ts:getEvidenceGraph] [glossaryMatch.ts:cachedRegex]

## Verification
- Run from `website/`: `npm test` (Vitest) and `npm run lint` (`tsc --noEmit`).
- Scope to this directory: `npx vitest run src/lib`.
