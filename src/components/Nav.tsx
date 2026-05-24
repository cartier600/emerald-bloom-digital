export function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-6 py-5 md:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 items-center rounded-full border-2 border-ink bg-cream/90 px-6 py-3 backdrop-blur-md md:grid-cols-3">
        {/* Left: logo */}
        <a href="#" className="font-display justify-self-start text-2xl tracking-tight text-ink md:text-3xl">
          MUNCHIES<span className="text-magenta">.</span>
        </a>

        {/* Center: nav links */}
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {["Menu", "Strains", "Location"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm font-semibold uppercase tracking-widest text-ink/70 transition-colors hover:text-ink"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Right: CTA */}
        <a
          href="#menu"
          className="font-display justify-self-end rounded-full bg-ink px-5 py-2.5 text-xs uppercase tracking-widest text-cream transition-transform hover:scale-105 md:px-6 md:py-3 md:text-sm"
        >
          Order Now
        </a>
      </div>
    </header>
  );
}