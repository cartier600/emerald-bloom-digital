import { useEffect, useRef } from "react";

/**
 * Trippy cartoon-style background loop: melting cannabis leaves,
 * expanding smoke rings, swirling geometric clouds. Pure CSS/SVG —
 * no WebGL deps. Parallax handled by translateY based on scrollY.
 */
export function PsychedelicBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const y = window.scrollY * 0.35; // slower than foreground
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const leafColors = ["#2f7d32", "#73ffb8", "#e63946", "#f4b400", "#c9a0dc"];
  const ringColors = ["#f4b400", "#e63946", "#2f7d32", "#c9a0dc", "#73ffb8"];

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ opacity: 0.3 }}
    >
      {/* Expanding smoke rings */}
      {ringColors.map((c, i) => (
        <div
          key={`ring-${i}`}
          className="psy-pulse absolute rounded-full border-[3px]"
          style={{
            left: `${15 + i * 17}%`,
            top: `${10 + (i % 3) * 28}%`,
            width: `${180 + i * 40}px`,
            height: `${180 + i * 40}px`,
            borderColor: c,
            ["--dur" as string]: `${5 + i}s`,
            ["--o" as string]: 0.5,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}

      {/* Melting cartoon cannabis leaves */}
      {leafColors.map((c, i) => (
        <svg
          key={`leaf-${i}`}
          viewBox="0 0 100 100"
          className="psy-drift absolute"
          style={{
            left: `${(i * 19 + 8) % 90}%`,
            top: `${(i * 23 + 15) % 75}%`,
            width: `${80 + i * 14}px`,
            height: `${80 + i * 14}px`,
            ["--dur" as string]: `${14 + i * 3}s`,
            ["--dx" as string]: `${(i % 2 ? 40 : -40)}px`,
            ["--dy" as string]: `${(i % 2 ? -50 : 30)}px`,
            filter: "blur(0.5px)",
          }}
        >
          <g fill={c} opacity={0.9}>
            {[0, 72, 144, 216, 288].map((rot) => (
              <ellipse
                key={rot}
                cx="50"
                cy="20"
                rx="8"
                ry="28"
                transform={`rotate(${rot} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="6" fill="#0a1e14" />
          </g>
        </svg>
      ))}

      {/* Swirling geometric cloud lines */}
      <svg
        className="psy-spin absolute left-1/2 top-1/2"
        style={{
          width: "120vmin",
          height: "120vmin",
          marginLeft: "-60vmin",
          marginTop: "-60vmin",
          ["--dur" as string]: "60s",
        }}
        viewBox="0 0 200 200"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={20 + i * 10}
            fill="none"
            stroke={i % 2 ? "#f4b400" : "#73ffb8"}
            strokeWidth="0.6"
            strokeDasharray={`${4 + i} ${6 + i}`}
            opacity={0.5}
          />
        ))}
      </svg>

      {/* Counter-rotating swirl */}
      <svg
        className="psy-spin absolute left-1/2 top-1/2"
        style={{
          width: "90vmin",
          height: "90vmin",
          marginLeft: "-45vmin",
          marginTop: "-45vmin",
          ["--dur" as string]: "45s",
          animationDirection: "reverse",
        }}
        viewBox="0 0 200 200"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={30 + i * 12}
            fill="none"
            stroke={i % 2 ? "#e63946" : "#c9a0dc"}
            strokeWidth="0.8"
            strokeDasharray={`${2 + i * 2} ${8}`}
            opacity={0.45}
          />
        ))}
      </svg>
    </div>
  );
}