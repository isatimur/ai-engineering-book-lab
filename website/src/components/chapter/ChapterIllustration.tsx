import { type BookChapter } from '../../data/bookChapters';
import { opener } from '../../lib/manifest';
import { useLightbox } from '../../lib/lightbox';

export const ChapterIllustration = ({ chapter }: { chapter: BookChapter; index?: number }) => {
  const op = opener(chapter.number);
  const { open } = useLightbox();
  if (!op) return null;

  return (
    <div className="relative z-20 w-full max-w-md">
      <button
        type="button"
        onClick={() => open(op.src, `Chapter ${chapter.number} — ${op.title}`)}
        className="block w-full aspect-[4/3] bg-cover bg-center border border-white/20 shadow-2xl cursor-zoom-in transition-opacity hover:opacity-95"
        aria-label={`Enlarge chapter ${chapter.number} opener: ${op.title}`}
        style={{
          backgroundImage: `linear-gradient(rgba(31,31,32,0.45), rgba(31,31,32,0.45)), url(${op.src})`,
        }}
      />
      <div className="mt-6 border-t border-white/20 pt-5 font-mono text-[10px] uppercase tracking-widest text-white/60 flex items-center justify-between gap-2">
        <span>
          <span>Fig. {chapter.number}</span>
          <span className="mx-3">/</span>
          <span>{op.title}</span>
        </span>
        <span className="opacity-60">CLICK TO ENLARGE</span>
      </div>
    </div>
  );
};
