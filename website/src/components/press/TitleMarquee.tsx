import { Fragment, useEffect, useRef } from 'react';

/**
 * A slow loop of the shelf's titles above the books, each set in its own type.
 *
 * Hovering or focusing a book on the shelf passes its id in as `activeId`: the
 * loop stops, the nearest copy of that title glides to the centre and comes up
 * to full white, and the others fade back. On release the loop resumes from
 * where it stopped.
 *
 * The loop is four copies of the titles in one track that slides left by half
 * its width, so the seam never shows. Only the first copy is read by screen
 * readers; the rest carry `aria-hidden`. With `reduced` set (the reader asks
 * for reduced motion) it renders one static, centred copy instead.
 */

export type MarqueeTitle = { id: string; title: string };

/** One type treatment per shelf position; a fourth book reuses the first. */
export const TITLE_TREATMENTS = [
  'font-serif italic text-4xl md:text-6xl tracking-tight',
  'font-serif text-3xl md:text-5xl uppercase tracking-[0.06em]',
  'font-mono text-xl md:text-3xl uppercase tracking-[0.18em]',
];

/** How many copies of the titles the track holds. */
export const marqueeCopies = (reduced: boolean): number => (reduced ? 1 : 4);

/** One full loop, in seconds. Keep in step with `.press-marquee-track` in index.css. */
export const MARQUEE_SECONDS = 70;

/**
 * The track offset (px, ≤ 0) that centres one copy of the focused title.
 * Picks the copy that needs the shortest move from `current`, among those that
 * leave the frame fully covered by the track.
 */
export const focusOffset = (current: number, centers: number[], frameWidth: number, trackWidth: number): number => {
  const min = frameWidth - trackWidth;
  const options = centers.map((c) => frameWidth / 2 - c).filter((x) => x <= 0 && x >= min);
  if (options.length === 0) return current;
  return options.reduce((best, x) => (Math.abs(x - current) < Math.abs(best - current) ? x : best));
};

/**
 * The negative animation delay that restarts the loop at offset `x`. The loop
 * runs from 0 to -half over `seconds`, so -half and 0 look the same.
 */
export const resumeDelay = (x: number, half: number, seconds: number): number => {
  if (half <= 0) return 0;
  const progress = (((-x % half) + half) % half) / half;
  return -progress * seconds;
};

const Titles = ({
  titles,
  activeId,
  hidden,
  separators,
}: {
  titles: MarqueeTitle[];
  activeId: string | null;
  hidden: boolean;
  separators: boolean;
}) => (
  <span
    aria-hidden={hidden || undefined}
    className={separators ? 'flex shrink-0 items-baseline' : 'contents'}
  >
    {titles.map((t, i) => {
      const active = activeId === t.id;
      const dim = activeId !== null && !active;
      return (
        <Fragment key={t.id}>
          <span
            data-book={t.id}
            data-active={active || undefined}
            className={`${separators ? 'whitespace-nowrap' : 'max-w-full text-center'} px-6 leading-none transition-[opacity,color] duration-500 md:px-10 ${
              TITLE_TREATMENTS[i % TITLE_TREATMENTS.length]
            } ${active ? 'text-white opacity-100' : dim ? 'text-white/60 opacity-25' : 'text-white/70'}`}
          >
            {t.title}
          </span>
          {separators && (
            <span aria-hidden="true" className="px-4 font-serif text-3xl leading-none text-white/25 md:px-8">
              ·
            </span>
          )}
        </Fragment>
      );
    })}
  </span>
);

export const TitleMarquee = ({
  titles,
  activeId,
  reduced,
}: {
  titles: MarqueeTitle[];
  activeId: string | null;
  reduced: boolean;
}) => {
  const copies = marqueeCopies(reduced);
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Where the track was parked while a title was in focus, so the loop resumes from there.
  const parkedAt = useRef<number | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const track = trackRef.current;
    if (reduced || !frame || !track) return;

    if (activeId === null) {
      if (parkedAt.current === null) return;
      const delay = resumeDelay(parkedAt.current, track.scrollWidth / 2, MARQUEE_SECONDS);
      parkedAt.current = null;
      track.style.transition = '';
      track.style.transform = '';
      track.style.animation = '';
      track.style.animationDelay = `${delay}s`;
      return;
    }

    // Freeze the loop where it is, then glide the nearest copy of the title to the centre.
    const current = new DOMMatrix(getComputedStyle(track).transform).m41;
    // Both rects include the running transform, so their difference is the
    // title's position along the untransformed track.
    const trackLeft = track.getBoundingClientRect().left;
    const centers = Array.from(track.querySelectorAll<HTMLElement>(`[data-book="${CSS.escape(activeId)}"]`)).map(
      (el) => {
        const r = el.getBoundingClientRect();
        return r.left - trackLeft + r.width / 2;
      },
    );
    const target = focusOffset(current, centers, frame.clientWidth, track.scrollWidth);
    parkedAt.current = target;
    track.style.animation = 'none';
    track.style.transition = 'none';
    track.style.transform = `translateX(${current}px)`;
    void track.offsetWidth; // commit the frozen position before the transition starts
    track.style.transition = 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)';
    track.style.transform = `translateX(${target}px)`;
  }, [activeId, reduced]);

  return (
    <div
      ref={frameRef}
      className="press-marquee relative overflow-hidden py-6"
      data-paused={activeId !== null || undefined}
      data-static={reduced || undefined}
    >
      <div
        ref={trackRef}
        className={
          reduced
            ? 'flex flex-wrap items-baseline justify-center gap-y-4'
            : 'press-marquee-track flex w-max items-baseline'
        }
      >
        {Array.from({ length: copies }, (_, i) => (
          <Titles key={i} titles={titles} activeId={activeId} hidden={i > 0} separators={!reduced} />
        ))}
      </div>
    </div>
  );
};
