import Link from "next/link";
import { Apple, Monitor } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { appSection } from "@/lib/content";

const icons = { ios: Apple, web: Monitor };

export function AppSection() {
  return (
    <section aria-labelledby="app-eyebrow" className="@container">
      <Eyebrow id="app-eyebrow">{appSection.eyebrow}</Eyebrow>
      <div className="mt-4 flex flex-col gap-5 rounded-[var(--radius-card)] border border-hairline bg-card p-6 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:p-8">
        <div className="flex flex-col gap-2">
          <h2 className="type-section">{appSection.heading}</h2>
          <p className="type-body max-w-[46ch]">{appSection.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {appSection.buttons.map((button) => {
            const Icon = icons[button.id];
            return (
              <Link
                key={button.id}
                href={button.href}
                className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[var(--radius-control)] border border-hairline px-5 text-[0.9375rem] font-medium"
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
