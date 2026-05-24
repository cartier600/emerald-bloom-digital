import { motion } from "framer-motion";
import { useMemo } from "react";
import { EASE } from "@/lib/motion";

// "MUNCHIES" but the I is intentionally missing. Letters crystallize
// from a haze of smoke particles, then a circular "chomp" bite is removed
// from the bottom-left leg of the first M.
const LETTERS = ["M", "U", "N", "C", "H", "E", "S"] as const;

export function MunchiesSmokeText() {
  // Stable random smoke particle field
  const particles = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 320,
        size: 14 + Math.random() * 38,
        delay: Math.random() * 0.6,
        rot: Math.random() * 180,
      })),
    [],
  );

  return (
    <div className="relative inline-block">
      {/* Smoke haze — fades out as letters solidify */}
      <motion.div
        aria-hidden
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, delay: 1.2, ease: EASE }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 0, scale: 0.4, rotate: p.rot, filter: "blur(14px)" }}
            animate={{
              x: [p.x, p.x * 0.4, 0],
              y: [p.y, p.y * 0.4, 0],
              opacity: [0, 0.55, 0],
              scale: [0.4, 1, 0.2],
              filter: ["blur(18px)", "blur(10px)", "blur(2px)"],
            }}
            transition={{ duration: 1.8, delay: p.delay, ease: EASE }}
            style={{ width: p.size, height: p.size }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/35 mix-blend-multiply"
          />
        ))}
      </motion.div>

      {/* Letters — emerge from blur + scatter and snap into place */}
      <span className="relative flex items-baseline">
        {LETTERS.map((ch, i) => {
          const isFirstM = i === 0;
          return (
            <motion.span
              key={i}
              initial={{
                opacity: 0,
                y: (Math.random() - 0.5) * 80,
                x: (Math.random() - 0.5) * 80,
                scale: 0.6,
                filter: "blur(24px)",
              }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                delay: 0.6 + i * 0.08,
                ease: EASE,
              }}
              className="relative inline-block"
            >
              {ch}
              {isFirstM && (
                <>
                  {/* Bite: cream circle with ink border punches the bottom-left leg */}
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 1.9,
                      duration: 0.45,
                      ease: [0.16, 1.4, 0.3, 1],
                    }}
                    className="absolute left-[-2%] bottom-[2%] z-10 block aspect-square w-[28%] rounded-full border-[6px] border-ink bg-cream"
                  />
                  {/* Chomp flash */}
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.8, 2.4], opacity: [0, 0.9, 0] }}
                    transition={{ delay: 1.85, duration: 0.7, ease: EASE }}
                    className="absolute left-[-2%] bottom-[2%] block aspect-square w-[28%] rounded-full bg-acid mix-blend-screen"
                  />
                </>
              )}
            </motion.span>
          );
        })}
      </span>
    </div>
  );
}