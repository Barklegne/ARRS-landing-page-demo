const paths: Record<string, string> = {
  facebook:
    "M13.5 21v-8h2.69l.4-3.11H13.5V7.9c0-.9.25-1.51 1.54-1.51h1.65V3.6a22 22 0 0 0-2.4-.12c-2.38 0-4.01 1.45-4.01 4.12v2.29H7.58V13h2.7v8h3.22Z",
  x: "M17.53 3h3.06l-6.69 7.64L21.75 21h-6.16l-4.83-6.3L5.24 21H2.18l7.15-8.17L2.25 3h6.32l4.36 5.77L17.53 3Zm-1.07 16.15h1.7L7.62 4.77H5.8l10.66 14.38Z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001ZM3.2 21V9.24h3.56V21H3.2Zm6.02 0V9.24h3.41v1.61h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46V21h-3.56v-4.99c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.64V21H9.22Z",
  youtube:
    "M21.58 7.19a2.51 2.51 0 0 0-1.77-1.78C18.25 5 12 5 12 5s-6.25 0-7.81.41A2.51 2.51 0 0 0 2.42 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.51 2.51 0 0 0 1.77 1.78C5.75 19 12 19 12 19s6.25 0 7.81-.41a2.51 2.51 0 0 0 1.77-1.78A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z",
};

export function SocialIcon({ id, className = "" }: { id: string; className?: string }) {
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={paths[id]} />
    </svg>
  );
}
