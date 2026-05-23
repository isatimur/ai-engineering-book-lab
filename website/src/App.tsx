/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import Lenis from 'lenis';
import { type BookChapter, chapters } from './data/bookChapters';
import { DynamicVisuals } from './components/chapter/DynamicVisuals';
import { InteractiveHoverImage } from './components/InteractiveHoverImage';
import { InlineText } from './components/text/InlineText';
import { MarkdownBlock } from './components/text/MarkdownBlock';
import { TopNav } from './components/nav/TopNav';
import { BottomNav } from './components/nav/BottomNav';

const IMAGES = {
  man1: "https://images.unsplash.com/photo-1517245386807-bb43a82c33c4?q=80&w=1200&auto=format&fit=crop",
  painting: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
  editorial: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
  speaker: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
};


const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -250]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -50]);
  const y5 = useTransform(scrollY, [0, 1000], [0, -200]);
  
  const opacity = useTransform(scrollY, [500, 1200], [1, 0]);
  const filter = useTransform(scrollY, [500, 1200], ["blur(0px)", "blur(12px)"]);

  const [mappedImages, setMappedImages] = useState([
    { id: "img1", src: IMAGES.painting, imgClass: "w-full h-full object-cover opacity-90" },
    { id: "img2", src: IMAGES.man1, imgClass: "w-full h-full object-cover grayscale" },
    { id: "img3", src: IMAGES.speaker, imgClass: "w-full h-full object-cover grayscale blur-[1px]" },
    { id: "img4", src: IMAGES.editorial, imgClass: "w-full h-full object-cover grayscale" },
  ]);

  const slotConfigs = [
    { className: "absolute top-[40%] right-[30%] w-[28vw] max-w-[400px] h-auto shadow-2xl sepia-[0.2]", zIndex: 20, y: y1 },
    { className: "absolute bottom-[20%] right-[10%] w-[38vw] max-w-[600px] h-auto opacity-80 mix-blend-multiply", zIndex: 10, y: y2 },
    { className: "absolute top-[10%] right-[20%] w-[22vw] max-w-[350px] h-auto opacity-70", zIndex: 0, y: y3 },
    { className: "absolute top-[30%] right-[0%] w-[20vw] max-w-[300px] h-auto opacity-90", zIndex: 30, y: y4 },
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
        delayChildren: 0.1
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  const imgVariants = {
    hidden: { opacity: 0, scale: 0.9, filter: 'blur(20px)' },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { duration: 1.6, ease: [0.25, 1, 0.5, 1] } 
    }
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
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
           style={{ y: y5, rotate: useTransform(scrollY, [0, 1000], [0, 30]) }}
           className="absolute bottom-[20%] right-[30%] w-[15vw] h-[15vw] min-w-[120px] min-h-[120px] max-w-[200px] max-h-[200px] rounded-full border border-red-800 bg-[#e0b7b1]/90 flex items-center justify-center text-red-900 font-serif font-bold text-center leading-[1.1] z-40 p-4 shadow-xl hero-mix"
        >
          <span className="text-[2vw] md:text-xl transform -rotate-6">AI<br/>ENG<br/><span className="text-[1vw] md:text-[10px] tracking-widest font-mono mt-2 block uppercase text-red-950">Systems</span></span>
        </motion.div>
      </div>
    </motion.section>
  )
}

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] lg:w-[500px] bg-[var(--color-paper)] z-[70] border-l border-[var(--color-border)] shadow-2xl flex flex-col font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)]"
      >
        <div className="flex justify-between items-center p-6 border-b border-[var(--color-border)]">
           <span className="text-black/50">CONTENTS</span>
           <button onClick={onClose} className="hover:text-[var(--color-ink-muted)] hover:scale-110 transition-transform flex items-center justify-center p-2">
             [X] CLOSE
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
           <div className="flex flex-col gap-4 border-b border-black/10 pb-8">
             <h3 className="text-xs font-bold font-serif normal-case tracking-normal mb-2 text-xl">Chapters</h3>
             
             {chapters.map((chapter, index) => (
               <div
                 key={chapter.number}
                 className={`group cursor-pointer hover:opacity-100 transition-opacity ${index === 0 ? '' : 'opacity-50 mt-4'}`}
                 onClick={() => scrollToSection(`book-chapter-${chapter.number}`)}
               >
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={`font-bold ${index === 0 ? 'underline group-hover:text-[var(--color-ink-muted)]' : ''}`}>
                      CHAPTER {chapter.number}
                    </span>
                    <span className="opacity-50">{chapter.wordCount.toLocaleString()}w</span>
                  </div>
                  <div className="normal-case font-serif tracking-normal text-sm group-hover:text-[var(--color-ink-muted)]">{chapter.title}</div>
               </div>
             ))}
           </div>
        </div>

        <div className="p-6 border-t border-[var(--color-border)] bg-[#E8E8E8] text-center opacity-60">
           AI PRESS / AI ENGINEER KB © 2026
        </div>
      </motion.div>
    </>
  );
};

const SettingsModal = ({ isOpen, onClose, settings, updateSettings }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-[var(--color-paper)] border border-[var(--color-border)] shadow-2xl p-6 md:p-8 w-full max-w-sm rounded flex flex-col gap-8 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] transition-colors duration-300"
      >
        <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
          <span className="font-bold">Reader Settings</span>
          <button onClick={onClose} className="hover:text-[var(--color-ink-muted)] px-2 py-1">[X]</button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
             <span className="opacity-50">Theme</span>
             <div className="flex gap-2">
                {['light', 'sepia', 'dark'].map(t => (
                  <button 
                    key={t}
                    onClick={() => updateSettings({ theme: t })}
                    className={`flex-1 py-3 border border-[var(--color-border)] rounded transition-colors ${settings.theme === t ? 'ring-2 ring-[var(--color-ink)] ring-offset-1 ring-offset-[var(--color-paper)] bg-[var(--color-ink)]/5' : 'hover:bg-[var(--color-ink)]/5'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
          </div>
          
          <div className="flex flex-col gap-3">
             <span className="opacity-50">Typography</span>
             <div className="flex flex-col gap-2">
                {[
                  { id: 'serif', label: 'Default (Serif)', style: { fontFamily: 'var(--font-serif)' } },
                  { id: 'sans', label: 'Clean (Sans)', style: { fontFamily: 'var(--font-sans)', textTransform: 'capitalize' } },
                  { id: 'dyslexic', label: 'Dyslexia Friendly', style: { fontFamily: 'var(--font-dyslexic)', textTransform: 'capitalize' } }
                ].map(t => (
                  <button 
                    key={t.id}
                    onClick={() => updateSettings({ typography: t.id })}
                    style={t.style as any}
                    className={`w-full py-2 border border-[var(--color-border)] rounded transition-colors ${settings.typography === t.id ? 'ring-2 ring-[var(--color-ink)] ring-offset-1 ring-offset-[var(--color-paper)] bg-[var(--color-ink)]/5' : 'hover:bg-[var(--color-ink)]/5'}`}
                  >
                    {t.label}
                  </button>
                ))}
             </div>
          </div>
          
          <div className="flex flex-col gap-3">
             <span className="opacity-50">Font Size</span>
             <div className="flex gap-2">
                {['sm', 'md', 'lg'].map(s => (
                  <button 
                    key={s}
                    onClick={() => updateSettings({ fontSize: s })}
                    className={`flex-1 py-3 border border-[var(--color-border)] rounded transition-colors ${settings.fontSize === s ? 'ring-2 ring-[var(--color-ink)] ring-offset-1 ring-offset-[var(--color-paper)] bg-[var(--color-ink)]/5' : 'hover:bg-[var(--color-ink)]/5'}`}
                  >
                    {s === 'sm' ? 'a' : s === 'md' ? 'Aa' : 'AA'}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="opacity-50">Line Spacing</span>
             <div className="flex gap-2">
                {['normal', 'relaxed', 'loose'].map(l => (
                  <button 
                    key={l}
                    onClick={() => updateSettings({ lineSpacing: l })}
                    className={`flex-1 py-3 border border-[var(--color-border)] rounded transition-colors flex flex-col items-center justify-center gap-1 ${settings.lineSpacing === l ? 'ring-2 ring-[var(--color-ink)] ring-offset-1 ring-offset-[var(--color-paper)] bg-[var(--color-ink)]/5' : 'hover:bg-[var(--color-ink)]/5'}`}
                  >
                    <div className={`w-4 h-[1px] bg-current ${l === 'normal' ? 'my-0.5' : l === 'relaxed' ? 'my-1' : 'my-1.5'}`} />
                    <div className={`w-4 h-[1px] bg-current ${l === 'normal' ? 'my-0.5' : l === 'relaxed' ? 'my-1' : 'my-1.5'}`} />
                    <div className={`w-4 h-[1px] bg-current ${l === 'normal' ? 'my-0.5' : l === 'relaxed' ? 'my-1' : 'my-1.5'}`} />
                  </button>
                ))}
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

type ConceptFigure = {
  title: string;
  body: string;
  illustrationIndex: number;
};

const illustrationSheet = '/assets/illustrations/ai-engineer-practical-explainers-sheet.png';

const chapterIllustrations = [
  { position: '0% 0%', subject: 'task pipeline', theme: 'Assistant to delegate' },
  { position: '33.333% 0%', subject: 'review lens', theme: 'Taste and judgment' },
  { position: '66.666% 0%', subject: 'agent-ready repo', theme: 'Repo as interface' },
  { position: '100% 0%', subject: 'harness workflow', theme: 'Harness workflow' },
  { position: '0% 50%', subject: 'eval loop', theme: 'Evals as control systems' },
  { position: '33.333% 50%', subject: 'context pipeline', theme: 'Context infrastructure' },
  { position: '66.666% 50%', subject: 'durable runtime', theme: 'Runtimes and state' },
  { position: '100% 50%', subject: 'human control plane', theme: 'Human control plane' },
  { position: '0% 100%', subject: 'security boundary', theme: 'Security and identity' },
  { position: '33.333% 100%', subject: 'realtime voice', theme: 'Realtime voice' },
  { position: '66.666% 100%', subject: 'AI-native organization', theme: 'AI-native organization' },
  { position: '100% 100%', subject: 'enduring principles', theme: 'What endures' },
];

const chapterVisualGuides: Record<string, ConceptFigure[]> = {
  '01': [
    {
      title: 'Assistant vs delegate',
      body: 'The reader should see the shift from chat as an interface to delegated work as an operating model.',
      illustrationIndex: 0,
    },
    {
      title: 'Software factory',
      body: 'A useful AI system needs work intake, constraints, review, and output paths, not only a model prompt.',
      illustrationIndex: 3,
    },
    {
      title: 'High-stakes colleague',
      body: 'The more serious the work becomes, the more authority, evidence, and supervision matter.',
      illustrationIndex: 7,
    },
  ],
  '02': [
    {
      title: 'Taste is the filter',
      body: 'When code gets cheap, judgment becomes the scarce ability that decides what is worth building.',
      illustrationIndex: 1,
    },
    {
      title: 'Vibe coding risk',
      body: 'Fast generation is useful, but review discipline is what prevents convincing low-quality work.',
      illustrationIndex: 1,
    },
    {
      title: 'Problem framing',
      body: 'The valuable move is defining the target, constraints, and tradeoffs before the agent starts.',
      illustrationIndex: 0,
    },
  ],
  '03': [
    {
      title: 'Repo as interface',
      body: 'The codebase itself teaches the agent what good work means through patterns, tests, and boundaries.',
      illustrationIndex: 0,
    },
    {
      title: 'Executable intent',
      body: 'Specs are not paperwork when they become concrete acceptance criteria and repeatable checks.',
      illustrationIndex: 1,
    },
    {
      title: 'Harness workflow',
      body: 'The harness connects tasks, tools, subagents, review, and verification into one usable system.',
      illustrationIndex: 3,
    },
  ],
  '04': [
    {
      title: 'Measurement loop',
      body: 'Evals turn subjective confidence into observable behavior that can be improved.',
      illustrationIndex: 4,
    },
    {
      title: 'Control system',
      body: 'Production trust comes from feedback, thresholds, and response paths, not from a good demo.',
      illustrationIndex: 4,
    },
    {
      title: 'Regression memory',
      body: 'Good evals remember failures so the system does not quietly relearn the same mistake.',
      illustrationIndex: 4,
    },
  ],
  '05': [
    {
      title: 'Working set',
      body: 'Context engineering is deciding what the model should know at the moment of action.',
      illustrationIndex: 5,
    },
    {
      title: 'Retrieval shape',
      body: 'The issue is not whether information exists; it is whether the right evidence arrives in usable form.',
      illustrationIndex: 5,
    },
    {
      title: 'Memory boundaries',
      body: 'Memory must be scoped, inspectable, and maintained like infrastructure.',
      illustrationIndex: 5,
    },
  ],
  '06': [
    {
      title: 'Durable runtime',
      body: 'Agents need state, resumability, and recovery paths if they are expected to do real work.',
      illustrationIndex: 6,
    },
    {
      title: 'Replay vs snapshot',
      body: 'The runtime has to decide what is reconstructed from history and what is preserved as state.',
      illustrationIndex: 6,
    },
    {
      title: 'Human control plane',
      body: 'Humans need surfaces for approval, intervention, audit, and escalation.',
      illustrationIndex: 7,
    },
  ],
  '07': [
    {
      title: 'Authority boundary',
      body: 'Delegated work requires clear permissions, identity, and policy gates.',
      illustrationIndex: 8,
    },
    {
      title: 'Audit trail',
      body: 'Trust improves when actions can be traced, explained, and reversed.',
      illustrationIndex: 7,
    },
    {
      title: 'High-stakes escalation',
      body: 'Sensitive domains need explicit handoff points before autonomy becomes risk.',
      illustrationIndex: 8,
    },
  ],
  '08': [
    {
      title: 'Latency changes meaning',
      body: 'Realtime systems are judged by interruption, turn-taking, and timing, not only answer quality.',
      illustrationIndex: 9,
    },
    {
      title: 'Embodied edge',
      body: 'Voice and devices expose how AI behaves inside messy physical workflows.',
      illustrationIndex: 9,
    },
    {
      title: 'Cost of interruption',
      body: 'A helpful system can still fail if it speaks at the wrong time or breaks the user flow.',
      illustrationIndex: 9,
    },
  ],
  '09': [
    {
      title: 'AI-native operating model',
      body: 'Teams change when agents become part of the production process rather than side tools.',
      illustrationIndex: 10,
    },
    {
      title: 'Incentives and review',
      body: 'Organizations need new habits for accountability, review, and ownership.',
      illustrationIndex: 1,
    },
    {
      title: 'Knowledge compounding',
      body: 'The best teams turn repeated work into reusable context, evals, and playbooks.',
      illustrationIndex: 5,
    },
  ],
  '10': [
    {
      title: 'What survives tool churn',
      body: 'Models change quickly, but context, evals, control, and taste remain durable principles.',
      illustrationIndex: 11,
    },
    {
      title: 'Dependable systems',
      body: 'The lasting craft is turning capability into systems people can trust and operate.',
      illustrationIndex: 7,
    },
    {
      title: 'Engineering judgment',
      body: 'The book closes on the human disciplines that remain valuable as tools accelerate.',
      illustrationIndex: 1,
    },
  ],
};

const getChapterGuide = (chapter: BookChapter) => chapterVisualGuides[chapter.number] ?? chapterVisualGuides['10'];

const ConceptMap = ({ figures }: { figures: ConceptFigure[] }) => (
  <div className="concept-map">
    {figures.map((figure, index) => (
      <div key={figure.title} className="concept-map-item">
        <InlineIllustration figure={figure} label={`Idea ${index + 1}`} compact />
      </div>
    ))}
  </div>
);

const InlineIllustration = ({
  figure,
  label,
  compact = false,
}: {
  figure: ConceptFigure;
  label: string;
  compact?: boolean;
}) => {
  const illustration = chapterIllustrations[figure.illustrationIndex % chapterIllustrations.length];

  return (
    <figure className={compact ? 'concept-figure compact' : 'concept-figure'}>
      <div
        className="oreilly-thumb"
        role="img"
        aria-label={`${illustration.subject} woodcut figure: ${figure.title}`}
        style={{
          backgroundImage: `url(${illustrationSheet})`,
          backgroundPosition: illustration.position,
        }}
      />
      <figcaption>
        <span>{label}</span>
        <strong>{figure.title}</strong>
        <p>{figure.body}</p>
      </figcaption>
    </figure>
  );
};

const chapterDiagram: Record<string, string> = {
  '01': '/diagrams/05-chapter1-the-shift.png',
  '02': '/diagrams/06-chapter2-taste.png',
  '03': '/diagrams/07-chapter3-harnesses.png',
  '04': '/diagrams/08-chapter4-evals.png',
  '05': '/diagrams/09-chapter5-context.png',
  '06': '/diagrams/10-chapter6-runtimes.png',
  '07': '/diagrams/11-chapter7-security.png',
  '08': '/diagrams/12-chapter8-realtime.png',
  '09': '/diagrams/13-chapter9-ai-native-org.png',
  '10': '/diagrams/14-chapter10-what-endures.png',
};

const ChapterArticle = ({ chapter }: { chapter: BookChapter }) => {
  const blocks = chapter.content
    .replace(/^# Chapter 3 Draft v0[\s\S]*?---\n+/m, '')
    .replace(/^## Draft note[\s\S]*?---\n+/m, '')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  const figures = getChapterGuide(chapter);
  let headingFigureIndex = 0;

  return (
    <article id={`book-chapter-${chapter.number}`} className="book-reader-prose">
      <div className="mb-12 border-b border-[var(--color-border)] pb-8 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
        <span>CHAPTER {chapter.number}</span>
        <span className="mx-3">/</span>
        <span>{chapter.wordCount.toLocaleString()} words</span>
        <span className="mx-3">/</span>
        <span>{chapter.status}</span>
      </div>
      <p className="mb-10 text-[1.45rem] leading-[1.35] italic text-[var(--color-ink-muted)]">
        {chapter.promise}
      </p>
      {chapterDiagram[chapter.number] ? (
        <figure className="mb-12 border border-[var(--color-border)] bg-white">
          <img
            src={chapterDiagram[chapter.number]}
            alt={`Chapter ${chapter.number}: the naive way versus the engineered way`}
            className="block h-auto w-full"
            loading="lazy"
          />
          <figcaption className="border-t border-[var(--color-border)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
            Fig. {chapter.number} — before / after: how this chapter changes the work
          </figcaption>
        </figure>
      ) : null}
      <ConceptMap figures={figures} />
      {blocks.map((block, index) => (
        <React.Fragment key={`${chapter.number}-${index}`}>
          <MarkdownBlock block={block} />
          {block.startsWith('## ') && headingFigureIndex < figures.length ? (
            <InlineIllustration
              figure={figures[headingFigureIndex]}
              label={`Figure ${chapter.number}.${headingFigureIndex + 1}`}
              compact={false}
            />
          ) : null}
          {block.startsWith('## ') ? void (headingFigureIndex += 1) : null}
        </React.Fragment>
      ))}
    </article>
  );
};

const ChapterIllustration = ({ chapter, index }: { chapter: BookChapter; index: number }) => {
  const guide = getChapterGuide(chapter);
  const illustrationIndex = guide[0]?.illustrationIndex ?? index;
  const illustration = chapterIllustrations[illustrationIndex % chapterIllustrations.length];

  return (
    <div className="relative z-20 w-full max-w-md">
      <div
        className="oreilly-panel"
        role="img"
        aria-label={`${illustration.subject} woodcut illustration for chapter ${chapter.number}: ${illustration.theme}`}
        style={{
          backgroundImage: `url(${illustrationSheet})`,
          backgroundPosition: illustration.position,
        }}
      />
      <div className="mt-6 border-t border-white/20 pt-5 font-mono text-[10px] uppercase tracking-widest text-white/60">
        <span>Fig. {chapter.number}</span>
        <span className="mx-3">/</span>
        <span>{illustration.theme}</span>
      </div>
    </div>
  );
};

const FullBookReader = () => {
  return (
    <section className="w-full bg-[var(--color-paper)] relative pb-24 border-t border-[var(--color-border)] flex flex-col z-20">
      {chapters.map((chapter, index) => (
        <div
          key={chapter.number}
          className={`section-container min-h-screen flex flex-col lg:flex-row relative border-t border-[var(--color-border)] ${
            index % 2 === 0 ? 'bg-[#F8F6F0]' : 'bg-[var(--color-paper)]'
          }`}
        >
          <div className={`lg:w-[42%] xl:w-[45%] relative lg:sticky lg:top-0 h-[46vh] lg:h-screen overflow-hidden border-[var(--color-border)] bg-[#1f1f20] z-0 ${
            index % 2 === 0 ? 'lg:border-r order-1' : 'lg:border-l order-1 lg:order-2'
          }`}>
            <DynamicVisuals colorMarker={index % 3 === 0 ? '#EAC6C0' : index % 3 === 1 ? '#ffffff' : '#A4B8C4'} type={index % 3 === 0 ? 'gradient' : index % 3 === 1 ? 'geometric' : 'particles'} />
            <div className="sticky top-0 h-full flex flex-col items-center justify-center p-8 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.45)_100%)] z-10 pointer-events-none" />
              <ChapterIllustration chapter={chapter} index={index} />
              <div className="relative z-20 mt-8 max-w-md border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">AI Engineer Book</p>
                <h2 className="mt-5 font-serif text-4xl leading-none md:text-5xl">
                  {chapter.number}
                </h2>
                <p className="mt-6 font-serif text-2xl italic leading-tight text-balance">
                  {chapter.title}
                </p>
              </div>
              <h3 className="absolute z-20 text-white font-mono text-[11vw] lg:text-[7vw] font-bold tracking-tighter mix-blend-overlay rotate-90 right-0 origin-bottom-right translate-y-[50%] mr-10 opacity-20 pointer-events-none">
                CH{chapter.number}
              </h3>
            </div>
          </div>

          <div className={`w-full lg:w-[58%] xl:w-[55%] relative flex flex-col z-10 ${
            index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'
          }`}>
            <div className="p-8 md:p-12 lg:px-16 border-b border-[var(--color-border)] flex flex-col md:flex-row justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink)]">
              <div className="flex items-start gap-4">
                <span className="text-[14px] leading-none">▦</span>
                <span className="leading-[1.8]">CH. {chapter.number} // <span className="underline underline-offset-4 decoration-black/50">{chapter.status}</span></span>
              </div>
              <div className="text-left md:text-right text-[var(--color-ink-muted)]">{chapter.wordCount.toLocaleString()} words</div>
            </div>
            <div className="p-8 md:p-12 lg:p-16 lg:px-20">
              <ChapterArticle chapter={chapter} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default function App() {
  const { scrollYProgress, scrollY } = useScroll();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  });
  
  const [settings, setSettings] = useState({
    theme: 'sepia',
    typography: 'serif',
    fontSize: 'md',
    lineSpacing: 'relaxed',
  });

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const themeVars = useMemo(() => {
    let vars: any = {};
    if (settings.theme === 'light') {
      vars['--color-paper'] = '#FFFFFF';
      vars['--color-ink'] = '#121212';
      vars['--color-ink-muted'] = '#666666';
      vars['--color-border'] = '#EAEAEA';
      vars['--color-pink'] = '#F3F4F6';
    } else if (settings.theme === 'dark') {
      vars['--color-paper'] = '#18181B';
      vars['--color-ink'] = '#EDEDED';
      vars['--color-ink-muted'] = '#A1A1AA';
      vars['--color-border'] = '#3F3F46';
      vars['--color-pink'] = '#27272A';
    }

    if (settings.typography === 'sans') {
      vars['--font-reader'] = 'var(--font-sans)';
    } else if (settings.typography === 'dyslexic') {
      vars['--font-reader'] = 'var(--font-dyslexic)';
    } else {
      vars['--font-reader'] = 'var(--font-serif)';
    }

    if (settings.fontSize === 'sm') {
      vars['--reader-font-size-sm'] = '1.1rem';
      vars['--reader-font-size-md'] = '1.25rem';
      vars['--reader-font-size-lg'] = '1.35rem';
    } else if (settings.fontSize === 'lg') {
      vars['--reader-font-size-sm'] = '1.4rem';
      vars['--reader-font-size-md'] = '1.6rem';
      vars['--reader-font-size-lg'] = '1.75rem';
    } else {
      vars['--reader-font-size-sm'] = '1.25rem';
      vars['--reader-font-size-md'] = '1.4rem';
      vars['--reader-font-size-lg'] = '1.5rem';
    }

    if (settings.lineSpacing === 'normal') {
      vars['--reader-line-spacing'] = '1.4';
    } else if (settings.lineSpacing === 'loose') {
      vars['--reader-line-spacing'] = '1.8';
    } else {
      vars['--reader-line-spacing'] = '1.6';
    }

    return vars;
  }, [settings]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  // Prevent scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-pink)] font-sans antialiased pb-12 overflow-x-hidden transition-colors duration-300" style={themeVars as React.CSSProperties}>
       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
       <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} settings={settings} updateSettings={updateSettings} />
       <TopNav progress={scrollYProgress} onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)} />
       <main className="relative pt-14">
         <Hero />
         <FullBookReader />
       </main>
       <BottomNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} progress={scrollYProgress} />

       <motion.button
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: showBackToTop ? 1 : 0, y: showBackToTop ? 0 : 50 }}
         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
         className={`fixed bottom-24 right-8 w-12 h-12 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-full flex items-center justify-center shadow-lg border border-[var(--color-border)] hover:scale-110 transition-transform z-40 ${showBackToTop ? 'pointer-events-auto' : 'pointer-events-none'}`}
       >
         ↑
       </motion.button>
    </div>
  );
}
