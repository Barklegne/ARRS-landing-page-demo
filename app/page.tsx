import { HeroBento } from "@/components/sections/HeroBento";
import { SessionTicker } from "@/components/sections/SessionTicker";
import { DestinationTier } from "@/components/sections/DestinationTier";
import { MeetingCommandCenter } from "@/components/sections/MeetingCommandCenter";
import { StoreSection } from "@/components/sections/StoreSection";
import { AppSection } from "@/components/sections/AppSection";
import { NextYearBand } from "@/components/sections/NextYearBand";
import { RevealFallback } from "@/components/ui/RevealFallback";
import { tiers } from "@/lib/content";

export default function Home() {
  return (
    <main id="main">
      <RevealFallback />
      <HeroBento />
      <SessionTicker />
      <StoreSection />
      <div className="tiers-field">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-14 px-5 py-14 lg:gap-16 lg:py-16">
          <MeetingCommandCenter />
          {tiers.map((tier) => (
            <DestinationTier key={tier.id} tier={tier} />
          ))}
          <AppSection />
        </div>
      </div>
      <NextYearBand />
    </main>
  );
}
