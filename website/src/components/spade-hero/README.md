# spade-hero

## Overview
Parts of the `/spade-hero` demo page: a video hero, ambient motion, service pills, and a navbar. The navbar links are placeholders.

## Interface
- `AmbientMotion()`: mouse-following blobs. [AmbientMotion.tsx:AmbientMotion]
- `BackgroundVideo()`: three `<video>` elements (ambient, desktop scrub, mobile) plus `AmbientMotion` and veil overlays. [BackgroundVideo.tsx:BackgroundVideo]
- `ServicePills()`: multi-select pills (Brand, Digital, Campaign, Other). [ServicePills.tsx:ServicePills]
- `SpadeNavbar()`: fixed header with a mobile menu overlay. [SpadeNavbar.tsx:SpadeNavbar]

## Invariants
- `AmbientMotion` renders nothing and adds no listener when reduced motion is preferred. [AmbientMotion.tsx:AmbientMotion]
- `BackgroundVideo` scrubs on `mousemove` only when `window.innerWidth >= 1024`, motion is not reduced, and the video duration is finite and non-zero. It clamps the time to `[0, duration]`. [BackgroundVideo.tsx:BackgroundVideo]
- `BackgroundVideo` calls `resolveVideoSrc` with `PREFER_LOCAL = true`. It swallows `play()` rejections. [BackgroundVideo.tsx:BackgroundVideo]
- The "Let's Go" button in `ServicePills` has no `onClick`. `SpadeNavbar` links use `href="#"`. [ServicePills.tsx:ServicePills] [SpadeNavbar.tsx:SpadeNavbar]
- `SpadeNavbar` closes the mobile menu on Escape and resets `document.body.style.overflow` on close and unmount. [SpadeNavbar.tsx:SpadeNavbar]

## Side Effects
- Passive `window` `mousemove` and `resize` listeners and video `seeked` / `loadedmetadata` listeners. Cleanup removes them. [BackgroundVideo.tsx:BackgroundVideo] [AmbientMotion.tsx:AmbientMotion]
- `BackgroundVideo` controls video playback (`play`, `pause`, `currentTime`, `playbackRate`). Sources come from `src/data/spadeHeroVideos.ts`. [BackgroundVideo.tsx:BackgroundVideo]
- `SpadeNavbar` sets `document.body.style.overflow = 'hidden'` while the menu is open and adds a `window` `keydown` listener. [SpadeNavbar.tsx:SpadeNavbar]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory.
