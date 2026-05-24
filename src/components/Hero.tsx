import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const rise = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
const riseSmall = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-cream pt-32 pb-16">
      {/* Marquee top */}
      <div className="absolute left-0 right-0 top-24 overflow-hidden border-y-2 border-ink bg-acid py-3">
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8 pr-8">
              {["FRESH DROP", "LIVE ROSIN", "21+ ONLY", "FREE DELIVERY", "GROWN IN HOUSE", "NEW STRAINS"].map(
                (t) => (
                  <span key={t} className="font-display flex items-center gap-8 text-lg text-ink">
                    {t} <span>✺</span>
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-[1600px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={riseSmall} className="text-sm font-bold uppercase tracking-[0.3em] text-ink/60">
            ✺ Modern Cannabis · Est. 2024
          </motion.p>
          <h1 className="font-display mt-6 text-[18vw] leading-[0.82] text-ink md:text-[14vw] lg:text-[12rem] xl:text-[14rem]">
            <motion.span variants={rise} className="block">HIGH</motion.span>
            <motion.span variants={rise} className="block">
              <span className="inline-block bg-magenta px-4 text-cream">VIBES</span>
            </motion.span>
            <motion.span variants={rise} className="block">
              ONLY<span className="text-magenta">.</span>
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-end gap-6 lg:col-span-4"
        >
          <motion.p variants={riseSmall} className="text-balance text-lg text-ink/80 md:text-xl">
            Small-batch flower, hand-picked concentrates, and edibles that actually
            slap. Pulled from the best growers in the state, delivered with
            love.
          </motion.p>
          <motion.div variants={riseSmall} className="flex flex-wrap gap-3">
            <motion.a
              whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 18 } }}
              whileTap={{ scale: 0.97 }}
              href="#menu"
              className="font-display group flex items-center gap-3 rounded-full bg-ink px-8 py-5 text-lg text-cream"
            >
              VIEW MENU
              <span className="grid h-8 w-8 place-items-center rounded-full bg-acid text-ink transition-transform group-hover:rotate-45">
                →
              </span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#strains"
              className="rounded-full border-2 border-ink px-8 py-5 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              Strain Library
            </motion.a>
          </motion.div>

          <motion.div variants={riseSmall} className="grid grid-cols-3 gap-4 pt-6">
            {[
              { v: "47+", l: "Strains" },
              { v: "12k", l: "Happy" },
              { v: "4.9★", l: "Rated" },
            ].map((s) => (
              <div key={s.l} className="border-t-2 border-ink pt-3">
                <div className="font-display text-3xl text-ink md:text-4xl">{s.v}</div>
                <div className="text-xs uppercase tracking-widest text-ink/60">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}