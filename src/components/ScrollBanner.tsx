import { Fragment, useEffect, useId, useRef, useState } from "react";

const REPEAT = 4;

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
          <linearGradient id={`grad-${pathId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2f7d32">
              <animate attributeName="stop-color"
                values="#2f7d32;#f4b400;#e63946;#c9a0dc;#2f7d32"
                dur="10s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#e63946">
              <animate attributeName="stop-color"
                values="#e63946;#c9a0dc;#2f7d32;#f4b400;#e63946"
                dur="10s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#f4b400">
              <animate attributeName="stop-color"
                values="#f4b400;#2f7d32;#c9a0dc;#e63946;#f4b400"
                dur="10s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <text
          className="font-display uppercase"
          style={{
            fontSize: "clamp(28px, 5.5vw, 88px)",
            fontWeight: 900,
            letterSpacing: "0.04em",
            fill: `url(#grad-${pathId})`,
          }}
        >
          <textPath
            href={`#${pathId}`}
            startOffset={`${startOffset}%`}
          >
          {Array.from({ length: REPEAT }).map((_, i) => (
            <Fragment key={i}>
              <tspan>ALL </tspan>
              <tspan>WE </tspan>
              <tspan>WEED </tspan>
              <tspan>IS </tspan>
              <tspan>LOVE </tspan>
              <tspan>• </tspan>
            </Fragment>
          ))}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
