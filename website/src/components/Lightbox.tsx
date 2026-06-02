import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { chapters, chapterPath } from '../data/bookChapters';

type Props = {
  open: boolean;
  src?: string;
  title?: string;
  caption?: string;
  chapterRef?: string | null;
  onClose: () => void;
};

export const Lightbox = ({ open, src, title, caption, chapterRef, onClose }: Props) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl font-mono"
          >
            [X]
          </button>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={src} alt={title ?? ''} className="block w-full h-auto" />
            {(title || caption || chapterRef) && (
              <div className="border-t p-6 font-serif text-[#1F1D1B]">
                {title && <h3 className="text-xl font-medium mb-2">{title}</h3>}
                {caption && <p className="text-sm leading-relaxed opacity-80 mb-3">{caption}</p>}
                {chapterRef && (() => {
                  const ch = chapters.find((c) => c.number === chapterRef);
                  return (
                    <Link
                      to={ch ? chapterPath(ch) : '/read'}
                      className="text-xs font-mono uppercase tracking-widest underline"
                    >
                      Appears in chapter {chapterRef} →
                    </Link>
                  );
                })()}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
