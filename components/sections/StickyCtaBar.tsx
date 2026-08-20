import { CTA } from "@/components/ui/CTA";
import { hero } from "@/lib/content";

// Required by the responsive table: between 640px and 1024px the tab bar is
// hidden, so the primary action still needs a persistent way back.
export function StickyCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-ink-line bg-ink pb-[env(safe-area-inset-bottom)] sm:block lg:hidden">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-2.5">
        <p className="type-micro text-on-dark">{hero.statusPill}</p>
        <div className="flex items-center gap-3">
          <CTA href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </CTA>
          <CTA href={hero.primaryCta.href}>{hero.primaryCta.label}</CTA>
        </div>
      </div>
    </div>
  );
}
