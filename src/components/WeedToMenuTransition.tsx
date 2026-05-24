import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

// Scroll-tied transition between the Sativa (yellow) world and THE MENU.
// A green fractal/bud wave accelerates downward, collapses into a black
// vortex, then snaps into the letter "M". Background morphs yellow→green→cream.
export function WeedToMenuTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Background morph: acid (yellow) → lime (green) → cream
  const background = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85, 1],
    [
      "oklch(0.92 0.22 110)",
      "oklch(0.78 0.25 145)",
      "oklch(0.25 0.15 290)",
      "oklch(0.97 0.04 95)",
    ],
  );

  // Bud wave: rides downward, accelerates, then disappears
  const waveY = useTransform(scrollYProgress, [0, 0.55], ["-20%", "120%"]);
  const waveScale = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1.6, 0.4]);
  const waveOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 1, 0]);

  // Vortex: appears mid-scroll, spins, then collapses into the M
  const vortexOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.85, 0.95], [0, 1, 1, 0]);
  const vortexRotate = useTransform(scrollYProgress, [0.4, 0.95], [0, 540]);
  const vortexScale = useTransform(scrollYProgress, [0.4, 0.7, 0.95], [2.2, 1, 0.4]);

  // M letter: snaps in at the very end
  const mOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const mScale = useTransform(scrollYProgress, [0.82, 0.95, 1], [0.4, 1.1, 1]);

  // Sticky stage color for the inner content (text contrast)
  const [phase, setPhase] = useState<"start" | "mid" | "end">("start");
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPhase(v < 0.5 ? "start" : v < 0.85 ? "mid" : "end");
  });
  const textColor =
    phase === "end" ? "text-ink" : phase === "mid" ? "text-cream" : "text-ink";

  return (
    <motion.section
      ref={ref}
      style={{ background }}
      className="relative h-[220vh] w-full border-y-2 border-ink"
      aria-label="Transition into the menu"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Fractal bud wave (layered blobs) */}
        <motion.svg
          aria-hidden
          viewBox="0 0 800 800"
          style={{ y: waveY, scale: waveScale, opacity: waveOpacity }}
          className="absolute inset-0 m-auto h-[120vh] w-[120vh] max-w-none"
        >
          <defs>
            <radialGradient id="bud" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.88 0.28 145)" />
              <stop offset="60%" stopColor="oklch(0.55 0.22 150)" />
              <stop offset="100%" stopColor="oklch(0.22 0.12 160)" />
            </radialGradient>
          </defs>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path
              key={i}
              d="M400 80 C 560 140 700 260 700 420 C 700 600 540 720 400 720 C 260 720 100 600 100 420 C 100 260 240 140 400 80 Z"
              fill="url(#bud)"
              opacity={0.18 + i * 0.12}
              animate={{
                rotate: [0, 12, -8, 0],
                scale: [1, 1.05 + i * 0.02, 1],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "400px 400px" }}
            />
          ))}
        </motion.svg>

        {/* Black vortex */}
        <motion.div
          aria-hidden
          style={{
            opacity: vortexOpacity,
            rotate: vortexRotate,
            scale: vortexScale,
          }}
          className="absolute h-[80vh] w-[80vh] rounded-full"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-ink"
              style={{
                transform: `scale(${1 - i * 0.14}) rotate(${i * 28}deg)`,
                borderTopColor: "transparent",
                borderRightColor: i % 2 ? "transparent" : "var(--ink)",
                background:
                  i === 0
                    ? "radial-gradient(circle at 50% 50%, oklch(0.12 0.02 270) 0%, oklch(0.12 0.02 270 / 0.4) 60%, transparent 75%)"
                    : "transparent",
              }}
            />
          ))}
        </motion.div>

        {/* Snapping M letter */}
        <motion.span
          style={{ opacity: mOpacity, scale: mScale }}
          className="font-display absolute text-ink"
        >
          <span className="block text-[40vh] leading-none">M</span>
        </motion.span>

        {/* Caption */}
        <div className={`pointer-events-none absolute bottom-12 left-0 right-0 text-center transition-colors ${textColor}`}>
          <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-80">
            ✺ Scroll into the menu
          </p>
        </div>
      </div>
    </motion.section>
  );
}