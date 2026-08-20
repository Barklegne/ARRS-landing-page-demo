import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CTA } from "@/components/ui/CTA";
import { StoreDeck } from "@/components/sections/StoreDeck";
import { store } from "@/lib/content";

export function StoreSection() {
  return (
    <section
      aria-labelledby="store-eyebrow"
      className="store-field relative isolate overflow-hidden text-paper"
    >
      <span aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-paper/12"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 py-14 lg:py-16">
        <Eyebrow id="store-eyebrow" tone="dark">
          {store.eyebrow}
        </Eyebrow>

        <div className="mt-6 grid gap-10 lg:mt-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-center lg:gap-12">
          <div className="flex flex-col items-start gap-4">
            <h2 className="type-section max-w-[14ch] text-paper">{store.heading}</h2>
            <p className="type-body-on-dark">{store.body}</p>
            <CTA href={store.cta.href} variant="glass" className="mt-2">
              {store.cta.label}
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
            </CTA>
          </div>

          <StoreDeck />
        </div>
      </div>
    </section>
  );
}
