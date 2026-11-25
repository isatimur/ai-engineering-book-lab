import { useId, useState, type CSSProperties } from 'react';
import type { Postcard } from '../../data/figurePostcards';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import './FigureFlip.css';

const RING_LENGTH = 270; // just under the ring path's 2π·44 ≈ 276

/**
 * A postcard riddle figure. The front is a text-free picture with one
 * question; a click (or Enter, or Space) turns the card in 3D to the back,
 * which answers it like a postcard's reverse. Under reduced motion the faces
 * crossfade instead of turning. Data: data/figurePostcards.ts.
 */
export const FigureFlip = ({ card }: { card: Postcard }) => {
  const [turned, setTurned] = useState(false);
  const reduced = usePrefersReducedMotion();
  const uid = useId().replace(/:/g, '');
  const ringId = `pc-ring-${uid}`;
  const backId = `pc-back-${uid}`;

  const style = {
    ...(card.theme?.accent && { '--pc-accent': card.theme.accent }),
    ...(card.theme?.ink && { '--pc-ink': card.theme.ink }),
    ...(card.theme?.paper && { '--pc-paper': card.theme.paper }),
    ...(card.theme?.rule && { '--pc-rule': card.theme.rule }),
    '--pc-stamp-art': `url(${card.stamp.cover})`,
    '--pc-stamp-pos': card.stamp.position,
    '--pc-stamp-size': card.stamp.size,
  } as CSSProperties;

  const { back } = card;

  return (
    <figure className={`pc${reduced ? ' pc--reduced' : ''}`} style={style}>
      <p className="pc-label">
        [ Book {card.bookNo} · Chapter {parseInt(card.chapter, 10)} · Postcard ]
      </p>
      <button
        type="button"
        className="pc-flip"
        aria-pressed={turned}
        aria-label={
          turned
            ? `Postcard, turned. ${back.headline.join('')} Turn the card back to the picture.`
            : `Postcard. ${card.riddle} Turn the card for the answer.`
        }
        aria-describedby={turned ? backId : undefined}
        onClick={() => setTurned((t) => !t)}
      >
        <span className="pc-card">
          <span className="pc-face pc-front" aria-hidden={turned}>
            <picture>
              <source media="(max-width: 700px)" srcSet={card.art.tall} />
              <img src={card.art.wide} alt={card.art.alt} loading="lazy" decoding="async" />
            </picture>
            <span className="pc-riddle">
              <q>{card.riddle}</q>
              <span className="pc-hint">Turn the card</span>
            </span>
          </span>

          <span className="pc-face pc-back" id={backId} aria-hidden={!turned}>
            <span className="pc-msg">
              <span className="pc-kicker">{back.kicker}</span>
              <span className="pc-headline">
                {back.headline[0]}
                <em>{back.headline[1]}</em>
              </span>
              <span className="pc-bars">
                {back.bars.map((bar) => (
                  <span key={bar.label} className={`pc-bar${bar.hot ? ' pc-bar--hot' : ''}`}>
                    <span className="pc-bar-code">{bar.label}</span>
                    <span className="pc-bar-rest">{bar.text}</span>
                  </span>
                ))}
              </span>
              <span className="pc-bar-note">
                <b>{back.barNote.value}</b>
                {back.barNote.text}
              </span>
              <span className="pc-stats">
                {back.stats.map((s) => (
                  <span key={s.value + s.text} className={`pc-stat${s.hot ? ' pc-stat--hot' : ''}`}>
                    <b>{s.value}</b>
                    <span>{s.text}</span>
                  </span>
                ))}
              </span>
              <span className="pc-sources">{back.sources}</span>
            </span>

            <span className="pc-divider" />

            <span className="pc-addr">
              <span className="pc-stamp" aria-hidden="true">
                <span className="pc-stamp-in">
                  <span className="pc-stamp-art" />
                  <span className="pc-stamp-value">{card.bookNo}</span>
                  <span className="pc-stamp-title">
                    {card.stamp.title.map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                  </span>
                  <span className="pc-stamp-meta">AI Engineer Press</span>
                </span>
              </span>
              <svg className="pc-postmark" viewBox="0 0 260 120" aria-hidden="true">
                <defs>
                  <path id={ringId} d="M 196 60 m -44 0 a 44 44 0 1 1 88 0 a 44 44 0 1 1 -88 0" />
                </defs>
                <g fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="196" cy="60" r="56" />
                  <circle cx="196" cy="60" r="34" />
                  <path d="M0 34 q 16 -10 32 0 t 32 0 t 32 0 t 32 0" />
                  <path d="M0 52 q 16 -10 32 0 t 32 0 t 32 0 t 32 0" />
                  <path d="M0 70 q 16 -10 32 0 t 32 0 t 32 0 t 32 0" />
                  <path d="M0 88 q 16 -10 32 0 t 32 0 t 32 0 t 32 0" />
                </g>
                <g fill="currentColor">
                  <text fontSize="10" textLength={RING_LENGTH} lengthAdjust="spacing">
                    <textPath href={`#${ringId}`} textLength={RING_LENGTH} lengthAdjust="spacing">
                      {card.postmarkRing}
                    </textPath>
                  </text>
                  <text x="196" y="57" fontSize="13" textAnchor="middle" letterSpacing="1">
                    CH. {card.chapter}
                  </text>
                  <text x="196" y="72" fontSize="9" textAnchor="middle" letterSpacing="1.5">
                    BOOK {card.bookNo}
                  </text>
                </g>
              </svg>
              <span className="pc-quote">“{card.quote.text}”</span>
              <span className="pc-quote-by">{card.quote.by}</span>
              <span className="pc-lines">
                <span>
                  <small>To</small>
                  {card.address.to}
                </span>
                <span>
                  <small>From</small>
                  {card.address.from}
                </span>
                <span>
                  <small>At</small>
                  {card.address.at}
                </span>
              </span>
            </span>
          </span>
        </span>
      </button>
      <figcaption className="pc-caption">Click, tap, or press Enter to turn.</figcaption>
    </figure>
  );
};
