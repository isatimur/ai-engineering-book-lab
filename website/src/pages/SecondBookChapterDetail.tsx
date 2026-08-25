import { Link, useParams } from 'react-router-dom';
import {
  chaptersTwo,
  chapterTwoByParam,
  chapterTwoPath,
} from '../data/bookChaptersTwo';
import { SecondBookArticle } from '../components/chapter/SecondBookArticle';
import { EvidenceRail } from '../EvidenceRail';
import evidenceTwoData from '../evidence-2.json';
import { formatReadingTime } from '../lib/readingStats';
import { Seo } from '../components/Seo';

const NotFound = () => (
  <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] flex flex-col items-center justify-center gap-4 font-serif">
    <Seo
      title="Chapter not found — Second Book (Draft)"
      description="The requested chapter could not be found."
      path="/second-book"
      noindex
    />
    <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">404 · chapter not found</p>
    <Link to="/second-book" className="underline">← Back to the second book</Link>
  </div>
);

/**
 * Trimmed-down sibling of ChapterDetail.tsx (book 1) for book 2's single-
 * chapter route. Reading + evidence rail only, per
 * programs/second_book_website_wiring.md — no diagrams (book 2 has none
 * yet), no audiobook, no judge scorecard (no judge-panel run exists yet),
 * no evidence-graph link (book 2 has no graph page). Deliberately unlinked
 * from nav/Catalogue — reachable only by direct URL for now.
 */
export const SecondBookChapterDetail = () => {
  const { slug } = useParams();
  const chapter = slug ? chapterTwoByParam(slug) : undefined;
  if (!chapter) return <NotFound />;

  const idx = chaptersTwo.indexOf(chapter);
  const prev = idx > 0 ? chaptersTwo[idx - 1] : undefined;
  const next = idx < chaptersTwo.length - 1 ? chaptersTwo[idx + 1] : undefined;

  return (
    <>
      <Seo
        title={`${chapter.seoTitle ?? chapter.title} — Second Book (Draft)`}
        description={chapter.promise}
        path={chapterTwoPath(chapter)}
        type="article"
        noindex
      />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased pb-24">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
          <Link to="/second-book" className="hover:text-[var(--color-ink)]">← All chapters</Link>
          <span>Second Book (Draft)</span>
          <span />
        </header>

        <div className="max-w-3xl mx-auto px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4 pt-12">
            Chapter {chapter.number} · {formatReadingTime(chapter.wordCount)}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">{chapter.title}</h1>
          <p className="font-serif italic text-xl text-[var(--color-ink-muted)] mb-6">{chapter.promise}</p>
        </div>

        <article className="max-w-3xl mx-auto px-6 pt-10">
          <SecondBookArticle chapter={chapter} />
        </article>

        <section className="max-w-3xl mx-auto px-6 pt-8">
          <EvidenceRail
            chapterNumber={chapter.number}
            evidenceData={evidenceTwoData}
            showGraphLink={false}
          />
        </section>

        <nav className="max-w-3xl mx-auto px-6 pt-20 mt-16 border-t border-[var(--color-border)] flex justify-between gap-4 font-serif">
          {prev ? (
            <Link to={chapterTwoPath(prev)} className="group max-w-[45%]">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">← Previous</span>
              <span className="block italic group-hover:underline">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={chapterTwoPath(next)} className="group max-w-[45%] text-right ml-auto">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">Next →</span>
              <span className="block italic group-hover:underline">{next.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </div>
    </>
  );
};

/** Concrete chapter paths for static prerendering. */
export const secondBookChapterStaticPaths = (): string[] =>
  chaptersTwo.map((c) => `second-book/${c.slug}`);
