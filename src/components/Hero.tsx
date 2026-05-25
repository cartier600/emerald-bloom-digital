import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import hybrid from "@/assets/strain-hybrid.jpg";

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
    <section className="relative min-h-screen overflow-hidden bg-forest pt-36 pb-28 text-cream">
      {/* Mobile: full-bleed video background. Desktop: contained to left column. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 lg:hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,30,20,0.7) 0%, rgba(10,30,20,0.55) 45%, rgba(10,30,20,0.4) 100%)",
          }}
        />
      </div>

      {/* Marquee top */}
      <div className="absolute left-0 right-0 top-24 z-10 overflow-hidden border-y-2 border-ink bg-neon-yellow py-3">
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8 pr-8">
              {["ROCKAWAY BEACH VIBES", "21+ ONLY", "FREE LOCAL DELIVERY", "PREMIUM NY BRANDS", "FRESH FLOWER"].map(
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

      {/* Two-column split on desktop */}
      <div className="relative z-10 mx-auto mt-20 grid max-w-[1600px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: headline + CTAs + (desktop) video framed within column */}
        <div className="relative">
          {/* Desktop-only video framed inside the left column */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden rounded-[2rem] lg:block">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(10,30,20,0.7) 0%, rgba(10,30,20,0.55) 45%, rgba(10,30,20,0.4) 100%)",
              }}
            />
          </div>

          <motion.div
            className="flex h-full flex-col justify-between gap-10 lg:p-10"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div>
              <motion.p variants={riseSmall} className="text-sm font-bold uppercase tracking-[0.3em] text-cream/70">
                THE ROCKAWAYS' FIRST LEGAL CANNABIS DISPENSARY
              </motion.p>
              <h1 className="sr-only">Munchies Dispensary New York</h1>
            </div>

            <div className="flex flex-col gap-6">
              <motion.p variants={riseSmall} className="text-balance max-w-xl text-base text-cream/85 md:text-lg">
                Premium cannabis, local vibes. Serving the Rockaways with top-shelf flower, premium concentrates, and curated edibles.
              </motion.p>

              <motion.div variants={riseSmall} className="flex flex-wrap gap-3">
                <motion.a
                  whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                  whileTap={{ scale: 0.97 }}
                  href="#menu"
                  className="font-display group flex items-center gap-3 rounded-full bg-athletic px-8 py-5 text-lg text-ink"
                >
                  VIEW MENU
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-athletic transition-transform group-hover:rotate-45">
                    →
                  </span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  href="#strains"
                  className="rounded-full border-2 border-cream px-8 py-5 text-base font-semibold text-cream transition-colors hover:bg-cream hover:text-forest"
                >
                  Strain Library
                </motion.a>
              </motion.div>

              <motion.div variants={riseSmall} className="grid max-w-xl grid-cols-3 gap-4 pt-10">
                {[
                  { v: "47+", l: "Strains" },
                  { v: "12k", l: "Happy" },
                  { v: "4.9★", l: "Rated" },
                ].map((s) => (
                  <div key={s.l} className="border-t-2 border-cream/40 pt-3">
                    <div className="font-display text-3xl text-athletic md:text-4xl">{s.v}</div>
                    <div className="text-xs uppercase tracking-widest text-cream/70">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: product card framed in a deep forest panel */}
        <div className="flex items-center justify-center rounded-[2rem] bg-forest p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            className="w-full max-w-sm"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-[2rem] border-2 border-ink bg-athletic p-4 shadow-2xl"
            >
              <div className="overflow-hidden rounded-[1.5rem] border-2 border-ink bg-cream">
                <img
                  src={hybrid}
                  alt="Featured strain"
                  width={512}
                  height={512}
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="font-display absolute -left-3 -top-3 rounded-full border-2 border-ink bg-magenta px-3 py-1.5 text-[10px] uppercase tracking-widest text-cream">
                ✺ Fresh Drop
              </div>
              <div className="mt-3 px-1 pb-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-cream/70">Today's pick</p>
                <p className="font-display text-2xl text-cream">Wedding Cake</p>
                <p className="text-sm text-cream/70">26% THC · $38/8th</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}