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
  const rule =
    tone === "dark" ? "bg-ink-line" : tone === "brand" ? "bg-brand-ink/30" : "bg-hairline";

  return (
    <div className="flex items-center gap-4">
      <Tag id={id} className={`type-micro shrink-0 ${text}`}>
        {children}
      </Tag>
      <span aria-hidden="true" className={`h-px flex-1 ${rule}`} />
    </div>
  );
}
