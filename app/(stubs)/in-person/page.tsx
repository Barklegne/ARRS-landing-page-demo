import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";

export const metadata: Metadata = {
  title: "In-person info and floorplans — 2026 ARRS Annual Meeting Portal",
};

export default function Page() {
  return <StubPage route="/in-person" />;
}
