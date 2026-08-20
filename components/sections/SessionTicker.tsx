import { ticker } from "@/lib/content";

// Ambient only — the same sessions are reachable through /sessions,
// so the strip is hidden from assistive technology.
export function SessionTicker() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-ink-line bg-ink py-3"
    >
      <div className="marquee flex w-max items-center whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {ticker.map((item) => (
              <span key={item} className="flex items-center">
                <span className="type-micro px-6 text-on-dark">{item}</span>
                <span className="size-1 rounded-full bg-ink-line" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
