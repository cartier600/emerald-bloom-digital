import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sativa from "@/assets/strain-sativa.jpg";
import indica from "@/assets/strain-indica.jpg";
import hybrid from "@/assets/strain-hybrid.jpg";

const STRAINS = [
  {
    id: "sativa",
    name: "SATIVA",
    tag: "Daytime Energy",
    copy: "Cerebral, uplifting, creative. The morning espresso of cannabis.",
    bg: "var(--acid)",
    text: "var(--ink)",
    accent: "var(--magenta)",
    image: sativa,
    feel: ["Energetic", "Focus", "Creative"],
  },
  {
    id: "indica",
    name: "INDICA",
    tag: "Midnight Calm",
    copy: "Heavy, deep, sedating. For couch-locks and dream chasers.",
    bg: "var(--violet-deep)",
    text: "var(--cream)",
    accent: "var(--acid)",
    image: indica,
    feel: ["Relax", "Sleep", "Body"],
  },
  {
    id: "hybrid",
    name: "HYBRID",
    tag: "Best of Both",
    copy: "Balanced, versatile, dialed. The sweet spot between sky and earth.",
    bg: "var(--lime)",
    text: "var(--ink)",
    accent: "var(--violet-deep)",
    image: hybrid,
    feel: ["Balance", "Mood", "Flow"],
  },
];

export function Strains() {
  const [active, setActive] = useState(0);
  const s = STRAINS[active];

  return (
    <section id="strains" className="relative overflow-hidden">
      <motion.div
        key={s.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ background: s.bg, color: s.text }}
        className="relative min-h-screen px-6 py-24 transition-colors md:px-10"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-70">
                ✺ Strains World
              </p>
              <h2 className="font-display mt-4 text-6xl md:text-8xl">
                FIND YOUR
                <br />
                <span style={{ color: s.accent }}>FREQUENCY</span>
              </h2>
            </div>
            <p className="max-w-md text-lg opacity-80">
              Hover or tap a category. The world shifts with the mood — that's how
              we built this place.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STRAINS.map((strain, i) => (
              <button
                key={strain.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden rounded-3xl border-2 p-6 text-left transition-all duration-500 ${
                  active === i ? "scale-[1.02]" : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  borderColor: s.text,
                  background: active === i ? s.accent : "transparent",
                  color: active === i ? s.bg : s.text,
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-7xl md:text-6xl lg:text-7xl">
                    0{i + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {strain.tag}
                  </span>
                </div>
                <div className="mt-12 font-display text-4xl md:text-3xl lg:text-5xl">
                  {strain.name}
                </div>
                <p className="mt-3 max-w-xs text-sm opacity-80">{strain.copy}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {strain.feel.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-current px-3 py-1 text-xs font-semibold uppercase"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-end text-2xl transition-transform group-hover:translate-x-2">
                  →
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={s.id + "-preview"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-16 grid grid-cols-1 items-center gap-10 md:grid-cols-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2" style={{ borderColor: s.text }}>
                <img
                  src={s.image}
                  alt={`${s.name} cannabis`}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-display text-2xl opacity-60">NOW SHOWING</p>
                <h3 className="font-display mt-2 text-7xl md:text-8xl lg:text-9xl">
                  {s.name}
                </h3>
                <p className="mt-6 max-w-md text-xl opacity-80">{s.copy}</p>
                <a
                  href="#menu"
                  className="font-display mt-8 inline-flex items-center gap-3 rounded-full px-7 py-4 text-base"
                  style={{ background: s.text, color: s.bg }}
                >
                  EXPLORE {s.name} →
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}