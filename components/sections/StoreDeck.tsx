"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { productImage, store, type Product } from "@/lib/content";

const products: readonly Product[] = store.products;
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

  // One lap, then it rests. An indefinite loop is motion with nothing left to
  // say once you have seen all four, and it keeps pulling the eye back for the
  // whole time the section is on screen.
  const [lapDone, setLapDone] = useState(false);
  const advances = useRef(0);

  useEffect(() => {
    if (held || lapDone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      advances.current += 1;
      setActive((i) => (i + 1) % count);
      if (advances.current >= count) setLapDone(true);
    }, store.dwell);
    return () => window.clearInterval(id);
  }, [held, lapDone]);

  const resting = held || lapDone;

  // Horizontal drag/swipe on the stage. Vertical intent is left alone so the
  // page still scrolls through the card — hence touch-action: pan-y and the
  // requirement that horizontal travel clearly dominates.
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (event: React.PointerEvent) => {
    swipe.current = { x: event.clientX, y: event.clientY };
  };

  // Functional updater, not `active + direction`. Closing over `active` meant
  // two clicks fired before React re-rendered both computed from the same
  // stale index, so a rapid double-tap on Previous moved one step, not two.
  const step = useCallback((direction: 1 | -1) => {
    setActive((i) => (i + direction + count) % count);
    setHeld(true);
  }, []);

  const onPointerUp = (event: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy) * 1.4) return;

    event.preventDefault();
    step(dx < 0 ? 1 : -1);
  };

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
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipe.current = null;
        }}
        className="relative mx-auto w-full max-w-[22rem] shrink-0 touch-pan-y select-none md:mx-0 md:max-w-none md:w-[clamp(18rem,40vw,27rem)] lg:w-[clamp(21rem,32vw,27rem)]"
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
                  style={product.ground ? { backgroundColor: product.ground } : undefined}
                  className="store-card group relative block h-full overflow-hidden rounded-[var(--radius-card)]"
                >
                  <Image
                    src={productImage(product)}
                    alt={`${product.name} from the ARRS store`}
                    fill
                    sizes="(min-width: 1024px) 26rem, 76vw"
                    className={`transition-transform duration-700 ease-[var(--ease-hero)] group-hover:scale-[1.03] ${
                      product.fit === "contain" ? "object-contain" : "object-cover"
                    }`}
                  />
                  {/* The name is already the index row two columns left, so
                      printing it again here was redundant. The link keeps its
                      aria-label, so nothing is lost for assistive tech. A dark
                      chip rather than a bare icon, because the artwork behind
                      it ranges from near-black navy to brand yellow. */}
                  {/* Only the front card gets one. The cards behind are inert,
                      so an affordance there points at nothing — and three
                      yellow discs stacked together read as noise. */}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-ink/65 text-brand backdrop-blur-sm transition-[scale,background-color] duration-200 ease-[var(--ease-hero)] group-hover:scale-110 group-hover:bg-ink/85"
                    >
                      <ArrowUpRight className="size-4" strokeWidth={2} />
                    </span>
                  ) : null}
                </Link>
              </div>
            );
          })}
        </div>
      {/* Explicit prev/next under the stage, because the deck's other two
          affordances are both discovery-dependent: you have to guess it is
          swipeable, or notice the rows are clickable. */}
      <div className="mt-5 flex items-center justify-center gap-2 md:justify-start">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous product"
          className="deck-nav flex size-11 items-center justify-center rounded-full"
        >
          <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next product"
          className="deck-nav flex size-11 items-center justify-center rounded-full"
        >
          <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </button>
        <span aria-hidden="true" className="type-micro ml-2 text-on-dark/80">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
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
              className="group relative flex min-h-11 items-center gap-3.5 border-t border-paper/12 text-left last:border-b"
            >
              <span
                className={`type-micro text-[0.6875rem] transition-colors duration-200 ${
                  isActive ? "text-brand" : "text-on-dark/80"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-[0.9375rem] tracking-[-0.01em] transition-colors duration-200 ${
                  isActive ? "text-paper" : "text-on-dark/80 group-hover:text-paper"
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
                    key={`${active}-${String(resting)}`}
                    style={{ "--store-dwell": `${store.dwell}ms` } as React.CSSProperties}
                    className={`block h-full w-full bg-brand ${resting ? "" : "store-dwell"}`}
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
