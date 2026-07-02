import { useState } from 'react';
import { motion, AnimatePresence, useTransform, type MotionValue } from 'motion/react';

import type { AudiobookState } from '../../lib/useAudiobook';

type Props = {
  onToggleSidebar: () => void;
  scrollProgress: MotionValue<number>;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
  audiobook: AudiobookState;
};

export const BottomNav = ({
  onToggleSidebar,
  scrollProgress,
  isFocusMode,
  onToggleFocusMode,
  audiobook,
}: Props) => {
  const [showSpeeds, setShowSpeeds] = useState(false);

  const {
    available,
    isPlaying,
    speed,
    speeds,
    progress,
    formattedCurrent,
    formattedTotal,
    currentLabel,
    togglePlay,
    setSpeed,
    seekToProgress,
  } = audiobook;

  const scrollBarWidth = useTransform(scrollProgress, (p: number) => `${p * 100}%`);

  return (
    <motion.footer
      initial={{ y: "100%", opacity: 0 }}
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
              <div
                className={`flex items-center gap-3 group ${available ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                onClick={() => available && togglePlay()}
                title={available ? currentLabel : 'Audiobook not synced yet — run audiobook_gen then sync-audio'}
              >
                <motion.span
                  key={isPlaying ? "pause" : "play"}
                  initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                <span className="whitespace-nowrap font-bold">AUDIOBOOK</span>
              </div>

              <div className="relative ml-2 flex items-center">
                <button
                  onClick={() => available && setShowSpeeds(!showSpeeds)}
                  disabled={!available}
                  aria-label="Change playback speed"
                  className="whitespace-nowrap hover:text-[var(--color-ink-muted)] hover:bg-[var(--color-ink)]/5 px-2 py-0.5 rounded transition-colors overflow-hidden relative disabled:opacity-40"
                >
                  <motion.span
                    key={speed}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-block"
                  >
                    [{speed}]
                  </motion.span>
                </button>

                {showSpeeds && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-0 mb-3 bg-[#6b6664] text-white p-2 rounded-lg flex gap-1 flex-col shadow-2xl overflow-hidden"
                  >
                    {speeds.map(s => (
                      <button
                        key={s}
                        onClick={() => { setSpeed(s); setShowSpeeds(false); }}
                        className={`text-left px-4 py-1.5 rounded-md transition-colors whitespace-nowrap hover:bg-white/20 ${speed === s ? 'bg-white/20' : ''}`}
                      >
                        {speed === s && <span className="absolute left-2">✓</span>}
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex items-center gap-3 overflow-hidden ml-2 z-10 w-full">
          <motion.div
            initial={false}
            animate={{
              width: (isPlaying || isFocusMode) ? "100%" : "0%",
              opacity: (isPlaying || isFocusMode) ? 1 : 0
            }}
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
                  <span>{available ? formattedCurrent : '00:00:00'}</span>
                  <span>&nbsp;/ {available ? formattedTotal : '--:--:--'}</span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              aria-label="Seek audiobook"
              disabled={!available || !isPlaying}
              onClick={(e) => {
                if (!available || !isPlaying) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                seekToProgress(ratio);
              }}
              className="flex-1 h-[2px] bg-black/10 relative rounded-full overflow-visible flex items-center justify-center disabled:cursor-default"
            >
              <motion.div
                style={{ width: isPlaying ? `${progress * 100}%` : scrollBarWidth }}
                className="absolute left-0 top-0 bottom-0 bg-[var(--color-ink)] opacity-70 rounded-full z-0 h-full pointer-events-none"
              />
            </button>
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
