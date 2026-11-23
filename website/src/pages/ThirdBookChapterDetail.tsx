import { Link, useParams } from 'react-router-dom';
import {
  chaptersThree,
  chapterThreeByParam,
  chapterThreePath,
} from '../data/bookChaptersThree';
import { SecondBookArticle } from '../components/chapter/SecondBookArticle';
import { EvidenceRail, type EvidenceIndex } from '../EvidenceRail';
import evidenceThreeJson from '../evidence-3.json';
import { formatReadingTime } from '../lib/readingStats';
import { Seo } from '../components/Seo';

// JSON imports widen `kind` to string; build_evidence.py only emits the four ADR-0003 kinds.
const evidenceThreeData = evidenceThreeJson as EvidenceIndex;

const NotFound = () => (
  <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] flex flex-col items-center justify-center gap-4 font-serif">
    <Seo
      title="Chapter not found — Third Book (Draft)"
      description="The requested chapter could not be found."
      path="/third-book"
      noindex
    />
    <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">404 · chapter not found</p>
    <Link to="/third-book" className="underline">← Back to the third book</Link>
  </div>
);

/**
 * Sibling of SecondBookChapterDetail.tsx for book 3's single-chapter route.
 * Reading + evidence rail. The rail reads evidence-3.json, which
 * build_evidence.py writes from claims-3/ (Source and Artifact anchors,
 * ADR-0003). No diagrams, no audiobook, no judge scorecard.
 * Not in the top nav, but Books.tsx (the Catalogue) renders a visible card
 * linking to /third-book, so these pages are reachable by a reader.
 */
export const ThirdBookChapterDetail = () => {
  const { slug } = useParams();
  const chapter = slug ? chapterThreeByParam(slug) : undefined;
  if (!chapter) return <NotFound />;

  const idx = chaptersThree.indexOf(chapter);
  const prev = idx > 0 ? chaptersThree[idx - 1] : undefined;
  const next = idx < chaptersThree.length - 1 ? chaptersThree[idx + 1] : undefined;

  return (
    <>
      <Seo
        title={`${chapter.seoTitle ?? chapter.title} — Third Book (Draft)`}
        description={chapter.promise}
        path={chapterThreePath(chapter)}
        type="article"
        noindex
      />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased pb-24">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
          <Link to="/third-book" className="hover:text-[var(--color-ink)]">← All chapters</Link>
          <span>Third Book (Draft)</span>
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
          <EvidenceRail chapterNumber={chapter.number} evidenceData={evidenceThreeData} showGraphLink={false} />
        </section>

        <nav className="max-w-3xl mx-auto px-6 pt-20 mt-16 border-t border-[var(--color-border)] flex justify-between gap-4 font-serif">
          {prev ? (
            <Link to={chapterThreePath(prev)} className="group max-w-[45%]">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">← Previous</span>
              <span className="block italic group-hover:underline">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={chapterThreePath(next)} className="group max-w-[45%] text-right ml-auto">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">Next →</span>
              <span className="block italic group-hover:underline">{next.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </div>
    </>
  );
};

/** Concrete chapter paths for static prerendering. Empty while the track is empty. */
export const thirdBookChapterStaticPaths = (): string[] =>
  chaptersThree.map((c) => `third-book/${c.slug}`);
