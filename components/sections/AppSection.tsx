import Link from "next/link";
import { Apple, Monitor, Smartphone } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { appSection } from "@/lib/content";

const icons = { ios: Apple, web: Monitor };

// Decorative only: a simplified portal screen, no readable strings. It carries
// aria-hidden rather than alt text because there is nothing here a screen
// reader could act on — the two real actions sit beside it.
function DeviceMock() {
  return (
    <div
      aria-hidden="true"
      data-reveal=""
      style={{ "--i": 1 } as React.CSSProperties}
      className="tier-reveal pointer-events-none ml-auto hidden shrink-0 select-none lg:block"
    >
      <div className="device-frame w-[170px] rounded-[32px] p-2.5">
        {/* The screen clips its own last row, so the mock reads as a list that
            continues rather than a finished picture. */}
        <div className="device-screen flex h-[248px] flex-col gap-2.5 overflow-hidden rounded-[24px] p-3">
          <span className="device-row mx-auto h-1 w-9 shrink-0 rounded-full" />
          <span className="mt-2 flex shrink-0 items-center gap-2">
            <span className="size-4 shrink-0 rounded-[5px] bg-brand" />
            <span className="device-row h-1.5 flex-1 rounded-full" />
          </span>
          <span className="device-row-active mt-1 block h-9 shrink-0 rounded-[10px]" />
          <span className="device-row block h-8 shrink-0 rounded-[10px] opacity-70" />
          <span className="device-row block h-8 shrink-0 rounded-[10px] opacity-45" />
          <span className="device-row block h-8 shrink-0 rounded-[10px] opacity-25" />
        </div>
      </div>
    </div>
  );
}

export function AppSection() {
  return (
    <section id="portal-app" aria-labelledby="app-eyebrow">
      <Eyebrow id="app-eyebrow" tone="dark">
        {appSection.eyebrow}
      </Eyebrow>

      <div className="surface-panel relative isolate mt-5 overflow-clip rounded-[var(--radius-panel)] p-6 sm:p-8 lg:p-10">
        <span aria-hidden="true" className="app-glow pointer-events-none absolute inset-0" />

        <div className="relative flex items-center gap-8">
          <div data-reveal="" className="tier-reveal flex min-w-0 flex-col items-start lg:max-w-[62%]">
            <span
              aria-hidden="true"
              className="icon-well mb-7 flex size-11 items-center justify-center rounded-xl sm:mb-8"
            >
              <Smartphone strokeWidth={1.75} className="size-5" />
            </span>

            <span className="pill-brand type-micro inline-flex items-center gap-2 rounded-full px-3 py-1.5">
              <span aria-hidden="true" className="live-dot size-1.5 shrink-0 rounded-full bg-brand" />
              {appSection.badge}
            </span>

            <h2 className="type-closing mt-5 max-w-[16ch] text-paper">{appSection.heading}</h2>
            <p className="type-body-on-dark mt-3.5 text-on-dark">{appSection.body}</p>

            <div className="mt-8 flex w-full flex-row gap-3 sm:w-auto sm:gap-3.5">
              {appSection.buttons.map((button, index) => {
                const Icon = icons[button.id];
                return (
                  <Link
                    key={button.id}
                    href={button.href}
                    className={`${index === 0 ? "app-cta" : "app-cta-quiet"} inline-flex min-h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] px-3 text-[0.9375rem] font-medium sm:flex-none sm:gap-2.5 sm:px-5`}
                  >
                    <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
                    {button.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <DeviceMock />
        </div>
      </div>
    </section>
  );
}
