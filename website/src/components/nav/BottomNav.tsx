import { useState } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';

type Props = {
  onToggleSidebar: () => void;
  progress: MotionValue<number>;
};

export const BottomNav = ({ onToggleSidebar, progress }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpeeds, setShowSpeeds] = useState(false);
  const [speed, setSpeed] = useState("1.5X");
  const speeds = ["1.0X", "1.5X", "2.0X", "2.5X", "COLLISON"];

  // Total duration in seconds: 17:22 = 17 * 60 + 22 = 1042 seconds
  const totalSeconds = 1042;
  const currentSeconds = useTransform(progress, (p: number) => Math.floor(p * totalSeconds));

  const displayTime = useTransform(currentSeconds, (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `00:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  });

  const barWidth = useTransform(progress, (p: number) => `${p * 100}%`);

  return (
    <motion.footer
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
      className="fixed bottom-0 left-0 right-0 h-10 border-t border-[var(--color-border)] flex items-center justify-between px-4 text-[10px] font-mono uppercase tracking-[0.15em] z-50 bg-[var(--color-paper)]/95 backdrop-blur"
    >
       <div className="flex items-center gap-3 w-full max-w-xl relative">
         <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setIsPlaying(!isPlaying)}>
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
             onClick={() => setShowSpeeds(!showSpeeds)}
             className="whitespace-nowrap hover:text-[var(--color-ink-muted)] hover:bg-[var(--color-ink)]/5 px-2 py-0.5 rounded transition-colors overflow-hidden relative"
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

         <div className="flex-1 flex items-center gap-3 overflow-hidden ml-2">
           <motion.div
             initial={false}
             animate={{
               width: isPlaying ? "100%" : "0%",
               opacity: isPlaying ? 1 : 0
             }}
             transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
             className="flex items-center gap-3 w-full"
           >
             <div className="whitespace-nowrap tabular-nums text-black/50 flex">
               <motion.span>{displayTime}</motion.span>
               <span>&nbsp;/ 00:17:22</span>
             </div>
             <div className="flex-1 h-[2px] bg-black/10 relative rounded-full overflow-hidden">
               <motion.div
                 style={{ width: barWidth }}
                 className="absolute left-0 top-0 bottom-0 bg-black/70"
               />
             </div>
           </motion.div>
         </div>
       </div>
       <button onClick={onToggleSidebar} className="hover:text-[var(--color-ink-muted)] transition-colors shrink-0">
         <span className="hidden sm:inline">OPEN SIDEBAR </span>[&lt;]
       </button>
    </motion.footer>
  );
};
