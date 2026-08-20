import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CountUp } from "@/components/ui/CountUp";
import { ProgressRing } from "@/components/ui/ProgressRing";
import type { Destination, Tier } from "@/lib/content";

function reveal(index: number) {
  return { "--i": index } as React.CSSProperties;
}

function FeatureCard({ item, index }: { item: Destination; index: number }) {
  const { icon: Icon, stat, progress } = item;
  const highlight = item.id === "schedule";

  return (
    <Link
      href={item.href}
      data-reveal=""
      style={reveal(index)}
      className={`tier-reveal group relative flex min-h-[168px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border p-5 @3xl:min-h-[196px] @3xl:p-6 ${
        item.wide
          ? "col-span-2 @3xl:col-span-3"
          : stat || progress
            ? "@3xl:col-span-2"
            : // No figure and an odd card count, so it would sit alone in a
              // half-width cell on mobile with its label clipped.
              "col-span-2 @3xl:col-span-2"
      } ${highlight ? "border-transparent bg-brand text-brand-ink" : "tier-card text-paper hover:tier-card-hover"}`}
    >
      <span className="flex items-start justify-between gap-4">
        <Icon aria-hidden="true" strokeWidth={1.5} className="size-6 @3xl:size-7" />
        {progress ? (
          <ProgressRing claimed={progress.claimed} total={progress.total} delay={0} />
        ) : (
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.5}
            className={`size-4 shrink-0 opacity-0 transition-[opacity,translate] duration-300 ease-[var(--ease-hero)] group-hover:translate-x-0.5 group-hover:opacity-100 ${
              highlight ? "text-brand-ink" : "text-on-dark"
            }`}
          />
        )}
      </span>

      <span className="flex flex-col gap-1">
        {/* Destinations without live state lead with the label itself rather
            than printing it twice, once small and once large. */}
        {stat || progress ? (
          <span
            className={`type-micro ${highlight ? "text-brand-ink/75" : "text-on-dark/85"}`}
          >
            {item.label}
          </span>
        ) : null}

        {stat ? (
          <span className="flex flex-wrap items-baseline gap-x-2.5">
            <CountUp
              value={stat.value}
              delay={0}
              className="type-stat"
              whenVisible
            />
            <span
              className={`text-[0.9375rem] ${highlight ? "text-brand-ink/80" : "text-on-dark"}`}
            >
              {item.meta ? `${stat.unit} ${item.meta}` : stat.unit}
            </span>
          </span>
        ) : progress ? (
          <span className="flex flex-wrap items-baseline gap-x-2.5">
            <span className="type-stat">
              <CountUp value={progress.claimed} delay={0} whenVisible /> of {progress.total}
            </span>
            <span className="text-[0.9375rem] text-on-dark">{item.meta}</span>
          </span>
        ) : (
          <span className="type-stat">{item.label}</span>
        )}
      </span>
    </Link>
  );
}

function CompactCard({ item, index }: { item: Destination; index: number }) {
  const { icon: Icon } = item;

  return (
    <Link
      href={item.href}
      data-reveal=""
      style={reveal(index)}
      className="tier-reveal tier-card group flex min-h-[104px] flex-col justify-between gap-5 rounded-[var(--radius-card)] border p-4 text-paper hover:tier-card-hover"
    >
      <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
      <span className="flex items-end justify-between gap-3">
        <span className="type-card">{item.label}</span>
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.5}
          className="size-4 shrink-0 text-on-dark opacity-0 transition-[opacity,translate] duration-300 ease-[var(--ease-hero)] group-hover:translate-x-0.5 group-hover:opacity-100"
        />
      </span>
    </Link>
  );
}

function ChipLink({ item, index }: { item: Destination; index: number }) {
  const { icon: Icon } = item;

  return (
    <Link
      href={item.href}
      data-reveal=""
      style={reveal(index)}
      className="tier-reveal tier-chip inline-flex min-h-11 items-center gap-2.5 rounded-full border px-4 text-[0.9375rem] text-on-dark"
    >
      <Icon aria-hidden="true" strokeWidth={1.5} className="size-4 shrink-0" />
      {item.label}
    </Link>
  );
}

export function DestinationTier({ tier }: { tier: Tier }) {
  return (
    <section aria-labelledby={`${tier.id}-eyebrow`} className="@container">
      <Eyebrow id={`${tier.id}-eyebrow`} as="h2" tone="dark">
        {tier.eyebrow}
      </Eyebrow>

      {tier.display === "feature" ? (
        <div className="mt-5 grid grid-cols-2 gap-3 @3xl:grid-cols-6">
          {tier.items.map((item, i) => (
            <FeatureCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : tier.display === "compact" ? (
        <div className="mt-5 grid grid-cols-2 gap-3 @3xl:grid-cols-4">
          {tier.items.map((item, i) => (
            <CompactCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {tier.items.map((item, i) => (
            <li key={item.id}>
              <ChipLink item={item} index={i} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
