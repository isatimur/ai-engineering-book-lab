# components

## Overview
Shared React components. The direct files are cross-page parts: head tags (`Seo`, `JsonLd`), the text-selection menu, the press shelf, the 3D book, and outbound "ask an AI" links. Feature groups live in subdirectories.

## Interface
- `Seo({ title, description, path, image?, type? = 'website', noindex? = false, video? })`; also re-exports `SITE_ORIGIN`. [Seo.tsx:Seo]
- `JsonLd({ data: object | object[] })`. [JsonLd.tsx:JsonLd]
- `ActionMenu({ containerRef })`: popover on text selection with four highlight colors and a dictionary lookup. [ActionMenu.tsx:ActionMenu]
- `ArtifactCard(Artifact)`. [ArtifactCard.tsx:ArtifactCard]
- `AskAI({ variant? = 'light' })`: links to Claude, ChatGPT, and Perplexity with a pre-filled prompt. [AskAI.tsx:ASSISTANTS]
- `Book3D({ book: LibraryEntry })`. [Book3D.tsx:Book3D]
- `DefinitionBlock()`: renders `bookDefinitionEntries()`. [DefinitionBlock.tsx:DefinitionBlock]
- `InteractiveHoverImage(props: any)`: tilting `motion` image. [InteractiveHoverImage.tsx:InteractiveHoverImage]
- `Lightbox({ open, src?, title?, caption?, chapterRef?, onClose })`. [Lightbox.tsx:Lightbox]
- `PressShelf()`: the other books in `LIBRARY` and a link to `PRESS_ORIGIN`. [PressShelf.tsx:PressShelf]
- Subdirectories:
  - [assessment](./assessment/README.md): question card and radar chart.
  - [chapter](./chapter/README.md): chapter article, figures, video, full-book reader.
  - [diff](./diff/README.md): markdown version diff view.
  - [drawers](./drawers/README.md): glossary drawer and table-of-contents sidebar.
  - [evidence](./evidence/README.md): anchor cards, claim markers, evidence graph.
  - [judge](./judge/README.md): judge scorecard and sparkline.
  - [modals](./modals/README.md): settings and share dialogs.
  - [nav](./nav/README.md): top bar, audiobook bar, Explore menu, red-thread tabs.
  - [press](./press/README.md): press homepage explainer sections.
  - [spade-hero](./spade-hero/README.md): `/spade-hero` demo parts.
  - [text](./text/README.md): markdown and inline text renderers.

## Invariants
- `JsonLd` escapes every `<` as the JSON unicode escape for `<` (a backslash followed by `u003c`), so the data cannot close the script tag. [JsonLd.tsx:JsonLd]
- `Seo` makes the image URL absolute against the origin of `publicUrl(path)`. `noindex` emits `noindex, follow`. The default image is `/covers/from-copilot-to-colleague.png`. [Seo.tsx:Seo]
- `ActionMenu` keys highlights by `hashText` of the first 100 characters of the paragraph. It skips paragraphs under 10 characters. It looks up a definition only for a selection under 40 characters with no newline. [ActionMenu.tsx:ActionMenu]
- `Book3D` opens the cover on the first touch tap and follows the link on the second. [Book3D.tsx:Book3D]
- `Lightbox` renders only when `open && src`. Escape and a backdrop click close it. [Lightbox.tsx:Lightbox]
- `PressShelf` leaves out book 1 (`BOOK.id`). [PressShelf.tsx:PressShelf]

## Side Effects
- `ActionMenu` reads and writes localStorage key `reader-highlights`. It adds a `document` `mouseup` listener and changes paragraph inline styles. [ActionMenu.tsx:STORAGE_KEY]
- `ActionMenu` sends the selected text to `https://api.dictionaryapi.dev/api/v2/entries/en/<text>`. [ActionMenu.tsx:ActionMenu]
- `Seo` and `JsonLd` write tags into the document head through vite-react-ssg `<Head>`. [Seo.tsx:Seo] [JsonLd.tsx:JsonLd]
- `Lightbox` adds a `window` `keydown` listener and sets `document.body.style.overflow` while open. [Lightbox.tsx:Lightbox]
- `AskAI`, `ArtifactCard`, and `PressShelf` link to external sites. [AskAI.tsx:ASSISTANTS] [ArtifactCard.tsx:ArtifactCard] [PressShelf.tsx:PressShelf]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory tree.
