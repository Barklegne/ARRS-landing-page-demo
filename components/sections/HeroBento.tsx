import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { CountUp } from "@/components/ui/CountUp";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { AvatarCluster } from "@/components/ui/AvatarCluster";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { RotatingHeadline } from "./RotatingHeadline";
import { HeroSearch } from "./HeroSearch";
import { PlayLink } from "./PlayLink";
import { RegisterDialog } from "./RegisterDialog";
import { VideoDialog } from "./VideoDialog";
import { UpNextCard } from "./UpNextCard";
import { cme, hero, statRail } from "@/lib/content";

const rule = "border-ink-line";

// Load orchestration, in ms.
const T = {
  eyebrow: 0,
  word: 60,
  wordStagger: 40,
  markLead: 80,
  body: 300,
  ctas: 380,
  search: 440,
  card: 540,
  avatars: 620,
  rail: 560,
  figures: 640,
  bar: 820,
  cue: 1200,
} as const;

const delay = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties;

function StatRail({ className = "" }: { className?: string }) {
  return (
    <div className={`hero-rise border-t-[0.5px] pt-7 ${rule} ${className}`} style={delay(T.rail)}>
      <div className="grid grid-cols-2 sm:grid-cols-3">
        {statRail.map((stat, i) => (
          <Link
            key={stat.id}
            href={stat.href}
            className={`flex flex-col gap-2 text-center sm:gap-2.5 sm:text-left ${i === 0 ? "pr-4 sm:pr-6" : `border-l-[0.5px] pl-4 sm:pl-6 ${rule}`}`}
          >
            <span className="type-micro text-on-dark">{stat.label}</span>
            <span className="font-display text-[1.875rem] leading-none text-paper sm:text-[2.125rem]">
              <CountUp value={stat.count} delay={T.figures} />
            </span>
          </Link>
        ))}

        <Link
          href={cme.href}
          className={`col-span-2 mt-7 flex flex-col items-center gap-2.5 border-t-[0.5px] pt-7 text-center sm:col-span-1 sm:mt-0 sm:items-start sm:border-t-0 sm:border-l-[0.5px] sm:pl-6 sm:pt-0 sm:text-left ${rule}`}
        >
          <span className="type-micro text-on-dark">CME progress</span>
          <span className="flex items-center gap-3.5">
            <ProgressRing claimed={cme.claimed} total={cme.total} delay={T.figures} />
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[17px] leading-tight text-paper sm:text-[19px]">{cme.railLabel}</span>
              <span className="inline-flex items-center gap-1.5 text-[15px] text-on-dark">
                {cme.action}
                <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              </span>
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export function HeroBento() {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-ink text-paper lg:min-h-[calc(100svh-13rem)]">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-full lg:w-[62%] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_30%)]"
      >
        <Image
          src={hero.image.src}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="hero-zoom-in object-cover object-[46%_40%] opacity-70 grayscale contrast-[1.08]"
        />
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-ink/88 lg:hidden" />
      <div aria-hidden="true" className="hero-scrim absolute inset-0 hidden lg:block" />
      <div aria-hidden="true" className="hero-vignette absolute inset-0" />
      <div aria-hidden="true" className="grain absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink via-ink/70 to-transparent"
      />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-5 pb-14 pt-16 lg:pb-10 lg:pt-16">
        <div className="grid flex-1 content-center gap-y-14 lg:grid-cols-[1fr_400px] lg:gap-x-16 lg:gap-y-0">
          <div className="flex flex-col items-center text-center lg:col-start-1 lg:row-start-1 lg:items-start lg:text-left">
            <p className="hero-rise type-micro text-on-dark" style={delay(T.eyebrow)}>
              {hero.eyebrow}
            </p>

            <RotatingHeadline />

            <p className="hero-rise type-body-on-dark mt-7 text-on-dark sm:mt-8" style={delay(T.body)}>
              {hero.body}
            </p>

            <div
              className="hero-rise mt-9 flex w-full flex-col gap-3 sm:mt-11 sm:w-auto sm:flex-row sm:items-center sm:gap-5"
              style={delay(T.ctas)}
            >
              <PlayLink
                href={hero.primaryCta.href}
                className="cta-primary inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-[0.9375rem] font-medium transition-[filter] duration-150 hover:brightness-[0.96]"
              >
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </PlayLink>
              <RegisterDialog />
            </div>

            <div className="hero-rise mt-9 w-full sm:mt-10" style={delay(T.avatars)}>
              <AvatarCluster />
            </div>

            <span className="mt-8 md:hidden">
              <Pill>{hero.statusPill}</Pill>
            </span>
          </div>

          <div className="flex flex-col gap-5 lg:col-start-2 lg:row-start-1 lg:justify-center">
            <UpNextCard delayMs={T.card} barDelayMs={T.bar} />
            <HeroSearch className="hero-rise" />
          </div>

        </div>

        <StatRail className="mt-12 sm:mt-14 lg:mt-0" />

        <VideoDialog />

        <div className="hero-fade-in hidden justify-center pt-8 lg:flex" style={delay(T.cue)}>
          <ScrollCue />
        </div>
      </div>
    </section>
  );
}
