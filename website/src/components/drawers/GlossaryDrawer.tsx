import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { GLOSSARY } from '../../data/glossary';
import { chapters } from '../../data/bookChapters';

type Props = {
  termId: string | null;
  onClose: () => void;
};

export const GlossaryDrawer = ({ termId, onClose }: Props) => {
  const term = termId ? GLOSSARY.find((t) => t.id === termId) : null;
  const isOpen = !!term;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const chapter = term?.chapterRef ? chapters.find((c) => c.number === term.chapterRef) : null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? '0%' : '100%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 bottom-0 w-full md:w-[440px] lg:w-[500px] bg-[var(--color-paper)] z-[70] border-l border-[var(--color-border)] shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={term ? `Glossary: ${term.display[0]}` : 'Glossary'}
      >
        <div className="flex justify-between items-center p-6 border-b border-[var(--color-border)] font-mono text-[10px] uppercase tracking-widest">
          <span className="opacity-50">Glossary</span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="hover:opacity-70 p-2"
            aria-label="Close glossary drawer"
          >
            [X] CLOSE
          </button>
        </div>
        {term && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            <h2 className="font-serif text-3xl leading-tight">{term.display[0]}</h2>
            <p className="font-sans text-base leading-relaxed text-[var(--color-ink-muted)]">{term.definition}</p>
            {term.diagram && (
              <div className="border border-[var(--color-border)] bg-white">
                <img src={term.diagram} alt={term.display[0]} className="block w-full h-auto" />
              </div>
            )}
            {term.diagram && (
              <a
                href={`/visual-guide#concept-${term.id}`}
                className="font-mono text-[10px] uppercase tracking-widest underline self-start"
              >
                See full diagram on the Visual Guide →
              </a>
            )}
            {chapter && (
              <div className="border-t border-[var(--color-border)] pt-4 font-mono text-[10px] uppercase tracking-widest">
                <p className="opacity-50 mb-2">Appears in</p>
                <a
                  href={`/read#book-chapter-${chapter.number}`}
                  onClick={onClose}
                  className="font-serif normal-case text-base tracking-normal underline"
                >
                  Chapter {chapter.number} — {chapter.title}
                </a>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </>
  );
};
