"use client";

import { useEffect } from "react";

/**
 * Scroll reveals are CSS scroll-driven animations. This mounts once and only
 * does anything in browsers without `animation-timeline`, where it swaps in an
 * IntersectionObserver.
 *
 * It marks the document rather than the elements, so the hidden start state is
 * scoped to `[data-reveal-js]`. With no JS the base state stays the finished
 * one and nothing is ever stuck invisible.
 */
export function RevealFallback() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.dataset.revealJs = "";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      delete root.dataset.revealJs;
    };
  }, []);

  return null;
}
