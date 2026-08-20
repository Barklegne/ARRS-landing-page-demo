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

/**
 * Three display levels rather than two. Every destination is still present —
 * hierarchy comes from how much room each one gets, which is the whole
 * argument of the redesign.
 */
export type TierDisplay = "discovery" | "row" | "chip";

export interface Tier {
  readonly id: string;
  readonly eyebrow: string;
  readonly display: TierDisplay;
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
  railNote: "claimed so far",
  href: "/credit",
  // Everything the command-centre card shows is derived from claimed/total,
  // so changing either figure updates the badge, bar and remainder together.
  cardLabel: "CME CREDIT",
  cardNote: "credits claimed",
  cardAction: "Continue",
} as const;

/**
 * The next SAVED session, distinct from `upNext` above, which is the hero's
 * resume-playback card. Time, room, title and note are invented and are
 * recorded in the invented-data ledger in CLAUDE.md.
 */
export const scheduleNext = {
  pill: "UP NEXT",
  when: "10:30 AM · ROOM 301",
  title: "Advances in Abdominal Imaging",
  note: "Part of your saved schedule for today",
  saved: 6,
  savedNote: "sessions saved across four days",
  href: "/schedule",
  action: "View schedule",
} as const satisfies {
  readonly pill: string;
  readonly when: string;
  readonly title: string;
  readonly note: string;
  readonly saved: number;
  readonly savedNote: string;
  readonly href: AppRoute;
  readonly action: string;
};

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
    id: "explore-the-meeting",
    eyebrow: "EXPLORE THE MEETING",
    display: "discovery",
    items: [
      {
        id: "sessions",
        label: "Sessions",
        href: "/sessions",
        icon: Presentation,
        meta: "412 available",
      },
      {
        id: "posters",
        label: "Online posters",
        href: "/posters",
        icon: Laptop,
        meta: "1,860 posters",
      },
      {
        id: "abstracts",
        label: "Abstracts",
        href: "/abstracts",
        icon: List,
        meta: "Browse meeting research",
      },
    ],
  },
  {
    id: "explore-and-connect",
    eyebrow: "EXPLORE & CONNECT",
    display: "row",
    items: [
      { id: "key-case-challenge", label: "Key case challenge", href: "/key-case-challenge", icon: Key },
      { id: "connection-quad", label: "Connection quad", href: "/connection-quad", icon: Users },
      { id: "lunch-symposia", label: "Lunch symposia", href: "/lunch-symposia", icon: Utensils },
      { id: "in-person", label: "In-person info & floorplans", href: "/in-person", icon: MapPin },
    ],
  },
  {
    id: "recognition-and-support",
    eyebrow: "RECOGNITION & SUPPORT",
    display: "chip",
    items: [
      { id: "awardees", label: "Awardees", href: "/awardees", icon: Award },
      { id: "donor-wall", label: "Donor wall", href: "/donor-wall", icon: HandCoins },
      { id: "sponsors", label: "Sponsors", href: "/sponsors", icon: Handshake },
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
    { id: "ray-merch", name: "Roentgen Ray merch", src: "/store/ray-merch.webp" },
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

export const assistant = {
  name: "Ray",
  role: "Portal assistant",
  avatar: "/store/ray-Mascot.webp",
  /** Portrait used on the stub routes, beside the way back to the portal. */
  portrait: "/store/ray-hello.webp",
  launchLabel: "Open the portal assistant",
  disclosure: "Scripted demo — not a live assistant.",
  greeting: "Hi, I'm Ray. Ask me about sessions, credit or on-demand access.",
  prompts: [
    {
      id: "credit",
      q: "How many credits do I have left?",
      a: "You've claimed 18 of 32 credits, so 14 to go. Session evaluations have to be completed before a credit is granted.",
    },
    {
      id: "ondemand",
      q: "How long can I watch sessions?",
      a: "Every session, poster and abstract stays available on demand through April 15, 2027.",
    },
    {
      id: "next",
      q: "What's next on my schedule?",
      a: "Advances in Abdominal Imaging, 10:30 AM in Room 301. You have 6 sessions saved across four days.",
    },
    {
      id: "posters",
      q: "How many posters are there?",
      a: "1,860 online posters. They're not eligible for CME credit, but they're yours to browse for the full year.",
    },
  ],
} as const satisfies {
  readonly name: string;
  readonly role: string;
  readonly avatar: string;
  readonly portrait: string;
  readonly launchLabel: string;
  readonly disclosure: string;
  readonly greeting: string;
  readonly prompts: readonly {
    readonly id: string;
    readonly q: string;
    readonly a: string;
  }[];
};

export const appSection = {
  eyebrow: "THE PORTAL APP",
  badge: "ARRS 2026 \u00b7 IN YOUR POCKET",
  heading: "Your meeting goes where you go.",
  body: "Keep your schedule, sessions and meeting essentials together across devices.",
  buttons: [
    { id: "ios", label: "App Store", href: "/app/ios" },
    { id: "web", label: "Web app", href: "/app/web" },
  ],
} as const satisfies {
  readonly eyebrow: string;
  readonly badge: string;
  readonly heading: string;
  readonly body: string;
  readonly buttons: readonly {
    readonly id: "ios" | "web";
    readonly label: string;
    readonly href: AppRoute;
  }[];
};

// Verbatim from the society's own ARRS 2026 meeting page (www2.arrs.org/am26).
// Real content, not invented — the only editing is trimming each answer to the
// sentence that answers the question.
export const faq = {
  eyebrow: "BEFORE YOU GO",
  heading: "Questions, answered.",
  body: "The essentials on access, credit and eligibility for ARRS 2026.",
  items: [
    {
      id: "what-is",
      q: "What is the ARRS 2026 Annual Meeting?",
      a: "The premier event for radiology professionals seeking practical, cutting-edge education to elevate their clinical practice, where the global imaging community gathers to learn from world-renowned faculty.",
    },
    {
      id: "in-person",
      q: "Do I have to attend ARRS 2026 in person?",
      a: "No. You can join in Pittsburgh, watch online, or access sessions on demand for up to a year after the event — and switch between in person and virtual at no cost.",
    },
    {
      id: "cme",
      q: "How much CME does ARRS 2026 offer?",
      a: "Live activities provide up to 34.50 AMA PRA Category 1 Credits and on-demand content up to 227.00. Physicians should claim only the credit commensurate with the extent of their participation.",
    },
    {
      id: "who",
      q: "Who should attend the ARRS Annual Meeting?",
      a: "Radiologists at every career stage — residents, fellows, new attendings, mid-career and private practice radiologists, and academic radiologists presenting research.",
    },
    {
      id: "register",
      q: "When can I register for ARRS 2026?",
      a: "Registration for ARRS 2026 is available now through the end of the meeting on April 15.",
    },
    {
      id: "after",
      q: "Can I view sessions after the meeting?",
      a: "All registrants can access on-demand content and claim CME credits through April 15, 2027.",
    },
  ],
} as const satisfies {
  readonly eyebrow: string;
  readonly heading: string;
  readonly body: string;
  readonly items: readonly {
    readonly id: string;
    readonly q: string;
    readonly a: string;
  }[];
};

export const nextYear = {
  eyebrow: "LOOKING AHEAD \u00b7 2027",
  heading: "The learning doesn't stop here.",
  meeting: "ARRS 2027",
  place: "Denver",
  cta: { label: "Save the date", href: "/save-the-date" },
} as const satisfies {
  readonly eyebrow: string;
  readonly heading: string;
  readonly meeting: string;
  readonly place: string;
  readonly cta: { readonly label: string; readonly href: AppRoute };
};

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

export interface FooterLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export const footer = {
  /** The society's own tagline and pillars, supplied by the client. */
  tagline: "Your Medical Imaging Society",
  pillars: ["Connect", "Learn", "Advance"],
  /**
   * Grouped from destinations that already exist on the page — this is a
   * rearrangement of the twelve, not new content. The flat
   * Terms/Contact/Sponsors list from the inventory survives inside "Society".
   */
  columns: [
    {
      id: "meeting",
      title: "THE MEETING",
      // Every link here is a destination the page body already promotes and
      // the mobile tab bar already reaches, so on a phone this column is pure
      // duplication in the longest part of the page.
      hideBelowMd: true,
      links: [
        { id: "sessions", label: "Sessions", href: "/sessions" },
        { id: "posters", label: "Online posters", href: "/posters" },
        { id: "abstracts", label: "Abstracts", href: "/abstracts" },
        { id: "key-case", label: "Key case challenge", href: "/key-case-challenge" },
      ],
    },
    {
      id: "portal",
      title: "YOUR PORTAL",
      hideBelowMd: true,
      links: [
        { id: "schedule", label: "My schedule", href: "/schedule" },
        { id: "credit", label: "Claim credit", href: "/credit" },
        { id: "watch", label: "Watch on demand", href: "/watch" },
        { id: "store", label: "The ARRS store", href: "/store" },
      ],
    },
    {
      id: "society",
      title: "SOCIETY",
      links: [
        { id: "arrs", label: "arrs.org", href: "https://www.arrs.org", external: true },
        { id: "contact", label: "Contact", href: "/contact" },
        { id: "sponsors", label: "Sponsors", href: "/sponsors" },
        { id: "terms", label: "Terms of use", href: "/terms" },
      ],
    },
  ] as readonly {
    readonly id: string;
    readonly title: string;
    readonly links: readonly FooterLink[];
    /** Society links are the only ones not reachable elsewhere on a phone. */
    readonly hideBelowMd?: boolean;
  }[],
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
