import { useLightbox } from '../../lib/lightbox';

/**
 * A chapter's opener figure for books 2 and 3: the chapter's argument in one
 * picture, above the text, click to zoom. The book-2/3 twin of book 1's
 * EvidenceExhibit in pages/ChapterDetail.tsx. Needs a LightboxProvider above it.
 */
export const BookOpenerFigure = ({
  src,
  title,
  chapterNo,
}: {
  src: string;
  title: string;
  chapterNo: number;
}) => {
  const { open } = useLightbox();
  return (
    <div className="w-full py-10 lg:py-14 px-6 flex flex-col items-center border-y border-[var(--color-border)] mt-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-6 text-center">
        THE ARGUMENT · CHAPTER {chapterNo}
      </div>
      <figure className="w-full max-w-[1000px] mx-auto bg-white rounded-md shadow-xl overflow-hidden border border-[var(--color-border)]">
        <button
          type="button"
          onClick={() => open(src, `Chapter ${chapterNo} — ${title}`)}
          className="block w-full cursor-zoom-in p-3 lg:p-5"
          aria-label={`Enlarge chapter ${chapterNo} opener: ${title}`}
        >
          <img src={src} alt={title} className="block w-full h-auto" loading="lazy" />
        </button>
      </figure>
    </div>
  );
};
