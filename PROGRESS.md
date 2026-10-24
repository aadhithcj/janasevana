# Janasevana Lab website: progress

Rebuilt from scratch on 2026-10-23. Product truth: PRODUCT.md. Design: DESIGN.md. Owner-editable facts: `config/`.

## Step 0: Setup
- [x] Design skills: `impeccable` loaded as a skill. `frontend-design` is not registered as a Claude Code skill; its SKILL.md (`~/.agents/skills/frontend-design`) was read and followed directly.
- [x] `brand/` inspected: only the logo screenshot is present. The Royal Package ad and the sample report PDF are **not** in `brand/`, so petrol blue is the brief's estimate and the letterhead arcs follow the brief's description.
- [x] Logo extracted to transparent PNG/WebP/AVIF by un-mixing each pixel against the two sampled inks (no redrawing): `public/brand/`.
- [x] `brand/` added to `.gitignore` and removed from the index. No report has ever been committed.
- [x] shcd.in visited for information architecture only.
- [x] PRODUCT.md written (from the brief plus the user's init answers); DESIGN.md written before UI code.

## Phase 1: Foundation
- [x] Tokens (`src/styles/tokens.css`): OKLCH ramps from the sampled logo teal #058E92 and charcoal #434448, petrol estimate #0A6C82.
- [x] Fonts self-hosted, instanced and subset (`scripts/build-fonts.py`): Anek Latin 52 KB + Atkinson Hyperlegible Next 18 KB on every page; Anek Malayalam 86 KB + Noto Sans Malayalam 42 KB only on `/ml/`. Rupee sign borrowed from the Malayalam cuts. Metric-matched fallbacks.
- [x] Config: `config/site.ts`, `tests.ts`, `packages.ts`, `team.ts`, with `TODO_CONFIRM` facts behind `confirmed()`.
- [x] i18n: `src/i18n/en.ts`, `src/i18n/ml.ts` (marked needs native-speaker review). Separate root layouts give real `lang="en"` / `lang="ml"` HTML, hreflang alternates, remembered language without a flash.
- [x] Layout shell: header, EN | മലയാളം toggle, menu dialog, footer, mobile action bar, skip link, JSON-LD.
- [x] Type and colour specimen: `/ml/specimen/` (noindex).
- [x] lint, `tsc --noEmit`, build pass; screenshots at 360 and 1280.

## Phase 2: Header, hero, offer, quick actions, action bar
- [x] Hero: place, H1 in Anek condensed, Call (number on the button) and WhatsApp, offer line, the Request Slip straddling the letterhead arc.
- [x] Offer is date-driven (`config/packages.ts`, Asia/Kolkata): a head script sets `html[data-offer]` before paint; CSS swaps the cardiovascular slip for the Royal Package once it ends. No hydration mismatch, no rebuild, no countdown.
- [x] Quick actions, packages band (petrol), services index, home-collection steps with the amber fasting notice, team cards, contact band.
- [x] Header navigation uses React Bits PillNav (plain items, fill hover, pill indicator, bounce 0.24, stretch 0.32) on a solid brand surface with 48px targets; logo lockup kept beside it. Requested by the owner.
- [x] Team: three cards with a hover lift, gentle pointer tilt and arc draw (mouse only; off for touch and reduced motion), in place of the earlier holographic ProfileCard. No invented "verified" status or handle.
- [x] `/impeccable critique` (dual-agent): 25/36, axe 0 violations. Fixed both P1s (one was a false positive), all P2s and the minor findings.
- [x] lint, tsc, build; screenshots at 360 and 1280 in both languages.

## Phase 3: Packages and explorer
- [x] `/packages/` and `/ml/packages/`: petrol page head with the arc, each package as a sticky summary beside its explorer.
- [x] Explorer on native `<details>` (works without JS; height animates where supported). Tests with sub-parameters or a lab-written line open; others stay plain rows.
- [x] Cardiovascular notice permanent and boxed; offer validity shown; after 15 Nov 2026 the section is marked ended, its booking actions hide, and it moves below the Royal Package (single render, CSS order, no duplicate ids).
- [x] "Book this package" links to the booking form with `?package=`; Send on WhatsApp and Copy message beside it.
- [x] Verified live and ended states with `?preview-date=2026-11-20`; screenshots at 360 and 1280.
## Phase 4: Tests directory, basket, booking form
- [x] `/tests/`: everyday-word search with an English and Malayalam synonym map (short queries match whole words), department filters with a live count, fixed label-grid rows showing method and sample only where the report states them and preparation as confirmed or "Ask the lab". CRP and RA Factor show the name and "Ask the lab"; CRP and hs-CRP are separate rows.
- [x] Basket: Context + useReducer, persisted per browser, polite live announcements, count bump; sticky panel on desktop, strip above the call bar on phones with matching scroll padding so focus is never hidden.
- [x] Booking form: patient name, optional booker name, home or lab, area/landmark (home only), optional time, chosen items. Accessible errors, focused error summary, live message preview, success and failure states, Copy message, Call. Hidden without JavaScript, replaced by Call/WhatsApp links. `?package=` prefill (ended offer ignored).
- [x] `scripts/verify-interactions.mjs`: 37 checks pass, including the exact encoded `wa.me/919188490413?text=` URL in both languages.
- [x] Critique of /tests and /packages: degraded single-context run (sub-agents hit an API limit); fixes applied.
## Phase 5: Home Collection, About, Contact, 404, footer
- [x] Home Collection: what it is, the three-step flow, fasting and preparation (FBS and fasting lipid profile named as fasting tests; no hours given), "Call to confirm your area", collection photo slot, booking form.
- [x] About: the lab, equipment and automation as stated, team cards, ISO 9001:2015 as text, and "Understanding your report" built on the report's real columns (test, observed value and unit, reference range, method, sample) with no values; ranges differ by age and sex; questions go to the doctor; report delivery "Call us to confirm".
- [x] Contact: address, all three numbers, WhatsApp, email, directions (address search, pin unconfirmed), hours placeholder, print button and print stylesheet (logo appears on paper, navigation and actions hidden).
- [x] Bilingual 404 (global-not-found) listing every page in both languages.
- [x] Footer: address, numbers, WhatsApp, email, page links, ISO line, and the lab's quality line once.
- [x] Sitemap with hreflang alternates, robots, Open Graph image (`scripts/build-og.mjs`).
## Phase 6: Motion and finish
- [x] Typeset: Malayalam pages checked at 320–1920 (Anek Malayalam display, Noto Sans Malayalam body, line-height 1.8, no tracking); long Malayalam words no longer overflow at 320px.
- [x] Motion (transform/opacity, reduced-motion off): one page-load rise in the hero, once-only section reveals below the fold, explorer and parameter disclosure, "Added" check and basket count bump, basket strip and action bar slide-in, ordered collection steps, menu sheet, cross-document view transition on language switch, PillNav fill hover, team card lift.
- [x] Polish: selection colour, one focus ring (teal, white inner ring; inverted on teal), caret and accent colours, 48px targets (parameter toggles raised from 40px), favicon and apple icon from the real mark, Open Graph image, metadata with hreflang, sitemap, robots, print stylesheet.
- [x] Detector: remaining findings triaged in DESIGN.md; one value-scoped ignore (vendored PillNav bounce curve).
## Phase 7: Verification

---

# Redesign: the Index (branch `redesign-index`, tag `pre-redesign`)

Skills: `impeccable` loaded as a skill. `frontend-design` is not visible to this session as a skill (the Skill tool reports it unknown and it is not in `~/.claude/skills/`; skills load at session start); its SKILL.md from `~/.agents/skills/frontend-design` is read and followed.

## Baseline (pre-redesign, 360×740)
- Home 11,066px (15.0 viewport-heights) EN, 13,281px (17.9) ML. Tests 11,106 / 12,872. Packages 5,002 / 5,779.
- JS (module scripts, gzip): home 144.7KB, tests 164.3KB, packages 144.3KB.
- Screenshots: `before/` (every page, EN and ML, 360 / 768 / 1280).

## Audit
- **Repetitive middle sections: real.** Quick-action rows, the department index and the collection steps are three ruled lists in a row with the same rhythm.
- **Request Slip overuse: real.** It appears in the hero, under each package (twice per package page) and beside the booking form; three quoted messages on home alone.
- **Excessive mobile length: real.** 15 viewport-heights on home; the 16-test list, department rows and team cards each take more than a screen.
- **Repeated CTAs and contact blocks: real.** Phone numbers appear in the hero (main plus "other numbers"), the contact band, the footer and the bottom bar; Book appears in header, hero slip, packages band and quick actions.
- **Empty photo placeholders: real.** Home Collection, About and Contact show "coming soon" frames.
- **Monotonous test rows: real.** 31 rows with identical anatomy; preparation repeats "Ask the lab" on almost every row; the add buttons dominate.
- **Also found:**
  - teal is used as a ground on every page head, so nothing feels like a special moment;
  - heavy condensed display everywhere;
  - the mobile basket strip stacks on top of the bottom bar (two fixed bars);
  - the cardiovascular notice uses teal, not amber;
  - an ended offer disappears from home entirely, where the brief wants it shown as "offer ended".
- **Copy scan (Step 0.6):** no "phlebotomist", "premier", "best", "leading", "accurate", "guarantee", "trusted by", parameter counts or other accreditations in `en.ts`, `ml.ts` or `config/`. Prices found: ₹1,299 (config) and ₹2,000 only.
- **Open conflict for the owner:** the cardiovascular notice wording in `config/packages.ts` ("These tests can help assess risk, but they cannot…") differs from this brief ("These tests help assess risk, but cannot…"). Config kept unchanged until the owner confirms.

## Phases
- [x] 1. Baseline, audit, reference study, DESIGN.md (concept, tokens, type scale, Index spec, sticky rules, offer behaviour)
- [ ] 2. Design system and the Index component
- [ ] 3. Header, hero, offer module, bottom bar
- [ ] 4. Packages (sticky) and Tests (full Index)
- [ ] 5. Remaining home sections, Home Collection, About, Contact (map), 404, footer, Malayalam pass
- [ ] 6. Typeset, polish, motion, print, metadata
- [ ] 7. Verification
