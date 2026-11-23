# nav

## Overview
Navigation chrome: the top bar, the audiobook bottom bar, the Explore menu, the red-thread tabs (Read / Evidence / 3D), and the mobile reader bars.

## Interface
- `BottomNav({ onToggleSidebar, isFocusMode?, onToggleFocusMode?, textOnly?, onToggleTextOnly? })`: audiobook controls from `useAudiobook()`. [BottomNav.tsx:BottomNav]
- `ExploreItem` type and `EXPLORE_ITEMS` (10 destinations, two of them external: `/experience` and `/whitepapers/ai-native-org`). [ExploreMenu.tsx:EXPLORE_ITEMS]
- `ExploreMenu({ variant? = 'light', className? })`: desktop dropdown. [ExploreMenu.tsx:ExploreMenu]
- `MobileNavMenu({ variant?, className? })`: hamburger menu, hidden at `lg` and up. [ExploreMenu.tsx:MobileNavMenu]
- `MobileChapterChoice({ chapterNumber, onReadText, className? })`: 3D link and "Read text" button, hidden at `md` and up. [MobileChapterChoice.tsx:MobileChapterChoice]
- `MobileReaderBar({ textOnly, onToggleTextOnly, chapterNumber? })`: fixed pill bar with a text toggle, 3D link, and Evidence link. [MobileReaderBar.tsx:MobileReaderBar]
- `RedThreadNav({ active: ExperienceSurface, chapterNumber?, className?, compact? })`. [RedThreadNav.tsx:RedThreadNav]
- `TopNav({ progress: MotionValue<number>, onToggleSettings, onBackToCatalogue?, onOpenShare? })`. [TopNav.tsx:TopNav]

## Invariants
- `BottomNav` seeks only when a track is loaded (`currentIndex >= 0`) and `duration > 0`. It clamps the ratio to 0..1. [BottomNav.tsx:BottomNav]
- `nearestChapterIndex` returns 0 when `document` is undefined or no `#book-chapter-N` element is in view. [BottomNav.tsx:nearestChapterIndex]
- Optional buttons (Focus, Text only, Back, Share) render only when their handler is passed. [BottomNav.tsx:BottomNav] [TopNav.tsx:TopNav]
- Menus close on Escape, on an outside `mousedown`, and on any item click. External items use `<a href>`; internal items use router `Link`. [ExploreMenu.tsx:ExploreMenu]
- `RedThreadNav` resolves the chapter as `chapterNumber ?? loadLastChapter()`. The Read link falls back to `/read`. The 3D tab uses plain `<a>`. [RedThreadNav.tsx:RedThreadNav]

## Side Effects
- `BottomNav` calls `toggle`, `seek`, and `setSpeed` on the audiobook context and reads `getBoundingClientRect` of chapter elements. [BottomNav.tsx:BottomNav]
- `ExploreMenu` and `MobileNavMenu` add `document` `keydown` and `mousedown` listeners while open and remove them on close. [ExploreMenu.tsx:ExploreMenu]
- `RedThreadNav` reads `loadLastChapter()` (localStorage, via `src/lib/readingProgress.ts`) on every render. [RedThreadNav.tsx:RedThreadNav]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory.
