import Link from "next/link";
import { ArrsLogo } from "@/components/ui/ArrsLogo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { footer, meeting, type FooterLink } from "@/lib/content";

function FooterAnchor({ link }: { link: FooterLink }) {
  const className =
    "footer-link inline-flex min-h-9 items-center text-[0.9375rem] text-on-dark";

  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer-field relative isolate overflow-hidden text-paper">
      <span aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1200px] px-5 py-14 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-6 lg:max-w-[26rem]">
            <div className="flex items-center gap-3.5">
              <ArrsLogo className="size-10 shrink-0" />
              <span className="flex flex-col">
                <span className="text-[1.0625rem] tracking-[-0.01em] text-paper">{meeting.societyShort}</span>
                <span className="type-micro text-on-dark">{meeting.society}</span>
              </span>
            </div>

            <p className="type-section max-w-[16ch] text-balance text-paper">
              {footer.tagline}
            </p>

            {/* The society's three pillars. Yellow separators rather than
                middots — the only ornament in the footer, and it lands on the
                one line that is purely brand. */}
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {footer.pillars.map((pillar, i) => (
                <li key={pillar} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span aria-hidden="true" className="size-1 rounded-full bg-brand" />
                  ) : null}
                  <span className="type-micro text-paper">{pillar}</span>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-14"
          >
            {footer.columns.map((column) => (
              <div key={column.id} className="flex flex-col gap-3">
                <h2 className="type-micro text-on-dark/85">{column.title}</h2>
                <ul className="flex flex-col gap-0.5">
                  {column.links.map((link) => (
                    <li key={link.id}>
                      <FooterAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-ink-line pt-8 sm:mt-14 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap items-center gap-2">
            {footer.social.map((profile) => (
              <li key={profile.id}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.label}
                  className="social-chip inline-flex size-11 items-center justify-center rounded-full"
                >
                  <SocialIcon id={profile.id} className="size-[1.125rem]" />
                </a>
              </li>
            ))}
          </ul>

          <p className="type-micro text-on-dark/70">{meeting.formats}</p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-ink-line pt-6 text-on-dark/70 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.8125rem]">{footer.legal}</p>
          <p className="type-micro">{meeting.place}</p>
        </div>
      </div>
    </footer>
  );
}
