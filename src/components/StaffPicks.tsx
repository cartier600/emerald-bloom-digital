import { motion } from "framer-motion";
import appleZen from "@/assets/product-apple-zen.jpg";
import nyCheddar from "@/assets/product-ny-cheddar.jpg";
import strawberryBliss from "@/assets/product-strawberry-bliss.jpg";
import permanentMarker from "@/assets/product-permanent-marker.jpg";
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
  details: string;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Apple Zen Gummies",
    brand: "MUNCHIES",
    category: "Edible / Gummies",
    badge: "Hybrid",
    badgeBg: "bg-mint",
    badgeText: "text-ink",
    thc: "100mg THC (10mg per gummy)",
    price: "$28.00",
    details: "Crisp green apple flavor with a smooth orchard chill.",
    image: appleZen,
  },
  {
    name: "New York Cheddar Flower",
    brand: "Premium",
    category: "Flower / Indica",
    badge: "Indica",
    badgeBg: "bg-athletic",
    badgeText: "text-ink",
    thc: "29.93% THC (28g Bulk)",
    price: "$165.00",
    details: "Cheesy, savory, pungent aroma with deep physical relaxation.",
    image: nyCheddar,
  },
  {
    name: "Strawberry Bliss Gummies",
    brand: "MUNCHIES",
    category: "Edible / Gummies",
    badge: "Hybrid",
    badgeBg: "bg-magenta",
    badgeText: "text-cream",
    thc: "100mg THC",
    price: "$28.00",
    details: "Classic sweet strawberry flavor crafted for an everyday vibe.",
    image: strawberryBliss,
  },
  {
    name: "Permanent Marker Flower",
    brand: "5 Boro",
    category: "Flower / Indica-Hybrid",
    badge: "Indica-Hybrid",
    badgeBg: "bg-violet-deep",
    badgeText: "text-cream",
    thc: "28% THC (0.7g Dime Bag)",
    price: "$9.00",
    details: "Sweet fruity candy profile with a sharp diesel finish.",
    image: permanentMarker,
  },
];

export function StaffPicks() {
  return (
    <section
      id="staff-picks"
      className="relative overflow-hidden bg-cream py-32 md:py-40 my-16 md:my-20 text-ink"
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
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-forest">
              Curated by the team
            </p>
            <h2 className="font-display mt-3 text-[clamp(3rem,9vw,8rem)] leading-[0.85] text-ink">
              STAFF <span className="text-magenta">PICKS</span> &{" "}
              <span className="text-forest">FRESH</span> FINDS
            </h2>
          </div>
          <p className="max-w-sm text-base text-ink/70 md:text-lg">
            Hand-selected favorites from our crew. New drops and local gems
            you won't find anywhere else.
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
              className="group flex flex-col overflow-hidden rounded-[1.75rem] border-2 border-ink bg-[#FDFBF7] text-ink shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-shadow hover:shadow-[12px_12px_0_0_rgba(0,0,1)]"
            >
              {/* Image */}
              <div className="relative overflow-hidden border-b-2 border-ink">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full border-2 border-ink ${p.badgeBg} ${p.badgeText} px-3 py-1 text-[10px] font-bold uppercase tracking-widest`}
                >
                  {p.badge}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink/60">
                  {p.category}
                </p>
                <h3 className="font-display mt-2 text-2xl leading-tight text-ink">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm leading-snug text-ink/70">
                  {p.details}
                </p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="rounded-md border-2 border-ink bg-cream px-2.5 py-1 font-bold">
                    {p.thc}
                  </span>
                  <span className="font-display text-xl">{p.price}</span>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  className="font-display mt-5 flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-ink py-3 text-sm uppercase tracking-widest text-cream transition-colors hover:bg-forest hover:text-cream"
                >
                  Add to Cart
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
