// Free-moving, self-animating cartoon shapes for product section backdrops.
// Pure CSS keyframes — no JS loop, no scroll listeners. Sits in an
// absolute, pointer-events-none layer behind product cards.

type Variant = "picks" | "menu" | "frequency";

const PALETTES: Record<Variant, string[]> = {
  picks: ["#2f7d32", "#e63946", "#f4b400", "#c9a0dc"],
  menu: ["#5cffb0", "#ff5fa2", "#ffd23f", "#7c5cff"],
  frequency: ["#f4b400", "#2f7d32", "#ff5fa2", "#5cbdb9"],
};

export function TrippyShapes({
  variant = "picks",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const colors = PALETTES[variant];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      style={{ opacity: 0.32 }}
    >
      {/* Melting flower blob 1 */}
      <div
        className="trippy-blob trippy-drift-a"
        style={{
          top: "8%",
          left: "-6%",
          width: "38vw",
          height: "38vw",
          background: `radial-gradient(circle at 30% 30%, ${colors[0]}, transparent 65%)`,
        }}
      />
      {/* Melting flower blob 2 */}
      <div
        className="trippy-blob trippy-drift-b"
        style={{
          top: "40%",
          right: "-8%",
          width: "44vw",
          height: "44vw",
          background: `radial-gradient(circle at 60% 40%, ${colors[1]}, transparent 65%)`,
        }}
      />
      {/* Warm gold blob */}
      <div
        className="trippy-blob trippy-drift-c"
        style={{
          bottom: "-10%",
          left: "25%",
          width: "34vw",
          height: "34vw",
          background: `radial-gradient(circle at 50% 50%, ${colors[2]}, transparent 65%)`,
        }}
      />
      {/* Bubble ring 1 */}
      <div
        className="trippy-ring trippy-spin-slow"
        style={{
          top: "12%",
          right: "10%",
          width: "22vw",
          height: "22vw",
          borderColor: colors[3],
        }}
      />
      {/* Bubble ring 2 */}
      <div
        className="trippy-ring trippy-spin-rev"
        style={{
          bottom: "15%",
          left: "8%",
          width: "16vw",
          height: "16vw",
          borderColor: colors[0],
        }}
      />
      {/* Fluid squiggle line */}
      <svg
        className="trippy-squiggle trippy-drift-c"
        viewBox="0 0 600 120"
        style={{ top: "55%", left: "10%", width: "60vw" }}
      >
        <path
          d="M0 60 Q 75 0 150 60 T 300 60 T 450 60 T 600 60"
          fill="none"
          stroke={colors[1]}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="trippy-squiggle trippy-drift-a"
        viewBox="0 0 600 120"
        style={{ top: "25%", left: "-10%", width: "70vw" }}
      >
        <path
          d="M0 60 Q 75 120 150 60 T 300 60 T 450 60 T 600 60"
          fill="none"
          stroke={colors[2]}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}