import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

const SERVICE_OPTIONS = ['Brand', 'Digital', 'Campaign', 'Other'] as const;

const pillContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};
const pillItemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ServicePills() {
  const [services, setServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    );
  };

  return (
    <div>
      <motion.h2
        className="text-2xl font-medium tracking-tight mb-2 text-black"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        What sort of service?
      </motion.h2>
      <motion.p
        className="opacity-85 text-[#738273] mb-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        Select all that apply
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-3 mb-6"
        variants={pillContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {SERVICE_OPTIONS.map((option) => {
          const active = services.includes(option);
          return (
            <motion.button
              key={option}
              type="button"
              variants={pillItemVariants}
              onClick={() => toggleService(option)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5'
                  : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
              }`}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              layout
            >
              {option}
              <AnimatePresence>
                {active ? (
                  <motion.span
                    key={`${option}-check`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-4 h-4" aria-hidden="true" />
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        {services.length === 0 ? (
          <motion.p
            key="placeholder"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.5, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="italic text-xs text-[#738273]"
          >
            Please click to select services above.
          </motion.p>
        ) : (
          <motion.div
            key="acknowledgment"
            initial={{ opacity: 0, height: 0, y: 8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="overflow-hidden"
          >
            <motion.div
              className="bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              layout
            >
              <motion.p layout className="text-sm text-[#1C2E1E]">
                Ready to inquire about: <strong>{services.join(', ')}</strong>
              </motion.p>
              <motion.button
                type="button"
                className="inline-flex items-center gap-2 text-[#4D6D47] uppercase text-xs font-medium tracking-wide hover:opacity-70 transition-opacity"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                Let&apos;s Go
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
