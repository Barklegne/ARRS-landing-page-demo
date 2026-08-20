import { PlayLink } from "@/components/sections/PlayLink";
import { Play } from "lucide-react";
import { upNext } from "@/lib/content";

export function UpNextCard({
  className = "",
  delayMs,
  barDelayMs,
}: {
  className?: string;
  delayMs: number;
  barDelayMs: number;
}) {
  const percent = Math.round(upNext.progress * 100);

  return (
    <PlayLink
      href={upNext.href}
      style={{ animationDelay: `${delayMs}ms` }}
      className={`hero-card-in flex w-full flex-col gap-5 transition-colors duration-150 hover:border-paper/40 rounded-[var(--radius-card)] border-[0.5px] border-paper/20 bg-ink/65 p-5 shadow-[0_28px_70px_-28px_rgb(0_0_0/0.85)] backdrop-blur-md ${className}`}
    >
      <span className="type-micro text-on-dark">{upNext.label}</span>

      <span className="flex items-start gap-4">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border-[0.5px] border-paper/25 bg-paper/10">
          <Play aria-hidden="true" className="size-4 translate-x-px" fill="currentColor" strokeWidth={0} />
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <span className="text-[16px] leading-snug text-paper sm:text-[17px]">{upNext.title}</span>
          <span className="text-[14px] text-on-dark sm:text-[15px]">{upNext.speaker}</span>
        </span>
      </span>

      <span className="flex flex-col gap-2">
        <span className="block h-[3px] w-full overflow-hidden rounded-full bg-paper/15">
          <span
            className="hero-bar-fill block h-full rounded-full bg-paper/70"
            style={{ width: `${percent}%`, animationDelay: `${barDelayMs}ms` }}
          />
        </span>
        <span className="type-micro text-on-dark">{percent}% watched</span>
      </span>
    </PlayLink>
  );
}
