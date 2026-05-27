import { type MouseEvent } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

export const InteractiveHoverImage = ({ src, alt, className, style, variants, initial, whileInView, viewport, transition }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000, ...style }}
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={{ ...transition, duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      className="w-full h-full cursor-pointer pointer-events-auto relative group overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ y: [0, -10, 0] }}
    >
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
      />
      <motion.img
        src={src}
        alt={alt ?? ''}
        className={className}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.08, filter: 'grayscale(0%) sepia(0%) blur(0px)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </motion.div>
  );
};
