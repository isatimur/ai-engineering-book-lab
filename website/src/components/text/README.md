# text

## Overview
Markdown and inline text renderers for chapter bodies. They add glossary buttons and per-word spans for audiobook highlighting.

## Interface
- `InlineText({ text: string, listen? = false })`: parses inline links, `**bold**`, `` `code` ``, `*em*`, and glossary terms. [text/InlineText.tsx:InlineText]
- `ListenWordRun({ text: string, listen: boolean })`: plain text, or one `<span data-listen-word={idx}>` per word when `listen` is true. [text/ListenWordRun.tsx:ListenWordRun]
- `MarkdownBlock({ block: string, chapterNumber?, listen? = false })`: renders `h1`/`h2`/`h3`, blockquote, `ul`, `ol`, or `p` by prefix. `chapterNumber` is declared but not used. [text/MarkdownBlock.tsx:MarkdownBlock]

## Invariants
- `InlineText` turns a link into an anchor only for `http(s)://`, `/`, or `#` targets. Other schemes (for example `javascript:`) render as plain text. External links get `target="_blank" rel="noopener noreferrer"`. [text/InlineText.tsx:InlineText]
- `ListenWordRun` allocates display word indices during render, in render order. With `listen = false` it allocates nothing. [text/ListenWordRun.tsx:ListenWordRun]
- `MarkdownBlock` falls back to `<p>` and replaces newlines with spaces. Headings skip `InlineText`. List items use the item text as the React key. [text/MarkdownBlock.tsx:MarkdownBlock]

## Side Effects
- `InlineText` glossary buttons call `useGlossary().open(termId)`. [text/InlineText.tsx:InlineText]
- `ListenWordRun` advances the shared word counter in `ListenHighlightProvider` during render when `listen` is true. [text/ListenWordRun.tsx:ListenWordRun]

## Verification
- Run from `website/`: `npm run lint` (`tsc --noEmit`).
- No test files exist in this directory. `npm test` covers term matching in `src/lib/glossaryMatch.test.ts`.
