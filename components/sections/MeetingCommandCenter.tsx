import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CountUp } from "@/components/ui/CountUp";
import { cme, scheduleNext } from "@/lib/content";

function ScheduleCard() {
  return (
    <Link
      href={scheduleNext.href}
      data-reveal=""
      style={{ "--i": 0 } as React.CSSProperties}
      className="tier-reveal surface-panel surface-panel-link group relative isolate flex flex-col overflow-hidden rounded-[var(--radius-panel)] p-6 sm:p-7 lg:col-span-8"
    >
      <span aria-hidden="true" className="panel-glow pointer-events-none absolute inset-0" />

      <span className="relative flex items-start justify-between gap-4">
        <span className="pill-brand type-micro inline-flex items-center gap-2 rounded-full px-3 py-1.5">
          <span aria-hidden="true" className="live-dot size-1.5 shrink-0 rounded-full bg-brand" />
          {scheduleNext.pill}
        </span>

        <span
          aria-hidden="true"
          className="icon-well flex size-11 shrink-0 items-center justify-center rounded-xl"
        >
          <ArrowUpRight
            strokeWidth={1.75}
            className="size-4 transition-[translate] duration-300 ease-[var(--ease-hero)] group-hover:translate-x-0.5"
          />
        </span>
      </span>

      <span className="relative mt-7 flex flex-col gap-2.5 sm:mt-9">
        <span className="type-micro text-on-dark/80">{scheduleNext.when}</span>
        <span className="type-session text-paper">{scheduleNext.title}</span>
        <span className="text-[0.9375rem] text-on-dark">{scheduleNext.note}</span>
      </span>

      <span className="relative mt-7 flex flex-col gap-3 border-t border-paper/10 pt-4 sm:mt-9 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[0.9375rem] text-on-dark">
          <CountUp value={scheduleNext.saved} delay={0} whenVisible /> {scheduleNext.savedNote}
        </span>
        <span className="inline-flex items-center gap-2 text-[0.9375rem] text-paper">
          {scheduleNext.action}
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-4 transition-[translate] duration-300 ease-[var(--ease-hero)] group-hover:translate-x-1"
          />
        </span>
      </span>
    </Link>
  );
}

function CreditCard() {
  const percent = Math.round((cme.claimed / cme.total) * 100);
  const remaining = cme.total - cme.claimed;

  return (
    <Link
      href={cme.href}
      data-reveal=""
      style={{ "--i": 1 } as React.CSSProperties}
      className="tier-reveal surface-panel surface-panel-link group relative flex flex-col rounded-[var(--radius-panel)] p-6 sm:p-7 lg:col-span-4"
    >
      <span className="flex items-center justify-between gap-4">
        <span className="type-micro text-on-dark/80">{cme.cardLabel}</span>
        <span className="pill-brand type-micro rounded-full px-2.5 py-1">{percent}%</span>
      </span>

      <span className="mt-7 flex items-baseline gap-1.5 sm:mt-9">
        <CountUp value={cme.claimed} delay={0} whenVisible className="type-metric text-paper" />
        <span className="type-metric-sub text-on-dark/75">/ {cme.total}</span>
      </span>
      <span className="mt-1.5 text-[0.9375rem] text-on-dark">{cme.cardNote}</span>

      <span
        role="progressbar"
        aria-valuenow={cme.claimed}
        aria-valuemin={0}
        aria-valuemax={cme.total}
        aria-label={`${cme.claimed} of ${cme.total} credits claimed`}
        className="meter-track mt-6 block h-1.5 w-full overflow-hidden rounded-full"
      >
        <span
          aria-hidden="true"
          className="meter-fill block h-full rounded-full"
          style={{ width: `${percent}%` }}
        />
      </span>

      <span className="mt-4 flex items-center justify-between gap-4">
        <span className="text-[0.9375rem] text-on-dark">{remaining} remaining</span>
        <span className="inline-flex items-center gap-2 text-[0.9375rem] text-paper">
          {cme.cardAction}
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-4 transition-[translate] duration-300 ease-[var(--ease-hero)] group-hover:translate-x-1"
          />
        </span>
      </span>
    </Link>
  );
}

export function MeetingCommandCenter() {
  return (
    <section aria-labelledby="your-meeting-eyebrow">
      <Eyebrow id="your-meeting-eyebrow" as="h2" tone="dark">
        YOUR MEETING
      </Eyebrow>
      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        <ScheduleCard />
        <CreditCard />
      </div>
    </section>
  );
}
