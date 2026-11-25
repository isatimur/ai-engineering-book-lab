import { Link } from 'react-router-dom';
import { bookTwo } from '../data/draftBooks';
import { DraftBookLanding } from '../components/draft/DraftBookLanding';
import { LightboxProvider } from '../lib/lightbox';
import { chaptersTwo, chapterTwoPath, BOOK_TWO_COVER } from '../data/bookChaptersTwo';
import { SecondBookArticle } from '../components/chapter/SecondBookArticle';
import { EvidenceRail } from '../EvidenceRail';
import evidenceTwoData from '../evidence-2.json';
import { formatReadingTime } from '../lib/readingStats';
import { Seo } from '../components/Seo';

/**
 * Book 2's landing page. The shared DraftBookLanding draws the book's colours,
 * hero, actions, films, author, colophon and neighbours; this page supplies
 * the table of contents and, below it, each chapter's prose and evidence rail
 * in one continuous read.
 * Deliberately does not reuse book 1's FullBookReader: that component is
 * wired to book-1-only infrastructure (opener/inline diagrams, the audiobook
 * player, judge scorecards). See programs/second_book_website_wiring.md.
 */
export const SecondBookReader = () => (
  <LightboxProvider>
    <Seo
      title="Second Book (Draft) — Read"
      description={`All ${chaptersTwo.length} drafted chapters of the second book, in one continuous read.`}
      path="/second-book"
      image={BOOK_TWO_COVER}
      type="website"
      noindex
    />
    <DraftBookLanding
      book={bookTwo}
      contents={
        <ol className="m-0 list-none space-y-4 p-0 font-serif">
          {chaptersTwo.map((chapter) => (
            <li key={chapter.number} className="border-b border-[var(--color-border)] pb-4">
              <Link to={chapterTwoPath(chapter)} className="group flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                  Chapter {chapter.number} · {formatReadingTime(chapter.wordCount)}
                </span>
                <span className="text-xl group-hover:text-[var(--color-accent)] group-hover:underline">
                  {chapter.title}
                </span>
                <span className="italic text-[var(--color-ink-muted)]">{chapter.promise}</span>
              </Link>
            </li>
          ))}
        </ol>
      }
      fullText={
        <div className="flex w-full flex-col border-t border-[var(--color-border)]">
          {chaptersTwo.map((chapter, index) => (
            <article
              key={chapter.number}
              id={`second-book-chapter-${chapter.number}`}
              className={`border-t border-[var(--color-border)] ${
                index % 2 === 0
                  ? 'bg-[color-mix(in_srgb,var(--color-ink)_3%,var(--color-paper))]'
                  : 'bg-[var(--color-paper)]'
              }`}
            >
              <div className="mx-auto max-w-3xl px-6 pt-16">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)]">
                  Chapter {chapter.number} · {formatReadingTime(chapter.wordCount)}
                </p>
                <h2 className="mb-4 font-serif text-3xl leading-tight md:text-4xl">{chapter.title}</h2>
                <p className="mb-6 font-serif text-lg italic text-[var(--color-ink-muted)]">{chapter.promise}</p>
              </div>
              <div className="mx-auto max-w-3xl px-6 pb-8 pt-4">
                <SecondBookArticle chapter={chapter} figures={bookTwo.figures.inline(chapter.number)} />
                <EvidenceRail chapterNumber={chapter.number} evidenceData={evidenceTwoData} showGraphLink={false} />
              </div>
            </article>
          ))}
        </div>
      }
    />
  </LightboxProvider>
);
