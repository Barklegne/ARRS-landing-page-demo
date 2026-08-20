"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { productImage, store } from "@/lib/content";

const products = store.products;
const count = products.length;

// Depth slots, front to back. Card width is 76% of the stage, so the deepest
// offset lands at ~96% — the peek stays inside the stage and cannot create
// horizontal overflow at any width.
const slots = [
  "z-40 translate-x-0 scale-100 opacity-100",
  "z-30 translate-x-[13%] scale-[0.94] opacity-95",
  "z-20 translate-x-[25%] scale-[0.88] opacity-70",
  "z-10 translate-x-[25%] scale-[0.88] opacity-0",
] as const;

export function StoreDeck() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Once someone drives the deck themselves, it stops advancing under them.
  const takeOver = useCallback((next: number) => {
    setActive(next);
    setHeld(true);
  }, []);

  useEffect(() => {
    if (held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setActive((i) => (i + 1) % count),
      store.dwell,
    );
    return () => window.clearInterval(id);
  }, [held]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? -1
          : 0;

    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? count - 1
          : step
            ? (active + step + count) % count
            : -1;

    if (next < 0) return;
    event.preventDefault();
    takeOver(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row-reverse md:items-center md:gap-10 lg:gap-14">
      <div
        id="store-stage"
        role="tabpanel"
        aria-labelledby={`store-tab-${products[active].id}`}
        className="relative mx-auto w-full max-w-[22rem] shrink-0 md:mx-0 md:max-w-none md:w-[clamp(18rem,40vw,27rem)] lg:w-[clamp(21rem,32vw,27rem)]"
      >
        <div className="relative aspect-20/19">
          <div
            aria-hidden="true"
            className="store-halo pointer-events-none absolute inset-0"
          />
          {products.map((product, i) => {
            const slot = (i - active + count) % count;
            const isActive = slot === 0;

            return (
              <div
                key={product.id}
                inert={!isActive}
                className={`store-slot absolute inset-y-0 left-0 w-[76%] ${slots[slot]}`}
              >
                <Link
                  href={store.cta.href}
                  tabIndex={isActive ? undefined : -1}
                  aria-label={`${product.name} — shop the store`}
                  className="store-card group relative block h-full overflow-hidden rounded-[var(--radius-card)]"
                >
                  <Image
                    src={productImage(product)}
                    alt={`${product.name} from the ARRS store`}
                    fill
                    sizes="(min-width: 1024px) 26rem, 76vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-hero)] group-hover:scale-[1.03]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-linear-to-t from-ink/85 to-transparent px-4 pt-12 pb-4"
                  >
                    <span className="type-card text-paper">{product.name}</span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-on-dark"
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div
        role="tablist"
        aria-label="ARRS store products"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHeld(true)}
        onFocus={() => setHeld(true)}
        className="flex w-full flex-col md:max-w-[20rem] lg:max-w-[22rem]"
      >
        {products.map((product, i) => {
          const isActive = i === active;

          return (
            <button
              key={product.id}
              id={`store-tab-${product.id}`}
              ref={(node) => {
                tabs.current[i] = node;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="store-stage"
              tabIndex={isActive ? 0 : -1}
              onClick={() => takeOver(i)}
              className="group relative flex min-h-12 items-center gap-4 border-t border-paper/12 text-left last:border-b"
            >
              <span
                className={`type-micro transition-colors duration-200 ${
                  isActive ? "text-brand" : "text-on-dark/75"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`type-card transition-colors duration-200 ${
                  isActive ? "text-paper" : "text-on-dark/70 group-hover:text-paper"
                }`}
              >
                {product.name}
              </span>

              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-paper/20"
                >
                  <span
                    key={`${active}-${String(held)}`}
                    style={{ "--store-dwell": `${store.dwell}ms` } as React.CSSProperties}
                    className={`block h-full w-full bg-brand ${held ? "" : "store-dwell"}`}
                  />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
