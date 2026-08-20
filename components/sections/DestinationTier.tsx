import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Tier } from "@/lib/content";

const columns: Record<string, string> = {
  "your-meeting": "@3xl:grid-cols-3",
  "explore-and-connect": "@3xl:grid-cols-4",
  "recognition-and-support": "@3xl:grid-cols-3",
};

export function DestinationTier({ tier }: { tier: Tier }) {
  return (
    <section aria-labelledby={`${tier.id}-eyebrow`} className="@container">
      <Eyebrow id={`${tier.id}-eyebrow`} as="h2" tone="dark">
        {tier.eyebrow}
      </Eyebrow>
      <div className={`mt-4 grid grid-cols-2 gap-3 ${columns[tier.id]}`}>
        {tier.items.map((destination) => (
          <Card
            key={destination.id}
            destination={destination}
            size={tier.size}
            highlight={destination.id === "schedule"}
          />
        ))}
      </div>
    </section>
  );
}
