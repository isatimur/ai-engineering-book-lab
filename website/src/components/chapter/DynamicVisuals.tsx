import { motion } from 'motion/react';

export const DynamicVisuals = ({
  colorMarker,
  type,
}: {
  colorMarker: string;
  type: 'gradient' | 'particles' | 'geometric';
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 mix-blend-overlay">
      {type === 'gradient' && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ background: `radial-gradient(circle at center, ${colorMarker} 0%, transparent 60%)` }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
        />
      )}
      {type === 'particles' && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: ['0vh', '100vh', '0vh'],
                x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 15 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 2 }}
              className="absolute w-32 h-32 rounded-full blur-3xl"
              style={{ backgroundColor: colorMarker, left: `${20 + i * 15}%`, top: '-20%' }}
            />
          ))}
        </div>
      )}
      {type === 'geometric' && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[80vw] h-[80vw] lg:w-[40vw] lg:h-[40vw] border-[1px] rounded-full border-white/20" />
          <div className="absolute w-[60vw] h-[60vw] lg:w-[30vw] lg:h-[30vw] border-[1px] border-dashed rounded-full border-white/10" />
          <div className="absolute w-[100vw] h-[1px] bg-white/5 rotate-45" />
          <div className="absolute w-[100vw] h-[1px] bg-white/5 -rotate-45" />
        </motion.div>
      )}
    </div>
  );
};
