# Janasevana Lab: design before the v3 redesign

Snapshot of the shipped design at commit 8390be2 (2026-10-23), written as the brief for the v3 redesign. Screenshots: `before/` (gitignored). Page heights at 360px: home 11,066px EN / 13,281px ML; tests 11,106 / 12,872.

## Fixed constraints (law for every redesign)
- Verified content only. No invented claims, prices, reviews, counts or turnaround times. Unconfirmed facts (hours, map pin, collection area and timings, report delivery, discount specifics, ISO certificate details, per-test fasting hours, photos) show "Call us to confirm" or stay hidden.
- The cardiovascular notice stays visible wherever that package appears. The offer runs 23 Oct to 15 Nov 2026 (IST) and ends automatically (head script sets `html[data-offer]`; no rebuild, no hydration mismatch, no countdown).
- WCAG 2.2 AA, body 18px or larger, 48px targets, works without JavaScript, reduced motion honoured, no horizontal scroll at 320px.
- Colour: logo teal #058E92 and charcoal #434448 (sampled); petrol #0A6C82 (estimate) for packages only; amber for fasting notices only; WhatsApp green for WhatsApp only.
- No glow, glass, blobs, gradient decoration, stock imagery, eyebrow kickers or symmetric card grids.
- Next.js static export, CSS Modules and tokens, no UI or icon library. Facts in `config/*`, copy in `src/i18n/*`. Do not change the offer date logic, the basket reducer or the WhatsApp builder.

## Concept before: "The written request"
The Request Slip (white note, 4px corners, soft offset shadow, the exact WhatsApp text quoted beside a teal margin rule, "Nothing is sent until you press send in WhatsApp") in the hero, on packages and beside the booking form. A deep teal field (#056A6D) closed by one sweeping letterhead arc opened every page.

## Look before
- Type: Anek Latin / Anek Malayalam condensed (78% width, weight 720) for headlines up to 82px; Atkinson Hyperlegible Next and Noto Sans Malayalam body at 19px.
- Home: teal hero with headline, Call and WhatsApp pills, offer line and the overhanging offer slip; three icon rows; petrol Royal Package band with a 16-test list; ruled department index; 1-2-3 collection steps with the amber notice; three team cards with tilt and arc-draw hover; teal "Find the lab" band; white footer.
- Header: logo lockup (mark + wordmark side by side), React Bits PillNav, EN | മലയാളം toggle, Book pill; phones use a fixed Call / WhatsApp / Menu bar.
- Inner pages: teal (petrol on Packages) page head with the arc; ruled lists; empty photo frames on About, Contact and Home Collection.

## Known weaknesses
Heavy (saturated fields, condensed heavy headlines, many pills); long and repetitive (contact repeated four times); the slip idea fades after the hero; generic middle sections; empty photo frames; tilt hover on team cards.
