import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroPreloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ y: 2 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <span className="font-display text-acid text-3xl md:text-5xl translate-y-[-2px]">[</span>
            <span className="font-display text-cream text-2xl md:text-5xl tracking-wide">
              MUNCHIES ROCKAWAY NY
            </span>
            <span className="font-display text-acid text-3xl md:text-5xl translate-y-[-2px]">]</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
