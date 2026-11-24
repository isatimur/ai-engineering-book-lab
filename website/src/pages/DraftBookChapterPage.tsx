import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { DraftBook } from '../data/draftBooks';
import { SecondBookArticle } from '../components/chapter/SecondBookArticle';
import { BookOpenerFigure } from '../components/chapter/BookOpenerFigure';
import { ChapterExplainerVideo } from '../components/chapter/ChapterExplainerVideo';
import { BookContentsDrawer } from '../components/draft/BookContentsDrawer';
import { ShareButton } from '../components/draft/ShareButton';
import { SourcesDrawer } from '../components/evidence/SourcesDrawer';
import { EvidenceRail } from '../EvidenceRail';
import { formatReadingTime } from '../lib/readingStats';
import { Seo } from '../components/Seo';
import { LightboxProvider } from '../lib/lightbox';
import { useTextOnlyMode } from '../hooks/useTextOnlyMode';
import { saveDraftLastChapter } from '../lib/draftProgress';

const NotFound = ({ book }: { book: DraftBook }) => (
  <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] flex flex-col items-center justify-center gap-4 font-serif">
    <Seo
      title={`Chapter not found — ${book.label}`}
      description="The requested chapter could not be found."
      path={book.indexPath}
      noindex
    />
    <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">404 · chapter not found</p>
    <Link to={book.indexPath} className="underline">← Back to the book</Link>
  </div>
);

const headerButton = 'uppercase tracking-widest hover:text-[var(--color-ink)] transition-colors';

/**
 * One chapter of a draft book (2 or 3). Both books share this page and differ
 * only in their DraftBook record (data/draftBooks.ts), so every reader feature
 * is built once:
 * - the opener figure above the text, and inline figures after their sections
 * - Focus text (text-only mode, shared with book 1's preference)
 * - a contents drawer (this chapter's sections, every chapter, graph, figures)
 * - a sources drawer with this chapter's evidence graph
 * - Share (system share sheet, or copy link)
 * - a per-book "last chapter" bookmark for the book's landing page
 * - the chapter's explainer video, where one has been rendered
 * Still none of: audiobook, judge scorecard (none exist yet).
 */
export const DraftBookChapterPage = ({ book }: { book: DraftBook }) => {
  const { slug } = useParams();
  const chapter = slug ? book.byParam(slug) : undefined;
  const { textOnly, toggleTextOnly } = useTextOnlyMode();
  const [contentsOpen, setContentsOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  useEffect(() => {
    if (chapter) saveDraftLastChapter(book.key, chapter.slug);
  }, [book.key, chapter]);

  if (!chapter) return <NotFound book={book} />;

  const idx = book.chapters.indexOf(chapter);
  const prev = idx > 0 ? book.chapters[idx - 1] : undefined;
  const next = idx < book.chapters.length - 1 ? book.chapters[idx + 1] : undefined;
  const opener = book.figures.opener(chapter.number);
  const video = book.video(chapter);
  const chapterNo = parseInt(chapter.number, 10);

  return (
    <LightboxProvider>
      <Seo
        title={`${chapter.seoTitle ?? chapter.title} — ${book.label}`}
        description={chapter.promise}
        path={book.chapterPath(chapter)}
        image={book.ogCard(chapter)}
        type="article"
        noindex
      />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased pb-24">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
          <div className="flex items-center gap-4">
            <Link to={book.indexPath} className={headerButton}>← All chapters</Link>
            <button type="button" onClick={() => setContentsOpen(true)} className={headerButton}>
              Contents
            </button>
          </div>
          <span className="hidden md:inline">{book.label}</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleTextOnly}
              aria-pressed={textOnly}
              className={headerButton}
            >
              {textOnly ? 'Text only ✓' : 'Focus text'}
            </button>
            <button type="button" onClick={() => setSourcesOpen(true)} className={headerButton}>
              Sources
            </button>
            <ShareButton title={`${chapter.title} — ${book.title}`} className={headerButton} />
          </div>
        </header>

        <main id="main">
          <div className="max-w-3xl mx-auto px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4 pt-12">
              Chapter {chapter.number} · {formatReadingTime(chapter.wordCount)}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">{chapter.title}</h1>
            <p className="font-serif italic text-xl text-[var(--color-ink-muted)] mb-6">{chapter.promise}</p>
          </div>

          {!textOnly && video && <ChapterExplainerVideo video={video} />}

          {!textOnly && opener && (
            <BookOpenerFigure src={book.figures.src(opener)} title={opener.title} chapterNo={chapterNo} />
          )}

          <article className={`max-w-3xl mx-auto px-6 pt-10 ${textOnly ? 'reader-text-only-prose px-5 sm:px-8' : ''}`}>
            <SecondBookArticle chapter={chapter} figures={textOnly ? [] : book.figures.inline(chapter.number)} />
          </article>

          <section className="max-w-3xl mx-auto px-6 pt-8">
            <EvidenceRail chapterNumber={chapter.number} evidenceData={book.evidence} showGraphLink={false} />
            <button
              type="button"
              onClick={() => setSourcesOpen(true)}
              className="mt-6 font-mono text-[10px] uppercase tracking-widest border border-[var(--color-border)] px-3 py-1.5 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
            >
              Explore this chapter's evidence graph →
            </button>
          </section>
        </main>

        <nav className="max-w-3xl mx-auto px-6 pt-20 mt-16 border-t border-[var(--color-border)] flex justify-between gap-4 font-serif">
          {prev ? (
            <Link to={book.chapterPath(prev)} className="group max-w-[45%]">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">← Previous</span>
              <span className="block italic group-hover:underline">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={book.chapterPath(next)} className="group max-w-[45%] text-right ml-auto">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">Next →</span>
              <span className="block italic group-hover:underline">{next.title}</span>
            </Link>
          ) : <span />}
        </nav>

        <BookContentsDrawer book={book} chapter={chapter} isOpen={contentsOpen} onClose={() => setContentsOpen(false)} />
        <SourcesDrawer
          chapterNumber={chapter.number}
          isOpen={sourcesOpen}
          onClose={() => setSourcesOpen(false)}
          book={book.graph}
        />
      </div>
    </LightboxProvider>
  );
};
