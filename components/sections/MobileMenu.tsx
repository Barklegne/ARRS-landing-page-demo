"use client";

import { useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { nav, hero } from "@/lib/content";

// Native <dialog> is used deliberately: showModal() gives the focus trap,
// Escape-to-close, background inertness and focus restoration for free,
// which a hand-rolled div would have to reimplement and a UI kit would
// have charged ~15KB of JS for.
export function MobileMenu() {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-label="Open menu"
        className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] border border-ink-line text-paper lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </button>

      <dialog
        ref={ref}
        aria-label="Portal menu"
        onClick={(event) => {
          if (event.target === ref.current) ref.current?.close();
        }}
        className="m-0 w-full max-w-none bg-transparent p-0 backdrop:bg-ink/70 open:fixed open:inset-0 open:flex open:items-start"
      >
        <div className="w-full bg-ink p-5 pb-8">
          <div className="flex items-center justify-between gap-4">
            <span className="type-micro text-on-dark">Menu</span>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] border border-ink-line text-paper"
            >
              <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Portal" className="mt-6 flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => ref.current?.close()}
                className="border-b border-ink-line py-3.5 text-[15px] text-paper"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={hero.primaryCta.href}
              onClick={() => ref.current?.close()}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] bg-brand px-5 text-[0.9375rem] font-medium text-brand-ink"
            >
              {hero.primaryCta.label}
            </Link>
          </nav>
        </div>
      </dialog>
    </>
  );
}
