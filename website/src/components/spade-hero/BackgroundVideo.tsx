import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import {
  heroAmbientVideo,
  heroMobileVideo,
  heroScrubVideo,
  resolveVideoSrc,
} from '../../data/spadeHeroVideos';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { AmbientMotion } from './AmbientMotion';

const PREFER_LOCAL = true;

export function BackgroundVideo() {
  const reduced = usePrefersReducedMotion();
  const primaryRef = useRef<HTMLVideoElement>(null);
  const ambientRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);
  const previousXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

  const mouseX = useMotionValue(62);
  const mouseY = useMotionValue(72);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 22 });
  const veil = useMotionTemplate`linear-gradient(118deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 38%, rgba(255,255,255,0.08) 72%, rgba(255,255,255,0) 100%), radial-gradient(ellipse 70% 60% at ${springX}% ${springY}%, rgba(234,236,233,0.25), transparent 70%)`;

  useEffect(() => {
    const primary = primaryRef.current;
    const ambient = ambientRef.current;
    const mobile = mobileRef.current;
    if (!primary) return;

    const enableMobilePlayback = () => {
      if (window.innerWidth >= 1024) return;
      const active = mobile ?? primary;
      active.autoplay = true;
      void active.play().catch(() => undefined);
    };

    const enableAmbientLoop = () => {
      if (!ambient || reduced) return;
      ambient.loop = true;
      ambient.muted = true;
      ambient.playbackRate = 0.65;
      void ambient.play().catch(() => undefined);
    };

    const handleSeeked = () => {
      targetTimeRef.current = primary.currentTime;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set((event.clientX / window.innerWidth) * 100);
      mouseY.set((event.clientY / window.innerHeight) * 100);

      if (window.innerWidth < 1024 || reduced) return;
      if (!primary.duration || Number.isNaN(primary.duration)) return;

      const currentX = event.clientX;
      const previousX = previousXRef.current ?? currentX;
      const delta = currentX - previousX;
      previousXRef.current = currentX;

      const scrubDelta = (delta / window.innerWidth) * 0.8 * primary.duration;
      const nextTime = Math.min(
        primary.duration,
        Math.max(0, targetTimeRef.current + scrubDelta)
      );

      targetTimeRef.current = nextTime;
      primary.currentTime = nextTime;
    };

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        enableMobilePlayback();
        previousXRef.current = null;
        primary.pause();
        primary.autoplay = false;
      } else {
        primary.pause();
        primary.autoplay = false;
        if (mobile) {
          mobile.pause();
          mobile.autoplay = false;
        }
        enableAmbientLoop();
      }
    };

    const onLoaded = () => {
      targetTimeRef.current = primary.currentTime;
      setLoaded(true);
      handleResize();
    };

    primary.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    if (primary.readyState >= 1) {
      onLoaded();
    } else {
      primary.addEventListener('loadedmetadata', onLoaded, { once: true });
    }

    return () => {
      primary.removeEventListener('seeked', handleSeeked);
      primary.removeEventListener('loadedmetadata', onLoaded);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY, reduced]);

  const scrubSrc = resolveVideoSrc(heroScrubVideo, PREFER_LOCAL);
  const ambientSrc = resolveVideoSrc(heroAmbientVideo, PREFER_LOCAL);
  const mobileSrc = resolveVideoSrc(heroMobileVideo, PREFER_LOCAL);

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.03 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          ref={ambientRef}
          className="hidden lg:block absolute inset-0 w-full h-full object-cover object-right-bottom opacity-35 scale-105"
          muted
          playsInline
          preload="auto"
          src={ambientSrc}
          aria-hidden="true"
        />

        <video
          ref={primaryRef}
          className="hidden lg:block w-full h-full object-cover object-right lg:object-right-bottom"
          muted
          playsInline
          preload="auto"
          src={scrubSrc}
          aria-hidden="true"
        />

        <video
          ref={mobileRef}
          className="lg:hidden w-full h-full object-cover object-right"
          muted
          playsInline
          preload="auto"
          src={mobileSrc}
          aria-hidden="true"
        />
      </motion.div>

      <AmbientMotion />

      <motion.div
        className="absolute inset-0 hidden lg:block"
        style={{ background: veil }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30 lg:from-white/10 lg:to-white/20"
        aria-hidden="true"
      />
    </div>
  );
}
