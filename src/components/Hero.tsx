import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import hybrid from "@/assets/strain-hybrid.jpg";
import { prefetchSection } from "@/lib/prefetchSection";
import { useEffect, useRef } from "react";

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);
  return (
    <section className="relative min-h-screen overflow-hidden bg-forest pt-36 pb-32 text-cream">
      {/* Looping background video */}
      <video
        ref={videoRef}
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        src="https://files.catbox.moe/8rh1df.MP4"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

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

      {/* Centered content — product card floats in corner */}
      <div className="relative z-10 mx-auto mt-20 max-w-[1600px] px-6 md:px-10">
        <motion.div
          className="flex flex-col justify-between gap-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div>
            <motion.p
              variants={riseSmall}
              className="whitespace-nowrap font-bold uppercase tracking-[0.3em] text-cream/70"
              style={{ fontSize: "clamp(0.625rem, 1.35vw, 0.95rem)" }}
            >
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
                onPointerEnter={() => prefetchSection("menu")}
                onTouchStart={() => prefetchSection("menu")}
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
                onPointerEnter={() => prefetchSection("strains")}
                onTouchStart={() => prefetchSection("strains")}
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

      {/* Floating corner widget — desktop only, stacks below on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        className="pointer-events-none absolute bottom-10 right-10 z-20 hidden w-56 lg:block"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-auto relative rounded-[1.75rem] border-2 border-ink bg-athletic p-3 shadow-2xl"
        >
          <div className="overflow-hidden rounded-[1.25rem] border-2 border-ink bg-cream">
            <img
              src={hybrid}
              alt="Featured strain"
              width={512}
              height={512}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="font-display absolute -left-2 -top-2 rounded-full border-2 border-ink bg-magenta px-2.5 py-1 text-[9px] uppercase tracking-widest text-cream">
            ✺ Fresh Drop
          </div>
          <div className="mt-2.5 px-1 pb-0.5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-cream/70">Today's pick</p>
            <p className="font-display text-base text-cream leading-tight">Wedding Cake</p>
            <p className="text-[11px] text-cream/70">26% THC · $38/8th</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile-only stacked Fresh Drop card */}
      <div className="relative z-10 mt-16 px-6 lg:hidden">
        <div className="mx-auto max-w-sm rounded-[1.75rem] border-2 border-ink bg-athletic p-3 shadow-2xl">
          <div className="overflow-hidden rounded-[1.25rem] border-2 border-ink bg-cream">
            <img src={hybrid} alt="Featured strain" width={512} height={512} className="aspect-square w-full object-cover" />
          </div>
          <div className="mt-3 px-1 pb-1 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-cream/70">Today's pick</p>
              <p className="font-display text-lg text-cream">Wedding Cake</p>
            </div>
            <p className="text-xs text-cream/70">26% THC</p>
          </div>
        </div>
      </div>
    </section>
  );
}