import Link from "next/link";
import { ArrsLogo } from "@/components/ui/ArrsLogo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { footer, meeting } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <ArrsLogo className="size-9 shrink-0" />
              <span className="text-[0.9375rem] text-paper">{meeting.portal}</span>
            </div>
            <p className="type-micro text-on-dark">{meeting.formats}</p>
            <a
              href={meeting.website}
              target="_blank"
              rel="noopener noreferrer"
              className="type-body inline-flex min-h-11 items-center self-start text-on-dark underline underline-offset-4"
            >
              {meeting.society}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-1">
            {footer.links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="inline-flex min-h-11 items-center text-[0.9375rem] text-on-dark hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <ul className="flex flex-wrap items-center gap-2">
          {footer.social.map((profile) => (
            <li key={profile.id}>
              <a
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.label}
                className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] border border-ink-line text-on-dark hover:text-paper"
              >
                <SocialIcon id={profile.id} className="size-5" />
              </a>
            </li>
          ))}
        </ul>

        <p className="type-body border-t border-ink-line pt-6 text-on-dark">
          {footer.legal}
        </p>
      </div>
    </footer>
  );
}
