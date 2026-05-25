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
      {/* ── Pineapple sunglasses: head-bob 0.8s ─────────────────────── */}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "170px 235px" }}
      >
        {/* Left lens */}
        <ellipse cx="135" cy="240" rx="28" ry="20" fill="#22d3ee" stroke="#0a0a0a" strokeWidth="4" />
        {/* Right lens */}
        <ellipse cx="205" cy="240" rx="28" ry="20" fill="#22d3ee" stroke="#0a0a0a" strokeWidth="4" />
        {/* Bridge */}
        <rect x="160" y="234" width="20" height="6" fill="#0a0a0a" />
        {/* Shine highlights */}
        <ellipse cx="125" cy="232" rx="6" ry="3" fill="#ffffff" opacity="0.85" />
        <ellipse cx="195" cy="232" rx="6" ry="3" fill="#ffffff" opacity="0.85" />
      </motion.g>

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

      {/* ── Cloud near rainbow: staggered rain droplets ─────────────── */}
      {[
        { x: 510, delay: 0, dur: 2.4 },
        { x: 545, delay: 0.6, dur: 2.9 },
        { x: 580, delay: 0.3, dur: 2.1 },
        { x: 615, delay: 0.9, dur: 3.2 },
        { x: 470, delay: 1.2, dur: 2.6 },
      ].map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={180}
          r="3.5"
          fill="#ffffff"
          animate={{ y: [-10, 90], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: d.dur,
            repeat: Infinity,
            ease: "easeIn",
            delay: d.delay,
            times: [0, 0.15, 0.85, 1],
          }}
        />
      ))}
      {/* Sparkle trails */}
      {[
        { x: 495, delay: 0.4 },
        { x: 600, delay: 1.4 },
      ].map((s, i) => (
        <motion.circle
          key={`s-${i}`}
          cx={s.x}
          cy={185}
          r="2"
          fill="#fef9c3"
          animate={{ y: [-5, 70], opacity: [0, 1, 0], scale: [0.6, 1, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeIn", delay: s.delay }}
        />
      ))}

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