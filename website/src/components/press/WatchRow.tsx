import type { WatchTile } from '../../lib/catalog';

/**
 * The Watch row on the press homepage: one explainer-video poster per book.
 * Posters only. Each tile links to its chapter page, where the video plays;
 * nothing loads or plays here beyond a lazy image.
 */
export const WatchRow = ({ tiles }: { tiles: WatchTile[] }) => (
  <ul className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
    {tiles.map((t) => (
      <li key={t.bookId} className="w-[78vw] shrink-0 snap-start sm:w-[22rem] md:w-auto">
        <a
          href={t.href}
          className="group block rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#1F1D1B]"
        >
          <span className="relative block overflow-hidden rounded-sm border border-white/10 bg-black/30">
            <img
              src={t.poster}
              alt=""
              width={t.width}
              height={t.height}
              loading="lazy"
              decoding="async"
              className="block aspect-video h-auto w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
            />
            <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-sm bg-black/65 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/85">
              <span aria-hidden="true">▶</span>
              <span>
                <span className="sr-only">Duration </span>
                {t.duration}
              </span>
            </span>
          </span>
          <span className="mt-4 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
            {t.bookTitle}
          </span>
          <span className="mt-2 block font-serif text-lg leading-snug text-white/85 group-hover:text-white">
            <span className="italic">Chapter {Number(t.chapterNumber)}</span> · {t.chapterTitle}
          </span>
        </a>
      </li>
    ))}
  </ul>
);
