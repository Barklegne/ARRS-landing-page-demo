export function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className={className}>
      <path fill="#4285F4" d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.614Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.181l-2.908-2.258c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.583-5.036-3.71H.957v2.331A8.997 8.997 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.964 10.71a5.41 5.41 0 0 1 0-3.42V4.958H.957a9 9 0 0 0 0 8.084l3.007-2.332Z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.346l2.582-2.582C13.463.892 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" />
    </svg>
  );
}

export function AppleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className={className} fill="currentColor">
      <path d="M13.03 9.57c.02 2.16 1.9 2.88 1.92 2.89-.01.05-.3 1.03-.99 2.04-.6.88-1.22 1.75-2.2 1.77-.96.02-1.27-.57-2.37-.57s-1.44.55-2.35.59c-.94.03-1.66-.95-2.26-1.83-1.23-1.79-2.17-5.05-.91-7.25a3.5 3.5 0 0 1 2.96-1.8c.93-.02 1.8.62 2.37.62s1.63-.77 2.75-.66c.47.02 1.79.19 2.63 1.42-.7.04-1.57.92-1.55 2.78ZM11.3 3.3c.5-.61.84-1.45.75-2.3-.72.03-1.6.48-2.12 1.08-.46.54-.87 1.4-.76 2.22.81.07 1.62-.4 2.13-1Z" />
    </svg>
  );
}

export function MicrosoftIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className={className}>
      <path fill="#F25022" d="M0 0h8.5v8.5H0z" />
      <path fill="#7FBA00" d="M9.5 0H18v8.5H9.5z" />
      <path fill="#00A4EF" d="M0 9.5h8.5V18H0z" />
      <path fill="#FFB900" d="M9.5 9.5H18V18H9.5z" />
    </svg>
  );
}
