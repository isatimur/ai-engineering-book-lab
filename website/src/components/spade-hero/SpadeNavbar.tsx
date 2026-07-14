import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop'] as const;

export function SpadeNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backdrop = useTransform(scrollY, [0, 120], [0.35, 0.92]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const headerBg = useTransform(backdrop, (v) => `rgba(255,255,255,${v})`);
  const headerBorder = useTransform(borderOpacity, (v) => `rgba(28,46,30,${v * 0.08})`);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center"
        style={{
          backgroundColor: headerBg,
          borderBottomWidth: 1,
          borderBottomColor: headerBorder,
        }}
        role="banner"
      >
        <motion.a
          href="#spade-hero"
          className="flex flex-row items-center gap-3"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Mainframe&reg;
          </span>
          <motion.span
            className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1"
            animate={{ rotate: [0, 8, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            &#10033;
          </motion.span>
        </motion.a>

        <nav className="hidden md:flex flex-row items-center text-[23px] text-black" aria-label="Primary">
          {NAV_LINKS.map((link, index) => (
            <span key={link} className="inline-flex items-center">
              {index > 0 ? <span className="opacity-40">,&nbsp;</span> : null}
              <motion.a
                href="#"
                className="hover:opacity-60 transition-opacity"
                whileHover={{ y: -1 }}
              >
                {link}
              </motion.a>
            </span>
          ))}
        </nav>

        <motion.a
          href="#spade-hero"
          className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          whileHover={{ y: -1 }}
        >
          Get in touch
        </motion.a>

        <button
          type="button"
          className="md:hidden relative w-8 h-8"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <span
            className={`absolute left-1 top-[11px] w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`absolute left-1 top-[19px] w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`absolute left-1 top-[27px] w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </motion.header>

      <motion.div
        className="md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm"
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.28 }}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav
          className="flex flex-col items-start justify-center h-full px-8 gap-6 text-[32px] text-black"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link, index) => (
            <motion.a
              key={link}
              href="#"
              className="hover:opacity-60 transition-opacity"
              initial={{ opacity: 0, x: -16 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -16,
              }}
              transition={{ delay: isMobileMenuOpen ? 0.05 * index : 0, duration: 0.35 }}
              onClick={closeMenu}
            >
              {link}
            </motion.a>
          ))}
          <motion.a
            href="#spade-hero"
            className="mt-4 text-[23px] underline underline-offset-2 hover:opacity-60 transition-opacity"
            initial={{ opacity: 0, x: -16 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              x: isMobileMenuOpen ? 0 : -16,
            }}
            transition={{ delay: isMobileMenuOpen ? 0.22 : 0, duration: 0.35 }}
            onClick={closeMenu}
          >
            Get in touch
          </motion.a>
        </nav>
      </motion.div>
    </>
  );
}
