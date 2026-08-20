# CLAUDE.md — ARRS 2026 Annual Meeting Portal, mobile-first redesign

## What this is

A take-home for a potential employer. The brief, verbatim:

> "To showcase my skills as a Frontend Developer, by creating a landing page mockup that improves the UX/UI for mobile devices using NextJS. Attached is a screenshot of the 2026 ARRS Meeting Portal that you can use for general content."

The reference screenshot is at `resources/reference-image.png`. **Open it before writing any code.** Every piece of text content on the page must come from that screenshot — this is a redesign, not an invention. Do not invent session names, speaker names, or marketing copy beyond what is specified in the Content Inventory below.

The deliverable is a single, polished, responsive landing page plus a short README explaining the UX decisions. The README is graded as heavily as the code.

## What we are being judged on

In order:

1. **UX judgment** — can you explain why the redesign is better, not just that it looks nicer.
2. **Mobile execution** — thumb reach, tap targets, scroll length, perceived performance.
3. **Code quality** — component structure, typing, no dead code, no unused deps.
4. **Craft** — typography, motion, spacing discipline, accessibility.

Visual flash without the first item loses. Do not sacrifice clarity for effect.

---

## Design authority — standing grant

**You may make any design decision needed to keep this site premium and current.**
This is standing permission, not a one-off. It covers composition, spacing, type
scale, colour application, motion, component structure, and interaction detail.

Where this file specifies a value, treat it as **intent, not gospel**. If a
different number, easing, arrangement, or component composes better on the
rendered page, use it. Where this file describes an effect without specifying an
implementation, choose the implementation.

The obligations that come with that authority:

1. **Report every override**, with the reasoning, in the same turn you make it.
   Never change a specified value silently.
2. **Say so when an instruction is wrong** rather than building it. A spec that
   produces a worse page is a bug in the spec.
3. **Verify on the rendered page, not in the source.** See *Verification* below.
4. **The four judging criteria still rank the work.** "Premium" never outranks
   UX judgment, mobile execution, accessibility, or honesty about state.

Things this grant does **not** cover, which still need explicit approval:
adding a dependency, inventing content or data, changing what the product
claims to do, and anything that would misrepresent a real person or the
society.

---

## Diagnosis of the original (put this in the README)

The current portal is a desktop table layout shrunk down. Specific failures:

- **Twelve identical yellow tiles carry identical visual weight.** "My Schedule" and "Donor Wall" are equally prominent. Nothing tells a returning attendee what to do next.
- **No search.** The portal fronts hundreds of sessions, posters, and abstracts. Search should be a primary affordance, not absent.
- **The merchandise banner outranks the entire navigation**, occupying the top-right of the first viewport.
- **Four competing calls to action** in the first screen: "Watch On Demand", the App Store badge, the Web App badge, and twelve tiles.
- **No state or personalization.** "Claim Credit" does not show how many credits have been claimed — the single most valuable fact for a radiologist using this product.
- **The primary action sits above a long, undifferentiated scroll** with no persistent way back to it.

The redesign fixes each of these. Do not simply restyle the tiles.

---

## Core strategy

**Preserve all content. Introduce hierarchy through grouping and sizing, not deletion.**

All twelve destinations from the screenshot stay on the page. They are grouped into three labelled tiers with different card sizes so the eye lands on the high-value ones first. Nothing is hidden behind a disclosure — hiding complexity is not the same as resolving it.

**The hero is a working dashboard, not a billboard.** This is a logged-in portal. The hero is a bento composition where the supporting cells show live state (CME progress, next session, library scale). A bento hero full of decorative cells is already a cliché; one wired to real data is not.

---

## Stack

Pin these. Do not substitute.

- **Next.js 16.3+**, App Router, TypeScript strict mode. Turbopack is the default bundler in 16 — do not add a webpack config.
- **React 19**
- **Tailwind CSS v4.3+** — CSS-first config via `@theme` in `app/globals.css`. **There is no `tailwind.config.js` in v4.** Do not create one.
- **Motion** (`motion/react`) is installed but **currently unused** — the hero's
  motion is CSS-driven (see *Motion*). Either adopt it for later sections or
  remove it before the Phase 3 audit; an unused dependency is a finding.
  If used, it is `motion/react`, never `framer-motion` — that name is legacy.
- **lucide-react** for icons.
- **next/font** for all typefaces. No `<link>` tags to Google Fonts.

Do **not** install: GSAP, Lenis, ScrollTrigger, three.js, react-spring, any smooth-scroll library, any UI kit beyond what is listed. Scroll-jacking on a mobile UX submission is a self-inflicted wound. Native scroll only.

`shadcn/ui` is permitted **only** for the accessible primitives we actually need — `sheet`, `dialog`, `accordion`. Do not run a bulk install. Do not use its default styling; restyle to the tokens below.

---

## Design tokens

Declare these in `app/globals.css` under `@theme`. Tailwind v4 uses OKLCH by default; use it, so the ramp stays perceptually even.

```css
@import "tailwindcss";

@theme {
  /* Brand — derived from the ARRS logo, not invented */
  --color-ink:         oklch(0.22 0.045 245);  /* #081F36 deep navy, page-dark surface */
  --color-ink-raised:  oklch(0.31 0.055 248);  /* #0E3055 bento cell inside dark sections */
  --color-ink-line:    oklch(0.38 0.055 248);  /* #1B4676 hairlines on dark */
  --color-brand:       oklch(0.88 0.185 96);   /* ARRS yellow, actions only */
  --color-brand-ink:   oklch(0.42 0.09 85);    /* text on yellow — never black */
  --color-blue:        oklch(0.48 0.13 250);   /* ARRS blue, links + focus rings */

  /* Neutrals — warm, not gray */
  --color-paper:       oklch(0.98 0.004 90);   /* #FAF9F6 page background */
  --color-card:        oklch(1 0 0);
  --color-hairline:    oklch(0.88 0.008 85);   /* #DAD6CC */
  --color-body:        oklch(0.28 0.03 245);   /* #12263A body copy */
  --color-muted:       oklch(0.56 0.02 245);   /* #6B7885 secondary */
  --color-on-dark:     oklch(0.880 0.028 244.7); /* #C9DAE9 secondary on navy, 12.11:1 */
  --color-placeholder: oklch(0.66 0.02 245);   /* input placeholders only */

  --radius-card: 16px;
  --radius-control: 10px;
}
```

**Measured contrast, do not re-derive from the hex comments** (the comments are
approximations; the OKLCH values are authoritative):

| pair | ratio | verdict |
|---|---|---|
| `brand-ink` on `brand` | 5.95:1 | pass |
| `ink` on `brand` (headline marker) | 12.08:1 | pass |
| `body` on `paper` | 13.74:1 | pass |
| `on-dark` on `ink` | 12.11:1 | pass |
| `blue` on `paper` | 6.17:1 | pass |
| `muted` on `card` | 4.64:1 | pass |
| **`muted` on `paper`** | **4.38:1** | **fails AA** |

`--color-muted` is therefore confined to white card surfaces. Do not place it on
`--color-paper`. Dropping its lightness to `0.55` yields 4.57:1 if you ever need
it there.

### Colour rules

**Colour is open.** Any colour, any number of times, wherever it composes best —
new hues, new tints, gradients, washes, accents. The palette in `@theme` is a
starting point, not a fence, and you may extend it. There is no budget, no
tally, and no per-surface justification to write. Earlier revisions of this file
capped yellow at five uses in the page body and then replaced that cap with a
two-purpose principle; **both are withdrawn.** Neither survived contact with the
page, and taste applied per-composition beats a rule applied per-count.

Use the judgment the *Design authority* grant already gives you. If a fifth
yellow, a second accent hue, or a warm gradient makes the page better, use it
and say what you did.

**Two things are not open, because neither is a matter of taste:**

1. **Contrast.** Every text/background pair must pass **WCAG AA** — 4.5:1 for
   body text, 3:1 for text at 18.66px+ or bold 14px+, 3:1 for meaningful
   non-text (icons, focus rings, state indicators). Measure it on the rendered
   page against the *real composited backdrop*, not against the token you think
   is behind it. A gradient means the backdrop changes down the element, so the
   worst point is the one that counts. Accessibility is a judged criterion and
   an ADA exposure for a medical society; it does not bend for a nicer hue.

   Note when measuring: `getComputedStyle` returns colours in `lab()`/`oklab()`
   in this project, not `rgb()`. Parsing those channels as RGB produces
   confident nonsense — white-on-navy came back as 1.03:1 once. Resolve colours
   through a canvas, or sample the screenshot.

2. **Body text is `--color-body` (navy-derived), never `#000`.** Pure black on
   an off-white page reads as unstyled. This is the one hue opinion that stays.

**Colour must never be the only signal.** An active tab needs an underline as
well as a colour change; an error needs a word as well as red. This is WCAG
1.4.1, not preference.

**Text on yellow is `--color-brand-ink`** for controls, never black, never gray.
   **Exception, approved:** the hero headline marker uses `--color-ink` (navy) at
   12.08:1. On a navy field the marker must cover the full glyph height — a band
   covering only part of the cap height leaves ascenders navy-on-navy and the phrase
   becomes unreadable. This was built literally first and it failed; the full-cover
   version is correct.
**Dark mode needs rethinking, and the plan below is now stale.** It read: "the
navy sections stay; the paper sections invert to `--color-ink`." The landing
page no longer has paper sections — hero, ticker, store, all three destination
tiers, the app section and the footer are navy, with the Denver band the single
bright interruption. There is nothing left to invert.

Two honest options, neither yet chosen:

- **Ship a light mode instead.** The dark treatment becomes the default and
  `prefers-color-scheme: light` lifts the surfaces. This is the more interesting
  submission and matches the "logged-in portal, not a marketing page" argument,
  but it is the larger build.
- **Declare the page dark-only** via `color-scheme: dark`, so form controls and
  scrollbars match, and say so in the README rather than shipping a half theme.

`--color-paper` is now only load-bearing on the stub routes. Whichever option
wins, the stubs need to agree with it.

---

## Typography

```ts
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
```

- **Display** — `Bricolage_Grotesque`, variable, weight 400–600. Headlines only. It has genuine character without being decorative, which suits a 125-year-old medical society that still wants to look current.
- **UI / body** — `Inter`, weights 400 and 500. Two weights only. (Inter Tight is a
  display cut and goes muddy at small sizes on dark backgrounds — do not go back to it.)
- **Micro-label** — `JetBrains_Mono`, **weight 500, uppercase, `letter-spacing: 0.11em`,
  size 12px**. Used for eyebrows, metadata, counts, and the ticker. The original
  11px/0.16em/400 was measurably hard to read: thin strokes optically thin out on
  navy and the wide tracking broke word recognition.
  **Exception:** the mobile tab bar's labels use Inter 11px/500 in sentence case.
  Those are navigation, not metadata, and mono uppercase reads techy there.

Type scale (mobile → desktop, use `clamp()`):

| Role | Size | Tracking | Weight |
|---|---|---|---|
| Hero headline | `clamp(2.5rem, 6vw, 5.25rem)`, `line-height: 1.04` | `-0.04em` | 500 |
| Section heading | `clamp(1.25rem, 3vw, 1.5rem)` | `-0.02em` | 500 |
| Card title | 15–20px | `-0.01em` | 500 |
| Body | 14–15px, `line-height: 1.6` | normal | 400 |
| Micro-label | 12px | `0.11em` | 500 |
| Body on navy | 15px → 17px at `sm`, `line-height` 1.6→1.65, max `46ch` | `0.004em` | 400 |

**Light-on-dark body copy never drops below 15px.** That floor applies to body copy
only, not to the mono micro-labels.

The hero headline needs `line-height: 1.04`, not a tighter value: the marker block
bleeds above and below the text box and will collide with the line above at 0.96.

**Never use weight 600 or 700.** Hierarchy comes from size and colour, not weight.

**Sentence case everywhere** except the mono micro-labels, which are uppercase by design.

### Section eyebrows — important

Use **category eyebrows** (`YOUR MEETING`, `EXPLORE AND CONNECT`, `RECOGNITION AND SUPPORT`), each followed by a hairline rule that fills the remaining width.

Do **not** number them `01 —`, `02 —`, `03 —`. Numbered markers are only honest when the content is a real sequence. These are categories, and numbering them would be decoration pretending to be structure.

---

## Content inventory — use these exact strings

Everything below comes from `resources/reference-image.png`. Do not paraphrase the proper nouns.

**Meeting identity**
- American Roentgen Ray Society (ARRS)
- 2026 ARRS Annual Meeting Portal
- Pittsburgh, April 12–15, 2026
- Formats: in person, virtual, on demand

**Hero copy**
- Eyebrow: `PITTSBURGH — APRIL 12–15, 2026`
- Headline: **rotates** every 6.2s, each a lead plus a marked phrase so the marker
  always lands on line two. In order — `Welcome to` / **`ARRS 2026`**,
  `The 2026 meeting,` / **`still open`**, `Every session,` / **`still yours`**.
  The first is server-rendered; rotation is skipped entirely under reduced motion.
- Body: `Every session, poster, and abstract from Pittsburgh — yours until April 15, 2027.`
  (The earlier "Thank you for participating" was receipt language. Do not restore it,
  and do not put approximate figures in this line while the rail states them exactly.)
- Primary CTA: `Watch on demand` — opens the video player
- Secondary CTA: `Register` — opens the register modal, `/register` without JS
- Status pill: `On demand through Apr 2027`
- Social proof: five attendee avatars + `4,200 radiologists attended in Pittsburgh`

**The twelve destinations, grouped**

*Tier one — `YOUR MEETING`* (large cards, live state)
| Card | Meta line |
|---|---|
| My schedule | `6 sessions saved across four days.` |
| Sessions | `412 available` |
| Online posters | `1,860 posters` |
| Claim credit | `18 of 32 claimed` |
| Abstracts | — |

*Tier two — `EXPLORE AND CONNECT`* (equal medium cards)
Key case challenge · Connection quad · Lunch symposia · In-person info and floorplans

*Tier three — `RECOGNITION AND SUPPORT`* (equal medium cards)
Awardees · Donor wall · Sponsors

**Store section**
- Eyebrow: `THE ARRS STORE`
- Heading: `Your community. Your gear.`
- Body: `Roentgen Ray apparel, mugs, and RADRES merch.`
- CTA: `Shop the store`
- Products: Hoodie · Roentgen Ray tee · Mugs · RADRES tee

**App section**
- Heading: `Discover Roentgen 2026`
- Body: `Take the portal with you. Your schedule syncs across devices.`
- Buttons: `App Store` · `Web app`

**Closing band**
- Eyebrow: `NEXT YEAR`
- Heading: `The learning doesn't stop here`
- Body: `ARRS 2027 takes place in Denver.`
- CTA: `Save the date`

**Footer**
- Links: Terms of use · Contact · Sponsors
- Social: Facebook, X, Instagram, LinkedIn, YouTube
- Legal: `Copyright © 2026 American Roentgen Ray Society, ARRS. All rights reserved.`

**Ticker strings** (session titles, plausible for a radiology meeting — these are the only invented strings permitted, and they must stay generic):
`NOW STREAMING — THORACIC KEY CASE CHALLENGE` · `MSK INTERVENTION UPDATES` · `PEDIATRIC DOSE REDUCTION` · `AI IN EMERGENCY RADIOLOGY`

The single named speaker in the "up next" cell is a plainly fictional placeholder.
Never use a real radiologist's name.

### Invented data ledger — replace all of this before this is shown as anything but a mockup

Everything below is fabricated. It is approved for the mockup and must not grow
without asking.

| item | value | note |
|---|---|---|
| Attendee count | `4,200 radiologists` | no source in the screenshot |
| Attendee avatars | 5 Unsplash portraits | **real people who did not attend ARRS** |
| Resume progress | `38% watched` | invented state |
| Search examples | `dose reduction`, `breast imaging AI`, `pediatric CT` | placeholder cycling |
| Up-next speaker | `Dr. Alana Whitfield` | fictional |
| Ticker session titles | four generic strings | as permitted above |
| Player video | a YouTube ID | stands in for real session media |
| Store product imagery | 4 generated mockups | **invented ARRS wordmark and merchandise** — not real product |

---

## Page structure

Build in this order. Each is its own component under `components/sections/`.

1. `SiteHeader` — logo lockup, live status pill, four nav links, mobile menu trigger
2. `HeroBento` — headline cell + three live cells + full-width search cell
3. `SessionTicker` — marquee strip
4. `DestinationTier` × 3 — reusable, driven by a data array
5. `StoreSection`
6. `AppSection`
7. `NextYearBand`
8. `SiteFooter`
9. `MobileTabBar` — mobile only, fixed bottom

### Hero composition — the signature element

The bento of three stacked cells was tried and abandoned: it made the right side a
passive wash and the cells competed with each other. As built:

- **Section** — `min-h: calc(100svh - 13rem)` at `lg`, so the hero reads full-screen
  while the ticker *and* ~99px of the next section stay visible. A strict `100vh`
  hero is wrong here: it hides that the page continues, which is diagnosis point six.
- **Left column** — eyebrow, rotating headline, body, two CTAs, avatar social proof.
  Centred below `lg`, left-aligned at `lg`.
- **Right column (`400px`)** — the "up next" card, then the search field beneath it.
  Card first: it is personal live state and the most actionable thing for a returning
  attendee; search is the broader fallback. Specific before general.
- **Stats band** — full container width on the hero floor, three columns, hairline
  above and between, mono label above / value below. It anchors the composition.
- **Scroll cue** — a mouse-style button below the stats that advances to the next
  section, offset for the sticky header. Hidden below `lg`, where the tab bar owns
  the bottom edge.
- **Background** — the radiograph occupies the right 62%, masked at its left edge,
  under a directional scrim (opaque navy at left → ~40% at right), a vignette, the
  grain, and a bottom fade so it never cuts flat into the ticker.

The CME ring is 56px with `56%` in mono inside, and its `stroke-dashoffset` animates
on mount. This is the one place a number animation is earned — it is the attendee's
own progress.

**Search does not live in the header.** It was tried there; moving it into the hero
balanced the composition. The cost is that it is no longer persistent after scroll,
mitigated by a page-wide ⌘K/Ctrl+K shortcut that focuses it.

### Mobile tab bar

Fixed bottom, four items: Home · Schedule · Explore · Credits. Height 56px plus `env(safe-area-inset-bottom)`. Active item marked with a 2px yellow underline, not a yellow fill.

Add a README note acknowledging the trade-off: a bottom tab bar on a web page reads as app-thinking to some reviewers and as fighting browser chrome to others. State why you chose it — this is a logged-in portal, not a marketing page.

---

## Motion specification

Motion must be informative or absent. Every effect below has a reason; do not add any
that do not.

**The hero's motion is CSS, not `motion/react`.** This is deliberate and should not be
"corrected" later. A JS-driven reveal cannot start until React hydrates, which gates
the LCP element on hydration; CSS animations start at first paint. Measured LCP with
the full reveal running is ~110–200ms with CLS 0.

**Architecture — follow this for any new animation.** Every element's *base* CSS is its
**finished** state, and each keyframe animates *from* the initial frame with `both`. A
browser with no animation support, no JS, or reduced-motion enabled therefore renders
the completed page. There is no state in which content is stuck invisible.

**Interpolation gotcha, learned the hard way:** `clip-path` cannot interpolate between
an `inset()` and `none` — the browser swaps discretely at 50% and the "wipe" becomes a
snap. Both endpoints must be `inset()`. Sample `getComputedStyle` across the animation
window to confirm any new effect actually interpolates.

### Hero headline text reveal

Word-by-word mask reveal on load. Implementation:

- Split the headline into words at render (a plain `.split(" ")` — never a text-splitting
  library). Keep **real whitespace text nodes** between the word spans; spacing via
  `margin-right` alone makes `textContent` read `The2026meeting,` for crawlers and
  copy-paste.
- Each word wraps in a `<span>` with `overflow: hidden; display: inline-block`.
- The inner span animates `y: 110% → 0`.
- Stagger `0.04s`, duration `0.7s`, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- The yellow phrase (`still open`) reveals last, with an extra `0.08s` delay so it lands as the final beat.

Keep the headline in the server-rendered HTML — the animation applies to already-present
text, so the content is in the DOM for SEO and for anyone with JS disabled.

The marker is **two layers**: a light base and a navy-on-yellow fill. The fill wipes in
left→right while the base is clipped away in exact counterpoint, so the two never overlap
— otherwise ascender tops ghost through the transparent top of the band. The fill's copy
of the phrase is rendered from CSS `content: attr(data-text)` so it stays out of
`textContent`, selection, and the index.

Easing for the wipe: `cubic-bezier(0.5, 0, 0.2, 1)` over ~540ms. An expo-out curve is
~90% complete in the first 100ms and reads as a flash, not a stroke.

### Scroll reveals

Use the **CSS scroll-driven animations API** — no JS, no observer, no library:

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: rise linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 32%;
  }
}
@keyframes rise {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: none; }
}
```

Provide an `IntersectionObserver` fallback for browsers without support. Reveals apply to section eyebrows and card groups only — stagger cards within a group by 60ms. Never animate the same element twice.

### Micro-interactions

- Card hover: border shifts from `--color-hairline` to `--color-body` at 20% opacity, 150ms. No lift, no shadow, no scale.
- Card press (touch): `scale(0.985)`, 100ms.
- CTA hover: 4% darken only.
- Ticker: 26s linear infinite translate. Duplicate the string set so the loop is seamless.

### Reduced motion — non-negotiable

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

The headline reveal degrades to a plain opacity fade. The ticker stops entirely. Call this out in the README — most submissions will not have it.

### View Transitions

Enable the View Transitions API for in-page navigation. It gives an app-like feel with no router library and degrades silently where unsupported.

---

## Images and assets

**Do not hotlink to arbitrary URLs.** Configure exactly these remote patterns in `next.config.ts`:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "placehold.co" },
  ],
}
```

Asset plan:

- **Hero media** — a chest radiograph by **Umanoide on Unsplash**
  (`photo-1616012480717-fd9867059ca0`), served through `next/image` with `priority` and
  correct `sizes`, desaturated, at 70% opacity under the scrim stack. A radiograph beats
  a skyline here: it is the society's own subject matter and its rib rhythm reads as
  tonal texture. Credit it in the README.
- **Attendee avatars** (5) — Unsplash portraits cropped `fit=facearea&facepad=3`, fixed
  44×44 through `next/image`. These are **real people who did not attend ARRS**; they are
  placeholders and are listed in the invented-data ledger.
- **Video player** — embedded via `youtube-nocookie.com`, and the iframe is mounted only
  while the dialog is open so closing genuinely stops playback and nothing is requested
  from YouTube until asked.
- **Store products** (4) — `placehold.co` blocks at 4:5, labelled with the product name. Do not fabricate product photography.
- **ARRS logo** — recreate as inline SVG from the screenshot: yellow wordmark, navy field. Keep it simple; this is a mockup.
- **Grain texture** — a base64 inline SVG `feTurbulence` at 2% opacity over the navy sections. Roughly 1KB, and it removes the flat-digital look that makes generated pages recognizable.
- Every image needs a real `alt`. Decorative images get `alt=""` plus `aria-hidden`.
- Every `next/image` gets explicit `width`/`height` or `fill` with a sized parent. **Zero CLS is a hard requirement.**

## Links

No `href="#"` anywhere. Every link resolves to something:

- Internal destinations → `/sessions`, `/posters`, `/schedule`, `/credit`, `/abstracts`, etc. Create stub route files that render a heading and a back link. A dead link is a bug; a stub is a decision.
- External real links: `https://www.arrs.org` for the society, and the social icons to the real ARRS profiles where they exist. Add `rel="noopener noreferrer"` and `target="_blank"`.
- App Store / Web app buttons → stub routes with a note. Do not invent an App Store URL.
- Every icon-only link needs an `aria-label`.

---

## Responsive behaviour

Mobile-first. Write the mobile styles as the base and layer up.

**Use container queries, not media queries**, for the card grids — Tailwind v4 supports them first-class (`@container`, `@sm:`, `@lg:`). Media queries stay for page-level layout only. Mention this in the README; a reviewer inspecting the CSS will notice.

| Width | Behaviour |
|---|---|
| < 640px | Single column. Hero cells stack. Destination tiers become a 2-up grid, tier-one "My schedule" spans both columns. Store products scroll horizontally with snap points. Tab bar visible. |
| 640–1024px | 2-up grids throughout. Hero becomes 2 columns at 900px. Tab bar hidden, sticky CTA bar appears instead. |
| > 1024px | Full bento layout as specified. |

Hard requirements:
- Tap targets ≥ 44×44px, always.
- No horizontal scroll at any width. Test at 320px.
- Test at 320, 375, 390, 768, 1024, 1440.
- Respect `env(safe-area-inset-*)` on the tab bar and any sticky element.
- The store row uses `scroll-snap-type: x mandatory` on mobile — do not build a JS carousel.

---

## Accessibility

Treat this as a feature and document it. A radiology society is ADA-sensitive; most candidates will skip this entirely.

- Semantic landmarks: one `<h1>`, correct heading order, `<nav>` / `<main>` / `<footer>`.
- Visible focus rings using `--color-blue`, `outline-offset: 2px`. Never `outline: none` without a replacement.
- Full keyboard operability, including the mobile menu (focus trap, Escape to close, focus restored on close).
- Colour is never the only signal — the active tab has an underline, not just a colour change.
- The ticker is `aria-hidden` (it is ambient); its content is reachable through the sessions page.
- Run Lighthouse and axe. Target 100 on accessibility. Put the score in the README.

## Performance budget

- LCP < 2.0s on a simulated mid-tier Android.
- CLS = 0.
- No layout shift from font loading — `next/font` with `display: swap` and correct fallback metrics.
- **The <100KB gzipped JS budget is not reachable and should be renegotiated.** First-load
  measures ~180KB, of which ~114KB is `react` + `react-dom` + the Next client runtime
  before any application code. Every chunk containing our code is 2–10KB. This is a
  framework floor, not a code problem.
- Server Components by default. `"use client"` is currently on nine components:
  `RotatingHeadline`, `HeroSearch`, `RegisterDialog`, `VideoDialog`, `PlayLink`,
  `ScrollCue`, `CountUp`, `MobileMenu`, `MobileTabBar`. Each needs interactivity or
  `matchMedia`. Keep additions justified, but the original four-component allowlist is
  superseded.
- Static generation. No runtime data fetching — all content is a typed constant in `lib/content.ts`.

---

## Code conventions

```
app/
  layout.tsx          fonts, metadata, theme
  page.tsx            composes sections, no markup of its own
  globals.css         @theme tokens, keyframes, reduced-motion block
  (stubs)/            stub routes for every destination
components/
  sections/           one file per section above
  ui/                 Card, Eyebrow, Pill, CTA, ProgressRing
lib/
  content.ts          every string and destination, typed
```

- All content lives in `lib/content.ts` as typed constants. No strings hardcoded in JSX.
- The three destination tiers render from one `DestinationTier` component driven by data. If you find yourself writing the same card markup twice, stop and extract.
- TypeScript strict. No `any`. No unused imports.
- No comments explaining what the code does. Comments only where a decision needs justifying.
- Delete anything you scaffold and do not use.

---

## README requirements

Ship `README.md` alongside the code. Structure:

1. **Run instructions** — two commands, nothing more.
2. **What was wrong** — the six diagnosis points above, in your own words.
3. **What changed and why** — map each fix to each problem. Lead with the grouping decision: *all twelve destinations were preserved, but hierarchy was introduced through grouping and sizing rather than removing content.*
4. **The merchandise placement** — acknowledge explicitly that moving it below the fold is a commercial trade-off, and describe the fallback (a slim banner directly under the hero) if the client requires prominence. This shows you understand a client relationship, not just a canvas.
5. **Accessibility and performance** — Lighthouse scores, reduced-motion support, keyboard support.
6. **What you would do next** with more time — real search backend, saved-schedule persistence, offline support.

Keep it under 600 words. A reviewer reads it in two minutes.

---

## Git conventions

**Commits carry no AI attribution.** No `Co-Authored-By: Claude` trailer, no
"Generated with Claude Code" line, in commit messages or pull request bodies.
This is enforced by `includeCoAuthoredBy: false` in `.claude/settings.json`, which
is committed so the setting travels with the repo — but write commit messages as
though the rule were manual, because it is the intent that matters.

Commit messages describe the change and its reasoning, in the imperative mood.

---

## Verification — measure, do not assert

Claims about the rendered page must be **measured on the rendered page**. Reading the
CSS is not verification; several real defects in this build passed a source review and
failed a measurement:

- the marker wipe was snapping, not sweeping (`clip-path` type mismatch)
- the search placeholder never faded (an unlayered rule outranked the Tailwind utility)
- a reduced-motion block was silently destroyed by a bad edit and still "looked right"
- the headline's `textContent` had no word spaces

The harness is a small Chrome DevTools Protocol driver over Node's native `WebSocket`
(no Puppeteer). It gives exact viewport emulation, real key and mouse events, media
emulation, and LCP/CLS. Use it for:

- **Layout** — `scrollWidth - clientWidth` at 320/360/390/430/640/768/1024/1280/1440+
- **Tap targets** — every `a`/`button`/`input` ≥ 44×44 (inline links in a sentence are
  exempt per WCAG 2.5.8)
- **Yellow budget** — walk computed styles for the brand colour; count visible surfaces
- **Reduced motion** — emulate `prefers-reduced-motion: reduce`; assert `animationName`,
  `clipPath`, and final numerals. Toggle the setting, never read the CSS.
- **Dialogs** — `:modal`, focus inside on open, real `Escape` keypress, focus restored
- **Animation** — sample `getComputedStyle` across the window to prove interpolation
- **Section seams** — compare the two sides **per RGB channel, and check hue
  separately**, not by luminance. A decorative bloom that dies at a section
  boundary shifts hue while barely moving luminance: the store's floor measured
  b−r 36 under the deck against the tiers' 44, a plainly visible cut across the
  full width, while a luminance-only check reported a 5-point step and was
  waved through. Where a section carries blooms, land an overlay on the exact
  token the next section opens with, so the match holds by construction instead
  of by tuning each bloom's reach.

Headless has no media stack, so video playback cannot be confirmed there. Say so rather
than implying it was checked.

---

## Build phases

Build in three phases. **Stop at the end of each phase and wait for review before starting the next.** Do not run phases together, even if the next one seems trivial.

The reason: motion is expensive to unwind. A staggered reveal wired into a hero that turns out to be wrong at 390px means undoing both. Structure gets confirmed first.

### Phase 1 — structure and content

Build the complete page: every section, every string from the content inventory, the full responsive layout, real links and stub routes, `next/image` with correct sizing, tokens and typography wired up.

Explicitly **not** in this phase: the headline reveal, scroll reveals, the ticker animation, hover micro-interactions, the CME ring animation, dark mode, the grain texture. Render the ticker as a static strip and the CME ring at its final 56% value.

Stop and report:
- The route list and component tree
- Anything in the spec you had to interpret, and how you interpreted it
- Any place the content inventory was ambiguous
- A prompt asking the reviewer to check the page at 390px before continuing

> **Deviation, approved:** the hero was iterated well past Phase 1 — its motion,
> micro-interactions, the register modal, and the video player all shipped early so the
> experience could be felt. Dark mode and the grain-over-navy treatment for the *other*
> sections remain outstanding. The remaining sections are still at Phase 1.

### Phase 2 — motion and theming

Only after phase 1 is approved. Add the motion specification exactly as written, then dark mode, then the grain texture. Verify the reduced-motion block actually disables everything by toggling the OS setting, not by reading the CSS.

Stop and report what was added, and flag anything that felt like it was fighting the layout — that usually means phase 1 needs a fix rather than phase 2 needing a workaround.

### Phase 3 — audit and README

Only after phase 2 is approved. Run the Definition of done checklist item by item and report pass/fail on each with evidence, not assertions. Run Lighthouse and axe, fix what they surface, then write the README.

### Rules that apply across all phases

- Do not skip ahead. If a phase-2 concern comes up during phase 1, note it in the report rather than fixing it early.
- If a spec instruction conflicts with something you discover while building, stop and ask. Do not silently substitute.
- Never add a dependency not listed in the Stack section. If you believe one is needed, stop and make the case.
- Run `npm run build` at the end of every phase. A phase is not complete with build warnings.

## Definition of done

- [ ] Every string traces to `resources/reference-image.png`, the inventory, or the
      invented-data ledger — and the ledger has been reviewed for replacement
- [ ] All twelve destinations present, grouped into three tiers
- [ ] Colour: no budget to check. Every text/background pair passes WCAG AA
      measured against its real composited backdrop, and no state is signalled
      by colour alone
- [ ] Zero `href="#"`; every route resolves
- [ ] No horizontal scroll at 320px, and none at any tested width
- [ ] No interactive control under 44×44
- [ ] Headline reveal, marker wipe, ring, and counters all degrade correctly with
      `prefers-reduced-motion` **emulated**, not inspected
- [ ] Every dialog: `:modal`, focus trapped, Escape closes, focus restored
- [ ] Lighthouse: 100 accessibility, CLS 0. Performance judged against the measured
      framework floor, not the original <100KB figure
- [ ] Dark mode ships and is correct
- [ ] `motion` either adopted or removed
- [ ] `npm run build` produces zero warnings
- [ ] README written, including the Unsplash credits and the placeholder disclosure

## Before you start

Look at `resources/reference-image.png`. Then write a two-paragraph plan covering the hero composition and the type treatment, and check it against one question: *would this plan be identical for any other conference landing page?* If yes, revise it before writing code.
