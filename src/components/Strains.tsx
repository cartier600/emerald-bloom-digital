import { useState } from "react";
import { motion } from "framer-motion";
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
  },
];

export function Strains() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="strains" className="relative w-full overflow-hidden">
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