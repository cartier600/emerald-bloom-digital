import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MunchiesSmokeText } from "./MunchiesSmokeText";
import doodleArt from "@/assets/munchies-doodle-art.png";

// Scroll-tied transition between the Sativa (yellow) world and THE MENU.
// A green fractal/bud wave accelerates downward, collapses into a black
// vortex, then snaps into the letter "M". Background morphs yellow→green→cream.
export function WeedToMenuTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Hero headline overlay: visible at the top, fades as the vortex takes over
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45, 0.7], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.7], ["0%", "-12%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.94]);

  // Doodle art parallax: drifts up + zooms slightly as you scroll, then fades for vortex
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);

  return (
    <section
      ref={ref}
      className="relative h-[180vh] w-full border-y-2 border-ink bg-ink"
      aria-label="Transition into the menu"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Maximalist doodle backdrop */}
        <motion.div
          aria-hidden
          style={{ y: artY, scale: artScale }}
          className="absolute inset-0 z-0"
        >
          <img
            src={doodleArt}
            alt=""
            className="h-full w-full object-cover"
          />
          {/* Dark vignette behind the headline for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(10,10,20,0.55) 0%, rgba(10,10,20,0.35) 45%, rgba(10,10,20,0.2) 100%)",
            }}
          />
        </motion.div>

        {/* Hero headline overlay — sits on top of the doodle as the opening fold */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="pointer-events-none absolute inset-0 z-30 mx-auto flex max-w-[1400px] flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.4em] text-cream [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
            ✺ The Rockaways' First Legal Dispensary
          </p>
          <h1 className="font-display leading-[0.85] text-cream drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)]">
            <span className="sr-only">Munchies NY</span>
            <span className="block w-full max-w-[900px]">
              <MunchiesSmokeText />
            </span>
            <span className="mt-4 inline-block rounded-md border-2 border-ink bg-magenta px-6 py-2 text-6xl text-cream shadow-[0_8px_24px_rgba(0,0,0,0.6)] md:text-8xl">
              NY
            </span>
          </h1>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-cream [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
            Scroll ↓
          </p>
        </motion.div>

        {/* Caption */}
        <div className="pointer-events-none absolute bottom-12 left-0 right-0 z-30 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-cream [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
            ✺ Scroll into the menu
          </p>
        </div>
      </div>
    </section>
  );
}