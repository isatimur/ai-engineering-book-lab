# context

## Overview
React context providers for reader settings, audiobook playback, and word-level listen highlighting. `src/routes.tsx` wraps every page in `SettingsProvider` and `AppLayout`. The `Reader` page adds `AudiobookProvider` and `ListenHighlightProvider`.

## Interface
- `AudiobookProvider({ children })` and `useAudiobook(): AudiobookContextType`. The value holds `tracks`, `currentIndex` (-1 means nothing loaded), `isPlaying`, `currentTime`, `duration`, `speed`, `speeds`, `playChapter(index)`, `toggle(fallbackIndex = 0)`, `seek(seconds)`, `setSpeed(speed)`, `next()`, and `prev()`. [AudiobookContext.tsx:AudiobookProvider] [AudiobookContext.tsx:useAudiobook]
- `ListenHighlightProvider({ children })` and `useListenWords()`. The value holds `listenChapter`, `allocDisplayWordIndex()`, and `isWordActive(displayIdx)`. [ListenHighlightContext.tsx:ListenHighlightProvider] [ListenHighlightContext.tsx:useListenWords]
- `SettingsProvider({ children })`, `useSettings()`, and types `Settings`, `SettingsContextType`. [SettingsContext.tsx:SettingsProvider] [SettingsContext.tsx:useSettings]
- `AppLayout({ children })`: wrapper that sets CSS variables (`--color-paper`, `--color-ink`, `--font-reader`, `--reader-line-spacing`, and others) from the settings. [SettingsContext.tsx:AppLayout]

## Invariants
- `useAudiobook` and `useSettings` throw outside their providers. `useListenWords` never throws; its default is inactive. [AudiobookContext.tsx:useAudiobook] [SettingsContext.tsx:useSettings] [ListenHighlightContext.tsx:ListenWordContext]
- `ListenHighlightProvider` must sit inside `AudiobookProvider`. `AppLayout` must sit inside `SettingsProvider`. [ListenHighlightContext.tsx:ListenHighlightProvider] [SettingsContext.tsx:AppLayout]
- The `Audio` element is created only in `useEffect`, never during SSG. Playback calls do nothing before mount. [AudiobookContext.tsx:AudiobookProvider]
- `loadAndPlay` ignores an index outside `AUDIOBOOK`. On `ended` it plays the next chapter, or stops after the last. `seek` clamps to `[0, audio.duration]`. `prev` clamps to 0. [AudiobookContext.tsx:loadAndPlay] [AudiobookContext.tsx:seek] [AudiobookContext.tsx:prev]
- `listenChapter` is non-null only while a track is loaded and playing. The word counter resets to 0 on each render. A `cancelled` flag drops stale alignment loads. [ListenHighlightContext.tsx:ListenHighlightProvider]
- Settings defaults: theme `sepia`, typography `serif`, font size `md`, line spacing `relaxed`, sound `off`. `updateSettings` merges the partial and saves the result. [SettingsContext.tsx:SettingsProvider] [SettingsContext.tsx:updateSettings]

## Side Effects
- `AudiobookProvider` creates `new Audio()` on mount and removes its listeners and pauses on unmount. Each `loadAndPlay` scrolls `#book-chapter-<n>` into view. [AudiobookContext.tsx:AudiobookProvider] [AudiobookContext.tsx:loadAndPlay]
- `ListenHighlightProvider` fetches the chapter alignment through `loadChapterAlignment` (`/audiobook/ch-NN.align.json`) and scrolls the active `[data-listen-word]` span into view. [ListenHighlightContext.tsx:ListenHighlightProvider]
- `SettingsProvider` reads and writes settings through `loadSettings` / `saveSettings` (localStorage key `book:reader:settings`, in `src/lib/readingProgress.ts`). [SettingsContext.tsx:SettingsProvider]
- `AppLayout` sets a `theme-<theme>` class and `color-scheme` on `document.documentElement`. [SettingsContext.tsx:AppLayout]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory. `npm test` covers alignment logic in `src/lib/listenAlignment.test.ts`.
