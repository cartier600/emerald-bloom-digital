// Shared easing for premium, expensive-feeling motion.
// Custom cubic-bezier mimicking ease-out with subtle settle.
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_SPRING = { type: "spring", stiffness: 140, damping: 18, mass: 0.9 } as const;