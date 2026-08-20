# Store artwork

Four files, one per product in `store.products` (`lib/content.ts`).
Drop them here, then set `src` on each product:

    { id: "hoodie", name: "Hoodie", src: "/store/hoodie.webp" }

Until `src` is set the card falls back to a labelled placehold.co block, so
the deck works with a partial set.

| id                | file                    |
|-------------------|-------------------------|
| hoodie            | `hoodie.webp`           |
| roentgen-ray-tee  | `roentgen-ray-tee.webp` |
| mugs              | `mugs.webp`             |
| radres-tee        | `radres-tee.webp`       |

Requirements:

- **4:5 portrait**, 1000×1250 minimum (2000×2500 preferred).
- Product centred with even margin. The bottom ~22% sits under a navy
  gradient carrying the product name, so keep it free of detail.
- Consistent background across all four — the deck stacks them, and mismatched
  grounds break the illusion of one set. A soft neutral or deep navy studio
  sweep suits the section's field.
- No text, no logos-on-logos, no lifestyle scenes. These read at ~310px wide.
