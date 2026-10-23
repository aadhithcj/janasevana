# Design

The single design document for the Janasevana Lab site. Product truth lives in PRODUCT.md; this file holds visual decisions only. Tokens are implemented in `src/styles/tokens.css`.

## Concept

**The written request.** People reach Janasevana Lab with a phone call or a WhatsApp message, so the site is built around the message itself. Its signature is the Request Slip: a white paper note with a teal margin rule that shows, word for word, what will be sent to the lab. Picking a package or adding a test writes itself into the slip, and nothing leaves the phone until the person presses send in WhatsApp. Around the slip, the brand is a deep logo-teal field cut by one sweeping arc, taken from the curve of the lab's letterhead and the logo's swoosh. The lab's name, place and phone numbers are set large in both scripts, the way a bilingual board at Kaichoondy Junction would show them. Everything else is quiet: cool white paper, charcoal ink, ruled lists, and petrol blue kept only for the packages.

## Colour

Sampled from `brand/Screenshot 2026-10-23 015243.png` (median of solid fills, white and anti-aliased pixels excluded):

| Source | Sampled | Brief estimate |
|---|---|---|
| Logo teal ("Janasevana", the S, lower ring) | **#058E92** | #009B94 / #008B8B |
| Logo charcoal (the J, upper ring, "Lab") | **#434448** | #373A3C |
| Petrol blue (Royal Package ad) | not sampled: the ad is not in `brand/` | #0A6C82, used as given until the ad is supplied |

The report PDF is also absent, so the letterhead arcs are taken from the brief's description and the logo's own curve.

Ramps are derived in OKLCH from each seed (same hue, lightness stepped, chroma eased toward the ends):

- **Teal:** 50 #EEF7F6 · 100 #DCEFEE · 200 #A9DEDC · 300 #80D1D4 · 400 #55B2B6 · 500 #058E92 (logo) · 600 #017B7F · 700 #056A6D (field) · 800 #03494C · 900 #013234
- **Charcoal:** 50 #F6F7F9 · 100 #ECEDEF · 200 #D9DADF · 300 #BFC1C5 · 400 #A0A1A6 · 500 #7F8084 · 600 #5A5B60 · 700 #434448 (logo) · 800 #2A2B2F · 900 #1E1F22
- **Petrol:** 50 #EEF8FB · 100 #DDF1F7 · 200 #B2E4F4 · 300 #94CBDC · 500 #438BA0 · 600 #24778C · 700 #0A6C82 (ad, estimate) · 800 #004858 · 900 #02313C
- **Paper:** ground #F7FAF9, raised #FFFFFF, sunk #EEF5F4. Cool, never cream.
- **Amber (fasting and preparation notices only):** surface #FFF4DC, rule #E0A100, text #7A4A00 (6.85:1).
- **WhatsApp (WhatsApp actions only):** #25D366 with #0E2A1A text (7.76:1).
- **Error:** #B3261E (6.54:1 on white), always paired with an icon and words.

Contrast strategy: body text #1E1F22 on paper (15.7:1); secondary #434448 (9.3:1); meta #5A5B60 (6.5:1). On the teal field (#056A6D), body is white (6.4:1) and secondary is #C9ECE9 (5.1:1). Logo teal #058E92 (3.8:1 on paper) carries only large display type, rules and graphics, never body text. Links use teal-600 #017B7F (4.8:1) with an underline.

Strategy: **Committed.** Teal owns the hero field and the closing contact band, about a third of the home page. Petrol owns the packages band. Three inks and paper; nothing else enters except amber and WhatsApp green, each in its one role.

## Type

- **Display, both scripts: Anek** (Anek Latin + Anek Malayalam, Ek Type). One multiscript design, so the Malayalam headings are the same voice as the English ones, not a fallback. Set condensed (`wdth` 75–87) and heavy (650–760) for headlines, normal width for smaller heads. Tracking 0 to -0.015em on Latin only.
- **Reading, Latin: Atkinson Hyperlegible Next** (Braille Institute), drawn for low-vision readers with distinct letterforms (Il1, 0O). Body 19px phone, 20px desktop, line-height 1.55, measure 62–70ch.
- **Reading, Malayalam: Noto Sans Malayalam**, the face Android already uses for Malayalam, so patients read the shapes they know. Body 19px, line-height 1.8, tracking always 0.
- Malayalam fonts load only in the `/ml/` layout (preloaded there). English pages render the stray "മലയാളം" in the toggle with the system font, so they never download Malayalam files.
- Numerals: tabular lining (`font-variant-numeric: tabular-nums`) for prices, phone numbers and dates.
- No all-caps labels, no eyebrow kickers, no italic accent words, no monospace.

Scale (rem at 16px root; display uses clamp between 360px and 1440px):
`--step--1` 1rem · `--step-0` 1.1875rem (19px body) · `--step-1` 1.375rem · `--step-2` 1.75rem · `--step-3` clamp(1.9, 2.4) · `--step-4` clamp(2.4, 3.6) · `--step-5` clamp(2.6, 5.5). Malayalam display steps are one notch smaller and use line-height 1.3 (Latin display 1.0–1.05), because its glyphs are taller and strings longer.

## Signature

**The Request Slip.** A white rectangle (radius 4px; the only near-square corner on the site), with a 2px teal rule down its left margin set inside the padding, like a ruled message pad. It quotes the exact WhatsApp text in body type with tabular numerals, then offers three plain actions: Send on WhatsApp, Call, Copy message. It appears in the hero offer, under each package, in the basket and live beside the booking form, where it updates as the person types. Seeing the message before sending is the point.

**The arc.** One large elliptical curve closes the teal field at the top of each page (a CSS ellipse on the field's lower edge, sweeping from left to right like the letterhead). The slip straddles it on the home page. It appears once per page, never as background decoration.

## Layout principles

- One 12-column grid, max 1240px, 16px gutters at phone (20px at 360px+), 32px desktop. Content measure capped at 70ch.
- Left-aligned everything. No centred stacks except the 404 numeral.
- Ruled lists instead of cards: tests, packages contents, quick actions and the team are rows divided by 1px rules. Cards are reserved for the Request Slip and the offer, the two highlighted panels.
- Full-bleed bands vary the rhythm: teal field (hero), paper (actions, services), petrol band (packages), paper (collection steps), sunk paper (team and quality), teal band (contact). A dense band is followed by an open one.
- More space above a heading than below. Section spacing 72px phone / 128px desktop; heading-to-content 24px.
- 48×48px minimum targets, 8px minimum separation. Primary actions are 56px tall.
- At 360px with Malayalam: headings wrap freely (`text-wrap: balance`), buttons wrap their labels rather than truncating, and no fixed widths exist below 768px.
- Photo slots (storefront, team, collection visit) are framed with a hairline and an inset caption that says what will go there. They hold their aspect ratio, so no layout shift when real photos arrive.

## Components

- **Buttons:** 56px (primary) / 48px (secondary), radius 999px (pill, echoing the logo ring), Anek 600 at normal width. Primary on paper: teal-700 fill, white text. On teal field: white fill, teal-900 text. WhatsApp: #25D366 fill, dark text, chat glyph. Press: scale 0.98, 120ms.
- **Toggle EN | മലയാളം:** a two-segment pill, current segment filled teal-700; both are links to the equivalent page, each labelled in its own script with its own `lang`.
- **Rows:** 1px charcoal-200 rules, 20px vertical padding, hover tints the row teal-50.
- **Notices:** cardiovascular notice in charcoal on teal-50 with a 1px teal-300 border and an "i" glyph; fasting notices amber. No thick coloured side stripes.
- **Placeholder (unconfirmed facts):** never styled as data. Rendered as a sentence, "Call us to confirm", in meta colour with a phone link.
- **Icons:** authored inline SVG, 24px box, 1.75px stroke, round caps: phone, chat, pin, mail, clock, plus, check, close, chevron, copy, info, arrow-out. No icon library, no emoji.
- **Browser surfaces:** selection teal-200 on ink; focus ring 3px teal-600 offset 3px with a 1px white inner ring (visible on teal and paper); caret teal-600; underline offset 0.18em, thickness 1.5px; accent-color teal-700.

## Motion

- Durations 150–600ms. Easing `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out) for entrances, `cubic-bezier(0.65, 0, 0.35, 1)` for state swaps. Transform and opacity only.
- **Page load (once):** the hero's H1 lines, actions and slip rise 12px and fade, staggered 70ms, total under 600ms. Content is visible by default; the animation only runs when JS marks the document ready and motion is allowed.
- **Section reveal (once per section):** IntersectionObserver adds a class once; 16px rise, 420ms. Never re-runs.
- **Package explorer:** native `<details>`, height animated with `interpolate-size` / `::details-content` where supported, chevron rotates 180° (200ms). Works and opens instantly without support.
- **Added to booking:** the button's plus morphs to a check (stroke-dashoffset is not transform, so it is a cross-fade plus scale), and the basket count bumps once (scale 1 → 1.18 → 1, 300ms).
- **Home-collection steps:** the three steps reveal in sequence (90ms stagger) when the list enters view, once.
- **Language switch:** cross-document View Transition (`@view-transition { navigation: auto }`), a 220ms cross-fade of the main content while the header stays put.
- **Mobile menu:** `<dialog>` slides up 24px + fades (280ms); backdrop fades.
- **Sticky action bar:** slides in from below once after load (360ms), and slides out while a form field has focus.
- `prefers-reduced-motion: reduce` turns every transform off and leaves only opacity cross-fades of 120ms or none.
- Never: parallax, counters, typewriter, marquee, autoplay, glow, magnetic buttons, cursor effects, scroll hijacking, countdowns.

## Detector decisions

Rules deliberately ignored (scoped) are recorded here with reasons when the Impeccable hook raises them.
