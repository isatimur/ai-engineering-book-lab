/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { chapters } from '../../data/bookChapters';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: Props) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] lg:w-[500px] bg-[var(--color-paper)] z-[70] border-l border-[var(--color-border)] shadow-2xl flex flex-col font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)]"
      >
        <div className="flex justify-between items-center p-6 border-b border-[var(--color-border)]">
           <span className="text-black/50">CONTENTS</span>
           <button
             ref={closeButtonRef}
             onClick={onClose}
             aria-label="Close navigation"
             className="hover:text-[var(--color-ink-muted)] hover:scale-110 transition-transform flex items-center justify-center p-2"
           >
             [X] CLOSE
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
           <div className="flex flex-col gap-4 border-b border-black/10 pb-8">
             <h3 className="text-xs font-bold font-serif normal-case tracking-normal mb-2 text-xl">Chapters</h3>

             {chapters.map((chapter, index) => (
               <div
                 key={chapter.number}
                 className={`group cursor-pointer hover:opacity-100 transition-opacity ${index === 0 ? '' : 'opacity-50 mt-4'}`}
                 onClick={() => scrollToSection(`book-chapter-${chapter.number}`)}
               >
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={`font-bold ${index === 0 ? 'underline group-hover:text-[var(--color-ink-muted)]' : ''}`}>
                      CHAPTER {chapter.number}
                    </span>
                    <span className="opacity-50">{chapter.wordCount.toLocaleString()}w</span>
                  </div>
                  <div className="normal-case font-serif tracking-normal text-sm group-hover:text-[var(--color-ink-muted)]">{chapter.title}</div>
               </div>
             ))}
           </div>
        </div>

        <div className="p-6 border-t border-[var(--color-border)] bg-[#E8E8E8] text-center opacity-60">
           AI PRESS / AI ENGINEER KB © 2026
        </div>
      </motion.div>
    </>
  );
};
