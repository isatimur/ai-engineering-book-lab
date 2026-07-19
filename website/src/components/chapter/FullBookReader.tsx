import { useEffect, useRef, useState } from 'react';
import { chapters, type BookChapter } from '../../data/bookChapters';
import { AskAI } from '../AskAI';
import { opener } from '../../lib/manifest';
import { LightboxProvider, useLightbox } from '../../lib/lightbox';
import { DynamicVisuals } from './DynamicVisuals';
import { ChapterArticle } from './ChapterArticle';
import { ChapterStage } from './ChapterStage';
import { EvidenceRail } from '../../EvidenceRail';
import { JudgeScorecard } from '../judge/JudgeScorecard';
import { scoreForChapter } from '../../lib/judgeScores';
import { EvidenceSectionHeader } from '../evidence/EvidenceSectionHeader';
import { SourcesDrawer } from '../evidence/SourcesDrawer';
import { RedThreadNav } from '../nav/RedThreadNav';
import { formatReadingTime } from '../../lib/readingStats';
import { useAudiobook } from '../../context/AudiobookContext';

const ListenButton = ({ index }: { index: number }) => {
  const { currentIndex, isPlaying, playChapter, toggle } = useAudiobook();
  const active = currentIndex === index;
  const playing = active && isPlaying;
  return (
    <button
      type="button"
      onClick={() => (active ? toggle(index) : playChapter(index))}
      aria-label={playing ? 'Pause this chapter' : 'Listen to this chapter'}
      className={`inline-flex items-center gap-1.5 border border-[var(--color-border)] rounded px-2 py-0.5 transition-colors hover:bg-[var(--color-ink)]/5 ${active ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-muted)]'}`}
    >
      <span className="w-2 flex items-center justify-center text-[8px]">
        {playing ? (
          <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor"><rect x="0" y="0" width="3" height="10" /><rect x="5" y="0" width="3" height="10" /></svg>
        ) : (
          <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor"><polygon points="0,0 8,5 0,10" /></svg>
        )}
      </span>
      {playing ? 'Playing' : 'Listen'}
    </button>
  );
};

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

/**
 * One chapter's scrollytelling unit. Owns its own activeIndex state and
 * a scroll observer that watches the H2 headings in the right column.
 * activeIndex: -1 means "no H2 passed yet" (show opener); 0+ means
 * "passed H2 #(activeIndex+1)" (show that inline figure).
 */
const ChapterReaderItem = ({
  chapter,
  index,
  textOnly,
}: {
  chapter: BookChapter;
  index: number;
  textOnly: boolean;
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const computeActive = () => {
      // Anchors are zero-height markers placed in ChapterArticle right
      // before each section heading that owns an inline figure. Their
      // data-figure-anchor attribute is the 1-based figure index.
      const anchors = Array.from(
        el.querySelectorAll<HTMLElement>('[data-figure-anchor]'),
      );
      if (anchors.length === 0) return;

      // Activation line at 35% of viewport height — anchors above this
      // line are considered "passed." We take the last one passed.
      const line = window.innerHeight * 0.35;
      let lastPassedFigIndex = -1;
      for (const anchor of anchors) {
        if (anchor.getBoundingClientRect().top < line) {
          const n = parseInt(anchor.dataset.figureAnchor || '0', 10);
          if (n > 0) lastPassedFigIndex = Math.max(lastPassedFigIndex, n - 1);
        }
      }
      setActiveIndex((prev) => (prev === lastPassedFigIndex ? prev : lastPassedFigIndex));
    };

    computeActive();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeActive);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [chapter.number]);

  return (
    <article
      id={`book-chapter-${chapter.number}`}
      className={`border-t border-[var(--color-border)] ${
        index % 2 === 0 ? 'bg-[color-mix(in_srgb,var(--color-ink)_3%,var(--color-paper))]' : 'bg-[var(--color-paper)]'
      }`}
    >
      {!textOnly && <ChapterOpener chapter={chapter.number} />}

      <div
        className={`section-container flex flex-col lg:flex-row relative ${
          textOnly ? 'reader-text-only-layout' : 'min-h-screen'
        }`}
      >
        {/* Left: sticky visual stage — hidden in text-only mode */}
        {!textOnly && (
          <div className="lg:w-[42%] xl:w-[45%] relative lg:sticky lg:top-0 h-[46vh] lg:h-screen overflow-hidden border-[var(--color-border)] lg:border-r bg-[#1f1f20] z-0 order-1">
            <DynamicVisuals
              colorMarker={index % 3 === 0 ? '#EAC6C0' : index % 3 === 1 ? '#ffffff' : '#A4B8C4'}
              type={index % 3 === 0 ? 'gradient' : index % 3 === 1 ? 'geometric' : 'particles'}
            />

            {/* Crossfading figure stack with own header / caption / progress */}
            <ChapterStage chapter={chapter} activeIndex={activeIndex} />

            {/* Chapter number watermark */}
            <h3 className="absolute z-0 text-white font-mono text-[11vw] lg:text-[10vw] font-bold tracking-tighter mix-blend-overlay rotate-90 right-0 origin-bottom-right translate-y-[50%] mr-10 opacity-10 pointer-events-none">
              CH{chapter.number}
            </h3>
          </div>
        )}

        {/* Right: text column with H2 anchor points */}
        <div
          className={`relative flex flex-col z-10 order-2 ${
            textOnly ? 'w-full max-w-3xl mx-auto reader-text-only-column' : 'w-full lg:w-[58%] xl:w-[55%]'
          }`}
        >
          <div className="p-8 md:p-12 lg:px-16 border-b border-[var(--color-border)] flex flex-col md:flex-row justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink)]">
            <div className="flex items-start gap-4">
              <span className="text-[14px] leading-none">▦</span>
              <span className="leading-[1.8]">
                CH. {chapter.number} //{' '}
                <span className="underline underline-offset-4 decoration-black/50">{chapter.status}</span>
              </span>
              <ListenButton index={index} />
            </div>
            <div className="text-left md:text-right text-[var(--color-ink-muted)] flex flex-col gap-1">
              <span>{chapter.wordCount.toLocaleString()} words</span>
              <span>{formatReadingTime(chapter.wordCount)}</span>
            </div>
          </div>
          <div className="px-8 md:px-12 lg:px-16 pt-4 pb-2">
            <RedThreadNav active="read" chapterNumber={chapter.number} compact />
          </div>
          <div
            ref={textRef}
            className={`p-8 md:p-12 lg:p-16 lg:px-20 ${textOnly ? 'reader-text-only-prose px-5 sm:px-8' : ''}`}
          >
            <ChapterArticle chapter={chapter} />
          </div>
        </div>
      </div>

      <div className="w-full py-16 lg:py-20 px-6 border-t border-[var(--color-border)]">
        <div className="w-full max-w-[1100px] mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-2 text-center">
            EVIDENCE OF SOURCE  ·  CHAPTER {chapter.number}  ·  VIDEOS
          </div>
          <EvidenceSectionHeader
            chapterNumber={chapter.number}
            onOpenSources={() => setSourcesOpen(true)}
          />
          <EvidenceRail chapterNumber={chapter.number} />
        </div>
      </div>

      <SourcesDrawer
        chapterNumber={chapter.number}
        isOpen={sourcesOpen}
        onClose={() => setSourcesOpen(false)}
      />

      {scoreForChapter(chapter.number) && (
        <div className="w-full py-16 lg:py-20 px-6 border-t border-[var(--color-border)]">
          <div className="w-full max-w-[1100px] mx-auto">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-2 text-center">
              AI QUALITY  ·  CHAPTER {chapter.number}  ·  MASH JUDGES
            </div>
            <JudgeScorecard chapterNumber={chapter.number} />
          </div>
        </div>
      )}
    </article>
  );
};

type FullBookReaderProps = {
  textOnly?: boolean;
};

export const FullBookReader = ({ textOnly = false }: FullBookReaderProps) => {
  return (
    <LightboxProvider>
      <section className="w-full bg-[var(--color-paper)] relative pb-24 border-t border-[var(--color-border)] flex flex-col z-20">
        {chapters.map((chapter, index) => (
          <ChapterReaderItem key={chapter.number} chapter={chapter} index={index} textOnly={textOnly} />
        ))}
        <div className="w-full max-w-3xl mx-auto px-6 md:px-12 pb-12">
          <AskAI variant="light" />
        </div>
      </section>
    </LightboxProvider>
  );
};
