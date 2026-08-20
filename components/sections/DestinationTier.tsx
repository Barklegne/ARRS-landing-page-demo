import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Destination, Tier } from "@/lib/content";

function reveal(index: number) {
  return { "--i": index } as React.CSSProperties;
}

function DiscoveryCard({ item, index }: { item: Destination; index: number }) {
  const { icon: Icon } = item;

  return (
    <Link
      href={item.href}
      data-reveal=""
      style={reveal(index)}
      className="tier-reveal surface-panel surface-panel-link group flex flex-col justify-between gap-5 rounded-[var(--radius-card)] p-4 sm:gap-8 sm:p-6"
    >
      <span
        aria-hidden="true"
        className="icon-well flex size-10 items-center justify-center rounded-[0.7rem]"
      >
        <Icon strokeWidth={1.75} className="size-[1.125rem]" />
      </span>

      <span className="flex flex-col gap-2">
        <span className="text-[1.0625rem] tracking-[-0.01em] text-paper">{item.label}</span>
        <span className="flex items-center justify-between gap-3">
          <span className="text-[0.875rem] text-on-dark">{item.meta}</span>
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-4 shrink-0 text-on-dark/70 transition-[translate,color] duration-300 ease-[var(--ease-hero)] group-hover:translate-x-1 group-hover:text-brand"
          />
        </span>
      </span>
    </Link>
  );
}

function NavRow({ item, index }: { item: Destination; index: number }) {
  return (
    <Link
      href={item.href}
      data-reveal=""
      style={reveal(index)}
      className="tier-reveal nav-row group flex min-h-14 items-center justify-between gap-4 py-3"
    >
      <span className="text-[0.9375rem] text-on-dark transition-colors duration-200 group-hover:text-paper">
        {item.label}
      </span>
      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-4 shrink-0 text-on-dark/55 transition-[translate,color] duration-300 ease-[var(--ease-hero)] group-hover:translate-x-1 group-hover:text-brand"
      />
    </Link>
  );
}

function ChipLink({ item, index }: { item: Destination; index: number }) {
  return (
    <Link
      href={item.href}
      data-reveal=""
      style={reveal(index)}
      className="tier-reveal tier-chip inline-flex min-h-11 items-center rounded-full border px-4 text-[0.9375rem]"
    >
      {item.label}
    </Link>
  );
}

export function DestinationTier({ tier }: { tier: Tier }) {
  if (tier.display === "chip") {
    // Label and chips share a line, so the tertiary group reads as one quiet
    // strip rather than another titled section competing with the two above.
    return (
      <section
        aria-labelledby={`${tier.id}-eyebrow`}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
      >
        <h2
          id={`${tier.id}-eyebrow`}
          className="type-micro shrink-0 text-on-dark/75"
        >
          {tier.eyebrow}
        </h2>
        <ul className="flex flex-wrap gap-2.5">
          {tier.items.map((item, i) => (
            <li key={item.id}>
              <ChipLink item={item} index={i} />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section aria-labelledby={`${tier.id}-eyebrow`}>
      <Eyebrow id={`${tier.id}-eyebrow`} as="h2" tone="dark">
        {tier.eyebrow}
      </Eyebrow>

      {tier.display === "discovery" ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tier.items.map((item, i) => (
            <DiscoveryCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-3 grid gap-x-10 sm:grid-cols-2">
          {tier.items.map((item, i) => (
            <NavRow key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
