import { type BookChapter } from '../../data/bookChapters';
import { opener } from '../../lib/manifest';

export const ChapterIllustration = ({ chapter }: { chapter: BookChapter; index?: number }) => {
  const op = opener(chapter.number);
  if (!op) return null;

  return (
    <div className="relative z-20 w-full max-w-md">
      <div
        className="aspect-[4/3] w-full bg-cover bg-center border border-white/20 shadow-2xl"
        role="img"
        aria-label={`${op.title} — chapter ${chapter.number} opener`}
        style={{
          backgroundImage: `linear-gradient(rgba(31,31,32,0.45), rgba(31,31,32,0.45)), url(${op.src})`,
        }}
      />
      <div className="mt-6 border-t border-white/20 pt-5 font-mono text-[10px] uppercase tracking-widest text-white/60">
        <span>Fig. {chapter.number}</span>
        <span className="mx-3">/</span>
        <span>{op.title}</span>
      </div>
    </div>
  );
};
