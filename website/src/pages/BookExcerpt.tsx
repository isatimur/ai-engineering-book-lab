import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { excerptById, type BookExcerpt as Excerpt } from '../data/bookExcerpts';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './BookExcerpt.css';

/**
 * A scroll-driven "taste of the book": 4–6 passages from the book's opener
 * chapter, each over one of the chapter's figures. The layout and the
 * interaction follow stripe.press's microsites (a sticky stage, a figure that
 * fades and scales as you scroll, a fixed counter); the words and the figures
 * are the book's own. Data lives in data/bookExcerpts.ts.
 *
 * Motion is CSS only (BookExcerpt.css, `animation-timeline: view()`). Browsers
 * without scroll timelines show every figure at rest. An IntersectionObserver
 * drives the section counter. Under reduced motion the page is a plain stack.
 */

const pad = (n: number) => String(n).padStart(2, '0');

const ExcerptPage = ({ excerpt }: { excerpt: Excerpt }) => {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const total = excerpt.sections.length;

  useEffect(() => {
    const nodes = sectionRefs.current.filter((n): n is HTMLElement => n !== null);
    if (typeof IntersectionObserver === 'undefined' || nodes.length === 0) return;
    // A one-pixel line across the middle of the viewport: the section that
    // crosses it is the one being read.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div className={`excerpt ${reduced ? 'excerpt--static' : ''}`} style={{ '--accent': excerpt.accent } as CSSProperties}>
      <Seo
        title={`${excerpt.chapterTitle} — an excerpt from ${excerpt.bookTitle}`}
        description={excerpt.description}
        path={excerpt.path}
        image={excerpt.cover}
        type="article"
        noindex={excerpt.noindex}
      />

      <header className="excerpt-bar">
        <span className="excerpt-tag">{excerpt.bookTitle}</span>
        <span className="excerpt-bar-chapter">{excerpt.chapterTitle}</span>
        <Link to={excerpt.readPath} className="excerpt-read">
          Read the book →
        </Link>
      </header>
      <p className="excerpt-side" aria-hidden="true">
        {excerpt.chapterLabel} · An excerpt
      </p>
      <p className="excerpt-counter" aria-live="polite">
        <span className="sr-only">Section </span>
        {pad(active + 1)} / {pad(total)}
      </p>

      <main>
        <section
          className="excerpt-intro"
          data-index={0}
          ref={(n) => {
            sectionRefs.current[total + 1] = n;
          }}
        >
          <p className="excerpt-kicker">{excerpt.chapterLabel} · A taste of the book</p>
          <h1 className="excerpt-title">{excerpt.chapterTitle.replace(/^Chapter \d+ — /, '')}</h1>
          <p className="excerpt-scroll" aria-hidden={reduced}>
            {reduced ? `${total} passages from the chapter` : 'Scroll'}
          </p>
        </section>

        {excerpt.sections.map((section, i) => {
          const style = {
            '--fx': `${section.focus?.x ?? 50}%`,
            '--fy': `${section.focus?.y ?? 50}%`,
            '--zoom': section.focus?.zoom ?? 1.04,
          } as CSSProperties;
          return (
            <section
              key={i}
              ref={(n) => {
                sectionRefs.current[i] = n;
              }}
              data-index={i}
              className="excerpt-section"
              style={style}
              aria-label={`Passage ${i + 1} of ${total}`}
            >
              <div className="excerpt-stage">
                <figure className="excerpt-card">
                  <img src={section.figure.src} alt={section.figure.alt} className="excerpt-img" loading={i < 2 ? 'eager' : 'lazy'} />
                </figure>
                <blockquote className="excerpt-quote">
                  <span className="excerpt-quote-num">{pad(i + 1)}</span>
                  <p>{section.quote}</p>
                </blockquote>
              </div>
            </section>
          );
        })}

        {/* The outro counts as the last passage, so a jump to the end reads NN / NN. */}
        <section
          className="excerpt-outro"
          data-index={total - 1}
          ref={(n) => {
            sectionRefs.current[total] = n;
          }}
        >
          <img src={excerpt.cover} alt={`Cover of ${excerpt.bookTitle}`} className="excerpt-cover" loading="lazy" />
          <div>
            <p className="excerpt-kicker">The passages above come from {excerpt.chapterLabel.toLowerCase()}</p>
            <p className="excerpt-outro-title">{excerpt.bookTitle}</p>
            <Link to={excerpt.readPath} className="excerpt-cta">
              Read the book →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export const BookOneExcerpt = () => <ExcerptPage excerpt={excerptById('one')} />;
export const SecondBookExcerpt = () => <ExcerptPage excerpt={excerptById('two')} />;
export const ThirdBookExcerpt = () => <ExcerptPage excerpt={excerptById('three')} />;
