import { motion } from "framer-motion";
import gummies from "@/assets/product-gummies.jpg";
import flower from "@/assets/product-flower.jpg";
import { EASE } from "@/lib/motion";

type Product = {
  name: string;
  brand: string;
  category: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  thc: string;
  price: string;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Wyld Boysenberry Gummies",
    brand: "Wyld",
    category: "Gummies / Indica",
    badge: "Indica Enhanced",
    badgeBg: "bg-magenta",
    badgeText: "text-cream",
    thc: "100mg THC",
    price: "$28",
    image: gummies,
  },
  {
    name: "Camino Midnight Blueberry",
    brand: "Camino",
    category: "Gummies / Sleep",
    badge: "Tranquil",
    badgeBg: "bg-forest",
    badgeText: "text-cream",
    thc: "300mg THC",
    price: "$32",
    image: gummies,
  },
  {
    name: "Find. Bottomless Mints",
    brand: "Find.",
    category: "Flower / Strain",
    badge: "Everyday",
    badgeBg: "bg-athletic",
    badgeText: "text-ink",
    thc: "22% THC",
    price: "$45/8th",
    image: flower,
  },
  {
    name: "Runtz Amaretto Di Lemon",
    brand: "Runtz",
    category: "Flower / Hybrid",
    badge: "Premium",
    badgeBg: "bg-neon-yellow",
    badgeText: "text-ink",
    thc: "28% THC",
    price: "$60/8th",
    image: flower,
  },
];

export function BestSellers() {
  return (
    <section
      id="best-sellers"
      className="relative overflow-hidden bg-forest py-32 md:py-40 my-16 md:my-20 text-cream"
    >
      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 flex flex-col items-start gap-4 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-athletic">
              Floating off the shelves
            </p>
            <h2 className="font-display mt-3 text-[clamp(3rem,9vw,8rem)] leading-[0.85] text-cream">
              BEST <span className="text-neon-yellow">SELLERS</span>
            </h2>
          </div>
          <p className="max-w-sm text-base text-cream/80 md:text-lg">
            Four picks our regulars keep coming back for. Fresh-stocked weekly.
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PRODUCTS.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col rounded-[1.75rem] border-2 border-ink bg-[#FDFBF7] p-4 text-ink shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-shadow hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)]"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-[1.25rem] border-2 border-ink bg-cream">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full border-2 border-ink ${p.badgeBg} ${p.badgeText} px-3 py-1 text-[10px] font-bold uppercase tracking-widest`}
                >
                  {p.badge}
                </span>
              </div>

              {/* Body */}
              <div className="mt-4 flex flex-1 flex-col">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink/60">
                  {p.category}
                </p>
                <h3 className="font-display mt-2 text-2xl leading-tight text-ink">
                  {p.name}
                </h3>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="rounded-md border-2 border-ink bg-cream px-2.5 py-1 font-bold">
                    {p.thc}
                  </span>
                  <span className="font-display text-xl">{p.price}</span>
                </div>

                {/* Buy Now */}
                <button
                  type="button"
                  className="font-display mt-5 flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-ink py-3 text-sm uppercase tracking-widest text-cream transition-colors hover:bg-athletic hover:text-ink"
                >
                  Buy Now
                  <span aria-hidden>→</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}