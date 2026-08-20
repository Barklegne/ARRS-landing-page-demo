export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="surface-glass type-micro inline-flex items-center gap-2.5 rounded-full px-3.5 py-2 text-on-dark">
      <span aria-hidden="true" className="relative flex size-1.5">
        <span className="live-dot absolute inset-0 rounded-full bg-on-dark" />
      </span>
      {children}
    </span>
  );
}
