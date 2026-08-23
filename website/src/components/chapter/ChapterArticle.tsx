import React from 'react';
import { type BookChapter } from '../../data/bookChapters';
import { MarkdownBlock } from '../text/MarkdownBlock';
import { InlineIllustration } from './InlineIllustration';
import { ExpandableSummary } from './ExpandableSummary';
import { EvidenceClaimMarkers } from '../evidence/EvidenceClaimMarkers';
import { inlineFigsForChapter } from '../../lib/manifest';
import { useListenWords } from '../../context/ListenHighlightContext';

export const ChapterArticle = ({ chapter }: { chapter: BookChapter }) => {
  const { listenChapter } = useListenWords();
  const listen = listenChapter === chapter.number;
  const rawBlocks = chapter.content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
  // The chapter title is already the chapter's <h1> in the sticky stage header,
  // the opener diagram, and the metadata line above. Drop the manuscript's
  // leading "# Chapter N — …" so it isn't repeated as a giant heading in the
  // reading column (which rendered it awkwardly after the claims list).
  const blocks =
    rawBlocks[0]?.startsWith('# ') && !rawBlocks[0].startsWith('## ')
      ? rawBlocks.slice(1)
      : rawBlocks;

  const figs = inlineFigsForChapter(chapter.number);
  let headingFigureIndex = 0;

  // The practical checklist is a distinct utility section, not flowing prose —
  // give it a bordered callout instead of blending into the reading column.
  // It's designed to be the chapter's last section (heading through end of
  // content), so a single split point is enough; no need to detect a "next
  // heading" close boundary.
  const practicalIndex = blocks.findIndex((b) => b.trim() === '## Practical checklist');
  const proseBlocks = practicalIndex === -1 ? blocks : blocks.slice(0, practicalIndex);
  const practicalBlocks = practicalIndex === -1 ? [] : blocks.slice(practicalIndex);

  // allowFigure is false for the practical checklist: it's a text-only utility
  // block, and diagram figures are matched to headings purely by occurrence
  // order (see inlineFigsForChapter), so a chapter whose figure count happens
  // to equal its prior heading count would otherwise dump a full illustration
  // inside the callout the moment this trailing heading is added.
  const renderBlock = (block: string, key: string, allowFigure: boolean) => {
    const isHeading = block.startsWith('## ');
    const figIndex = headingFigureIndex;
    const hasFigure = allowFigure && isHeading && figIndex < figs.length;
    const fig = hasFigure ? figs[figIndex] : null;
    if (isHeading) headingFigureIndex += 1;
    return (
      <React.Fragment key={key}>
        {fig ? <span data-figure-anchor={fig.index} aria-hidden /> : null}
        <MarkdownBlock block={block} chapterNumber={chapter.number} listen={listen} />
        {fig ? (
          <InlineIllustration
            fig={fig}
            label={`Figure ${chapter.number}.${figIndex + 1}`}
          />
        ) : null}
      </React.Fragment>
    );
  };

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
      {proseBlocks.map((block, index) => renderBlock(block, `${chapter.number}-prose-${index}`, true))}
      {practicalBlocks.length > 0 && (
        <div className="practical-checklist mt-12 border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_4%,transparent)] px-6 py-8 sm:px-8">
          {practicalBlocks.map((block, index) => renderBlock(block, `${chapter.number}-practical-${index}`, false))}
        </div>
      )}
    </div>
  );
};
