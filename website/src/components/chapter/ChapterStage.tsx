import { motion, AnimatePresence } from 'motion/react';
import { type BookChapter } from '../../data/bookChapters';
import { opener, inlineFigsForChapter } from '../../lib/manifest';
import { useLightbox } from '../../lib/lightbox';

type Stage = {
  src: string;
  title: string;
  label: string;
};

type Props = {
  chapter: BookChapter;
  activeIndex: number;
};

/**
 * Sticky scrollytelling panel. Each chapter's left visual is a single,
 * full-bleed image that crossfades between the chapter opener and its
 * inline figures as the reader scrolls past anchored sections in the
 * right column.
 *
 * Layout: image fills the panel (w-full h-auto, centered), with a
 * static eyebrow header at the top and an updating caption + progress
 * bar at the bottom. The whole stage sits over a dark base with an
 * ambient vignette for text contrast.
 */
export const ChapterStage = ({ chapter, activeIndex }: Props) => {
  const op = opener(chapter.number);
  const figs = inlineFigsForChapter(chapter.number);
  const { open } = useLightbox();

  const stages: Stage[] = [
    ...(op
      ? [{ src: op.src, title: op.title, label: `FIG. ${chapter.number}.0 · OPENER` }]
      : []),
    ...figs.map((f) => ({
      src: f.src,
      title: f.title,
      label: `FIG. ${chapter.number}.${f.index}`,
    })),
  ];

  if (stages.length === 0) return null;

  const activeStage = Math.min(Math.max(activeIndex + 1, 0), stages.length - 1);
  const current = stages[activeStage];

  return (
    <div className="absolute inset-0 z-10 flex flex-col">
      {/* Header eyebrow — chapter identity, static */}
      <div className="shrink-0 px-6 lg:px-10 pt-8 lg:pt-10 flex items-start justify-between gap-4 text-white/85 z-30">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
            AI Engineer Book  ·  Ch {chapter.number}
          </p>
          <h2 className="mt-3 font-serif text-2xl lg:text-3xl italic leading-tight text-balance max-w-md">
            {chapter.title}
          </h2>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-2 pt-2 shrink-0">
          {stages.map((_, i) => (
            <motion.span
              key={i}
              className="block h-[2px] origin-left bg-white"
              initial={false}
              animate={{
                width: i === activeStage ? 28 : 14,
                opacity: i === activeStage ? 1 : i < activeStage ? 0.5 : 0.18,
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          ))}
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 tabular-nums">
            {activeStage + 1}/{stages.length}
          </span>
        </div>
      </div>

      {/* Image stack — fills the middle of the panel, crossfades on change */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-6 lg:px-10 py-6">
        {stages.map((stage, i) => {
          const isActive = i === activeStage;
          return (
            <motion.button
              key={stage.src}
              type="button"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => isActive && open(stage.src, stage.title)}
              className="absolute inset-x-6 lg:inset-x-10 inset-y-6 flex items-center justify-center"
              style={{
                pointerEvents: isActive ? 'auto' : 'none',
                cursor: isActive ? 'zoom-in' : 'default',
              }}
              aria-hidden={!isActive}
              aria-label={isActive ? `Enlarge ${stage.label}` : undefined}
              tabIndex={isActive ? 0 : -1}
            >
              <div className="w-full max-h-full flex items-center justify-center">
                <img
                  src={stage.src}
                  alt={stage.title}
                  draggable={false}
                  className="w-full h-auto max-h-[58vh] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)] select-none"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active caption — bottom, updates on stage change */}
      <div className="shrink-0 px-6 lg:px-10 pb-8 lg:pb-10 z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="text-white/90"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
              {current.label}
            </p>
            <p className="mt-2 font-serif text-lg lg:text-xl italic leading-snug text-balance text-white/95">
              {current.title}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              Click to enlarge
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
