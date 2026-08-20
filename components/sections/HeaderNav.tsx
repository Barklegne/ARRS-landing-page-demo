"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { headerNav } from "@/lib/content";

// Which section each entry watches. Home has none — it is active whenever no
// section is.
const watched: Record<string, string | null> = {
  home: null,
  store: "store",
  schedule: "your-meeting",
  download: "portal-app",
};

export function HeaderNav() {
  const [active, setActive] = useState<string | null>("home");

  useEffect(() => {
    const ids = Object.values(watched).filter((id): id is string => id !== null);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const keyFor = (id: string) =>
      Object.entries(watched).find(([, watchedId]) => watchedId === id)?.[0] ?? null;

    const sync = () => {
      // Each watched section owns the span from its own top to the next one's
      // top, so scrolling the destination tiers between "your meeting" and the
      // app card keeps Schedule lit instead of blinking off. The last one owns
      // only its own height — past it the page is the Denver band, the FAQ and
      // the footer, none of which is a header destination, so nothing is
      // marked. Anchoring on the section's own scroll-margin keeps the marker
      // in step with where an anchor jump actually lands.
      let current: string | null = null;

      for (let i = 0; i < sections.length; i += 1) {
        const section = sections[i];
        const line = (parseFloat(getComputedStyle(section).scrollMarginTop) || 0) + 4;
        const start = section.getBoundingClientRect().top;
        const next = sections[i + 1];
        const end = next
          ? next.getBoundingClientRect().top
          : section.getBoundingClientRect().bottom;

        if (start <= line && end > line) {
          current = keyFor(section.id);
          break;
        }
      }

      if (current === null) {
        const first = sections[0];
        const firstLine = (parseFloat(getComputedStyle(first).scrollMarginTop) || 0) + 4;
        if (first.getBoundingClientRect().top > firstLine) current = "home";
      }

      setActive(current);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <nav
      aria-label="Portal"
      className="hidden items-center gap-5 lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2"
    >
      {headerNav.map((item) => {
        const isActive = active === item.id;
        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={isActive ? "true" : undefined}
            className={`nav-link relative inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-[0.9375rem] ${
              isActive ? "text-paper" : "text-on-dark hover:text-paper"
            }`}
          >
            {item.label}
            {/* An underline as well as the colour change — colour alone is not
                a state indicator (WCAG 1.4.1). */}
            <span
              aria-hidden="true"
              data-on={isActive ? "" : undefined}
              className="nav-underline absolute inset-x-2 bottom-1.5 h-0.5 rounded-full"
            />
          </Link>
        );
      })}
    </nav>
  );
}
