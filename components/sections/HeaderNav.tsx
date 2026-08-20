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
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = Object.values(watched).filter((id): id is string => id !== null);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const sync = () => {
      let current = "home";
      for (const section of sections) {
        const landing = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
        if (section.getBoundingClientRect().top <= landing + 4) {
          const entry = Object.entries(watched).find(([, id]) => id === section.id);
          if (entry) current = entry[0];
        }
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
