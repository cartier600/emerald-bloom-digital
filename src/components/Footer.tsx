import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export function Footer() {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<null | "ok" | "no">(null);

  const checkZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{5}$/.test(zip)) {
      // Mock: zips starting with 9 deliver.
      setStatus(zip.startsWith("9") ? "ok" : "no");
    }
  };

  return (
    <footer id="location" className="relative overflow-hidden bg-ink text-cream">
      {/* Marquee strip */}
      <div className="border-y-2 border-cream/20 bg-magenta py-3">
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10 pr-10">
              {["STAY HIGH", "STAY HUMBLE", "21+ ONLY", "GROWN WITH LOVE", "MUNCHIES CO."].map((t) => (
                <span key={t} className="font-display flex items-center gap-10 text-2xl text-cream">
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
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-acid">
                ✺ Visit the shop
              </p>
              <h3 className="font-display mt-3 text-5xl text-cream md:text-7xl">
                LET'S
                <br />
                LINK UP<span className="text-acid">.</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h4 className="font-display text-lg text-acid">LOCATION</h4>
                <p className="mt-2 text-cream/80">
                  1420 Highland Ave
                  <br />
                  Portland, OR 97214
                </p>
              </div>
              <div>
                <h4 className="font-display text-lg text-acid">CONTACT</h4>
                <p className="mt-2 text-cream/80">
                  (503) 555-4200
                  <br />
                  hi@munchies.co
                </p>
              </div>
              <div className="sm:col-span-2">
                <h4 className="font-display text-lg text-acid">HOURS</h4>
                <ul className="mt-3 divide-y divide-cream/15 text-cream/80">
                  {[
                    ["Mon – Thu", "10AM – 10PM"],
                    ["Fri – Sat", "10AM – 11PM"],
                    ["Sunday", "11AM – 9PM"],
                  ].map(([d, h]) => (
                    <li key={d} className="flex items-center justify-between py-2">
                      <span>{d}</span>
                      <span className="font-display tracking-wider">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Zip checker */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-acid">
                ✺ Delivery check
              </p>
              <h3 className="font-display mt-3 text-5xl text-cream md:text-7xl">
                DO WE
                <br />
                <span className="text-acid">DELIVER?</span>
              </h3>
              <p className="mt-4 max-w-md text-cream/70">
                Drop your zip and we'll tell you if we run that way. Same-day
                delivery in most of the metro, 7 days a week.
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
                    ? "Same-day window: 30–60 minutes."
                    : "Drop your email and we'll ping you when we expand."}
                </p>
              </motion.div>
            )}

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