# ARRS store — image generation brief

Hand this whole file to ChatGPT (or any image model). It produces the four
product images the store deck on the landing page needs.

**Generate four images. One per product. Same treatment across all four —
consistency matters more here than any individual image**, because the page
stacks them into a deck where three are visible at once. A mismatched
background breaks the illusion that they are one set.

---

## About the organisation

- **ARRS** — the American Roentgen Ray Society. Founded 1900, the first and
  oldest radiology society in the United States.
- **Tagline:** *Your Medical Imaging Society*
- **Pillars:** *connect . learn . advance.*
- Audience: practising radiologists, residents, and fellows. Professional,
  academic, quietly prestigious. **Not** startup-y, not playful, not clinical-cold.

Use the tagline or pillars **only** where a real garment would carry small
print — a back-neck label, a sleeve hit, the underside of a mug. Never as a
large graphic. If in doubt, leave them off; blank is better than wrong.

---

## Hard technical requirements

| | |
|---|---|
| **Count** | 4 images |
| **Aspect ratio** | **4:5 portrait** — this is not negotiable, the layout is locked to it |
| **Resolution** | 2000 × 2500 px (minimum 1000 × 1250) |
| **Format** | PNG or WebP |
| **Colour** | sRGB |

### Filenames

| product | filename |
|---|---|
| Hoodie | `hoodie.webp` |
| Roentgen Ray tee | `roentgen-ray-tee.webp` |
| Mugs | `mugs.webp` |
| RADRES tee | `radres-tee.webp` |

---

## Background — the most important instruction

The images sit on a **deep navy page**, inside cards with **16px rounded
corners** and a faint light hairline border.

**Use a deep navy studio background on every image**, matching or very close to:

- Primary: **`#0E2438`** (a touch lighter than the page so the card reads as an
  object on the field, not a hole in it)
- Acceptable range: `#0A1E30` → `#16304A`

Add a **soft radial falloff** — slightly lighter directly behind the product,
darkening toward the edges. A flat, even background looks dead; a gentle vignette
reads as a lit studio.

**Do not** use white, grey, gradient-to-white, transparent, or lifestyle
backgrounds. **Do not** put the product on a visible surface, table, or floor —
no cast shadow onto a ground plane. The product should feel lit and floating in
a soft navy void, with only a subtle contact shadow directly beneath it.

---

## Composition

- Product **centred horizontally**, occupying roughly **62–72%** of the frame
  width. Leave real breathing room — do not crop tight to the edges.
- **Keep the bottom 22% of the frame visually quiet.** The page lays a dark
  navy gradient and the product name over that band. Detail there gets buried.
  Position the product so its interesting parts sit in the upper two-thirds.
- **Keep the right-hand edge clean and consistent.** In the deck, the cards
  behind the front one are visible only as a narrow vertical sliver of their
  right edge. A busy or asymmetric right edge makes those slivers look broken.
- Straight-on or very slight three-quarter angle. Same angle across all four.
- Same lighting direction, same intensity, same shadow softness in all four.

---

## Lighting and finish

- Soft, large key light from the upper left; gentle fill from the right.
- Slight cool rim/edge light to separate the product from the navy — this is
  what stops a navy garment disappearing into a navy background.
- Realistic fabric texture. Visible knit on the hoodie, visible weave on the
  tees, real ceramic glaze on the mugs.
- Photographic, not illustrated. Not 3D-render-shiny. No heavy HDR.

---

## Colour palette

Actual values from the live site:

| role | hex |
|---|---|
| Page navy | `#061C2E` |
| Raised navy | `#18324B` |
| **Suggested image background** | **`#0E2438`** |
| ARRS yellow (accent) | `#FCD500` |
| ARRS blue | `#0C60A3` |
| Off-white | `#F9F8F5` |

Garments should be **navy, charcoal, heather grey, or off-white**. Use the
yellow only as a small accent — a drawcord tip, a logo hit, a cuff stripe. A
fully yellow garment will fight the page.

---

## The four products

### 1. `hoodie.webp` — Hoodie
A premium heavyweight pullover hoodie in **deep navy**, shown flat-lay-style
floating front-on, or on an invisible/ghost mannequin. Drawcords visible and
neatly arranged. Small chest mark upper-left, roughly 2–3% of the frame.
Texture: brushed fleece interior visible at the hood opening.

### 2. `roentgen-ray-tee.webp` — Roentgen Ray tee
A short-sleeve tee in **off-white or heather grey**, ghost mannequin or flat,
front-on, sleeves relaxed and symmetrical. Small centred or left-chest graphic.
If a graphic is wanted, an abstract line-art nod to early radiography — a
simple X-ray tube silhouette or a wave/ray motif. Keep it small and monochrome.

### 3. `mugs.webp` — Mugs
**Two** ceramic mugs, one navy with a white interior, one off-white with a navy
rim. Arranged slightly overlapping, handles turned outward, one marginally
behind and to the right of the other. Same navy void background. Soft specular
highlight on the glaze.

### 4. `radres-tee.webp` — RADRES tee
A short-sleeve tee in **navy**, same presentation and angle as the Roentgen Ray
tee so the two read as a pair. `RADRES` (the ARRS residents-and-fellows
community) as a small, clean, sans-serif chest mark. May carry a single yellow
accent.

---

## Do not

- **No text baked into the image** other than small, realistic garment
  branding. The page renders the product name itself, in its own typeface — any
  text you add will collide with it.
- No watermarks, no borders, no frames, no drop shadows on the frame edge.
- No people, faces, hands, or models.
- No props, plants, boxes, hangers, price tags, or scene dressing.
- No collage or multi-panel layouts (the mugs image is the one exception, and
  that is two mugs in one scene, not two panels).
- No white or light backgrounds.
- **Do not reproduce a real ARRS logo.** These are portfolio mockups. Use a
  generic wordmark or an abstract mark. Presenting fabricated merchandise as
  genuine official product is the thing to avoid.

---

## One-line summary to paste with each request

> Professional studio product photograph, 4:5 portrait, deep navy `#0E2438`
> background with soft radial falloff, product centred at ~68% frame width,
> floating with a subtle contact shadow and no ground plane, soft key light
> upper-left with cool rim separation, realistic fabric texture, bottom 22% of
> frame kept visually quiet, clean symmetrical right edge, no text, no people,
> no props.

---

## After you have the files

1. Drop them in `public/store/`.
2. Add `src` to each product in `lib/content.ts`:

   ```ts
   { id: "hoodie", name: "Hoodie", src: "/store/hoodie.webp" },
   ```

Anything without a `src` falls back to a labelled placeholder, so a partial set
still works — you can add them one at a time.

---

# Round two — making the set consistent

The first batch produced **four good images that are not a set.** Measured
backgrounds:

| file | corner | centre-top | treatment |
|---|---|---|---|
| `hoodie-yellow.webp` | `#FCD900` | `#FDDB23` | flat bright yellow, no vignette |
| `mugs.webp` | `#6D5008` | `#A17509` | amber, strong vignette |
| `radres-tee.webp` | `#564008` | `#A3770B` | amber, strong vignette |
| `roentgen-ray-tee.webp` | `#010206` | `#081122` | near-black navy |
| `hoodie-navy.webp` | `#060B17` | `#0D1728` | near-black navy |

The deck shows three cards at once, so the mismatch is visible directly — the
peeking right-hand slivers behind the front card are different colours.

## Recommended target: flat brand yellow

Standardise on the `hoodie-yellow.webp` treatment. Its background measured
**`#FCD900`**, which is within four points of the site's own brand token
`#FCD500` — the cards end up literally brand-coloured, matching the
"Shop the store" button and the "My schedule" card elsewhere on the page.

**Regenerate `mugs`, `radres-tee`, and `roentgen-ray-tee`** with:

> Flat, even **`#FCD500`** yellow background, edge to edge, **no vignette and no
> radial falloff** — a solid colour field. Product centred, floating, with a soft
> contact shadow directly beneath it and no ground plane. Match the lighting of
> the reference hoodie exactly: soft key from upper left, gentle fill from the
> right. 4:5 portrait, 1122×1402 or larger.

Everything in the original brief still applies **except the navy background
instruction, which is now superseded** — bottom 22% kept quiet, clean right
edge, no added text beyond realistic garment branding, no people, no props.

## Alternative: vignetted amber

If the moodier amber of `mugs`/`radres-tee` is preferred, regenerate `hoodie`
and `roentgen-ray-tee` to match instead — corners near `#5A4208` rising to
about `#A2760A` at centre-top. Two images to redo instead of three, and the
dark corners sit slightly more softly against the navy page. The trade is that
the cards read heavier and no longer echo the brand yellow.

**Pick one and apply it to all four.** Either is good; mixing them is the only
wrong answer.

## Note on the wordmark

The generated images carry an invented `ARRS / AMERICAN ROENTGEN RAY SOCIETY /
EST. 1900` lockup, plus `connect . learn . advance.` and `Your Medical Imaging
Society` on the neck labels. That is fine for a mockup and reads convincingly.
It is **not** the society's real logo, and the invented-data ledger in
`CLAUDE.md` records it as placeholder branding to be replaced before this is
shown as anything but a portfolio piece.


---

# Round three — one file left

The replaced `mugs` and `radres-tee` fixed the consistency problem. All four
now share a near-black navy ground, measured:

| file | corner | centre-top |
|---|---|---|
| `hoodie-navy.webp` | `#060B17` | `#0D1728` |
| `roentgen-ray-tee.webp` | `#010206` | `#081122` |
| `radres-tee.webp` | `#0B1222` | `#131B2F` |
| `mugs.webp` | `#0D1328` | `#151C35` |

## `mugs.webp` needs one more pass — it is landscape

It came back **1402 × 1122**, which is 1.25 wide rather than 0.8 tall. Cropping
it to the card cost 36.2% of the width, 18.1% off each side, which removed the
navy mug's handle completely and clipped the white one's.

The page now renders it letterboxed instead of cropped so nothing is amputated,
with the card taking the photo's own ground colour so the bands blend. The mugs
still sit smaller in frame than the other three.

Regenerate it as **1122 × 1402 portrait** — same scene, same lighting, same
navy ground, just a taller frame with the two mugs arranged to fill it. Then
delete the `fit` and `ground` fields from the mugs entry in `lib/content.ts`
and it goes back to filling the card like the rest.

### Exact wording to give the image model

> Portrait orientation, **taller than wide**. Aspect ratio **4:5**, output
> **1122 × 1402 pixels** (or 1600 × 2000 / 2000 × 2500 — same ratio, larger).
> The previous version came back 1402 × 1122, which is landscape and was
> cropped losing both mug handles.
>
> Same two ARRS mugs, same near-black navy studio ground, same soft key light
> from the upper left. Arrange them to fill the taller frame — slightly
> overlapping, handles turned outward and fully inside the frame with clear
> margin. Keep the bottom ~15% quiet. No text added, no props, no ground plane.

## If images ever look unchanged after replacing them

Next's image optimizer caches by source URL, and the URL does not change when
the file behind it does. Clearing `.next/cache/images` is **not** enough —
Turbopack keeps a second persistent cache. Stop the dev server, `rm -rf .next`,
and restart. A browser hard-reload alone will not do it either.
