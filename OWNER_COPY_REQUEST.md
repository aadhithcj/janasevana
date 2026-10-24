# What the lab needs to supply

Everything below is either hidden on the site or shown as "Ask the lab" / "Call us to confirm" until the lab supplies it. Send the answers and they go into `config/` (no design changes needed).

## 1. One decision first: the cardiovascular notice wording

Two versions exist. Which is the lab's?

- **Current (in `config/packages.ts`, used on the site now):** "These tests **can help** assess risk, but **they** cannot by themselves confirm whether someone has heart disease. Please confirm fasting instructions with the lab before booking."
- **From the latest brief:** "These tests **help** assess risk, but cannot by themselves confirm whether someone has heart disease. Please confirm fasting instructions with the lab before booking."

## 2. One plain line for each test: what it measures

The site shows "What it measures" only where the lab wrote it. That's already done for FBS, Fasting Lipid Profile, Lp(a), hs-CRP and the urine ACR note. Each test below needs one lab-approved line (English and Malayalam), or the lab can say "leave it out".

- **Haematology**
  - Complete Haemogram (CBC)
  - ESR
  - Absolute Eosinophil Count (AEC)
- **Biochemistry**
  - Urea
  - Creatinine
  - Liver Function Test (LFT)
  - Glucose (fasting / random)
  - Uric Acid
  - Electrolytes
  - Thyroid Stimulating Hormone (TSH)
  - Vitamin D
  - Calcium
- **Serology**
  - ASO titre
  - CRP
  - RA Factor
- **Clinical pathology:** Urine routine examination
- **Rapid tests** (which panels exist for each):
  - thyroid
  - hormone
  - cancer-marker
  - vitamin
  - allergy
- **Other services:**
  - Pulmonary function test (PFT)
  - Nebulisation
  - ECG

## 3. Method, sample and preparation still unknown

- **CRP and RA Factor:** method, sample type and any preparation.
- **Per-test fasting hours:** FBS and the fasting lipid profile are marked as fasting tests, but no hours are given. Are there others?
- **Methods for the remaining tests**, if the lab wants them shown. Today the site shows methods only where the reports print them:
  - urea, creatinine, LFT parts, ASO.

## 4. Practical facts

- **Opening days and hours.**
- **Map pin:** the exact Google Maps place link. The map now searches the address text.
- **Report delivery:** how and when reports reach people (collect, WhatsApp, other).
- **Home collection:** the areas the collector visits, and the visit timings.
- **Discounts of 10%–50%:** which tests, and on what terms.
- **ISO 9001:2015:** certificate number, certifying body and scope (shown as plain text only).
- **Live website address (domain):** used for the sitemap and links shared on WhatsApp.

## 5. Photos

Received on 24 Oct 2026 and now on the site: the shopfront photo (home, Contact, About) and four equipment images.

**Confirmed on 24 Oct 2026:** the lab uses these exact models: Erba H360 (haematology), Erba XL-200 (biochemistry), Erba EC 90 (electrolytes) and bioMérieux VIDAS KUBE (immunoassay). The manufacturers' photos are fine to use, and the shopfront photo from the opening is fine to publish.

Two of the supplied images were left out: a redrawn XL-200 picture (its screen text is garbled, so it looks fake) and a VIDAS KUBE advert showing food-testing work with a model.

Still welcome, and shown automatically once sent: the team, and a home collection visit.

**Thyroid results (confirmed 24 Oct 2026):** the thyroid blood test is completed and the result given within an hour. The site says "Thyroid test results within an hour."

## 6. Brand and language

- **The Royal Package advertisement image:** its petrol blue is still an estimate (#0A6C82) and should be sampled from the real ad.
- **Malayalam review:** every Malayalam string is in `src/i18n/ml.ts` and needs a native speaker's review.
