import React from 'react';
import { type BookChapter } from '../../data/bookChapters';
import { MarkdownBlock } from '../text/MarkdownBlock';
import { InlineIllustration } from './InlineIllustration';
import { ExpandableSummary } from './ExpandableSummary';
import { EvidenceClaimMarkers } from '../evidence/EvidenceClaimMarkers';
import { inlineFigsForChapter } from '../../lib/manifest';

export const ChapterArticle = ({ chapter }: { chapter: BookChapter }) => {
  const blocks = chapter.content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  const figs = inlineFigsForChapter(chapter.number);
  let headingFigureIndex = 0;

  return (
    <div className="book-reader-prose">
      <div className="mb-12 border-b border-[var(--color-border)] pb-8 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        <span>CHAPTER {chapter.number}</span>
        <span className="mx-3">/</span>
        <span>{chapter.wordCount.toLocaleString()} words</span>
        <span className="mx-3">/</span>
        <span>{chapter.status}</span>
      </div>
      <div className="mb-10">
        <ExpandableSummary chapter={chapter} />
      </div>
      <EvidenceClaimMarkers chapterNumber={chapter.number} />
      {blocks.map((block, index) => {
        const isHeading = block.startsWith('## ');
        const figIndex = headingFigureIndex;
        const hasFigure = isHeading && figIndex < figs.length;
        const fig = hasFigure ? figs[figIndex] : null;
        if (isHeading) headingFigureIndex += 1;
        return (
          <React.Fragment key={`${chapter.number}-${index}`}>
            {fig ? <span data-figure-anchor={fig.index} aria-hidden /> : null}
            <MarkdownBlock block={block} />
            {fig ? (
              <InlineIllustration
                fig={fig}
                label={`Figure ${chapter.number}.${figIndex + 1}`}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
