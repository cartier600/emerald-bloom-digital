import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

// Stylized cartoon leaf-mascot wearing a cap. Loops a walk/bounce
// cycle and flips on hover or when scrolled near.
export function MunchiesMascot() {
  const controls = useAnimation();
  const flipping = useRef(false);

  useEffect(() => {
    controls.start({
      y: [0, -22, 0, -8, 0],
      rotate: [-2, 2, -2, 2, -2],
      transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  const flip = async () => {
    if (flipping.current) return;
    flipping.current = true;
    await controls.start({
      y: [-20, -60, 0],
      rotate: [0, 360, 0],
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    });
    flipping.current = false;
    controls.start({
      y: [0, -22, 0, -8, 0],
      rotate: [-2, 2, -2, 2, -2],
      transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
    });
  };

  useEffect(() => {
    const onScroll = () => flip();
    let lastY = window.scrollY;
    const handler = () => {
      if (Math.abs(window.scrollY - lastY) > 120) {
        lastY = window.scrollY;
        onScroll();
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.button
      type="button"
      aria-label="Munchies mascot"
      onHoverStart={flip}
      onClick={flip}
      animate={controls}
      className="pointer-events-auto absolute -right-4 -bottom-8 z-20 block h-40 w-40 md:h-52 md:w-52"
    >
      <svg viewBox="0 0 200 220" className="h-full w-full drop-shadow-[4px_6px_0_rgb(10,10,20)]">
        {/* Leaf body */}
        <path
          d="M100 40 C150 50 180 110 150 170 C125 215 75 215 50 170 C20 110 50 50 100 40 Z"
          fill="oklch(0.78 0.25 145)"
          stroke="rgb(10,10,20)"
          strokeWidth="6"
        />
        {/* Leaf vein */}
        <path d="M100 60 V200" stroke="rgb(10,10,20)" strokeWidth="4" strokeLinecap="round" />
        <path d="M100 90 L75 110 M100 90 L125 110 M100 130 L70 150 M100 130 L130 150" stroke="rgb(10,10,20)" strokeWidth="3" strokeLinecap="round" />
        {/* Cap brim */}
        <path d="M40 75 L165 75 L150 85 L55 85 Z" fill="rgb(255, 79, 154)" stroke="rgb(10,10,20)" strokeWidth="5" />
        {/* Cap crown */}
        <path d="M60 75 C65 35 135 35 140 75 Z" fill="rgb(255, 79, 154)" stroke="rgb(10,10,20)" strokeWidth="5" />
        <circle cx="100" cy="48" r="6" fill="oklch(0.92 0.22 110)" stroke="rgb(10,10,20)" strokeWidth="3" />
        {/* Eyes */}
        <circle cx="85" cy="115" r="9" fill="white" stroke="rgb(10,10,20)" strokeWidth="3" />
        <circle cx="115" cy="115" r="9" fill="white" stroke="rgb(10,10,20)" strokeWidth="3" />
        <circle cx="87" cy="117" r="3.5" fill="rgb(10,10,20)" />
        <circle cx="117" cy="117" r="3.5" fill="rgb(10,10,20)" />
        {/* Smile */}
        <path d="M82 140 Q100 158 118 140" fill="none" stroke="rgb(10,10,20)" strokeWidth="4" strokeLinecap="round" />
        {/* Tongue */}
        <path d="M93 148 Q100 160 107 148 Z" fill="rgb(255, 79, 154)" stroke="rgb(10,10,20)" strokeWidth="2" />
      </svg>
      {/* Shadow puff under feet */}
      <motion.span
        aria-hidden
        animate={{ scaleX: [1, 0.6, 1, 0.8, 1], opacity: [0.6, 0.3, 0.6, 0.4, 0.6] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 left-1/2 block h-2 w-24 -translate-x-1/2 rounded-full bg-ink/60 blur-[2px]"
      />
    </motion.button>
  );
}
