import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { EASE } from "@/lib/motion";

// "MUNCHIES" with the I intentionally missing. A cartoon smoke-bomb
// puffs up in hot magenta, then scatters in chunky lobes — revealing
// the bold letters underneath. A clean circular bite-mark clip is
// subtracted from the bottom-left leg of the first M.
const LETTERS = ["M", "U", "N", "C", "H", "E", "S"] as const;

export function MunchiesSmokeText() {
  const puffs = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const dist = 220 + (i % 3) * 60;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist * 0.7,
          size: 90 + ((i * 37) % 70),
          delay: 0.02 * (i % 5),
          rot: (i * 47) % 360,
        };
      }),
    [],
  );

  const clipId = useMemo(
    () => `m-bite-${Math.random().toString(36).slice(2, 9)}`,
    [],
  );

  const [bitten, setBitten] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBitten(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Cartoon smoke-bomb cloud + scattering lobes */}
      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
        <motion.span
          aria-hidden
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{
            scale: [0.2, 1.15, 1.5, 1.9],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 1.15, times: [0, 0.35, 0.7, 1], ease: EASE }}
          className="absolute aspect-square h-[120%] rounded-full bg-magenta"
          style={{ boxShadow: "0 0 0 6px rgb(10,10,20)" }}
        />
        {puffs.map((p) => (
          <motion.span
            key={p.id}
            aria-hidden
            initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              x: [0, p.x * 0.3, p.x],
              y: [0, p.y * 0.3, p.y],
              scale: [0, 1.1, 0.2],
              opacity: [0, 1, 0],
              rotate: [0, p.rot * 0.5, p.rot],
            }}
            transition={{
              duration: 1.2,
              delay: 0.45 + p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ width: p.size, height: p.size }}
            className="absolute rounded-full bg-magenta"
          />
        ))}
      </div>

      {/* Letters pop in underneath the smoke */}
      <span className="relative inline-flex items-baseline">
        {LETTERS.map((ch, i) => {
          const isFirstM = i === 0;
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.4, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 22,
                delay: 1.15 + i * 0.05,
              }}
              className="relative inline-block"
              style={
                isFirstM && bitten ? { clipPath: `url(#${clipId})` } : undefined
              }
            >
              {ch}
              {isFirstM && (
                <>
                  <svg
                    aria-hidden
                    width="0"
                    height="0"
                    className="absolute"
                    style={{ position: "absolute" }}
                  >
                    <defs>
                      <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        <path
                          d="M0,0 H1 V1 H0 Z M0.18,0.92 m-0.18,0 a0.18,0.18 0 1,0 0.36,0 a0.18,0.18 0 1,0 -0.36,0 Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.6, 2.2], opacity: [0, 0.9, 0] }}
                    transition={{ delay: 1.7, duration: 0.6, ease: EASE }}
                    className="pointer-events-none absolute bottom-[-4%] left-[-4%] block aspect-square w-[34%] rounded-full bg-acid mix-blend-screen"
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
