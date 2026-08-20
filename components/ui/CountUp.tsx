"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// The final value is server-rendered as real text; JS only animates the display
// on mount, so no-JS and reduced-motion users see the true figure immediately.
export function CountUp({
  value,
  delay,
  duration = 800,
  className = "",
  whenVisible = false,
}: {
  value: number;
  delay: number;
  duration?: number;
  className?: string;
  /** Below-fold counters should run when reached, not on mount into an empty
   *  viewport where the animation is spent before anyone can see it. */
  whenVisible?: boolean;
}) {
  const final = value.toLocaleString("en-US");
  const [display, setDisplay] = useState<string | null>(null);
  const host = useRef<HTMLSpanElement>(null);

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

    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => {
        setDisplay("0");
        frame = requestAnimationFrame(step);
      }, delay);
    };

    if (!whenVisible) {
      start();
      return () => {
        window.clearTimeout(timer);
        cancelAnimationFrame(frame);
      };
    }

    const node = host.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        start();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [value, delay, duration, whenVisible]);

  return (
    <span
      ref={host}
      className={`inline-block tabular-nums ${className}`}
      style={{ minWidth: `${final.length}ch` } as CSSProperties}
    >
      {display ?? final}
    </span>
  );
}
