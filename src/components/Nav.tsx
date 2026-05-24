export function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-6 py-5 md:px-10">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between rounded-full border-2 border-ink bg-cream/90 px-6 py-3 backdrop-blur-md">
        <a href="#" className="font-display text-xl tracking-tight text-ink md:text-2xl">
          HAZEWOOD<span className="text-magenta">.</span>
        </a>
        <nav className="hidden gap-8 md:flex">
          {["Menu", "Strains", "Shop", "Visit"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm font-semibold uppercase tracking-widest text-ink/70 transition-colors hover:text-ink"
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#menu"
          className="font-display rounded-full bg-ink px-5 py-2.5 text-xs uppercase tracking-widest text-cream transition-transform hover:scale-105 md:text-sm"
        >
          Shop Now
        </a>
      </div>
    </header>
  );
}