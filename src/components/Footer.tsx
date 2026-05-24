import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer id="visit" className="relative overflow-hidden bg-ink text-cream">
      <div className="border-y-2 border-cream/20 bg-magenta py-3">
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10 pr-10">
              {["STAY HIGH", "STAY HUMBLE", "21+ ONLY", "GROWN WITH LOVE", "HAZEWOOD CO."].map((t) => (
                <span key={t} className="font-display flex items-center gap-10 text-2xl text-cream">
                  {t} <span>✺</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Newsletter */}
          <div className="lg:col-span-7">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-acid">
              ✺ Join the club
            </p>
            <h2 className="font-display mt-4 text-6xl text-cream md:text-8xl lg:text-9xl">
              GET ON
              <br />
              THE <span className="text-acid">LIST.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-cream/70">
              Drops, deals, and dispatches. Once a week, never spammy. Unsubscribe
              whenever — but you won't want to.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@somewhere.com"
                className="w-full rounded-full border-2 border-cream/30 bg-transparent px-6 py-4 text-base text-cream placeholder:text-cream/40 focus:border-acid focus:outline-none"
              />
              <button
                type="submit"
                className="font-display rounded-full bg-acid px-8 py-4 text-base text-ink transition-transform hover:scale-105"
              >
                {sent ? "✓ SENT" : "SUBSCRIBE"}
              </button>
            </form>
          </div>

          {/* Visit */}
          <div className="lg:col-span-5">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-acid">
              ✺ Visit us
            </p>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h4 className="font-display text-xl text-acid">LOCATION</h4>
                <p className="mt-2 text-cream/80">
                  1420 Highland Ave
                  <br />
                  Portland, OR 97214
                </p>
              </div>
              <div>
                <h4 className="font-display text-xl text-acid">HOURS</h4>
                <ul className="mt-2 space-y-1 text-cream/80">
                  <li className="flex justify-between gap-4">
                    <span>Mon–Thu</span>
                    <span>10–10</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Fri–Sat</span>
                    <span>10–11</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Sunday</span>
                    <span>11–9</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-xl text-acid">CONTACT</h4>
                <p className="mt-2 text-cream/80">
                  (503) 555-4200
                  <br />
                  hi@hazewood.co
                </p>
              </div>
              <div>
                <h4 className="font-display text-xl text-acid">FOLLOW</h4>
                <ul className="mt-2 space-y-1 text-cream/80">
                  <li><a href="#" className="hover:text-acid">Instagram</a></li>
                  <li><a href="#" className="hover:text-acid">TikTok</a></li>
                  <li><a href="#" className="hover:text-acid">Spotify</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Massive wordmark */}
        <div className="mt-24 overflow-hidden border-t-2 border-cream/20 pt-10">
          <h3 className="font-display text-[22vw] leading-none text-cream md:text-[18vw]">
            HAZEWOOD<span className="text-magenta">.</span>
          </h3>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-widest text-cream/50">
            <span>© 2026 Hazewood Cannabis Co.</span>
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