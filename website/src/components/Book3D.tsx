import { useRef, useState, type CSSProperties } from 'react';
import type { LibraryEntry } from '../data/library';

/**
 * One book on the press shelf, as a 3D object you can open.
 *
 * Pure CSS 3D, like book 1's spine hero: a front cover hinged on the spine,
 * a page block, a cloth spine and a back board. Hover or focus swings the
 * cover open onto a title page; a click opens the book. On touch screens the
 * first tap opens the cover and the second follows the link, so a reader can
 * see inside before leaving the page.
 *
 * With reduced motion the cover still opens, but without the swing.
 */

const W = 200; // cover width, px
const H = 300; // cover height, px
const D = 34; // thickness, px

const face = (style: CSSProperties): CSSProperties => ({
  position: 'absolute',
  backfaceVisibility: 'hidden',
  ...style,
});

// Cream paper with fine page lines, for the page block's edges.
const PAGE_EDGE =
  'repeating-linear-gradient(90deg, #efe8da 0px, #efe8da 1px, #d9d0bf 2px, #efe8da 3px)';
const PAGE_EDGE_TOP =
  'repeating-linear-gradient(0deg, #efe8da 0px, #efe8da 1px, #d9d0bf 2px, #efe8da 3px)';

/**
 * `href` overrides where a click goes. The shelf opens the book's landing
 * page; a landing page's own cover opens chapter one instead.
 */
export const Book3D = ({ book, href = book.href }: { book: LibraryEntry; href?: string }) => {
  const [open, setOpen] = useState(false);
  const lastPointer = useRef<string>('mouse');

  const onClick = (e: React.MouseEvent) => {
    // First tap on a touch screen opens the cover; the second follows the link.
    if (lastPointer.current !== 'mouse' && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <a
      href={href}
      aria-label={`${book.title} — ${book.status}. Open the book.`}
      onPointerDown={(e) => {
        lastPointer.current = e.pointerType;
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setOpen(false);
      }}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={onClick}
      className="book3d group relative block focus:outline-none"
      style={{ width: W, height: H, perspective: 1800, zIndex: open ? 20 : 1 }}
    >
      <div
        className="book3d-body absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: open
            ? `translateX(${W * 0.32}px) rotateX(4deg) rotateY(-6deg)`
            : 'rotateX(4deg) rotateY(28deg)',
        }}
      >
        {/* Back board */}
        <div
          style={face({
            inset: 0,
            transform: `translateZ(${-D / 2}px) rotateY(180deg)`,
            backgroundColor: book.spineColor,
            borderRadius: '2px 4px 4px 2px',
          })}
        />

        {/* Page block: fore-edge, top and bottom */}
        <div
          style={face({
            top: 3,
            width: D - 2,
            height: H - 6,
            left: W - (D - 2) / 2 - 3,
            transform: 'rotateY(90deg)',
            background: PAGE_EDGE,
          })}
        />
        <div
          style={face({
            left: 2,
            width: W - 6,
            height: D - 2,
            top: -(D - 2) / 2 + 3,
            transform: 'rotateX(90deg)',
            background: PAGE_EDGE_TOP,
          })}
        />
        <div
          style={face({
            left: 2,
            width: W - 6,
            height: D - 2,
            top: H - (D - 2) / 2 - 3,
            transform: 'rotateX(-90deg)',
            background: PAGE_EDGE_TOP,
          })}
        />

        {/* Spine */}
        <div
          style={face({
            top: 0,
            width: D,
            height: H,
            left: -D / 2,
            transform: 'rotateY(-90deg)',
            backgroundColor: book.spineColor,
            backgroundImage:
              'linear-gradient(90deg, rgba(0,0,0,0.35), rgba(255,255,255,0.08) 45%, rgba(0,0,0,0.3))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <span
            className="whitespace-nowrap font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-[#F9F7F1]/85"
            style={{ transform: 'rotate(90deg)' }}
          >
            {book.title}
          </span>
        </div>

        {/* Title page, under the cover */}
        <div
          style={face({
            inset: '3px 3px 3px 0',
            transform: `translateZ(${D / 2 - 1}px)`,
            backgroundColor: '#F6F1E7',
            boxShadow: 'inset 6px 0 12px rgba(0,0,0,0.12)',
          })}
          className="flex flex-col items-center justify-between px-5 py-7 text-center text-[#2a2520]"
        >
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#2a2520]/55">
            AI Engineer Press
          </p>
          <div>
            <p className="font-serif text-xl italic leading-tight">{book.title}</p>
            <p className="mt-3 font-sans text-[10px] leading-snug text-[#2a2520]/65">{book.subtitle}</p>
          </div>
          <div>
            <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.2em] text-[#2a2520]/50">
              {book.status}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#2a2520] underline decoration-[#2a2520]/30 underline-offset-4">
              Open the book →
            </p>
          </div>
        </div>

        {/* Front cover, hinged on the spine */}
        <div
          className="book3d-cover absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center',
            transform: `translateZ(${D / 2}px) rotateY(${open ? -150 : 0}deg)`,
          }}
        >
          <img
            src={book.cover}
            width={W}
            height={H}
            loading="lazy"
            decoding="async"
            alt=""
            draggable={false}
            style={face({
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '1px 3px 3px 1px',
            })}
          />
          {/* Light across the cover, and the hinge crease */}
          <div
            style={face({
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.05) 6px, transparent 14px, transparent 70%, rgba(255,255,255,0.08))',
              pointerEvents: 'none',
            })}
          />
          {/* Inside of the cover: the endpaper */}
          <div
            style={face({
              inset: 0,
              transform: 'rotateY(180deg)',
              backgroundColor: book.spineColor,
              backgroundImage: 'linear-gradient(270deg, rgba(0,0,0,0.3), transparent 30%)',
              borderRadius: '3px 1px 1px 3px',
            })}
          />
        </div>
      </div>

      {/* Shadow on the shelf */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: -18,
          width: W * 1.1,
          height: 24,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55), transparent 70%)',
          filter: 'blur(4px)',
        }}
      />
    </a>
  );
};
