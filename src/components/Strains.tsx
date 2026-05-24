import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { EASE } from "@/lib/motion";
import sativa from "@/assets/strain-sativa.jpg";
import indica from "@/assets/strain-indica.jpg";
import hybrid from "@/assets/strain-hybrid.jpg";

// Resolved hex equivalents of the oklch brand tokens so framer-motion
// can interpolate them smoothly with useTransform.
const COLORS = {
  acid: "#d6f23a",
  ink: "#0a0a14",
  cream: "#f7f1e3",
  violetDeep: "#2a1559",
  lime: "#6fe26a",
  magenta: "#ff3d8b",
};

const STRAINS = [
  {
    id: "sativa",
    name: "SATIVA",
    tag: "Daytime Energy",
    copy: "Cerebral, uplifting, creative. The morning espresso of cannabis. Think bright mornings, long walks, the hum of a good idea taking shape.",
    image: sativa,
    feel: ["Energetic", "Focus", "Creative"],
    bg: COLORS.acid,
    text: COLORS.ink,
    accent: COLORS.magenta,
  },
  {
    id: "indica",
    name: "INDICA",
    tag: "Midnight Calm",
    copy: "Heavy, deep, sedating. For couch-locks and dream chasers. The kind of quiet that wraps around your shoulders and slows the whole room down.",
    image: indica,
    feel: ["Relax", "Sleep", "Body"],
    bg: COLORS.violetDeep,
    text: COLORS.cream,
    accent: COLORS.acid,
  },
  {
    id: "hybrid",
    name: "HYBRID",
    tag: "Best of Both",
    copy: "Balanced, versatile, dialed. The sweet spot between sky and earth. Built for whatever your day decides to throw at you next.",
    image: hybrid,
    feel: ["Balance", "Mood", "Flow"],
    bg: COLORS.lime,
    text: COLORS.ink,
    accent: COLORS.violetDeep,
  },
];

function Panel({
  strain,
  index,
  progress,
}: {
  strain: (typeof STRAINS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // Each panel takes 1/3 of the scroll. Fade in/out across its window.
  const start = index / STRAINS.length;
  const end = (index + 1) / STRAINS.length;
  const mid = (start + end) / 2;

  const opacity = useTransform(progress, [start, mid, end], [0.15, 1, 0.15]);
  const y = useTransform(progress, [start, end], [60, -60]);
  const scale = useTransform(progress, [start, mid, end], [0.96, 1, 0.96]);

  return (
    <motion.div
      style={{ opacity, y, scale, color: strain.text }}
      className="absolute inset-0 flex items-center px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 md:grid-cols-2">
        <motion.div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2"
          style={{ borderColor: strain.text }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <img
            src={strain.image}
            alt={`${strain.name} cannabis`}
            width={1024}
            height={1280}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute left-4 top-4 rounded-full border-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest"
            style={{ borderColor: strain.text, color: strain.text }}
          >
            0{index + 1} · {strain.tag}
          </div>
        </motion.div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-70">
            ✺ Now showing
          </p>
          <h3 className="font-display mt-4 text-7xl md:text-8xl lg:text-[10rem]">
            {strain.name}
          </h3>
          <p className="mt-6 max-w-md text-lg opacity-85 md:text-xl">{strain.copy}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {strain.feel.map((f) => (
              <span
                key={f}
                className="rounded-full border-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{ borderColor: strain.text }}
              >
                {f}
              </span>
            ))}
          </div>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#menu"
            className="font-display mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-base"
            style={{ background: strain.text, color: strain.bg }}
          >
            EXPLORE {strain.name}
            <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: strain.accent, color: strain.text }}>
              →
            </span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export function Strains() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smoothly morph the background through all three strain themes
  const background = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [STRAINS[0].bg, STRAINS[0].bg, STRAINS[1].bg, STRAINS[2].bg],
  );
  const headerColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [STRAINS[0].text, STRAINS[0].text, STRAINS[1].text, STRAINS[2].text],
  );

  return (
    <section id="strains" ref={ref} className="relative" style={{ height: "320vh" }}>
      <motion.div
        style={{ background, color: headerColor }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Sticky header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex items-start justify-between px-6 pt-10 md:px-10"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-70">
              ✺ Strains World
            </p>
            <h2 className="font-display mt-2 text-3xl md:text-5xl">FIND YOUR FREQUENCY</h2>
          </div>
          <div className="hidden gap-2 md:flex">
            {STRAINS.map((s, i) => (
              <DotIndicator key={s.id} progress={scrollYProgress} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Panels stack in same space; opacity driven by scroll */}
        <div className="relative h-full w-full">
          {STRAINS.map((s, i) => (
            <Panel key={s.id} strain={s} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function DotIndicator({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const start = index / STRAINS.length;
  const end = (index + 1) / STRAINS.length;
  const mid = (start + end) / 2;
  const scale = useTransform(progress, [start, mid, end], [1, 2.4, 1]);
  const opacity = useTransform(progress, [start, mid, end], [0.4, 1, 0.4]);
  return (
    <motion.span
      style={{ scale, opacity, background: "currentColor" }}
      className="block h-2 w-2 rounded-full"
    />
  );
}