import { type BookChapter } from '../../data/bookChapters';
import { MarkdownBlock } from '../text/MarkdownBlock';

/**
 * Strips the drafting-stage `[[id-slug|Label]]` wikilink syntax that book 2's
 * source-anchoring pass still uses (see claims-2/Claims Ledger.md and
 * public/drafting-2/*.md) down to its display label. Book 1's content has
 * already gone through a later pass that removes these; book 2 hasn't yet
 * (out of scope for this pass — see research_passes/2026-08-25-second-book-website-wiring.md).
 * This is presentation-only: it does not touch the synced content files.
 */
const stripWikilinks = (text: string): string =>
  text.replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, '$1').replace(/\[\[([^\]|]+)\]\]/g, '$1');

/**
 * A trimmed-down sibling of ChapterArticle.tsx for book 2. Deliberately does
 * NOT reuse ChapterArticle: that component wires in book-1-only lookups
 * (EvidenceClaimMarkers reads website/src/evidence.json, inlineFigsForChapter
 * / opener() read the book-1 diagram manifest) keyed by chapter.number — and
 * book 2 reuses the same "01".."07" number range, so importing it unmodified
 * would silently render book 1's inline claim markers and diagrams on book 2
 * pages. This component reuses only the generic, chapter-shape-agnostic
 * building blocks (MarkdownBlock) and renders book 2's own evidence via
 * <EvidenceRail evidenceData={...}> in the caller instead.
 */
export const SecondBookArticle = ({ chapter }: { chapter: BookChapter }) => {
  const rawBlocks = chapter.content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  // Drop the manuscript's leading "# Chapter N — …" heading — the page's own
  // <h1> (title) already covers it, same convention as ChapterArticle.tsx.
  const blocks =
    rawBlocks[0]?.startsWith('# ') && !rawBlocks[0].startsWith('## ')
      ? rawBlocks.slice(1)
      : rawBlocks;

  return (
    <div className="book-reader-prose">
      <div className="mb-12 border-b border-[var(--color-border)] pb-8 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        <span>CHAPTER {chapter.number}</span>
        <span className="mx-3">/</span>
        <span>{chapter.wordCount.toLocaleString()} words</span>
        <span className="mx-3">/</span>
        <span>{chapter.status}</span>
      </div>
      {blocks.map((block, index) => (
        <MarkdownBlock key={`${chapter.number}-${index}`} block={stripWikilinks(block)} />
      ))}
    </div>
  );
};
