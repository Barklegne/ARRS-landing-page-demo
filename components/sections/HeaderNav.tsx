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

  // Same-document navigation has to be driven by hand. A hash link whose hash
  // is already in the URL is a no-op for both the browser and the router, so a
  // second click on Download from the footer did nothing — and `href="/"` while
  // already on `/` never scrolled at all. Both were measured from the footer:
  // 3931 -> 3931, no movement.
  //
  // The href stays intact, so this only ever upgrades a link that already
  // works: middle-click, cmd-click and no-JS all fall through to the default,
  // and from a stub route the target does not exist here, so the browser
  // navigates home and lands on the section by itself.
  const jump = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.location.pathname !== "/") return;

    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = smooth ? "smooth" : "auto";

    if (href === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior });
      if (window.location.hash) window.history.pushState(null, "", "/");
      return;
    }

    const target = document.getElementById(href.replace("/#", ""));
    if (!target) return;

    event.preventDefault();
    // scrollIntoView honours the section's scroll-margin-top, so it lands
    // clear of the sticky header without repeating that offset here.
    target.scrollIntoView({ behavior, block: "start" });
    if (window.location.hash !== `#${target.id}`) {
      window.history.pushState(null, "", href);
    }
  };

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
            onClick={(event) => jump(event, item.href)}
            aria-current={isActive ? "true" : undefined}
            className={`nav-link relative inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-[0.9375rem] ${
              isActive ? "text-brand" : "text-on-dark/70 hover:text-paper"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
