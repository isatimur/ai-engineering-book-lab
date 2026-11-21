import { Seo } from '../components/Seo';
import { PRESS_ORIGIN } from '../data/book';
import { JsonLd } from '../components/JsonLd';
import { LIBRARY, type LibraryEntry } from '../data/library';
import { booksCollectionJsonLd } from '../lib/structuredData';

/**
 * The cover beside a card.
 *
 * Width and height are set on the element, not only in CSS, so the row does
 * not reflow when the image arrives — the same reason the catalogue's cover
 * carries them. The served file is the 600w WebP: these render at 112px wide,
 * so the 1024px PNG would be about nine times the pixels nobody sees.
 */
const Cover = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    width={112}
    height={168}
    loading="lazy"
    decoding="async"
    alt={alt}
    className="h-[132px] w-[88px] shrink-0 rounded-[2px] object-cover shadow-[0_1px_6px_rgba(0,0,0,0.18)] sm:h-[168px] sm:w-[112px]"
  />
);

/**
 * Maturity reads without a legend: the border runs solid (published) →
 * dashed (drafting) → dotted (early), and the published book is the one card
 * printed in reverse.
 */
const CARD_STYLE: Record<LibraryEntry['maturity'], string> = {
  published:
    'flex items-start gap-5 rounded-sm border border-[var(--color-ink)] bg-[var(--color-ink)] px-6 py-6 text-[var(--color-paper)] transition-opacity hover:opacity-90',
  drafting:
    'flex items-start gap-5 rounded-sm border border-dashed border-[var(--color-border)] px-6 py-6 transition-colors hover:border-[var(--color-ink)]',
  early:
    'flex items-start gap-5 rounded-sm border border-dotted border-[var(--color-border)] px-6 py-6 transition-colors hover:border-[var(--color-ink)]',
};

// The reversed card needs opacity, not an ink colour, to stay legible.
const MUTED: Record<LibraryEntry['maturity'], string> = {
  published: 'opacity-70',
  drafting: 'text-[var(--color-ink-muted)]',
  early: 'text-[var(--color-ink-muted)]',
};

const BLURB: Record<LibraryEntry['maturity'], string> = {
  published: 'opacity-80',
  drafting: 'text-[var(--color-ink-muted)]',
  early: 'text-[var(--color-ink-muted)]',
};

const Header = () => (
  <header className="no-print flex items-center justify-between border-b border-[var(--color-border)] px-6 py-6 font-mono text-[10px] uppercase tracking-widest lg:px-12">
    <a href={PRESS_ORIGIN} className="hover:opacity-60">← AI Engineer Press</a>
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

        {/*
          The three cards below read from data/library.ts, which the
          catalogue homepage also reads. They used to carry their own copies
          of every title, blurb and maturity label, which is the arrangement
          where a book is "Drafting" on one page and "First draft" on
          another.
        */}
        <div className="flex flex-col gap-6">
          {LIBRARY.map((book) => (
            <a key={book.id} href={book.href} className={CARD_STYLE[book.maturity]}>
              <Cover src={book.cover} alt={`${book.title} cover`} />
              <div>
                <p className={`mb-2 font-mono text-[10px] uppercase tracking-[0.2em] ${MUTED[book.maturity]}`}>
                  {book.status}
                </p>
                <h2 className="mb-2 font-serif text-2xl italic leading-tight">
                  {book.title}
                </h2>
                <p className={`mb-4 max-w-xl font-sans text-sm leading-relaxed ${BLURB[book.maturity]}`}>
                  {book.blurb}
                </p>
                <p className={`font-mono text-[10px] uppercase tracking-[0.15em] ${MUTED[book.maturity]}`}>
                  {book.measure}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
