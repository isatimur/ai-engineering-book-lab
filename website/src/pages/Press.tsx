import { Seo } from '../components/Seo';
import { JsonLd } from '../components/JsonLd';
import { BOOK_ORIGIN, PRESS_HOME_PATH } from '../data/book';
import { LIBRARY } from '../data/library';
import { pressJsonLd, booksCollectionJsonLd } from '../lib/structuredData';
import stats from '../data/stats.json';

/**
 * The press homepage. aiepress.com serves this page at "/".
 *
 * Book 1 has its own site at its own domain. This page is about the imprint:
 * what it publishes, and how every book is made. Each number comes from
 * stats.json or data/library.ts, so nothing here is typed in by hand.
 */

const fmt = (n: number) => n.toLocaleString('en-US');

const claimsTotal = stats.claims.total + stats.book2.claims.total + stats.book3.claims.total;
const anchorsTotal = stats.anchors.total + stats.book2.anchors.total;
const chaptersTotal = stats.chapters.total + stats.book2.chapters.total + stats.book3.chapters.total;

const FIGURES = [
  { value: fmt(stats.corpus.videos), label: 'conference talks in the corpus' },
  { value: fmt(chaptersTotal), label: 'chapters across three books' },
  { value: fmt(claimsTotal), label: 'claims in the ledgers' },
  { value: fmt(anchorsTotal), label: 'timestamped source anchors' },
];

const METHOD = [
  {
    step: 'I',
    title: 'One corpus',
    body: `Every book draws on the same library of ${fmt(stats.corpus.videos)} AI Engineer conference talks, transcribed and read talk by talk. The corpus grows as new talks are published.`,
  },
  {
    step: 'II',
    title: 'A ledger of claims',
    body: 'A sentence that states a fact enters a claims ledger, and each claim links to the moment in a talk that supports it. A reader can follow a claim to its source in one click.',
  },
  {
    step: 'III',
    title: 'A rival panel',
    body: 'Three rival open models score each chapter against the same rubric and flag anything that should block it. The scorecards are public.',
  },
];

export const Press = () => (
  <div className="min-h-screen bg-[#1F1D1B] text-[#F9F7F1] font-serif">
    <Seo
      title="AI Engineer Press — Books on AI engineering, written in the open"
      description={`An independent imprint. Three books on AI engineering, written in the open from ${fmt(stats.corpus.videos)} conference talks, with every claim linked to its source.`}
      path={PRESS_HOME_PATH}
      image="/og/press.png"
      type="website"
    />
    <JsonLd data={[pressJsonLd(), booksCollectionJsonLd()]} />

    <header className="flex items-start justify-between p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/20">
          <span className="font-serif text-xl italic leading-none">AE</span>
        </div>
        <div>
          <p className="font-sans text-sm font-medium tracking-wide">AI Engineer Press</p>
          <p className="font-serif text-sm italic text-white/60">Ideas for progress</p>
        </div>
      </div>
      <nav className="flex items-center gap-5 font-mono text-xs uppercase tracking-widest text-white/60">
        <a href="#books" className="hover:text-white">Books</a>
        <a href="#method" className="hover:text-white">Method</a>
      </nav>
    </header>

    <main className="mx-auto max-w-5xl px-6">
      <section className="pb-20 pt-20 text-center md:pt-28">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
          An independent imprint
        </p>
        <h1 className="mx-auto max-w-3xl font-serif text-4xl leading-[1.1] md:text-6xl">
          Books on AI engineering, <span className="italic">written in the open</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl font-sans text-base font-light leading-relaxed text-white/60">
          Every book starts from the same corpus of conference talks. Every claim
          links to the moment someone said it.
        </p>
      </section>

      <section id="books" className="scroll-mt-8 border-t border-white/10 py-20">
        <p className="mb-12 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
          The shelf
        </p>
        <ul className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
          {LIBRARY.map((book) => (
            <li key={book.id}>
              <a href={book.href} className="group flex h-full flex-col items-center text-center">
                <img
                  src={book.cover}
                  width={200}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  alt={`${book.title} cover`}
                  className="mb-6 h-[270px] w-[180px] rounded-[2px] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2"
                />
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                  {book.status}
                </p>
                <h2 className="font-serif text-xl italic leading-snug text-white/90 group-hover:text-white">
                  {book.title}
                </h2>
                <p className="mt-3 max-w-xs font-sans text-sm font-light leading-relaxed text-white/55">
                  {book.blurb}
                </p>
                <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
                  {book.measure}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-white/10 py-16">
        <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {FIGURES.map((f) => (
            <div key={f.label} className="text-center">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-serif text-4xl text-white/90 md:text-5xl">{f.value}</span>
                <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-white/45">
                  {f.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="method" className="scroll-mt-8 border-t border-white/10 py-20">
        <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
          How a book is made
        </p>
        <h2 className="mb-14 text-center font-serif text-3xl md:text-4xl">Corpus, ledger, panel</h2>
        <ol className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {METHOD.map((m) => (
            <li key={m.step}>
              <p className="mb-3 font-serif text-2xl italic text-white/40">{m.step}</p>
              <h3 className="mb-3 font-sans text-sm font-medium uppercase tracking-widest text-white/85">
                {m.title}
              </h3>
              <p className="font-sans text-sm font-light leading-relaxed text-white/60">{m.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-14 text-center">
          <a
            href={`${BOOK_ORIGIN}/quality`}
            className="font-mono text-[11px] uppercase tracking-widest text-white/50 transition-colors hover:text-white"
          >
            See the panel's scores →
          </a>
        </p>
      </section>
    </main>

    <footer className="mx-auto max-w-5xl border-t border-white/10 px-6 py-12 font-mono text-[10px] uppercase tracking-widest text-white/40">
      AI Engineer Press · Timur Isachenko
    </footer>
  </div>
);
