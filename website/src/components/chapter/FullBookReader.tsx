import { chapters } from '../../data/bookChapters';
import { DynamicVisuals } from './DynamicVisuals';
import { ChapterArticle } from './ChapterArticle';
import { ChapterIllustration } from './ChapterIllustration';

export const FullBookReader = () => {
  return (
    <section className="w-full bg-[var(--color-paper)] relative pb-24 border-t border-[var(--color-border)] flex flex-col z-20">
      {chapters.map((chapter, index) => (
        <div
          key={chapter.number}
          className={`section-container min-h-screen flex flex-col lg:flex-row relative border-t border-[var(--color-border)] ${
            index % 2 === 0 ? 'bg-[#F8F6F0]' : 'bg-[var(--color-paper)]'
          }`}
        >
          <div className={`lg:w-[42%] xl:w-[45%] relative lg:sticky lg:top-0 h-[46vh] lg:h-screen overflow-hidden border-[var(--color-border)] bg-[#1f1f20] z-0 ${
            index % 2 === 0 ? 'lg:border-r order-1' : 'lg:border-l order-1 lg:order-2'
          }`}>
            <DynamicVisuals colorMarker={index % 3 === 0 ? '#EAC6C0' : index % 3 === 1 ? '#ffffff' : '#A4B8C4'} type={index % 3 === 0 ? 'gradient' : index % 3 === 1 ? 'geometric' : 'particles'} />
            <div className="sticky top-0 h-full flex flex-col items-center justify-center p-8 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.45)_100%)] z-10 pointer-events-none" />
              <ChapterIllustration chapter={chapter} index={index} />
              <div className="relative z-20 mt-8 max-w-md border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">AI Engineer Book</p>
                <h2 className="mt-5 font-serif text-4xl leading-none md:text-5xl">
                  {chapter.number}
                </h2>
                <p className="mt-6 font-serif text-2xl italic leading-tight text-balance">
                  {chapter.title}
                </p>
              </div>
              <h3 className="absolute z-20 text-white font-mono text-[11vw] lg:text-[7vw] font-bold tracking-tighter mix-blend-overlay rotate-90 right-0 origin-bottom-right translate-y-[50%] mr-10 opacity-20 pointer-events-none">
                CH{chapter.number}
              </h3>
            </div>
          </div>

          <div className={`w-full lg:w-[58%] xl:w-[55%] relative flex flex-col z-10 ${
            index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'
          }`}>
            <div className="p-8 md:p-12 lg:px-16 border-b border-[var(--color-border)] flex flex-col md:flex-row justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink)]">
              <div className="flex items-start gap-4">
                <span className="text-[14px] leading-none">▦</span>
                <span className="leading-[1.8]">CH. {chapter.number} // <span className="underline underline-offset-4 decoration-black/50">{chapter.status}</span></span>
              </div>
              <div className="text-left md:text-right text-[var(--color-ink-muted)]">{chapter.wordCount.toLocaleString()} words</div>
            </div>
            <div className="p-8 md:p-12 lg:p-16 lg:px-20">
              <ChapterArticle chapter={chapter} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
