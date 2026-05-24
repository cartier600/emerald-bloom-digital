import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KEY = "haze-age-verified";

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.sessionStorage.getItem(KEY)) setOpen(true);
  }, []);

  const accept = () => {
    window.sessionStorage.setItem(KEY, "1");
    setOpen(false);
  };
  const deny = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 px-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 18 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border-4 border-acid bg-cream p-10 md:p-14"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-magenta" />
            <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-acid" />
            <div className="relative">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-ink/60">
                Munchies Cannabis Co.
              </p>
              <h2 className="font-display mt-4 text-6xl text-ink md:text-8xl">
                ARE YOU
                <br />
                <span className="text-magenta">21+?</span>
              </h2>
              <p className="mt-6 max-w-md text-base text-ink/70 md:text-lg">
                By entering this site you confirm you are of legal cannabis-purchasing
                age in your jurisdiction. Please consume responsibly.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={accept}
                  className="font-display group relative overflow-hidden rounded-full bg-ink px-8 py-5 text-lg text-cream transition-transform hover:scale-[1.02]"
                >
                  YES, LET ME IN
                </button>
                <button
                  onClick={deny}
                  className="rounded-full border-2 border-ink/20 px-8 py-5 text-base font-semibold text-ink/70 transition-colors hover:bg-ink/5"
                >
                  No, take me away
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}