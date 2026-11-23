import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import type { DraftBook } from '../../data/draftBooks';
import type { BookChapter } from '../../data/bookChapters';
import { normaliseHeading } from '../../data/bookFigures';

/** The `## `/`### ` headings of a chapter, as the reader sees them. */
export const sectionsOf = (chapter: BookChapter): { text: string; level: 2 | 3 }[] =>
  chapter.content
    .split('\n')
    .filter((l) => /^#{2,3} /.test(l))
    .map((l) => ({ text: normaliseHeading(l), level: l.startsWith('### ') ? 3 : 2 }));

/** Scrolls to the rendered heading whose text matches; headings carry no ids. */
const scrollToHeading = (text: string) => {
  const target = [...document.querySelectorAll('article h2, article h3')].find(
    (h) => h.textContent?.replace(/\s+/g, ' ').trim() === text,
  );
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * The table of contents for a draft book: this chapter's sections, every
 * chapter, and the book's graph and figure pages. The book-2/3 counterpart of
 * book 1's Sidebar, which scrolls inside the full-book reader instead.
 */
export const BookContentsDrawer = ({
  book,
  chapter,
  isOpen,
  onClose,
}: {
  book: DraftBook;
  chapter: BookChapter;
  isOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sections = sectionsOf(chapter);

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
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 bottom-0 w-full sm:w-[400px] bg-[var(--color-paper)] z-[90] border-r border-[var(--color-border)] shadow-2xl flex flex-col"
            aria-label="Contents"
          >
            <header className="flex items-center justify-between gap-4 p-6 border-b border-[var(--color-border)] font-mono text-[10px] uppercase tracking-widest">
              <div>
                <span className="text-[var(--color-ink-muted)]">{book.label}</span>
                <h2 className="font-serif normal-case tracking-normal text-xl mt-1">Contents</h2>
              </div>
              <button type="button" onClick={onClose} className="hover:opacity-60" aria-label="Close contents">
                [X]
              </button>
            </header>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {sections.length > 0 && (
                <section>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-3">
                    In this chapter
                  </p>
                  <ul className="space-y-2 font-serif">
                    {sections.map((s) => (
                      <li key={s.text} className={s.level === 3 ? 'pl-4 text-sm' : ''}>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            scrollToHeading(s.text);
                          }}
                          className="text-left hover:underline"
                        >
                          {s.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <section>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-3">
                  Chapters
                </p>
                <ol className="space-y-2 font-serif">
                  {book.chapters.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={book.chapterPath(c)}
                        onClick={onClose}
                        className={`hover:underline ${c.slug === chapter.slug ? 'font-semibold' : ''}`}
                        aria-current={c.slug === chapter.slug ? 'page' : undefined}
                      >
                        <span className="font-mono text-[10px] text-[var(--color-ink-muted)] mr-2">{c.number}</span>
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
              <section className="font-mono text-[10px] uppercase tracking-widest space-y-2">
                <Link to={book.graph.graphUrl()} onClick={onClose} className="block hover:underline">
                  Evidence graph →
                </Link>
                <Link to={`${book.indexPath}/figures`} onClick={onClose} className="block hover:underline">
                  All figures →
                </Link>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
