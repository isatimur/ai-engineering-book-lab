import { Link } from 'react-router-dom';
import { chaptersTwo, chapterTwoPath, chaptersTwoWordCount, BOOK_TWO_TITLE } from '../data/bookChaptersTwo';
import { SecondBookArticle } from '../components/chapter/SecondBookArticle';
import { EvidenceRail } from '../EvidenceRail';
import evidenceTwoData from '../evidence-2.json';
import { formatReadingTime } from '../lib/readingStats';
import { Seo } from '../components/Seo';

/**
 * Trimmed-down sibling of Reader.tsx + FullBookReader.tsx (book 1) for book
 * 2's full-book route. Deliberately does not reuse FullBookReader: that
 * component is wired to book-1-only infrastructure (opener/inline diagrams,
 * the audiobook player, judge scorecards) that book 2 either doesn't have
 * yet or is explicitly out of scope for this pass (see
 * programs/second_book_website_wiring.md). This is reading + evidence only —
 * a table of contents followed by each chapter's prose and evidence rail.
 * Deliberately unlinked from nav/Catalogue — reachable only by direct URL.
 */
export const SecondBookReader = () => {
  const totalWords = chaptersTwoWordCount;
  return (
    <>
      <Seo
        title="Second Book (Draft) — Read"
        description="All 7 drafted chapters of the second book, in one continuous read."
        path="/second-book"
        type="website"
        noindex
      />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased pb-24">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
          <Link to="/" className="hover:text-[var(--color-ink)]">← Catalogue</Link>
          <span>Second Book (Draft)</span>
          <span />
        </header>

        <div className="max-w-3xl mx-auto px-6 pt-16 pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4">
            {chaptersTwo.length} chapters · {formatReadingTime(totalWords)}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
            {BOOK_TWO_TITLE}
          </h1>
          <p className="font-serif italic text-xl text-[var(--color-ink-muted)] mb-10">
            Working draft. Part I breaks the assumption that the model is given; Part II breaks the
            assumption that the generic agent playbook fits every domain.
          </p>
          <ol className="list-none p-0 m-0 space-y-4 font-serif">
            {chaptersTwo.map((chapter) => (
              <li key={chapter.number} className="border-b border-[var(--color-border)] pb-4">
                <Link to={chapterTwoPath(chapter)} className="group flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                    Chapter {chapter.number} · {formatReadingTime(chapter.wordCount)}
                  </span>
                  <span className="text-xl group-hover:underline">{chapter.title}</span>
                  <span className="text-[var(--color-ink-muted)] italic">{chapter.promise}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <section className="w-full border-t border-[var(--color-border)] flex flex-col">
          {chaptersTwo.map((chapter, index) => (
            <article
              key={chapter.number}
              id={`second-book-chapter-${chapter.number}`}
              className={`border-t border-[var(--color-border)] ${
                index % 2 === 0 ? 'bg-[color-mix(in_srgb,var(--color-ink)_3%,var(--color-paper))]' : 'bg-[var(--color-paper)]'
              }`}
            >
              <div className="max-w-3xl mx-auto px-6 pt-16">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4">
                  Chapter {chapter.number} · {formatReadingTime(chapter.wordCount)}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">{chapter.title}</h2>
                <p className="font-serif italic text-lg text-[var(--color-ink-muted)] mb-6">{chapter.promise}</p>
              </div>
              <div className="max-w-3xl mx-auto px-6 pt-4 pb-8">
                <SecondBookArticle chapter={chapter} />
                <EvidenceRail
                  chapterNumber={chapter.number}
                  evidenceData={evidenceTwoData}
                  showGraphLink={false}
                />
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
};
