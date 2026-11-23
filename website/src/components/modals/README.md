# modals

## Overview
Reader settings and share dialogs.

## Interface
- `SettingsModal({ isOpen, onClose, settings: Settings, updateSettings: (next: Partial<Settings>) => void })`. [SettingsModal.tsx:SettingsModal]
- Type `Settings = { theme: 'light' | 'sepia' | 'dark', typography: 'serif' | 'sans' | 'dyslexic', fontSize: 'sm' | 'md' | 'lg', lineSpacing: 'normal' | 'relaxed' | 'loose', sound: 'off' | 'paper' }`. [SettingsModal.tsx:Settings]
- `ShareModal({ isOpen, onClose })`. [ShareModal.tsx:ShareModal]

## Invariants
- Both modals return `null` when `!isOpen`. The backdrop and the close button call `onClose`. Neither has an Escape handler. [SettingsModal.tsx:SettingsModal] [ShareModal.tsx:ShareModal]
- `SettingsModal` does not persist settings. It only calls `updateSettings`. Persistence is in `SettingsProvider` (`src/context/SettingsContext.tsx`). [SettingsModal.tsx:SettingsModal]
- `ShareModal` uses `window.location.href` as the URL, or `''` when `window` is undefined. The title is fixed to "From Copilot to Colleague". [ShareModal.tsx:ShareModal]

## Side Effects
- `ShareModal` calls `navigator.clipboard.writeText(url)`. It swallows a failure. A 2000 ms timer resets the "copied" flag and is not cleared on unmount. [ShareModal.tsx:handleCopy]
- `ShareModal` links to `https://twitter.com/intent/tweet` and `https://www.linkedin.com/sharing/share-offsite/` in a new tab. [ShareModal.tsx:ShareModal]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory.
