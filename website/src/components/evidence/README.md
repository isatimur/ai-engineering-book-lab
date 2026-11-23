# evidence

## Overview
React components that show the book's evidence layer. They render source anchors (YouTube quotes and artifact excerpts), claim markers, and the force-directed evidence graph. The graph data comes from `src/lib/evidenceGraph.ts`.

## Interface
- `AnchorCard({ anchor: Anchor })`: YouTube anchor card with a thumbnail, click-to-play iframe, quote, label, and confidence. [AnchorCard.tsx:AnchorCard]
- `ArtifactAnchorCard({ anchor: ArtifactAnchor })`: shows `anchor.excerpt` in a `<pre>`, a label from `artifactAnchorLabel(anchor)`, and `anchor.date`. [ArtifactAnchorCard.tsx:ArtifactAnchorCard]
- `ChapterContextBanner({ activeChapter?, surface: 'graph' | 'experience' })`: "Resume read" banner with links to `readChapterUrl` and `graphUrl` / `experienceUrl`. [ChapterContextBanner.tsx:ChapterContextBanner]
- `EvidenceClaimMarkers({ chapterNumber })`: aside with numbered claim links to `${graphUrl(ch)}&claim=<claim_id>`. [EvidenceClaimMarkers.tsx:EvidenceClaimMarkers]
- `EvidenceSectionHeader({ chapterNumber, onOpenSources? })`: shows claim and anchor counts, an optional "Explore graph" button, a "Full graph" link, and `ExperienceLink`. [EvidenceSectionHeader.tsx:EvidenceSectionHeader]
- `RedThreadLinks({ chapterNumber })`: "Read chapter" link, `GraphLink`, and `ExperienceLink`. [EvidenceSectionHeader.tsx:RedThreadLinks]
- `ExperienceLink({ chapterNumber, className? })`: plain `<a href={experienceUrl(ch)}>` labelled "3D Journey". [ExperienceLink.tsx:ExperienceLink]
- `GraphLink({ chapterNumber, className? })`: router `Link` to `graphUrl(ch)`. [ExperienceLink.tsx:GraphLink]
- `SourcesDrawer({ chapterNumber, isOpen, onClose })`: right-side drawer that lazy-loads a compact `EvidenceGraphView`. [SourcesDrawer.tsx:SourcesDrawer]
- `EvidenceGraphView({ chapterNumber?, compact? = false })`: search box, canvas, legend, stats, selected-node details, and a "Reset layout" button. It reads `?claim=` and the theme from `useSettings`. [EvidenceGraphView.tsx:EvidenceGraphView]
- `EvidenceGraphCanvas({ graph, focusChapter?, searchQuery?, highlightNodeId?, onSelect?, className? })`: force-directed canvas with zoom buttons, hover tooltip, and match count. [EvidenceGraphCanvas.tsx:EvidenceGraphCanvas]

## Invariants
- `AnchorCard` mounts the iframe only after a click. It shows "loosely sourced" when `anchor.confidence === 'low'`. [AnchorCard.tsx:AnchorCard]
- `ChapterContextBanner` returns `null` when `activeChapter` is set, when `loadLastChapter()` is empty, or when `chapterByNumber(last)` finds no chapter. [ChapterContextBanner.tsx:ChapterContextBanner]
- `EvidenceClaimMarkers` and `EvidenceSectionHeader` return `null` when the chapter has no claims. [EvidenceClaimMarkers.tsx:EvidenceClaimMarkers] [EvidenceSectionHeader.tsx:EvidenceSectionHeader]
- `EvidenceGraphView` shows an empty state with a link to `/read/graph` when the filtered graph has no nodes. A chapter-node selection calls `navigate(graphUrl(node.chapterNumber))`. The canvas key is `${chapterNumber ?? 'all'}-${resetKey}`, so "Reset layout" remounts it. [EvidenceGraphView.tsx:EvidenceGraphView]
- `EvidenceGraphCanvas` clamps zoom to `[0.5, 2.5]` and the container to at least 320x320. It skips the physics step while `document.hidden`. A graph change resets pan and selection. Edges with a missing endpoint are skipped. [EvidenceGraphCanvas.tsx:EvidenceGraphCanvas]

## Side Effects
- `AnchorCard` loads `https://img.youtube.com/vi/<video_id>/hqdefault.jpg` and, on click, an iframe from `https://www.youtube-nocookie.com/embed/...`. [AnchorCard.tsx:AnchorCard]
- `ChapterContextBanner` reads the last chapter through `loadLastChapter()` from `src/lib/readingProgress.ts`. [ChapterContextBanner.tsx:ChapterContextBanner]
- `SourcesDrawer` sets `document.body.style.overflow` to `hidden` while open and resets it on close and cleanup. [SourcesDrawer.tsx:SourcesDrawer]
- `EvidenceGraphView` opens `https://www.youtube.com/watch?v=<id>&t=<start>s` in a new tab. [EvidenceGraphView.tsx:EvidenceGraphView]
- `EvidenceGraphCanvas` runs a `requestAnimationFrame` loop, a `visibilitychange` listener, a `ResizeObserver`, and a 480 ms `fitToFocus` timer. Cleanup cancels all four. [EvidenceGraphCanvas.tsx:EvidenceGraphCanvas]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory. `npm test` covers the graph logic in `src/lib/evidenceGraph.test.ts`.
