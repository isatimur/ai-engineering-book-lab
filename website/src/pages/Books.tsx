import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { JsonLd } from '../components/JsonLd';
import { BOOK } from '../data/book';
import { chapters } from '../data/bookChapters';
import { chaptersTwo, chaptersTwoWordCount, BOOK_TWO_TITLE } from '../data/bookChaptersTwo';
import { chaptersThree, BOOK_THREE_TITLE } from '../data/bookChaptersThree';
import { totalWordCount } from '../lib/readingStats';
import { booksCollectionJsonLd } from '../lib/structuredData';
import stats from '../data/stats.json';

// Book 3's planned scope, verified against 99_Meta/third-book-classification.json
// on 2026-11-16: 12 chapters, 133 distinct talks shortlisted across them.
// See the comment on book 3's card below for why these are stated, not derived.
const PLANNED_CHAPTERS = 12;
const CLASSIFIED_TALKS = 133;

const Header = () => (
  <header className="no-print flex items-center justify-between border-b border-[var(--color-border)] px-6 py-6 font-mono text-[10px] uppercase tracking-widest lg:px-12">
    <Link to="/" className="hover:opacity-60">← Catalogue</Link>
    <span>AI Engineer Press · Books</span>
    <span />
  </header>
);

export const Books = () => {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <Seo
        title="Books — AI Engineer Press"
        description="The AI Engineer Press library: From Copilot to Colleague, plus works in progress."
        path="/books"
        type="website"
      />
      <JsonLd data={booksCollectionJsonLd()} />
      <Header />

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          AI Engineer Press
        </p>
        <h1 className="mb-10 font-serif text-4xl italic leading-tight md:text-5xl">
          Books
        </h1>

        <div className="flex flex-col gap-6">
          <Link
            to="/"
            className="block rounded-sm border border-[var(--color-ink)] bg-[var(--color-ink)] px-6 py-6 text-[var(--color-paper)] transition-opacity hover:opacity-90"
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
              {BOOK.category}
            </p>
            <h2 className="mb-2 font-serif text-2xl italic leading-tight">
              {BOOK.title}
            </h2>
            <p className="mb-4 max-w-xl font-sans text-sm leading-relaxed opacity-80">
              {BOOK.subtitle}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-60">
              {chapters.length} chapters · {totalWordCount.toLocaleString()} words
            </p>
          </Link>

          <Link
            to="/second-book"
            className="block rounded-sm border border-dashed border-[var(--color-border)] px-6 py-6 transition-colors hover:border-[var(--color-ink)]"
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              Drafting
            </p>
            <h2 className="mb-2 font-serif text-2xl italic leading-tight">
              {BOOK_TWO_TITLE}
            </h2>
            <p className="mb-4 max-w-xl font-sans text-sm leading-relaxed text-[var(--color-ink-muted)]">
              An early, source-anchored draft on how AI engineering is reshaping training, inference, and the long tail of domains beyond text.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
              {chaptersTwo.length} chapters · {chaptersTwoWordCount.toLocaleString()} words · {stats.book2.claims.total} claims · {stats.book2.anchors.total} anchors
            </p>
          </Link>

          {/*
            Book 3 has no prose yet, so the card deliberately does NOT read
            "0 chapters · 0 words" — that looks broken rather than early. It
            carries what actually exists instead: a published spec and a
            classified corpus. The border runs solid (book 1) → dashed
            (book 2) → dotted (book 3), so maturity reads without a legend.

            PLANNED_CHAPTERS and CLASSIFIED_TALKS are stated, not derived:
            their source is 99_Meta/third-book-classification.json, which the
            website does not import. Re-check them against that file when the
            classification is re-run; they are the only numbers on this page
            that cannot update themselves.
          */}
          <Link
            to="/third-book"
            className="block rounded-sm border border-dotted border-[var(--color-border)] px-6 py-6 transition-colors hover:border-[var(--color-ink)]"
          >
            {/*
              "In design" was accurate while the track had no prose. With a
              full first draft it understated the book and read as stale —
              derive the label from the chapter count rather than restating it,
              so the card cannot disagree with the reader again.
            */}
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              {chaptersThree.length === 0
                ? 'In design'
                : chaptersThree.length < PLANNED_CHAPTERS
                  ? 'Drafting'
                  : 'First draft'}
            </p>
            <h2 className="mb-2 font-serif text-2xl italic leading-tight">
              {BOOK_THREE_TITLE}
            </h2>
            <p className="mb-4 max-w-xl font-sans text-sm leading-relaxed text-[var(--color-ink-muted)]">
              Spec-driven development and the software factory: what happens to the lifecycle when writing the code stops being the constraint.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
              {chaptersThree.length} of {PLANNED_CHAPTERS} chapters · {CLASSIFIED_TALKS} talks classified · spec published
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};
