import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export function Footer() {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<null | "ok" | "no">(null);

  const checkZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{5}$/.test(zip)) {
      // Covered zips for Rockaways area
      const covered = ["11691", "11692", "11693", "11694", "11697", "11414", "11416"];
      setStatus(covered.includes(zip) ? "ok" : "no");
    }
  };

  return (
    <footer id="location" className="relative overflow-hidden bg-ink text-cream">
      {/* Marquee strip */}
      <div className="border-y-2 border-ink bg-neon-yellow py-3">
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10 pr-10">
              {["ROCKAWAY BEACH VIBES", "21+ ONLY", "FREE LOCAL DELIVERY", "PREMIUM NY BRANDS", "FRESH FLOWER"].map((t) => (
                <span key={t} className="font-display flex items-center gap-10 text-2xl text-ink">
                  {t} <span>✺</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Split column layout */}
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT: Store info / hours */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="font-display text-6xl text-cream md:text-8xl lg:text-9xl">
                VISIT
                <br />
                THE SHOP
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h4 className="font-display text-lg text-acid">LOCATION</h4>
                <p className="mt-2 text-lg font-medium text-cream/90">
                  8701 Rockaway Beach Blvd
                  <br />
                  Far Rockaway, NY 11693
                </p>
              </div>
              <div>
                <h4 className="font-display text-lg text-acid">CONTACT</h4>
                <p className="mt-2 text-lg font-medium text-cream/90">
                  (347) 503-7099
                </p>
              </div>
              <div className="sm:col-span-2">
                <h4 className="font-display text-lg text-acid">HOURS</h4>
                <ul className="mt-3 divide-y divide-cream/15 text-cream/90">
                  {[
                    ["Mon – Sat", "10:00 AM – 9:00 PM"],
                    ["Sun", "10:45 AM – 8:00 PM"],
                  ].map(([d, h]) => (
                    <li key={d} className="flex items-center justify-between py-3">
                      <span className="text-lg font-medium">{d}</span>
                      <span className="font-display text-lg tracking-wider">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Delivery radius */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-display text-6xl text-cream md:text-8xl lg:text-9xl">
                ROCKAWAY
                <br />
                <span className="text-acid">DELIVERY</span>
              </h3>
              <p className="mt-4 max-w-md text-lg text-cream/70">
                Bringing premium cannabis straight to your door across the Rockaways and beyond.
              </p>
            </div>

            <form onSubmit={checkZip} className="flex flex-col gap-3 sm:flex-row">
              <input
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                  setStatus(null);
                }}
                inputMode="numeric"
                pattern="\d{5}"
                placeholder="ENTER ZIP CODE"
                aria-label="ZIP code"
                className="font-display w-full rounded-full border-2 border-cream/30 bg-transparent px-6 py-5 text-lg tracking-widest text-cream placeholder:text-cream/30 focus:border-acid focus:outline-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="font-display rounded-full bg-acid px-8 py-5 text-base text-ink"
              >
                CHECK →
              </motion.button>
            </form>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`rounded-2xl border-2 p-5 ${
                  status === "ok"
                    ? "border-acid bg-acid/10 text-acid"
                    : "border-magenta bg-magenta/10 text-magenta"
                }`}
              >
                <p className="font-display text-xl">
                  {status === "ok"
                    ? `✓ ${zip} — WE'RE ON OUR WAY.`
                    : `✕ ${zip} — NOT YET, BUT SOON.`}
                </p>
                <p className="mt-1 text-sm opacity-80">
                  {status === "ok"
                    ? "Same-day delivery available. Order before 8PM."
                    : "Drop your email and we'll ping you when we expand."}
                </p>
              </motion.div>
            )}

            <div className="mt-2 flex flex-wrap gap-3">
              {["Far Rockaway", "Rockaway Park", "Belle Harbor", "Breezy Point", "Arverne", "Broad Channel", "Howard Beach"].map((area) => (
                <span key={area} className="rounded-full border border-cream/20 bg-cream/5 px-4 py-2 text-sm font-medium text-cream/80">
                  {area}
                </span>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap gap-4 text-sm text-cream/70">
              <a href="#" className="hover:text-acid">Instagram</a>
              <a href="#" className="hover:text-acid">TikTok</a>
              <a href="#" className="hover:text-acid">Spotify</a>
            </div>
          </div>
        </div>

        {/* Massive wordmark */}
        <div className="mt-20 overflow-hidden border-t-2 border-cream/20 pt-10">
          <h3 className="font-display text-[22vw] leading-none text-cream md:text-[18vw]">
            MUNCHIES<span className="text-magenta">.</span>
          </h3>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-widest text-cream/50">
            <span>© 2026 Munchies Cannabis Co.</span>
            <span>Please consume responsibly · 21+ only</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-acid">Privacy</a>
              <a href="#" className="hover:text-acid">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
