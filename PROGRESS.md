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
## Phase 5: Home Collection, About, Contact, 404, footer
## Phase 6: Motion and finish
## Phase 7: Verification
