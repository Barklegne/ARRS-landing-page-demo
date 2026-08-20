"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgeCheck, CalendarDays, Compass, Home } from "lucide-react";
import { tabs } from "@/lib/content";

const icons = { home: Home, schedule: CalendarDays, explore: Compass, credits: BadgeCheck };

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Portal sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-line bg-ink pb-[env(safe-area-inset-bottom)] sm:hidden"
    >
      <ul className="grid grid-cols-4">
        {tabs.map((tab) => {
          const Icon = icons[tab.id];
          const active = pathname === tab.href;
          return (
            <li key={tab.id}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className="relative flex h-14 flex-col items-center justify-center gap-1"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={`size-5 ${active ? "text-paper" : "text-on-dark"}`}
                />
                <span
                  className={`text-[11px] font-medium tracking-[0.005em] ${
                    active ? "text-paper" : "text-on-dark"
                  }`}
                >
                  {tab.label}
                </span>
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 bottom-0 h-0.5 bg-brand"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
