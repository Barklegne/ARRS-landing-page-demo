import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { stubs, type StubRoute } from "@/lib/content";

export function StubPage({ route }: { route: StubRoute }) {
  const { title, body } = stubs[route];

  return (
    <main
      id="main"
      className="mx-auto flex min-h-[60vh] max-w-[42rem] flex-col justify-center gap-5 px-5 py-20"
    >
      <p className="type-micro text-body">2026 ARRS Annual Meeting Portal</p>
      <h1 className="type-hero">{title}</h1>
      <p className="type-body max-w-prose">{body}</p>
      <p className="type-body max-w-prose">
        This is a stub route in a design mockup, not a built-out destination.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 self-start text-[0.9375rem] text-blue underline underline-offset-4"
      >
        <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
        Back to the portal
      </Link>
    </main>
  );
}
