# Janasevana Lab Website Implementation Progress

> Site: Janasevana Lab, Kattungal Building, Kaichoondy Jn., Alappuzha, Kerala
> Stack: Next.js (App Router, Static Export), TypeScript, CSS Modules, Design Tokens

---

## Progress Checklist

- [ ] **Step 0: Setup & Brand Discovery**
  - [x] Load `frontend-design` skill (`C:\Users\aadhi\.agents\skills\frontend-design\SKILL.md`)
  - [x] Inspect `brand/` directory: Discovered official logo in `Screenshot 2026-10-23 015243.png`
  - [x] Extract brand palette: Primary Teal `#048E92`, Charcoal `#434448`
  - [x] Create `PROGRESS.md`

- [x] **Phase 1: Foundation**
  - [x] Initialize Next.js project with TypeScript and static export (`output: 'export'`)
  - [x] Implement design tokens in `src/styles/tokens.css` (full teal tonal ramp 50-900 anchored on logo teal `#048E92`, paper warm base, dark ink, amber prep alert, green WhatsApp)
  - [x] Configure typography with high-contrast serif for display (Newsreader), refined sans for UI (Plus Jakarta Sans), and matched Malayalam typography (Noto Serif Malayalam / Noto Sans Malayalam)
  - [x] Build core UI components in `src/components/ui/` (Button, SectionHeading, SectionNumber, Rule, Field, ErrorSummary)
  - [x] Build configuration in `src/config/` (`site.ts`, `tests.ts`, `team.ts`) with typed `TODO_CONFIRM` markers and helper guards
  - [x] Scaffold i18n in `src/i18n/` (`en.ts`, `ml.ts` marked "needs native-speaker review", `LanguageProvider.tsx`)
  - [x] Setup layout shell (RootLayout, SkipLink, metadata, JSON-LD with verified facts only)
  - [x] Type & Color specimen test page for verification (`/specimen`)
  - [x] Lint (`npm run lint`), typecheck (`tsc --noEmit`), static build (`npm run build`) passing, screenshots captured at 1280px and 360px
  - *Key Decisions:* Extracted official brand assets with transparent alpha; verified First Load JS total is 87.3 KB (well below 200KB budget); established strict ConfirmationStatus system.

- [x] **Phase 2: Header & Hero**
  - [x] Slim hairline header with official logo mark and wordmark
  - [x] Quiet underline-on-hover navigation and segmented EN | മലയാളം language toggle
  - [x] Condensing sticky header on scroll without layout shift
  - [x] Accessible MobileMenu drawer with focus trap, Escape to close, focus return, and scroll lock
  - [x] Asymmetrical Hero: massive editorial headline, direct plain language
  - [x] Signature `SpecimenLabel` component (SVG barcode strip, perforated edge, ruled lines, no patient data)
  - [x] Thin ruled info strip with address, phones, opening hours (with honest confirmation status)
  - [x] Mobile-first check: address, phones, primary CTAs visible above fold at 360px in both EN and മലയാളം
  - [x] Lint (`npm run lint`), typecheck (`tsc --noEmit`), static build (`npm run build`) passing, screenshots captured at 1280px and 360px
  - *Key Decisions:* Tailored fluid clamp for Malayalam text to ensure above-the-fold visibility on 360px mobile viewports; verified zero layout shift during header condensation; confirmed Escape-key and focus trap accessibility on MobileMenu.

- [x] **Phase 3: Tests Directory & Basket**
  - [x] Ruled row typography (test name in display serif, department, sample type, prep status)
  - [x] Verified starter tests (Haematology, Biochemistry, Serology, Clinical Pathology) with zero invented prices or TATs
  - [x] Smart search with synonym mapping ("sugar", "liver", "urine", "blood count", etc.)
  - [x] Category tabs with counts and hairline indicators
  - [x] Basket with `useReducer` state management, persisting selected investigations
  - [x] WhatsApp message builder generating pre-filled encoded `https://wa.me/919188490413` link with clear disclaimer
  - [x] Considered empty state ("No match. Call us and we'll help") with direct call and WhatsApp actions
  - [x] Mobile responsive stacking verified at 360px
  - [x] Lint (`npm run lint`), typecheck (`tsc --noEmit`), static build (`npm run build`) passing, screenshots captured at 1280px and 360px
  - *Key Decisions:* Implemented accessible feed landmark, expandable analyte subcomponents, persistent floating summary bar, and minimal patient data collection for WhatsApp booking.

- [ ] **Phase 4: Remaining Sections & Dedicated Pages**
  - [ ] Departments section: full-bleed deep-teal band with oversized numerals
  - [ ] Process section: ruled timeline (collect, test, report) with verified facts
  - [ ] Team section: editorial credit list, duotone-teal portrait slots, confirmed roles
  - [ ] Location & Contact panel: letterhead-style panel, tap-to-call tabular numbers, directions link
  - [ ] Reports page: honest delivery process (call/WhatsApp) + number-free report reading guide
  - [ ] Home Collection page: honest confirmation status, call/WhatsApp direct booking
  - [ ] About page: laboratory background, ethical standards, local community service
  - [ ] FAQ page: safe clinical prep advice, fasting rules, sample collection guidance
  - [ ] Custom 404 page
  - [ ] Lint, typecheck, static build & screenshots

- [ ] **Phase 5: Footer, Mobile Bottom Bar, Motion & Polish**
  - [ ] Deep-teal footer with wordmark, structured contact details, verified navigation
  - [ ] Mobile bottom action bar (Call, WhatsApp) with safe-area padding and WCAG 2.2 focus avoidance
  - [ ] Controlled CSS motion (staggered load reveal, row hovers, button press) respecting `prefers-reduced-motion`
  - [ ] Double-ring accessible focus indicators, custom selection, print stylesheet
  - [ ] SEO: JSON-LD (`MedicalBusiness`/`LocalBusiness` with verified facts only), Open Graph, sitemap, robots
  - [ ] Lint, typecheck, static build & screenshots

- [ ] **Phase 6: Verification, Critique & Audit**
  - [ ] Multi-resolution screenshots: 360px, 768px, 1280px, 1920px
  - [ ] Accessibility audit: No-JS fallback, keyboard navigation, focus trap, screen-reader landmarks
  - [ ] Art direction hostile critique: template elimination, hierarchy check
  - [ ] JS bundle size report (<200KB gzipped budget)
  - [ ] Final confirmation checklist for laboratory owner
