// Adapted from isatimur/bookshelf@d972bab DemoChapter.tsx ActionMenu.
// Provides paragraph-level highlighting (persisted to localStorage) and
// a dictionary lookup for short selections via api.dictionaryapi.dev.
import { useEffect, useState, type RefObject } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { hashText } from '../lib/hashText';

const COLORS = [
  { id: 'yellow', value: 'rgba(250, 204, 21, 0.4)' },
  { id: 'green', value: 'rgba(74, 222, 128, 0.4)' },
  { id: 'pink', value: 'rgba(244, 114, 182, 0.4)' },
  { id: 'blue', value: 'rgba(96, 165, 250, 0.4)' },
];

type Selection = { text: string; top: number; left: number; pHash: string };
type Definition = { title: string; content: string };

const STORAGE_KEY = 'reader-highlights';

export const ActionMenu = ({ containerRef }: { containerRef: RefObject<HTMLDivElement | null> }) => {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [definition, setDefinition] = useState<Definition | null>(null);
  const [loading, setLoading] = useState(false);

  const [highlights, setHighlights] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Capture selection on mouseup, anchored inside the container
  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const sel = window.getSelection();
        if (
          sel &&
          !sel.isCollapsed &&
          containerRef.current &&
          sel.anchorNode &&
          containerRef.current.contains(sel.anchorNode)
        ) {
          const text = sel.toString().trim();
          let pHash = '';
          const pNode = (sel.anchorNode as Node).parentElement?.closest('p');
          if (pNode) {
            const textSubset = pNode.textContent?.substring(0, 100) ?? '';
            if (textSubset.length >= 10) pHash = hashText(textSubset);
          }

          if (text.length > 0 && pHash) {
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setSelection({ text, top: rect.top, left: rect.left + rect.width / 2, pHash });
          } else {
            setSelection(null);
          }
        } else {
          setSelection(null);
        }
      }, 10);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [containerRef]);

  // Dictionary lookup for short, single-line selections
  useEffect(() => {
    if (selection && selection.text.length < 40 && !selection.text.includes('\n')) {
      setLoading(true);
      setDefinition(null);
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(selection.text)}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const meanings = data[0].meanings;
            if (meanings && meanings.length > 0) {
              const def = meanings[0].definitions[0].definition;
              setDefinition({ title: selection.text, content: def });
            } else {
              setDefinition({ title: selection.text, content: 'Definition not found.' });
            }
          } else {
            setDefinition({ title: selection.text, content: 'Definition not found.' });
          }
        })
        .catch(() => {
          setDefinition({ title: selection.text, content: 'Error loading definition.' });
        })
        .finally(() => setLoading(false));
    } else {
      setDefinition(null);
    }
  }, [selection?.text]);

  // Apply current highlight colors to paragraphs + persist
  useEffect(() => {
    if (!containerRef.current) return;
    const paras = Array.from(containerRef.current.querySelectorAll('p'));
    paras.forEach((p) => {
      const textSubset = p.textContent?.substring(0, 100) ?? '';
      if (textSubset.length < 10) return;
      const hash = hashText(textSubset);
      const color = highlights[hash];
      if (color) {
        p.style.backgroundColor = color;
        p.style.boxShadow = `0 0 0 6px ${color}`;
        p.style.borderRadius = '4px';
        p.style.transition = 'all 0.3s ease';
      } else {
        p.style.backgroundColor = '';
        p.style.boxShadow = '';
      }
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights));
  }, [highlights, containerRef]);

  const toggleHighlight = (colorValue: string) => {
    if (!selection || !selection.pHash) return;
    setHighlights((prev) => {
      const next = { ...prev };
      if (next[selection.pHash] === colorValue) {
        delete next[selection.pHash];
      } else {
        next[selection.pHash] = colorValue;
      }
      return next;
    });
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  };

  if (!selection) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed z-[100] w-72 p-4 bg-[#1b1e1a] text-[#F8F6F0] rounded-sm shadow-2xl border border-white/10 flex flex-col gap-3 pointer-events-auto"
        style={{
          top: selection.top - 10,
          left: selection.left,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1b1e1a]" />

        {/* Highlight tools */}
        <div className="flex gap-2 items-center justify-between border-b border-white/10 pb-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-white/50">Highlight</span>
          <div className="flex gap-1.5">
            {COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleHighlight(c.value)}
                aria-label={`Highlight ${c.id}`}
                className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform cursor-pointer"
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        </div>

        {/* Dictionary */}
        {(loading || definition) && (
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#b49b6b] mb-2">
              {selection.text}
            </div>
            <div className="text-[12px] font-sans leading-relaxed text-white/90">
              {loading ? 'Looking up...' : definition?.content || 'Definition not found.'}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
