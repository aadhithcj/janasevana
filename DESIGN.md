# Design

The single design document for the Janasevana Lab site. Product truth lives in PRODUCT.md; facts live in `config/`. Tokens are in `src/styles/tokens.css`. Earlier designs are in git history (tag `pre-redesign` for the teal-field version; commit `7fd8fb2` for "the Index").

## Concept: the helix and the paper slip

A lab is where the body's code gets read. The home page opens on a pale mist-teal field with one soft lower edge, where a particle double helix in the logo's teal drifts behind plain words. An opaque white paper slip carrying the current offer overhangs that edge. Everything below is white paper, charcoal ink and a few tall rounded teal cards. The helix and the arrow button are the two signature details. Every page opens on the same mist field.

## Reference translation

The reference video (stills in `brand/reference/`, not shipped) gave the structure: a pale field hero with a large point-cloud helix cropped by the viewport, a floating logo box and nav capsule, a dark pill button whose arrow circle slides in, and a horizontal strip of tall cards. Taken: the feel, the structure and those two details. Not taken: wording, logo, photography, stats ("Trusted by 40,000+"), eyebrow kickers, social icons, people photos, blur reveals, or the reference's yellow.

## Colour

Seeds sampled from the logo: teal **#058E92** and charcoal **#434448**. Petrol **#0A6C82** is an estimate until the Royal Package ad is supplied. Ramps are derived in OKLCH.

| Role | Token | Value |
|---|---|---|
| Ground | `--paper` | #FFFFFF |
| Hero and page-head field | `--mist` | #E5F0EF |
| Text on mist, secondary | `--mist-ink-2` | #3C4A4A |
| Department cards, team panel, arrow buttons | `--deep` (teal-800) | #03494C (white text 10.6:1) |
| Ink | `--ink` | #1E1F22 |
| Logo teal (helix, large numerals) | `--teal-500` | #058E92 |
| Links, the logo name in the header | `--teal-600` / `--teal-700` | #017B7F / #056A6D |
| Packages only | `--petrol-700` | #0A6C82 |
| Fasting and the cardiovascular notice only | amber | surface #FFF4DC, ink #7A4A00 |
| WhatsApp actions only | | #25D366 with #0E2A1A text |
| Footer | `--charcoal-900` | #1E1F22 |

About 80% of every page is paper or mist. Deep teal owns the department cards, the one team panel and the primary buttons; petrol owns the Royal Package panel.

## Type

- **Display:** Anek Latin, weight 380–780, width fixed at 100% (the font file is instanced to that, 36KB). Latin headlines are light (400) with −0.03em tracking. Anek Malayalam never goes below 500 (thin strokes break conjuncts), with tracking 0 and line-height 1.3.
- **Body:** Atkinson Hyperlegible Next and Noto Sans Malayalam, 19px, line-height 1.55 / 1.8.
- **Scale:**
  - `--t-hero`: 40→84px (Latin), 33→62px (Malayalam);
  - `--t-statement`: section headlines;
  - `--t-price`: package prices.
- **Header name:** "Janasevana Lab" is live text in Anek 700, teal-600 and charcoal, beside the mark.
- No all-caps labels and no eyebrows; labels are folded into meta lines.
- **Links:** no underlines anywhere. Links are teal; inside running text they are also bold, so they never rely on colour alone. Hover darkens them.

## Layout

- Max width 1200px; gutters 16px to 32px; section rhythm `--section` 44px on phones to 128px.
- Radii: 24px for cards and panels, 20px for the offer slip and team cards, pills for buttons, chips and the toggle, and `--radius-edge` (28–56px) for the field's lower edge.
- **Home order:** mist hero with the slip, search, departments strip, packages, home collection timeline, deep team panel, the contact block with shopfront and map, then the charcoal footer.
- **Phone home:** within 7,500px (English) and 9,000px (Malayalam). It drops the hero's ISO and address line, which come later on the page. It also drops the duplicate cardiovascular panel, because the hero slip carries it with its notice.

## Components

- **Header:** at the top of a page it is a full-width bar on paper, above the page's opening field, which is an inset rounded card (`--field-inset`, `--radius-field`). Left: the owner's mark in a white disc (a pointer-only home link) and the React Bits PillNav links (plain items, fill hover, pill indicator, bounce 0.24, stretch 0.32; Packages, Tests, Home collection, About). Centre: "Janasevana Lab" as live text, which is the home link. Right: EN | മലയാളം, "Your request (n)" when something is selected, and the Contact arrow button. Once the page scrolls (`html.scrolled`), the bar's max-width eases in to one centred pill (66rem, or 78rem in Malayalam) of frosted glass: a 28px backdrop blur that also darkens what is behind (brightness 0.5, so white text holds over paper or teal), a smoky teal fill, a thin bright edge and a soft sheen at the top-left (solid teal where blur is unsupported). The bar is 60px with an even 6px inset around its 48px controls in both states. The header carries no `view-transition-name`, which would make it a backdrop root and leave the glass nothing to blur. The words turn white, the current page becomes a white pill, and Contact turns white with a teal arrow circle. The bar's height never changes, so nothing below it moves. On phones, the name sits beside the mark and the toggle offers only the other language. The links show from 1024px in English and 1280px in Malayalam.
- **Glass:** used only for the scrolled header, at the owner's request.
- **ArrowButton:** CSS only. The circle scales in and the arrow slides on hover or keyboard focus; on touch it sits in the flow at rest. The circle takes the button's own colour (teal with a white arrow, green for WhatsApp), so it reads on any ground. Variants are ink (deep teal), tint and WhatsApp.
- **Hero:** light headline, lede, Call and WhatsApp arrow buttons, and an ISO and address line. The offer slip (cardiovascular until 15 Nov 2026, Royal after) sits bottom right and overhangs the edge by 60px. On phones the order is headline, lede, slip, buttons.
- **What the lab does (sticky scroll):** On screens at least 1024px wide and 720px tall, the title, lede and a department index (name and test count) pin on the left. The five department cards stack on the right: each sticks 20px below the last, so the next slides over it like a deck, and each card is one step lighter than the one beneath it. The index marks the card in place. Clicking an entry scrolls that card exactly into its sticky spot (script; a plain anchor without it). On phones, the index is a row of chips and the cards a swipeable snap row, and the active chip follows the swipe. Each card has its real test count, the summary (wide screens), up to five tests linking to the directory, an "All N in the test list" pill, and the equipment photo where `config/site.ts` supplies one.
- **Packages (product-page layout, after Superpower's membership block):** Left: a large photo stage (square on desktop, 4:3 on phones) with two frosted-glass fact cards (the chosen package's test count, and free home collection) and a thumbnail strip. It holds two representative stock photos (captioned "Representative photo"), the XL-200 and H360, and the shopfront; photos cross-fade, and the stage stays pinned while the details scroll on desktop. Right: a two-segment switch (Royal Package or the cardiovascular offer, shown only while the offer runs), then chips (label, free home collection), the name, a summary, a large price "for N tests", a check per test (six for Royal, then "+10 more"), the notice where the package has one, a full-width Add to booking button, a facts row (free collection, test count, fasting where included) and links to the package page and WhatsApp. The switch and thumbnails are radio buttons driven by CSS `:has()`, so no script is needed; without `:has()` both packages stack. No ratings, member counts or badges: none are verified.
- **Photos:** AVIF and WebP at built widths (`scripts/build-photos.mjs`), loaded eagerly at low priority so they are ready when scrolled to. Product shots use `contain` on white.
- **Team:** the one deep panel, with three tall initials cards and a white name plate, lifting 6px on hover. On phones they form a snapping row.

## The helix

- **What it is:** decorative and pointer-reactive. It is the one exception to the "no DNA" and "no cursor effects" rules, and only in the home hero.
- **Geometry:** seeded and deterministic (`src/components/home/helix/geometry.mjs`). Two dusty strands, rungs every π/5, the axis leaning 28°, cropped by the field's top and right. Depth comes from three buckets (far, mid, near) that differ in size and alpha. There is no blur filter anywhere.
- **Rendering:** WebGL2, one instanced draw per frame (`gl.mjs`). The fade away from the text column is computed in the shader, with no CSS mask on the animating layer. The pointer push is a displacement around a spring-smoothed pointer.
- **Tiers:**
  - A (desktop): 6,000 particles at full rate, with the pointer push.
  - B (touch): 2,500 particles at 30fps, drift only.
  - C (reduced motion, Save-Data, 2GB or less of memory, no WebGL2, or no script): the static poster only.
  - After 12 warm-up frames, 30 frames are timed. A tier steps down when the script cost exceeds 12ms (A) or 16ms (B), or when the frame gap exceeds 24ms (A) or 48ms (B), and never steps back up.
- **Pausing:** the helix pauses when the hero leaves the viewport or the tab is hidden.
- **Poster:** frame 0, rendered at build time by the same renderer (`scripts/build-helix-poster.mjs`). It is served as an `image-set` background, preloaded per screen size, and the canvas cross-fades over it.
- **Measured:** about 0.3ms of script per frame on desktop (tier A); the chunk is about 3.3KB gzipped. Headline contrast at the worst sampled moment is ≥ 7:1, and lede contrast ≥ 4.5:1 (`scripts/verify-helix.mjs`).

## Motion

Transform and opacity only, 150–600ms, ease-out-quart `cubic-bezier(0.165, 0.84, 0.44, 1)`:
- the hero headline rises word by word, then the lede, slip and buttons follow;
- the home search placeholder cycles through everyday examples while the field is empty;
- a 3px teal reading line along the top of the window follows the page scroll (CSS scroll timeline);
- the floating header pills gain a soft shadow once the page scrolls;
- hovers: arrows step forward on every link, category chips fill deep teal and reveal an arrow, the offer slip and package panels lift 4px, step numbers move forward, and team cards lift 6px;
- section reveals once (opacity and a 12–16px rise, no blur);
- the arrow buttons;
- department cards cross-fade their contents (size does not animate);
- the request control enters;
- the helix is the only continuous animation.

Everything is off under `prefers-reduced-motion`, and the helix falls back to its poster.

## Detector decisions

- **Hairlines:** kept on test rows, step rules and quality lines, where they separate data.
- **Equipment photos are manufacturer images:** used because the owner supplied them as the lab's equipment. They are listed for confirmation in OWNER_COPY_REQUEST.md.
- **Amber cream (#FFF4DC):** reserved for fasting and the cardiovascular notice.
- **Team cards:** the one symmetric grid.
- **Numbers on department cards:** real test counts, not decorative indexes.
