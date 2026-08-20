import { CTA } from "@/components/ui/CTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { nextYear } from "@/lib/content";

export function NextYearBand() {
  return (
    <section aria-labelledby="next-year-eyebrow" className="bg-brand text-brand-ink">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-5 py-12 lg:py-16">
        <Eyebrow id="next-year-eyebrow" tone="brand">
          {nextYear.eyebrow}
        </Eyebrow>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="type-section max-w-[20ch]">{nextYear.heading}</h2>
            <p className="type-body">{nextYear.body}</p>
          </div>
          <CTA href={nextYear.cta.href} variant="onBrand" className="self-start lg:self-auto">
            {nextYear.cta.label}
          </CTA>
        </div>
      </div>
    </section>
  );
}
