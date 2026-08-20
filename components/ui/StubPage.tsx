import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { assistant, stubs, type StubRoute } from "@/lib/content";

export function StubPage({ route }: { route: StubRoute }) {
  const { title, body } = stubs[route];

  return (
    <main id="main" className="stub-field relative isolate overflow-clip">
      <span aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
      <span aria-hidden="true" className="stub-floor pointer-events-none absolute inset-x-0 bottom-0 h-44" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-[64rem] flex-col items-start justify-center gap-10 px-5 py-24 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex max-w-[38rem] flex-col gap-5">
          <p className="type-micro text-on-dark">2026 ARRS Annual Meeting Portal</p>
          <h1 className="type-hero text-paper">{title}</h1>
          <p className="type-body-on-dark text-on-dark">{body}</p>
          <p className="type-body-on-dark text-on-dark">
            This is a stub route in a design mockup, not a built-out destination.
          </p>
          <Link
            href="/"
            className="app-cta mt-3 inline-flex min-h-11 items-center gap-2 self-start rounded-[var(--radius-control)] px-5 text-[0.9375rem] font-medium"
          >
            <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
            Back to the portal
          </Link>
        </div>

        {/* The portrait is shot on white, so it sits on its own light plate
            rather than being faded into the navy — a white cut-out floating on
            a dark page reads as a broken transparency, not as a mascot. */}
        <div className="ray-plate relative hidden w-[15rem] shrink-0 overflow-clip rounded-[var(--radius-panel)] lg:block">
          <Image
            src={assistant.portrait}
            alt=""
            width={1024}
            height={1536}
            sizes="240px"
            className="relative block w-full translate-y-1 object-contain"
          />
        </div>
      </div>
    </main>
  );
}
