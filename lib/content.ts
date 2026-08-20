import {
  Award,
  BadgeCheck,
  CalendarDays,
  HandCoins,
  Handshake,
  Key,
  Laptop,
  List,
  MapPin,
  Presentation,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export type AppRoute =
  | "/"
  | "/watch"
  | "/resume"
  | "/search"
  | "/explore"
  | "/schedule"
  | "/sessions"
  | "/posters"
  | "/credit"
  | "/abstracts"
  | "/key-case-challenge"
  | "/connection-quad"
  | "/lunch-symposia"
  | "/in-person"
  | "/awardees"
  | "/donor-wall"
  | "/sponsors"
  | "/store"
  | "/app/ios"
  | "/app/web"
  | "/save-the-date"
  | "/register"
  | "/terms"
  | "/contact";

export type Span = "wide" | "wide-mobile";

export interface Destination {
  readonly id: string;
  readonly label: string;
  readonly href: AppRoute;
  readonly icon: LucideIcon;
  readonly meta?: string;
  readonly span?: Span;
}

export interface Tier {
  readonly id: string;
  readonly eyebrow: string;
  readonly size: "large" | "medium";
  readonly items: readonly Destination[];
}

export const meeting = {
  society: "American Roentgen Ray Society",
  societyShort: "ARRS",
  portal: "2026 ARRS Annual Meeting Portal",
  place: "Pittsburgh, April 12–15, 2026",
  formats: "In person · Virtual · On demand",
  website: "https://www.arrs.org",
} as const;

export const hero = {
  eyebrow: "PITTSBURGH — APRIL 12–15, 2026",
  // Each headline is a lead plus a marked phrase, so the marker always lands
  // on line two and the rotation reads as one composition rather than a carousel.
  headlines: [
    { lead: "Welcome to", accent: "ARRS 2026" },
    { lead: "The 2026 meeting,", accent: "still open" },
    { lead: "Every session,", accent: "still yours" },
  ],
  body:
    "Every session, poster, and abstract from Pittsburgh \u2014 yours until April 15, 2027.",
  primaryCta: { label: "Watch on demand", href: "/watch" },
  secondaryCta: { label: "Register", href: "/register" },
  statusPill: "On demand through Apr 2027",
  image: {
    // Chest radiograph by Umanoide on Unsplash, run at 12% opacity and
    // desaturated so it reads as tonal texture rather than a clinical image.
    src: "https://images.unsplash.com/photo-1616012480717-fd9867059ca0?auto=format&fit=crop&w=2400&q=70",
    credit: "Umanoide on Unsplash",
  },
} as const;

export const cme = {
  claimed: 18,
  total: 32,
  railLabel: "18 of 32 credits",
  href: "/credit",
  action: "Claim the rest",
} as const;

export const upNext = {
  label: "UP NEXT IN YOUR SCHEDULE",
  title: "MSK intervention updates",
  speaker: "Dr. Alana Whitfield",
  progress: 0.38,
  href: "/resume",
} as const;

export const statRail = [
  { id: "sessions", count: 412, label: "Sessions", href: "/sessions" },
  { id: "posters", count: 1860, label: "Posters", href: "/posters" },
] as const;

// Stock portraits standing in for attendee photos. These are placeholders and
// must be replaced before this is shown as anything but a mockup — they are real
// people who did not attend ARRS.
const face = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=3&w=96&h=96&q=70`;

export const attendees = {
  faces: [
    { id: "a", src: face("photo-1560250097-0b93528c311a") },
    { id: "b", src: face("photo-1573496359142-b8d87734a5a2") },
    { id: "c", src: face("photo-1500648767791-00dcc994a43e") },
    { id: "d", src: face("photo-1494790108377-be9c29b29330") },
    { id: "e", src: face("photo-1519085360753-af0119f7cbe7") },
  ],
  count: "4,200 radiologists",
  suffix: "attended in Pittsburgh",
} as const;

export const player = {
  eyebrow: "NOW PLAYING",
  title: "MSK intervention updates",
  speaker: "Dr. Alana Whitfield",
  // youtube-nocookie: no tracking cookie is set unless playback begins.
  videoId: "FhaFRgcVnIU",
  close: "Close the player",
} as const;

export const register = {
  heading: "Create your ARRS account",
  body: "One account for the meeting portal, your saved schedule, and CME claims.",
  emailLabel: "Email address",
  emailPlaceholder: "you@hospital.org",
  passwordLabel: "Password",
  passwordPlaceholder: "Create a password",
  passwordHint: "8 characters minimum",
  showPassword: "Show password",
  hidePassword: "Hide password",
  submit: "Create account",
  divider: "Or continue with",
  // Microsoft over Facebook: hospital identity is overwhelmingly Entra/Azure AD,
  // so it is the provider a radiologist is most likely to already be signed into.
  social: [
    { id: "google", label: "Continue with Google" },
    { id: "apple", label: "Continue with Apple" },
    { id: "microsoft", label: "Continue with Microsoft" },
  ],
  mockNote: "This is a design mockup. No account was created and nothing was sent.",
  termsLead: "By continuing you agree to the",
  termsLink: "terms of use",
  close: "Close registration",
} as const;

export const search = {
  label: "Search sessions, posters, and abstracts",
  action: "/search",
  submit: "Search",
  examples: ["dose reduction", "breast imaging AI", "pediatric CT"],
} as const;

export const ticker = [
  "NOW STREAMING — THORACIC KEY CASE CHALLENGE",
  "MSK INTERVENTION UPDATES",
  "PEDIATRIC DOSE REDUCTION",
  "AI IN EMERGENCY RADIOLOGY",
] as const;

export const tiers: readonly Tier[] = [
  {
    id: "your-meeting",
    eyebrow: "YOUR MEETING",
    size: "large",
    items: [
      {
        id: "schedule",
        label: "My schedule",
        href: "/schedule",
        icon: CalendarDays,
        meta: "6 sessions saved across four days.",
        span: "wide",
      },
      { id: "sessions", label: "Sessions", href: "/sessions", icon: Presentation, meta: "412 available" },
      { id: "posters", label: "Online posters", href: "/posters", icon: Laptop, meta: "1,860 posters" },
      { id: "credit", label: "Claim credit", href: "/credit", icon: BadgeCheck, meta: "18 of 32 claimed" },
      { id: "abstracts", label: "Abstracts", href: "/abstracts", icon: List },
    ],
  },
  {
    id: "explore-and-connect",
    eyebrow: "EXPLORE AND CONNECT",
    size: "medium",
    items: [
      { id: "key-case-challenge", label: "Key case challenge", href: "/key-case-challenge", icon: Key },
      { id: "connection-quad", label: "Connection quad", href: "/connection-quad", icon: Users },
      { id: "lunch-symposia", label: "Lunch symposia", href: "/lunch-symposia", icon: Utensils },
      { id: "in-person", label: "In-person info and floorplans", href: "/in-person", icon: MapPin },
    ],
  },
  {
    id: "recognition-and-support",
    eyebrow: "RECOGNITION AND SUPPORT",
    size: "medium",
    items: [
      { id: "awardees", label: "Awardees", href: "/awardees", icon: Award },
      { id: "donor-wall", label: "Donor wall", href: "/donor-wall", icon: HandCoins },
      { id: "sponsors", label: "Sponsors", href: "/sponsors", icon: Handshake, span: "wide-mobile" },
    ],
  },
];

export interface Product {
  readonly id: string;
  readonly name: string;
  /**
   * Local 4:5 artwork under `public/store/`. Left undefined until real
   * photography exists, which falls the card back to a labelled placeholder.
   * Generation brief: `resources/store-image-brief.md`.
   */
  readonly src?: string;
  /**
   * Set when the artwork is not 4:5. `cover` would crop it to fit the stage —
   * mugs.webp is 1402x1122 landscape and lost 18% off each side, taking both
   * handles with it. `contain` shows the whole frame; pair it with `ground` so
   * the letterbox reads as the photo's own backdrop rather than as bars.
   */
  readonly fit?: "cover" | "contain";
  /** The artwork's own background, sampled from its corners. */
  readonly ground?: string;
}

export const store = {
  eyebrow: "THE ARRS STORE",
  heading: "Take the meeting home.",
  body: "Roentgen Ray apparel, mugs, and RADRES merch.",
  cta: { label: "Shop the store", href: "/store" },
  /** Milliseconds the deck holds a product before advancing. */
  dwell: 5600,
  products: [
    { id: "hoodie", name: "Hoodie", src: "/store/hoodie-navy.webp" },
    { id: "roentgen-ray-tee", name: "Roentgen Ray tee", src: "/store/roentgen-ray-tee.webp" },
    { id: "mugs", name: "Mugs", src: "/store/mugs.webp" },
    { id: "radres-tee", name: "RADRES tee", src: "/store/radres-tee.webp" },
  ],
} as const satisfies {
  readonly eyebrow: string;
  readonly heading: string;
  readonly body: string;
  readonly cta: { readonly label: string; readonly href: AppRoute };
  readonly dwell: number;
  readonly products: readonly Product[];
};

export const productImage = (product: Product) =>
  product.src ??
  `https://placehold.co/1000x1250/061C2E/9AB1C6.png?text=${encodeURIComponent(product.name)}`;

export const appSection = {
  eyebrow: "THE PORTAL APP",
  heading: "Discover Roentgen 2026",
  body: "Take the portal with you. Your schedule syncs across devices.",
  buttons: [
    { id: "ios", label: "App Store", href: "/app/ios" },
    { id: "web", label: "Web app", href: "/app/web" },
  ],
} as const;

export const nextYear = {
  eyebrow: "NEXT YEAR",
  heading: "The learning doesn't stop here",
  body: "ARRS 2027 takes place in Denver.",
  cta: { label: "Save the date", href: "/save-the-date" },
} as const;

// Full list for the mobile menu, which is the only navigation on small screens.
export const nav = [
  { id: "sessions", label: "Sessions", href: "/sessions" },
  { id: "posters", label: "Online posters", href: "/posters" },
  { id: "schedule", label: "My schedule", href: "/schedule" },
  { id: "credit", label: "Claim credit", href: "/credit" },
] as const;

// Desktop header keeps only the two browse destinations; schedule and credit
// are already the two most prominent cards in the tier below.
export const headerNav = nav.slice(0, 2);


export const tabs = [
  { id: "home", label: "Home", href: "/" },
  { id: "schedule", label: "Schedule", href: "/schedule" },
  { id: "explore", label: "Explore", href: "/explore" },
  { id: "credits", label: "Credits", href: "/credit" },
] as const;

export const footer = {
  links: [
    { id: "terms", label: "Terms of use", href: "/terms" },
    { id: "contact", label: "Contact", href: "/contact" },
    { id: "sponsors", label: "Sponsors", href: "/sponsors" },
  ],
  // Taken from the live links published on arrs.org, not guessed.
  social: [
    { id: "facebook", label: "ARRS on Facebook", href: "https://www.facebook.com/americanroentgenraysociety" },
    { id: "x", label: "ARRS on X", href: "https://x.com/ARRS_Radiology" },
    { id: "instagram", label: "ARRS on Instagram", href: "https://www.instagram.com/arrs_radiology/" },
    { id: "linkedin", label: "ARRS on LinkedIn", href: "https://www.linkedin.com/company/arrs" },
    { id: "youtube", label: "ARRS on YouTube", href: "https://www.youtube.com/user/ARRSTube" },
  ],
  legal: "Copyright © 2026 American Roentgen Ray Society, ARRS. All rights reserved.",
} as const;

export interface Stub {
  readonly title: string;
  readonly body: string;
}

export const stubs = {
  "/watch": { title: "Watch on demand", body: "The on-demand library for the 2026 meeting would open here." },
  "/resume": { title: "Resume last session", body: "Playback would resume from wherever you stopped." },
  "/search": { title: "Search", body: "Results across sessions, posters, and abstracts would appear here." },
  "/explore": { title: "Explore", body: "Everything outside your own schedule, in one place." },
  "/schedule": { title: "My schedule", body: "The six sessions you saved, grouped by day." },
  "/sessions": { title: "Sessions", body: "All 412 sessions available on demand." },
  "/posters": { title: "Online posters", body: "All 1,860 posters from the 2026 meeting." },
  "/credit": { title: "Claim credit", body: "Claim the remaining 14 of your 32 CME credits." },
  "/abstracts": { title: "Abstracts", body: "Accepted abstracts from the 2026 meeting." },
  "/key-case-challenge": { title: "Key case challenge", body: "Work through the case sets at your own pace." },
  "/connection-quad": { title: "Connection quad", body: "Find and message other attendees." },
  "/lunch-symposia": { title: "Lunch symposia", body: "Industry-supported sessions from the meeting." },
  "/in-person": { title: "In-person info and floorplans", body: "Venue details and floorplans for Pittsburgh." },
  "/awardees": { title: "Awardees", body: "The 2026 ARRS award recipients." },
  "/donor-wall": { title: "Donor wall", body: "Everyone who supported the society this year." },
  "/sponsors": { title: "Sponsors", body: "The organisations supporting the 2026 meeting." },
  "/store": { title: "The ARRS store", body: "Roentgen Ray apparel, mugs, and RADRES merch." },
  "/app/ios": {
    title: "App Store",
    body: "This would link to the Roentgen 2026 listing on the App Store. No store URL is invented here.",
  },
  "/app/web": { title: "Web app", body: "The installable web version of the portal would open here." },
  "/save-the-date": { title: "Save the date", body: "ARRS 2027 takes place in Denver." },
  "/register": {
    title: "Register",
    body: "Registration for the 2027 ARRS Annual Meeting in Denver. The 2026 meeting has ended; everything from it stays available here through April 15, 2027.",
  },
  "/terms": { title: "Terms of use", body: "The society's terms of use." },
  "/contact": { title: "Contact", body: "How to reach the ARRS team." },
} as const satisfies Record<string, Stub>;

export type StubRoute = keyof typeof stubs;
