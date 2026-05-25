import { motion } from "framer-motion";

// Synchronized cartoon micro-animations layered over the doodle hero backdrop.
// All positions are in the doodle's native coordinate system (1402x1122)
// and rendered inside an SVG with preserveAspectRatio="xMidYMid slice" so
// they track the <img className="object-cover"> underneath exactly.

type Props = { className?: string };

export function DoodleMicroAnimations({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 1402 1122"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* ── Hot dog cheeks: blush pulse every 4s ────────────────────── */}
      <motion.ellipse
        cx="1075"
        cy="395"
        rx="14"
        ry="10"
        animate={{
          scaleY: [1, 1.1, 1],
          fill: ["#ff5577", "#ff1744", "#ff5577"],
          opacity: [0.7, 0.95, 0.7],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "1075px 395px" }}
      />
      <motion.ellipse
        cx="1170"
        cy="395"
        rx="14"
        ry="10"
        animate={{
          scaleY: [1, 1.1, 1],
          fill: ["#ff5577", "#ff1744", "#ff5577"],
          opacity: [0.7, 0.95, 0.7],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        style={{ transformOrigin: "1170px 395px" }}
      />

      {/* ── Brain character: subtle "think" rotate + opacity pulse ──── */}
      <motion.g
        animate={{ rotate: [-2.5, 2.5, -2.5], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "1335px 260px" }}
      >
        {/* Soft pink halo to suggest activity */}
        <circle cx="1335" cy="260" r="58" fill="#f472b6" opacity="0.18" />
        <circle cx="1335" cy="260" r="40" fill="#ec4899" opacity="0.12" />
      </motion.g>
      {/* Floating "thought" dots */}
      {[
        { cx: 1290, cy: 195, r: 3, delay: 0 },
        { cx: 1278, cy: 178, r: 2.2, delay: 0.4 },
        { cx: 1266, cy: 162, r: 1.6, delay: 0.8 },
      ].map((d, i) => (
        <motion.circle
          key={`t-${i}`}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill="#ffffff"
          animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}
    </svg>
  );
}