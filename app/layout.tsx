import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { RayAssistant } from "@/components/ui/RayAssistant";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { MobileTabBar } from "@/components/sections/MobileTabBar";
import { StickyCtaBar } from "@/components/sections/StickyCtaBar";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "2026 ARRS Annual Meeting Portal",
  description:
    "Every session, poster, and abstract from the 2026 ARRS Annual Meeting in Pittsburgh, available on demand through April 15, 2027.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="pad-for-bottom-chrome" suppressHydrationWarning>
        <a
          href="#main"
          className="skip-link"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileTabBar />
        <StickyCtaBar />
        <RayAssistant />
      </body>
    </html>
  );
}
