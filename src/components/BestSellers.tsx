import { motion } from "framer-motion";
import { useRef } from "react";
import doodleArt from "@/assets/munchies-doodle-art.png";
import flowerJar from "@/assets/bestseller-flower-jar.png";
import concentrate from "@/assets/bestseller-concentrate.png";
import preroll from "@/assets/bestseller-preroll.png";
import { EASE } from "@/lib/motion";

type Item = {
  img: string;
  name: string;
  thc: string;
  category: string;
  accent: string; // tailwind bg class
  textOn: string; // tailwind text class for accent
  fromLeft: boolean;
  bobDur: number;
  bobDelay: number;
};

const items: Item[] = [
  {
    img: flowerJar,
    name: "Wedding Cake",
    thc: "26% THC",
    category: "Signature Flower",
    accent: "bg-neon-yellow",
    textOn: "text-ink",
    fromLeft: true,
    bobDur: 5,
    bobDelay: 0,
  },
  {
    img: concentrate,
    name: "Papaya Live Rosin",
    thc: "82% THC",
    category: "Concentrate",
    accent: "bg-magenta",
    textOn: "text-cream",
    fromLeft: false,
    bobDur: 5.6,
    bobDelay: 0.4,
  },
  {
    img: preroll,
    name: "Sunset Sherbet 5-Pack",
    thc: "24% THC",
    category: "Pre-Roll Pack",
    accent: "bg-athletic",
    textOn: "text-ink",
    fromLeft: true,
    bobDur: 6.2,
    bobDelay: 0.8,
  },
];

function BestSellerRow({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const dir = item.fromLeft ? -120 : 120;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center gap-6 md:gap-10 ${
        item.fromLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* MIDDLE LAYER — product hero shot */}
      <motion.div
        initial={{ opacity: 0, x: dir, scale: 0.7 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative w-full max-w-[480px] md:w-[48%] md:max-w-none"
      >
        <motion.img
          src={item.img}
          alt={item.name}
          width={1024}
          height={1024}
          loading="lazy"
          animate={{ y: [-6, 6, -6] }}
          transition={{
            duration: item.bobDur,
            delay: item.bobDelay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 mx-auto h-auto w-full max-w-[520px] select-none drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]"
          style={{ filter: "drop-shadow(0 0 60px rgba(255,255,200,0.15))" }}
        />
        {/* glowing halo behind product */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-0 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, #fde047 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* FOREGROUND LAYER — text details */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className={`relative z-20 w-full md:w-[52%] ${
          item.fromLeft ? "md:-ml-16 md:text-left" : "md:-mr-16 md:text-right"
        }`}
      >
        <div
          className={`inline-flex items-center gap-2 rounded-full border-2 border-ink ${item.accent} ${item.textOn} px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em]`}
        >
          <span>✺</span> Best Seller #{index + 1}
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-cream/70">
          {item.category}
        </p>
        <h3
          className="font-display mt-2 leading-[0.85] text-cream"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.7)" }}
        >
          <span className="block text-[clamp(3rem,8vw,7rem)]">{item.name}</span>
        </h3>
        <div
          className={`mt-4 inline-block rounded-md border-2 border-ink bg-cream px-4 py-2 font-display text-3xl text-ink md:text-4xl`}
        >
          {item.thc}
        </div>
        <p className="mt-5 max-w-md text-cream/85 md:text-lg" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>
          {index === 0 && "Top-shelf indoor flower. Frosty, dense, and packed with terps."}
          {index === 1 && "Solventless live rosin pressed from fresh-frozen flower. Pure terps, full melt."}
          {index === 2 && "Five perfectly packed pre-rolls. Convenience meets connoisseur quality."}
        </p>
      </motion.div>
    </div>
  );
}

export function BestSellers() {
  return (
    <section
      id="best-sellers"
      className="relative overflow-hidden bg-forest py-24 md:py-32 text-cream"
    >
      {/* BACKGROUND LAYER — doodle art continuing under the section */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <img
          src={doodleArt}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,30,20,0.55) 0%, rgba(10,30,20,0.7) 70%, rgba(10,30,20,0.85) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 flex flex-col items-start gap-4 md:mb-24 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-athletic">
              Floating off the shelves
            </p>
            <h2
              className="font-display mt-3 text-[clamp(3rem,9vw,8rem)] leading-[0.85] text-cream"
              style={{ textShadow: "0 6px 30px rgba(0,0,0,0.6)" }}
            >
              BEST <span className="text-neon-yellow">SELLERS</span>
            </h2>
          </div>
          <p className="max-w-sm text-base text-cream/80 md:text-lg">
            The three jars, dabs and packs our regulars keep coming back for. Fresh-stocked weekly.
          </p>
        </motion.div>

        {/* Product showcase rows */}
        <div className="flex flex-col gap-28 md:gap-40">
          {items.map((it, i) => (
            <BestSellerRow key={it.name} item={it} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}