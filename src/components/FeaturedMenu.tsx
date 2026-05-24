import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import flower from "@/assets/product-flower.jpg";
import edibles from "@/assets/product-edibles.jpg";
import concentrates from "@/assets/product-concentrates.jpg";

const ITEMS = [
  {
    img: flower,
    name: "Pink Runtz Pre-Rolls",
    cat: "Flower",
    badge: "NEW",
    badgeColor: "bg-magenta text-cream",
    price: "$42",
    unit: "5-pack",
    thc: "24% THC",
  },
  {
    img: edibles,
    name: "Rainbow Sour Gummies",
    cat: "Edibles",
    badge: "BEST SELLER",
    badgeColor: "bg-cyan-pop text-ink",
    price: "$28",
    unit: "10ct · 100mg",
    thc: "10mg ea",
  },
  {
    img: concentrates,
    name: "Tangie Live Rosin",
    cat: "Concentrates",
    badge: "LIMITED",
    badgeColor: "bg-tangerine text-ink",
    price: "$65",
    unit: "1g jar",
    thc: "82% THC",
  },
  {
    img: flower,
    name: "Wedding Cake Eighth",
    cat: "Flower",
    badge: "ON SALE",
    badgeColor: "bg-acid text-ink",
    price: "$38",
    unit: "3.5g",
    thc: "26% THC",
  },
  {
    img: edibles,
    name: "Dark Chocolate Bites",
    cat: "Edibles",
    badge: "VEGAN",
    badgeColor: "bg-lime text-ink",
    price: "$32",
    unit: "12ct · 120mg",
    thc: "10mg ea",
  },
  {
    img: concentrates,
    name: "GMO Badder",
    cat: "Concentrates",
    badge: "STAFF PICK",
    badgeColor: "bg-magenta text-cream",
    price: "$58",
    unit: "1g jar",
    thc: "78% THC",
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
              className="group relative overflow-hidden rounded-3xl border-2 border-ink bg-cream will-change-transform"
            >
              <div className="relative aspect-square overflow-hidden bg-ink/5">
                <img
                  src={p.img}
                  alt={p.name}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${p.badgeColor}`}>
                  {p.badge}
                </div>
                <div className="absolute right-4 top-4 rounded-full border-2 border-ink bg-cream px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-ink">
                  {p.thc}
                </div>
              </div>
              <div className="flex items-end justify-between gap-4 border-t-2 border-ink p-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink/50">
                    {p.cat}
                  </p>
                  <h3 className="font-display mt-1 text-2xl text-ink">{p.name}</h3>
                  <p className="mt-1 text-xs text-ink/60">{p.unit}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-display text-3xl text-ink">{p.price}</span>
                  <button className="mt-2 grid h-10 w-10 place-items-center rounded-full bg-ink text-cream transition-transform hover:scale-110 hover:bg-magenta">
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}