import React from 'react';
import { type BookChapter } from '../../data/bookChapters';
import { MarkdownBlock } from '../text/MarkdownBlock';
import { InlineIllustration } from './InlineIllustration';
import { ExpandableSummary } from './ExpandableSummary';
import { inlineFigsForChapter } from '../../lib/manifest';

export const ChapterArticle = ({ chapter }: { chapter: BookChapter }) => {
  const blocks = chapter.content
    .replace(/^# Chapter 3 Draft v0[\s\S]*?---\n+/m, '')
    .replace(/^## Draft note[\s\S]*?---\n+/m, '')
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
      {blocks.map((block, index) => {
        const isHeading = block.startsWith('## ');
        const figIndex = headingFigureIndex;
        if (isHeading) headingFigureIndex += 1;
        return (
          <React.Fragment key={`${chapter.number}-${index}`}>
            <MarkdownBlock block={block} />
            {isHeading && figIndex < figs.length ? (
              <InlineIllustration
                fig={figs[figIndex]}
                label={`Figure ${chapter.number}.${figIndex + 1}`}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
