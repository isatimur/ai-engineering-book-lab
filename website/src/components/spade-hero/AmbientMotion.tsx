import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function AmbientMotion() {
  const reduced = usePrefersReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${springX}% ${springY}%, rgba(234, 236, 233, 0.35), transparent 65%)`;
  const vignette = useMotionTemplate`radial-gradient(ellipse 80% 70% at ${springX}% ${springY}%, transparent 40%, rgba(28, 46, 30, 0.08) 100%)`;

  useEffect(() => {
    if (reduced) return;
    const onMove = (event: MouseEvent) => {
      mouseX.set((event.clientX / window.innerWidth) * 100);
      mouseY.set((event.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY, reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -top-[20%] -left-[10%] h-[55vmin] w-[55vmin] rounded-full bg-[#EAECE9]/60 blur-3xl"
        animate={{ x: [0, 24, -12, 0], y: [0, -18, 10, 0], scale: [1, 1.06, 0.98, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[30%] -right-[8%] h-[45vmin] w-[45vmin] rounded-full bg-[#C8D4C4]/40 blur-3xl"
        animate={{ x: [0, -20, 8, 0], y: [0, 14, -8, 0], scale: [1, 0.95, 1.04, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[8%] left-[20%] h-[35vmin] w-[35vmin] rounded-full bg-[#F1F3F1]/70 blur-2xl"
        animate={{ x: [0, 16, -10, 0], y: [0, -10, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div className="absolute inset-0 opacity-80" style={{ background: spotlight }} />
      <motion.div className="absolute inset-0" style={{ background: vignette }} />
      <div className="absolute inset-0 opacity-[0.035] mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
