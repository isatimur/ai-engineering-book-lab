import { motion, useScroll, useTransform } from 'motion/react';
import { Seo } from '../components/Seo';
import { BackgroundVideo } from '../components/spade-hero/BackgroundVideo';
import { ServicePills } from '../components/spade-hero/ServicePills';
import { SpadeNavbar } from '../components/spade-hero/SpadeNavbar';
import { useTypewriter } from '../hooks/useTypewriter';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SpadeHero() {
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!");
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : -36]);
  const contentOpacity = useTransform(scrollY, [0, 420], [1, reduced ? 1 : 0.88]);

  return (
    <>
      <Seo
        title="Mainframe — Get in touch"
        description="Whether you have questions or feedback, drop us a message and we'll get back to you as soon as possible."
        path="/spade-hero"
      />

      <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
        <SpadeNavbar />
        <BackgroundVideo />

        <motion.div
          className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.main
            id="spade-hero"
            className="w-full max-w-7xl mx-auto px-6 pt-28 pb-12 lg:pt-12 flex-1 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
                {displayed}
                {!done ? (
                  <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
                ) : null}
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
                Whether you have questions, feedback, <br />
                drop us a message and we&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ServicePills />
            </motion.div>
          </motion.main>
        </motion.div>
      </div>
    </>
  );
}
