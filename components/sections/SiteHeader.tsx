import Link from "next/link";
import { ArrsLogo } from "@/components/ui/ArrsLogo";
import { Pill } from "@/components/ui/Pill";
import { MobileMenu } from "./MobileMenu";
import { HeaderNav } from "@/components/sections/HeaderNav";
import { hero, meeting } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-line bg-ink">
      <div className="relative mx-auto flex max-w-[1200px] items-center gap-4 px-5 py-3">
        <Link href="/" className="flex min-h-11 items-center gap-3">
          <ArrsLogo className="size-9 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="text-[0.9375rem] font-medium text-paper">
              {meeting.societyShort}
            </span>
            <span className="type-micro text-on-dark">2026 Meeting Portal</span>
          </span>
        </Link>

        <HeaderNav />


        <div className="ml-auto hidden lg:block">
          <Pill>{hero.statusPill}</Pill>
        </div>

        <div className="ml-auto lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
