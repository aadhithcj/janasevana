# Product

<!-- impeccable:product-schema 1 -->

> Source: the build brief of 2026-10-23 plus the user's init answers given the same day (audience, job, voice, feeling, anti-references). Anything not in those is listed as undecided, not inferred.

## Platform

web

## Stack

Pinned by the brief: Next.js App Router + TypeScript, static export (`output: 'export'`), CSS custom properties in `src/styles/tokens.css`, CSS Modules per component, no component, icon or utility-CSS library. Config files (`config/site.ts`, `config/tests.ts`, `config/packages.ts`, `config/team.ts`) are the only thing the owner edits. JS budget about 200KB gzipped.

## Users

- Patients and families in Alappuzha, Kerala, around Kaichoondy Junction. Many are elderly or first-time smartphone users, on low-end Android phones and slow mobile data.
- Many read Malayalam first. Medical test names are usually said in English even in Malayalam speech ("CBC", "sugar test", "thyroid").
- Often a son or daughter is booking for a parent, so the booking flow must work for someone arranging a visit on another person's behalf.
- Their job on the site: trust the lab, see what it tests and what a package includes, and call, WhatsApp or book home collection in under a minute. Booking always ends in a phone call or a WhatsApp chat; there is no online account, payment or report lookup.

## Product Purpose

Janasevana Lab (ജനസേവന ലാബ്) is a local diagnostic laboratory. The site exists to help someone trust the lab, see what it tests, and reach it by phone or WhatsApp (or book home collection) with the right request already written, in under a minute. Success: within seconds on a phone, a visitor sees what the lab is, where it is, how to call or WhatsApp, and what the current offer is.

## Positioning

A single neighbourhood lab at a named junction, with free home sample collection, automated equipment and a named team, speaking to patients in both Malayalam and English. It does not claim to be the biggest, the best or the most accurate; it states what it does plainly.

## Operating Context

- Patients arrive from a phone, often after hearing of an offer or seeing the printed ad.
- Bookings happen over a call to 0477 2288 413, +91 91884 90413 (also WhatsApp) or +91 96335 98413, or a WhatsApp chat.
- A blood sample collector visits homes for free home collection. Reports are printed with a letterhead showing test, observed value and unit, reference range, method and sample.
- Fasting tests (FBS, fasting lipid profile) need preparation, and the lab confirms durations by phone.

## Capabilities and Constraints

Confirmed:
- Departments: Haematology, Biochemistry, Serology, Clinical Pathology; rapid tests on automated machines (thyroid, hormone, cancer-marker, vitamin, allergy, as categories only); pulmonary function test and nebulisation; ECG; free home sample collection; discounts of 10% to 50% on unstated tests.
- Offers: Anniversary Special Cardiovascular Health Package, ₹1,299, 23 Oct to 15 Nov 2026 (Asia/Kolkata), with a mandatory risk notice; Royal Package, ₹2,000, 16 tests, no validity period.
- ISO 9001:2015 certified (plain text only).
- Lines confirmed by the owner's brief and safe to state plainly: rapid tests on modern automated machines with "results in minutes" (categories only: thyroid, hormone, cancer-marker, vitamin, allergy); "fully automated, imported laboratory equipment"; "experienced, qualified professionals". The Royal Package ad labels it "Special Offer".
- Team: Ajmal Majeed (Chief Lab Tech, Paramed Reg. No. 2232\MLTn\15), Najeema Sathar (Lab In Charge), Remya Sajan (Sr. Lab Technician).

Undecided (must render as "Call us to confirm" or stay hidden): opening hours, exact map pin, home-collection area and timings, report delivery method and timing, discount specifics, ISO certificate details, per-test fasting hours, per-test prices, all photographs, method/sample/prep for CRP and RA Factor.

## Brand Commitments

- The real logo (circular J/S swoosh, "Janasevana" in teal, "Lab" in charcoal, script tagline "Promoting Better Diagnostic Tools") is used as supplied, never redrawn.
- Colour identity is sampled from the logo and printed materials: logo teal, logo charcoal, and a deep petrol blue reserved for packages and offers. Amber is for fasting and preparation notices only; WhatsApp green is for WhatsApp actions only.
- Lines the lab uses: "Promoting Better Diagnostic Tools", "Laboratory automation and smart technology", "The lab comes to your home", and (footer only, once) "Quality laboratory equipments | Dedicated customer care | Warranty you can trust".
- Bilingual English | മലയാളം, Malayalam as real pre-rendered pages under `/ml/`.
- Voice: plain, warm, direct, calm. No marketing jargon, no superlatives, no hype.
- Intended feeling (user-stated): careful, local, confident, a little surprising; it should look hand-designed by one good designer.
- Type commitment (user-stated): a characterful display face plus a highly legible body face, both handling Malayalam well.
- Anti-references: shcd.in's look (its information structure only is a reference), generic blue-and-white clinic templates, SaaS landing pages, anything that looks machine-generated, glow, glass, blobs, gradient decoration, repeated symmetric card grids.

## Evidence on Hand

- `brand/Screenshot 2026-10-23 015243.png`: the logo, the only brand file present. The Royal Package advertisement and the sample report PDF named in the brief are not in `brand/`; the petrol blue is the brief's estimate, not a sample.
- No photographs, testimonials, reviews, ratings, patient counts, turnaround times or extra prices exist. Never fabricate them.

## Product Principles

1. Only verified content. No invented claims, prices, accreditations or fake features; unconfirmed facts are shown as unconfirmed, never guessed.
2. Reach the lab in one tap: call and WhatsApp are always within reach, and every booking path ends in a pre-written message the person sends themselves, including when booking for a parent.
3. Plain, warm, direct words; medical names kept as patients say them.
4. Malayalam is a first-class edition, not a translation layer.
5. Health claims stay modest: tests help assess risk, and results belong with the patient's doctor.

## Accessibility & Inclusion

WCAG 2.2 AA minimum with higher body contrast; body text 18px or larger; 48×48px targets; full keyboard and JS-off operation where possible; reduced motion honoured; works at 320px; designed for elderly readers and low-end Android on slow connections.
