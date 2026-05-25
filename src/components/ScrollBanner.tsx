import { useEffect, useId, useRef, useState } from "react";

const PHRASE =
  "ALL WE WEED IS LOVE • ALL WE WEED IS LOVE • ALL WE WEED IS LOVE • ALL WE WEED IS LOVE";

interface ScrollBannerProps {
  reverse?: boolean;
}

export function ScrollBanner({ reverse = false }: ScrollBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const pathId = `wavePath-${rawId.replace(/[:]/g, "")}`;
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress 0 when section enters bottom of viewport, 1 when it leaves top
      const progress = 1 - (rect.top + rect.height) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      setOffset(clamped * 100);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const startOffset = reverse ? 100 - offset : offset;

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-cream py-10 md:py-16">
      <svg
        viewBox="1 0 1200 200"
        preserveAspectRatio="none"
        className="w-full h-[120px] md:h-[200px]"
        aria-hidden="true"
      >
        <defs>
          <path
            id={pathId}
            d="M 0 120 Q 150 30 300 120 T 600 120 T 900 120 T 1200 120"
            fill="none"
          />
        </defs>
        <text
          className="font-display fill-ink uppercase"
          style={{
            fontSize: "44px",
            fontWeight: 900,
            letterSpacing: "0.04em",
          }}
        >
          <textPath
            href={`#${pathId}`}
            startOffset={`${startOffset}%`}
          >
            {PHRASE}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
