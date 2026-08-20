export function Eyebrow({
  children,
  tone = "paper",
  id,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  tone?: "paper" | "dark" | "brand";
  id?: string;
  // The destination tiers carry no other heading, so their eyebrow is the
  // section's real h2 — otherwise heading navigation skips the whole grid.
  as?: "span" | "h2";
}) {
  const text =
    tone === "dark" ? "text-on-dark" : tone === "brand" ? "text-brand-ink" : "text-body";
  // On navy the rule fades out to the right rather than stopping as a hard
  // line, so the eyebrow reads as a label with a trailing rule instead of a
  // full-width divider competing with the cards beneath it.
  const rule =
    tone === "dark"
      ? "bg-linear-to-r from-paper/16 to-transparent"
      : tone === "brand"
        ? "bg-brand-ink/30"
        : "bg-hairline";

  return (
    <div className="flex items-center gap-4">
      <Tag id={id} className={`type-micro shrink-0 ${text}`}>
        {children}
      </Tag>
      <span aria-hidden="true" className={`h-px flex-1 ${rule}`} />
    </div>
  );
}
