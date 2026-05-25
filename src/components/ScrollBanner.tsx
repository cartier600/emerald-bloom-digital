import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function ScrollBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-cream py-10 md:py-14"
      aria-hidden
    >
      <motion.div
        style={{ x: smoothX }}
        className="whitespace-nowrap font-display text-ink text-[14vw] md:text-[10vw] leading-none tracking-tight select-none"
      >
        ALL WE WEED IS LOVE&nbsp;&nbsp;✺&nbsp;&nbsp;ALL WE WEED IS LOVE&nbsp;&nbsp;✺&nbsp;&nbsp;ALL WE WEED IS LOVE
      </motion.div>
    </div>
  );
}