import Link from "next/link";
import { Apple, Monitor } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { appSection } from "@/lib/content";

const icons = { ios: Apple, web: Monitor };

export function AppSection() {
  return (
    <section aria-labelledby="app-eyebrow" className="@container">
      <Eyebrow id="app-eyebrow" tone="dark">
        {appSection.eyebrow}
      </Eyebrow>
      <div className="mt-4 flex flex-col gap-5 tier-card rounded-[var(--radius-card)] border p-6 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:p-8">
        <div className="flex flex-col gap-2">
          <h2 className="type-section text-paper">{appSection.heading}</h2>
          <p className="type-body-on-dark text-on-dark">{appSection.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {appSection.buttons.map((button) => {
            const Icon = icons[button.id];
            return (
              <Link
                key={button.id}
                href={button.href}
                className="inline-flex min-h-11 items-center justify-center gap-2.5 cta-glass rounded-[var(--radius-control)] px-5 text-[0.9375rem] font-medium"
              >
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                {button.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
