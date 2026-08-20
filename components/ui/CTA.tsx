import Link from "next/link";
import type { AppRoute } from "@/lib/content";

// Tailwind v4 compiles translate-*/scale-* to the INDEPENDENT `translate` and
// `scale` properties, not the `transform` shorthand. Both must be named here or
// a hover lift jumps instantly while the shadow beside it eases.
const base =
  "inline-flex items-center justify-center gap-2 rounded-xl text-[0.9375rem] font-medium transition-[filter,background-color,border-color,color,transform,translate,scale,box-shadow] duration-300 ease-[var(--ease-hero)]";

const variants = {
  primary: `${base} cta-primary h-12 px-6 hover:brightness-[0.96]`,
  glass: `${base} cta-glass h-12 px-6 hover:border-paper/40`,
  ghost: `${base} cta-ghost min-h-11 px-1 hover:text-paper`,
  secondary: `${base} h-11 border border-ink-line px-5 text-paper`,
} as const;

export function CTA({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: AppRoute;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
