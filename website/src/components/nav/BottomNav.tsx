import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudiobook } from '../../context/AudiobookContext';
import { chapters } from '../../data/bookChapters';
import { formatClock, NARRATION_CREDIT } from '../../data/audiobook';

type Props = {
  onToggleSidebar: () => void;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
};

// Chapter whose section is currently nearest the top of the viewport — so pressing
// play with nothing loaded starts the chapter you're actually reading.
const nearestChapterIndex = (): number => {
  if (typeof document === 'undefined') return 0;
  const idx = chapters.findIndex((ch) => {
    const el = document.getElementById(`book-chapter-${ch.number}`);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.45 && rect.bottom > 0;
  });
  return idx >= 0 ? idx : 0;
};

const SpeedMenu = ({
  speed,
  speeds,
  onSelect,
}: {
  speed: number;
  speeds: readonly number[];
  onSelect: (s: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative ml-2 flex items-center">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change playback speed"
        className="whitespace-nowrap hover:text-[var(--color-ink-muted)] hover:bg-[var(--color-ink)]/5 px-2 py-0.5 rounded transition-colors overflow-hidden relative"
      >
        <motion.span key={speed} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block">
          [{speed}×]
        </motion.span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-0 mb-3 bg-[#6b6664] text-white p-2 rounded-lg flex gap-1 flex-col shadow-2xl overflow-hidden"
        >
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => {
                onSelect(s);
                setOpen(false);
              }}
              className={`text-left px-4 py-1.5 rounded-md transition-colors whitespace-nowrap hover:bg-white/20 relative ${speed === s ? 'bg-white/20' : ''}`}
            >
              {speed === s && <span className="absolute left-2">✓</span>}
              {s}×
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export const BottomNav = ({ onToggleSidebar, isFocusMode, onToggleFocusMode }: Props) => {
  const { currentIndex, isPlaying, currentTime, duration, speed, speeds, toggle, seek, setSpeed } =
    useAudiobook();
  const barRef = useRef<HTMLDivElement>(null);

  const loaded = currentIndex >= 0;
  const showBar = loaded || isFocusMode;
  const fraction = duration > 0 ? Math.min(1, currentTime / duration) : 0;
  const chapterNo = loaded ? chapters[currentIndex]?.number : null;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!loaded || !barRef.current || duration <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seek(ratio * duration);
  };

  return (
    <motion.footer
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
      className={`fixed bottom-0 left-0 right-0 h-10 flex items-center justify-between px-4 text-[10px] font-mono uppercase tracking-[0.15em] z-50 transition-colors pointer-events-none ${isFocusMode ? 'border-transparent bg-transparent' : 'border-t border-[var(--color-border)] bg-[var(--color-paper)]/95 backdrop-blur'}`}
    >
      <div className={`flex items-center gap-3 w-full relative pointer-events-auto ${isFocusMode ? 'px-4' : 'max-w-xl'}`}>
        <AnimatePresence>
          {!isFocusMode && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0, overflow: 'hidden' }}
              className="flex items-center gap-3 whitespace-nowrap overflow-visible"
            >
              <button
                type="button"
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => toggle(nearestChapterIndex())}
                aria-label={isPlaying ? 'Pause audiobook' : 'Play audiobook'}
                title={NARRATION_CREDIT}
              >
                <motion.span
                  key={isPlaying ? 'pause' : 'play'}
                  initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="text-[8px] group-hover:scale-125 transition-transform origin-center flex items-center justify-center w-3"
                >
                  {isPlaying ? (
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                      <rect x="0" y="0" width="3" height="10" />
                      <rect x="5" y="0" width="3" height="10" />
                    </svg>
                  ) : (
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                      <polygon points="0,0 8,5 0,10" />
                    </svg>
                  )}
                </motion.span>
                <span className="whitespace-nowrap font-bold">
                  AUDIOBOOK{chapterNo ? ` · CH ${chapterNo}` : ''}
                </span>
              </button>

              <SpeedMenu speed={speed} speeds={speeds} onSelect={setSpeed} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex items-center gap-3 overflow-hidden ml-2 z-10 w-full">
          <motion.div
            initial={false}
            animate={{ width: showBar ? '100%' : '0%', opacity: showBar ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-center gap-3 w-full"
          >
            <AnimatePresence>
              {!isFocusMode && (
                <motion.div
                  className="whitespace-nowrap tabular-nums text-black/50 flex"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0, overflow: 'hidden' }}
                >
                  <span>{formatClock(currentTime)}</span>
                  <span>&nbsp;/ {formatClock(duration)}</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div
              ref={barRef}
              onClick={handleSeek}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(currentTime)}
              tabIndex={loaded ? 0 : -1}
              className={`flex-1 h-[6px] -my-2 py-2 relative flex items-center ${loaded ? 'cursor-pointer' : ''}`}
            >
              <div className="w-full h-[2px] bg-black/10 relative rounded-full">
                <div
                  style={{ width: `${fraction * 100}%` }}
                  className="absolute left-0 top-0 bottom-0 bg-[var(--color-ink)] opacity-70 rounded-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center gap-3 pointer-events-auto shrink-0">
        {onToggleFocusMode && (
          <button
            onClick={onToggleFocusMode}
            aria-label={isFocusMode ? 'Exit focus mode' : 'Enter focus mode'}
            className="hover:text-[var(--color-ink-muted)] transition-colors whitespace-nowrap"
            title="Toggle focus mode (F)"
          >
            {isFocusMode ? '[EXIT FOCUS]' : '[FOCUS]'}
          </button>
        )}
        <AnimatePresence>
          {!isFocusMode && (
            <motion.button
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0, overflow: 'hidden' }}
              onClick={onToggleSidebar}
              className="hover:text-[var(--color-ink-muted)] transition-colors shrink-0 whitespace-nowrap"
              aria-label="Open sidebar"
            >
              <span className="hidden sm:inline">OPEN SIDEBAR </span>[&lt;]
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.footer>
  );
};
