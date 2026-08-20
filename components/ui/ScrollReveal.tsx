"use client";

import { useEffect } from "react";

/**
 * Drives every below-the-fold reveal on the page.
 *
 * This was a fallback for browsers without `animation-timeline`, with a
 * scroll-driven animation as the primary path. That model was wrong for a
 * reveal: scrubbing opacity against scroll position leaves any block taller
 * than the trigger window sitting at partial opacity for as long as it is
 * partly off-screen, which reads as a greyed-out section, and scrolling back up
 * plays it backwards. An entrance should happen once and then be over.
 *
 * So: observe, reveal, unobserve. The transition is time-based, so it completes
 * on its own clock no matter how the reader scrolls — including a flick that
 * lands a whole section on screen at once.
 *
 * The hidden start state is scoped to the `data-reveal-js` flag set here rather
 * than to the elements, so with no JS — or with reduced motion, where this
 * returns before setting anything — the base state stays the finished one and
 * nothing can be stranded invisible.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.dataset.revealJs = "";

    const reveal = (el: Element) => el.classList.add("is-revealed");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // Fires as the element starts to enter, so the movement happens on the
      // way in rather than after it has already been read.
      { rootMargin: "0px 0px -4% 0px", threshold: 0 },
    );

    const targets = document.querySelectorAll("[data-reveal]");

    // Anything already on screen at mount — a deep link, a restored scroll
    // position — is shown immediately. Animating it would be an entrance for
    // content the reader is already looking at.
    for (const el of targets) {
      const box = el.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) reveal(el);
      else observer.observe(el);
    }

    return () => {
      observer.disconnect();
      delete root.dataset.revealJs;
    };
  }, []);

  return null;
}
