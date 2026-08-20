export function ArrsLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="American Roentgen Ray Society"
    >
      <rect width="40" height="40" rx="7" className="fill-ink" />
      <rect x="4" y="5" width="32" height="4" rx="1" className="fill-brand" />
      <g className="fill-brand">
        <rect x="5" y="22" width="4" height="10" />
        <rect x="10.5" y="17" width="4" height="15" />
        <rect x="16" y="13" width="5" height="19" />
        <rect x="22.5" y="19" width="4" height="13" />
        <rect x="28" y="24" width="4" height="8" />
      </g>
      <rect x="4" y="34" width="32" height="2" rx="1" className="fill-ink-line" />
    </svg>
  );
}
