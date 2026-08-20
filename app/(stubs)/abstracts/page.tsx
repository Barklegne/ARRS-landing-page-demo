import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";

export const metadata: Metadata = {
  title: "Abstracts — 2026 ARRS Annual Meeting Portal",
};

export default function Page() {
  return <StubPage route="/abstracts" />;
}
