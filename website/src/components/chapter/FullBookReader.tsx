import { chapters } from '../../data/bookChapters';
import { opener } from '../../lib/manifest';
import { LightboxProvider, useLightbox } from '../../lib/lightbox';
import { DynamicVisuals } from './DynamicVisuals';
import { ChapterArticle } from './ChapterArticle';
import { ChapterIllustration } from './ChapterIllustration';
import { EvidenceRail } from '../../EvidenceRail';

const ChapterOpener = ({ chapter }: { chapter: string }) => {
  const op = opener(chapter);
  const { open } = useLightbox();
  if (!op) return null;
  return (
    <div className="w-full py-16 lg:py-24 px-6 flex flex-col items-center border-b border-[var(--color-border)]">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-6 text-center">
        EVIDENCE OF SOURCE  ·  CHAPTER {chapter}
      </div>
      <figure className="w-full max-w-[1100px] mx-auto bg-[#1f1f20] rounded-md shadow-2xl overflow-hidden border border-[var(--color-border)]">
        <button
          type="button"
          onClick={() => open(op.src, `Chapter ${chapter} — ${op.title}`)}
          className="block w-full cursor-zoom-in group"
          aria-label={`Enlarge chapter ${chapter} evidence diagram`}
        >
          <div className="p-6 lg:p-10 flex items-center justify-center">
            <img
              src={op.src}
              alt={`Chapter ${chapter} — ${op.title}`}
              className="max-w-full h-auto transition-opacity group-hover:opacity-90"
              loading="lazy"
            />
          </div>
        </button>
        <figcaption className="border-t border-white/15 px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-white/60 flex flex-wrap items-center justify-between gap-2">
          <span>FIG. {chapter}  ·  BEFORE · AFTER</span>
          <span className="opacity-70">CLICK · SCROLL · ZOOM</span>
        </figcaption>
      </figure>
    </div>
  );
};

export const FullBookReader = () => {
  return (
    <LightboxProvider>
      <section className="w-full bg-[var(--color-paper)] relative pb-24 border-t border-[var(--color-border)] flex flex-col z-20">
        {chapters.map((chapter, index) => (
          <article
            key={chapter.number}
            id={`book-chapter-${chapter.number}`}
            className={`border-t border-[var(--color-border)] ${
              index % 2 === 0 ? 'bg-[#F8F6F0]' : 'bg-[var(--color-paper)]'
            }`}
          >
            <ChapterOpener chapter={chapter.number} />

            <div className="section-container min-h-screen flex flex-col lg:flex-row relative">
              <div className="lg:w-[42%] xl:w-[45%] relative lg:sticky lg:top-0 h-[46vh] lg:h-screen overflow-hidden border-[var(--color-border)] lg:border-r bg-[#1f1f20] z-0 order-1">
                <DynamicVisuals
                  colorMarker={index % 3 === 0 ? '#EAC6C0' : index % 3 === 1 ? '#ffffff' : '#A4B8C4'}
                  type={index % 3 === 0 ? 'gradient' : index % 3 === 1 ? 'geometric' : 'particles'}
                />
                <div className="sticky top-0 h-full flex flex-col items-center justify-center p-8 text-white">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.45)_100%)] z-10 pointer-events-none" />
                  <ChapterIllustration chapter={chapter} />
                  <div className="relative z-20 mt-8 max-w-md border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">AI Engineer Book</p>
                    <h2 className="mt-5 font-serif text-4xl leading-none md:text-5xl">{chapter.number}</h2>
                    <p className="mt-6 font-serif text-2xl italic leading-tight text-balance">{chapter.title}</p>
                  </div>
                  <h3 className="absolute z-20 text-white font-mono text-[11vw] lg:text-[7vw] font-bold tracking-tighter mix-blend-overlay rotate-90 right-0 origin-bottom-right translate-y-[50%] mr-10 opacity-20 pointer-events-none">
                    CH{chapter.number}
                  </h3>
                </div>
              </div>

              <div className="w-full lg:w-[58%] xl:w-[55%] relative flex flex-col z-10 order-2">
                <div className="p-8 md:p-12 lg:px-16 border-b border-[var(--color-border)] flex flex-col md:flex-row justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink)]">
                  <div className="flex items-start gap-4">
                    <span className="text-[14px] leading-none">▦</span>
                    <span className="leading-[1.8]">
                      CH. {chapter.number} //{' '}
                      <span className="underline underline-offset-4 decoration-black/50">{chapter.status}</span>
                    </span>
                  </div>
                  <div className="text-left md:text-right text-[var(--color-ink-muted)]">
                    {chapter.wordCount.toLocaleString()} words
                  </div>
                </div>
                <div className="p-8 md:p-12 lg:p-16 lg:px-20">
                  <ChapterArticle chapter={chapter} />
                </div>
              </div>
            </div>

            <div className="w-full py-16 lg:py-20 px-6 border-t border-[var(--color-border)]">
              <div className="w-full max-w-[1100px] mx-auto">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-2 text-center">
                  EVIDENCE OF SOURCE  ·  CHAPTER {chapter.number}  ·  VIDEOS
                </div>
                <EvidenceRail chapterNumber={chapter.number} />
              </div>
            </div>
          </article>
        ))}
      </section>
    </LightboxProvider>
  );
};
