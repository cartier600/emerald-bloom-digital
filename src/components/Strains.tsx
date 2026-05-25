import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { EASE } from "@/lib/motion";
import sativa from "@/assets/strain-sativa.jpg";
import indica from "@/assets/strain-indica.jpg";
import hybrid from "@/assets/strain-hybrid.jpg";

const STRAINS = [
  {
    id: "sativa",
    name: "SATIVA",
    num: "01",
    tag: "Daytime Energy",
    copy: "Cerebral, uplifting, creative. The morning espresso of cannabis.",
    image: sativa,
    feel: ["Energetic", "Focus", "Creative"],
    bg: "bg-neon-yellow",
    text: "text-ink",
    border: "border-ink",
    accent: "bg-ink text-neon-yellow",
    world: "sativa" as const,
  },
  {
    id: "hybrid",
    name: "HYBRID",
    num: "02",
    tag: "Best of Both",
    copy: "Balanced, versatile, dialed. The sweet spot between sky and earth.",
    image: hybrid,
    feel: ["Balance", "Mood", "Flow"],
    bg: "bg-mint",
    text: "text-ink",
    border: "border-ink",
    accent: "bg-ink text-lime",
    world: "hybrid" as const,
  },
  {
    id: "indica",
    name: "INDICA",
    num: "03",
    tag: "Midnight Calm",
    copy: "Heavy, deep, sedating. For couch-locks and dream chasers.",
    image: indica,
    feel: ["Relax", "Sleep", "Body"],
    bg: "bg-indigo-deep",
    text: "text-cream",
    border: "border-cream",
    accent: "bg-ultraviolet text-cream",
    world: "indica" as const,
  },
];

/* ---------------- Parallax backdrops ---------------- */

function SativaBackdrop({ progress }: { progress: MotionValue<number> }) {
  const yDrift = useTransform(progress, [0, 1], ["0%", "-22%"]);
  const sunScale = useTransform(progress, [0, 1], [1, 1.35]);
  const sunRot = useTransform(progress, [0, 1], [0, 60]);
  const palmY = useTransform(progress, [0, 1], ["8%", "-12%"]);
  const palmRot = useTransform(progress, [0, 1], [-4, 6]);
  const burstRot = useTransform(progress, [0, 1], [0, -45]);
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      style={{ y: yDrift }}
    >
      {/* Sun rays */}
      <motion.g style={{ rotate: sunRot, scale: sunScale, originX: "50%", originY: "18%" }}>
        <circle cx="200" cy="110" r="42" fill="#f59e0b" opacity="0.85" />
        {Array.from({ length: 16 }).map((_, i) => (
          <rect
            key={i}
            x="198"
            y="20"
            width="4"
            height="60"
            fill="#f59e0b"
            opacity="0.6"
            transform={`rotate(${(i * 360) / 16} 200 110)`}
          />
        ))}
      </motion.g>
      {/* Starbursts */}
      <motion.g style={{ rotate: burstRot, originX: "20%", originY: "70%" }}>
        <g transform="translate(80 420)">
          {Array.from({ length: 8 }).map((_, i) => (
            <polygon
              key={i}
              points="0,-30 6,-6 30,0 6,6 0,30 -6,6 -30,0 -6,-6"
              fill="#fb923c"
              opacity="0.5"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>
      </motion.g>
      <g transform="translate(330 200)" opacity="0.45">
        {Array.from({ length: 6 }).map((_, i) => (
          <polygon
            key={i}
            points="0,-18 4,-4 18,0 4,4 0,18 -4,4 -18,0 -4,-4"
            fill="#d97706"
            transform={`rotate(${i * 30})`}
          />
        ))}
      </g>
      {/* Palm tree doodle */}
      <motion.g style={{ y: palmY, rotate: palmRot, originX: "75%", originY: "100%" }}>
        <g transform="translate(300 560)">
          <path d="M0 0 Q -4 -80 -2 -160" stroke="#92400e" strokeWidth="6" fill="none" strokeLinecap="round" />
          {[-60, -30, 0, 30, 60, 90].map((a, i) => (
            <path
              key={i}
              d={`M-2 -160 Q ${Math.cos((a * Math.PI) / 180) * 40} ${-160 + Math.sin((a * Math.PI) / 180) * 40} ${Math.cos((a * Math.PI) / 180) * 80} ${-160 + Math.sin((a * Math.PI) / 180) * 30}`}
              stroke="#b45309"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />
          ))}
        </g>
      </motion.g>
    </motion.svg>
  );
}

function HybridBackdrop({ progress }: { progress: MotionValue<number> }) {
  const yDrift = useTransform(progress, [0, 1], ["0%", "-18%"]);
  const flowerRot = useTransform(progress, [0, 1], [0, 90]);
  const flowerScale = useTransform(progress, [0, 1], [0.85, 1.15]);
  const squiggleX = useTransform(progress, [0, 1], ["-5%", "8%"]);
  const leafRot = useTransform(progress, [0, 1], [-8, 14]);
  const smallFlowerRot = useTransform(progress, [0, 1], [0, -120]);
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      style={{ y: yDrift }}
    >
      {/* Big bloom */}
      <motion.g style={{ rotate: flowerRot, scale: flowerScale, originX: "30%", originY: "30%" }}>
        <g transform="translate(120 180)">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-32"
              rx="18"
              ry="34"
              fill="#16a34a"
              opacity="0.55"
              transform={`rotate(${i * 45})`}
            />
          ))}
          <circle r="14" fill="#84cc16" />
        </g>
      </motion.g>
      {/* Small bloom */}
      <motion.g style={{ rotate: smallFlowerRot, originX: "78%", originY: "75%" }}>
        <g transform="translate(310 450)">
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-20"
              rx="11"
              ry="22"
              fill="#22c55e"
              opacity="0.5"
              transform={`rotate(${i * 60})`}
            />
          ))}
          <circle r="9" fill="#bef264" />
        </g>
      </motion.g>
      {/* Squiggles */}
      <motion.g style={{ x: squiggleX }} opacity="0.55">
        <path
          d="M 20 320 Q 60 290 100 320 T 180 320 T 260 320 T 340 320"
          stroke="#15803d"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 0 520 Q 50 490 100 520 T 200 520 T 300 520 T 400 520"
          stroke="#65a30d"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </motion.g>
      {/* Leaves */}
      <motion.g style={{ rotate: leafRot, originX: "85%", originY: "20%" }}>
        <g transform="translate(340 110)">
          <path d="M0 0 Q 20 -25 0 -50 Q -20 -25 0 0 Z" fill="#16a34a" opacity="0.7" />
          <path d="M0 0 L 0 -50" stroke="#14532d" strokeWidth="2" />
        </g>
        <g transform="translate(60 90) rotate(35)">
          <path d="M0 0 Q 16 -20 0 -40 Q -16 -20 0 0 Z" fill="#65a30d" opacity="0.65" />
        </g>
      </motion.g>
    </motion.svg>
  );
}

function IndicaBackdrop({ progress }: { progress: MotionValue<number> }) {
  const waveY = useTransform(progress, [0, 1], ["0%", "12%"]);
  const starsY = useTransform(progress, [0, 1], ["-5%", "20%"]);
  const cloudX = useTransform(progress, [0, 1], ["-8%", "10%"]);
  const cloud2X = useTransform(progress, [0, 1], ["10%", "-6%"]);
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {/* Stars */}
      <motion.g style={{ y: starsY }} opacity="0.85">
        {[
          [50, 60], [120, 110], [200, 50], [280, 130], [340, 70],
          [80, 180], [240, 200], [320, 220], [60, 260], [180, 280],
          [300, 300], [40, 340], [150, 360],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path
              d="M0 -5 L 1.5 -1.5 L 5 0 L 1.5 1.5 L 0 5 L -1.5 1.5 L -5 0 L -1.5 -1.5 Z"
              fill="#c4b5fd"
            />
          </g>
        ))}
        {[[100, 90], [260, 160], [340, 280]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#e9d5ff" />
        ))}
      </motion.g>
      {/* Clouds */}
      <motion.g style={{ x: cloudX }} opacity="0.4">
        <g transform="translate(60 200)">
          <ellipse cx="0" cy="0" rx="40" ry="14" fill="#a78bfa" />
          <ellipse cx="-20" cy="-8" rx="22" ry="14" fill="#a78bfa" />
          <ellipse cx="18" cy="-6" rx="26" ry="16" fill="#a78bfa" />
        </g>
      </motion.g>
      <motion.g style={{ x: cloud2X }} opacity="0.35">
        <g transform="translate(290 340)">
          <ellipse cx="0" cy="0" rx="50" ry="16" fill="#7c3aed" />
          <ellipse cx="-24" cy="-10" rx="26" ry="16" fill="#7c3aed" />
          <ellipse cx="22" cy="-8" rx="30" ry="18" fill="#7c3aed" />
        </g>
      </motion.g>
      {/* Waves */}
      <motion.g style={{ y: waveY }}>
        <path
          d="M 0 450 Q 50 420 100 450 T 200 450 T 300 450 T 400 450 L 400 600 L 0 600 Z"
          fill="#4c1d95"
          opacity="0.55"
        />
        <path
          d="M 0 490 Q 50 460 100 490 T 200 490 T 300 490 T 400 490 L 400 600 L 0 600 Z"
          fill="#6d28d9"
          opacity="0.55"
        />
        <path
          d="M 0 540 Q 50 510 100 540 T 200 540 T 300 540 T 400 540 L 400 600 L 0 600 Z"
          fill="#8b5cf6"
          opacity="0.55"
        />
      </motion.g>
    </motion.svg>
  );
}

const BACKDROPS = {
  sativa: SativaBackdrop,
  hybrid: HybridBackdrop,
  indica: IndicaBackdrop,
} as const;

export function Strains() {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} id="strains" className="relative w-full overflow-hidden">
      {/* Section header */}
      <div className="bg-cream px-6 pt-24 pb-10 md:px-10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-ink/60">
              ✺ Strains World
            </p>
            <h2 className="font-display mt-3 text-5xl text-ink md:text-7xl lg:text-8xl">
              FIND YOUR FREQUENCY
            </h2>
          </div>
          <p className="max-w-md text-ink/70">
            Hover or tap a column. Each one expands to give you a closer look at
            what it does.
          </p>
        </div>
      </div>

      {/* 3-column flex grow on desktop, stacked on mobile.
          On mobile each panel is 33vh tall, total 100vh. */}
      <div
        className="flex h-screen min-h-[640px] w-full flex-col md:flex-row"
        onMouseLeave={() => setActive(null)}
      >
        {STRAINS.map((s, i) => {
          const isActive = active === i;
          const anyActive = active !== null;
          const Backdrop = BACKDROPS[s.world];
          return (
            <motion.button
              key={s.id}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(isActive ? null : i)}
              animate={{
                flex: isActive ? 2 : anyActive ? 0.75 : 1,
              }}
              transition={{ duration: 0.7, ease: EASE }}
              className={`group relative flex h-full w-full flex-col justify-between overflow-hidden border-ink p-6 text-left md:p-10 ${s.bg} ${s.text} ${
                i < STRAINS.length - 1 ? "border-b-2 md:border-b-0 md:border-r-2" : ""
              }`}
              style={{ flex: 1 }}
            >
              {/* Parallax illustrated backdrop */}
              <div className="pointer-events-none absolute inset-0 z-0">
                <Backdrop progress={scrollYProgress} />
              </div>

              {/* Top row: number + tag */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-display text-5xl md:text-6xl">{s.num}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-80">
                  {s.tag}
                </span>
              </div>

              {/* Image container — visible when active, fades to peek otherwise */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0.35, scale: isActive ? 1 : 0.95 }}
                transition={{ duration: 0.6, ease: EASE }}
                className={`relative z-10 mx-auto my-6 aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border-2 ${s.border}`}
              >
                <img
                  src={s.image}
                  alt={`${s.name} strain`}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {/* Bottom: name + reveal copy */}
              <div className="relative z-10">
                <h3 className="font-display text-5xl leading-none md:text-7xl lg:text-8xl">
                  {s.name}
                </h3>
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0, height: isActive ? "auto" : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 max-w-md text-base opacity-85">{s.copy}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.feel.map((f) => (
                      <span
                        key={f}
                        className={`rounded-full border-2 ${s.border} px-3 py-1 text-[10px] font-bold uppercase tracking-widest`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest ${s.accent}`}
                  >
                    Explore {s.name} →
                  </span>
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}