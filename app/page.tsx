import { HeroBento } from "@/components/sections/HeroBento";
import { SessionTicker } from "@/components/sections/SessionTicker";
import { DestinationTier } from "@/components/sections/DestinationTier";
import { StoreSection } from "@/components/sections/StoreSection";
import { AppSection } from "@/components/sections/AppSection";
import { NextYearBand } from "@/components/sections/NextYearBand";
import { tiers } from "@/lib/content";

export default function Home() {
  return (
    <main id="main">
      <HeroBento />
      <SessionTicker />
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14 px-5 py-14 lg:gap-16 lg:py-16">
        {tiers.map((tier) => (
          <DestinationTier key={tier.id} tier={tier} />
        ))}
        <StoreSection />
        <AppSection />
      </div>
      <NextYearBand />
    </main>
  );
}
