import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { nextYear } from "@/lib/content";

export function NextYearBand() {
  return (
    <section
      aria-labelledby="next-year-heading"
      className="nextyear-field relative isolate overflow-clip"
    >
      <span aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
      {/* Neutralises the blooms before the floor, so the join with the FAQ holds
          per channel and not just per luminance. */}
      <span aria-hidden="true" className="nextyear-floor pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1200px] px-5 py-16 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div data-reveal="" className="tier-reveal flex flex-col items-start">
            <span className="pill-brand type-micro inline-flex items-center gap-2 rounded-full px-3 py-1.5">
              <span aria-hidden="true" className="live-dot size-1.5 shrink-0 rounded-full bg-brand" />
              {nextYear.eyebrow}
            </span>

            <h2 id="next-year-heading" className="type-closing mt-6 max-w-[15ch] text-paper">
              {nextYear.heading.replace(/\.$/, "")}
              <span className="text-brand">.</span>
            </h2>

            <p className="mt-5 flex items-center gap-2.5 text-[0.9375rem]">
              <span className="text-paper">{nextYear.meeting}</span>
              <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-brand" />
              <span className="text-on-dark">{nextYear.place}</span>
            </p>
          </div>

          <div
            data-reveal=""
            style={{ "--i": 1 } as React.CSSProperties}
            className="tier-reveal flex flex-col items-start gap-6 lg:items-end lg:gap-7"
          >
            {/* The year is the right column now, not a wash behind it. Hidden
                below lg, where a display numeral would own the whole screen. */}
            <span aria-hidden="true" className="nextyear-ghost hidden select-none lg:block">
              2027
            </span>
            <Link
              href={nextYear.cta.href}
              className="cta-brand-ghost group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[var(--radius-control)] px-6 text-[0.9375rem] font-medium"
            >
              {nextYear.cta.label}
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-4 transition-[translate] duration-300 ease-[var(--ease-hero)] group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
