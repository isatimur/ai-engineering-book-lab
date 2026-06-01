import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { type BookChapter } from '../../data/bookChapters';

type Props = {
  chapter: BookChapter;
};

export const ExpandableSummary = ({ chapter }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const firstParagraphs = chapter.content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => b && !b.startsWith('#') && !b.startsWith('---'))
    .slice(0, 3);

  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink)]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 hover:text-[var(--color-ink-muted)] transition-colors"
        aria-expanded={isExpanded}
      >
        <motion.span
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          ▶
        </motion.span>
        <span>{chapter.promise}</span>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3 normal-case font-sans tracking-normal text-[0.85rem] leading-relaxed text-[var(--color-ink-muted)] border-l-2 border-[var(--color-border)] pl-4">
              {firstParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
