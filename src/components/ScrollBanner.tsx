import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";

export function ScrollBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Velocity-driven bob + scale; snaps back to rest when scrolling stops.
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, {
    stiffness: 160,
    damping: 28,
    mass: 0.5,
  });

  const y = useTransform(smoothVelocity, [-1500, 0, 1500], [-18, 0, 18]);
  const rawScale = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    [0.95, 1, 1.05],
  );
  const scale = useSpring(rawScale, { stiffness: 200, damping: 22, mass: 0.4 });

  // Subtle entrance fade as the banner enters the viewport.
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4],
  );

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-cream py-16 md:py-24"
    >
      <motion.h2
        style={{ y, scale, opacity }}
        className="text-center font-display text-ink leading-none tracking-tight select-none text-[12vw] md:text-[8vw]"
      >
        ALL WE WEED IS LOVE
      </motion.h2>
    </div>
  );
}