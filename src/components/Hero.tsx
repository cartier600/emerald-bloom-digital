import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import hybrid from "@/assets/strain-hybrid.jpg";
import { MunchiesSmokeText } from "./MunchiesSmokeText";

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

      {/* Split 60/40 on desktop, stacked on mobile */}
      <div className="relative mx-auto mt-16 grid max-w-[1600px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-10">
        {/* LEFT 60% — headlines, sub copy, CTAs */}
        <motion.div
          className="flex flex-col justify-between gap-10 lg:col-span-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div>
            <motion.p variants={riseSmall} className="text-sm font-bold uppercase tracking-[0.3em] text-ink/60">
              THE ROCKAWAYS' FIRST LEGAL CANNABIS DISPENSARY
            </motion.p>
            <h1 className="font-display mt-6 text-[18vw] leading-[0.82] text-ink md:text-[14vw] lg:text-[10rem] xl:text-[12rem]">
              <motion.span variants={rise} className="block">
                <MunchiesSmokeText />
              </motion.span>
              <motion.span variants={rise} className="block">
                <span className="inline-block bg-magenta px-4 text-cream">NY</span>
              </motion.span>
            </h1>
          </div>

          <div className="flex flex-col gap-6">
            <motion.p variants={riseSmall} className="text-balance max-w-xl text-base text-ink/80 md:text-lg">
              Premium cannabis, local vibes. Serving the Rockaways with top-shelf flower, premium concentrates, and curated edibles.
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

            <motion.div variants={riseSmall} className="grid max-w-xl grid-cols-3 gap-4 pt-4">
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
          </div>
        </motion.div>

        {/* RIGHT 40% — floating product showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          className="relative flex items-center justify-center lg:col-span-4"
        >
          <div className="relative aspect-square w-full max-w-md rounded-[2.5rem] border-2 border-ink bg-acid p-6">
            {/* Floating product */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full overflow-hidden rounded-[2rem] border-2 border-ink bg-cream"
            >
              <img
                src={hybrid}
                alt="Featured strain"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
            </motion.div>
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="font-display absolute -left-4 top-8 rounded-full border-2 border-ink bg-magenta px-4 py-2 text-xs uppercase tracking-widest text-cream"
            >
              ✺ Fresh Drop
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-5 -right-3 rounded-2xl border-2 border-ink bg-cream px-4 py-3 text-left shadow-lg"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-ink/60">Today's pick</p>
              <p className="font-display text-lg text-ink">Wedding Cake</p>
              <p className="text-xs text-ink/60">26% THC · $38/8th</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}