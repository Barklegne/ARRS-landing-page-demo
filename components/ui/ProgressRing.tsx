import type { CSSProperties } from "react";

const RADIUS = 25;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Decorative: "18 of 32 credits" sits beside it and carries the meaning, so the
// ring stays out of the accessibility tree rather than announcing twice.
export function ProgressRing({
  claimed,
  total,
  delay,
}: {
  claimed: number;
  total: number;
  delay: number;
}) {
  const progress = claimed / total;
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <span
      aria-hidden="true"
      className="relative inline-flex size-14 shrink-0 items-center justify-center"
    >
      <svg viewBox="0 0 56 56" className="size-full -rotate-90">
        <circle cx="28" cy="28" r={RADIUS} fill="none" strokeWidth="3.5" className="stroke-ink-line" />
        <circle
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="hero-ring-arc stroke-brand"
          style={
            {
              "--ring-circumference": CIRCUMFERENCE,
              animationDelay: `${delay}ms`,
            } as CSSProperties
          }
        />
      </svg>
      <span className="type-micro absolute text-paper">{Math.round(progress * 100)}%</span>
    </span>
  );
}
