import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { InteractiveHoverImage } from '../InteractiveHoverImage';

const IMAGES = {
  man1: 'https://images.unsplash.com/photo-1517245386807-bb43a82c33c4?q=80&w=1200&auto=format&fit=crop',
  painting: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
  editorial: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
  speaker: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -250]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -50]);
  const y5 = useTransform(scrollY, [0, 1000], [0, -200]);
  const rotate5 = useTransform(scrollY, [0, 1000], [0, 30]);

  const opacity = useTransform(scrollY, [500, 1200], [1, 0]);
  const filter = useTransform(scrollY, [500, 1200], ['blur(0px)', 'blur(12px)']);

  const [mappedImages, setMappedImages] = useState([
    { id: 'img1', src: IMAGES.painting, imgClass: 'w-full h-full object-cover opacity-90' },
    { id: 'img2', src: IMAGES.man1, imgClass: 'w-full h-full object-cover grayscale' },
    { id: 'img3', src: IMAGES.speaker, imgClass: 'w-full h-full object-cover grayscale blur-[1px]' },
    { id: 'img4', src: IMAGES.editorial, imgClass: 'w-full h-full object-cover grayscale' },
  ]);

  const slotConfigs = [
    { className: 'absolute top-[40%] right-[30%] w-[28vw] max-w-[400px] h-auto shadow-2xl sepia-[0.2]', zIndex: 20, y: y1 },
    { className: 'absolute bottom-[20%] right-[10%] w-[38vw] max-w-[600px] h-auto opacity-80 mix-blend-multiply', zIndex: 10, y: y2 },
    { className: 'absolute top-[10%] right-[20%] w-[22vw] max-w-[350px] h-auto opacity-70', zIndex: 0, y: y3 },
    { className: 'absolute top-[30%] right-[0%] w-[20vw] max-w-[300px] h-auto opacity-90', zIndex: 30, y: y4 },
  ];

  const handleImageClick = (clickedSlotIndex: number) => {
    const frontMostIndex = 3; // The slot with zIndex 30
    if (clickedSlotIndex !== frontMostIndex) {
      setMappedImages(prev => {
        const newMap = [...prev];
        const temp = newMap[clickedSlotIndex];
        newMap[clickedSlotIndex] = newMap[frontMostIndex];
        newMap[frontMostIndex] = temp;
        return newMap;
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const imgVariants = {
    hidden: { opacity: 0, scale: 0.9, filter: 'blur(20px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.6, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <motion.section
      style={{ opacity, filter }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-[88svh] md:h-[130vh] w-full pt-28 md:pt-32 pb-28 md:pb-0 px-6 lg:px-12 flex flex-col items-start justify-center md:justify-start border-b border-[var(--color-border)] overflow-hidden"
    >
      <motion.div variants={textVariants} className="flex gap-4 font-mono text-[10px] lg:text-xs tracking-widest text-[var(--color-ink)] mb-8 md:mb-16 relative z-20">
        <span className="text-[14px] leading-none mb-[2px]">▦</span>
        <span>[ AI ENGINEER BOOK ]</span>
        <span className="text-[14px] leading-none mb-[2px]">▦</span>
      </motion.div>

      <h1 className="font-serif text-[12vw] md:text-[10vw] leading-[0.85] tracking-tight text-[var(--color-ink)] relative z-20 hero-mix flex flex-col">
        <motion.span variants={textVariants}>From Copilot</motion.span>
        <motion.span variants={textVariants} className="italic relative md:left-[5vw]">to</motion.span>
        <motion.span variants={textVariants}>Colleague</motion.span>
      </h1>

      <motion.div variants={textVariants} className="absolute bottom-32 left-6 lg:left-12 font-mono text-[10px] lg:text-xs tracking-widest text-[var(--color-ink)] z-20 leading-[1.8] uppercase">
        AI Engineer Knowledge Base<br/>
        [ 666 source videos mapped ]
      </motion.div>

      <div className="absolute top-0 right-0 w-[70vw] h-full z-10 hidden md:block">
        {slotConfigs.map((config, index) => {
          const currentImage = mappedImages[index];
          return (
            <motion.div
              key={currentImage.id}
              layout
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ y: config.y, zIndex: config.zIndex }}
              className={config.className}
              onClick={() => handleImageClick(index)}
            >
              <InteractiveHoverImage
                variants={imgVariants}
                src={currentImage.src}
                className={currentImage.imgClass}
              />
            </motion.div>
          );
        })}

        <motion.div
          variants={textVariants}
          style={{ y: y5, rotate: rotate5 }}
          className="absolute bottom-[20%] right-[30%] w-[15vw] h-[15vw] min-w-[120px] min-h-[120px] max-w-[200px] max-h-[200px] rounded-full border border-red-800 bg-[#e0b7b1]/90 flex items-center justify-center text-red-900 font-serif font-bold text-center leading-[1.1] z-40 p-4 shadow-xl hero-mix"
        >
          <span className="text-[2vw] md:text-xl transform -rotate-6">AI<br/>ENG<br/><span className="text-[1vw] md:text-[10px] tracking-widest font-mono mt-2 block uppercase text-red-950">Systems</span></span>
        </motion.div>
      </div>
    </motion.section>
  );
};
