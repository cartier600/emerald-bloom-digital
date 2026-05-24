import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Product = {
  brand: string;
  name: string;
  size: string;
  type: string;
  thc: string;
  terps?: string;
  price: string;
  badge: string;
  badgeColor: string;
  swatch: string;
  accent: string;
};

const ITEMS: Product[] = [
  {
    brand: "Back Home Cannabis Co.",
    name: "Super Lemon Haze Flower",
    size: "3.5g",
    type: "Sativa",
    thc: "24.29%",
    terps: "1.55%",
    price: "$35.00",
    badge: "New Arrival",
    badgeColor: "bg-acid text-ink",
    swatch: "from-acid via-lime to-tangerine",
    accent: "bg-acid",
  },
  {
    brand: "Runtz",
    name: "Original Bubblegum Runtz Flower",
    size: "3.5g",
    type: "Indica-Hybrid",
    thc: "26.90%",
    price: "$60.00",
    badge: "Staff Pick",
    badgeColor: "bg-cyan-pop text-ink",
    swatch: "from-cyan-pop via-magenta to-acid",
    accent: "bg-cyan-pop",
  },
  {
    brand: "Old Pal",
    name: "Blue Sherbet Pre-Ground Flower",
    size: "14g",
    type: "Indica",
    thc: "29.00%",
    price: "$60.00",
    badge: "Top Seller",
    badgeColor: "bg-magenta text-cream",
    swatch: "from-magenta via-cyan-pop to-ink",
    accent: "bg-magenta",
  },
  {
    brand: "REVERT",
    name: "Maui Wowie Kief Infused Flower",
    size: "14g",
    type: "Sativa",
    thc: "31.10%",
    price: "$70.00",
    badge: "High Potency",
    badgeColor: "bg-tangerine text-ink",
    swatch: "from-tangerine via-acid to-magenta",
    accent: "bg-tangerine",
  },
];

export function FeaturedMenu() {
  return (
    <section id="menu" className="bg-cream px-6 py-24 md:px-10 md:py-32">
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

        {/* 2 cols mobile, 3 cols tablet, 4 cols desktop */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
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
              {/* Badge */}
              <div className="flex items-start justify-between gap-2 p-4 pb-0">
                <div className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${p.badgeColor}`}>
                  {p.badge}
                </div>
                <div className="rounded-full border-2 border-ink bg-cream px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
                  {p.type}
                </div>
              </div>

              {/* Stylized product shot placeholder */}
              <div className={`relative mx-4 mt-3 aspect-square overflow-hidden rounded-2xl border-2 border-ink bg-gradient-to-br ${p.swatch}`}>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.85] text-ink/90">
                      {p.name.split(" ")[0].toUpperCase()}
                    </div>
                    <div className="mt-1 text-[10px] font-black uppercase tracking-[0.3em] text-ink/70">
                      {p.size}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 rounded-full border-2 border-ink bg-cream px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-ink">
                  {p.size}
                </div>
              </div>

              {/* Brand + Title */}
              <div className="px-5 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink/50">
                  {p.brand}
                </p>
                <h3 className="font-display mt-1 text-xl leading-tight text-ink md:text-2xl">
                  {p.name}
                </h3>
              </div>

              {/* Metrics row */}
              <div className="mx-5 mt-3 flex items-stretch divide-x-2 divide-ink overflow-hidden rounded-xl border-2 border-ink">
                <div className="flex-1 px-3 py-2">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-ink/50">THC</div>
                  <div className="font-display text-base text-ink">{p.thc}</div>
                </div>
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
              <div className="mt-4 flex items-center justify-between gap-3 border-t-2 border-ink bg-cream p-5">
                <span className="font-display text-3xl text-ink">{p.price}</span>
                <motion.button
                  whileHover={{ y: -3, boxShadow: "0 14px 30px -10px rgba(10,10,20,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="rounded-full bg-ink px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-cream hover:bg-magenta"
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