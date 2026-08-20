import Link from "next/link";
import type { Destination } from "@/lib/content";

const spanClass: Record<NonNullable<Destination["span"]>, string> = {
  wide: "col-span-2",
  "wide-mobile": "col-span-2 @3xl:col-span-1",
};

export function Card({
  destination,
  size,
  highlight = false,
}: {
  destination: Destination;
  size: "large" | "medium";
  highlight?: boolean;
}) {
  const { label, href, icon: Icon, meta, span } = destination;
  const isLarge = size === "large";

  return (
    <Link
      href={href}
      className={[
        "group flex min-h-[104px] flex-col justify-between rounded-[var(--radius-card)] border",
        isLarge ? "gap-6 p-4 @3xl:min-h-[150px] @3xl:p-5" : "gap-5 p-4",
        highlight
          ? "border-transparent bg-brand text-brand-ink"
          : "tier-card text-paper hover:tier-card-hover",
        span ? spanClass[span] : "",
      ].join(" ")}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.5}
        className={isLarge ? "size-6 @3xl:size-7" : "size-5"}
      />
      <span className="flex flex-col gap-1.5">
        <span className="type-card">{label}</span>
        {meta ? (
          <span
            className={`type-body ${highlight ? "text-brand-ink/80" : "text-on-dark"}`}
          >
            {meta}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
