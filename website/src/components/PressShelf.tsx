import { BOOK, PRESS_ORIGIN } from '../data/book';
import { LIBRARY } from '../data/library';

/**
 * The press's other books, at the foot of book 1's homepage.
 *
 * Book 1 has its own site; the press and its full shelf live at aiepress.com.
 * This section is the way across: the other two books, and the imprint.
 *
 * Everything comes from `data/library.ts`, which the press homepage and
 * `/books` also read, so no surface can disagree about what a book is called
 * or how far along it is. The links are absolute because they leave this site.
 */
export const PressShelf = () => {
  const others = LIBRARY.filter((book) => book.id !== BOOK.id);
  return (
    <section className="mt-20 pt-12 border-t border-white/10">
      <div className="text-center mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/55 mb-4">
          Also from AI Engineer Press
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-white/90 mb-3">
          The same corpus, two more books
        </h2>
        <p className="font-sans font-light text-sm text-white/55 max-w-md mx-auto leading-relaxed">
          Written in the open from the same library of conference talks, each
          carrying its own evidence.
        </p>
      </div>

      <ul className="mx-auto grid max-w-md grid-cols-2 gap-4 sm:gap-8">
        {others.map((book) => (
          <li key={book.id}>
            <a
              href={book.href}
              className="group flex h-full flex-col items-center text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
            >
              {/* Width and height are on the element so the row cannot reflow
                  when the images arrive, as on /books. */}
              <img
                src={book.cover}
                width={112}
                height={168}
                loading="lazy"
                decoding="async"
                alt={`${book.title} cover`}
                className="mb-4 h-[120px] w-[80px] rounded-[2px] object-cover shadow-[0_6px_20px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 sm:h-[186px] sm:w-[124px]"
              />
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45 mb-1.5">
                {book.status}
              </p>
              <h3 className="font-serif italic text-sm leading-snug text-white/90 group-hover:text-white sm:text-base">
                {book.title}
              </h3>
              <p className="mt-2 hidden font-mono text-[9px] uppercase tracking-[0.12em] text-white/35 sm:block">
                {book.measure}
              </p>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-center">
        <a
          href={PRESS_ORIGIN}
          className="font-mono text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          Visit the press at aiepress.com →
        </a>
      </p>
    </section>
  );
};
