"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { faq } from "@/lib/content";

// Hand-rolled rather than <details>: this Chrome build does not collapse a
// closed <details>, which measured 57x18 with a live offsetParent. A button
// plus aria-expanded is also what lets the whole row be the target.
export function FaqSection() {
  const [open, setOpen] = useState<string | null>(faq.items[0].id);
  const base = useId();

  return (
    <section aria-labelledby="faq-eyebrow" className="faq-field relative isolate overflow-clip">
      <span aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
      <span aria-hidden="true" className="faq-floor pointer-events-none absolute inset-x-0 bottom-0 h-44" />

      <div className="relative mx-auto max-w-[1200px] px-5 py-14 lg:py-20">
        <Eyebrow id="faq-eyebrow" tone="dark">
          {faq.eyebrow}
        </Eyebrow>

        <div className="mt-6 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div data-reveal="" className="tier-reveal flex flex-col items-start lg:sticky lg:top-28 lg:self-start">
            <h2 className="type-closing max-w-[12ch] text-paper">{faq.heading}</h2>
            <p className="type-body-on-dark mt-4 text-on-dark">{faq.body}</p>
          </div>

          <ul className="flex flex-col">
            {faq.items.map((item, index) => {
              const isOpen = open === item.id;
              const panelId = `${base}-${item.id}`;
              const labelId = `${panelId}-label`;
              return (
                <li
                  key={item.id}
                  data-reveal=""
                  style={{ "--i": Math.min(index, 5) } as React.CSSProperties}
                  className="tier-reveal faq-row"
                >
                  <h3>
                    <button
                      type="button"
                      id={labelId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : item.id)}
                      className="group flex w-full min-h-14 items-center justify-between gap-5 py-4 text-left"
                    >
                      <span className="type-faq-q text-paper">{item.q}</span>
                      <span
                        aria-hidden="true"
                        className="faq-mark flex size-9 shrink-0 items-center justify-center rounded-full"
                      >
                        {isOpen ? (
                          <Minus strokeWidth={1.75} className="size-4" />
                        ) : (
                          <Plus strokeWidth={1.75} className="size-4" />
                        )}
                      </span>
                    </button>
                  </h3>

                  {/* Grid-rows 0fr -> 1fr animates a height the content decides,
                      so no max-height guess can clip a long answer. */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={labelId}
                    inert={!isOpen}
                    className="faq-panel grid"
                    data-open={isOpen ? "" : undefined}
                  >
                    <div className="overflow-hidden">
                      <p className="type-body-on-dark max-w-[62ch] pb-5 pr-12 text-on-dark">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
