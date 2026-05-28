import logoMark from "@/assets/logo-m-mark.png";
import { useEffect } from "react";
import { prefetchSection, prefetchSections } from "@/lib/prefetchSection";

export function Nav() {
  // Warm all primary nav targets after first paint so taps feel native-instant.
  useEffect(() => {
    const handle = window.requestIdleCallback
      ? window.requestIdleCallback(() => prefetchSections(["menu", "strains", "location"]))
      : window.setTimeout(() => prefetchSections(["menu", "strains", "location"]), 600);
    return () => {
      if (window.cancelIdleCallback && typeof handle === "number") {
        // requestIdleCallback returns a handle on browsers that support it
        try { window.cancelIdleCallback(handle as number); } catch {}
      } else {
        clearTimeout(handle as number);
      }
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-6 py-5 md:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 items-center rounded-full border-2 border-ink bg-cream/90 px-6 py-3 backdrop-blur-md md:grid-cols-3">
        {/* Left: logo */}
        <a href="#" className="flex items-center gap-2 justify-self-start" aria-label="Munchies NY home">
          <img
            src={logoMark}
            alt="Munchies"
            className="h-10 w-auto md:h-12"
            draggable={false}
          />
          <span className="font-display text-xl tracking-tight text-ink md:text-2xl">
            NY
          </span>
        </a>

        {/* Center: nav links */}
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {["Menu", "Strains", "Location"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onPointerEnter={() => prefetchSection(l.toLowerCase())}
              onFocus={() => prefetchSection(l.toLowerCase())}
              onTouchStart={() => prefetchSection(l.toLowerCase())}
              className="text-sm font-semibold uppercase tracking-widest text-ink/70 transition-colors hover:text-ink"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Right: CTA */}
        <a
          href="#menu"
          onPointerEnter={() => prefetchSection("menu")}
          onFocus={() => prefetchSection("menu")}
          onTouchStart={() => prefetchSection("menu")}
          className="font-display justify-self-end rounded-full bg-ink px-5 py-2.5 text-xs uppercase tracking-widest text-cream transition-transform hover:scale-105 md:px-6 md:py-3 md:text-sm"
        >
          Order Now
        </a>
      </div>
    </header>
  );
}