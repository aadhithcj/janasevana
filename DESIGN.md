# Design

The single design document for the Janasevana Lab site. Product truth lives in PRODUCT.md; facts live in `config/`. Tokens are in `src/styles/tokens.css`. Previous design (teal fields, Request Slip as signature) is preserved at git tag `pre-redesign`.

## Concept: the Index

A lab is, to a patient, a list: what can be tested, what each test contains, what it costs and how to get it done. This design makes that list the beauty of the site. White and icy-teal surfaces, charcoal ink, hairline rules and very large type; prices, test counts and parameter lists are the visual material. The signature is **the Index**: category → test with its count → what's inside → what it measures (only where the lab supplied wording) → method and preparation (or "Ask the lab") → Add to booking. It appears at three densities (home teaser, package, full directory), always as ruled rows, never as cards. Display type is reserved for three things: the one-line promise, package prices and a few section statements.

## Reference translation

Observed patterns only (no layouts, copy, imagery or branding taken). Function Health (home and /what-we-test, text capture; CSS not visible): hierarchy carried by size and weight, not colour; category name with its test count set right beside it; tests grouped under categories with short sub-lists and a search entry point; price given one dominant figure with qualifiers small. Superpower (text capture): short self-contained beats in sequence; a pinned element beside scrolling content in one section; numerals large with units and qualifiers small. Orange Health: the package pages render client-side and could not be read (home and package URL returned no content), so price and booking clarity follow this brief instead: price, "free home collection" and test count visible together before any action. Translation for Janasevana: counts beside names, one big number per offer, pinned summary beside a scrolling list, no stat blocks, testimonials, ratings, marquees or eyebrows.

## Colour

Sampled seeds (logo in `brand/`): teal **#058E92**, charcoal **#434448**. Petrol **#0A6C82** is the brief's estimate until the Royal Package ad is supplied.

| Role | Token | Value |
|---|---|---|
| Ground | `--paper` | #FFFFFF |
| Icy teal surface | `--ice` | #F0F7F7 |
| Deeper ice (one band) | `--ice-2` | #E2F0F0 |
| Ink | `--ink` | #1E1F22 (17.3:1 on white) |
| Secondary ink | `--ink-2` | #434448 |
| Meta | `--ink-3` | #5A5B60 (6.9:1) |
| Hairline | `--rule` | #DCE3E3 |
| Teal action / selected | `--teal-700` | #056A6D (white text 6.4:1) |
| Teal link | `--teal-600` | #017B7F (4.9:1) |
| Logo teal (large numerals, rules) | `--teal-500` | #058E92 |
| Packages and offers only | `--petrol-700` | #0A6C82 |
| Fasting, preparation and the cardiovascular notice only | amber | surface #FFF4DC, rule #E0A100, ink #7A4A00 |
| WhatsApp actions only | | #25D366 with #0E2A1A text |

Ramps (teal, charcoal, petrol 50–900) are derived in OKLCH from the seeds. Strategy: restrained. White carries the site; teal marks actions and the selected state and owns two full-bleed bands on home (capabilities in ice, contact in teal); petrol owns the Royal Package. Home uses at most three full-bleed bands. No warm neutral was added: the logo has none.

## Type

- **Display: Anek Latin / Anek Malayalam**, variable `wght` (500–780) and `wdth` (75–100). The promise and prices are set wide (`wdth` 100) at weight 520 with -0.025em tracking on Latin; section statements at weight 560. Labels and counts at weight 700, so weight contrast does the hierarchy.
- **Body: Atkinson Hyperlegible Next** (English) and **Noto Sans Malayalam**, 19px, line-height 1.55 / 1.8.
- **Numerals:** tabular lining for prices, counts and phone numbers (Anek).
- **Latin scale (clamp 360→1440):**
  - `--t-promise` 2.9→6.5rem
  - `--t-price` 3→5.25rem
  - `--t-statement` 2→3.5rem
  - `--t-h3` 1.4→1.75rem
  - `--t-body` 1.1875rem
  - `--t-small` 1rem
- **Malayalam scale:** its own steps, about 78% of Latin display (`--t-promise` 2.2→4.6rem, `--t-statement` 1.6→2.6rem), line-height 1.3–1.4, tracking 0. Tested at 360px with the longest headings.
- No all-caps eyebrows; small labels are sentence case at weight 700.

## Layout

- 12 columns, max 1200px, gutters 16px (360px) to 32px. 8px spacing base; sections 64px (phone) to 128px (desktop).
- Ruled rows (1px `--rule`), hairlines and space instead of cards. Radius: 0 on rows; 12px on the Royal Package panel and the full booking slip; pills (999px) only on buttons, chips and the toggle.
- No two adjacent home sections share a composition: typographic hero → split price panels → word list of categories → pinned index beside rows (ice band) → three-step horizontal flow → three credential cards → teal contact band with map → footer.
- The only symmetric grid is the three-person team.
- No empty frames anywhere. Photos render only when a real path is confirmed in config.

## The Index (spec)

- **Structure:** an optional category heading with its count (`Biochemistry 15`), then rows. Each row has: the test name; a count chip of its parameters; a department tag (full density only); an "Add to booking" control; and a native `<details>` that opens to show "Includes" (parameters with per-part method where the report states it), "What it measures" (only FBS, Fasting Lipid Profile, Lp(a), hs-CRP and ACR; otherwise the slot is not rendered), and "Method", "Sample" and "Preparation" (stated values or "Ask the lab"; fasting in amber).
- **Densities:**
  - teaser: names and counts only, at most 6 rows per category, plus a link to the directory;
  - package: rows numbered, open-able, no Add per row (the package is booked as a whole);
  - full: search, filters, department tags, Add per row.
- CRP (Serology) and hs-CRP (Cardiovascular package) are always separate rows with distinct labels.

## Sticky rules

Two places only. **Packages:** the package summary (name, price, "free home sample collection", test count, Select for booking) pins left while the Index and notice scroll right. **Home capabilities:** the department index pins left and highlights the department in view while its rows scroll right (IntersectionObserver only sets `aria-current`). Pin only when `min-width: 64rem` AND `min-height: 45rem` (1024×720); the pinned panel's `max-height` is 80vh with its own scroll; everywhere else the panels stack. Pure CSS `position: sticky`; content is complete if the script never runs.

## Offer behaviour

The pre-rendered HTML always states the period ("23 Oct – 15 Nov 2026, call to confirm") and never says "live now". A head script sets `html[data-offer]` (upcoming / live / ended, Asia/Kolkata) before paint; React never reads it, so there is no hydration mismatch. Live: the cardiovascular price leads the hero. Ended: the hero's offer block shows the Royal Package; the cardiovascular package stays visible, labelled "Offer ended", without price emphasis or booking. 15 Nov 2026 23:59 IST is live; 16 Nov 00:00 IST is ended.

## Components

- **Header:**
  - the real logo lockup (mark + wordmark cut from the logo) and a calm text nav with an underline for the current page;
  - the EN | മലയാളം toggle, visible on phones, and one primary "Book home collection" button;
  - the menu button in the header on phones.
- **Bottom bar (phones):** Call and WhatsApp; when a selection exists, a third "Review (n)" item in the same bar. Body padding and scroll-padding keep focused fields and notices clear of it.
- **Booking slip:** full (form + exact WhatsApp message + Copy) once per page where someone prepares a booking; compact (count + items + Review) wherever a selection is summarised.
- **Map:** Google Maps embed of the address search (no API key), `loading="lazy"`, titled, with the caption that the exact pin is unconfirmed and a plain directions link; it lives only in the contact section and the Contact page.
- **Team:** three monogram credential cards (initials, name, role, registration where printed).

## Motion

Transform and opacity only, 150–500ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Each section reveals once.
- Index disclosures: the chevron turns and the height animates via `::details-content` where supported.
- Add to booking: a check swap and a count bump in the bottom bar and header.
- Language switch: a 200ms cross-document view-transition cross-fade.
- Everything is off under `prefers-reduced-motion`.
- None of: parallax, counters, marquees, magnetic or glowing buttons, scroll hijacking.

## Detector decisions

### design-taste-frontend (tasteskill v2) pass

Run with its own `lint.mjs` and `inspect.mjs` against the served export (`.taste-skill/before`, `.taste-skill/after`). Fixed:
- eyebrows: the place line now sits under the headline; offer labels are folded into each offer's meta line;
- decorative hairlines (header, page heads, hero offer column, team, footer, booking): replaced by tone steps (ice) and space;
- 1px outlined boxes (team cards, filters, Add buttons): replaced by filled ice surfaces;
- inset amber rings on notices: removed, the amber fill alone carries them;
- the English toggle no longer declares a Malayalam webfont;
- over-long section headline: shortened;
- the 15px size: folded into 16px.

Kept, with reasons (the owner's brief outranks a skill):
- **`hairline` on the Index and the category word list.** The brief asks for "ruled rows, hairlines" as the data-as-design language. These are the only remaining rules.
- **`few-pictures` / `no-footage`.** The brief rules out stock photography and a photo hero, and the lab has supplied no photos. The address map is the one picture of the place. Owner photos render automatically once confirmed in config.
- **`palette-cream` (#FFF4DC).** This is the amber the brief reserves for fasting, preparation and the cardiovascular notice.
- **`covered-text` at 390px.** The fixed Call/WhatsApp bar the brief requires passes over headings while scrolling. Body padding and scroll padding keep focused fields and notices clear (WCAG 2.4.11).
- **`card-rows`.** The three-person team is the one symmetric grid the brief allows.
- **`font-fallback` (Noto Sans Malayalam on English pages).** It's the toggle's "മലയാളം" label, deliberately left to the phone's own Malayalam font so English pages download no Malayalam files.
- **`headline-lines` on the contact address.** The address keeps the city on its own smaller line, so the inspector reads one 3-line block.
- **`size-count` (10).** The Latin and Malayalam scales plus prices. Reduced from 11; further cuts would merge the price with the promise.

### Impeccable
- `low-contrast` "#ffffff on #eef5f4" was PillNav's hidden roll-over label; PillNav has since been removed.
- `cramped-padding` on ruled Index rows: the rows carry their own vertical padding.
