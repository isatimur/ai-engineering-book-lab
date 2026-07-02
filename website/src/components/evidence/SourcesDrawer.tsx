import { lazy, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { claimsForChapter } from '../../lib/evidenceGraph';
import { RedThreadLinks } from './EvidenceSectionHeader';

const EvidenceGraphView = lazy(() =>
  import('./EvidenceGraphView').then((m) => ({ default: m.EvidenceGraphView })),
);

type Props = {
  chapterNumber: string;
  isOpen: boolean;
  onClose: () => void;
};

export const SourcesDrawer = ({ chapterNumber, isOpen, onClose }: Props) => {
  const claims = claimsForChapter(chapterNumber);
  const anchorCount = claims.reduce((n, c) => n + c.anchors.length, 0);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 backdrop-blur-sm z-[80]"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[min(720px,92vw)] bg-[var(--color-paper)] z-[90] border-l border-[var(--color-border)] shadow-2xl flex flex-col"
          >
            <header className="flex items-center justify-between gap-4 p-6 border-b border-[var(--color-border)] font-mono text-[10px] uppercase tracking-widest">
              <div>
                <span className="text-[var(--color-ink-muted)]">Chapter {chapterNumber}</span>
                <h2 className="font-serif normal-case tracking-normal text-xl mt-1">Explore sources</h2>
              </div>
              <button type="button" onClick={onClose} className="hover:opacity-60" aria-label="Close sources">
                [X]
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <p className="font-serif text-[var(--color-ink-muted)] leading-relaxed">
                {claims.length} claims · {anchorCount} video anchors · interactive graph below
              </p>

              <Suspense
                fallback={
                  <div className="h-[360px] border border-[var(--color-border)] bg-[var(--color-paper)] flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                    Loading graph…
                  </div>
                }
              >
                <EvidenceGraphView chapterNumber={chapterNumber} compact />
              </Suspense>

              <div onClick={onClose}>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-2">
                  Continue the thread
                </p>
                <RedThreadLinks chapterNumber={chapterNumber} />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
