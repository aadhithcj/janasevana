---
target: home page
total_score: 25
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
target_identity: "file:D:\\Coding Projects\\janasevana\\src\\app\\(en)\\page.tsx"
target_fingerprint: "sha256:bb0baa694755445562c5972441b442e2d8915761e9c1a32509fb5275c2e12713"
target_path: "D:\\Coding Projects\\janasevana\\src\\app\\(en)\\page.tsx"
timestamp: 2026-10-23T13-43-44Z
slug: src-app-en-page-tsx
---
Method: dual-agent (A: design review sub-agent, B: detector + browser sub-agent)

Target: home page, / and /ml/ (src/app/(en)/page.tsx).

Heuristics: 1:3, 2:3, 3:3, 4:2, 5:3, 6:3, 7:n/a (single-visit persuade surface), 8:2, 9:3, 10:3. Total 25/36.

Design specificity: hero and Request Slip are product-specific (junction named, real number on the primary button, exact WhatsApp text quoted, letterhead arc); middle sections leaned generic; empty photo frames read unfinished.

Detector: src/components clean; out HTML: cramped-padding x3 (full-bleed bands, false positive), oversized-h1 (static scan mis-resolved clamp; real 82px/41.6px, accepted as the display choice), nested-cards (notice box inside slip), straggler (ML), first-viewport-column-overflow (ML 1280, slip intentionally taller). axe: 0 violations. Overflow: none. Small target: footer "Tests" 43px wide.

Priority issues and resolution:
- [P1] Offer not in the phone first viewport; ML WhatsApp below the fold. Fixed: offer line under the headline linking to #offer; ML lede shortened; actions moved directly under the H1.
- [P1] "results in minutes", "imported equipment", "experienced, qualified professionals" flagged as unverified. False positive: all are in the owner's brief; recorded in PRODUCT.md.
- [P2] Empty "coming soon" photo frames on home. Fixed: removed from home; team shown as initials cards.
- [P2] Overlapping actions. Fixed: slip has one filled action (Send on WhatsApp); secondary is "Book with the patient's details"; quick actions no longer repeat Call/WhatsApp.
- [P2] Packages band hierarchy and missing cardio notice. Fixed: package name is the h2; "Special Offer" is a tag after the price (verbatim from the ad); cardio footnote carries the notice; phones show 6 tests plus "See all 16 tests".

Minor fixes: unconfirmed-link line box, footer target width, digits unified on Anek, discount de-emphasised, email shown lower-case, nested notice box unboxed in the slip, collection lede no longer repeats its heading.
