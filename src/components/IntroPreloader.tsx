import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["PREMIUM", "LOCAL", "VIBES", "ROCKAWAY"] as const;

export function IntroPreloader() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index >= WORDS.length - 1) {
      const t = setTimeout(() => setDone(true), 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), 300);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
        >
          <div className="relative flex items-center gap-3">
            <span className="font-display text-acid text-3xl md:text-5xl">[</span>
            <div className="relative h-[1.2em] min-w-[7ch] text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[index]}
                  initial={{ scale: 0.4, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 1.4, opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 600, damping: 18 }}
                  className="font-display absolute inset-0 text-cream text-4xl md:text-6xl"
                >
                  {WORDS[index]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="font-display text-acid text-3xl md:text-5xl">]</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
