# Design

The single design document for the Janasevana Lab site. Product truth lives in PRODUCT.md; this file holds visual decisions only. Tokens are implemented in `src/styles/tokens.css`. The previous design (v2, "The written request" on teal fields) is recorded in `.impeccable/CURRENT_DESIGN.md`.

## Concept: quiet paper, one bold moment

The site is calm paper with charcoal ink, the way a careful lab's printed report reads: generous margins, hairline rules, clear type. Teal is ink, not ground. It colours links, rules, numbers and one deliberate full-bleed moment per site: the home hero, where the lab's name, place, phone and current offer meet. Everything a visitor wants to do collects in one place, **Your request**, a paper slip that is always one tap away (header on every screen, drawer on demand). Adding a test, booking a package or typing a name writes into that slip, and the slip shows the exact WhatsApp message before anything is sent. The slip is the spine of the site, not a hero ornament.

## Colour

Sampled seeds (from `brand/` logo): teal **#058E92**, charcoal **#434448**. Petrol **#0A6C82** is the brief's estimate until the Royal Package ad is supplied.

| Token | Value | Use |
|---|---|---|
| `--paper` | #F7FAF9 | page ground (about 80% of every screen) |
| `--paper-raised` | #FFFFFF | slip, panels, inputs |
| `--paper-sunk` | #EEF5F4 | the one occasional tint band |
| `--ink` | #1E1F22 | body text (15.7:1) |
| `--ink-2` | #434448 | secondary text (9.3:1) |
| `--ink-3` | #5A5B60 | meta (6.5:1) |
| `--rule` | #D9DADF | hairlines |
| `--teal-500` | #058E92 | logo teal: arc line, large numbers, rules |
| `--teal-600` | #017B7F | links (4.8:1) |
| `--teal-700` | #056A6D | primary buttons, the hero field, current nav pill |
| `--petrol-700` | #0A6C82 | the Royal Package panel only |
| amber | #FFF4DC / #7A4A00 | fasting and preparation only |
| WhatsApp | #25D366 / #0E2A1A | WhatsApp actions only |
| `--footer` | #2A2B2F | footer ground, ink #ECEDEF |

Full ramps (teal, charcoal, petrol 50–900) are derived in OKLCH from the seeds; tints use `color-mix()` from those.

Strategy: **Restrained.** Paper and charcoal carry the site; teal does real jobs (action, link, current state, number); the home hero is the single field of colour; petrol lives inside one panel.

## Type

- **Display: Anek Latin + Anek Malayalam** at normal width (`font-stretch: 100%`), weight 560–620, `text-wrap: balance`. Used for headlines, prices and phone numbers only.
- **Body: Atkinson Hyperlegible Next** (English) and **Noto Sans Malayalam**, 19px, line-height 1.55 / 1.8, never tracked.
- Tabular lining numerals for prices, phones and dates.
- Fluid scale, ratio about 1.25 (rem at 16px):
  - `--step--1` 1rem
  - `--step-0` 1.1875rem (body)
  - `--step-1` clamp(1.3rem → 1.5rem)
  - `--step-2` clamp(1.55rem → 1.9rem)
  - `--step-3` clamp(1.85rem → 2.4rem)
  - `--step-4` clamp(2.15rem → 3rem)
  - `--step-5` clamp(2.4rem → 3.75rem), hero only
- Malayalam headlines use the same steps one notch down with line-height 1.35; weight 600 keeps conjuncts and chillus crisp at 360px.
- No all-caps labels, no eyebrows, no italic accents.

## Layout principles

- 8px base. Major sections are separated by space and a hairline, not colour bands: `--section` clamp(3.5rem → 9rem) (56px phone, 144px wide desktop).
- Max content width 1200px on a 12-column grid; text measure 60–70ch; left-aligned.
- Flat and ruled by default. Larger radius (24px) on exactly two surfaces: the Royal Package panel and the request drawer. The slip keeps its 6px paper corner and the only shadow on the site.
- No card-in-card. Lists are ruled rows (subgrid where rows share columns).
- Photos render only when a real path is confirmed in config; no empty frames anywhere.
- Inner pages open on paper: H1, one-line lede, and a single thin teal arc line beneath.

## Components

- **Header:** a sticky floating capsule 12px from the top: the circular logo mark (unaltered) in its own round bubble, then React Bits PillNav. Separate small pills to the right: EN | മലയാളം and **Your request (n)**. Phones: logo bubble, toggle and request pill only; Call, WhatsApp and Menu in the fixed bottom bar.
- **Request Slip:** paper note, teal margin rule, the exact message, one primary action (Send on WhatsApp), secondary actions folded into a single "More" row. Never taller than one phone screen; long lists sit behind a disclosure.
- **Request drawer:** native modal `<dialog>`: bottom sheet on phones, right-hand sheet on desktop, radius 24px. It holds the items, the patient name, booker name, home or lab, area and time fields, the live message, Send on WhatsApp, Call, Copy, and "Nothing is sent until you press send in WhatsApp." Escape closes; focus returns to the opener. The Home Collection page renders the same panel inline.
- **Add controls:** every Add and Book-this-package button adds to the request and confirms with a short toast and a count bump; Book also opens the drawer.
- **Buttons:** 48px (56px primary in the hero), radius 999px, Anek 600 at normal width.
- **Footer:** charcoal; the full stacked logo on a paper tile; nav, address, ISO text, the lab's slogan once, copyright.

## Motion

Transform and opacity only, 150–600ms, `cubic-bezier(0.22, 1, 0.36, 1)` for entrances, all off under `prefers-reduced-motion`.
- Hero load: one staggered rise (under 600ms total).
- Section reveal: once, below the fold only.
- Drawer: slides 24px and fades in; the backdrop fades.
- Add: the check scales in, the request count bumps, and a toast rises then fades after 2.6s.
- Disclosures: the chevron rotates; height animates via `::details-content` where supported.
- Language and page changes: cross-document View Transition, cross-fade only, no fallback needed.
- PillNav: its own fill hover (owner-requested).
- No tilt, parallax, counters, marquees or cursor effects.

## Owner-requested components

- **React Bits PillNav**, vendored verbatim in `src/components/shell/PillNav/`. Settings as requested: `itemStyle="plain"`, `hoverEffect="fill"`, `indicator="pill"`, `bounce={0.24}`, `stretch={0.32}`, `layout="split"` with the real circular mark as `logo`, `surface="solid"`, 48px targets, `collapse="never"` (narrow screens use the site menu), `intro={false}`. It is plain JS (no GSAP), about 11KB gzipped, and renders as plain links without JavaScript.
- **Team cards**: flattened in v3: paper cards with teal initials, no tilt or arc-draw. They live on About; home lists the three names as a ruled list.

## Logo usage

The real artwork is extracted, never redrawn. The header uses the circular mark alone, unaltered, in PillNav's logo bubble. The full stacked lockup with the tagline appears in the footer (on a paper tile, because the logo sits only on light grounds), on About, on printouts and in the Open Graph image.

## Detector decisions

- `low-contrast` "#ffffff on #eef5f4" in exported HTML: PillNav's roll-over label, translated out of view; it only shows over the teal fill (white on #056A6D, 6.4:1). False positive.
- `cramped-padding` on ruled list rows: intentional ruled lists; rows carry their own vertical padding.
- `bounce-easing` in the vendored PillNav: value-ignored for that file only; the curve belongs to the disabled intro.
