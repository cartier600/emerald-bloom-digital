import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { EASE } from "@/lib/motion";

// "MUNCHIES" with the I intentionally missing throughout the entrance.
// Each letter crystallizes from a blurred, scattered smoke state into a
// crisp, solid character. Immediately after the word solidifies, an SVG
// clip-path subtracts a clean semicircular "bite" from the bottom-left
// leg of the first M.
const LETTERS = ["M", "U", "N", "C", "H", "E", "S"] as const;

export function MunchiesSmokeText() {
  // Stable random smoke particle field (deterministic per mount)
  const particles = useMemo(
    () =>
      Array.from({ length: 42 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 320,
        size: 14 + Math.random() * 38,
        delay: Math.random() * 0.6,
        rot: Math.random() * 180,
      })),
    [],
  );

  // Unique id so multiple instances don't collide on the SVG clipPath
  const clipId = useMemo(() => `m-bite-${Math.random().toString(36).slice(2, 9)}`, []);

  // Trigger the bite right after the last letter solidifies.
  // Last letter delay = 0.2 + 6*0.07 = 0.62, duration 0.9 → ends ~1.52s.
  const [bitten, setBitten] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBitten(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Smoke haze — fades out as letters solidify */}
      <motion.div
        aria-hidden
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.0, delay: 1.0, ease: EASE }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 0, scale: 0.4, rotate: p.rot, filter: "blur(16px)" }}
            animate={{
              x: [p.x, p.x * 0.4, 0],
              y: [p.y, p.y * 0.4, 0],
              opacity: [0, 0.6, 0],
              scale: [0.4, 1, 0.2],
              filter: ["blur(20px)", "blur(10px)", "blur(2px)"],
            }}
            transition={{ duration: 1.6, delay: p.delay, ease: EASE }}
            style={{ width: p.size, height: p.size }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/35 mix-blend-multiply"
          />
        ))}
      </motion.div>

      {/* Letters — emerge from blur + scatter, then snap solid */}
      <span className="relative inline-flex items-baseline">
        {LETTERS.map((ch, i) => {
          const isFirstM = i === 0;
          // Deterministic-ish scatter per index so SSR/CSR match well enough
          const sx = (((i * 53) % 11) - 5) * 16;
          const sy = (((i * 97) % 9) - 4) * 14;
          return (
            <motion.span
              key={i}
              initial={{
                opacity: 0,
                x: sx,
                y: sy,
                scale: 0.6,
                filter: "blur(28px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.9,
                delay: 0.2 + i * 0.07,
                ease: EASE,
              }}
              className="relative inline-block"
              style={isFirstM && bitten ? { clipPath: `url(#${clipId})` } : undefined}
            >
              {ch}
              {isFirstM && (
                <>
                  {/* SVG clipPath: subtracts a perfect semicircle from the
                      bottom-left leg of the M. The clip rect starts as the
                      full bounding box, then the bite punches inward. */}
                  <svg
                    aria-hidden
                    width="0"
                    height="0"
                    className="absolute"
                    style={{ position: "absolute" }}
                  >
                    <defs>
                      <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        {/* Full letter shape minus circular bite at
                            bottom-left. We use a path with even-odd fill
                            so the inner circle cuts a hole. */}
                        <path
                          d="M0,0 H1 V1 H0 Z M0.18,0.92 m-0.18,0 a0.18,0.18 0 1,0 0.36,0 a0.18,0.18 0 1,0 -0.36,0 Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  {/* Chomp flash: bright acid pulse synced with the bite */}
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.6, 2.2], opacity: [0, 0.9, 0] }}
                    transition={{ delay: 1.4, duration: 0.55, ease: EASE }}
                    className="pointer-events-none absolute left-[-4%] bottom-[-4%] block aspect-square w-[34%] rounded-full bg-acid mix-blend-screen"
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