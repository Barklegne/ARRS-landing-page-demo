"use client";

import Link from "next/link";
import type { AppRoute } from "@/lib/content";
import { openPlayer } from "./VideoDialog";

// Stays a real link so the stub route still works without JS; JS upgrades it
// into the in-page player.
export function PlayLink({
  href,
  className = "",
  style,
  children,
  "aria-label": ariaLabel,
}: {
  href: AppRoute;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        event.preventDefault();
        openPlayer();
      }}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
