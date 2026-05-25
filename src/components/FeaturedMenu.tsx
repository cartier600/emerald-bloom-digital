import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import flowerImg from "@/assets/product-flower.jpg";
import gummiesImg from "@/assets/product-gummies.jpg";
import rosinImg from "@/assets/product-rosin.jpg";
import prerollImg from "@/assets/product-preroll.jpg";

type Product = {
  category: string;
  brand: string;
  name: string;
  size: string;
  type: string;
  thc?: string;
  dosage?: string;
  terps?: string;
  price: string;
  badge: string;
  accent: string;
  image: string;
};

const ITEMS: Product[] = [
  {
    category: "Edibles",
    brand: "Wyld",
    name: "Wyld Boysenberry",
    size: "10ct",
    type: "Gummies",
    dosage: "100mg",
    price: "$28.00",
    badge: "Best Seller",
    accent: "bg-magenta",
    image: gummiesImg,
  },
  {
    category: "Edibles",
    brand: "Camino",
    name: "Camino Midnight Blueberry",
    size: "20ct",
    type: "Sleep · Nighttime",
    dosage: "100mg",
    price: "$32.00",
    badge: "Sleep Aid",
    accent: "bg-cyan-pop",
    image: rosinImg,
  },
  {
    category: "Flower",
    brand: "Find.",
    name: "Find Bottomless Mints",
    size: "3.5g",
    type: "Hybrid Strain",
    thc: "27.40%",
    price: "$50.00",
    badge: "Top Shelf",
    accent: "bg-acid",
    image: flowerImg,
  },
  {
    category: "Flower",
    brand: "Runtz",
    name: "Runtz Amaretto Di Lemon",
    size: "3.5g",
    type: "Premium Sativa",
    thc: "31.20%",
    price: "$65.00",
    badge: "Premium Strain",
    accent: "bg-tangerine",
    image: prerollImg,
  },
];

export function FeaturedMenu() {
  const glowFor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("sativa")) {
      return "radial-gradient(circle at 50% 30%, rgba(255,176,46,0.35), rgba(255,110,30,0.18) 45%, transparent 70%)";
    }
    if (t.includes("indica")) {
      return "radial-gradient(circle at 50% 30%, rgba(150,90,220,0.38), rgba(70,40,140,0.22) 45%, transparent 70%)";
    }
    // hybrid + fallback
    return "radial-gradient(circle at 50% 30%, rgba(110,240,180,0.35), rgba(40,200,140,0.18) 45%, transparent 70%)";
  };
  const laserFor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("sativa")) return "#ffb02e";
    if (t.includes("indica")) return "#9b5cff";
    return "#5cffb0"; // hybrid + fallback
  };
  return (
    <section id="menu" className="bg-cream px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b-2 border-ink pb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-ink/60">
              ✺ Featured Drop
            </p>
            <h2 className="font-display mt-4 text-7xl text-ink md:text-9xl">
              THE
              <br />
              <span className="text-magenta">MENU</span>
            </h2>
          </div>
          <div className="flex gap-2">
            {["All", "Flower", "Edibles", "Concentrates"].map((c, i) => (
              <button
                key={c}
                className={`rounded-full border-2 border-ink px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                  i === 0 ? "bg-ink text-cream" : "text-ink hover:bg-ink hover:text-cream"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: EASE }}
              whileHover={{
                y: -10,
                boxShadow: "0 30px 60px -20px rgba(10,10,20,0.35), 0 12px 24px -12px rgba(255,61,139,0.25)",
                transition: { type: "spring", stiffness: 220, damping: 18 },
              }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-ink bg-cream will-change-transform"
            >
              {/* Ambient hover glow tinted by product type */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
                style={{ background: glowFor(p.type) }}
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              {/* Neon laser border-trace overlay */}
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ filter: `drop-shadow(0 0 6px ${laserFor(p.type)}) drop-shadow(0 0 14px ${laserFor(p.type)})` }}
              >
                <motion.rect
                  x="3"
                  y="3"
                  width="calc(100% - 6px)"
                  height="calc(100% - 6px)"
                  rx="22"
                  ry="22"
                  fill="none"
                  stroke={laserFor(p.type)}
                  strokeWidth={2}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="0.18 0.82"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: [1, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                />
              </svg>
              {/* Badge + Category */}
              <div className="relative flex items-start justify-between gap-2 p-4 pb-0">
                <div className="rounded-full border-2 border-ink bg-magenta px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-ink">
                  {p.badge}
                </div>
                <div className="rounded-full border-2 border-ink bg-cream px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
                  {p.category}
                </div>
              </div>

              {/* Clean product shot placeholder */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-[1] mx-4 mt-3 aspect-square overflow-hidden rounded-2xl border-2 border-ink bg-cream"
              >
                <div className={`absolute left-0 right-0 top-0 h-1.5 ${p.accent}`} />
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute bottom-2 right-2 rounded-full border-2 border-ink bg-cream px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-ink">
                  {p.size}
                </div>
              </motion.div>

              {/* Brand + Title */}
              <div className="relative px-5 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink/50">
                  {p.brand}
                </p>
                <h3 className="font-display mt-1 text-xl leading-tight text-ink md:text-2xl">
                  {p.name}
                </h3>
              </div>

              {/* Metrics row */}
              <div className="relative mx-5 mt-3 flex items-stretch divide-x-2 divide-ink overflow-hidden rounded-xl border-2 border-ink bg-cream">
                {p.thc && (
                  <div className="flex-1 px-3 py-2">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-ink/50">THC</div>
                    <div className="font-display text-base text-ink">{p.thc}</div>
                  </div>
                )}
                {p.dosage && (
                  <div className="flex-1 px-3 py-2">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-ink/50">Dose</div>
                    <div className="font-display text-base text-ink">{p.dosage}</div>
                  </div>
                )}
                {p.terps && (
                  <div className="flex-1 px-3 py-2">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-ink/50">Terps</div>
                    <div className="font-display text-base text-ink">{p.terps}</div>
                  </div>
                )}
                <div className={`flex-1 px-3 py-2 ${p.accent}`}>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-ink/70">Type</div>
                  <div className="font-display text-base text-ink">{p.type}</div>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="relative mt-4 flex items-center justify-between gap-3 border-t-2 border-ink bg-cream p-5">
                <span className="font-display text-3xl text-ink">{p.price}</span>
                <motion.button
                  whileHover={{
                    y: -3,
                    backgroundColor: "rgb(253, 247, 232)",
                    color: "rgb(10, 10, 20)",
                    boxShadow:
                      "0 0 0 2px rgb(10,10,20), 0 0 18px 2px rgba(255,228,40,0.85), 0 14px 30px -10px rgba(10,10,20,0.45)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="rounded-full bg-ink px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-cream"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}