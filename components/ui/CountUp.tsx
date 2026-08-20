"use client";

import { useEffect, useState, type CSSProperties } from "react";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// The final value is server-rendered as real text; JS only animates the display
// on mount, so no-JS and reduced-motion users see the true figure immediately.
export function CountUp({
  value,
  delay,
  duration = 800,
  className = "",
}: {
  value: number;
  delay: number;
  duration?: number;
  className?: string;
}) {
  const final = value.toLocaleString("en-US");
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let startedAt = 0;

    const step = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / duration);
      setDisplay(Math.round(easeOut(progress) * value).toLocaleString("en-US"));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setDisplay(null);
    };

    const timer = window.setTimeout(() => {
      setDisplay("0");
      frame = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [value, delay, duration]);

  return (
    <span
      className={`inline-block tabular-nums ${className}`}
      style={{ minWidth: `${final.length}ch` } as CSSProperties}
    >
      {display ?? final}
    </span>
  );
}
