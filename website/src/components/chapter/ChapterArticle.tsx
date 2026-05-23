import { Fragment } from 'react';
import { type BookChapter } from '../../data/bookChapters';
import { MarkdownBlock } from '../text/MarkdownBlock';
import { InlineIllustration } from './InlineIllustration';
import { getChapterGuide, type ConceptFigure } from './ChapterIllustration';

const chapterDiagram: Record<string, string> = {
  '01': '/diagrams/05-chapter1-the-shift.png',
  '02': '/diagrams/06-chapter2-taste.png',
  '03': '/diagrams/07-chapter3-harnesses.png',
  '04': '/diagrams/08-chapter4-evals.png',
  '05': '/diagrams/09-chapter5-context.png',
  '06': '/diagrams/10-chapter6-runtimes.png',
  '07': '/diagrams/11-chapter7-security.png',
  '08': '/diagrams/12-chapter8-realtime.png',
  '09': '/diagrams/13-chapter9-ai-native-org.png',
  '10': '/diagrams/14-chapter10-what-endures.png',
};

// ConceptMap helper, currently inlined in App.tsx; will be removed in Task 17
const ConceptMap = ({ figures }: { figures: ConceptFigure[] }) => (
  <div className="concept-map">
    {figures.map((figure, index) => (
      <div key={figure.title} className="concept-map-item">
        <InlineIllustration figure={figure} label={`Idea ${index + 1}`} compact />
      </div>
    ))}
  </div>
);

export const ChapterArticle = ({ chapter }: { chapter: BookChapter }) => {
  const blocks = chapter.content
    .replace(/^# Chapter 3 Draft v0[\s\S]*?---\n+/m, '')
    .replace(/^## Draft note[\s\S]*?---\n+/m, '')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  const figures = getChapterGuide(chapter);
  let headingFigureIndex = 0;

  return (
    <article id={`book-chapter-${chapter.number}`} className="book-reader-prose">
      <div className="mb-12 border-b border-[var(--color-border)] pb-8 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        <span>CHAPTER {chapter.number}</span>
        <span className="mx-3">/</span>
        <span>{chapter.wordCount.toLocaleString()} words</span>
        <span className="mx-3">/</span>
        <span>{chapter.status}</span>
      </div>
      <p className="mb-10 text-[1.45rem] leading-[1.35] italic text-[var(--color-ink-muted)]">
        {chapter.promise}
      </p>
      {chapterDiagram[chapter.number] ? (
        <figure className="mb-12 border border-[var(--color-border)] bg-white">
          <img
            src={chapterDiagram[chapter.number]}
            alt={`Chapter ${chapter.number}: the naive way versus the engineered way`}
            className="block h-auto w-full"
            loading="lazy"
          />
          <figcaption className="border-t border-[var(--color-border)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
            Fig. {chapter.number} — before / after: how this chapter changes the work
          </figcaption>
        </figure>
      ) : null}
      <ConceptMap figures={figures} />
      {blocks.map((block, index) => (
        <Fragment key={`${chapter.number}-${index}`}>
          <MarkdownBlock block={block} />
          {block.startsWith('## ') && headingFigureIndex < figures.length ? (
            <InlineIllustration
              figure={figures[headingFigureIndex]}
              label={`Figure ${chapter.number}.${headingFigureIndex + 1}`}
              compact={false}
            />
          ) : null}
          {block.startsWith('## ') ? void (headingFigureIndex += 1) : null}
        </Fragment>
      ))}
    </article>
  );
};
