import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, type Variants } from 'motion/react';
import { InteractiveHoverImage } from '../InteractiveHoverImage';
import { RedThreadNav } from '../nav/RedThreadNav';
import stats from '../../data/stats.json';
import { bookReadingTime } from '../../lib/readingStats';

// The 4 overview diagrams that argue what this book is in one glance:
// the argument arc, the autoresearch machine that built it, the central
// thesis, and the evidence base. Self-served from /public/diagrams/.
const IMAGES = {
  spine: { src: '/diagrams/overview/spine.png',         alt: 'The Argument Spine — 10 chapters in a four-act dependency arc' },
  machine: { src: '/diagrams/overview/machine.png',     alt: 'The Autoresearch Knowledge Machine — five-layer pipeline turning a growing corpus of practitioner talks into a source-anchored book' },
  stack: { src: '/diagrams/overview/stack.png',         alt: 'The Scaffolding Stack — five engineered layers that wrap a raw model' },
  corpusMap: { src: '/diagrams/overview/corpus-map.png', alt: 'Theme & Corpus Map — ten themes sized by video count, mapped to chapters' },
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
    { id: 'spine',     src: IMAGES.spine.src,     alt: IMAGES.spine.alt,     imgClass: 'w-full h-full object-contain bg-[var(--color-paper)]' },
    { id: 'machine',   src: IMAGES.machine.src,   alt: IMAGES.machine.alt,   imgClass: 'w-full h-full object-contain bg-[var(--color-paper)]' },
    { id: 'stack',     src: IMAGES.stack.src,     alt: IMAGES.stack.alt,     imgClass: 'w-full h-full object-contain bg-[var(--color-paper)]' },
    { id: 'corpusMap', src: IMAGES.corpusMap.src, alt: IMAGES.corpusMap.alt, imgClass: 'w-full h-full object-contain bg-[var(--color-paper)]' },
  ]);

  // Frame the diagrams: drop the sepia/multiply/grayscale filters from the
  // previous Unsplash treatment — the diagrams are already in the book's
  // editorial palette and need to be readable, not muted.
  const slotConfigs = [
    { className: 'absolute top-[36%] right-[28%] w-[32vw] max-w-[460px] aspect-[4/3] shadow-2xl border border-[var(--color-border)] bg-[var(--color-paper)]', zIndex: 20, y: y1 },
    { className: 'absolute bottom-[12%] right-[8%]  w-[40vw] max-w-[620px] aspect-[4/3] shadow-2xl border border-[var(--color-border)] bg-[var(--color-paper)] opacity-95', zIndex: 10, y: y2 },
    { className: 'absolute top-[8%]   right-[22%] w-[24vw] max-w-[360px] aspect-[4/3] shadow-xl border border-[var(--color-border)] bg-[var(--color-paper)] opacity-85', zIndex: 0,  y: y3 },
    { className: 'absolute top-[26%]  right-[-2%] w-[22vw] max-w-[330px] aspect-[4/3] shadow-2xl border border-[var(--color-border)] bg-[var(--color-paper)]', zIndex: 30, y: y4 },
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

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const imgVariants: Variants = {
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

      <motion.div variants={textVariants} className="relative z-20 mb-6 md:mb-0 md:absolute md:bottom-48 md:left-6 lg:left-12">
        <RedThreadNav active="read" compact />
      </motion.div>

      <motion.div variants={textVariants} className="absolute bottom-32 left-6 lg:left-12 font-mono text-[10px] lg:text-xs tracking-widest text-[var(--color-ink)] z-20 leading-[1.8] uppercase">
        AI Engineer Knowledge Base<br/>
        [ {stats.corpus.videos.toLocaleString()} source videos mapped ]<br/>
        [ {bookReadingTime} ]
      </motion.div>

      <motion.div variants={textVariants} className="absolute bottom-32 right-6 lg:right-12 z-20 hidden md:block">
        <Link
          to="/read/graph"
          className="font-mono text-[10px] uppercase tracking-widest border border-[var(--color-border)] px-4 py-2 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
        >
          Explore evidence graph →
        </Link>
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
                alt={currentImage.alt}
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
