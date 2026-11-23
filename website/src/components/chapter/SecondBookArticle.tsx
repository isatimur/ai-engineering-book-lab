import { Fragment } from 'react';
import { type BookChapter } from '../../data/bookChapters';
import { MarkdownBlock } from '../text/MarkdownBlock';
import { InlineIllustration } from './InlineIllustration';
import { type FigureTwo, figureTwoSrc, normaliseHeading, stripWikilinks } from '../../data/figuresTwo';

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
// stripWikilinks lives in data/figuresTwo.ts so the figure-heading check and
// this renderer normalise headings the same way. It strips the drafting-stage
// `[[id-slug|Label]]` syntax book 2's source-anchoring pass still uses down to
// its label. Presentation-only: it does not touch the synced content files.
//
// `figures` (book 2 only) places each inline figure after the `## ` or `### `
// heading (chapters 2 and 6 nest sections under "Movement" headings)
// whose normalised text equals its `sectionHeading`. Book 3 passes none.
export const SecondBookArticle = ({
  chapter,
  figures = [],
}: {
  chapter: BookChapter;
  figures?: FigureTwo[];
}) => {
  const chapterNo = parseInt(chapter.number, 10);
  let figureCount = 0;
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
      {blocks.map((block, index) => {
        const heading = /^#{2,3} /.test(block) ? normaliseHeading(block) : null;
        const fig = heading ? figures.find((f) => f.sectionHeading === heading) : undefined;
        if (fig) figureCount += 1;
        return (
          <Fragment key={`${chapter.number}-${index}`}>
            <MarkdownBlock block={stripWikilinks(block)} />
            {fig && (
              <InlineIllustration
                fig={{ src: figureTwoSrc(fig), title: fig.title }}
                label={`Figure ${chapterNo}.${figureCount}`}
                alwaysVisible
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
